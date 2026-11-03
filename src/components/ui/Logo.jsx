// Marca: monograma com três segmentos em degradê de destaque, sobre azul-petróleo.
export function MarcaLogo({ tamanho = 40 }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#0E5C62" />
      <rect x="18" y="9" width="12" height="7" rx="2.5" fill="#FFFFFF" />
      <rect x="16.5" y="19" width="15" height="8" rx="2.5" fill="#F4C542" />
      <rect x="15" y="30" width="18" height="9" rx="3" fill="#FFFFFF" />
    </svg>
  )
}

export default function Logo({ claro = false, compacto = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <MarcaLogo tamanho={compacto ? 32 : 40} />
      <div className="leading-tight">
        <div className={`font-bold ${compacto ? 'text-sm' : 'text-[15px]'} ${claro ? 'text-white' : 'text-petroleo-escuro'}`}>
          Dr. Pablo Andrade
        </div>
        <div className={`text-xs font-medium ${claro ? 'text-white/75' : 'text-cinza-600'}`}>
          Fisioterapia e Quiropraxia
        </div>
      </div>
    </div>
  )
}
