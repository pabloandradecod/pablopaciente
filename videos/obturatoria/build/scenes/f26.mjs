// F26 — Vai melhorar? Dois caminhos: depois de cirurgia/parto (recupera com o tempo) × atleta (conservador primeiro); Turão acalma, Adutores dançam
export default {
  extra: 1.2,
  build(ctx) {
    const { C, turao, adutores, nerve, MINT, w } = ctx;
    const k = {
      boa: w(0, "boa"), cir: w(0, "cirurgia"), parto: w(0, "parto"), maioria: w(0, "maioria"), tempo: w(0, "tempo"), sem: w(0, "semanas"), meses: w(0, "meses"),
      atl: w(0, "atleta"), cons: w(0, "conservador"), aj: w(0, "ajustar"), ex: w(0, "exercícios"), ter: w(0, "terapia"),
      mint: MINT, shine: "#DFFFF2",
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "pop", t: k.cir - 0.1, vol: 0.4 },
      { name: "riser", t: k.tempo, vol: 0.2, dur: 1.6 },
      { name: "pop", t: k.atl - 0.1, vol: 0.4 },
      { name: "pop", t: k.aj, vol: 0.3 }, { name: "pop", t: k.ex, vol: 0.3 }, { name: "pop", t: k.ter, vol: 0.3 },
      { name: "sparkle", t: k.ter + 0.6, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const pts = [[1160, 700], [1260, 700], [1360, 706], [1460, 712], [1560, 706], [1660, 700], [1760, 700]];
    const chip = (i, t) => `<div id="f26-c${i}" class="abs card label f26-chip" style="opacity:0">${t}</div>`;
    return {
      k,
      sfx,
      css: `
        #f26-h { left:110px; top:60px; font-size:72px; }
        #f26-h span { color:${C.good}; }
        #root .f26-path { width:500px; padding:22px 26px; }
        #root .f26-path .t { font-size:34px; line-height:1.1; }
        #root .f26-path .s { font-size:27px; margin-top:10px; line-height:1.2; }
        #f26-pA { left:110px; top:190px; }
        #f26-pB { left:110px; top:520px; }
        #f26-pA .t span { color:${C.pain}; } #f26-pB .t span { color:#2E9E78; }
        #f26-wk { left:640px; top:410px; font-size:30px; }
        #f26-wk b { color:${C.good}; }
        #root .f26-chip { padding:8px 18px; font-size:28px; }
        #f26-c0 { left:640px; top:600px; } #f26-c1 { left:640px; top:680px; } #f26-c2 { left:640px; top:760px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1460" cy="500" r="330" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- barra de tempo do caminho A -->
      <rect x="640" y="330" width="500" height="60" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
      <rect id="f26-fill" x="650" y="340" width="0" height="40" rx="20" fill="${C.good}"/>
      <g id="f26-nw">${nerve("f26n", pts, 26, 1.3, C.pain, "#FFC2BC")}</g>
      <g id="f26-band" opacity="0"><g transform="translate(1160,700) scale(1.3)"><path d="M-36 -22 Q0 -40 36 -22 L34 -12 Q0 -28 -34 -12 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/></g></g>
      <g id="f26-aw" opacity="0"><g transform="translate(1460,600) scale(0.75)">${adutores("f26a")}</g></g>
    </svg>
    <div id="f26-h" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f26-pA" class="abs card f26-path" style="opacity:0"><div class="t title">Depois de <span>cirurgia ou parto</span></div><div class="s label">A maioria recupera com o tempo</div></div>
    <div id="f26-wk" class="abs title" style="opacity:0">em <b>semanas a alguns meses</b></div>
    <div id="f26-pB" class="abs card f26-path" style="opacity:0"><div class="t title">No <span>atleta</span></div><div class="s label">Tratamento conservador primeiro</div></div>
    ${chip(0, "Ajustar o treino")}${chip(1, "Exercícios")}${chip(2, "Terapia manual")}`,
      js: function (tl, K, R) {
        const n = "f26n";
        R.slideIn(tl, "#f26-h", 0.05, 0.5, -300);
        R.face(tl, n, 0, { eyes: "pain", mouth: "frown" });
        R.shake(tl, "#f26n-face", 0.3, 0.6, 3);
        tl.set("#f26-band", { opacity: 1 }, 0);
        ["m0", "m1", "m2"].forEach((m) => R.face(tl, `f26a-${m}`, 0, { eyes: "normal", mouth: "flat" }));
        // caminho A: cirurgia/parto → recupera com o tempo
        R.slideIn(tl, "#f26-pA", K.cir - 0.15, 0.45, -400);
        tl.to("#f26-fill", { attr: { width: 480 }, duration: 2.0, ease: "power2.inOut" }, K.tempo);
        R.pop(tl, "#f26-wk", K.sem - 0.1, 0.45);
        // o Turão vai acalmando e fica verde-menta
        tl.to(`#${n}-fill, #${n}-face > circle`, { attr: { stroke: K.mint }, duration: 1.4, ease: "power1.inOut" }, K.sem);
        tl.to(`#${n}-face > circle`, { attr: { fill: K.mint }, duration: 1.4, ease: "power1.inOut" }, K.sem);
        tl.to(`#${n}-shine`, { attr: { stroke: K.shine }, duration: 1.4 }, K.sem);
        R.face(tl, n, K.meses + 0.3, { eyes: "happy", mouth: "smile" });
        // caminho B: atleta → conservador
        R.slideIn(tl, "#f26-pB", K.atl - 0.15, 0.45, -400);
        R.pop(tl, "#f26-c0", K.aj - 0.1, 0.4);
        R.pop(tl, "#f26-c1", K.ex - 0.1, 0.4);
        R.pop(tl, "#f26-c2", K.ter - 0.1, 0.4);
        // Adutores dançam no final
        tl.fromTo("#f26-aw", { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.cons - 0.2);
        ["m0", "m1", "m2"].forEach((m, i) => {
          R.face(tl, `f26a-${m}`, K.cons, { mouth: "grin" });
          tl.fromTo(`#f26a-${m}-body`, { y: 0 }, { y: -18, duration: 0.2, yoyo: true, repeat: 9, ease: "sine.inOut" }, K.cons + 0.2 + i * 0.1);
          R.pose(tl, `f26a-${m}`, K.cons + 0.2 + i * 0.1, 0.3, { armF: i % 2 ? -160 : -40, armB: i % 2 ? 40 : 160 }, "back.out(2)");
          R.pose(tl, `f26a-${m}`, K.cons + 1.2 + i * 0.1, 0.3, { armF: i % 2 ? -40 : -160, armB: i % 2 ? 160 : 40 }, "back.out(2)");
          R.pose(tl, `f26a-${m}`, K.cons + 2.2 + i * 0.1, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        });
        R.face(tl, n, K.ter + 0.4, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
