// Geometria da coluna em vista posterior.
// Unidade aproximada: 1 unidade ≈ 1 mm de um adulto médio.
// Alturas e larguras seguem as proporções médias entre as regiões
// (cervical ≈ 15%, torácica ≈ 40%, lombar ≈ 25%, sacro/cóccix ≈ 20%).

export const LARGURA = 340
export const CX = LARGURA / 2
const TOPO = 14

// [codigo, altura do nível (corpo + disco), meia-largura do arco, meia-largura dos processos transversos, disco]
const NIVEIS = [
  ['C1', 10, 13, 37, 2.5],
  ['C2', 17, 12, 26, 3],
  ['C3', 15, 12, 26, 3],
  ['C4', 15, 12.5, 27, 3],
  ['C5', 15, 13, 28, 3],
  ['C6', 15.5, 13.5, 30, 3],
  ['C7', 16, 14, 34, 3.5],
  ['T1', 19.5, 14, 38, 3.5],
  ['T2', 20.5, 14, 37, 3.5],
  ['T3', 21, 14.5, 36, 3.5],
  ['T4', 21.5, 14.5, 35, 3.5],
  ['T5', 22, 15, 34, 3.5],
  ['T6', 22.5, 15, 33.5, 3.5],
  ['T7', 23, 15.5, 33, 4],
  ['T8', 23.5, 15.5, 32, 4],
  ['T9', 24, 16, 31, 4],
  ['T10', 25, 16.5, 30, 4],
  ['T11', 26, 17, 28, 4.5],
  ['T12', 27, 17.5, 27, 5],
  ['L1', 33, 19, 33, 6.5],
  ['L2', 34, 20, 38, 7],
  ['L3', 35, 21, 43, 7.5],
  ['L4', 35, 22, 41, 8],
  ['L5', 34, 23, 45, 8]
]

export const NOMES = {
  SACRO: 'Sacro',
  ILIACO_E: 'Ilíaco esquerdo',
  ILIACO_D: 'Ilíaco direito'
}

export function nomeSegmento(codigo) {
  return NOMES[codigo] || codigo
}

export const REGIOES = [
  { nome: 'Cervical', codigos: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'] },
  { nome: 'Torácica', codigos: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'] },
  { nome: 'Lombar', codigos: ['L1', 'L2', 'L3', 'L4', 'L5'] },
  { nome: 'Pelve', codigos: ['ILIACO_E', 'SACRO', 'ILIACO_D'] }
]

export const TODOS_CODIGOS = REGIOES.flatMap((r) => r.codigos)

const f = (n) => Math.round(n * 10) / 10

// Contorno de uma vértebra: arco central com processos transversos.
function contornoVertebra(cx, y, h, bw, tw, tipo) {
  const r = Math.min(3.5, h * 0.25)
  // Posição e espessura dos processos transversos por região.
  const cfg = {
    C: { topo: 0.18, centro: 0.42, esp: 0.42, base: 0.72 },
    T: { topo: 0.08, centro: 0.3, esp: 0.34, base: 0.6 },
    L: { topo: 0.22, centro: 0.42, esp: 0.24, base: 0.66 }
  }[tipo]
  const tTop = y + h * cfg.topo
  const tY = y + h * cfg.centro
  const th = h * cfg.esp
  const tBase = y + h * cfg.base
  const ponta = th / 2

  const lado = (s) => {
    const x = (dx) => f(cx + s * dx)
    return [
      `L ${x(bw - r)} ${f(y)}`,
      `Q ${x(bw)} ${f(y)} ${x(bw)} ${f(y + r)}`,
      `L ${x(bw)} ${f(tTop)}`,
      `C ${x(bw + (tw - bw) * 0.45)} ${f(tTop)} ${x(tw - ponta * 1.4)} ${f(tY - th / 2)} ${x(tw - ponta)} ${f(tY - th / 2)}`,
      `A ${f(ponta)} ${f(ponta)} 0 0 ${s > 0 ? 1 : 0} ${x(tw - ponta)} ${f(tY + th / 2)}`,
      `C ${x(tw - ponta * 1.6)} ${f(tY + th / 2)} ${x(bw + (tw - bw) * 0.35)} ${f(tBase)} ${x(bw)} ${f(tBase)}`,
      `L ${x(bw)} ${f(y + h - r)}`,
      `Q ${x(bw)} ${f(y + h)} ${x(bw - r)} ${f(y + h)}`
    ]
  }
  // Lado direito de cima para baixo, depois o esquerdo de baixo para cima.
  const direito = lado(1)
  const esquerdo = ladoEsquerdo(cx, y, h, bw, tw, r, tTop, tY, th, tBase, ponta)
  return ['M', f(cx), f(y), ...direito, `L ${f(cx - bw + r)} ${f(y + h)}`, ...esquerdo, 'Z'].join(' ')
}

function ladoEsquerdo(cx, y, h, bw, tw, r, tTop, tY, th, tBase, ponta) {
  const x = (dx) => f(cx - dx)
  return [
    `Q ${x(bw)} ${f(y + h)} ${x(bw)} ${f(y + h - r)}`,
    `L ${x(bw)} ${f(tBase)}`,
    `C ${x(bw + (tw - bw) * 0.35)} ${f(tBase)} ${x(tw - ponta * 1.6)} ${f(tY + th / 2)} ${x(tw - ponta)} ${f(tY + th / 2)}`,
    `A ${f(ponta)} ${f(ponta)} 0 0 1 ${x(tw - ponta)} ${f(tY - th / 2)}`,
    `C ${x(tw - ponta * 1.4)} ${f(tY - th / 2)} ${x(bw + (tw - bw) * 0.45)} ${f(tTop)} ${x(bw)} ${f(tTop)}`,
    `L ${x(bw)} ${f(y + r)}`,
    `Q ${x(bw)} ${f(y)} ${x(bw - r)} ${f(y)}`
  ]
}

// Processo espinhoso: elemento central que se projeta para baixo.
function processoEspinhoso(cx, y, h, disco, tipo, codigo) {
  if (codigo === 'C1') {
    // Atlas: só um tubérculo posterior pequeno.
    return `M ${f(cx - 3)} ${f(y + h * 0.35)} h 6 a 2 2 0 0 1 0 ${f(h * 0.3)} h -6 a 2 2 0 0 1 0 ${f(-h * 0.3)} Z`
  }
  const larg = tipo === 'L' ? 5.5 : tipo === 'T' ? 4 : 3.5
  const ini = y + h * 0.18
  const fim = y + h + disco * (tipo === 'T' ? 0.9 : 0.55)
  const bifido = tipo === 'C' && codigo !== 'C7'
  if (bifido) {
    // Processos espinhosos cervicais (C2–C6) são bífidos.
    return [
      `M ${f(cx - larg / 2)} ${f(ini)}`,
      `L ${f(cx + larg / 2)} ${f(ini)}`,
      `L ${f(cx + larg / 2 + 0.6)} ${f(fim - 1.5)}`,
      `Q ${f(cx + larg / 2 + 0.6)} ${f(fim)} ${f(cx + 0.6)} ${f(fim - 1.2)}`,
      `L ${f(cx)} ${f(fim - 2.4)}`,
      `L ${f(cx - 0.6)} ${f(fim - 1.2)}`,
      `Q ${f(cx - larg / 2 - 0.6)} ${f(fim)} ${f(cx - larg / 2 - 0.6)} ${f(fim - 1.5)}`,
      'Z'
    ].join(' ')
  }
  return [
    `M ${f(cx - larg / 2)} ${f(ini)}`,
    `L ${f(cx + larg / 2)} ${f(ini)}`,
    `L ${f(cx + larg / 2 - 0.4)} ${f(fim - larg / 2)}`,
    `A ${f(larg / 2 - 0.4)} ${f(larg / 2 - 0.4)} 0 0 1 ${f(cx - larg / 2 + 0.4)} ${f(fim - larg / 2)}`,
    'Z'
  ].join(' ')
}

function montar() {
  const vertebras = []
  let y = TOPO
  for (const [codigo, altura, bw, tw, disco] of NIVEIS) {
    const tipo = codigo[0]
    const h = altura - disco
    vertebras.push({
      codigo,
      tipo,
      y,
      h,
      meio: y + h / 2,
      largura: tw,
      d: contornoVertebra(CX, y, h, bw, tw, tipo),
      espinhoso: processoEspinhoso(CX, y, h, disco, tipo, codigo)
    })
    y += altura
  }

  // Sacro: triângulo invertido, base larga em S1, ápice estreito.
  const sTop = y + 1
  const sH = 104
  const sBase = 50
  const sApice = 11
  const sacro = {
    codigo: 'SACRO',
    y: sTop,
    h: sH,
    meio: sTop + sH * 0.38,
    d: [
      `M ${f(CX - sBase + 4)} ${f(sTop)}`,
      `Q ${f(CX)} ${f(sTop + 7)} ${f(CX + sBase - 4)} ${f(sTop)}`,
      `Q ${f(CX + sBase + 1)} ${f(sTop + 1)} ${f(CX + sBase - 1)} ${f(sTop + 9)}`,
      `C ${f(CX + sBase - 6)} ${f(sTop + 45)} ${f(CX + sApice + 10)} ${f(sTop + sH * 0.8)} ${f(CX + sApice)} ${f(sTop + sH)}`,
      `Q ${f(CX)} ${f(sTop + sH + 4)} ${f(CX - sApice)} ${f(sTop + sH)}`,
      `C ${f(CX - sApice - 10)} ${f(sTop + sH * 0.8)} ${f(CX - sBase + 6)} ${f(sTop + 45)} ${f(CX - sBase + 1)} ${f(sTop + 9)}`,
      `Q ${f(CX - sBase - 1)} ${f(sTop + 1)} ${f(CX - sBase + 4)} ${f(sTop)}`,
      'Z'
    ].join(' '),
    // Forames sacrais posteriores (4 pares) e crista sacral mediana.
    detalhes: [
      ...[0, 1, 2, 3].flatMap((i) => {
        const yy = sTop + 20 + i * 19
        const dx = 22 - i * 4.2
        const rx = 4 - i * 0.5
        const ry = 3.2 - i * 0.35
        return [
          `M ${f(CX - dx - rx)} ${f(yy)} a ${f(rx)} ${f(ry)} 0 1 0 ${f(rx * 2)} 0 a ${f(rx)} ${f(ry)} 0 1 0 ${f(-rx * 2)} 0 Z`,
          `M ${f(CX + dx - rx)} ${f(yy)} a ${f(rx)} ${f(ry)} 0 1 0 ${f(rx * 2)} 0 a ${f(rx)} ${f(ry)} 0 1 0 ${f(-rx * 2)} 0 Z`
        ]
      })
    ],
    crista: `M ${f(CX)} ${f(sTop + 8)} L ${f(CX)} ${f(sTop + sH * 0.78)}`
  }

  // Cóccix: decorativo, não clicável.
  const cTop = sTop + sH + 3
  const coccix = [0, 1, 2].map((i) => {
    const w = 8 - i * 2.2
    const yy = cTop + i * 8
    return `M ${f(CX - w)} ${f(yy)} h ${f(w * 2)} q 1 3.5 -1.2 6 h ${f(-(w * 2 - 2.4))} q -2.2 -2.5 -1.2 -6 Z`
  })

  // Ilíacos: asa do ílio em vista posterior, articulando com o sacro (sacroilíaca).
  const ilio = (s) => {
    const x = (dx) => f(CX + s * dx)
    const yy = (dy) => f(sTop + dy)
    // Pontos (dx, dy) a partir do topo do sacro, lado direito; espelhado à esquerda.
    const P = [
      ['M', [52, 16]],
      // espinha ilíaca póstero-superior subindo para a crista
      ['C', [54, 0], [66, -22], [80, -34]],
      ['C', [94, -48], [110, -55], [126, -53]],
      // crista ilíaca até a espinha ântero-superior
      ['C', [144, -50], [155, -36], [155, -20]],
      ['C', [155, -10], [152, -3], [146, 1]],
      // borda lateral descendo para o acetábulo
      ['C', [138, 8], [134, 20], [128, 34]],
      ['C', [122, 48], [116, 62], [108, 72]],
      ['L', [88, 77]],
      // incisura isquiática maior
      ['C', [82, 65], [72, 57], [61, 55]],
      ['C', [52, 53], [47, 46], [47, 38]],
      // superfície auricular (articulação sacroilíaca)
      ['C', [47, 28], [49, 22], [52, 16]]
    ]
    return (
      P.map(([cmd, ...pts]) => `${cmd} ${pts.map(([dx, dy]) => `${x(dx)} ${yy(dy)}`).join(' ')}`).join(' ') + ' Z'
    )
  }
  const iliacos = [
    { codigo: 'ILIACO_E', lado: -1, d: ilio(-1), meio: sTop - 10, x: CX - 112 },
    { codigo: 'ILIACO_D', lado: 1, d: ilio(1), meio: sTop - 10, x: CX + 112 }
  ]

  const altura = cTop + 26 + 10
  return { vertebras, sacro, coccix, iliacos, altura }
}

export const GEOMETRIA = montar()
