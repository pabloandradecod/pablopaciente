import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Atualização imediata do app: quando uma versão nova do site assume, recarrega uma vez.
// Sem isso, o celular mostrava a versão anterior guardada até a próxima abertura.
if ('serviceWorker' in navigator) {
  const jaTinhaVersao = Boolean(navigator.serviceWorker.controller)
  let recarregou = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!jaTinhaVersao || recarregou) return
    recarregou = true
    window.location.reload()
  })
  // Ao voltar para o app (ex.: abrir o link de novo), verifica se há versão nova.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') navigator.serviceWorker.getRegistration().then((r) => r?.update()).catch(() => {})
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
