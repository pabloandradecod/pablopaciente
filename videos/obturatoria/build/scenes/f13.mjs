// F13 — Reflexo dos adutores diminuído (martelinho: só um "tic"); abrir a perna alonga os adutores e pressão funda na virilha (ponto do túnel) reproduzem a dor
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
  speakers: { pablo: "f13p" },
  build(ctx) {
    const { C, human, turao, w, MINT } = ctx;
    const k = {
      refl: w(0, "reflexo"), adut: w(0, "adutores"), mart: w(0, "martelinho"), dentro: w(0, "dentro"), dimi: w(0, "diminuído"),
      abrir: w(0, "abrir"), along: w(0, "alongando"), apertar: w(0, "apertar"), fundo: w(0, "fundo"), vir: w(0, "virilha"), tunel: w(0, "túnel"),
      repr: w(0, "reproduzir"), dor: w(0, "dor"),
    };
    const H = [520, 560], sz = 1.2;
    const P = [800, 662], sp = 1.15;
    k.ikRest = { shF: -20, elF: -30 };
    k.ikHamUp = armIK(P, sp, [700, 470]);
    k.ikHamHit = armIK(P, sp, [672, 560]);
    const pab = inHand(inNeck(human("f13p", "pablo"), "f13p", hat("f13p", C)), "f13p", `<g id="f13-hh" opacity="0">${hammerSVG(C, "f13-hh-in")}</g>`);
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f13-title { left:80px; top:60px; font-size:68px; }
        #f13-title span { color:#1E8F6A; }
        #f13-meter { left:1040px; top:120px; width:600px; padding:18px 24px; font-size:34px; }
        #f13-bar { margin-top:10px; height:36px; border:6px solid ${C.ink}; border-radius:14px; background:#fff; overflow:hidden; }
        #f13-fill { height:100%; width:100%; background:${C.pain}; transform-origin:0 50%; }
        #f13-ins { left:1060px; top:180px; width:620px; height:600px; }
        #f13-cap { position:absolute; left:0; right:0; top:14px; text-align:center; font-size:30px; }
        #f13-cap b { color:#1E8F6A; }
        #f13-stamp { left:1110px; top:620px; padding:10px 22px; font-size:40px; color:${C.pain}; border:6px solid ${C.pain}; border-radius:14px; background:#fff; rotate:-6deg; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="200" y="572" width="400" height="44" rx="14" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="230" y="616" width="26" height="264" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="540" y="616" width="26" height="264" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <g id="f13-z-wrap"><g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f13z", "ze")}</g></g>
      <g id="f13-tic" opacity="0"><path d="M660 600 l-14 -8 M676 610 l0 -14 M690 600 l12 -8" ${st(5)} stroke="${C.sun}"/></g>
      <g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">REFLEXO E <span>PROVOCAÇÃO</span></div>
    <div id="f13-meter" class="abs card label" style="opacity:0">REFLEXO DOS ADUTORES: <span style="color:${C.pain}">fraquinho</span><div id="f13-bar"><div id="f13-fill"></div></div></div>
    <div id="f13-ins" class="abs card" style="opacity:0">
      <div id="f13-cap" class="label">visto de <b>frente</b></div>
      <svg class="abs" style="left:0;top:60px" width="620" height="520" viewBox="-310 -60 620 520">
        <path d="M-150 -20 Q0 -60 150 -20 L130 40 Q0 10 -130 40 Z" fill="${C.brown}" ${st(6)}/>
        <g id="f13-legL"><path d="M-110 30 L-40 30 L-50 200 L-50 400 L-96 400 L-100 200 Z" fill="${C.skinB}" ${st(6)}/></g>
        <g id="f13-legR"><g id="f13-legR-in">
          <path d="M40 30 L110 30 L100 200 L96 400 L50 400 L50 200 Z" fill="${C.skinB}" ${st(6)}/>
          <path id="f13-add" d="M44 40 Q60 120 58 220" fill="none" stroke="#E86A5C" stroke-width="16" stroke-linecap="round" opacity="0"/>
        </g></g>
        <g id="f13-hand" opacity="0"><g transform="translate(150,260)"><circle r="26" fill="#fff" ${st(5)}/><path d="M28 -6 L80 -10 M28 8 L80 10" ${st(10)}/></g></g>
        <g id="f13-pain" opacity="0"><circle cx="20" cy="50" r="30" fill="${C.pain}" opacity="0.35"/><path d="M20 10 l0 -24 M48 28 l18 -14 M-8 28 l-18 -14" ${st(6)} stroke="${C.pain}"/></g>
        <g id="f13-target" opacity="0"><circle cx="20" cy="60" r="34" fill="none" stroke="${C.pain}" stroke-width="6"/><circle cx="20" cy="60" r="16" fill="none" stroke="${C.pain}" stroke-width="6"/>
          <rect x="-200" y="96" width="190" height="44" rx="12" fill="#fff" ${st(4)}/><text x="-105" y="126" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">ponto do túnel</text></g>
        <g id="f13-finger" opacity="0"><g id="f13-fing"><path d="M20 60 L60 -30" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><path d="M20 60 L60 -30" stroke="#fff" stroke-width="20" stroke-linecap="round"/></g></g>
        <g id="f13-tw" opacity="0"><g transform="translate(-250,190)">${turao("f13t", [[0, 0], [30, 10], [60, 30], [90, 60]], 14, 0.8)}</g></g>
      </svg>
    </div>
    <div id="f13-stamp" class="abs title" style="opacity:0">REPRODUZIU A DOR!</div>`,
      js: function (tl, K, R) {
        const z = "f13z", p = "f13p";
        R.setPose(tl, z, 0, { hipB: -88, hipF: -92, knB: 90, knF: 92, torso: -6, shF: -20, elF: -30, shB: -10, elB: -20 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        R.setPose(tl, p, 0, { ...K.ikRest, shB: 8, elB: -20 });
        R.blinks(tl, p, 0.6, K.dur);
        tl.fromTo("#f13-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, Math.max(0.1, K.refl - 0.3));
        // martelinho na parte de dentro do joelho: só um "tic"
        R.pose(tl, p, K.refl, 0.35, K.ikHamUp);
        tl.set("#f13-hh", { opacity: 1 }, K.refl);
        R.pose(tl, p, K.dentro - 0.1, 0.15, K.ikHamHit, "power3.in");
        const hit = K.dentro + 0.06;
        tl.set("#f13-tic", { opacity: 1 }, hit);
        tl.to("#f13-tic", { opacity: 0, duration: 0.3 }, hit + 0.3);
        R.pose(tl, z, hit, 0.1, { knF: 84 }, "power2.out");
        R.pose(tl, z, hit + 0.12, 0.15, { knF: 92 });
        R.pop(tl, "#f13-meter", hit + 0.2, 0.4);
        tl.fromTo("#f13-fill", { scaleX: 0 }, { scaleX: 0.22, duration: 0.6, ease: "power2.out" }, hit + 0.3);
        R.face(tl, p, K.dimi, { eyes: "wide", mouth: "flat" });
        R.shake(tl, "#f13-meter", K.dimi + 0.1, 0.3, 3);
        R.pose(tl, p, K.dimi + 0.4, 0.4, K.ikRest);
        tl.set("#f13-hh", { opacity: 0 }, K.dimi + 0.6);
        R.face(tl, p, K.dimi + 0.8, { eyes: "normal", mouth: "smile" });
        // abrir a perna, alongando os adutores
        R.fadeOut(tl, "#f13-meter", K.abrir - 0.4, 0.25);
        R.pop(tl, "#f13-ins", K.abrir - 0.2, 0.4);
        R.fadeIn(tl, "#f13-hand", K.abrir, 0.2);
        tl.to("#f13-legR-in", { rotation: -22, svgOrigin: "75 30", duration: 0.7, ease: "power2.inOut" }, K.abrir + 0.1);
        tl.to("#f13-hand", { x: 80, y: -20, duration: 0.7, ease: "power2.inOut" }, K.abrir + 0.1);
        tl.to("#f13-add", { opacity: 1, duration: 0.2 }, K.along);
        tl.to("#f13-add", { stroke: "#FF5A4E", duration: 0.2, yoyo: true, repeat: 3 }, K.along + 0.2);
        tl.set("#f13-pain", { opacity: 1 }, K.along + 0.3);
        R.shake(tl, "#f13-pain", K.along + 0.3, 0.4, 3);
        R.face(tl, z, K.along + 0.3, { eyes: "pain", mouth: "scream" });
        // apertar fundo na virilha, no ponto do túnel
        tl.to("#f13-legR-in", { rotation: 0, svgOrigin: "75 30", duration: 0.4 }, K.apertar - 0.4);
        R.fadeOut(tl, "#f13-hand", K.apertar - 0.4, 0.2);
        tl.to("#f13-pain, #f13-add", { opacity: 0, duration: 0.2 }, K.apertar - 0.4);
        R.face(tl, z, K.apertar - 0.3, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f13-target", K.fundo - 0.2, 0.35);
        tl.set("#f13-finger", { opacity: 1 }, K.fundo);
        tl.fromTo("#f13-fing", { x: 70, y: -80 }, { x: 0, y: 0, duration: 0.3, ease: "power3.in" }, K.fundo);
        R.fadeIn(tl, "#f13-tw", K.tunel - 0.2, 0.3);
        R.face(tl, "f13t", K.tunel, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f13t-face", K.tunel, 0.5, 3);
        // reproduz a dor
        tl.set("#f13-pain", { opacity: 1 }, K.repr);
        R.face(tl, z, K.repr, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f13z-root", K.repr, 0.4, 3);
        R.pop(tl, "#f13-stamp", K.dor - 0.1, 0.4);
      },
      sfx: [
        { name: "whoosh-short", t: Math.max(0.1, k.refl - 0.3), vol: 0.35 },
        { name: "click-soft", t: k.dentro + 0.06, vol: 0.5 },
        { name: "pop", t: k.dentro + 0.3, vol: 0.3 },
        { name: "pop", t: k.abrir - 0.2, vol: 0.35 },
        { name: "glitch-1", t: k.along + 0.3, vol: 0.2, dur: 0.35 },
        { name: "click", t: k.fundo + 0.3, vol: 0.4 },
        { name: "impact-bass-1", t: k.dor - 0.05, vol: 0.4 },
      ],
    };
  },
};
