// F28 — Resumo: Seu Zé de volta ao jardim agachando do jeito certo; Guardas relaxados de chinelo; Alarmildo cochilando
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, guardas, alarmildo, w } = ctx;
    const k = {
      res: w(0, "Resumindo"), com: w(0, "comum"), gra: w(0, "grave"), mel: w(0, "melhora"), ala: w(0, "alarme"), est: w(0, "estrago"), mov: w(0, "movimento"), rem: w(0, "remédio"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const card = (i, title, icon) => `<div id="f28-c${i}" class="abs card" style="left:1250px;top:${130 + i * 175}px;width:580px;height:150px;padding:16px 22px;display:flex;gap:18px;align-items:center;opacity:0">
        <svg width="110" height="110" viewBox="-55 -55 110 110" style="flex:none"><circle r="52" fill="${["#FFF1CF", "#FFE1D6", "#E2F7EE"][i]}" stroke="${C.ink}" stroke-width="5"/>${icon}</svg>
        <div class="label" style="font-size:34px;line-height:1.1">${title}</div></div>`;
    const icons = [
      `<path d="M-24 -30 L24 -30 L20 0 Q0 18 -20 0 Z" fill="${C.sun}" ${st}/><path d="M-6 8 L6 8 L6 22 L-6 22 Z M-18 26 L18 26" fill="${C.sun}" ${st}/>`,
      `<path d="M-24 22 L-24 -6 Q-24 -32 0 -32 Q24 -32 24 -6 L24 22 Z" fill="${C.pain}" ${st}/><rect x="-30" y="20" width="60" height="12" rx="4" fill="#5E6B73" ${st}/>`,
      `<path d="M-32 10 Q-30 -8 -12 -10 L4 -24 Q14 -26 18 -16 L30 2 Q34 16 22 18 L-28 18 Q-34 16 -32 10Z" fill="${C.pain}" ${st}/><path d="M-20 -2 L-4 -2 M-14 6 L2 6" ${st}/>`,
    ];
    // chinelos para os Guardas
    const flip = (x) => `<g transform="translate(${x},866)"><ellipse rx="34" ry="9" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/><path d="M-6 -8 L4 2 L14 -8" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/></g>`;
    return {
      k,
      css: `
        #f28-h { left:90px; top:70px; font-size:66px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <circle cx="1080" cy="150" r="60" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
      <rect y="760" width="1920" height="320" fill="#6CC56F"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="6"/>
      <rect y="880" width="1920" height="200" fill="#8B5A2B"/>
      ${[860, 940].map((x, i) => `<g><line x1="${x}" y1="880" x2="${x}" y2="800" stroke="#2E7D32" stroke-width="8"/><circle cx="${x}" cy="790" r="26" fill="${["#FF5A4E", "#FFC94A"][i]}" stroke="${C.ink}" stroke-width="5"/></g>`).join("")}
      <!-- Guardas relaxados, de chinelo -->
      <g id="f28-gw"><g transform="translate(250,862) scale(0.45)">${guardas("f28g")}</g>${flip(203)}${flip(250)}${flip(288)}${flip(335)}</g>
      <!-- Alarmildo cochilando -->
      <g id="f28-aw"><g transform="translate(1100,866) scale(0.55)">${alarmildo("f28a").replace('<g id="f28a-rays">', '<g id="f28a-rays" opacity="0">')}</g></g>
      <g id="f28-zz" opacity="0"><text x="1150" y="690" font-family="Montserrat" font-weight="900" font-size="48" fill="${C.ink}">z</text><text x="1185" y="645" font-family="Montserrat" font-weight="900" font-size="36" fill="${C.ink}">z</text></g>
      <!-- Seu Zé -->
      <g id="f28-zw"><g transform="translate(640,640) scale(1.3)">${human("f28z", "ze")}</g></g>
      <g id="f28-pot"><g transform="translate(800,850)"><path d="M-40 -40 L40 -40 L30 20 L-30 20 Z" fill="#C8693B" ${st}/><path d="M0 -40 L0 -80 M0 -66 Q-24 -80 -30 -100 Q-8 -96 0 -70 M0 -60 Q22 -76 30 -96 Q8 -92 0 -64" fill="#3DD9A4" stroke="${C.ink}" stroke-width="5"/></g></g>
    </svg>
    <div id="f28-h" class="abs title">RESUMINDO</div>
    ${card(0, "Muito comum, quase nunca grave, <b>quase sempre melhora</b>", icons[0])}
    ${card(1, "Dor é <b>alarme</b>, não estrago", icons[1])}
    ${card(2, "<b>Movimento</b> é o melhor remédio", icons[2])}`,
      js: function (tl, K, R) {
        const z = "f28z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f28-h", 0.05, 0.5, -300);
        // Guardas relaxados, Alarmildo dormindo
        ["f28g-g0", "f28g-g1"].forEach((g) => { R.setPose(tl, g, 0, { armF: 10, armB: -10 }); R.face(tl, g, 0, { eyes: "happy", mouth: "smile" }); });
        tl.set("#f28g-g0-shades, #f28g-g1-shades", { y: -30 }, 0);
        R.face(tl, "f28a", 0, { eyes: "closed", mouth: "smile" });
        tl.to("#f28-zz", { opacity: 1, duration: 0.3 }, 0.4);
        tl.fromTo("#f28-zz", { y: 0 }, { y: -20, duration: 1.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.4);
        tl.fromTo("#f28a-body", { scaleY: 1 }, { scaleY: 0.95, svgOrigin: "0 0", duration: 1.0, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.2);
        // agacha do jeito certo para pegar o vaso
        R.pose(tl, z, K.res + 0.2, 0.7, { torso: 28, neck: -12, hipF: -95, hipB: -95, knF: 115, knB: 115, anF: -20, anB: -20, shF: -40, elF: -20, shB: -30, elB: -20 });
        R.move(tl, z, K.res + 0.2, 0.7, 0, 70);
        // levanta com o vaso, com as pernas
        R.pose(tl, z, K.ala, 0.7, { torso: 0, neck: 0, hipF: 0, hipB: 0, knF: 0, knB: 0, anF: 0, anB: 0, shF: -60, elF: -60, shB: -50, elB: -60 });
        R.move(tl, z, K.ala, 0.7, 0, 0);
        tl.to("#f28-pot", { x: -10, y: -170, duration: 0.7, ease: "power2.inOut" }, K.ala);
        R.face(tl, z, K.ala + 0.4, { eyes: "happy", mouth: "grin" });
        // cartões
        [K.com, K.ala, K.mov].forEach((t, i) => R.slideIn(tl, `#f28-c${i}`, t - 0.15, 0.5, 300));
        // joinha
        tl.to("#f28-pot", { x: 200, y: 0, duration: 0.5, ease: "power2.in" }, K.mov - 0.2);
        R.pose(tl, z, K.mov + 0.2, 0.4, { shF: -150, elF: -30, shB: 5, elB: -10 }, "back.out(2)");
        R.pose(tl, "f28g-g0", K.rem, 0.3, { armF: -150 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.com - 0.15, vol: 0.35 },
        { name: "pop", t: k.ala - 0.15, vol: 0.35 },
        { name: "pop", t: k.mov - 0.15, vol: 0.35 },
        { name: "sparkle", t: k.rem, vol: 0.35 },
      ],
    };
  },
};
