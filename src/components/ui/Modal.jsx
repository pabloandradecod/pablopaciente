import { useEffect } from 'react'
import Icone from './Icone.jsx'

export default function Modal({ aberto, aoFechar, titulo, children, largura = 'max-w-lg' }) {
  useEffect(() => {
    if (!aberto) return
    const esc = (e) => e.key === 'Escape' && aoFechar?.()
    document.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [aberto, aoFechar])

  if (!aberto) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-petroleo-escuro/50 sm:items-center sm:p-4" onClick={aoFechar}>
      <div
        role="dialog"
        aria-modal="true"
        className={`max-h-[92vh] w-full ${largura} overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:rounded-3xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-petroleo-escuro">{titulo}</h3>
          {aoFechar && (
            <button onClick={aoFechar} className="-m-1 rounded-lg p-1 text-cinza-600 hover:bg-cinza-100" aria-label="Fechar">
              <Icone nome="x" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
