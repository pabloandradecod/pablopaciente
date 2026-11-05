// F12 — Mapa da sensibilidade: toque leve com pincel; dentro da área do Nervinho sente diferente, fora normal; caneta desenha o mapa
const inNeck = (svg, id, extra) => {
  const i = svg.indexOf(`<g transform="translate(4,-138)"><g id="${id}-shF">`);
  const j = svg.lastIndexOf("</g></g>", i);
  return svg.slice(0, j) + extra + svg.slice(j);
};
const hat = (id, C) => `<g id="${id}-hat">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g>`;
const rad = (d) => (d * Math.PI) / 180;
const rot = ([x, y], a) => [x * Math.cos(rad(a)) - y * Math.sin(rad(a)), x * Math.sin(rad(a)) + y * Math.cos(rad(a))];
// IK do braço da frente de um personagem espelhado (scale(-s, s)) para alcançar alvo em coordenadas de tela
function armIK(P, s, target) {
  const S = [4, -138], a = 68, b = 66;
  const tl = [(P[0] - target[0]) / s, (target[1] - P[1]) / s];
  let d = [tl[0] - S[0], tl[1] - S[1]];
  let D = Math.hypot(d[0], d[1]);
  if (D > a + b - 2) { d = d.map((v) => (v * (a + b - 2)) / D); D = a + b - 2; }
  const ang = (v) => (Math.atan2(-v[0], v[1]) * 180) / Math.PI;
  const phi0 = ang(d);
  const g = (Math.acos(Math.max(-1, Math.min(1, (a * a + D * D - b * b) / (2 * a * D)))) * 180) / Math.PI;
  const sols = [phi0 + g, phi0 - g].map((p1) => {
    const e = rot([0, a], p1);
    const p2 = ang([d[0] - e[0], d[1] - e[1]]);
    let beta = p2 - p1;
    while (beta > 180) beta -= 360;
    while (beta < -180) beta += 360;
    return { sh: p1, el: beta, ey: e[1] };
  });
  sols.sort((u, v) => v.ey - u.ey);
  return { shF: +sols[0].sh.toFixed(1), elF: +sols[0].el.toFixed(1) };
}

const inHand = (svg, id, extra) => svg.replace(`<g id="${id}-handF">`, `<g id="${id}-handF">${extra}`);
const brush = (C) => `<g><line x1="0" y1="0" x2="0" y2="62" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="62" stroke="#E7B65A" stroke-width="6" stroke-linecap="round"/><path d="M-8 60 Q0 92 8 60 Z" fill="#fff" stroke="${C.ink}" stroke-width="4"/></g>`;

export default {
  speakers: { pablo: "f12p" },
  build(ctx) {
    const { C, human, w, LILAC } = ctx;
    const k = {
      exame: w(0, "exame"), sens: w(0, "sensibilidade"), toque: w(0, "toque"), dentro: w(0, "Dentro"), nerv: w(0, "Nervinho"),
      dif: w(0, "diferente"), dorm: w(0, "dormente"), sensv: w(0, "sensível"), fora: w(0, "Fora"), normal: w(0, "normal"),
      lit: w(0, "literalmente"), des: w(0, "desenha"), mapa: w(0, "mapa"),
    };
    // Seu Zé deitado de barriga para cima: quadril H, root -90 (cabeça à esquerda, coxa para a direita)
    const H = [760, 552], sz = 1.1;
    const P = [985, 662], sp = 1.2;
    const T1 = [818, 532], T2 = [852, 534], T3 = [790, 534];
    k.ikRest = { shF: -20, elF: -30 };
    k.ik = [T1, T2, T3].map((T) => armIK(P, sp, [T[0], T[1] - 70]));
    k.ikUp = armIK(P, sp, [T1[0] + 20, T1[1] - 120]);
    const pab = inHand(inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C)), "f12p", brush(C));
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const pocket = "M28 -118 Q60 -110 66 -60 Q70 -10 58 40 Q40 60 24 40 Q18 -10 20 -70 Q20 -104 28 -118 Z";
    const inside = [[40, -86], [48, -36], [42, 14]], outside = [[-30, -86], [-22, -26], [-18, 34]];
    return {
      k,
      css: `
        #f12-title { left:80px; top:60px; font-size:72px; }
        #f12-title span { color:#7A55C9; }
        #f12-sub { left:84px; top:150px; font-size:34px; color:${C.pain}; }
        #f12-inset { left:1240px; top:60px; width:620px; height:640px; }
        #f12-l1 { left:1250px; top:720px; padding:10px 18px; font-size:30px; }
        #f12-l2 { left:1240px; top:796px; padding:10px 18px; font-size:30px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f12-p-wrap"><g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g></g>
      <rect x="320" y="600" width="820" height="44" rx="14" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="370" y="644" width="26" height="230" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="1060" y="644" width="26" height="230" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="340" y="570" width="160" height="38" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
      <g id="f12-z-wrap"><g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f12z", "ze")}</g></g>
      <ellipse id="f12-zpatch" cx="830" cy="540" rx="52" ry="18" fill="${LILAC}" opacity="0" stroke="#fff" stroke-width="4"/>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">MAPA DA <span>SENSIBILIDADE</span></div>
    <div id="f12-sub" class="abs label" style="opacity:0">toque leve, ponto a ponto</div>
    <div id="f12-inset" class="abs card" style="opacity:0">
      <svg width="620" height="640" viewBox="0 0 620 640">
        <text x="310" y="52" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">coxa direita, de frente</text>
        <g transform="translate(300,350) scale(2)">
          <path d="M-58 -150 L58 -150 Q74 -40 52 70 L44 128 L-30 128 L-40 70 Q-60 -40 -58 -150 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
          <ellipse cx="2" cy="80" rx="22" ry="14" fill="none" stroke="${C.ink}" stroke-width="2.5" opacity="0.5"/>
          <path id="f12-fill" d="${pocket}" fill="${LILAC}" opacity="0"/>
          <path id="f12-pen" d="${pocket}" fill="none" stroke="#7A55C9" stroke-width="4" stroke-dasharray="9 6" stroke-linecap="round" opacity="0"/>
          ${inside.map(([x, y], i) => `<g id="f12-in${i}" opacity="0"><circle cx="${x}" cy="${y}" r="9" fill="${LILAC}" stroke="${C.ink}" stroke-width="2.5"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="11" fill="${C.ink}">?</text></g>`).join("")}
          ${outside.map(([x, y], i) => `<g id="f12-out${i}" opacity="0"><circle cx="${x}" cy="${y}" r="9" fill="${C.good}" stroke="${C.ink}" stroke-width="2.5"/><path d="M${x - 4} ${y} l3 4 l6 -7" fill="none" stroke="${C.ink}" stroke-width="2.5" stroke-linecap="round"/></g>`).join("")}
          <text x="66" y="-130" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="11" fill="${C.ink}" opacity="0.7">lado de fora</text>
        </g>
      </svg>
    </div>
    <div id="f12-l1" class="abs card label" style="opacity:0;color:#7A55C9">DENTRO: dormente ou sensível</div>
    <div id="f12-l2" class="abs card label" style="opacity:0;color:#1E9E73">FORA: normal</div>`,
      js: function (tl, K, R) {
        const z = "f12z", p = "f12p";
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: 10, shF: 6, elF: -4, shB: 4, elB: -4, hipF: 0, knF: 0, anF: -80, hipB: 0, knB: 0, anB: -80 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.5, K.dif);
        R.setPose(tl, p, 0, { ...K.ikRest, shB: 8, elB: -20 });
        R.blinks(tl, p, 0.6, K.dur);
        R.fadeIn(tl, "#f12-p-wrap, #f12-z-wrap", 0, 0.3);
        tl.fromTo("#f12-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.exame - 0.2);
        R.rise(tl, "#f12-sub", K.toque, 0.35);
        // o pincel passa na coxa, ponto a ponto
        R.pose(tl, p, K.sens - 0.2, 0.4, K.ikUp);
        const strokes = [K.toque, K.toque + 0.7, K.dentro, K.dentro + 0.7, K.fora, K.fora + 0.6];
        strokes.forEach((t, i) => {
          R.pose(tl, p, t, 0.22, K.ik[i % 3], "power2.in");
          R.pose(tl, p, t + 0.3, 0.22, K.ikUp, "power2.out");
        });
        // inset: pontos dentro e fora
        R.pop(tl, "#f12-inset", K.dentro - 0.4, 0.4);
        [0, 1, 2].forEach((i) => R.pop(tl, `#f12-in${i}`, K.nerv + i * 0.3, 0.3));
        tl.to("#f12-zpatch", { opacity: 0.85, duration: 0.3 }, K.nerv);
        R.face(tl, z, K.dif, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f12-l1", K.dorm - 0.1, 0.35);
        R.face(tl, z, K.sensv, { eyes: "pain", mouth: "frown" });
        [0, 1, 2].forEach((i) => R.pop(tl, `#f12-out${i}`, K.fora + 0.2 + i * 0.25, 0.3));
        R.pop(tl, "#f12-l2", K.normal - 0.1, 0.35);
        R.face(tl, z, K.normal, { eyes: "happy", mouth: "smile" });
        // a caneta desenha o mapa
        tl.set("#f12-pen", { opacity: 1 }, K.des - 0.1);
        R.draw(tl, "#f12-pen", K.des - 0.1, 1.2, "none");
        tl.to("#f12-fill", { opacity: 0.6, duration: 0.4 }, K.mapa);
        R.face(tl, p, K.mapa, { eyes: "happy" });
        R.pose(tl, p, K.mapa + 0.2, 0.4, K.ikRest);
      },
      sfx: [
        { name: "whoosh-short", t: k.exame - 0.2, vol: 0.35 },
        { name: "pop", t: k.dentro - 0.35, vol: 0.4 },
        { name: "pop", t: k.dorm - 0.05, vol: 0.35 },
        { name: "pop", t: k.normal - 0.05, vol: 0.35 },
        { name: "typing", t: k.des - 0.1, vol: 0.2, dur: 1.1 },
        { name: "sparkle", t: k.mapa, vol: 0.35 },
      ],
    };
  },
};
