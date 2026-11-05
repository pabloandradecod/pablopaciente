// F9 — O que se sente: dor funda na nádega (acende no Seu Zé), piora sentado/levantar/cruzar perna, às vezes desce pela coxa; mais comum em mulheres
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      sente: w(0, "sente"), funda: w(0, "funda"), nad: w(0, "nádega"), piora: w(0, "piora"), sent: w(0, "sentado"),
      lev: w(0, "levantar"), cruz: w(0, "cruzar"), desce: w(0, "desce"), coxa: w(0, "coxa"), comum: w(0, "comum"), mulh: w(0, "mulheres"), meia: w(0, "meia"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const items = [
      { t: "Dor <b>FUNDA</b> na nádega", ic: `<circle r="30" fill="${C.pain}" ${st(5)}/><circle r="12" fill="#fff"/>` },
      { t: "Piora <b>SENTADO</b>", ic: `<rect x="-34" y="-2" width="68" height="12" rx="4" fill="${C.brown}" ${st(5)}/><path d="M-28 10 L-28 36 M28 10 L28 36 M28 -2 L36 -34" ${st(6)}/><circle cx="-10" cy="-24" r="16" fill="#fff" ${st(4)}/><path d="M-10 -24 L-10 -33 M-10 -24 L-3 -24" ${st(3)}/>` },
      { t: "Ao <b>LEVANTAR</b> da cadeira", ic: `<path d="M-30 30 L-30 -10 L0 -10" fill="none" ${st(6)}/><path d="M10 34 L10 -6 M10 -6 L28 -30" ${st(8)}/><circle cx="30" cy="-42" r="10" fill="${C.ink}"/><path d="M-14 -36 l10 8 l-8 4 l12 10" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>` },
      { t: "Ao <b>CRUZAR</b> a perna", ic: `<path d="M-34 20 L0 -6 L34 20 M-34 -10 L34 14" ${st(8)}/><path d="M18 -34 L40 -12 M40 -34 L18 -12" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>` },
      { t: "Às vezes <b>desce</b> pela coxa", ic: `<path d="M0 -36 L0 26" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" opacity="0.6"/><path d="M-16 12 L0 32 L16 12" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` },
    ];
    // Seu Zé em pé: quadril (1440,620) escala 1.45; nádega atrás (à esquerda) do quadril
    const B = [1384, 628];
    return {
      k,
      css: `
        #f09-h { left:120px; top:70px; font-size:72px; }
        #root .f09-it { position:absolute; left:120px; width:720px; height:96px; display:flex; align-items:center; gap:22px; font-size:42px;
          background:#fff; border:6px solid ${C.ink}; border-radius:22px; padding:0 22px; box-shadow:7px 7px 0 ${C.ink}; }
        #root .f09-it b { color:${C.pain}; }
        #f09-seal { left:880px; top:150px; width:430px; padding:16px 20px; font-size:34px; line-height:1.15; text-align:center; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1460" cy="540" r="330" fill="${C.wall}"/>
      <g transform="translate(1440,620) scale(1.45)">${human("f09z", "ze")}</g>
      <g id="f09-thigh" opacity="0"><path d="M1400 650 L1418 740" stroke="${C.pain}" stroke-width="30" stroke-linecap="round" opacity="0.45"/></g>
      <g id="f09-glow" opacity="0">
        <circle id="f09-ring" cx="${B[0]}" cy="${B[1]}" r="40" fill="none" stroke="${C.pain}" stroke-width="6"/>
        <circle cx="${B[0]}" cy="${B[1]}" r="30" fill="${C.pain}" opacity="0.45"/>
        <circle cx="${B[0]}" cy="${B[1]}" r="15" fill="${C.pain}" stroke="#fff" stroke-width="5"/>
      </g>
      <g id="f09-lbl" opacity="0"><path d="M${B[0] - 30} ${B[1] - 10} L1240 520" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/><rect x="1080" y="488" width="170" height="54" rx="14" fill="#fff" ${st(5)}/><text x="1165" y="525" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">nádega</text></g>
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">O que se sente:</div>
    ${items.map((it, i) => `<div id="f09-i${i}" class="f09-it label" style="top:${190 + i * 128}px;opacity:0"><svg width="80" height="80" viewBox="-40 -40 80 80" style="flex:none">${it.ic}</svg><span>${it.t}</span></div>`).join("")}
    <div id="f09-seal" class="abs card label" style="opacity:0">Mais comum em <b>mulheres</b> e adultos de <b>meia-idade</b></div>`,
      js: function (tl, K, R) {
        const z = "f09z";
        R.setPose(tl, z, 0, { shF: -8, elF: -15, shB: 6, elB: -10, hipF: 4, hipB: -4 });
        R.blinks(tl, z, 0.3, K.dur);
        R.idle(tl, z, 0, K.dur, 1.5);
        R.slideIn(tl, "#f09-h", K.sente - 0.4, 0.45, -200);
        // dor funda na nádega
        const t0 = [K.funda, K.sent, K.lev, K.cruz, K.desce];
        t0.forEach((t, i) => tl.fromTo(`#f09-i${i}`, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, t - 0.15));
        tl.set("#f09-glow", { opacity: 1 }, K.funda);
        tl.fromTo("#f09-glow", { scale: 0 }, { scale: 1, svgOrigin: "1384 628", duration: 0.4, ease: "back.out(2.5)" }, K.funda);
        tl.fromTo("#f09-ring", { attr: { r: 30 }, opacity: 1 }, { attr: { r: 80 }, opacity: 0, duration: 0.8, repeat: 5, ease: "power1.out" }, K.funda + 0.3);
        R.fadeIn(tl, "#f09-lbl", K.nad, 0.3);
        R.face(tl, z, K.funda, { eyes: "pain", mouth: "frown" });
        // mão na nádega
        R.pose(tl, z, K.nad, 0.3, { shB: 28, elB: -8, torso: 8 }, "back.out(1.6)");
        // piora sentado / levantar / cruzar: Zé reage a cada um
        R.shake(tl, "#f09-i1", K.sent + 0.3, 0.35, 5);
        R.face(tl, z, K.lev, { eyes: "wide", mouth: "scream" });
        R.shake(tl, "#f09z-root", K.lev, 0.45, 5);
        R.face(tl, z, K.lev + 0.7, { eyes: "pain", mouth: "frown" });
        R.pose(tl, z, K.cruz, 0.35, { hipF: -40, knF: 50 }, "back.out(1.6)");
        R.face(tl, z, K.cruz + 0.25, { eyes: "pain", mouth: "scream" });
        R.pose(tl, z, K.cruz + 0.9, 0.35, { hipF: 4, knF: 0 });
        R.face(tl, z, K.cruz + 0.9, { eyes: "pain", mouth: "frown" });
        // desce pela coxa
        tl.set("#f09-thigh", { opacity: 1 }, K.desce);
        tl.fromTo("#f09-thigh path", { attr: { d: "M1400 650 L1402 660" } }, { attr: { d: "M1400 650 L1418 740" }, duration: 0.7, ease: "power2.out" }, K.desce);
        tl.to("#f09-thigh", { opacity: 0.5, duration: 0.25, yoyo: true, repeat: 3 }, K.coxa);
        // selo
        R.pop(tl, "#f09-seal", K.comum - 0.1, 0.45);
        R.shake(tl, "#f09-seal", K.mulh + 0.2, 0.3, 4);
        R.face(tl, z, K.comum, { eyes: "normal", mouth: "flat" });
      },
      sfx: [
        { name: "whoosh-short", t: k.sente - 0.4, vol: 0.35 },
        { name: "pop", t: k.funda - 0.1, vol: 0.4 },
        { name: "impact-bass-1", t: k.funda, vol: 0.35 },
        { name: "pop", t: k.sent - 0.1, vol: 0.3 },
        { name: "glitch-1", t: k.lev, vol: 0.25, dur: 0.35 },
        { name: "pop", t: k.cruz - 0.1, vol: 0.3 },
        { name: "pop", t: k.desce - 0.1, vol: 0.3 },
        { name: "pop", t: k.comum, vol: 0.4 },
      ],
    };
  },
};
