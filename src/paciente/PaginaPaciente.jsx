import { useEffect, useMemo, useState } from 'react'
import { pacienteDados, urlVideo } from '../lib/api.js'
import { supabaseConfigurado } from '../lib/supabase.js'
import { formatarData } from '../lib/datas.js'
import { TEXTOS } from '../lib/textos.js'
import { gravarAcesso, limparChave, tokenDoLink } from './acesso.js'
import Confirmacao, { LinkInativo, Tela } from './Confirmacao.jsx'
import BotaoSOS from './BotaoSOS.jsx'
import Logo from '../components/ui/Logo.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import MapaColuna, { LegendaMapa } from '../components/coluna/MapaColuna.jsx'
import { nomeSegmento, TODOS_CODIGOS } from '../components/coluna/segmentos.js'
import GraficoDor from '../components/GraficoDor.jsx'
import VideoLoop from '../components/VideoLoop.jsx'

export default function PaginaPaciente() {
  const [acesso, setAcesso] = useState(() => tokenDoLink())
  const [dados, setDados] = useState(null)
  const [estado, setEstado] = useState('carregando') // carregando | confirmar | ok | erro | inativo | sem-link

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
        <h1 className="text-xl font-bold text-petroleo-escuro">Abra pelo link do WhatsApp</h1>
        <p className="mt-2 text-[15px] text-cinza-600">Para ver seu acompanhamento, toque no link que o Dr. Pablo enviou para você pelo WhatsApp.</p>
      </Tela>
    )
  }
  if (estado === 'inativo') return <LinkInativo />
  if (estado === 'erro') {
    return (
      <Tela>
        <h1 className="text-xl font-bold text-petroleo-escuro">Não foi possível abrir</h1>
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

function Secao({ titulo, icone, children }) {
  return (
    <section className="rounded-3xl border border-cinza-100 bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-petroleo-escuro">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-petroleo-claro text-petroleo">
          <Icone nome={icone} tamanho={18} />
        </span>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

function valorLegivel(item) {
  const v = item.valor
  if (v == null || v === '') return null
  switch (item.tipo) {
    case 'escala':
      return `${v} de 10`
    case 'sim_nao':
      return v === 'sim' ? 'Sim' : 'Não'
    case 'sim_nao_texto':
      if (v.resposta === 'sim') return v.detalhe ? `Sim: ${v.detalhe}` : 'Sim'
      return v.resposta === 'nao' ? 'Não' : null
    default:
      return String(v)
  }
}

function Conteudo({ dados, acesso }) {
  const { paciente, avaliacao, sessoes, exercicios } = dados
  const [sessaoSel, setSessaoSel] = useState(null)
  const ultima = sessoes.at(-1)

  const segmentos = useMemo(() => {
    if (sessaoSel != null) return sessoes[sessaoSel]?.segmentos || []
    const todos = new Set(sessoes.flatMap((s) => s.segmentos))
    return TODOS_CODIGOS.filter((c) => todos.has(c))
  }, [sessoes, sessaoSel])

  const itensAvaliacao = (avaliacao?.itens || []).map((i) => ({ ...i, texto: valorLegivel(i) })).filter((i) => i.texto)
  const comDor = sessoes.filter((s) => s.dor_antes != null || s.dor_depois != null)

  return (
    <div className="min-h-screen bg-cinza-50 pb-32">
      {/* 1. Cabeçalho */}
      <header className="bg-petroleo-escuro px-4 pb-16 pt-5 text-white">
        <div className="mx-auto max-w-xl">
          <Logo claro compacto />
          <h1 className="mt-7 text-3xl font-extrabold">Olá, {paciente.primeiro_nome}</h1>
          <p className="mt-1 text-[15px] text-white/80">
            {ultima ? (
              <>Última sessão em <strong className="text-destaque">{formatarData(ultima.data)}</strong></>
            ) : (
              'Aqui fica o resumo do seu acompanhamento.'
            )}
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-10 max-w-xl space-y-4 px-4">
        {/* 2. Avaliação */}
        {itensAvaliacao.length > 0 && (
          <Secao titulo="Minha avaliação" icone="documento">
            <dl className="space-y-3">
              {itensAvaliacao.map((i) => (
                <div key={i.chave}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-cinza-600">{i.rotulo}</dt>
                  <dd className="mt-0.5 text-[15px] text-tinta">{i.texto}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-cinza-600">Avaliação feita em {formatarData(avaliacao.data)}.</p>
          </Secao>
        )}

        {/* 3. Mapa da coluna */}
        <Secao titulo="Segmentos tratados" icone="coluna">
          <MapaColuna selecionados={segmentos} className="mx-auto w-full max-w-[300px]" />
          <div className="mt-3"><LegendaMapa /></div>

          {sessoes.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold text-tinta">Sessões</h3>
                {sessaoSel != null && (
                  <button onClick={() => setSessaoSel(null)} className="text-sm font-semibold text-petroleo">Ver todas</button>
                )}
              </div>
              <ul className="space-y-1.5">
                {[...sessoes].reverse().map((s) => {
                  const idx = sessoes.indexOf(s)
                  const ativo = sessaoSel === idx
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => setSessaoSel(ativo ? null : idx)}
                        aria-pressed={ativo}
                        className={`w-full rounded-2xl border p-3 text-left transition ${ativo ? 'border-petroleo bg-petroleo-claro' : 'border-cinza-100 bg-cinza-50'}`}
                      >
                        <div className="text-sm font-semibold">{formatarData(s.data)}</div>
                        <div className="mt-0.5 text-xs text-cinza-600">{s.segmentos.map(nomeSegmento).join(', ') || 'Sem segmentos registrados'}</div>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-2 text-xs text-cinza-600">Toque numa sessão para ver só os segmentos daquele dia.</p>
            </div>
          )}
        </Secao>

        {/* 4. Evolução */}
        {comDor.length > 0 && (
          <Secao titulo="Minha evolução" icone="grafico">
            <p className="mb-3 text-sm text-cinza-600">Sua dor de 0 a 10, registrada em cada sessão.</p>
            <GraficoDor sessoes={sessoes} />
          </Secao>
        )}

        {/* 5. Exercícios */}
        {exercicios.length > 0 && (
          <Secao titulo="Meus exercícios" icone="haltere">
            <p className="-mt-2 mb-4 text-sm text-cinza-600">Faça no seu ritmo. Se a dor aumentar durante o exercício, pare e avise o Dr. Pablo.</p>
            <div className="space-y-4">
              {exercicios.map((e, i) => (
                <article key={i} className="overflow-hidden rounded-2xl border border-cinza-100">
                  <VideoLoop src={urlVideo(e.video_path)} />
                  <div className="p-4">
                    <h3 className="text-base font-bold text-tinta">{e.nome}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-destaque-claro px-2.5 py-1 text-sm font-bold text-petroleo-escuro">{e.series} séries</span>
                      <span className="rounded-lg bg-destaque-claro px-2.5 py-1 text-sm font-bold text-petroleo-escuro">{e.reps}</span>
                    </div>
                    {e.instrucoes && <p className="mt-3 text-[15px] leading-relaxed text-cinza-600">{e.instrucoes}</p>}
                    {e.observacao && <p className="mt-2 rounded-xl bg-petroleo-claro p-3 text-sm font-medium text-petroleo-escuro">{e.observacao}</p>}
                  </div>
                </article>
              ))}
            </div>
          </Secao>
        )}

        <footer className="px-2 pb-4 pt-4 text-center text-xs leading-relaxed text-cinza-600">
          <p>{TEXTOS.rodapeLegal}</p>
          <p className="mt-2">{TEXTOS.profissional} · {TEXTOS.especialidade} · {TEXTOS.cidade}</p>
        </footer>
      </main>

      {/* 6. Botão SOS fixo */}
      <BotaoSOS token={acesso.token} chave={acesso.chave} nome={paciente.nome} />
    </div>
  )
}
