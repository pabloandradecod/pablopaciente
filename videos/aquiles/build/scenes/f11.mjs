// F11 — As pistas: quadro de cortiça com 5 perguntas ligadas à foto do tornozelo do Dr. Pablo; a Vértebra detetive aponta
// Acessórios de detetive para a Vértebra (chapéu enorme e lupa na mão da frente)
const hatSvg = (id, C, op = 1) => `<g id="${id}-hat" opacity="${op}"><g transform="translate(-6,-72) scale(1.3)">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g></g>`;
const lupaSvg = (id, C, op = 1) => `<g id="${id}-lupa" opacity="${op}"><g transform="translate(0,52)">
  <line x1="0" y1="0" x2="0" y2="40" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/>
  <line x1="0" y1="0" x2="0" y2="40" stroke="#7A4E2A" stroke-width="10" stroke-linecap="round"/>
  <circle cx="0" cy="72" r="32" fill="#D6F4FA" stroke="${C.ink}" stroke-width="9"/>
  <path d="M-14 58 Q-4 48 8 52" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</g></g>`;
/** Vértebra detetive: chapéu dentro do corpo, lupa no braço da frente. */
function vDet(vertebra, id, C, { hat = 1, lupa = 1 } = {}) {
  let s = vertebra(id);
  s = s.replace(`<g id="${id}-armF">`, `<g id="${id}-armF">${lupaSvg(id, C, lupa)}`);
  const last = s.lastIndexOf("</g>");
  const bodyEnd = s.lastIndexOf("</g>", last - 1);
  return s.slice(0, bodyEnd) + hatSvg(id, C, hat) + s.slice(bodyEnd);
}

export default {
  tail: 2.0,
  build(ctx) {
    const { C, vertebra, w, lines } = ctx;
    const k = {
      a: w(0, "rígido"), b: w(0, "Melhora"), c: w(0, "Aumentou"), d: w(0, "estalo"), e: w(0, "antibiótico"),
      essas: +(lines[0].end + 0.25).toFixed(3),
    };
    const cards = [
      { x: 680, y: 140, r: -3, c: "#FFF6C8", t: "Dói e fica <b>RÍGIDO</b> nos primeiros passos da manhã?" },
      { x: 1490, y: 140, r: 3, c: "#DFF3F7", t: "<b>MELHORA</b> quando esquenta e volta depois?" },
      { x: 680, y: 370, r: 2, c: "#E6F7EC", t: "Aumentou o <b>TREINO</b> ou as <b>LADEIRAS</b>?" },
      { x: 1490, y: 370, r: -2, c: "#FFE0D8", t: "Teve um <b>ESTALO</b>, como um chute atrás da perna?" },
      { x: 680, y: 590, r: 1, c: "#F1E8FF", t: "Tomou <b>ANTIBIÓTICO</b> ou <b>CORTICOIDE</b> há pouco?" },
    ];
    const pins = [[850, 158], [1660, 158], [850, 388], [1660, 388], [850, 608]];
    const tgt = [[1262, 392], [1268, 400], [1256, 404], [1250, 380], [1258, 410]];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #root .f11-card { position:absolute; width:340px; height:200px; padding:34px 22px 16px; border:6px solid ${C.ink}; border-radius:8px;
          box-shadow: 8px 8px 0 rgba(1,62,76,0.35); font-size:33px; line-height:1.12; text-align:center; }
        #root .f11-card b { color:${C.pain}; }
        #f11-stamp { left:700px; top:150px; width:1100px; padding:22px 30px; text-align:center; font-size:52px; color:#fff; background:${C.pain};
          border:8px solid ${C.ink}; border-radius:24px; box-shadow:10px 10px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="100" width="1250" height="720" rx="22" fill="#C8955C" stroke="${C.ink}" stroke-width="8"/>
      <rect x="648" y="128" width="1194" height="664" rx="10" fill="#D9A86C"/>
      <!-- foto: tornozelo do Dr. Pablo, de lado -->
      <g transform="translate(1290,370) rotate(-2) scale(0.8)">
        <rect x="-120" y="-190" width="240" height="380" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect x="-100" y="-170" width="200" height="300" fill="#EAF6F8"/>
        <path d="M-30 -170 L30 -170 L32 40 L-34 40 Z" fill="${C.skinA}" ${st}/>
        <path d="M-34 30 Q-58 40 -56 80 L-50 104 L84 104 Q92 84 70 72 L32 52 L30 30 Z" fill="${C.skinA}" ${st}/>
        <path d="M-40 -60 Q-46 0 -50 70" fill="none" stroke="#F2E8D8" stroke-width="16" stroke-linecap="round"/>
        <path d="M-40 -60 Q-46 0 -50 70" fill="none" stroke="${C.ink}" stroke-width="3" stroke-dasharray="8 6" opacity="0.6"/>
        <g id="f11-pain"><circle cx="-44" cy="30" r="26" fill="${C.pain}" opacity="0.45"/><circle cx="-44" cy="30" r="11" fill="${C.pain}"/></g>
        <text x="0" y="168" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">DR. PABLO</text><text x="-90" y="-118" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">atrás do tornozelo</text>
      </g>
      ${pins.map((p, i) => `<path id="f11-s${i}" d="M${p[0]} ${p[1]} Q${(p[0] + tgt[i][0]) / 2} ${(p[1] + tgt[i][1]) / 2 + 40} ${tgt[i][0]} ${tgt[i][1]}" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round" opacity="0"/>`).join("")}
      ${tgt.map((p, i) => `<circle id="f11-lp${i}" cx="${p[0]}" cy="${p[1]}" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" opacity="0"/>`).join("")}
      <g id="f11-v-wrap"><g transform="translate(320,880) scale(1.25)">${vDet(vertebra, "f11v", C)}</g></g>
    </svg>
    ${cards.map((c, i) => `<div id="f11-c${i}" class="f11-card label" style="left:${c.x}px;top:${c.y}px;background:${c.c};rotate:${c.r}deg;opacity:0">
      <svg style="position:absolute;left:153px;top:-6px" width="34" height="34" viewBox="-17 -17 34 34"><circle r="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></svg>
      ${c.t}</div>`).join("")}
    <div id="f11-stamp" class="abs title" style="opacity:0">CADA RESPOSTA = UMA PISTA</div>`,
      js: function (tl, K, R) {
        const v = "f11v";
        R.setPose(tl, v, 0, { armF: -60, armB: 20 });
        R.face(tl, v, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, v, 0.3, K.dur);
        R.fadeIn(tl, "#f11-v-wrap", 0, 0.3);
        tl.fromTo("#f11-pain circle", { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1.2, duration: 0.35, yoyo: true, repeat: 3 }, K.a);
        const t0 = [K.a - 0.6, K.b, K.c, K.d, K.e];
        t0.forEach((t, i) => {
          tl.fromTo(`#f11-c${i}`, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, t - 0.15);
          tl.set(`#f11-s${i}`, { opacity: 1 }, t + 0.2);
          R.draw(tl, `#f11-s${i}`, t + 0.2, 0.45);
          R.pop(tl, `#f11-lp${i}`, t + 0.6, 0.3);
          R.pose(tl, v, t - 0.2, 0.35, { armF: i % 2 ? -140 : -110 }, "back.out(1.6)");
          tl.to("#f11-v-wrap", { y: -30, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, t - 0.2);
        });
        R.shake(tl, "#f11-c3", K.d + 0.6, 0.3, 5);
        R.shake(tl, "#f11-c4", K.e + 0.6, 0.3, 5);
        R.face(tl, v, K.d, { eyes: "wide", mouth: "open" });
        R.face(tl, v, K.d + 0.8, { eyes: "normal", mouth: "smile" });
        tl.to("#f11-c0, #f11-c1, #f11-c2", { opacity: 0.3, duration: 0.3 }, K.essas - 0.2);
        tl.fromTo("#f11-stamp", { scale: 2, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in" }, K.essas);
        R.shake(tl, "#f11-stamp", K.essas + 0.32, 0.25, 6);
        R.face(tl, v, K.essas + 0.4, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, K.essas, 0.4, { armF: -160, armB: 150 }, "back.out(2)");
      },
      sfx: [
        ...[k.a - 0.6, k.b, k.c, k.d, k.e].map((t) => ({ name: "click-soft", t: t + 0.05, vol: 0.5 })),
        { name: "impact-bass-1", t: k.essas + 0.3, vol: 0.45 },
      ],
    };
  },
};
