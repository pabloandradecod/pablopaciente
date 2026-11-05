// F10 — Cartela do bloco 2: Dr. Pablo vira detetive; no quadro, cartaz de PROCURADO do Piriforme
const inNeck = (svg, id, extra) => {
  const i = svg.indexOf(`<g transform="translate(4,-138)"><g id="${id}-shF">`);
  const j = svg.lastIndexOf("</g></g>", i);
  return svg.slice(0, j) + extra + svg.slice(j);
};
const inHand = (svg, id, extra) => svg.replace(`<g id="${id}-handF">`, `<g id="${id}-handF">${extra}`);
const hat = (id, C) => `<g id="${id}-hat" opacity="0">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g>`;
const lupa = (id, C) => `<g id="${id}-lupa" opacity="0">
  <line x1="0" y1="0" x2="0" y2="40" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/>
  <line x1="0" y1="0" x2="0" y2="40" stroke="#7A4E2A" stroke-width="10" stroke-linecap="round"/>
  <circle cx="0" cy="72" r="32" fill="#D6F4FA" stroke="${C.ink}" stroke-width="9"/>
  <path d="M-14 58 Q-4 48 8 52" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</g>`;

export default {
  speakers: { pablo: "f11p" },
  lead: 1.0,
  tail: 1.3,
  build(ctx) {
    const { C, human, geleia, w } = ctx;
    const k = { modo: w(0, "Modo"), det: w(0, "detetive"), lig: w(0, "ligado"), susp: w(0, "fugitiva"), pir: w(0, "gelatina") };
    let pab = human("f11p", "pablo");
    pab = inNeck(pab, "f11p", hat("f11p", C));
    pab = inHand(pab, "f11p", lupa("f11p", C));
    const note = (x, y, r, c) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-70" y="-50" width="140" height="100" fill="${c}" stroke="${C.ink}" stroke-width="5"/><path d="M-50 -20 L50 -20 M-50 0 L40 0 M-50 20 L20 20" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" opacity="0.5"/><circle cx="0" cy="-42" r="9" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>`;
    return {
      k,
      bg: C.ink,
      css: `
        #f11-badge { left:110px; top:90px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:8px solid ${C.cream};
          font-size:96px; line-height:134px; text-align:center; color:${C.ink}; }
        #f11-kick { left:290px; top:96px; font-size:40px; color:${C.sun}; letter-spacing:0.12em; }
        #f11-title { left:285px; top:140px; font-size:118px; color:${C.cream}; }
        #f11-title span { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 22 }, (_, i) => `<circle cx="${(i * 271) % 1920}" cy="${(i * 419) % 1080}" r="${5 + (i % 4) * 4}" fill="#0B5566"/>`).join("")}
      <g id="f11-board">
        <rect x="1000" y="300" width="800" height="520" rx="22" fill="#C8955C" stroke="${C.cream}" stroke-width="10"/>
        <rect x="1030" y="330" width="740" height="460" rx="10" fill="#D9A86C"/>
        ${note(1140, 420, -6, "#FFF6C8")}${note(1660, 410, 5, "#DFF3F7")}${note(1180, 690, 4, "#FFE0D8")}${note(1640, 690, -5, "#E6F7EC")}
        <g transform="translate(1400,555) rotate(-3)"><g id="f11-poster">
          <rect x="-125" y="-200" width="250" height="400" fill="#FFF3D6" stroke="${C.ink}" stroke-width="6"/>
          <text x="0" y="-150" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="38" fill="${C.ink}">PROCURADO</text>
          <rect x="-100" y="-128" width="200" height="230" fill="#DFF4FB" stroke="${C.ink}" stroke-width="5"/>
          <g transform="translate(0,70) scale(1.25)">${geleia("f11m")}</g>
          <text x="0" y="146" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.pain}">GELEIA</text>
          <text x="0" y="182" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">fugitiva do disco</text>
          <circle cx="0" cy="-192" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/>
        </g></g>
        <path id="f11-str" d="M1140 378 L1400 444 L1660 368 M1180 648 L1400 444 L1640 648" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>
        <g id="f11-q"><text x="1770" y="420" font-family="Montserrat" font-weight="900" font-size="150" fill="${C.sun}" stroke="${C.ink}" stroke-width="6" paint-order="stroke">?</text></g>
      </g>
      <rect x="0" y="880" width="1920" height="200" fill="#0A4D5C"/>
      <g id="f11-p-wrap"><g transform="translate(640,650) scale(1.2)">${pab}</g></g>
    </svg>
    <div id="f11-badge" class="abs title">2</div>
    <div id="f11-kick" class="abs label">BLOCO 2 · RACIOCÍNIO CLÍNICO</div>
    <div id="f11-title" class="abs title" style="opacity:0">MODO <span>DETETIVE</span></div>`,
      js: function (tl, K, R) {
        const p = "f11p";
        R.pop(tl, "#f11-badge", 0.0, 0.45);
        R.slideIn(tl, "#f11-kick", 0.15, 0.45, -200);
            tl.fromTo("#f11-board", { x: 900 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        R.draw(tl, "#f11-str", 0.7, 0.9);
        tl.fromTo("#f11-q", { scale: 0, svgOrigin: "1810 370" }, { scale: 1, svgOrigin: "1810 370", duration: 0.4, ease: "back.out(2.5)" }, 1.3);
        // Pablo entra pela esquerda, sem chapéu e com a lupa escondida
        R.setPose(tl, p, 0, { shF: 10, elF: -10, shB: 8, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f11-p-wrap", { x: -800 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.05);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.05 + i * 0.2, 0.2, { hipF: i % 2 ? 22 : -22, hipB: i % 2 ? -22 : 22, knB: i % 2 ? 0 : 18, knF: i % 2 ? 18 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.85, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.1, K.dur, 1.5);
        // MODO DETETIVE: chapéu cai na cabeça, lupa aparece
        R.pose(tl, p, K.modo - 0.2, 0.3, { shB: 10, elB: -10 });
        tl.set("#f11p-hat", { opacity: 1 }, K.modo - 0.1);
        tl.fromTo("#f11p-hat", { y: -420 }, { y: 0, duration: 0.45, ease: "bounce.out" }, K.modo - 0.1);
        R.squash(tl, "#f11p-head", K.modo + 0.2, "50% 100%");
        R.face(tl, p, K.modo + 0.25, { eyes: "wide" });
        tl.set("#f11p-lupa", { opacity: 1 }, K.det);
        R.pop(tl, "#f11p-lupa", K.det, 0.35);
        R.pose(tl, p, K.det, 0.4, { shF: -110, elF: -40 }, "back.out(1.8)");
        R.face(tl, p, K.det + 0.5, { eyes: "happy" });
        tl.set("#f11-title", { opacity: 1 }, K.det - 0.1);
        tl.fromTo("#f11-title", { scale: 2.2, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "power4.in" }, K.det - 0.1);
        R.shake(tl, "#f11-title", K.det + 0.25, 0.25, 6);
        // a fugitiva: cartaz da Geleia pula
        R.face(tl, "f11m", 0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f11-poster", { scale: 1 }, { scale: 1.12, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, K.susp);
        R.pose(tl, p, K.susp - 0.1, 0.35, { shF: -95, elF: -55 });
        R.face(tl, "f11m", K.pir, { eyes: "wide", mouth: "scream" });
        R.shake(tl, "#f11m-body", K.pir, 0.5, 4);
        R.pose(tl, p, K.pir + 0.2, 0.35, { shF: -115, elF: -30 });
        R.face(tl, p, K.pir, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.45 },
        { name: "pop", t: 1.35, vol: 0.4 },
        { name: "whoosh-short", t: k.modo - 0.1, vol: 0.4 },
        { name: "pop", t: k.modo + 0.2, vol: 0.5 },
        { name: "impact-bass-1", t: k.det + 0.22, vol: 0.5 },
        { name: "pop", t: k.pir, vol: 0.4 },
      ],
    };
  },
};
