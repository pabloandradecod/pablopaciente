// F17 — Cartela do bloco 3 "BORA SE MEXER!": escada da panturrilha, mitos riscados (repouso, só alongar, corticoide no tendão), regra da dor ≤3/10 + rigidez da manhã; Aquiles pula no degrau 1
export default {
  speakers: { aquiles: "f17a" },
  tail: 1.0,
  build(ctx) {
    const { C, aquiles, w, lines } = ctx;
    const k = {
      hora: w(0, "Hora"), rep: w(0, "repouso"), res: w(0, "resolve"), alo: w(0, "alongar"), tamb: w(0, "também"), inj: w(0, "injeção"), rec: w(0, "recomendada"),
      regra: w(0, "regra"), tres: w(0, "três"), rig: w(0, "rigidez"), pior: w(0, "piorar"),
      a0: lines[1].start, a1: lines[1].end,
    };
    const stepCols = ["#BFE6EE", "#FFC94A", "#FF9F6B", "#3DD9A4"];
    const stepLbl = ["ISOMETRIA", "FORÇA", "SALTOS", "CORRIDA"];
    const steps = [0, 1, 2, 3].map((i) => {
      const x = 1180 + i * 165, h = 120 + i * 110;
      return `<g id="f17-s${i}"><rect x="${x}" y="${830 - h}" width="160" height="${h}" fill="${stepCols[i]}" stroke="${C.ink}" stroke-width="7"/>
        <circle cx="${x + 30}" cy="${830 - h + 30}" r="19" fill="#fff" stroke="${C.ink}" stroke-width="5"/><text x="${x + 30}" y="${830 - h + 40}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">${i + 1}</text>
        <text x="${x + 80}" y="${830 - h + 82}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">${stepLbl[i]}</text></g>`;
    }).join("");
    const row = (i, t, wd) => `<div class="f17-row" id="f17-r${i}" style="opacity:0"><span class="m label">MITO</span><span class="t title">${t}</span><span id="f17-x${i}" class="f17-x" style="width:${wd}px"></span></div>`;
    return {
      k,
      bg: C.good,
      css: `
        #f17-num { left:140px; top:70px; font-size:180px; color:#fff; -webkit-text-stroke:8px ${C.ink}; paint-order:stroke fill; }
        #f17-title { left:140px; top:250px; font-size:100px; color:${C.ink}; line-height:0.95; }
        #f17-esc { left:1190px; top:110px; padding:10px 22px; font-size:34px; background:#fff; border:6px solid ${C.ink}; border-radius:16px; }
        #f17-myths { left:140px; top:500px; width:980px; padding:16px 26px; }
        #root .f17-row { position:relative; display:flex; align-items:center; gap:18px; margin:8px 0; }
        #root .f17-row .m { font-size:24px; color:#D64534; width:84px; }
        #root .f17-row .t { font-size:40px; line-height:1.05; }
        #root .f17-x { position:absolute; left:96px; top:50%; height:12px; background:#D64534; border-radius:8px; transform-origin:0% 50%; }
        #f17-gold { left:150px; top:470px; font-size:30px; color:#fff; background:${C.ink}; padding:6px 18px; border-radius:12px; }
        #f17-rule { left:140px; top:520px; width:980px; padding:20px 26px; }
        #f17-rule .t { font-size:36px; line-height:1.2; }
        #f17-rule .t b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M1500 520 L${1500 + Math.cos(a) * 1400} ${520 + Math.sin(a) * 1400} L${1500 + Math.cos(a + 0.2) * 1400} ${520 + Math.sin(a + 0.2) * 1400} Z" fill="#5BE3B5"/>`; }).join("")}
      <line x1="1100" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${steps}
      <g id="f17-a-wrap" opacity="0"><g id="f17-a-shake"><g transform="translate(1262,710) scale(0.55)">${aquiles("f17a")}</g></g></g>
      <g id="f17-sofa" opacity="0"><g transform="translate(1000,330)">
        <rect x="-80" y="-50" width="160" height="60" rx="18" fill="#8E6CD8" stroke="${C.ink}" stroke-width="6"/><rect x="-92" y="-84" width="32" height="94" rx="12" fill="#7A57C4" stroke="${C.ink}" stroke-width="6"/><rect x="60" y="-84" width="32" height="94" rx="12" fill="#7A57C4" stroke="${C.ink}" stroke-width="6"/>
        <path d="M-90 -120 L90 40 M90 -120 L-90 40" stroke="#D64534" stroke-width="14" stroke-linecap="round"/></g></g>
    </svg>
    <div id="f17-num" class="abs title" style="opacity:0">3.</div>
    <div id="f17-title" class="abs title" style="opacity:0">BORA SE<br>MEXER!</div>
    <div id="f17-esc" class="abs title" style="opacity:0">A ESCADA DA PANTURRILHA</div>
    <div id="f17-myths" class="abs card" style="opacity:0">
      ${row(0, "REPOUSO TOTAL", 420)}
      ${row(1, "SÓ ALONGAR", 330)}
      ${row(2, "INJEÇÃO DE CORTICOIDE NO TENDÃO", 810)}
    </div>
    <div id="f17-gold" class="abs label" style="opacity:0">A REGRA DA DOR</div>
    <div id="f17-rule" class="abs card" style="opacity:0">
      <svg width="900" height="80" viewBox="0 0 900 80">
        ${Array.from({ length: 11 }, (_, i) => `<g id="f17-p${i}"><rect x="${i * 81 + 4}" y="8" width="72" height="52" rx="12" fill="${i <= 3 ? "#3DD9A4" : "#FF8A7A"}" stroke="${C.ink}" stroke-width="5" opacity="0.35"/><text x="${i * 81 + 40}" y="45" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="${C.ink}">${i}</text></g>`).join("")}
        <rect id="f17-ok" x="0" y="2" width="324" height="64" rx="16" fill="none" stroke="${C.ink}" stroke-width="7" opacity="0"/>
      </svg>
      <div class="t label" style="margin-top:10px"><span id="f17-t1" style="opacity:0.3">Até <b>3 de 10</b> no exercício</span><br><span id="f17-t2" style="opacity:0.3">...e a <b>rigidez da manhã seguinte</b> não pode piorar</span></div>
    </div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f17-num", { scale: 3, opacity: 0, transformOrigin: "30% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.05);
        tl.fromTo("#f17-title", { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, Math.max(0.2, K.hora - 0.2));
        R.pop(tl, "#f17-esc", K.hora + 0.5, 0.4);
        for (let i = 0; i < 4; i++) tl.fromTo(`#f17-s${i}`, { y: 400 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.hora + 0.5 + i * 0.15);
        // mitos riscados
        R.pop(tl, "#f17-myths", K.rep - 0.3, 0.4, 0.7);
        R.rise(tl, "#f17-r0", K.rep - 0.15, 0.3, 14);
        tl.fromTo("#f17-x0", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.res);
        R.rise(tl, "#f17-r1", K.alo - 0.3, 0.3, 14);
        tl.fromTo("#f17-x1", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, K.tamb + 0.2);
        R.rise(tl, "#f17-r2", K.inj - 0.15, 0.3, 14);
        tl.fromTo("#f17-x2", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out" }, K.rec);
        // regra da dor
        R.fadeOut(tl, "#f17-myths", K.regra - 0.4, 0.25);
        R.rise(tl, "#f17-gold", K.regra - 0.25, 0.35, 20);
        R.pop(tl, "#f17-rule", K.regra - 0.1, 0.45, 0.6);
        for (let i = 0; i <= 10; i++) tl.to(`#f17-p${i} rect`, { opacity: 1, duration: 0.12 }, K.tres - 0.3 + i * 0.05);
        tl.to("#f17-ok", { opacity: 1, duration: 0.2 }, K.tres + 0.4);
        tl.to("#f17-t1", { opacity: 1, duration: 0.25 }, K.tres);
        tl.to("#f17-t2", { opacity: 1, duration: 0.25 }, K.rig - 0.2);
        tl.to("#f17-rule", { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1 }, K.pior);
        // Aquiles pula no degrau 1: herói não fica de pijama no sofá
        R.face(tl, "f17a", 0, { eyes: "normal", mouth: "smile" });
        R.setPose(tl, "f17a", 0, { armF: -20, armB: 20 });
        tl.set("#f17-a-wrap", { opacity: 1 }, K.a0 - 0.5);
        tl.fromTo("#f17-a-wrap", { y: -600 }, { y: 0, duration: 0.45, ease: "bounce.out" }, K.a0 - 0.5);
        R.pose(tl, "f17a", K.a0 + 0.05, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f17a", K.a0 + 0.05, { eyes: "wide" });
        R.pop(tl, "#f17-sofa", K.a0 + 0.5, 0.4);
        R.shake(tl, "#f17-a-shake", K.a0 + 0.9, 0.4, 4);
        R.face(tl, "f17a", K.a1 - 0.2, { eyes: "happy" });
      },
      sfx: [
        { name: "impact-bass-1", t: 0.05, vol: 0.4 },
        { name: "whoosh", t: Math.max(0.2, k.hora - 0.2), vol: 0.4 },
        { name: "pop", t: k.hora + 0.5, vol: 0.35 },
        { name: "whoosh-short", t: k.res, vol: 0.4 },
        { name: "whoosh-short", t: k.tamb + 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.rec, vol: 0.4 },
        { name: "pop", t: k.regra - 0.1, vol: 0.4 },
        { name: "click-soft", t: k.tres, vol: 0.4 },
        { name: "impact-bass-2", t: k.a0 - 0.1, vol: 0.35 },
        { name: "pop", t: k.a0 + 0.5, vol: 0.35 },
      ],
    };
  },
};
