// F16 — Cartela do bloco 3 "BORA SE MEXER!": escada da carga, mitos riscados (repouso total, corticoide no tendão) e regra da dor ≤3/10
export default {
  speakers: { molao: "f16m" },
  tail: 1.0,
  build(ctx) {
    const { C, molao, w, lines } = ctx;
    const k = {
      hora: w(0, "Hora"), esc: w(0, "escada"), rep: w(0, "Repouso"), res: w(0, "resolve"), inj: w(0, "injeção"), rec: w(0, "recomendada"),
      regra: w(0, "regra"), tres: w(0, "três"), norm: w(0, "normal"), seg: w(0, "seguir"),
      m0: lines[1].start, m1: lines[1].end,
    };
    const stepCols = ["#BFE6EE", "#FFC94A", "#FF9F6B", "#3DD9A4"];
    const stepLbl = ["ISOMETRIA", "FORÇA", "SALTOS", "ESPORTE"];
    const steps = [0, 1, 2, 3].map((i) => {
      const x = 1180 + i * 165, h = 120 + i * 110;
      return `<g id="f16-s${i}"><rect x="${x}" y="${830 - h}" width="160" height="${h}" fill="${stepCols[i]}" stroke="${C.ink}" stroke-width="7"/>
        <circle cx="${x + 30}" cy="${830 - h + 30}" r="19" fill="#fff" stroke="${C.ink}" stroke-width="5"/><text x="${x + 30}" y="${830 - h + 40}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">${i + 1}</text>
        <text x="${x + 80}" y="${830 - h + 82}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">${stepLbl[i]}</text></g>`;
    }).join("");
    return {
      k,
      bg: C.good,
      css: `
        #f16-num { left:140px; top:80px; font-size:190px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f16-title { left:140px; top:270px; font-size:104px; color:${C.ink}; line-height:0.95; }
        #f16-esc { left:1200px; top:110px; padding:10px 22px; font-size:38px; background:#fff; border:6px solid ${C.ink}; border-radius:16px; }
        #f16-myths { left:140px; top:530px; width:960px; padding:18px 26px; }
        #root .f16-row { position:relative; display:flex; align-items:center; gap:18px; margin:8px 0; }
        #root .f16-row .m { font-size:24px; color:#D64534; width:84px; }
        #root .f16-row .t { font-size:40px; line-height:1.05; }
        #root .f16-x { position:absolute; left:96px; top:50%; height:12px; background:#D64534; border-radius:8px; transform-origin:0% 50%; }
        #f16-gold { left:150px; top:480px; font-size:30px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
        #f16-rule { left:140px; top:530px; width:960px; padding:20px 26px; }
        #f16-rule .t { font-size:38px; line-height:1.15; }
        #f16-rule .t b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1500 520 L${1500 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1500 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <line x1="1100" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${steps}
      <g id="f16-m-wrap" opacity="0"><g id="f16-m-shake"><g transform="translate(1262,710) scale(0.62)">${molao("f16m")}</g></g></g>
      <g id="f16-sofa" opacity="0"><g transform="translate(960,420)">
        <rect x="-70" y="-50" width="140" height="60" rx="18" fill="#8E6CD8" stroke="${C.ink}" stroke-width="6"/><rect x="-80" y="-80" width="30" height="90" rx="12" fill="#7A57C4" stroke="${C.ink}" stroke-width="6"/><rect x="50" y="-80" width="30" height="90" rx="12" fill="#7A57C4" stroke="${C.ink}" stroke-width="6"/>
        <path d="M-80 -110 L80 30 M80 -110 L-80 30" stroke="#D64534" stroke-width="14" stroke-linecap="round"/></g></g>
    </svg>
    <div id="f16-num" class="abs title" style="opacity:0">3.</div>
    <div id="f16-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f16-esc" class="abs title" style="opacity:0">A ESCADA DA CARGA</div>
    <div id="f16-myths" class="abs card" style="opacity:0">
      <div class="f16-row" id="f16-r0" style="opacity:0"><span class="m label">MITO</span><span class="t title">REPOUSO TOTAL</span><span id="f16-x0" class="f16-x" style="width:420px"></span></div>
      <div class="f16-row" id="f16-r1" style="opacity:0"><span class="m label">MITO</span><span class="t title">INJEÇÃO DE CORTICOIDE NO TENDÃO</span><span id="f16-x1" class="f16-x" style="width:810px"></span></div>
    </div>
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
        // a escada da carga sobe degrau por degrau
        R.pop(tl, "#f16-esc", K.esc - 0.2, 0.4);
        for (let i = 0; i < 4; i++) tl.fromTo(`#f16-s${i}`, { y: 400 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.esc + i * 0.2);
        // mitos riscados
        R.pop(tl, "#f16-myths", K.rep - 0.3, 0.4, 0.7);
        R.rise(tl, "#f16-r0", K.rep - 0.15, 0.3, 14);
        tl.fromTo("#f16-x0", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.res);
        R.rise(tl, "#f16-r1", K.inj - 0.15, 0.3, 14);
        tl.fromTo("#f16-x1", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out" }, K.rec);
        // regra da dor
        R.fadeOut(tl, "#f16-myths", K.regra - 0.4, 0.25);
        R.rise(tl, "#f16-gold", K.regra - 0.25, 0.35, 20);
        R.pop(tl, "#f16-rule", K.regra - 0.1, 0.45, 0.6);
        for (let i = 0; i <= 10; i++) tl.to(`#f16-p${i} rect`, { opacity: 1, duration: 0.12 }, K.tres - 0.3 + i * 0.05);
        tl.to("#f16-ok", { opacity: 1, duration: 0.2 }, K.tres + 0.4);
        tl.to("#f16-t1", { opacity: 1, duration: 0.25 }, K.tres);
        tl.to("#f16-t2", { opacity: 1, duration: 0.25 }, K.norm);
        tl.to("#f16-rule", { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1 }, K.seg);
        // Molão pula no degrau 1: nada de pijama no sofá
        tl.set("#f16-m-wrap", { opacity: 1 }, K.m0 - 0.5);
        tl.fromTo("#f16-m-wrap", { y: -600 }, { y: 0, duration: 0.45, ease: "bounce.out" }, K.m0 - 0.5);
        R.face(tl, "f16m", 0, { eyes: "normal", mouth: "smile" });
        R.setPose(tl, "f16m", 0, { armF: 20, armB: -20 });
        tl.fromTo("#f16m-coil", { scaleY: 1 }, { scaleY: 0.6, transformOrigin: "50% 100%", duration: 0.12, ease: "power2.in" }, K.m0 - 0.08);
        tl.fromTo("#f16m-top", { y: 0 }, { y: 84, duration: 0.12, ease: "power2.in" }, K.m0 - 0.08);
        tl.to("#f16m-coil", { scaleY: 1, transformOrigin: "50% 100%", duration: 0.3, ease: "back.out(3)" }, K.m0 + 0.06);
        tl.to("#f16m-top", { y: 0, duration: 0.3, ease: "back.out(3)" }, K.m0 + 0.06);
        R.pose(tl, "f16m", K.m0 + 0.1, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.face(tl, "f16m", K.m0 + 0.1, { eyes: "wide" });
        R.pop(tl, "#f16-sofa", K.m0 + 0.6, 0.4);
        R.shake(tl, "#f16-m-shake", K.m0 + 0.9, 0.4, 4);
        R.face(tl, "f16m", K.m1 - 0.2, { eyes: "happy" });
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "pop", t: k.esc, vol: 0.35 },
        { name: "whoosh-short", t: k.res, vol: 0.4 },
        { name: "whoosh-short", t: k.rec, vol: 0.4 },
        { name: "pop", t: k.regra - 0.1, vol: 0.4 },
        { name: "click-soft", t: k.tres, vol: 0.4 },
        { name: "impact-bass-2", t: k.m0 - 0.08, vol: 0.35 },
        { name: "pop", t: k.m0 + 0.6, vol: 0.35 },
      ],
    };
  },
};
