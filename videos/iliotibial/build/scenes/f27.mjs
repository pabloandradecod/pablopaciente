// F27 — Resumo: Dona Cida de medalha + 3 cartões (não estica / carga e passada / quadril forte); Dona Faixa e Gordurinha fazem as pazes
export default {
  speakers: { faixa: "f27f" },
  gaps: [0.3],
  extra: 0.8,
  build(ctx) {
    const { C, human, faixa, gordurinha, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      res: w(0, "Resumindo"), faixa: w(0, "faixa"), sens: w(0, "sensível"), lat: w(0, "lateral"), adi: w(0, "adianta"), est: w(0, "esticar"),
      carga: w(0, "carga"), pass: w(0, "passada"), quad: w(0, "quadril"),
      f0: L1.start, f1: L1.end, mao: w(1, "mão"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<rect x="-44" y="-12" width="88" height="24" rx="8" fill="#8FA7C2" ${st}/><path d="M-40 -34 L40 34 M40 -34 L-40 34" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/>`,
      `${[[-26, 18], [-6, -6], [14, 18], [34, -6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="14" fill="${C.ink}"/>`).join("")}`,
      `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-52" y="-24" width="16" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="36" y="-24" width="16" height="48" rx="5" fill="${C.pain}" ${st}/>`,
    ];
    const labs = [["Faixa", "não estica"], ["Carga e", "passada curta"], ["Quadril", "forte"]];
    const card = (i) => `<div id="f27-c${i}" class="abs card f27-card" style="left:1060px;top:${150 + i * 170}px;opacity:0">
        <svg width="110" height="110" viewBox="-60 -60 120 120"><circle r="54" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>${icons[i]}</svg>
        <div class="label f27-t">${labs[i][0]}<br><span>${labs[i][1]}</span></div></div>`;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "sparkle", t: k.res + 0.2, vol: 0.4 },
      { name: "pop", t: k.adi, vol: 0.35 },
      { name: "pop", t: k.carga, vol: 0.35 },
      { name: "pop", t: k.quad, vol: 0.35 },
      { name: "pop", t: k.mao, vol: 0.45 },
    ];
    return {
      k,
      sfx,
      css: `
        #f27-head { left:110px; top:60px; font-size:72px; color:${C.pain}; }
        #root .f27-card { width:440px; height:150px; padding:16px; display:flex; align-items:center; gap:16px; }
        #root .f27-t { font-size:32px; line-height:1.15; }
        #root .f27-t span { font-size:28px; color:#1E9C72; }
        #f27-def { left:110px; top:170px; width:780px; padding:16px 22px; font-size:32px; }
        #f27-def b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.sky}"/>
      <rect y="820" width="1920" height="260" fill="#9AA3A8"/><line x1="0" y1="820" x2="1920" y2="820" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="420" cy="620" r="230" fill="#E7F3F1"/>
      <g id="f27-cw"><g transform="translate(420,610) scale(1.1)">${human("f27c", "cida")}</g></g>
      <!-- medalha -->
      <g id="f27-medal" opacity="0"><path d="M410 440 L440 520 L470 440" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linejoin="round"/><circle cx="440" cy="540" r="30" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/><text x="440" y="550" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="${C.ink}">10K</text></g>
      <!-- Dona Faixa e Gordurinha -->
      <g id="f27-fw"><g transform="translate(1640,880) scale(0.62)">${faixa("f27f")}</g></g>
      <g id="f27-gw"><g transform="translate(1800,880) scale(0.75)">${gordurinha("f27g")}</g></g>
      <g id="f27-heart" opacity="0"><path d="M1720 560 C1700 530 1660 548 1690 580 L1720 606 L1750 580 C1780 548 1740 530 1720 560 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></g>
    </svg>
    <div id="f27-head" class="abs title">RESUMINDO</div>
    <div id="f27-def" class="abs card label" style="opacity:0">Uma <b>faixa apertando</b> um tecido sensível na <b>lateral do joelho</b></div>
    ${[0, 1, 2].map(card).join("")}`,
      js: function (tl, K, R) {
        const c = "f27c", f = "f27f", g = "f27g";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        R.blinks(tl, c, 0, K.dur, "happy");
        R.setPose(tl, f, 0, { armF: 20, armB: -20 });
        R.setPose(tl, g, 0, { armF: 20, armB: -20 });
        R.face(tl, f, 0, { eyes: "normal", mouth: "flat" });
        R.face(tl, g, 0, { eyes: "wide", mouth: "flat" });
        R.slideIn(tl, "#f27-head", 0.05, 0.5, -300);
        // medalha
        R.pop(tl, "#f27-medal", K.res + 0.2, 0.45);
        R.pose(tl, c, K.res + 0.3, 0.35, { shF: -160, elF: -20 }, "back.out(2)");
        R.pose(tl, c, K.res + 1.4, 0.4, { shF: -10, elF: -20 });
        R.pop(tl, "#f27-def", K.faixa - 0.1, 0.4);
        // cartões
        R.pop(tl, "#f27-c0", K.adi - 0.1, 0.4);
        R.shake(tl, "#f27-fw", K.est, 0.3, 4);
        R.pop(tl, "#f27-c1", K.carga - 0.1, 0.4);
        R.pop(tl, "#f27-c2", K.quad - 0.1, 0.4);
        R.pose(tl, c, K.quad, 0.35, { shF: -120, elF: -110 }, "back.out(2)");
        // as pazes: aperto de mão
        R.face(tl, f, K.f0, { eyes: "happy", mouth: "smile" });
        tl.to("#f27-fw", { x: 30, duration: 0.4, ease: "power2.out" }, K.f0);
        tl.to("#f27-gw", { x: -40, duration: 0.4, ease: "power2.out" }, K.f0);
        R.pose(tl, f, K.mao - 0.3, 0.3, { armF: -70 }, "back.out(2)");
        R.pose(tl, g, K.mao - 0.3, 0.3, { armB: 70 }, "back.out(2)");
        R.face(tl, g, K.mao, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f27-heart", K.mao, 0.4);
        for (let i = 0; i < 2; i++) {
          R.pose(tl, f, K.mao + 0.35 + i * 0.3, 0.14, { armF: -60 }, "sine.inOut");
          R.pose(tl, f, K.mao + 0.5 + i * 0.3, 0.14, { armF: -80 }, "sine.inOut");
        }
      },
    };
  },
};
