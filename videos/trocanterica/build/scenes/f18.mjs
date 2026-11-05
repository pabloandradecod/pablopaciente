// F18 — Cuidado 1: tirar a compressão (4 cartões com a Dona Cida) + Glutinho "Ufa! Espaço pra respirar!"
export default {
  speakers: { glutinho: "f18g" },
  extra: 0.6,
  build(ctx) {
    const { C, human, glutinho, w, lines } = ctx;
    const k = {
      um: w(0, "Um"), tirar: w(0, "tirar"), cruz: w(0, "cruzar"), peso: w(0, "peso"), trav: w(0, "travesseiro"), cad: w(0, "cadeiras"),
      g0: lines[1].start, g1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const P = "#B07ED8", J = "#3E5A8A", S = "#E3A47E";
    const X = `<path d="M120 20 L160 60 M160 20 L120 60" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`;
    const OK = `<circle cx="142" cy="40" r="22" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M131 40 L139 48 L153 32" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`;
    const icons = [
      // não cruzar as pernas
      `<rect x="20" y="60" width="90" height="16" rx="6" fill="#B07A4A" ${st}/><path d="M40 76 L40 130 M100 76 L100 130" ${st}/>
       <path d="M40 50 L95 64 L80 120" fill="none" stroke="${J}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M95 50 L45 64 L60 120" fill="none" stroke="#2E4670" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>${X}`,
      // peso nas duas pernas
      `<circle cx="65" cy="22" r="14" fill="${S}" ${st}/><path d="M65 36 L65 80" stroke="${P}" stroke-width="22" stroke-linecap="round"/><path d="M58 80 L50 130 M72 80 L80 130" stroke="${J}" stroke-width="14" stroke-linecap="round"/>
       <path d="M30 96 L30 126 M22 116 L30 126 L38 116 M100 96 L100 126 M92 116 L100 126 L108 116" fill="none" stroke="${C.good}" stroke-width="6" stroke-linecap="round"/>${OK}`,
      // travesseiro entre os joelhos
      `<rect x="10" y="100" width="150" height="20" rx="8" fill="#fff" ${st}/><circle cx="26" cy="80" r="14" fill="${S}" ${st}/><path d="M42 82 L92 82" stroke="${P}" stroke-width="20" stroke-linecap="round"/>
       <path d="M92 82 L124 66 L150 84" fill="none" stroke="${J}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M92 92 L124 98 L150 96" fill="none" stroke="#2E4670" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
       <ellipse cx="122" cy="82" rx="16" ry="10" fill="${C.sky}" ${st}/>${OK}`,
      // cadeira não muito baixa
      `<rect x="30" y="74" width="80" height="14" rx="5" fill="#B07A4A" ${st}/><path d="M36 88 L36 130 M104 88 L104 130 M30 74 L30 30" ${st}/>
       <path d="M128 130 L128 80 M120 90 L128 78 L136 90" fill="none" stroke="${C.good}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="132" x2="150" y2="132" stroke="${C.ink}" stroke-width="5"/>${OK}`,
    ];
    const texts = ["Não cruzar as pernas", "Em pé, peso nas duas pernas", "Travesseiro entre os joelhos", "Cadeira não muito baixa"];
    const card = (i, x, y) => `<div id="f18-c${i}" class="abs card f18-c" style="left:${x}px;top:${y}px;opacity:0">
        <svg width="170" height="140" viewBox="0 0 170 140">${icons[i]}</svg><div class="label t">${texts[i]}</div></div>`;
    return {
      k,
      css: `
        #f18-head { left:110px; top:70px; font-size:72px; }
        #f18-head span { color:${C.good}; }
        #root .f18-c { width:400px; height:270px; padding:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }
        #root .f18-c .t { font-size:30px; text-align:center; line-height:1.1; }
        #f18-ufa { left:1500px; top:230px; padding:12px 24px; font-size:40px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f18-c-wrap"><g transform="translate(250,630) scale(1.25)">${human("f18c", "cida")}</g></g>
      <g id="f18-g-wrap"><g transform="translate(1640,860) scale(1.15)"><g id="f18-g-sq">${glutinho("f18g")}</g></g></g>
    </svg>
    <div id="f18-head" class="abs title">1. <span>TIRAR A COMPRESSÃO</span></div>
    ${card(0, 520, 190)}${card(1, 950, 190)}${card(2, 520, 500)}${card(3, 950, 500)}
    <div id="f18-ufa" class="abs card title" style="opacity:0">ESPAÇO!</div>`,
      js: function (tl, K, R) {
        const c = "f18c", g = "f18g";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f18-head", 0.05, 0.5, -300);
        // Glutinho começa espremido
        tl.set("#f18-g-sq", { scaleY: 0.82, svgOrigin: "0 0" }, 0);
        R.face(tl, g, 0, { eyes: "pain", mouth: "frown" });
        R.setPose(tl, g, 0, { armF: 10, armB: -10 });
        tl.fromTo("#f18-g-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.3);
        // os 4 cuidados
        [K.cruz, K.peso, K.trav, K.cad].forEach((t, i) => R.pop(tl, `#f18-c${i}`, t - 0.25, 0.4, 0.6));
        R.pose(tl, c, K.cruz - 0.1, 0.35, { shF: -110, elF: -40 }, "back.out(2)");
        R.face(tl, c, K.cruz, { eyes: "wide", mouth: "open" });
        R.pose(tl, c, K.peso, 0.35, { shF: -10, elF: -20 });
        R.face(tl, c, K.peso, { eyes: "happy", mouth: "smile" });
        tl.to("#f18-c-wrap", { y: -12, duration: 0.15, yoyo: true, repeat: 1 }, K.peso + 0.3);
        R.pose(tl, c, K.trav, 0.3, { shF: -60, elF: -90 }, "back.out(2)");
        R.pose(tl, c, K.cad, 0.3, { shF: -140, elF: -20 }, "back.out(2)");
        R.face(tl, c, K.cad, { eyes: "happy", mouth: "grin" });
        // a cada cuidado o Glutinho se solta um pouco
        [K.cruz, K.peso, K.trav, K.cad].forEach((t, i) => tl.to("#f18-g-sq", { scaleY: 0.82 + (i + 1) * 0.045, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, t + 0.2));
        R.face(tl, g, K.trav, { eyes: "normal", mouth: "flat" });
        // "Ufa!"
        R.face(tl, g, K.g0, { eyes: "happy", mouth: "grin" });
        R.pose(tl, g, K.g0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f18g-body", { scale: 1.08, svgOrigin: "0 -120", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.g0 + 0.2);
        R.pop(tl, "#f18-ufa", K.g0 + 0.2, 0.4);
        R.face(tl, c, K.g0, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        ...[k.cruz, k.peso, k.trav, k.cad].map((t) => ({ name: "pop", t: t - 0.25, vol: 0.35 })),
        { name: "sparkle", t: k.g0 + 0.2, vol: 0.4 },
      ],
    };
  },
};
