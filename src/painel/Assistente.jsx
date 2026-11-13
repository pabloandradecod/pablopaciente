import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  assistenteDisponivel, chamarAssistente, contarSessoes, enviarFotoPostural, listarCampos, listarExercicios, listarPacientes, listarPrescricao, salvarAvaliacao,
  salvarRelatorio, ultimaAvaliacao
} from '../lib/api.js'
import { filtrarAvaliacao, ligarSugestoes, lerResposta, montarEsquema, montarMensagem, montarPrompt, montarSistema, normalizarRespostaApi } from '../lib/assistente.js'
import { hojeISO, primeiroNome } from '../lib/datas.js'
import { useDitado } from './useDitado.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import { Simbolo } from '../components/ui/Logo.jsx'
import TextoRelatorio from '../components/TextoRelatorio.jsx'
import CampoAvaliacao from './CampoAvaliacao.jsx'
import { CartoesSugestoes, salvarPrescricaoPropria } from './prescricaoPropria.jsx'
import AnalisePostural from './AnalisePostural.jsx'
import AnexarFotos from './AnexarFotos.jsx'
import { marcarFotos } from '../lib/analisePostural.js'
import { achadosEmTexto } from '../lib/postura.js'

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
  const [contexto, setContexto] = useState(null) // campos, biblioteca, avaliação anterior, sessões
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
  const [fotos, setFotos] = useState([]) // [{ id, blob, data, media_type, previa, vista, proporcao }]
  const [progresso, setProgresso] = useState('')
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
    setFotos([])
    const [campos, biblioteca, avaliacaoAnterior, totalSessoes] = await Promise.all([
      listarCampos(),
      listarExercicios(),
      ultimaAvaliacao(p.id),
      contarSessoes(p.id)
    ])
    setContexto({ campos, biblioteca, avaliacaoAnterior, totalSessoes })
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
    if (!relato.trim() && !fotos.length) return setErroIa('Escreva ou dite o relato, ou anexe fotos, antes de gerar.')
    setGerando(true)
    setErroIa('')
    try {
      const vistas = fotos.map((f) => f.vista)
      // Fotos: marca os pontos uma vez; num ajuste, reaproveita a marcação já feita.
      let marcacoes = ajuste && leitura?.marcacoes?.length === fotos.length ? leitura.marcacoes : []
      let custoFotos = 0
      if (fotos.length && !marcacoes.length) {
        const m = await marcarFotos(fotos, (feitas, total) => setProgresso(`Marcando os pontos e medindo as fotos (${feitas} de ${total})...`))
        marcacoes = m.marcacoes
        custoFotos = m.custo
      }
      setProgresso('')
      const sistema = montarSistema({ ...contexto, modo: 'api', fotos: vistas })
      const mensagem = montarMensagem({
        paciente, ...contexto, relato, anterior: ajuste ? leitura?.bruto : null, ajuste, modo: 'api', fotos: vistas,
        analiseFotos: fotos.length ? achadosEmTexto(marcacoes, vistas) : ''
      })
      const r = await chamarAssistente({
        sistema,
        mensagem,
        esquema: montarEsquema({ ...contexto, comFotos: fotos.length > 0 })
      })
      r.custo_usd = (r.custo_usd || 0) + custoFotos
      const n = normalizarRespostaApi(r.dados)
      setLeitura({
        versao: Date.now(),
        relatorio: n.relatorio,
        dados: { ...n.dados, avaliacao: filtrarAvaliacao(n.dados.avaliacao, contexto.campos) },
        bruto: r.dados,
        custo: r.custo_usd,
        origem: 'api',
        fotos: fotos.map((f) => ({ blob: f.blob, previa: f.previa, vista: f.vista })),
        marcacoes
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
            fotos={fotos}
            setFotos={setFotos}
          />
        )}

        {gerando && (
          <Assist>
            <p className="flex items-center gap-2 font-semibold text-petroleo">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-petroleo border-t-transparent" />
              {progresso || (fotos.length ? 'Consolidando a análise postural e montando a prescrição...' : 'Analisando a avaliação e montando a prescrição...')}
            </p>
            <p className="mt-1 text-sm text-cinza-600">{fotos.length > 4 ? 'Com muitas fotos leva de 2 a 4 minutos.' : fotos.length ? 'Com fotos leva de 1 a 2 minutos.' : 'Leva de 20 a 60 segundos.'}</p>
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
            <p className="font-bold">
              Pronto. Avaliação, {leitura?.dados?.postura ? 'análise postural, ' : ''}exercícios e relatório salvos na ficha de {primeiroNome(paciente.nome)}.
            </p>
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

function Relato({ paciente, relato, setRelato, aoLevar, copiado, api, aoGerar, gerando, jaGerou, aoUsarManual, fotos, setFotos }) {
  const ditado = useDitado((t) => setRelato((r) => (r ? `${r} ${t}` : t)))
  return (
    <Assist>
      <p>
        Me conte a avaliação de <strong>{primeiroNome(paciente.nome)}</strong>: queixa, tempo, testes, achados, o que você tratou.{' '}
        {api ? 'Pode escrever ou ditar aqui e, se quiser, anexar fotos da postura.' : 'Pode escrever ou ditar aqui, ou deixar para ditar direto no Claude.'}
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
      {api && <AnexarFotos fotos={fotos} setFotos={setFotos} />}
      {api ? (
        <>
          <Botao tamanho="lg" bloco className="mt-3" icone="estrela" onClick={aoGerar} carregando={gerando} disabled={!relato.trim() && !fotos.length}>
            {jaGerou ? 'Gerar de novo' : 'Gerar com IA'}
          </Botao>
          <button onClick={aoUsarManual} className="mt-2 w-full text-center text-xs font-semibold text-cinza-600 underline">
            ou usar a ponte manual (copiar para o app do Claude, sem fotos)
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
  const { campos, biblioteca } = contexto
  const [verRelatorio, setVerRelatorio] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  // Prescrição atual do paciente: por padrão a nova substitui a antiga.
  const [atuais, setAtuais] = useState([])
  const [substituir, setSubstituir] = useState(true)
  useEffect(() => {
    listarPrescricao(paciente.id).then(setAtuais).catch(() => {})
  }, [paciente.id])

  // Exercícios do Dr. Pablo: liga à biblioteca própria (nunca à galeria de academia).
  const [sugestoes, setSugestoes] = useState(() => ligarSugestoes(leitura.dados, biblioteca))
  const [msgVideo, setMsgVideo] = useState('')
  const [postura, setPostura] = useState(leitura.dados.postura || null)
  const [marcacoes, setMarcacoes] = useState(leitura.marcacoes || [])
  const av = leitura.dados.avaliacao
  const preenchidos = campos.filter((c) => av[c.chave] !== undefined)
  const vazios = campos.filter((c) => av[c.chave] === undefined)

  const mudarAv = (chave, valor) =>
    setLeitura((l) => ({ ...l, dados: { ...l.dados, avaliacao: { ...l.dados.avaliacao, [chave]: valor } } }))

  async function salvar() {
    setSalvando(true)
    setErro('')
    try {
      await salvarAvaliacao({ paciente_id: paciente.id, data: hojeISO(), respostas: leitura.dados.avaliacao })
      await salvarPrescricaoPropria({ pacienteId: paciente.id, sugestoes, substituir, atuais })
      // Fotos vão para o espaço privado; o relatório guarda só o caminho e a vista.
      const fotosSalvas = []
      for (const f of postura ? leitura.fotos || [] : []) {
        fotosSalvas.push({ caminho: await enviarFotoPostural(paciente.id, f.blob), vista: f.vista })
      }
      await salvarRelatorio({
        paciente_id: paciente.id,
        relatorio: leitura.relatorio || '(sem texto)',
        resposta: { ...leitura.dados, postura, ...(marcacoes.length ? { marcacoes } : {}) },
        origem: leitura.origem === 'api' ? 'api' : 'ponte_manual',
        ...(fotosSalvas.length ? { fotos: fotosSalvas, visivel_paciente: true } : {})
      })
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

      {/* Análise postural (quando há fotos) */}
      {postura && (
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="camera" tamanho={18} /> Análise postural</div>
          <div className="rounded-2xl bg-cinza-50 p-3">
            <AnalisePostural
              postura={postura}
              fotos={leitura.fotos || []}
              marcacoes={marcacoes}
              aoMudarMarcacao={(i, m) => setMarcacoes((l) => l.map((x, k) => (k === i ? m : x)))}
              aoRemover={(i) => setPostura((p) => ({ ...p, achados: p.achados.filter((_, k) => k !== i) }))}
            />
          </div>
        </div>
      )}

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

      {/* Exercícios do Dr. Pablo */}
      <div className="mt-4">
        <div className="mb-1 flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="haltere" tamanho={18} /> Exercícios do Dr. Pablo</div>
        <p className="mb-2 text-xs text-cinza-600">Prescrição terapêutica para casa. O treino de academia (animações) fica na aba Academia da ficha.</p>
        {sugestoes.length === 0 ? (
          <p className="text-sm text-cinza-600">Nenhum exercício sugerido.</p>
        ) : (
          <CartoesSugestoes sugestoes={sugestoes} setSugestoes={setSugestoes} aoMensagem={setMsgVideo} />
        )}
        {msgVideo && <p className={`mt-2 text-sm font-medium ${/salvo/.test(msgVideo) ? 'text-ok' : 'text-alerta'}`}>{msgVideo}</p>}
      </div>

      {erro && <p className="mt-3 text-sm font-medium text-alerta">{erro}</p>}
      {atuais.length > 0 && (
        <label className="mt-4 flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
          <input type="checkbox" checked={substituir} onChange={(e) => setSubstituir(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]" />
          <span>
            <strong>Substituir os exercícios atuais</strong> ({atuais.length} exercício{atuais.length > 1 ? 's' : ''}: {atuais.map((p) => p.exercicios?.nome).filter(Boolean).join(', ')}).
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
