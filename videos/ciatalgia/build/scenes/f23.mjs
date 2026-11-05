// F23 — Exercício 6: alongamento do piriforme (posição de "4")
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, nerve, w } = ctx;
    const k = {
      seis: w(0, "Seis"), deitado: w(0, "Deitado"), cruza: w(0, "cruza"), quatro: w(0, "quatro"), puxa: w(0, "puxa"),
      trinta: w(0, "Trinta"), tres: w(0, "três"), bom: w(0, "Bom"), nadega: w(0, "nádega"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.quatro, vol: 0.4 },
      { name: "pop", t: k.trinta, vol: 0.35 },
      { name: "sparkle", t: k.puxa + 0.5, vol: 0.35 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f23-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    const nPts = [[1020, 300], [1060, 300], [1105, 300], [1150, 300], [1195, 300]];
    return {
      k,
      sfx,
      css: `
        #f23-head { left:110px; top:90px; font-size:84px; }
        #f23-head span { color:${C.good}; }
        #f23-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f23-card .t { font-size:44px; }
        #f23-card .row { font-size:32px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f23-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f23-stop { left:1400px; top:700px; width:420px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f23-stop b { font-size:40px; display:block; }
        #f23-four { left:640px; top:250px; font-size:110px; color:${C.pain}; }
        #f23-timer { left:560px; top:250px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f23-inl { left:995px; top:450px; width:230px; text-align:center; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(820,622) scale(1.5)">${human("f23z", "ze")}</g>
      <!-- detalhe: o piriforme abraçando o nervo -->
      <g id="f23-inset" opacity="0">
        <clipPath id="f23-clip"><circle cx="1110" cy="300" r="125"/></clipPath>
        <circle cx="1110" cy="300" r="135" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
        <g clip-path="url(#f23-clip)">
          <rect x="975" y="170" width="270" height="260" fill="#FFE4DC"/>
          ${nerve("f23n", nPts, 24, 0.75)}
          <g id="f23-musc"><path d="M1075 230 Q1110 215 1145 230 L1155 370 Q1110 385 1065 370 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="7" opacity="0.92"/>
          <path d="M1085 260 L1135 255 M1081 300 L1139 298 M1083 340 L1137 342" stroke="#fff" stroke-width="4" opacity="0.5"/></g>
        </g>
      </g>
    </svg>
    <div id="f23-inl" class="abs label" style="opacity:0">piriforme</div>
    <div id="f23-head" class="abs title">6. <span>PIRIFORME</span></div>
    <div id="f23-four" class="abs title" style="opacity:0">4</div>
    <div id="f23-timer" class="abs title" style="opacity:0">30 s</div>
    <div id="f23-card" class="abs card">
      <div class="t title">Alongamento do piriforme</div>
      ${row(0, "Deitado")}
      ${row(1, "Tornozelo sobre o joelho")}
      ${row(2, "Puxa a coxa pro peito")}
      ${row(3, "<b>3 x 30 s</b>", C.sun)}
      ${row(4, "Bom se dói mais na nádega", C.sky)}
    </div>
    <div id="f23-stop" class="abs card label">Piorou ou desceu pro pé?<b>PARE</b></div>`,
      js: function (tl, K, R) {
        const z = "f23z";
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.puxa);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f23-card", 0.2, 0.55, 400);
        R.pop(tl, "#f23-stop", 0.6, 0.4);
        [K.deitado, K.cruza, K.puxa, K.trinta, K.bom].forEach((t, i) => tl.fromTo(`#f23-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // cruza o tornozelo sobre o joelho
        R.pose(tl, z, K.cruza, 0.6, { hipF: -70, knF: 70, anF: 0 }, "back.out(1.4)");
        R.pop(tl, "#f23-four", K.quatro, 0.4);
        R.fadeOut(tl, "#f23-four", K.puxa - 0.1);
        // puxa a coxa pro peito (as duas pernas juntas), mãos na coxa
        const pull = { hipB: -95, knB: 118, anB: 17, hipF: -120, knF: 70, anF: 0, shB: -33, shF: -33, elB: -5, elF: -5 };
        R.pose(tl, z, K.puxa, 0.7, pull);
        R.face(tl, z, K.puxa + 0.3, { eyes: "closed", mouth: "flat" });
        // o piriforme solta o "abraço"
        R.pop(tl, "#f23-inset", K.cruza + 0.2, 0.45);
        R.fadeIn(tl, "#f23-inl", K.cruza + 0.4);
        R.face(tl, "f23n", K.cruza + 0.2, { eyes: "pain", mouth: "frown" });
        tl.to("#f23-musc", { scaleX: 0.78, transformOrigin: "50% 50%", duration: 0.8, ease: "power2.inOut" }, K.puxa + 0.4);
        tl.to("#f23-musc path:first-child", { attr: { fill: "#FF9C8F" }, duration: 0.8 }, K.puxa + 0.4);
        R.face(tl, "f23n", K.puxa + 0.9, { eyes: "happy", mouth: "smile" });
        // segura 30 s, 3 vezes
        R.pop(tl, "#f23-timer", K.trinta, 0.35);
        R.fadeOut(tl, "#f23-timer", K.bom - 0.1);
        R.face(tl, z, K.bom, { eyes: "happy", mouth: "smile" });
        // volta e repete
        R.pose(tl, z, K.nadega + 0.4, 0.6, { hipB: -45, hipF: -70, shB: 0, shF: 0, elB: 0, elF: 0 });
      },
    };
  },
};
