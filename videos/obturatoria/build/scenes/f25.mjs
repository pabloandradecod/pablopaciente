// F25 — Cartela do bloco 4: "E AGORA, DOUTOR?" (bola de cristal que vira gráfico)
export default {
  minDur: 2.8,
  build(ctx) {
    const { C } = ctx;
    return {
      bg: C.ink,
      css: `
        #f25-t { left:0; right:0; top:330px; text-align:center; color:${C.cream}; font-size:120px; }
        #f25-t span { color:${C.sun}; }
        #f25-n { left:0; right:0; top:220px; text-align:center; color:${C.good}; font-size:60px; }
      `,
      html: `
    <div id="f25-wipe" class="abs" style="left:0;top:0;width:1920px;height:1080px;background:${C.good}"></div>
    <div id="f25-n" class="abs title">BLOCO 4</div>
    <div id="f25-t" class="abs title">E AGORA, <span>DOUTOR?</span></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g transform="translate(960,700)">
        <path d="M-90 110 L90 110 L64 70 L-64 70 Z" fill="#B07A4A" stroke="${C.cream}" stroke-width="7" stroke-linejoin="round"/>
        <g id="f25-ball"><circle cx="0" cy="0" r="92" fill="#8E6CD8" stroke="${C.cream}" stroke-width="8"/>
          <circle cx="-34" cy="-36" r="18" fill="#fff" opacity="0.6"/><circle cx="26" cy="20" r="8" fill="#fff" opacity="0.5"/></g>
        <g id="f25-graph" opacity="0">
          <circle cx="0" cy="0" r="92" fill="#fff" stroke="${C.cream}" stroke-width="8"/>
          <path id="f25-line" d="M-58 40 L-22 10 L4 24 L54 -40" fill="none" stroke="${C.good}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M30 -42 L56 -42 L56 -16" fill="none" stroke="${C.good}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </svg>`,
      js: function (tl, K, R) {
        tl.fromTo("#f25-wipe", { x: -1920 }, { x: 0, duration: 0.3, ease: "power3.in" }, 0);
        tl.to("#f25-wipe", { x: 1920, duration: 0.35, ease: "power3.out" }, 0.3);
        R.rise(tl, "#f25-n", 0.45, 0.4);
        R.pop(tl, "#f25-t", 0.55, 0.5, 0.4);
        R.pop(tl, "#f25-ball", 0.7, 0.45);
        tl.to("#f25-ball", { rotation: 20, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.2);
        tl.to("#f25-ball", { opacity: 0, duration: 0.2 }, 1.8);
        tl.to("#f25-graph", { opacity: 1, duration: 0.2 }, 1.8);
        R.draw(tl, "#f25-line", 1.85, 0.5);
      },
      sfx: [{ name: "whoosh", t: 0.05, vol: 0.5 }, { name: "sparkle", t: 1.8, vol: 0.45 }],
    };
  },
};
