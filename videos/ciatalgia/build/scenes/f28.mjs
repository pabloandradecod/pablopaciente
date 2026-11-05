// F28 — Resumo em 3 ideias + Seu Zé calça o sapato sem dor e faz joinha
export default {
  speakers: {},
  extra: 2.4,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = { res: w(0, "Resumindo"), sint: w(0, "sintoma"), aval: w(0, "avaliação"), mexer: w(0, "mexer"), mel: w(0, "melhora"), end: lines[0].end };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "pop", t: k.sint, vol: 0.4 }, { name: "pop", t: k.aval, vol: 0.4 }, { name: "pop", t: k.mexer, vol: 0.4 },
      { name: "sparkle", t: k.end + 0.4, vol: 0.45 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, x, label, svg, color) => `<div id="f28-i${i}" class="abs" style="left:${x - 180}px;top:110px;width:360px;text-align:center;opacity:0">
      <svg width="170" height="170" viewBox="-85 -85 170 170"><circle r="76" fill="${color}" stroke="${C.ink}" stroke-width="8"/>${svg}</svg>
      <div class="label" style="font-size:34px;line-height:1.1;margin-top:6px">${label}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f28-h { left:110px; top:40px; font-size:52px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f28-bed">
        <rect x="560" y="658" width="40" height="206" rx="10" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
        <rect x="600" y="750" width="420" height="66" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect x="600" y="808" width="420" height="38" rx="10" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
        <rect x="990" y="834" width="26" height="30" rx="8" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
        <rect x="618" y="700" width="120" height="56" rx="24" fill="${C.sky}" stroke="${C.ink}" stroke-width="7"/>
      </g>
      <g transform="translate(930,743) scale(1.1)">${human("f28z", "ze")}</g>
      <g id="f28-badge" opacity="0" transform="translate(1300,600)">
        <circle r="80" fill="${C.good}" stroke="${C.ink}" stroke-width="8"/>
        <path d="M-36 -2 L-14 -2 L-14 46 L-36 46 Z" fill="#fff" ${st}/>
        <path d="M-14 0 L4 -40 Q10 -56 22 -46 Q28 -38 22 -14 L44 -14 Q56 -12 52 2 L46 36 Q42 46 30 46 L-14 46 Z" fill="#fff" ${st}/>
      </g>
      <g id="f28-sp" opacity="0">${[[1190, 520], [1410, 520], [1420, 720]].map(([x, y]) => `<path transform="translate(${x},${y})" d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f28-h" class="abs title">RESUMINDO</div>
    ${icon(0, 420, "É um <b>sintoma</b>,<br>não diagnóstico", `<rect x="-46" y="-36" width="92" height="56" rx="8" fill="#fff" ${st}/><path d="M0 20 L0 52" ${st}/><text x="0" y="-1" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="17" fill="${C.ink}">SINTOMA</text>`, C.sun)}
    ${icon(1, 960, "Avaliação acha<br>a <b>causa</b>", `<circle cx="-10" cy="-10" r="30" fill="#fff" ${st}/><path d="M12 12 L40 40" ${st} stroke-width="13"/>`, C.sky)}
    ${icon(2, 1500, "Se <b>mexer</b> do<br>jeito certo", `<path d="M-50 22 Q-50 -6 -30 -14 L-8 -30 Q4 -36 10 -24 L18 -8 Q40 -4 52 10 Q56 24 44 26 L-44 26 Q-50 26 -50 22 Z" fill="#fff" ${st}/><path d="M-50 26 L52 26" ${st}/><path d="M-6 -16 L4 -6 M2 -22 L12 -12" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>`, C.good)}`,
      js: function (tl, K, R) {
        const z = "f28z";
        const sit = { hipB: -88, hipF: -92, knB: 88, knF: 92, anB: 0, anF: 0, shB: -15, shF: -25, elB: -40, elF: -35, torso: -4, neck: 0 };
        R.setPose(tl, z, 0, sit);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.end);
        R.slideIn(tl, "#f28-h", 0.05, 0.45, -200);
        R.pop(tl, "#f28-i0", K.sint - 0.1, 0.45);
        R.pop(tl, "#f28-i1", K.aval - 0.1, 0.45);
        R.pop(tl, "#f28-i2", K.mexer - 0.1, 0.45);
        // calça o sapato... sem dor!
        R.pose(tl, z, K.aval + 0.2, 0.7, { torso: 48, neck: -20, shF: -40, elF: -10, shB: -30, elB: -5 });
        R.face(tl, z, K.aval + 0.2, { mouth: "flat" });
        tl.to("#f28z-anF", { rotation: -12, svgOrigin: "0 0", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.aval + 1.0);
        R.face(tl, z, K.mexer, { eyes: "wide", mouth: "smile" });
        R.pose(tl, z, K.mel, 0.6, { torso: -6, neck: 6, shB: -15, elB: -40, shF: -105, elF: -45 }, "back.out(1.6)");
        R.face(tl, z, K.mel + 0.3, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f28-badge", K.end + 0.2, 0.5);
        tl.fromTo("#f28-sp", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, K.end + 0.4);
        R.squash(tl, "#f28z-root", K.end + 0.3);
      },
    };
  },
};
