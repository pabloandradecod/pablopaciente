import { Rotulo } from './Campo.jsx'

// Escala numérica de dor 0–10 com toque grande para celular.
export default function EscalaDor({ rotulo, valor, onChange }) {
  return (
    <div>
      {rotulo && <Rotulo>{rotulo}</Rotulo>}
      <div className="grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`h-10 rounded-lg text-sm font-semibold transition ${
              valor === n ? 'bg-petroleo text-white' : 'bg-cinza-100 text-tinta hover:bg-cinza-200'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-cinza-600">
        <span>Sem dor</span>
        <span>Pior dor possível</span>
      </div>
    </div>
  )
}
