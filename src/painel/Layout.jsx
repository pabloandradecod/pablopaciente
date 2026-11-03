import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { supabase, supabaseConfigurado } from '../lib/supabase.js'
import { contarSOSNovos } from '../lib/api.js'
import { useSessao } from './useSessao.js'
import Login from './Login.jsx'
import Logo from '../components/ui/Logo.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import Botao from '../components/ui/Botao.jsx'

const ITENS = [
  { para: '/painel', rotulo: 'Pacientes', icone: 'usuarios', fim: true },
  { para: '/painel/sos', rotulo: 'Fila SOS', icone: 'sirene' },
  { para: '/painel/exercicios', rotulo: 'Exercícios', icone: 'haltere' },
  { para: '/painel/configuracoes', rotulo: 'Ajustes', icone: 'engrenagem' }
]

export function SemConfiguracao() {
  return (
    <div className="mx-auto max-w-lg p-6">
      <Logo />
      <h1 className="mt-6 text-xl font-bold text-petroleo-escuro">Supabase não configurado</h1>
      <p className="mt-2 text-sm text-cinza-600">
        Crie o arquivo <code>.env.local</code> com <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code> (veja{' '}
        <code>.env.example</code>) e reinicie o <code>npm run dev</code>.
      </p>
    </div>
  )
}

export default function Layout() {
  if (!supabaseConfigurado) return <SemConfiguracao />
  return <LayoutAutenticado />
}

function LayoutAutenticado() {
  const { estado, usuario } = useSessao()
  const [novos, setNovos] = useState(0)
  const local = useLocation()

  useEffect(() => {
    if (estado !== 'ok') return
    contarSOSNovos().then(setNovos)
    const t = setInterval(() => contarSOSNovos().then(setNovos), 60000)
    return () => clearInterval(t)
  }, [estado, local.pathname])

  if (estado === 'carregando') return <Carregando />
  if (estado === 'deslogado') return <Login />
  if (estado === 'negado') {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <h1 className="mt-10 text-xl font-bold text-petroleo-escuro">Acesso restrito</h1>
        <p className="mt-2 text-sm text-cinza-600">O e-mail {usuario?.email} não tem permissão para o painel.</p>
        <Botao className="mt-6" variante="secundario" onClick={() => supabase.auth.signOut()}>Sair</Botao>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-30 bg-petroleo-escuro text-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Logo claro compacto />
          <nav className="hidden items-center gap-1 md:flex">
            {ITENS.map((i) => (
              <NavLink
                key={i.para}
                to={i.para}
                end={i.fim}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-white/12 text-white' : 'text-white/75 hover:text-white'
                  }`
                }
              >
                <Icone nome={i.icone} tamanho={18} />
                {i.rotulo}
                {i.icone === 'sirene' && novos > 0 && <Contador n={novos} />}
              </NavLink>
            ))}
          </nav>
          <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-1.5 rounded-xl px-2 py-2 text-sm font-semibold text-white/75 hover:text-white" aria-label="Sair">
            <Icone nome="sair" tamanho={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-5">
        <Outlet />
      </main>

      {/* Navegação inferior no celular */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-cinza-100 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        {ITENS.map((i) => (
          <NavLink
            key={i.para}
            to={i.para}
            end={i.fim}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold ${isActive ? 'text-petroleo' : 'text-cinza-600'}`
            }
          >
            <Icone nome={i.icone} tamanho={22} />
            {i.rotulo}
            {i.icone === 'sirene' && novos > 0 && (
              <span className="absolute left-1/2 top-1.5 ml-2"><Contador n={novos} /></span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function Contador({ n }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destaque px-1.5 text-[11px] font-bold text-petroleo-escuro">
      {n}
    </span>
  )
}
