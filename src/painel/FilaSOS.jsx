import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarSOS, mudarStatusSOS } from '../lib/api.js'
import { formatarDataHora, primeiroNome } from '../lib/datas.js'
import { linkWhatsapp } from '../lib/whatsapp.js'
import Botao from '../components/ui/Botao.jsx'
import Carregando from '../components/ui/Carregando.jsx'

const STATUS = [
  { id: 'novo', rotulo: 'Novos' },
  { id: 'agendado', rotulo: 'Agendados' },
  { id: 'atendido', rotulo: 'Atendidos' }
]

export default function FilaSOS() {
  const [lista, setLista] = useState(null)
  const [filtro, setFiltro] = useState('novo')
  const [erro, setErro] = useState('')

  const carregar = () => listarSOS().then(setLista).catch((e) => setErro(e.message))
  useEffect(() => {
    carregar()
  }, [])

  async function mudar(id, status) {
    setLista((l) => l.map((p) => (p.id === id ? { ...p, status } : p)))
    await mudarStatusSOS(id, status).catch((e) => setErro(e.message))
  }

  const visiveis = lista?.filter((p) => p.status === filtro) || []
  const conta = (s) => lista?.filter((p) => p.status === s).length || 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-petroleo-escuro">Fila SOS</h1>
      <p className="mb-4 text-sm text-cinza-600">Pedidos de retorno prioritário feitos pelo link. A triagem de sinais de alerta foi negativa em todos.</p>

      <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl bg-cinza-100 p-1">
        {STATUS.map((s) => (
          <button
            key={s.id}
            onClick={() => setFiltro(s.id)}
            className={`rounded-xl py-2 text-sm font-semibold ${filtro === s.id ? 'bg-white text-petroleo shadow-sm' : 'text-cinza-600'}`}
          >
            {s.rotulo} <span className="text-xs">({conta(s.id)})</span>
          </button>
        ))}
      </div>

      {erro && <p className="text-sm text-alerta">{erro}</p>}
      {!lista && <Carregando />}
      {lista && visiveis.length === 0 && (
        <div className="rounded-2xl border border-dashed border-cinza-200 bg-white p-8 text-center text-sm text-cinza-600">Nenhum pedido aqui.</div>
      )}

      <ul className="space-y-2">
        {visiveis.map((p) => (
          <li key={p.id} className="rounded-2xl border border-cinza-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/painel/pacientes/${p.pacientes?.id}`} className="font-semibold text-tinta hover:text-petroleo">
                  {p.pacientes?.nome}
                </Link>
                <div className="text-xs text-cinza-600">Pedido em {formatarDataHora(p.criado_em)}</div>
              </div>
              <select
                value={p.status}
                onChange={(e) => mudar(p.id, e.target.value)}
                className="h-9 rounded-lg border border-cinza-200 bg-white px-2 text-sm font-semibold"
                aria-label="Status do pedido"
              >
                <option value="novo">Novo</option>
                <option value="agendado">Agendado</option>
                <option value="atendido">Atendido</option>
              </select>
            </div>
            {p.pacientes && (
              <Botao
                href={linkWhatsapp(p.pacientes.whatsapp, `Olá, ${primeiroNome(p.pacientes.nome)}! Aqui é o Dr. Pablo. Recebi seu pedido de retorno. Tenho estes horários: `)}
                target="_blank"
                rel="noopener noreferrer"
                variante="secundario"
                tamanho="sm"
                icone="whatsapp"
                className="mt-3"
              >
                Responder no WhatsApp
              </Botao>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
