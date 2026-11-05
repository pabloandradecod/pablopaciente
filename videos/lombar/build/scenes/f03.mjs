// F3 — Título DOR LOMBAR, Dr. Pablo apresenta, Vértebra com placa "SEM PÂNICO", Disquinho passa de fininho
export default {
  speakers: { pablo: "f03p", disquinho: "f03d" },
  build(ctx) {
    const { C, human, vertebra, disquinho, w, lines } = ctx;
    const k = {
      ass: w(0, "assunto"), q: w(0, "que", 0), pq: w(0, "por"), inv: w(0, "investiga"), ex: w(0, "exercícios"), ch: w(0, "chances"),
      adi: w(0, "adianto"), boa: w(0, "boa"),
      d0: lines[1].start, d1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${110 + i * 200}px;top:560px;width:190px;text-align:center;opacity:0">
        <svg width="130" height="130" viewBox="-75 -75 150 150"><circle r="66" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:6px">${label}</div></div>`;
    const title = "DOR LOMBAR";
    return {
      k,
      css: `
        #f03-title { left:110px; top:150px; font-size:150px; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-sub { left:118px; top:340px; font-size:54px; color:${C.pain}; }
        #f03-boa { left:150px; top:790px; padding:14px 30px; font-size:44px; color:${C.ink}; transform: rotate(-3deg); background:${C.good}; }
        #f03-sign { left:1080px; top:470px; padding:12px 22px; font-size:34px; transform: rotate(-6deg); }
        #f03-dline { left:1000px; top:250px; padding:12px 22px; font-size:32px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1480" cy="520" r="360" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1600,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1230,880) scale(1.0)">${vertebra("f03v")}</g></g>
      <g id="f03-d-wrap"><g transform="translate(900,880) scale(0.8)">${disquinho("f03d")}</g></g>
    </svg>
    <div id="f03-title" class="abs title">${title.split("").map((c, i) => `<span class="c" id="f03-c${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>
    <div id="f03-sub" class="abs label" style="opacity:0">a dor mais comum do mundo</div>
    ${icon(0, "O que é", `<rect x="-30" y="-40" width="60" height="80" rx="8" fill="#fff" ${st}/><path d="M-16 -18 L16 -18 M-16 0 L16 0 M-16 18 L6 18" ${st}/>`, C.sun)}
    ${icon(1, "Por quê", `<path d="M-18 -22 Q-18 -44 4 -44 Q26 -44 26 -24 Q26 -8 6 0 L6 14" fill="none" ${st} stroke-width="11"/><circle cx="6" cy="36" r="8" fill="${C.ink}"/>`, "#E5D7FF")}
    ${icon(2, "Investigar", `<circle cx="-8" cy="-8" r="26" fill="#fff" ${st}/><path d="M12 12 L36 36" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(3, "Exercícios", `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-46" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(4, "Melhora", `<path d="M-38 30 L-12 4 L6 18 L38 -26" fill="none" ${st} stroke-width="10"/><path d="M18 -28 L40 -28 L40 -6" fill="none" ${st} stroke-width="8"/>`, "#FFD3C9")}
    <div id="f03-boa" class="abs card title" style="opacity:0">A notícia é BOA!</div>
    <div id="f03-sign" class="abs card title" style="opacity:0">SEM PÂNICO</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.05 }, 0);
        R.rise(tl, "#f03-sub", 0.9, 0.4);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.0, K.dur, 1.5);
        R.pose(tl, p, K.ass - 0.2, 0.3, { shF: -115, elF: -25 }, "back.out(2)");
        R.pose(tl, p, K.q, 0.4, { shF: -40, elF: -50 });
        [K.q, K.pq, K.inv, K.ex, K.ch].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.gesture(tl, p, K.inv, K.adi - 0.2, 7);
        R.pop(tl, "#f03-boa", K.boa - 0.2, 0.45);
        R.face(tl, p, K.boa, { eyes: "happy" });
        R.pose(tl, p, K.boa, 0.3, { shF: -110, elF: -40 }, "back.out(2)");
        // Vértebra entra com a placa SEM PÂNICO
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.adi - 0.6);
        R.face(tl, v, K.adi - 0.6, { eyes: "normal", mouth: "smile" });
        R.pose(tl, v, K.adi - 0.3, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.pop(tl, "#f03-sign", K.adi - 0.2, 0.4);
        R.face(tl, v, K.boa, { eyes: "happy", mouth: "grin" });
        // Disquinho passa de fininho, assobiando
        const d = "f03d";
        tl.fromTo("#f03-d-wrap", { x: -1100 }, { x: 0, duration: 1.0, ease: "power1.out" }, K.d0 - 0.9);
        for (let i = 0; i < 4; i++) {
          R.pose(tl, d, K.d0 - 0.9 + i * 0.25, 0.12, { legF: i % 2 ? 20 : -20, legB: i % 2 ? -20 : 20 }, "sine.inOut");
        }
        R.face(tl, d, K.d0 - 0.9, { eyes: "closed", mouth: "flat" });
        R.face(tl, d, K.d0, { eyes: "happy" });
        R.pose(tl, d, K.d0, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f03-d-wrap", { x: 1400, duration: 0.9, ease: "power2.in" }, K.d1 + 0.1);
        R.face(tl, v, K.d0, { eyes: "wide", mouth: "flat" });
        tl.to("#f03-title, #f03-sub, #f03-boa, #f03-sign", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.5, vol: 0.2 },
        ...[k.q, k.pq, k.inv, k.ex, k.ch].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "pop", t: k.adi - 0.2, vol: 0.4 },
        { name: "sparkle", t: k.boa - 0.1, vol: 0.4 },
        { name: "whoosh-short", t: k.d0 - 0.9, vol: 0.35 },
        { name: "whoosh-short", t: k.d1 + 0.1, vol: 0.35 },
      ],
    };
  },
};
