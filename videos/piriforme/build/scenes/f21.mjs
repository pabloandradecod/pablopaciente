// F21 — Exercício 2: joelho ao ombro oposto (deitado, puxa o joelho na diagonal)
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      dois: w(0, "Dois"), joelho: w(0, "joelho"), ombro: w(0, "ombro"), deitado: w(0, "Deitado"), puxa: w(0, "puxa"),
      diag: w(0, "diagonal"), outro: w(0, "outro"), trinta: w(0, "Trinta"), tres: w(0, "três"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.puxa + 0.2, vol: 0.35 },
      { name: "whoosh-short", t: k.diag, vol: 0.35 },
      { name: "pop", t: k.trinta, vol: 0.35 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f21-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f21-head { left:110px; top:90px; font-size:62px; }
        #f21-head span { color:${C.good}; }
        #f21-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f21-card .t { font-size:42px; }
        #f21-card .row { font-size:32px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f21-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f21-stop { left:1360px; top:700px; width:460px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f21-stop b { font-size:40px; display:block; }
        #f21-timer { left:590px; top:250px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f21-topl { left:930px; top:125px; width:330px; text-align:center; font-size:26px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(820,622) scale(1.5)">${human("f21z", "ze")}</g>
      <!-- visto de cima: joelho vai para o ombro do outro lado -->
      <g id="f21-top" opacity="0">
        <rect x="930" y="160" width="330" height="330" rx="26" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <g transform="translate(1095,340)">
          <circle cx="0" cy="-118" r="26" fill="${C.skinB}" ${st}/>
          <rect x="-50" y="-92" width="100" height="120" rx="30" fill="${C.blue}" ${st}/>
          <circle cx="-50" cy="-80" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/>
          <path d="M-22 28 L-22 120" stroke="${C.brown}" stroke-width="26" stroke-linecap="round"/>
          <path d="M-22 28 L-22 120" fill="none" ${st} stroke-width="5" opacity="0.35"/>
          <g id="f21-tleg"><path d="M22 28 L22 120" stroke="${C.brown}" stroke-width="26" stroke-linecap="round"/><circle cx="22" cy="74" r="14" fill="${C.brown}" stroke="${C.ink}" stroke-width="5"/></g>
          <path id="f21-tarrow" d="M30 66 Q10 -20 -40 -66" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-dasharray="14 10"/>
          <path d="M-52 -50 L-42 -70 L-22 -64" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" id="f21-thead"/>
        </g>
      </g>
    </svg>
    <div id="f21-topl" class="abs label" style="opacity:0">visto de cima</div>
    <div id="f21-head" class="abs title">2. <span>JOELHO AO OMBRO</span></div>
    <div id="f21-timer" class="abs title" style="opacity:0">30 s</div>
    <div id="f21-card" class="abs card">
      <div class="t title">Joelho ao ombro oposto</div>
      ${row(0, "Deitado de barriga pra cima")}
      ${row(1, "Puxa o joelho na diagonal")}
      ${row(2, "Rumo ao ombro do outro lado")}
      ${row(3, "<b>30 s · 3 vezes</b>", C.sun)}
    </div>
    <div id="f21-stop" class="abs card label">Dor forte ou formigando mais?<b>PARE</b></div>`,
      js: function (tl, K, R) {
        const z = "f21z";
        const base = { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 };
        R.setPose(tl, z, 0, base);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.puxa);
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f21-card", 0.2, 0.55, 400);
        R.pop(tl, "#f21-stop", 0.6, 0.4);
        [K.deitado, K.puxa, K.outro, K.trinta].forEach((t, i) => tl.fromTo(`#f21-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // puxa o joelho com as duas mãos
        const pull = { hipF: -128, knF: 128, anF: 10, shB: -38, shF: -38, elB: -12, elF: -12, neck: -10 };
        R.pose(tl, z, K.puxa, 0.7, pull);
        R.face(tl, z, K.puxa + 0.3, { eyes: "closed", mouth: "flat" });
        // vista de cima mostra a diagonal
        R.pop(tl, "#f21-top", K.joelho, 0.45);
        R.fadeIn(tl, "#f21-topl", K.joelho + 0.2);
        R.draw(tl, "#f21-tarrow", K.diag - 0.1, 0.6);
        R.fadeIn(tl, "#f21-thead", K.diag + 0.4, 0.2);
        tl.to("#f21-tleg", { rotation: 38, svgOrigin: "22 28", duration: 0.7, ease: "power2.inOut" }, K.diag);
        tl.to("#f21-tleg", { rotation: 30, svgOrigin: "22 28", duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 3 }, K.diag + 0.8);
        // segura 30 s
        R.pop(tl, "#f21-timer", K.trinta, 0.35);
        R.face(tl, z, K.tres, { eyes: "happy", mouth: "smile" });
        // solta e repete
        R.pose(tl, z, K.tres + 0.8, 0.6, { hipF: -45, knF: 118, anF: 17, shB: 0, shF: 0, elB: 0, elF: 0, neck: 0 });
        R.pose(tl, z, K.tres + 1.6, 0.6, pull);
      },
    };
  },
};
