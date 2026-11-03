import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

// Estado de login do painel: 'carregando' | 'deslogado' | 'negado' | 'ok'
export function useSessao() {
  const [estado, setEstado] = useState('carregando')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    let ativo = true
    async function avaliar(session) {
      if (!session) {
        if (ativo) { setUsuario(null); setEstado('deslogado') }
        return
      }
      const { data, error } = await supabase.rpc('is_admin')
      if (!ativo) return
      setUsuario(session.user)
      setEstado(!error && data === true ? 'ok' : 'negado')
    }
    supabase.auth.getSession().then(({ data }) => avaliar(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      // Evita chamar o Supabase dentro do callback (recomendação da biblioteca).
      setTimeout(() => avaliar(session), 0)
    })
    return () => {
      ativo = false
      sub.subscription.unsubscribe()
    }
  }, [])

  return { estado, usuario }
}
