import { useState } from 'react'
import Icone from '../components/ui/Icone.jsx'
import { reduzirFoto, VISTAS } from '../lib/fotos.js'

export const MAX_FOTOS = 20

// Fotos posturais: escolher, reduzir no celular e marcar a vista de cada uma.
export default function AnexarFotos({ fotos, setFotos }) {
  const [erro, setErro] = useState('')
  const [preparando, setPreparando] = useState(false)

  async function escolher(e) {
    const arquivos = [...(e.target.files || [])]
    e.target.value = ''
    if (!arquivos.length) return
    setErro('')
    const livres = MAX_FOTOS - fotos.length
    if (arquivos.length > livres) setErro(`Até ${MAX_FOTOS} fotos. Usei as ${Math.max(livres, 0)} primeiras.`)
    setPreparando(true)
    const novas = []
    for (const arq of arquivos.slice(0, Math.max(livres, 0))) {
      try {
        const f = await reduzirFoto(arq)
        // A IA identifica a vista de cada foto; dá para escolher à mão se quiser.
        novas.push({ id: crypto.randomUUID(), ...f, vista: 'Automática' })
      } catch (err) {
        setErro(err.message)
      }
    }
    setFotos((l) => [...l, ...novas])
    setPreparando(false)
  }

  return (
    <div className="mt-3 rounded-2xl border border-dashed border-cinza-200 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-petroleo-escuro">Fotos posturais <span className="font-semibold text-cinza-400">(opcional)</span></p>
          <p className="text-xs text-cinza-600">A IA aponta as alterações posturais e já prescreve os exercícios.</p>
        </div>
        {fotos.length < MAX_FOTOS && (
          <label className="flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-petroleo-claro px-3 text-sm font-bold text-petroleo">
            <Icone nome="camera" tamanho={18} />
            {preparando ? 'Preparando...' : 'Anexar'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={escolher} disabled={preparando} />
          </label>
        )}
      </div>
      {fotos.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {fotos.map((f) => (
            <div key={f.id} className="overflow-hidden rounded-xl border border-cinza-100 bg-white">
              <div className="relative">
                <img src={f.previa} alt={f.vista} className="aspect-[3/4] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFotos((l) => l.filter((x) => x.id !== f.id))}
                  aria-label="Remover foto"
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white"
                >
                  <Icone nome="x" tamanho={14} />
                </button>
              </div>
              <select
                value={f.vista}
                onChange={(e) => setFotos((l) => l.map((x) => (x.id === f.id ? { ...x, vista: e.target.value } : x)))}
                aria-label="Vista da foto"
                className="h-9 w-full border-t border-cinza-100 bg-white px-1.5 text-xs font-semibold text-petroleo-escuro focus:outline-none"
              >
                {VISTAS.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs leading-relaxed text-cinza-600">
        <strong className="text-petroleo-escuro">Para medir bem: corpo inteiro, dos pés à cabeça</strong>, de pé, câmera parada na altura do quadril,
        a uns 3 metros. Sem os pés na foto não dá para traçar a linha de prumo. Teste de Adams: por trás, câmera na altura das costas. Use fotos
        só com o consentimento do paciente.
      </p>
      {erro && <p className="mt-2 text-xs font-medium text-alerta">{erro}</p>}
    </div>
  )
}
