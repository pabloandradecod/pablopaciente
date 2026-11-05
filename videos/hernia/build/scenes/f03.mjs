// F3 — Título HÉRNIA DE DISCO, Dr. Pablo apresenta, Vértebra de óculos escuros ("episódio meu, regras minhas")
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      ass: w(0, "assunto"), hern: w(0, "hérnia"), q: w(0, "que"), inv: w(0, "investiga"), ex: w(0, "exercícios"), ch: w(0, "chances"),
      spo: w(0, "Spoiler"), oti: w(0, "ótimas"),
      v0: lines[1].start, v1: lines[1].end, reg: w(1, "regras"), pan: w(1, "pânico"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${120 + i * 225}px;top:560px;width:200px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-75 -75 150 150"><circle r="66" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
        <div class="label" style="font-size:30px;margin-top:6px">${label}</div></div>`;
    const title = "HÉRNIA DE DISCO";
    return {
      k,
      css: `
        #f03-title { left:110px; top:150px; font-size:132px; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-sub { left:118px; top:325px; font-size:54px; color:${C.pain}; }
        #f03-spo { left:150px; top:810px; padding:14px 30px; font-size:46px; color:${C.ink}; transform: rotate(-3deg); background:${C.good}; }
        #f03-pan { left:1240px; top:150px; padding:14px 26px; font-size:40px; transform: rotate(4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1480" cy="520" r="360" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1560,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1250,880) scale(1.05)">${vertebra("f03v")}
        <g id="f03-shades-in"><g id="f03-shades"><rect x="-50" y="-122" width="40" height="28" rx="8" fill="${C.ink}"/><rect x="10" y="-122" width="40" height="28" rx="8" fill="${C.ink}"/><line x1="-10" y1="-110" x2="10" y2="-110" stroke="${C.ink}" stroke-width="6"/><path d="M-40 -116 L-30 -116" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M20 -116 L30 -116" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g></g>
      </g></g>
    </svg>
    <div id="f03-title" class="abs title">${title.split("").map((c, i) => `<span class="c" id="f03-c${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>
    <div id="f03-sub" class="abs label" style="opacity:0">lombar · a vez da Vértebra!</div>
    ${icon(0, "O que é", `<rect x="-30" y="-40" width="60" height="80" rx="8" fill="#fff" ${st}/><path d="M-16 -18 L16 -18 M-16 0 L16 0 M-16 18 L6 18" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="26" fill="#fff" ${st}/><path d="M12 12 L36 36" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-46" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Melhora", `<path d="M-38 30 L-12 4 L6 18 L38 -26" fill="none" ${st} stroke-width="10"/><path d="M18 -28 L40 -28 L40 -6" fill="none" ${st} stroke-width="8"/>`, "#FFD3C9")}
    <div id="f03-spo" class="abs card title" style="opacity:0">SPOILER: são ótimas!</div>
    <div id="f03-pan" class="abs card title" style="opacity:0">SEM PÂNICO!</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.04 }, 0);
        R.rise(tl, "#f03-sub", 0.9, 0.4);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.0, K.dur, 1.5);
        R.pose(tl, p, K.hern - 0.2, 0.3, { shF: -115, elF: -25 }, "back.out(2)");
        R.pose(tl, p, K.q, 0.4, { shF: -40, elF: -50 });
        [K.q, K.inv, K.ex, K.ch].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.gesture(tl, p, K.inv, K.spo - 0.2, 5);
        // spoiler: são ótimas!
        R.pop(tl, "#f03-spo", K.oti - 0.15, 0.45);
        R.face(tl, p, K.oti, { eyes: "happy" });
        R.pose(tl, p, K.oti, 0.3, { shF: -110, elF: -40 }, "back.out(2)");
        // Vértebra entra, toda importante
        const v = "f03v";
        tl.set("#f03-shades", { y: -260, opacity: 0 }, 0);
        tl.fromTo("#f03-v-wrap", { x: -260, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.7);
        R.face(tl, v, K.v0 - 0.7, { eyes: "normal", mouth: "smile" });
        tl.set("#f03-shades", { opacity: 1 }, K.reg - 0.4);
        tl.to("#f03-shades", { y: 0, duration: 0.35, ease: "bounce.out" }, K.reg - 0.4);
        R.pose(tl, v, K.reg - 0.4, 0.3, { armF: -60, armB: 60 }, "back.out(2)");
        R.pose(tl, v, K.reg, 0.3, { armF: -170, armB: 20 }, "back.out(2)");
        R.squash(tl, "#f03-v-wrap", K.reg + 0.1);
        R.pop(tl, "#f03-pan", K.pan - 0.1, 0.4);
        R.pose(tl, v, K.v1 + 0.1, 0.4, { armF: 20, armB: -20 });
        tl.to("#f03-title, #f03-sub, #f03-spo, #f03-pan", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "pop", t: 0.45, vol: 0.2 },
        { name: "whoosh", t: 0.1, vol: 0.4 },
        ...[k.q, k.inv, k.ex, k.ch].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.35 })),
        { name: "sparkle", t: k.oti - 0.1, vol: 0.45 },
        { name: "whoosh-short", t: k.v0 - 0.7, vol: 0.4 },
        { name: "pop", t: k.reg - 0.1, vol: 0.45 },
        { name: "impact-bass-1", t: k.pan, vol: 0.35 },
      ],
    };
  },
};
