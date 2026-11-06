// F20 — Exercício 4: a concha — deitado de lado, abre o joelho de cima sem girar o quadril + Dona Gansa "Isso! Abre a asa!"
export default {
  speakers: { gansa: "f20g" },
  extra: 0.8,
  build(ctx) {
    const { C, human, gansa, w, lines } = ctx;
    const k = {
      quatro: w(0, "Quatro"), concha: w(0, "concha"), lado: w(0, "lado"), abre: w(0, "abre"),
      girar: w(0, "girar"), fort: w(0, "fortalece"), glut: w(0, "glúteo"), cair: w(0, "cair"), dentro: w(0, "dentro"),
      g0: lines[1].start, g1: lines[1].end,
    };
    // repetições: abre e fecha
    const reps = [];
    for (let t = k.abre; t < k.g1 + 0.4; t += 1.3) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.concha, vol: 0.4 },
      { name: "sparkle", t: k.glut, vol: 0.35 },
      { name: "whoosh-short", t: k.g0 - 0.5, vol: 0.35 },
      { name: "pop", t: k.g0 + 0.1, vol: 0.35 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f20-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f20-head { left:110px; top:90px; font-size:76px; }
        #f20-head span { color:#1E9C72; }
        #f20-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f20-card .t { font-size:42px; }
        #f20-card .row { font-size:31px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f20-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f20-stop { left:1320px; top:700px; width:520px; padding:14px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f20-stop b { font-size:30px; display:block; }
        #f20-pl { left:470px; top:380px; font-size:26px; padding:8px 14px; }
        #f20-kn { left:700px; top:300px; font-size:28px; padding:8px 16px; }
        #f20-kn b { color:#1E9C72; }
        #f20-bal { left:1000px; top:440px; padding:12px 22px; font-size:38px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="220" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f20-glow" opacity="0"><circle cx="690" cy="610" r="70" fill="${C.sun}" opacity="0.55"/></g>
      <g transform="translate(700,630) scale(1.5)">${human("f20z", "ze")}</g>
      <line id="f20-pel" x1="630" y1="560" x2="760" y2="560" stroke="${C.pain}" stroke-width="6" stroke-dasharray="12 8" opacity="0"/>
      <g id="f20-shell" opacity="0"><g transform="translate(450,300)">
        <path d="M-80 30 Q0 70 80 30 Q60 -10 0 -6 Q-60 -10 -80 30 Z" fill="#FFD3C9" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <g id="f20-lid"><path d="M-80 30 Q-70 -60 0 -70 Q70 -60 80 30 Q0 10 -80 30 Z" fill="#FFB3AA" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M-40 10 L-30 -50 M0 0 L0 -62 M40 10 L30 -50" stroke="${C.ink}" stroke-width="4" opacity="0.5"/></g>
        <circle cx="0" cy="26" r="16" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
      </g></g>
      <g id="f20-gw" opacity="0"><g transform="translate(1170,868) scale(0.85)">${gansa("f20g")}</g></g>
    </svg>
    <div id="f20-pl" class="abs card label" style="opacity:0">quadril parado</div>
    <div id="f20-kn" class="abs card label" style="opacity:0">joelho <b>não cai pra dentro</b></div>
    <div id="f20-head" class="abs title">4. <span>CONCHA</span></div>
    <div id="f20-card" class="abs card">
      <div class="t title">A concha</div>
      ${row(0, "Deitado de lado")}
      ${row(1, "Abre o joelho de cima")}
      ${row(2, "Sem girar o quadril", C.sky)}
      ${row(3, "Fortalece o glúteo")}
      ${row(4, "<b>3 x 12 a 15</b>", C.sun)}
    </div>
    <div id="f20-bal" class="abs card title" style="opacity:0">Abre a asa!</div>
    <div id="f20-stop" class="abs card label">Dor até 3/10 e normal no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const z = "f20z";
        const closed = { root: -90, torso: 0, neck: -10, shB: -20, elB: -120, shF: -20, elF: -110, hipB: -40, knB: 100, anB: 10, hipF: -40, knF: 100, anF: 10 };
        const open = { hipF: -78, knF: 138 };
        R.setPose(tl, z, 0, closed);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f20-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f20-card", 0.2, 0.55, 400);
        R.pop(tl, "#f20-stop", 0.6, 0.4);
        [K.lado, K.abre, K.girar, K.fort, K.glut + 0.4].forEach((t, i) => tl.fromTo(`#f20-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        R.pop(tl, "#f20-shell", K.concha - 0.1, 0.45);
        K.reps.forEach((t) => {
          R.pose(tl, z, t, 0.5, open, "power2.out");
          tl.to("#f20-lid", { rotation: -28, svgOrigin: "-80 30", duration: 0.5, ease: "power2.out" }, t);
          R.pose(tl, z, t + 0.65, 0.5, { hipF: -40, knF: 100 }, "power2.inOut");
          tl.to("#f20-lid", { rotation: 0, svgOrigin: "-80 30", duration: 0.5, ease: "power2.inOut" }, t + 0.65);
        });
        R.face(tl, z, K.abre + 0.2, { eyes: "normal", mouth: "flat" });
        tl.to("#f20-pel", { opacity: 1, duration: 0.25 }, K.girar);
        R.pop(tl, "#f20-pl", K.girar, 0.4);
        R.fadeOut(tl, "#f20-pl, #f20-pel", K.fort);
        tl.fromTo("#f20-glow", { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, K.glut);
        R.face(tl, z, K.glut, { eyes: "happy", mouth: "smile" });
        R.pop(tl, "#f20-kn", K.cair - 0.2, 0.4);
        R.fadeOut(tl, "#f20-kn", K.g0 - 0.3);
        // Dona Gansa: "Isso! Abre a asa!"
        tl.fromTo("#f20-gw", { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.g0 - 0.5);
        R.setPose(tl, "f20g", 0, { armF: 0, armB: 0 });
        R.face(tl, "f20g", 0, { eyes: "happy" });
        R.pose(tl, "f20g", K.g0 + 0.3, 0.3, { armF: -100, armB: 100 }, "back.out(2)");
        R.pose(tl, "f20g", K.g0 + 0.7, 0.2, { armF: -70, armB: 70 });
        R.pose(tl, "f20g", K.g0 + 0.95, 0.2, { armF: -100, armB: 100 });
        R.pop(tl, "#f20-bal", K.g0 + 0.3, 0.4);
      },
    };
  },
};
