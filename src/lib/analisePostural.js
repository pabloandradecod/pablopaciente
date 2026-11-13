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
