// Exercícios do Dr. Pablo (prescrição terapêutica): nunca usam as animações da galeria de academia.
// Ficam na biblioteca própria; o vídeo é o que o Dr. Pablo grava e envia.
import { useState } from 'react'
import {
  criarExercicios, enviarVideo, listarExercicios, prescrever, removerPrescricao, removerVideo, salvarExercicio, urlVideo
} from '../lib/api.js'
import { ehGaleria, normalizarNome } from '../lib/assistente.js'
import Icone from '../components/ui/Icone.jsx'

const LIMITE_MB = 50

// Garante que a sugestão exista na biblioteca PRÓPRIA (nunca liga a um item da galeria) e devolve o id.
export async function garantirNaBiblioteca(s, extra = {}) {
  if (s.exercicioId) return s.exercicioId
  const biblioteca = (await listarExercicios({ incluirInativos: true })).filter((e) => !ehGaleria(e))
  const igual = biblioteca.find((e) => normalizarNome(e.nome) === normalizarNome(s.nome))
  if (igual) {
    if (!igual.ativo) await salvarExercicio({ id: igual.id, ativo: true })
    return igual.id
  }
  const [novo] = await criarExercicios([
    {
      nome: s.nome.trim(),
      instrucoes: s.instrucoes || '',
      series_padrao: Math.max(1, Math.min(20, Number(s.series) || 3)),
      reps_padrao: s.reps || '10',
      ...extra
    }
  ])
  return novo.id
}

// Grava a prescrição do paciente. Com `substituir`, tira o que não está na nova lista.
export async function salvarPrescricaoPropria({ pacienteId, sugestoes, substituir, atuais }) {
  const escolhidas = sugestoes.filter((s) => s.incluir && s.nome.trim())
  const ids = []
  for (const s of escolhidas) ids.push(await garantirNaBiblioteca(s))
  if (substituir) {
    const manter = new Set(ids)
    for (const p of atuais.filter((p) => !manter.has(p.exercicio_id))) await removerPrescricao(p.id)
  }
  for (let k = 0; k < escolhidas.length; k++) {
    const s = escolhidas[k]
    await prescrever({
      paciente_id: pacienteId,
      exercicio_id: ids[k],
      series: Math.max(1, Math.min(20, Number(s.series) || 1)),
      reps: s.reps || '10',
      observacao: s.observacao || null,
      ordem: k + 1
    })
  }
  // Instruções escritas para este paciente viram as instruções do exercício, se ele ainda não tiver.
  const biblioteca = await listarExercicios({ incluirInativos: true })
  for (let k = 0; k < escolhidas.length; k++) {
    const e = biblioteca.find((x) => x.id === ids[k])
    if (e && !e.instrucoes?.trim() && escolhidas[k].instrucoes?.trim()) await salvarExercicio({ id: e.id, instrucoes: escolhidas[k].instrucoes.trim() })
  }
  return { total: escolhidas.length, semVideo: escolhidas.filter((s) => !s.video).length }
}

// Cartões editáveis das sugestões, com envio de vídeo direto para a biblioteca.
export function CartoesSugestoes({ sugestoes, setSugestoes, aoMensagem }) {
  const [enviandoVideo, setEnviandoVideo] = useState(null)
  const mudar = (i, campo, valor) => setSugestoes((l) => l.map((s, k) => (k === i ? { ...s, [campo]: valor } : s)))

  async function aoEscolherVideo(i, arquivo) {
    if (!arquivo) return
    if (arquivo.size > LIMITE_MB * 1024 * 1024) return aoMensagem(`Vídeo acima de ${LIMITE_MB} MB. Grave de 10 a 20 segundos, em 1080p ou 720p.`)
    setEnviandoVideo(i)
    aoMensagem('')
    try {
      const s = sugestoes[i]
      const caminho = await enviarVideo(arquivo)
      const id = await garantirNaBiblioteca(s, { video_path: caminho })
      await salvarExercicio({ id, video_path: caminho, ativo: true, ...(s.instrucoes ? { instrucoes: s.instrucoes } : {}) })
      if (s.video && !s.video.startsWith('galeria/')) await removerVideo(s.video)
      setSugestoes((l) => l.map((x, k) => (k === i ? { ...x, exercicioId: id, video: caminho } : x)))
      aoMensagem(`Vídeo de "${s.nome}" salvo na biblioteca.`)
    } catch (e) {
      aoMensagem(e.message)
    }
    setEnviandoVideo(null)
  }

  return (
    <div className="space-y-3">
      {sugestoes.map((s, i) => (
        <div key={i} className={`rounded-2xl border bg-white p-3 ${s.incluir ? 'border-petroleo/25' : 'border-cinza-100 opacity-60'}`}>
          <div className="flex items-start gap-3">
            <div className="w-20 shrink-0">
              {s.video ? (
                <video src={urlVideo(s.video)} muted loop autoPlay playsInline className="aspect-[3/4] w-20 rounded-xl bg-cinza-100 object-cover" />
              ) : (
                <div className="flex aspect-[3/4] w-20 flex-col items-center justify-center gap-1 rounded-xl bg-cinza-50 text-center text-[10px] font-semibold text-cinza-400">
                  <Icone nome="video" tamanho={20} />
                  sem vídeo
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                {s.exercicioId ? (
                  <div className="min-w-0 flex-1 pt-1.5 text-sm font-bold leading-tight">{s.nome}</div>
                ) : (
                  <input
                    value={s.nome}
                    onChange={(e) => mudar(i, 'nome', e.target.value)}
                    className="h-9 min-w-0 flex-1 rounded-lg border border-cinza-200 px-2 text-sm font-bold"
                    aria-label="Nome do exercício"
                  />
                )}
                <label className="flex shrink-0 items-center gap-1 pt-2 text-xs font-semibold text-cinza-600">
                  <input type="checkbox" checked={s.incluir} onChange={(e) => mudar(i, 'incluir', e.target.checked)} className="h-4 w-4 accent-[#0E5C62]" />
                  incluir
                </label>
              </div>
              {s.exercicioId && <span className="mt-0.5 inline-block rounded bg-petroleo-claro px-1.5 py-0.5 text-[10px] font-bold text-petroleo">na sua biblioteca</span>}
              <div className="mt-1.5 flex gap-1.5">
                <input type="number" min="1" max="20" value={s.series} onChange={(e) => mudar(i, 'series', e.target.value)} className="h-8 w-14 rounded-lg border border-cinza-200 px-2 text-sm" aria-label="Séries" />
                <span className="self-center text-sm text-cinza-600">×</span>
                <input value={s.reps} onChange={(e) => mudar(i, 'reps', e.target.value)} className="h-8 min-w-0 flex-1 rounded-lg border border-cinza-200 px-2 text-sm" aria-label="Repetições" />
              </div>
            </div>
          </div>
          <textarea value={s.instrucoes} onChange={(e) => mudar(i, 'instrucoes', e.target.value)} rows={3} placeholder="Como fazer" className="mt-2 w-full rounded-lg border border-cinza-200 px-2 py-1.5 text-sm" />
          <input value={s.observacao} onChange={(e) => mudar(i, 'observacao', e.target.value)} placeholder="Cuidado / observação" className="mt-1 h-9 w-full rounded-lg border border-cinza-200 px-2 text-sm" />
          <label
            className={`mt-2 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed text-sm font-semibold ${
              s.video ? 'border-cinza-200 text-cinza-600' : 'border-petroleo/40 bg-petroleo-claro text-petroleo'
            }`}
          >
            {enviandoVideo === i ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icone nome="upload" tamanho={18} />}
            {enviandoVideo === i ? 'Enviando vídeo...' : s.video ? 'Trocar vídeo' : 'Enviar vídeo (vai para a biblioteca)'}
            <input type="file" accept="video/*" className="hidden" disabled={enviandoVideo !== null} onChange={(e) => aoEscolherVideo(i, e.target.files?.[0])} />
          </label>
        </div>
      ))}
    </div>
  )
}
