// Etapa 1 da análise postural: a IA marca os pontos e os desvios de cada foto.
// Até 20 fotos, em lotes de 4 (limite por pedido), com 3 lotes rodando ao mesmo tempo.
import { chamarAssistente } from './api.js'
import { POR_LOTE, montarEsquemaMarcacao, montarMensagemMarcacao, montarSistemaMarcacao, normalizarMarcacao } from './postura.js'

const SIMULTANEOS = 3

export async function marcarFotos(fotos, aoProgresso) {
  const lotes = []
  for (let i = 0; i < fotos.length; i += POR_LOTE) lotes.push({ inicio: i, fotos: fotos.slice(i, i + POR_LOTE) })
  const marcacoes = new Array(fotos.length)
  let custo = 0
  let prontas = 0
  aoProgresso?.(0, fotos.length)

  async function rodar(lote) {
    const r = await chamarAssistente({
      sistema: montarSistemaMarcacao(),
      mensagem: montarMensagemMarcacao(lote.fotos.map((f) => f.vista), lote.inicio),
      esquema: montarEsquemaMarcacao(),
      imagens: lote.fotos.map((f) => ({ media_type: f.media_type, data: f.data, vista: f.vista }))
    })
    custo += r.custo_usd || 0
    const itens = Array.isArray(r.dados?.fotos) ? r.dados.fotos : []
    lote.fotos.forEach((f, k) => {
      const m = itens.find((x) => Number(x.foto) === k + 1) || itens[k]
      marcacoes[lote.inicio + k] = normalizarMarcacao(m, f.vista, f.proporcao)
    })
    prontas += lote.fotos.length
    aoProgresso?.(prontas, fotos.length)
  }

  const fila = [...lotes]
  const trabalhadores = Array.from({ length: Math.min(SIMULTANEOS, fila.length) }, async () => {
    while (fila.length) await rodar(fila.shift())
  })
  await Promise.all(trabalhadores)
  return { marcacoes, custo }
}

// Refaz a análise postural de um relatório salvo (fotos do espaço privado), mantendo os exercícios.
export async function refazerAnalise({ relatorio, paciente, campos, respostas, exercicios, aoProgresso }) {
  const { urlsFotosPosturais } = await import('./api.js')
  const { reduzirFoto } = await import('./fotos.js')
  const { montarEsquemaConsolidacao, montarMensagemConsolidacao, montarSistemaConsolidacao, normalizarPostura } = await import('./assistente.js')
  const { achadosEmTexto } = await import('./postura.js')
  const salvas = relatorio.fotos || []
  aoProgresso?.('Baixando as fotos...')
  const urls = await urlsFotosPosturais(salvas.map((f) => f.caminho))
  const fotos = []
  for (const f of salvas) {
    const blob = await fetch(urls[f.caminho]).then((r) => {
      if (!r.ok) throw new Error('Não consegui baixar uma das fotos.')
      return r.blob()
    })
    const pronta = await reduzirFoto(new File([blob], 'foto.jpg', { type: blob.type || 'image/jpeg' }))
    URL.revokeObjectURL(pronta.previa)
    fotos.push({ ...pronta, vista: f.vista })
  }
  const { marcacoes, custo: c1 } = await marcarFotos(fotos, (feitas, total) => aoProgresso?.(`Marcando os pontos e medindo as fotos (${feitas} de ${total})...`))
  aoProgresso?.('Consolidando a análise...')
  const vistas = fotos.map((f) => f.vista)
  const r = await chamarAssistente({
    sistema: montarSistemaConsolidacao(),
    mensagem: montarMensagemConsolidacao({ paciente, campos, respostas, exercicios, analiseFotos: achadosEmTexto(marcacoes, vistas) }),
    esquema: montarEsquemaConsolidacao()
  })
  return { marcacoes, postura: normalizarPostura(r.dados?.postura), custo: c1 + (r.custo_usd || 0) }
}

// Texto do relatório salvo a partir da análise.
export function textoRelatorioPostural(postura) {
  const linhas = postura.achados.map((a) => `- ${a.regiao} (${a.lado}, ${a.intensidade.toLowerCase()}): ${a.achado}`).join('\n')
  return `## Análise postural\n${postura.resumo}\n\n${linhas}${postura.limitacoes ? `\n\n## Limitações das fotos\n${postura.limitacoes}` : ''}`
}
