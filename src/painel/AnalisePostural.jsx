import { useEffect, useState } from 'react'
import { urlsFotosPosturais } from '../lib/api.js'
import Icone from '../components/ui/Icone.jsx'

const COR_INTENSIDADE = {
  Leve: 'bg-petroleo-claro text-petroleo',
  Moderada: 'bg-destaque-claro text-petroleo-escuro',
  Acentuada: 'bg-alerta-claro text-alerta'
}

// Fotos com a vista. `fotos`: [{ previa? , caminho?, vista }]. Fotos salvas usam link temporário.
export function FotosPosturais({ fotos }) {
  const [urls, setUrls] = useState({})
  useEffect(() => {
    const caminhos = fotos.filter((f) => !f.previa && f.caminho).map((f) => f.caminho)
    if (caminhos.length) urlsFotosPosturais(caminhos).then(setUrls)
  }, [fotos])
  const [aberta, setAberta] = useState(null)
  if (!fotos.length) return null
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {fotos.map((f, i) => {
          const src = f.previa || urls[f.caminho]
          return (
            <button key={i} type="button" onClick={() => src && setAberta(src)} className="overflow-hidden rounded-xl bg-cinza-100 text-left">
              {src ? <img src={src} alt={f.vista} className="aspect-[3/4] w-full object-cover" /> : <div className="aspect-[3/4] w-full animate-pulse" />}
              <span className="block truncate px-1.5 py-1 text-[11px] font-semibold text-cinza-600">{f.vista}</span>
            </button>
          )
        })}
      </div>
      {aberta && (
        <button type="button" onClick={() => setAberta(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" aria-label="Fechar foto">
          <img src={aberta} alt="" className="max-h-full max-w-full rounded-xl" />
        </button>
      )}
    </>
  )
}

// Análise postural: resumo, achados por região e limitações das fotos.
// `aoRemover(i)` (opcional) deixa o Dr. Pablo tirar um achado antes de salvar.
export default function AnalisePostural({ postura, fotos = [], aoRemover }) {
  if (!postura) return null
  return (
    <div className="space-y-3">
      <FotosPosturais fotos={fotos} />
      {postura.resumo && <p className="text-sm leading-relaxed">{postura.resumo}</p>}
      {postura.achados.length === 0 && <p className="text-sm text-cinza-600">Nenhum achado postural registrado.</p>}
      <ul className="space-y-2">
        {postura.achados.map((a, i) => (
          <li key={i} className="rounded-2xl border border-cinza-100 bg-white p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-petroleo/70">
                  {a.regiao}
                  {a.lado && <span className="font-semibold normal-case tracking-normal text-cinza-600"> · {a.lado}</span>}
                </div>
                <p className="mt-0.5 text-sm font-semibold leading-snug text-tinta">{a.achado}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${COR_INTENSIDADE[a.intensidade] || COR_INTENSIDADE.Leve}`}>{a.intensidade}</span>
                {aoRemover && (
                  <button type="button" onClick={() => aoRemover(i)} aria-label="Remover achado" className="rounded p-1 text-cinza-400 hover:bg-cinza-100">
                    <Icone nome="x" tamanho={14} />
                  </button>
                )}
              </div>
            </div>
            {a.relevancia && <p className="mt-1 text-xs leading-relaxed text-cinza-600">{a.relevancia}</p>}
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              {a.vista && <span className="text-[11px] text-cinza-400">{a.vista}</span>}
              {a.exercicios.map((e) => (
                <span key={e} className="flex items-center gap-1 rounded-full bg-cinza-50 px-2 py-0.5 text-[11px] font-semibold text-petroleo">
                  <Icone nome="haltere" tamanho={11} /> {e}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {postura.limitacoes && (
        <p className="rounded-xl bg-cinza-50 p-2.5 text-xs leading-relaxed text-cinza-600">
          <strong>Limitações das fotos:</strong> {postura.limitacoes}
        </p>
      )}
    </div>
  )
}
