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
// Cada exercício ganha um código curto (g12, p3) para gastar menos tokens;
// `mapa` converte o código de volta para o id completo (gal:... / lib:...).
// Grupos que não entram na prescrição terapêutica da coluna (só no treino A/B/C).
const FORA_DA_TERAPIA = ['biceps-antebraco', 'triceps', 'peitoral']

export function montarCatalogo(biblioteca, galeria, { terapia = false } = {}) {
  const videosGaleria = new Set((galeria?.itens || []).map((i) => i.video))
  const proprios = (biblioteca || []).filter((e) => e.ativo && e.video_path && !videosGaleria.has(e.video_path))
  const nomesCat = Object.fromEntries((galeria?.categorias || []).map((c) => [c.id, c.nome]))
  const mapa = {}
  const linhasProprios = proprios.map((e, i) => {
    mapa[`p${i + 1}`] = `lib:${e.id}`
    return `p${i + 1} ${e.nome}`
  })
  const porCategoria = {}
  const ids = Object.keys(mapa)
  ;(galeria?.itens || []).forEach((item, i) => {
    mapa[`g${i + 1}`] = `gal:${item.id}` // o mapa tem todos; a lista abaixo pode ser filtrada
    if (terapia && FORA_DA_TERAPIA.includes(item.categoria)) return
    ids.push(`g${i + 1}`)
    ;(porCategoria[item.categoria] ||= []).push(`g${i + 1} ${item.nome}`)
  })
  const linhasGaleria = Object.entries(porCategoria).map(([cat, l]) => `${nomesCat[cat] || cat}:\n${l.join('\n')}`).join('\n\n')
  return {
    texto: `${linhasProprios.length ? `Vídeos próprios do Dr. Pablo:\n${linhasProprios.join('\n')}\n\n` : ''}${linhasGaleria}`,
    ids,
    mapa
  }
}

// Converte os códigos curtos devolvidos pela IA nos ids completos.
export function expandirIds(exercicios, { biblioteca, galeria }) {
  const { mapa } = montarCatalogo(biblioteca, galeria)
  return (exercicios || []).map((e) => ({ ...e, id: mapa[String(e.id).trim()] || String(e.id).trim() }))
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
7. Prescrição é a parte mais importante. Estes são os EXERCÍCIOS DO DR. PABLO (prescrição terapêutica). NÃO existe catálogo de animações aqui e você NÃO deve sugerir exercícios de academia ou de máquina. Monte entre 4 e 7 exercícios adequados à fase (aguda: alívio, mobilidade suave, isometria; subaguda e crônica: controle motor e fortalecimento progressivo de core, glúteos e quadril), que o paciente faça em casa, sem aparelho. Se um exercício da BIBLIOTECA DO DR. PABLO servir, use o código dele (ex.: p3) em "codigo" e o mesmo nome; senão, "codigo": "novo" e um nome curto e padrão em português. Para cada um: séries; em "reps", só as repetições ou o tempo de UMA série (ex.: "10", "8 por lado", "20 s"), sem repetir o número de séries; "instrucoes" passo a passo em 2 a 4 frases simples para o paciente; "observacao" com o principal cuidado.
8. Seja direto. O relatório deve ser enxuto (até uns 250 palavras no total), em tópicos, com estes títulos: ## Resumo, ## Sinais de alerta, ## Hipóteses funcionais, ## Prescrição e progressão, ## Pontos a investigar.
9. Quando receber uma RESPOSTA ANTERIOR e um AJUSTE PEDIDO, refaça a resposta completa aplicando o ajuste e mantendo o resto.`

const FORMATO_MANUAL = `FORMATO DA RESPOSTA (sempre o mesmo, inclusive quando eu pedir ajustes)
Parte 1: o relatório, com os títulos da regra 8.
Parte 2: no final, UM único bloco de código \`\`\`json com esta estrutura:
{
  "avaliacao": { "<chave>": <valor> },
  "alertas": ["frase curta", "..."],
  "exercicios": [ { "codigo": "p3 ou novo", "nome": "nome do exercício", "series": 3, "reps": "10 ou 30 s", "instrucoes": "como fazer, em 2 a 4 frases", "observacao": "cuidado curto" } ]
}
Em "avaliacao", use só as chaves de CAMPOS, no formato indicado em cada uma, e omita o que não foi informado. "alertas" fica vazio [] se não houver.`

const FORMATO_API = `FORMATO DA RESPOSTA
Responda preenchendo o JSON definido:
- "relatorio": o relatório em markdown, com os títulos da regra 8.
- "alertas": sinais de alerta em frases curtas ([] se não houver).
- "avaliacao": uma chave para cada campo de CAMPOS, no formato indicado; use null quando o relato não informar.
- "exercicios": os exercícios do Dr. Pablo, com "codigo" da biblioteca (ou "novo") e "nome".`

// Regras extras quando o Dr. Pablo anexa fotos posturais (só no modo API).
const POSTURA = `ANÁLISE POSTURAL (há fotos da postura)
10. A análise FOTO A FOTO já foi feita (pontos anatômicos, medidas em graus e em % da altura em relação à linha de prumo, e achados) e vem na mensagem, em ANÁLISE DAS FOTOS. Consolide em "postura": um resumo do padrão postural e a lista de achados SEM repetir o mesmo achado de fotos diferentes, citando a medida quando houver (ex.: "ombro direito mais alto, inclinação de 3,2°"). Em "vista", só as fotos onde aparece, curto (ex.: "Fotos 3 e 6"). Inclua o resultado do teste de Adams quando houver. Se duas fotos discordarem, use a mais confiável e cite a divergência em "limitacoes" (no máximo 3 frases curtas).
11. Use linguagem de observação ("aparente", "sugere", "na foto"), nunca diagnóstico fechado. Um desvio lateral é "desvio lateral aparente", não "escoliose". Postura sozinha não explica a dor: em "relevancia", relacione o achado com a queixa quando fizer sentido e diga quando a relação não for clara.
12. Em "limitacoes", reúna as limitações das fotos (ângulo e altura da câmera, distância, roupa, fotos inadequadas) e lembre que as medidas por foto são estimativas.
13. A prescrição responde ao relato E aos achados posturais relevantes. Em cada achado relevante, liste em "exercicios" os nomes EXATOS dos exercícios da prescrição que o trabalham ([] se nenhum).
14. O detalhe completo vai em "postura". No relatório, inclua o título ## Análise postural logo depois de ## Resumo com no máximo 4 tópicos curtos (só os achados mais relevantes, sem repetir a lista inteira). O relatório continua enxuto (até umas 300 palavras). Em "postura", escreva "achado" e "relevancia" com uma frase objetiva cada.
15. Se não houver relato escrito, baseie-se nas fotos e deixe null os campos da avaliação que dependem da conversa com o paciente.`

// Parte fixa (igual para todos os pacientes).
export function montarSistema({ campos, biblioteca, modo = 'manual', fotos = [] }) {
  return `${REGRAS}
${modo === 'api' && fotos.length ? `\n${POSTURA}\n` : ''}
${modo === 'api' ? FORMATO_API : FORMATO_MANUAL}${modo === 'api' && fotos.length ? '\n- "postura": a análise postural das fotos (regras 10 a 14).' : ''}

CAMPOS DA AVALIAÇÃO (chave | formato | rótulo | opções)
${montarCampos(campos)}

BIBLIOTECA DO DR. PABLO (código e nome)
${listaBibliotecaPropria(biblioteca)}`
}

// Parte variável: o paciente, o relato e, se houver, o ajuste pedido.
export function montarMensagem({ paciente, avaliacaoAnterior, totalSessoes, relato, anterior, ajuste, modo = 'manual', fotos = [], analiseFotos = '' }) {
  const historico = avaliacaoAnterior?.respostas && Object.keys(avaliacaoAnterior.respostas).length
    ? `Avaliação anterior (${avaliacaoAnterior.data}): ${JSON.stringify(avaliacaoAnterior.respostas)}`
    : 'Sem avaliação anterior registrada.'
  const cabecalho = `PACIENTE
Primeiro nome: ${paciente.nome.trim().split(/\s+/)[0]}
Idade: ${idade(paciente.data_nascimento) ?? 'não informada'} anos
Sessões já realizadas: ${totalSessoes}
${historico}`
  const textoFotos = fotos.length ? `\n\nANÁLISE DAS FOTOS (${fotos.length} fotos):\n${analiseFotos}` : ''
  let corpo
  if (relato?.trim() || (modo === 'api' && fotos.length)) {
    corpo = relato?.trim()
      ? `RELATO DA AVALIAÇÃO (ditado/escrito pelo Dr. Pablo):\n"""\n${relato.trim()}\n"""${textoFotos}`
      : `SEM RELATO ESCRITO. Analise as fotos e monte a prescrição a partir dos achados posturais.${textoFotos}`
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
export function montarEsquema({ campos, biblioteca, comFotos = false }) {
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
  return {
    type: 'object',
    additionalProperties: false,
    required: ['relatorio', 'alertas', 'avaliacao', 'exercicios', ...(comFotos ? ['postura'] : [])],
    properties: {
      relatorio: { type: 'string' },
      alertas: { type: 'array', items: { type: 'string' } },
      avaliacao: {
        type: 'object',
        additionalProperties: false,
        required: ativos.map((c) => c.chave),
        properties: Object.fromEntries(ativos.map((c) => [c.chave, nulo(porTipo(c))]))
      },
      exercicios: esquemaExerciciosProprios(biblioteca),
      ...(comFotos ? { postura: ESQUEMA_POSTURA } : {})
    }
  }
}

export const REGIOES_POSTURA = ['Cabeça e pescoço', 'Ombros e escápulas', 'Coluna torácica', 'Coluna lombar', 'Pelve', 'Quadril', 'Joelhos', 'Pés e tornozelos', 'Tronco (alinhamento geral)']
export const INTENSIDADES = ['Leve', 'Moderada', 'Acentuada']

const ESQUEMA_POSTURA = {
  type: 'object',
  additionalProperties: false,
  required: ['resumo', 'achados', 'limitacoes'],
  properties: {
    resumo: { type: 'string', description: '2 a 3 frases com o padrão postural geral' },
    achados: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['regiao', 'achado', 'lado', 'intensidade', 'vista', 'relevancia', 'exercicios'],
        properties: {
          regiao: { type: 'string', enum: REGIOES_POSTURA },
          achado: { type: 'string', description: 'o que se observa, em detalhe' },
          lado: { type: 'string', enum: ['Direito', 'Esquerdo', 'Bilateral', 'Central'] },
          intensidade: { type: 'string', enum: INTENSIDADES },
          vista: { type: 'string', description: 'em qual foto/vista aparece' },
          relevancia: { type: 'string', description: 'relação com a queixa, ou "relação não clara"' },
          exercicios: { type: 'array', items: { type: 'string' }, description: 'nomes exatos dos exercícios prescritos que trabalham o achado' }
        }
      }
    },
    limitacoes: { type: 'string', description: 'o que as fotos não permitem avaliar' }
  }
}

// Limpa a análise postural devolvida (ou null se não houver).
export function normalizarPostura(p) {
  if (!p || typeof p !== 'object') return null
  const achados = (Array.isArray(p.achados) ? p.achados : [])
    .filter((a) => a && String(a.achado || '').trim())
    .map((a) => ({
      regiao: String(a.regiao || 'Tronco (alinhamento geral)'),
      achado: String(a.achado).trim(),
      lado: String(a.lado || ''),
      intensidade: INTENSIDADES.includes(a.intensidade) ? a.intensidade : 'Leve',
      vista: String(a.vista || ''),
      relevancia: String(a.relevancia || ''),
      exercicios: Array.isArray(a.exercicios) ? a.exercicios.map(String).filter(Boolean) : []
    }))
  // Ordem de cima para baixo no corpo.
  achados.sort((x, y) => REGIOES_POSTURA.indexOf(x.regiao) - REGIOES_POSTURA.indexOf(y.regiao))
  return { resumo: String(p.resumo || '').trim(), achados, limitacoes: String(p.limitacoes || '').trim() }
}

// Converte a resposta da API no mesmo formato da ponte manual.
export function normalizarRespostaApi(dados) {
  const avaliacao = Object.fromEntries(Object.entries(dados?.avaliacao || {}).filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length)))
  return {
    relatorio: String(dados?.relatorio || '').trim(),
    dados: {
      avaliacao,
      alertas: (dados?.alertas || []).filter((a) => typeof a === 'string' && a.trim()),
      exercicios: (dados?.exercicios || []).filter((e) => e && (e.nome || e.codigo)),
      postura: normalizarPostura(dados?.postura)
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
      exercicios: Array.isArray(dados.exercicios) ? dados.exercicios.filter((e) => e && (e.nome || e.codigo)) : []
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

// ---------------------------------------------------------------- treino A/B/C

export function montarSistemaTreino({ galeria }) {
  const catalogo = montarCatalogo([], galeria)
  return `Você é um fisioterapeuta com doutorado, especialista em coluna e em retorno ao exercício após dor lombar. Você monta os EXERCÍCIOS PARA ACADEMIA: uma SUGESTÃO de treino dividido em A, B e C para pacientes do Dr. Pablo Andrade (fisioterapeuta, quiropraxia, Três Pontas/MG).

SEPARAÇÃO OBRIGATÓRIA
- Esta seção usa SOMENTE as animações do CATÁLOGO abaixo (academia). Cada exercício precisa ter o código do catálogo.
- Os exercícios terapêuticos de casa do Dr. Pablo são outra seção do sistema; não repita aqui exercícios de reabilitação que não estejam no catálogo.

REGRAS
1. É uma sugestão de referência, não uma prescrição obrigatória. Nunca prometa resultado.
2. Use SOMENTE exercícios do CATÁLOGO, pelo código exato (ex.: g12) no campo "id". Nunca invente exercício nem código.
3. Monte 3 treinos (A, B e C), cada um com um foco claro (ex.: inferiores e glúteos; costas e core; peito, ombros e braços) e entre 5 e 7 exercícios.
4. Respeite a condição da coluna: se houver dor lombar recente ou alta, evite carga axial pesada e flexão de tronco com carga (agachamento livre pesado, levantamento terra, bom dia com barra, desenvolvimento com barra em pé), prefira máquinas, apoio, unilaterais e core anti-movimento. Inclua pelo menos 1 exercício de core em cada treino.
5. Volume moderado: 2 a 4 séries. Em "reps", só as repetições ou o tempo de UMA série (ex.: "12", "10 por lado", "30 s"), sem repetir o número de séries. Observação curta e prática por exercício.
6. Considere a diretriz do Dr. Pablo, se houver (frequência, objetivo, limitações).

FORMATO
Responda preenchendo o JSON definido:
- "treinos": exatamente 3 itens, letras A, B e C, com "foco" e "itens".
- "orientacoes": 2 ou 3 frases curtas para o paciente (aquecimento, progressão, quando parar).

CATÁLOGO DE EXERCÍCIOS (código e nome). Todos têm animação. Use somente estes códigos.
${catalogo.texto}`
}

export function montarMensagemTreino({ paciente, avaliacaoAnterior, prescricao, diretriz, postura }) {
  const av = avaliacaoAnterior?.respostas && Object.keys(avaliacaoAnterior.respostas).length
    ? `Avaliação mais recente (${avaliacaoAnterior.data}): ${JSON.stringify(avaliacaoAnterior.respostas)}`
    : 'Sem avaliação registrada.'
  const exs = prescricao?.length ? prescricao.map((p) => p.exercicios?.nome || p.nome).filter(Boolean).join(', ') : 'nenhum'
  const textoPostura = postura?.achados?.length
    ? `\nANÁLISE POSTURAL (feita por fotos; considere ao escolher e equilibrar os exercícios, sem tratar como diagnóstico):\n${postura.resumo ? `${postura.resumo}\n` : ''}${postura.achados.map((a) => `- ${a.regiao} (${a.lado}, ${a.intensidade.toLowerCase()}): ${a.achado}`).join('\n')}`
    : ''
  return `PACIENTE
Primeiro nome: ${paciente.nome.trim().split(/\s+/)[0]}
Idade: ${idade(paciente.data_nascimento) ?? 'não informada'} anos
${av}
Exercícios terapêuticos atuais: ${exs}${textoPostura}

DIRETRIZ DO DR. PABLO:
"""
${diretriz?.trim() || 'Sem diretriz específica. Monte um treino seguro e equilibrado para academia.'}
"""`
}

export function montarEsquemaTreino({ galeria }, { idsLivres = false } = {}) {
  const ids = montarCatalogo([], galeria).ids
  return {
    type: 'object',
    additionalProperties: false,
    required: ['treinos', 'orientacoes'],
    properties: {
      orientacoes: { type: 'string' },
      treinos: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['letra', 'foco', 'itens'],
          properties: {
            letra: { type: 'string', enum: ['A', 'B', 'C'] },
            foco: { type: 'string' },
            itens: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['id', 'series', 'reps', 'observacao'],
                properties: {
                  id: idsLivres ? { type: 'string' } : { type: 'string', enum: ids },
                  series: { type: 'integer' },
                  reps: { type: 'string' },
                  observacao: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }
}

// Converte a resposta da IA em treinos com nome e vídeo (só ids que existem na galeria).
export function treinosDaResposta(dados, galeria) {
  const porId = Object.fromEntries((galeria?.itens || []).map((i) => [`gal:${i.id}`, i]))
  const { mapa } = montarCatalogo([], galeria)
  const letras = ['A', 'B', 'C']
  return letras.map((letra) => {
    const t = (dados?.treinos || []).find((x) => x.letra === letra) || { foco: '', itens: [] }
    return {
      letra,
      foco: t.foco || '',
      itens: (t.itens || [])
        .map((i) => {
          const cod = String(i.id || '').trim()
          const g = porId[mapa[cod] || cod]
          return g && { id: `gal:${g.id}`, nome: g.nome, video: g.video, series: Number(i.series) || 3, reps: String(i.reps || '12'), observacao: i.observacao || '' }
        })
        .filter(Boolean)
    }
  })
}

// ---------------------------------------------------------------- gerar exercícios (prescrição livre)
// A IA sugere livremente; se o exercício já existe na biblioteca do Dr. Pablo, usa o código dele
// (para reaproveitar o vídeo gravado). Exercícios novos voltam com código "novo".

// Item da biblioteca que usa animação da galeria (academia). Nunca entra nos exercícios do Dr. Pablo.
export function ehGaleria(e) {
  return String(e?.video_path || '').startsWith('galeria/')
}

function bibliotecaComCodigos(biblioteca) {
  return (biblioteca || []).filter((e) => e.ativo && !ehGaleria(e)).map((e, i) => ({ codigo: `p${i + 1}`, exercicio: e }))
}

function listaBibliotecaPropria(biblioteca) {
  const l = bibliotecaComCodigos(biblioteca).map(({ codigo, exercicio }) => `${codigo} ${exercicio.nome}${exercicio.video_path ? ' (já tem vídeo do Dr. Pablo)' : ''}`)
  return l.length ? l.join('\n') : '(vazia: use "codigo": "novo")'
}

function esquemaExerciciosProprios(biblioteca) {
  return {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['codigo', 'nome', 'series', 'reps', 'instrucoes', 'observacao'],
      properties: {
        codigo: { type: 'string', enum: [...bibliotecaComCodigos(biblioteca).map((b) => b.codigo), 'novo'] },
        nome: { type: 'string' },
        series: { type: 'integer' },
        reps: { type: 'string' },
        instrucoes: { type: 'string' },
        observacao: { type: 'string' }
      }
    }
  }
}

// Regras da análise postural quando a prescrição é gerada pela ficha (sem relatório).
const POSTURA_EXERCICIOS = `ANÁLISE POSTURAL (há fotos da postura)
7. A análise FOTO A FOTO já foi feita (pontos anatômicos, medidas em graus e em % da altura em relação à linha de prumo, e achados) e vem na mensagem, em ANÁLISE DAS FOTOS. Consolide em "postura": um resumo do padrão postural e a lista de achados SEM repetir o mesmo achado de fotos diferentes, citando a medida quando houver (ex.: "ombro direito mais alto, inclinação de 3,2°"). Em "vista", só as fotos onde aparece, curto (ex.: "Fotos 3 e 6"). Inclua o resultado do teste de Adams quando houver. Se duas fotos discordarem, use a mais confiável e cite a divergência em "limitacoes" (no máximo 3 frases curtas).
8. Use linguagem de observação ("aparente", "sugere", "na foto"), nunca diagnóstico fechado. Um desvio lateral é "desvio lateral aparente", não "escoliose". Postura sozinha não explica a dor: em "relevancia", relacione com a avaliação quando fizer sentido e diga quando a relação não for clara. "achado" e "relevancia" com uma frase objetiva cada.
9. Em "limitacoes", reúna as limitações das fotos (ângulo e altura da câmera, distância, roupa, fotos inadequadas) e lembre que as medidas por foto são estimativas.
10. A prescrição responde à avaliação E aos achados posturais relevantes. Em cada achado, liste em "exercicios" os nomes EXATOS dos exercícios desta prescrição que o trabalham ([] se nenhum).
11. Se a avaliação estiver vazia, baseie-se nas fotos.`

export function montarSistemaExercicios({ biblioteca, comFotos = false }) {
  return `Você é um fisioterapeuta com doutorado, referência em coluna vertebral, dor lombar e quiropraxia baseada em evidências. Com base na avaliação feita pelo Dr. Pablo Andrade (fisioterapeuta, Três Pontas/MG), você monta os EXERCÍCIOS DO DR. PABLO: a prescrição terapêutica que o paciente faz em casa.

SEPARAÇÃO OBRIGATÓRIA
- Estes são exercícios terapêuticos do fisioterapeuta, feitos em casa, sem aparelho. O Dr. Pablo grava os vídeos deles.
- NÃO sugira exercícios de academia, de máquina, com barra ou com carga externa. Treino de academia é outra seção do sistema, montada à parte.
- Use apenas a BIBLIOTECA DO DR. PABLO abaixo ou crie um exercício novo. Não existe outro catálogo.

REGRAS
1. Monte entre 4 e 7 exercícios adequados à fase (aguda: alívio, mobilidade suave, isometria; subaguda e crônica: controle motor e fortalecimento progressivo de core, glúteos e quadril).
2. Nome: curto e padrão em português, como um fisioterapeuta brasileiro chamaria (ex.: "Ponte de glúteo", "Prancha lateral com joelhos apoiados", "Gato e camelo").
3. Se um exercício da biblioteca servir, use o código dele em "codigo" e o MESMO nome; prefira os que já têm vídeo. Para um exercício que não está na biblioteca, "codigo": "novo".
4. Para cada exercício: séries; em "reps", só as repetições ou o tempo de UMA série (ex.: "10", "8 por lado", "20 s"); "instrucoes" passo a passo em 2 a 4 frases simples, para o paciente entender sozinho; "observacao" com o principal cuidado ou erro a evitar.
5. Nunca prometa cura, prazo ou resultado. Não use "vértebra fora do lugar", "deslocada" ou "colocada no lugar".
6. "orientacao": 1 ou 2 frases para o paciente sobre frequência e quando parar.
${comFotos ? `\n${POSTURA_EXERCICIOS}\n` : ''}
BIBLIOTECA DO DR. PABLO (código e nome)
${listaBibliotecaPropria(biblioteca)}`
}

export function montarMensagemExercicios({ paciente, campos, respostas, notas, fotos = [], analiseFotos = '' }) {
  const porChave = Object.fromEntries((campos || []).map((c) => [c.chave, c]))
  const linhas = Object.entries(respostas || {})
    .filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length))
    .map(([k, v]) => {
      const rotulo = porChave[k]?.rotulo || k
      let valor = v
      if (Array.isArray(v)) valor = v.join(', ')
      else if (v && typeof v === 'object') valor = `${v.resposta === 'sim' ? 'Sim' : 'Não'}${[...(v.opcoes || []), v.detalhe].filter(Boolean).length ? `: ${[...(v.opcoes || []), v.detalhe].filter(Boolean).join(', ')}` : ''}`
      return `- ${rotulo}: ${valor}`
    })
    .join('\n')
  return `PACIENTE
Primeiro nome: ${paciente.nome.trim().split(/\s+/)[0]}
Idade: ${idade(paciente.data_nascimento) ?? 'não informada'} anos

AVALIAÇÃO
${linhas || '(sem respostas)'}

O QUE O DR. PABLO QUER PRIORIZAR:
"""
${notas?.trim() || 'Sem observação extra.'}
"""${fotos.length ? `\n\nANÁLISE DAS FOTOS (${fotos.length} fotos):\n${analiseFotos}` : ''}`
}

export function montarEsquemaExercicios({ biblioteca, comFotos = false }) {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['exercicios', 'orientacao', ...(comFotos ? ['postura'] : [])],
    properties: {
      orientacao: { type: 'string' },
      exercicios: esquemaExerciciosProprios(biblioteca),
      ...(comFotos ? { postura: ESQUEMA_POSTURA } : {})
    }
  }
}

// ---------------------------------------------------------------- refazer só a análise postural
// Usado no botão "Refazer análise postural" da ficha: mantém os exercícios já prescritos.

export function montarSistemaConsolidacao() {
  return `Você é um fisioterapeuta com doutorado em biomecânica e avaliação postural, apoiando o Dr. Pablo Andrade (fisioterapeuta, Três Pontas/MG). A análise FOTO A FOTO já foi feita (pontos anatômicos, medidas em graus e em % em relação à linha de referência, e achados) e vem na mensagem. Consolide em "postura".

REGRAS
1. "resumo": 2 ou 3 frases com o padrão postural geral, em linguagem clara.
2. "achados": um item por achado, SEM repetir o mesmo achado de fotos diferentes, citando a medida quando houver (ex.: "ombro direito mais alto, inclinação de 3,2°"). "achado" e "relevancia" com uma frase objetiva cada. Em "vista", só as fotos onde aparece, curto (ex.: "Fotos 3 e 6"). Inclua o resultado do teste de Adams quando houver.
3. Linguagem de observação ("aparente", "sugere"), nunca diagnóstico. Desvio lateral é "desvio lateral aparente", não "escoliose". Postura sozinha não explica a dor: em "relevancia", relacione com a avaliação quando fizer sentido e diga quando a relação não for clara.
4. Em "exercicios" de cada achado, use SOMENTE nomes da lista EXERCÍCIOS PRESCRITOS que trabalham aquele achado ([] se nenhum).
5. Se duas fotos discordarem, use a mais confiável e cite a divergência em "limitacoes". "limitacoes": no máximo 3 frases curtas (enquadramento, roupa, câmera) e a lembrança de que as medidas são estimativas.
6. Nunca prometa cura ou resultado. Não use "vértebra fora do lugar".`
}

export function montarMensagemConsolidacao({ paciente, campos, respostas, exercicios, analiseFotos }) {
  return `${montarMensagemExercicios({ paciente, campos, respostas, notas: '' }).replace(/\n\nO QUE O DR. PABLO QUER PRIORIZAR:[\s\S]*$/, '')}

EXERCÍCIOS PRESCRITOS
${exercicios.length ? exercicios.map((e) => `- ${e}`).join('\n') : '(nenhum)'}

ANÁLISE DAS FOTOS:
${analiseFotos}`
}

export function montarEsquemaConsolidacao() {
  return { type: 'object', additionalProperties: false, required: ['postura'], properties: { postura: ESQUEMA_POSTURA } }
}

const normalizarNome = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

// Liga cada sugestão a um exercício da biblioteca (pelo código ou pelo nome igual).
export function ligarSugestoes(dados, biblioteca) {
  const comCodigo = Object.fromEntries(bibliotecaComCodigos(biblioteca).map((b) => [b.codigo, b.exercicio]))
  const porNome = Object.fromEntries((biblioteca || []).filter((e) => !ehGaleria(e)).map((e) => [normalizarNome(e.nome), e]))
  return (dados?.exercicios || []).map((s) => {
    const e = comCodigo[s.codigo] || porNome[normalizarNome(s.nome)] || null
    return {
      nome: e?.nome || s.nome,
      series: Number(s.series) || 3,
      reps: String(s.reps || '10'),
      instrucoes: s.instrucoes || e?.instrucoes || '',
      observacao: s.observacao || '',
      exercicioId: e?.id || null,
      video: e?.video_path || null,
      incluir: true
    }
  })
}

export { normalizarNome }
