// Biblioteca compartilhada: paleta, personagens em SVG e o runtime de animação
// que é embutido em cada cena.

export const C = {
  ink: "#013E4C", // petróleo (marca)
  cream: "#FFF6E9",
  white: "#FFFFFF",
  pain: "#FF5A4E",
  good: "#3DD9A4",
  sun: "#FFC94A",
  nerve: "#FFD54A",
  sky: "#BFE6EE",
  wall: "#E7F3F1",
  floor: "#CFE3DF",
  skinA: "#E9B48C", // Dr. Pablo
  skinB: "#F2C59A", // Seu Zé
  bone: "#F7EEDB",
  blue: "#4A90C2",
  brown: "#7A5634",
  navy: "#1F3550",
  grey: "#9AA7AD",
  purple: "#8E6CD8",
  yellow: "#FFC94A",
};

const OUT = 7; // espessura do contorno

// ---------- humanos (rubber-hose, visto de lado/3-4, virado para a direita) ----------
// Origem (0,0) = quadril. Ângulos negativos levam o membro para a frente (direita).
const COSTUMES = {
  pablo: {
    skin: C.skinA, top: C.white, sleeve: C.white, forearm: C.white, pants: C.navy, shoe: "#2B2B2B",
    hair: "#2E2320", belly: 0,
  },
  juninho: {
    skin: "#C98A5E", top: "#FF8A3D", sleeve: "#FF8A3D", forearm: "#C98A5E", pants: "#1F3550", shin: "#C98A5E", shoe: "#F4F4F4",
    hair: "#1E1A1A", belly: -4,
  },
  cida: {
    skin: "#E3A47E", top: "#B07ED8", sleeve: "#B07ED8", forearm: "#E3A47E", pants: "#3E5A8A", shoe: "#8E2F45",
    hair: "#5A3A2A", belly: 6,
  },
  ze: {
    skin: C.skinB, top: C.blue, sleeve: C.blue, forearm: C.skinB, pants: C.brown, shoe: "#4A2E1A",
    hair: "#C9C9C9", belly: 14,
  },
};

function limb(len, w, color, extra = "") {
  return `<line x1="0" y1="0" x2="0" y2="${len}" stroke="${C.ink}" stroke-width="${w + OUT * 2}" stroke-linecap="round"/>` +
    `<line x1="0" y1="0" x2="0" y2="${len}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>${extra}`;
}

function eyes(id, x1, x2, y) {
  const st = `stroke="${C.ink}" stroke-width="5" stroke-linecap="round" fill="none"`;
  const pair = (f) => f(x1) + f(x2);
  return `<g id="${id}-eyes">
    <g id="${id}-e-normal">${pair((x) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="${x + 3}" cy="${y + 1}" r="5.5" fill="${C.ink}"/>`)}</g>
    <g id="${id}-e-wide" opacity="0">${pair((x) => `<ellipse cx="${x}" cy="${y - 2}" rx="12" ry="16" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="${x + 2}" cy="${y - 2}" r="4" fill="${C.ink}"/>`)}</g>
    <g id="${id}-e-pain" opacity="0"><path d="M${x1 - 9} ${y - 8} L${x1 + 7} ${y} L${x1 - 9} ${y + 8}" ${st}/><path d="M${x2 + 9} ${y - 8} L${x2 - 7} ${y} L${x2 + 9} ${y + 8}" ${st}/></g>
    <g id="${id}-e-happy" opacity="0">${pair((x) => `<path d="M${x - 9} ${y + 3} Q${x} ${y - 11} ${x + 9} ${y + 3}" ${st}/>`)}</g>
    <g id="${id}-e-closed" opacity="0">${pair((x) => `<path d="M${x - 9} ${y + 2} Q${x} ${y + 8} ${x + 9} ${y + 2}" ${st}/>`)}</g>
  </g>`;
}

function mouths(id, x, y) {
  const st = `stroke="${C.ink}" stroke-width="5" stroke-linecap="round"`;
  return `<g id="${id}-mouths">
    <g id="${id}-m-smile"><path d="M${x - 14} ${y - 3} Q${x} ${y + 10} ${x + 14} ${y - 4}" fill="none" ${st}/></g>
    <g id="${id}-m-open" opacity="0"><path d="M${x - 13} ${y - 5} Q${x} ${y - 2} ${x + 13} ${y - 6} Q${x + 10} ${y + 14} ${x} ${y + 14} Q${x - 11} ${y + 13} ${x - 13} ${y - 5}Z" fill="#7A1E2B" ${st} stroke-linejoin="round"/><path d="M${x - 6} ${y + 10} Q${x} ${y + 5} ${x + 6} ${y + 10}" fill="${C.pain}" /></g>
    <g id="${id}-m-scream" opacity="0"><ellipse cx="${x}" cy="${y + 6}" rx="13" ry="19" fill="#7A1E2B" ${st}/><ellipse cx="${x}" cy="${y + 17}" rx="7" ry="5" fill="${C.pain}"/></g>
    <g id="${id}-m-frown" opacity="0"><path d="M${x - 13} ${y + 6} Q${x} ${y - 6} ${x + 13} ${y + 6}" fill="none" ${st}/></g>
    <g id="${id}-m-flat" opacity="0"><path d="M${x - 11} ${y + 2} L${x + 11} ${y + 1}" fill="none" ${st}/></g>
    <g id="${id}-m-grin" opacity="0"><path d="M${x - 16} ${y - 5} Q${x} ${y - 1} ${x + 16} ${y - 6} Q${x + 12} ${y + 16} ${x} ${y + 16} Q${x - 13} ${y + 15} ${x - 16} ${y - 5}Z" fill="#fff" ${st} stroke-linejoin="round"/></g>
  </g>`;
}

function headPablo(id, k) {
  return `<g id="${id}-head">
    <rect x="-8" y="-22" width="26" height="30" rx="8" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <circle cx="6" cy="-75" r="60" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <ellipse cx="-44" cy="-70" rx="12" ry="16" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M-52 -92 Q-50 -146 8 -140 Q62 -138 66 -96 Q50 -112 22 -110 Q-4 -116 -20 -100 Q-30 -92 -38 -78 Z" fill="${k.hair}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M-30 -50 Q-20 -10 22 -14 Q56 -18 64 -52 Q60 -30 44 -26 Q26 -22 6 -26 Q-16 -30 -30 -50Z" fill="${k.hair}" opacity="0.35"/>
    <path d="M62 -70 Q78 -62 66 -52" fill="${k.skin}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    ${eyes(id, 14, 44, -82)}
    <path d="M2 -102 L24 -106 M36 -106 L56 -100" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
    ${mouths(id, 34, -40)}
  </g>`;
}

function headZe(id, k) {
  return `<g id="${id}-head">
    <rect x="-8" y="-22" width="26" height="30" rx="8" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <circle cx="6" cy="-75" r="60" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <ellipse cx="-44" cy="-70" rx="12" ry="16" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M-56 -86 Q-62 -54 -40 -36 Q-46 -60 -34 -84 Z" fill="${k.hair}" stroke="${C.ink}" stroke-width="4"/>
    <path d="M-10 -128 Q4 -140 22 -132" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M62 -70 Q80 -60 66 -50" fill="${k.skin}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    ${eyes(id, 14, 44, -82)}
    <path d="M2 -100 L24 -98 M36 -98 L56 -101" stroke="${C.grey}" stroke-width="7" stroke-linecap="round"/>
    ${mouths(id, 34, -34)}
    <path d="M14 -50 Q34 -60 58 -50 Q52 -40 36 -44 Q20 -40 14 -50Z" fill="${k.hair}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
  </g>`;
}


function headCida(id, k) {
  return `<g id="${id}-head">
    <rect x="-8" y="-22" width="26" height="30" rx="8" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <circle cx="-44" cy="-128" r="30" fill="${k.hair}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M-52 -140 Q-40 -150 -30 -136" stroke="#9A8A80" stroke-width="5" fill="none"/>
    <circle cx="6" cy="-75" r="60" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M-56 -78 Q-60 -140 6 -140 Q62 -138 66 -100 Q40 -118 10 -114 Q-20 -116 -34 -96 Q-40 -60 -46 -40 Q-60 -56 -56 -78Z" fill="${k.hair}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M-20 -128 Q0 -138 20 -130" stroke="#9A8A80" stroke-width="5" fill="none"/>
    <ellipse cx="-36" cy="-66" rx="11" ry="15" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <circle cx="-36" cy="-44" r="7" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/>
    <path d="M62 -70 Q76 -62 66 -52" fill="${k.skin}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    ${eyes(id, 14, 44, -82)}
    <path d="M6 -94 L2 -100 M14 -96 L12 -103 M38 -96 L36 -103 M46 -94 L48 -101" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
    <path d="M2 -104 L24 -107 M36 -107 L56 -103" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="14" cy="-58" rx="9" ry="5" fill="${C.pain}" opacity="0.3"/><ellipse cx="54" cy="-58" rx="7" ry="5" fill="${C.pain}" opacity="0.3"/>
    ${mouths(id, 34, -36)}
  </g>`;
}


function headJuninho(id, k) {
  return `<g id="${id}-head">
    <rect x="-8" y="-22" width="26" height="30" rx="8" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <circle cx="6" cy="-75" r="58" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M-54 -84 L-62 -112 L-40 -108 L-44 -140 L-20 -124 L-10 -150 L8 -128 L24 -150 L32 -124 L56 -138 L50 -108 L66 -98 Q40 -116 10 -110 Q-24 -114 -40 -92 Q-46 -80 -50 -66 Z" fill="${k.hair}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="-42" cy="-70" rx="11" ry="15" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M60 -70 Q74 -62 64 -52" fill="${k.skin}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    ${eyes(id, 14, 44, -82)}
    <path d="M2 -102 L24 -104 M36 -104 L56 -100" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
    <rect x="-56" y="-118" width="122" height="14" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
    ${mouths(id, 34, -38)}
  </g>`;
}

function torso(id, who, k) {
  const b = k.belly;
  if (who === "pablo") {
    return `<path d="M-46 8 Q-52 -80 -40 -150 Q0 -172 44 -150 Q56 -80 50 8 Z" fill="${k.top}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-6 -158 L14 -110 L32 -156" fill="${C.ink}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M14 -110 L18 6" stroke="${C.ink}" stroke-width="4" opacity="0.5"/>
      <rect x="22" y="-96" width="22" height="16" rx="3" fill="none" stroke="${C.ink}" stroke-width="4"/>
      <path d="M26 -96 L26 -104 M32 -96 L32 -106" stroke="${C.pain}" stroke-width="4" stroke-linecap="round"/>`;
  }
  if (who === "juninho") {
    return `<path d="M-44 8 Q-50 -80 -40 -150 Q0 -168 42 -150 Q52 -80 48 8 Z" fill="${k.top}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-6 -152 L12 -134 L30 -152" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
      <text x="4" y="-60" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="#fff" stroke="${C.ink}" stroke-width="3">7</text>
      <rect x="-46" y="-8" width="96" height="18" rx="6" fill="${k.pants}" stroke="${C.ink}" stroke-width="4"/>`;
  }
  if (who === "cida") {
    return `<path d="M-46 8 Q-52 -80 -40 -150 Q0 -170 42 -150 Q${54 + b} -80 ${50 + b * 0.4} 8 Z" fill="${k.top}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-8 -152 Q12 -128 32 -152" fill="none" stroke="${C.ink}" stroke-width="4"/>
      ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${-2 + i * 8}" cy="${-140 + Math.sin(i * 0.8) * 6 + i * 2}" r="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`).join("")}
      <path d="M-40 -60 L${48 + b * 0.4} -60" stroke="#fff" stroke-width="3" opacity="0.4"/>`;
  }
  return `<path d="M-44 8 Q-52 -80 -40 -150 Q0 -172 42 -150 Q${56 + b} -70 ${50 + b * 0.4} 8 Z" fill="${k.top}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
    <path d="M-30 -120 L40 -120 M-36 -80 L${48 + b} -80 M-40 -40 L${50 + b} -40" stroke="#fff" stroke-width="4" opacity="0.35"/>
    <path d="M-6 -150 L12 -130 L30 -150" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="-46" y="-6" width="${98 + b * 0.4}" height="16" rx="6" fill="#3B2A1C" stroke="${C.ink}" stroke-width="4"/>`;
}

function arm(id, side, k) {
  return `<g transform="translate(4,-138)"><g id="${id}-sh${side}">
    ${limb(68, 26, k.sleeve)}
    <g transform="translate(0,68)"><g id="${id}-el${side}">
      ${limb(62, 22, k.forearm)}
      <g transform="translate(0,66)"><g id="${id}-hand${side}"><circle cx="0" cy="0" r="16" fill="${k.skin}" stroke="${C.ink}" stroke-width="${OUT - 1}"/><path d="M6 -10 Q16 -14 18 -4" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g></g>
    </g></g>
  </g></g>`;
}

function leg(id, side, k) {
  return `<g transform="translate(${side === "B" ? -8 : 8},0)"><g id="${id}-hip${side}">
    ${limb(88, 32, k.pants)}
    <g transform="translate(0,88)"><g id="${id}-kn${side}">
      ${limb(86, 28, k.shin || k.pants)}
      <g transform="translate(0,90)"><g id="${id}-an${side}">
        <path d="M-18 -6 Q-20 14 -8 16 L44 16 Q56 14 52 2 Q46 -10 20 -10 L-8 -14 Q-18 -14 -18 -6Z" fill="${k.shoe}" stroke="${C.ink}" stroke-width="${OUT - 1}" stroke-linejoin="round"/>
      </g></g>
    </g></g>
  </g></g>`;
}

/** Personagem humano. who: "pablo" | "ze". Retorna SVG <g> com origem no quadril. */
export function human(id, who) {
  const k = COSTUMES[who];
  const shade = (s) => `<g opacity="1" style="filter: brightness(0.86)">${s}</g>`;
  return `<g id="${id}-root">
    ${shade(leg(id, "B", k))}
    <g id="${id}-torso">
      ${shade(arm(id, "B", k))}
      ${torso(id, who, k)}
      <g transform="translate(4,-150)"><g id="${id}-neck">${who === "pablo" ? headPablo(id, k) : who === "cida" ? headCida(id, k) : who === "juninho" ? headJuninho(id, k) : headZe(id, k)}</g></g>
      ${arm(id, "F", k)}
    </g>
    ${leg(id, "F", k)}
  </g>`;
}

// ---------- Vértebra (mascote) ----------
// Origem = entre os pés. Altura ~ 260.
export function vertebra(id) {
  const b = C.bone;
  return `<g id="${id}-root">
    <g transform="translate(-22,-44)"><g id="${id}-legB">${limb(40, 14, b)}<ellipse cx="4" cy="44" rx="18" ry="9" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></g></g>
    <g transform="translate(22,-44)"><g id="${id}-legF">${limb(40, 14, b)}<ellipse cx="6" cy="44" rx="18" ry="9" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></g></g>
    <g id="${id}-body">
      <path d="M-14 -150 L-6 -232 Q0 -246 6 -232 L14 -150 Z" fill="${b}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-92 -168 Q-104 -176 -96 -190 Q-86 -200 -72 -190 L-30 -168 M92 -168 Q104 -176 96 -190 Q86 -200 72 -190 L30 -168" fill="${b}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-56 -150 Q-60 -196 0 -202 Q60 -196 56 -150 Z" fill="${b}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <ellipse cx="0" cy="-168" rx="20" ry="15" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>
      <g transform="translate(-74,-96)"><g id="${id}-armB">${limb(44, 13, b)}<circle cx="0" cy="48" r="11" fill="${b}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <g transform="translate(74,-96)"><g id="${id}-armF">${limb(44, 13, b)}<circle cx="0" cy="48" r="11" fill="${b}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <rect x="-80" y="-152" width="160" height="112" rx="34" fill="${b}" stroke="${C.ink}" stroke-width="${OUT}"/>
      <ellipse cx="0" cy="-146" rx="70" ry="13" fill="#9CD3E6" stroke="${C.ink}" stroke-width="5"/>
      <ellipse cx="-46" cy="-70" rx="12" ry="7" fill="${C.pain}" opacity="0.35"/><ellipse cx="46" cy="-70" rx="12" ry="7" fill="${C.pain}" opacity="0.35"/>
      ${eyes(id, -22, 22, -104)}
      ${mouths(id, 0, -70)}
    </g>
  </g>`;
}

// ---------- Piriforme (músculo marombeiro, formato de pera) ----------
// Origem = entre os pés. Altura ~ 300. Braços: armF/armB (giram no ombro), pernas legF/legB.
export function piriforme(id) {
  const m = "#F2766B", d = "#D9574D";
  const arm = (side, x) => `<g transform="translate(${x},-150)"><g id="${id}-arm${side}">
      <path d="M0 0 Q${side === "F" ? 34 : -34} 30 0 62" fill="none" stroke="${C.ink}" stroke-width="${30 + OUT * 2}" stroke-linecap="round"/>
      <path d="M0 0 Q${side === "F" ? 34 : -34} 30 0 62" fill="none" stroke="${m}" stroke-width="30" stroke-linecap="round"/>
      <circle cx="0" cy="70" r="17" fill="${m}" stroke="${C.ink}" stroke-width="${OUT - 1}"/>
    </g></g>`;
  return `<g id="${id}-root">
    <g transform="translate(-26,-40)"><g id="${id}-legB">${limb(30, 18, d)}<ellipse cx="4" cy="36" rx="20" ry="10" fill="${C.ink}"/></g></g>
    <g transform="translate(26,-40)"><g id="${id}-legF">${limb(30, 18, d)}<ellipse cx="6" cy="36" rx="20" ry="10" fill="${C.ink}"/></g></g>
    <g id="${id}-body">
      ${arm("B", -70)}
      <path d="M0 -300 Q40 -300 46 -240 Q50 -200 84 -150 Q110 -100 96 -64 Q78 -30 0 -30 Q-78 -30 -96 -64 Q-110 -100 -84 -150 Q-50 -200 -46 -240 Q-40 -300 0 -300 Z" fill="${m}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-20 -280 Q-40 -190 -60 -60 M20 -280 Q40 -190 60 -60 M0 -290 L0 -40" stroke="${d}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>
      <path d="M-6 -300 Q-12 -326 4 -334 Q8 -316 -6 -300 Z" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>
      <rect x="-62" y="-200" width="124" height="22" rx="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>
      <path d="M-46 -168 L-8 -158 M46 -168 L8 -158" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>
      ${eyes(id, -24, 24, -140)}
      ${mouths(id, 0, -100)}
      ${arm("F", 70)}
    </g>
  </g>`;
}

// ---------- Nervinho (nervo cutâneo femoral lateral): lilás e fininho ----------
export const LILAC = "#B79CF2";
export function nervinho(id, pts, w = 18, faceScale = 1.6) {
  return nerve(id, pts, w, faceScale, LILAC, "#E9DEFF");
}

// ---------- Cintão (cinto vilão) ----------
// Origem = centro da fivela (rosto). Faixa de couro de -band..+band. Braços armF/armB, ids ${id}-band (escala X p/ apertar).
export function cintao(id, band = 260) {
  const leather = "#6B3E1F", hole = "#2A160A";
  return `<g id="${id}-root">
    <g id="${id}-band">
      <rect x="${-band}" y="-34" width="${band * 2}" height="68" rx="20" fill="${leather}" stroke="${C.ink}" stroke-width="${OUT}"/>
      <path d="M${-band + 16} -22 L${band - 16} -22 M${-band + 16} 22 L${band - 16} 22" stroke="#8C5A33" stroke-width="5" stroke-dasharray="14 10"/>
      ${[1, 2, 3, 4, 5].map((i) => `<ellipse cx="${band - 40 - i * 34}" cy="0" rx="8" ry="11" fill="${hole}"/>`).join("")}
    </g>
    <g transform="translate(-118,10)"><g id="${id}-armB">${limb(54, 16, leather)}<circle cx="0" cy="58" r="15" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/></g></g>
    <g transform="translate(118,10)"><g id="${id}-armF">${limb(54, 16, leather)}<circle cx="0" cy="58" r="15" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/></g></g>
    <g id="${id}-body">
      <rect x="-110" y="-92" width="220" height="184" rx="34" fill="${C.sun}" stroke="${C.ink}" stroke-width="${OUT + 1}"/>
      <rect x="-80" y="-62" width="160" height="124" rx="20" fill="#FFE39A" stroke="${C.ink}" stroke-width="5"/>
      <path d="M-56 -50 L-14 -34 M56 -50 L14 -34" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>
      ${eyes(id, -28, 28, -14)}
      ${mouths(id, 0, 30)}
      <path d="M-22 44 Q0 54 22 44" stroke="${C.ink}" stroke-width="0" fill="none"/>
    </g>
  </g>`;
}

// ---------- Turão (nervo obturatório): verde-menta, faixa de academia ----------
export const MINT = "#4FD1A5";
export function turao(id, pts, w = 30, faceScale = 1.25) {
  const band = `<path d="M-36 -22 Q0 -40 36 -22 L34 -12 Q0 -28 -34 -12 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M34 -18 L50 -26 M34 -16 L48 -6" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>`;
  return nerve(id, pts, w, faceScale, MINT, "#DFFFF2", band);
}

// ---------- Adutores (trio de músculos da parte de dentro da coxa, tipo boy band) ----------
// Origem = centro entre os pés do trio. Cada membro: ${id}-m0..2 (corpo ${id}-m{i}-body, braços armF/armB, rosto com eyes/mouths).
export function adutores(id) {
  const cols = ["#E86A5C", "#F08A6E", "#D9574D"];
  const one = (i, x) => {
    const mid = `${id}-m${i}`, c = cols[i];
    return `<g transform="translate(${x},0)"><g id="${mid}-root">
      <g transform="translate(-14,-30)">${limb(26, 14, c)}</g><g transform="translate(14,-30)">${limb(26, 14, c)}</g>
      <g id="${mid}-body">
        <g transform="translate(-44,-170)"><g id="${mid}-armB">${limb(52, 13, c)}</g></g>
        <g transform="translate(44,-170)"><g id="${mid}-armF">${limb(52, 13, c)}</g></g>
        <path d="M0 -250 Q46 -246 50 -170 Q54 -90 30 -40 Q0 -24 -30 -40 Q-54 -90 -50 -170 Q-46 -246 0 -250Z" fill="${c}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
        <path d="M-18 -236 Q-28 -150 -16 -50 M18 -236 Q28 -150 16 -50" stroke="#B9473E" stroke-width="5" fill="none" opacity="0.6"/>
        ${eyes(mid, -16, 16, -190)}
        <g id="${mid}-shades"><rect x="-36" y="-206" width="30" height="20" rx="6" fill="${C.ink}"/><rect x="6" y="-206" width="30" height="20" rx="6" fill="${C.ink}"/><line x1="-6" y1="-198" x2="6" y2="-198" stroke="${C.ink}" stroke-width="5"/></g>
        ${mouths(mid, 0, -156)}
      </g>
    </g></g>`;
  };
  return `<g id="${id}-root">${one(0, -120)}${one(1, 0)}${one(2, 120)}</g>`;
}

// ---------- Disquinho (disco intervertebral) ----------
// Origem = centro da base. Largura ~280, altura ~150. Corpo ${id}-body (use para squash), braços armF/armB, pernas legF/legB.
export const JELLY = "#7FD3F0";
export function disquinho(id) {
  const ring = "#EADFC4", side = "#F3EAD3";
  return `<g id="${id}-root">
    <g transform="translate(-50,-26)"><g id="${id}-legB">${limb(22, 14, side)}<ellipse cx="4" cy="26" rx="18" ry="9" fill="${C.ink}"/></g></g>
    <g transform="translate(50,-26)"><g id="${id}-legF">${limb(22, 14, side)}<ellipse cx="6" cy="26" rx="18" ry="9" fill="${C.ink}"/></g></g>
    <g id="${id}-body">
      <g transform="translate(-136,-92)"><g id="${id}-armB">${limb(46, 13, side)}<circle cx="0" cy="50" r="12" fill="${side}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <g transform="translate(136,-92)"><g id="${id}-armF">${limb(46, 13, side)}<circle cx="0" cy="50" r="12" fill="${side}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <path d="M-140 -120 L-140 -50 Q-140 -24 0 -24 Q140 -24 140 -50 L140 -120 Z" fill="${side}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-140 -98 Q-140 -72 0 -72 Q140 -72 140 -98 M-140 -76 Q-140 -50 0 -50 Q140 -50 140 -76" fill="none" stroke="${ring}" stroke-width="5"/>
      <ellipse cx="0" cy="-120" rx="140" ry="34" fill="#FBF5E6" stroke="${C.ink}" stroke-width="${OUT}"/>
      ${[110, 84, 60].map((r) => `<ellipse cx="0" cy="-120" rx="${r}" ry="${(r * 34) / 140}" fill="none" stroke="${ring}" stroke-width="5"/>`).join("")}
      <ellipse cx="0" cy="-120" rx="40" ry="11" fill="${JELLY}" stroke="${C.ink}" stroke-width="4"/>
      <ellipse cx="-70" cy="-46" rx="13" ry="7" fill="${C.pain}" opacity="0.3"/><ellipse cx="70" cy="-46" rx="13" ry="7" fill="${C.pain}" opacity="0.3"/>
      ${eyes(id, -24, 24, -66)}
      ${mouths(id, 0, -38)}
    </g>
  </g>`;
}

// ---------- Geleia (núcleo pulposo): gelatina azul rebelde ----------
// Origem = centro da base. Altura ~120. Corpo ${id}-body (wobble), braços armF/armB.
export function geleia(id) {
  return `<g id="${id}-root">
    <g id="${id}-body">
      <g transform="translate(-58,-62)"><g id="${id}-armB">${limb(30, 11, JELLY)}</g></g>
      <g transform="translate(58,-62)"><g id="${id}-armF">${limb(30, 11, JELLY)}</g></g>
      <path d="M-66 0 Q-74 -60 -46 -96 Q-20 -126 4 -120 Q40 -116 58 -88 Q78 -54 66 0 Q34 10 0 6 Q-34 10 -66 0Z" fill="${JELLY}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round" opacity="0.95"/>
      <path d="M-40 -88 Q-30 -104 -12 -106" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.8"/>
      <circle cx="40" cy="-30" r="6" fill="#fff" opacity="0.6"/><circle cx="-30" cy="-20" r="4" fill="#fff" opacity="0.6"/>
      ${eyes(id, -18, 18, -66)}
      ${mouths(id, 0, -36)}
    </g>
  </g>`;
}

// ---------- Alarmildo (o alarme da dor: sirene com cara) ----------
// Origem = centro da base. Altura ~230. Grupos: ${id}-rays (raios de luz, piscar), ${id}-dome (cúpula), ${id}-body (squash), braços armF/armB.
export function alarmildo(id) {
  return `<g id="${id}-root">
    <g id="${id}-rays">${[-60, -30, 0, 30, 60].map((a) => `<g transform="rotate(${a} 0 -130)"><path d="M0 -230 L-14 -290 L14 -290 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/></g>`).join("")}</g>
    <g id="${id}-body">
      <g transform="translate(-86,-60)"><g id="${id}-armB">${limb(44, 13, "#C8D3D8")}<circle cx="0" cy="48" r="12" fill="#C8D3D8" stroke="${C.ink}" stroke-width="5"/></g></g>
      <g transform="translate(86,-60)"><g id="${id}-armF">${limb(44, 13, "#C8D3D8")}<circle cx="0" cy="48" r="12" fill="#C8D3D8" stroke="${C.ink}" stroke-width="5"/></g></g>
      <rect x="-100" y="-50" width="200" height="50" rx="14" fill="#5E6B73" stroke="${C.ink}" stroke-width="${OUT}"/>
      <path id="${id}-dome" d="M-84 -50 L-84 -130 Q-84 -220 0 -220 Q84 -220 84 -130 L84 -50 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-56 -176 Q-46 -200 -20 -206" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.7"/>
      ${eyes(id, -26, 26, -140)}
      ${mouths(id, 0, -96)}
    </g>
  </g>`;
}

// ---------- Guardas Lombares (dois músculos de terno, óculos escuros e ponto no ouvido) ----------
// Origem = centro entre os dois. Membros ${id}-g0 e ${id}-g1 (cada um com -root, -body, -armF, -armB e rosto próprio).
export function guardas(id) {
  const one = (i, x) => {
    const g = `${id}-g${i}`, m = i ? "#E0675A" : "#D9574D";
    return `<g transform="translate(${x},0)"><g id="${g}-root">
      <g transform="translate(-20,-40)">${limb(36, 18, "#1E2A33")}<ellipse cx="4" cy="42" rx="20" ry="9" fill="${C.ink}"/></g><g transform="translate(20,-40)">${limb(36, 18, "#1E2A33")}<ellipse cx="6" cy="42" rx="20" ry="9" fill="${C.ink}"/></g>
      <g id="${g}-body">
        <g transform="translate(-58,-200)"><g id="${g}-armB">${limb(70, 20, "#1E2A33")}<circle cx="0" cy="74" r="15" fill="${m}" stroke="${C.ink}" stroke-width="5"/></g></g>
        <path d="M-60 -40 L-66 -200 Q-60 -232 0 -236 Q60 -232 66 -200 L60 -40 Z" fill="#1E2A33" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
        <path d="M-18 -232 L0 -150 L18 -232 Z" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M-6 -214 L0 -160 L6 -214 Z" fill="${C.ink}"/>
        <path d="M0 -236 Q-56 -240 -54 -300 Q-50 -350 0 -352 Q50 -350 54 -300 Q56 -240 0 -236 Z" fill="${m}" stroke="${C.ink}" stroke-width="${OUT}"/>
        <path d="M-22 -340 Q-30 -290 -22 -246 M22 -340 Q30 -290 22 -246" stroke="#B9473E" stroke-width="5" fill="none" opacity="0.6"/>
        ${eyes(g, -18, 18, -300)}
        <g id="${g}-shades"><rect x="-40" y="-316" width="34" height="22" rx="6" fill="${C.ink}"/><rect x="6" y="-316" width="34" height="22" rx="6" fill="${C.ink}"/><line x1="-6" y1="-306" x2="6" y2="-306" stroke="${C.ink}" stroke-width="5"/></g>
        <path d="M52 -300 Q66 -290 60 -270 L58 -236" stroke="${C.ink}" stroke-width="4" fill="none"/>
        ${mouths(g, 0, -262)}
        <g transform="translate(58,-200)"><g id="${g}-armF">${limb(70, 20, "#1E2A33")}<circle cx="0" cy="74" r="15" fill="${m}" stroke="${C.ink}" stroke-width="5"/></g></g>
      </g>
    </g></g>`;
  };
  return `<g id="${id}-root">${one(0, -95)}${one(1, 95)}</g>`;
}

// ---------- Bursinha (bursa): almofadinha d'água ----------
// Origem = centro da base. Largura ~200, altura ~110. Corpo ${id}-body.
export function bursinha(id) {
  return `<g id="${id}-root"><g id="${id}-body">
    <g transform="translate(-92,-50)"><g id="${id}-armB">${limb(26, 10, "#BFE8F7")}</g></g>
    <g transform="translate(92,-50)"><g id="${id}-armF">${limb(26, 10, "#BFE8F7")}</g></g>
    <path d="M-100 -46 Q-100 -110 0 -110 Q100 -110 100 -46 Q100 0 0 0 Q-100 0 -100 -46Z" fill="#BFE8F7" stroke="${C.ink}" stroke-width="${OUT}" opacity="0.95"/>
    <path d="M-66 -86 Q-50 -100 -26 -100" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M-80 -30 Q-40 -20 0 -30 Q40 -40 80 -28" stroke="#7FC4E0" stroke-width="5" fill="none"/>
    ${eyes(id, -22, 22, -62)}
    ${mouths(id, 0, -36)}
  </g></g>`;
}

// ---------- Glutinho (tendão do glúteo médio): músculo em cima, tendão branco embaixo ----------
// Origem = centro da base. Altura ~260. Corpo ${id}-body, braços armF/armB.
export function glutinho(id) {
  const m = "#E0675A";
  return `<g id="${id}-root">
    <g transform="translate(-22,-30)">${limb(24, 14, "#F2E8D8")}<ellipse cx="4" cy="28" rx="18" ry="8" fill="${C.ink}"/></g><g transform="translate(22,-30)">${limb(24, 14, "#F2E8D8")}<ellipse cx="6" cy="28" rx="18" ry="8" fill="${C.ink}"/></g>
    <g id="${id}-body">
      <g transform="translate(-64,-170)"><g id="${id}-armB">${limb(50, 14, m)}<circle cx="0" cy="54" r="12" fill="${m}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <g transform="translate(64,-170)"><g id="${id}-armF">${limb(50, 14, m)}<circle cx="0" cy="54" r="12" fill="${m}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <path d="M-64 -250 Q0 -280 64 -250 Q70 -170 34 -120 L22 -36 L-22 -36 L-34 -120 Q-70 -170 -64 -250Z" fill="${m}" stroke="${C.ink}" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M-34 -120 L-22 -36 L22 -36 L34 -120 Q0 -110 -34 -120Z" fill="#F2E8D8" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-10 -110 L-8 -44 M4 -112 L6 -44 M16 -110 L14 -44" stroke="#D8CBB4" stroke-width="3"/>
      <path d="M-40 -246 Q-46 -190 -30 -140 M40 -246 Q46 -190 30 -140" stroke="#B9473E" stroke-width="5" fill="none" opacity="0.6"/>
      ${eyes(id, -20, 20, -210)}
      ${mouths(id, 0, -174)}
    </g>
  </g>`;
}

// ---------- Dona Faixa (banda iliotibial): faixa elástica comprida ----------
// Origem = centro da base. Faixa vertical alta (~420) com rosto no topo. Corpo ${id}-body (escala Y = esticar), braços armF/armB.
export function faixa(id) {
  const c = "#8FA7C2";
  return `<g id="${id}-root"><g id="${id}-body">
    <g transform="translate(-46,-300)"><g id="${id}-armB">${limb(46, 12, c)}<circle cx="0" cy="50" r="11" fill="${c}" stroke="${C.ink}" stroke-width="5"/></g></g>
    <g transform="translate(46,-300)"><g id="${id}-armF">${limb(46, 12, c)}<circle cx="0" cy="50" r="11" fill="${c}" stroke="${C.ink}" stroke-width="5"/></g></g>
    <rect x="-44" y="-420" width="88" height="420" rx="30" fill="${c}" stroke="${C.ink}" stroke-width="${OUT}"/>
    <path d="M-30 -400 L-30 -20 M30 -400 L30 -20" stroke="#6E86A3" stroke-width="4" stroke-dasharray="14 10"/>
    <path d="M-26 -386 L-6 -378 M26 -386 L6 -378" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
    ${eyes(id, -16, 16, -362)}
    ${mouths(id, 0, -326)}
    <circle cx="0" cy="-300" r="6" fill="${C.pain}"/>
  </g></g>`;
}

// ---------- Molão (tendão patelar): uma mola com rosto ----------
// Origem = centro da base. Altura ~350 em repouso. ${id}-coil (escala Y = comprimir/esticar, svgOrigin na base), ${id}-top (cabeça; mova em y junto),
// braços armF/armB presos na cabeça.
export function molao(id) {
  const c = "#F2E8D8";
  let d = "M0 -40";
  for (let i = 0; i < 8; i++) d += ` L${i % 2 ? -46 : 46} ${-60 - i * 24}`;
  d += " L0 -250";
  return `<g id="${id}-root">
    <rect x="-56" y="-40" width="112" height="40" rx="14" fill="#C9B48E" stroke="${C.ink}" stroke-width="${OUT}"/>
    <g id="${id}-coil"><path d="${d}" fill="none" stroke="${C.ink}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g id="${id}-top">
      <g transform="translate(-64,-280)"><g id="${id}-armB">${limb(44, 12, c)}<circle cx="0" cy="48" r="11" fill="${c}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <g transform="translate(64,-280)"><g id="${id}-armF">${limb(44, 12, c)}<circle cx="0" cy="48" r="11" fill="${c}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <ellipse cx="0" cy="-292" rx="70" ry="54" fill="${c}" stroke="${C.ink}" stroke-width="${OUT}"/>
      <path d="M-40 -330 L40 -330 M-46 -312 L46 -312" stroke="#D8CBB4" stroke-width="3"/>
      ${eyes(id, -22, 22, -300)}
      ${mouths(id, 0, -268)}
    </g>
  </g>`;
}

// ---------- Patelito (patela): escudinho redondo e marrento ----------
// Origem = centro da base. Altura ~200. Corpo ${id}-body, braços armF/armB.
export function patelito(id) {
  const b = C.bone;
  return `<g id="${id}-root">
    <g transform="translate(-24,-30)">${limb(24, 12, b)}<ellipse cx="4" cy="28" rx="16" ry="8" fill="${C.ink}"/></g><g transform="translate(24,-30)">${limb(24, 12, b)}<ellipse cx="6" cy="28" rx="16" ry="8" fill="${C.ink}"/></g>
    <g id="${id}-body">
      <g transform="translate(-80,-110)"><g id="${id}-armB">${limb(40, 12, b)}<circle cx="0" cy="44" r="11" fill="${b}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <g transform="translate(80,-110)"><g id="${id}-armF">${limb(40, 12, b)}<circle cx="0" cy="44" r="11" fill="${b}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <path d="M0 -200 Q86 -196 86 -120 Q86 -50 0 -30 Q-86 -50 -86 -120 Q-86 -196 0 -200Z" fill="${b}" stroke="${C.ink}" stroke-width="${OUT}"/>
      <path d="M0 -184 Q66 -180 68 -120 Q66 -66 0 -48 Q-66 -66 -68 -120 Q-66 -180 0 -184Z" fill="none" stroke="#D8CBB4" stroke-width="5"/>
      <path d="M-40 -150 L-12 -140 M40 -150 L12 -140" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
      ${eyes(id, -22, 22, -126)}
      ${mouths(id, 0, -90)}
    </g>
  </g>`;
}

// ---------- Nervo Ciático ----------
// Caminho suave por pontos (Catmull-Rom → Bézier). Mesma estrutura de comandos para poder fazer morph.
export function smooth(pts) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/** Nervo com rosto na ponta inicial (pts[0]). w = espessura. */
export function nerve(id, pts, w = 34, faceScale = 1, color = C.nerve, shine = "#FFF3B8", extraFace = "") {
  const d = smooth(pts);
  const [x, y] = pts[0];
  return `<g id="${id}-root">
    <path id="${id}-out" d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w + OUT * 2}" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="${id}-fill" d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>
    <path id="${id}-shine" d="${d}" fill="none" stroke="${shine}" stroke-width="${w * 0.22}" stroke-linecap="round" stroke-dasharray="18 30" transform="translate(${-w * 0.18},${-w * 0.18})"/>
    <g transform="translate(${x},${y}) scale(${faceScale})"><g id="${id}-face">
      <circle cx="0" cy="0" r="${w * 1.25}" fill="${color}" stroke="${C.ink}" stroke-width="${OUT}"/>
      ${eyes(id, -16, 16, -10)}
      ${mouths(id, 0, 18)}
      ${extraFace}
    </g></g>
  </g>`;
}

export function logo(white = true) {
  return `assets/marca/${white ? "logo-completa-branca" : "logo-completa"}.webp`;
}

// ---------- runtime (vai para dentro de cada cena) ----------
// Escrito como função real para ser serializado com toString().
export function runtime() {
  const R = {};
  // semente determinística
  R.rand = (seed) => { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
  const J = (id, j) => `#${id}-${j}`;
  // pose: {joint: graus}. Juntas: root, torso, neck, shB, elB, shF, elF, hipB, knB, anB, hipF, knF, anF, handB, handF
  R.pose = (tl, id, t, d, angles, ease = "power2.inOut") => {
    let k = 0;
    for (const j in angles) {
      const lead = j === "neck" ? 0 : j.startsWith("el") || j.startsWith("kn") || j.startsWith("an") ? 0.05 : 0.025;
      tl.to(J(id, j), { rotation: angles[j], svgOrigin: "0 0", duration: d, ease }, t + lead * (k++ % 3));
    }
  };
  R.setPose = (tl, id, t, angles) => { for (const j in angles) tl.set(J(id, j), { rotation: angles[j], svgOrigin: "0 0" }, t); };
  // translação do root (em unidades do SVG do personagem)
  R.move = (tl, id, t, d, x, y, ease = "power2.inOut") => tl.to(J(id, "root"), { x, y, duration: d, ease }, t);
  const EYES = ["normal", "wide", "pain", "happy", "closed"];
  const MOUTHS = ["smile", "open", "scream", "frown", "flat", "grin"];
  R.face = (tl, id, t, { eyes, mouth } = {}) => {
    if (eyes) EYES.forEach((e) => tl.set(J(id, "e-" + e), { opacity: e === eyes ? 1 : 0 }, t));
    if (mouth) MOUTHS.forEach((m) => tl.set(J(id, "m-" + m), { opacity: m === mouth ? 1 : 0 }, t));
  };
  // fala: alterna boca aberta / fechada de forma determinística
  R.talk = (tl, id, t0, t1, rest = "smile", open = "open") => {
    const r = R.rand(Math.floor(t0 * 1000) + id.length * 7);
    let t = t0, on = true;
    while (t < t1 - 0.06) {
      R.face(tl, id, t, { mouth: on ? open : rest });
      t += on ? 0.1 + r() * 0.08 : 0.07 + r() * 0.07;
      on = !on;
    }
    R.face(tl, id, t1, { mouth: rest });
  };
  // piscadas automáticas entre t0 e t1
  R.blinks = (tl, id, t0, t1, base = "normal") => {
    const r = R.rand(Math.floor(t0 * 77) + 3);
    let t = t0 + 0.8 + r() * 1.5;
    while (t < t1 - 0.3) {
      tl.set(J(id, "e-" + base), { opacity: 0 }, t);
      tl.set(J(id, "e-closed"), { opacity: 1 }, t);
      tl.set(J(id, "e-closed"), { opacity: 0 }, t + 0.12);
      tl.set(J(id, "e-" + base), { opacity: 1 }, t + 0.12);
      t += 2.2 + r() * 2.6;
    }
  };
  // respiração / balanço idle
  R.idle = (tl, id, t0, t1, amp = 2) => {
    const n = Math.max(1, Math.floor((t1 - t0) / 1.6));
    tl.to(J(id, "torso"), { rotation: `+=${amp}`, svgOrigin: "0 0", duration: (t1 - t0) / (n * 2), ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t0);
  };
  // gesticular enquanto fala (braço da frente)
  R.gesture = (tl, id, t0, t1, seed = 1) => {
    const r = R.rand(seed * 31 + Math.floor(t0 * 10));
    let t = t0;
    while (t < t1 - 0.8) {
      const d = 0.5 + r() * 0.5;
      R.pose(tl, id, t, d * 0.8, { shF: -40 - r() * 70, elF: -30 - r() * 60 }, "back.out(1.6)");
      t += d + 0.4 + r() * 0.8;
    }
    R.pose(tl, id, Math.max(t0, t1 - 0.5), 0.45, { shF: -10, elF: -20 });
  };
  // entradas
  R.pop = (tl, sel, t, d = 0.45, from = 0) => tl.fromTo(sel, { scale: from, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: d, ease: "back.out(2.2)" }, t);
  R.rise = (tl, sel, t, d = 0.5, y = 40) => tl.fromTo(sel, { y, opacity: 0 }, { y: 0, opacity: 1, duration: d, ease: "power3.out" }, t);
  R.drop = (tl, sel, t, d = 0.7, y = -500) => tl.fromTo(sel, { y, opacity: 1 }, { y: 0, duration: d, ease: "bounce.out" }, t);
  R.slideIn = (tl, sel, t, d = 0.55, x = 300) => tl.fromTo(sel, { x, opacity: 0 }, { x: 0, opacity: 1, duration: d, ease: "back.out(1.4)" }, t);
  R.fadeOut = (tl, sel, t, d = 0.3) => tl.to(sel, { opacity: 0, duration: d, ease: "power2.in" }, t);
  R.fadeIn = (tl, sel, t, d = 0.35) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: "power2.out" }, t);
  // tremedeira (dor/choque) com fim definido
  R.shake = (tl, sel, t, d = 0.6, amp = 8) => {
    const n = Math.max(2, Math.round(d / 0.05));
    const r = R.rand(Math.floor(t * 100) + 9);
    for (let i = 0; i < n; i++) tl.to(sel, { x: (r() - 0.5) * 2 * amp, y: (r() - 0.5) * 2 * amp, duration: 0.05, ease: "none" }, t + i * 0.05);
    tl.to(sel, { x: 0, y: 0, duration: 0.05 }, t + n * 0.05);
  };
  // squash & stretch ao pousar
  R.squash = (tl, sel, t, origin = "50% 100%") => {
    tl.to(sel, { scaleX: 1.18, scaleY: 0.82, transformOrigin: origin, duration: 0.09, ease: "power2.out" }, t);
    tl.to(sel, { scaleX: 0.94, scaleY: 1.08, duration: 0.12, ease: "power2.inOut" }, t + 0.09);
    tl.to(sel, { scaleX: 1, scaleY: 1, duration: 0.18, ease: "power2.out" }, t + 0.21);
  };
  // caminho do nervo: morph entre "d"s com mesma estrutura
  R.nerveTo = (tl, id, t, d, path, ease = "power2.inOut") => {
    ["out", "fill", "shine"].forEach((p) => tl.to(`#${id}-${p}`, { attr: { d: path }, duration: d, ease }, t));
  };
  // desenha um traço (stroke) ao longo do tempo
  R.draw = (tl, sel, t, d = 0.8, ease = "power2.inOut") => {
    document.querySelectorAll(sel).forEach((el) => {
      const L = el.getTotalLength ? el.getTotalLength() : 1000;
      tl.fromTo(el, { attr: { "stroke-dasharray": `${L} ${L}`, "stroke-dashoffset": L } }, { attr: { "stroke-dashoffset": 0 }, duration: d, ease }, t);
    });
  };
  return R;
}
