import { useEffect, useState } from 'react'
import { urlsFotosPosturais } from '../lib/api.js'
import Icone from '../components/ui/Icone.jsx'
import FotoAnotada, { ListaMedidas } from '../components/postura/FotoAnotada.jsx'
import { nomeVista } from '../lib/postura.js'

const COR_INTENSIDADE = {
  Leve: 'bg-petroleo-claro text-petroleo',
  Moderada: 'bg-destaque-claro text-petroleo-escuro',
  Acentuada: 'bg-alerta-claro text-alerta'
}

// Endereço de cada foto: prévia local, link já pronto (link do paciente) ou link temporário do painel.
function useUrls(fotos) {
  const [urls, setUrls] = useState({})
  const chave = fotos.map((f) => f.caminho || '').join('|')
  useEffect(() => {
    const caminhos = fotos.filter((f) => !f.previa && !f.url && f.caminho).map((f) => f.caminho)
    if (caminhos.length) urlsFotosPosturais(caminhos).then(setUrls)
  }, [chave]) // eslint-disable-line react-hooks/exhaustive-deps
  return (f) => f.previa || f.url || urls[f.caminho]
}

// Fotos com a avaliação biomecânica desenhada (grade, prumo, pontos, ângulos) e as medidas.
// Com `aoMudarMarcacao`, a foto ampliada deixa arrastar os pontos para corrigir.
export function FotosPosturais({ fotos, marcacoes = [], aoMudarMarcacao, carrossel = false }) {
  const src = useUrls(fotos)
  const [aberta, setAberta] = useState(null)
  if (!fotos.length) return null
  const m = aberta != null ? marcacoes[aberta] : null
  return (
    <>
      <div className={carrossel ? 'sem-barra -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1' : 'grid grid-cols-2 gap-3 sm:grid-cols-3'}>
        {fotos.map((f, i) => (
          <div key={i} className={`quebra-evitar overflow-hidden rounded-2xl border border-cinza-100 bg-white ${carrossel ? 'w-[62%] shrink-0 snap-start sm:w-[34%]' : ''}`}>
            <button type="button" onClick={() => setAberta(i)} className="block w-full text-left" aria-label={`Ampliar foto ${i + 1}`}>
              {src(f) ? (
                marcacoes[i] ? <FotoAnotada src={src(f)} marcacao={marcacoes[i]} mostrarRotulos={false} /> : <img src={src(f)} alt={f.vista} className="w-full" />
              ) : (
                <div className="aspect-[3/4] w-full animate-pulse bg-cinza-100" />
              )}
            </button>
            <div className="p-2">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xs font-extrabold text-petroleo-escuro">{nomeVista(marcacoes[i], f.vista)}</span>
                <span className="text-[10px] font-bold text-cinza-400">{i + 1}</span>
              </div>
              {marcacoes[i] && <div className="mt-1"><ListaMedidas marcacao={marcacoes[i]} /></div>}
            </div>
          </div>
        ))}
      </div>

      {aberta != null && (
        <div className="nao-imprimir fixed inset-0 z-50 overflow-y-auto bg-black/85 p-3" onClick={() => setAberta(null)}>
          <div className="mx-auto max-w-lg rounded-2xl bg-white p-3" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="font-bold text-petroleo-escuro">Foto {aberta + 1} · {nomeVista(m, fotos[aberta].vista)}</span>
              <div className="flex gap-1">
                <button type="button" disabled={aberta === 0} onClick={() => setAberta(aberta - 1)} className="rounded-lg p-2 text-petroleo disabled:opacity-30" aria-label="Foto anterior"><Icone nome="voltar" tamanho={18} /></button>
                <button type="button" disabled={aberta === fotos.length - 1} onClick={() => setAberta(aberta + 1)} className="rounded-lg p-2 text-petroleo disabled:opacity-30" aria-label="Próxima foto"><Icone nome="seta" tamanho={18} /></button>
                <button type="button" onClick={() => setAberta(null)} className="rounded-lg p-2 text-cinza-600" aria-label="Fechar"><Icone nome="x" tamanho={18} /></button>
              </div>
            </div>
            {src(fotos[aberta]) && (
              m ? (
                <FotoAnotada
                  src={src(fotos[aberta])}
                  marcacao={m}
                  aoMudar={aoMudarMarcacao ? (nova) => aoMudarMarcacao(aberta, nova) : undefined}
                  className="rounded-xl"
                />
              ) : (
                <img src={src(fotos[aberta])} alt="" className="w-full rounded-xl" />
              )
            )}
            {aoMudarMarcacao && m && <p className="mt-2 text-xs text-cinza-600">Pontos estimados pela IA. Arraste um ponto para corrigir; as medidas mudam na hora.</p>}
            {m && <div className="mt-2"><ListaMedidas marcacao={m} /></div>}
            {m?.achados?.length > 0 && m.tipo !== 'adams' && (
              <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-tinta">
                {m.achados.map((a, k) => <li key={k}>{a.achado}</li>)}
              </ul>
            )}
            {m?.observacao && <p className="mt-2 text-xs italic text-cinza-600">{m.observacao}</p>}
          </div>
        </div>
      )}
    </>
  )
}

// Análise postural: fotos marcadas, resumo, achados por região e limitações.
// `aoRemover(i)` (opcional) deixa o Dr. Pablo tirar um achado antes de salvar.
// `paciente`: versão do link (sem botões de edição).
export default function AnalisePostural({ postura, fotos = [], marcacoes = [], aoRemover, aoMudarMarcacao, paciente = false }) {
  if (!postura) return null
  return (
    <div className="space-y-3">
      <FotosPosturais fotos={fotos} marcacoes={marcacoes} aoMudarMarcacao={aoMudarMarcacao} carrossel={paciente} />
      {paciente && fotos.length > 1 && <p className="-mt-1 text-[11px] text-cinza-400">Deslize para o lado para ver as {fotos.length} fotos.</p>}
      {marcacoes.some(Boolean) && (
        <p className="text-[11px] leading-relaxed text-cinza-600">
          Linha amarela tracejada: linha de prumo (ou, se a foto cortou os pés, a linha média da pelve ou do trocânter). Linhas verdes: alinhamento
          entre os pontos anatômicos. Linhas vermelhas: distância até a linha amarela.
          {paciente ? '' : ' Toque numa foto para ampliar.'}
        </p>
      )}
      {postura.resumo && <p className="text-sm leading-relaxed">{postura.resumo}</p>}
      {postura.achados.length === 0 && <p className="text-sm text-cinza-600">Nenhum achado postural registrado.</p>}
      <ul className="space-y-2">
        {postura.achados.map((a, i) => (
          <li key={i} className="quebra-evitar rounded-2xl border border-cinza-100 bg-white p-3">
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
                  <button type="button" onClick={() => aoRemover(i)} aria-label="Remover achado" className="nao-imprimir rounded p-1 text-cinza-400 hover:bg-cinza-100">
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
