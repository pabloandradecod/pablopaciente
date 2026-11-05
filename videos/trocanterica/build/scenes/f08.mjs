// F8 — Quem tem: mulheres 40–60 (menopausa) em destaque; também sobrepeso, aumento súbito de atividade, corredores, dor lombar e artrose do joelho
export default {
  speakers: {},
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      mulh: w(0, "mulheres"), quar: w(0, "quarenta"), sess: w(0, "sessenta"), meno: w(0, "menopausa"), tend: w(0, "tendões"),
      sobre: w(0, "sobrepeso"), ativ: w(0, "atividade"), corr: w(0, "corredores"), lomb: w(0, "lombar"), artr: w(0, "artrose"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const chip = (i, x, y, label, svg) => `<div id="f08-chip${i}" class="abs card f08-chip" style="left:${x}px;top:${y}px;opacity:0"><svg width="70" height="70" viewBox="-40 -40 80 80">${svg}</svg><span class="label">${label}</span></div>`;
    return {
      k,
      css: `
        #f08-title { left:90px; top:60px; font-size:56px; }
        #f08-title span { color:#8E6CD8; }
        #f08-main { left:620px; top:170px; width:640px; padding:24px 30px; border-color:#8E6CD8; }
        #f08-main .big { font-size:54px; color:#8E6CD8; }
        #f08-main .age { font-size:76px; color:${C.ink}; }
        #f08-badge { left:1050px; top:140px; padding:8px 18px; font-size:28px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:14px; transform: rotate(8deg); }
        #f08-meno { left:620px; top:470px; width:640px; padding:16px 24px; font-size:30px; display:flex; align-items:center; gap:16px; }
        #root .f08-chip { display:flex; align-items:center; gap:12px; padding:8px 20px 8px 10px; border-width:6px; border-radius:20px; box-shadow:6px 6px 0 ${C.ink}; }
        #root .f08-chip .label { font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="340" cy="560" r="280" fill="#EFE3FF"/>
      <g id="f08-c-wrap"><g transform="translate(340,640) scale(1.35)">${human("f08c", "cida")}</g></g>
    </svg>
    <div id="f08-title" class="abs title" style="opacity:0">Quem <span>tem</span>?</div>
    <div id="f08-main" class="abs card" style="opacity:0"><div class="big title">MULHERES</div><div class="age title"><span id="f08-a1">40</span> a <span id="f08-a2">60</span> anos</div></div>
    <div id="f08-badge" class="abs title" style="opacity:0">MAIS COMUM</div>
    <div id="f08-meno" class="abs card label" style="opacity:0"><svg width="70" height="70" viewBox="-40 -40 80 80"><circle r="32" fill="#fff" ${st}/><g id="f08-hand"><line x1="0" y1="0" x2="0" y2="-22" ${st}/></g><line x1="0" y1="0" x2="16" y2="0" ${st}/></svg><span>Menopausa: os hormônios mudam e os <b style="color:${C.pain}">tendões ficam mais sensíveis</b></span></div>
    ${chip(0, 1340, 220, "Sobrepeso", `<rect x="-30" y="-6" width="60" height="30" rx="8" fill="#fff" ${st}/><line x1="0" y1="10" x2="12" y2="0" ${st}/>`)}
    ${chip(1, 1340, 340, "Mais atividade de repente", `<path d="M-30 24 L-10 4 L4 14 L30 -22" fill="none" ${st} stroke="${C.pain}" stroke-width="8"/>`)}
    ${chip(2, 1340, 460, "Corredores", `<circle cx="6" cy="-24" r="9" fill="${C.ink}"/><path d="M2 -14 L-4 8 L-22 20 M-4 8 L12 18 L8 32 M0 -4 L-16 0 M0 -4 L18 -12" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`)}
    ${chip(3, 1340, 580, "Dor lombar", `<rect x="-14" y="-30" width="28" height="18" rx="5" fill="${C.bone}" ${st}/><rect x="-14" y="-6" width="28" height="18" rx="5" fill="${C.bone}" ${st}/><rect x="-14" y="18" width="28" height="14" rx="5" fill="${C.bone}" ${st}/><circle cx="0" cy="8" r="20" fill="${C.pain}" opacity="0.3"/>`)}
    ${chip(4, 1340, 700, "Artrose no joelho", `<path d="M-6 -34 L-6 -4 Q-6 6 4 8 L4 34" stroke="${C.ink}" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M-6 -34 L-6 -4 Q-6 6 4 8 L4 34" stroke="${C.bone}" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="0" cy="2" r="14" fill="${C.pain}" opacity="0.4"/>`)}`,
      js: function (tl, K, R) {
        R.drop(tl, "#f08-title", 0.1, 0.7, -200);
        const c = "f08c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        R.idle(tl, c, 0.5, K.dur, 1.5);
        // mulheres 40–60
        R.pop(tl, "#f08-main", K.mulh - 0.1, 0.45);
        R.pose(tl, c, K.mulh, 0.35, { shF: -160, elF: -30 }, "back.out(2)");
        for (let i = 0; i < 2; i++) R.pose(tl, c, K.mulh + 0.35 + i * 0.3, 0.15, { elF: i % 2 ? -30 : 10 }, "sine.inOut");
        R.face(tl, c, K.mulh, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f08-a1", { opacity: 0.15 }, { opacity: 1, duration: 0.3 }, K.quar);
        tl.fromTo("#f08-a2", { opacity: 0.15 }, { opacity: 1, duration: 0.3 }, K.sess);
        R.pop(tl, "#f08-badge", K.sess + 0.3, 0.4);
        R.pose(tl, c, K.sess + 0.5, 0.4, { shF: -40, elF: -50 });
        // menopausa
        R.pop(tl, "#f08-meno", K.meno - 0.1, 0.4);
        tl.to("#f08-hand", { rotation: 720, svgOrigin: "0 0", duration: 1.6, ease: "power1.inOut" }, K.meno);
        R.face(tl, c, K.tend, { eyes: "normal", mouth: "flat" });
        // outros perfis
        [K.sobre, K.ativ, K.corr, K.lomb, K.artr].forEach((t, i) => R.slideIn(tl, `#f08-chip${i}`, t - 0.1, 0.4, 160));
        R.face(tl, c, K.corr, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.mulh - 0.1, vol: 0.4 },
        { name: "sparkle", t: k.sess + 0.3, vol: 0.35 },
        { name: "pop", t: k.meno - 0.1, vol: 0.35 },
        ...[k.sobre, k.ativ, k.corr, k.lomb, k.artr].map((t) => ({ name: "pop", t: t - 0.1, vol: 0.28 })),
      ],
    };
  },
};
