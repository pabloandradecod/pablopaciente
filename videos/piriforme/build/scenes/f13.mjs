// F13 — Teste FAIR: deitado de lado (visto de cima), quadril ~60° + joelho dobrado, joelho levado para dentro;
// bolha: o Piriforme estica e aperta o nervo; dor na nádega = positivo
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
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
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
  speakers: { pablo: "f13p", nervo: "f13n" },
  gaps: [0.35],
  build(ctx) {
    const { C, human, nerve, piriforme, smooth, w, lines } = ctx;
    const k = {
      fair: w(0, "FAIR"), flex: w(0, "flexão"), adu: w(0, "adução"), rot: w(0, "rotação"), int: w(0, "interna"),
      pac: w(0, "paciente"), lado: w(0, "lado"), dobro: w(0, "dobro"), levo: w(0, "levo"), dentro: w(0, "dentro"),
      estica: w(0, "estica"), repro: w(0, "reproduz"), nad: w(0, "nádega"), pos: w(0, "positivo"),
      n0: lines[1].start, n1: lines[1].end,
    };
    // Seu Zé deitado de lado, visto de cima: quadril H, root -90 (cabeça à esquerda, frente para cima)
    const H = [760, 612], sz = 1.1;
    const W = (v) => { const r = rot(v, -90); return [H[0] + sz * r[0], H[1] + sz * r[1]]; };
    const knee = W(add([8, 0], rot([0, 88], -60)));
    const ankle = W(add(add([8, 0], rot([0, 88], -60)), rot([0, 90], 30)));
    const butt = W([-40, 4]);
    const P = [958, 700], sp = 1.2;
    k.ikRest = { shF: -15, elF: -25 };
    k.ikKnee = armIK(P, sp, [knee[0] + 6, knee[1] - 8]);
    k.ikPush = armIK(P, sp, [knee[0] + 2, knee[1] + 10]);
    k.butt = butt;
    const pab = inNeck(human("f13p", "pablo"), "f13p", hat("f13p", C));
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    // bolha
    const nPts = [[1360, 470], [1440, 470], [1520, 470], [1600, 470], [1680, 470], [1760, 470]];
    const nSq = [[1360, 470], [1440, 470], [1520, 482], [1600, 482], [1680, 470], [1760, 470]];
    k.sq = smooth(nSq);
    const letters = [["F", "flexão"], ["A", "adução"], ["I", "rotação"], ["R", "interna"]];
    return {
      k,
      css: `
        #f13-title { left:80px; top:56px; font-size:76px; }
        #f13-title span { color:${C.pain}; }
        #root .f13-L { position:absolute; top:150px; width:150px; text-align:center; }
        #root .f13-L b { display:block; font-family:"Montserrat"; font-weight:900; font-size:96px; line-height:1; color:${C.ink}; }
        #root .f13-L i { display:block; font-style:normal; font-family:"Nunito"; font-weight:900; font-size:26px; color:${C.pain}; }
        #f13-side { left:240px; top:760px; padding:8px 20px; font-size:30px; }
        #f13-stamp { left:60px; top:300px; font-size:66px; color:${C.pain}; border:9px solid ${C.pain}; border-radius:18px; padding:4px 26px; rotate:-10deg; background:rgba(255,255,255,0.88); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- maca vista de cima -->
      <rect x="300" y="500" width="880" height="230" rx="30" fill="#7FB8C4" stroke="${C.ink}" stroke-width="7"/>
      <rect x="320" y="540" width="130" height="150" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
      <g id="f13-p-wrap"><g transform="translate(${P[0]},${P[1]}) scale(${-sp},${sp})">${pab}</g></g>
      <g transform="translate(${H[0]},${H[1]}) scale(${sz})">${human("f13z", "ze")}</g>
      <g id="f13-ang" opacity="0">
        <path d="M${H[0]} ${H[1] - 8} L${H[0] + 150} ${H[1] - 8}" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/>
        <path d="M${H[0] + 110} ${H[1] - 8} A110 110 0 0 0 ${H[0] + 110 * Math.cos(rad(60))} ${H[1] - 8 - 110 * Math.sin(rad(60))}" fill="none" stroke="${C.pain}" stroke-width="7"/>
        <text x="${H[0] + 120}" y="${H[1] - 50}" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.pain}" stroke="#fff" stroke-width="6" paint-order="stroke">60°</text>
      </g>
      <g id="f13-arA" opacity="0">
        <path d="M${knee[0] - 50} ${knee[1] - 70} Q${knee[0] - 80} ${knee[1] - 10} ${knee[0] - 30} ${knee[1] + 20}" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${knee[0] - 52} ${knee[1] + 8} L${knee[0] - 28} ${knee[1] + 22} L${knee[0] - 30} ${knee[1] - 6}" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="${knee[0] - 330}" y="${knee[1] - 130}" width="270" height="52" rx="14" fill="#fff" ${st(5)}/>
        <text x="${knee[0] - 195}" y="${knee[1] - 94}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">joelho para dentro</text>
      </g>
      <g id="f13-arR" opacity="0">
        <path d="M${ankle[0] + 40} ${ankle[1] + 40} Q${ankle[0] + 80} ${ankle[1]} ${ankle[0] + 60} ${ankle[1] - 50}" fill="none" stroke="${C.purple}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${ankle[0] + 40} ${ankle[1] - 40} L${ankle[0] + 60} ${ankle[1] - 54} L${ankle[0] + 76} ${ankle[1] - 32}" fill="none" stroke="${C.purple}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="${ankle[0] + 40}" y="${ankle[1] + 50}" width="290" height="52" rx="14" fill="#fff" ${st(5)}/>
        <text x="${ankle[0] + 175}" y="${ankle[1] + 86}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">pé sobe (rot. interna)</text>
      </g>
      <g id="f13-glow" opacity="0"><circle cx="${butt[0]}" cy="${butt[1]}" r="40" fill="${C.pain}" opacity="0.45"/><circle cx="${butt[0]}" cy="${butt[1]}" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- bolha: piriforme esticando -->
      <g id="f13-bubble" opacity="0">
        <clipPath id="f13-clip"><circle cx="1560" cy="470" r="250"/></clipPath>
        <circle cx="1560" cy="470" r="262" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f13-clip)">
          <rect x="1300" y="210" width="520" height="520" fill="#FFE4DC"/>
          <g transform="translate(1560,550) scale(0.95)"><g id="f13-mst">${piriforme("f13m")}</g></g>
          ${nerve("f13n", nPts, 32)}
          <g id="f13-hug"><path d="M1480 455 Q1560 535 1640 455" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/><path d="M1480 455 Q1560 535 1640 455" fill="none" stroke="#F2766B" stroke-width="26" stroke-linecap="round"/></g>
        </g>
        <path d="M1340 640 L1240 720 L1380 680" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
        <text x="1560" y="780" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">o piriforme estica e aperta</text>
      </g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">TESTE <span>FAIR</span></div>
    ${letters.map(([L, word], i) => `<div id="f13-L${i}" class="f13-L" style="left:${520 + i * 160}px;opacity:0"><b>${L}</b><i>${word}</i></div>`).join("")}
    <div id="f13-side" class="abs card label" style="opacity:0">deitado de lado · lado bom embaixo · visto de cima</div>
    <div id="f13-stamp" class="abs title" style="opacity:0">POSITIVO</div>`,
      js: function (tl, K, R) {
        const z = "f13z", p = "f13p";
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: -4, shF: -30, elF: -40, shB: -10, elB: -20, hipF: -10, knF: 10, anF: 0, hipB: -20, knB: 30, anB: 0 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "flat" });
        R.setPose(tl, p, 0, { ...K.ikRest, shB: 8, elB: -20 });
        R.blinks(tl, z, 0.3, K.dur);
        R.blinks(tl, p, 0.6, K.dur);
        tl.set("#f13-title", { opacity: 1 }, K.fair - 0.2);
        tl.fromTo("#f13-title", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, K.fair - 0.2);
        [K.flex, K.adu, K.rot, K.int].forEach((t, i) => R.pop(tl, `#f13-L${i}`, t - 0.1, 0.4));
        R.pop(tl, "#f13-side", K.lado - 0.2, 0.4);
        // dobra quadril (~60°) e joelho, mão no joelho
        R.pose(tl, z, K.dobro, 0.7, { hipF: -60, knF: 90 });
        R.pose(tl, p, K.dobro, 0.7, K.ikKnee);
        R.fadeIn(tl, "#f13-ang", K.dobro + 0.5, 0.3);
        tl.to("#f13-L0", { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1 }, K.dobro + 0.2);
        // leva a perna para dentro: adução + rotação interna
        R.fadeOut(tl, "#f13-ang", K.levo - 0.2, 0.2);
        R.pose(tl, p, K.levo, 0.4, K.ikPush, "power2.inOut");
        R.fadeIn(tl, "#f13-arA", K.levo, 0.3);
        tl.to("#f13-L1", { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1 }, K.levo);
        R.fadeIn(tl, "#f13-arR", K.dentro, 0.3);
        tl.to("#f13-L2, #f13-L3", { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1 }, K.dentro);
        R.face(tl, z, K.dentro, { eyes: "wide", mouth: "flat" });
        // bolha: piriforme estica
        R.pop(tl, "#f13-bubble", K.estica - 0.35, 0.45, 0.3);
        R.face(tl, "f13m", K.estica - 0.35, { eyes: "wide", mouth: "grin" });
        R.face(tl, "f13n", K.estica - 0.35, { eyes: "wide" });
        tl.set("#f13m-armF, #f13m-armB", { opacity: 0 }, 0);
        tl.to("#f13-mst", { scaleX: 1.3, scaleY: 0.86, svgOrigin: "0 -150", duration: 0.5, ease: "back.out(2)" }, K.estica);
        tl.to("#f13-hug", { scaleY: 1.3, svgOrigin: "1560 455", duration: 0.4, ease: "power3.in" }, K.estica + 0.2);
        R.nerveTo(tl, "f13n", K.estica + 0.2, 0.4, K.sq);
        R.face(tl, "f13n", K.estica + 0.5, { eyes: "pain" });
        // dor na nádega
        tl.set("#f13-glow", { opacity: 1 }, K.repro);
        tl.fromTo("#f13-glow", { scale: 0.5 }, { scale: 1.25, svgOrigin: `${K.butt[0]} ${K.butt[1]}`, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.repro);
        R.face(tl, z, K.nad - 0.1, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f13z-head", K.nad, 0.5, 4);
        tl.set("#f13-stamp", { opacity: 1 }, K.pos);
        tl.fromTo("#f13-stamp", { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power4.in" }, K.pos);
        R.face(tl, p, K.pos + 0.2, { eyes: "happy" });
        // o nervo reclama
        R.shake(tl, "#f13n-face", K.n0, K.n1 - K.n0, 5);
        tl.to("#f13-bubble", { scale: 0, opacity: 0, svgOrigin: "1560 470", duration: 0.3, ease: "back.in(2)" }, K.n1 + 0.2);
      },
      sfx: [
        { name: "whoosh-short", t: k.fair - 0.2, vol: 0.4 },
        ...[k.flex, k.adu, k.rot, k.int].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "whoosh-short", t: k.dobro, vol: 0.35 },
        { name: "pop", t: k.estica - 0.3, vol: 0.4 },
        { name: "error", t: k.nad, vol: 0.3 },
        { name: "impact-bass-2", t: k.pos + 0.22, vol: 0.45 },
      ],
    };
  },
};
