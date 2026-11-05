// F17 — Cartela do bloco 3 "BORA SE MEXER!": mito do repouso riscado + regra de ouro (semáforo)
export default {
  speakers: {},
  tail: 1.0,
  build(ctx) {
    const { C, vertebra, w } = ctx;
    const k = { hora: w(0, "Hora"), rem: w(0, "remédio"), rep: w(0, "Repouso"), atr: w(0, "atrasa"), regra: w(0, "Regra"), desc: w(0, "desconforto"), normal: w(0, "normal"), forte: w(0, "forte"), dim: w(0, "diminui") };
    // faixa na testa da Vértebra (injetada logo antes dos olhos)
    const band = `<rect x="-82" y="-138" width="164" height="22" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><path d="M-80 -128 L-112 -146 M-80 -126 L-110 -110" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`;
    const vert = vertebra("f17v").replace('<g id="f17v-eyes">', band + '<g id="f17v-eyes">');
    return {
      k,
      bg: C.good,
      css: `
        #f17-num { left:140px; top:110px; font-size:220px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f17-title { left:140px; top:330px; font-size:120px; color:${C.ink}; line-height:0.95; }
        #f17-rule { left:140px; top:620px; width:1040px; padding:20px 34px; display:flex; gap:28px; align-items:center; border-color:#C9372A; }
        #f17-rule .t { font-size:46px; line-height:1.15; }
        #f17-rule .t b { color:#C9372A; }
        #f17-gold { left:150px; top:562px; font-size:34px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1480 520 L${1480 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1480 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <ellipse cx="1480" cy="860" rx="260" ry="34" fill="${C.ink}" opacity="0.18"/>
      <g id="f17-v-wrap"><g transform="translate(1480,860) scale(1.7)">${vert}</g></g>
    </svg>
    <div id="f17-num" class="abs title" style="opacity:0">3.</div>
    <div id="f17-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f17-gold" class="abs label" style="opacity:0">REGRA DE OURO</div>
    <div id="f17-rule" class="abs card" style="opacity:0">
      <svg width="110" height="200" viewBox="0 0 110 200" style="flex:none">
        <rect x="10" y="6" width="90" height="188" rx="22" fill="${C.ink}"/>
        <circle id="f17-lr" cx="55" cy="56" r="30" fill="#5A2A25" stroke="#fff" stroke-width="4"/>
        <circle id="f17-lg" cx="55" cy="142" r="30" fill="#1E4D3F" stroke="#fff" stroke-width="4"/>
      </svg>
      <div class="t label"><span id="f17-tg" style="opacity:0.3">Desconforto leve: <b style="color:#1E9C72">normal</b></span><br><span id="f17-tr" style="opacity:0.3">Dor forte: <b>diminui</b> a amplitude ou o ritmo</span></div>
    </div>
    <div id="f17-myth" class="abs card" style="left:140px;top:630px;width:1040px;height:225px;opacity:0">
      <svg class="abs" style="left:24px;top:24px" width="220" height="150" viewBox="0 0 220 150">
        <rect x="10" y="70" width="200" height="40" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="6"/><rect x="10" y="40" width="20" height="100" rx="6" fill="#B07A4A" stroke="${C.ink}" stroke-width="6"/><rect x="190" y="70" width="20" height="70" rx="6" fill="#B07A4A" stroke="${C.ink}" stroke-width="6"/><rect x="34" y="50" width="56" height="26" rx="12" fill="${C.sky}" stroke="${C.ink}" stroke-width="5"/>
        <text x="120" y="38" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">z z z</text>
      </svg>
      <div class="label abs" style="left:270px;top:22px;font-size:34px;color:#D64534">MITO</div>
      <div class="title abs" style="left:270px;top:70px;font-size:54px">Repouso absoluto</div>
      <svg id="f17-mx" class="abs" style="left:250px;top:40px;opacity:0" width="520" height="130" viewBox="0 0 520 130"><path d="M10 110 L510 20" stroke="#D64534" stroke-width="16" stroke-linecap="round"/></svg>
      <div id="f17-act" class="label abs" style="left:270px;top:150px;font-size:34px;color:#1E9C72;opacity:0">→ movimento é o melhor remédio!</div>
    </div>`,
      js: function (tl, K, R) {
        const v = "f17v";
        tl.fromTo("#f17-num", { scale: 3, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.05);
        tl.fromTo("#f17-title", { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, Math.max(0.2, K.hora - 0.2));
        // Vértebra pulando (polichinelo, finito)
        R.setPose(tl, v, 0, { armF: 20, armB: -20, legF: 0, legB: 0 });
        R.face(tl, v, 0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f17-v-wrap", { y: 700 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.1);
        for (let i = 0; 0.9 + i * 0.55 + 0.4 < K.rep - 0.2; i++) {
          const t = 0.9 + i * 0.55;
          tl.to("#f17v-root", { y: -50, duration: 0.2, ease: "power2.out" }, t);
          tl.to("#f17v-root", { y: 0, duration: 0.2, ease: "power2.in" }, t + 0.2);
          R.pose(tl, v, t, 0.2, { armF: -150, armB: 150, legF: -18, legB: 18 }, "power2.out");
          R.pose(tl, v, t + 0.2, 0.2, { armF: 20, armB: -20, legF: 0, legB: 0 }, "power2.in");
        }
        // mito: repouso absoluto
        R.pop(tl, "#f17-myth", K.rep - 0.2, 0.45, 0.6);
        tl.set("#f17-mx", { opacity: 1 }, K.atr);
        tl.fromTo("#f17-mx", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.atr);
        R.rise(tl, "#f17-act", K.atr + 0.6, 0.4, 16);
        R.face(tl, v, K.atr, { eyes: "wide", mouth: "open" });
        R.face(tl, v, K.atr + 0.6, { eyes: "happy", mouth: "grin" });
        // regra de ouro: Vértebra para e aponta
        R.fadeOut(tl, "#f17-myth", K.regra - 0.35, 0.25);
        R.rise(tl, "#f17-gold", K.regra - 0.2, 0.35, 20);
        R.pop(tl, "#f17-rule", K.regra, 0.45, 0.6);
        R.face(tl, v, K.regra, { eyes: "normal", mouth: "smile" });
        tl.to("#f17-lg", { attr: { fill: "#3DD9A4" }, duration: 0.2 }, K.desc);
        tl.to("#f17-tg", { opacity: 1, duration: 0.25 }, K.desc);
        R.pose(tl, v, K.normal, 0.35, { armF: -150, armB: 20 }, "back.out(2)");
        R.face(tl, v, K.normal, { eyes: "happy", mouth: "grin" });
        tl.to("#f17-lr", { attr: { fill: "#FF5A4E" }, duration: 0.2 }, K.forte);
        tl.to("#f17-tr", { opacity: 1, duration: 0.25 }, K.forte);
        R.face(tl, v, K.forte, { eyes: "wide", mouth: "flat" });
        R.pose(tl, v, K.forte, 0.35, { armB: 110, armF: 20 }, "back.out(2)");
        tl.to("#f17-rule", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.dim);
        R.face(tl, v, K.dim + 0.6, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, v, K.regra + 0.5, K.dur);
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "pop", t: k.rep - 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.atr, vol: 0.4 },
        { name: "pop", t: k.regra, vol: 0.45 },
        { name: "click-soft", t: k.desc, vol: 0.4 },
        { name: "click-soft", t: k.forte, vol: 0.4 },
      ],
    };
  },
};
