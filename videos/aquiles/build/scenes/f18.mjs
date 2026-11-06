// F18 — Primeiro passo: ajustar o treino (menos km, sem ladeira por um tempo, bike/natação mantém o condicionamento; diminuir ≠ parar); Dr. Pablo pedala, Dona Cida corre e provoca
export default {
  speakers: { cida: "f18c" },
  tail: 1.0,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      prim: w(0, "Primeiro"), aju: w(0, "ajustar"), dim: w(0, "diminuir"), dist: w(0, "distância"), tir: w(0, "tirar"), lad: w(0, "ladeiras"),
      temp: w(0, "tempo"), mant: w(0, "mantendo"), bic: w(0, "bicicleta"), nat: w(0, "natação"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const before = [120, 170, 230, 290];
    const bars = before.map((h, i) => `<rect id="f18-b${i}" x="${50 + i * 100}" y="${300 - h}" width="70" height="${h}" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>`).join("");
    const bikeIcon = `<g transform="translate(40,40)"><circle cx="-18" cy="8" r="14" fill="none" ${st} stroke-width="5"/><circle cx="20" cy="8" r="14" fill="none" ${st} stroke-width="5"/><path d="M-18 8 L-4 -12 L14 -12 L20 8 M-4 -12 L2 8 L14 -12" fill="none" stroke="${C.pain}" stroke-width="5"/></g>`;
    const swimIcon = `<g transform="translate(40,40)"><circle cx="-6" cy="-10" r="10" fill="#E9B48C" ${st} stroke-width="4"/><path d="M4 -6 L24 -16" ${st} stroke-width="6"/><path d="M-30 10 Q-20 2 -10 10 T10 10 T30 10" fill="none" stroke="#3E7FD8" stroke-width="6"/><path d="M-30 22 Q-20 14 -10 22 T10 22 T30 22" fill="none" stroke="#3E7FD8" stroke-width="6"/></g>`;
    return {
      k,
      css: `
        #f18-title { left:110px; top:60px; font-size:70px; }
        #f18-title span { color:#1E9C72; }
        #f18-chart { left:110px; top:170px; width:520px; padding:16px 22px 8px; }
        #f18-chart .t { font-size:28px; }
        #f18-hill { left:110px; top:590px; width:520px; padding:12px 20px; display:flex; align-items:center; gap:16px; font-size:32px; }
        #f18-keep { left:110px; top:730px; width:520px; padding:12px 20px; display:flex; align-items:center; gap:10px; font-size:28px; line-height:1.1; }
        #f18-not { left:330px; top:520px; padding:8px 20px; font-size:30px; color:#fff; background:${C.ink}; border-radius:14px; transform:rotate(-3deg); }
        #f18-bal { left:1060px; top:110px; width:440px; padding:14px 18px; font-size:34px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.sky}"/>
      <circle cx="1760" cy="110" r="56" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
      <g id="f18-scroll">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<g transform="translate(${760 + i * 420},0)"><rect x="-14" y="640" width="28" height="120" fill="#8B5A2B" stroke="${C.ink}" stroke-width="7"/><circle cx="0" cy="610" r="70" fill="#5DB560" stroke="${C.ink}" stroke-width="7"/></g>`).join("")}</g>
      <rect y="760" width="1920" height="320" fill="#9AA3A8"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <g id="f18-dash">${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 340}" y="900" width="170" height="14" fill="#fff"/>`).join("")}</g>
      <!-- Dona Cida correndo -->
      <g id="f18-c-wrap" opacity="0"><g transform="translate(1540,560) scale(1.25)">${human("f18c", "cida")}</g></g>
      <!-- Dr. Pablo de bicicleta -->
      <g id="f18-bike" opacity="0"><g transform="translate(560,40)">
        <g id="f18-w1"><circle cx="300" cy="830" r="62" fill="none" stroke="${C.ink}" stroke-width="7"/><path d="M300 772 L300 888 M242 830 L358 830" stroke="${C.ink}" stroke-width="3"/></g>
        <g id="f18-w2"><circle cx="520" cy="830" r="62" fill="none" stroke="${C.ink}" stroke-width="7"/><path d="M520 772 L520 888 M462 830 L578 830" stroke="${C.ink}" stroke-width="3"/></g>
        <path d="M300 830 L380 730 L500 730 L520 830 M380 730 L420 830 L500 730 M380 730 L370 700 M500 730 L510 690 L540 690" fill="none" stroke="#3E7FD8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <g transform="translate(400,700) scale(1.0)">${human("f18p", "pablo")}</g>
      </g></g>
    </svg>
    <div id="f18-title" class="abs title" style="opacity:0">Passo 1: <span>ajustar o treino</span></div>
    <div id="f18-chart" class="abs card" style="opacity:0">
      <div class="t label">KM POR SEMANA</div>
      <svg width="476" height="320" viewBox="0 0 476 320"><line x1="30" y1="300" x2="470" y2="300" stroke="${C.ink}" stroke-width="5"/><line x1="30" y1="20" x2="30" y2="300" stroke="${C.ink}" stroke-width="5"/>${bars}</svg>
    </div>
    <div id="f18-not" class="abs title" style="opacity:0">diminuir ≠ parar</div>
    <div id="f18-hill" class="abs card label" style="opacity:0">
      <svg width="90" height="60" viewBox="0 0 90 60"><path d="M4 56 L45 8 L86 56 Z" fill="#9CCB7A" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/><path id="f18-hx" d="M10 6 L80 58 M80 6 L10 58" stroke="#D64534" stroke-width="9" stroke-linecap="round" opacity="0"/></svg>
      <span>Ladeiras: <b style="color:#D64534">pausa</b> por um tempo</span></div>
    <div id="f18-keep" class="abs card label" style="opacity:0">
      <svg id="f18-ib" width="80" height="80" viewBox="0 0 80 80" style="opacity:0">${bikeIcon}</svg>
      <svg id="f18-is" width="80" height="80" viewBox="0 0 80 80" style="opacity:0">${swimIcon}</svg>
      <span>mantém o <b style="color:#1E9C72">condicionamento</b></span></div>
    <div id="f18-bal" class="abs card label" style="opacity:0">Agora quem espera<br>é <b style="color:#8E6CD8">você</b>, doutor!</div>`,
      js: function (tl, K, R) {
        const p = "f18p", c = "f18c";
        R.rise(tl, "#f18-title", Math.max(0.1, K.prim - 0.2), 0.45, 30);
        R.slideIn(tl, "#f18-chart", K.aju - 0.3, 0.5, -300);
        // menos km (não zera)
        R.pop(tl, "#f18-not", K.dim - 0.1, 0.4);
        const after = [100, 100, 95, 90];
        after.forEach((h, i) => tl.to(`#f18-b${i}`, { attr: { y: 300 - h, height: h }, fill: "#FFC94A", duration: 0.5, ease: "power2.inOut" }, K.dist + i * 0.12));
        // ladeira em pausa
        R.pop(tl, "#f18-hill", K.tir - 0.2, 0.4, 0.6);
        tl.to("#f18-hx", { opacity: 1, duration: 0.2 }, K.lad);
        // condicionamento: bike e natação
        R.pop(tl, "#f18-keep", K.mant - 0.2, 0.4, 0.6);
        R.pop(tl, "#f18-ib", K.bic - 0.1, 0.35);
        R.pop(tl, "#f18-is", K.nat - 0.1, 0.35);
        // Dr. Pablo pedala
        R.setPose(tl, p, 0, { hipF: -60, knF: 80, hipB: -60, knB: 80, shF: -60, elF: -30, shB: -60, elB: -30, torso: 14 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.5, K.dur);
        tl.set("#f18-bike", { opacity: 1 }, K.aju - 0.4);
        tl.fromTo("#f18-bike", { x: -900 }, { x: 0, duration: 0.8, ease: "power2.out" }, K.aju - 0.4);
        const t0 = K.aju - 0.4, n = Math.floor((K.dur - t0) / 0.5);
        for (let i = 0; i < n; i++) {
          const a = i % 2;
          R.pose(tl, p, t0 + i * 0.5, 0.48, { hipF: a ? -40 : -75, knF: a ? 60 : 100, hipB: a ? -75 : -40, knB: a ? 100 : 60 }, "sine.inOut");
        }
        tl.to("#f18-w1", { rotation: 360 * n * 0.5, svgOrigin: "300 830", duration: K.dur - t0, ease: "none" }, t0);
        tl.to("#f18-w2", { rotation: 360 * n * 0.5, svgOrigin: "520 830", duration: K.dur - t0, ease: "none" }, t0);
        tl.to("#f18-scroll", { x: -1200, duration: K.dur - t0, ease: "none" }, t0);
        tl.to("#f18-dash", { x: -1020, duration: K.dur - t0, ease: "none" }, t0);
        R.face(tl, p, K.bic, { eyes: "happy", mouth: "grin" });
        // Dona Cida passa correndo e provoca
        tl.set("#f18-c-wrap", { opacity: 1 }, K.c0 - 1.0);
        tl.fromTo("#f18-c-wrap", { x: 500 }, { x: 0, duration: 0.7, ease: "power2.out" }, K.c0 - 1.0);
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        const c0 = K.c0 - 1.0, m = Math.floor((K.dur - c0) / 0.36);
        for (let i = 0; i < m; i++) {
          const a = i % 2;
          R.pose(tl, c, c0 + i * 0.36, 0.34, { hipF: a ? 30 : -45, knF: a ? 70 : 20, hipB: a ? -45 : 30, knB: a ? 20 : 70, shB: a ? 30 : -50, elB: -80, torso: 8 }, "sine.inOut");
        }
        R.pose(tl, c, K.c0, 0.3, { shF: -100, elF: -50 }, "back.out(2)");
        R.pop(tl, "#f18-bal", K.c0, 0.4);
        R.face(tl, p, K.c0 + 0.3, { eyes: "wide", mouth: "flat" });
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.prim - 0.2), vol: 0.35 },
        { name: "whoosh-short", t: k.aju - 0.4, vol: 0.35 },
        { name: "pop", t: k.dim - 0.1, vol: 0.4 },
        { name: "pop", t: k.tir - 0.2, vol: 0.3 },
        { name: "click-soft", t: k.lad, vol: 0.4 },
        { name: "pop", t: k.bic - 0.1, vol: 0.3 },
        { name: "pop", t: k.nat - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.c0 - 1.0, vol: 0.35 },
        { name: "pop", t: k.c0, vol: 0.35 },
      ],
    };
  },
};
