import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  assistenteDisponivel, chamarAssistente, contarSessoes, criarExercicios, listarCampos, listarExercicios, listarPacientes, listarPrescricao, prescrever,
  removerPrescricao, salvarAvaliacao, salvarExercicio, salvarRelatorio, ultimaAvaliacao, urlVideo
} from '../lib/api.js'
import { filtrarAvaliacao, lerResposta, montarEsquema, montarMensagem, montarPrompt, montarSistema, normalizarRespostaApi } from '../lib/assistente.js'
import { hojeISO, primeiroNome } from '../lib/datas.js'
import { useDitado } from './useDitado.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import { Simbolo } from '../components/ui/Logo.jsx'
import TextoRelatorio from '../components/TextoRelatorio.jsx'
import CampoAvaliacao from './CampoAvaliacao.jsx'

const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// ---------------------------------------------------------------- balões

function Assist({ children }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        <Simbolo tamanho={24} />
      </span>
      <div className="min-w-0 flex-1 rounded-3xl rounded-tl-md bg-white p-4 text-[15px] leading-relaxed text-tinta shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  )
}

function Voce({ children }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-3xl rounded-tr-md bg-petroleo px-4 py-3 text-[15px] leading-relaxed text-white">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------- tela

export default function Assistente() {
  const [params] = useSearchParams()
  const [pacientes, setPacientes] = useState(null)
  const [busca, setBusca] = useState('')
  const [paciente, setPaciente] = useState(null)
  const [contexto, setContexto] = useState(null) // campos, biblioteca, galeria, avaliação anterior, sessões
  const [relato, setRelato] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [promptVisivel, setPromptVisivel] = useState('')
  const [colado, setColado] = useState('')
  const [leitura, setLeitura] = useState(null) // { relatorio, dados }
  const [erroLeitura, setErroLeitura] = useState('')
  const [salvo, setSalvo] = useState(false)
  const [api, setApi] = useState(null) // true quando a chave da API está cadastrada
  const [gerando, setGerando] = useState(false)
  const [erroIa, setErroIa] = useState('')
  const [manual, setManual] = useState(false)
  const fim = useRef(null)

  useEffect(() => {
    assistenteDisponivel().then(setApi)
    listarPacientes().then((l) => {
      setPacientes(l)
      const id = params.get('paciente')
      if (id) {
        const p = l.find((x) => x.id === id)
        if (p) escolher(p)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [paciente, contexto, copiado, leitura, salvo, gerando])

  async function escolher(p) {
    setPaciente(p)
    setContexto(null)
    setRelato('')
    setCopiado(false)
    setColado('')
    setLeitura(null)
    setSalvo(false)
    setErroIa('')
    setManual(false)
    const [campos, biblioteca, galeria, avaliacaoAnterior, totalSessoes] = await Promise.all([
      listarCampos(),
      listarExercicios(),
      import('../lib/galeria.json').then((m) => m.default),
      ultimaAvaliacao(p.id),
      contarSessoes(p.id)
    ])
    setContexto({ campos, biblioteca, galeria, avaliacaoAnterior, totalSessoes })
  }

  function recomecar() {
    setPaciente(null)
    setContexto(null)
    setBusca('')
  }

  async function levarParaClaude() {
    const texto = montarPrompt({ paciente, ...contexto, relato })
    try {
      await navigator.clipboard.writeText(texto)
      setPromptVisivel('')
    } catch {
      setPromptVisivel(texto) // sem permissão de copiar: mostra para copiar à mão
    }
    setCopiado(true)
  }

  // Modo API: gera direto no painel. `ajuste` refaz a última resposta com o pedido do Dr. Pablo.
  async function gerarComIa(ajuste) {
    if (!relato.trim()) return setErroIa('Escreva ou dite o relato antes de gerar.')
    setGerando(true)
    setErroIa('')
    try {
      const sistema = montarSistema({ ...contexto, modo: 'api' })
      const mensagem = montarMensagem({ paciente, ...contexto, relato, anterior: ajuste ? leitura?.bruto : null, ajuste, modo: 'api' })
      const r = await chamarAssistente({
        sistema,
        mensagem,
        esquema: montarEsquema(contexto),
        esquemaReserva: montarEsquema(contexto, { idsLivres: true })
      })
      const n = normalizarRespostaApi(r.dados)
      setLeitura({
        versao: Date.now(),
        relatorio: n.relatorio,
        dados: { ...n.dados, avaliacao: filtrarAvaliacao(n.dados.avaliacao, contexto.campos) },
        bruto: r.dados,
        custo: r.custo_usd,
        origem: 'api'
      })
    } catch (e) {
      setErroIa(e.message)
    }
    setGerando(false)
  }

  function ler() {
    const r = lerResposta(colado)
    if (r.erro) {
      setErroLeitura(r.erro)
      setLeitura(null)
      return
    }
    setErroLeitura('')
    setLeitura({ versao: Date.now(), origem: 'ponte_manual', relatorio: r.relatorio, dados: { ...r.dados, avaliacao: filtrarAvaliacao(r.dados.avaliacao, contexto.campos) } })
  }

  const filtrados = useMemo(() => {
    if (!pacientes) return []
    const b = semAcento(busca.trim())
    return pacientes.filter((p) => !b || semAcento(p.nome).includes(b)).slice(0, b ? 20 : 8)
  }, [pacientes, busca])

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-petroleo/70">Assistente clínico</p>
        <h1 className="mt-1 text-[28px] font-extrabold leading-tight tracking-tight text-petroleo-escuro">Vamos registrar uma avaliação</h1>
      </div>

      <div className="space-y-4 pb-10">
        <Assist>
          Olá, Dr. Pablo. <strong>Qual paciente você avaliou?</strong>
          {!paciente && (
            <div className="mt-3">
              <div className="relative">
                <Icone nome="busca" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cinza-400" tamanho={18} />
                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar paciente"
                  className="h-11 w-full rounded-xl border border-cinza-200 pl-10 pr-3 text-[15px] focus:border-petroleo focus:outline-none"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {filtrados.map((p) => (
                  <button key={p.id} onClick={() => escolher(p)} className="rounded-full border border-cinza-200 px-3.5 py-2 text-sm font-semibold hover:border-petroleo hover:text-petroleo">
                    {p.nome}
                  </button>
                ))}
                <Link to="/painel/pacientes/novo" className="rounded-full border border-dashed border-cinza-400 px-3.5 py-2 text-sm font-semibold text-cinza-600">
                  + Novo paciente
                </Link>
              </div>
            </div>
          )}
        </Assist>

        {paciente && (
          <Voce>
            {paciente.nome}
            <button onClick={recomecar} className="ml-2 text-xs font-semibold text-white/70 underline">trocar</button>
          </Voce>
        )}

        {paciente && !contexto && (
          <Assist>
            <span className="text-cinza-600">Carregando os dados de {primeiroNome(paciente.nome)}...</span>
          </Assist>
        )}

        {paciente && contexto && (
          <Relato
            paciente={paciente}
            relato={relato}
            setRelato={setRelato}
            aoLevar={levarParaClaude}
            copiado={copiado}
            api={api && !manual}
            aoGerar={() => gerarComIa()}
            gerando={gerando}
            jaGerou={Boolean(leitura)}
            aoUsarManual={() => setManual(true)}
          />
        )}

        {gerando && (
          <Assist>
            <p className="flex items-center gap-2 font-semibold text-petroleo">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-petroleo border-t-transparent" />
              Analisando a avaliação e montando a prescrição...
            </p>
            <p className="mt-1 text-sm text-cinza-600">Leva de 20 a 60 segundos.</p>
          </Assist>
        )}

        {erroIa && !gerando && (
          <Assist>
            <p className="font-semibold text-alerta">{erroIa}</p>
          </Assist>
        )}

        {copiado && (
          <>
            <Assist>
              <p className="font-bold">Texto copiado. Agora:</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Abra o Claude e comece uma conversa nova.</li>
                <li>Cole o texto e envie.</li>
                {!relato.trim() && <li>Quando ele pedir, dite ou escreva o relato da avaliação.</li>}
                <li>Copie a resposta inteira (toque e segure, depois "Copiar") e cole aqui embaixo.</li>
              </ol>
              <div className="mt-3 flex flex-wrap gap-2">
                <Botao href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" icone="externo">Abrir o Claude</Botao>
                <Botao variante="secundario" icone="copiar" onClick={levarParaClaude}>Copiar de novo</Botao>
              </div>
              {promptVisivel && (
                <div className="mt-3">
                  <p className="mb-1 text-xs text-cinza-600">Não consegui copiar automaticamente. Selecione e copie:</p>
                  <textarea readOnly value={promptVisivel} rows={6} className="w-full rounded-xl border border-cinza-200 p-2 font-mono text-[11px]" onFocus={(e) => e.target.select()} />
                </div>
              )}
            </Assist>

            <Assist>
              <p className="font-bold">Cole aqui a resposta do Claude</p>
              <textarea
                value={colado}
                onChange={(e) => setColado(e.target.value)}
                rows={5}
                placeholder="Relatório + bloco de dados que o Claude devolveu"
                className="mt-2 w-full rounded-xl border border-cinza-200 p-3 text-sm focus:border-petroleo focus:outline-none"
              />
              {erroLeitura && <p className="mt-2 text-sm font-medium text-alerta">{erroLeitura}</p>}
              <div className="mt-2 flex flex-wrap gap-2">
                <Botao
                  variante="secundario"
                  icone="colar"
                  onClick={async () => {
                    try {
                      setColado(await navigator.clipboard.readText())
                    } catch {
                      /* sem permissão: o usuário cola manualmente */
                    }
                  }}
                >
                  Colar
                </Botao>
                <Botao onClick={ler} disabled={!colado.trim()} icone="check">Ler resposta</Botao>
              </div>
            </Assist>
          </>
        )}

        {leitura && !salvo && (
          <Revisao
            key={leitura.versao}
            paciente={paciente}
            contexto={contexto}
            leitura={leitura}
            setLeitura={setLeitura}
            aoSalvar={() => setSalvo(true)}
            aoAjustar={leitura.origem === 'api' ? (texto) => gerarComIa(texto) : null}
            gerando={gerando}
          />
        )}

        {salvo && (
          <Assist>
            <p className="font-bold">Pronto. Avaliação, exercícios e relatório salvos na ficha de {primeiroNome(paciente.nome)}.</p>
            <p className="mt-1 text-sm text-cinza-600">O relatório fica só para você. O paciente vê a avaliação resumida e os exercícios no link.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Botao para={`/painel/pacientes/${paciente.id}`} icone="usuario">Abrir ficha</Botao>
              <Botao para={`/painel/pacientes/${paciente.id}?aba=link`} variante="secundario" icone="link">Enviar link</Botao>
              <Botao variante="fantasma" onClick={recomecar}>Nova avaliação</Botao>
            </div>
          </Assist>
        )}
        <div ref={fim} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- relato

function Relato({ paciente, relato, setRelato, aoLevar, copiado, api, aoGerar, gerando, jaGerou, aoUsarManual }) {
  const ditado = useDitado((t) => setRelato((r) => (r ? `${r} ${t}` : t)))
  return (
    <Assist>
      <p>
        Me conte a avaliação de <strong>{primeiroNome(paciente.nome)}</strong>: queixa, tempo, testes, achados, o que você tratou. Pode
        {api ? 'escrever ou ditar aqui.' : 'escrever ou ditar aqui, ou deixar para ditar direto no Claude.'}
      </p>
      <div className="relative mt-3">
        <textarea
          value={relato + (ditado.parcial ? ` ${ditado.parcial}` : '')}
          onChange={(e) => setRelato(e.target.value)}
          rows={5}
          placeholder="Ex.: Dor lombar há 3 semanas após pegar peso, irradia para glúteo esquerdo, Lasègue negativo, restrição em L4-L5..."
          className="w-full rounded-xl border border-cinza-200 p-3 pr-14 text-[15px] focus:border-petroleo focus:outline-none"
        />
        {ditado.suportado && (
          <button
            type="button"
            onClick={ditado.ouvindo ? ditado.parar : ditado.iniciar}
            aria-label={ditado.ouvindo ? 'Parar ditado' : 'Ditar por voz'}
            className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full ${
              ditado.ouvindo ? 'animate-pulse bg-alerta text-white' : 'bg-petroleo-claro text-petroleo'
            }`}
          >
            <Icone nome={ditado.ouvindo ? 'parar' : 'microfone'} tamanho={20} />
          </button>
        )}
      </div>
      {ditado.ouvindo && <p className="mt-1 text-xs font-semibold text-alerta">Ouvindo... toque no quadrado para parar.</p>}
      {!ditado.suportado && <p className="mt-1 text-xs text-cinza-600">Para ditar neste aparelho, use o microfone do teclado.</p>}
      {api ? (
        <>
          <Botao tamanho="lg" bloco className="mt-3" icone="estrela" onClick={aoGerar} carregando={gerando} disabled={!relato.trim()}>
            {jaGerou ? 'Gerar de novo' : 'Gerar com IA'}
          </Botao>
          <button onClick={aoUsarManual} className="mt-2 w-full text-center text-xs font-semibold text-cinza-600 underline">
            ou usar a ponte manual (copiar para o app do Claude)
          </button>
        </>
      ) : (
        <Botao tamanho="lg" bloco className="mt-3" icone="copiar" onClick={aoLevar}>
          {copiado ? 'Copiar de novo para o Claude' : relato.trim() ? 'Levar para o Claude' : 'Levar para o Claude (vou ditar lá)'}
        </Botao>
      )}
    </Assist>
  )
}

// ---------------------------------------------------------------- revisão

function Revisao({ paciente, contexto, leitura, setLeitura, aoSalvar, aoAjustar, gerando }) {
  const [ajuste, setAjuste] = useState('')
  const { campos, biblioteca, galeria } = contexto
  const [verRelatorio, setVerRelatorio] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  // Prescrição atual do paciente: por padrão a nova substitui a antiga.
  const [atuais, setAtuais] = useState([])
  const [substituir, setSubstituir] = useState(true)
  useEffect(() => {
    listarPrescricao(paciente.id).then(setAtuais).catch(() => {})
  }, [paciente.id])

  // Resolve cada sugestão para um exercício da biblioteca ou da galeria.
  const [sugestoes, setSugestoes] = useState(() =>
    leitura.dados.exercicios
      .map((s) => {
        if (s.id.startsWith('lib:')) {
          const e = biblioteca.find((x) => x.id === s.id.slice(4))
          // Só exercícios com animação.
          return e?.video_path && { chave: s.id, nome: e.nome, video: e.video_path, exercicioId: e.id, instrucoesAtuais: e.instrucoes, series: s.series || e.series_padrao, reps: String(s.reps || e.reps_padrao), instrucoes: s.instrucoes || e.instrucoes || '', observacao: s.observacao || '', incluir: true }
        }
        if (s.id.startsWith('gal:')) {
          const g = galeria.itens.find((x) => x.id === s.id.slice(4))
          if (!g) return null
          const existente = biblioteca.find((x) => x.video_path === g.video)
          return { chave: s.id, nome: existente?.nome || g.nome, video: g.video, exercicioId: existente?.id, instrucoesAtuais: existente?.instrucoes, galeria: g, series: s.series || 3, reps: String(s.reps || '10'), instrucoes: s.instrucoes || existente?.instrucoes || '', observacao: s.observacao || '', incluir: true }
        }
        return null
      })
      .filter(Boolean)
  )
  const ignorados = leitura.dados.exercicios.length - sugestoes.length
  const av = leitura.dados.avaliacao
  const preenchidos = campos.filter((c) => av[c.chave] !== undefined)
  const vazios = campos.filter((c) => av[c.chave] === undefined)

  const mudarAv = (chave, valor) =>
    setLeitura((l) => ({ ...l, dados: { ...l.dados, avaliacao: { ...l.dados.avaliacao, [chave]: valor } } }))
  const mudarEx = (i, campo, valor) => setSugestoes((l) => l.map((x, k) => (k === i ? { ...x, [campo]: valor } : x)))

  async function salvar() {
    setSalvando(true)
    setErro('')
    try {
      await salvarAvaliacao({ paciente_id: paciente.id, data: hojeISO(), respostas: leitura.dados.avaliacao })
      const novos = sugestoes.filter((s) => s.incluir && !s.exercicioId)
      if (novos.length) {
        const criados = await criarExercicios(
          novos.map((s) => ({ nome: s.galeria.nome, video_path: s.video, instrucoes: s.instrucoes || '', series_padrao: Number(s.series) || 3, reps_padrao: s.reps }))
        )
        novos.forEach((s) => (s.exercicioId = criados.find((c) => c.video_path === s.video)?.id))
      }
      // Exercício já existente sem instruções: aproveita as que vieram do assistente.
      for (const s of sugestoes.filter((x) => x.incluir && x.exercicioId && !x.instrucoesAtuais?.trim() && x.instrucoes?.trim())) {
        await salvarExercicio({ id: s.exercicioId, instrucoes: s.instrucoes.trim() })
      }
      const escolhidos = sugestoes.filter((x) => x.incluir && x.exercicioId)
      if (substituir) {
        const manter = new Set(escolhidos.map((x) => x.exercicioId))
        for (const p of atuais.filter((p) => !manter.has(p.exercicio_id))) await removerPrescricao(p.id)
      }
      let ordem = 1
      for (const s of escolhidos) {
        await prescrever({
          paciente_id: paciente.id,
          exercicio_id: s.exercicioId,
          series: Math.max(1, Math.min(20, Number(s.series) || 1)),
          reps: s.reps || '10',
          observacao: s.observacao || null,
          ordem: ordem++
        })
      }
      await salvarRelatorio({ paciente_id: paciente.id, relatorio: leitura.relatorio || '(sem texto)', resposta: leitura.dados, origem: leitura.origem === 'api' ? 'api' : 'ponte_manual' })
      aoSalvar()
    } catch (e) {
      setErro(e.message)
    }
    setSalvando(false)
  }

  return (
    <Assist>
      <p className="font-bold">{leitura.origem === 'api' ? 'Pronto. Revise antes de salvar:' : 'Li a resposta. Revise antes de salvar:'}</p>
      {leitura.custo != null && (
        <p className="mt-0.5 text-xs text-cinza-600">Custo desta análise: cerca de US$ {leitura.custo.toFixed(3).replace('.', ',')}</p>
      )}

      {leitura.dados.alertas.length > 0 && (
        <div className="mt-3 rounded-2xl border border-alerta/30 bg-alerta-claro p-3">
          <div className="flex items-center gap-2 font-bold text-alerta">
            <Icone nome="alerta" tamanho={18} /> Sinais de alerta
          </div>
          <ul className="mt-1 list-disc pl-5 text-sm text-alerta">
            {leitura.dados.alertas.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* Relatório */}
      <div className="mt-3 rounded-2xl border border-cinza-100">
        <button onClick={() => setVerRelatorio((v) => !v)} className="flex w-full items-center justify-between p-3 text-left font-bold text-petroleo-escuro">
          <span className="flex items-center gap-2"><Icone nome="documento" tamanho={18} /> Relatório clínico</span>
          <span className="text-xs font-semibold text-cinza-600">{verRelatorio ? 'recolher' : 'abrir'}</span>
        </button>
        {verRelatorio && (
          <div className="max-h-[50vh] overflow-y-auto border-t border-cinza-100 p-3">
            {leitura.relatorio ? <TextoRelatorio texto={leitura.relatorio} /> : <p className="text-sm text-cinza-600">O Claude não enviou texto de relatório.</p>}
          </div>
        )}
      </div>

      {/* Avaliação preenchida */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="check" tamanho={18} /> Avaliação preenchida</div>
        <div className="space-y-4 rounded-2xl bg-cinza-50 p-3">
          {preenchidos.map((c) => (
            <CampoAvaliacao key={c.id} campo={c} valor={av[c.chave]} onChange={(v) => mudarAv(c.chave, v)} />
          ))}
          {preenchidos.length === 0 && <p className="text-sm text-cinza-600">Nenhum campo foi preenchido.</p>}
          {vazios.length > 0 && (
            <details className="text-sm">
              <summary className="cursor-pointer font-semibold text-cinza-600">{vazios.length} campos sem informação (toque para preencher)</summary>
              <div className="mt-3 space-y-4">
                {vazios.map((c) => (
                  <CampoAvaliacao key={c.id} campo={c} valor={av[c.chave]} onChange={(v) => mudarAv(c.chave, v)} />
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Exercícios sugeridos */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="haltere" tamanho={18} /> Exercícios sugeridos</div>
        {ignorados > 0 && <p className="mb-2 text-xs text-cinza-600">{ignorados} sugestão(ões) sem animação ou fora do catálogo foram descartadas.</p>}
        <div className="space-y-2">
          {sugestoes.map((s, i) => (
            <div key={s.chave} className={`flex gap-3 rounded-2xl border p-2.5 transition ${s.incluir ? 'border-petroleo/30 bg-white' : 'border-cinza-100 bg-cinza-50 opacity-60'}`}>
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                {s.video ? (
                  s.video.startsWith('galeria/') ? (
                    <img src={`/${s.video.replace(/\.mp4$/, '.webp')}`} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <video src={urlVideo(s.video)} muted playsInline autoPlay loop className="h-full w-full object-contain" />
                  )
                ) : (
                  <div className="flex h-full items-center justify-center text-petroleo/50"><Icone nome="video" /></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 text-sm font-bold leading-tight">
                    <div>{s.nome}</div>
                    {!s.exercicioId && <span className="mt-1 inline-block rounded bg-destaque-claro px-1.5 py-0.5 text-[10px] font-bold text-petroleo-escuro">novo na biblioteca</span>}
                  </div>
                  <label className="flex shrink-0 items-center gap-1 text-xs font-semibold text-cinza-600">
                    <input type="checkbox" checked={s.incluir} onChange={(e) => mudarEx(i, 'incluir', e.target.checked)} className="h-4 w-4 accent-[#0E5C62]" />
                    incluir
                  </label>
                </div>
                <div className="mt-1.5 flex gap-1.5">
                  <input type="number" min="1" max="20" value={s.series} onChange={(e) => mudarEx(i, 'series', e.target.value)} className="h-8 w-14 rounded-lg border border-cinza-200 px-2 text-sm" aria-label="Séries" />
                  <span className="self-center text-sm text-cinza-600">×</span>
                  <input value={s.reps} onChange={(e) => mudarEx(i, 'reps', e.target.value)} className="h-8 min-w-0 flex-1 rounded-lg border border-cinza-200 px-2 text-sm" aria-label="Repetições" />
                </div>
                <textarea value={s.instrucoes} onChange={(e) => mudarEx(i, 'instrucoes', e.target.value)} placeholder="Como fazer" rows={2} className="mt-1.5 w-full rounded-lg border border-cinza-200 px-2 py-1 text-xs" />
                <input value={s.observacao} onChange={(e) => mudarEx(i, 'observacao', e.target.value)} placeholder="Observação para o paciente" className="mt-1 h-8 w-full rounded-lg border border-cinza-200 px-2 text-xs" />
              </div>
            </div>
          ))}
          {sugestoes.length === 0 && <p className="text-sm text-cinza-600">Nenhum exercício sugerido.</p>}
        </div>
      </div>

      {erro && <p className="mt-3 text-sm font-medium text-alerta">{erro}</p>}
      {atuais.length > 0 && (
        <label className="mt-4 flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
          <input type="checkbox" checked={substituir} onChange={(e) => setSubstituir(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]" />
          <span>
            <strong>Substituir a prescrição atual</strong> ({atuais.length} exercício{atuais.length > 1 ? 's' : ''}: {atuais.map((p) => p.exercicios?.nome).filter(Boolean).join(', ')}).
            <span className="block text-xs text-cinza-600">Desmarque para somar os novos aos que ele já tem.</span>
          </span>
        </label>
      )}
      <Botao tamanho="lg" bloco className="mt-4" onClick={salvar} carregando={salvando} icone="check">Salvar na ficha</Botao>
      {aoAjustar ? (
        <div className="mt-4 rounded-2xl bg-cinza-50 p-3">
          <p className="text-sm font-bold text-petroleo-escuro">Quer mudar algo?</p>
          <textarea
            value={ajuste}
            onChange={(e) => setAjuste(e.target.value)}
            rows={2}
            placeholder='Ex.: "troque a prancha por ponte unilateral", "deixe tudo com 2 séries"'
            className="mt-2 w-full rounded-xl border border-cinza-200 p-2.5 text-sm focus:border-petroleo focus:outline-none"
          />
          <Botao variante="secundario" className="mt-2" icone="estrela" carregando={gerando} disabled={!ajuste.trim()} onClick={() => aoAjustar(ajuste)}>
            Pedir ajuste
          </Botao>
        </div>
      ) : (
        <p className="mt-2 text-xs text-cinza-600">
          Quer mudar algo? Peça no Claude ("troque X por Y", "2 séries") e cole a nova resposta acima.
        </p>
      )}
    </Assist>
  )
}
