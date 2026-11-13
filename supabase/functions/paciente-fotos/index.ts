// Edge Function "paciente-fotos": links temporários (1 hora) das fotos posturais para o link do paciente.
// - Só responde a quem tem token + chave do aparelho válidos (checados no banco por paciente_fotos).
// - As fotos ficam num bucket privado; o paciente só recebe as fotos da análise liberada para ele.
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const resposta = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { ...CORS, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return resposta({ erro: "Método não permitido." }, 405);
  let corpo: any;
  try {
    corpo = await req.json();
  } catch {
    return resposta({ erro: "Pedido inválido." }, 400);
  }
  const { token, chave } = corpo ?? {};
  if (typeof token !== "string" || typeof chave !== "string" || token.length < 32 || chave.length < 16) {
    return resposta({ erro: "Acesso inválido." }, 403);
  }
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });
  const { data: caminhos, error } = await admin.rpc("paciente_fotos", { p_token: token, p_chave: chave });
  if (error || caminhos === null) return resposta({ erro: "Acesso inválido." }, 403);
  if (!caminhos.length) return resposta({ urls: [] });
  const { data, error: e2 } = await admin.storage.from("fotos-posturais").createSignedUrls(caminhos, 3600);
  if (e2) return resposta({ erro: "Não foi possível carregar as fotos." }, 500);
  const porCaminho = Object.fromEntries((data || []).map((d: any) => [d.path, d.signedUrl]));
  return resposta({ urls: caminhos.map((c: string) => porCaminho[c] || null) });
});
