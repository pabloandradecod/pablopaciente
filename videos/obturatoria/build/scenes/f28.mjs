// F28 — Resumo: 3 ideias (túnel da pelve, fecha-perna, volta gradual) + Seu Zé faz um gol; Turão e Adutores comemoram
export default {
  extra: 1.8,
  build(ctx) {
    const { C, human, turao, adutores, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), tur: w(0, "Turão"), fecha: w(0, "fecha"), tun: w(0, "túnel"), inv: w(0, "Investiga"), trata: w(0, "trata"),
      volta: w(0, "volta"), pel: w(0, "pelada"), certo: w(0, "certo"), end: lines[0].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.tur, vol: 0.4 }, { name: "pop", t: k.tun, vol: 0.4 }, { name: "pop", t: k.volta, vol: 0.4 },
      { name: "whoosh-short", t: k.pel + 0.2, vol: 0.45 },
      { name: "impact-bass-1", t: k.pel + 0.85, vol: 0.4 },
      { name: "sparkle", t: k.certo, vol: 0.45 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const row = (i, label, svg, color) => `<div id="f28-r${i}" class="abs card f28-row" style="top:${150 + i * 190}px;opacity:0">
      <svg width="120" height="120" viewBox="-60 -60 120 120" style="flex:none"><circle r="54" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
      <div class="label" style="font-size:33px;line-height:1.15">${label}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f28-h { left:110px; top:60px; font-size:60px; color:${C.pain}; }
        #root .f28-row { left:1180px; width:640px; padding:12px 22px; display:flex; align-items:center; gap:22px; }
        #f28-gol { left:560px; top:170px; font-size:110px; color:${C.sun}; -webkit-text-stroke: 4px ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="560" fill="${C.sky}"/>
      <rect x="0" y="560" width="1920" height="520" fill="#6CC56F"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 340}" y="560" width="170" height="520" fill="#5DB560"/>`).join("")}
      <line x1="0" y1="560" x2="1920" y2="560" stroke="${C.ink}" stroke-width="6"/>
      <rect x="1120" y="0" width="800" height="1080" fill="${C.cream}" opacity="0.92"/>
      <!-- gol -->
      <g><rect x="780" y="440" width="260" height="300" fill="none" stroke="#fff" stroke-width="16"/>
        <g stroke="#fff" stroke-width="3" opacity="0.7">${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${800 + i * 42}" y1="440" x2="${800 + i * 42}" y2="740"/>`).join("")}${[0, 1, 2, 3, 4, 5, 6].map((i) => `<line x1="780" y1="${460 + i * 40}" x2="1040" y2="${460 + i * 40}"/>`).join("")}</g></g>
      <g id="f28-net" opacity="0"><path d="M800 450 Q900 520 1020 450" fill="none" stroke="#fff" stroke-width="8"/></g>
      <g transform="translate(330,650) scale(1.3)">${human("f28z", "ze")}</g>
      <g id="f28-ball"><g transform="translate(470,860)"><g id="f28-ball-in"><circle r="30" fill="#fff" ${st}/><path d="M0 -12 L12 -4 L7 10 L-7 10 L-12 -4 Z" fill="${C.ink}"/></g></g></g>
      <g id="f28-tw" opacity="0">${turao("f28t", [[1200, 830], [1290, 830], [1380, 826], [1460, 830], [1540, 830]], 20, 1.0)}</g>
      <g id="f28-aw" opacity="0"><g transform="translate(1690,870) scale(0.4)">${adutores("f28a")}</g></g>
    </svg>
    <div id="f28-h" class="abs title">RESUMINDO</div>
    <div id="f28-gol" class="abs title" style="opacity:0">GOL!</div>
    ${row(0, "O Turão comanda o <b>fecha-perna</b>", `<circle cx="-18" cy="6" r="18" fill="#fff" ${st}/><path d="M-40 -30 L-6 -6 M40 -30 L6 -6" ${st}/><circle cx="18" cy="6" r="18" fill="#fff" ${st}/>`, "#E0F7EE")}
    ${row(1, "Pode se apertar num <b>túnel da pelve</b>", `<path d="M-30 30 L-30 -14 Q-30 -34 0 -34 Q30 -34 30 -14 L30 30 Z" fill="#C9B48E" ${st}/><path d="M-40 6 L40 6" stroke="#4FD1A5" stroke-width="12" stroke-linecap="round"/>`, "#FFF3D6")}
    ${row(2, "Investiga bem, trata com calma e <b>volta no tempo certo</b>", `<path d="M-40 30 L-40 14 L-14 14 L-14 -4 L12 -4 L12 -22 L40 -22 L40 30 Z" fill="${C.good}" ${st}/>`, C.sky)}`,
      js: function (tl, K, R) {
        const z = "f28z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f28-h", 0.05, 0.5, -300);
        R.slideIn(tl, "#f28-r0", K.tur - 0.1, 0.45, 300);
        R.fadeIn(tl, "#f28-tw", K.tur, 0.3);
        R.face(tl, "f28t", K.tur, { eyes: "happy", mouth: "smile" });
        R.slideIn(tl, "#f28-r1", K.tun - 0.1, 0.45, 300);
        R.slideIn(tl, "#f28-r2", K.inv - 0.1, 0.45, 300);
        // o chute do gol
        R.face(tl, z, K.volta, { eyes: "normal", mouth: "flat" });
        R.pose(tl, z, K.pel - 0.3, 0.3, { hipF: 35, knF: 60, shF: -60, shB: 40, torso: -6 }, "power2.out");
        R.pose(tl, z, K.pel + 0.05, 0.18, { hipF: -85, knF: 0, shF: 30, shB: -60, torso: 8 }, "power4.out");
        tl.to("#f28-ball", { x: 430, y: -260, duration: 0.7, ease: "power1.out" }, K.pel + 0.2);
        tl.to("#f28-ball-in", { rotation: -720, svgOrigin: "0 0", duration: 0.7, ease: "power1.out" }, K.pel + 0.2);
        R.pop(tl, "#f28-net", K.pel + 0.85, 0.2);
        tl.fromTo("#f28-gol", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.5)" }, K.pel + 0.85);
        R.pose(tl, z, K.pel + 1.0, 0.35, { hipF: 0, knF: 0, torso: 0, shF: -160, shB: 160, elF: -10, elB: 10 }, "back.out(2)");
        R.face(tl, z, K.pel + 1.0, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f28z-root", { y: 0 }, { y: -40, duration: 0.2, yoyo: true, repeat: 5, ease: "power2.out" }, K.pel + 1.1);
        // Adutores e Turão comemoram
        tl.fromTo("#f28-aw", { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.certo - 0.3);
        ["m0", "m1", "m2"].forEach((m, i) => {
          R.face(tl, `f28a-${m}`, 0, { mouth: "grin" });
          R.pose(tl, `f28a-${m}`, K.certo + i * 0.08, 0.3, { armF: -160, armB: 160 }, "back.out(2)");
          tl.fromTo(`#f28a-${m}-body`, { y: 0 }, { y: -20, duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.certo + i * 0.08);
        });
        tl.fromTo("#f28t-face", { rotation: -12 }, { rotation: 12, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.certo);
        R.face(tl, "f28t", K.certo, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
