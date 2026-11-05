// F3 — Título CIATALGIA + Dr. Pablo e a Vértebra se apresentam + os 4 blocos
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      eu: w(0, "Eu"), ass: w(0, "assunto"), q: w(0, "que", 1), inv: w(0, "investigar"), ex: w(0, "exercícios"), ch: w(0, "chances"),
      v0: lines[1].start, v1: lines[1].end, verg: w(1, "vergonha"),
    };
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${150 + i * 230}px;top:600px;width:200px;text-align:center;opacity:0">
        <svg width="150" height="150" viewBox="-75 -75 150 150"><circle r="66" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
        <div class="label" style="font-size:30px;margin-top:6px">${label}</div></div>`;
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f03-title { left:120px; top:150px; font-size:170px; color:${C.ink}; }
        #f03-title .c { display:inline-block; }
        #f03-sub { left:130px; top:360px; font-size:52px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1450" cy="520" r="360" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1420,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1700,880) scale(0.95)">${vertebra("f03v")}</g></g>
    </svg>
    <div id="f03-title" class="abs title">${"CIATALGIA".split("").map((c, i) => `<span class="c" id="f03-c${i}">${c}</span>`).join("")}</div>
    <div id="f03-sub" class="abs label" style="opacity:0">a dor que desce pela perna</div>
    ${icon(0, "O que é", `<rect x="-30" y="-40" width="60" height="80" rx="8" fill="#fff" ${st}/><path d="M-16 -18 L16 -18 M-16 0 L16 0 M-16 18 L6 18" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="26" fill="#fff" ${st}/><path d="M12 12 L36 36" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-46" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Melhora", `<path d="M-38 30 L-12 4 L6 18 L38 -26" fill="none" ${st} stroke-width="10"/><path d="M18 -28 L40 -28 L40 -6" fill="none" ${st} stroke-width="8"/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        // título cai letra por letra e quica
        tl.fromTo("#f03-title .c", { y: -420, opacity: 1 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.05 }, 0);
        R.rise(tl, "#f03-sub", 0.9, 0.4);
        // Dr. Pablo entra pela direita acenando
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        // passos
        for (let i = 0; i < 4; i++) {
          const t = 0.1 + i * 0.2;
          R.pose(tl, p, t, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        }
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        // aceno
        R.pose(tl, p, K.eu - 0.1, 0.3, { shF: -160, elF: -30 }, "back.out(2)");
        for (let i = 0; i < 3; i++) R.pose(tl, p, K.eu + 0.2 + i * 0.3, 0.15, { elF: i % 2 ? -30 : 10 }, "sine.inOut");
        R.pose(tl, p, K.ass, 0.4, { shF: -40, elF: -50 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.0, K.dur, 1.5);
        // ícones dos blocos entram quando citados
        [K.q, K.inv, K.ex, K.ch].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.gesture(tl, p, K.inv - 0.2, K.v0 - 0.2, 3);
        // Vértebra pula para dentro
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: -120, duration: 0.35, ease: "power2.out" }, K.v0 - 0.45);
        tl.to("#f03-v-wrap", { y: 0, duration: 0.3, ease: "power2.in" }, K.v0 - 0.1);
        R.squash(tl, "#f03v-root", K.v0 + 0.2);
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.pose(tl, v, K.v0 + 0.3, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, v, K.verg, { eyes: "happy" });
        R.pose(tl, v, K.v1 + 0.1, 0.4, { armF: 20, armB: -20 });
        R.face(tl, p, K.v0 + 0.3, { eyes: "happy" });
        // saída
        tl.to("#f03-title, #f03-sub", { y: -40, opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        ...Array.from({ length: 9 }, (_, i) => ({ name: "pop", t: 0.45 + i * 0.05, vol: 0.12 })).filter((_, i) => i % 3 === 0),
        { name: "whoosh", t: 0.1, vol: 0.4 },
        ...[k.q, k.inv, k.ex, k.ch].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.4 })),
        { name: "whoosh-short", t: k.v0 - 0.45, vol: 0.45 },
        { name: "pop", t: k.v0 + 0.2, vol: 0.5 },
      ],
    };
  },
};
