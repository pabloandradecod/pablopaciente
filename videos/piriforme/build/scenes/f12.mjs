// F12 — Palpação: Seu Zé de bruços; o dedo aperta o ponto entre o sacro e o topo do fêmur → "É AÍ, doutor!"
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

export default {
  speakers: { pablo: "f12p" },
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      exame: w(0, "exame"), palp: w(0, "palpação"), apert: w(0, "apertando"), ponto: w(0, "ponto"), sacro: w(0, "sacro"),
      femur: w(0, "fêmur"), dor: w(0, "dor"), apar: w(0, "aparece"), fam: w(0, "famosa"), ai: w(0, "AÍ"), dout: w(0, "doutor"),
    };
    // Seu Zé de bruços: quadril H, escala sz, root +90 (cabeça à direita, rosto para baixo)
    const H = [740, 540], sz = 1.1;
    const T = [H[0] + 22, H[1] - 48]; // ponto do piriforme (nádega, um pouco para a cabeça)
    const P = [935, 662], sp = 1.2;
    k.T = T;
    k.ikRest = { shF: -20, elF: -30 };
    k.ikHover = armIK(P, sp, [T[0] + 10, T[1] - 40]);
    k.ikPress = armIK(P, sp, [T[0] + 4, T[1] + 6]);
    const pab = inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C));
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f12-title { left:80px; top:60px; font-size:84px; }
        #f12-sub { left:84px; top:160px; font-size:34px; color:${C.pain}; }
        #f12-inset { left:1250px; top:80px; width:600px; height:420px; }
        #f12-bub { left:1300px; top:540px; padding:16px 30px; font-size:56px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f12-p-wrap"><g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g></g>
      <!-- maca -->
      <rect x="360" y="600" width="820" height="44" rx="14" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="410" y="644" width="26" height="230" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="1100" y="644" width="26" height="230" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="1000" y="570" width="160" height="38" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
      <g id="f12-z-wrap"><g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f12z", "ze")}</g></g>
      <g id="f12-target" opacity="0">
        <circle id="f12-tr" cx="${T[0]}" cy="${T[1]}" r="46" fill="none" stroke="${C.pain}" stroke-width="7"/>
        <circle cx="${T[0]}" cy="${T[1]}" r="26" fill="none" stroke="${C.pain}" stroke-width="6"/>
        <circle cx="${T[0]}" cy="${T[1]}" r="8" fill="${C.pain}"/>
        <path d="M${T[0] - 46} ${T[1] - 40} L${T[0] - 160} ${T[1] - 150}" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/>
        <rect x="${T[0] - 430}" y="${T[1] - 200}" width="300" height="56" rx="14" fill="#fff" ${st(5)}/>
        <text x="${T[0] - 280}" y="${T[1] - 162}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">ponto do piriforme</text>
      </g>
      <g id="f12-burst" opacity="0">${Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return `<line x1="${T[0] + Math.cos(a) * 60}" y1="${T[1] + Math.sin(a) * 60}" x2="${T[0] + Math.cos(a) * 92}" y2="${T[1] + Math.sin(a) * 92}" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/>`; }).join("")}</g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">PALPAÇÃO</div>
    <div id="f12-sub" class="abs label" style="opacity:0">entre o sacro e o topo do fêmur</div>
    <div id="f12-inset" class="abs card" style="opacity:0">
      <svg width="600" height="420" viewBox="0 0 600 420">
        <text x="300" y="46" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">vista de trás (lado direito)</text>
        <g id="f12-sac" opacity="0"><path d="M90 110 L210 110 L170 300 L130 300 Z" fill="${C.bone}" ${st(7)}/><path d="M110 150 L190 150 M118 190 L182 190 M126 230 L174 230" stroke="${C.ink}" stroke-width="4" opacity="0.4"/>
          <text x="150" y="350" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">sacro</text></g>
        <g id="f12-fem" opacity="0"><path d="M440 150 Q470 120 500 140 Q520 170 500 200 L480 380 L430 380 L440 210 Q420 180 440 150 Z" fill="${C.bone}" ${st(7)}/><circle cx="420" cy="170" r="34" fill="${C.bone}" ${st(7)}/>
          <text x="470" y="105" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">topo do fêmur</text></g>
        <g id="f12-mus" opacity="0"><path d="M200 150 Q320 140 470 160 L470 190 Q320 210 190 230 Z" fill="#F2766B" ${st(6)}/>
          <path d="M210 175 Q330 170 460 175 M210 205 Q330 195 460 185" fill="none" stroke="#fff" stroke-width="4" opacity="0.5"/>
          <path d="M300 120 Q310 240 300 400" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round" opacity="0.0"/>
          <path d="M320 220 Q326 300 318 400" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/><path d="M320 220 Q326 300 318 400" fill="none" stroke="${C.nerve}" stroke-width="12" stroke-linecap="round"/></g>
        <g id="f12-it" opacity="0"><circle cx="330" cy="182" r="30" fill="none" stroke="${C.pain}" stroke-width="7"/><circle cx="330" cy="182" r="8" fill="${C.pain}"/></g>
      </svg>
    </div>
    <div id="f12-bub" class="abs card title" style="opacity:0">É AÍ, DOUTOR!</div>`,
      js: function (tl, K, R) {
        const z = "f12z", p = "f12p";
        R.setPose(tl, z, 0, { root: 90, torso: 0, neck: -10, shF: 4, elF: 6, shB: 2, elB: 4, hipF: 0, knF: 0, anF: 0, hipB: 0, knB: 0, anB: 0 });
        R.face(tl, z, 0, { eyes: "closed", mouth: "flat" });
        R.setPose(tl, p, 0, { ...K.ikRest, shB: 8, elB: -20 });
        R.blinks(tl, p, 0.6, K.dur);
        R.fadeIn(tl, "#f12-p-wrap, #f12-z-wrap", 0, 0.3);
        tl.set("#f12-title", { opacity: 1 }, K.palp - 0.2);
        tl.fromTo("#f12-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.palp - 0.2);
        // mão se aproxima
        R.pose(tl, p, K.palp, 0.5, K.ikHover);
        R.face(tl, p, K.palp, { eyes: "normal" });
        // inset anatômico
        R.pop(tl, "#f12-inset", K.ponto - 0.3, 0.4);
        R.fadeIn(tl, "#f12-sac", K.sacro - 0.1, 0.25);
        R.fadeIn(tl, "#f12-fem", K.femur - 0.15, 0.25);
        R.fadeIn(tl, "#f12-mus", K.femur + 0.2, 0.3);
        R.pop(tl, "#f12-it", K.femur + 0.45, 0.35);
        R.rise(tl, "#f12-sub", K.sacro, 0.35);
        // alvo e o aperto
        R.pop(tl, "#f12-target", K.apert - 0.1, 0.35);
        tl.fromTo("#f12-tr", { attr: { r: 30 } }, { attr: { r: 56 }, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.apert + 0.3);
        R.pose(tl, p, K.dor - 0.3, 0.25, K.ikPress, "power3.in");
        // reação: dá um pulo
        tl.set("#f12-burst", { opacity: 1 }, K.dor);
        tl.fromTo("#f12-burst", { scale: 0.6 }, { scale: 1.1, svgOrigin: `${K.T[0]} ${K.T[1]}`, duration: 0.25, ease: "back.out(3)" }, K.dor);
        tl.to("#f12-burst", { opacity: 0, duration: 0.3 }, K.dor + 0.8);
        R.face(tl, z, K.dor, { eyes: "wide", mouth: "scream" });
        R.pose(tl, z, K.dor, 0.15, { neck: -50, knF: 50, knB: 35 }, "power4.out");
        tl.to("#f12-z-wrap", { y: -40, duration: 0.16, ease: "power2.out" }, K.dor);
        tl.to("#f12-z-wrap", { y: 0, duration: 0.3, ease: "bounce.out" }, K.dor + 0.16);
        R.shake(tl, "#f12z-head", K.dor + 0.3, 0.6, 4);
        R.face(tl, p, K.apar, { eyes: "wide" });
        // É AÍ, DOUTOR!
        R.face(tl, z, K.fam, { eyes: "pain", mouth: "open" });
        R.pop(tl, "#f12-bub", K.ai - 0.15, 0.4);
        R.shake(tl, "#f12-bub", K.ai + 0.3, 0.4, 5);
        R.face(tl, p, K.dout, { eyes: "happy" });
        R.pose(tl, z, K.dout + 0.3, 0.4, { knF: 0, knB: 0, neck: -30 });
      },
      sfx: [
        { name: "whoosh-short", t: k.palp - 0.2, vol: 0.4 },
        { name: "pop", t: k.ponto - 0.25, vol: 0.35 },
        { name: "pop", t: k.apert - 0.05, vol: 0.4 },
        { name: "impact-bass-2", t: k.dor, vol: 0.4 },
        { name: "pop", t: k.ai - 0.1, vol: 0.45 },
      ],
    };
  },
};
