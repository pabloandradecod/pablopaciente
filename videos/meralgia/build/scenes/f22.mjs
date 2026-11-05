// F22 — Exercício 4: deslizamento do Nervinho (deitado de lado, perna de cima vai um pouco pra trás e volta)
export default {
  speakers: { nervinho: "f22n" },
  extra: 0.6,
  build(ctx) {
    const { C, human, nervinho, smooth, w, lines } = ctx;
    const k = {
      quatro: w(0, "Quatro"), desl: w(0, "deslizamento"), deit: w(0, "Deitado"), leva: w(0, "leva"), tras: w(0, "trás"),
      volta: w(0, "volta"), dev: w(0, "devagar"), duas: w(0, "Duas"), suave: w(0, "suave"),
      v0: lines[1].start, v1: lines[1].end, chique: w(1, "chique"),
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
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f22-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:70px; font-size:72px; }
        #f22-head span { color:${C.good}; }
        #f22-card { left:110px; top:180px; width:560px; padding:24px 30px; }
        #f22-card .t { font-size:40px; line-height:1.05; }
        #f22-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f22-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f22-stop { left:110px; top:610px; width:460px; padding:14px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f22-stop b { font-size:34px; display:block; }
        #f22-view { left:820px; top:500px; padding:8px 16px; font-size:24px; }
        #f22-xl { left:1270px; top:130px; font-size:26px; color:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="1080" fill="${C.floor}"/>
      <g opacity="0.35">${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 170}" y1="0" x2="${i * 170}" y2="1080" stroke="#fff" stroke-width="4"/>`).join("")}</g>
      <rect x="700" y="610" width="760" height="190" rx="26" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(1010,705) scale(1.3)">${human("f22z", "ze")}</g>
      <g id="f22-arc" opacity="0"><path d="M800 610 Q760 560 790 500" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-dasharray="14 12"/><path d="M770 520 L792 494 L810 524" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
      <!-- painel raio-x -->
      <g id="f22-xray" opacity="0">
        <clipPath id="f22-clip"><rect x="1250" y="120" width="580" height="360" rx="26"/></clipPath>
        <rect x="1250" y="120" width="580" height="360" rx="26" fill="#1B3440" stroke="${C.ink}" stroke-width="8"/>
        <g clip-path="url(#f22-clip)">
          <path d="M1300 250 Q1560 230 1820 270 L1820 430 Q1560 450 1300 420 Z" fill="#3E6A80" stroke="#BFE6EE" stroke-width="5"/>
          <g id="f22-nw">${nervinho("f22n", base, 22, 1.6)}</g>
          <g transform="translate(1360,320) scale(1.6)"><g id="f22-glasses" opacity="0"><rect x="-29" y="-20" width="26" height="18" rx="6" fill="${C.ink}"/><rect x="3" y="-20" width="26" height="18" rx="6" fill="${C.ink}"/><line x1="-4" y1="-12" x2="4" y2="-12" stroke="${C.ink}" stroke-width="4"/></g></g>
        </g>
      </g>
    </svg>
    <div id="f22-head" class="abs title">4. <span>DESLIZAMENTO</span></div>
    <div id="f22-xl" class="abs label" style="opacity:0">RAIO-X: o Nervinho deslizando</div>
    <div id="f22-view" class="abs card label">visto de cima · deitado de lado</div>
    <div id="f22-card" class="abs card">
      <div class="t title">Deslizamento do nervo</div>
      ${row(0, "Deitado de lado")}
      ${row(1, "Perna de cima um pouco pra trás")}
      ${row(2, "Volta devagar")}
      ${row(3, "<b>2 x 10 · bem suave</b>", C.sun)}
    </div>
    <div id="f22-stop" class="abs card label">Formigou mais forte?<b>Diminui a amplitude</b></div>`,
      js: function (tl, K, R) {
        const z = "f22z", n = "f22n";
        // deitado de lado, visto de cima: cabeça à direita, frente do corpo para baixo
        R.setPose(tl, z, 0, { root: 90, torso: 0, neck: 0, shB: -10, shF: -14, elB: -30, elF: -40, hipB: 0, hipF: 0, knB: 6, knF: 4, anB: 0, anF: 0 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.face(tl, n, 0, { eyes: "normal", mouth: "smile" });
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f22-card", 0.2, 0.55, -400);
        R.pop(tl, "#f22-stop", 0.6, 0.4);
        [K.deit, K.leva, K.volta, K.duas].forEach((t, i) => tl.fromTo(`#f22-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        R.pop(tl, "#f22-xray", K.desl - 0.1, 0.45, 0.7);
        R.fadeIn(tl, "#f22-xl", K.desl + 0.2, 0.3);
        R.pop(tl, "#f22-arc", K.tras - 0.2, 0.35);
        // repetições: perna de cima vai pra trás (extensão do quadril) e volta; o nervo desliza junto
        K.reps.forEach((t) => {
          R.pose(tl, z, t, 1.0, { hipF: 24, knF: 2 }, "sine.inOut");
          R.nerveTo(tl, n, t, 1.0, K.pB, "sine.inOut");
          R.pose(tl, z, t + 1.1, 1.0, { hipF: 0, knF: 4 }, "sine.inOut");
          R.nerveTo(tl, n, t + 1.1, 1.0, K.pA, "sine.inOut");
        });
        R.face(tl, z, K.dev, { eyes: "closed", mouth: "smile" });
        // Nervinho: "que chique!"
        R.face(tl, n, K.v0 - 0.2, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f22-glasses", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out" }, K.chique - 0.2);
        tl.fromTo("#f22n-face", { rotation: -8 }, { rotation: 8, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.v0);
        R.face(tl, z, K.v1, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
