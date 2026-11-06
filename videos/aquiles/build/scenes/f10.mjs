// F10 — Cartela do bloco 2: a Vértebra vira a detetive (chapéu enorme do Dr. Pablo e lupa); cartaz de PROCURADO de um tênis de corrida
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
  speakers: { pablo: "f10p", vertebra: "f10v" },
  lead: 1.0,
  tail: 1.3,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = { modo: w(0, "Modo"), det: w(0, "detetive"), det2: w(0, "detetive", 1), vert: w(0, "Vértebra"), v0: lines[1].start, v1: lines[1].end, elem: w(1, "Elementar") };
    const note = (x, y, r, c) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-70" y="-50" width="140" height="100" fill="${c}" stroke="${C.ink}" stroke-width="5"/><path d="M-50 -20 L50 -20 M-50 0 L40 0 M-50 20 L20 20" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" opacity="0.5"/><circle cx="0" cy="-42" r="9" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>`;
    const shoe = `<path d="M-80 20 Q-84 -10 -60 -16 L-20 -24 L10 -50 Q30 -60 44 -44 L60 -10 Q86 -4 88 14 L88 24 L-80 24 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-80 24 L88 24 L88 34 Q0 44 -80 34 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M0 -36 L22 -20 M10 -46 L32 -30" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M-50 2 Q-10 -6 40 6" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
    return {
      k,
      bg: C.ink,
      css: `
        #f10-badge { left:110px; top:90px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:8px solid ${C.cream};
          font-size:96px; line-height:134px; text-align:center; color:${C.ink}; }
        #f10-kick { left:290px; top:96px; font-size:40px; color:${C.sun}; letter-spacing:0.12em; }
        #f10-title { left:285px; top:140px; font-size:118px; color:${C.cream}; }
        #f10-title span { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 22 }, (_, i) => `<circle cx="${(i * 271) % 1920}" cy="${(i * 419) % 1080}" r="${5 + (i % 4) * 4}" fill="#0B5566"/>`).join("")}
      <g id="f10-board">
        <rect x="1000" y="300" width="800" height="520" rx="22" fill="#C8955C" stroke="${C.cream}" stroke-width="10"/>
        <rect x="1030" y="330" width="740" height="460" rx="10" fill="#D9A86C"/>
        ${note(1140, 420, -6, "#FFF6C8")}${note(1660, 410, 5, "#DFF3F7")}${note(1180, 690, 4, "#FFE0D8")}${note(1640, 690, -5, "#E6F7EC")}
        <g transform="translate(1400,555) rotate(-3)"><g id="f10-poster">
          <rect x="-125" y="-200" width="250" height="400" fill="#FFF3D6" stroke="${C.ink}" stroke-width="6"/>
          <text x="0" y="-150" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="38" fill="${C.ink}">PROCURADO</text>
          <rect x="-100" y="-128" width="200" height="200" fill="#DFF4FB" stroke="${C.ink}" stroke-width="5"/>
          <g transform="translate(0,-20) rotate(-8) scale(0.95)">${shoe}</g>
          <text x="0" y="104" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="${C.pain}">TÊNIS VELOZ</text>
          <text x="0" y="136" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">cúmplice: as ladeiras</text>
          <g id="f10-stamp"><rect x="-108" y="152" width="216" height="34" rx="6" fill="${C.pain}" transform="rotate(-6 0 169)"/><text x="0" y="178" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="20" fill="#fff" transform="rotate(-6 0 169)">SUSPEITO Nº 1</text></g>
          <circle cx="0" cy="-192" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/>
        </g></g>
        <path id="f10-str" d="M1140 378 L1400 364 L1660 368 M1180 648 L1400 364 L1640 648" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>
        <g id="f10-q"><text x="1770" y="420" font-family="Montserrat" font-weight="900" font-size="150" fill="${C.sun}" stroke="${C.ink}" stroke-width="6" paint-order="stroke">?</text></g>
      </g>
      <rect x="0" y="880" width="1920" height="200" fill="#0A4D5C"/>
      <g id="f10-p-wrap"><g transform="translate(330,650) scale(1.15)">${human("f10p", "pablo")}</g></g>
      <g id="f10-v-wrap"><g transform="translate(720,880) scale(1.2)">${vDet(vertebra, "f10v", C, { hat: 0, lupa: 0 })}</g></g>
    </svg>
    <div id="f10-badge" class="abs title">2</div>
    <div id="f10-kick" class="abs label">BLOCO 2 · RACIOCÍNIO CLÍNICO</div>
    <div id="f10-title" class="abs title" style="opacity:0">MODO <span>DETETIVE</span></div>`,
      js: function (tl, K, R) {
        const p = "f10p", v = "f10v";
        R.pop(tl, "#f10-badge", 0.0, 0.45);
        R.slideIn(tl, "#f10-kick", 0.15, 0.45, -200);
        tl.fromTo("#f10-board", { x: 900 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        R.draw(tl, "#f10-str", 0.7, 0.9);
        tl.fromTo("#f10-q", { scale: 0, svgOrigin: "1810 370" }, { scale: 1, svgOrigin: "1810 370", duration: 0.4, ease: "back.out(2.5)" }, 1.3);
        // Pablo à esquerda; a Vértebra entra pulando
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 8, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.4, K.dur);
        R.idle(tl, p, 0.5, K.dur, 1.5);
        R.setPose(tl, v, 0, { armF: 0, armB: 0 });
        R.face(tl, v, 0, { eyes: "happy", mouth: "smile" });
        tl.fromTo("#f10-v-wrap", { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, 0.2);
        R.blinks(tl, v, 0.8, K.dur, "normal");
        // MODO DETETIVE
        tl.set("#f10-title", { opacity: 1 }, K.det - 0.1);
        tl.fromTo("#f10-title", { scale: 2.2, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "power4.in" }, K.det - 0.1);
        R.shake(tl, "#f10-title", K.det + 0.25, 0.25, 6);
        // Pablo "passa" o chapéu: ele cai enorme na Vértebra
        R.pose(tl, p, K.det2 - 0.4, 0.3, { shF: -140, elF: -20 }, "back.out(2)");
        R.face(tl, p, K.det2 - 0.4, { eyes: "happy", mouth: "grin" });
        tl.set("#f10v-hat", { opacity: 1 }, K.det2 - 0.1);
        tl.fromTo("#f10v-hat", { y: -500 }, { y: 0, duration: 0.5, ease: "bounce.out" }, K.det2 - 0.1);
        R.squash(tl, "#f10v-body", K.det2 + 0.3, "50% 100%");
        R.face(tl, v, K.det2 + 0.3, { eyes: "wide", mouth: "open" });
        R.pose(tl, p, K.vert + 0.2, 0.3, { shF: 10, elF: -20 });
        // Elementar: lupa aparece
        tl.set("#f10v-lupa", { opacity: 1 }, K.v0 - 0.2);
        R.pop(tl, "#f10v-lupa", K.v0 - 0.2, 0.35);
        R.pose(tl, v, K.v0 - 0.2, 0.4, { armF: -130 }, "back.out(1.8)");
        R.pose(tl, v, K.v0 - 0.2, 0.4, { armB: 40 });
        R.face(tl, v, K.v0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f10-poster", { scale: 1 }, { scale: 1.12, svgOrigin: "1400 555", duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, K.elem + 0.3);
        tl.fromTo("#f10-stamp", { scale: 2.5, opacity: 0, svgOrigin: "1400 724" }, { scale: 1, opacity: 1, svgOrigin: "1400 724", duration: 0.3, ease: "power4.in" }, K.v1 - 0.2);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.45 },
        { name: "pop", t: 1.35, vol: 0.4 },
        { name: "impact-bass-1", t: k.det + 0.22, vol: 0.5 },
        { name: "whoosh-short", t: k.det2 - 0.1, vol: 0.4 },
        { name: "pop", t: k.det2 + 0.3, vol: 0.5 },
        { name: "sparkle", t: k.v0 - 0.2, vol: 0.35 },
        { name: "impact-bass-1", t: k.v1 - 0.1, vol: 0.4 },
      ],
    };
  },
};
