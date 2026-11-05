// F19 — Exercício 2: joelho ao peito (deitado, puxa um joelho, segura, depois troca)
export default {
  extra: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      dois: w(0, "Dois"), deitado: w(0, "Deitado"), puxa: w(0, "puxa"), segura: w(0, "segura"), troca: w(0, "troca"),
      vinte: w(0, "Vinte"), tres: w(0, "três"), lado: w(0, "lado"),
    };
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f19-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      css: `
        #f19-head { left:110px; top:90px; font-size:76px; }
        #f19-head span { color:${C.good}; }
        #f19-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f19-card .t { font-size:44px; }
        #f19-card .row { font-size:32px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:1340px; top:720px; width:480px; padding:14px 18px; font-size:30px; text-align:center; line-height:1.25; }
        #f19-stop .ok { color:#1E9C72; } #f19-stop .no { color:#C9372A; }
        #f19-timer { left:590px; top:250px; width:170px; height:170px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:44px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
        #f19-swap { left:880px; top:300px; padding:12px 24px; font-size:42px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(820,622) scale(1.5)">${human("f19z", "ze")}</g>
    </svg>
    <div id="f19-head" class="abs title">2. <span>JOELHO AO PEITO</span></div>
    <div id="f19-timer" class="abs title" style="opacity:0">20 a<br>30 s</div>
    <div id="f19-swap" class="abs card title" style="opacity:0">TROCA!</div>
    <div id="f19-card" class="abs card">
      <div class="t title">Joelho ao peito</div>
      ${row(0, "Deitado de barriga pra cima")}
      ${row(1, "Puxa um joelho ao peito")}
      ${row(2, "Segura e depois troca")}
      ${row(3, "<b>20 a 30 s · 3x cada lado</b>", C.sun)}
    </div>
    <div id="f19-stop" class="abs card label">Desconforto leve: <b class="ok">OK</b><br>Dor forte: <b class="no">diminui</b></div>`,
      js: function (tl, K, R) {
        const z = "f19z";
        const base = { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 };
        const pullF = { hipF: -128, knF: 128, anF: 10, hipB: -45, knB: 118, anB: 17, shB: -38, shF: -38, elB: -12, elF: -12, neck: -10 };
        const pullB = { hipB: -128, knB: 128, anB: 10, hipF: -45, knF: 118, anF: 17, shB: -38, shF: -38, elB: -12, elF: -12, neck: -10 };
        const rest = { hipF: -45, knF: 118, anF: 17, hipB: -45, knB: 118, anB: 17, shB: 0, shF: 0, elB: 0, elF: 0, neck: 0 };
        R.setPose(tl, z, 0, base);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.puxa);
        R.slideIn(tl, "#f19-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f19-card", 0.2, 0.55, 400);
        R.pop(tl, "#f19-stop", 0.6, 0.4);
        [K.deitado, K.puxa, K.segura, K.vinte].forEach((t, i) => tl.fromTo(`#f19-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // puxa o joelho da frente e segura
        R.pose(tl, z, K.puxa, 0.7, pullF);
        R.face(tl, z, K.segura, { eyes: "closed", mouth: "flat" });
        R.pop(tl, "#f19-timer", K.segura, 0.35);
        // troca de perna
        R.pop(tl, "#f19-swap", K.troca - 0.1, 0.35);
        R.pose(tl, z, K.troca, 0.5, rest);
        R.pose(tl, z, K.troca + 0.55, 0.6, pullB);
        R.fadeOut(tl, "#f19-swap", K.vinte - 0.2);
        R.face(tl, z, K.vinte, { eyes: "closed", mouth: "smile" });
        tl.to("#f19-timer", { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.vinte);
        // mais uma troca no "três vezes de cada lado"
        R.pose(tl, z, K.tres + 0.2, 0.5, rest);
        R.pose(tl, z, K.tres + 0.75, 0.6, pullF);
        R.face(tl, z, K.lado + 0.3, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "pop", t: k.segura, vol: 0.35 },
        { name: "whoosh-short", t: k.troca, vol: 0.35 },
        { name: "pop", t: k.vinte, vol: 0.3 },
      ],
    };
  },
};
