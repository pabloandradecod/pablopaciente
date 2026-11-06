// F9 — Quem tem: corredores, 30–60 anos, homens, sobrepeso, diabetes, panturrilha fraca; alerta especial: quinolonas e corticoides; Dr. Pablo se reconhece
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      corr: w(0, "corredores"), trin: w(0, "trinta"), sess: w(0, "sessenta"), hom: w(0, "homens"), sob: w(0, "sobrepeso"), dia: w(0, "diabetes"), pant: w(0, "panturrilha"),
      det: w(0, "detalhe"), rem: w(0, "remédios"), anti: w(0, "antibióticos"), quin: w(0, "quinolonas"), cort: w(0, "corticoides"), risco: w(0, "risco"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const card = (i, label, svg) => `<div id="f09-k${i}" class="abs card" style="left:${90 + (i % 2) * 280}px;top:${170 + Math.floor(i / 2) * 250}px;width:250px;padding:12px 8px;text-align:center;opacity:0">
      <svg width="110" height="110" viewBox="-55 -55 110 110">${svg}</svg><div class="label" style="font-size:27px;line-height:1.1">${label}</div></div>`;
    const check = (i, x, y) => `<g id="f09-ok${i}" opacity="0"><circle cx="${x}" cy="${y}" r="26" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M${x - 12} ${y} L${x - 3} ${y + 10} L${x + 14} ${y - 10}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return {
      k,
      css: `
        #f09-h { left:90px; top:50px; font-size:64px; }
        #f09-h span { color:${C.pain}; }
        #f09-th { left:690px; top:120px; width:470px; padding:16px 20px; text-align:center; font-size:32px; border-radius:40px; }
        #f09-th b { color:${C.pain}; }
        #f09-alert { left:1220px; top:170px; width:610px; padding:22px 24px; border-color:${C.pain}; box-shadow: 10px 10px 0 ${C.pain}; }
        #f09-alert .t { font-size:44px; color:${C.pain}; } #f09-alert .s { font-size:30px; margin-top:6px; }
        #root .f09-pill { margin-top:18px; display:flex; align-items:center; gap:16px; font-size:34px; opacity:0; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <circle cx="930" cy="620" r="250" fill="${C.wall}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <g id="f09-p-wrap"><g transform="translate(930,660) scale(1.25)">${human("f09p", "pablo")}</g></g>
      ${check(0, 1060, 480)}${check(1, 1060, 560)}${check(2, 1060, 640)}
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">Quem tem <span>mais risco?</span></div>
    ${card(0, "Corredores", `<circle cx="0" cy="-30" r="12" fill="${C.ink}"/><path d="M0 -16 L-6 14 L-26 34 M-6 14 L16 30 L20 48 M-2 -8 L-24 4 M-2 -8 L22 -14" ${st} fill="none" stroke-width="8"/>`)}
    ${card(1, "30 a 60 anos", `<rect x="-40" y="-34" width="80" height="72" rx="10" fill="#fff" ${st}/><rect x="-40" y="-34" width="80" height="20" fill="${C.pain}" ${st}/><text x="0" y="28" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">30+</text>`)}
    ${card(2, "Mais em homens", `<circle cx="-6" cy="6" r="26" fill="none" ${st} stroke-width="8"/><path d="M12 -12 L36 -36 M18 -36 L36 -36 L36 -18" ${st} fill="none" stroke-width="8"/>`)}
    ${card(3, "Sobrepeso", `<rect x="-40" y="10" width="80" height="30" rx="8" fill="#9AA7AD" ${st}/><path d="M-20 10 L-12 -30 L12 -30 L20 10" fill="#fff" ${st}/><text x="0" y="-2" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="20" fill="${C.ink}">kg</text>`)}
    ${card(4, "Diabetes", `<path d="M0 -40 Q30 0 30 16 Q30 42 0 42 Q-30 42 -30 16 Q-30 0 0 -40Z" fill="${C.pain}" ${st}/>`)}
    ${card(5, "Panturrilha fraca", `<path d="M-14 -44 Q-40 -10 -14 20 L-10 44 L10 44 L12 20 Q30 -10 10 -44 Z" fill="#E0675A" ${st}/><path d="M24 -10 Q40 -20 46 -6" stroke="#9AA7AD" stroke-width="5" fill="none"/>`)}
    <div id="f09-th" class="abs card label" style="opacity:0">corredor, 40 e poucos, homem, aumentou rápido... <b>sou eu!</b></div>
    <div id="f09-alert" class="abs card" style="opacity:0">
      <div class="t title">⚠ ATENÇÃO</div>
      <div class="s label">alguns remédios aumentam o risco de problema no tendão:</div>
      <div id="f09-r0" class="f09-pill label"><svg width="80" height="40" viewBox="0 0 80 40"><rect x="2" y="2" width="76" height="36" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M40 2 L40 38" stroke="${C.ink}" stroke-width="4"/><rect x="2" y="2" width="38" height="36" rx="18" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></svg>certos antibióticos (quinolonas)</div>
      <div id="f09-r1" class="f09-pill label"><svg width="80" height="40" viewBox="0 0 80 40"><rect x="2" y="2" width="76" height="36" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M40 2 L40 38" stroke="${C.ink}" stroke-width="4"/><rect x="2" y="2" width="38" height="36" rx="18" fill="${C.purple}" stroke="${C.ink}" stroke-width="4"/></svg>corticoides</div>
    </div>`,
      js: function (tl, K, R) {
        const p = "f09p";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.3, K.dur);
        R.rise(tl, "#f09-h", 0.1, 0.5);
        [K.corr, K.trin, K.hom, K.sob, K.dia, K.pant].forEach((t, i) => R.pop(tl, `#f09-k${i}`, t - 0.15, 0.4));
        // ele se reconhece: corredor, idade, homem
        [K.corr, K.sess, K.hom].forEach((t, i) => {
          tl.set(`#f09-ok${i}`, { opacity: 1 }, t + 0.2);
          tl.fromTo(`#f09-ok${i}`, { scale: 0, svgOrigin: `1060 ${480 + i * 80}` }, { scale: 1, svgOrigin: `1060 ${480 + i * 80}`, duration: 0.35, ease: "back.out(2.5)" }, t + 0.2);
        });
        R.face(tl, p, K.sess + 0.2, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f09-th", K.hom + 0.5, 0.45);
        R.pose(tl, p, K.hom + 0.5, 0.3, { shF: -60, elF: -120 }, "back.out(2)");
        R.face(tl, p, K.sob, { eyes: "wide", mouth: "open" });
        R.fadeOut(tl, "#f09-th", K.det - 0.3);
        R.pose(tl, p, K.det - 0.3, 0.3, { shF: 10, elF: -20 });
        // alerta especial
        R.pop(tl, "#f09-alert", K.det - 0.1, 0.5);
        R.face(tl, p, K.det, { eyes: "normal", mouth: "flat" });
        R.rise(tl, "#f09-r0", K.anti - 0.1, 0.4, 30);
        R.rise(tl, "#f09-r1", K.cort - 0.1, 0.4, 30);
        tl.to("#f09-alert", { rotation: 1.5, duration: 0.1, yoyo: true, repeat: 5 }, K.risco);
        R.pose(tl, p, K.risco, 0.3, { shF: -150, elF: -10 }, "back.out(2)");
      },
      sfx: [
        { name: "pop", t: 0.1, vol: 0.3 },
        ...[k.corr, k.trin, k.hom, k.sob, k.dia, k.pant].map((t) => ({ name: "pop", t: t - 0.15, vol: 0.28 })),
        ...[k.corr, k.sess, k.hom].map((t) => ({ name: "ping", t: t + 0.2, vol: 0.25 })),
        { name: "notification", t: k.det - 0.1, vol: 0.35 },
        { name: "pop", t: k.anti - 0.1, vol: 0.3 }, { name: "pop", t: k.cort - 0.1, vol: 0.3 },
      ],
    };
  },
};
