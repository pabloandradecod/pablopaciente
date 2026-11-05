// F3 — Título SÍNDROME DO TRATO ILIOTIBIAL + "a dor do corredor na lateral do joelho"; Dr. Pablo de tênis (trotando); Vértebra com número de peito
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      ass: w(0, "assunto"), trato: w(0, "trato"), causa: w(0, "causa"), lat: w(0, "lateral"), corr: w(0, "corredores"),
      que: w(0, "que"), inv: w(0, "investigar"), exe: w(0, "exercícios"), tempo: w(0, "tempo"), correr: w(0, "correr"),
      v0: lines[1].start, v1: lines[1].end, num: w(1, "Número"), bora: w(1, "Bora"), larg: w(1, "largada"),
    };
    const t1 = "SÍNDROME DO", t2 = "TRATO ILIOTIBIAL";
    const letters = (s, off) => s.split("").map((c, i) => `<span class="c" id="f03-c${off + i}">${c === " " ? "&nbsp;" : c}</span>`).join("");
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${110 + i * 215}px;top:600px;width:190px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="62" fill="${color}" ${st}/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:4px">${label}</div></div>`;
    return {
      k,
      css: `
        #f03-title { left:100px; top:100px; font-size:100px; line-height:1.05; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-title .l2 { color:${C.pain}; }
        #f03-sub { left:110px; top:350px; padding:12px 26px; font-size:40px; color:#fff; background:${C.ink}; border-radius:18px; transform: rotate(-2deg); }
        #f03-sub b { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1560" cy="540" r="330" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="#9AA3A8"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g stroke="#fff" stroke-width="10">${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${60 + i * 330}" y1="980" x2="${220 + i * 330}" y2="980"/>`).join("")}</g>
      <g id="f03-p-wrap"><g transform="translate(1660,650) scale(-1.3,1.3)">${human("f03p", "pablo")}
      </g></g>
      <g id="f03-v-wrap"><g transform="translate(1250,880) scale(1.0)">${vertebra("f03v")}
        <g id="f03-bib" opacity="0"><rect x="-46" y="-140" width="92" height="64" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="5"/><text x="0" y="-96" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.pain}">10</text><circle cx="-36" cy="-130" r="4" fill="${C.ink}"/><circle cx="36" cy="-130" r="4" fill="${C.ink}"/></g>
      </g></g>
    </svg>
    <div id="f03-title" class="abs title"><div>${letters(t1, 0)}</div><div class="l2">${letters(t2, t1.length)}</div></div>
    <div id="f03-sub" class="abs title" style="opacity:0">a dor do <b>corredor</b> na lateral do joelho</div>
    ${icon(0, "O que é", `<rect x="-28" y="-36" width="56" height="72" rx="8" fill="#fff" ${st}/><path d="M-14 -16 L14 -16 M-14 0 L14 0 M-14 16 L6 16" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="24" fill="#fff" ${st}/><path d="M10 10 L32 32" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-38 0 L38 0" ${st} stroke-width="10"/><rect x="-44" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Voltar a correr", `<path d="M-30 12 Q-34 30 -16 32 L30 32 Q42 28 38 16 Q30 2 4 2 L-16 0 Q-28 0 -30 12Z" fill="${C.good}" ${st}/><path d="M-20 -20 L0 -34 L20 -20" fill="none" ${st}/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.03 }, 0);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        // entra trotando de tênis
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 1.2, ease: "power1.out" }, 0.1);
        for (let i = 0; i < 6; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 30 : -35, hipB: i % 2 ? -35 : 30, knF: i % 2 ? 10 : 50, knB: i % 2 ? 50 : 10, shF: i % 2 ? -40 : 20, elF: -80, shB: i % 2 ? 20 : -40, elB: -80 }, "sine.inOut");
        R.pose(tl, p, 1.3, 0.3, { hipF: 0, hipB: 0, knF: 0, knB: 0, shF: -10, elF: -20, shB: 5, elB: -10 });
        // trote no lugar (curto) quando fala de corredores
        for (let i = 0; i < 4; i++) R.pose(tl, p, K.corr - 0.2 + i * 0.18, 0.18, { hipF: i % 2 ? 0 : -40, knF: i % 2 ? 0 : 60, hipB: i % 2 ? -40 : 0, knB: i % 2 ? 60 : 0 }, "sine.inOut");
        R.pose(tl, p, K.corr + 0.55, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0 });
        R.pop(tl, "#f03-sub", K.lat - 0.2, 0.45);
        R.face(tl, p, K.corr, { eyes: "happy" });
        [K.que, K.inv, K.exe, K.tempo].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        R.gesture(tl, p, K.que, K.v0 - 0.3, 4);
        R.face(tl, p, K.inv, { eyes: "normal" });
        // Vértebra com número de peito
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.6);
        R.face(tl, v, K.v0 - 0.6, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f03-bib", { opacity: 0, y: -60, rotation: -20, svgOrigin: "1250 770" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "1250 770", duration: 0.35, ease: "back.out(2)" }, K.num);
        R.face(tl, v, K.num + 0.3, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, K.bora - 0.1, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f03-v-wrap", { y: -60, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 3 }, K.bora);
        tl.to("#f03-v-wrap", { x: -60, duration: 0.5, ease: "power2.in" }, K.larg);
        R.face(tl, p, K.v0, { eyes: "happy" });
        tl.to("#f03-title, #f03-sub", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.5, vol: 0.2 },
        { name: "pop", t: k.lat - 0.2, vol: 0.35 },
        ...[k.que, k.inv, k.exe, k.tempo].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "pop", t: k.num, vol: 0.4 },
        { name: "sparkle", t: k.bora, vol: 0.35 },
      ],
    };
  },
};
