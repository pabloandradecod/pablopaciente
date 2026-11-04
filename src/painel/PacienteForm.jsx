import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { lerConfiguracoes, lerPaciente, salvarPaciente } from '../lib/api.js'
import { hojeISO } from '../lib/datas.js'
import { formatarTelefone } from '../lib/whatsapp.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import { Campo } from '../components/ui/Campo.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'

export default function PacienteForm() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [cfg, setCfg] = useState(null)
  const [form, setForm] = useState({ nome: '', data_nascimento: '', whatsapp: '', primeira_consulta: hojeISO() })
  const [aceite, setAceite] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    lerConfiguracoes().then(setCfg).catch((e) => setErro(e.message))
    if (id) {
      lerPaciente(id)
        .then((p) => {
          setForm({ nome: p.nome, data_nascimento: p.data_nascimento, whatsapp: formatarTelefone(p.whatsapp), primeira_consulta: p.primeira_consulta })
          setAceite(true)
        })
        .catch((e) => setErro(e.message))
    }
  }, [id])

  const mudar = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    const whatsapp = form.whatsapp.replace(/\D/g, '')
    if (whatsapp.length < 10) return setErro('Informe o WhatsApp com DDD.')
    if (!id && !aceite) return setErro('O paciente precisa aceitar o termo de consentimento.')
    setSalvando(true)
    try {
      const dados = { ...form, nome: form.nome.trim(), whatsapp }
      if (id) dados.id = id
      else {
        dados.consentimento_aceito = true
        dados.consentimento_em = new Date().toISOString()
        dados.consentimento_versao = cfg?.termo_versao || 'sem-versao'
      }
      const p = await salvarPaciente(dados)
      navegar(`/painel/pacientes/${p.id}`, { replace: true })
    } catch (err) {
      setErro(err.message)
      setSalvando(false)
    }
  }

  if (!cfg && !erro) return <Carregando />

  return (
    <form onSubmit={salvar} className="mx-auto max-w-xl">
      <Link to={id ? `/painel/pacientes/${id}` : '/painel/pacientes'} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-petroleo">
        <Icone nome="voltar" tamanho={16} /> Voltar
      </Link>
      <h1 className="mb-4 text-2xl font-bold text-petroleo-escuro">{id ? 'Editar paciente' : 'Novo paciente'}</h1>

      <Card className="space-y-4">
        <Campo id="nome" rotulo="Nome completo" required value={form.nome} onChange={mudar('nome')} autoComplete="off" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo id="nasc" type="date" rotulo="Data de nascimento" required value={form.data_nascimento} onChange={mudar('data_nascimento')} max={hojeISO()} />
          <Campo id="primeira" type="date" rotulo="Primeira consulta" required value={form.primeira_consulta} onChange={mudar('primeira_consulta')} />
        </div>
        <Campo
          id="whats"
          type="tel"
          inputMode="tel"
          rotulo="WhatsApp"
          dica="com DDD"
          placeholder="(35) 99999-9999"
          required
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: formatarTelefone(e.target.value) }))}
        />
      </Card>

      {!id && (
        <Card className="mt-4">
          <h2 className="mb-2 font-bold text-petroleo-escuro">Termo de consentimento</h2>
          <p className="max-h-48 overflow-y-auto whitespace-pre-line rounded-xl bg-cinza-50 p-3 text-sm leading-relaxed text-cinza-600">
            {cfg?.termo_texto}
          </p>
          <label className="mt-3 flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#0E5C62]" />
            <span className="text-sm font-medium">
              O paciente leu e aceitou o termo. Fica registrado com data, hora e versão ({cfg?.termo_versao}).
            </span>
          </label>
        </Card>
      )}

      {erro && <p className="mt-3 text-sm font-medium text-alerta">{erro}</p>}
      <Botao type="submit" bloco tamanho="lg" className="mt-4" carregando={salvando}>
        {id ? 'Salvar alterações' : 'Cadastrar paciente'}
      </Botao>
    </form>
  )
}
