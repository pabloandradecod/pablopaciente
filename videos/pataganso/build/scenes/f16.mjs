// F16 — Cartela do bloco 3 "BORA SE MEXER!": mito "repouso total" riscado e regra da dor ≤3/10
export default {
  tail: 1.0,
  build(ctx) {
    const { C, vertebra, w } = ctx;
    const k = {
      hora: w(0, "Hora"), rep: w(0, "Repouso"), res: w(0, "resolve"),
      regra: w(0, "regra"), tres: w(0, "três"), norm: w(0, "normal"), seg: w(0, "seguir"),
    };
    return {
      k,
      bg: C.good,
      css: `
        #f16-num { left:140px; top:80px; font-size:190px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f16-title { left:140px; top:270px; font-size:104px; color:${C.ink}; line-height:0.95; }
        #f16-myths { left:140px; top:540px; width:820px; padding:18px 26px; }
        #root .f16-row { position:relative; display:flex; align-items:center; gap:18px; }
        #root .f16-row .m { font-size:24px; color:#D64534; width:84px; }
        #root .f16-row .t { font-size:48px; line-height:1.05; }
        #f16-x0 { position:absolute; left:96px; top:50%; width:440px; height:12px; background:#D64534; border-radius:8px; transform-origin:0% 50%; }
        #f16-nao { left:990px; top:556px; font-size:34px; color:#fff; background:#D64534; padding:8px 18px; border-radius:14px; transform:rotate(4deg); }
        #f16-gold { left:150px; top:490px; font-size:30px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
        #f16-rule { left:140px; top:540px; width:960px; padding:20px 26px; }
        #f16-rule .t { font-size:38px; line-height:1.15; }
        #f16-rule .t b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1450 520 L${1450 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1450 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <line x1="1150" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f16-v-wrap"><g id="f16-v-jump"><g transform="translate(1480,830) scale(1.5)">${vertebra("f16v")}</g></g></g>
      <g id="f16-band"><path d="M1352 512 Q1480 490 1608 512" fill="none" stroke="${C.pain}" stroke-width="22" stroke-linecap="round"/><path d="M1604 508 L1660 480 M1604 516 L1656 540" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/></g>
      <g id="f16-bed" opacity="0"><g transform="translate(1240,300)">
        <rect x="-90" y="-20" width="180" height="40" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="6"/><rect x="-80" y="-48" width="60" height="30" rx="12" fill="${C.sky}" stroke="${C.ink}" stroke-width="5"/>
        <path d="M-100 -70 L100 50 M100 -70 L-100 50" stroke="#D64534" stroke-width="14" stroke-linecap="round"/></g></g>
    </svg>
    <div id="f16-num" class="abs title" style="opacity:0">3.</div>
    <div id="f16-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f16-myths" class="abs card" style="opacity:0">
      <div class="f16-row" id="f16-r0"><span class="m label">MITO</span><span class="t title">REPOUSO TOTAL</span><span id="f16-x0"></span></div>
    </div>
    <div id="f16-nao" class="abs title" style="opacity:0">não resolve!</div>
    <div id="f16-gold" class="abs label" style="opacity:0">A REGRA DA DOR</div>
    <div id="f16-rule" class="abs card" style="opacity:0">
      <svg width="900" height="80" viewBox="0 0 900 80">
        ${Array.from({ length: 11 }, (_, i) => `<g id="f16-p${i}"><rect x="${i * 81 + 4}" y="8" width="72" height="52" rx="12" fill="${i <= 3 ? "#3DD9A4" : "#FF8A7A"}" stroke="${C.ink}" stroke-width="5" opacity="0.35"/><text x="${i * 81 + 40}" y="45" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="${C.ink}">${i}</text></g>`).join("")}
        <rect id="f16-ok" x="0" y="2" width="324" height="64" rx="16" fill="none" stroke="${C.ink}" stroke-width="7" opacity="0"/>
      </svg>
      <div class="t label" style="margin-top:10px"><span id="f16-t1" style="opacity:0.3">Até <b>3 de 10</b> durante o exercício</span><br><span id="f16-t2" style="opacity:0.3">...e <b>normal no dia seguinte</b>: pode seguir!</span></div>
    </div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f16-num", { scale: 3, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.05);
        tl.fromTo("#f16-title", { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, Math.max(0.2, K.hora - 0.2));
        // Vértebra de faixa pulando
        tl.fromTo("#f16-v-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, 0.2);
        tl.fromTo("#f16-band", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, 0.2);
        R.face(tl, "f16v", 0, { eyes: "happy", mouth: "grin" });
        R.setPose(tl, "f16v", 0, { armF: -150, armB: 150 });
        for (let i = 0; i < 3; i++) {
          tl.to("#f16-v-jump, #f16-band", { y: -60, duration: 0.2, ease: "power2.out" }, 0.9 + i * 0.5);
          tl.to("#f16-v-jump, #f16-band", { y: 0, duration: 0.2, ease: "power2.in" }, 1.1 + i * 0.5);
        }
        // mito: repouso total
        R.pop(tl, "#f16-myths", K.rep - 0.3, 0.4, 0.7);
        R.pop(tl, "#f16-bed", K.rep, 0.4);
        tl.fromTo("#f16-x0", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.res - 0.1);
        R.pop(tl, "#f16-nao", K.res, 0.35);
        R.face(tl, "f16v", K.rep, { eyes: "wide", mouth: "flat" });
        // regra da dor
        R.fadeOut(tl, "#f16-myths, #f16-nao, #f16-bed", K.regra - 0.4, 0.25);
        R.rise(tl, "#f16-gold", K.regra - 0.25, 0.35, 20);
        R.pop(tl, "#f16-rule", K.regra - 0.1, 0.45, 0.6);
        for (let i = 0; i <= 10; i++) tl.to(`#f16-p${i} rect`, { opacity: 1, duration: 0.12 }, K.tres - 0.3 + i * 0.05);
        tl.to("#f16-ok", { opacity: 1, duration: 0.2 }, K.tres + 0.4);
        tl.to("#f16-t1", { opacity: 1, duration: 0.25 }, K.tres);
        tl.to("#f16-t2", { opacity: 1, duration: 0.25 }, K.norm);
        R.face(tl, "f16v", K.tres, { eyes: "normal", mouth: "smile" });
        R.face(tl, "f16v", K.seg, { eyes: "happy", mouth: "grin" });
        tl.to("#f16-rule", { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1 }, K.seg);
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "whoosh-short", t: k.res - 0.1, vol: 0.4 },
        { name: "pop", t: k.regra - 0.1, vol: 0.4 },
        { name: "click-soft", t: k.tres, vol: 0.4 },
      ],
    };
  },
};
