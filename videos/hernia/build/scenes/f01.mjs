// F1 — Vinheta: a logo real se monta em 3 partes (símbolo, QUIROPRAXIA, DR. PABLO ANDRADE)
export default {
  minDur: 7,
  build({ C, logo }) {
    const src = logo(true);
    const img = (id, clip) => `<img id="${id}" class="abs logo-part" src="${src}" style="clip-path:${clip}" />`;
    return {
      bg: C.ink,
      css: `
        #f01-stage { position:absolute; left:210px; top:290px; width:1500px; height:441px; }
        #root .logo-part { left:0; top:0; width:1500px; height:441px; }
        #f01-ring { position:absolute; left:-120px; top:-200px; width:620px; height:620px; border-radius:50%; border:10px solid ${C.good}; }
        #f01-tag { position:absolute; left:0; right:0; top:800px; text-align:center; color:${C.cream}; font-size:44px; }
        #f01-tag b { color:${C.sun}; }
        #f01-burst line { stroke:${C.sun}; stroke-width:10; stroke-linecap:round; }
      `,
      html: `
    <svg class="abs" id="f01-bgdots" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 233) % 1920}" cy="${(i * 397) % 1080}" r="${6 + (i % 4) * 4}" fill="#0B5566"/>`).join("")}
    </svg>
    <div id="f01-stage">
      <div id="f01-ring"></div>
      <div id="f01-sym-wrap" class="abs" style="left:0;top:0;width:1500px;height:441px">${img("f01-sym", "inset(0 75.5% 0 0)")}</div>
      ${img("f01-title", "inset(0 0 39% 24.5%)")}
      ${img("f01-name", "inset(62% 0 0 24.5%)")}
      <svg id="f01-burst" class="abs" style="left:-60px;top:-80px" width="500" height="500" viewBox="-250 -250 500 500">
        ${Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<line x1="${Math.cos(a) * 170}" y1="${Math.sin(a) * 170}" x2="${Math.cos(a) * 225}" y2="${Math.sin(a) * 225}"/>`; }).join("")}
      </svg>
    </div>
    <div id="f01-tag" class="label">Patologias explicadas do jeito <b>mais divertido</b> da internet</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f01-bgdots", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
        tl.fromTo("#f01-ring", { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.9, duration: 0.6, ease: "back.out(1.8)" }, 0.2);
        tl.to("#f01-ring", { scale: 1.6, opacity: 0, duration: 0.7, ease: "power2.out" }, 1.4);
        // símbolo: sobe, gira e "pula"
        tl.fromTo("#f01-sym-wrap", { y: 420, rotation: -30, opacity: 0, transformOrigin: "16% 60%" }, { y: 0, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(1.6)" }, 0.35);
        tl.to("#f01-sym-wrap", { y: -60, duration: 0.25, ease: "power2.out" }, 1.15);
        tl.to("#f01-sym-wrap", { y: 0, duration: 0.3, ease: "bounce.out" }, 1.4);
        R.squash(tl, "#f01-sym-wrap", 1.62, "16% 95%");
        tl.fromTo("#f01-burst line", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.02, ease: "back.out(2)" }, 1.62);
        tl.to("#f01-burst", { opacity: 0, duration: 0.4 }, 2.2);
        // QUIROPRAXIA entra com wipe da esquerda para a direita
        tl.fromTo("#f01-title", { clipPath: "inset(0 75.5% 39% 24.5%)" }, { clipPath: "inset(0 0% 39% 24.5%)", duration: 1.0, ease: "steps(11)" }, 2.0);
        tl.fromTo("#f01-title", { y: 0 }, { y: -8, duration: 0.1, yoyo: true, repeat: 9, ease: "none" }, 2.0);
        // DR. PABLO ANDRADE sobe
        tl.fromTo("#f01-name", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 3.2);
        R.rise(tl, "#f01-tag", 4.0, 0.6, 30);
        // saída: tudo encolhe para o centro
        tl.to("#f01-stage, #f01-tag", { scale: 0.92, opacity: 0, duration: 0.4, ease: "power2.in" }, K.dur - 0.45);
      },
      sfx: [
        { name: "whoosh", t: 0.35, vol: 0.55 },
        { name: "pop", t: 1.62, vol: 0.7 },
        { name: "typing", t: 2.0, vol: 0.35, dur: 1.0 },
        { name: "impact-bass-1", t: 3.2, vol: 0.6 },
        { name: "sparkle", t: 4.0, vol: 0.4 },
      ],
    };
  },
};
