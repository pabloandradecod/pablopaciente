// F12 — O exame: palpação no ponto da pata de ganso (dói mais que a linha da articulação), força de trás da coxa e joelho caindo pra dentro ao agachar
const inNeck = (svg, id, extra) => {
  const i = svg.indexOf(`<g transform="translate(4,-138)"><g id="${id}-shF">`);
  const j = svg.lastIndexOf("</g></g>", i);
  return svg.slice(0, j) + extra + svg.slice(j);
};
const hat = (id, C) => `<g id="${id}-hat">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g>`;

export default {
  speakers: { pablo: "f12p", ze: "f12z" },
  tail: 1.2,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      palp: w(0, "palpação"), chave: w(0, "chave"), pata: w(0, "pata"), linha: w(0, "linha"), forca: w(0, "força"), tras: w(0, "trás"),
      cai: w(0, "cai"), dentro: w(0, "dentro"), agach: w(0, "agachar"), z0: L1.start, z1: L1.end, ponto: w(1, "ponto"),
    };
    const pab = inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C));
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // painel de força: sentado, coxa horizontal, perna pendurada; joelho em (1360,400)
    const KX = 1360, KY = 400;
    return {
      k,
      css: `
        #f12-title { left:110px; top:70px; font-size:66px; }
        #f12-title span { color:${C.pain}; }
        #f12-ai { left:300px; top:300px; padding:16px 30px; font-size:58px; color:${C.pain}; transform: rotate(-5deg); }
        #f12-cmp { left:1080px; top:170px; width:700px; padding:20px 26px; }
        #f12-cmp .r { display:flex; align-items:center; gap:16px; font-size:30px; margin:10px 0; }
        #f12-cmp .r .l { width:300px; } #f12-cmp .bar { flex:1; height:30px; border:5px solid ${C.ink}; border-radius:16px; overflow:hidden; background:#fff; }
        #f12-cmp .fill { height:100%; width:100%; transform-origin:0 50%; }
        #f12-force { left:900px; top:150px; width:900px; height:560px; padding:16px 22px; }
        #f12-force .h { font-size:36px; } #f12-force .h span { color:${C.pain}; }
        #f12-front { left:1260px; top:170px; width:520px; padding:18px; text-align:center; }
        #f12-front .t { font-size:30px; margin-top:6px; } #f12-front .t b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f12-p-wrap"><g transform="translate(900,640) scale(-1.25,1.25)">${pab}</g></g>
      <g id="f12-z-wrap"><g transform="translate(560,640) scale(1.3)">${human("f12z", "ze")}</g></g>
      <line id="f12-jl" x1="500" y1="760" x2="660" y2="760" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
      <g id="f12-hand" opacity="0"><g id="f12-hand-in"><path d="M10 0 L170 -40" ${st} stroke-width="30"/><path d="M10 0 L170 -40" stroke="#fff" stroke-width="20" stroke-linecap="round"/><circle cx="0" cy="0" r="22" fill="#fff" ${st}/></g></g>
      <g id="f12-mild" opacity="0"><circle cx="574" cy="760" r="14" fill="${C.sun}" stroke="#fff" stroke-width="4"/></g>
      <g id="f12-pain" opacity="0"><circle cx="576" cy="802" r="42" fill="${C.pain}" opacity="0.4"/><circle cx="576" cy="802" r="17" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">O EXAME: <span>a palpação é chave</span></div>
    <div id="f12-cmp" class="abs card" style="opacity:0">
      <div class="r label"><span class="l">linha da articulação</span><div class="bar"><div id="f12-b0" class="fill" style="background:${C.sun}"></div></div></div>
      <div class="r label"><span class="l" style="color:${C.pain}">ponto da pata de ganso</span><div class="bar"><div id="f12-b1" class="fill" style="background:${C.pain}"></div></div></div>
    </div>
    <div id="f12-ai" class="abs card title" style="opacity:0">É AÍ!</div>
    <div id="f12-force" class="abs card" style="opacity:0">
      <div class="h title">Força de <span>trás da coxa</span></div>
      <svg width="840" height="480" viewBox="900 200 840 480" style="position:absolute;left:30px;top:66px">
        <rect x="940" y="${KY + 30}" width="440" height="34" rx="10" fill="#C8D3D8" stroke="${C.ink}" stroke-width="5"/>
        <line x1="980" y1="${KY}" x2="${KX}" y2="${KY}" stroke="${C.ink}" stroke-width="58" stroke-linecap="round"/>
        <line x1="980" y1="${KY}" x2="${KX}" y2="${KY}" stroke="${C.brown}" stroke-width="44" stroke-linecap="round"/>
        <text x="1080" y="${KY - 44}" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">coxa</text>
        <g id="f12-shin"><line x1="${KX}" y1="${KY}" x2="${KX + 220}" y2="${KY}" stroke="${C.ink}" stroke-width="52" stroke-linecap="round"/><line x1="${KX}" y1="${KY}" x2="${KX + 220}" y2="${KY}" stroke="${C.skinB}" stroke-width="38" stroke-linecap="round"/>
          <path d="M${KX + 220} ${KY - 30} L${KX + 270} ${KY - 30} Q${KX + 284} ${KY} ${KX + 260} ${KY + 18} L${KX + 220} ${KY + 18} Z" fill="#4A2E1A" stroke="${C.ink}" stroke-width="5"/>
          <g transform="translate(${KX + 200},${KY + 40})"><circle r="22" fill="#fff" ${st}/><path d="M0 22 L0 90" ${st} stroke-width="26"/><path d="M0 22 L0 90" stroke="#fff" stroke-width="16" stroke-linecap="round"/></g></g>
        <circle cx="${KX}" cy="${KY}" r="30" fill="#93684A" stroke="${C.ink}" stroke-width="5"/>
        <path id="f12-farr" d="M${KX + 50} ${KY + 230} Q${KX - 10} ${KY + 290} ${KX - 90} ${KY + 230}" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round" opacity="0"/>
        <text x="${KX + 120}" y="${KY + 140}" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">dobra o joelho</text>
        <text x="${KX + 120}" y="${KY + 172}" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">contra a mão</text>
        <rect x="1480" y="250" width="200" height="30" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
        <rect id="f12-fbar" x="1483" y="253" width="194" height="24" rx="12" fill="${C.good}"/>
        <text x="1480" y="240" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">força</text>
      </svg>
    </div>
    <div id="f12-front" class="abs card" style="opacity:0">
      <svg width="480" height="300" viewBox="0 0 480 300">
        <rect x="170" y="0" width="200" height="40" rx="14" fill="${C.brown}" stroke="${C.ink}" stroke-width="6"/><path d="M320 20 L320 150 L320 280" fill="none" stroke="${C.ink}" stroke-width="44" stroke-linecap="round"/><path d="M320 20 L320 150 L320 280" fill="none" stroke="#B89A80" stroke-width="30" stroke-linecap="round"/><path id="f12-legok" d="M220 20 L230 150 L220 280" fill="none" stroke="${C.ink}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M220 20 L230 150 L220 280" fill="none" stroke="${C.brown}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" id="f12-legin"/>
        <path d="M150 150 L110 150" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" id="f12-arr" opacity="0"/><path d="M124 136 L106 150 L124 164" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" id="f12-arr2" opacity="0"/>
        <g id="f12-x" opacity="0"><path d="M400 60 L460 120 M460 60 L400 120" stroke="${C.pain}" stroke-width="16" stroke-linecap="round"/></g>
      </svg>
      <div class="t label">visto de frente: o joelho <b>cai pra dentro</b> ao agachar?</div>
    </div>`,
      js: function (tl, K, R) {
        const z = "f12z", p = "f12p";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.setPose(tl, p, 0, { shF: -20, elF: -30, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, z, 0.3, K.dur);
        R.blinks(tl, p, 0.5, K.dur);
        R.rise(tl, "#f12-title", 0.1, 0.5);
        // palpação: a mão chega e aperta o ponto da pata de ganso (abaixo da dobra)
        R.pose(tl, p, K.palp, 0.4, { shF: -60, elF: -10 });
        tl.set("#f12-hand", { opacity: 1, x: 598, y: 802 }, K.palp);
        tl.fromTo("#f12-hand-in", { x: 260 }, { x: 0, duration: 0.4, ease: "power2.out" }, K.palp);
        tl.to("#f12-jl", { opacity: 0.8, duration: 0.3 }, K.chave);
        tl.to("#f12-hand-in", { x: -12, duration: 0.12, yoyo: true, repeat: 1 }, K.pata - 0.1);
        tl.set("#f12-pain", { opacity: 1 }, K.pata);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "576 802" }, { scale: 1.3, svgOrigin: "576 802", duration: 0.25, yoyo: true, repeat: 3 }, K.pata);
        R.face(tl, z, K.pata, { eyes: "wide", mouth: "scream" });
        tl.to("#f12-z-wrap", { y: -50, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.pata);
        R.pop(tl, "#f12-cmp", K.pata + 0.2, 0.4);
        tl.fromTo("#f12-b1", { scaleX: 0 }, { scaleX: 0.95, duration: 0.6, ease: "power2.out" }, K.pata + 0.5);
        // a linha da articulação: dói bem menos
        tl.to("#f12-hand", { y: 760, duration: 0.3, ease: "power2.inOut" }, K.linha - 0.2);
        tl.to("#f12-pain", { opacity: 0.25, duration: 0.2 }, K.linha - 0.2);
        tl.set("#f12-mild", { opacity: 1 }, K.linha + 0.1);
        tl.fromTo("#f12-b0", { scaleX: 0 }, { scaleX: 0.3, duration: 0.5, ease: "power2.out" }, K.linha + 0.1);
        R.face(tl, z, K.linha + 0.1, { eyes: "normal", mouth: "flat" });
        // força de trás da coxa
        R.fadeOut(tl, "#f12-hand, #f12-mild, #f12-cmp, #f12-jl", K.forca - 0.5, 0.25);
        tl.to("#f12-pain", { opacity: 0, duration: 0.2 }, K.forca - 0.5);
        tl.to("#f12-p-wrap", { x: 500, opacity: 0, duration: 0.5, ease: "power2.in" }, K.forca - 0.5);
        R.pop(tl, "#f12-force", K.forca - 0.3, 0.45);
        const SO = "1360 400";
        tl.set("#f12-shin", { rotation: 90, svgOrigin: SO }, 0);
        tl.fromTo("#f12-fbar", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.2, ease: "power2.out" }, K.tras);
        tl.to("#f12-farr", { opacity: 1, duration: 0.3 }, K.tras);
        tl.to("#f12-shin", { rotation: 118, svgOrigin: SO, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, K.tras);
        // joelho cai pra dentro ao agachar
        R.fadeOut(tl, "#f12-force", K.cai - 0.5, 0.3);
        R.pop(tl, "#f12-front", K.cai - 0.3, 0.4);
        R.pose(tl, z, K.cai - 0.2, 0.6, { hipB: -40, knB: 70, hipF: -45, knF: 70, torso: 22, shF: -80, elF: -10, shB: -60, elB: -10 });
        tl.to("#f12-z-wrap", { y: 50, duration: 0.6, ease: "power2.inOut" }, K.cai - 0.2);
        tl.to("#f12-legin, #f12-legok", { attr: { d: "M220 20 L280 150 L220 280" }, duration: 0.5, ease: "power2.in" }, K.dentro - 0.3);
        tl.to("#f12-arr, #f12-arr2", { opacity: 1, duration: 0.2 }, K.dentro);
        tl.set("#f12-arr", { attr: { d: "M330 150 L370 150" } }, 0);
        tl.set("#f12-arr2", { attr: { d: "M356 136 L374 150 L356 164" } }, 0);
        R.pop(tl, "#f12-x", K.agach, 0.3);
        R.face(tl, z, K.dentro, { eyes: "pain", mouth: "frown" });
        // Seu Zé: "É aí, doutor! Esse ponto aí!"
        R.pose(tl, z, K.z0 - 0.4, 0.4, { hipB: 0, knB: 0, hipF: 0, knF: 0, torso: 26, neck: -10, shF: 20, elF: -20, shB: 20, elB: -20 });
        tl.to("#f12-z-wrap", { y: 0, duration: 0.4 }, K.z0 - 0.4);
        tl.set("#f12-pain", { opacity: 1 }, K.z0);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "576 802" }, { scale: 1.3, svgOrigin: "576 802", duration: 0.2, yoyo: true, repeat: 3 }, K.z0);
        R.pop(tl, "#f12-ai", K.z0, 0.35);
        R.face(tl, z, K.ponto + 0.2, { eyes: "wide", mouth: "smile" });
      },
      sfx: [
        { name: "click", t: k.pata - 0.1, vol: 0.5 },
        { name: "pop", t: k.pata + 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.forca - 0.5, vol: 0.4 },
        { name: "pop", t: k.cai - 0.3, vol: 0.35 },
        { name: "error", t: k.agach, vol: 0.3 },
        { name: "pop", t: k.z0, vol: 0.45 },
      ],
    };
  },
};
