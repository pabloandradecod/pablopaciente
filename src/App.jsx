import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Carregando from './components/ui/Carregando.jsx'
import PaginaPaciente from './paciente/PaginaPaciente.jsx'

// O painel é carregado sob demanda: o paciente baixa só o necessário para o link.
const Layout = lazy(() => import('./painel/Layout.jsx'))
const Pacientes = lazy(() => import('./painel/Pacientes.jsx'))
const PacienteForm = lazy(() => import('./painel/PacienteForm.jsx'))
const FichaPaciente = lazy(() => import('./painel/FichaPaciente.jsx'))
const SessaoForm = lazy(() => import('./painel/SessaoForm.jsx'))
const Biblioteca = lazy(() => import('./painel/Biblioteca.jsx'))
const FilaSOS = lazy(() => import('./painel/FilaSOS.jsx'))
const Configuracoes = lazy(() => import('./painel/Configuracoes.jsx'))
const PreviaColuna = lazy(() => import('./PreviaColuna.jsx'))

export default function App() {
  return (
    <Suspense fallback={<Carregando />}>
      <Routes>
        <Route path="/p" element={<PaginaPaciente />} />
        <Route path="/painel" element={<Layout />}>
          <Route index element={<Pacientes />} />
          <Route path="pacientes/novo" element={<PacienteForm />} />
          <Route path="pacientes/:id" element={<FichaPaciente />} />
          <Route path="pacientes/:id/editar" element={<PacienteForm />} />
          <Route path="pacientes/:id/sessoes/nova" element={<SessaoForm />} />
          <Route path="pacientes/:id/sessoes/:sessaoId" element={<SessaoForm />} />
          <Route path="exercicios" element={<Biblioteca />} />
          <Route path="sos" element={<FilaSOS />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
        <Route path="/previa-coluna" element={<PreviaColuna />} />
        <Route path="*" element={<Navigate to="/painel" replace />} />
      </Routes>
    </Suspense>
  )
}
