// F17 — Cartela do bloco 3 "BORA SE MEXER!": mito do alongamento cruzando a perna riscado + regra da dor ≤5/10
export default {
  speakers: { faixa: "f17f" },
  tail: 1.0,
  build(ctx) {
    const { C, vertebra, faixa, w, lines } = ctx;
    const k = {
      hora: w(0, "Hora"), mito: w(0, "mito"), along: w(0, "alongamento"), pior: w(0, "piorar"), comp: w(0, "compressão"),
      regra: w(0, "regra"), leve: w(0, "leve"), passe: w(0, "passe"), dia: w(0, "dia"),
      f0: lines[1].start, f1: lines[1].end,
    };
    const band = `<rect x="-82" y="-138" width="164" height="22" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><path d="M-80 -128 L-112 -146 M-80 -126 L-110 -110" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`;
    const vert = vertebra("f17v").replace('<g id="f17v-eyes">', band + '<g id="f17v-eyes">');
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      bg: C.good,
      css: `
        #f17-num { left:140px; top:90px; font-size:200px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f17-title { left:140px; top:290px; font-size:110px; color:${C.ink}; line-height:0.95; }
        #f17-myth { left:140px; top:560px; width:1100px; height:270px; }
        #f17-rule { left:140px; top:560px; width:1100px; padding:22px 30px; }
        #f17-rule .t { font-size:42px; line-height:1.15; }
        #f17-rule .t b { color:#1E9C72; }
        #f17-gold { left:150px; top:508px; font-size:32px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1500 520 L${1500 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1500 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <ellipse cx="1480" cy="860" rx="300" ry="34" fill="${C.ink}" opacity="0.18"/>
      <g id="f17-v-wrap"><g transform="translate(1400,860) scale(1.5)">${vert}</g></g>
      <g id="f17-f-wrap" opacity="0"><g transform="translate(1720,860) scale(1.05)">${faixa("f17f")}</g></g>
    </svg>
    <div id="f17-num" class="abs title" style="opacity:0">3.</div>
    <div id="f17-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f17-myth" class="abs card" style="opacity:0">
      <svg class="abs" style="left:20px;top:20px" width="250" height="230" viewBox="0 0 250 230">
        <line x1="10" y1="220" x2="240" y2="220" stroke="${C.ink}" stroke-width="6"/>
        <circle cx="120" cy="34" r="22" fill="#E3A47E" ${st}/>
        <path d="M120 56 L118 130" stroke="#B07ED8" stroke-width="30" stroke-linecap="round"/>
        <path d="M118 130 L150 216 M118 130 L86 216" stroke="#3E5A8A" stroke-width="20" stroke-linecap="round"/>
        <path d="M120 80 L60 120" stroke="#B07ED8" stroke-width="14" stroke-linecap="round"/>
        <path d="M60 150 Q118 120 170 160" fill="none" stroke="${C.pain}" stroke-width="6" stroke-dasharray="10 8"/>
        <path d="M160 150 L172 162 L158 170" fill="none" stroke="${C.pain}" stroke-width="6"/>
      </svg>
      <div class="label abs" style="left:290px;top:22px;font-size:34px;color:#D64534">MITO</div>
      <div class="title abs" style="left:290px;top:66px;font-size:46px;line-height:1.05;width:780px">Alongar a lateral do quadril cruzando a perna</div>
      <svg id="f17-mx" class="abs" style="left:270px;top:56px;opacity:0" width="800" height="130" viewBox="0 0 800 130"><path d="M10 115 L790 15" stroke="#D64534" stroke-width="16" stroke-linecap="round"/></svg>
      <div id="f17-act" class="label abs" style="left:290px;top:196px;font-size:36px;color:#D64534;opacity:0">→ aumenta a compressão!</div>
    </div>
    <div id="f17-gold" class="abs label" style="opacity:0">A REGRA AQUI</div>
    <div id="f17-rule" class="abs card" style="opacity:0">
      <svg width="1030" height="90" viewBox="0 0 1030 90">
        ${Array.from({ length: 11 }, (_, i) => `<g id="f17-p${i}"><rect x="${i * 93 + 4}" y="10" width="84" height="54" rx="12" fill="${i <= 5 ? (i <= 2 ? "#3DD9A4" : "#FFC94A") : "#FF8A7A"}" stroke="${C.ink}" stroke-width="5" opacity="0.35"/><text x="${i * 93 + 46}" y="48" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">${i}</text></g>`).join("")}
        <rect id="f17-ok" x="0" y="4" width="559" height="66" rx="16" fill="none" stroke="${C.ink}" stroke-width="7" opacity="0"/>
      </svg>
      <div class="t label" style="margin-top:12px"><span id="f17-t1" style="opacity:0.3">Dor leve, até <b>5 de 10</b>, durante o exercício: pode</span><br><span id="f17-t2" style="opacity:0.3">...desde que <b>passe até o dia seguinte</b></span></div>
    </div>`,
      js: function (tl, K, R) {
        const v = "f17v";
        tl.fromTo("#f17-num", { scale: 3, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.05);
        tl.fromTo("#f17-title", { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, Math.max(0.2, K.hora - 0.2));
        R.setPose(tl, v, 0, { armF: 20, armB: -20, legF: 0, legB: 0 });
        R.face(tl, v, 0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f17-v-wrap", { y: 700 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.1);
        for (let i = 0; 0.9 + i * 0.55 + 0.4 < K.mito - 0.2; i++) {
          const t = 0.9 + i * 0.55;
          tl.to("#f17v-root", { y: -50, duration: 0.2, ease: "power2.out" }, t);
          tl.to("#f17v-root", { y: 0, duration: 0.2, ease: "power2.in" }, t + 0.2);
          R.pose(tl, v, t, 0.2, { armF: -150, armB: 150, legF: -18, legB: 18 }, "power2.out");
          R.pose(tl, v, t + 0.2, 0.2, { armF: 20, armB: -20, legF: 0, legB: 0 }, "power2.in");
        }
        // mito do alongamento
        R.pop(tl, "#f17-myth", K.mito - 0.2, 0.45, 0.6);
        R.face(tl, v, K.along, { eyes: "wide", mouth: "flat" });
        tl.set("#f17-mx", { opacity: 1 }, K.pior);
        tl.fromTo("#f17-mx", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.pior);
        R.rise(tl, "#f17-act", K.comp - 0.2, 0.4, 16);
        // regra da dor
        R.fadeOut(tl, "#f17-myth", K.regra - 0.4, 0.25);
        R.rise(tl, "#f17-gold", K.regra - 0.25, 0.35, 20);
        R.pop(tl, "#f17-rule", K.regra - 0.1, 0.45, 0.6);
        R.face(tl, v, K.regra, { eyes: "normal", mouth: "smile" });
        for (let i = 0; i <= 10; i++) tl.to(`#f17-p${i} rect`, { opacity: 1, duration: 0.12 }, K.leve - 0.2 + i * 0.06);
        tl.to("#f17-ok", { opacity: 1, duration: 0.2 }, K.leve + 0.5);
        tl.to("#f17-t1", { opacity: 1, duration: 0.25 }, K.leve);
        tl.to("#f17-t2", { opacity: 1, duration: 0.25 }, K.passe);
        R.pose(tl, v, K.dia, 0.35, { armF: -150, armB: 20 }, "back.out(2)");
        R.face(tl, v, K.dia, { eyes: "happy", mouth: "grin" });
        // Dona Faixa reclama: esticar só aperta
        tl.set("#f17-f-wrap", { opacity: 1 }, K.f0 - 0.5);
        tl.fromTo("#f17-f-wrap", { y: 600 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.f0 - 0.5);
        R.face(tl, "f17f", K.f0 - 0.5, { eyes: "wide", mouth: "flat" });
        R.setPose(tl, "f17f", 0, { armF: 20, armB: -20 });
        tl.to("#f17f-body", { scaleY: 1.18, svgOrigin: "0 0", duration: 0.35, ease: "power2.out" }, K.f0);
        R.pose(tl, "f17f", K.f0, 0.3, { armF: -130, armB: 130 }, "back.out(2)");
        tl.to("#f17f-body", { scaleX: 0.75, svgOrigin: "0 0", duration: 0.3, ease: "power2.in" }, K.f0 + 0.9);
        R.face(tl, "f17f", K.f0 + 0.9, { eyes: "pain" });
        R.face(tl, v, K.f0 + 0.3, { eyes: "wide", mouth: "open" });
        R.blinks(tl, v, K.regra + 0.5, K.dur);
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "pop", t: k.mito - 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.pior, vol: 0.4 },
        { name: "pop", t: k.regra - 0.1, vol: 0.45 },
        { name: "click-soft", t: k.leve, vol: 0.4 },
        { name: "whoosh-short", t: k.f0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
