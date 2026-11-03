import { useState } from 'react'
import { pacienteConfirmar } from '../lib/api.js'
import { linkWhatsapp, WHATSAPP_CONSULTORIO } from '../lib/whatsapp.js'
import Botao from '../components/ui/Botao.jsx'
import Logo from '../components/ui/Logo.jsx'
import Icone from '../components/ui/Icone.jsx'

function mascarar(v) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

function paraISO(v) {
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return null
  const [, d, mes, a] = m
  const dt = new Date(`${a}-${mes}-${d}T12:00:00`)
  if (isNaN(dt) || dt.getDate() !== +d || dt.getFullYear() < 1900 || dt > new Date()) return null
  return `${a}-${mes}-${d}`
}

export function LinkInativo() {
  return (
    <Tela>
      <h1 className="text-xl font-bold text-petroleo-escuro">Link não está ativo</h1>
      <p className="mt-2 text-[15px] text-cinza-600">Este link foi substituído ou desativado. Peça um novo pelo WhatsApp do consultório.</p>
      <Botao
        href={linkWhatsapp(WHATSAPP_CONSULTORIO, 'Olá! Sou paciente do Dr. Pablo e preciso de um novo link de acompanhamento.')}
        target="_blank"
        rel="noopener noreferrer"
        variante="primario"
        tamanho="lg"
        bloco
        icone="whatsapp"
        className="mt-6"
      >
        Pedir novo link
      </Botao>
    </Tela>
  )
}

export function Tela({ children }) {
  return (
    <div className="min-h-screen bg-petroleo-escuro px-4 py-8">
      <div className="mx-auto max-w-sm">
        <Logo claro />
        <div className="mt-8 rounded-3xl bg-white p-6">{children}</div>
      </div>
    </div>
  )
}

export default function Confirmacao({ token, aoConfirmar }) {
  const [data, setData] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [inativo, setInativo] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    const iso = paraISO(data)
    if (!iso) return setErro('Digite a data completa, no formato dia/mês/ano.')
    setErro('')
    setEnviando(true)
    try {
      const r = await pacienteConfirmar(token, iso)
      if (r.ok) return aoConfirmar(r.chave)
      if (r.erro === 'link_invalido') setInativo(true)
      else if (r.erro === 'bloqueado') setErro('Muitas tentativas. Por segurança, tente de novo em 15 minutos.')
      else setErro('A data não confere. Confira e tente de novo.')
    } catch {
      setErro('Sem conexão. Verifique a internet e tente de novo.')
    }
    setEnviando(false)
  }

  if (inativo) return <LinkInativo />

  return (
    <Tela>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-petroleo-claro text-petroleo">
        <Icone nome="cadeado" />
      </div>
      <h1 className="text-xl font-bold text-petroleo-escuro">Confirme que é você</h1>
      <p className="mt-1.5 text-[15px] text-cinza-600">Por segurança, digite sua data de nascimento. Isso só é pedido na primeira vez neste celular.</p>
      <form onSubmit={enviar} className="mt-5">
        <label htmlFor="nasc" className="mb-1.5 block text-sm font-semibold">Data de nascimento</label>
        <input
          id="nasc"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="dd/mm/aaaa"
          value={data}
          onChange={(e) => setData(mascarar(e.target.value))}
          className="h-14 w-full rounded-xl border border-cinza-200 px-4 text-center text-xl font-semibold tracking-widest focus:border-petroleo focus:outline-none focus:ring-2 focus:ring-petroleo/15"
        />
        {erro && <p className="mt-2 text-sm font-medium text-alerta">{erro}</p>}
        <Botao type="submit" tamanho="lg" bloco className="mt-4" carregando={enviando}>Entrar</Botao>
      </form>
    </Tela>
  )
}
