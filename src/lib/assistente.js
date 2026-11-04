// Ponte manual com o Claude: monta o texto para colar no app do Claude
// e lê a resposta (relatório + bloco JSON) colada de volta no painel.

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

export function montarPrompt({ paciente, campos, avaliacaoAnterior, totalSessoes, biblioteca, galeria, relato }) {
  const linhasCampos = campos
    .filter((c) => c.ativo)
    .map((c) => {
      const op = (c.opcoes || []).length ? ` | opções: ${c.opcoes.join('; ')}` : ''
      return `- ${c.chave} | ${TIPOS[c.tipo] || c.tipo} | ${c.rotulo}${op}`
    })
    .join('\n')

  const linhasBiblioteca = biblioteca.filter((e) => e.ativo).map((e) => `- lib:${e.id} | ${e.nome}`).join('\n')
  const nomesCat = Object.fromEntries((galeria?.categorias || []).map((c) => [c.id, c.nome]))
  const porCategoria = {}
  for (const i of galeria?.itens || []) (porCategoria[i.categoria] ||= []).push(i)
  const linhasGaleria = Object.entries(porCategoria)
    .map(([cat, itens]) => `${nomesCat[cat] || cat}:\n${itens.map((i) => `- gal:${i.id} | ${i.nome}`).join('\n')}`)
    .join('\n\n')

  const anterior = avaliacaoAnterior?.respostas && Object.keys(avaliacaoAnterior.respostas).length
    ? `Avaliação anterior (${avaliacaoAnterior.data}): ${JSON.stringify(avaliacaoAnterior.respostas)}`
    : 'Sem avaliação anterior registrada.'

  const parteRelato = relato?.trim()
    ? `RELATO DA AVALIAÇÃO (ditado/escrito pelo Dr. Pablo):\n"""\n${relato.trim()}\n"""\n\nAgora gere o relatório e o bloco JSON.`
    : 'Na próxima mensagem vou ditar ou escrever o relato da avaliação. Por enquanto, responda apenas: "Pronto, pode enviar o relato da avaliação."'

  return `Você é um fisioterapeuta com doutorado, referência em coluna vertebral, dor lombar aguda e crônica e quiropraxia baseada em evidências. Você vai apoiar o Dr. Pablo Andrade (fisioterapeuta, quiropraxia, Três Pontas/MG) a transformar o relato de uma avaliação em um relatório clínico detalhado e em sugestões de exercícios.

REGRAS
1. Apoio à decisão clínica: use hipóteses funcionais ("compatível com", "sugere"), nunca diagnóstico fechado. A decisão final é do Dr. Pablo.
2. Nunca prometa cura, prazo ou resultado garantido.
3. Linguagem sobre a coluna: use "segmento tratado" ou "segmento com restrição de mobilidade". Nunca use "vértebra fora do lugar", "deslocada" ou "colocada no lugar".
4. Sinais de alerta (bandeiras vermelhas) primeiro: síndrome da cauda equina (anestesia em sela, alteração urinária ou intestinal, perda de força progressiva), suspeita de fratura (trauma, osteoporose, corticoide), infecção (febre), neoplasia (histórico de câncer, perda de peso sem explicação, dor noturna que não alivia), déficit neurológico. Se houver, destaque e recomende encaminhamento médico.
5. Considere bandeiras amarelas (medo de se movimentar, catastrofização, estresse, sono, trabalho).
6. Não invente dados. O que faltar vai em "Pontos a investigar".
7. Exercícios: escolha SOMENTE do CATÁLOGO abaixo, usando o id exato. Prefira a biblioteca (lib:) e use a galeria (gal:) quando fizer sentido. Entre 3 e 6 exercícios, adequados à fase (aguda: alívio, mobilidade suave, isometria; subaguda e crônica: controle motor e fortalecimento progressivo de core, glúteos e quadril). Defina séries, repetições ou tempo, e uma observação curta para o paciente, em linguagem simples.

FORMATO DA RESPOSTA (sempre o mesmo, inclusive quando eu pedir ajustes)
Parte 1, relatório em português com estes títulos:
## Resumo do caso
## Sinais de alerta
## Achados da avaliação
## Hipóteses funcionais
## Raciocínio clínico
## Plano de tratamento sugerido
## Exercícios sugeridos e justificativa
## Orientações ao paciente
## Pontos a investigar

Parte 2, no final, UM único bloco de código \`\`\`json com esta estrutura:
{
  "avaliacao": { "<chave>": <valor> },
  "alertas": ["frase curta", "..."],
  "exercicios": [ { "id": "lib:... ou gal:...", "series": 3, "reps": "10 ou 30 s", "observacao": "texto curto" } ]
}
Em "avaliacao", use só as chaves de CAMPOS, no formato indicado em cada uma, e omita o que não foi informado. "alertas" fica vazio [] se não houver.

PACIENTE
Primeiro nome: ${paciente.nome.trim().split(/\s+/)[0]}
Idade: ${idade(paciente.data_nascimento) ?? 'não informada'} anos
Sessões já realizadas: ${totalSessoes}
${anterior}

CAMPOS DA AVALIAÇÃO (chave | formato | rótulo | opções)
${linhasCampos}

CATÁLOGO DE EXERCÍCIOS (id | nome)
Biblioteca do Dr. Pablo:
${linhasBiblioteca || '- (vazia)'}

Galeria:
${linhasGaleria}

${parteRelato}`
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
      exercicios: Array.isArray(dados.exercicios) ? dados.exercicios.filter((e) => e && typeof e.id === 'string') : []
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
