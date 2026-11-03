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
