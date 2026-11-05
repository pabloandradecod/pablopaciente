// F23 — Exercício 4: a concha (clamshell) — deitado de lado, abre o joelho de cima
export default {
  speakers: { vertebra: "f23v" },
  gaps: [0.3],
  extra: 0.8,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      quatro: w(0, "Quatro"), concha: w(0, "concha"), lado: w(0, "lado"), joelhos: w(0, "joelhos"), abre: w(0, "abre"),
      girar: w(0, "girar"), tres: w(0, "Três"), fort: w(0, "Fortalece"), glut: w(0, "glúteos"),
      v0: lines[1].start, v1: lines[1].end,
    };
    // repetições: abre e fecha
    const reps = [];
    for (let t = k.abre; t < k.v1 + 0.6; t += 1.3) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.concha, vol: 0.4 },
      { name: "pop", t: k.tres, vol: 0.35 },
      { name: "sparkle", t: k.glut, vol: 0.35 },
      { name: "pop", t: k.v0, vol: 0.35 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f23-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f23-head { left:110px; top:90px; font-size:76px; }
        #f23-head span { color:${C.good}; }
        #f23-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f23-card .t { font-size:42px; }
        #f23-card .row { font-size:32px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f23-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f23-stop { left:1360px; top:700px; width:460px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f23-stop b { font-size:40px; display:block; }
        #f23-pl { left:470px; top:360px; font-size:26px; padding:8px 14px; }
        #f23-bal { left:1010px; top:500px; width:300px; padding:14px 18px; font-size:32px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="220" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f23-glow" opacity="0"><circle cx="690" cy="610" r="70" fill="${C.sun}" opacity="0.55"/></g>
      <g transform="translate(700,630) scale(1.5)">${human("f23z", "ze")}</g>
      <line id="f23-pel" x1="630" y1="560" x2="760" y2="560" stroke="${C.pain}" stroke-width="6" stroke-dasharray="12 8" opacity="0"/>
      <!-- concha que abre e fecha -->
      <g id="f23-shell" opacity="0" transform="translate(450,300)">
        <path d="M-80 30 Q0 70 80 30 Q60 -10 0 -6 Q-60 -10 -80 30 Z" fill="#FFD3C9" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <g id="f23-lid"><path d="M-80 30 Q-70 -60 0 -70 Q70 -60 80 30 Q0 10 -80 30 Z" fill="#FFB3AA" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M-40 10 L-30 -50 M0 0 L0 -62 M40 10 L30 -50" stroke="${C.ink}" stroke-width="4" opacity="0.5"/></g>
        <circle cx="0" cy="26" r="16" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
      </g>
      <g id="f23-vw" opacity="0"><g transform="translate(1180,860) scale(0.7)">${vertebra("f23v")}</g></g>
    </svg>
    <div id="f23-pl" class="abs card label" style="opacity:0">pelve parada</div>
    <div id="f23-head" class="abs title">4. <span>CONCHA</span></div>
    <div id="f23-card" class="abs card">
      <div class="t title">A concha</div>
      ${row(0, "Deitado de lado")}
      ${row(1, "Joelhos dobrados, pés juntos")}
      ${row(2, "Abre o joelho de cima")}
      ${row(3, "Sem girar o quadril", C.sky)}
      ${row(4, "<b>3 x 12 a 15</b>", C.sun)}
    </div>
    <div id="f23-bal" class="abs card label" style="opacity:0">que nem ostra!</div>
    <div id="f23-stop" class="abs card label">Dor forte ou formigando mais?<b>PARE</b></div>`,
      js: function (tl, K, R) {
        const z = "f23z";
        // deitado de lado (cabeça à esquerda), quadris e joelhos dobrados, pés juntos
        const closed = { root: -90, torso: 0, neck: -10, shB: -20, elB: -120, shF: -20, elF: -110, hipB: -40, knB: 100, anB: 10, hipF: -40, knF: 100, anF: 10 };
        const open = { hipF: -78, knF: 138 };
        R.setPose(tl, z, 0, closed);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f23-card", 0.2, 0.55, 400);
        R.pop(tl, "#f23-stop", 0.6, 0.4);
        [K.lado, K.joelhos, K.abre, K.girar, K.tres].forEach((t, i) => tl.fromTo(`#f23-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // concha aparece no "concha"
        R.pop(tl, "#f23-shell", K.concha - 0.1, 0.45);
        // abre e fecha
        K.reps.forEach((t, i) => {
          R.pose(tl, z, t, 0.5, open, "power2.out");
          tl.to("#f23-lid", { rotation: -28, svgOrigin: "-80 30", duration: 0.5, ease: "power2.out" }, t);
          R.pose(tl, z, t + 0.65, 0.5, { hipF: -40, knF: 100 }, "power2.inOut");
          tl.to("#f23-lid", { rotation: 0, svgOrigin: "-80 30", duration: 0.5, ease: "power2.inOut" }, t + 0.65);
        });
        R.face(tl, z, K.abre + 0.2, { eyes: "normal", mouth: "flat" });
        // pelve parada
        tl.to("#f23-pel", { opacity: 1, duration: 0.25 }, K.girar);
        R.pop(tl, "#f23-pl", K.girar, 0.4);
        R.fadeOut(tl, "#f23-pl, #f23-pel", K.fort);
        // glúteos acendem
        tl.fromTo("#f23-glow", { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, K.glut);
        R.face(tl, z, K.glut, { eyes: "happy", mouth: "smile" });
        // Vértebra: "Abre e fecha, que nem ostra!"
        tl.fromTo("#f23-vw", { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.v0 - 0.5);
        R.setPose(tl, "f23v", 0, { armF: 20, armB: -20 });
        R.pose(tl, "f23v", K.v0, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        R.pose(tl, "f23v", K.v0 + 0.5, 0.25, { armF: 20, armB: -20 }, "power2.inOut");
        R.pose(tl, "f23v", K.v0 + 0.9, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f23v", K.v0, { eyes: "happy" });
        R.pop(tl, "#f23-bal", K.v0 + 0.1, 0.4);
      },
    };
  },
};
