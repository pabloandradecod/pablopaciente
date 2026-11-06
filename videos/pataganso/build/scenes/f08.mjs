// F8 — Quem tem: artrose do joelho em destaque, mulheres, +40, sobrepeso, diabetes, corredores; Seu Zé ganha checks e vira "bingo"
export default {
  speakers: { ze: "f08z" },
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      comum: w(0, "comum"), art: w(0, "artrose"), mul: w(0, "mulheres"), quar: w(0, "quarenta"), sob: w(0, "Sobrepeso"), diab: w(0, "diabetes"), corr: w(0, "corredores"),
      z0: lines[1].start, z1: lines[1].end, ch0: w(1, "Check", 0), ch1: w(1, "check", 1), ch2: w(1, "check", 2), bingo: w(1, "bingo"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const P = [
      ["Artrose no joelho", `<circle r="34" fill="${C.bone}" ${st}/><path d="M-20 -6 L-6 6 L6 -8 L20 4" fill="none" stroke="${C.pain}" stroke-width="6"/>`],
      ["Mulheres", `<circle cy="-14" r="16" fill="#E3A47E" ${st}/><path d="M-22 30 Q0 -6 22 30 Z" fill="#B07ED8" ${st}/>`],
      ["Acima dos 40", `<text x="0" y="14" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="38" fill="${C.ink}">40+</text>`],
      ["Sobrepeso", `<rect x="-30" y="-20" width="60" height="40" rx="8" fill="#fff" ${st}/><path d="M-10 0 L10 -10" ${st}/>`],
      ["Diabetes", `<path d="M0 -30 Q22 0 0 26 Q-22 0 0 -30Z" fill="${C.pain}" ${st}/>`],
      ["Corredores", `<path d="M-30 10 Q-32 26 -14 28 L28 28 Q38 24 34 12 Q26 0 2 0 L-14 -2 Q-28 -2 -30 10Z" fill="${C.good}" ${st}/>`],
    ];
    const card = (i, label, ic) => `<div id="f08-p${i}" class="abs card" style="left:${90 + (i % 3) * 300}px;top:${i === 0 ? 210 : 210 + Math.floor(i / 3) * 280}px;width:270px;height:240px;padding:16px;text-align:center;opacity:0">
      <svg width="120" height="110" viewBox="-60 -50 120 100">${ic}</svg><div class="label" style="font-size:28px;margin-top:6px">${label}</div></div>`;
    return {
      k,
      css: `
        #f08-h { left:90px; top:70px; font-size:56px; } #f08-h span { color:#B07ED8; }
        #f08-p0 { border-color:${C.pain}; }
        #f08-best { left:250px; top:186px; padding:6px 14px; font-size:22px; color:#fff; background:${C.pain}; border:4px solid ${C.ink}; border-radius:12px; transform: rotate(6deg); }
        #f08-bingo { left:1340px; top:150px; padding:16px 34px; font-size:72px; color:#fff; background:#B07ED8; border:8px solid ${C.ink}; border-radius:24px; transform: rotate(-6deg); }
        .f08-chk { width:64px; height:64px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1500" cy="560" r="300" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(1480,650) scale(1.3)">${human("f08z", "ze")}</g>
      ${[[1390, 420], [1560, 520], [1420, 640]].map(([x, y], i) => `<g id="f08-ck${i}" opacity="0"><circle cx="${x}" cy="${y}" r="38" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/><path d="M${x - 18} ${y} L${x - 4} ${y + 14} L${x + 20} ${y - 14}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>`).join("")}
    </svg>
    <div id="f08-h" class="abs title">Quem <span>tem</span>?</div>
    ${P.map(([l, ic], i) => card(i, l, ic)).join("")}
    <div id="f08-best" class="abs label" style="opacity:0">a parceira mais comum</div>
    <div id="f08-bingo" class="abs title" style="opacity:0">BINGO!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f08-h", 0.1, 0.4);
        const z = "f08z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.3, K.dur);
        [K.art, K.mul, K.quar, K.sob, K.diab, K.corr].forEach((t, i) => R.pop(tl, `#f08-p${i}`, t - 0.1, 0.4));
        R.pop(tl, "#f08-best", K.art + 0.3, 0.35);
        tl.to("#f08-p0", { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, K.art + 0.3);
        R.face(tl, z, K.art, { eyes: "wide", mouth: "flat" });
        R.face(tl, z, K.sob, { eyes: "wide", mouth: "frown" });
        R.pose(tl, z, K.sob, 0.4, { shF: -40, elF: -80 });
        // fala do Seu Zé: check, check, check... bingo
        R.pose(tl, z, K.z0, 0.3, { shF: -90, elF: -40 }, "back.out(2)");
        [K.ch0, K.ch1, K.ch2].forEach((t, i) => R.pop(tl, `#f08-ck${i}`, t, 0.3));
        R.face(tl, z, K.bingo - 0.1, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f08-bingo", K.bingo - 0.1, 0.45);
        R.pose(tl, z, K.bingo, 0.3, { shF: -160, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
      },
      sfx: [
        ...[k.art, k.mul, k.quar, k.sob, k.diab, k.corr].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        ...[k.ch0, k.ch1, k.ch2].map((t) => ({ name: "click", t, vol: 0.45 })),
        { name: "sparkle", t: k.bingo, vol: 0.4 },
      ],
    };
  },
};
