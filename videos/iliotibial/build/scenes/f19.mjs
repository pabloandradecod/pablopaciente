// F23 — Exercício 5: prancha lateral curta, com os joelhos apoiados; evolução futura com o profissional (Adutores aparecem)
export default {
  speakers: {},
  extra: 0.8,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      tres: w(0, "Três"), pran: w(0, "prancha"), joel: w(0, "joelhos"), evol: w(0, "evoluindo"), estic: w(0, "esticada"), vinte: w(0, "vinte"),
      quar: w(0, "quarenta"), lado: w(0, "lado"), end: lines[0].end,
    };
    const reps = [];
    reps.push(k.joel - 0.3); reps.push(k.estic - 0.2);
    k.reps = reps;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.vinte, vol: 0.35 },
      { name: "sparkle", t: k.estic, vol: 0.35 },
      ...reps.map((t) => ({ name: "pop", t: t + 0.35, vol: 0.25 })),
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f19-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f19-head { left:110px; top:70px; font-size:72px; }
        #f19-head span { color:${C.good}; }
        #f19-card { left:1300px; top:140px; width:520px; padding:24px 30px; }
        #f19-card .t { font-size:40px; line-height:1.05; }
        #f19-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:110px; top:190px; width:460px; padding:14px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f19-stop b { font-size:34px; display:block; }
        #f19-view { left:110px; top:320px; padding:8px 16px; font-size:24px; }
        #f19-timer { left:960px; top:420px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:40px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
        #f19-evo { left:1300px; top:560px; width:520px; padding:18px 24px; font-size:28px; line-height:1.2; background:#FFF3D6; }
        #f19-evo b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="760" fill="${C.wall}"/>
      <rect x="0" y="760" width="1920" height="320" fill="${C.floor}"/>
      <line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <rect x="320" y="736" width="900" height="34" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f19-glow" opacity="0"><ellipse cx="860" cy="660" rx="120" ry="50" fill="${C.sun}" opacity="0.5"/></g>
      <g transform="translate(860,684) scale(1.4)">${human("f19z", "cida")}</g>
    </svg>
    <div id="f19-head" class="abs title">3. <span>PRANCHA LATERAL</span></div>
    <div id="f19-view" class="abs card label" style="opacity:0">de lado · apoiada no cotovelo</div>
    <div id="f19-timer" class="abs title" style="opacity:0">20-40s</div>
    <div id="f19-card" class="abs card">
      <div class="t title">Prancha lateral</div>
      ${row(0, "Começo: joelhos no chão")}
      ${row(1, "Depois: perna esticada")}
      ${row(2, "Cotovelo embaixo do ombro")}
      ${row(3, "<b>3 x 20 a 40 s · cada lado</b>", C.sun)}
    </div>
    <div id="f19-stop" class="abs card label">Doeu na lateral do joelho?<b>Diminui</b></div>
    <div id="f19-evo" class="abs card label" style="opacity:0"><b>Evolução:</b> joelhos no chão → <b>perna esticada</b></div>`,
      js: function (tl, K, R) {
        const z = "f19z";
        // de lado, cabeça à esquerda; joelhos dobrados apoiados; quadril no chão (posição baixa)
        const low = { root: -88, torso: 0, neck: 10, shF: 86, elF: 90, shB: 86, elB: 90, hipF: -20, hipB: -20, knF: 70, knB: 70, anF: 0, anB: 0 };
        const high = { root: -64, neck: 0, shF: 62, elF: 100, shB: 62, elB: 100, hipF: -42, hipB: -42, knF: 72, knB: 72 };
        R.setPose(tl, z, 0, low);
        tl.set("#f19z-root", { y: -4 }, 0);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f19-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f19-card", 0.2, 0.55, 400);
        R.pop(tl, "#f19-stop", 0.6, 0.4);
        R.fadeIn(tl, "#f19-view", K.pran, 0.3);
        [K.joel, K.estic, K.estic + 0.6, K.vinte].forEach((t, i) => tl.fromTo(`#f19-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // repetições: sobe o quadril, segura, desce
        K.reps.forEach((t, i) => {
          R.pose(tl, z, t, 0.5, i === 0 ? high : { ...high, hipF: -6, hipB: -6, knF: 4, knB: 4, root: -72 }, "power2.out");
          tl.to("#f19z-root", { y: -8, duration: 0.5, ease: "power2.out" }, t);
          R.face(tl, z, t + 0.2, { eyes: "closed", mouth: "flat" });
          tl.fromTo("#f19-glow", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t + 0.3);
          tl.to("#f19-glow", { opacity: 0, duration: 0.3 }, (i === 1 ? K.dur - 1.0 : Math.min(t + 2.3, K.estic - 0.9)));
          if (i === 1) { R.pop(tl, "#f19-timer", K.vinte - 0.1, 0.35); }
          const td = i === 1 ? K.dur - 0.9 : Math.min(t + 2.4, K.estic - 0.8);
          R.pose(tl, z, td, 0.5, low);
          tl.to("#f19z-root", { y: -4, duration: 0.5 }, td);
          R.face(tl, z, td, { eyes: "happy", mouth: "smile" });
        });
        R.pop(tl, "#f19-evo", K.evol - 0.1, 0.45);
      },
    };
  },
};
