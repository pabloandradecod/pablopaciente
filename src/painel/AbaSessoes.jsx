import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarCheckins, listarSessoes, salvarPlano } from '../lib/api.js'
import { corDor } from '../components/GraficoEvolucao.jsx'
import { Campo } from '../components/ui/Campo.jsx'
import { formatarData } from '../lib/datas.js'
import { nomeSegmento } from '../components/coluna/segmentos.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import GraficoDor from '../components/GraficoDor.jsx'
import Card from '../components/ui/Card.jsx'

export default function AbaSessoes({ pacienteId, paciente }) {
  const [sessoes, setSessoes] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarSessoes(pacienteId).then(setSessoes).catch((e) => setErro(e.message))
  }, [pacienteId])

  if (erro) return <p className="text-sm text-alerta">{erro}</p>
  if (!sessoes) return <Carregando />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-petroleo-escuro">{sessoes.length} sessões</h2>
        <Botao para={`/painel/pacientes/${pacienteId}/sessoes/nova`} icone="mais">Nova sessão</Botao>
      </div>

      {paciente && <PlanoTratamento paciente={paciente} feitas={sessoes.length} />}

      {sessoes.length > 1 && (
        <Card>
          <GraficoDor sessoes={[...sessoes].reverse()} />
        </Card>
      )}

      <Checkins pacienteId={pacienteId} />

      {sessoes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-cinza-200 bg-white p-8 text-center text-sm text-cinza-600">
          Nenhuma sessão registrada.
        </div>
      )}

      <ul className="space-y-2">
        {sessoes.map((s) => (
          <li key={s.id}>
            <Link
              to={`/painel/pacientes/${pacienteId}/sessoes/${s.id}`}
              className="block rounded-2xl border border-cinza-100 bg-white p-4 transition hover:border-petroleo/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{formatarData(s.data)}</span>
                <span className="flex items-center gap-1 text-sm text-cinza-600">
                  Dor {s.dor_antes ?? '–'} <Icone nome="seta" tamanho={14} /> {s.dor_depois ?? '–'}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.segmentos.length === 0 && <span className="text-xs text-cinza-600">Sem segmentos marcados</span>}
                {s.segmentos.map((c) => (
                  <span key={c} className="rounded-md bg-destaque-claro px-2 py-0.5 text-xs font-semibold text-petroleo-escuro">
                    {nomeSegmento(c)}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FREQUENCIAS = ['1x por semana', '2x por semana', 'a cada 15 dias', '1x por mês']

// Plano combinado com o paciente: aparece no link com a barra de progresso.
function PlanoTratamento({ paciente, feitas }) {
  const [plano, setPlano] = useState({
    plano_sessoes: paciente.plano_sessoes ?? '',
    plano_frequencia: paciente.plano_frequencia ?? '1x por semana',
    plano_objetivo: paciente.plano_objetivo ?? ''
  })
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState('')
  const total = Number(plano.plano_sessoes) || 0

  async function salvar() {
    setSalvando(true)
    setMsg('')
    try {
      await salvarPlano(paciente.id, {
        plano_sessoes: total ? Math.min(60, Math.max(1, total)) : null,
        plano_frequencia: plano.plano_frequencia || null,
        plano_objetivo: plano.plano_objetivo.trim() || null
      })
      setMsg(total ? 'Plano salvo. Já aparece no link do paciente.' : 'Plano removido do link.')
    } catch (e) {
      setMsg(e.message)
    }
    setSalvando(false)
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="calendario" tamanho={18} /> Plano de tratamento</h2>
        {total > 0 && <span className="text-sm font-bold text-petroleo">{Math.min(feitas, total)} de {total} sessões</span>}
      </div>
      {total > 0 && (
        <div className="mt-3 flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={`h-2 flex-1 rounded-full ${i < feitas ? 'bg-petroleo' : 'bg-cinza-100'}`} />
          ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Campo id="plano-sessoes" type="number" min="1" max="60" rotulo="Número de sessões" placeholder="Ex.: 8" value={plano.plano_sessoes} onChange={(e) => setPlano({ ...plano, plano_sessoes: e.target.value })} />
        <div>
          <label htmlFor="plano-freq" className="mb-1.5 block text-sm font-semibold text-tinta">Frequência</label>
          <select id="plano-freq" value={plano.plano_frequencia} onChange={(e) => setPlano({ ...plano, plano_frequencia: e.target.value })} className="h-12 w-full rounded-xl border border-cinza-200 bg-white px-3 text-[15px] focus:border-petroleo focus:outline-none">
            {FREQUENCIAS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-3">
        <Campo
          id="plano-objetivo"
          rotulo="Objetivo combinado"
          placeholder="Ex.: ficar sentado no trabalho com menos dor e voltar a caminhar"
          value={plano.plano_objetivo}
          onChange={(e) => setPlano({ ...plano, plano_objetivo: e.target.value })}
        />
        <p className="mt-1 text-xs text-cinza-600">Escreva como meta de trabalho, sem promessa de cura ou de prazo.</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Botao onClick={salvar} carregando={salvando} icone="check" className="shrink-0">Salvar plano</Botao>
        {msg && <span className={`text-sm font-medium ${/salvo|removido/.test(msg) ? 'text-ok' : 'text-alerta'}`}>{msg}</span>}
      </div>
    </Card>
  )
}

const TEXTO_EXERCICIOS = { todos: 'todos os dias', alguns: 'alguns dias', nenhum: 'não fez' }

// Respostas do paciente no link entre as sessões.
function Checkins({ pacienteId }) {
  const [lista, setLista] = useState(null)
  useEffect(() => {
    listarCheckins(pacienteId).then(setLista).catch(() => setLista([]))
  }, [pacienteId])
  if (!lista) return null
  return (
    <Card>
      <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="conversa" tamanho={18} /> Check-ins pelo link</h2>
      <p className="mt-1 text-xs text-cinza-600">O link pergunta a dor e se fez os exercícios a partir de 5 dias depois da última sessão, no máximo 1 vez por semana.</p>
      {lista.length === 0 ? (
        <p className="mt-3 text-sm text-cinza-600">Nenhuma resposta ainda.</p>
      ) : (
        <ul className="mt-3 divide-y divide-cinza-100">
          {lista.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="text-cinza-600">{formatarData(c.criado_em.slice(0, 10))} · exercícios: {TEXTO_EXERCICIOS[c.exercicios]}</span>
              <span className="rounded-lg px-2 py-0.5 font-extrabold text-white" style={{ background: corDor(c.dor) }}>{c.dor}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
