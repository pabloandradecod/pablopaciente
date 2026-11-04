// Biblioteca de desenho: utilitários, Professor Pablo (apresentador e corpo
// inteiro), personagens secundários e ícones. Tudo gera strings SVG.
const W = 1920, H = 1080, D = Math.PI / 180;
const C = {
  navy: '#1d2340', ink: '#1b1530', gold: '#ffbe2e', cream: '#fff5e1', coral: '#ff6b5b',
  teal: '#1fc0aa', sky: '#7cc6fe', purple: '#7b5cff', green: '#33cc77', red: '#ff3b4f',
  yellow: '#ffd84a', pink: '#ff8fb1', orange: '#ff9334', white: '#ffffff',
  skin: '#efb995', skinD: '#d89573', skinL: '#f8d0b0', hair: '#2a1c16', hairL: '#4a3428',
  beard: '#3a2a22', jacket: '#232136', jacketL: '#34314d', jacketD: '#16141f',
  outline: '#2a1a14', bone: '#f6e7c8', boneD: '#d9c28f', nerve: '#ffd23f',
};
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
const easeIn = x => Math.pow(clamp(x), 3);
const back = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const elastic = x => { x = clamp(x); if (x === 0 || x === 1) return x; return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (2 * Math.PI) / 3) + 1; };
const pulse = (t, f = 1) => 0.5 + 0.5 * Math.sin(t * f * 2 * Math.PI);
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const f1 = n => (Math.round(n * 10) / 10);
let _uid = 0; const uid = p => `${p}${++_uid}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function g(content, tr = '', extra = '') { return `<g ${tr ? `transform="${tr}"` : ''} ${extra}>${content}</g>`; }
function pop(content, x, y, p, extra = '') { // aparece com "pulo" a partir do centro (x,y)
  if (p <= 0) return '';
  const s = back(p);
  return `<g transform="translate(${f1(x)},${f1(y)}) scale(${s.toFixed(3)}) translate(${f1(-x)},${f1(-y)})" opacity="${clamp(p * 3).toFixed(2)}" ${extra}>${content}</g>`;
}
function fade(content, p) { return p <= 0 ? '' : `<g opacity="${clamp(p).toFixed(3)}">${content}</g>`; }
function slide(content, dx, dy, p) {
  if (p <= 0) return ''; const e = easeOut(p);
  return `<g transform="translate(${f1(dx * (1 - e))},${f1(dy * (1 - e))})" opacity="${clamp(p * 2).toFixed(2)}">${content}</g>`;
}
function txt(x, y, s, o = {}) {
  const size = o.size || 60, fill = o.fill || C.ink, anchor = o.anchor || 'middle';
  const font = o.font === 'b' ? "Bangers" : "Fredoka";
  const w = o.weight || 600;
  const stroke = o.stroke ? `stroke="${o.stroke}" stroke-width="${o.sw || size * 0.16}" paint-order="stroke" stroke-linejoin="round"` : '';
  const ls = o.ls ? `letter-spacing="${o.ls}"` : '';
  const rot = o.rot ? `transform="rotate(${o.rot} ${x} ${y})"` : '';
  return `<text x="${f1(x)}" y="${f1(y)}" font-family="${font}" font-weight="${w}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" ${stroke} ${ls} ${rot} ${o.extra || ''}>${o.raw ? s : esc(s)}</text>`;
}
// quebra texto em linhas por largura aproximada
function wrap(s, maxChars) {
  const words = s.split(' '); const lines = []; let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur); return lines;
}
function para(x, y, s, maxChars, o = {}) {
  const lines = wrap(s, maxChars); const lh = (o.size || 50) * (o.lh || 1.2);
  const y0 = y - (lines.length - 1) * lh / 2;
  return lines.map((l, i) => txt(x, y0 + i * lh, l, o)).join('');
}
function rrect(x, y, w, h, r, fill, o = {}) {
  return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" fill="${fill}" ${o.stroke ? `stroke="${o.stroke}" stroke-width="${o.sw || 6}"` : ''} ${o.extra || ''}/>`;
}
function card(x, y, w, h, fill = C.white, o = {}) { // cartão cartoon com sombra
  return rrect(x + 10, y + 12, w, h, o.r || 36, 'rgba(20,10,40,.25)') + rrect(x, y, w, h, o.r || 36, fill, { stroke: o.stroke || C.ink, sw: o.sw || 7 });
}
function circle(x, y, r, fill, o = {}) {
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${fill}" ${o.stroke ? `stroke="${o.stroke}" stroke-width="${o.sw || 6}"` : ''} ${o.extra || ''}/>`;
}
function line(x1, y1, x2, y2, col, w, o = '') { return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${o}/>`; }
function path(d, fill, stroke, sw = 6, o = '') {
  return `<path d="${d}" fill="${fill || 'none'}" ${stroke ? `stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"` : ''} ${o}/>`;
}
// traço que se desenha (p de 0 a 1)
function drawPath(d, stroke, sw, p, o = '') {
  if (p <= 0) return '';
  return `<path d="${d}" pathLength="1" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${clamp(p).toFixed(4)} 2" ${o}/>`;
}
function arrow(x1, y1, x2, y2, col = C.ink, w = 10, p = 1) {
  if (p <= 0) return '';
  const x = lerp(x1, x2, easeOut(p)), y = lerp(y1, y2, easeOut(p));
  const a = Math.atan2(y - y1, x - x1), h = w * 2.6;
  return line(x1, y1, x, y, col, w) + path(`M${f1(x + Math.cos(a) * h * .3)},${f1(y + Math.sin(a) * h * .3)} L${f1(x - Math.cos(a - .5) * h)},${f1(y - Math.sin(a - .5) * h)} L${f1(x - Math.cos(a + .5) * h)},${f1(y - Math.sin(a + .5) * h)} Z`, col, col, w * .5);
}
// raio elétrico entre pontos (pisca a cada frame)
function bolt(pts, seed, col = C.yellow, w = 10, jit = 22) {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1]; const n = 5;
    for (let k = 0; k <= n; k++) {
      const t = k / n; let x = lerp(x1, x2, t), y = lerp(y1, y2, t);
      if (k > 0 && k < n) { x += (hash(seed + i * 13 + k) - .5) * jit * 2; y += (hash(seed + i * 7 + k * 3) - .5) * jit; }
      d += (d ? 'L' : 'M') + f1(x) + ',' + f1(y);
    }
  }
  return path(d, 'none', '#fff8c0', w + 10, 'opacity=".55"') + path(d, 'none', col, w) + path(d, 'none', '#fff', w * .35);
}
function zapIcon(x, y, s, col = C.yellow) {
  return g(path('M10,-60 L-30,8 L-2,8 L-14,62 L32,-12 L4,-12 L22,-60 Z', col, C.ink, 6), `translate(${x},${y}) scale(${s})`);
}
function burst(x, y, r, n, col, rot = 0, stroke = C.ink) {
  let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 + rot, rr = i % 2 ? r * .72 : r;
    d += (i ? 'L' : 'M') + f1(x + Math.cos(a) * rr) + ',' + f1(y + Math.sin(a) * rr);
  }
  return path(d + 'Z', col, stroke, 7);
}
function comic(x, y, s, label, t, col = C.yellow, size = 90) {
  return g(burst(0, 0, 150, 11, col, t * .6) + txt(0, size * .35, label, { size, font: 'b', fill: C.red, stroke: C.ink, sw: 8, ls: 2 }), `translate(${x},${y}) scale(${s}) rotate(${Math.sin(t * 9) * 3})`);
}
function star(x, y, r, col = C.yellow, rot = 0) {
  let d = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5 + rot, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + f1(x + Math.cos(a) * rr) + ',' + f1(y + Math.sin(a) * rr); }
  return path(d + 'Z', col, C.ink, 5);
}
function sparkles(x, y, r, t, n = 6, col = C.yellow) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + t * .8, rr = r * (0.8 + 0.25 * Math.sin(t * 3 + i));
    const sc = 0.5 + 0.5 * Math.abs(Math.sin(t * 4 + i * 1.7));
    s += star(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 16 * sc + 6, col, t);
  }
  return s;
}
function confetti(t, seed = 1, n = 40, area = [0, 0, W, H]) {
  const cols = [C.gold, C.coral, C.teal, C.purple, C.sky, C.green, C.pink];
  let s = '';
  for (let i = 0; i < n; i++) {
    const sp = 120 + hash(i + seed) * 200;
    const x = area[0] + hash(i * 3 + seed) * area[2] + Math.sin(t * 2 + i) * 30;
    const y = area[1] + ((hash(i * 5 + seed) * area[3] + t * sp) % (area[3] + 60)) - 30;
    const r = (t * 200 + i * 40) % 360;
    s += `<rect x="${f1(x)}" y="${f1(y)}" width="18" height="10" rx="3" fill="${cols[i % cols.length]}" transform="rotate(${f1(r)} ${f1(x)} ${f1(y)})"/>`;
  }
  return s;
}
// fundo: gradiente + bolinhas de meio-tom + formas flutuantes
function bg(c1, c2, t, o = {}) {
  const id = uid('bg');
  let s = `<defs><radialGradient id="${id}" cx="${o.cx || 50}%" cy="${o.cy || 40}%" r="80%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  if (o.dots !== false) s += `<rect width="${W}" height="${H}" fill="url(#dots)" opacity="${o.dotOp || .09}"/>`;
  if (o.shapes !== false) {
    for (let i = 0; i < 9; i++) {
      const x = (hash(i + 9) * W + t * (12 + i * 4)) % (W + 200) - 100;
      const y = hash(i + 33) * H + Math.sin(t * .5 + i) * 25;
      const r = 20 + hash(i + 3) * 50;
      s += i % 3 === 0 ? circle(x, y, r, '#fff', { extra: 'opacity=".08"' })
        : i % 3 === 1 ? `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(r)}" height="${f1(r)}" rx="10" fill="#fff" opacity=".07" transform="rotate(${f1(t * 20 + i * 40)} ${f1(x)} ${f1(y)})"/>`
          : path(`M${f1(x)},${f1(y - r * .6)} L${f1(x + r * .55)},${f1(y + r * .4)} L${f1(x - r * .55)},${f1(y + r * .4)}Z`, '#fff', null, 0, 'opacity=".07"');
    }
  }
  return s;
}
function rays(x, y, t, col = '#fff', op = .12, n = 16) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 360 + t * 8;
    s += `<path d="M0,0 L2600,-160 L2600,160 Z" fill="${col}" opacity="${op}" transform="translate(${x},${y}) rotate(${f1(a)})"/>`;
  }
  return s;
}
function floor(y, col = '#000', op = .12) { return `<ellipse cx="${W / 2}" cy="${y}" rx="1300" ry="40" fill="${col}" opacity="${op}"/>`; }

// ===================================================================== PABLO
function blinkAt(t, seed = 0) {
  const period = 3.6; const ph = ((t + seed + 0.9 * Math.sin(t * .31 + seed)) % period + period) % period;
  return ph < .14 ? Math.abs(ph - .07) / .07 : 1;
}
// Cabeça do Pablo num quadro 600x760; centro do rosto ~ (300,270)
function pabloHead(o = {}) {
  const m = o.mouth || 0, talking = o.talking, t = o.t || 0;
  const blink = o.blink == null ? blinkAt(t) : o.blink;
  const shock = o.expr === 'shock', think = o.expr === 'think';
  const brow = (o.brow || 0) + (shock ? -16 : 0);
  const lx = (o.look ? o.look[0] : 0), ly = (o.look ? o.look[1] : 0);
  const cid = uid('mc'), fid = uid('fc');
  let s = '';
  // orelhas
  s += `<ellipse cx="172" cy="292" rx="28" ry="42" fill="${C.skin}" stroke="${C.outline}" stroke-width="5"/><path d="M164,274 Q178,292 168,312" fill="none" stroke="${C.skinD}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<ellipse cx="428" cy="292" rx="28" ry="42" fill="${C.skin}" stroke="${C.outline}" stroke-width="5"/><path d="M436,274 Q422,292 432,312" fill="none" stroke="${C.skinD}" stroke-width="5" stroke-linecap="round"/>`;
  // rosto
  const face = 'M178,226 C172,336 200,412 256,448 Q300,472 344,448 C400,412 428,336 422,226 C418,148 366,110 300,110 C234,110 182,148 178,226 Z';
  s += `<defs><clipPath id="${fid}"><path d="${face}"/></clipPath></defs>`;
  s += `<path d="${face}" fill="${C.skin}" stroke="${C.outline}" stroke-width="6"/>`;
  // sombra lateral do rosto
  s += `<g clip-path="url(#${fid})"><path d="M380,150 C430,250 420,380 330,460 L460,460 L460,150 Z" fill="${C.skinD}" opacity=".35"/></g>`;
  // barba curta (estilo barba por fazer) + bigode
  s += `<g clip-path="url(#${fid})"><path d="M160,262 L186,276 C204,330 230,352 262,358 Q300,350 338,358 C370,352 396,330 414,276 L440,262 L440,520 L160,520 Z" fill="${C.beard}" opacity=".5"/><path d="M262,400 Q300,430 338,400 L346,470 L254,470 Z" fill="${C.beard}" opacity=".35"/>`;
  for (let i = 0; i < 26; i++) { const x = 205 + hash(i) * 190, y = 360 + hash(i + 50) * 85; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="2.4" fill="${C.hair}" opacity=".55"/>`; }
  s += `</g>`;
  s += `<path d="M246,${376 - m * 4} Q272,352 300,358 Q328,352 354,${376 - m * 4} Q328,366 300,370 Q272,366 246,${376 - m * 4} Z" fill="${C.beard}" opacity=".85"/>`;
  // bochechas
  s += `<ellipse cx="228" cy="330" rx="26" ry="16" fill="${C.coral}" opacity=".22"/><ellipse cx="372" cy="330" rx="26" ry="16" fill="${C.coral}" opacity=".22"/>`;
  // boca
  const a = shock ? 0.55 + m * 0.4 : (talking ? 0.1 + m * 0.9 : 0.2);
  const w = shock ? 26 : 50 - a * 8, cx = 300, cy = 384;
  const cornerY = shock ? cy + 2 : cy - 8, topY = shock ? cy - 8 : cy + 2, botY = cy + 8 + a * 40 + (shock ? 10 : 0);
  const mp = `M${f1(cx - w)},${f1(cornerY)} Q${cx},${f1(topY)} ${f1(cx + w)},${f1(cornerY)} Q${f1(cx + w * .75)},${f1(botY)} ${cx},${f1(botY)} Q${f1(cx - w * .75)},${f1(botY)} ${f1(cx - w)},${f1(cornerY)} Z`;
  s += `<defs><clipPath id="${cid}"><path d="${mp}"/></clipPath></defs>`;
  s += `<path d="${mp}" fill="#5a1d24"/>`;
  s += `<g clip-path="url(#${cid})"><rect x="${cx - 60}" y="${f1(topY - 14)}" width="120" height="${shock ? 18 : 22}" fill="#fff"/><line x1="300" y1="${f1(topY - 8)}" x2="300" y2="${f1(topY + 12)}" stroke="#ddd" stroke-width="2"/><ellipse cx="${cx}" cy="${f1(botY + 4)}" rx="${f1(w * .55)}" ry="${f1(8 + a * 8)}" fill="#ff7a8a"/></g>`;
  s += `<path d="${mp}" fill="none" stroke="#6b2f26" stroke-width="5" stroke-linejoin="round"/>`;
  if (!shock) s += `<path d="M${f1(cx - w - 8)},${f1(cornerY - 6)} Q${f1(cx - w - 2)},${f1(cornerY + 2)} ${f1(cx - w + 4)},${f1(cornerY + 4)}" fill="none" stroke="${C.skinD}" stroke-width="4" stroke-linecap="round"/><path d="M${f1(cx + w + 8)},${f1(cornerY - 6)} Q${f1(cx + w + 2)},${f1(cornerY + 2)} ${f1(cx + w - 4)},${f1(cornerY + 4)}" fill="none" stroke="${C.skinD}" stroke-width="4" stroke-linecap="round"/>`;
  // nariz
  s += `<path d="M296,262 C292,292 280,312 282,326 Q292,340 304,334 Q316,340 322,328 C322,316 312,300 306,284" fill="${C.skinD}" opacity=".35"/>`;
  s += `<path d="M284,324 Q292,338 302,332 Q312,338 320,326" fill="none" stroke="${C.outline}" stroke-width="5" stroke-linecap="round"/>`;
  // olhos
  for (const [ex, side] of [[250, -1], [350, 1]]) {
    const ey = 268;
    const bl = Math.max(0.08, blink) * (shock ? 1.2 : 1);
    s += `<g transform="translate(${ex},${ey}) scale(1,${bl.toFixed(3)})">`;
    s += `<ellipse cx="0" cy="0" rx="27" ry="23" fill="#fff" stroke="${C.outline}" stroke-width="4"/>`;
    s += `<circle cx="${f1(lx * 7)}" cy="${f1(ly * 5 + 2)}" r="15" fill="#6a4026"/><circle cx="${f1(lx * 7)}" cy="${f1(ly * 5 + 2)}" r="8" fill="#1a0f0a"/><circle cx="${f1(lx * 7 + 5)}" cy="${f1(ly * 5 - 4)}" r="5" fill="#fff"/>`;
    s += `</g>`;
    s += `<path d="M${ex - 30},${ey - 4} Q${ex},${f1(ey - 30 * Math.max(.3, blink))} ${ex + 30},${ey - 4}" fill="none" stroke="${C.outline}" stroke-width="6" stroke-linecap="round"/>`;
    if (!shock) { // rugas do sorriso (pés de galinha) e bolsinha
      s += `<path d="M${ex - 18},${ey + 26} Q${ex},${ey + 34} ${ex + 18},${ey + 26}" fill="none" stroke="${C.skinD}" stroke-width="4" stroke-linecap="round"/>`;
      const ox = ex + side * 36;
      s += `<path d="M${ox},${ey - 8} l${side * 14},-6 M${ox + side * 2},${ey + 2} l${side * 16},0 M${ox},${ey + 11} l${side * 14},6" stroke="${C.skinD}" stroke-width="3.5" stroke-linecap="round"/>`;
    }
  }
  // sobrancelhas
  const bt = think ? 8 : 0;
  s += `<path d="M214,${232 + brow + bt} Q246,${208 + brow} 282,${224 + brow + bt * .5}" fill="none" stroke="${C.hair}" stroke-width="14" stroke-linecap="round"/>`;
  s += `<path d="M318,${224 + brow - bt} Q354,${208 + brow - bt * 1.5} 386,${232 + brow}" fill="none" stroke="${C.hair}" stroke-width="14" stroke-linecap="round"/>`;
  // cabelo
  s += `<path d="M168,272 C156,200 166,134 210,102 C236,68 272,52 310,52 C356,50 398,68 422,100 C450,136 452,206 434,272 L420,272 C418,232 412,204 400,184 C380,170 356,170 336,156 C314,170 286,168 264,156 C244,172 220,178 202,190 C190,212 184,240 182,272 Z" fill="${C.hair}" stroke="${C.outline}" stroke-width="5"/>`;
  s += `<path d="M214,118 C240,56 330,38 384,80 C356,64 300,60 262,84 C300,72 346,80 372,104 C330,88 270,92 236,124 Z" fill="${C.hair}"/>`;
  s += `<path d="M232,112 C262,78 316,70 354,88" fill="none" stroke="${C.hairL}" stroke-width="7" stroke-linecap="round" opacity=".9"/><path d="M250,138 C280,118 320,116 350,126" fill="none" stroke="${C.hairL}" stroke-width="5" stroke-linecap="round" opacity=".7"/>`;
  s += `<path d="M178,250 L184,304" stroke="${C.hair}" stroke-width="14" stroke-linecap="round"/><path d="M422,250 L416,304" stroke="${C.hair}" stroke-width="14" stroke-linecap="round"/>`;
  return s;
}

// --------- mãos
function hand(x, y, kind, ang, sc = 1) {
  const sk = C.skin, o = C.outline; let s = '';
  if (kind === 'none') return '';
  if (kind === 'fist') {
    s = `<circle r="30" fill="${sk}" stroke="${o}" stroke-width="5"/><path d="M-8,-18 Q4,-14 4,-4 M-8,-4 Q4,0 4,10 M-8,10 Q2,14 2,20" fill="none" stroke="${C.skinD}" stroke-width="4" stroke-linecap="round"/>`;
  } else if (kind === 'open') {
    for (let i = 0; i < 4; i++) { const a = -42 + i * 26; s += `<rect x="18" y="-9" width="44" height="18" rx="9" fill="${sk}" stroke="${o}" stroke-width="5" transform="rotate(${a})"/>`; }
    s += `<rect x="6" y="-9" width="40" height="18" rx="9" fill="${sk}" stroke="${o}" stroke-width="5" transform="rotate(80)"/>`;
    s += `<ellipse rx="34" ry="30" fill="${sk}" stroke="${o}" stroke-width="5"/><ellipse cx="22" rx="18" ry="22" fill="${sk}"/>`;
  } else if (kind === 'point') {
    s = `<rect x="10" y="-11" width="66" height="22" rx="11" fill="${sk}" stroke="${o}" stroke-width="5"/><circle r="30" fill="${sk}" stroke="${o}" stroke-width="5"/><path d="M4,-12 Q14,-8 14,2 M2,4 Q12,8 10,18" fill="none" stroke="${C.skinD}" stroke-width="4" stroke-linecap="round"/>`;
  } else if (kind === 'thumb') {
    ang = 0;
    s = `<rect x="-11" y="-74" width="24" height="56" rx="12" fill="${sk}" stroke="${o}" stroke-width="5"/><rect x="-32" y="-26" width="62" height="56" rx="20" fill="${sk}" stroke="${o}" stroke-width="5"/><path d="M-30,-6 L22,-6 M-30,10 L22,10" stroke="${C.skinD}" stroke-width="4" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(ang)}) scale(${sc})">${s}</g>`;
}
const POSES = {
  clasp: { L: { e: [150, 780], h: [276, 642], k: 'none' }, R: { e: [450, 780], h: [324, 642], k: 'none' }, clasp: 1 },
  point: { L: { e: [30, 580], h: [-70, 440], k: 'point' }, R: { e: [500, 760], h: [470, 900], k: 'fist' } },
  open: { L: { e: [36, 680], h: [-24, 560], k: 'open' }, R: { e: [564, 680], h: [624, 560], k: 'open' } },
  think: { L: { e: [140, 800], h: [250, 860], k: 'fist' }, R: { e: [480, 720], h: [352, 482], k: 'fist' } },
  thumbs: { L: { e: [130, 800], h: [220, 860], k: 'fist' }, R: { e: [580, 700], h: [560, 572], k: 'thumb' } },
  shock: { L: { e: [60, 640], h: [126, 474], k: 'open' }, R: { e: [540, 640], h: [474, 474], k: 'open' } },
  wave: { L: { e: [130, 800], h: [220, 860], k: 'fist' }, R: { e: [580, 560], h: [610, 400], k: 'open' } },
};
function blendPose(a, b, p) {
  const r = {};
  for (const side of ['L', 'R']) {
    r[side] = {
      e: [lerp(a[side].e[0], b[side].e[0], p), lerp(a[side].e[1], b[side].e[1], p)],
      h: [lerp(a[side].h[0], b[side].h[0], p), lerp(a[side].h[1], b[side].h[1], p)],
      k: p < .5 ? a[side].k : b[side].k,
    };
  }
  r.clasp = (p < .5 ? a.clasp : b.clasp) ? 1 : 0;
  return r;
}
function arm(S, E, Hh, kind, wave, t) {
  let s = `<path d="M${S[0]},${S[1]} L${f1(E[0])},${f1(E[1])} L${f1(Hh[0])},${f1(Hh[1])}" fill="none" stroke="${C.jacketD}" stroke-width="82" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M${S[0]},${S[1]} L${f1(E[0])},${f1(E[1])} L${f1(Hh[0])},${f1(Hh[1])}" fill="none" stroke="${C.jacket}" stroke-width="70" stroke-linecap="round" stroke-linejoin="round"/>`;
  const a = Math.atan2(Hh[1] - E[1], Hh[0] - E[0]);
  const cx = Hh[0] - Math.cos(a) * 26, cy = Hh[1] - Math.sin(a) * 26;
  s += line(cx - Math.sin(a) * 32, cy + Math.cos(a) * 32, cx + Math.sin(a) * 32, cy - Math.cos(a) * 32, C.jacketL, 8);
  let ang = a / D; if (wave) ang += Math.sin(t * 10) * 18 - 70;
  s += hand(Hh[0] + Math.cos(a) * 14, Hh[1] + Math.sin(a) * 14, kind, kind === 'open' && !wave ? ang : ang, 1);
  return s;
}
// apresentador busto. o: {x, y(base), s, pose, prevPose, poseT, mouth, talking, t, flip, expr}
function pablo(o) {
  const t = o.t || 0;
  const pp = ease((o.poseT || 9) / 0.4);
  const P = blendPose(POSES[o.prevPose || o.pose] || POSES.clasp, POSES[o.pose] || POSES.clasp, pp);
  const expr = o.expr || (o.pose === 'shock' ? 'shock' : o.pose === 'think' ? 'think' : '');
  const m = o.mouth || 0;
  let body = '';
  // pescoço e corpo (jaqueta preta com gola padre e zíper)
  body += `<path d="M262,400 L262,486 L338,486 L338,400 Z" fill="${C.skinD}" stroke="${C.outline}" stroke-width="5"/>`;
  body += `<path d="M40,800 C44,640 70,560 150,520 C200,498 236,476 262,470 L338,470 C364,476 400,498 450,520 C530,560 556,640 560,800 Z" fill="${C.jacket}" stroke="${C.jacketD}" stroke-width="7"/>`;
  body += `<path d="M150,524 C190,600 238,640 300,652 C362,640 410,600 450,524" fill="none" stroke="${C.jacketL}" stroke-width="5"/>`;
  body += `<path d="M120,600 C150,700 160,760 160,800 M480,600 C450,700 440,760 440,800" fill="none" stroke="${C.jacketL}" stroke-width="4"/>`;
  body += `<path d="M250,462 Q300,476 350,462 L356,500 Q300,516 244,500 Z" fill="${C.jacketL}" stroke="${C.jacketD}" stroke-width="6"/>`;
  body += `<line x1="300" y1="508" x2="300" y2="800" stroke="#8a87a3" stroke-width="5"/><rect x="292" y="508" width="16" height="30" rx="4" fill="#b7b4cc"/>`;
  body += `<g transform="translate(92,700) rotate(-12)"><path d="M0,-26 L22,-14 L18,16 L0,28 L-18,16 L-22,-14 Z" fill="${C.gold}" stroke="#a87b12" stroke-width="4"/><circle r="7" fill="#a87b12"/></g>`;
  // braços
  const S_L = [128, 560], S_R = [472, 560];
  let arms = '';
  arms += arm(S_L, P.L.e, P.L.h, P.L.k, false, t);
  arms += arm(S_R, P.R.e, P.R.h, P.R.k, o.pose === 'wave' && pp > .9, t);
  if (P.clasp) { // mãos entrelaçadas, como na foto
    arms += `<g transform="translate(300,624)"><ellipse rx="74" ry="58" fill="${C.skin}" stroke="${C.outline}" stroke-width="6"/>`;
    for (let i = 0; i < 4; i++) arms += `<path d="M${-46 + i * 26},-44 q14,30 6,62" fill="none" stroke="${C.skinD}" stroke-width="5" stroke-linecap="round"/>`;
    arms += `<rect x="-38" y="-70" width="30" height="50" rx="15" fill="${C.skin}" stroke="${C.outline}" stroke-width="5" transform="rotate(-14)"/><rect x="6" y="-70" width="30" height="50" rx="15" fill="${C.skin}" stroke="${C.outline}" stroke-width="5" transform="rotate(14)"/></g>`;
  }
  const headUp = ['shock', 'think', 'thumbs'].includes(o.pose);
  // movimentos de "vida": respiração, balanço, aceno de cabeça ao falar
  const tilt = Math.sin(t * .9) * 2.2 + (o.talking ? Math.sin(t * 5.3) * m * 2.5 : 0) + (expr === 'think' ? 6 : 0);
  const nod = (o.talking ? m * 5 : 0) + Math.sin(t * 1.3) * 2;
  const head = `<g transform="translate(0,${f1(nod)}) rotate(${f1(tilt)} 300 420)">${pabloHead({ mouth: m, talking: o.talking, t, expr, brow: (o.talking ? -m * 6 : 0), look: o.look || [o.flip ? .5 : -.5, 0] })}</g>`;
  const sway = Math.sin(t * .7) * 1.2;
  const breath = 1 + Math.sin(t * 1.6) * .006;
  const inner = body + (headUp ? head + arms : arms + head);
  const s = o.s || 1;
  return `<g transform="translate(${f1(o.x)},${f1(o.y)}) scale(${o.flip ? -s : s},${f1(s * breath)}) rotate(${f1(sway)}) translate(-300,-800)">${inner}</g>`;
}

// ===================================================================== CORPO INTEIRO (lado)
// a: ângulos absolutos em graus (0 = direita, 90 = baixo)
function figure(o) {
  const L = { torso: 150, ua: 74, fa: 70, th: 104, sh: 100, ft: 44 };
  const a = Object.assign({ torso: -90, head: 0, uaN: 100, faN: 80, uaF: 80, faF: 100, thN: 90, shN: 90, ftN: 0, thF: 90, shF: 90, ftF: 0 }, o.a);
  const P = (p, ang, len) => [p[0] + Math.cos(ang * D) * len, p[1] + Math.sin(ang * D) * len];
  const hip = o.hip, sh = P(hip, a.torso, L.torso);
  const cl = Object.assign({ top: C.jacket, topD: C.jacketD, pants: '#3a4258', pantsD: '#262c3d', shoe: '#fff', skin: C.skin }, o.colors || {});
  const limb = (pts, w, col, colD) => {
    const d = 'M' + pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L');
    return `<path d="${d}" fill="none" stroke="${colD}" stroke-width="${w + 10}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  const leg = (th, shn, ft, far) => {
    const k = P(hip, th, L.th), an = P(k, shn, L.sh), toe = P(an, ft, L.ft);
    let s = limb([hip, k, an], 44, far ? cl.pantsD : cl.pants, '#151820');
    s += `<g transform="translate(${f1(an[0])},${f1(an[1])}) rotate(${f1(ft)})"><rect x="-14" y="-16" width="${L.ft + 22}" height="32" rx="16" fill="${far ? '#ddd' : cl.shoe}" stroke="${C.outline}" stroke-width="5"/><rect x="-14" y="8" width="${L.ft + 22}" height="8" rx="4" fill="${C.gold}"/></g>`;
    return { s, k, an, toe };
  };
  const armf = (ua, fa, far) => {
    const e = P(sh, ua, L.ua), hd = P(e, fa, L.fa);
    let s = limb([sh, e, hd], 34, far ? cl.topD : cl.top, '#0d0c14');
    s += circle(hd[0], hd[1], 19, cl.skin, { stroke: C.outline, sw: 5 });
    return { s, e, hd };
  };
  const breath = o.breath || 0;
  let s = '';
  s += armf(a.uaF, a.faF, true).s;
  const lf = leg(a.thF, a.shF, a.ftF, true); s += lf.s;
  // tronco
  s += limb([hip, P(hip, a.torso, L.torso * .2), sh], 84 + breath, cl.top, '#0d0c14');
  if (!o.simple) s += line(...P(hip, a.torso, 10), ...P(sh, a.torso, -6), '#8a87a3', 4);
  const ln = leg(a.thN, a.shN, a.ftN, false); s += ln.s;
  // cabeça
  const hc = P(sh, a.torso, 70);
  const rot = a.torso + 90 + a.head;
  const hs = o.headScale || 0.4;
  if (o.simple) s += `<g transform="translate(${f1(hc[0])},${f1(hc[1])}) rotate(${f1(rot)})">${simpleHead(o.face || {}, o.t || 0)}</g>`;
  else s += `<g transform="translate(${f1(hc[0])},${f1(hc[1])}) rotate(${f1(rot)}) scale(${hs}) translate(-300,-300)">${pabloHead({ mouth: o.mouth || 0, talking: o.talking, t: o.t || 0, look: o.look || [0, 0], expr: o.expr })}</g>`;
  const an = armf(a.uaN, a.faN, false); s += an.s;
  return { svg: s, hip, sh, hc, ankleN: ln.an, kneeN: ln.k, handN: an.hd, toeN: ln.toe };
}
// cabeça simples de personagem paciente (raio ~70)
function simpleHead(f, t) {
  const hair = f.hair || '#7a4a2a', skin = f.skin || '#f3c9a3';
  let s = circle(0, 0, 70, skin, { stroke: C.outline, sw: 6 });
  s += path('M-70,-6 C-74,-60 -30,-84 6,-80 C46,-78 76,-50 70,-8 C50,-40 10,-46 -20,-40 C-40,-36 -58,-24 -70,-6Z', hair, C.outline, 5);
  const bl = blinkAt(t, 1.7);
  if (f.mood === 'pain') {
    s += path('M-36,-6 l18,8 l-18,8 M36,-6 l-18,8 l18,8', 'none', C.ink, 6);
    s += path('M-24,36 q8,-10 16,0 q8,10 16,0 q8,-10 16,0', 'none', C.ink, 6);
    s += path('M48,-40 q8,14 0,22 q-8,-8 0,-22Z', '#7cc6fe', C.ink, 3);
  } else if (f.mood === 'happy') {
    s += path('M-38,0 q12,-14 24,0 M14,0 q12,-14 24,0', 'none', C.ink, 6);
    s += path('M-26,24 q26,30 52,0Z', '#5a1d24', C.ink, 5);
  } else if (f.mood === 'sneeze') {
    s += path('M-38,0 l20,0 M18,0 l20,0', 'none', C.ink, 7);
    s += `<ellipse cx="0" cy="34" rx="16" ry="20" fill="#5a1d24" stroke="${C.ink}" stroke-width="5"/>`;
  } else {
    s += `<ellipse cx="-24" cy="0" rx="9" ry="${f1(12 * bl + 1)}" fill="${C.ink}"/><ellipse cx="24" cy="0" rx="9" ry="${f1(12 * bl + 1)}" fill="${C.ink}"/>`;
    s += path('M-20,30 q20,16 40,0', 'none', C.ink, 6);
  }
  s += `<ellipse cx="-44" cy="22" rx="12" ry="7" fill="${C.coral}" opacity=".35"/><ellipse cx="44" cy="22" rx="12" ry="7" fill="${C.coral}" opacity=".35"/>`;
  return s;
}
const PATIENT = { top: '#3fbf86', topD: '#2a8f62', pants: '#3d6fb6', pantsD: '#2b4f86', shoe: '#ff6b5b' };

// boneco paciente em pé (lado), com animação simples
function standing(x, y, t, o = {}) {
  const sw = o.walk ? Math.sin(t * (o.speed || 6)) : 0;
  const a = {
    torso: -90 + (o.lean || 0) + (o.waddle ? Math.sin(t * 8) * 7 : 0), head: o.headTilt || 0,
    thN: 90 + sw * 24, shN: 90 + sw * 24 + Math.max(0, -sw) * 30, ftN: 0,
    thF: 90 - sw * 24, shF: 90 - sw * 24 + Math.max(0, sw) * 30, ftF: 0,
    uaN: 90 - sw * 22, faN: 70 - sw * 22, uaF: 90 + sw * 22, faF: 70 + sw * 22,
  };
  if (o.waddle) { a.thN = 90 + Math.sin(t * 8) * 6; a.thF = 90 - Math.sin(t * 8) * 6; a.shN = a.thN; a.shF = a.thF; a.uaN = 110; a.faN = 120; a.uaF = 70; a.faF = 60; }
  if (o.arms) Object.assign(a, o.arms);
  const hipY = y - 248 - (o.walk ? Math.abs(Math.cos(t * (o.speed || 6))) * 6 : 0) - (o.jump || 0);
  return figure({ hip: [x, hipY], a, simple: true, colors: PATIENT, face: o.face || {}, t });
}

// ----------------------------------------------------------- ícones
const ICON = {
  fire: (s = 1) => g(path('M0,-70 C30,-30 60,-10 50,30 C42,62 -42,62 -50,30 C-58,-6 -24,-20 -18,-46 C-6,-26 4,-22 0,-70Z', C.orange, C.ink, 6) + path('M0,-20 C16,0 28,10 22,32 C16,48 -16,48 -22,32 C-26,14 -10,6 0,-20Z', C.yellow, null), `scale(${s})`),
  ant: (s = 1) => g(`<ellipse cx="-36" cy="0" rx="20" ry="16" fill="${C.ink}"/><ellipse cx="0" cy="0" rx="16" ry="13" fill="${C.ink}"/><ellipse cx="36" cy="-4" rx="18" ry="16" fill="${C.ink}"/>` + path('M-6,10 l-16,26 M0,12 l0,28 M6,10 l16,26 M-6,-10 l-16,-22 M6,-10 l16,-22 M44,-18 l14,-20 M36,-18 l2,-24', 'none', C.ink, 5) + circle(42, -8, 4, '#fff'), `scale(${s})`),
  zzz: (s = 1) => g(txt(-20, 30, 'Z', { size: 90, font: 'b', fill: C.sky, stroke: C.ink, sw: 6 }) + txt(30, -10, 'Z', { size: 60, font: 'b', fill: C.sky, stroke: C.ink, sw: 5 }) + txt(62, -44, 'z', { size: 44, font: 'b', fill: C.sky, stroke: C.ink, sw: 4 }), `scale(${s})`),
  check: (s = 1, col = C.green) => g(circle(0, 0, 40, col, { stroke: C.ink, sw: 6 }) + path('M-18,0 l12,14 l24,-26', 'none', '#fff', 11), `scale(${s})`),
  x: (s = 1, col = C.red) => g(circle(0, 0, 40, col, { stroke: C.ink, sw: 6 }) + path('M-15,-15 l30,30 M15,-15 l-30,30', 'none', '#fff', 11), `scale(${s})`),
  warn: (s = 1) => g(path('M0,-60 L58,46 L-58,46 Z', C.yellow, C.ink, 8) + txt(0, 34, '!', { size: 80, font: 'b', fill: C.ink }), `scale(${s})`),
  clock: (s = 1, t = 0) => g(circle(0, 0, 50, '#fff', { stroke: C.ink, sw: 7 }) + line(0, 0, Math.cos(t * 3) * 34, Math.sin(t * 3) * 34, C.ink, 6) + line(0, 0, Math.cos(t * .5) * 22, Math.sin(t * .5) * 22, C.red, 7) + circle(0, 0, 6, C.ink), `scale(${s})`),
  chair: (s = 1) => g(path('M-40,-80 L-40,40 M-40,0 L40,0 L40,50 M-40,0 L-40,50', 'none', '#8a5a3a', 14) + rrect(-48, -8, 96, 16, 6, '#b07a4f', { stroke: C.ink, sw: 4 }), `scale(${s})`),
  pill: (s = 1) => g(`<g transform="rotate(-35)">` + rrect(-50, -20, 100, 40, 20, '#fff', { stroke: C.ink, sw: 6 }) + `<path d="M0,-20 L30,-20 A20,20 0 0 1 30,20 L0,20 Z" fill="${C.coral}"/>` + rrect(-50, -20, 100, 40, 20, 'none', { stroke: C.ink, sw: 6 }) + `</g>`, `scale(${s})`),
  hourglass: (s = 1, t = 0) => g(path('M-36,-56 L36,-56 L4,0 L36,56 L-36,56 L-4,0 Z', '#e8f6ff', C.ink, 6) + path(`M-${f1(22 - (t % 2) * 8)},-40 L${f1(22 - (t % 2) * 8)},-40 L0,-6 Z`, C.gold) + path(`M-26,50 L26,50 L0,${f1(40 - (t % 2) * 14)} Z`, C.gold) + rrect(-46, -66, 92, 14, 6, '#8a5a3a', { stroke: C.ink, sw: 4 }) + rrect(-46, 52, 92, 14, 6, '#8a5a3a', { stroke: C.ink, sw: 4 }), `scale(${s})`),
  band: (s = 1, t = 0) => { const st = Math.sin(t * 6) * 18; return g(path(`M-70,0 Q0,${f1(st)} 70,0`, 'none', C.coral, 12) + circle(-70, 0, 14, C.ink) + circle(70, 0, 14, C.ink) + path('M-20,-34 l10,14 M0,-40 l0,16 M20,-34 l-10,14', 'none', C.red, 5), `scale(${s})`); },
  glass: (s = 1) => g(path('M-30,-60 L30,-60 L22,60 L-22,60 Z', '#bfe8ff', C.ink, 6) + path('M-8,-40 l-6,30 l12,-6 l-8,26', 'none', C.ink, 4) + txt(0, 100, 'FRÁGIL?', { size: 32, font: 'b', fill: C.red }), `scale(${s})`),
  toilet: (s = 1) => g(rrect(-26, -70, 52, 46, 8, '#fff', { stroke: C.ink, sw: 6 }) + path('M-50,-20 L50,-20 Q46,30 0,34 Q-46,30 -50,-20Z', '#fff', C.ink, 6) + rrect(-20, 30, 40, 30, 6, '#fff', { stroke: C.ink, sw: 6 }), `scale(${s})`),
  saddle: (s = 1) => g(path('M-70,0 Q-60,-40 -20,-30 Q0,-50 20,-30 Q60,-40 70,0 Q40,20 0,10 Q-40,20 -70,0Z', '#a0622d', C.ink, 6) + path('M-20,10 L-24,50 M20,10 L24,50', 'none', C.ink, 6), `scale(${s})`),
  foot: (s = 1) => g(path('M-20,-60 L10,-60 L14,20 L60,30 Q66,52 50,56 L-20,56 Z', C.skin, C.ink, 6) + path('M-50,40 l-20,0 M-50,20 l-30,0', 'none', C.ink, 5), `scale(${s})`),
  thermo: (s = 1) => g(rrect(-14, -66, 28, 100, 14, '#fff', { stroke: C.ink, sw: 6 }) + circle(0, 44, 24, C.red, { stroke: C.ink, sw: 6 }) + rrect(-6, -30, 12, 70, 6, C.red), `scale(${s})`),
  heart: (s = 1) => g(path('M0,40 C-60,0 -50,-50 -20,-50 C-6,-50 0,-40 0,-30 C0,-40 6,-50 20,-50 C50,-50 60,0 0,40Z', C.red, C.ink, 6), `scale(${s})`),
  moon: (s = 1) => g(path('M10,-50 A50,50 0 1 0 50,10 A38,38 0 1 1 10,-50Z', C.yellow, C.ink, 6), `scale(${s})`),
  muscle: (s = 1) => g(path('M-60,30 Q-60,-10 -30,-20 Q-30,-60 0,-60 Q20,-60 20,-40 Q0,-40 0,-20 Q40,-30 60,0 Q60,40 0,40 Z', C.skin, C.ink, 6) + path('M-20,-14 Q0,-4 10,-20', 'none', C.skinD, 5), `scale(${s})`),
  box: (s = 1) => g(rrect(-50, -40, 100, 80, 8, '#d9a066', { stroke: C.ink, sw: 6 }) + line(-50, -10, 50, -10, '#a0703a', 5), `scale(${s})`),
  bed: (s = 1) => g(rrect(-90, -10, 180, 40, 10, '#7cc6fe', { stroke: C.ink, sw: 6 }) + rrect(-90, -30, 50, 26, 10, '#fff', { stroke: C.ink, sw: 5 }) + line(-90, 30, -90, 50, C.ink, 8) + line(90, 30, 90, 50, C.ink, 8), `scale(${s})`),
  walk: (s = 1, t = 0) => g(standing(0, 120, t, { walk: true }).svg, `scale(${s * .45})`),
  bubble: (s = 1) => g(path('M-70,-50 L70,-50 Q90,-50 90,-30 L90,20 Q90,40 70,40 L-10,40 L-40,70 L-36,40 L-70,40 Q-90,40 -90,20 L-90,-30 Q-90,-50 -70,-50Z', '#fff', C.ink, 6) + circle(-40, -5, 9, C.ink) + circle(0, -5, 9, C.ink) + circle(40, -5, 9, C.ink), `scale(${s})`),
};
