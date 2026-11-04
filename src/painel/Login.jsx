import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import Botao from '../components/ui/Botao.jsx'
import { Campo } from '../components/ui/Campo.jsx'
import Logo from '../components/ui/Logo.jsx'
import Icone from '../components/ui/Icone.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  async function enviar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      // Não cria usuário novo: só quem já existe no Supabase Auth recebe o link.
      options: { emailRedirectTo: `${window.location.origin}/painel`, shouldCreateUser: false }
    })
    setEnviando(false)
    if (error) setErro('Não foi possível enviar o link. Confira o e-mail e tente de novo em alguns minutos.')
    else setEnviado(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-petroleo-escuro px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-7">
        <Logo altura={52} />
        <h1 className="mt-7 text-xl font-bold text-petroleo-escuro">Painel do profissional</h1>
        {enviado ? (
          <div className="mt-4 rounded-2xl bg-petroleo-claro p-4 text-sm text-petroleo-escuro">
            <div className="mb-1 flex items-center gap-2 font-semibold">
              <Icone nome="check" /> Link enviado
            </div>
            Abra o e-mail <strong>{email}</strong> neste aparelho e toque no link para entrar.
          </div>
        ) : (
          <form onSubmit={enviar} className="mt-4 space-y-4">
            <p className="text-sm text-cinza-600">Você recebe um link de acesso no seu e-mail. Sem senha.</p>
            <Campo id="email" type="email" rotulo="E-mail" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {erro && <p className="text-sm font-medium text-alerta">{erro}</p>}
            <Botao type="submit" bloco tamanho="lg" carregando={enviando}>Enviar link de acesso</Botao>
          </form>
        )}
      </div>
    </div>
  )
}
