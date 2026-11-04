// Assistente clínico: monta o pedido para o Claude (API direta ou ponte manual)
// e lê a resposta (relatório + dados estruturados).

function idade(nasc) {
  if (!nasc) return null
  const n = new Date(nasc + 'T12:00:00')
  const h = new Date()
  let a = h.getFullYear() - n.getFullYear()
  if (h.getMonth() < n.getMonth() || (h.getMonth() === n.getMonth() && h.getDate() < n.getDate())) a--
  return a
}

const TIPOS = {
  texto: 'texto curto',
  texto_longo: 'texto',
  escala: 'número de 0 a 10',
  sim_nao: '"sim" ou "nao"',
  sim_nao_texto: '{"resposta":"sim"|"nao","opcoes":[...],"detalhe":""}',
  lista: 'UM valor das opções',
  multipla: 'LISTA de valores das opções'
}

// Catálogo: só exercícios com animação (galeria + vídeos próprios da biblioteca).
function montarCatalogo(biblioteca, galeria) {
  const videosGaleria = new Set((galeria?.itens || []).map((i) => i.video))
  const proprios = biblioteca.filter((e) => e.ativo && e.video_path && !videosGaleria.has(e.video_path))
  const nomesCat = Object.fromEntries((galeria?.categorias || []).map((c) => [c.id, c.nome]))
  const porCategoria = {}
  for (const i of galeria?.itens || []) (porCategoria[i.categoria] ||= []).push(i)
  const linhasGaleria = Object.entries(porCategoria)
    .map(([cat, itens]) => `${nomesCat[cat] || cat}:\n${itens.map((i) => `- gal:${i.id} | ${i.nome}`).join('\n')}`)
    .join('\n\n')
  const linhasProprios = proprios.map((e) => `- lib:${e.id} | ${e.nome}`).join('\n')
  return {
    texto: `${linhasProprios ? `Vídeos próprios do Dr. Pablo:\n${linhasProprios}\n\n` : ''}${linhasGaleria}`,
    ids: [...proprios.map((e) => `lib:${e.id}`), ...(galeria?.itens || []).map((i) => `gal:${i.id}`)]
  }
}

function montarCampos(campos) {
  return campos
    .filter((c) => c.ativo)
    .map((c) => {
      const op = (c.opcoes || []).length ? ` | opções: ${c.opcoes.join('; ')}` : ''
      return `- ${c.chave} | ${TIPOS[c.tipo] || c.tipo} | ${c.rotulo}${op}`
    })
    .join('\n')
}

const REGRAS = `Você é um fisioterapeuta com doutorado, referência em coluna vertebral, dor lombar aguda e crônica e quiropraxia baseada em evidências. Você apoia o Dr. Pablo Andrade (fisioterapeuta, quiropraxia, Três Pontas/MG) a transformar o relato de uma avaliação em um relatório clínico enxuto e, principalmente, em uma prescrição de exercícios.

REGRAS
1. Apoio à decisão clínica: use hipóteses funcionais ("compatível com", "sugere"), nunca diagnóstico fechado. A decisão final é do Dr. Pablo.
2. Nunca prometa cura, prazo ou resultado garantido.
3. Linguagem sobre a coluna: use "segmento tratado" ou "segmento com restrição de mobilidade". Nunca use "vértebra fora do lugar", "deslocada" ou "colocada no lugar".
4. Sinais de alerta (bandeiras vermelhas) primeiro: síndrome da cauda equina (anestesia em sela, alteração urinária ou intestinal, perda de força progressiva), suspeita de fratura (trauma, osteoporose, corticoide), infecção (febre), neoplasia (histórico de câncer, perda de peso sem explicação, dor noturna que não alivia), déficit neurológico. Se houver, destaque e recomende encaminhamento médico.
5. Considere bandeiras amarelas (medo de se movimentar, catastrofização, estresse, sono, trabalho).
6. Não invente dados. O que faltar vai em "Pontos a investigar".
7. Prescrição é a parte mais importante. Escolha SOMENTE do CATÁLOGO abaixo, usando o id exato; nunca invente exercício nem id. Monte entre 4 e 7 exercícios adequados à fase (aguda: alívio, mobilidade suave, isometria; subaguda e crônica: controle motor e fortalecimento progressivo de core, glúteos e quadril). Prefira exercícios simples, que o paciente consiga fazer em casa sem aparelho, a menos que o relato diga que ele treina em academia. Para cada um: séries, repetições ou tempo, como fazer (1 ou 2 frases simples, para o paciente) e um cuidado ou observação curta.
8. Seja direto. O relatório deve ser enxuto (até uns 250 palavras no total), em tópicos, com estes títulos: ## Resumo, ## Sinais de alerta, ## Hipóteses funcionais, ## Prescrição e progressão, ## Pontos a investigar.
9. Quando receber uma RESPOSTA ANTERIOR e um AJUSTE PEDIDO, refaça a resposta completa aplicando o ajuste e mantendo o resto.`

const FORMATO_MANUAL = `FORMATO DA RESPOSTA (sempre o mesmo, inclusive quando eu pedir ajustes)
Parte 1: o relatório, com os títulos da regra 8.
Parte 2: no final, UM único bloco de código \`\`\`json com esta estrutura:
{
  "avaliacao": { "<chave>": <valor> },
  "alertas": ["frase curta", "..."],
  "exercicios": [ { "id": "gal:... ou lib:...", "series": 3, "reps": "10 ou 30 s", "instrucoes": "como fazer, em 1 ou 2 frases", "observacao": "cuidado curto" } ]
}
Em "avaliacao", use só as chaves de CAMPOS, no formato indicado em cada uma, e omita o que não foi informado. "alertas" fica vazio [] se não houver.`

const FORMATO_API = `FORMATO DA RESPOSTA
Responda preenchendo o JSON definido:
- "relatorio": o relatório em markdown, com os títulos da regra 8.
- "alertas": sinais de alerta em frases curtas ([] se não houver).
- "avaliacao": uma chave para cada campo de CAMPOS, no formato indicado; use null quando o relato não informar.
- "exercicios": a prescrição, com ids do CATÁLOGO.`

// Parte fixa (igual para todos os pacientes): fica em cache na API.
export function montarSistema({ campos, biblioteca, galeria, modo = 'manual' }) {
  const catalogo = montarCatalogo(biblioteca, galeria)
  return `${REGRAS}

${modo === 'api' ? FORMATO_API : FORMATO_MANUAL}

CAMPOS DA AVALIAÇÃO (chave | formato | rótulo | opções)
${montarCampos(campos)}

CATÁLOGO DE EXERCÍCIOS (id | nome). Todos têm animação. Use somente estes ids.
${catalogo.texto}`
}

// Parte variável: o paciente, o relato e, se houver, o ajuste pedido.
export function montarMensagem({ paciente, avaliacaoAnterior, totalSessoes, relato, anterior, ajuste, modo = 'manual' }) {
  const historico = avaliacaoAnterior?.respostas && Object.keys(avaliacaoAnterior.respostas).length
    ? `Avaliação anterior (${avaliacaoAnterior.data}): ${JSON.stringify(avaliacaoAnterior.respostas)}`
    : 'Sem avaliação anterior registrada.'
  const cabecalho = `PACIENTE
Primeiro nome: ${paciente.nome.trim().split(/\s+/)[0]}
Idade: ${idade(paciente.data_nascimento) ?? 'não informada'} anos
Sessões já realizadas: ${totalSessoes}
${historico}`
  let corpo
  if (relato?.trim()) {
    corpo = `RELATO DA AVALIAÇÃO (ditado/escrito pelo Dr. Pablo):\n"""\n${relato.trim()}\n"""`
    if (anterior && ajuste?.trim()) {
      corpo += `\n\nRESPOSTA ANTERIOR:\n${JSON.stringify(anterior)}\n\nAJUSTE PEDIDO PELO DR. PABLO:\n"""\n${ajuste.trim()}\n"""`
    }
    corpo += modo === 'api' ? '' : '\n\nAgora gere o relatório e o bloco JSON.'
  } else {
    corpo = 'Na próxima mensagem vou ditar ou escrever o relato da avaliação. Por enquanto, responda apenas: "Pronto, pode enviar o relato da avaliação."'
  }
  return `${cabecalho}\n\n${corpo}`
}

// Texto único para colar no app do Claude (ponte manual).
export function montarPrompt(args) {
  return `${montarSistema({ ...args, modo: 'manual' })}\n\n${montarMensagem({ ...args, modo: 'manual' })}`
}

// Esquema JSON da resposta (modo API): garante formato e ids válidos.
export function montarEsquema({ campos, biblioteca, galeria }, { idsLivres = false } = {}) {
  const nulo = (schema) => ({ anyOf: [schema, { type: 'null' }] })
  const porTipo = (c) => {
    const ops = c.opcoes || []
    switch (c.tipo) {
      case 'escala': return { type: 'integer', description: '0 a 10' }
      case 'lista': return ops.length ? { type: 'string', enum: ops } : { type: 'string' }
      case 'multipla': return { type: 'array', items: { type: 'string' } }
      case 'sim_nao': return { type: 'string', enum: ['sim', 'nao'] }
      case 'sim_nao_texto':
        return {
          type: 'object',
          additionalProperties: false,
          required: ['resposta', 'opcoes', 'detalhe'],
          properties: { resposta: { type: 'string', enum: ['sim', 'nao'] }, opcoes: { type: 'array', items: { type: 'string' } }, detalhe: { type: 'string' } }
        }
      default: return { type: 'string' }
    }
  }
  const ativos = campos.filter((c) => c.ativo)
  const ids = montarCatalogo(biblioteca, galeria).ids
  return {
    type: 'object',
    additionalProperties: false,
    required: ['relatorio', 'alertas', 'avaliacao', 'exercicios'],
    properties: {
      relatorio: { type: 'string' },
      alertas: { type: 'array', items: { type: 'string' } },
      avaliacao: {
        type: 'object',
        additionalProperties: false,
        required: ativos.map((c) => c.chave),
        properties: Object.fromEntries(ativos.map((c) => [c.chave, nulo(porTipo(c))]))
      },
      exercicios: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['id', 'series', 'reps', 'instrucoes', 'observacao'],
          properties: {
            id: idsLivres ? { type: 'string' } : { type: 'string', enum: ids },
            series: { type: 'integer' },
            reps: { type: 'string' },
            instrucoes: { type: 'string' },
            observacao: { type: 'string' }
          }
        }
      }
    }
  }
}

// Converte a resposta da API no mesmo formato da ponte manual.
export function normalizarRespostaApi(dados) {
  const avaliacao = Object.fromEntries(Object.entries(dados?.avaliacao || {}).filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length)))
  return {
    relatorio: String(dados?.relatorio || '').trim(),
    dados: {
      avaliacao,
      alertas: (dados?.alertas || []).filter((a) => typeof a === 'string' && a.trim()),
      exercicios: (dados?.exercicios || []).filter((e) => e && typeof e.id === 'string').map((e) => ({ ...e, id: e.id.trim() }))
    }
  }
}

// Lê o texto colado: separa o relatório do bloco JSON.
export function lerResposta(texto) {
  const bruto = (texto || '').trim()
  if (!bruto) return { erro: 'Cole a resposta do Claude.' }
  const blocos = [...bruto.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)]
  let jsonTexto = blocos.length ? blocos[blocos.length - 1][1] : null
  let relatorio = blocos.length ? bruto.slice(0, blocos[blocos.length - 1].index).trim() : bruto
  if (!jsonTexto) {
    const ini = bruto.indexOf('{')
    const fim = bruto.lastIndexOf('}')
    if (ini >= 0 && fim > ini) {
      jsonTexto = bruto.slice(ini, fim + 1)
      relatorio = bruto.slice(0, ini).trim()
    }
  }
  if (!jsonTexto) return { erro: 'Não encontrei o bloco de dados (```json). Peça ao Claude: "reenvie o bloco JSON completo".' }
  let dados
  try {
    dados = JSON.parse(jsonTexto.trim())
  } catch {
    return { erro: 'O bloco de dados veio incompleto ou com erro. Peça ao Claude: "reenvie o bloco JSON completo e válido".' }
  }
  return {
    relatorio: relatorio.replace(/\n*Parte 2[^\n]*$/i, '').trim(),
    dados: {
      avaliacao: dados.avaliacao && typeof dados.avaliacao === 'object' ? dados.avaliacao : {},
      alertas: Array.isArray(dados.alertas) ? dados.alertas.filter((a) => typeof a === 'string' && a.trim()) : [],
      exercicios: Array.isArray(dados.exercicios) ? dados.exercicios.filter((e) => e && typeof e.id === 'string').map((e) => ({ ...e, id: e.id.trim() })) : []
    }
  }
}

// Mantém só respostas compatíveis com os campos configurados.
export function filtrarAvaliacao(avaliacao, campos) {
  const porChave = Object.fromEntries(campos.map((c) => [c.chave, c]))
  const out = {}
  for (const [k, v] of Object.entries(avaliacao || {})) {
    const c = porChave[k]
    if (!c || v == null || v === '') continue
    if (c.tipo === 'escala') {
      const n = Number(v)
      if (Number.isFinite(n)) out[k] = Math.max(0, Math.min(10, Math.round(n)))
    } else if (c.tipo === 'multipla') {
      out[k] = (Array.isArray(v) ? v : [v]).map(String).filter(Boolean)
    } else if (c.tipo === 'sim_nao') {
      out[k] = String(v).toLowerCase().startsWith('s') ? 'sim' : 'nao'
    } else if (c.tipo === 'sim_nao_texto') {
      const o = typeof v === 'object' ? v : { resposta: String(v) }
      out[k] = {
        resposta: String(o.resposta || '').toLowerCase().startsWith('s') ? 'sim' : 'nao',
        opcoes: Array.isArray(o.opcoes) ? o.opcoes.map(String) : [],
        detalhe: o.detalhe ? String(o.detalhe) : ''
      }
    } else {
      out[k] = Array.isArray(v) ? v.join(', ') : String(v)
    }
  }
  return out
}
