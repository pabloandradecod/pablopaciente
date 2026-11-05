// F11 — Teste de Lasègue (perna esticada sobe; 30°–70° = positivo) e Bragard (baixa um pouco + dorsiflexão)
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
// cinemática simples do rig (mesmas convenções do lib.mjs)
const rad = (d) => (d * Math.PI) / 180;
const rot = ([x, y], a) => [x * Math.cos(rad(a)) - y * Math.sin(rad(a)), x * Math.sin(rad(a)) + y * Math.cos(rad(a))];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
// IK do braço da frente de um personagem espelhado (scale(-s, s)) para alcançar alvo em coordenadas de tela
function armIK(P, s, target) {
  const S = [4, -138], a = 68, b = 66;
  const tl = [(P[0] - target[0]) / s, (target[1] - P[1]) / s];
  let d = [tl[0] - S[0], tl[1] - S[1]];
  let D = Math.hypot(d[0], d[1]);
  if (D > a + b - 2) { d = d.map((v) => (v * (a + b - 2)) / D); D = a + b - 2; }
  const ang = (v) => (Math.atan2(-v[0], v[1]) * 180) / Math.PI; // direção local: (-sin, cos)
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
  sols.sort((u, v) => v.ey - u.ey); // cotovelo mais baixo
  return { shF: +sols[0].sh.toFixed(1), elF: +sols[0].el.toFixed(1) };
}

export default {
  speakers: { pablo: "f11p", nervo: "f11n" },
  gaps: [0.35, 0.4],
  build(ctx) {
    const { C, human, nerve, smooth, w, lines } = ctx;
    const k = {
      exame: w(0, "exame"), las: w(0, "Lasègue"), lev: w(0, "levanto"), entre: w(0, "entre"), graus: w(0, "graus"),
      dor: w(0, "dor"), pos: w(0, "positivo"), est: w(0, "esticou"), n0: lines[1].start, n1: lines[1].end,
      conf: w(2, "confirmar"), baixo: w(2, "baixo"), puxo: w(2, "puxo"), brag: w(2, "Bragard"),
    };
    // Seu Zé deitado: quadril em H, escala sz, root -90 (cabeça à esquerda, rosto para cima)
    const H = [720, 560], sz = 1.1;
    const W = (v) => { const r = rot(v, -90); return [H[0] + sz * r[0], H[1] + sz * r[1]]; };
    const legPt = (th, along, back = 0, ank = 0) => {
      // ponto ao longo da perna da frente com flexão de quadril th (graus para cima)
      const base = [8, 0];
      const dir = rot([back, along], -th);
      return W(add(base, dir));
    };
    const ankle = (th) => legPt(th, 178);
    const heel = (th) => legPt(th, 186, -10);
    // Dr. Pablo atrás da maca, espelhado
    const P = [1005, 642], sp = 1.25;
    k.ik0 = armIK(P, sp, heel(0));
    k.ik25 = armIK(P, sp, heel(25));
    k.ik50 = armIK(P, sp, heel(50));
    k.ik40 = armIK(P, sp, heel(40));
    // nervo sobreposto (raio-x) ao longo da parte de trás da coxa/perna
    const nervePath = (th) => smooth([W([-36, -40]), W([-20, 6]), legPt(th, 40, -14), legPt(th, 90, -14), legPt(th, 135, -12), legPt(th, 176, -10)]);
    k.nv0 = nervePath(0); k.nv50 = nervePath(50); k.nv40 = nervePath(40);
    const hip = W([0, -8]);
    k.hip = hip;
    const arcPt = (r, a) => [hip[0] + r * Math.cos(rad(a)), hip[1] - r * Math.sin(rad(a))];
    const band = (r1, r2, a1, a2) => { const A = arcPt(r2, a1), B = arcPt(r2, a2), Cc = arcPt(r1, a2), D = arcPt(r1, a1); return `M${A} A${r2} ${r2} 0 0 0 ${B} L${Cc} A${r1} ${r1} 0 0 1 ${D} Z`; };
    const ticks = Array.from({ length: 10 }, (_, i) => { const a = i * 10, p1 = arcPt(200, a), p2 = arcPt(i % 3 === 0 ? 172 : 184, a); return `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${C.ink}" stroke-width="4"/>`; }).join("");
    const lab = (a, txt, col) => { const p = arcPt(145, a); return `<text x="${p[0]}" y="${p[1] + 12}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${col}" stroke="#fff" stroke-width="6" paint-order="stroke">${txt}</text>`; };
    let pab = inNeck(human("f11p", "pablo"), "f11p", hat("f11p", C));
    const ndPts = [[1520, 240], [1580, 250], [1650, 262], [1720, 270], [1790, 276]];
    const ndPts2 = [[1500, 240], [1580, 252], [1660, 262], [1740, 270], [1830, 276]];
    k.nd2 = smooth(ndPts2);
    return {
      k,
      css: `
        #f11-title { left:80px; top:60px; font-size:76px; }
        #f11-title2 { left:80px; top:60px; font-size:76px; }
        #root .f11-sub { left:84px; top:150px; font-size:34px; color:${C.pain}; }
        #f11-stamp { left:300px; top:230px; font-size:84px; color:${C.pain}; border:9px solid ${C.pain}; border-radius:18px; padding:4px 26px; rotate:-10deg; background:rgba(255,255,255,0.85); }
        #f11-bub { left:1440px; top:120px; width:430px; height:280px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- transferidor -->
      <g id="f11-prot" opacity="0">
        <path d="M${arcPt(206, 0)} A206 206 0 0 0 ${arcPt(206, 90)} L${hip} Z" fill="#fff" fill-opacity="0.75" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path id="f11-band" d="${band(110, 200, 30, 70)}" fill="${C.pain}" opacity="0.55"/>
        ${ticks}
        ${lab(30, "30°", C.pain)}${lab(70, "70°", C.pain)}
        <line id="f11-needle" x1="${hip[0]}" y1="${hip[1]}" x2="${hip[0] + 230}" y2="${hip[1]}" stroke="${C.pain}" stroke-width="7" stroke-dasharray="14 10" stroke-linecap="round"/>
      </g>
      <g id="f11-p-wrap"><g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g></g>
      <!-- maca -->
      <rect x="250" y="600" width="760" height="44" rx="14" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="644" width="26" height="230" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="930" y="644" width="26" height="230" fill="#9AA7AD" stroke="${C.ink}" stroke-width="6"/>
      <rect x="290" y="568" width="150" height="40" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
      <g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f11z", "ze")}</g>
      <path id="f11-nv-glow" d="${k.nv0}" fill="none" stroke="${C.pain}" stroke-width="26" stroke-linecap="round" opacity="0"/>
      <path id="f11-nv" d="${k.nv0}" fill="none" stroke="${C.nerve}" stroke-width="10" stroke-linecap="round" stroke-dasharray="4 0" opacity="0"/>
    </svg>
    <div id="f11-title" class="abs title" style="opacity:0">TESTE DE LASÈGUE</div>
    <div id="f11-sub1" class="abs label f11-sub" style="opacity:0">elevação da perna esticada</div>
    <div id="f11-title2" class="abs title" style="opacity:0">TESTE DE BRAGARD</div>
    <div id="f11-sub2" class="abs label f11-sub" style="opacity:0">baixa um pouco + pé para cima</div>
    <div id="f11-stamp" class="abs title" style="opacity:0">POSITIVO</div>
    <svg id="f11-bub" class="abs" viewBox="1440 120 430 280" style="opacity:0">
      <path d="M1460 140 Q1460 128 1472 128 L1850 128 Q1862 128 1862 140 L1862 370 Q1862 382 1850 382 L1560 382 L1500 420 L1520 382 L1472 382 Q1460 382 1460 370 Z" fill="#FFF6C8" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
      <g transform="translate(0,40)">${nerve("f11n", ndPts, 26, 0.9)}</g>
      <circle cx="1560" cy="290" r="20" fill="${C.skinA}" stroke="${C.ink}" stroke-width="5"/><circle cx="1800" cy="316" r="20" fill="${C.skinA}" stroke="${C.ink}" stroke-width="5"/>
      <text x="1660" y="372" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">puxa... e estica!</text>
    </svg>`,
      js: function (tl, K, R) {
        const z = "f11z", p = "f11p";
        // Seu Zé deitado de barriga para cima
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4, hipF: 0, knF: 0, anF: 0, hipB: 0, knB: 0, anB: 0 });
        R.setPose(tl, p, 0, { ...K.ik0, shB: 8, elB: -20 });
        R.blinks(tl, z, 0.2, K.dur);
        R.blinks(tl, p, 0.6, K.dur);
        R.fadeIn(tl, "#f11-p-wrap", 0, 0.3);
        // títulos
        tl.set("#f11-title", { opacity: 1 }, K.las - 0.1);
        tl.fromTo("#f11-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.las - 0.1);
        R.rise(tl, "#f11-sub1", K.las + 0.3, 0.35);
        R.fadeIn(tl, "#f11-prot", K.lev - 0.2, 0.3);
        // eleva a perna esticada até 50°
        const up0 = K.lev, up1 = K.entre + 0.2;
        const mid = (up0 + up1) / 2;
        R.pose(tl, z, up0, mid - up0, { hipF: -25 }, "sine.in");
        R.pose(tl, p, up0, mid - up0, K.ik25, "sine.in");
        R.pose(tl, z, mid, up1 - mid, { hipF: -50 }, "sine.out");
        R.pose(tl, p, mid, up1 - mid, K.ik50, "sine.out");
        tl.to("#f11-needle", { rotation: -50, svgOrigin: `${K.hip[0]} ${K.hip[1]}`, duration: up1 - up0, ease: "sine.inOut" }, up0);
        // nervo esticando e reclamando
        tl.set("#f11-nv", { opacity: 1 }, up0);
        tl.to("#f11-nv, #f11-nv-glow", { attr: { d: K.nv50 }, duration: up1 - up0, ease: "sine.inOut" }, up0);
        tl.to("#f11-band", { opacity: 0.95, duration: 0.15, yoyo: true, repeat: 5 }, K.graus);
        R.face(tl, z, K.dor - 0.1, { eyes: "pain", mouth: "scream" });
        tl.fromTo("#f11-nv-glow", { opacity: 0 }, { opacity: 0.6, duration: 0.12, yoyo: true, repeat: 7 }, K.dor);
        tl.to("#f11-nv", { attr: { stroke: "#FF5A4E" }, duration: 0.2 }, K.dor);
        R.shake(tl, "#f11z-head", K.dor, 0.6, 4);
        tl.set("#f11-stamp", { opacity: 1 }, K.pos);
        tl.fromTo("#f11-stamp", { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power4.in" }, K.pos);
        R.face(tl, p, K.pos + 0.2, { eyes: "wide" });
        // o nervo fala
        R.pop(tl, "#f11-bub", K.n0 - 0.35, 0.35, 0.4);
        R.face(tl, "f11n", K.n0 - 0.35, { eyes: "pain" });
        R.nerveTo(tl, "f11n", K.n0 - 0.1, 0.5, K.nd2, "power3.out");
        R.shake(tl, "#f11n-face", K.n0 + 0.4, 1.2, 4);
        tl.to("#f11-bub", { scale: 0, opacity: 0, transformOrigin: "60% 80%", duration: 0.25, ease: "back.in(2)" }, K.n1 + 0.15);
        // Bragard: baixa um pouco (dor alivia) e puxa o pé para cima
        R.fadeOut(tl, "#f11-stamp, #f11-title, #f11-sub1", K.conf - 0.1, 0.25);
        tl.set("#f11-title2", { opacity: 1 }, K.conf);
        tl.fromTo("#f11-title2", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.conf);
        R.rise(tl, "#f11-sub2", K.conf + 0.3, 0.35);
        R.face(tl, z, K.baixo, { eyes: "normal", mouth: "flat" });
        tl.to("#f11-nv", { attr: { stroke: "#FFD54A" }, duration: 0.2 }, K.baixo);
        R.pose(tl, z, K.baixo, 0.5, { hipF: -40 });
        R.pose(tl, p, K.baixo, 0.5, K.ik40);
        tl.to("#f11-needle", { rotation: -40, svgOrigin: `${K.hip[0]} ${K.hip[1]}`, duration: 0.5, ease: "power2.inOut" }, K.baixo);
        tl.to("#f11-nv, #f11-nv-glow", { attr: { d: K.nv40 }, duration: 0.5 }, K.baixo);
        // dorsiflexão: a outra mão empurra a ponta do pé
        R.pose(tl, p, K.puxo - 0.2, 0.35, { shB: -95, elB: -35 });
        R.pose(tl, z, K.puxo, 0.3, { anF: -28 }, "back.out(2)");
        R.face(tl, z, K.puxo + 0.25, { eyes: "pain", mouth: "scream" });
        tl.to("#f11-nv", { attr: { stroke: "#FF5A4E" }, duration: 0.15 }, K.puxo + 0.2);
        tl.fromTo("#f11-nv-glow", { opacity: 0 }, { opacity: 0.6, duration: 0.12, yoyo: true, repeat: 5, immediateRender: false }, K.puxo + 0.2);
        R.shake(tl, "#f11z-head", K.puxo + 0.25, 0.5, 4);
        R.face(tl, p, K.brag, { eyes: "happy" });
      },
      sfx: [
        { name: "whoosh-short", t: k.las - 0.1, vol: 0.4 },
        { name: "riser", t: k.lev, vol: 0.25, dur: k.entre + 0.2 - k.lev },
        { name: "error", t: k.dor, vol: 0.35 },
        { name: "impact-bass-2", t: k.pos + 0.22, vol: 0.5 },
        { name: "pop", t: k.n0 - 0.35, vol: 0.45 },
        { name: "whoosh-short", t: k.conf, vol: 0.35 },
        { name: "click", t: k.puxo + 0.05, vol: 0.5 },
      ],
    };
  },
};
