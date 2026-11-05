// F24 — Exercício 6: levantar peso do jeito certo (replay da caixa LIVROS: errado × certo)
export default {
  speakers: { vertebra: "f24v" },
  gaps: [0.3],
  extra: 0.5,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      seis: w(0, "seis"), apr: w(0, "aprender"), pes: w(0, "Pés"), dobra: w(0, "dobra"), carga: w(0, "carga"), colada: w(0, "colada"),
      sobe: w(0, "sobe"), virar: w(0, "virar"), gira: w(0, "gira"), nao: w(0, "não"), tronco: w(0, "tronco"),
      v0: lines[1].start, v1: lines[1].end, faz: w(1, "faz"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "error", t: 0.9, vol: 0.25 },
      { name: "pop", t: k.pes, vol: 0.3 }, { name: "pop", t: k.dobra, vol: 0.3 }, { name: "pop", t: k.carga, vol: 0.3 },
      { name: "whoosh-short", t: k.sobe, vol: 0.35 },
      { name: "pop", t: k.gira, vol: 0.3 },
      { name: "sparkle", t: k.v0, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const box = (id, x, y) => `<g id="${id}"><g transform="translate(${x},${y})"><rect x="-70" y="-50" width="140" height="100" rx="10" fill="#C99A62" ${st}/><path d="M-70 -16 L70 -16" stroke="${C.ink}" stroke-width="5"/><text x="0" y="28" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">LIVROS</text></g></g>`;
    const step = (i, txt) => `<div id="f24-s${i}" class="abs card label f24-step" style="top:${150 + i * 64}px;opacity:0"><span>${i + 1}</span>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f24-h { left:110px; top:40px; font-size:60px; }
        #f24-h span { color:${C.good}; }
        #f24-bad { left:250px; top:180px; font-size:46px; color:#C9372A; }
        #f24-good { left:1010px; top:110px; font-size:46px; color:#1E9C72; }
        #root .f24-step { left:1440px; width:430px; padding:8px 14px; font-size:26px; display:flex; gap:10px; align-items:center; }
        #root .f24-step span { background:${C.good}; color:#fff; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex:none; border:4px solid ${C.ink}; }
        #f24-stop { left:1480px; top:520px; padding:8px 16px; font-size:24px; background:${C.pain}; color:#fff; }
        #f24-bal { left:820px; top:560px; padding:12px 22px; font-size:34px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <rect x="0" y="0" width="900" height="880" fill="#FBE3DF"/>
      <rect x="900" y="0" width="1020" height="880" fill="#DDF5EC"/>
      <line x1="900" y1="0" x2="900" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect y="860" width="1920" height="220" fill="#9AA3A8"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <!-- ERRADO -->
      <g transform="translate(400,640) scale(1.2)">${human("f24a", "ze")}</g>
      ${box("f24-boxa", 560, 810)}
      <g id="f24-twa" opacity="0"><path d="M300 430 Q410 380 520 430" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/><path d="M500 410 L524 432 L494 442" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g id="f24-xa" opacity="0"><path d="M640 220 L780 360 M780 220 L640 360" stroke="${C.pain}" stroke-width="22" stroke-linecap="round"/></g>
      <!-- CERTO -->
      <g transform="translate(1160,646) scale(1.2)">${human("f24b", "ze")}</g>
      ${box("f24-boxb", 1290, 810)}
      <g id="f24-feet" opacity="0"><path d="M1060 900 Q1160 950 1260 900" fill="none" stroke="#1E9C72" stroke-width="10" stroke-linecap="round"/><path d="M1240 884 L1264 902 L1236 916" fill="none" stroke="#1E9C72" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g id="f24-ok" opacity="0"><path d="M1290 250 L1330 300 L1410 200" fill="none" stroke="#1E9C72" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g id="f24-vw"><g transform="translate(760,860) scale(0.8)">${vertebra("f24v")}</g></g>
    </svg>
    <div id="f24-h" class="abs title">6. <span>LEVANTAR PESO</span></div>
    <div id="f24-bad" class="abs title" style="opacity:0">ERRADO</div>
    <div id="f24-good" class="abs title" style="opacity:0">CERTO</div>
    <div id="f24-stop" class="abs card label">Dor desceu mais pro pé? <b>PARE</b></div>
    ${step(0, "Pés afastados")}
    ${step(1, "Dobra quadril e joelhos")}
    ${step(2, "Carga colada no corpo")}
    ${step(3, "Sobe com as pernas")}
    ${step(4, "Gira com os pés, não com o tronco")}
    <div id="f24-bal" class="abs card label" style="opacity:0">É assim que se faz!</div>`,
      js: function (tl, K, R) {
        const a = "f24a", b = "f24b";
        // ERRADO: replay da curvada de pernas esticadas
        R.setPose(tl, a, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, a, 0, { eyes: "normal", mouth: "flat" });
        R.slideIn(tl, "#f24-h", 0.05, 0.5, -300);
        R.pop(tl, "#f24-bad", 0.3, 0.4);
        R.pose(tl, a, 0.4, 0.6, { torso: 82, neck: -30, shF: -10, elF: 0, shB: -10, elB: 0 });
        R.pop(tl, "#f24-twa", 1.0, 0.3);
        R.face(tl, a, 1.0, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f24-xa", 1.0, 0.4);
        // CERTO: em pé, depois agacha, pega, sobe, gira com os pés
        R.setPose(tl, b, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, b, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, b, 0, K.dur);
        R.pop(tl, "#f24-good", K.apr - 0.2, 0.4);
        R.pop(tl, "#f24-s0", K.pes - 0.1, 0.35);
        R.pop(tl, "#f24-s1", K.dobra - 0.1, 0.35);
        const squat = { root: 0, torso: 32, neck: -16, hipF: -72, hipB: -68, knF: 112, knB: 108, anF: -40, anB: -40, shF: -45, elF: -10, shB: -40, elB: -10 };
        R.pose(tl, b, K.dobra, 0.7, squat);
        R.move(tl, b, K.dobra, 0.7, 0, 80);
        R.pop(tl, "#f24-s2", K.carga - 0.1, 0.35);
        R.pose(tl, b, K.carga, 0.4, { shF: -70, elF: -70, shB: -66, elB: -70 });
        tl.to("#f24-boxb", { x: -50, y: -110, duration: 0.5, ease: "power2.inOut" }, K.colada);
        // sobe com as pernas
        R.pop(tl, "#f24-s3", K.sobe - 0.1, 0.35);
        R.pose(tl, b, K.sobe, 0.8, { torso: 4, neck: 0, hipF: 0, hipB: 0, knF: 0, knB: 0, anF: 0, anB: 0, shF: -60, elF: -80, shB: -56, elB: -80 });
        R.move(tl, b, K.sobe, 0.8, 0, 0);
        tl.to("#f24-boxb", { y: -280, duration: 0.8, ease: "power2.inOut" }, K.sobe);
        R.face(tl, b, K.sobe + 0.6, { eyes: "happy", mouth: "grin" });
        // gira com os pés (passinhos), não com o tronco
        R.pop(tl, "#f24-s4", K.virar - 0.1, 0.35);
        R.pop(tl, "#f24-feet", K.gira - 0.1, 0.35);
        for (let i = 0; i < 3; i++) {
          const t = K.gira + i * 0.35;
          R.pose(tl, b, t, 0.17, { hipF: -20, knF: 30 }, "sine.inOut");
          R.pose(tl, b, t + 0.17, 0.17, { hipF: 0, knF: 0 }, "sine.inOut");
        }
        R.shake(tl, "#f24-twa", K.nao, 0.3, 5);
        R.pop(tl, "#f24-ok", K.tronco, 0.4);
        // Vértebra aprova
        tl.set("#f24-vw", { opacity: 0 }, 0);
        tl.fromTo("#f24-vw", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.v0 - 0.4);
        R.face(tl, "f24v", K.v0 - 0.4, { eyes: "happy" });
        R.pose(tl, "f24v", K.v0, 0.3, { armF: -150, armB: 30 }, "back.out(2)");
        R.pop(tl, "#f24-bal", K.v0 + 0.2, 0.4);
        R.squash(tl, "#f24v-root", K.faz);
      },
    };
  },
};
