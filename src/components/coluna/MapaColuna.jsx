import { useState } from 'react'
import { CX, GEOMETRIA, LARGURA, nomeSegmento, REGIOES } from './segmentos.js'

// Cores do mapa
const COR = {
  base: '#E4E8E8',
  baseTraco: '#B7C0C1',
  tratado: '#F4C542',
  tratadoTraco: '#B98B0E',
  foco: '#0E5C62',
  detalhe: '#9AA3A4',
  rotulo: '#5C6668'
}

/**
 * Mapa da coluna em vista posterior.
 * - modo "editar": clicar marca/desmarca o segmento (painel).
 * - modo "ver": só visual; segmentos tratados em amarelo (link do paciente).
 */
export default function MapaColuna({
  selecionados = [],
  onAlternar,
  modo = 'ver',
  rotulos = true,
  className = '',
  titulo = 'Mapa da coluna, vista posterior',
  animar = false
}) {
  const marcados = new Set(selecionados)
  const editavel = modo === 'editar'
  const [foco, setFoco] = useState(null)
  const { vertebras, sacro, coccix, iliacos, altura } = GEOMETRIA

  const estilo = (codigo) => {
    const on = marcados.has(codigo)
    const emFoco = editavel && foco === codigo
    return {
      fill: on ? COR.tratado : COR.base,
      stroke: emFoco ? COR.foco : on ? COR.tratadoTraco : COR.baseTraco,
      strokeWidth: emFoco ? 1.6 : 0.9
    }
  }

  let ordemAnim = 0
  const props = (codigo) => {
    if (!editavel) {
      if (!animar || !marcados.has(codigo)) return {}
      return { className: 'seg-tratado', style: { animationDelay: `${ordemAnim++ * 0.08}s, ${1 + ordemAnim * 0.08}s` } }
    }
    const alternar = () => onAlternar?.(codigo)
    return {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': marcados.has(codigo),
      'aria-label': `${nomeSegmento(codigo)}${marcados.has(codigo) ? ', segmento tratado' : ''}`,
      onClick: alternar,
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          alternar()
        }
      },
      onMouseEnter: () => setFoco(codigo),
      onMouseLeave: () => setFoco(null),
      onFocus: () => setFoco(codigo),
      onBlur: () => setFoco(null),
      style: { cursor: 'pointer', outline: 'none' }
    }
  }

  const tratados = REGIOES.flatMap((r) => r.codigos).filter((c) => marcados.has(c))

  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${altura}`}
      className={className}
      role={editavel ? 'group' : 'img'}
      aria-label={
        editavel
          ? titulo
          : `${titulo}. ${tratados.length ? `Segmentos tratados: ${tratados.map(nomeSegmento).join(', ')}.` : 'Nenhum segmento tratado.'}`
      }
    >
      {/* Ilíacos (desenhados primeiro, ficam atrás do sacro) */}
      {iliacos.map((il) => (
        <g key={il.codigo} {...props(il.codigo)}>
          <path d={il.d} {...estilo(il.codigo)} strokeLinejoin="round" />
        </g>
      ))}

      {/* Vértebras C1 a L5 */}
      {vertebras.map((v) => {
        const e = estilo(v.codigo)
        return (
          <g key={`${v.codigo}-${animar ? selecionados.join() : ''}`} {...props(v.codigo)}>
            {editavel && (
              // Área de toque maior que o desenho, cobrindo a linha inteira.
              <rect x={CX - 80} y={v.y - 1} width={160} height={v.h + 2} fill="transparent" />
            )}
            <path d={v.d} {...e} strokeLinejoin="round" />
            <path
              d={v.espinhoso}
              fill={e.fill}
              stroke={e.stroke}
              strokeWidth={0.6}
              strokeOpacity={0.7}
              strokeLinejoin="round"
            />
          </g>
        )
      })}

      {/* Sacro */}
      <g {...props('SACRO')}>
        <path d={sacro.d} {...estilo('SACRO')} strokeLinejoin="round" />
        <path d={sacro.crista} stroke={marcados.has('SACRO') ? COR.tratadoTraco : COR.detalhe} strokeWidth={1.4} strokeLinecap="round" strokeDasharray="5 3.5" fill="none" />
        {sacro.detalhes.map((d, i) => (
          <path key={i} d={d} fill={marcados.has('SACRO') ? '#D9A91F' : '#C9D0D1'} />
        ))}
      </g>

      {/* Cóccix (decorativo) */}
      {coccix.map((d, i) => (
        <path key={i} d={d} fill={COR.base} stroke={COR.baseTraco} strokeWidth={0.8} />
      ))}

      {/* Rótulos */}
      {rotulos && (
        <g fontFamily="Montserrat, sans-serif" fill={COR.rotulo} style={{ pointerEvents: 'none' }}>
          {vertebras.map((v) => (
            <text
              key={v.codigo}
              x={CX - 52}
              y={v.meio}
              dominantBaseline="central"
              textAnchor="end"
              fontSize={v.tipo === 'C' ? 7.5 : 8.5}
              fontWeight={marcados.has(v.codigo) ? 700 : 500}
              fill={marcados.has(v.codigo) ? '#0A4247' : COR.rotulo}
            >
              {v.codigo}
            </text>
          ))}
          <text x={CX} y={sacro.y + sacro.h + 34} textAnchor="middle" fontSize={9} fontWeight={marcados.has('SACRO') ? 700 : 500}>
            Sacro
          </text>
          {iliacos.map((il) => (
            <text
              key={il.codigo}
              x={il.x}
              y={sacro.y + 104}
              textAnchor="middle"
              fontSize={9}
              fontWeight={marcados.has(il.codigo) ? 700 : 500}
              fill={marcados.has(il.codigo) ? '#0A4247' : COR.rotulo}
            >
              {il.lado < 0 ? 'Ilíaco esq.' : 'Ilíaco dir.'}
            </text>
          ))}
          {/* Regiões, à direita (sem colchete para não cruzar o ilíaco) */}
          {[
            ['CERVICAL', 'C4'],
            ['TORÁCICA', 'T6'],
            ['LOMBAR', 'L2']
          ].map(([nome, ref]) => {
            const v = vertebras.find((x) => x.codigo === ref)
            return (
              <g key={nome}>
                <path d={`M ${CX + 52} ${v.meio} h 8`} stroke={COR.baseTraco} strokeWidth={0.9} />
                <text x={CX + 64} y={v.meio} dominantBaseline="central" fontSize={7.5} fontWeight={600} letterSpacing={0.6} fill={COR.detalhe}>
                  {nome}
                </text>
              </g>
            )
          })}
          <text x={8} y={12} fontSize={7.5} fontWeight={600} fill={COR.detalhe}>ESQUERDA</text>
          <text x={LARGURA - 8} y={12} fontSize={7.5} fontWeight={600} fill={COR.detalhe} textAnchor="end">DIREITA</text>
        </g>
      )}
    </svg>
  )
}

// Legenda simples para o link do paciente.
export function LegendaMapa() {
  return (
    <div className="flex items-center justify-center gap-5 text-xs font-medium text-cinza-600">
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm border" style={{ background: COR.tratado, borderColor: COR.tratadoTraco }} />
        Segmento tratado
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm border" style={{ background: COR.base, borderColor: COR.baseTraco }} />
        Não tratado
      </span>
    </div>
  )
}

// Seletor alternativo em lista (toque mais fácil no celular, principalmente na cervical).
export function SeletorSegmentos({ selecionados = [], onAlternar }) {
  const marcados = new Set(selecionados)
  return (
    <div className="space-y-3">
      {REGIOES.map((r) => (
        <div key={r.nome}>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-cinza-600">{r.nome}</div>
          <div className="flex flex-wrap gap-1.5">
            {r.codigos.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onAlternar(c)}
                aria-pressed={marcados.has(c)}
                className={`h-9 min-w-11 rounded-lg border px-2.5 text-sm font-semibold transition ${
                  marcados.has(c)
                    ? 'border-[#B98B0E] bg-destaque text-petroleo-escuro'
                    : 'border-cinza-200 bg-white text-tinta hover:bg-cinza-50'
                }`}
              >
                {c.startsWith('ILIACO') || c === 'SACRO' ? nomeSegmento(c) : c}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
