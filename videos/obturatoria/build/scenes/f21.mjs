// F21 — Exercício 3: deslizamento do Turão (deitado de costas, abre a perna um pouco pro lado e volta)
export default {
  speakers: { turao: "f21n" },
  extra: 0.6,
  build(ctx) {
    const { C, human, turao, smooth, w, lines } = ctx;
    const k = {
      quatro: w(0, "Três"), desl: w(0, "deslizamento"), deit: w(0, "Deitado"), leva: w(0, "abre"), tras: w(0, "lado"),
      volta: w(0, "volta"), dev: w(0, "devagar"), duas: w(0, "Duas"), suave: w(0, "suave"),
      v0: lines[1].start, v1: lines[1].end, chique: w(1, "porta"),
    };
    // nervo no painel raio-x: duas posições (desliza ~40 px)
    const base = [[1360, 320], [1440, 330], [1520, 340], [1600, 348], [1680, 354], [1760, 358]];
    k.pA = smooth(base);
    k.pB = smooth(base.map(([x, y], i) => [x + (i === 0 ? 0 : 38), y + (i === 0 ? 0 : 2)]));
    const reps = [];
    for (let t = k.leva + 0.1; t < lines[1].end + 0.2; t += 2.5) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.duas, vol: 0.35 },
      { name: "sparkle", t: k.chique, vol: 0.4 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f21-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f21-head { left:110px; top:70px; font-size:72px; }
        #f21-head span { color:${C.good}; }
        #f21-card { left:110px; top:180px; width:560px; padding:24px 30px; }
        #f21-card .t { font-size:40px; line-height:1.05; }
        #f21-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f21-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f21-stop { left:110px; top:610px; width:460px; padding:14px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f21-stop b { font-size:34px; display:block; }
        #f21-view { left:820px; top:500px; padding:8px 16px; font-size:24px; }
        #f21-xl { left:1270px; top:130px; font-size:26px; color:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="1080" fill="${C.floor}"/>
      <g opacity="0.35">${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 170}" y1="0" x2="${i * 170}" y2="1080" stroke="#fff" stroke-width="4"/>`).join("")}</g>
      <rect x="700" y="610" width="760" height="190" rx="26" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(1010,705) scale(1.3)">${human("f21z", "ze")}</g>
      <g id="f21-arc" opacity="0"><path d="M790 760 Q760 800 800 850" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-dasharray="14 12"/><path d="M778 830 L802 856 L822 828" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
      <!-- painel raio-x -->
      <g id="f21-xray" opacity="0">
        <clipPath id="f21-clip"><rect x="1250" y="120" width="580" height="360" rx="26"/></clipPath>
        <rect x="1250" y="120" width="580" height="360" rx="26" fill="#1B3440" stroke="${C.ink}" stroke-width="8"/>
        <g clip-path="url(#f21-clip)">
          <path d="M1300 250 Q1560 230 1820 270 L1820 430 Q1560 450 1300 420 Z" fill="#3E6A80" stroke="#BFE6EE" stroke-width="5"/>
          <g id="f21-door"><path d="M1530 290 L1610 290 L1610 400 L1530 400 Z M1548 310 Q1548 300 1560 300 L1580 300 Q1592 300 1592 310 L1592 380 L1548 380 Z" fill="#C9B48E" fill-rule="evenodd" stroke="#BFE6EE" stroke-width="5"/></g><g id="f21-nw">${turao("f21n", base, 22, 1.1)}</g>
          <g id="f21-glasses" opacity="0"><rect x="1380" y="180" width="16" height="10" fill="#FFC94A" transform="rotate(0 1388 185)"/><rect x="1425" y="220" width="16" height="10" fill="#FF5A4E" transform="rotate(30 1433 225)"/><rect x="1470" y="180" width="16" height="10" fill="#3DD9A4" transform="rotate(60 1478 185)"/><rect x="1515" y="220" width="16" height="10" fill="#FFFFFF" transform="rotate(90 1523 225)"/><rect x="1560" y="180" width="16" height="10" fill="#FFC94A" transform="rotate(120 1568 185)"/><rect x="1605" y="220" width="16" height="10" fill="#FF5A4E" transform="rotate(150 1613 225)"/><rect x="1650" y="180" width="16" height="10" fill="#3DD9A4" transform="rotate(180 1658 185)"/><rect x="1695" y="220" width="16" height="10" fill="#FFFFFF" transform="rotate(210 1703 225)"/><rect x="1740" y="180" width="16" height="10" fill="#FFC94A" transform="rotate(240 1748 185)"/></g>
        </g>
      </g>
    </svg>
    <div id="f21-head" class="abs title">3. <span>DESLIZAMENTO</span></div>
    <div id="f21-xl" class="abs label" style="opacity:0">RAIO-X: o Turão pela porta</div>
    <div id="f21-view" class="abs card label">visto de cima · deitado de costas</div>
    <div id="f21-card" class="abs card">
      <div class="t title">Deslizamento do nervo</div>
      ${row(0, "Deitado de costas")}
      ${row(1, "Abre a perna um pouco pro lado")}
      ${row(2, "Volta devagar, sem alongar até doer")}
      ${row(3, "<b>2 x 10 · bem suave</b>", C.sun)}
    </div>
    <div id="f21-stop" class="abs card label">Choque ou formigou mais?<b>Diminui</b></div>`,
      js: function (tl, K, R) {
        const z = "f21z", n = "f21n";
        // deitado de lado, visto de cima: cabeça à direita, frente do corpo para baixo
        R.setPose(tl, z, 0, { root: 90, torso: 0, neck: 0, shB: -10, shF: -14, elB: -30, elF: -40, hipB: 0, hipF: 0, knB: 6, knF: 4, anB: 0, anF: 0 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.face(tl, n, 0, { eyes: "normal", mouth: "smile" });
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f21-card", 0.2, 0.55, -400);
        R.pop(tl, "#f21-stop", 0.6, 0.4);
        [K.deit, K.leva, K.volta, K.duas].forEach((t, i) => tl.fromTo(`#f21-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        R.pop(tl, "#f21-xray", K.desl - 0.1, 0.45, 0.7);
        R.fadeIn(tl, "#f21-xl", K.desl + 0.2, 0.3);
        R.pop(tl, "#f21-arc", K.tras - 0.2, 0.35);
        // repetições: perna de cima vai pra trás (extensão do quadril) e volta; o nervo desliza junto
        K.reps.forEach((t) => {
          R.pose(tl, z, t, 1.0, { hipF: -20, knF: 2 }, "sine.inOut");
          R.nerveTo(tl, n, t, 1.0, K.pB, "sine.inOut");
          R.pose(tl, z, t + 1.1, 1.0, { hipF: 0, knF: 4 }, "sine.inOut");
          R.nerveTo(tl, n, t + 1.1, 1.0, K.pA, "sine.inOut");
        });
        R.face(tl, z, K.dev, { eyes: "closed", mouth: "smile" });
        // Nervinho: "que chique!"
        R.face(tl, n, K.v0 - 0.2, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f21-glasses", { opacity: 0, y: -40 }, { opacity: 1, y: 60, duration: 0.9, ease: "power1.out" }, K.chique - 0.2);
        tl.to("#f21-glasses", { opacity: 0, duration: 0.3 }, K.chique + 0.8);
        tl.fromTo("#f21n-face", { rotation: -8 }, { rotation: 8, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.v0);
        R.face(tl, z, K.v1, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
