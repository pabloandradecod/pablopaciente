import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { dadosRetornos, registrarContato } from '../lib/api.js'
import { montarRetornos, mensagemRetorno } from '../lib/retornos.js'
import { linkWhatsapp } from '../lib/whatsapp.js'
import { corDor } from '../components/GraficoEvolucao.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'

const COR = {
  alerta: 'bg-alerta-claro text-alerta',
  destaque: 'bg-destaque-claro text-petroleo-escuro',
  petroleo: 'bg-petroleo-claro text-petroleo',
  cinza: 'bg-cinza-100 text-cinza-600'
}

// "Quem chamar hoje": pacientes para contato, com a mensagem de WhatsApp pronta.
export default function Retornos() {
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')
  const [feitos, setFeitos] = useState({}) // paciente_id -> true (some da lista depois do contato)

  useEffect(() => {
    dadosRetornos().then(setDados).catch((e) => setErro(e.message))
  }, [])

  const grupos = useMemo(() => (dados ? montarRetornos(dados) : []), [dados])
  const total = grupos.reduce((n, g) => n + g.itens.filter((i) => !feitos[i.paciente.id]).length, 0)
  const respostasSemana = useMemo(() => {
    if (!dados) return []
    const nomes = Object.fromEntries(dados.pacientes.map((p) => [p.id, p]))
    return dados.checkins
      .filter((c) => Date.now() - new Date(c.criado_em) < 7 * 86400000)
      .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
      .map((c) => ({ ...c, paciente: nomes[c.paciente_id] }))
      .filter((c) => c.paciente)
  }, [dados])

  async function contatar(item, abrir) {
    if (abrir) window.open(linkWhatsapp(item.paciente.whatsapp, mensagemRetorno(item)), '_blank', 'noopener,noreferrer')
    setFeitos((f) => ({ ...f, [item.paciente.id]: true }))
    try {
      await registrarContato(item.paciente.id, item.categoria)
    } catch (e) {
      setErro(e.message)
    }
  }

  if (erro && !dados) return <p className="text-sm text-alerta">{erro}</p>
  if (!dados) return <Carregando />

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-petroleo/70">Retornos</p>
      <h1 className="mt-1 text-[28px] font-extrabold leading-tight tracking-tight text-petroleo-escuro">Quem chamar hoje</h1>
      <p className="mt-1 text-sm text-cinza-600">
        {total ? `${total} ${total === 1 ? 'paciente' : 'pacientes'} para contato.` : 'Tudo em dia por hoje.'} A mensagem já vai pronta no WhatsApp;
        depois do contato, o paciente sai da lista por 7 dias.
      </p>

      {grupos.length > 0 && (
        <div className="sem-barra -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
          {grupos.map((g) => (
            <a key={g.categoria} href={`#ret-${g.categoria}`} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${COR[g.cor]}`}>
              {g.titulo} · {g.itens.filter((i) => !feitos[i.paciente.id]).length}
            </a>
          ))}
        </div>
      )}

      {erro && <p className="mt-3 text-sm text-alerta">{erro}</p>}

      <div className="mt-5 space-y-6">
        {grupos.map((g) => {
          const pendentes = g.itens.filter((i) => !feitos[i.paciente.id])
          if (!pendentes.length) return null
          return (
            <section key={g.categoria} id={`ret-${g.categoria}`} className="scroll-mt-20">
              <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro">
                <span className={`h-2.5 w-2.5 rounded-full ${COR[g.cor].split(' ')[0]}`} style={g.cor === 'alerta' ? { background: '#D9483B' } : undefined} />
                {g.titulo}
              </h2>
              <p className="mb-2 text-xs text-cinza-600">{g.descricao}</p>
              <ul className="space-y-2">
                {pendentes.map((item) => (
                  <li key={item.paciente.id} className="rounded-2xl border border-cinza-100 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link to={`/painel/pacientes/${item.paciente.id}`} className="font-bold text-tinta hover:text-petroleo">
                          {item.paciente.nome}
                        </Link>
                        <p className="mt-0.5 text-sm text-cinza-600">{item.detalhe}</p>
                      </div>
                      {item.checkin && (
                        <span className="shrink-0 rounded-xl px-2.5 py-1 text-sm font-extrabold text-white" style={{ background: corDor(item.checkin.dor) }} title="Dor no check-in">
                          {item.checkin.dor}
                        </span>
                      )}
                    </div>
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer font-semibold text-cinza-600">Ver mensagem</summary>
                      <p className="mt-1 rounded-xl bg-cinza-50 p-2.5 leading-relaxed text-tinta">{mensagemRetorno(item)}</p>
                    </details>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Botao tamanho="sm" icone="whatsapp" onClick={() => contatar(item, true)}>Chamar no WhatsApp</Botao>
                      <Botao tamanho="sm" variante="fantasma" icone="check" onClick={() => contatar(item, false)}>Já falei</Botao>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
        {total === 0 && (
          <div className="rounded-2xl border border-dashed border-cinza-200 bg-white p-8 text-center">
            <Icone nome="check" tamanho={28} className="mx-auto text-ok" />
            <p className="mt-2 font-bold text-petroleo-escuro">Ninguém para chamar agora</p>
            <p className="mt-1 text-sm text-cinza-600">Os pacientes aparecem aqui quando a dor sobe no check-in, quando param os exercícios ou quando ficam sem retorno.</p>
          </div>
        )}
      </div>

      {respostasSemana.length > 0 && (
        <section className="mt-8">
          <h2 className="font-bold text-petroleo-escuro">Check-ins da semana</h2>
          <p className="mb-2 text-xs text-cinza-600">Respostas dos pacientes no link nos últimos 7 dias.</p>
          <ul className="divide-y divide-cinza-100 rounded-2xl border border-cinza-100 bg-white">
            {respostasSemana.map((c, i) => (
              <li key={i} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <Link to={`/painel/pacientes/${c.paciente_id}`} className="min-w-0 truncate font-semibold hover:text-petroleo">{c.paciente.nome}</Link>
                <span className="flex shrink-0 items-center gap-3 text-xs text-cinza-600">
                  {{ todos: 'exercícios: todos os dias', alguns: 'exercícios: alguns dias', nenhum: 'exercícios: não fez' }[c.exercicios]}
                  <span className="rounded-lg px-2 py-0.5 text-sm font-extrabold text-white" style={{ background: corDor(c.dor) }}>{c.dor}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
