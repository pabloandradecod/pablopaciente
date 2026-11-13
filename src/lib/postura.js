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
  { id: 'nariz', nome: 'Ponta do nariz' },
  { id: 'orelha', nome: 'Orelha (trago)' },
  { id: 'ombro', nome: 'Ombro (acrômio)' },
  { id: 'quadril', nome: 'Quadril (trocânter maior)' },
  { id: 'joelho', nome: 'Joelho (côndilo lateral)' },
  { id: 'tornozelo', nome: 'Tornozelo (maléolo lateral)' }
]
const TODOS_IDS = [...new Set([...PONTOS_FRONTAL, ...PONTOS_LATERAL].map((p) => p.id))]
export const NOME_PONTO = Object.fromEntries([...PONTOS_FRONTAL, ...PONTOS_LATERAL].map((p) => [p.id, p.nome]))

// Vista identificada pela IA (prevalece sobre a escolhida na hora de anexar).
export const VISTAS_IA = {
  anterior: 'Anterior',
  posterior: 'Posterior',
  lateral_direita: 'Lateral direita',
  lateral_esquerda: 'Lateral esquerda',
  adams: 'Teste de Adams',
  outra: 'Outra'
}

// Nome da vista para mostrar: a identificada pela IA ou, sem ela, a escolhida.
export function nomeVista(m, escolhida) {
  const v = VISTAS_IA[m?.vista_ia] || escolhida || m?.vista
  return v && v !== 'Automática' ? v : 'Foto'
}

// ---------------------------------------------------------------- pedido à IA (marcação)

export const POR_LOTE = 4 // fotos por pedido (vários pedidos rodam em paralelo)

export function montarSistemaMarcacao() {
  return `Você é um fisioterapeuta com doutorado em biomecânica e avaliação postural. Para cada foto, identifique a vista, marque os pontos anatômicos e descreva os desvios observáveis, como numa avaliação postural com simetrógrafo e fio de prumo.

IDENTIFICAÇÃO DA FOTO
1. "vista_ia": a vista que a foto realmente mostra, mesmo que a vista informada esteja errada ou seja "Automática": anterior (de frente), posterior (de costas), lateral_direita (lado direito do paciente voltado para a câmera), lateral_esquerda, adams (flexão anterior do tronco vista por trás, teste de Adams) ou outra.
2. "tipo": "frontal" para anterior ou posterior em pé; "lateral" para perfil em pé; "adams" para o teste de Adams; "inadequada" se não dá para avaliar (pessoa sentada, muito cortada, borrada).

COMO MARCAR (só para frontal e lateral)
3. Coordenadas: "x" e "y" inteiros de 0 a 1000, relativos à foto como você a recebe (x=0 borda esquerda, x=1000 borda direita, y=0 topo, y=1000 base). O ponto deve ficar EXATAMENTE sobre a referência anatômica, não na roupa, no cabelo ou no fundo. Confira cada ponto antes de responder.
4. FRONTAL: ${PONTOS_FRONTAL.map((p) => `${p.id} (${p.nome})`).join(', ')}.
   "_d" e "_e" são o lado DO PACIENTE: na vista anterior o lado direito do paciente aparece à esquerda da foto; na posterior, à direita da foto. Acrômio: a ponta óssea no alto do ombro, não a borda do deltoide. Crista ilíaca: o ponto mais alto do osso do quadril, na linha da cintura.
5. LATERAL: ${PONTOS_LATERAL.map((p) => `${p.id} (${p.nome})`).join(', ')}.
   Orelha: o trago, a pequena cartilagem logo à frente do canal do ouvido, no meio da orelha visível (nunca no cabelo atrás da orelha). Marque também a ponta do nariz: ela mostra para que lado o paciente está virado. "frente": lado da foto para onde o rosto aponta ("esquerda" ou "direita").
6. Marque tudo o que estiver visível, mesmo se a foto cortar as pernas. Não marque o que não aparece. Não invente.

ACHADOS
7. "achados": desvios observáveis na foto, com região, lado do paciente, intensidade e uma frase objetiva. Use linguagem de observação ("aparente", "sugere"), nunca diagnóstico. Desvio lateral é "desvio lateral aparente", não "escoliose".
8. Teste de Adams: avalie a simetria das costas na flexão (gibosidade costal ou lombar de um lado, assimetria paravertebral). Diga se há ou não assimetria aparente e de que lado; se houver, sugira confirmar com exame específico.
9. "observacao": uma frase curta sobre a qualidade da foto (enquadramento, câmera, roupa) que afete a leitura.`
}

export function montarMensagemMarcacao(vistas, inicio) {
  return `Fotos deste pedido: ${vistas.map((v, i) => `foto ${i + 1} = vista informada "${v}" (foto ${inicio + i + 1} da avaliação)`).join('; ')}.
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
          required: ['foto', 'vista_ia', 'tipo', 'frente', 'observacao', 'pontos', 'achados'],
          properties: {
            foto: { type: 'integer' },
            vista_ia: { type: 'string', enum: Object.keys(VISTAS_IA) },
            tipo: { type: 'string', enum: ['frontal', 'lateral', 'adams', 'inadequada'] },
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
  const tipo = ['frontal', 'lateral', 'adams', 'inadequada'].includes(m?.tipo) ? m.tipo : 'inadequada'
  const validos = new Set((tipo === 'frontal' ? PONTOS_FRONTAL : tipo === 'lateral' ? PONTOS_LATERAL : []).map((p) => p.id))
  const pontos = {}
  for (const p of Array.isArray(m?.pontos) ? m.pontos : []) {
    if (validos.has(p?.id)) pontos[p.id] = { x: limitar(p.x), y: limitar(p.y) }
  }
  let vistaIa = VISTAS_IA[m?.vista_ia] ? m.vista_ia : null
  if (tipo === 'adams') vistaIa = 'adams'
  // Para onde o paciente olha: o nariz decide; sem nariz, vale o que a IA disse.
  let frente = m?.frente === 'esquerda' || m?.frente === 'direita' ? m.frente : null
  if (pontos.nariz && pontos.orelha && pontos.nariz.x !== pontos.orelha.x) frente = pontos.nariz.x > pontos.orelha.x ? 'direita' : 'esquerda'
  return {
    vista: String(vista || ''),
    vista_ia: vistaIa,
    proporcao: Number(proporcao) > 0 ? Number(proporcao) : 0.75, // largura / altura da foto
    tipo,
    frente,
    observacao: String(m?.observacao || ''),
    pontos,
    achados: (Array.isArray(m?.achados) ? m.achados : []).filter((a) => a?.achado)
  }
}

// Texto com os achados de todas as fotos, para o pedido da prescrição (sem reenviar as imagens).
export function achadosEmTexto(marcacoes, vistas) {
  return marcacoes
    .map((m, i) => {
      const nome = nomeVista(m, vistas[i])
      const estado = m.tipo === 'inadequada' ? 'foto inadequada para avaliação' : m.tipo === 'adams' ? 'teste de Adams' : ''
      const cab = `Foto ${i + 1} (${nome}): ${[estado, m.observacao].filter(Boolean).join('. ') || 'sem observação'}`
      const meds = medidas(m)
        .map((x) => `  medida: ${x.rotulo} = ${x.valor}${x.detalhe ? ` (${x.detalhe})` : ''}`)
        .join('\n')
      const ach = m.achados.map((a) => `  - ${a.regiao} (${a.lado}, ${a.intensidade.toLowerCase()}): ${a.achado}`).join('\n')
      return [cab, meds, ach].filter(Boolean).join('\n')
    })
    .join('\n')
}

// ---------------------------------------------------------------- linha de referência

// Linha vertical de referência. Com os tornozelos na foto, é a linha de prumo;
// com a foto cortada nas pernas, usa a pelve (frontal) ou o trocânter (lateral).
export function linhaReferencia(m, { largura = 1, altura = 1 } = {}) {
  const P = m?.pontos || {}
  const x = (id) => (P[id].x / 1000) * largura
  const y = (id) => (P[id].y / 1000) * altura
  if (m?.tipo === 'frontal') {
    if (P.tornozelo_d && P.tornozelo_e) return { x: (x('tornozelo_d') + x('tornozelo_e')) / 2, nome: 'linha de prumo', base: (y('tornozelo_d') + y('tornozelo_e')) / 2, prumo: true }
    if (P.quadril_d && P.quadril_e) return { x: (x('quadril_d') + x('quadril_e')) / 2, nome: 'linha média da pelve', base: null, prumo: false }
  }
  if (m?.tipo === 'lateral') {
    if (P.tornozelo) return { x: x('tornozelo'), nome: 'linha de prumo', base: y('tornozelo'), prumo: true }
    if (P.quadril) return { x: x('quadril'), nome: 'referência no trocânter', base: null, prumo: false }
  }
  return null
}

// ---------------------------------------------------------------- medidas

const grau = (rad) => (rad * 180) / Math.PI
const fmt = (n, casas = 1) => n.toFixed(casas).replace('.', ',')

// Medidas biomecânicas a partir dos pontos. `tamanho` = dimensões da foto
// (só a proporção importa; sem ele, usa a proporção guardada na marcação).
export function medidas(m, tamanho) {
  const largura = tamanho?.largura ?? (m?.proporcao || 0.75)
  const altura = tamanho?.altura ?? 1
  const P = m?.pontos || {}
  const px = (id) => P[id] && { x: (P[id].x / 1000) * largura, y: (P[id].y / 1000) * altura }
  const ref = linhaReferencia(m, { largura, altura })
  const topo = px('topo_cabeca')
  // Altura do corpo para as distâncias em %: do topo da cabeça ao tornozelo; sem os pés, estimada pelo quadril
  // (trocânter e crista ilíaca ficam perto da metade da altura).
  const alturaCorpo = () => {
    if (ref?.base && topo) return ref.base - topo.y
    const q = px('quadril') || (px('quadril_d') && px('quadril_e') && { y: (px('quadril_d').y + px('quadril_e').y) / 2 })
    if (q && topo) return (q.y - topo.y) / 0.5
    return altura * 0.8
  }
  const out = []
  if (m?.tipo === 'frontal') {
    const posterior = /posterior/i.test(nomeVista(m))
    // lado direito do paciente aparece à esquerda da foto (anterior) ou à direita (posterior)
    const ladoDoPaciente = (dx) => (dx === 0 ? null : (dx > 0) === posterior ? 'direita' : 'esquerda')
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
    if (ref) {
      const h = alturaCorpo()
      const sufixo = ref.prumo ? '× prumo' : '× linha média'
      const desvio = (rotulo, x) => {
        const pct = ((x - ref.x) / h) * 100
        const lado = Math.abs(pct) < 0.5 ? null : ladoDoPaciente(x - ref.x)
        out.push({ chave: rotulo, rotulo: `${rotulo} ${sufixo}`, valor: `${fmt(Math.abs(pct))}%`, detalhe: lado ? `para a ${lado} do paciente` : 'centralizado' })
      }
      const cab = px('cabeca')
      if (cab) desvio('Cabeça', cab.x)
      const od = px('ombro_d'), oe = px('ombro_e')
      if (od && oe && ref.prumo) desvio('Tronco', (od.x + oe.x) / 2)
    }
  }
  if (m?.tipo === 'lateral') {
    const frente = m.frente === 'esquerda' ? -1 : 1 // positivo = à frente do corpo
    if (ref) {
      const h = alturaCorpo()
      const sufixo = ref.prumo ? '× prumo' : '× trocânter'
      for (const [id, rotulo] of [['orelha', 'Orelha'], ['ombro', 'Ombro'], ['quadril', 'Quadril'], ['joelho', 'Joelho']]) {
        const p = px(id)
        if (!p || (!ref.prumo && id === 'quadril')) continue
        const pct = (((p.x - ref.x) * frente) / h) * 100
        out.push({ chave: id, rotulo: `${rotulo} ${sufixo}`, valor: `${fmt(Math.abs(pct))}%`, detalhe: Math.abs(pct) < 0.5 ? 'na linha' : pct > 0 ? 'à frente' : 'atrás' })
      }
    }
    const angVertical = (a, b, rotulo, frenteTxt, trasTxt) => {
      const pa = px(a), pb = px(b)
      if (!pa || !pb) return
      const ang = grau(Math.atan2((pa.x - pb.x) * frente, pb.y - pa.y))
      out.push({ chave: `${a}-${b}`, rotulo, valor: `${fmt(Math.abs(ang))}°`, detalhe: Math.abs(ang) < 1 ? 'vertical' : ang > 0 ? frenteTxt : trasTxt })
    }
    angVertical('orelha', 'ombro', 'Cabeça (orelha-ombro)', 'à frente', 'atrás')
    angVertical('ombro', 'quadril', 'Tronco (ombro-quadril)', 'inclinado à frente', 'inclinado para trás')
  }
  return out
}
