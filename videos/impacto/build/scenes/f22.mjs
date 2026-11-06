// F22 — Degrau 4: de volta pra cima — braço acima da cabeça sem peso → com carga → gesto real (pintar, nadar, jogar vôlei), barra de carga subindo aos poucos
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), forca: w(0, "força"), mel: w(0, "melhorando"), volta: w(0, "volta", 0), levar: w(0, "levar"), cima: w(0, "cima"),
      prim: w(0, "primeiro"), sem: w(0, "sem"), dep: w(0, "depois"), carga: w(0, "carga"), pint: w(0, "pintar"), nad: w(0, "nadar"), jog: w(0, "jogar"),
      aum: w(0, "aumentando"), pouc: w(0, "poucos"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const icon = (id, x, label, svg) => `<div id="${id}" class="abs card f22-ic" style="left:${x}px;opacity:0"><svg width="200" height="150" viewBox="-100 -80 200 150">${svg}</svg><div class="l label">${label}</div></div>`;
    const roller = `<line x1="-40" y1="50" x2="30" y2="-40" stroke="#8B5A2B" stroke-width="10" stroke-linecap="round"/><rect x="-10" y="-66" width="90" height="32" rx="12" fill="#8FD3C6" stroke="${C.ink}" stroke-width="5" transform="rotate(-20 35 -50)"/><rect x="-90" y="-78" width="180" height="14" fill="#8FD3C6"/>`;
    const swim = `<path d="M-95 30 Q-70 15 -45 30 Q-20 45 5 30 Q30 15 55 30 Q80 45 95 30" fill="none" stroke="${C.blue}" stroke-width="8"/><circle cx="-30" cy="12" r="18" fill="${C.skinB}" ${st}/><rect x="-14" y="6" width="70" height="20" rx="10" fill="#FF8A3D" ${st}/><path d="M-20 4 Q0 -60 50 -40" fill="none" stroke="${C.ink}" stroke-width="18" stroke-linecap="round"/><path d="M-20 4 Q0 -60 50 -40" fill="none" stroke="${C.skinB}" stroke-width="9" stroke-linecap="round"/>`;
    const volei = `<circle cx="30" cy="-48" r="24" fill="#fff" ${st}/><path d="M10 -60 Q30 -40 52 -56 M18 -28 Q28 -50 22 -72" fill="none" stroke="${C.sun}" stroke-width="5"/><circle cx="-30" cy="0" r="18" fill="${C.skinB}" ${st}/><path d="M-26 -12 L0 -50" stroke="${C.ink}" stroke-width="18" stroke-linecap="round"/><path d="M-26 -12 L0 -50" stroke="${C.skinB}" stroke-width="9" stroke-linecap="round"/><rect x="-46" y="16" width="34" height="50" rx="10" fill="${C.pain}" ${st}/>`;
    return {
      k,
      css: `
        #f22-head { left:110px; top:60px; font-size:64px; }
        #f22-head span { color:#1E9C72; }
        #f22-step { left:110px; top:170px; padding:10px 22px; font-size:38px; white-space:nowrap; }
        #root .f22-ic { top:620px; width:230px; padding:10px; text-align:center; }
        #root .f22-ic .l { font-size:28px; }
        #f22-load { left:1200px; top:170px; width:560px; padding:16px 22px; }
        #f22-load .l { font-size:26px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f22-z-wrap"><g transform="translate(520,620) scale(1.3)">${human("f22z", "ze")}
        <g id="f22-dumb" opacity="0" transform="translate(50,-280)"><rect x="-26" y="-6" width="52" height="12" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-36" y="-17" width="14" height="34" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/><rect x="22" y="-17" width="14" height="34" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>
      </g></g>
    </svg>
    <div id="f22-head" class="abs title">Degrau 4: <span>DE VOLTA PRA CIMA</span></div>
    <div id="f22-step" class="abs card title" style="opacity:0"><span id="f22-stx">1. sem peso</span></div>
    <div id="f22-load" class="abs card" style="opacity:0">
      <div class="l label">CARGA NO OMBRO: aumentando aos poucos</div>
      <svg width="516" height="70" viewBox="0 0 516 70">
        ${[0, 1, 2, 3, 4].map((i) => `<rect id="f22-b${i}" x="${i * 102 + 4}" y="${50 - i * 10}" width="90" height="${16 + i * 10}" rx="8" fill="${C.good}" stroke="${C.ink}" stroke-width="4" opacity="0.2"/>`).join("")}
      </svg>
    </div>
    ${icon("f22-i0", 900, "pintar", roller)}
    ${icon("f22-i1", 1180, "nadar", swim)}
    ${icon("f22-i2", 1460, "jogar vôlei", volei)}`,
      js: function (tl, K, R) {
        const z = "f22z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        R.pop(tl, "#f22-load", K.forca - 0.2, 0.4);
        tl.to("#f22-b0", { opacity: 1, duration: 0.2 }, K.mel);
        // levar o braço lá em cima, sem peso
        R.pop(tl, "#f22-step", K.prim - 0.3, 0.4);
        const up = (t) => { R.pose(tl, z, t, 0.6, { shF: -160, elF: 0, neck: -10 }, "sine.inOut"); R.pose(tl, z, t + 0.7, 0.6, { shF: 10, elF: -10, neck: 0 }, "sine.inOut"); };
        up(K.levar); up(K.levar + 1.4);
        tl.to("#f22-b1", { opacity: 1, duration: 0.2 }, K.sem);
        // com carga
        tl.set("#f22-stx", { textContent: "2. com carga", color: "#FF5A4E" }, K.dep);
        R.pose(tl, z, K.dep, 0.6, { shF: -160, elF: 0, neck: -10 }, "sine.inOut");
        tl.to("#f22-dumb", { opacity: 1, duration: 0.2 }, K.dep + 0.45);
        tl.to("#f22-b2", { opacity: 1, duration: 0.2 }, K.carga);
        R.face(tl, z, K.carga, { eyes: "normal", mouth: "flat" });
        tl.to("#f22-dumb", { opacity: 0, duration: 0.15 }, K.carga + 0.8);
        R.pose(tl, z, K.carga + 0.8, 0.6, { shF: 10, elF: -10, neck: 0 }, "sine.inOut");
        // gesto real
        R.pop(tl, "#f22-i0", K.pint - 0.1, 0.4);
        R.pop(tl, "#f22-i1", K.nad - 0.1, 0.4);
        R.pop(tl, "#f22-i2", K.jog - 0.1, 0.4);
        tl.to("#f22-b3", { opacity: 1, duration: 0.2 }, K.nad);
        tl.to("#f22-b4", { opacity: 1, duration: 0.2 }, K.pouc);
        R.face(tl, z, K.pint, { eyes: "happy", mouth: "grin" });
        R.pose(tl, z, K.aum, 0.5, { shF: -170, elF: -10 }, "back.out(1.6)");
        tl.to("#f22-load", { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1 }, K.pouc);
      },
      sfx: [
        { name: "pop", t: k.forca - 0.2, vol: 0.3 },
        { name: "pop", t: k.prim - 0.3, vol: 0.3 },
        { name: "whoosh-short", t: k.dep, vol: 0.3 },
        { name: "pop", t: k.pint - 0.1, vol: 0.3 },
        { name: "pop", t: k.nad - 0.1, vol: 0.3 },
        { name: "pop", t: k.jog - 0.1, vol: 0.3 },
        { name: "chime", t: k.pouc, vol: 0.3 },
      ],
    };
  },
};
