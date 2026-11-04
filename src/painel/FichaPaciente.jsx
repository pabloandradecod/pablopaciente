import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { excluirPaciente, lerPaciente } from '../lib/api.js'
import { formatarData } from '../lib/datas.js'
import { formatarTelefone } from '../lib/whatsapp.js'
import Icone from '../components/ui/Icone.jsx'
import Botao from '../components/ui/Botao.jsx'
import Modal from '../components/ui/Modal.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import AbaAvaliacao from './AbaAvaliacao.jsx'
import AbaSessoes from './AbaSessoes.jsx'
import AbaExercicios from './AbaExercicios.jsx'
import AbaLink from './AbaLink.jsx'
import AbaTreino from './AbaTreino.jsx'

const ABAS = [
  { id: 'avaliacao', rotulo: 'Avaliação', icone: 'documento' },
  { id: 'sessoes', rotulo: 'Sessões', icone: 'coluna' },
  { id: 'exercicios', rotulo: 'Dr. Pablo', icone: 'usuario' },
  { id: 'treino', rotulo: 'Academia', icone: 'haltere' },
  { id: 'link', rotulo: 'Link', icone: 'link' }
]

function idade(nasc) {
  const n = new Date(nasc + 'T12:00:00')
  const h = new Date()
  let a = h.getFullYear() - n.getFullYear()
  if (h.getMonth() < n.getMonth() || (h.getMonth() === n.getMonth() && h.getDate() < n.getDate())) a--
  return a
}

export default function FichaPaciente() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [params, setParams] = useSearchParams()
  const aba = params.get('aba') || 'avaliacao'
  const [p, setP] = useState(null)
  const [erro, setErro] = useState('')
  const [excluir, setExcluir] = useState(false)
  const [confirmaNome, setConfirmaNome] = useState('')

  useEffect(() => {
    lerPaciente(id).then(setP).catch((e) => setErro(e.message))
  }, [id])

  if (erro) return <p className="text-sm text-alerta">{erro}</p>
  if (!p) return <Carregando />

  return (
    <div>
      <Link to="/painel/pacientes" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-petroleo">
        <Icone nome="voltar" tamanho={16} /> Pacientes
      </Link>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-petroleo-escuro">{p.nome}</h1>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cinza-600">
            <span>{idade(p.data_nascimento)} anos</span>
            <span>{formatarTelefone(p.whatsapp)}</span>
            <span>Desde {formatarData(p.primeira_consulta)}</span>
            {p.senha_hash ? (
              <span className="font-semibold text-petroleo">Acesso por senha</span>
            ) : (
              <Link to={`/painel/pacientes/${id}/editar`} className="font-semibold text-alerta underline">Sem senha: definir</Link>
            )}
          </div>
        </div>
        <Botao para={`/painel/pacientes/${id}/editar`} variante="secundario" tamanho="sm" icone="editar">Editar</Botao>
      </div>

      <div className="mb-5 grid grid-cols-5 gap-1 rounded-2xl bg-cinza-100 p-1">
        {ABAS.map((a) => (
          <button
            key={a.id}
            onClick={() => setParams({ aba: a.id }, { replace: true })}
            className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-semibold transition sm:flex-row sm:justify-center sm:gap-2 sm:text-sm ${
              aba === a.id ? 'bg-white text-petroleo shadow-sm' : 'text-cinza-600'
            }`}
          >
            <Icone nome={a.icone} tamanho={18} />
            {a.rotulo}
          </button>
        ))}
      </div>

      {aba === 'avaliacao' && <AbaAvaliacao pacienteId={id} paciente={p} />}
      {aba === 'sessoes' && <AbaSessoes pacienteId={id} />}
      {aba === 'exercicios' && <AbaExercicios pacienteId={id} />}
      {aba === 'treino' && <AbaTreino paciente={p} />}
      {aba === 'link' && <AbaLink paciente={p} />}

      <div className="mt-10 border-t border-cinza-200 pt-5">
        <button onClick={() => setExcluir(true)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-alerta">
          <Icone nome="lixo" tamanho={16} /> Excluir paciente e todos os dados
        </button>
      </div>

      <Modal aberto={excluir} aoFechar={() => setExcluir(false)} titulo="Excluir paciente">
        <p className="text-sm text-cinza-600">
          Apaga definitivamente cadastro, avaliações, sessões, exercícios, link e pedidos SOS deste paciente. Use quando o paciente
          pedir a exclusão (LGPD). Para confirmar, digite o primeiro nome: <strong>{p.nome.split(' ')[0]}</strong>
        </p>
        <input
          value={confirmaNome}
          onChange={(e) => setConfirmaNome(e.target.value)}
          className="mt-3 h-11 w-full rounded-xl border border-cinza-200 px-3"
        />
        <Botao
          variante="perigo"
          bloco
          className="mt-4"
          disabled={confirmaNome.trim().toLowerCase() !== p.nome.split(' ')[0].toLowerCase()}
          onClick={async () => {
            await excluirPaciente(id)
            navegar('/painel/pacientes', { replace: true })
          }}
        >
          Excluir definitivamente
        </Botao>
      </Modal>
    </div>
  )
}
