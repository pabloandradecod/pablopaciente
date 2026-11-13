import { useRef, useState } from 'react'
import { NOME_PONTO, linhaReferencia, medidas, nomeVista } from '../../lib/postura.js'

const AMARELO = '#F4C542'
const PETROLEO = '#0E5C62'
const ESCURO = '#0A4247'
const VERMELHO = '#D9483B'

// Foto postural com a avaliação desenhada por cima: grade, linha de prumo, pontos anatômicos,
// linhas de alinhamento e ângulos. Com `aoMudar`, os pontos podem ser arrastados para corrigir.
export default function FotoAnotada({ src, marcacao, aoMudar, mostrarRotulos = true, className = '' }) {
  const [tam, setTam] = useState(null) // tamanho natural da foto
  const svg = useRef(null)
  const arrastando = useRef(null)

  const W = tam?.w || 3
  const H = tam?.h || 4
  const s = W / 360 // escala dos traços
  const P = marcacao?.pontos || {}
  const pt = (id) => P[id] && { x: (P[id].x / 1000) * W, y: (P[id].y / 1000) * H }
  const tipo = marcacao?.tipo

  function mover(e) {
    if (!arrastando.current || !svg.current) return
    const ctm = svg.current.getScreenCTM()
    if (!ctm) return
    const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    const x = Math.max(0, Math.min(1000, Math.round((q.x / W) * 1000)))
    const y = Math.max(0, Math.min(1000, Math.round((q.y / H) * 1000)))
    aoMudar({ ...marcacao, pontos: { ...P, [arrastando.current]: { x, y } } })
  }

  const meds = tam && marcacao ? medidas(marcacao, { largura: W, altura: H }) : []
  const valor = (chave) => meds.find((m) => m.chave === chave)?.valor

  // Linha vertical de referência: prumo (com os pés na foto) ou pelve/trocânter (foto cortada)
  const ref = tam ? linhaReferencia(marcacao, { largura: W, altura: H }) : null
  const prumoX = ref?.x ?? null

  const rotulo = (x, y, texto) => {
    const fs = 11 * s
    const w = texto.length * fs * 0.58 + fs
    return (
      <g key={`r-${texto}-${x}`} pointerEvents="none">
        <rect x={x - w / 2} y={y - fs * 1.35} width={w} height={fs * 1.5} rx={fs * 0.4} fill={ESCURO} opacity="0.85" />
        <text x={x} y={y - fs * 0.25} fontSize={fs} fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Montserrat, sans-serif">{texto}</text>
      </g>
    )
  }

  const linhaPar = (a, b, chaveMedida) => {
    const pa = pt(a), pb = pt(b)
    if (!pa || !pb) return null
    const v = chaveMedida && valor(chaveMedida)
    const yRef = Math.min(pa.y, pb.y)
    return (
      <g key={`${a}-${b}`}>
        <line x1={pa.x} y1={yRef} x2={pb.x} y2={yRef} stroke="#fff" strokeWidth={1.2 * s} strokeDasharray={`${3 * s} ${3 * s}`} opacity="0.9" />
        <line x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={PETROLEO} strokeWidth={2.6 * s} />
        {mostrarRotulos && v && rotulo((pa.x + pb.x) / 2, Math.min(pa.y, pb.y) - 4 * s, v)}
      </g>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-cinza-100 ${className}`}>
      <img
        src={src}
        alt={nomeVista(marcacao)}
        onLoad={(e) => setTam({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
        className="block w-full select-none"
        draggable={false}
      />
      {tam && (
        <svg
          ref={svg}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: aoMudar ? 'none' : 'auto' }}
          onPointerMove={mover}
          onPointerUp={() => (arrastando.current = null)}
          onPointerLeave={() => (arrastando.current = null)}
        >
          {/* Grade quadriculada (simetrógrafo) */}
          <g stroke="#fff" strokeWidth={0.8 * s} opacity="0.45">
            {Array.from({ length: Math.ceil(W / (W / 10)) + 1 }, (_, i) => (
              <line key={`v${i}`} x1={(i * W) / 10} y1="0" x2={(i * W) / 10} y2={H} />
            ))}
            {Array.from({ length: Math.ceil(H / (W / 10)) + 1 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={(i * W) / 10} x2={W} y2={(i * W) / 10} />
            ))}
          </g>

          {prumoX != null && (
            <>
              <line x1={prumoX} y1="0" x2={prumoX} y2={H} stroke={AMARELO} strokeWidth={2 * s} strokeDasharray={`${8 * s} ${5 * s}`} />
              {mostrarRotulos && rotulo(prumoX, H - 18 * s, ref.nome)}
            </>
          )}

          {tipo === 'frontal' && (
            <>
              {linhaPar('ombro_d', 'ombro_e', 'ombro_d')}
              {linhaPar('quadril_d', 'quadril_e', 'quadril_d')}
              {linhaPar('joelho_d', 'joelho_e', 'joelho_d')}
              {linhaPar('tornozelo_d', 'tornozelo_e')}
              {pt('cabeca') && prumoX != null && (
                <line x1={prumoX} y1={pt('cabeca').y} x2={pt('cabeca').x} y2={pt('cabeca').y} stroke={VERMELHO} strokeWidth={2 * s} />
              )}
            </>
          )}

          {tipo === 'lateral' && (
            <>
              <polyline
                points={['orelha', 'ombro', 'quadril', 'joelho', 'tornozelo'].map(pt).filter(Boolean).map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke={PETROLEO}
                strokeWidth={2.6 * s}
                strokeLinejoin="round"
              />
              {prumoX != null &&
                ['orelha', 'ombro', 'quadril', 'joelho'].map((id) => {
                  const p = pt(id)
                  return p && <line key={`d-${id}`} x1={prumoX} y1={p.y} x2={p.x} y2={p.y} stroke={VERMELHO} strokeWidth={1.8 * s} />
                })}
              {mostrarRotulos && pt('orelha') && valor('orelha-ombro') && rotulo(pt('orelha').x, pt('orelha').y - 8 * s, `cabeça ${valor('orelha-ombro')}`)}
              {mostrarRotulos && pt('quadril') && valor('ombro-quadril') && rotulo(pt('quadril').x, pt('quadril').y - 8 * s, `tronco ${valor('ombro-quadril')}`)}
            </>
          )}

          {/* Pontos anatômicos (a ponta do nariz só orienta o lado do rosto: ponto menor, vazado) */}
          {Object.keys(P).map((id) => {
            const p = pt(id)
            if (id === 'nariz') return <circle key={id} cx={p.x} cy={p.y} r={2.6 * s} fill="none" stroke={AMARELO} strokeWidth={1.4 * s} pointerEvents="none" />
            return (
              <g key={id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={(aoMudar ? 6 : 4.2) * s}
                  fill={AMARELO}
                  stroke={ESCURO}
                  strokeWidth={1.6 * s}
                  style={{ cursor: aoMudar ? 'grab' : 'default' }}
                  onPointerDown={(e) => {
                    if (!aoMudar) return
                    e.preventDefault()
                    e.currentTarget.ownerSVGElement?.setPointerCapture?.(e.pointerId)
                    arrastando.current = id
                  }}
                >
                  <title>{NOME_PONTO[id]}</title>
                </circle>
              </g>
            )
          })}
        </svg>
      )}
      {(tipo === 'adams' || tipo === 'inadequada') && (
        <span className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${tipo === 'adams' ? 'bg-destaque text-petroleo-escuro' : 'bg-black/60 text-white'}`}>
          {tipo === 'adams' ? 'Teste de Adams' : 'Sem medição'}
        </span>
      )}
    </div>
  )
}

// Lista das medidas de uma foto.
export function ListaMedidas({ marcacao }) {
  const meds = medidas(marcacao)
  if (marcacao?.tipo === 'inadequada') return <p className="text-xs leading-snug text-cinza-600">Não foi possível medir nesta foto.</p>
  if (marcacao?.tipo === 'adams') {
    const a = marcacao.achados[0]
    return <p className="line-clamp-4 text-xs leading-snug text-cinza-600">{a ? a.achado : 'Flexão anterior do tronco para observar a simetria das costas.'}</p>
  }
  if (!meds.length) return <p className="text-xs text-cinza-600">Sem pontos suficientes para medir.</p>
  return (
    <ul className="space-y-1 text-xs leading-snug">
      {meds.map((m) => (
        <li key={m.chave}>
          <span className="text-cinza-600">{m.rotulo}: </span>
          <span className="font-bold text-petroleo-escuro">{m.valor}</span>
          {m.detalhe && <span className="text-cinza-600"> · {m.detalhe}</span>}
        </li>
      ))}
    </ul>
  )
}
