import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { definirSenha, lerConfiguracoes, lerPaciente, salvarPaciente } from '../lib/api.js'
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
  const [senha, setSenha] = useState('')
  const [temSenha, setTemSenha] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    lerConfiguracoes().then(setCfg).catch((e) => setErro(e.message))
    if (id) {
      lerPaciente(id)
        .then((p) => {
          setForm({ nome: p.nome, data_nascimento: p.data_nascimento, whatsapp: formatarTelefone(p.whatsapp), primeira_consulta: p.primeira_consulta })
          setAceite(true)
          setTemSenha(Boolean(p.senha_hash))
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
    if (!id && senha.trim().length < 4) return setErro('Crie uma senha de acesso com pelo menos 4 caracteres.')
    if (id && senha && senha.trim().length < 4) return setErro('A nova senha precisa ter pelo menos 4 caracteres.')
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
      if (senha.trim()) await definirSenha(p.id, senha.trim())
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
        <div>
          <label htmlFor="senha" className="mb-1.5 block text-sm font-semibold text-tinta">
            {id ? 'Nova senha de acesso' : 'Senha de acesso do paciente'}
            <span className="ml-1 font-normal text-cinza-600">
              {id ? (temSenha ? '(deixe em branco para manter a atual)' : '(este paciente ainda entra pela data de nascimento)') : '(ele usa para abrir o link)'}
            </span>
          </label>
          <div className="flex gap-2">
            <input
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="Mínimo 4 caracteres"
              className="h-11 min-w-0 flex-1 rounded-xl border border-cinza-200 bg-white px-3.5 text-[15px] tracking-wider focus:border-petroleo focus:outline-none focus:ring-2 focus:ring-petroleo/15"
            />
            <Botao type="button" variante="secundario" onClick={() => setSenha(String(Math.floor(100000 + Math.random() * 900000)))}>Gerar</Botao>
          </div>
          <p className="mt-1 text-xs text-cinza-600">
            Anote e passe para o paciente. Por segurança, a senha não pode ser vista depois, só trocada.
            {id && temSenha && ' Trocar a senha desconecta os celulares que já entraram.'}
          </p>
        </div>
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
