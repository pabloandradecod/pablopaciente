// F17 — Primeiro passo: ajustar o treino (menos saltos, não zero; manter técnica, força e o que não dói)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      prim: w(0, "Primeiro"), aju: w(0, "ajustar"), par: w(0, "parar"), dim: w(0, "diminuir"), sal: w(0, "saltos"),
      man: w(0, "manter"), tec: w(0, "técnica"), for: w(0, "força"), doi: w(0, "dói"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const before = [210, 230, 250, 280];
    const after = [120, 110, 110, 100];
    const bars = before.map((h, i) => `<rect id="f17-b${i}" x="${70 + i * 120}" y="${380 - h}" width="80" height="${h}" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>`).join("");
    const item = (id, text, ok) => `<div id="${id}" class="f17-item label" style="opacity:0">
      <svg width="40" height="40" viewBox="-20 -20 40 40" style="flex:none"><circle r="17" fill="${ok ? C.good : C.sun}" stroke="${C.ink}" stroke-width="4"/>${ok ? `<path d="M-8 0 L-2 7 L9 -7" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-8 0 L8 0" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
      <span>${text}</span></div>`;
    return {
      k,
      css: `
        #f17-title { left:120px; top:60px; font-size:72px; }
        #f17-title span { color:#1E9C72; }
        #f17-chart { left:120px; top:180px; width:620px; padding:18px 22px 10px; }
        #f17-chart .t { font-size:28px; }
        #f17-not { left:520px; top:190px; padding:8px 20px; font-size:30px; color:#fff; background:${C.ink}; border-radius:14px; transform:rotate(-3deg); }
        #f17-list { left:120px; top:590px; width:620px; padding:16px 24px; }
        #root .f17-item { display:flex; align-items:center; gap:12px; font-size:30px; line-height:1.1; margin:8px 0; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="#DCEAF2"/>
      <rect y="830" width="1920" height="250" fill="#E9B872"/><line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f17-j-wrap"><g transform="translate(980,600) scale(1.1)">${human("f17j", "juninho")}</g></g>
      <g id="f17-ball"><circle cx="1090" cy="300" r="30" fill="#fff" ${st}/><path d="M1064 288 Q1090 300 1116 288 M1068 316 Q1090 304 1112 316" stroke="#3E7FD8" stroke-width="5" fill="none"/></g>
      <!-- técnico com prancheta -->
      <g id="f17-coach"><g transform="translate(1350,0)">
        <rect x="-40" y="540" width="80" height="170" rx="30" fill="#2E3E66" ${st}/>
        <rect x="-34" y="700" width="28" height="130" rx="12" fill="#2E3E66" ${st}/><rect x="6" y="700" width="28" height="130" rx="12" fill="#2E3E66" ${st}/>
        <circle cx="0" cy="490" r="50" fill="#D9A27A" ${st}/>
        <path d="M-52 470 Q-50 420 0 422 Q50 420 54 470 Z" fill="${C.pain}" ${st}/><path d="M40 466 L84 470" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="-14" cy="494" r="6" fill="${C.ink}"/><circle cx="14" cy="494" r="6" fill="${C.ink}"/><path d="M-14 516 Q0 524 14 516" stroke="${C.ink}" stroke-width="5" fill="none"/>
        <line x1="0" y1="540" x2="0" y2="575" stroke="${C.sun}" stroke-width="5"/><circle cx="0" cy="580" r="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/>
        <g id="f17-clip"><rect x="-110" y="580" width="90" height="120" rx="10" fill="#C99A62" ${st}/><rect x="-100" y="596" width="70" height="90" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
          <path d="M-92 616 L-40 616 M-92 636 L-40 636 M-92 656 L-56 656" stroke="${C.ink}" stroke-width="4"/></g>
      </g></g>
      <g id="f17-z-wrap"><g transform="translate(1690,660) scale(0.85)">${human("f17z", "ze")}</g></g>
    </svg>
    <div id="f17-title" class="abs title" style="opacity:0">Passo 1: <span>ajustar o treino</span></div>
    <div id="f17-chart" class="abs card" style="opacity:0">
      <div class="t label">SALTOS POR SEMANA</div>
      <svg width="456" height="320" viewBox="0 0 570 400"><line x1="40" y1="380" x2="560" y2="380" stroke="${C.ink}" stroke-width="5"/><line x1="40" y1="60" x2="40" y2="380" stroke="${C.ink}" stroke-width="5"/>${bars}</svg>
    </div>
    <div id="f17-not" class="abs title" style="opacity:0">diminuir ≠ zerar</div>
    <div id="f17-list" class="abs card" style="opacity:0">
      ${item("f17-i0", "Técnica", true)}
      ${item("f17-i1", "Força", true)}
      ${item("f17-i2", "O que não dói", true)}
    </div>`,
      js: function (tl, K, R, A) {
        const j = "f17j";
        R.setPose(tl, j, 0, { shF: -20, elF: -30, shB: 10, elB: -20 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0.4, K.dur);
        R.setPose(tl, "f17z", 0, { shF: -150, elF: -110, shB: 10, elB: -20 });
        R.face(tl, "f17z", 0, { eyes: "wide", mouth: "frown" });
        R.blinks(tl, "f17z", 0.6, K.dur, "wide");
        R.rise(tl, "#f17-title", Math.max(0.1, K.prim - 0.2), 0.45, 30);
        R.slideIn(tl, "#f17-chart", K.aju - 0.3, 0.5, -300);
        tl.fromTo("#f17-coach", { x: 500 }, { x: 0, duration: 0.6, ease: "back.out(1.3)" }, K.aju - 0.2);
        tl.to("#f17-clip", { rotation: -8, svgOrigin: "1285 640", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.aju + 0.4);
        // não é parar tudo
        R.pop(tl, "#f17-not", K.par - 0.1, 0.4);
        // diminuir os saltos (barras descem, não zeram)
        const after = [120, 110, 110, 100];
        after.forEach((h, i) => tl.to(`#f17-b${i}`, { attr: { y: 380 - h, height: h }, fill: "#FFC94A", duration: 0.5, ease: "power2.inOut" }, K.dim + i * 0.12));
        // Juninho treina técnica (manchete), sem saltar
        tl.fromTo("#f17-ball", { y: -60 }, { y: 0, duration: 0.5, ease: "power1.in", yoyo: true, repeat: 7 }, K.man - 0.4);
        for (let i = 0; i < 4; i++) {
          R.pose(tl, j, K.man + i * 1.0, 0.25, { shF: -70, elF: 0, shB: -70, elB: 0, hipF: -20, knF: 30, hipB: -10, knB: 30 }, "power2.out");
          R.pose(tl, j, K.man + i * 1.0 + 0.5, 0.25, { shF: -50, elF: -10, shB: -50, elB: -10, hipF: 0, knF: 0, hipB: 0, knB: 0 }, "power2.inOut");
        }
        R.pop(tl, "#f17-list", K.man - 0.2, 0.4, 0.7);
        R.rise(tl, "#f17-i0", K.tec - 0.15, 0.3, 12);
        R.rise(tl, "#f17-i1", K.for - 0.15, 0.3, 12);
        R.rise(tl, "#f17-i2", K.doi - 0.4, 0.3, 12);
        // Seu Zé alivia
        R.face(tl, "f17z", K.tec, { eyes: "normal", mouth: "smile" });
        R.pose(tl, "f17z", K.tec, 0.4, { shF: -160, elF: -20 }, "back.out(2)");
        R.face(tl, "f17z", K.doi, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.prim - 0.2), vol: 0.35 },
        { name: "whoosh-short", t: k.aju - 0.3, vol: 0.35 },
        { name: "pop", t: k.par - 0.1, vol: 0.4 },
        { name: "whoosh-short", t: k.dim, vol: 0.3 },
        { name: "pop", t: k.tec - 0.15, vol: 0.3 },
        { name: "pop", t: k.for - 0.15, vol: 0.3 },
        { name: "pop", t: k.doi - 0.4, vol: 0.3 },
      ],
    };
  },
};
