import { formatarDataCurta } from '../lib/datas.js'

// Cor da barra conforme a intensidade da dor (0–10).
export function corDor(v) {
  if (v <= 3) return '#0E5C62'
  if (v <= 6) return '#F4C542'
  return '#E58A3A'
}

/**
 * Gráfico de barras para o paciente: uma barra por sessão = dor ao chegar.
 * Mais simples de ler do que duas linhas sobrepostas.
 */
export default function GraficoEvolucao({ sessoes, animar = true }) {
  const pts = sessoes.filter((s) => s.dor_antes != null)
  if (pts.length === 0) return null

  return (
    <div className="sem-barra -mx-1 overflow-x-auto px-1">
      <div className="flex h-56 min-w-full items-end gap-2" style={{ width: pts.length > 8 ? pts.length * 44 : undefined }}>
        {pts.map((s, i) => {
          const alt = Math.max(4, (s.dor_antes / 10) * 100)
          return (
            <div key={i} className="flex h-full min-w-9 flex-1 flex-col items-center justify-end">
              <div className="flex w-full max-w-12 flex-1 flex-col items-center justify-end">
                <span className="mb-1 text-sm font-extrabold text-tinta">{s.dor_antes}</span>
                <div
                  className={`w-full rounded-t-xl ${animar ? 'barra-crescer' : ''}`}
                  style={{ height: `${alt}%`, background: corDor(s.dor_antes), animationDelay: `${i * 0.08}s` }}
                />
              </div>
              <span className="mt-2 text-[11px] font-semibold text-cinza-600">{formatarDataCurta(s.data)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
