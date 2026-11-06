// F3 — Título PATA DE GANSO + "tendinopatia e bursite da pata de ganso", pegada carimbada; Dr. Pablo; Vértebra com patinho de borracha
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      ass: w(0, "assunto"), tend: w(0, "tendinopatia"), burs: w(0, "bursite"), engr: w(0, "engraçado"), seria: w(0, "séria"), comum: w(0, "comum"),
      que: w(0, "que", 1), inv: w(0, "investigar"), exe: w(0, "exercícios"), chan: w(0, "chances"),
      v0: lines[1].start, v1: lines[1].end, rec: w(1, "receita"),
    };
    const t1 = "PATA DE GANSO";
    const letters = (s) => s.split("").map((c, i) => `<span class="c" id="f03-c${i}">${c === " " ? "&nbsp;" : c}</span>`).join("");
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${110 + i * 215}px;top:600px;width:190px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="62" fill="${color}" ${st}/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:4px">${label}</div></div>`;
    const print = `<g id="f03-print"><path d="M0 0 L-70 -60 M0 0 L0 -84 M0 0 L70 -60" stroke="#FF9F1C" stroke-width="26" stroke-linecap="round"/><path d="M-70 -60 Q0 -110 70 -60 L0 10 Z" fill="#FF9F1C" opacity="0.85"/></g>`;
    return {
      k,
      css: `
        #f03-title { left:100px; top:120px; font-size:150px; line-height:1.05; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-sub { left:110px; top:330px; padding:12px 26px; font-size:40px; color:#fff; background:${C.ink}; border-radius:18px; transform: rotate(-2deg); }
        #f03-sub b { color:${C.sun}; }
        #f03-tag { left:110px; top:430px; padding:10px 22px; font-size:34px; }
        #f03-tag b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1560" cy="540" r="330" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(1290,250)"><g id="f03-stamp" opacity="0">${print}</g></g>
      <g id="f03-p-wrap"><g transform="translate(1660,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1250,880) scale(1.0)">${vertebra("f03v")}
        <g id="f03-duck" opacity="0"><g transform="translate(70,-60)"><ellipse cx="0" cy="0" rx="40" ry="28" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/><circle cx="26" cy="-30" r="20" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/><path d="M42 -32 L62 -26 L42 -20Z" fill="#FF9F1C" stroke="${C.ink}" stroke-width="3"/><circle cx="30" cy="-36" r="4" fill="${C.ink}"/></g></g>
      </g></g>
    </svg>
    <div id="f03-title" class="abs title">${letters(t1)}</div>
    <div id="f03-sub" class="abs title" style="opacity:0"><b>tendinopatia</b> e <b>bursite</b> da pata de ganso</div>
    <div id="f03-tag" class="abs card label" style="opacity:0">nome engraçado... coisa <b>séria</b> e muito comum</div>
    ${icon(0, "O que é", `<rect x="-28" y="-36" width="56" height="72" rx="8" fill="#fff" ${st}/><path d="M-14 -16 L14 -16 M-14 0 L14 0 M-14 16 L6 16" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="24" fill="#fff" ${st}/><path d="M10 10 L32 32" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-38 0 L38 0" ${st} stroke-width="10"/><rect x="-44" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Melhora", `<path d="M-36 28 L-12 4 L6 18 L36 -24" fill="none" ${st} stroke-width="10"/><path d="M16 -26 L38 -26 L38 -4" fill="none" ${st} stroke-width="8"/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.04 }, 0);
        // pegada carimbada
        tl.set("#f03-stamp", { opacity: 1 }, 0.95);
        tl.fromTo("#f03-stamp", { scale: 2.4, rotation: -30, svgOrigin: "1290 220" }, { scale: 1, rotation: -12, svgOrigin: "1290 220", duration: 0.3, ease: "power4.in" }, 0.95);
        R.shake(tl, "#f03-title", 1.25, 0.2, 5);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.9, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.pose(tl, p, K.ass - 0.1, 0.3, { shF: -160, elF: -30 }, "back.out(2)");
        R.pose(tl, p, K.tend, 0.4, { shF: -50, elF: -60 });
        R.pop(tl, "#f03-sub", K.tend - 0.2, 0.45);
        R.pop(tl, "#f03-tag", K.engr - 0.1, 0.4);
        R.face(tl, p, K.engr, { eyes: "happy" });
        tl.to("#f03-tag", { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, K.seria);
        R.face(tl, p, K.seria, { eyes: "normal" });
        R.fadeOut(tl, "#f03-tag", K.que - 0.3);
        [K.que, K.inv, K.exe, K.chan].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.gesture(tl, p, K.que, K.v0 - 0.3, 5);
        // Vértebra com patinho de borracha
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.6);
        R.face(tl, v, K.v0 - 0.6, { eyes: "normal", mouth: "smile" });
        tl.set("#f03-duck", { opacity: 1 }, K.v0 - 0.2);
        R.pose(tl, v, K.v0 - 0.2, 0.3, { armF: -100 }, "back.out(2)");
        R.face(tl, v, K.rec - 0.2, { eyes: "happy", mouth: "grin" });
        tl.to("#f03-duck", { y: -30, duration: 0.15, yoyo: true, repeat: 3 }, K.rec);
        R.face(tl, p, K.v0 + 0.3, { eyes: "happy" });
        tl.to("#f03-title, #f03-sub, #f03-stamp", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "impact-bass-1", t: 1.25, vol: 0.4 },
        { name: "pop", t: k.tend - 0.2, vol: 0.35 },
        ...[k.que, k.inv, k.exe, k.chan].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "click-soft", t: k.rec, vol: 0.4 },
      ],
    };
  },
};
