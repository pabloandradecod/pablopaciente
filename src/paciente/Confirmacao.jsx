import { useEffect, useState } from 'react'
import { pacienteEntrar, pacienteMetodo } from '../lib/api.js'
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
    <div className="min-h-screen bg-papel px-5 py-8">
      <div className="mx-auto max-w-sm">
        <Logo altura={50} className="mx-auto" />
        <div className="mt-10 rounded-[28px] bg-white p-7 shadow-[0_20px_60px_-30px_rgba(10,66,71,0.35)]">{children}</div>
      </div>
    </div>
  )
}

export default function Confirmacao({ token, aoConfirmar }) {
  const [metodo, setMetodo] = useState(null) // 'senha' | 'nascimento'
  const [valor, setValor] = useState('')
  const [ver, setVer] = useState(false)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [inativo, setInativo] = useState(false)

  useEffect(() => {
    pacienteMetodo(token)
      .then((m) => (m === 'invalido' ? setInativo(true) : setMetodo(m)))
      .catch(() => setMetodo('senha'))
  }, [token])

  async function enviar(e) {
    e.preventDefault()
    let segredo = valor.trim()
    if (metodo === 'nascimento') {
      segredo = paraISO(valor)
      if (!segredo) return setErro('Digite a data completa, no formato dia/mês/ano.')
    } else if (segredo.length < 4) {
      return setErro('Digite a senha que o Dr. Pablo passou para você.')
    }
    setErro('')
    setEnviando(true)
    try {
      const r = await pacienteEntrar(token, segredo)
      if (r.ok) return aoConfirmar(r.chave)
      if (r.erro === 'link_invalido') setInativo(true)
      else if (r.erro === 'bloqueado') setErro('Muitas tentativas. Por segurança, tente de novo em 15 minutos.')
      else setErro(metodo === 'senha' ? 'Senha incorreta. Confira e tente de novo.' : 'A data não confere. Confira e tente de novo.')
    } catch {
      setErro('Sem conexão. Verifique a internet e tente de novo.')
    }
    setEnviando(false)
  }

  if (inativo) return <LinkInativo />
  if (!metodo) {
    return (
      <Tela>
        <p className="text-center text-sm text-cinza-600">Carregando...</p>
      </Tela>
    )
  }

  const porSenha = metodo === 'senha'
  return (
    <Tela>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-petroleo-claro text-petroleo">
        <Icone nome="cadeado" />
      </div>
      <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-petroleo-escuro">{porSenha ? 'Digite sua senha' : 'Confirme que é você'}</h1>
      <p className="mt-1.5 text-[15px] text-cinza-600">
        {porSenha
          ? 'Use a senha que o Dr. Pablo combinou com você. Ela só é pedida na primeira vez neste celular.'
          : 'Por segurança, digite sua data de nascimento. Isso só é pedido na primeira vez neste celular.'}
      </p>
      <form onSubmit={enviar} className="mt-5">
        <label htmlFor="nasc" className="mb-1.5 block text-sm font-semibold">{porSenha ? 'Senha' : 'Data de nascimento'}</label>
        <div className="relative">
          <input
            id="nasc"
            type={porSenha && !ver ? 'password' : 'text'}
            inputMode={porSenha ? 'text' : 'numeric'}
            autoComplete={porSenha ? 'current-password' : 'bday'}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder={porSenha ? 'Sua senha' : 'dd/mm/aaaa'}
            value={valor}
            onChange={(e) => setValor(porSenha ? e.target.value : mascarar(e.target.value))}
            className="h-14 w-full rounded-xl border border-cinza-200 px-4 text-center text-xl font-semibold tracking-widest focus:border-petroleo focus:outline-none focus:ring-2 focus:ring-petroleo/15"
          />
          {porSenha && (
            <button
              type="button"
              onClick={() => setVer((v) => !v)}
              aria-label={ver ? 'Esconder senha' : 'Mostrar senha'}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-cinza-600"
            >
              <Icone nome="olho" tamanho={20} />
            </button>
          )}
        </div>
        {erro && <p className="mt-2 text-sm font-medium text-alerta">{erro}</p>}
        <Botao type="submit" tamanho="lg" bloco className="mt-4" carregando={enviando}>Entrar</Botao>
      </form>
      {porSenha && (
        <a
          href={linkWhatsapp(WHATSAPP_CONSULTORIO, 'Olá! Sou paciente do Dr. Pablo e esqueci a senha do meu link de acompanhamento.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center text-sm font-semibold text-petroleo"
        >
          Esqueci a senha
        </a>
      )}
    </Tela>
  )
}
