// F24 — Exercício 6: perdigueiro (bird-dog) com o copo d'água nas costas
export default {
  speakers: { vertebra: "f24v" },
  extra: 0.4,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      seis: w(0, "Seis"), perd: w(0, "perdigueiro"), estab: w(0, "estabilidade"), estica: w(0, "Estica"), girar: w(0, "girar"), oito: w(0, "Oito"),
      v0: lines[1].start, v1: lines[1].end, derr: w(1, "voltou"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.girar, vol: 0.45 },
      { name: "pop", t: k.oito, vol: 0.35 },
      { name: "whoosh-short", t: k.v0 - 0.4, vol: 0.4 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f24-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f24-head { left:110px; top:90px; font-size:84px; }
        #f24-head span { color:${C.good}; }
        #f24-card { left:1300px; top:150px; width:500px; padding:28px 34px; }
        #f24-card .t { font-size:46px; }
        #f24-card .row { font-size:34px; margin-top:14px; display:flex; align-items:center; gap:14px; }
        #f24-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f24-stop { left:1400px; top:700px; width:420px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f24-stop b { font-size:34px; display:block; }
        #f24-timer { left:1040px; top:250px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:46px; display:flex; align-items:center; justify-content:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="716" width="800" height="36" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f24-zwrap"><g transform="translate(700,566) scale(1.5)">${human("f24z", "ze")}</g></g>
      <g id="f24-glass" opacity="0" transform="translate(792,500)">
        <path d="M-26 -70 L26 -70 L20 0 L-20 0 Z" fill="#E6F6FB" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path id="f24-water" d="M-23 -44 L23 -44 L20 -4 L-20 -4 Z" fill="#7CC7EA"/>
        <path d="M-26 -70 L26 -70 L20 0 L-20 0 Z" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
      </g>
      <g id="f24-drops" opacity="0" transform="translate(792,500)"><circle cx="-40" cy="-80" r="9" fill="#7CC7EA" stroke="${C.ink}" stroke-width="4"/><circle cx="38" cy="-92" r="7" fill="#7CC7EA" stroke="${C.ink}" stroke-width="4"/></g>
      <g id="f24-vwrap"><g transform="translate(200,742) scale(0.85)">${vertebra("f24v")}</g></g>
    </svg>
    <div id="f24-head" class="abs title">6. <span>PERDIGUEIRO</span></div>
    <div id="f24-card" class="abs card">
      <div class="t title">Perdigueiro</div>
      ${row(0, "De quatro apoios")}
      ${row(1, "Estabilidade do tronco")}
      ${row(2, "Braço + perna oposta")}
      ${row(3, "Sem girar o corpo")}
      ${row(4, "<b>8 de cada lado</b>", C.sun)}
    </div>
    <div id="f24-stop" class="abs card label">Formigou mais forte?<b>Diminui a amplitude</b></div>`,
      js: function (tl, K, R) {
        const z = "f24z";
        const base = { root: 90, torso: -15, neck: -25, shB: -75, shF: -75, elB: 0, elF: 0, hipB: -90, hipF: -90, knB: 90, knF: 90, anB: 90, anF: 90 };
        const ext = { shF: -148, elF: 0, hipB: 0, knB: 0, anB: 90 };
        const back = { shF: -75, elF: 0, hipB: -90, knB: 90, anB: 90 };
        R.setPose(tl, z, 0, base);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.v0 - 0.3);
        R.slideIn(tl, "#f24-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f24-card", 0.2, 0.55, 400);
        R.pop(tl, "#f24-stop", 0.6, 0.4);
        tl.set("#f24-vwrap", { opacity: 0 }, 0);
        [K.perd, K.estab, K.estica, K.girar, K.oito].forEach((t, i) => tl.fromTo(`#f24-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // rep 1: estica braço + perna oposta
        R.pose(tl, z, K.estica, 0.6, ext, "power2.out");
        R.face(tl, z, K.estica, { mouth: "flat" });
        // copo nas costas: "sem girar o corpo"
        R.pop(tl, "#f24-glass", K.girar - 0.1, 0.45);
        R.pose(tl, z, K.oito - 0.2, 0.5, back);
        R.face(tl, z, K.oito - 0.2, { mouth: "smile" });
        // rep 2 durante a fala da Vértebra: o copo balança
        R.pose(tl, z, K.v0 - 0.2, 0.5, ext, "power2.out");
        tl.fromTo("#f24-vwrap", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.v0 - 0.5);
        R.pose(tl, "f24v", K.v0, 0.3, { armF: -140, armB: 20 }, "back.out(2)");
        R.face(tl, "f24v", K.derr, { eyes: "wide" });
        R.face(tl, z, K.derr, { eyes: "wide", mouth: "flat" });
        R.pose(tl, z, K.derr, 0.2, { root: 92 }, "sine.inOut");
        R.pose(tl, z, K.derr + 0.2, 0.25, { root: 88.5 }, "sine.inOut");
        R.pose(tl, z, K.derr + 0.45, 0.25, { root: 90 }, "sine.inOut");
        tl.fromTo("#f24-drops", { opacity: 0, y: 10 }, { opacity: 1, y: -20, duration: 0.3, ease: "power2.out" }, K.derr + 0.15);
        tl.to("#f24-drops", { opacity: 0, y: 10, duration: 0.3 }, K.derr + 0.55);
        R.face(tl, z, K.v1, { eyes: "happy", mouth: "smile" });
        R.face(tl, "f24v", K.v1, { eyes: "happy" });
      },
    };
  },
};
