// F28 — Tela final: logo + 2 espaços para vídeos recomendados (end screen do YouTube)
export default {
  minDur: 9,
  build(ctx) {
    const { C, logo } = ctx;
    const slot = (i, x) => `<div id="f29-s${i}" class="abs f29-slot" style="left:${x}px;top:460px"><div class="f29-in label">vídeo recomendado</div></div>`;
    return {
      bg: C.ink,
      css: `
        #f29-logo { left:510px; top:70px; width:900px; height:265px; }
        #f29-lab { left:0; right:0; top:375px; text-align:center; color:${C.sun}; font-size:44px; }
        #root .f29-slot { width:640px; height:360px; border:7px dashed ${C.cream}; border-radius:26px; background:rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; }
        #root .f29-in { color:${C.cream}; opacity:0.55; font-size:34px; }
        #f29-thanks { left:0; right:0; top:880px; text-align:center; color:${C.cream}; font-size:40px; }
        #f29-thanks b { color:${C.good}; }
      `,
      html: `
    <svg class="abs" id="f29-dots" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 233) % 1920}" cy="${(i * 397) % 1080}" r="${6 + (i % 4) * 4}" fill="#0B5566"/>`).join("")}
    </svg>
    <img id="f29-logo" class="abs" src="${logo(true)}" />
    <div id="f29-lab" class="abs title">ASSISTA TAMBÉM</div>
    ${slot(0, 250)}${slot(1, 1030)}
    <div id="f29-thanks" class="abs label">Valeu por assistir! <b>Até o próximo episódio.</b></div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f29-dots", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
        tl.fromTo("#f29-logo", { y: -60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" }, 0.1);
        R.rise(tl, "#f29-lab", 0.5, 0.45);
        R.pop(tl, "#f29-s0", 0.7, 0.5, 0.6);
        R.pop(tl, "#f29-s1", 0.85, 0.5, 0.6);
        R.rise(tl, "#f29-thanks", 1.3, 0.5, 30);
        tl.to("#f29-logo", { scale: 1.03, duration: 1.5, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 50%" }, 1.5);
        tl.to("#f29-logo, #f29-lab, #f29-thanks, .f29-slot, #f29-dots", { opacity: 0, duration: 0.5, ease: "power2.in" }, K.dur - 0.6);
      },
      sfx: [{ name: "whoosh", t: 0.1, vol: 0.4 }, { name: "pop", t: 0.7, vol: 0.35 }, { name: "pop", t: 0.85, vol: 0.35 }, { name: "sparkle", t: 1.3, vol: 0.35 }],
    };
  },
};
