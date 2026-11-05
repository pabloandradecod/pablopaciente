// F12 — Sensibilidade na parte de dentro da coxa e força dos adutores (bola entre os joelhos); Vértebra: "a bola nem sentiu!"
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

const legsFront = (C, pre) => `
  <g id="${pre}-legL"><path d="M-70 0 L-10 0 L-16 150 L-12 290 L-58 290 L-62 150 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-72 290 L-4 290 Q4 312 -14 316 L-72 316 Z" fill="#4A2E1A" stroke="${C.ink}" stroke-width="6"/></g>
  <g id="${pre}-legR"><path d="M10 0 L70 0 L62 150 L58 290 L12 290 L16 150 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M4 290 L72 290 L72 316 L14 316 Q-4 312 4 290 Z" fill="#4A2E1A" stroke="${C.ink}" stroke-width="6"/></g>
  <rect x="-74" y="-30" width="148" height="40" rx="12" fill="${C.brown}" stroke="${C.ink}" stroke-width="6"/>`;

export default {
  speakers: { pablo: "f12p", vertebra: "f12v" },
  build(ctx) {
    const { C, human, vertebra, w, lines, MINT } = ctx;
    const k = {
      exame: w(0, "exame"), sens: w(0, "sensibilidade"), dentro: w(0, "dentro"), forca: w(0, "força"), adut: w(0, "adutores"),
      aperta: w(0, "aperta"), bola: w(0, "bola"), joel: w(0, "joelhos"), fecha: w(0, "fecha"), mao: w(0, "mão"), afet: w(0, "afetado"), menor: w(0, "menor"),
      v0: lines[1].start, v1: lines[1].end, nem: w(1, "nem"),
    };
    const H = [520, 560], sz = 1.2;
    const P = [800, 662], sp = 1.15;
    k.ikRest = { shF: -20, elF: -30 };
    k.ikThigh = armIK(P, sp, [610, 548]);
    const pab = inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C));
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const ball = (id) => `<g id="${id}"><circle r="30" fill="#fff" ${st(5)}/><path d="M0 -12 L11 -4 L7 10 L-7 10 L-11 -4 Z" fill="${C.ink}"/></g>`;
    return {
      k,
      css: `
        #f12-title { left:80px; top:60px; font-size:68px; }
        #f12-title span { color:#1E8F6A; }
        #f12-ins { left:1040px; top:110px; width:620px; height:600px; }
        #f12-cap { position:absolute; left:0; right:0; top:14px; text-align:center; font-size:30px; }
        #f12-cap b { color:#1E8F6A; }
        #f12-res { position:absolute; left:20px; right:20px; bottom:16px; text-align:center; font-size:30px; line-height:1.15; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="200" y="572" width="400" height="44" rx="14" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="230" y="616" width="26" height="264" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="540" y="616" width="26" height="264" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f12z", "ze")}</g>
      <g id="f12-th" opacity="0"><ellipse cx="600" cy="548" rx="70" ry="22" fill="${MINT}" opacity="0.6" stroke="#fff" stroke-width="4"/></g>
      <g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g>
      <g id="f12-v-wrap"><g transform="translate(1760,880) scale(0.8)">${vertebra("f12v")}</g></g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">SENSIBILIDADE E <span>FORÇA</span></div>
    <div id="f12-ins" class="abs card" style="opacity:0">
      <div id="f12-cap" class="label">visto de frente: <b>parte de dentro</b></div>
      <svg class="abs" style="left:0;top:60px" width="620" height="440" viewBox="-310 -40 620 440">
        <g id="f12-legs">${legsFront(C, "f12")}</g>
        <path id="f12-med" d="M-10 10 L-16 150 L-14 240 L-40 240 L-36 150 L-34 10 Z" fill="${MINT}" opacity="0"/>
        <g id="f12-dots" opacity="0"><circle cx="-24" cy="70" r="12" fill="#fff" ${st(4)}/><text x="-24" y="78" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">?</text>
          <circle cx="-26" cy="170" r="12" fill="#fff" ${st(4)}/><text x="-26" y="178" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">?</text>
          <circle cx="-60" cy="110" r="12" fill="${C.good}" ${st(4)}/></g>
        <g transform="translate(0,150)"><g id="f12-ballg" opacity="0">${ball("f12-ball")}</g></g>
        <g id="f12-hand" opacity="0"><g transform="translate(-120,150)"><circle r="26" fill="#fff" ${st(5)}/><path d="M-30 -6 L-80 -10 M-30 8 L-80 10" ${st(10)}/></g></g>
        <g id="f12-arrows" opacity="0"><path d="M-130 80 L-80 80" ${st(8)} stroke="#2E9E78"/><path d="M-94 68 L-76 80 L-94 92" fill="none" ${st(6)} stroke="#2E9E78"/><path d="M130 80 L80 80" ${st(8)} stroke="#2E9E78"/><path d="M94 68 L76 80 L94 92" fill="none" ${st(6)} stroke="#2E9E78"/></g>
      </svg>
      <div id="f12-res" class="label"><div id="f12-r1" style="opacity:0">Lado bom: <span style="color:#1E8F6A">bola esmagada!</span></div><div id="f12-r2" style="opacity:0">Lado afetado: <span style="color:${C.pain}">força menor</span></div></div>
    </div>`,
      js: function (tl, K, R) {
        const z = "f12z", p = "f12p", v = "f12v";
        R.setPose(tl, z, 0, { hipB: -88, hipF: -92, knB: 90, knF: 92, torso: -6, shF: -20, elF: -30, shB: -10, elB: -20 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        R.setPose(tl, p, 0, { ...K.ikRest, shB: 8, elB: -20 });
        R.blinks(tl, p, 0.6, K.dur);
        tl.set("#f12-v-wrap", { y: 400 }, 0);
        tl.fromTo("#f12-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.exame - 0.2);
        // sensibilidade: mão na parte de dentro da coxa
        R.pose(tl, p, K.sens - 0.2, 0.4, K.ikThigh);
        R.fadeIn(tl, "#f12-th", K.dentro - 0.1, 0.3);
        R.pop(tl, "#f12-ins", K.sens - 0.1, 0.45);
        tl.to("#f12-med", { opacity: 0.75, duration: 0.3 }, K.dentro);
        R.fadeIn(tl, "#f12-dots", K.dentro + 0.3, 0.3);
        R.face(tl, z, K.dentro + 0.3, { eyes: "wide", mouth: "flat" });
        // força: bola entre os joelhos
        R.pose(tl, p, K.forca, 0.4, K.ikRest);
        R.fadeOut(tl, "#f12-th", K.forca, 0.3);
        tl.to("#f12-dots", { opacity: 0, duration: 0.2 }, K.adut);
        tl.to("#f12-med", { opacity: 0.25, duration: 0.3 }, K.adut);
        tl.set("#f12-ballg", { opacity: 1 }, K.bola - 0.1);
        tl.fromTo("#f12-ballg", { y: -260 }, { y: 0, duration: 0.45, ease: "bounce.out" }, K.bola - 0.1);
        R.fadeIn(tl, "#f12-arrows", K.aperta, 0.2);
        // lado bom: esmaga
        tl.to("#f12-legL", { x: 12, duration: 0.3, ease: "power2.in" }, K.joel);
        tl.to("#f12-legR", { x: -12, duration: 0.3, ease: "power2.in" }, K.joel);
        tl.to("#f12-ball", { scaleX: 0.55, scaleY: 1.2, svgOrigin: "0 0", duration: 0.3, ease: "power2.in" }, K.joel);
        R.fadeIn(tl, "#f12-r1", K.joel + 0.3, 0.3);
        R.face(tl, z, K.joel, { eyes: "closed", mouth: "grin" });
        tl.to("#f12-legL, #f12-legR", { x: 0, duration: 0.3 }, K.fecha - 0.3);
        tl.to("#f12-ball", { scaleX: 1, scaleY: 1, svgOrigin: "0 0", duration: 0.3, ease: "back.out(3)" }, K.fecha - 0.3);
        R.fadeOut(tl, "#f12-arrows", K.fecha - 0.3, 0.2);
        // contra a mão do examinador
        R.fadeIn(tl, "#f12-hand", K.mao - 0.3, 0.25);
        tl.fromTo("#f12-hand", { x: -40 }, { x: 0, duration: 0.35, ease: "power2.out" }, K.mao - 0.3);
        // lado afetado: bola quase não amassa
        tl.to("#f12-legL", { x: 4, duration: 0.4, ease: "power1.in" }, K.afet);
        tl.to("#f12-ball", { scaleX: 0.93, scaleY: 1.03, svgOrigin: "0 0", duration: 0.4, ease: "power1.in" }, K.afet);
        R.shake(tl, "#f12-legL", K.afet + 0.4, 0.5, 2);
        R.fadeOut(tl, "#f12-r1", K.afet - 0.2, 0.2);
        R.fadeIn(tl, "#f12-r2", K.menor - 0.2, 0.3);
        R.face(tl, z, K.afet + 0.2, { eyes: "pain", mouth: "frown" });
        // Vértebra: "Aperta! Aperta! Ih, a bola nem sentiu!"
        tl.to("#f12-v-wrap", { y: -100, duration: 0.3, ease: "power2.out" }, K.v0 - 0.5);
        tl.to("#f12-v-wrap", { y: 0, duration: 0.25, ease: "power2.in" }, K.v0 - 0.2);
        R.squash(tl, "#f12v-root", K.v0 + 0.05);
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        for (let i = 0; i < 4; i++) R.pose(tl, v, K.v0 + i * 0.25, 0.2, { armF: i % 2 ? -60 : -150, armB: i % 2 ? 60 : 150 }, "sine.inOut");
        R.face(tl, v, K.v0, { eyes: "wide" });
        R.face(tl, v, K.nem, { eyes: "happy" });
        R.shake(tl, "#f12-ball", K.nem, 0.4, 2);
        R.face(tl, p, K.nem, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh-short", t: k.exame - 0.2, vol: 0.35 },
        { name: "pop", t: k.sens - 0.1, vol: 0.4 },
        { name: "pop", t: k.bola + 0.3, vol: 0.4 },
        { name: "click", t: k.joel + 0.25, vol: 0.4 },
        { name: "pop", t: k.menor - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.5, vol: 0.35 },
      ],
    };
  },
};
