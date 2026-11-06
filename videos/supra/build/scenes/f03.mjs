// F3 — Título TENDINOPATIA DO SUPRAESPINHAL + "o tendão pequeno com trabalho gigante"; lembrança do episódio do impacto; lupa dá zoom no ombro e o Supra acena; Vértebra
export default {
  speakers: { vertebra: "f03v", supra: "f03s" },
  build(ctx) {
    const { C, supra, vertebra, w, lines } = ctx;
    const k = {
      sup: w(0, "supraespinhal"), sofre: w(0, "sofre"), lembra: w(0, "Lembra"), imp: w(0, "impacto"), fam: w(0, "família"), zoom: w(0, "zoom"),
      v0: lines[1].start, v1: lines[1].end, famoso: w(1, "famoso"),
    };
    const t1 = "TENDINOPATIA DO", t2 = "SUPRAESPINHAL";
    const letters = (s, off) => s.split("").map((c, i) => c === " " ? `<span class="c">&nbsp;</span>` : `<span class="c" id="f03-c${off + i}">${c}</span>`).join("");
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${100 + i * 215}px;top:620px;width:190px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="62" fill="${color}" ${st}/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:4px">${label}</div></div>`;
    return {
      k,
      css: `
        #f03-title { left:90px; top:100px; font-size:118px; line-height:1.0; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-title .l2 { color:${C.pain}; }
        #f03-sub { left:100px; top:380px; padding:12px 26px; font-size:42px; color:#fff; background:${C.ink}; border-radius:18px; transform: rotate(-2deg); }
        #f03-sub b { color:${C.sun}; }
        #f03-prev { left:1260px; top:420px; width:520px; padding:18px 20px; text-align:center; transform: rotate(3deg); }
        #f03-prev .a { font-size:28px; } #f03-prev .b { font-size:46px; color:${C.pain}; line-height:1.05; margin-top:6px; }
        #f03-fam { left:1290px; top:640px; padding:10px 22px; font-size:34px; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- lupa com zoom no ombro -->
      <g id="f03-mag" opacity="0">
        <path d="M1380 650 L1250 840" stroke="${C.ink}" stroke-width="44" stroke-linecap="round"/><path d="M1380 650 L1250 840" stroke="#8B5A2B" stroke-width="28" stroke-linecap="round"/>
        <clipPath id="f03-clip"><circle cx="1500" cy="420" r="250"/></clipPath>
        <circle cx="1500" cy="420" r="262" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
        <g clip-path="url(#f03-clip)">
          <rect x="1240" y="160" width="520" height="520" fill="#FFE4DC"/>
          <circle cx="1530" cy="560" r="130" fill="${C.bone}" stroke="${C.ink}" stroke-width="7"/>
          <path d="M1240 300 Q1400 330 1560 420" stroke="#E0675A" stroke-width="44" fill="none" stroke-linecap="round"/>
          <g id="f03-s-wrap"><g transform="translate(1480,440) scale(0.62)">${supra("f03s")}</g></g>
        </g>
        <circle cx="1500" cy="420" r="262" fill="none" stroke="#fff" stroke-width="8" opacity="0.6" stroke-dasharray="40 600"/>
      </g>
      <g id="f03-v-wrap" opacity="0"><g transform="translate(1720,880) scale(0.95)">${vertebra("f03v")}</g></g>
    </svg>
    <div id="f03-title" class="abs title"><div>${letters(t1, 0)}</div><div class="l2">${letters(t2, t1.length)}</div></div>
    <div id="f03-sub" class="abs title" style="opacity:0">o tendão <b>pequeno</b> com trabalho <b>gigante</b></div>
    <div id="f03-prev" class="abs card" style="opacity:0"><div class="a label">episódio anterior</div><div class="b title">SÍNDROME DO IMPACTO</div></div>
    <div id="f03-fam" class="abs card title" style="opacity:0">mesma família!</div>
    ${icon(0, "O que é", `<rect x="-28" y="-36" width="56" height="72" rx="8" fill="#fff" ${st}/><path d="M-14 -16 L14 -16 M-14 0 L14 0 M-14 16 L6 16" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="24" fill="#fff" ${st}/><path d="M10 10 L32 32" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-38 0 L38 0" ${st} stroke-width="10"/><rect x="-44" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Quanto tempo", `<circle r="34" fill="#fff" ${st}/><path d="M0 0 L0 -22 M0 0 L16 8" ${st}/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.03 }, 0);
        R.pop(tl, "#f03-sub", K.sup + 0.2, 0.45);
        // ícones dos blocos
        [0, 1, 2, 3].forEach((i) => R.pop(tl, `#f03-ic${i}`, K.sup + 0.8 + i * 0.25, 0.4));
        tl.to("#f03-ic3", { y: -12, duration: 0.15, yoyo: true, repeat: 1 }, K.sofre);
        // lembrança do episódio do impacto
        R.pop(tl, "#f03-prev", K.lembra - 0.1, 0.45);
        tl.to("#f03-prev", { rotation: -3, duration: 0.2, yoyo: true, repeat: 1 }, K.imp);
        R.pop(tl, "#f03-fam", K.fam - 0.1, 0.4);
        R.fadeOut(tl, "#f03-prev, #f03-fam", K.zoom - 0.5);
        // lupa: zoom no ombro e o Supra acena
        tl.set("#f03-mag", { opacity: 1 }, K.zoom - 0.3);
        tl.fromTo("#f03-mag", { scale: 0.2, svgOrigin: "1500 420" }, { scale: 1, svgOrigin: "1500 420", duration: 0.55, ease: "back.out(1.6)" }, K.zoom - 0.3);
        R.setPose(tl, "f03s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f03s", K.zoom, { eyes: "happy", mouth: "grin" });
        for (let i = 0; i < 4; i++) R.pose(tl, "f03s", K.zoom + 0.3 + i * 0.3, 0.15, { armF: i % 2 ? -120 : -160 }, "sine.inOut");
        R.blinks(tl, "f03s", K.zoom, K.dur, "happy");
        // Vértebra
        tl.set("#f03-v-wrap", { opacity: 1 }, K.v0 - 0.6);
        tl.fromTo("#f03-v-wrap", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.6);
        R.face(tl, "f03v", K.v0 - 0.6, { eyes: "wide", mouth: "open" });
        R.pose(tl, "f03v", K.v0, 0.3, { armF: -120 }, "back.out(2)");
        R.face(tl, "f03v", K.famoso, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f03s", K.famoso, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f03-s-wrap", { y: -20, duration: 0.15, yoyo: true, repeat: 1 }, K.famoso);
        tl.to("#f03-title, #f03-sub, #f03-ic0, #f03-ic1, #f03-ic2, #f03-ic3", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.sup + 0.2, vol: 0.35 },
        { name: "pop", t: k.lembra - 0.1, vol: 0.35 },
        { name: "pop", t: k.fam - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.zoom - 0.3, vol: 0.4 },
        { name: "whoosh-short", t: k.v0 - 0.6, vol: 0.35 },
        { name: "sparkle", t: k.famoso, vol: 0.3 },
      ],
    };
  },
};
