// F3 — Título SÍNDROME DO IMPACTO + "a dor no ombro de quem levanta o braço"; Dr. Pablo girando o braço; Vértebra imita com o bracinho
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      imp: w(0, "impacto"), comum: w(0, "comum"), verd: w(0, "verdade"), inv: w(0, "investigar"), exe: w(0, "exercícios"), tempo: w(0, "tempo"),
      v0: lines[1].start, v1: lines[1].end, nem: w(1, "nem"), quero: w(1, "quero"),
    };
    const t1 = "SÍNDROME", t2 = "DO IMPACTO";
    const letters = (s, off) => s.split("").map((c, i) => c === " " ? `<span class="c">&nbsp;</span>` : `<span class="c" id="f03-c${off + i}">${c}</span>`).join("");
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${100 + i * 215}px;top:600px;width:190px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="62" fill="${color}" ${st}/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:4px">${label}</div></div>`;
    return {
      k,
      css: `
        #f03-title { left:90px; top:110px; font-size:130px; line-height:1.0; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-title .l2 { color:${C.pain}; }
        #f03-sub { left:100px; top:400px; padding:12px 26px; font-size:42px; color:#fff; background:${C.ink}; border-radius:18px; transform: rotate(-2deg); }
        #f03-sub b { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1450" cy="560" r="340" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-arc" opacity="0"><path d="M1300 300 A120 120 0 1 1 1300 540" fill="none" stroke="${C.sun}" stroke-width="10" stroke-dasharray="20 16" stroke-linecap="round"/><path d="M1300 540 L1326 520 M1300 540 L1324 562" stroke="${C.sun}" stroke-width="10" stroke-linecap="round"/></g>
      <g id="f03-p-wrap"><g transform="translate(1300,660) scale(1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1680,880) scale(1.05)">${vertebra("f03v")}</g></g>
    </svg>
    <div id="f03-title" class="abs title"><div>${letters(t1, 0)}</div><div class="l2">${letters(t2, t1.length)}</div></div>
    <div id="f03-sub" class="abs title" style="opacity:0">a dor no ombro de quem <b>levanta o braço</b></div>
    ${icon(0, "O que é", `<rect x="-28" y="-36" width="56" height="72" rx="8" fill="#fff" ${st}/><path d="M-14 -16 L14 -16 M-14 0 L14 0 M-14 16 L6 16" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="24" fill="#fff" ${st}/><path d="M10 10 L32 32" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-38 0 L38 0" ${st} stroke-width="10"/><rect x="-44" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Quanto tempo", `<circle r="34" fill="#fff" ${st}/><path d="M0 0 L0 -22 M0 0 L16 8" ${st}/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.035 }, 0);
        const p = "f03p", v = "f03v";
        R.setPose(tl, p, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.5, K.dur);
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        R.pop(tl, "#f03-sub", K.imp - 0.1, 0.45);
        // gira o braço (círculos completos)
        R.fadeIn(tl, "#f03-arc", K.imp + 0.3);
        tl.to("#f03p-shF", { rotation: "-=360", svgOrigin: "0 0", duration: 0.9, ease: "power1.inOut", repeat: 1 }, K.imp + 0.3);
        R.fadeOut(tl, "#f03-arc", K.imp + 2.2);
        R.face(tl, p, K.imp + 0.3, { eyes: "happy", mouth: "grin" });
        [K.verd, K.inv, K.exe, K.tempo].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.pose(tl, p, K.tempo, 0.35, { shF: -150, elF: -20 }, "back.out(2)");
        // Vértebra imita com o bracinho curto
        tl.fromTo("#f03-v-wrap", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.7);
        R.face(tl, v, K.v0 - 0.7, { eyes: "normal", mouth: "smile" });
        R.pose(tl, p, K.v0 - 0.3, 0.3, { shF: 10, elF: -10 });
        R.face(tl, p, K.v0, { eyes: "normal", mouth: "smile" });
        tl.to("#f03v-armF", { rotation: "-=360", svgOrigin: "0 0", duration: 0.6, ease: "power1.inOut", repeat: 1 }, K.v0);
        R.face(tl, v, K.nem, { eyes: "wide", mouth: "flat" });
        R.pose(tl, v, K.quero - 0.1, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, v, K.quero, { eyes: "happy", mouth: "grin" });
        tl.to("#f03-v-wrap", { y: -40, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, K.quero);
        tl.to("#f03-title, #f03-sub, #f03-ic0, #f03-ic1, #f03-ic2, #f03-ic3", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.imp - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.imp + 0.3, vol: 0.3 },
        ...[k.verd, k.inv, k.exe, k.tempo].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "whoosh-short", t: k.v0 - 0.7, vol: 0.4 },
        { name: "sparkle", t: k.quero, vol: 0.3 },
      ],
    };
  },
};
