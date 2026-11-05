// F21 — Exercício 4: ponte de glúteos
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { cinco: w(0, "Quatro"), ponte: w(0, "ponte"), fort: w(0, "segura"), pelve: w(0, "desce"), tres: w(0, "Três") };
    k.sobe = w(0, "Sobe");
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.tres, vol: 0.4 }];
    // repetições: sobe, segura ~1.6 s, desce
    const reps = [];
    for (let t = k.sobe; t < ctx.dur - 1.0; t += 2.9) reps.push(+t.toFixed(3));
    k.reps = reps;
    reps.forEach((t) => sfx.push({ name: "pop", t: t + 0.35, vol: 0.3 }));
    return {
      k,
      css: `
        #f21-head { left:110px; top:90px; font-size:84px; }
        #f21-head span { color:${C.good}; }
        #f21-card { left:1300px; top:160px; width:520px; padding:28px 34px; }
        #f21-card .t { font-size:42px; }
        #f21-card .row { font-size:32px; margin-top:14px; display:flex; align-items:center; gap:14px; }
        #f21-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f21-stop { left:1360px; top:700px; width:460px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; border-color:${C.ink}; text-align:center; }
        #f21-stop b { font-size:34px; display:block; }
        #f21-timer { left:930px; top:330px; width:130px; height:130px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:58px; display:flex; align-items:center; justify-content:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f21-glow" opacity="0"><circle cx="830" cy="560" r="80" fill="${C.sun}" opacity="0.55"/></g>
      <g transform="translate(820,622) scale(1.5)">${human("f21z", "ze")}</g>
    </svg>
    <div id="f21-head" class="abs title">4. <span>PONTE</span></div>
    <div id="f21-timer" class="abs title" style="opacity:0">2s</div>
    <div id="f21-card" class="abs card">
      <div class="t title">Ponte de glúteos</div>
      <div class="row label" id="f21-r0"><div class="dot"></div>Deitado, joelhos dobrados</div>
      <div class="row label" id="f21-r1"><div class="dot"></div>Sobe e segura 2 s</div>
      <div class="row label" id="f21-r2"><div class="dot"></div>Desce devagar</div>
      <div class="row label" id="f21-r3"><div class="dot" style="background:${C.sun}"></div><b>3 x 10 a 12</b></div>
    </div>
    <div id="f21-stop" class="abs card label">Desconforto leve: OK<b>Dor forte: diminui</b></div>`,
      js: function (tl, K, R) {
        const z = "f21z";
        // deitado de barriga pra cima, pernas esticadas
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.reps[0] || K.dur);
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f21-card", 0.2, 0.55, 400);
        R.pop(tl, "#f21-stop", 0.6, 0.4);
        [K.ponte, K.fort, K.pelve, K.tres].forEach((t, i) => tl.fromTo(`#f21-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // repetições
        K.reps.forEach((t, i) => {
          R.pose(tl, z, t, 0.45, { torso: -22, neck: 22, shB: 22, shF: 22, hipB: -4, hipF: -4, knB: 94, knF: 94, anB: 0, anF: 0 }, "power2.out");
          R.move(tl, z, t, 0.45, 0, -60, "power2.out");
          R.face(tl, z, t, { eyes: "closed", mouth: "flat" });
          tl.fromTo("#f21-glow", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t + 0.3);
          tl.to("#f21-glow", { opacity: 0, duration: 0.3 }, t + 2.0);
          if (i === 0) { R.pop(tl, "#f21-timer", t + 0.4, 0.35); R.fadeOut(tl, "#f21-timer", t + 2.0); }
          R.pose(tl, z, t + 2.0, 0.5, { torso: 0, neck: 0, shB: 0, shF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 });
          R.move(tl, z, t + 2.0, 0.5, 0, 0);
          R.face(tl, z, t + 2.0, { eyes: "happy", mouth: "smile" });
        });
      },
      sfx,
    };
  },
};
