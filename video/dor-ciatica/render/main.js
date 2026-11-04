// Motor: localiza a cena no tempo t, monta o contexto, desenha cena +
// apresentador + legendas + barra de progresso + transições.
const TLD = window.TL;
const SCN = TLD.scenes;
const CH_COLORS = [C.purple, C.coral, C.teal, C.purple, C.red, C.green, C.orange, C.coral, C.teal, C.purple];

SCN.forEach((s, i) => {
  s.i = i; s.dur = s.end - s.start;
  s.stepStart = {};
  s.beats.forEach((b, bi) => {
    const k = b.step != null ? b.step : bi;
    if (s.stepStart[k] == null) s.stepStart[k] = b.start;
  });
  s.chapter = 0;
});
{ let ch = 0; SCN.forEach(s => { if (s.type === 'chapter') ch = s.params.n; s.chapter = ch; }); }

// ----- legendas: blocos curtos de palavras por fala
const CAPS = [];
{
  const byBeat = {};
  TLD.words.forEach(w => { (byBeat[w.s + '_' + w.b] = byBeat[w.s + '_' + w.b] || []).push(w); });
  Object.values(byBeat).forEach(ws => {
    let cur = [];
    const flush = () => { if (cur.length) CAPS.push({ t0: cur[0].t0, t1: cur[cur.length - 1].t1, words: cur }); cur = []; };
    ws.forEach((w, i) => {
      const len = cur.map(x => x.w).join(' ').length + w.w.length;
      if (cur.length && (cur.length >= 6 || len > 34 || w.t0 - cur[cur.length - 1].t1 > .3)) flush();
      cur.push(w);
    });
    flush();
  });
  CAPS.sort((a, b) => a.t0 - b.t0);
  CAPS.forEach((c, i) => { c.end = Math.min(c.t1 + .35, CAPS[i + 1] ? CAPS[i + 1].t0 : 1e9); });
}
const measure = document.createElement('canvas').getContext('2d');
function captions(t, type) {
  if (type === 'title') return '';
  const c = CAPS.find(c => t >= c.t0 - .04 && t < c.end);
  if (!c) return '';
  const size = 50;
  measure.font = `600 ${size}px Fredoka`;
  const full = c.words.map(w => w.w).join(' ');
  const wpx = measure.measureText(full).width;
  const y = 1012;
  let spans = '';
  c.words.forEach((w, i) => {
    const on = t >= w.t0 - .03 && t < (c.words[i + 1] ? c.words[i + 1].t0 : c.t1 + .3);
    spans += `<tspan fill="${on ? C.gold : '#fff'}">${esc(w.w)}${i < c.words.length - 1 ? ' ' : ''}</tspan>`;
  });
  const a = clamp((t - c.t0 + .04) / .12);
  return `<g opacity="${a.toFixed(2)}">` + rrect(W / 2 - wpx / 2 - 34, y - 52, wpx + 68, 74, 37, 'rgba(18,14,36,.78)') +
    `<text x="${W / 2}" y="${y}" font-family="Fredoka" font-weight="600" font-size="${size}" text-anchor="middle" xml:space="preserve">${spans}</text></g>`;
}

function progress(t, s) {
  const p = t / TLD.duration;
  let o = `<rect x="0" y="0" width="${W}" height="10" fill="rgba(0,0,0,.25)"/><rect x="0" y="0" width="${f1(W * p)}" height="10" fill="${C.gold}"/>`;
  TLD.chapters.forEach(c => { o += `<rect x="${f1(W * c.t / TLD.duration - 2)}" y="0" width="4" height="10" fill="rgba(255,255,255,.8)"/>`; });
  if (s.chapter && !['chapter', 'title', 'outro'].includes(s.type)) {
    const ch = TLD.chapters.find(c => c.n === s.chapter);
    const label = `${ch.n} • ${ch.title}`;
    measure.font = `600 30px Fredoka`;
    const w = measure.measureText(label).width + 40;
    o += rrect(34, 28, w + 50, 52, 26, 'rgba(18,14,36,.7)') + circle(60, 54, 18, CH_COLORS[ch.n % 10]) + txt(60, 64, String(ch.n), { size: 26, fill: '#fff', weight: 700 }) + txt(90, 64, ch.title, { size: 30, fill: '#fff', anchor: 'start' });
  }
  return o;
}

function wipe(t) {
  let o = '';
  for (let i = 1; i < SCN.length; i++) {
    const tb = SCN[i].start, dt = t - tb;
    if (dt > -.32 && dt < .32) {
      const p = (dt + .32) / .64;
      const x = lerp(-2900, 2300, ease(p));
      const col = SCN[i].type === 'chapter' ? CH_COLORS[SCN[i].params.n % 10] : C.gold;
      o += `<g transform="translate(${f1(x)},0) skewX(-18)"><rect x="0" y="-50" width="2500" height="1200" fill="${C.navy}"/><rect x="220" y="-50" width="2080" height="1200" fill="${col}"/><rect x="440" y="-50" width="1640" height="1200" fill="${C.cream}"/></g>`;
    }
  }
  return o;
}

function ctxFor(s, t) {
  const lt = t - s.start;
  let bi = -1;
  s.beats.forEach((b, i) => { if (t >= b.start - .05) bi = i; });
  const b = s.beats[bi] || s.beats[0];
  const k = bi >= 0 ? (b.step != null ? b.step : bi) : -1;
  const frame = Math.round(t * TLD.fps);
  const talking = bi >= 0 && t >= b.start - .05 && t <= b.end + .08;
  const prevB = s.beats[bi - 1];
  return {
    t, lt, s, p: s.params, bi, b, step: k,
    since: n => (s.stepStart[n] != null && t >= s.stepStart[n] ? t - s.stepStart[n] : -1),
    beatT: i => (s.beats[i] && t >= s.beats[i].start ? t - s.beats[i].start : -1),
    beatP: i => (s.beats[i] ? clamp((t - s.beats[i].start) / Math.max(.1, s.beats[i].end - s.beats[i].start)) : 0),
    mouth: talking ? (TLD.mouth[frame] || 0) : 0, talking,
    pose: (b && b.pose) || 'clasp', prevPose: bi > 0 ? (prevB.pose || 'clasp') : (b && b.pose) || 'clasp',
    poseT: bi >= 0 ? t - b.start : 9,
  };
}
function presenter(c, side, o = {}) {
  const right = side === 'right';
  const prev = SCN[c.s.i - 1];
  if (side === 'center') {
    const e = prev && prev.params && prev.params.pablo === 'center' ? 1 : easeOut((c.lt - .1) / .5);
    return pablo({ x: o.x || 960, y: (o.y || 1110) + 600 * (1 - e), s: o.s || 1.1, pose: c.pose, prevPose: c.prevPose, poseT: c.poseT, mouth: c.mouth, talking: c.talking, t: c.t, flip: false });
  }
  const enter = prev && prev.params && prev.params.pablo === side ? 1 : easeOut((c.lt - .1) / .5);
  const x = (o.x || (right ? 1585 : 335)) + (right ? 1 : -1) * 500 * (1 - enter);
  return pablo({ x, y: o.y || 1110, s: o.s || 1.1, pose: c.pose, prevPose: c.prevPose, poseT: c.poseT, mouth: c.mouth, talking: c.talking, t: c.t, flip: !right });
}

const ROOT = document.getElementById('root');
const STATIC_DEFS = `<defs><pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="3.2" fill="#fff"/></pattern>
<radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>`;

function sceneAt(t) { let s = SCN[0]; for (const x of SCN) if (t >= x.start) s = x; return s; }

window.renderFrame = function (t) {
  _uid = 0;
  const s = sceneAt(t);
  const c = ctxFor(s, t);
  const fn = SCENES[s.type] || SCENES._missing;
  let body = '';
  try { body = fn(c); } catch (e) { body = txt(960, 540, 'ERRO ' + s.type + ': ' + e.message, { size: 40, fill: 'red' }); console.error(e); }
  // câmera: aproximação lenta + "soco" de zoom a cada nova fala
  const bt = c.bi >= 0 ? t - c.b.start : 9;
  const zoom = 1 + .025 * clamp(c.lt / Math.max(1, s.dur)) + (s.type === 'chapter' || s.type === 'title' ? 0 : .012 * Math.exp(-bt * 5) * (c.bi > 0 ? 1 : 0));
  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${STATIC_DEFS}`;
  out += `<g transform="translate(${W / 2},${H / 2}) scale(${zoom.toFixed(4)}) translate(${-W / 2},${-H / 2})">${body}</g>`;
  if (s.params.pablo) out += presenter(c, s.params.pablo);
  out += `<rect width="${W}" height="${H}" fill="url(#vig)"/>`;
  out += captions(t, s.type);
  out += progress(t, s);
  out += wipe(t);
  out += '</svg>';
  ROOT.innerHTML = out;
  return s.type;
};
window.READY = document.fonts.ready.then(() => Promise.all(['600 20px Fredoka', '700 20px Fredoka', '400 20px Bangers'].map(f => document.fonts.load(f)))).then(() => true);
