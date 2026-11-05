// F4 — Cartela do bloco 1: "1. O QUE É?" com estetoscópio girando
export default {
  minDur: 2.6,
  build({ C }) {
    const st = `stroke="${C.cream}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k: {},
      bg: C.cream,
      css: `
        #f04-num { left:0; right:0; top:330px; text-align:center; font-size:200px; color:${C.cream}; }
        #f04-txt { left:0; right:0; top:560px; text-align:center; font-size:120px; color:${C.cream}; }
        #f04-txt span { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle id="f04-wipe" cx="960" cy="540" r="1150" fill="${C.ink}"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle class="f04-dot" cx="${(i * 311 + 90) % 1920}" cy="${(i * 457 + 60) % 1080}" r="${8 + (i % 3) * 6}" fill="#0B5566"/>`).join("")}
      <g transform="translate(1490,330)"><g id="f04-steth">
        <path d="M-60 -70 Q-70 30 0 40 Q70 30 60 -70" fill="none" ${st}/>
        <circle cx="-60" cy="-78" r="12" fill="${C.sun}" ${st} stroke-width="6"/><circle cx="60" cy="-78" r="12" fill="${C.sun}" ${st} stroke-width="6"/>
        <path d="M0 40 L0 110 Q0 170 60 170" fill="none" ${st}/>
        <circle cx="86" cy="170" r="32" fill="${C.good}" ${st} stroke-width="7"/><circle cx="86" cy="170" r="14" fill="#fff" stroke="${C.cream}" stroke-width="5"/>
      </g></g>
    </svg>
    <div id="f04-num" class="abs title">1.</div>
    <div id="f04-txt" class="abs title">O QUE <span>É?</span></div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f04-wipe", { attr: { r: 0 } }, { attr: { r: 1150 }, duration: 0.45, ease: "power3.out" }, 0);
        tl.fromTo(".f04-dot", { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.02 }, 0.2);
        tl.fromTo("#f04-num", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.4)" }, 0.25);
        R.rise(tl, "#f04-txt", 0.45, 0.45, 60);
        tl.fromTo("#f04-steth", { rotation: -200, scale: 0, svgOrigin: "0 40" }, { rotation: 0, scale: 1, svgOrigin: "0 40", duration: 0.8, ease: "back.out(1.6)" }, 0.35);
        tl.to("#f04-steth", { rotation: 14, svgOrigin: "0 40", duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3 }, 1.15);
        tl.to("#f04-num, #f04-txt", { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.5);
        tl.to("#f04-num, #f04-txt, #f04-steth", { opacity: 0, duration: 0.25, ease: "power2.in" }, K.dur - 0.3);
      },
      sfx: [
        { name: "whoosh", t: 0.02, vol: 0.5 },
        { name: "pop", t: 0.3, vol: 0.5 },
      ],
    };
  },
};
