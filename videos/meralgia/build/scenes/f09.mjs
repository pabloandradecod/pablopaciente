// F9 — O que se sente: queimação, formigamento, dormência na lateral da coxa; roupa encostando incomoda;
// um lado só; piora em pé/andando; alivia sentado; meia-idade
export default {
  build(ctx) {
    const { C, human, w, LILAC } = ctx;
    const k = {
      sente: w(0, "sente"), queim: w(0, "queimação"), form: w(0, "formigamento"), dorm: w(0, "dormência"), lat: w(0, "lateral"),
      roupa: w(0, "roupa"), inc: w(0, "incomoda"), lado: w(0, "lado"), piora: w(0, "piora"), pe: w(0, "pé"), and: w(0, "andando"),
      aliv: w(0, "aliviar"), sent: w(0, "sentado"), comum: w(0, "comum"), meia: w(0, "meia"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const items = [
      { t: "<b>Queimação</b>", ic: `<path d="M0 34 Q-30 30 -26 4 Q-22 -14 -8 -20 Q-10 -4 0 0 Q-2 -24 14 -36 Q12 -14 24 -2 Q32 30 0 34Z" fill="${C.pain}" ${st(5)}/>` },
      { t: "<b>Formigamento</b>", ic: [[-18, -14], [6, 0], [-10, 18], [18, 22]].map(([x, y]) => `<g transform="translate(${x},${y})"><ellipse rx="8" ry="5" fill="${C.ink}"/><circle cx="9" r="4" fill="${C.ink}"/></g>`).join("") },
      { t: "<b>Dormência</b>", ic: `<rect x="-24" y="-24" width="48" height="48" rx="8" fill="#CFEFF7" ${st(5)} transform="rotate(12)"/><path d="M-8 -10 L8 -14" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` },
      { t: "Até a <b>roupa</b> encostando incomoda", ic: `<path d="M-24 -30 L24 -30 L28 34 L8 34 L0 -2 L-8 34 L-28 34 Z" fill="${C.blue}" ${st(5)}/><path d="M18 -16 l12 -6 l-6 12 l12 -4" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>` },
      { t: "Geralmente de <b>UM lado</b> só", ic: `<rect x="-30" y="-30" width="26" height="60" rx="10" fill="${LILAC}" ${st(5)}/><rect x="4" y="-30" width="26" height="60" rx="10" fill="#fff" ${st(5)}/>` },
    ];
    // Seu Zé em pé: quadril (1440,620) escala 1.45; coxa da frente desce até ~ (1452,748)
    return {
      k,
      css: `
        #f09-h { left:120px; top:70px; font-size:72px; }
        #root .f09-it { position:absolute; left:120px; width:640px; height:96px; display:flex; align-items:center; gap:22px; font-size:40px;
          background:#fff; border:6px solid ${C.ink}; border-radius:22px; padding:0 22px; box-shadow:7px 7px 0 ${C.ink}; }
        #root .f09-it b { color:#7A55C9; }
        #f09-pan { left:830px; top:170px; width:400px; padding:18px 22px; font-size:34px; line-height:1.3; }
        #f09-pan .r { color:${C.pain}; } #f09-pan .g { color:#1E9E73; }
        #f09-seal { left:830px; top:470px; width:400px; padding:16px 20px; font-size:34px; line-height:1.15; text-align:center; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1480" cy="540" r="330" fill="${C.wall}"/>
      <g id="f09-stool" opacity="0"><rect x="1360" y="768" width="190" height="28" rx="10" fill="${C.brown}" ${st(6)}/><path d="M1380 796 L1370 880 M1530 796 L1540 880" ${st(8)}/></g>
      <g transform="translate(1440,620) scale(1.45)">${human("f09z", "ze")}</g>
      <g id="f09-patch" opacity="0">
        <ellipse id="f09-pe" cx="1454" cy="690" rx="30" ry="58" fill="${LILAC}" opacity="0.85" stroke="#fff" stroke-width="5"/>
        <circle id="f09-ring" cx="1454" cy="690" r="40" fill="none" stroke="${LILAC}" stroke-width="6"/>
      </g>
      <g id="f09-patch2" opacity="0"><ellipse cx="1515" cy="752" rx="60" ry="26" fill="${LILAC}" stroke="#fff" stroke-width="5"/></g>
      <g id="f09-lbl" opacity="0"><path d="M1490 680 L1640 600" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/><rect x="1610" y="560" width="220" height="54" rx="14" fill="#fff" ${st(5)}/><text x="1720" y="597" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">lateral da coxa</text></g>
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">O que se sente:</div>
    ${items.map((it, i) => `<div id="f09-i${i}" class="f09-it label" style="top:${180 + i * 124}px;opacity:0"><svg width="80" height="80" viewBox="-40 -40 80 80" style="flex:none">${it.ic}</svg><span>${it.t}</span></div>`).join("")}
    <div id="f09-pan" class="abs card label" style="opacity:0"><div id="f09-p1"><span class="r">PIORA:</span> muito tempo em pé ou andando</div><div id="f09-p2" style="opacity:0;margin-top:10px"><span class="g">ALIVIA:</span> sentado</div></div>
    <div id="f09-seal" class="abs card label" style="opacity:0">Mais comum na <b>meia-idade</b></div>`,
      js: function (tl, K, R) {
        const z = "f09z";
        R.setPose(tl, z, 0, { shF: -8, elF: -15, shB: 6, elB: -10, hipF: 4, hipB: -4 });
        R.blinks(tl, z, 0.3, K.dur);
        R.slideIn(tl, "#f09-h", K.sente - 0.4, 0.45, -200);
        const t0 = [K.queim, K.form, K.dorm, K.roupa, K.lado];
        t0.forEach((t, i) => tl.fromTo(`#f09-i${i}`, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, t - 0.15));
        // coxa lilás
        tl.set("#f09-patch", { opacity: 1 }, K.queim);
        tl.fromTo("#f09-pe", { scale: 0 }, { scale: 1, svgOrigin: "1454 690", duration: 0.4, ease: "back.out(2.5)" }, K.queim);
        tl.fromTo("#f09-ring", { attr: { r: 30 }, opacity: 1 }, { attr: { r: 90 }, opacity: 0, duration: 0.9, repeat: 4, ease: "power1.out" }, K.queim + 0.3);
        R.face(tl, z, K.queim, { eyes: "pain", mouth: "frown" });
        R.shake(tl, "#f09z-root", K.form, 0.4, 3);
        R.face(tl, z, K.dorm, { eyes: "wide", mouth: "flat" });
        R.fadeIn(tl, "#f09-lbl", K.lat, 0.3);
        // a roupa encostando: tapinha na coxa e careta
        R.pose(tl, z, K.roupa, 0.25, { shF: -20, elF: -40 }, "power3.out");
        R.face(tl, z, K.inc, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f09-i3", K.inc, 0.3, 4);
        R.pose(tl, z, K.inc + 0.5, 0.3, { shF: -8, elF: -15 });
        R.face(tl, z, K.lado, { eyes: "normal", mouth: "flat" });
        // piora em pé / andando
        R.fadeOut(tl, "#f09-lbl", K.piora - 0.3);
        R.pop(tl, "#f09-pan", K.piora - 0.1, 0.4);
        for (let i = 0; i < 4; i++) R.pose(tl, z, K.and - 0.2 + i * 0.3, 0.28, { hipF: i % 2 ? 22 : -22, hipB: i % 2 ? -22 : 22, knF: i % 2 ? 0 : 22, knB: i % 2 ? 22 : 0, shF: i % 2 ? -25 : 15, shB: i % 2 ? 15 : -25 }, "sine.inOut");
        tl.to("#f09-pe", { fill: "#E05AD8", duration: 0.25, yoyo: true, repeat: 3 }, K.and);
        R.face(tl, z, K.and + 0.3, { eyes: "pain", mouth: "frown" });
        // alivia sentado
        tl.set("#f09-p2", { opacity: 1 }, K.sent - 0.1);
        tl.fromTo("#f09-p2", { x: -40 }, { x: 0, duration: 0.35, ease: "back.out(2)" }, K.sent - 0.1);
        R.fadeIn(tl, "#f09-stool", K.aliv, 0.2);
        R.pose(tl, z, K.aliv + 0.1, 0.4, { hipF: -88, hipB: -92, knF: 88, knB: 92, shF: -40, elF: -40, shB: -30, elB: -40 });
        R.move(tl, z, K.aliv + 0.1, 0.4, 0, 96);
        R.fadeOut(tl, "#f09-patch", K.aliv + 0.05, 0.2);
        tl.fromTo("#f09-patch2", { opacity: 0 }, { opacity: 0.55, duration: 0.3 }, K.aliv + 0.5);
        R.face(tl, z, K.sent + 0.2, { eyes: "happy", mouth: "smile" });
        // meia-idade
        R.pop(tl, "#f09-seal", K.comum - 0.1, 0.45);
        R.shake(tl, "#f09-seal", K.meia + 0.2, 0.3, 4);
      },
      sfx: [
        { name: "whoosh-short", t: k.sente - 0.4, vol: 0.35 },
        { name: "pop", t: k.queim - 0.1, vol: 0.4 },
        { name: "pop", t: k.form - 0.1, vol: 0.3 },
        { name: "pop", t: k.dorm - 0.1, vol: 0.3 },
        { name: "glitch-1", t: k.inc, vol: 0.2, dur: 0.35 },
        { name: "pop", t: k.piora - 0.1, vol: 0.35 },
        { name: "pop", t: k.comum, vol: 0.4 },
      ],
    };
  },
};
