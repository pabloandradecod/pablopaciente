// F18 — Cartela do bloco 3 "BORA SE MEXER!" + a regra de ouro
export default {
  speakers: {},
  tail: 1.0,
  build(ctx) {
    const { C, vertebra, w } = ctx;
    const k = { hora: w(0, "Hora"), regra: w(0, "regra"), pio: w(0, "provoca"), des: w(0, "choque"), para: w(0, "amplitude") };
    // faixa na testa da Vértebra (injetada logo antes dos olhos)
    const band = `<rect x="-82" y="-138" width="164" height="22" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><path d="M-80 -128 L-112 -146 M-80 -126 L-110 -110" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`;
    const vert = vertebra("f18v").replace('<g id="f18v-eyes">', band + '<g id="f18v-eyes">');
    return {
      k,
      bg: C.good,
      css: `
        #f18-num { left:140px; top:110px; font-size:220px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f18-title { left:140px; top:330px; font-size:120px; color:${C.ink}; line-height:0.95; }
        #f18-rule { left:140px; top:620px; width:1100px; padding:26px 34px; display:flex; gap:28px; align-items:center; border-color:#C9372A; }
        #f18-rule .t { font-size:38px; line-height:1.15; }
        #f18-rule .t b { color:#C9372A; }
        #f18-rule .t b:first-child { color:#1E9C72; }
        #f18-gold { left:150px; top:562px; font-size:34px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1480 520 L${1480 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1480 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <ellipse cx="1480" cy="860" rx="260" ry="34" fill="${C.ink}" opacity="0.18"/>
      <g id="f18-v-wrap"><g transform="translate(1480,860) scale(1.7)">${vert}</g></g>
    </svg>
    <div id="f18-num" class="abs title" style="opacity:0">3.</div>
    <div id="f18-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f18-gold" class="abs label" style="opacity:0">REGRA DE OURO</div>
    <div id="f18-rule" class="abs card" style="opacity:0">
      <svg width="170" height="170" viewBox="-85 -85 170 170" style="flex:none">
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 80).toFixed(1)} ${(Math.sin(a) * 80).toFixed(1)}`; }).join(" ")} Z" fill="#D64534" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <text x="0" y="14" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="#fff">PARE</text>
      </svg>
      <div class="t label">No começo: <b>diminui o que provoca</b><br>(chute e arrancada), sem parar tudo.<br>Choque ou formigou mais? <b>Diminui a amplitude.</b></div>
    </div>`,
      js: function (tl, K, R) {
        const v = "f18v";
        tl.fromTo("#f18-num", { scale: 3, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.05);
        tl.fromTo("#f18-title", { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, Math.max(0.2, K.hora - 0.2));
        // Vértebra pulando (polichinelo, finito)
        R.setPose(tl, v, 0, { armF: 20, armB: -20, legF: 0, legB: 0 });
        R.face(tl, v, 0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f18-v-wrap", { y: 700 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.1);
        for (let i = 0; 0.9 + i * 0.55 + 0.4 < K.regra; i++) {
          const t = 0.9 + i * 0.55;
          tl.to("#f18v-root", { y: -50, duration: 0.2, ease: "power2.out" }, t);
          tl.to("#f18v-root", { y: 0, duration: 0.2, ease: "power2.in" }, t + 0.2);
          R.pose(tl, v, t, 0.2, { armF: -150, armB: 150, legF: -18, legB: 18 }, "power2.out");
          R.pose(tl, v, t + 0.2, 0.2, { armF: 20, armB: -20, legF: 0, legB: 0 }, "power2.in");
        }
        // regra de ouro: Vértebra para e aponta
        R.rise(tl, "#f18-gold", K.regra - 0.2, 0.35, 20);
        R.pop(tl, "#f18-rule", K.regra, 0.45, 0.6);
        R.face(tl, v, K.regra, { eyes: "wide", mouth: "flat" });
        R.pose(tl, v, K.pio, 0.35, { armB: 110, armF: 20 }, "back.out(2)");
        tl.to("#f18-rule", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.para);
        R.face(tl, v, K.para + 0.4, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, v, K.regra + 0.5, K.dur);
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "pop", t: k.regra, vol: 0.45 },
      ],
    };
  },
};
