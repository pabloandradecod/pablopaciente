import { Navigate, Route, Routes } from 'react-router-dom'
import PreviaColuna from './PreviaColuna.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/previa-coluna" element={<PreviaColuna />} />
      <Route path="*" element={<Navigate to="/previa-coluna" replace />} />
    </Routes>
  )
}
