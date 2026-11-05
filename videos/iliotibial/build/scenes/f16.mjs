// F16 — Cartela do bloco 3: mito "alongar o trato iliotibial" riscado; rolinho alivia mas não estica; foco: carga, passada, quadril
export default {
  speakers: { faixa: "f16f" },
  tail: 1.0,
  build(ctx) {
    const { C, vertebra, faixa, w, lines } = ctx;
    const k = {
      hora: w(0, "Hora"), mito: w(0, "mito"), estic: w(0, "esticar"), duro: w(0, "duro"), corda: w(0, "corda"), rol: w(0, "rolinho"), aliv: w(0, "aliviar"),
      naoest: w(0, "estica", 1), foco: w(0, "foco"), carga: w(0, "carga"), pass: w(0, "passada"), quad: w(0, "quadril"),
      f0: lines[1].start, f1: lines[1].end,
    };
    const band = `<rect x="-82" y="-138" width="164" height="22" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><path d="M-80 -128 L-112 -146 M-80 -126 L-110 -110" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`;
    const vert = vertebra("f16v").replace('<g id="f16v-eyes">', band + '<g id="f16v-eyes">');
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      bg: C.good,
      css: `
        #f16-num { left:140px; top:90px; font-size:200px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f16-title { left:140px; top:290px; font-size:110px; color:${C.ink}; line-height:0.95; }
        #f16-myth { left:140px; top:560px; width:1100px; height:270px; }
        #f16-rule { left:140px; top:560px; width:1100px; padding:22px 30px; }
        #f16-rule .t { font-size:42px; line-height:1.15; }
        #f16-rule .t b { color:#1E9C72; }
        #root .f16-chip { font-size:34px; padding:12px 24px; border-radius:40px; background:#E6FBF3; border:6px solid ${C.ink}; }
        #f16-gold { left:150px; top:508px; font-size:32px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1500 520 L${1500 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1500 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <ellipse cx="1480" cy="860" rx="300" ry="34" fill="${C.ink}" opacity="0.18"/>
      <g id="f16-v-wrap"><g transform="translate(1400,860) scale(1.5)">${vert}</g></g>
      <g id="f16-f-wrap" opacity="0"><g transform="translate(1720,860) scale(1.05)">${faixa("f16f")}</g></g>
    </svg>
    <div id="f16-num" class="abs title" style="opacity:0">3.</div>
    <div id="f16-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f16-myth" class="abs card" style="opacity:0">
      <svg class="abs" style="left:20px;top:20px" width="250" height="230" viewBox="0 0 250 230">
        <line x1="10" y1="220" x2="240" y2="220" stroke="${C.ink}" stroke-width="6"/>
        <rect x="196" y="20" width="26" height="200" rx="10" fill="#8FA7C2" ${st}/>
        <circle cx="80" cy="60" r="22" fill="#E3A47E" ${st}/>
        <path d="M78 82 L86 150" stroke="#B07ED8" stroke-width="30" stroke-linecap="round"/>
        <path d="M86 150 L60 216 M86 150 L118 214" stroke="#3E5A8A" stroke-width="20" stroke-linecap="round"/>
        <g id="f16-pull"><path d="M84 100 L196 110" stroke="#B07ED8" stroke-width="14" stroke-linecap="round"/></g>
        <path d="M120 70 L150 60 M120 84 L156 84" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>
      </svg>
      <div class="label abs" style="left:290px;top:22px;font-size:34px;color:#D64534">MITO</div>
      <div class="title abs" style="left:290px;top:66px;font-size:46px;line-height:1.05;width:780px">Alongar (esticar) o trato iliotibial</div>
      <svg id="f16-mx" class="abs" style="left:270px;top:56px;opacity:0" width="800" height="130" viewBox="0 0 800 130"><path d="M10 115 L790 15" stroke="#D64534" stroke-width="16" stroke-linecap="round"/></svg>
      <div id="f16-act" class="label abs" style="left:290px;top:196px;font-size:36px;color:#D64534;opacity:0">→ mais duro que corda de navio!</div>
    </div>
    <div id="f16-gold" class="abs label" style="opacity:0">O QUE FUNCIONA</div>
    <div id="f16-rule" class="abs card" style="opacity:0">
      <div id="f16-roll" class="t label" style="opacity:0;display:flex;align-items:center;gap:20px">
        <svg width="150" height="70" viewBox="0 0 150 70" style="flex:none"><rect x="6" y="14" width="138" height="44" rx="22" fill="#3DD9A4" stroke="${C.ink}" stroke-width="5"/><path d="M30 18 L30 54 M60 18 L60 54 M90 18 L90 54 M120 18 L120 54" stroke="#1E9C72" stroke-width="4"/></svg>
        <span>Rolinho de espuma: <b>pode aliviar</b>... <span id="f16-ne" style="color:#D64534;opacity:0">mas NÃO estica a faixa</span></span></div>
      <div style="display:flex;gap:18px;margin-top:18px">
        <div id="f16-c0" class="label f16-chip" style="opacity:0">CARGA do treino</div>
        <div id="f16-c1" class="label f16-chip" style="opacity:0">PASSADA mais curta</div>
        <div id="f16-c2" class="label f16-chip" style="opacity:0">QUADRIL forte</div>
      </div>
    </div>`,
      js: function (tl, K, R) {
        const v = "f16v";
        tl.fromTo("#f16-num", { scale: 3, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.05);
        tl.fromTo("#f16-title", { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, Math.max(0.2, K.hora - 0.2));
        R.setPose(tl, v, 0, { armF: 20, armB: -20, legF: 0, legB: 0 });
        R.face(tl, v, 0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f16-v-wrap", { y: 700 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.1);
        for (let i = 0; 0.9 + i * 0.55 + 0.4 < K.mito - 0.2; i++) {
          const t = 0.9 + i * 0.55;
          tl.to("#f16v-root", { y: -50, duration: 0.2, ease: "power2.out" }, t);
          tl.to("#f16v-root", { y: 0, duration: 0.2, ease: "power2.in" }, t + 0.2);
          R.pose(tl, v, t, 0.2, { armF: -150, armB: 150, legF: -18, legB: 18 }, "power2.out");
          R.pose(tl, v, t + 0.2, 0.2, { armF: 20, armB: -20, legF: 0, legB: 0 }, "power2.in");
        }
        // mito: esticar o trato
        R.pop(tl, "#f16-myth", K.mito - 0.2, 0.45, 0.6);
        R.face(tl, v, K.estic, { eyes: "wide", mouth: "flat" });
        tl.fromTo("#f16-pull", { x: 0 }, { x: -18, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.estic);
        tl.set("#f16-mx", { opacity: 1 }, K.duro - 0.1);
        tl.fromTo("#f16-mx", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.duro - 0.1);
        R.rise(tl, "#f16-act", K.corda - 0.2, 0.4, 16);
        // rolinho e foco
        R.fadeOut(tl, "#f16-myth", K.rol - 0.45, 0.25);
        R.rise(tl, "#f16-gold", K.rol - 0.3, 0.35, 20);
        R.pop(tl, "#f16-rule", K.rol - 0.2, 0.45, 0.6);
        R.fadeIn(tl, "#f16-roll", K.rol - 0.05, 0.3);
        R.fadeIn(tl, "#f16-ne", K.naoest - 0.2, 0.3);
        R.face(tl, v, K.aliv, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f16-c0", K.carga - 0.1, 0.35);
        R.pop(tl, "#f16-c1", K.pass - 0.1, 0.35);
        R.pop(tl, "#f16-c2", K.quad - 0.1, 0.35);
        R.pose(tl, v, K.quad, 0.35, { armF: -150, armB: 20 }, "back.out(2)");
        R.face(tl, v, K.quad, { eyes: "happy", mouth: "grin" });
        // Dona Faixa: pode puxar, ela não estica
        tl.set("#f16-f-wrap", { opacity: 1 }, K.f0 - 0.5);
        tl.fromTo("#f16-f-wrap", { y: 600 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.f0 - 0.5);
        R.face(tl, "f16f", K.f0 - 0.5, { eyes: "normal", mouth: "grin" });
        R.setPose(tl, "f16f", 0, { armF: 20, armB: -20 });
        R.pose(tl, "f16f", K.f0, 0.3, { armF: -60, armB: 60 }, "back.out(2)");
        tl.fromTo("#f16f-body", { scaleY: 1 }, { scaleY: 1.03, svgOrigin: "1720 860", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.f0 + 0.3);
        R.face(tl, "f16f", K.f0 + 0.9, { eyes: "happy" });
        R.face(tl, v, K.f0 + 0.3, { eyes: "wide", mouth: "open" });
        R.blinks(tl, v, K.rol + 0.5, K.dur);
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "pop", t: k.mito - 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.duro - 0.1, vol: 0.4 },
        { name: "pop", t: k.rol - 0.2, vol: 0.45 },
        { name: "pop", t: k.carga - 0.1, vol: 0.3 }, { name: "pop", t: k.pass - 0.1, vol: 0.3 }, { name: "pop", t: k.quad - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.f0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
