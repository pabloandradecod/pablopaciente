import { useEffect, useState } from 'react'
import {
  assistenteDisponivel, chamarAssistente, criarExercicios, enviarVideo, listarExercicios, listarPrescricao, prescrever,
  removerPrescricao, removerVideo, salvarExercicio, urlVideo
} from '../lib/api.js'
import { ligarSugestoes, montarEsquemaExercicios, montarMensagemExercicios, montarSistemaExercicios, normalizarNome } from '../lib/assistente.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import { AreaTexto } from '../components/ui/Campo.jsx'

const LIMITE_MB = 50

// Depois da avaliação: a IA sugere os exercícios (sem depender da galeria).
// Cada vídeo enviado aqui entra direto na biblioteca, para reaproveitar em outros pacientes.
export default function GerarExercicios({ paciente, campos, avaliacao }) {
  const [api, setApi] = useState(null)
  const [notas, setNotas] = useState('')
  const [gerando, setGerando] = useState(false)
  const [sugestoes, setSugestoes] = useState([])
  const [orientacao, setOrientacao] = useState('')
  const [custo, setCusto] = useState(null)
  const [enviandoVideo, setEnviandoVideo] = useState(null)
  const [atuais, setAtuais] = useState([])
  const [substituir, setSubstituir] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    assistenteDisponivel().then(setApi)
    listarPrescricao(paciente.id).then(setAtuais).catch(() => {})
  }, [paciente.id])

  const avaliacaoPronta = Boolean(avaliacao?.id) && Object.keys(avaliacao?.respostas || {}).length > 0

  async function gerar() {
    if (sugestoes.length && !confirm('Gerar de novo substitui as sugestões atuais. Continuar?')) return
    setGerando(true)
    setMsg('')
    try {
      const biblioteca = await listarExercicios()
      const r = await chamarAssistente({
        sistema: montarSistemaExercicios({ biblioteca }),
        mensagem: montarMensagemExercicios({ paciente, campos, respostas: avaliacao.respostas, notas }),
        esquema: montarEsquemaExercicios({ biblioteca })
      })
      setSugestoes(ligarSugestoes(r.dados, biblioteca))
      setOrientacao(r.dados?.orientacao || '')
      setCusto(r.custo_usd)
    } catch (e) {
      setMsg(e.message)
    }
    setGerando(false)
  }

  const mudar = (i, campo, valor) => setSugestoes((l) => l.map((s, k) => (k === i ? { ...s, [campo]: valor } : s)))

  // Garante que a sugestão exista na biblioteca e devolve o id.
  async function garantirNaBiblioteca(s, extra = {}) {
    if (s.exercicioId) return s.exercicioId
    const biblioteca = await listarExercicios({ incluirInativos: true })
    const igual = biblioteca.find((e) => normalizarNome(e.nome) === normalizarNome(s.nome))
    if (igual) {
      if (!igual.ativo) await salvarExercicio({ id: igual.id, ativo: true })
      return igual.id
    }
    const [novo] = await criarExercicios([
      { nome: s.nome.trim(), instrucoes: s.instrucoes || '', series_padrao: Math.max(1, Math.min(20, Number(s.series) || 3)), reps_padrao: s.reps || '10', ...extra }
    ])
    return novo.id
  }

  async function aoEscolherVideo(i, arquivo) {
    if (!arquivo) return
    if (arquivo.size > LIMITE_MB * 1024 * 1024) return setMsg(`Vídeo acima de ${LIMITE_MB} MB. Grave de 10 a 20 segundos, em 1080p ou 720p.`)
    setEnviandoVideo(i)
    setMsg('')
    try {
      const s = sugestoes[i]
      const caminho = await enviarVideo(arquivo)
      let id = s.exercicioId
      if (id) {
        await salvarExercicio({ id, video_path: caminho, ativo: true, ...(s.instrucoes ? { instrucoes: s.instrucoes } : {}) })
        if (s.video && !s.video.startsWith('galeria/')) await removerVideo(s.video)
      } else {
        id = await garantirNaBiblioteca(s, { video_path: caminho })
        await salvarExercicio({ id, video_path: caminho, ativo: true })
      }
      setSugestoes((l) => l.map((x, k) => (k === i ? { ...x, exercicioId: id, video: caminho } : x)))
      setMsg(`Vídeo de "${s.nome}" salvo na biblioteca.`)
    } catch (e) {
      setMsg(e.message)
    }
    setEnviandoVideo(null)
  }

  async function prescreverTudo() {
    setSalvando(true)
    setMsg('')
    try {
      const escolhidas = sugestoes.filter((s) => s.incluir && s.nome.trim())
      const ids = []
      for (const s of escolhidas) ids.push(await garantirNaBiblioteca(s))
      if (substituir) {
        const manter = new Set(ids)
        for (const p of atuais.filter((p) => !manter.has(p.exercicio_id))) await removerPrescricao(p.id)
      }
      for (let k = 0; k < escolhidas.length; k++) {
        const s = escolhidas[k]
        // instruções escritas para este paciente ficam também no exercício, se ele ainda não tiver
        await prescrever({
          paciente_id: paciente.id,
          exercicio_id: ids[k],
          series: Math.max(1, Math.min(20, Number(s.series) || 1)),
          reps: s.reps || '10',
          observacao: s.observacao || null,
          ordem: k + 1
        })
      }
      const biblioteca = await listarExercicios({ incluirInativos: true })
      for (let k = 0; k < escolhidas.length; k++) {
        const e = biblioteca.find((x) => x.id === ids[k])
        if (e && !e.instrucoes?.trim() && escolhidas[k].instrucoes?.trim()) await salvarExercicio({ id: e.id, instrucoes: escolhidas[k].instrucoes.trim() })
      }
      setAtuais(await listarPrescricao(paciente.id))
      const semVideo = escolhidas.filter((s) => !s.video).length
      setMsg(`Prescrição salva (${escolhidas.length} exercícios).${semVideo ? ` ${semVideo} ainda sem vídeo: o paciente vê só o texto até você enviar.` : ''}`)
    } catch (e) {
      setMsg(e.message)
    }
    setSalvando(false)
  }

  if (api === false) {
    return (
      <Card>
        <h2 className="font-bold text-petroleo-escuro">Gerar exercícios</h2>
        <p className="mt-1 text-sm text-cinza-600">Cadastre a chave da API no Supabase para usar este botão.</p>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro">
        <Icone nome="estrela" tamanho={18} /> Gerar exercícios
      </h2>
      <p className="mt-1 text-sm text-cinza-600">
        A IA sugere a prescrição a partir desta avaliação. Ao enviar o vídeo de um exercício, ele fica guardado na sua biblioteca para os próximos
        pacientes.
      </p>

      {!avaliacaoPronta ? (
        <p className="mt-3 rounded-xl bg-cinza-50 p-3 text-sm text-cinza-600">Preencha e salve a avaliação para liberar o botão.</p>
      ) : (
        <div className="mt-3">
          <AreaTexto
            id="notas-ex"
            rotulo="O que priorizar?"
            dica="(opcional)"
            rows={2}
            placeholder="Ex.: fase aguda, só exercícios deitado; paciente idosa; quer voltar a correr"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
          <Botao className="mt-2" icone="estrela" onClick={gerar} carregando={gerando}>
            {sugestoes.length ? 'Gerar de novo' : 'Gerar exercícios'}
          </Botao>
          {gerando && <p className="mt-2 text-xs text-cinza-600">Montando a prescrição... leva de 15 a 40 segundos.</p>}
          {custo != null && !gerando && <p className="mt-2 text-xs text-cinza-600">Custo: cerca de US$ {custo.toFixed(3).replace('.', ',')}</p>}
        </div>
      )}

      {sugestoes.length > 0 && (
        <div className="mt-4 space-y-3">
          {sugestoes.map((s, i) => (
            <div key={i} className={`rounded-2xl border p-3 ${s.incluir ? 'border-petroleo/25' : 'border-cinza-100 opacity-60'}`}>
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
                  {s.exercicioId && (
                    <span className="mt-0.5 inline-block rounded bg-petroleo-claro px-1.5 py-0.5 text-[10px] font-bold text-petroleo">na biblioteca</span>
                  )}
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
                {enviandoVideo === i ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Icone nome="upload" tamanho={18} />
                )}
                {enviandoVideo === i ? 'Enviando vídeo...' : s.video ? 'Trocar vídeo' : 'Enviar vídeo (vai para a biblioteca)'}
                <input type="file" accept="video/*" className="hidden" disabled={enviandoVideo !== null} onChange={(e) => aoEscolherVideo(i, e.target.files?.[0])} />
              </label>
            </div>
          ))}

          {orientacao && <p className="rounded-2xl bg-cinza-50 p-3 text-sm text-cinza-600">{orientacao}</p>}

          {atuais.length > 0 && (
            <label className="flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
              <input type="checkbox" checked={substituir} onChange={(e) => setSubstituir(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]" />
              <span>
                <strong>Substituir a prescrição atual</strong> ({atuais.length}: {atuais.map((p) => p.exercicios?.nome).filter(Boolean).join(', ')}).
              </span>
            </label>
          )}
          <Botao tamanho="lg" bloco icone="check" onClick={prescreverTudo} carregando={salvando}>
            Prescrever para o paciente
          </Botao>
        </div>
      )}

      {msg && <p className={`mt-3 text-sm font-medium ${/salv|Prescrição/.test(msg) ? 'text-ok' : 'text-alerta'}`}>{msg}</p>}
    </Card>
  )
}
