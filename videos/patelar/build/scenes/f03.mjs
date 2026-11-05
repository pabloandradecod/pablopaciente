// F3 — Título TENDINOPATIA PATELAR + "o joelho do saltador"; Dr. Pablo quicando bola de vôlei; Vértebra de joelheira
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      ass: w(0, "assunto"), joe: w(0, "joelho"), salt: w(0, "saltador"), que: w(0, "que"), inv: w(0, "investiga"),
      exe: w(0, "exercícios"), tempo: w(0, "tempo"), melh: w(0, "melhorar"),
      v0: lines[1].start, v1: lines[1].end, joelh: w(1, "Joelheira"), bora: w(1, "Bora"),
    };
    const t1 = "TENDINOPATIA", t2 = "PATELAR";
    const letters = (s, off) => s.split("").map((c, i) => `<span class="c" id="f03-c${off + i}">${c}</span>`).join("");
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${110 + i * 215}px;top:560px;width:190px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="62" fill="${color}" ${st}/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:4px">${label}</div></div>`;
    return {
      k,
      css: `
        #f03-title { left:100px; top:110px; font-size:124px; line-height:1.0; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-title .l2 { color:${C.pain}; }
        #f03-sub { left:110px; top:380px; padding:12px 26px; font-size:46px; color:#fff; background:${C.ink}; border-radius:18px; transform: rotate(-2deg); }
        #f03-sub b { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1500" cy="520" r="350" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="#E9B872"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1620,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-ball"><g transform="translate(1510,720)"><g id="f03-ball-in"><circle r="34" fill="#fff" ${st}/><path d="M-30 -14 Q0 0 30 -14 M-26 18 Q0 4 26 18 M0 -34 Q-12 0 0 34" stroke="#3E7FD8" stroke-width="5" fill="none"/></g></g></g>
      <g id="f03-v-wrap"><g transform="translate(1160,880) scale(1.0)">${vertebra("f03v")}
        <g id="f03-pads" opacity="0"><rect x="-44" y="-36" width="44" height="22" rx="10" fill="#1F3550" stroke="${C.ink}" stroke-width="4"/><rect x="2" y="-36" width="44" height="22" rx="10" fill="#1F3550" stroke="${C.ink}" stroke-width="4"/></g>
      </g></g>
    </svg>
    <div id="f03-title" class="abs title"><div>${letters(t1, 0)}</div><div class="l2">${letters(t2, t1.length)}</div></div>
    <div id="f03-sub" class="abs title" style="opacity:0">o <b>joelho do saltador</b></div>
    ${icon(0, "O que é", `<rect x="-28" y="-36" width="56" height="72" rx="8" fill="#fff" ${st}/><path d="M-14 -16 L14 -16 M-14 0 L14 0 M-14 16 L6 16" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="24" fill="#fff" ${st}/><path d="M10 10 L32 32" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-38 0 L38 0" ${st} stroke-width="10"/><rect x="-44" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Quanto tempo", `<circle r="34" fill="#fff" ${st}/><path d="M0 0 L0 -22 M0 0 L16 8" ${st}/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.035 }, 0);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        tl.fromTo("#f03-ball", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        // quicando a bola: mão desce, bola desce ao chão e volta
        R.setPose(tl, p, 0.9, { shF: -50, elF: -40 });
        const nb = Math.max(1, Math.floor((K.que - 1.1) / 0.6));
        for (let i = 0; i < nb; i++) {
          const t = 1.1 + i * 0.6;
          tl.to("#f03-ball-in", { y: 140, duration: 0.3, ease: "power2.in" }, t);
          tl.to("#f03-ball-in", { y: 0, duration: 0.3, ease: "power2.out" }, t + 0.3);
          R.pose(tl, p, t, 0.15, { shF: -30, elF: -20 }, "power2.out");
          R.pose(tl, p, t + 0.3, 0.2, { shF: -50, elF: -40 });
        }
        R.pop(tl, "#f03-sub", K.joe - 0.1, 0.45);
        R.face(tl, p, K.salt, { eyes: "happy" });
        // bola sobe e é segurada; ícones dos blocos
        tl.to("#f03-ball-in", { y: -120, duration: 0.35, ease: "power2.out" }, K.que - 0.4);
        tl.to("#f03-ball-in", { y: -40, duration: 0.3, ease: "power2.in" }, K.que - 0.05);
        R.pose(tl, p, K.que - 0.2, 0.3, { shF: -110, elF: -30 }, "back.out(2)");
        [K.que, K.inv, K.exe, K.tempo].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.face(tl, p, K.inv, { eyes: "normal" });
        // Vértebra de joelheira
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.6);
        R.face(tl, v, K.v0 - 0.6, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f03-pads", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, K.joelh);
        R.face(tl, v, K.joelh + 0.3, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, K.bora - 0.1, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f03-v-wrap", { y: -60, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 3 }, K.bora);
        R.face(tl, p, K.v0, { eyes: "happy" });
        tl.to("#f03-title, #f03-sub", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.5, vol: 0.2 },
        { name: "click-soft", t: 1.4, vol: 0.35 }, { name: "click-soft", t: 2.0, vol: 0.35 }, { name: "click-soft", t: 2.6, vol: 0.35 },
        { name: "pop", t: k.joe - 0.1, vol: 0.35 },
        ...[k.que, k.inv, k.exe, k.tempo].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "pop", t: k.joelh, vol: 0.4 },
        { name: "sparkle", t: k.bora, vol: 0.35 },
      ],
    };
  },
};
