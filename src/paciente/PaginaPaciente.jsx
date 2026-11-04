import { useEffect, useMemo, useRef, useState } from 'react'
import { pacienteDados, urlVideo } from '../lib/api.js'
import { supabaseConfigurado } from '../lib/supabase.js'
import { formatarData, formatarDataCurta } from '../lib/datas.js'
import { TEXTOS } from '../lib/textos.js'
import { WHATSAPP_CONSULTORIO } from '../lib/whatsapp.js'
import { gravarAcesso, limparChave, tokenDoLink } from './acesso.js'
import Confirmacao, { Tela } from './Confirmacao.jsx'
import BotaoSOS from './BotaoSOS.jsx'
import Logo, { Simbolo } from '../components/ui/Logo.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import MapaColuna, { LegendaMapa } from '../components/coluna/MapaColuna.jsx'
import { nomeSegmento, TODOS_CODIGOS } from '../components/coluna/segmentos.js'
import GraficoEvolucao, { corDor } from '../components/GraficoEvolucao.jsx'
import VideoLoop from '../components/VideoLoop.jsx'
import Impressao from './Impressao.jsx'
import { paraLista } from '../components/ui/Campo.jsx'

export default function PaginaPaciente() {
  const [acesso, setAcesso] = useState(() => tokenDoLink())
  const [dados, setDados] = useState(null)
  const [estado, setEstado] = useState('carregando') // carregando | confirmar | ok | erro | sem-link

  useEffect(() => {
    if (!supabaseConfigurado) return setEstado('erro')
    if (!acesso.token) return setEstado('sem-link')
    if (!acesso.chave) return setEstado('confirmar')
    let ativo = true
    setEstado('carregando')
    pacienteDados(acesso.token, acesso.chave)
      .then((r) => {
        if (!ativo) return
        if (r.ok) {
          setDados(r)
          setEstado('ok')
          document.title = `${r.paciente.primeiro_nome} | Dr. Pablo Andrade`
        } else {
          // Chave do aparelho não vale mais (link recriado ou revogado): pede a data de novo.
          limparChave()
          setAcesso((a) => ({ token: a.token }))
        }
      })
      .catch(() => ativo && setEstado('erro'))
    return () => {
      ativo = false
    }
  }, [acesso])

  if (estado === 'carregando') return <Carregando texto="Abrindo seu acompanhamento..." />
  if (estado === 'sem-link') {
    return (
      <Tela>
        <h1 className="text-2xl font-extrabold text-petroleo-escuro">Abra pelo link do WhatsApp</h1>
        <p className="mt-2 text-[15px] text-cinza-600">Para ver seu acompanhamento, toque no link que o Dr. Pablo enviou para você pelo WhatsApp.</p>
      </Tela>
    )
  }
  if (estado === 'erro') {
    return (
      <Tela>
        <h1 className="text-2xl font-extrabold text-petroleo-escuro">Não foi possível abrir</h1>
        <p className="mt-2 text-[15px] text-cinza-600">Verifique a internet e tente de novo.</p>
        <button onClick={() => window.location.reload()} className="mt-4 font-semibold text-petroleo">Tentar de novo</button>
      </Tela>
    )
  }
  if (estado === 'confirmar') {
    return (
      <Confirmacao
        token={acesso.token}
        aoConfirmar={(chave) => {
          const novo = { token: acesso.token, chave }
          gravarAcesso(novo)
          setAcesso(novo)
        }}
      />
    )
  }
  return <Conteudo dados={dados} acesso={acesso} />
}

// ---------------------------------------------------------------- utilitários

function useRevelar() {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setVisivel(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visivel]
}

function Revelar({ children, className = '', atraso = 0 }) {
  const [ref, visivel] = useRevelar()
  return (
    <div ref={ref} className={`revelar ${visivel ? 'visivel' : ''} ${className}`} style={{ transitionDelay: `${atraso}ms` }}>
      {children}
    </div>
  )
}

function Contador({ valor, duracao = 900 }) {
  const [n, setN] = useState(0)
  const [ref, visivel] = useRevelar()
  useEffect(() => {
    if (!visivel) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return setN(valor)
    let raf
    const inicio = performance.now()
    const passo = (t) => {
      const p = Math.min(1, (t - inicio) / duracao)
      setN(Math.round(valor * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(passo)
    }
    raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(raf)
  }, [visivel, valor, duracao])
  return <span ref={ref}>{n}</span>
}

function hojeChave() {
  const d = new Date()
  return `pp_feitos_${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
function lerFeitos() {
  try {
    return JSON.parse(localStorage.getItem(hojeChave())) || []
  } catch {
    return []
  }
}

const SECOES = [
  { id: 'avaliacao', rotulo: 'Avaliação' },
  { id: 'coluna', rotulo: 'Coluna' },
  { id: 'evolucao', rotulo: 'Evolução' },
  { id: 'exercicios', rotulo: 'Exercícios' },
  { id: 'treino', rotulo: 'Treino' },
  { id: 'indicar', rotulo: 'Indicar' }
]

function CabecalhoSecao({ numero, titulo, sub }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-extrabold tracking-[0.25em] text-petroleo">{numero}</span>
        <span className="h-px flex-1 bg-petroleo/15" />
      </div>
      <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-tight text-petroleo-escuro sm:text-4xl">{titulo}</h2>
      {sub && <p className="mt-2 max-w-md text-[15px] leading-relaxed text-cinza-600">{sub}</p>}
    </div>
  )
}

// ---------------------------------------------------------------- página

function Conteudo({ dados, acesso }) {
  const { paciente, avaliacao, sessoes, exercicios, treino } = dados
  const treinos = (treino?.treinos || []).filter((t) => t.itens?.length)
  const [sessaoSel, setSessaoSel] = useState(null)
  const [parteImpressao, setParteImpressao] = useState('completo')
  const [imprimir, setImprimir] = useState(0)

  function exportar(parte) {
    setParteImpressao(parte)
    setImprimir((n) => n + 1)
  }

  // Espera as imagens da versão de impressão carregarem e abre o "Imprimir / Salvar como PDF".
  useEffect(() => {
    if (!imprimir) return
    const tituloOriginal = document.title
    const nome = paciente.nome.trim().split(/\s+/).slice(0, 2).join(' ')
    document.title = parteImpressao === 'completo' ? `Resumo ${nome} - Dr Pablo Andrade` : `Exercicios ${nome} - Dr Pablo Andrade`
    const imgs = [...document.querySelectorAll('.so-impressao img')]
    Promise.all(
      imgs.map((img) => {
        img.loading = 'eager'
        return img.complete ? null : new Promise((ok) => ((img.onload = ok), (img.onerror = ok)))
      })
    ).then(() => {
      setTimeout(() => {
        window.print()
        document.title = tituloOriginal
      }, 150)
    })
  }, [imprimir]) // eslint-disable-line react-hooks/exhaustive-deps
  const [ativa, setAtiva] = useState('avaliacao')
  const ultima = sessoes.at(-1)

  const segmentos = useMemo(() => {
    if (sessaoSel != null) return sessoes[sessaoSel]?.segmentos || []
    const todos = new Set(sessoes.flatMap((s) => s.segmentos))
    return TODOS_CODIGOS.filter((c) => todos.has(c))
  }, [sessoes, sessaoSel])
  const totalSegmentos = useMemo(() => new Set(sessoes.flatMap((s) => s.segmentos)).size, [sessoes])

  const comDor = sessoes.filter((s) => s.dor_antes != null)
  const itens = (avaliacao?.itens || []).filter((i) => temValor(i))
  const secoes = SECOES.filter(
    (s) => (s.id !== 'avaliacao' || itens.length) && (s.id !== 'evolucao' || comDor.length) && (s.id !== 'exercicios' || exercicios.length) && (s.id !== 'treino' || treinos.length)
  )

  // Destaca no menu a seção que está na tela.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAtiva(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    secoes.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [secoes])

  return (
    <>
    <div className="nao-imprimir min-h-screen bg-papel pb-36">
      {/* Cabeçalho com a logo */}
      <header className="bg-white px-5 pb-10 pt-7">
        <div className="mx-auto max-w-2xl">
          <Logo altura={46} className="sm:h-14" />
          <Revelar className="mt-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-petroleo/70">Seu acompanhamento</p>
            <h1 className="mt-3 text-[44px] font-extrabold leading-[1] tracking-tight text-petroleo-escuro sm:text-6xl">
              Olá, <span className="marca-texto">{paciente.primeiro_nome}</span>.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-cinza-600">
              Este é o resumo do que fizemos juntos. Volte aqui sempre que quiser rever seus exercícios.
            </p>
          </Revelar>

          <Revelar atraso={100} className="mt-7">
            <AvaliacaoGoogle />
          </Revelar>

          {sessoes.length > 0 && (
            <Revelar atraso={150} className="mt-8 grid grid-cols-3 gap-2.5">
              <Estatistica valor={<Contador valor={sessoes.length} />} rotulo={sessoes.length === 1 ? 'sessão' : 'sessões'} />
              <Estatistica valor={<Contador valor={totalSegmentos} />} rotulo={totalSegmentos === 1 ? 'segmento tratado' : 'segmentos tratados'} />
              <Estatistica
                valor={formatarDataCurta(ultima.data)}
                rotulo="última sessão"
                destaque
              />
            </Revelar>
          )}
        </div>
      </header>

      {/* Menu de seções */}
      <nav className="sticky top-0 z-30 border-b border-black/5 bg-papel/90 backdrop-blur">
        <div className="sem-barra mx-auto flex max-w-2xl gap-1.5 overflow-x-auto px-5 py-3">
          {secoes.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                ativa === s.id ? 'bg-petroleo-escuro text-white' : 'bg-white text-cinza-600'
              }`}
            >
              {s.rotulo}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-2xl space-y-16 px-5 pt-10">
        {/* 01. Avaliação */}
        {itens.length > 0 && (
          <section id="avaliacao" className="scroll-mt-20">
            <Revelar>
              <CabecalhoSecao numero="01" titulo="Sua avaliação" sub={`O que conversamos no dia ${formatarData(avaliacao.data)}.`} />
            </Revelar>
            <div className="grid grid-cols-2 gap-2.5">
              {itens.map((i, idx) => (
                <Revelar key={i.chave} atraso={Math.min(idx, 6) * 60} className={['lista', 'sim_nao'].includes(i.tipo) ? '' : 'col-span-2'}>
                  <ItemAvaliacao item={i} />
                </Revelar>
              ))}
            </div>
          </section>
        )}

        {/* 02. Coluna */}
        <section id="coluna" className="scroll-mt-20">
          <Revelar>
            <CabecalhoSecao
              numero="02"
              titulo="Onde trabalhamos"
              sub="Em amarelo, os segmentos tratados. Toque numa sessão para ver só aquele dia."
            />
          </Revelar>
          <Revelar>
            <div className="rounded-[28px] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
              <MapaColuna selecionados={segmentos} animar className="mx-auto w-full max-w-[300px]" />
              <div className="mt-3"><LegendaMapa /></div>
            </div>
          </Revelar>
          {sessoes.length > 0 && (
            <div className="sem-barra -mx-5 mt-4 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1">
              <BotaoSessao ativo={sessaoSel == null} onClick={() => setSessaoSel(null)} titulo="Todas" sub={`${sessoes.length} ${sessoes.length === 1 ? 'sessão' : 'sessões'}`} />
              {[...sessoes].reverse().map((s) => {
                const idx = sessoes.indexOf(s)
                return (
                  <BotaoSessao
                    key={idx}
                    ativo={sessaoSel === idx}
                    onClick={() => setSessaoSel(sessaoSel === idx ? null : idx)}
                    titulo={formatarData(s.data)}
                    sub={s.segmentos.map(nomeSegmento).join(', ') || 'Sem registro'}
                  />
                )
              })}
            </div>
          )}
        </section>

        {/* 03. Evolução */}
        {comDor.length > 0 && (
          <section id="evolucao" className="scroll-mt-20">
            <Revelar>
              <CabecalhoSecao numero="03" titulo="Sua evolução" sub="Sua dor numa escala de 0 (sem dor) a 10 (pior dor possível)." />
            </Revelar>
            <Revelar>
              <Evolucao sessoes={comDor} />
            </Revelar>
          </section>
        )}

        {/* 04. Exercícios */}
        {exercicios.length > 0 && (
          <section id="exercicios" className="scroll-mt-20">
            <Revelar>
              <CabecalhoSecao numero="04" titulo="Seus exercícios" sub="Faça no seu ritmo. Se a dor aumentar durante um exercício, pare e avise o Dr. Pablo." />
            </Revelar>
            <Exercicios exercicios={exercicios} />
          </section>
        )}

        {/* 05. Sugestão de treino */}
        {treinos.length > 0 && (
          <section id="treino" className="scroll-mt-20">
            <Revelar>
              <CabecalhoSecao numero="05" titulo="Sugestão de treino" sub="Uma referência para a sua rotina na academia, dividida em A, B e C." />
            </Revelar>
            <SugestaoTreino treinos={treinos} orientacoes={treino?.observacao} />
          </section>
        )}

        {/* PDF para o médico ou educador físico */}
        <Revelar>
          <div className="rounded-[28px] bg-white p-5">
            <div className="flex items-center gap-2 text-lg font-extrabold text-petroleo-escuro">
              <Icone nome="documento" tamanho={22} /> Levar para outro profissional
            </div>
            <p className="mt-1 text-[15px] leading-relaxed text-cinza-600">
              Gere um PDF para mostrar ao seu médico ou ao seu educador físico. No celular, escolha "Salvar como PDF" ou "Compartilhar".
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => exportar('completo')}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-petroleo-escuro px-4 text-[15px] font-bold text-white"
              >
                <Icone nome="documento" tamanho={20} /> PDF completo (médico)
              </button>
              <button
                onClick={() => exportar('exercicios')}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-petroleo/20 px-4 text-[15px] font-bold text-petroleo"
              >
                <Icone nome="haltere" tamanho={20} /> Exercícios e treino (educador físico)
              </button>
            </div>
          </div>
        </Revelar>

        {/* 06. Indicar */}
        <section id="indicar" className="scroll-mt-20">
          <Revelar>
            <Indicacao nome={paciente.primeiro_nome} />
          </Revelar>
        </section>

        <footer className="flex flex-col items-center gap-3 pb-4 text-center">
          <Simbolo tamanho={36} className="opacity-80" />
          <p className="max-w-xs text-xs leading-relaxed text-cinza-600">{TEXTOS.rodapeLegal}</p>
          <p className="text-xs text-cinza-400">{TEXTOS.profissional} · {TEXTOS.cidade}</p>
        </footer>
      </main>

      <BotaoSOS token={acesso.token} chave={acesso.chave} nome={paciente.nome} />
    </div>
    <Impressao dados={dados} parte={parteImpressao} />
    </>
  )
}

function Estatistica({ valor, rotulo, destaque }) {
  return (
    <div className={`rounded-2xl p-3.5 ${destaque ? 'bg-petroleo-escuro text-white' : 'bg-papel text-petroleo-escuro'}`}>
      <div className="text-[26px] font-extrabold leading-none tracking-tight">{valor}</div>
      <div className={`mt-1.5 text-[11px] font-semibold leading-tight ${destaque ? 'text-white/70' : 'text-cinza-600'}`}>{rotulo}</div>
    </div>
  )
}

function BotaoSessao({ ativo, onClick, titulo, sub }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={ativo}
      className={`w-40 shrink-0 snap-start rounded-2xl p-3.5 text-left transition ${ativo ? 'bg-petroleo-escuro text-white' : 'bg-white text-tinta'}`}
    >
      <div className="text-sm font-extrabold">{titulo}</div>
      <div className={`mt-1 line-clamp-2 text-xs ${ativo ? 'text-white/75' : 'text-cinza-600'}`}>{sub}</div>
    </button>
  )
}

// ---------------------------------------------------------------- avaliação

function temValor(i) {
  const v = i.valor
  if (v == null || v === '') return false
  if (Array.isArray(v)) return v.length > 0
  if (i.tipo === 'sim_nao_texto') return v.resposta === 'sim' || v.resposta === 'nao'
  return true
}

function ItemAvaliacao({ item }) {
  const v = item.valor
  let conteudo
  if (item.tipo === 'escala') {
    conteudo = (
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-extrabold tracking-tight" style={{ color: corDor(v) === '#F4C542' ? '#B98B0E' : corDor(v) }}>{v}</span>
          <span className="text-sm font-semibold text-cinza-600">de 10</span>
        </div>
        <div className="relative mt-3 h-2.5 rounded-full" style={{ background: 'linear-gradient(90deg,#0E5C62,#F4C542 55%,#E58A3A)' }}>
          <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-petroleo-escuro shadow" style={{ left: `${v * 10}%` }} />
        </div>
      </div>
    )
  } else if (item.tipo === 'multipla') {
    conteudo = <Etiquetas lista={paraLista(v)} />
  } else if (item.tipo === 'sim_nao_texto') {
    const extras = [...paraLista(v.opcoes), ...(v.detalhe ? [v.detalhe] : [])]
    conteudo = (
      <div>
        <div className="text-lg font-bold text-tinta">{v.resposta === 'sim' ? 'Sim' : 'Não'}</div>
        {v.resposta === 'sim' && extras.length > 0 && <div className="mt-2"><Etiquetas lista={extras} /></div>}
      </div>
    )
  } else if (item.tipo === 'sim_nao') {
    conteudo = <div className="text-lg font-bold text-tinta">{v === 'sim' ? 'Sim' : 'Não'}</div>
  } else {
    conteudo = <div className="text-base font-bold leading-snug text-tinta">{String(v)}</div>
  }
  return (
    <div className="h-full rounded-3xl bg-white p-4">
      <div className="mb-1.5 text-[10px] font-extrabold uppercase leading-tight tracking-[0.12em] text-cinza-600">{item.rotulo}</div>
      {conteudo}
    </div>
  )
}

function Etiquetas({ lista }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {lista.map((t) => (
        <span key={t} className="rounded-full bg-petroleo-claro px-3 py-1.5 text-sm font-semibold text-petroleo-escuro">{t}</span>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------- evolução

function Evolucao({ sessoes }) {
  const primeira = sessoes[0]
  const ultima = sessoes.at(-1)

  if (sessoes.length === 1) {
    return (
      <div className="rounded-[28px] bg-white p-6">
        <p className="text-[15px] text-cinza-600">Na sua sessão de {formatarData(primeira.data)}:</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <BlocoDor rotulo="Ao chegar" valor={primeira.dor_antes} />
          <BlocoDor rotulo="Ao sair" valor={primeira.dor_depois} />
        </div>
        <p className="mt-4 text-xs text-cinza-600">O gráfico aparece a partir da segunda sessão.</p>
      </div>
    )
  }

  return (
    <div className="rounded-[28px] bg-white p-6">
      <div className="grid grid-cols-2 gap-3">
        <BlocoDor rotulo={`1ª sessão · ${formatarDataCurta(primeira.data)}`} valor={primeira.dor_antes} />
        <BlocoDor rotulo={`Última · ${formatarDataCurta(ultima.data)}`} valor={ultima.dor_antes} />
      </div>
      <div className="mt-7">
        <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-cinza-600">Dor ao chegar, sessão a sessão</div>
        <GraficoEvolucao sessoes={sessoes} />
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-cinza-600">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-petroleo" /> 0 a 3</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-destaque" /> 4 a 6</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-laranja" /> 7 a 10</span>
      </div>
    </div>
  )
}

function BlocoDor({ rotulo, valor }) {
  if (valor == null) return <div />
  return (
    <div className="rounded-2xl bg-papel p-4">
      <div className="text-[11px] font-bold text-cinza-600">{rotulo}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-petroleo-escuro"><Contador valor={valor} /></span>
        <span className="text-sm font-semibold text-cinza-600">/10</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- exercícios

function Exercicios({ exercicios }) {
  const [feitos, setFeitos] = useState(lerFeitos)
  const alternar = (nome) => {
    const novo = feitos.includes(nome) ? feitos.filter((n) => n !== nome) : [...feitos, nome]
    setFeitos(novo)
    try {
      localStorage.setItem(hojeChave(), JSON.stringify(novo))
    } catch {
      /* sem armazenamento: vale só nesta visita */
    }
  }
  const qtd = exercicios.filter((e) => feitos.includes(e.nome)).length
  const pct = Math.round((qtd / exercicios.length) * 100)

  return (
    <div>
      <Revelar>
        <div className="mb-4 flex items-center gap-4 rounded-3xl bg-petroleo-escuro p-4 text-white">
          <div className="relative h-14 w-14 shrink-0">
            <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#F4C542"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
                style={{ transition: 'stroke-dasharray .6s ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold">{qtd}/{exercicios.length}</span>
          </div>
          <div>
            <div className="font-extrabold">{qtd === exercicios.length ? 'Tudo feito hoje' : 'Exercícios de hoje'}</div>
            <div className="text-sm text-white/70">Marque cada um quando terminar.</div>
          </div>
        </div>
      </Revelar>

      <div className="sem-barra -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
        {exercicios.map((e, i) => {
          const feito = feitos.includes(e.nome)
          return (
            <article key={i} className="w-[84%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-white sm:w-auto">
              {e.video_path ? (
                <div className="relative">
                  {/* Vídeos próprios (gravados no celular) são verticais; as animações, quadradas. */}
                  <VideoLoop src={urlVideo(e.video_path)} proporcao={e.video_path.startsWith('galeria/') ? 'aspect-[4/3]' : 'aspect-[3/4]'} />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-extrabold text-petroleo-escuro">
                    {i + 1} / {exercicios.length}
                  </span>
                </div>
              ) : (
                <div className="px-5 pt-5">
                  <span className="rounded-full bg-petroleo-claro px-2.5 py-1 text-xs font-extrabold text-petroleo-escuro">
                    {i + 1} / {exercicios.length}
                  </span>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-extrabold leading-tight tracking-tight text-petroleo-escuro">{e.nome}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-tinta">{e.series}×</span>
                  <span className="text-lg font-bold text-tinta">{e.reps}</span>
                </div>
                <div className="text-xs font-semibold text-cinza-600">séries × repetições</div>
                {e.instrucoes && <p className="mt-3 text-[15px] leading-relaxed text-cinza-600">{e.instrucoes}</p>}
                {e.observacao && <p className="mt-3 rounded-2xl bg-destaque-claro p-3 text-sm font-semibold text-petroleo-escuro">{e.observacao}</p>}
                <button
                  onClick={() => alternar(e.nome)}
                  aria-pressed={feito}
                  className={`mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-[15px] font-bold transition ${
                    feito ? 'bg-petroleo text-white' : 'border-2 border-petroleo/20 text-petroleo'
                  }`}
                >
                  <Icone nome="check" tamanho={20} espessura={2.25} />
                  {feito ? 'Feito hoje' : 'Marcar como feito'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- indicação

function Indicacao({ nome }) {
  const telefone = '(35) 99873-2804'
  const mensagem =
    `Oi! Faço acompanhamento de quiropraxia com o Dr. Pablo Andrade, fisioterapeuta em Três Pontas. ` +
    `Se você sente dor nas costas, vale conversar com ele. WhatsApp: ${telefone} https://wa.me/${WHATSAPP_CONSULTORIO}`
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-petroleo-escuro p-7 text-white">
      <img src="/marca/simbolo.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-6 h-56 opacity-[0.08] invert" />
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-destaque">06 · Indique</p>
      <h2 className="mt-3 text-[30px] font-extrabold leading-[1.05] tracking-tight">
        Conhece alguém que vive com dor nas costas?
      </h2>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
        {nome}, envie o contato do Dr. Pablo para quem precisa. A mensagem já vai pronta.
      </p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex h-14 items-center gap-2.5 rounded-2xl bg-destaque px-5 text-base font-bold text-petroleo-escuro"
      >
        <Icone nome="whatsapp" tamanho={22} />
        Indicar pelo WhatsApp
      </a>
    </div>
  )
}

// ---------------------------------------------------------------- sugestão de treino

function SugestaoTreino({ treinos, orientacoes }) {
  const [ativo, setAtivo] = useState(treinos[0].letra)
  const atual = treinos.find((t) => t.letra === ativo) || treinos[0]
  return (
    <div>
      <div className="mb-3 flex gap-2">
        {treinos.map((t) => (
          <button
            key={t.letra}
            onClick={() => setAtivo(t.letra)}
            aria-pressed={ativo === t.letra}
            className={`flex-1 rounded-2xl px-3 py-3 text-left transition ${ativo === t.letra ? 'bg-petroleo-escuro text-white' : 'bg-white text-tinta'}`}
          >
            <span className="block text-2xl font-extrabold leading-none">{t.letra}</span>
            <span className={`mt-1 block line-clamp-2 text-[11px] font-semibold leading-tight ${ativo === t.letra ? 'text-white/75' : 'text-cinza-600'}`}>{t.foco || `Treino ${t.letra}`}</span>
          </button>
        ))}
      </div>

      <div className="rounded-[28px] bg-white p-4">
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h3 className="text-lg font-extrabold text-petroleo-escuro">Treino {atual.letra}</h3>
          <span className="text-xs font-semibold text-cinza-600">{atual.itens.length} exercícios</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {atual.itens.map((it, i) => (
            <div key={`${atual.letra}-${i}`} className="overflow-hidden rounded-2xl border border-cinza-100">
              <VideoLoop src={urlVideo(it.video)} proporcao="aspect-square" />
              <div className="p-2.5">
                <div className="text-[13px] font-bold leading-tight text-tinta">{it.nome}</div>
                <div className="mt-1 text-sm font-extrabold text-petroleo-escuro">
                  {it.series}× <span className="font-bold">{it.reps}</span>
                </div>
                {it.observacao && <p className="mt-1 text-[11px] leading-snug text-cinza-600">{it.observacao}</p>}
              </div>
            </div>
          ))}
        </div>
        {orientacoes && <p className="mt-4 rounded-2xl bg-papel p-3 text-sm leading-relaxed text-cinza-600">{orientacoes}</p>}
      </div>

      {/* Aviso: sugestão do fisioterapeuta, não obrigação */}
      <div className="mt-4 rounded-[24px] bg-gradient-to-br from-[#E9AE12] to-[#C98A00] p-5 text-white shadow-[0_12px_30px_-14px_rgba(201,138,0,0.9)]">
        <div className="flex items-center gap-2">
          <Icone nome="alerta" tamanho={22} espessura={2.25} />
          <span className="text-[17px] font-extrabold leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">Sugestão do fisioterapeuta</span>
        </div>
        <p className="mt-2 text-[15px] font-semibold leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">
          Este treino é uma sugestão de referência, não uma obrigação. Ele não substitui o acompanhamento de um profissional de
          educação física. Respeite seus limites e pare se sentir dor.
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- avaliação no Google

function Estrelas() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F4C542">
          <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L2.9 9.4l6.3-.9z" />
        </svg>
      ))}
    </div>
  )
}

// Primeira coisa do link: pedido de avaliação no Google (o mesmo para todos os pacientes).
function AvaliacaoGoogle() {
  const CHAVE = 'pp_avaliou_google'
  const [avaliou, setAvaliou] = useState(() => {
    try {
      return localStorage.getItem(CHAVE) === '1'
    } catch {
      return false
    }
  })
  const marcar = () => {
    setAvaliou(true)
    try {
      localStorage.setItem(CHAVE, '1')
    } catch {
      /* sem armazenamento */
    }
  }

  if (avaliou) {
    return (
      <a href={TEXTOS.linkAvaliacaoGoogle} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl bg-papel px-4 py-3 text-sm font-semibold text-petroleo-escuro">
        <Estrelas />
        <span>Obrigado pela avaliação!</span>
      </a>
    )
  }

  return (
    <div className="rounded-[28px] bg-petroleo-escuro p-5 text-white">
      <Estrelas />
      <h2 className="mt-3 text-[22px] font-extrabold leading-tight tracking-tight">Faça uma avaliação e me ajude no Google</h2>
      <p className="mt-1.5 text-[15px] leading-relaxed text-white/75">
        Leva menos de um minuto e ajuda outras pessoas com dor nas costas a encontrar atendimento.
      </p>
      <a
        href={TEXTOS.linkAvaliacaoGoogle}
        target="_blank"
        rel="noopener noreferrer"
        onClick={marcar}
        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-destaque text-base font-extrabold text-petroleo-escuro shadow-[0_8px_24px_-10px_rgba(244,197,66,0.9)]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L2.9 9.4l6.3-.9z" />
        </svg>
        Avaliar no Google
      </a>
    </div>
  )
}
