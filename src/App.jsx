import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './painel/Layout.jsx'
import Pacientes from './painel/Pacientes.jsx'
import PacienteForm from './painel/PacienteForm.jsx'
import FichaPaciente from './painel/FichaPaciente.jsx'
import SessaoForm from './painel/SessaoForm.jsx'
import Biblioteca from './painel/Biblioteca.jsx'
import FilaSOS from './painel/FilaSOS.jsx'
import Configuracoes from './painel/Configuracoes.jsx'
import PreviaColuna from './PreviaColuna.jsx'
import PaginaPaciente from './paciente/PaginaPaciente.jsx'

export default function App() {
  return (
    <Routes>
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
      <Route path="/p" element={<PaginaPaciente />} />
      <Route path="/previa-coluna" element={<PreviaColuna />} />
      <Route path="*" element={<Navigate to="/painel" replace />} />
    </Routes>
  )
}
