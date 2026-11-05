// F3 — Título SÍNDROME DO PIRIFORME + Dr. Pablo, Vértebra e o Piriforme (flexionando) + os 4 blocos
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, piriforme, w, lines } = ctx;
    const k = {
      hoje: w(0, "Hoje"), sind: w(0, "síndrome"), q: w(0, "que", 0), dif: w(0, "diferenciar"), ex: w(0, "exercícios"), ch: w(0, "chances"),
      v0: lines[1].start, v1: lines[1].end, pas: w(1, "pássaro"),
    };
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${130 + i * 230}px;top:610px;width:200px;text-align:center;opacity:0">
        <svg width="150" height="150" viewBox="-75 -75 150 150"><circle r="66" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
        <div class="label" style="font-size:30px;margin-top:6px">${label}</div></div>`;
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f03-pre { left:120px; top:120px; font-size:64px; color:${C.ink}; }
        #f03-title { left:110px; top:190px; font-size:150px; color:${C.ink}; }
        #f03-title .c { display:inline-block; }
        #f03-sub { left:125px; top:380px; font-size:48px; color:${C.pain}; }
        #f03-bird { left:1560px; top:430px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1480" cy="520" r="360" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-m-wrap"><g transform="translate(1200,880) scale(0.9)">${piriforme("f03m")}</g></g>
      <g id="f03-p-wrap"><g transform="translate(1480,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1740,880) scale(0.9)">${vertebra("f03v")}</g></g>
    </svg>
    <svg id="f03-bird" class="abs" width="160" height="140" viewBox="-80 -70 160 140" style="opacity:0">
      <ellipse cx="0" cy="10" rx="46" ry="38" fill="${C.sky}" ${st}/>
      <circle cx="30" cy="-24" r="26" fill="${C.sky}" ${st}/>
      <path d="M52 -26 L74 -18 L52 -12 Z" fill="${C.sun}" ${st}/>
      <circle cx="36" cy="-28" r="5" fill="${C.ink}"/>
      <path d="M-10 0 Q-40 -30 -60 0 Q-40 10 -10 10 Z" fill="#fff" ${st}/>
      <path d="M-20 48 L-20 60 M10 48 L10 60" ${st}/>
      <text x="-56" y="-34" font-family="Montserrat" font-weight="900" font-size="44" fill="${C.pain}">?</text>
    </svg>
    <div id="f03-pre" class="abs title" style="opacity:0">SÍNDROME DO</div>
    <div id="f03-title" class="abs title">${"PIRIFORME".split("").map((c, i) => `<span class="c" id="f03-c${i}">${c}</span>`).join("")}</div>
    <div id="f03-sub" class="abs label" style="opacity:0">o músculo que abraça o nervo ciático</div>
    ${icon(0, "O que é", `<rect x="-30" y="-40" width="60" height="80" rx="8" fill="#fff" ${st}/><path d="M-16 -18 L16 -18 M-16 0 L16 0 M-16 18 L6 18" ${st}/>`, C.sun)}
    ${icon(1, "Piriforme x Hérnia", `<circle cx="-8" cy="-8" r="26" fill="#fff" ${st}/><path d="M12 12 L36 36" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-46" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-26" width="16" height="52" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Melhora", `<path d="M-38 30 L-12 4 L6 18 L38 -26" fill="none" ${st} stroke-width="10"/><path d="M18 -28 L40 -28 L40 -6" fill="none" ${st} stroke-width="8"/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        R.rise(tl, "#f03-pre", 0, 0.4, -40);
        tl.fromTo("#f03-title .c", { y: -420, opacity: 1 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.05 }, 0.15);
        R.rise(tl, "#f03-sub", 1.0, 0.4);
        // Dr. Pablo entra pela direita
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) {
          R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        }
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.0, K.dur, 1.5);
        R.pose(tl, p, K.sind - 0.2, 0.35, { shF: -120, elF: -40 }, "back.out(2)");
        R.gesture(tl, p, K.dif - 0.2, K.v0 - 0.2, 5);
        // o Piriforme sobe do chão e faz pose de marombeiro
        const m = "f03m";
        tl.fromTo("#f03-m-wrap", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.sind + 0.2);
        R.setPose(tl, m, 0, { armF: 0, armB: 0 });
        R.face(tl, m, 0, { eyes: "normal", mouth: "grin" });
        R.pose(tl, m, K.sind + 0.7, 0.3, { armF: -120, armB: 120 }, "back.out(2.4)");
        R.squash(tl, "#f03m-body", K.sind + 0.75);
        for (let i = 0; i < 3; i++) R.pose(tl, m, K.sind + 1.2 + i * 0.45, 0.2, { armF: i % 2 ? -120 : -140, armB: i % 2 ? 120 : 140 }, "sine.inOut");
        R.face(tl, m, K.sind + 1.0, { eyes: "happy" });
        R.blinks(tl, m, K.sind + 2.6, K.dur, "happy");
        // ícones dos blocos
        [K.q, K.dif, K.ex, K.ch].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        // Vértebra pula para dentro e confunde com pássaro
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: -110, duration: 0.35, ease: "power2.out" }, K.v0 - 0.45);
        tl.to("#f03-v-wrap", { y: 0, duration: 0.3, ease: "power2.in" }, K.v0 - 0.1);
        R.squash(tl, "#f03v-root", K.v0 + 0.2);
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, v, K.v0, { eyes: "wide" });
        R.pose(tl, v, K.v0 + 0.3, 0.3, { armF: -150, armB: 20 }, "back.out(2)");
        R.pop(tl, "#f03-bird", K.pas - 0.15, 0.4);
        tl.to("#f03-bird", { y: -20, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.pas + 0.3);
        R.face(tl, m, K.pas, { eyes: "wide", mouth: "frown" });
        R.face(tl, p, K.pas + 0.2, { eyes: "happy" });
        R.pose(tl, v, K.v1 + 0.1, 0.4, { armF: 20, armB: -20 });
        tl.to("#f03-pre, #f03-title, #f03-sub", { y: -40, opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.6, vol: 0.2 },
        { name: "pop", t: 0.75, vol: 0.2 },
        { name: "pop", t: k.sind + 0.75, vol: 0.45 },
        ...[k.q, k.dif, k.ex, k.ch].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.35 })),
        { name: "whoosh-short", t: k.v0 - 0.45, vol: 0.45 },
        { name: "sparkle", t: k.pas - 0.1, vol: 0.4 },
      ],
    };
  },
};
