// Edge Function "assistente": chama o Claude (API da Anthropic) pelo painel.
// - Só o administrador (public.admins) pode usar.
// - A chave fica no Supabase (secret ANTHROPIC_API_KEY), nunca no site.
// - A resposta vem em JSON garantido pelo esquema (structured outputs).
import Anthropic from "npm:@anthropic-ai/sdk@1.4.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const MODELO = "claude-opus-5-5";
// Preço por milhão de tokens (US$) para estimar o custo de cada pedido.
const PRECO = { entrada: 4, cacheLeitura: 0.2, cacheEscrita: 5, saida: 20 };
const LIMITE_TEXTO = 400_000; // caracteres
// Fotos posturais: até 4, já reduzidas no painel (lado maior ~1568 px).
const MAX_IMAGENS = 4;
const LIMITE_IMAGEM = 4_500_000; // caracteres em base64 por foto (a API aceita até 5 MB)
const TIPOS_IMAGEM = ["image/jpeg", "image/png", "image/webp"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const resposta = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { ...CORS, "Content-Type": "application/json" } });

function custoEstimado(uso: Record<string, number | null | undefined>) {
  const n = (v: number | null | undefined) => v ?? 0;
  const dolares =
    (n(uso.input_tokens) * PRECO.entrada +
      n(uso.cache_read_input_tokens) * PRECO.cacheLeitura +
      n(uso.cache_creation_input_tokens) * PRECO.cacheEscrita +
      n(uso.output_tokens) * PRECO.saida) /
    1_000_000;
  return Math.round(dolares * 10000) / 10000;
}

function mensagemDeErro(e: unknown): { texto: string; status: number } {
  if (e instanceof Anthropic.AuthenticationError) return { texto: "A chave da API é inválida. Confira o secret ANTHROPIC_API_KEY no Supabase.", status: 502 };
  if (e instanceof Anthropic.PermissionDeniedError) return { texto: "A chave da API não tem permissão para este modelo.", status: 502 };
  if (e instanceof Anthropic.RateLimitError) return { texto: "Muitos pedidos seguidos. Espere um minuto e tente de novo.", status: 429 };
  if (e instanceof Anthropic.BadRequestError) {
    const msg = String(e.message || "");
    if (/credit|billing|balance/i.test(msg)) return { texto: "Sem créditos na conta da Anthropic. Adicione créditos em console.anthropic.com > Billing.", status: 402 };
    return { texto: `Pedido recusado pela API: ${msg.slice(0, 300)}`, status: 400 };
  }
  if (e instanceof Anthropic.APIError) return { texto: "A API da Anthropic está instável agora. Tente de novo em instantes.", status: 502 };
  return { texto: "Erro inesperado ao falar com a IA.", status: 500 };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return resposta({ erro: "Método não permitido." }, 405);

  // 1) Só o administrador.
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: admin, error: erroAdmin } = await supabase.rpc("is_admin");
  if (erroAdmin || admin !== true) return resposta({ erro: "Acesso restrito." }, 403);

  let corpo: any;
  try {
    corpo = await req.json();
  } catch {
    return resposta({ erro: "Pedido inválido." }, 400);
  }

  const chave = Deno.env.get("ANTHROPIC_API_KEY");
  if (corpo?.verificar) return resposta({ configurada: Boolean(chave), modelo: MODELO });
  if (!chave) return resposta({ erro: "A chave da API ainda não foi cadastrada no Supabase." }, 503);

  const { sistema, mensagem, esquema, esquemaReserva } = corpo ?? {};
  if (typeof sistema !== "string" || typeof mensagem !== "string" || typeof esquema !== "object" || !esquema) {
    return resposta({ erro: "Pedido incompleto." }, 400);
  }
  if (sistema.length + mensagem.length > LIMITE_TEXTO) return resposta({ erro: "Texto longo demais." }, 413);

  // Fotos (opcionais): cada uma vira um bloco de imagem, precedido da vista (ex.: "Foto 1: vista lateral direita").
  const imagens = Array.isArray(corpo.imagens) ? corpo.imagens : [];
  if (imagens.length > MAX_IMAGENS) return resposta({ erro: `Envie no máximo ${MAX_IMAGENS} fotos.` }, 400);
  const blocosImagem: unknown[] = [];
  for (const [i, img] of imagens.entries()) {
    if (!TIPOS_IMAGEM.includes(img?.media_type) || typeof img?.data !== "string" || !img.data) {
      return resposta({ erro: "Foto em formato não aceito. Use JPG, PNG ou WebP." }, 400);
    }
    if (img.data.length > LIMITE_IMAGEM) return resposta({ erro: "Foto grande demais. Tente de novo (o painel reduz a foto antes de enviar)." }, 413);
    const vista = typeof img.vista === "string" && img.vista.trim() ? img.vista.trim().slice(0, 60) : "vista não informada";
    blocosImagem.push({ type: "text", text: `Foto ${i + 1}: ${vista}` });
    blocosImagem.push({ type: "image", source: { type: "base64", media_type: img.media_type, data: img.data } });
  }
  // Imagens antes do texto: a API recomenda essa ordem.
  const conteudo = blocosImagem.length ? [...blocosImagem, { type: "text", text: mensagem }] : mensagem;

  const cliente = new Anthropic({ apiKey: chave });
  const montar = (schema: unknown) => ({
    model: MODELO,
    max_tokens: 16000,
    // Sem cache: os pedidos são espaçados (mais de 5 min), e gravar cache custaria mais.
    system: sistema,
    messages: [{ role: "user", content: conteudo }],
    output_config: { effort: "medium", format: { type: "json_schema", schema } },
  });

  // 2) Chama o Claude. Se o modelo recusar, a API tenta outro modelo sozinha (fallbacks).
  async function chamar(schema: unknown) {
    try {
      return await cliente.beta.messages.create({
        ...(montar(schema) as any),
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      } as any);
    } catch (e) {
      // Se a conta não aceitar o recurso de fallback, repete sem ele.
      if (e instanceof Anthropic.BadRequestError && /fallback/i.test(String(e.message))) {
        return await cliente.messages.create(montar(schema) as any);
      }
      throw e;
    }
  }

  let msg: any;
  try {
    msg = await chamar(esquema);
  } catch (e) {
    // Esquema com lista de ids grande demais: repete com ids livres (o painel valida depois).
    if (esquemaReserva && e instanceof Anthropic.BadRequestError && /schema|enum|grammar|too (large|complex)/i.test(String(e.message))) {
      try {
        msg = await chamar(esquemaReserva);
      } catch (e2) {
        const { texto, status } = mensagemDeErro(e2);
        return resposta({ erro: texto }, status);
      }
    } else {
      const { texto, status } = mensagemDeErro(e);
      console.error("assistente", e);
      return resposta({ erro: texto }, status);
    }
  }

  if (msg.stop_reason === "refusal") return resposta({ erro: "A IA não respondeu a este pedido. Reformule o relato e tente de novo." }, 422);
  if (msg.stop_reason === "max_tokens") return resposta({ erro: "A resposta ficou longa demais. Tente um relato mais objetivo ou menos fotos." }, 422);

  const texto = (msg.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
  let dados: unknown;
  try {
    dados = JSON.parse(texto);
  } catch {
    return resposta({ erro: "A IA respondeu em formato inesperado. Tente de novo." }, 502);
  }

  return resposta({ dados, modelo: msg.model, custo_usd: custoEstimado(msg.usage || {}) });
});
