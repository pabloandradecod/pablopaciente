// Cenas do vídeo. Cada função recebe o contexto c (tempo, fala atual, passo
// visual) e devolve SVG. O apresentador é desenhado pelo motor (main.js).

// ------------------------------------------------------------ geometria auxiliar
function polyLen(p) { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; }
function polyAt(p, u) {
  const L = polyLen(p) * clamp(u); let acc = 0;
  for (let i = 1; i < p.length; i++) {
    const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
    if (acc + d >= L) { const k = (L - acc) / d; return [lerp(p[i - 1][0], p[i][0], k), lerp(p[i - 1][1], p[i][1], k)]; }
    acc += d;
  }
  return p[p.length - 1];
}
function polySub(p, u0, u1) {
  const out = [polyAt(p, u0)]; const L = polyLen(p); let acc = 0;
  for (let i = 1; i < p.length; i++) {
    acc += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
    if (acc / L > u0 && acc / L < u1) out.push(p[i]);
  }
  out.push(polyAt(p, u1)); return out;
}
const pd = p => 'M' + p.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L');
const mx = (side, pts) => pts.map(([x, y]) => [x * side, y]);

// ------------------------------------------------------------ corpo de costas com nervo
const ROOTS = [[[14, 420], [34, 480], [54, 556]], [[14, 444], [34, 494], [54, 558]], [[12, 470], [34, 512], [56, 561]], [[12, 494], [36, 530], [57, 564]], [[10, 515], [38, 545], [58, 566]]];
const N_MAIN = [[56, 562], [61, 600], [63, 650], [62, 700], [60, 752]];
const N_TIB = [[60, 752], [60, 800], [58, 860], [58, 905], [60, 932]];
const N_FIB = [[60, 752], [78, 770], [94, 800], [92, 860], [88, 905], [78, 932]];
const N_FULL = [[14, 444], [34, 494], [54, 558], [61, 600], [63, 650], [62, 700], [60, 752], [60, 800], [58, 860], [58, 905], [60, 932]];

function backBody(cx, top, sc, o = {}) {
  const skin = '#f2c6a6', sd = '#d9a07e', ol = C.outline; let s = '';
  for (const side of [-1, 1]) {
    const ap = pd(mx(side, [[138, 195], [162, 280], [176, 370], [182, 455]]));
    s += path(ap, 'none', ol, 60) + path(ap, 'none', skin, 48) + circle(182 * side, 470, 28, skin, { stroke: ol, sw: 6 });
    const shake = side === 1 ? (o.legShake || 0) : 0;
    s += `<g transform="translate(${f1(shake)},0)">`;
    s += path(pd(mx(side, [[10, 585], [120, 585], [102, 762], [22, 762]])) + 'Z', o.legCol && side === 1 ? o.legCol : skin, ol, 6);
    s += path(`M${22 * side},758 L${100 * side},758 Q${106 * side},830 ${88 * side},905 L${36 * side},905 Q${18 * side},830 ${22 * side},758Z`, o.legCol && side === 1 ? o.legCol : skin, ol, 6);
    s += `<ellipse cx="${62 * side}" cy="930" rx="38" ry="20" fill="${skin}" stroke="${ol}" stroke-width="6"/>`;
    s += path(`M${40 * side},770 Q${60 * side},780 ${84 * side},770`, 'none', sd, 4);
    s += '</g>';
  }
  s += path('M-132,168 Q-156,176 -152,206 L-120,420 Q-112,442 -100,450 L100,450 Q112,442 120,420 L152,206 Q156,176 132,168 Q0,150 -132,168Z', skin, ol, 6);
  s += path('M-92,220 Q-58,262 -82,304 M92,220 Q58,262 82,304', 'none', sd, 5);
  s += path('M-114,430 L114,430 L126,612 L8,612 L0,578 L-8,612 L-126,612 Z', '#4a7fd4', ol, 6);
  s += path('M-100,560 Q-60,590 -10,580 M100,560 Q60,590 10,580', 'none', '#2e5fae', 5);
  s += rrect(-26, 118, 52, 60, 14, skin, { stroke: ol, sw: 6 });
  s += `<ellipse cx="-62" cy="80" rx="14" ry="22" fill="${skin}" stroke="${ol}" stroke-width="5"/><ellipse cx="62" cy="80" rx="14" ry="22" fill="${skin}" stroke="${ol}" stroke-width="5"/>`;
  s += circle(0, 70, 64, C.hair, { stroke: ol, sw: 6 }) + path('M-30,40 Q0,20 30,40', 'none', C.hairL, 6);
  if (o.spine) {
    let sp = '';
    for (let i = 0; i < 9; i++) sp += rrect(-13, 186 + i * 17, 26, 12, 5, C.bone, { stroke: C.boneD, sw: 3 });
    for (let i = 0; i < 5; i++) sp += rrect(-22, 340 + i * 24, 44, 18, 7, C.bone, { stroke: C.boneD, sw: 3 });
    sp += path('M-36,462 L36,462 L4,546 L-4,546 Z', C.bone, C.boneD, 4);
    s += `<g opacity="${o.spine}">${sp}</g>`;
  }
  if (o.inner) s += o.inner;
  return `<g transform="translate(${f1(cx)},${f1(top)}) scale(${sc})">${s}</g>`;
}
function nerveSVG(p, col = C.nerve, w = 16, bp = 1, glow = true) {
  let s = '';
  const roots = ROOTS.map(r => drawPath(pd(r), col, w * .45, p)).join('');
  const main = drawPath(pd(N_MAIN), col, w, p);
  const br = drawPath(pd(N_TIB), col, w * .7, bp) + drawPath(pd(N_FIB), col, w * .55, bp);
  if (glow) s += `<g opacity=".35">` + drawPath(pd(N_MAIN), '#fff6a0', w + 14, p) + drawPath(pd(N_TIB), '#fff6a0', w + 8, bp) + `</g>`;
  s += `<g>${roots}${main}${br}</g>`;
  s += `<g opacity=".9">` + drawPath(pd(N_MAIN), '#ffffff', w * .25, p, 'opacity=".6"') + `</g>`;
  return s;
}
function painAlong(u0, u1, t, w = 34) {
  const pts = polySub(N_FULL, u0, u1);
  return path(pd(pts), 'none', C.red, w + 26, `opacity="${f1(.25 + .1 * Math.sin(t * 8))}"`) + path(pd(pts), 'none', C.red, w, 'opacity=".55"');
}

// ------------------------------------------------------------ personagens extras
function penguin(x, y, t, s = 1) {
  const r = Math.sin(t * 8) * 10;
  let p = `<ellipse cx="0" cy="-90" rx="70" ry="95" fill="${C.ink}"/><ellipse cx="0" cy="-70" rx="48" ry="70" fill="#fff"/>`;
  p += path('M-14,-150 L14,-150 L0,-128Z', C.orange, C.ink, 4);
  p += `<ellipse cx="-24" cy="-162" rx="12" ry="12" fill="#fff"/><ellipse cx="24" cy="-162" rx="12" ry="12" fill="#fff"/><circle cx="-20" cy="-160" r="5" fill="${C.ink}"/><circle cx="28" cy="-160" r="5" fill="${C.ink}"/>`;
  p += path('M-38,-170 L-10,-166 M10,-166 L38,-170', 'none', C.ink, 7); // olhar desconfiado
  p += path('M-66,-110 Q-96,-60 -70,-30', 'none', C.ink, 18) + path('M66,-110 Q96,-60 70,-30', 'none', C.ink, 18);
  p += `<ellipse cx="-26" cy="2" rx="26" ry="10" fill="${C.orange}" stroke="${C.ink}" stroke-width="4"/><ellipse cx="26" cy="2" rx="26" ry="10" fill="${C.orange}" stroke="${C.ink}" stroke-width="4"/>`;
  return `<g transform="translate(${f1(x)},${f1(y)}) scale(${s}) rotate(${f1(r)})">${p}</g>`;
}
function sonho(x, y, s, bite = true) {
  let p = `<ellipse cx="0" cy="10" rx="190" ry="130" fill="#c7782f" stroke="${C.ink}" stroke-width="7"/><ellipse cx="0" cy="0" rx="182" ry="118" fill="#e9a956"/>`;
  p += `<ellipse cx="-30" cy="-50" rx="110" ry="40" fill="#f5c983" opacity=".7"/>`;
  for (let i = 0; i < 26; i++) p += circle(-150 + hash(i) * 300, -90 + hash(i + 7) * 170, 4, '#fff', { extra: 'opacity=".9"' });
  if (bite) {
    p += `<ellipse cx="40" cy="20" rx="110" ry="70" fill="#fff3d6" stroke="${C.ink}" stroke-width="6"/>`;
    p += path('M-20,30 C0,-10 60,-20 100,10 C110,40 60,60 20,58 C-10,56 -30,50 -20,30Z', '#e2303f', '#9c1625', 5);
    p += `<ellipse cx="40" cy="12" rx="22" ry="9" fill="#ff8a96"/>`;
  }
  return `<g transform="translate(${f1(x)},${f1(y)}) scale(${s})">${p}</g>`;
}
function chomper(x, y, r, t, dir = 0, col = '#8be36a') {
  const m = Math.abs(Math.sin(t * 9)) * 40 + 4;
  const a0 = (dir + m / 2) * D, a1 = (dir - m / 2) * D + Math.PI * 2;
  const wob = 1 + Math.sin(t * 5 + x) * .04;
  let s = `<path d="M0,0 L${f1(Math.cos(a0) * r)},${f1(Math.sin(a0) * r)} A${r},${r} 0 1 1 ${f1(Math.cos(a1) * r)},${f1(Math.sin(a1) * r)} Z" fill="${col}" stroke="${C.ink}" stroke-width="6"/>`;
  s += circle(-r * .25, r * .3, r * .16, '#5bbd44', { extra: 'opacity=".7"' }) + circle(-r * .45, -r * .1, r * .1, '#5bbd44', { extra: 'opacity=".7"' });
  const ex = Math.cos((dir - 60) * D) * r * .5, ey = Math.sin((dir - 60) * D) * r * .5 - r * .05;
  s += circle(ex, ey, r * .2, '#fff', { stroke: C.ink, sw: 4 }) + circle(ex + Math.cos(dir * D) * 4, ey, r * .09, C.ink);
  s += path(`M${f1(-r * .3)},${f1(r * .95)} l-6,16 M${f1(r * .2)},${f1(r * .95)} l6,16`, 'none', C.ink, 6);
  return `<g transform="translate(${f1(x)},${f1(y)}) scale(${f1(wob)},${f1(2 - wob)})">${s}</g>`;
}
function person(x, y, s, col) {
  return `<g transform="translate(${f1(x)},${f1(y)}) scale(${s})">${circle(0, -96, 26, col, { stroke: C.ink, sw: 5 })}${path('M-34,-10 Q-34,-60 0,-62 Q34,-60 34,-10 L34,20 L-34,20Z', col, C.ink, 5)}</g>`;
}
function ambulance(x, y, t) {
  let s = rrect(-170, -110, 260, 130, 18, '#fff', { stroke: C.ink, sw: 7 }) + path('M90,-80 L150,-80 L180,-30 L180,20 L90,20Z', '#fff', C.ink, 7);
  s += path('M100,-70 L142,-70 L164,-34 L100,-34Z', '#9ed8ff', C.ink, 4) + rrect(-170, -40, 350, 18, 0, C.red);
  s += rrect(-70, -90, 22, 60, 4, C.red) + rrect(-89, -71, 60, 22, 4, C.red);
  const on = Math.sin(t * 20) > 0;
  s += rrect(-30, -136, 50, 26, 10, on ? C.red : '#ff9aa5', { stroke: C.ink, sw: 5 }) + (on ? circle(-5, -123, 60, C.red, { extra: 'opacity=".25"' }) : '');
  for (const wx of [-100, 110]) s += circle(wx, 24, 34, C.ink) + circle(wx, 24, 14, '#bbb');
  s += path('M-200,-60 l-60,0 M-210,-20 l-80,0 M-200,10 l-50,0', 'none', '#fff', 8, 'opacity=".7"');
  return `<g transform="translate(${f1(x)},${f1(y + Math.sin(t * 30) * 2)})">${s}</g>`;
}
function cart(x, y) {
  return `<g transform="translate(${x},${y})">${path('M-10,-150 L20,-150 L40,-60 L180,-60 L200,-140 L30,-140', 'none', '#888', 10)}${path('M40,-60 L40,-10 L190,-10', 'none', '#888', 10)}${circle(60, 10, 18, C.ink)}${circle(170, 10, 18, C.ink)}${rrect(50, -130, 60, 50, 6, C.coral, { stroke: C.ink, sw: 4 })}${rrect(115, -120, 40, 40, 6, C.yellow, { stroke: C.ink, sw: 4 })}</g>`;
}
function exChair(x, y, s = 1) { // cadeira de lado: assento em (x..x+170, y)
  return `<g transform="translate(${x},${y}) scale(${s})">${rrect(0, -14, 180, 26, 8, '#c48a55', { stroke: C.ink, sw: 6 })}${line(14, 10, 14, 130, '#8a5a3a', 14)}${line(166, 10, 166, 130, '#8a5a3a', 14)}${line(166, -10, 176, -200, '#8a5a3a', 16)}${rrect(150, -210, 40, 120, 10, '#c48a55', { stroke: C.ink, sw: 6 })}</g>`;
}

// ------------------------------------------------------------ helpers de layout
const CX = c => (c.p.pablo === 'right' ? 640 : c.p.pablo === 'left' ? 1270 : 960);
function header(x, y, label, col = C.navy, size = 70, fill = '#fff') {
  return txt(x, y, label, { size, font: 'b', fill, stroke: col, sw: 12, ls: 2 });
}
function stepP(c, k, d = .6) { const s = c.since(k); return s < 0 ? 0 : clamp(s / d); }
function stepOut(c, k, d = .5) { const s = c.since(k); return s < 0 ? 1 : 1 - clamp(s / d); }

// ============================================================ CENAS
const SCENES = {
  _missing: c => bg('#7cc6fe', '#3a6fd8', c.t) + txt(700, 500, c.s.type, { size: 80, fill: '#fff' }),

  coldopen(c) {
    const t = c.t, bi = Math.max(0, c.bi);
    let s = '';
    if (bi === 0) {
      const bt = Math.max(0, c.beatT(0)); const zap = bt > 1.0;
      s += bg('#6a4be0', '#21165c', t);
      const jump = zap ? Math.abs(Math.sin(bt * 12)) * 26 : 0;
      const fig = standing(760, 900, t, { face: { mood: zap ? 'pain' : '' }, jump, arms: zap ? { uaN: -130, faN: -100, uaF: -50, faF: -80 } : null });
      s += floor(905, '#000', .25) + `<g transform="translate(760,940) scale(1.3) translate(-760,-900)">${fig.svg}${zap ? bolt([[fig.hip[0] + 10, fig.hip[1]], fig.kneeN, fig.ankleN], Math.floor(t * 12), C.yellow, 9, 18) : ''}</g>`;
      if (zap) s += comic(1240, 330, back(clamp((bt - 1) / .4)) * .95, 'BZZZT!', t);
      // tomada
      s += g(rrect(-60, -80, 120, 160, 20, '#fff', { stroke: C.ink, sw: 7 }) + rrect(-30, -30, 14, 40, 6, C.ink) + rrect(16, -30, 14, 40, 6, C.ink), `translate(1500,${f1(700 + Math.sin(t * 3) * 6)}) rotate(8)`);
    } else if (bi === 1) {
      const bt = Math.max(0, c.beatT(1));
      s += bg('#9fe3ff', '#3a9be0', t) + `<rect y="820" width="${W}" height="260" fill="#e8f6ff"/>` + floor(830, '#000', .12);
      const x = 300 + bt * 95;
      s += `<g transform="translate(${f1(x)},860) scale(1.35) translate(${f1(-x)},-860)">${standing(x, 860, t, { waddle: true, lean: 6, face: { mood: 'pain' } }).svg}</g>`;
      s += penguin(x + 330, 860, t + .3, 1.15);
      s += pop(card(1080, 140, 620, 130, '#fff') + txt(1390, 225, 'modo pinguim: ATIVADO', { size: 52, fill: C.navy }), 1390, 205, clamp((bt - .8) / .4));
    } else if (bi === 2) {
      const bt = Math.max(0, c.beatT(2));
      s += bg('#ff6b5b', '#9b1d3a', t) + rays(960, 540, t, '#fff', .1);
      const p = clamp(bt / .35), sh = bt < .6 ? Math.sin(bt * 60) * 10 * (1 - bt / .6) : 0;
      s += g(pop(txt(960, 610, 'DOR CIÁTICA', { size: 230, font: 'b', fill: C.yellow, stroke: C.ink, sw: 22, ls: 6 }), 960, 540, p), `translate(${f1(sh)},0) rotate(-4 960 540)`);
      s += pop(zapIcon(330, 420, 1.6), 330, 420, clamp((bt - .3) / .4)) + pop(zapIcon(1600, 680, 1.4), 1600, 680, clamp((bt - .45) / .4));
      s += fade(txt(960, 760, 'nome, sobrenome e endereço!', { size: 56, fill: '#fff', stroke: C.ink, sw: 10 }), clamp((bt - 1.2) / .4));
    } else {
      s += bg('#ffd76a', '#ff8a3d', t) + rays(960, 700, t, '#fff', .16);
      if (c.bi >= 6) s += confetti(c.beatT(6), 3, 30);
      const b4 = c.beatT(4);
      if (b4 >= 0) s += slide(g(rrect(0, 0, 640, 120, 30, C.navy) + rrect(0, 0, 18, 120, 6, C.gold) + txt(50, 62, 'PROFESSOR PABLO', { size: 54, font: 'b', fill: C.gold, anchor: 'start', ls: 2 }) + txt(50, 102, 'Fisioterapeuta', { size: 34, fill: '#fff', anchor: 'start' }), 'translate(90,700)'), -700, 0, clamp(b4 / .5));
      const chips = [['O que é', C.teal, 4, .3], ['Quando é perigoso', C.red, 4, 3.5], ['Erros comuns', C.purple, 4, 6.0], ['Exercícios', C.green, 5, 0]];
      chips.forEach(([lab, col, beat, off], i) => {
        const bt = c.beatT(beat) - off; if (bt < 0 || c.bi > 5) return;
        const x = i % 2 ? 1560 : 1490, y = 200 + i * 120;
        s += pop(g(rrect(-200, -45, 400, 90, 45, col, { stroke: C.ink, sw: 6 }) + txt(0, 16, lab, { size: 42, fill: '#fff' })), x, y, clamp(bt / .35)) ;
      });
      if (c.bi >= 6) { const bt = c.beatT(6); s += pop(g(burst(0, 0, 230, 14, C.yellow, t * .3) + txt(0, -10, 'VERDADE', { size: 84, font: 'b', fill: C.green, stroke: C.ink, sw: 10 }) + txt(0, 80, 'OU MITO?', { size: 84, font: 'b', fill: C.red, stroke: C.ink, sw: 10 })), 1500, 400, clamp(bt / .4)); }
      s += presenterInline(c, 'center', 1110);
    }
    return s;
  },

  title(c) {
    const t = c.t, lt = c.lt;
    let s = bg('#ffcf4a', '#ff7a2e', t) + rays(960, 460, t, '#fff', .18, 20);
    s += pop(txt(960, 470, 'DOR CIÁTICA', { size: 250, font: 'b', fill: '#fff', stroke: C.ink, sw: 24, ls: 8 }), 960, 400, clamp(lt / .5));
    s += pop(zapIcon(250, 360, 1.9 + Math.sin(t * 6) * .08), 250, 360, clamp((lt - .3) / .4)) + pop(zapIcon(1670, 360, 1.9 + Math.cos(t * 6) * .08), 1670, 360, clamp((lt - .4) / .4));
    s += slide(g(rrect(-520, -60, 1040, 110, 55, C.navy) + txt(0, 18, 'o guia completo do Professor Pablo', { size: 54, fill: C.gold })), 0, 200, clamp((lt - .7) / .5)).replace('<g >', `<g transform="translate(960,640)">`);
    s += `<g transform="translate(960,640)"></g>`;
    s += sparkles(960, 470, 760, t, 8);
    return s;
  },

  chapter(c) {
    const t = c.t, lt = c.lt, n = c.p.n, col = CH_COLORS[n % 10];
    let s = bg(col, C.navy, t, { cx: 30, cy: 50 });
    for (let i = 0; i < 12; i++) s += `<rect x="${f1((i * 260 + t * 160) % 3200 - 600)}" y="-200" width="70" height="1500" fill="#fff" opacity=".06" transform="rotate(20 960 540)"/>`;
    const p1 = clamp(lt / .5), p2 = clamp((lt - .25) / .5);
    s += pop(circle(460, 470, 190, C.gold, { stroke: C.ink, sw: 10 }) + circle(460, 470, 160, '#ffd56a') + txt(460, 560, String(n), { size: 270, font: 'b', fill: C.ink }), 460, 470, p1);
    s += slide(txt(720, 380, 'CAPÍTULO ' + n, { size: 64, font: 'b', fill: C.gold, anchor: 'start', ls: 6 }), 300, 0, p2);
    const lines = wrap(c.p.title, 18);
    lines.forEach((l, i) => { s += slide(txt(720, 500 + i * 110, l, { size: 104, fill: '#fff', anchor: 'start', weight: 700, stroke: C.ink, sw: 14 }), 400, 0, clamp((lt - .4 - i * .12) / .5)); });
    s += presenterInline(c, 'right', 1110, { s: .72, x: 1700 });
    return s;
  },

  bigtext(c) {
    const t = c.t, cx = CX(c), L = c.p.lines;
    let s = c.p.warn ? bg('#ffe58a', '#ffb02e', t) : bg('#8f7bff', '#3d2aa8', t);
    if (c.p.warn) s += pop(ICON.warn(1.6), cx, 260, stepP(c, 0, .5));
    L.forEach((l, i) => {
      if (!l) return;
      const p = stepP(c, Math.min(i, (c.s.beats.length - 1)), .5) * (c.s.beats.length === 1 ? clamp((c.lt - .3 - i * .5) / .5) : 1);
      const big = i === 1 && !c.p.warn;
      const y = c.p.warn ? 430 + i * 110 : 300 + i * 190;
      const lines = wrap(l, big ? 14 : 26);
      lines.forEach((ll, k) => {
        s += pop(txt(cx, y + k * 80, ll, { size: big ? 140 : 64, font: big ? 'b' : '', fill: big ? C.yellow : (c.p.warn ? C.ink : '#fff'), stroke: c.p.warn ? null : C.ink, sw: big ? 16 : 10, weight: 700, ls: big ? 4 : 0 }), cx, y, p);
      });
    });
    if (!c.p.warn && c.step >= 1) s += pop(g(path('M0,-40 L-30,40 L30,40Z', C.red, C.ink, 6), `translate(${cx - 520},470)`), cx - 520, 470, 0);
    return s;
  },

  nerve(c) {
    const t = c.t, st = c.step;
    let s = bg('#bfe6ff', '#5aa8ec', t);
    const cx = 560, top = 50, sc = .94;
    const zin = ease(stepP(c, 2, .9)) * (1 - ease(stepP(c, 3, .9)));
    const zs = 1 + 1.25 * zin, fx = cx + 30 * sc, fy = top + 490 * sc;
    const nP = st >= 3 ? clamp(c.since(3) / 2.5) : st >= 1 ? 1 : 0;
    const shown = st >= 1 && st < 3 ? 1 : nP;
    const bP = st >= 4 ? clamp(c.since(4) / 1.5) : st >= 1 && st < 3 ? 1 : 0;
    const zap = st >= 6, flick = zap && Math.sin(t * 40) > 0;
    let inner = nerveSVG(shown, zap ? (flick ? C.red : C.yellow) : C.nerve, 18, bP);
    if (st === 2) ['L4', 'L5', 'S1', 'S2', 'S3'].forEach((l, i) => { inner += fade(txt(-70, 428 + i * 24, l, { size: 20, fill: C.navy, weight: 700 }), clamp((c.since(2) - .6 - i * .15) / .3)); });
    if (st >= 5 && st < 6) for (let k = 0; k < 6; k++) { const u = ((t * .35 + k / 6) % 1); const q = polyAt(N_FULL, k % 2 ? u : 1 - u); inner += circle(q[0], q[1], 9, k % 2 ? C.teal : C.coral, { stroke: '#fff', sw: 3 }); }
    if (zap) inner += bolt(N_FULL.filter((_, i) => i % 2 === 0), Math.floor(t * 14), C.yellow, 6, 14);
    const body = backBody(cx, top, sc, { spine: st >= 2 ? 1 : .0, inner, legShake: zap ? Math.sin(t * 50) * 4 : 0 });
    s += `<g transform="translate(${f1(fx)},${f1(fy)}) scale(${f1(zs)}) translate(${f1(-fx)},${f1(-fy)})">${body}</g>`;
    if (st === 1) {
      const p = stepP(c, 1, .5);
      s += pop(card(840, 170, 380, 300, '#fff') + rrect(900, 250, 200, 70, 35, C.skin, { stroke: C.ink, sw: 6 }) + rrect(1060, 262, 34, 46, 14, '#ffe3d6', { stroke: C.ink, sw: 4 }) + circle(1160, 285, 34, C.nerve, { stroke: C.ink, sw: 6 }) + txt(1030, 410, '≈ grossura de 1 dedo', { size: 34, fill: C.navy }) + txt(1135, 300, '=', { size: 50, fill: C.ink }), 1030, 320, p);
      s += pop(txt(990, 560, 'MAIOR NERVO', { size: 76, font: 'b', fill: C.yellow, stroke: C.ink, sw: 12 }) + txt(990, 630, 'DO CORPO!', { size: 76, font: 'b', fill: C.yellow, stroke: C.ink, sw: 12 }), 990, 590, stepP(c, 1, .5) * clamp((c.since(1) - .8) / .4));
    }
    if (st === 2) s += pop(card(880, 140, 340, 110, C.navy) + txt(1050, 210, 'Raízes nervosas', { size: 40, fill: '#fff' }), 1050, 195, clamp((c.since(2) - .9) / .4));
    if (st === 3) s += fade(g(card(860, 520, 360, 120, '#fff') + txt(1040, 595, 'bumbum → coxa', { size: 44, fill: C.navy })), clamp((c.since(3) - 1) / .4));
    if (st === 4) s += pop(card(840, 650, 400, 170, '#fff') + txt(1040, 720, '2 ramos:', { size: 42, fill: C.navy }) + txt(1040, 780, 'tibial e fibular', { size: 42, fill: C.purple }), 1040, 735, stepP(c, 4, .5));
    if (st === 5) {
      s += pop(card(830, 200, 420, 150, '#fff') + txt(1040, 260, 'cérebro → músculos', { size: 38, fill: C.coral }) + txt(1040, 315, '(comandos)', { size: 32, fill: C.navy }), 1040, 275, stepP(c, 5, .5));
      s += pop(card(830, 400, 420, 150, '#fff') + txt(1040, 460, 'pele → cérebro', { size: 38, fill: C.teal }) + txt(1040, 515, '(sensações)', { size: 32, fill: C.navy }), 1040, 475, clamp((c.since(5) - 1.5) / .5));
      s += pop(g(rrect(-50, -30, 100, 60, 16, '#fff', { stroke: C.ink, sw: 6 }) + rrect(-30, -60, 14, 32, 4, '#999') + rrect(16, -60, 14, 32, 4, '#999') + path('M0,30 C0,90 -60,90 -60,140', 'none', C.ink, 12)), 1040, 680, clamp((c.since(5) - 3) / .5));
    }
    if (zap) s += comic(1020, 360, back(clamp(c.since(6) / .4)) * .95, 'CURTO-CIRCUITO!', t, C.yellow, 60);
    return s;
  },

  disc(c) {
    const t = c.t, st = c.step, cx = 620;
    let s = bg('#ffe9c7', '#ffb36b', t);
    if (st === 0) {
      s += pop(sonho(cx, 450, 1.3 + Math.sin(t * 2) * .02), cx, 450, stepP(c, 0, .5));
      s += pop(header(cx, 790, 'SONHO DE PADARIA', C.coral, 80), cx, 760, clamp((c.since(0) - 1) / .4));
      return s;
    }
    if (st === 1) {
      const sq = Math.sin(t * 3) * 10;
      const v = (y, h) => rrect(430, y, 320, h, 30, C.bone, { stroke: C.ink, sw: 7 }) + path(`M750,${y + 30} L860,${y + 50} L850,${y + h - 20} L750,${y + h - 30}`, C.bone, C.ink, 7);
      const d = (y, h) => rrect(440, y, 300, h, 30, '#7cc6fe', { stroke: C.ink, sw: 6 }) + rrect(470, y + h * .25, 240, h * .5, 20, '#b8e2ff');
      s += pop(v(150 + sq, 150) + d(310 + sq, 70 - sq) + v(390, 150) + d(550, 70 + sq * .3) + v(630, 150), cx, 450, stepP(c, 1, .5));
      s += pop(g(card(-200, -60, 400, 120, C.navy) + txt(0, 18, 'disco = amortecedor', { size: 40, fill: '#fff' }), 'translate(1060,340)'), 1060, 340, clamp((c.since(1) - .8) / .4));
      s += arrow(900, 360, 760, 345, C.navy, 10, clamp((c.since(1) - 1) / .4));
      s += pop(sonho(1080, 640, .45), 1080, 640, stepP(c, 1, .6));
      return s;
    }
    if (st >= 7) {
      const p = stepP(c, 7, .5);
      const mini = (x, big, face) => {
        let m = `<ellipse cx="0" cy="0" rx="170" ry="115" fill="#f4d9a8" stroke="${C.ink}" stroke-width="6"/><ellipse cx="0" cy="-10" rx="60" ry="42" fill="#ff5e7a"/>`;
        m += `<ellipse cx="${big ? 40 : 30}" cy="${big ? 120 : 100}" rx="${big ? 80 : 30}" ry="${big ? 55 : 22}" fill="#ff5e7a" stroke="#b52a45" stroke-width="5"/>`;
        m += circle(110, 175, 34, face === 'pain' ? C.red : C.nerve, { stroke: C.ink, sw: 5 });
        m += face === 'pain' ? path('M96,168 l10,6 l-10,6 M124,168 l-10,6 l10,6 M98,190 q12,-10 24,0', 'none', C.ink, 4) : path('M96,170 l10,0 M114,170 l10,0 M98,186 q12,10 24,0', 'none', C.ink, 4);
        return `<g transform="translate(${x},400)">${m}</g>`;
      };
      s += pop(mini(330, false, 'pain') + txt(330, 680, 'pequena, mas DÓI', { size: 46, fill: C.red, weight: 700 }), 330, 450, p);
      s += pop(mini(900, true, 'ok') + txt(900, 680, 'grande e tranquila', { size: 46, fill: C.teal, weight: 700 }), 900, 450, clamp((c.since(7) - .5) / .5));
      s += pop(g(rrect(-520, -55, 1040, 100, 50, C.navy) + txt(0, 18, 'Não é só o tamanho: é a INFLAMAÇÃO', { size: 44, fill: C.gold })), cx, 820, clamp((c.since(7) - 3) / .5)).replace(/^/, '');
      return s.replace('<g >', `<g transform="translate(${cx},820)">`);
    }
    // vista de cima do disco
    const dx = cx - 40, dy = 380;
    let d = '';
    for (let i = 0; i < 4; i++) d += `<ellipse cx="${dx}" cy="${dy}" rx="${300 - i * 36}" ry="${200 - i * 26}" fill="${i % 2 ? '#f4d9a8' : '#efc98a'}" stroke="#c99a52" stroke-width="4"/>`;
    d = `<ellipse cx="${dx}" cy="${dy}" rx="306" ry="206" fill="none" stroke="${C.ink}" stroke-width="8"/>` + d;
    const crack = clamp(c.since(3) / 1.2);
    if (st >= 3) d += drawPath(`M${dx + 60},${dy + 60} L${dx + 90},${dy + 100} L${dx + 80},${dy + 130} L${dx + 120},${dy + 165} L${dx + 130},${dy + 205}`, C.ink, 7, crack) + drawPath(`M${dx - 40},${dy + 70} L${dx - 20},${dy + 110} L${dx - 40},${dy + 150}`, C.ink, 5, crack);
    const her = st >= 4 ? elastic(clamp(c.since(4) / 1.2)) : 0;
    const wob = Math.sin(t * 4) * 3;
    d += `<ellipse cx="${dx}" cy="${dy - 10}" rx="${120 + wob}" ry="${84 - wob}" fill="#ff5e7a" stroke="#b52a45" stroke-width="5"/><ellipse cx="${dx - 30}" cy="${dy - 40}" rx="40" ry="16" fill="#ffb3c0"/>`;
    if (her > 0) {
      const hx = dx + 70 + 110 * her, hy = dy + 80 + 160 * her;
      d += path(`M${dx + 50},${dy + 50} L${f1(hx)},${f1(hy)}`, 'none', '#b52a45', 56 * Math.min(1, her) + 10) + path(`M${dx + 50},${dy + 50} L${f1(hx)},${f1(hy)}`, 'none', '#ff5e7a', 56 * Math.min(1, her));
      d += `<ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="${f1(62 * her + wob)}" ry="${f1(50 * her - wob)}" fill="#ff5e7a" stroke="#b52a45" stroke-width="5"/>`;
    }
    // canal + raiz nervosa
    const rx = dx + 250, ry = dy + 300;
    const inflamed = st >= 6;
    d += `<ellipse cx="${dx}" cy="${dy + 330}" rx="90" ry="70" fill="#fff4d6" stroke="${C.ink}" stroke-width="6"/>`;
    for (let i = 0; i < 7; i++) d += circle(dx - 40 + (i % 4) * 26, dy + 310 + Math.floor(i / 4) * 34, 11, C.nerve, { stroke: C.ink, sw: 3 });
    const rw = st === 5 ? Math.sin(t * 20) * 4 : 0;
    d += path(`M${dx + 70},${dy + 330} Q${rx},${ry + rw} ${rx + 140},${ry + 80}`, 'none', C.ink, 38) + path(`M${dx + 70},${dy + 330} Q${rx},${ry + rw} ${rx + 140},${ry + 80}`, 'none', inflamed ? (Math.sin(t * 10) > 0 ? C.red : '#ff7a3a') : C.nerve, 28);
    if (inflamed) { d += g(ICON.fire(.55), `translate(${rx + 40},${ry - 40})`) + g(ICON.fire(.4), `translate(${rx + 130},${ry + 10})`) + bolt([[rx - 40, ry + 10], [rx + 120, ry + 70]], Math.floor(t * 12), C.yellow, 5, 10); }
    s += pop(d, dx, dy, stepP(c, 2, .5));
    if (st === 2) {
      s += pop(g(card(-180, -50, 360, 100, '#fff') + txt(0, 14, 'capa firme', { size: 42, fill: '#b06d1e' }), 'translate(1080,180)'), 1080, 180, clamp((c.since(2) - 1.5) / .4)) + arrow(940, 200, 860, 260, C.ink, 9, clamp((c.since(2) - 1.8) / .3));
      s += pop(g(card(-210, -50, 420, 100, '#fff') + txt(0, 14, 'recheio de gel', { size: 42, fill: '#d0304a' }), 'translate(1060,470)'), 1060, 470, clamp((c.since(2) - 3.5) / .4)) + arrow(860, 460, 690, 400, C.ink, 9, clamp((c.since(2) - 3.8) / .3));
      s += pop(sonho(170, 160, .38), 170, 160, clamp((c.since(2) - .3) / .4));
    }
    if (st === 4) s += comic(1030, 650, back(clamp((c.since(4) - .6) / .4)) * .8, 'HÉRNIA!', t, C.yellow, 80);
    if (st === 6) s += pop(g(card(-200, -50, 400, 100, C.red) + txt(0, 16, 'INFLAMAÇÃO', { size: 48, font: 'b', fill: '#fff', ls: 3 }), 'translate(1060,170)'), 1060, 170, clamp((c.since(6) - 1.5) / .4));
    return s;
  },

  stenosis(c) {
    const t = c.t, st = c.step, cx = 1270;
    let s = bg('#d6f5e9', '#5cc6a4', t);
    if (st <= 1) {
      const n = st >= 1 ? ease(clamp(c.since(1) / 3)) : 0;
      let d = rrect(cx - 280, 140, 560, 220, 80, C.bone, { stroke: C.ink, sw: 8 });
      d += path(`M${cx - 260},360 C${cx - 300},560 ${cx - 140},720 ${cx},720 C${cx + 140},720 ${cx + 300},560 ${cx + 260},360Z`, C.bone, C.ink, 8);
      d += path(`M${cx - 30},720 L${cx - 20},820 L${cx + 20},820 L${cx + 30},720`, C.bone, C.ink, 8);
      const r = 150 - 60 * n;
      d += `<ellipse cx="${cx}" cy="510" rx="${f1(r * 1.15)}" ry="${f1(r)}" fill="#fff4d6" stroke="${C.ink}" stroke-width="6"/>`;
      if (n > 0) {
        d += path(`M${cx - 120},${f1(640 - 70 * n)} Q${cx},${f1(600 - 120 * n)} ${cx + 120},${f1(640 - 70 * n)} L${cx + 140},680 L${cx - 140},680Z`, '#ffd25a', C.ink, 5, `opacity="${f1(n)}"`);
        for (const sx of [-1, 1]) d += path(`M${cx + sx * (r * 1.15 + 50)},${470} L${f1(cx + sx * (r * 1.15 - 30 * n))},${490} L${cx + sx * (r * 1.15 + 50)},${530}Z`, C.boneD, C.ink, 5);
      }
      for (let i = 0; i < 9; i++) {
        const a = i / 9 * Math.PI * 2, rr = i === 0 ? 0 : r * .5;
        d += circle(cx + Math.cos(a) * rr * 1.1, 510 + Math.sin(a) * rr * .9, 18 - 3 * n, C.nerve, { stroke: C.ink, sw: 4 });
      }
      if (n > .6) d += path(`M${cx + 60},400 q8,14 0,22 q-8,-8 0,-22Z`, '#7cc6fe', C.ink, 3) + path(`M${cx - 70},420 q8,14 0,22 q-8,-8 0,-22Z`, '#7cc6fe', C.ink, 3);
      s += pop(d, cx, 480, stepP(c, 0, .5));
      s += pop(g(card(-200, -45, 400, 90, '#fff') + txt(0, 14, 'corredor dos nervos', { size: 36, fill: C.navy })), cx + 380, 250, clamp((c.since(0) - 1) / .4)).replace('<g >', `<g transform="translate(${cx + 380},250)">`);
      if (st >= 1) [['artrose', 220], ['ligamento grosso', 380], ['bicos de papagaio', 540]].forEach(([l, y], i) => {
        s += pop(g(rrect(-170, -36, 340, 72, 36, C.navy) + txt(0, 14, l, { size: 34, fill: C.gold })), cx + 410, y + 200, clamp((c.since(1) - 1.5 - i * 1.5) / .4)).replace('<g >', `<g transform="translate(${cx + 410},${y + 200})">`);
      });
      return s;
    }
    s += `<rect y="830" width="${W}" height="250" fill="#a8e6cf"/>` + floor(840);
    if (st === 2) {
      const x = 900 + ((c.since(2) * 60) % 500);
      const f = standing(x, 860, t, { walk: true, speed: 3, face: { mood: 'pain' } });
      s += `<g transform="translate(${x},900) scale(1.2) translate(${-x},-860)">${f.svg}${path(pd([f.hip, f.kneeN, f.ankleN]), 'none', C.red, 70, 'opacity=".35"')}</g>`;
      s += pop(g(card(-190, -50, 380, 100, C.red) + txt(0, 16, 'perna PESADA', { size: 46, font: 'b', fill: '#fff', ls: 2 })), 1640, 620, clamp((c.since(2) - .5) / .4)).replace('<g >', `<g transform="translate(1640,620)">`);
      s += pop(g(ICON.clock(1, t), 'translate(1700,260)'), 1700, 260, clamp((c.since(2) - 1.5) / .4));
    } else {
      const x = 850 + ((c.since(3) * 70) % 400);
      const f = standing(x, 860, t, { walk: true, speed: 5, lean: 28, face: { mood: 'happy' }, arms: { uaN: 10, faN: 10, uaF: 20, faF: 10 } });
      s += `<g transform="translate(${x},900) scale(1.25) translate(${-x},-860)">${f.svg}${cart(x + 70, 840)}</g>`;
      s += sparkles(x + 200, 560, 120, t, 5);
      s += pop(g(card(-330, -55, 660, 110, C.navy) + txt(0, 18, 'SINAL DO CARRINHO', { size: 56, font: 'b', fill: C.gold, ls: 3 })), cx, 200, clamp((c.since(3) - 2) / .4)).replace('<g >', `<g transform="translate(${cx},200)">`);
    }
    return s;
  },

  piriformis(c) {
    const t = c.t, st = c.step, cx = 620;
    let s = bg('#ffd9e4', '#ff8fb1', t);
    if (st <= 2) {
      let d = '';
      d += path(`M${cx - 330},220 C${cx - 380},360 ${cx - 300},470 ${cx - 140},470 L${cx - 80},380 C${cx - 160},350 ${cx - 230},300 ${cx - 260},200Z`, C.bone, C.ink, 7);
      d += path(`M${cx + 330},220 C${cx + 380},360 ${cx + 300},470 ${cx + 140},470 L${cx + 80},380 C${cx + 160},350 ${cx + 230},300 ${cx + 260},200Z`, C.bone, C.ink, 7);
      d += path(`M${cx - 90},300 L${cx + 90},300 L${cx + 50},520 L${cx},560 L${cx - 50},520Z`, C.bone, C.ink, 7);
      for (const sx of [-1, 1]) d += circle(cx + sx * 300, 520, 50, C.bone, { stroke: C.ink, sw: 7 }) + path(`M${cx + sx * 300},560 L${cx + sx * 320},900`, 'none', C.ink, 70) + path(`M${cx + sx * 300},560 L${cx + sx * 320},900`, 'none', C.bone, 56);
      const sq = st === 2 ? 1 + .15 * Math.abs(Math.sin(t * 5)) : 1;
      const nx = st === 2 ? Math.sin(t * 25) * 3 : 0;
      d += path(`M${cx + 70},470 C${cx + 140},520 ${cx + 180},560 ${cx + 200 + nx},640 L${cx + 230},900`, 'none', C.ink, 44) + path(`M${cx + 70},470 C${cx + 140},520 ${cx + 180},560 ${cx + 200 + nx},640 L${cx + 230},900`, 'none', st === 2 && Math.sin(t * 10) > 0 ? '#ffb14a' : C.nerve, 32);
      const mus = `M${cx + 50},400 C${cx + 150},${f1(390 - 30 * sq)} ${cx + 230},${f1(420 - 20 * sq)} ${cx + 270},490 C${cx + 220},${f1(500 + 30 * sq)} ${cx + 140},${f1(500 + 25 * sq)} ${cx + 60},460Z`;
      d += path(mus, '#c8434f', C.ink, 7);
      for (let i = 0; i < 6; i++) d += path(`M${cx + 70 + i * 34},${430 + i * 4} l50,${14 + i * 2}`, 'none', '#e57a83', 5);
      if (st === 2) {
        d += path(`M${cx + 120},480 Q${cx + 110},590 ${cx + 190},610 M${cx + 230},500 Q${cx + 290},590 ${cx + 220},620`, 'none', '#c8434f', 30) + circle(cx + 195, 612, 18, '#c8434f', { stroke: C.ink, sw: 4 }) + circle(cx + 222, 620, 18, '#c8434f', { stroke: C.ink, sw: 4 });
        d += path(`M${cx + 130},440 l16,8 M${cx + 196},440 l-16,8`, 'none', C.ink, 6) + path(`M${cx + 140},468 q22,-10 44,0`, 'none', C.ink, 5);
        d += path(`M${cx + 230},700 q8,14 0,22 q-8,-8 0,-22Z`, '#7cc6fe', C.ink, 3);
      }
      s += pop(d, cx, 500, stepP(c, 0, .5));
      if (st < 2) s += pop(g(card(-160, -45, 320, 90, '#fff') + txt(0, 14, 'piriforme', { size: 44, fill: '#c8434f', weight: 700 })), cx + 420, 330, clamp((c.since(0) - 1.2) / .4)).replace('<g >', `<g transform="translate(${cx + 420},330)">`);
      if (st === 1) {
        let ins = circle(0, 0, 150, '#fff', { stroke: C.ink, sw: 7 }) + path('M-110,-40 C-40,-70 40,-70 110,-20 C40,40 -40,40 -110,20Z', '#c8434f', C.ink, 6) + path('M-40,-110 C-10,-30 10,30 40,110', 'none', C.ink, 30) + path('M-40,-110 C-10,-30 10,30 40,110', 'none', C.nerve, 20) + path('M-100,-10 C-40,-30 40,-30 100,0', 'none', '#c8434f', 18);
        s += pop(ins + txt(0, 200, 'às vezes, por dentro!', { size: 36, fill: C.navy }), 1060, 640, clamp((c.since(1) - .8) / .5)).replace(/^<g transform="translate\(1060,640\)/, '<g transform="translate(1060,640)');
        s = s.replace(ins, `<g transform="translate(1060,640)">${ins}</g>`).replace(txt(0, 200, 'às vezes, por dentro!', { size: 36, fill: C.navy }), txt(1060, 840, 'às vezes, por dentro!', { size: 36, fill: C.navy }));
      }
      if (st === 2) s += comic(1060, 220, back(clamp((c.since(2) - .8) / .4)) * .75, 'ABRAÇO DE URSO!', t, C.yellow, 64);
      return s;
    }
    s += `<rect y="830" width="${W}" height="250" fill="#ffc2d4"/>` + floor(840);
    const hip = [560, 600];
    const f = figure({ hip, simple: true, colors: PATIENT, face: { mood: 'pain' }, t, a: { torso: -92, thN: 0, shN: 90, thF: 5, shF: 92, uaN: 70, faN: 0, uaF: 80, faF: 10 } });
    s += exChair(470, 622, 1.2).replace('scale(1.2)', 'scale(-1.2,1.2) translate(-260,0)') + f.svg;
    s += g(ICON.clock(1.5, t * 6), 'translate(960,300)');
    s += pop(g(card(-260, -55, 520, 110, '#fff') + txt(0, 16, 'Menos comum do que parece', { size: 38, fill: C.navy })), cx + 280, 760, clamp((c.since(3) - .3) / .4)).replace('<g >', `<g transform="translate(${cx + 280},760)">`);
    return s;
  },

  board(c) {
    const t = c.t;
    let s = bg('#ffe7b8', '#f2a65a', t);
    s += rrect(70, 120, 1140, 760, 30, '#a86b3c', { stroke: C.ink, sw: 8 }) + rrect(100, 150, 1080, 700, 16, '#2f5d50');
    s += `<rect x="100" y="150" width="1080" height="700" fill="url(#dots)" opacity=".04"/>`;
    s += txt(640, 250, c.p.title, { size: 76, fill: '#fff', weight: 700 }) + line(330, 280, 950, 280, '#fff', 5, 'opacity=".6"');
    let k = 0;
    const n = c.s.beats.filter(b => b.item).length;
    const gapY = n > 3 ? 108 : 150;
    c.s.beats.forEach((b, i) => {
      if (!b.item) return;
      const bt = c.beatT(i); const y = 370 + k * gapY; k++;
      if (bt < 0) return;
      const p = clamp(bt / .9), id = uid('cl');
      s += `<defs><clipPath id="${id}"><rect x="140" y="${y - 60}" width="${f1(1000 * easeOut(p))}" height="90"/></clipPath></defs>`;
      s += pop(star(175, y - 15, 26, C.yellow, t), 175, y - 15, clamp(bt / .3));
      s += `<g clip-path="url(#${id})">${txt(220, y, b.item, { size: b.item.length > 32 ? 40 : n > 3 ? 46 : 52, fill: i === c.bi ? C.yellow : '#fff', anchor: 'start', weight: 600 })}</g>`;
    });
    return s;
  },

  symptoms(c) {
    const t = c.t, st = c.step, cx = 1270;
    let s = bg('#fff1c9', '#ffc35a', t);
    const cards = [['CHOQUE', C.yellow, () => zapIcon(0, 0, 1)], ['QUEIMAÇÃO', C.orange, () => ICON.fire(1)], ['FORMIGAMENTO', '#9b6a4a', () => ICON.ant(1)], ['DORMÊNCIA', C.sky, () => ICON.zzz(1)]];
    if (st === 0) {
      s += pop(header(cx, 400, 'A PERSONALIDADE', C.coral, 96) + header(cx, 510, 'DA DOR CIÁTICA', C.coral, 96), cx, 450, stepP(c, 0, .5));
      for (let i = 0; i < 3; i++) s += txt(cx - 300 + i * 300, 700 + Math.sin(t * 3 + i) * 20, '?', { size: 120, font: 'b', fill: C.purple, stroke: C.ink, sw: 8 });
      return s;
    }
    if (st <= 4) {
      cards.forEach(([lab, col, ic], i) => {
        const k = i + 1; if (st < k) return;
        const x = 760 + (i % 2) * 540, y = 170 + Math.floor(i / 2) * 340;
        const act = st === k;
        const sc = act ? 1.06 + Math.sin(t * 6) * .02 : 1;
        const icon = `<g transform="translate(${x + 120},${y + 140}) rotate(${act ? f1(Math.sin(t * 12) * 8) : 0})">${ic()}</g>`;
        const body = card(x, y, 480, 290, act ? '#fff' : '#fff7e6', { stroke: act ? col : C.ink, sw: act ? 12 : 7 }) + circle(x + 120, y + 140, 90, col, { extra: 'opacity=".25"' }) + icon + txt(x + 340, y + 160, lab, { size: lab.length > 10 ? 38 : 50, font: 'b', fill: C.ink, ls: 1 });
        s += pop(`<g transform="translate(${x + 240},${y + 145}) scale(${f1(sc)}) translate(${-x - 240},${-y - 145})">${body}</g>`, x + 240, y + 145, stepP(c, k, .45));
      });
      if (st === 1) s += bolt([[700, 120], [1100, 900], [1860, 300]], Math.floor(t * 12), C.yellow, 6, 30).replace(/<path/g, '<path opacity=".0"');
      return s;
    }
    const x = 1230;
    const f = standing(x, 860, t, { face: { mood: 'pain' } });
    s += floor(905);
    const flow = (t * .6) % 1;
    s += `<g transform="translate(${x},905) scale(1.35) translate(${-x},-860)">${f.svg}${drawPath(pd([[f.hip[0] - 20, f.hip[1]], [f.kneeN[0] - 22, f.kneeN[1]], [f.ankleN[0] - 18, f.ankleN[1]]]), C.red, 14, 1, `stroke-dasharray="0.05 0.04" stroke-dashoffset="${f1(-flow * .09 * 10) / 10}" opacity=".9"`)}</g>`;
    s += pop(g(card(-230, -55, 460, 110, C.red) + txt(0, 18, 'PASSA DO JOELHO!', { size: 50, font: 'b', fill: '#fff', ls: 2 })), 1600, 600, clamp((c.since(5) - 1.5) / .4)).replace('<g >', '<g transform="translate(1600,600)">');
    s += arrow(1420, 600, 1250, 640, C.red, 12, clamp((c.since(5) - 1.8) / .4));
    cards.forEach(([lab, col, ic], i) => { s += g(circle(0, 0, 60, '#fff', { stroke: col, sw: 8 }) + `<g transform="scale(.5)">${ic()}</g>`, `translate(1830,${230 + i * 150})`); });
    return s;
  },

  compare(c) {
    const t = c.t, st = c.step;
    let s = bg('#e3ecff', '#8fa8ff', t);
    const L = 520, R = 1400;
    s += pop(backBody(L, 190, .74, { spine: .0, inner: `<ellipse cx="0" cy="440" rx="${f1(120 + 10 * Math.sin(t * 6))}" ry="60" fill="${C.red}" opacity=".45"/><ellipse cx="50" cy="540" rx="50" ry="40" fill="${C.red}" opacity=".25"/>` }), L, 500, stepP(c, 0, .5));
    s += pop(header(L, 175, 'DOR LOMBAR', C.teal, 72), L, 150, stepP(c, 0, .5));
    if (st >= 1) {
      const sneeze = st === 2 && c.since(2) > .5;
      const inner = `<ellipse cx="30" cy="450" rx="60" ry="40" fill="${C.red}" opacity=".25"/>` + painAlong(.1, .99, t) + (sneeze ? bolt([[56, 560], [62, 700], [60, 900]], Math.floor(t * 14), C.yellow, 6, 14) : '') +
        (st >= 3 ? `<g transform="translate(60,830)">${circle(-14, 0, 12, '#fff', { stroke: C.ink, sw: 3 })}${circle(14, 0, 12, '#fff', { stroke: C.ink, sw: 3 })}${circle(-14, 4, 5, C.ink)}${circle(14, 4, 5, C.ink)}${path('M-12,26 q12,-10 24,0', 'none', C.ink, 4)}</g><g transform="translate(-60,830)">${circle(-14, 0, 12, '#fff', { stroke: C.ink, sw: 3 })}${circle(14, 0, 12, '#fff', { stroke: C.ink, sw: 3 })}${circle(-6 + 8 * Math.sin(t), 0, 5, C.ink)}${circle(22 + 8 * Math.sin(t) - 8, 0, 5, C.ink)}</g>` : '');
      s += pop(backBody(R, 190, .74, { inner, legShake: sneeze ? Math.sin(t * 50) * 5 : 0 }), R, 500, stepP(c, 1, .5));
      s += pop(header(R, 175, 'DOR CIÁTICA', C.coral, 72), R, 150, stepP(c, 1, .5));
      if (st === 1) s += pop(g(card(-200, -45, 400, 90, '#fff') + txt(0, 14, 'mais na PERNA', { size: 42, fill: C.red, weight: 700 })), 1730, 700, clamp((c.since(1) - 2) / .4)).replace('<g >', '<g transform="translate(1730,700)">');
      if (sneeze) s += comic(1640, 230, back(clamp((c.since(2) - .5) / .3)) * .7, 'ATCHIM!', t, '#fff', 90);
      if (st >= 3) s += pop(g(card(-250, -45, 500, 90, C.navy) + txt(0, 14, 'geralmente de UM lado', { size: 40, fill: C.gold })), 960, 870, clamp((c.since(3) - .5) / .4)).replace('<g >', '<g transform="translate(960,870)">');
    }
    s += line(960, 200, 960, 820, C.navy, 6, 'stroke-dasharray="14 18" opacity=".4"');
    return s;
  },

  slr(c) {
    const t = c.t, st = c.step, cx = 1270;
    let s = bg('#e6fbff', '#7fd3e6', t);
    if (st <= 2) {
      s += rrect(720, 640, 1100, 46, 16, '#fff', { stroke: C.ink, sw: 7 }) + line(780, 690, 780, 860, C.ink, 14) + line(1760, 690, 1760, 860, C.ink, 14);
      const hip = [1220, 600];
      let th = 0;
      if (st >= 1) { const bt = c.since(1); th = 78 * (0.5 - 0.5 * Math.cos(bt * 1.1)); }
      const zone = st >= 2 && th > 30 && th < 70;
      const f = figure({ hip, simple: true, colors: PATIENT, face: { mood: zone ? 'pain' : '' }, t, a: { torso: 180, head: 0, thN: -th, shN: -th, ftN: -th - 90, thF: 0, shF: 0, ftF: -90, uaN: 0, faN: 0, uaF: 0, faF: 0 } });
      // transferidor
      const R = 300;
      let pr = path(`M${hip[0] + R},${hip[1]} A${R},${R} 0 0 0 ${hip[0]},${hip[1] - R}`, 'none', C.navy, 6, 'opacity=".5"');
      if (st >= 2) pr += path(`M${f1(hip[0] + Math.cos(-30 * D) * R)},${f1(hip[1] + Math.sin(-30 * D) * R)} A${R},${R} 0 0 0 ${f1(hip[0] + Math.cos(-70 * D) * R)},${f1(hip[1] + Math.sin(-70 * D) * R)}`, 'none', C.orange, 26, 'opacity=".8"') + txt(hip[0] + 300, hip[1] - 260, '30° a 70°', { size: 42, fill: C.orange, weight: 700, stroke: '#fff', sw: 8 });
      pr += txt(hip[0] + 130, hip[1] - 40, Math.round(th) + '°', { size: 48, fill: C.navy, weight: 700 });
      s += pr + f.svg;
      if (zone) s += bolt([f.hip, f.kneeN, f.ankleN], Math.floor(t * 14), C.yellow, 7, 14) + comic(1650, 230, .55, 'BZZ!', t, C.yellow, 90);
      s += pop(g(card(-330, -50, 660, 100, C.navy) + txt(0, 16, 'teste da perna estendida', { size: 44, fill: C.gold })), cx, 160, stepP(c, 0, .5)).replace('<g >', `<g transform="translate(${cx},160)">`);
      return s;
    }
    const pieces = [['sua história', C.coral], ['exame físico', C.teal], ['imagem (se preciso)', C.purple]];
    pieces.forEach(([l, col], i) => {
      const p = easeOut(clamp((c.since(3) - .3 - i * .9) / .7));
      const x = 820 + i * 330, y = 450;
      const dx = (1 - p) * (i - 1) * 300, dy = (1 - p) * -300;
      const pc = rrect(x - 160, y - 160, 320, 320, 20, col, { stroke: C.ink, sw: 7 }) + (i < 2 ? circle(x + 160, y, 46, col, { stroke: C.ink, sw: 7 }) + rrect(x + 100, y - 40, 60, 80, 0, col) : '') + txt(x, y + 14, l, { size: l.length > 14 ? 30 : 40, fill: '#fff', weight: 700 });
      if (p > 0) s += `<g transform="translate(${f1(dx)},${f1(dy)})" opacity="${f1(p)}">${pc}</g>`;
    });
    s += pop(header(cx + 40, 200, 'QUEBRA-CABEÇA', C.navy, 80), cx, 180, stepP(c, 3, .5));
    s += pop(g(card(-280, -50, 560, 100, '#fff') + txt(0, 16, '= diagnóstico certo', { size: 46, fill: C.green, weight: 700 })), cx + 40, 760, clamp((c.since(3) - 4) / .4)).replace('<g >', `<g transform="translate(${cx + 40},760)">`);
    return s;
  },

  alert(c) {
    const t = c.t, st = c.step, cx = 620;
    let s = bg('#5a0f1e', '#1a0309', t, { dotOp: .05 });
    for (let i = 0; i < 2; i++) s += `<path d="M0,0 L1600,-260 L1600,260Z" fill="${C.red}" opacity=".16" transform="translate(${cx},120) rotate(${f1(t * 140 + i * 180)})"/>`;
    s += path(`M${cx - 70},150 Q${cx - 70},70 ${cx},70 Q${cx + 70},70 ${cx + 70},150Z`, Math.sin(t * 12) > 0 ? '#ff4757' : '#c0283a', C.ink, 7) + rrect(cx - 100, 146, 200, 30, 10, '#555', { stroke: C.ink, sw: 6 });
    if (st < 5) {
      s += header(cx, 270, 'SINAIS DE ALARME', '#7a0a1a', 84, C.yellow);
      const items = [['Perda de controle do xixi ou cocô', 'toilet'], ['Dormência na "área da sela"', 'saddle'], ['Perna perdendo força rápido', 'foot'], ['Febre, perda de peso, câncer', 'thermo']];
      items.forEach(([l, ic], i) => {
        const p = stepP(c, i + 1, .45); if (p <= 0) return;
        const y = 380 + i * 128;
        s += slide(g(rrect(110, y - 52, 1060, 108, 54, i + 1 === st ? '#fff' : '#ffe0e4', { stroke: C.red, sw: 6 }) + circle(170, y + 2, 46, '#fff', { stroke: C.red, sw: 5 }) + `<g transform="translate(170,${y + 4})">${ICON[ic](.6)}</g>` + txt(240, y + 16, l, { size: 42, fill: C.ink, anchor: 'start', weight: 600 })), -300, 0, p);
      });
    } else {
      const bt = c.since(5);
      const fl = Math.sin(t * 10) > 0;
      s += pop(txt(cx, 400, 'EMERGÊNCIA!', { size: 180, font: 'b', fill: fl ? C.yellow : '#fff', stroke: C.red, sw: 18, ls: 6 }), cx, 340, clamp(bt / .4));
      s += fade(txt(cx, 500, 'síndrome da cauda equina: rara, mas séria', { size: 44, fill: '#fff' }), clamp((c.beatT(7) || -1) / .5));
      s += ambulance(-300 + ((bt * 520) % 1900), 760, t);
      s += `<rect y="800" width="${W}" height="20" fill="#333"/>`;
    }
    return s;
  },

  chomp(c) {
    const t = c.t, st = c.step, cx = 620;
    let s = bg('#e8ffd8', '#7fdc6a', t);
    if (st === 0) {
      s += rays(cx, 420, t, '#fff', .25);
      s += pop(circle(cx, 420, 170, C.yellow, { stroke: C.ink, sw: 9 }) + path(`M${cx - 70},430 q70,80 140,0`, '#5a1d24', C.ink, 7) + circle(cx - 55, 370, 16, C.ink) + circle(cx + 55, 370, 16, C.ink), cx, 420, stepP(c, 0, .6));
      s += pop(header(cx, 740, 'NOTÍCIA BOA!', C.green, 120), cx, 700, clamp((c.since(0) - .5) / .4)) + confetti(c.since(0), 5, 30, [0, 0, 1250, 1080]);
      return s;
    }
    if (st === 1) {
      const p = clamp(c.since(1) / 3);
      const x0 = 200, x1 = 1150, y0 = 760, y1 = 230;
      let ch = card(130, 160, 1080, 700, '#fff');
      ch += `<rect x="${f1(x0 + (x1 - x0) * .5)}" y="${y1}" width="${f1((x1 - x0) * .5)}" height="${y0 - y1}" fill="${C.green}" opacity=".18"/>`;
      ch += line(x0, y0, x1, y0, C.ink, 6) + line(x0, y0, x0, y1, C.ink, 6);
      for (let w = 0; w <= 12; w += 2) ch += txt(x0 + (x1 - x0) * w / 12, y0 + 50, String(w), { size: 32, fill: C.navy });
      ch += txt((x0 + x1) / 2, y0 + 92, 'semanas', { size: 30, fill: C.navy });
      ch += txt(x0 - 10, y1 - 20, 'dor', { size: 34, fill: C.red, weight: 700, anchor: 'start' });
      const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([x0 + (x1 - x0) * u, y0 - (y0 - y1 - 40) * Math.exp(-u * 3.2) - 20]); }
      ch += drawPath(pd(pts), C.red, 12, p);
      ch += fade(txt(x0 + (x1 - x0) * .75, y1 + 70, '6 a 12 semanas', { size: 44, fill: C.green, weight: 700 }), clamp((c.since(1) - 2.5) / .5));
      ch += fade(txt(x0 + (x1 - x0) * .75, y1 + 125, 'a maioria melhora!', { size: 38, fill: C.navy }), clamp((c.since(1) - 3.2) / .5));
      return s + pop(ch, cx, 500, stepP(c, 1, .5));
    }
    // disco + hérnia + comilões
    let d = `<path d="M-100,1000 L-100,250 Q300,190 420,360 Q480,460 420,600 Q300,820 -100,850Z" fill="#f4d9a8" stroke="${C.ink}" stroke-width="8"/>`;
    const eat = st >= 3 ? clamp(c.since(3) / 5.5) : 0;
    const hr = st >= 4 ? 0 : 120 * (1 - .9 * eat);
    if (hr > 2) d += `<ellipse cx="${560}" cy="520" rx="${f1(hr * 1.3)}" ry="${f1(hr)}" fill="#ff5e7a" stroke="#b52a45" stroke-width="6"/>`;
    if (st === 2) d += pop(g(rrect(-150, -45, 300, 90, 20, C.red, { stroke: C.ink, sw: 6 }) + txt(0, 16, 'INVASOR!', { size: 54, font: 'b', fill: '#fff', ls: 3 })), 560, 300, clamp((c.since(2) - 1) / .3)).replace('<g >', '<g transform="translate(560,300)">') + (Math.sin(t * 8) > 0 ? g(ICON.warn(.6), 'translate(800,380)') : '');
    if (st >= 3) {
      const ch = [[880, 380], [920, 640], [760, 780]];
      ch.forEach(([x, y], i) => {
        const go = st >= 4 ? 1 : easeOut(clamp((c.since(3) - i * .3) / 1.2));
        const tx = st >= 4 ? x - 100 + Math.sin(t * 3 + i) * 30 : lerp(1200, 560 + (x - 560) * .55, go);
        const ty = st >= 4 ? y - 40 + Math.abs(Math.sin(t * 5 + i)) * -30 : lerp(y, 520 + (y - 520) * .55, go);
        const dir = st >= 4 ? 0 : Math.atan2(520 - ty, 560 - tx) / D;
        d += chomper(tx, ty, 70, t + i, dir);
      });
      if (st === 3) d += pop(g(card(-220, -45, 440, 90, '#fff') + txt(0, 14, 'macrófagos', { size: 46, fill: '#3a9a2a', weight: 700 })), 300, 180, clamp((c.since(3) - 1.2) / .4)).replace('<g >', '<g transform="translate(300,180)">');
    }
    if (st >= 4) d += pop(g(card(-380, -70, 760, 140, C.navy) + txt(0, -8, 'Hérnias GRANDES', { size: 48, fill: C.gold, weight: 700 }) + txt(0, 46, 'costumam ser MAIS reabsorvidas', { size: 38, fill: '#fff' })), 640, 200, clamp(c.since(4) / .4)).replace('<g >', '<g transform="translate(640,200)">') + sparkles(560, 520, 160, t, 6);
    return s + d;
  },

  mri(c) {
    const t = c.t, st = c.step, cx = 620;
    let s = bg('#e8e4ff', '#9d8cff', t);
    if (st === 0) {
      const slideIn = easeOut(clamp((c.since(0) - .5) / 2.5));
      s += rrect(200, 620, 860, 40, 14, '#fff', { stroke: C.ink, sw: 6 });
      s += `<circle cx="${cx}" cy="560" r="260" fill="#f2f2f8" stroke="${C.ink}" stroke-width="10"/><circle cx="${cx}" cy="560" r="130" fill="#3a3550" stroke="${C.ink}" stroke-width="8"/>`;
      s += g(standing(0, 0, t, { face: { mood: 'happy' } }).svg, `translate(${f1(lerp(150, 560, slideIn))},630) rotate(-90) scale(.55)`);
      s += pop(g(card(-300, -50, 600, 100, C.navy) + txt(0, 16, 'pessoas SEM dor nenhuma', { size: 42, fill: C.gold })), cx, 190, clamp((c.since(0) - 1) / .4)).replace('<g >', `<g transform="translate(${cx},190)">`);
      return s;
    }
    if (st <= 2) {
      const row = (y, n, label, pct, p, k) => {
        let r = txt(140, y - 110, label, { size: 50, fill: C.navy, anchor: 'start', weight: 700 });
        for (let i = 0; i < 10; i++) r += pop(person(170 + i * 96, y + 20, .9, i < n ? C.orange : '#c9c5e6'), 170 + i * 96, y, clamp((p - i * .06) / .3));
        r += pop(txt(1100, y - 110, pct, { size: 70, font: 'b', fill: C.orange, stroke: C.ink, sw: 8, anchor: 'end' }), 1000, y - 130, clamp((p - .8) / .3));
        return r;
      };
      s += row(420, 3, '20 anos', '≈ 30%', clamp(c.since(1) / 1.5), 1);
      if (st >= 2) s += row(760, 8, '80 anos', '84%', clamp(c.since(2) / 1.5), 2);
      s += txt(140, 900, 'Fonte: Brinjikji et al., AJNR, 2015', { size: 24, fill: C.navy, anchor: 'start', extra: 'opacity=".7"' });
      return s;
    }
    const p = stepP(c, 3, .5);
    let photo = `<g transform="rotate(-6 330 450)">` + rrect(160, 220, 340, 400, 10, '#fff', { stroke: C.ink, sw: 7 }) + rrect(190, 250, 280, 280, 4, '#2a2a3a');
    for (let i = 0; i < 5; i++) photo += rrect(300, 270 + i * 50, 60, 36, 8, '#dcd6c0');
    photo += txt(330, 590, 'FOTO', { size: 50, font: 'b', fill: C.ink, ls: 3 }) + '</g>';
    s += pop(photo, 330, 420, p);
    let film = ''; const off = (t * 120) % 140;
    for (let i = -1; i < 5; i++) film += rrect(700, 200 + i * 140 + off, 300, 120, 6, ['#ffd84a', '#7cc6fe', '#ff8fb1', '#8be36a'][(i + 8) % 4]);
    const fid = uid('fm');
    s += pop(`<defs><clipPath id="${fid}"><rect x="660" y="200" width="380" height="440"/></clipPath></defs><g clip-path="url(#${fid})">${rrect(660, 120, 380, 600, 0, C.ink)}${film}${Array.from({ length: 12 }, (_, i) => rrect(672, 120 + i * 50 + off % 50, 18, 26, 4, '#fff') + rrect(1010, 120 + i * 50 + off % 50, 18, 26, 4, '#fff')).join('')}</g>` + txt(850, 700, 'VOCÊ = FILME', { size: 56, font: 'b', fill: C.purple, stroke: '#fff', sw: 8, ls: 2 }), 850, 420, clamp((c.since(3) - 2.5) / .4));
    return s;
  },

  myth(c) {
    const t = c.t, cx = 1270, b = c.b;
    let s = bg('#fff0c2', '#ffb347', t);
    s += rays(cx, 450, t, '#fff', .15);
    if (b.phase === 'score' && c.bi === c.s.beats.length - 1) {
      s += pop(card(cx - 520, 180, 1040, 560, '#fff') + header(cx, 310, 'QUANTAS VOCÊ', C.purple, 90) + header(cx, 410, 'ACERTOU?', C.purple, 90), cx, 400, clamp(c.beatT(c.bi) / .4));
      for (let i = 0; i < 6; i++) s += pop(`<g transform="translate(${cx - 375 + i * 150},540)">${ICON.check(1)}</g>`, cx - 375 + i * 150, 540, clamp((c.beatT(c.bi) - .5 - i * .15) / .3));
      s += pop(g(ICON.bubble(1.1) + txt(0, 140, 'comenta seu placar!', { size: 42, fill: C.navy, weight: 700 }), `translate(${cx},700)`), cx, 700, clamp((c.beatT(c.bi) - 1.8) / .4)).replace('<g >', '');
      return s;
    }
    const q = b.q || 0, ans = c.p.answers[q];
    const ask = b.phase === 'ask';
    const bt = c.beatT(c.bi);
    s += card(cx - 540, 150, 1080, 470, '#fff', { stroke: C.ink, sw: 9 });
    s += rrect(cx - 140, 120, 280, 70, 35, C.purple, { stroke: C.ink, sw: 6 }) + txt(cx, 168, `${q + 1} / 6`, { size: 44, fill: '#fff', weight: 700 });
    s += fade(para(cx, 390, '"' + c.p.items[q] + '"', 26, { size: 64, fill: C.ink, weight: 700, lh: 1.15 }), ask ? clamp(bt / .3) : .3);
    const btn = (x, lab, col, on, dim) => `<g transform="translate(${x},760) scale(${on ? 1.15 + Math.sin(t * 8) * .03 : 1})" opacity="${dim ? .35 : 1}">${rrect(-210, -60, 420, 120, 60, col, { stroke: C.ink, sw: 8 })}${txt(0, 22, lab, { size: 64, font: 'b', fill: '#fff', ls: 3 })}</g>`;
    const wig = ask ? Math.sin(t * 6) * 4 : 0;
    s += `<g transform="rotate(${f1(wig)} ${cx - 250} 760)">` + btn(cx - 250, 'VERDADE', C.green, !ask && ans, !ask && !ans) + '</g>';
    s += `<g transform="rotate(${f1(-wig)} ${cx + 250} 760)">` + btn(cx + 250, 'MITO', C.red, !ask && !ans, !ask && ans) + '</g>';
    if (ask && t > b.end) {
      const nb = c.s.beats[c.bi + 1]; const left = nb ? nb.start - t : 0;
      const n = Math.max(1, Math.ceil(left / .5));
      s += pop(circle(cx, 620, 70, C.navy, { stroke: '#fff', sw: 8 }) + txt(cx, 655, String(n), { size: 100, font: 'b', fill: C.gold }), cx, 620, 1);
    }
    if (!ask) {
      const p = clamp(bt / .35);
      const lab = ans ? 'VERDADE!' : 'MITO!', col = ans ? C.green : C.red;
      s += pop(`<g transform="rotate(-12 ${cx} 380)">${rrect(cx - 330, 300, 660, 170, 30, 'none', { stroke: col, sw: 18 })}${txt(cx, 430, lab, { size: 150, font: 'b', fill: col, ls: 8 })}</g>`, cx, 380, p);
      s = s.replace(`fill="${col}" stroke="${col}"`, '');
    }
    return s;
  },

  errors(c) {
    const t = c.t, st = c.step, cx = 620;
    let s = bg('#ffd6d1', '#ff7b6b', t);
    s += header(cx, 150, '5 ERROS QUE PIORAM A CIÁTICA', C.red, 62);
    if (st === 0) {
      s += pop(g(ICON.warn(2.4), `translate(${cx},430)`), cx, 430, stepP(c, 0, .5));
      s += pop(g(card(-400, -55, 800, 110, '#fff') + txt(0, 16, 'sem culpa: só ajusta a partir de hoje!', { size: 40, fill: C.navy })), cx, 720, clamp((c.since(0) - 1) / .4)).replace('<g >', `<g transform="translate(${cx},720)">`);
      return s;
    }
    const icons = [t2 => ICON.hourglass(1.2, t2), t2 => ICON.band(1.2, t2), t2 => ICON.chair(1.2) + `<g transform="translate(60,-60)">${ICON.clock(.6, t2 * 4)}</g>`, () => ICON.glass(1.1), () => ICON.pill(1.2)];
    const k = st, it = c.p.items[k - 1];
    const p = stepP(c, k, .45);
    let cd = card(100, 230, 1060, 440, '#fff', { stroke: C.red, sw: 10 });
    cd += circle(220, 350, 70, C.red, { stroke: C.ink, sw: 7 }) + txt(220, 382, String(k), { size: 96, font: 'b', fill: '#fff' });
    cd += para(560, 470, it, 18, { size: 66, fill: C.ink, weight: 700 });
    cd += `<g transform="translate(1000,${f1(450 + Math.sin(t * 3) * 8)})">${icons[k - 1](t)}</g>`;
    s += pop(cd, cx, 450, p);
    s += pop(`<g transform="translate(1060,280) rotate(-12)">${rrect(-110, -45, 220, 90, 18, 'none', { stroke: C.red, sw: 10 })}${txt(0, 22, 'ERRO', { size: 66, font: 'b', fill: C.red, ls: 4 })}</g>`, 1060, 280, clamp((c.since(k) - .8) / .3));
    for (let i = 0; i < 5; i++) {
      const done = i + 1 < k, cur = i + 1 === k;
      s += g(circle(0, 0, 40, cur ? C.red : done ? C.navy : '#fff', { stroke: C.ink, sw: 5 }) + txt(0, 15, String(i + 1), { size: 42, fill: cur || done ? '#fff' : C.ink, weight: 700 }) + (done ? path('M-26,-26 L26,26 M26,-26 L-26,26', 'none', C.red, 8) : ''), `translate(${cx - 280 + i * 140},780)`);
    }
    return s;
  },

  traffic(c) {
    const t = c.t, st = c.step;
    let s = bg('#e2f0ff', '#7aa7e0', t);
    s += rrect(170, 170, 260, 680, 60, '#2b2d3a', { stroke: C.ink, sw: 9 }) + rrect(285, 850, 30, 120, 6, '#555');
    const L = [[C.red, 300, 3], [C.yellow, 510, 2], [C.green, 720, 1]];
    L.forEach(([col, y, k]) => {
      const on = st === k || (st === 0 && Math.floor(t * 2) % 3 === (3 - k));
      s += circle(300, y, 88, on ? col : '#4a4c5a', { stroke: C.ink, sw: 7 }) + (on ? circle(300, y, 130, col, { extra: 'opacity=".25"' }) + circle(270, y - 30, 22, '#fff', { extra: 'opacity=".5"' }) : '');
    });
    const labels = [[1, '0 a 2', 'SIGA', C.green, 720], [2, '3 a 5', 'CUIDADO', '#e0a800', 510], [3, 'mais de 5', 'PARE', C.red, 300]];
    labels.forEach(([k, r, a, col, y]) => {
      const p = stepP(c, k, .45); if (p <= 0) return;
      s += slide(g(rrect(480, y - 70, 680, 140, 70, '#fff', { stroke: col, sw: 9 }) + txt(540, y + 18, r, { size: 52, fill: C.navy, anchor: 'start', weight: 700 }) + txt(1120, y + 24, a, { size: 72, font: 'b', fill: col, anchor: 'end', ls: 3 })), 200, 0, p);
    });
    if (st === 0) s += pop(header(800, 520, 'SEMÁFORO', C.navy, 110) + header(800, 640, 'DA DOR', C.navy, 110), 800, 560, stepP(c, 0, .5));
    return s;
  },

  central(c) {
    const t = c.t, st = c.step, cx = 1270;
    let s = bg('#e0fff4', '#5fd6b0', t);
    let u = 1;
    if (st === 1) u = 1 - .82 * ((c.since(1) * .3) % 1);
    if (st >= 2) u = .18;
    let inner = painAlong(.02, u, t, 30);
    if (st === 1) for (let k = 0; k < 3; k++) { const q = polyAt(N_FULL, clamp(u - .05 - k * .12)); inner += arrow(q[0] + 70, q[1] + 40, q[0] + 70, q[1] - 30, C.navy, 7); }
    s += backBody(cx, 90, .9, { inner });
    if (st >= 1) s += pop(g(card(-260, -55, 520, 110, C.navy) + txt(0, 16, 'CENTRALIZAÇÃO', { size: 56, font: 'b', fill: C.gold, ls: 3 })), 1640, 200, stepP(c, 1, .4)).replace('<g >', '<g transform="translate(1640,200)">');
    if (st >= 2) s += pop(g(card(-240, -55, 480, 110, C.green) + txt(0, 16, '= BOM SINAL!', { size: 56, font: 'b', fill: '#fff', ls: 3 })), 1640, 360, stepP(c, 2, .4)).replace('<g >', '<g transform="translate(1640,360)">') + sparkles(cx + 60, 560, 160, t, 6);
    return s;
  },

  exercise(c) {
    const t = c.t, lt = c.lt, ex = c.p.ex;
    let s = bg('#fff6e0', '#ffd08a', t, { shapes: ex !== 'walk' });
    const FL = 800;
    let fig, extra = '', props = '', a = {}, hip = [960, 600];
    const talk = { mouth: c.mouth, talking: c.talking, t, headScale: .42 };
    if (ex === 'walk') {
      s = bg('#bfe9ff', '#7cc6fe', t, { shapes: false, dots: false });
      for (let i = 0; i < 5; i++) { const x = ((i * 520 - t * 60) % 2600 + 2600) % 2600 - 300; s += `<ellipse cx="${f1(x)}" cy="${180 + i % 2 * 80}" rx="110" ry="44" fill="#fff" opacity=".9"/>`; }
      s += `<rect y="${FL}" width="${W}" height="${H - FL}" fill="#8fd16a"/><rect y="${FL}" width="${W}" height="20" fill="#6fb04a"/>`;
      for (let i = 0; i < 6; i++) { const x = ((i * 420 - t * 240) % 2520 + 2520) % 2520 - 300; s += rrect(x - 14, FL - 160, 28, 160, 8, '#8a5a3a') + circle(x, FL - 200, 80, '#4cb050', { stroke: C.ink, sw: 6 }); }
      for (let i = 0; i < 10; i++) { const x = ((i * 240 - t * 240) % 2400 + 2400) % 2400 - 200; s += rrect(x, FL + 70, 120, 14, 7, '#fff', { extra: 'opacity=".6"' }); }
      const sw = Math.sin(t * 6);
      a = { torso: -86, head: 0, thN: 90 + sw * 26, shN: 90 + sw * 26 + Math.max(0, -sw) * 34, ftN: 0, thF: 90 - sw * 26, shF: 90 - sw * 26 + Math.max(0, sw) * 34, ftF: 0, uaN: 90 - sw * 30, faN: 60 - sw * 30, uaF: 90 + sw * 30, faF: 60 + sw * 30 };
      hip = [900, FL - 230 - Math.abs(Math.cos(t * 6)) * 8];
    } else s += `<rect y="${FL}" width="${W}" height="${H - FL}" fill="#e7b977"/>` + rrect(420, FL - 26, 1100, 40, 20, C.teal, { stroke: C.ink, sw: 6 });
    const MAT = FL - 26;
    if (ex === 'relief') {
      const br = Math.sin(t * 1.2);
      hip = [1000, MAT - 42];
      a = { torso: 180, head: 0, thN: -90, shN: 0, ftN: -90, thF: -90, shF: 0, ftF: -90, uaN: 0, faN: -70, uaF: 0, faF: -60 };
      props += exChair(1050, MAT - 150, 1);
      talk.breath = 6 + br * 6;
      const inh = br > 0;
      s += pop(g(ICON.bubble(1).replace(/<circle[^>]*\/>/g, '') + txt(0, 6, inh ? 'inspira...' : 'expira...', { size: 40, fill: inh ? C.teal : C.purple, weight: 700 })), 700, 420, 1).replace('<g >', '<g transform="translate(700,420)">');
    } else if (ex === 'slider') {
      const p = 0.5 - 0.5 * Math.cos(t * 2.2);
      props += `<g transform="translate(1774,0) scale(-1,1)">${exChair(770, MAT - 210, 1.3)}</g>`;
      hip = [850, MAT - 236];
      a = { torso: -84, head: lerp(22, -24, p), thN: 0, shN: lerp(95, 6, p), ftN: lerp(0, -80, p), thF: 4, shF: 95, ftF: 0, uaN: 75, faN: 10, uaF: 80, faF: 10 };
      talk.look = [.4, lerp(1, -1, p)];
      const up = p > .5;
      s += g(rrect(-250, -50, 500, 100, 50, up ? C.teal : C.purple, { stroke: C.ink, sw: 6 }) + txt(0, 16, up ? 'estica + olha pra CIMA' : 'dobra + olha pra BAIXO', { size: 38, fill: '#fff', weight: 700 }), 'translate(1380,330)');
      // fio dental
      let fl = rrect(1180, 470, 400, 60, 30, '#fff', { stroke: C.ink, sw: 6 }) + line(1100 + p * 160, 500, 1500 + p * 160, 500, C.nerve, 14) + txt(1380, 600, 'como fio dental: desliza!', { size: 34, fill: C.navy });
      s += fade(fl, clamp((c.beatT(2)) / .5));
    } else if (ex === 'sphinx') {
      const up = ease(clamp((lt - 1.5) / 1.5));
      hip = [1100, MAT - 40];
      a = { torso: lerp(180, 202, up), head: lerp(0, -10, up), thN: 0, shN: 0, ftN: 80, thF: 2, shF: 2, ftF: 80, uaN: lerp(170, 92, up), faN: 180, uaF: lerp(170, 92, up), faF: 182 };
      s += fade(g(card(-300, -60, 600, 120, C.red) + txt(0, -6, 'Dor desceu pra perna?', { size: 36, fill: '#fff' }) + txt(0, 40, 'PULE este!', { size: 44, font: 'b', fill: C.yellow, ls: 2 })), clamp((c.beatT(1) - 2) / .5)).replace('<g >', '<g transform="translate(1450,300)">');
    } else if (ex === 'bridge') {
      const cyc = (lt * .45) % 1; const up = cyc < .15 ? ease(cyc / .15) : cyc < .55 ? 1 : cyc < .75 ? 1 - ease((cyc - .55) / .2) : 0;
      hip = [1000, lerp(MAT - 40, MAT - 120, up)];
      a = { torso: lerp(180, 152, up), head: lerp(0, 18, up), thN: lerp(-55, -18, up), shN: lerp(55, 78, up), ftN: 0, thF: lerp(-52, -16, up), shF: lerp(55, 78, up), ftF: 0, uaN: lerp(0, 20, up), faN: 0, uaF: lerp(0, 22, up), faF: 0 };
      if (up > .8) props += sparkles(1000, hip[1] - 30, 70, t, 4);
      s += g(rrect(-200, -45, 400, 90, 45, C.coral, { stroke: C.ink, sw: 6 }) + txt(0, 16, 'aperta o bumbum!', { size: 38, fill: '#fff', weight: 700 }), 'translate(1450,330)');
    }
    fig = figure(Object.assign({ hip, a }, talk));
    const zs = ex === 'walk' ? 1.25 : ex === 'slider' ? 1.3 : 1.5, zy = ex === 'walk' ? FL : MAT;
    s += `<g transform="translate(960,${zy}) scale(${zs}) translate(-960,${-zy})">${props}${fig.svg}</g>`;
    // títulos
    s += slide(g(rrect(0, 0, 700, 150, 30, C.navy, { stroke: C.ink, sw: 6 }) + circle(80, 75, 52, C.gold, { stroke: C.ink, sw: 5 }) + txt(80, 100, String(c.p.n), { size: 76, font: 'b', fill: C.ink }) + txt(155, 62, 'EXERCÍCIO ' + c.p.n, { size: 34, fill: C.gold, anchor: 'start', weight: 600 }) + txt(155, 118, c.p.name, { size: 50, fill: '#fff', anchor: 'start', weight: 700 }), 'translate(60,110)'), -600, 0, clamp(lt / .5));
    s += slide(g(rrect(-330, -40, 660, 80, 40, '#fff', { stroke: C.ink, sw: 5 }) + txt(0, 14, c.p.dose, { size: 36, fill: C.navy, weight: 600 }), 'translate(1500,170)'), 600, 0, clamp((lt - .4) / .5));
    return s;
  },

  recap(c) {
    const t = c.t, cx = 620;
    let s = bg('#d9f2ff', '#5aa8ec', t);
    s += card(110, 130, 1060, 740, '#fff') + header(cx, 240, 'RESUMÃO', C.purple, 96);
    const items = ['Ciática = sintoma (nervo irritado)', 'Sinal de alarme? EMERGÊNCIA!', 'A maioria melhora em semanas', 'Movimento é remédio!'];
    items.forEach((l, i) => {
      const p = stepP(c, i + 1, .45); if (p <= 0) return;
      const y = 370 + i * 125;
      s += pop(`<g transform="translate(200,${y})">${ICON.check(.9, i === 1 ? C.red : C.green)}</g>`, 200, y, p) + slide(txt(270, y + 16, l, { size: 50, fill: C.ink, anchor: 'start', weight: 600 }), 80, 0, p);
    });
    return s;
  },

  outro(c) {
    const t = c.t, st = c.step;
    let s = bg('#ffd76a', '#ff8a3d', t) + rays(960, 700, t, '#fff', .16);
    const p0 = stepP(c, 0, .4);
    s += pop(g(rrect(-170, -60, 340, 120, 60, '#3b82f6', { stroke: C.ink, sw: 7 }) + `<g transform="translate(-90,8) scale(.55)">${hand(0, 0, 'thumb', 0)}</g>` + txt(30, 20, 'CURTIR', { size: 48, font: 'b', fill: '#fff', ls: 2 })), 330, 300, clamp(c.lt / .4)).replace('<g >', '<g transform="translate(330,300)">');
    s += pop(g(rrect(-230, -60, 460, 120, 24, C.red, { stroke: C.ink, sw: 7 }) + txt(0, 20, 'INSCREVA-SE', { size: 56, font: 'b', fill: '#fff', ls: 2 })), 330, 480, clamp((c.lt - 1.2) / .4)).replace('<g >', '<g transform="translate(330,480)">');
    const ring = Math.sin(t * 18) * 14 * (Math.sin(t * 2) > 0 ? 1 : 0);
    s += pop(`<g transform="translate(330,680) rotate(${f1(ring)})">${path('M-50,30 Q-50,-60 0,-62 Q50,-60 50,30 L64,46 L-64,46Z', C.yellow, C.ink, 7)}${circle(0, 58, 16, C.yellow, { stroke: C.ink, sw: 6 })}</g>`, 330, 680, clamp((c.lt - 2.2) / .4));
    s += pop(g(rrect(-220, -60, 440, 120, 60, C.teal, { stroke: C.ink, sw: 7 }) + txt(0, 20, 'COMPARTILHA', { size: 50, font: 'b', fill: '#fff', ls: 2 })), 1600, 380, clamp((c.lt - 4) / .4)).replace('<g >', '<g transform="translate(1600,380)">');
    if (st >= 1) {
      s += confetti(c.since(1), 9, 50);
      s += pop(g(rrect(-640, -70, 1280, 140, 70, C.navy, { stroke: C.ink, sw: 8 }) + txt(0, 22, 'COLUNA BOA É COLUNA QUE SE MEXE!', { size: 62, font: 'b', fill: C.gold, ls: 3 })), 960, 140, clamp((c.since(1) - 2) / .4)).replace('<g >', '<g transform="translate(960,140)">');
    }
    s += presenterInline(c, 'center', 1110, { s: 1.05 });
    const end = c.s.beats[c.s.beats.length - 1].end;
    if (t > end + .5) {
      const p = clamp((t - end - .5) / .5);
      s += `<rect width="${W}" height="${H}" fill="${C.navy}" opacity="${f1(p * .92)}"/>` + pop(txt(960, 520, 'Até o próximo vídeo!', { size: 110, font: 'b', fill: C.gold, ls: 4 }) + txt(960, 620, 'Professor Pablo • Fisioterapia', { size: 46, fill: '#fff' }), 960, 540, p);
    }
    return s;
  },
};
// apresentador desenhado dentro da cena (para cenas sem params.pablo)
function presenterInline(c, side, y, o = {}) {
  const x = o.x || (side === 'center' ? 960 : side === 'right' ? 1585 : 335);
  const e = easeOut((c.lt - .1) / .5);
  return pablo({ x, y: y + 500 * (1 - e), s: o.s || 1.1, pose: c.pose, prevPose: c.prevPose, poseT: c.poseT, mouth: c.mouth, talking: c.talking, t: c.t, flip: side === 'left' });
}
