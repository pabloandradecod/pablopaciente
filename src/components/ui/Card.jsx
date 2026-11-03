export default function Card({ className = '', children, ...props }) {
  return (
    <div className={`rounded-2xl border border-cinza-100 bg-white p-5 shadow-[0_1px_2px_rgba(10,66,71,0.04)] ${className}`} {...props}>
      {children}
    </div>
  )
}

export function TituloSecao({ children, acao, sub }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-petroleo-escuro">{children}</h2>
        {sub && <p className="mt-0.5 text-sm text-cinza-600">{sub}</p>}
      </div>
      {acao}
    </div>
  )
}
