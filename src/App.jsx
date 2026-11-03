import { Navigate, Route, Routes } from 'react-router-dom'
import Logo from './components/ui/Logo.jsx'

function Inicio() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Logo />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
