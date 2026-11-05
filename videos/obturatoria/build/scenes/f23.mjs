// F23 — Exercício 5: prancha lateral curta, com os joelhos apoiados; evolução futura com o profissional (Adutores aparecem)
export default {
  speakers: {},
  extra: 0.8,
  build(ctx) {
    const { C, human, adutores, w, lines } = ctx;
    const k = {
      cinco: w(0, "Cinco"), pran: w(0, "prancha"), joel: w(0, "joelhos"), seg: w(0, "Segura"), quinze: w(0, "quinze"), lado: w(0, "lado"),
      mais: w(0, "Mais"), prof: w(0, "profissional"), evol: w(0, "evoluir"), adut: w(0, "adutores"), end: lines[0].end,
    };
    const reps = [];
    for (let t = k.seg - 0.2; t < k.mais - 1.0; t += 3.4) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.quinze, vol: 0.35 },
      { name: "pop", t: k.prof, vol: 0.4 },
      { name: "sparkle", t: k.adut, vol: 0.4 },
      ...reps.map((t) => ({ name: "pop", t: t + 0.35, vol: 0.25 })),
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f23-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f23-head { left:110px; top:70px; font-size:72px; }
        #f23-head span { color:${C.good}; }
        #f23-card { left:1300px; top:140px; width:520px; padding:24px 30px; }
        #f23-card .t { font-size:40px; line-height:1.05; }
        #f23-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f23-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f23-stop { left:110px; top:190px; width:460px; padding:14px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f23-stop b { font-size:34px; display:block; }
        #f23-view { left:110px; top:320px; padding:8px 16px; font-size:24px; }
        #f23-timer { left:960px; top:420px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:40px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
        #f23-pro { left:1300px; top:560px; width:520px; padding:18px 24px; font-size:28px; line-height:1.2; background:#FFF3D6; }
        #f23-pro b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="760" fill="${C.wall}"/>
      <rect x="0" y="760" width="1920" height="320" fill="${C.floor}"/>
      <line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <rect x="320" y="736" width="820" height="34" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f23-glow" opacity="0"><ellipse cx="860" cy="660" rx="120" ry="50" fill="${C.sun}" opacity="0.5"/></g>
      <g transform="translate(860,684) scale(1.4)">${human("f23z", "ze")}</g>
      <g id="f23-aw" opacity="0"><g transform="translate(1560,1000) scale(0.5)">${adutores("f23a")}</g></g>
    </svg>
    <div id="f23-head" class="abs title">5. <span>PRANCHA LATERAL</span></div>
    <div id="f23-view" class="abs card label" style="opacity:0">de lado · apoiado no cotovelo e nos joelhos</div>
    <div id="f23-timer" class="abs title" style="opacity:0">15-20s</div>
    <div id="f23-card" class="abs card">
      <div class="t title">Prancha lateral curta</div>
      ${row(0, "Joelhos apoiados")}
      ${row(1, "Cotovelo embaixo do ombro")}
      ${row(2, "Sobe o quadril e segura")}
      ${row(3, "<b>3 x 15 a 20 s · cada lado</b>", C.sun)}
    </div>
    <div id="f23-stop" class="abs card label">Choque ou formigou mais?<b>Diminui</b></div>
    <div id="f23-pro" class="abs card label" style="opacity:0"><b>Depois:</b> versões mais fortes, que trabalham os adutores, <b>com o profissional</b>.</div>`,
      js: function (tl, K, R) {
        const z = "f23z";
        // de lado, cabeça à esquerda; joelhos dobrados apoiados; quadril no chão (posição baixa)
        const low = { root: -88, torso: 0, neck: 10, shF: 86, elF: 90, shB: 86, elB: 90, hipF: -20, hipB: -20, knF: 70, knB: 70, anF: 0, anB: 0 };
        const high = { root: -64, neck: 0, shF: 62, elF: 100, shB: 62, elB: 100, hipF: -42, hipB: -42, knF: 72, knB: 72 };
        R.setPose(tl, z, 0, low);
        tl.set("#f23z-root", { y: -4 }, 0);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f23-card", 0.2, 0.55, 400);
        R.pop(tl, "#f23-stop", 0.6, 0.4);
        R.fadeIn(tl, "#f23-view", K.pran, 0.3);
        [K.joel, K.joel + 0.6, K.seg, K.quinze].forEach((t, i) => tl.fromTo(`#f23-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // repetições: sobe o quadril, segura, desce
        K.reps.forEach((t, i) => {
          R.pose(tl, z, t, 0.5, high, "power2.out");
          tl.to("#f23z-root", { y: -8, duration: 0.5, ease: "power2.out" }, t);
          R.face(tl, z, t + 0.2, { eyes: "closed", mouth: "flat" });
          tl.fromTo("#f23-glow", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t + 0.3);
          tl.to("#f23-glow", { opacity: 0, duration: 0.3 }, t + 2.3);
          if (i === 0) { R.pop(tl, "#f23-timer", t + 0.4, 0.35); R.fadeOut(tl, "#f23-timer", t + 2.4); }
          R.pose(tl, z, t + 2.4, 0.5, low);
          tl.to("#f23z-root", { y: -4, duration: 0.5 }, t + 2.4);
          R.face(tl, z, t + 2.4, { eyes: "happy", mouth: "smile" });
        });
        // evolução com o profissional + Adutores
        R.pop(tl, "#f23-pro", K.prof - 0.1, 0.45);
        tl.fromTo("#f23-aw", { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.adut - 0.2);
        ["m0", "m1", "m2"].forEach((m, i) => {
          R.face(tl, `f23a-${m}`, 0, { eyes: "normal", mouth: "grin" });
          tl.fromTo(`#f23a-${m}-body`, { y: 0 }, { y: -14, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.adut + 0.1 + i * 0.08);
          R.pose(tl, `f23a-${m}`, K.adut + 0.1, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        });
      },
    };
  },
};
