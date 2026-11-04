import { useState } from 'react'
const base =
  'w-full rounded-xl border border-cinza-200 bg-white px-3.5 py-2.5 text-[15px] text-tinta placeholder:text-cinza-400 focus:border-petroleo focus:outline-none focus:ring-2 focus:ring-petroleo/15'

export function Rotulo({ children, htmlFor, dica }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-tinta">
      {children}
      {dica && <span className="ml-1 font-normal text-cinza-600">{dica}</span>}
    </label>
  )
}

export function Campo({ rotulo, dica, id, className = '', ...props }) {
  return (
    <div className={className}>
      {rotulo && <Rotulo htmlFor={id} dica={dica}>{rotulo}</Rotulo>}
      <input id={id} className={base} {...props} />
    </div>
  )
}

export function AreaTexto({ rotulo, dica, id, className = '', ...props }) {
  return (
    <div className={className}>
      {rotulo && <Rotulo htmlFor={id} dica={dica}>{rotulo}</Rotulo>}
      <textarea id={id} rows={3} className={base} {...props} />
    </div>
  )
}

export function Selecao({ rotulo, id, className = '', children, ...props }) {
  return (
    <div className={className}>
      {rotulo && <Rotulo htmlFor={id}>{rotulo}</Rotulo>}
      <select id={id} className={base} {...props}>{children}</select>
    </div>
  )
}

export function SimNao({ rotulo, valor, onChange }) {
  return (
    <div>
      {rotulo && <Rotulo>{rotulo}</Rotulo>}
      <div className="grid grid-cols-2 gap-2">
        {[['sim', 'Sim'], ['nao', 'Não']].map(([v, t]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`h-11 rounded-xl border text-[15px] font-semibold transition ${
              valor === v ? 'border-petroleo bg-petroleo text-white' : 'border-cinza-200 bg-white text-tinta'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

// Botões de escolha. `multipla` permite várias; `outro` libera texto livre extra.
export function Escolhas({ rotulo, opcoes = [], valor, onChange, multipla = false, outro = false }) {
  const lista = multipla ? paraLista(valor) : valor ? [valor] : []
  const extras = lista.filter((v) => !opcoes.includes(v))
  const alternar = (op) => {
    if (!multipla) return onChange(valor === op ? null : op)
    onChange(lista.includes(op) ? lista.filter((v) => v !== op) : [...lista, op])
  }
  return (
    <div>
      {rotulo && <Rotulo>{rotulo}</Rotulo>}
      <div className="flex flex-wrap gap-2">
        {[...opcoes, ...extras].map((op) => {
          const ativo = lista.includes(op)
          return (
            <button
              key={op}
              type="button"
              onClick={() => alternar(op)}
              aria-pressed={ativo}
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                ativo ? 'border-petroleo bg-petroleo text-white' : 'border-cinza-200 bg-white text-tinta hover:border-petroleo/40'
              }`}
            >
              {op}
            </button>
          )
        })}
        {multipla && outro && <AdicionarOutro aoAdicionar={(t) => !lista.includes(t) && onChange([...lista, t])} />}
      </div>
    </div>
  )
}

function AdicionarOutro({ aoAdicionar }) {
  const [aberto, setAberto] = useState(false)
  const [texto, setTexto] = useState('')
  const confirmar = () => {
    const t = texto.trim()
    if (t) aoAdicionar(t)
    setTexto('')
    setAberto(false)
  }
  if (!aberto) {
    return (
      <button type="button" onClick={() => setAberto(true)} className="min-h-10 rounded-full border border-dashed border-cinza-400 px-4 py-2 text-sm font-semibold text-cinza-600">
        + Outro
      </button>
    )
  }
  return (
    <span className="flex items-center gap-1">
      <input
        autoFocus
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            confirmar()
          }
        }}
        onBlur={confirmar}
        placeholder="Escreva e toque Enter"
        className="h-10 w-52 rounded-full border border-petroleo px-4 text-sm focus:outline-none"
      />
    </span>
  )
}

// Aceita valores antigos (texto) e novos (lista).
export function paraLista(v) {
  if (Array.isArray(v)) return v
  if (typeof v === 'string' && v.trim()) return [v.trim()]
  return []
}
