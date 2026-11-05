// F26 — Resumo: Juninho corta e marca ponto; Seu Zé e Vértebra comemoram; Molão e Patelito batem as mãos; 3 cartões
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, vertebra, molao, patelito, w } = ctx;
    const k = {
      res: w(0, "Resumindo"), sob: w(0, "sobrecarregado"), infl: w(0, "inflamado"), rep: w(0, "repouso"), carga: w(0, "carga"),
      esc: w(0, "escada"), pac: w(0, "paciência"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<path d="M0 34 L-22 24 L22 12 L-22 0 L22 -12 L-22 -24 L0 -34" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M0 34 L-22 24 L22 12 L-22 0 L22 -12 L-22 -24 L0 -34" fill="none" stroke="${C.bone}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M0 -36 L0 30 M-34 -24 L34 -24" ${st}/><path d="M-34 -24 L-48 6 L-20 6 Z M34 -24 L20 6 L48 6 Z" fill="${C.sun}" ${st}/><rect x="-20" y="28" width="40" height="10" rx="4" fill="${C.ink}"/>`,
      `<path d="M-40 34 L-40 14 L-14 14 L-14 -6 L12 -6 L12 -26 L40 -26 L40 34 Z" fill="${C.good}" ${st}/>`,
    ];
    const labs = [["Tendão", "sobrecarregado, não inflamado"], ["Carga certa", "repouso total não resolve"], ["Escada da carga", "subir com paciência"]];
    const card = (i) => `<div id="f26-c${i}" class="abs card f26-card" style="left:1250px;top:${110 + i * 165}px;opacity:0">
        <svg width="100" height="100" viewBox="-50 -50 100 100"><circle r="46" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>${icons[i]}</svg>
        <div class="label f26-t">${labs[i][0]}<br><span>${labs[i][1]}</span></div></div>`;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.res + 0.2, vol: 0.35 },
      { name: "impact-bass-1", t: k.res + 1.0, vol: 0.4 },
      { name: "pop", t: k.sob, vol: 0.35 },
      { name: "pop", t: k.rep, vol: 0.35 },
      { name: "pop", t: k.esc, vol: 0.35 },
      { name: "click", t: k.pac + 0.35, vol: 0.5 },
      { name: "sparkle", t: k.pac + 0.4, vol: 0.4 },
    ];
    return {
      k,
      sfx,
      css: `
        #f26-head { left:110px; top:60px; font-size:64px; color:${C.pain}; }
        #root .f26-card { width:600px; height:140px; padding:14px 18px; display:flex; align-items:center; gap:16px; }
        #root .f26-t { font-size:32px; line-height:1.15; }
        #root .f26-t span { font-size:25px; color:${C.grey}; }
        #f26-pt { left:780px; top:150px; padding:10px 26px; font-size:56px; color:#fff; background:${C.good}; transform: rotate(-6deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#DCEAF2"/>
      <rect x="0" y="380" width="460" height="300" fill="#B9CFDB" stroke="${C.ink}" stroke-width="7"/>
      ${[0, 1, 2].map((r) => `<rect x="0" y="${420 + r * 70}" width="460" height="18" fill="#93AFC0"/>`).join("")}
      <g id="f26-zw"><g transform="translate(150,560) scale(0.6)">${human("f26z", "ze")}</g></g>
      <g id="f26-vw"><g transform="translate(330,640) scale(0.55)">${vertebra("f26v")}</g></g>
      <rect x="0" y="600" width="460" height="160" fill="#7F99A8" stroke="${C.ink}" stroke-width="7"/>
      <rect y="760" width="1920" height="320" fill="#E9B872"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <line x1="0" y1="900" x2="1920" y2="900" stroke="#fff" stroke-width="8"/>
      <line x1="1040" y1="420" x2="1040" y2="880" stroke="${C.ink}" stroke-width="12"/>
      <rect x="1040" y="440" width="24" height="220" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
      <g id="f26-jw"><g transform="translate(780,640) scale(1.15)">${human("f26j", "juninho")}</g></g>
      <g id="f26-ball" opacity="0"><circle cx="0" cy="0" r="30" fill="#fff" ${st}/><path d="M-26 -12 Q0 0 26 -12 M-22 16 Q0 4 22 16 M0 -30 Q-10 0 0 30" stroke="#3E7FD8" stroke-width="5" fill="none"/></g>
      <g id="f26-mw"><g transform="translate(1420,860) scale(0.5)">${molao("f26m")}</g></g>
      <g id="f26-pw"><g transform="translate(1640,860) scale(0.6)">${patelito("f26p")}</g></g>
      <g id="f26-star" opacity="0"><g transform="translate(1530,660)"><path d="M0 -40 L11 -12 L40 -12 L16 6 L26 36 L0 18 L-26 36 L-16 6 L-40 -12 L-11 -12 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g></g>
    </svg>
    <div id="f26-head" class="abs title">RESUMINDO</div>
    <div id="f26-pt" class="abs card title" style="opacity:0">PONTO!</div>
    ${[0, 1, 2].map(card).join("")}`,
      js: function (tl, K, R) {
        const j = "f26j", z = "f26z", v = "f26v", m = "f26m", p = "f26p";
        R.setPose(tl, j, 0, { shF: -20, elF: -40, shB: 10, elB: -30 });
        R.setPose(tl, z, 0, { shF: -20, elF: -40 });
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.setPose(tl, m, 0, { armF: 20, armB: -20 });
        R.setPose(tl, p, 0, { armF: 20, armB: -20 });
        [j, z, v, m, p].forEach((id) => { R.face(tl, id, 0, { eyes: "normal", mouth: "smile" }); R.blinks(tl, id, 0.3, K.dur); });
        R.slideIn(tl, "#f26-head", 0.05, 0.5, -300);
        // corta e marca ponto
        const t = K.res + 0.3;
        tl.set("#f26-ball", { x: 560, y: 260, opacity: 1 }, t - 0.5);
        tl.to("#f26-ball", { x: 900, y: 290, duration: 0.6, ease: "power1.out" }, t - 0.5);
        R.pose(tl, j, t - 0.3, 0.25, { hipF: -60, knF: 90, hipB: -40, knB: 80, shF: 40, shB: 40 }, "power2.out");
        tl.to("#f26-jw", { y: -250, duration: 0.35, ease: "power2.out" }, t);
        R.pose(tl, j, t, 0.25, { hipF: -10, knF: 30, hipB: 10, knB: 40, shF: -170, elF: -20, shB: -40 });
        R.pose(tl, j, t + 0.4, 0.12, { shF: -40, elF: 0 }, "power4.out");
        tl.to("#f26-ball", { x: 1400, y: 820, duration: 0.3, ease: "power2.in" }, t + 0.45);
        tl.to("#f26-ball", { opacity: 0, duration: 0.15 }, t + 0.8);
        tl.to("#f26-jw", { y: 0, duration: 0.35, ease: "power2.in" }, t + 0.45);
        R.pose(tl, j, t + 0.8, 0.3, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -150, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
        R.face(tl, j, t + 0.8, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f26-pt", t + 0.7, 0.4);
        // torcida comemora
        R.pose(tl, z, t + 0.8, 0.3, { shF: -160, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
        R.face(tl, z, t + 0.8, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, t + 0.85, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, v, t + 0.85, { eyes: "happy", mouth: "grin" });
        for (let i = 0; i < 3; i++) {
          tl.to("#f26-vw", { y: -40, duration: 0.18, ease: "power2.out" }, t + 0.9 + i * 0.4);
          tl.to("#f26-vw", { y: 0, duration: 0.18, ease: "power2.in" }, t + 1.08 + i * 0.4);
        }
        // cartões
        R.fadeOut(tl, "#f26-pt", K.sob - 0.3);
        R.pop(tl, "#f26-c0", K.sob - 0.1, 0.4);
        R.pop(tl, "#f26-c1", K.rep - 0.1, 0.4);
        R.pop(tl, "#f26-c2", K.esc - 0.1, 0.4);
        // Molão e Patelito batem as mãos
        R.pose(tl, m, K.pac - 0.1, 0.3, { armF: -120 }, "back.out(2)");
        R.pose(tl, p, K.pac - 0.1, 0.3, { armB: 120 }, "back.out(2)");
        tl.to("#f26-mw", { x: 40, duration: 0.3, ease: "power2.out" }, K.pac);
        tl.to("#f26-pw", { x: -40, duration: 0.3, ease: "power2.out" }, K.pac);
        R.face(tl, m, K.pac + 0.3, { eyes: "happy", mouth: "grin" });
        R.face(tl, p, K.pac + 0.3, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f26-star", K.pac + 0.35, 0.35);
      },
    };
  },
};
