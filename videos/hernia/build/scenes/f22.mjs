// F22 — Exercício 4: perdigueiro (bird-dog) com um copo d'água nas costas
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      apoios: w(0, "apoios"), estica: w(0, "estica"), girar: w(0, "girar"), copo: w(0, "tronco"), segura: w(0, "segurando"), oito: w(0, "Oito"),
      end: lines[0].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.copo, vol: 0.45 },
      { name: "pop", t: k.oito, vol: 0.35 },
      { name: "pop", t: k.segura, vol: 0.3 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f22-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:90px; font-size:84px; }
        #f22-head span { color:${C.good}; }
        #f22-card { left:1300px; top:150px; width:500px; padding:28px 34px; }
        #f22-card .t { font-size:46px; }
        #f22-card .row { font-size:34px; margin-top:14px; display:flex; align-items:center; gap:14px; }
        #f22-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f22-stop { left:1400px; top:700px; width:420px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f22-stop b { font-size:40px; display:block; }
        #f22-timer { left:1040px; top:250px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:46px; display:flex; align-items:center; justify-content:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="716" width="800" height="36" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f22-zwrap"><g transform="translate(700,566) scale(1.5)">${human("f22z", "ze")}</g></g>
      <g id="f22-glass" opacity="0" transform="translate(792,500)">
        <path d="M-26 -70 L26 -70 L20 0 L-20 0 Z" fill="#E6F6FB" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path id="f22-water" d="M-23 -44 L23 -44 L20 -4 L-20 -4 Z" fill="#7CC7EA"/>
        <path d="M-26 -70 L26 -70 L20 0 L-20 0 Z" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
      </g>
      <g id="f22-drops" opacity="0" transform="translate(792,500)"><circle cx="-40" cy="-80" r="9" fill="#7CC7EA" stroke="${C.ink}" stroke-width="4"/><circle cx="38" cy="-92" r="7" fill="#7CC7EA" stroke="${C.ink}" stroke-width="4"/></g>
    </svg>
    <div id="f22-head" class="abs title">4. <span>PERDIGUEIRO</span></div>
    <div id="f22-timer" class="abs title" style="opacity:0">3–5 s</div>
    <div id="f22-card" class="abs card">
      <div class="t title">Perdigueiro</div>
      ${row(0, "De quatro apoios")}
      ${row(1, "Braço + perna oposta")}
      ${row(2, "Tronco sem girar")}
      ${row(3, "Segura 3 a 5 s")}
      ${row(4, "<b>3 x 8 de cada lado</b>", C.sun)}
    </div>
    <div id="f22-stop" class="abs card label">Dor desceu mais pro pé?<b>PARE</b></div>`,
      js: function (tl, K, R) {
        const z = "f22z";
        const base = { root: 90, torso: -15, neck: -25, shB: -75, shF: -75, elB: 0, elF: 0, hipB: -90, hipF: -90, knB: 90, knF: 90, anB: 90, anF: 90 };
        const ext = { shF: -148, elF: 0, hipB: 0, knB: 0, anB: 90 };
        const back = { shF: -75, elF: 0, hipB: -90, knB: 90, anB: 90 };
        R.setPose(tl, z, 0, base);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f22-card", 0.2, 0.55, 400);
        R.pop(tl, "#f22-stop", 0.6, 0.4);
        [K.apoios, K.estica, K.girar, K.segura, K.oito].forEach((t, i) => tl.fromTo(`#f22-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // rep 1: estica braço + perna oposta
        R.pose(tl, z, K.estica, 0.6, ext, "power2.out");
        R.face(tl, z, K.estica, { mouth: "flat" });
        // copo nas costas
        R.pop(tl, "#f22-glass", K.copo - 0.1, 0.45);
        // segura
        R.pop(tl, "#f22-timer", K.segura, 0.35);
        R.fadeOut(tl, "#f22-timer", K.oito + 0.6);
        // rep 1 volta, rep 2 do outro lado (oito de cada lado)
        R.pose(tl, z, K.oito - 0.3, 0.5, back);
        R.pose(tl, z, K.oito + 0.4, 0.6, ext, "power2.out");
        R.face(tl, z, K.oito + 0.4, { mouth: "flat" });
        // copo balança um pouquinho, sem derramar
        R.pose(tl, z, K.oito + 1.1, 0.25, { root: 91.5 }, "sine.inOut");
        R.pose(tl, z, K.oito + 1.35, 0.25, { root: 89 }, "sine.inOut");
        R.pose(tl, z, K.oito + 1.6, 0.25, { root: 90 }, "sine.inOut");
        R.pose(tl, z, K.end + 0.1, 0.5, back);
        R.face(tl, z, K.end + 0.1, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
