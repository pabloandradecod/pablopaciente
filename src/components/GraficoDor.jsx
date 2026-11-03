import { formatarDataCurta } from '../lib/datas.js'

// Gráfico de linha simples (SVG puro): dor no início e no fim de cada sessão.
export default function GraficoDor({ sessoes }) {
  const pts = sessoes.filter((s) => s.dor_antes != null || s.dor_depois != null)
  if (pts.length === 0) return <p className="text-sm text-cinza-600">Ainda sem registros de dor.</p>

  const L = 320
  const A = 170
  const m = { e: 26, d: 12, t: 12, b: 28 }
  const w = L - m.e - m.d
  const h = A - m.t - m.b
  const x = (i) => m.e + (pts.length === 1 ? w / 2 : (i * w) / (pts.length - 1))
  const y = (v) => m.t + h - (v / 10) * h

  const linha = (k) =>
    pts
      .map((s, i) => (s[k] == null ? null : `${x(i)},${y(s[k])}`))
      .filter(Boolean)
      .map((p, i) => `${i ? 'L' : 'M'}${p}`)
      .join(' ')

  const passoRotulo = Math.ceil(pts.length / 6)

  return (
    <div>
      <svg viewBox={`0 0 ${L} ${A}`} className="w-full" role="img" aria-label={`Dor ao longo de ${pts.length} sessões, de ${pts[0].dor_antes ?? pts[0].dor_depois} para ${pts.at(-1).dor_depois ?? pts.at(-1).dor_antes} em 10`}>
        {[0, 5, 10].map((v) => (
          <g key={v}>
            <line x1={m.e} x2={L - m.d} y1={y(v)} y2={y(v)} stroke="#ECEEEE" strokeWidth="1" />
            <text x={m.e - 8} y={y(v)} textAnchor="end" dominantBaseline="central" fontSize="9" fill="#9AA3A4" fontFamily="Montserrat">{v}</text>
          </g>
        ))}
        <path d={linha('dor_antes')} fill="none" stroke="#0E5C62" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />
        <path d={linha('dor_depois')} fill="none" stroke="#F4C542" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4 3" />
        {pts.map((s, i) => (
          <g key={i}>
            {s.dor_antes != null && <circle cx={x(i)} cy={y(s.dor_antes)} r="3.5" fill="#0E5C62" />}
            {s.dor_depois != null && <circle cx={x(i)} cy={y(s.dor_depois)} r="3.5" fill="#F4C542" stroke="#B98B0E" strokeWidth="0.8" />}
            {i % passoRotulo === 0 && (
              <text x={x(i)} y={A - 10} textAnchor="middle" fontSize="9" fill="#5C6668" fontFamily="Montserrat">{formatarDataCurta(s.data)}</text>
            )}
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-center gap-5 text-xs font-medium text-cinza-600">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-petroleo" /> Início da sessão</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-destaque" /> Fim da sessão</span>
      </div>
    </div>
  )
}
