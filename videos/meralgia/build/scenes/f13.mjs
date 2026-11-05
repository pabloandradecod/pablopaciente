// F13 — Força e reflexo normais: Seu Zé estica o joelho contra a mão (FORÇA 10), levanta a coxa; martelinho → o chute faz o martelo voar
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
const hammerSVG = (C, id) => `<g id="${id}"><line x1="0" y1="0" x2="0" y2="60" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="60" stroke="#C9C9C9" stroke-width="6" stroke-linecap="round"/><path d="M-24 58 Q-26 74 -12 76 L12 76 Q26 74 24 58 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

export default {
  speakers: { pablo: "f13p", vertebra: "f13v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      dep: w(0, "Depois"), forca: w(0, "força"), refl: w(0, "reflexo"), est: w(0, "esticar"), lev: w(0, "levantar"), normal: w(0, "normal"),
      refl2: w(0, "reflexo", 1), tamb: w(0, "também"), fraq: w(0, "fraqueza"), dimi: w(0, "diminuído"), susp: w(0, "suspeita"), col: w(0, "coluna"), outro: w(0, "outro"),
      v0: lines[1].start, v1: lines[1].end,
    };
    // Seu Zé sentado na maca: quadril H; Dr. Pablo espelhado à direita
    const H = [620, 560], sz = 1.25;
    const P = [880, 662], sp = 1.2;
    k.ikRest = { shF: -20, elF: -30 };
    k.ikShin = armIK(P, sp, [778, 640]);
    k.ikHamUp = armIK(P, sp, [800, 520]);
    k.ikHamHit = armIK(P, sp, [770, 560]);
    const pab = inHand(inNeck(human("f13p", "pablo"), "f13p", hat("f13p", C)), "f13p", `<g id="f13-hh" opacity="0">${hammerSVG(C, "f13-hh-in")}</g>`);
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f13-title { left:80px; top:60px; font-size:72px; }
        #f13-title span { color:#1E9E73; }
        #f13-meter { left:1150px; top:120px; width:560px; padding:20px 26px; font-size:36px; }
        #f13-bar { margin-top:12px; height:40px; border:6px solid ${C.ink}; border-radius:14px; background:#fff; overflow:hidden; }
        #f13-fill { height:100%; width:100%; background:${C.good}; transform-origin:0 50%; }
        #f13-chk { left:1150px; top:330px; width:560px; padding:14px 22px; font-size:32px; line-height:1.35; }
        #f13-warn { left:1150px; top:330px; width:560px; padding:18px 22px; font-size:34px; line-height:1.2; background:#FFE0D8; }
        #f13-warn b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="572" width="400" height="44" rx="14" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="330" y="616" width="26" height="264" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="640" y="616" width="26" height="264" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <g id="f13-z-wrap"><g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f13z", "ze")}</g></g>
      <g id="f13-p-wrap"><g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g></g>
      <g id="f13-fly" opacity="0"><g transform="translate(790,560)"><g id="f13-fly-in">${hammerSVG(C, "f13-fh")}</g></g></g>
      <g id="f13-boing" opacity="0">${Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2; return `<line x1="${760 + Math.cos(a) * 30}" y1="${575 + Math.sin(a) * 30}" x2="${760 + Math.cos(a) * 54}" y2="${575 + Math.sin(a) * 54}" stroke="${C.sun}" stroke-width="7" stroke-linecap="round"/>`; }).join("")}</g>
      <g id="f13-v-wrap"><g transform="translate(1680,880) scale(0.85)">${vertebra("f13v")}</g></g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">FORÇA E <span>REFLEXO</span></div>
    <div id="f13-meter" class="abs card label" style="opacity:0">FORÇA DO JOELHO: <span style="color:#1E9E73">10!</span><div id="f13-bar"><div id="f13-fill"></div></div></div>
    <div id="f13-chk" class="abs card label" style="opacity:0"><div id="f13-k1">&#10003; Esticar o joelho: normal</div><div id="f13-k2" style="opacity:0">&#10003; Levantar a coxa: normal</div><div id="f13-k3" style="opacity:0">&#10003; Reflexo do joelho: normal</div></div>
    <div id="f13-warn" class="abs card label" style="opacity:0">Fraqueza ou reflexo diminuído? Pensar em <b>COLUNA</b> ou <b>outro nervo</b></div>`,
      js: function (tl, K, R) {
        const z = "f13z", p = "f13p", v = "f13v";
        R.setPose(tl, z, 0, { hipB: -88, hipF: -92, knB: 90, knF: 92, torso: -6, shF: -20, elF: -30, shB: -10, elB: -20 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        R.setPose(tl, p, 0, { ...K.ikRest, shB: 8, elB: -20 });
        R.blinks(tl, p, 0.6, K.dur);
        R.fadeIn(tl, "#f13-z-wrap, #f13-p-wrap", 0, 0.3);
        tl.set("#f13-v-wrap", { y: 400 }, 0);
        tl.fromTo("#f13-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.dep - 0.2);
        // força: mão na canela, ele estica o joelho contra a resistência
        R.pose(tl, p, K.forca - 0.2, 0.4, K.ikShin);
        R.pop(tl, "#f13-meter", K.est - 0.3, 0.4);
        R.face(tl, z, K.est, { eyes: "closed", mouth: "grin" });
        R.pose(tl, z, K.est, 0.8, { knF: 55 }, "power1.out");
        R.shake(tl, "#f13z-root", K.est + 0.2, 0.6, 2);
        tl.fromTo("#f13-fill", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.out" }, K.est);
        R.pose(tl, z, K.lev - 0.1, 0.4, { knF: 92, hipF: -112 }, "power2.out");
        R.pop(tl, "#f13-chk", K.est + 0.5, 0.35);
        tl.fromTo("#f13-k2", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3 }, K.lev + 0.2);
        R.pose(tl, z, K.normal, 0.4, { hipF: -92 });
        R.face(tl, z, K.normal, { eyes: "happy", mouth: "smile" });
        // reflexo: martelinho
        R.pose(tl, p, K.normal + 0.2, 0.35, K.ikHamUp);
        tl.set("#f13-hh", { opacity: 1 }, K.normal + 0.2);
        R.fadeOut(tl, "#f13-meter", K.refl2 - 0.4, 0.25);
        R.pose(tl, p, K.refl2 + 0.05, 0.15, K.ikHamHit, "power3.in");
        const kick = K.refl2 + 0.22;
        tl.set("#f13-boing", { opacity: 1 }, kick);
        tl.to("#f13-boing", { opacity: 0, duration: 0.3 }, kick + 0.35);
        R.pose(tl, z, kick, 0.12, { knF: -2 }, "power4.out");
        R.face(tl, z, kick, { eyes: "wide", mouth: "open" });
        // o martelo voa longe e o doutor desvia
        tl.set("#f13-hh", { opacity: 0 }, kick + 0.02);
        tl.set("#f13-fly", { opacity: 1 }, kick + 0.02);
        tl.fromTo("#f13-fly-in", { x: 0, y: 0, rotation: 0 }, { x: 560, y: -480, rotation: 900, svgOrigin: "0 30", duration: 0.9, ease: "power2.out" }, kick + 0.02);
        tl.to("#f13-fly", { opacity: 0, duration: 0.2 }, kick + 0.8);
        tl.to("#f13-p-wrap", { x: 70, duration: 0.18, ease: "power3.out" }, kick + 0.02);
        R.pose(tl, p, kick + 0.02, 0.2, { torso: 18, shF: -150, elF: -20 }, "power3.out");
        R.face(tl, p, kick + 0.02, { eyes: "wide", mouth: "scream" });
        R.pose(tl, z, kick + 0.6, 0.4, { knF: 92 });
        tl.fromTo("#f13-k3", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3 }, K.tamb);
        tl.to("#f13-p-wrap", { x: 0, duration: 0.5, ease: "power2.inOut" }, kick + 1.2);
        R.pose(tl, p, kick + 1.2, 0.5, { torso: 0, ...K.ikRest });
        R.face(tl, p, kick + 1.2, { eyes: "normal", mouth: "smile" });
        // se tiver fraqueza → coluna / outro nervo
        R.fadeOut(tl, "#f13-chk", K.fraq - 0.3, 0.25);
        R.pop(tl, "#f13-warn", K.fraq - 0.1, 0.4);
        R.shake(tl, "#f13-warn", K.col, 0.3, 4);
        R.face(tl, z, K.fraq, { eyes: "normal", mouth: "flat" });
        // Vértebra: "Que chute!"
        tl.to("#f13-v-wrap", { y: -100, duration: 0.3, ease: "power2.out" }, K.v0 - 0.5);
        tl.to("#f13-v-wrap", { y: 0, duration: 0.25, ease: "power2.in" }, K.v0 - 0.2);
        R.squash(tl, "#f13v-root", K.v0 + 0.05);
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.pose(tl, v, K.v0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, v, K.v0, { eyes: "wide" });
        R.face(tl, v, K.v1, { eyes: "happy" });
        R.face(tl, p, K.v0 + 0.4, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh-short", t: k.dep - 0.2, vol: 0.35 },
        { name: "pop", t: k.est - 0.25, vol: 0.4 },
        { name: "pop", t: k.lev + 0.2, vol: 0.3 },
        { name: "click", t: k.refl2 + 0.2, vol: 0.5 },
        { name: "whoosh", t: k.refl2 + 0.24, vol: 0.5 },
        { name: "pop", t: k.tamb, vol: 0.3 },
        { name: "pop", t: k.fraq - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.5, vol: 0.35 },
      ],
    };
  },
};
