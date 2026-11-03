import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarPacientes } from '../lib/api.js'
import { formatarData } from '../lib/datas.js'
import { formatarTelefone } from '../lib/whatsapp.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'

const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Pacientes() {
  const [lista, setLista] = useState(null)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    listarPacientes().then(setLista).catch((e) => setErro(e.message))
  }, [])

  const filtrados = useMemo(() => {
    if (!lista) return []
    const b = semAcento(busca.trim())
    const digitos = busca.replace(/\D/g, '')
    return lista.filter((p) => !b || semAcento(p.nome).includes(b) || (digitos && p.whatsapp.includes(digitos)))
  }, [lista, busca])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-petroleo-escuro">Pacientes</h1>
          {lista && <p className="text-sm text-cinza-600">{lista.length} cadastrados</p>}
        </div>
        <Botao para="/painel/pacientes/novo" icone="mais">Novo paciente</Botao>
      </div>

      <div className="relative mb-4">
        <Icone nome="busca" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-400" />
        <input
          type="search"
          placeholder="Buscar por nome ou WhatsApp"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="h-12 w-full rounded-xl border border-cinza-200 bg-white pl-11 pr-4 text-[15px] focus:border-petroleo focus:outline-none focus:ring-2 focus:ring-petroleo/15"
        />
      </div>

      {erro && <p className="text-sm text-alerta">{erro}</p>}
      {!lista && !erro && <Carregando />}
      {lista && filtrados.length === 0 && (
        <div className="rounded-2xl border border-dashed border-cinza-200 bg-white p-8 text-center text-sm text-cinza-600">
          {lista.length === 0 ? 'Nenhum paciente cadastrado ainda.' : 'Nenhum paciente encontrado.'}
        </div>
      )}

      <ul className="space-y-2">
        {filtrados.map((p) => {
          const ultima = p.sessoes?.map((s) => s.data).sort().at(-1)
          const temLink = p.paciente_tokens?.some((t) => !t.revogado_em)
          return (
            <li key={p.id}>
              <Link
                to={`/painel/pacientes/${p.id}`}
                className="flex items-center gap-3 rounded-2xl border border-cinza-100 bg-white p-4 transition hover:border-petroleo/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-petroleo-claro font-bold text-petroleo">
                  {p.nome.trim()[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-tinta">{p.nome}</div>
                  <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-cinza-600">
                    <span>{formatarTelefone(p.whatsapp)}</span>
                    <span>{p.sessoes?.length || 0} sessões</span>
                    {ultima && <span>Última: {formatarData(ultima)}</span>}
                  </div>
                </div>
                {temLink && (
                  <span className="hidden rounded-full bg-petroleo-claro px-2.5 py-1 text-xs font-semibold text-petroleo sm:inline">Link ativo</span>
                )}
                <Icone nome="seta" className="text-cinza-400" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
