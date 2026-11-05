// F7 — Por que na corrida: Dona Cida em câmera lenta, flash no joelho a cada toque do pé (zona de aperto),
// contador de passadas, e o que piora (descida, passada longa, aumento rápido, rua inclinada)
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      corr: w(0, "corrida"), passada: w(0, "passada"), pe: w(0, "pé"), toca: w(0, "toca"), zona: w(0, "zona"), milh: w(0, "milhares"),
      desc: w(0, "Descidas"), longas: w(0, "longas"), aum: w(0, "aumento"), rua: w(0, "rua"), pior: w(0, "pioram"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const chip = (i, txt, svg) => `<div id="f07-ch${i}" class="abs card label" style="left:1250px;top:${350 + i * 120}px;width:560px;padding:10px 18px;font-size:32px;display:flex;align-items:center;gap:16px;opacity:0">
      <svg width="80" height="80" viewBox="-40 -40 80 80">${svg}</svg><span>${txt}</span></div>`;
    const nums = ["0", "10", "100", "1.000", "5.000+"];
    return {
      k,
      css: `
        #f07-h { left:100px; top:70px; font-size:64px; }
        #f07-h span { color:${C.pain}; }
        #f07-cnt { left:1250px; top:80px; width:560px; padding:14px 22px; }
        #f07-cnt .l { font-size:28px; }
        #f07-cnt .n { position:relative; height:84px; }
        #f07-cnt .n div { position:absolute; left:0; top:0; font-size:76px; color:${C.pain}; opacity:0; }
        #f07-slow { left:100px; top:170px; padding:8px 18px; font-size:30px; color:#fff; background:${C.ink}; border-radius:12px; }
        #f07-pior { left:1250px; top:282px; font-size:40px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <g id="f07-scroll">${[0, 1, 2, 3, 4, 5].map((i) => `<g transform="translate(${150 + i * 420},0)"><rect x="-12" y="700" width="24" height="90" fill="#8B5A2B" stroke="${C.ink}" stroke-width="6"/><circle cx="0" cy="670" r="60" fill="#5DB560" stroke="${C.ink}" stroke-width="6"/></g>`).join("")}</g>
      <rect y="780" width="1920" height="300" fill="#9AA3A8"/><line x1="0" y1="780" x2="1920" y2="780" stroke="${C.ink}" stroke-width="7"/>
      <g id="f07-dash">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<rect x="${i * 300}" y="960" width="150" height="12" fill="#fff"/>`).join("")}</g>
      <g transform="translate(560,620) scale(1.3)">${human("f07c", "cida")}</g>
      <g id="f07-flash" opacity="0"><circle cx="590" cy="735" r="56" fill="${C.pain}" opacity="0.35"/><circle cx="590" cy="735" r="20" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <g id="f07-zone" opacity="0">
        <path d="M590 735 L590 870 A135 135 0 0 0 640 860 Z" fill="${C.pain}" opacity="0.5"/>
        <path d="M590 870 A135 135 0 0 0 725 735" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/>
        <rect x="660" y="640" width="250" height="46" rx="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>
        <text x="785" y="672" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="#fff">zona de aperto</text>
      </g>
    </svg>
    <div id="f07-h" class="abs title" style="opacity:0">Por que na <span>CORRIDA</span>?</div>
    <div id="f07-slow" class="abs label" style="opacity:0">câmera lenta</div>
    <div id="f07-cnt" class="abs card" style="opacity:0"><div class="l label">PASSADAS NUMA CORRIDA</div><div class="n title">${nums.map((n, i) => `<div id="f07-n${i}">${n}</div>`).join("")}</div></div>
    <div id="f07-pior" class="abs title" style="opacity:0">Piora com:</div>
    ${chip(0, "descidas", `<path d="M-34 -20 L34 26" ${st} stroke-width="8"/><circle cx="-10" cy="-14" r="8" fill="${C.pain}"/>`)}
    ${chip(1, "passadas longas", `<path d="M-34 22 L-6 -20 L30 22" fill="none" ${st} stroke-width="8"/>`)}
    ${chip(2, "aumento rápido de km", `<path d="M-34 26 L-10 18 L6 10 L30 -30" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/><path d="M18 -30 L30 -30 L30 -18" fill="none" stroke="${C.pain}" stroke-width="6"/>`)}
    ${chip(3, "sempre o mesmo lado da rua inclinada", `<path d="M-36 20 L36 4 L36 26 L-36 26 Z" fill="#9AA3A8" ${st}/>`)}`,
      js: function (tl, K, R) {
        const c = "f07c";
        R.setPose(tl, c, 0, { shF: -20, elF: -70, shB: 20, elB: -70 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.rise(tl, "#f07-h", 0.1, 0.5);
        R.fadeIn(tl, "#f07-slow", K.passada - 0.3, 0.3);
        // corrida em câmera lenta: passada de 0.8 s, flash no toque do pé
        const t0 = 0.3, step = 0.8, n = Math.floor((K.dur - 0.6 - t0) / step);
        tl.to("#f07-scroll", { x: -900, duration: K.dur - t0, ease: "none" }, t0);
        tl.to("#f07-dash", { x: -600, duration: K.dur - t0, ease: "none" }, t0);
        for (let i = 0; i < n; i++) {
          const a = i % 2, t = t0 + i * step;
          R.pose(tl, c, t, step * 0.9, { hipF: a ? 30 : -40, knF: a ? 70 : 22, hipB: a ? -40 : 30, knB: a ? 22 : 70, shF: a ? -50 : 30, shB: a ? 30 : -50, elF: -80, elB: -80, torso: 8 }, "sine.inOut");
          if (!a && t > K.pe - 0.4) {
            tl.set("#f07-flash", { opacity: 1 }, t + step * 0.85);
            tl.fromTo("#f07-flash", { scale: 0.5, svgOrigin: "590 735" }, { scale: 1.2, svgOrigin: "590 735", duration: 0.2, ease: "power2.out" }, t + step * 0.85);
            tl.to("#f07-flash", { opacity: 0, duration: 0.3 }, t + step * 0.85 + 0.25);
          }
        }
        R.blinks(tl, c, 0.5, K.dur);
        // zona de aperto no joelho
        R.pop(tl, "#f07-zone", K.zona - 0.1, 0.4);
        tl.to("#f07-zone", { opacity: 0, duration: 0.3 }, K.milh + 0.6);
        // contador de passadas
        R.pop(tl, "#f07-cnt", K.passada - 0.2, 0.4);
        const ts = [K.passada, K.toca, K.zona, K.milh - 0.3, K.milh + 0.2];
        ts.forEach((t, i) => {
          tl.set(`#f07-n${i}`, { opacity: 1 }, t);
          if (i > 0) tl.set(`#f07-n${i - 1}`, { opacity: 0 }, t);
        });
        tl.fromTo("#f07-n4", { scale: 0.6 }, { scale: 1, duration: 0.3, ease: "back.out(3)", transformOrigin: "0% 50%" }, K.milh + 0.2);
        R.face(tl, c, K.milh, { eyes: "wide", mouth: "flat" });
        // o que piora
        R.fadeIn(tl, "#f07-pior", K.desc - 0.3, 0.3);
        [K.desc, K.longas, K.aum, K.rua].forEach((t, i) => R.slideIn(tl, `#f07-ch${i}`, t - 0.1, 0.4, 200));
        R.face(tl, c, K.pior, { eyes: "pain", mouth: "frown" });
      },
      sfx: [
        { name: "whoosh-short", t: 0.3, vol: 0.3 },
        { name: "pop", t: k.zona - 0.1, vol: 0.35 },
        { name: "pop", t: k.passada - 0.2, vol: 0.3 },
        { name: "sparkle", t: k.milh + 0.2, vol: 0.3 },
        ...[k.desc, k.longas, k.aum, k.rua].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.28 })),
      ],
    };
  },
};
