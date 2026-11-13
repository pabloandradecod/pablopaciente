// Avaliação postural por foto: pontos anatômicos, medidas e o pedido de marcação para a IA.
// Coordenadas dos pontos: inteiros de 0 a 1000, relativos à largura (x) e à altura (y) da foto.
import { INTENSIDADES, REGIOES_POSTURA } from './assistente.js'

export const PONTOS_FRONTAL = [
  { id: 'topo_cabeca', nome: 'Topo da cabeça' },
  { id: 'cabeca', nome: 'Centro da cabeça' },
  { id: 'ombro_d', nome: 'Ombro direito (acrômio)' },
  { id: 'ombro_e', nome: 'Ombro esquerdo (acrômio)' },
  { id: 'quadril_d', nome: 'Quadril direito (crista ilíaca)' },
  { id: 'quadril_e', nome: 'Quadril esquerdo (crista ilíaca)' },
  { id: 'joelho_d', nome: 'Joelho direito' },
  { id: 'joelho_e', nome: 'Joelho esquerdo' },
  { id: 'tornozelo_d', nome: 'Tornozelo direito (maléolo)' },
  { id: 'tornozelo_e', nome: 'Tornozelo esquerdo (maléolo)' }
]
export const PONTOS_LATERAL = [
  { id: 'topo_cabeca', nome: 'Topo da cabeça' },
  { id: 'orelha', nome: 'Orelha (trago)' },
  { id: 'ombro', nome: 'Ombro (acrômio)' },
  { id: 'quadril', nome: 'Quadril (trocânter maior)' },
  { id: 'joelho', nome: 'Joelho (côndilo lateral)' },
  { id: 'tornozelo', nome: 'Tornozelo (maléolo lateral)' }
]
const TODOS_IDS = [...new Set([...PONTOS_FRONTAL, ...PONTOS_LATERAL].map((p) => p.id))]
export const NOME_PONTO = Object.fromEntries([...PONTOS_FRONTAL, ...PONTOS_LATERAL].map((p) => [p.id, p.nome]))

// Tipo esperado pela vista escolhida (a IA confirma; "Outra" ela decide).
export function tipoDaVista(vista) {
  if (/anterior|posterior/i.test(vista)) return 'frontal'
  if (/lateral/i.test(vista)) return 'lateral'
  return null
}

// ---------------------------------------------------------------- pedido à IA (marcação)

export const POR_LOTE = 4 // fotos por pedido (vários pedidos rodam em paralelo)

export function montarSistemaMarcacao() {
  return `Você é um fisioterapeuta com doutorado em biomecânica e avaliação postural. Para cada foto de postura (pessoa de pé), marque os pontos anatômicos e descreva os desvios observáveis, como numa avaliação postural com simetrógrafo e fio de prumo.

COMO MARCAR
1. Coordenadas: "x" e "y" inteiros de 0 a 1000, relativos à foto como você a recebe (x=0 borda esquerda, x=1000 borda direita, y=0 topo, y=1000 base). Seja o mais preciso possível: o ponto deve ficar exatamente sobre a referência anatômica.
2. "tipo": "frontal" para vista anterior ou posterior, "lateral" para perfil, "inadequada" se a foto não mostra a pessoa de pé e de corpo inteiro (aí não marque pontos).
3. Pontos da vista FRONTAL: ${PONTOS_FRONTAL.map((p) => `${p.id} (${p.nome})`).join(', ')}.
   "_d" e "_e" são o lado direito e esquerdo DO PACIENTE: na vista anterior o lado direito do paciente aparece à esquerda da foto; na vista posterior, à direita da foto.
4. Pontos da vista LATERAL: ${PONTOS_LATERAL.map((p) => `${p.id} (${p.nome})`).join(', ')}. Em "frente", diga para qual lado da foto o paciente está virado ("esquerda" ou "direita").
5. Não marque o que não estiver visível (roupa cobrindo, parte cortada). Não invente.
6. "achados": desvios observáveis na foto, com região, lado do paciente, intensidade e uma frase objetiva. Use linguagem de observação ("aparente", "sugere"), nunca diagnóstico. Desvio lateral é "desvio lateral aparente", não "escoliose".
7. "observacao": uma frase sobre a qualidade da foto (ângulo, distância, roupa) que afete a leitura.`
}

export function montarMensagemMarcacao(vistas, inicio) {
  return `Fotos deste pedido: ${vistas.map((v, i) => `foto ${i + 1} = ${v} (foto ${inicio + i + 1} da avaliação)`).join('; ')}.
Devolva um item em "fotos" para cada foto, na mesma ordem, com "foto" = número da foto neste pedido (1 a ${vistas.length}).`
}

export function montarEsquemaMarcacao() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['fotos'],
    properties: {
      fotos: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['foto', 'tipo', 'frente', 'observacao', 'pontos', 'achados'],
          properties: {
            foto: { type: 'integer' },
            tipo: { type: 'string', enum: ['frontal', 'lateral', 'inadequada'] },
            frente: { type: 'string', enum: ['esquerda', 'direita', 'nao_se_aplica'] },
            observacao: { type: 'string' },
            pontos: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['id', 'x', 'y'],
                properties: { id: { type: 'string', enum: TODOS_IDS }, x: { type: 'integer' }, y: { type: 'integer' } }
              }
            },
            achados: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['regiao', 'achado', 'lado', 'intensidade'],
                properties: {
                  regiao: { type: 'string', enum: REGIOES_POSTURA },
                  achado: { type: 'string' },
                  lado: { type: 'string', enum: ['Direito', 'Esquerdo', 'Bilateral', 'Central'] },
                  intensidade: { type: 'string', enum: INTENSIDADES }
                }
              }
            }
          }
        }
      }
    }
  }
}

const limitar = (n) => Math.max(0, Math.min(1000, Math.round(Number(n) || 0)))

// Limpa a marcação de uma foto: só pontos do tipo certo, dentro da foto.
export function normalizarMarcacao(m, vista, proporcao) {
  const tipo = ['frontal', 'lateral', 'inadequada'].includes(m?.tipo) ? m.tipo : tipoDaVista(vista) || 'inadequada'
  const validos = new Set((tipo === 'frontal' ? PONTOS_FRONTAL : tipo === 'lateral' ? PONTOS_LATERAL : []).map((p) => p.id))
  const pontos = {}
  for (const p of Array.isArray(m?.pontos) ? m.pontos : []) {
    if (validos.has(p?.id)) pontos[p.id] = { x: limitar(p.x), y: limitar(p.y) }
  }
  return {
    vista: String(vista || ''),
    proporcao: Number(proporcao) > 0 ? Number(proporcao) : 0.75, // largura / altura da foto
    tipo,
    frente: m?.frente === 'esquerda' || m?.frente === 'direita' ? m.frente : null,
    observacao: String(m?.observacao || ''),
    pontos,
    achados: (Array.isArray(m?.achados) ? m.achados : []).filter((a) => a?.achado)
  }
}

// Texto com os achados de todas as fotos, para o pedido da prescrição (sem reenviar as imagens).
export function achadosEmTexto(marcacoes, vistas) {
  return marcacoes
    .map((m, i) => {
      const cab = `Foto ${i + 1} (${vistas[i]}): ${m.tipo === 'inadequada' ? 'foto inadequada para avaliação' : m.observacao || 'sem observação'}`
      const meds = medidas(m)
        .map((x) => `  medida: ${x.rotulo} = ${x.valor}${x.detalhe ? ` (${x.detalhe})` : ''}`)
        .join('\n')
      const ach = m.achados.map((a) => `  - ${a.regiao} (${a.lado}, ${a.intensidade.toLowerCase()}): ${a.achado}`).join('\n')
      return [cab, meds, ach].filter(Boolean).join('\n')
    })
    .join('\n')
}

// ---------------------------------------------------------------- medidas

const grau = (rad) => (rad * 180) / Math.PI
const fmt = (n, casas = 1) => n.toFixed(casas).replace('.', ',')

// Medidas biomecânicas a partir dos pontos. `largura` e `altura` são as dimensões da foto
// (só a proporção importa, para os ângulos saírem certos).
export function medidas(m, tamanho) {
  const largura = tamanho?.largura ?? (m?.proporcao || 0.75)
  const altura = tamanho?.altura ?? 1
  const P = m?.pontos || {}
  const px = (id) => P[id] && { x: (P[id].x / 1000) * largura, y: (P[id].y / 1000) * altura }
  const out = []
  if (m?.tipo === 'frontal') {
    const posterior = m.vista ? /posterior/i.test(m.vista) : false
    // lado direito do paciente aparece à esquerda da foto (anterior) ou à direita (posterior)
    const ladoDaFoto = (dx) => (dx === 0 ? null : (dx > 0) === posterior ? 'direita' : 'esquerda')
    const par = (rotulo, a, b) => {
      const d = px(a), e = px(b)
      if (!d || !e) return
      const ang = grau(Math.atan2(Math.abs(d.y - e.y), Math.abs(d.x - e.x) || 1e-6))
      const maisAlto = Math.abs(d.y - e.y) < 1e-6 ? null : d.y < e.y ? 'direito' : 'esquerdo'
      out.push({ chave: a, rotulo, valor: `${fmt(ang)}°`, detalhe: ang < 1 || !maisAlto ? 'alinhado' : `${maisAlto} mais alto` })
    }
    par('Ombros', 'ombro_d', 'ombro_e')
    par('Pelve', 'quadril_d', 'quadril_e')
    par('Joelhos', 'joelho_d', 'joelho_e')
    const td = px('tornozelo_d'), te = px('tornozelo_e'), topo = px('topo_cabeca')
    if (td && te) {
      const prumo = (td.x + te.x) / 2
      const base = (td.y + te.y) / 2
      const alturaCorpo = topo ? base - topo.y : altura * 0.8
      const desvio = (rotulo, x) => {
        const pct = ((x - prumo) / alturaCorpo) * 100
        const lado = Math.abs(pct) < 0.5 ? null : ladoDaFoto(x - prumo)
        out.push({ chave: rotulo, rotulo, valor: `${fmt(Math.abs(pct))}%`, detalhe: lado ? `para a ${lado} do paciente` : 'sobre o prumo' })
      }
      const cab = px('cabeca')
      if (cab) desvio('Cabeça × prumo', cab.x)
      const od = px('ombro_d'), oe = px('ombro_e')
      if (od && oe) desvio('Tronco × prumo', (od.x + oe.x) / 2)
    }
  }
  if (m?.tipo === 'lateral') {
    const torn = px('tornozelo'), topo = px('topo_cabeca')
    // sinal: positivo = à frente do corpo
    const frente = m.frente === 'esquerda' ? -1 : 1
    if (torn) {
      const alturaCorpo = topo ? torn.y - topo.y : altura * 0.8
      for (const [id, rotulo] of [['orelha', 'Orelha'], ['ombro', 'Ombro'], ['quadril', 'Quadril'], ['joelho', 'Joelho']]) {
        const p = px(id)
        if (!p) continue
        const pct = (((p.x - torn.x) * frente) / alturaCorpo) * 100
        out.push({ chave: id, rotulo: `${rotulo} × prumo`, valor: `${fmt(Math.abs(pct))}%`, detalhe: Math.abs(pct) < 0.5 ? 'sobre a linha' : pct > 0 ? 'à frente' : 'atrás' })
      }
    }
    const angVertical = (a, b, rotulo, frenteTxt, trasTxt) => {
      const pa = px(a), pb = px(b)
      if (!pa || !pb) return
      const ang = grau(Math.atan2((pa.x - pb.x) * frente, pb.y - pa.y))
      out.push({ chave: `${a}-${b}`, rotulo, valor: `${fmt(Math.abs(ang))}°`, detalhe: Math.abs(ang) < 1 ? 'vertical' : ang > 0 ? frenteTxt : trasTxt })
    }
    angVertical('orelha', 'ombro', 'Cabeça (orelha-ombro)', 'cabeça à frente', 'cabeça atrás')
    angVertical('ombro', 'quadril', 'Tronco (ombro-quadril)', 'tronco inclinado à frente', 'tronco inclinado para trás')
  }
  return out
}
