import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarSessoes } from '../lib/api.js'
import { formatarData } from '../lib/datas.js'
import { nomeSegmento } from '../components/coluna/segmentos.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import GraficoDor from '../components/GraficoDor.jsx'
import Card from '../components/ui/Card.jsx'

export default function AbaSessoes({ pacienteId }) {
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

      {sessoes.length > 1 && (
        <Card>
          <GraficoDor sessoes={[...sessoes].reverse()} />
        </Card>
      )}

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
