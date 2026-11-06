// F17 — Cuidado 1: tirar a compressão e ajustar a carga (4 cartões com o Seu Zé) + Dona Cida "o mesmo truque do meu quadril!"
export default {
  speakers: { cida: "f17c" },
  extra: 0.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      um: w(0, "Um"), tirar: w(0, "tirar"), carga: w(0, "carga"), trav: w(0, "Travesseiro"), viag: w(0, "viagens"), sac: w(0, "sacolas"),
      plano: w(0, "plano"), gelo: w(0, "gelo"), crise: w(0, "crises"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const P = C.blue, J = C.brown, S = C.skinB;
    const OK = `<circle cx="142" cy="30" r="22" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M131 30 L139 38 L153 22" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`;
    const icons = [
      // travesseiro entre os joelhos
      `<rect x="10" y="100" width="150" height="20" rx="8" fill="#fff" ${st}/><circle cx="26" cy="80" r="14" fill="${S}" ${st}/><path d="M42 82 L92 82" stroke="${P}" stroke-width="20" stroke-linecap="round"/>
       <path d="M92 82 L124 66 L150 84" fill="none" stroke="${J}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M92 92 L124 98 L150 96" fill="none" stroke="#5A3E25" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
       <ellipse cx="122" cy="82" rx="16" ry="10" fill="${C.sky}" ${st}/>${OK}`,
      // escada: menos viagens, sacolas leves
      `${[0, 1, 2, 3].map((i) => `<rect x="${20 + i * 32}" y="${110 - i * 22}" width="${140 - i * 32}" height="22" fill="#C99A62" ${st}/>`).join("")}
       <path d="M40 40 L64 40 L60 70 L44 70 Z" fill="#3DD9A4" ${st}/><path d="M46 40 Q52 28 58 40" fill="none" stroke="${C.ink}" stroke-width="4"/>
       <text x="52" y="62" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="14" fill="${C.ink}">leve</text>${OK}`,
      // caminhada no plano
      `<line x1="10" y1="120" x2="160" y2="120" stroke="${C.ink}" stroke-width="5"/><circle cx="70" cy="34" r="13" fill="${S}" ${st}/>
       <path d="M70 47 L70 84" stroke="${P}" stroke-width="18" stroke-linecap="round"/><path d="M70 84 L52 118 M70 84 L90 116" stroke="${J}" stroke-width="12" stroke-linecap="round"/>
       <path d="M70 58 L52 76 M70 58 L88 72" stroke="${P}" stroke-width="10" stroke-linecap="round"/>${OK}`,
      // gelo 15 min
      `<rect x="34" y="60" width="64" height="44" rx="12" fill="#CFEFF7" ${st}/><path d="M46 70 L58 82 M70 70 L82 82" stroke="#7FC4E0" stroke-width="5" stroke-linecap="round"/>
       <circle cx="118" cy="96" r="24" fill="#fff" ${st}/><path d="M118 96 L118 80 M118 96 L130 96" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
       <text x="66" y="130" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="20" fill="${C.ink}">15 min</text>${OK}`,
    ];
    const texts = ["Travesseiro entre os joelhos", "Escada: menos viagens, sacolas leves", "Caminhada no plano", "Gelo 15 min na crise"];
    const card = (i, x, y) => `<div id="f17-c${i}" class="abs card f17-c" style="left:${x}px;top:${y}px;opacity:0">
        <svg width="170" height="140" viewBox="0 0 170 140">${icons[i]}</svg><div class="label t">${texts[i]}</div></div>`;
    return {
      k,
      css: `
        #f17-head { left:110px; top:70px; font-size:64px; }
        #f17-head span { color:#1E9C72; }
        #root .f17-c { width:400px; height:270px; padding:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }
        #root .f17-c .t { font-size:29px; text-align:center; line-height:1.1; }
        #f17-truque { left:1370px; top:600px; width:320px; padding:14px 22px; font-size:32px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f17-z-wrap"><g transform="translate(260,630) scale(1.25)">${human("f17z", "ze")}</g></g>
      <g id="f17-c-wrap" opacity="0"><g transform="translate(1740,630) scale(1.25) scale(-1,1)">${human("f17c", "cida")}</g></g>
    </svg>
    <div id="f17-head" class="abs title">1. <span>TIRAR A COMPRESSÃO</span> E AJUSTAR A CARGA</div>
    ${card(0, 500, 200)}${card(1, 930, 200)}${card(2, 500, 510)}${card(3, 930, 510)}
    <div id="f17-truque" class="abs card title" style="opacity:0">o truque do <span style="color:#8E6CD8">quadril</span>!</div>`,
      js: function (tl, K, R) {
        const z = "f17z", c = "f17c";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f17-head", 0.05, 0.5, -300);
        tl.fromTo("#f17-z-wrap", { x: -500 }, { x: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.2);
        // os 4 cuidados
        [K.trav, K.viag, K.plano, K.gelo].forEach((t, i) => R.pop(tl, `#f17-c${i}`, t - 0.25, 0.4, 0.6));
        R.pose(tl, z, K.trav - 0.1, 0.35, { shF: -110, elF: -40 }, "back.out(2)");
        R.face(tl, z, K.trav, { eyes: "happy", mouth: "grin" });
        R.pose(tl, z, K.viag, 0.35, { shF: -60, elF: -90 }, "back.out(2)");
        R.face(tl, z, K.sac, { eyes: "normal", mouth: "smile" });
        // caminhada no lugar
        for (let i = 0; i < 4; i++) R.pose(tl, z, K.plano + i * 0.3, 0.28, { hipF: i % 2 ? 20 : -25, hipB: i % 2 ? -25 : 20, knF: i % 2 ? 10 : 25, shF: i % 2 ? -30 : 20, elF: -30 }, "sine.inOut");
        R.pose(tl, z, K.plano + 1.25, 0.3, { hipF: 0, hipB: 0, knF: 0 });
        R.pose(tl, z, K.gelo, 0.3, { shF: -140, elF: -20 }, "back.out(2)");
        R.face(tl, z, K.gelo, { eyes: "wide", mouth: "open" });
        R.face(tl, z, K.crise, { eyes: "happy", mouth: "smile" });
        // Dona Cida entra: o mesmo truque do quadril
        tl.set("#f17-c-wrap", { opacity: 1 }, K.c0 - 0.6);
        tl.fromTo("#f17-c-wrap", { x: 500 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.c0 - 0.6);
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "smile" });
        R.pose(tl, c, K.c0, 0.3, { shF: -150, elF: -30 }, "back.out(2)");
        R.pop(tl, "#f17-truque", K.c0 + 0.3, 0.4);
        tl.to("#f17-c0", { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1 }, K.c0 + 0.3);
        R.pose(tl, z, K.c0 + 0.2, 0.3, { shF: -150, elF: -20 }, "back.out(2)");
        R.face(tl, z, K.c0 + 0.2, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        ...[k.trav, k.viag, k.plano, k.gelo].map((t) => ({ name: "pop", t: t - 0.25, vol: 0.35 })),
        { name: "whoosh-short", t: k.c0 - 0.6, vol: 0.35 },
        { name: "sparkle", t: k.c0 + 0.3, vol: 0.35 },
      ],
    };
  },
};
