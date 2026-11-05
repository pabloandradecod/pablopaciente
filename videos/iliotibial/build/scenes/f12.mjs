// F12 — Os testes: palpação acima da linha do joelho por fora; teste de Noble (dor perto de 30°); agachamento numa perna (joelho cai pra dentro)
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
  speakers: { cida: "f12c" },
  tail: 1.2,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      palp: w(0, "palpação"), linha: w(0, "linha"), fora: w(0, "fora"), doer: w(0, "doer"), noble: w(0, "Noble"), aperto: w(0, "aperto"),
      dobro: w(0, "dobro"), estico: w(0, "estico"), trinta: w(0, "trinta"), aparece: w(0, "aparece"),
      agach: w(0, "agachamento"), dentro: w(0, "dentro"), c0: L1.start, c1: L1.end, calo: w(1, "calombinho"),
    };
    const pab = inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C));
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // painel do Noble: coxa fixa, perna gira no joelho (1360,430)
    const KX = 1360, KY = 430;
    const arc = (a0, a1, r) => {
      const p = (a) => [KX + r * Math.cos((a * Math.PI) / 180), KY + r * Math.sin((a * Math.PI) / 180)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M${KX} ${KY} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
    };
    return {
      k,
      css: `
        #f12-title { left:110px; top:70px; font-size:66px; }
        #f12-title span { color:${C.pain}; }
        #f12-ai { left:360px; top:190px; padding:16px 30px; font-size:58px; color:${C.pain}; transform: rotate(-5deg); }
        #f12-tag0 { left:110px; top:170px; padding:10px 20px; font-size:28px; }
        #f12-noble { left:900px; top:150px; width:900px; height:560px; padding:16px 22px; }
        #f12-noble .h { font-size:36px; } #f12-noble .h span { color:${C.pain}; }
        #f12-front { left:1260px; top:170px; width:520px; padding:18px; text-align:center; }
        #f12-front .t { font-size:30px; margin-top:6px; } #f12-front .t b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f12-p-wrap"><g transform="translate(900,640) scale(-1.25,1.25)">${pab}</g></g>
      <g id="f12-c-wrap"><g transform="translate(560,640) scale(1.3)">${human("f12c", "cida")}</g></g>
      <line id="f12-jl" x1="500" y1="760" x2="660" y2="760" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>
      <g id="f12-hand" opacity="0"><g transform="translate(596,736)"><path d="M10 0 L170 -40" ${st} stroke-width="30"/><path d="M10 0 L170 -40" stroke="#fff" stroke-width="20" stroke-linecap="round"/><circle cx="0" cy="0" r="22" fill="#fff" ${st}/></g></g>
      <g id="f12-pain" opacity="0"><circle cx="574" cy="736" r="42" fill="${C.pain}" opacity="0.4"/><circle cx="574" cy="736" r="17" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">O EXAME: <span>joelho por fora</span></div>
    <div id="f12-tag0" class="abs card label" style="opacity:0">palpação: logo <b style="color:${C.pain}">acima da linha</b> do joelho, do lado de fora</div>
    <div id="f12-ai" class="abs card title" style="opacity:0">É AÍ!</div>
    <div id="f12-noble" class="abs card" style="opacity:0">
      <div class="h title">Teste de <span>NOBLE</span></div>
      <svg width="856" height="470" viewBox="880 150 856 470" style="position:absolute;left:22px;top:70px">
        <path d="${arc(0, 90, 220)}" fill="#EEF2F3" stroke="${C.ink}" stroke-width="4"/>
        <path d="${arc(20, 40, 220)}" fill="${C.pain}" opacity="0.55"/>
        <text x="${KX + 236 * Math.cos(Math.PI / 6)}" y="${KY + 236 * Math.sin(Math.PI / 6) + 10}" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.pain}">30°</text>
        <line x1="960" y1="${KY}" x2="${KX}" y2="${KY}" stroke="${C.ink}" stroke-width="58" stroke-linecap="round"/>
        <line x1="960" y1="${KY}" x2="${KX}" y2="${KY}" stroke="#3E5A8A" stroke-width="44" stroke-linecap="round"/>
        <text x="1100" y="${KY - 44}" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">coxa</text>
        <g id="f12-shin"><line x1="${KX}" y1="${KY}" x2="${KX + 280}" y2="${KY}" stroke="${C.ink}" stroke-width="52" stroke-linecap="round"/><line x1="${KX}" y1="${KY}" x2="${KX + 280}" y2="${KY}" stroke="#3E5A8A" stroke-width="38" stroke-linecap="round"/>
          <path d="M${KX + 280} ${KY - 30} L${KX + 330} ${KY - 30} Q${KX + 344} ${KY} ${KX + 320} ${KY + 18} L${KX + 280} ${KY + 18} Z" fill="#8E2F45" stroke="${C.ink}" stroke-width="5"/></g>
        <circle cx="${KX}" cy="${KY}" r="30" fill="#5675A6" stroke="${C.ink}" stroke-width="5"/>
        <g id="f12-npain" opacity="0"><circle cx="${KX - 34}" cy="${KY - 26}" r="34" fill="${C.pain}" opacity="0.45"/><circle cx="${KX - 34}" cy="${KY - 26}" r="13" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        <g id="f12-thumb"><circle cx="${KX - 34}" cy="${KY - 60}" r="22" fill="#fff" stroke="${C.ink}" stroke-width="5"/><path d="M${KX - 34} ${KY - 82} L${KX - 34} ${KY - 140}" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/><path d="M${KX - 34} ${KY - 82} L${KX - 34} ${KY - 140}" stroke="#fff" stroke-width="16" stroke-linecap="round"/></g>
        <text x="${KX - 160}" y="${KY - 110}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">aperta aqui</text>
        <text x="960" y="600" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">dobra e estica · a dor aparece perto dos 30°</text>
      </svg>
    </div>
    <div id="f12-front" class="abs card" style="opacity:0">
      <svg width="480" height="300" viewBox="0 0 480 300">
        <rect x="170" y="0" width="200" height="40" rx="14" fill="#3E5A8A" stroke="${C.ink}" stroke-width="6"/><path d="M320 20 L320 150 L320 280" fill="none" stroke="${C.ink}" stroke-width="44" stroke-linecap="round"/><path d="M320 20 L320 150 L320 280" fill="none" stroke="#9FB1CC" stroke-width="30" stroke-linecap="round"/><path id="f12-legok" d="M220 20 L230 150 L220 280" fill="none" stroke="${C.ink}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M220 20 L230 150 L220 280" fill="none" stroke="#3E5A8A" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" id="f12-legin"/>
        <path id="f12-legout" d="M220 20 L180 150 L220 280" fill="none" stroke="${C.pain}" stroke-width="8" stroke-dasharray="14 10" opacity="0"/>
        <path d="M150 150 L110 150" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" id="f12-arr" opacity="0"/><path d="M124 136 L106 150 L124 164" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" id="f12-arr2" opacity="0"/>
        <g id="f12-x" opacity="0"><path d="M400 60 L460 120 M460 60 L400 120" stroke="${C.pain}" stroke-width="16" stroke-linecap="round"/></g>
      </svg>
      <div class="t label">visto de frente: o joelho <b>cai pra dentro</b></div>
    </div>`,
      js: function (tl, K, R) {
        const c = "f12c", p = "f12p";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.setPose(tl, p, 0, { shF: -20, elF: -30, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, c, 0.3, K.dur);
        R.blinks(tl, p, 0.5, K.dur);
        R.rise(tl, "#f12-title", 0.1, 0.5);
        // palpação: acima da linha, do lado de fora
        tl.to("#f12-jl", { opacity: 0.8, duration: 0.3 }, K.linha);
        R.pop(tl, "#f12-tag0", K.fora - 0.2, 0.4);
        R.pose(tl, p, K.palp, 0.4, { shF: -60, elF: -10 });
        tl.set("#f12-hand", { opacity: 1 }, K.fora - 0.2);
        tl.fromTo("#f12-hand", { x: 260 }, { x: 0, duration: 0.4, ease: "power2.out" }, K.fora - 0.2);
        tl.to("#f12-hand", { x: -12, duration: 0.12, yoyo: true, repeat: 1 }, K.doer - 0.2);
        tl.set("#f12-pain", { opacity: 1 }, K.doer - 0.1);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "574 736" }, { scale: 1.3, svgOrigin: "574 736", duration: 0.25, yoyo: true, repeat: 3 }, K.doer - 0.1);
        R.face(tl, c, K.doer - 0.1, { eyes: "wide", mouth: "scream" });
        tl.to("#f12-c-wrap", { y: -50, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.doer - 0.1);
        R.pop(tl, "#f12-ai", K.doer, 0.35);
        // Noble
        R.fadeOut(tl, "#f12-ai, #f12-hand, #f12-tag0, #f12-jl", K.noble - 0.4, 0.25);
        tl.to("#f12-p-wrap", { x: 500, opacity: 0, duration: 0.5, ease: "power2.in" }, K.noble - 0.4);
        tl.to("#f12-pain", { opacity: 0.3, duration: 0.2 }, K.noble - 0.4);
        R.face(tl, c, K.noble, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f12-noble", K.noble - 0.2, 0.45);
        tl.fromTo("#f12-thumb", { y: -30 }, { y: 0, duration: 0.25, ease: "power2.in" }, K.aperto);
        // dobra e estica: 0 → 90 → 0, e de novo até ~30
        const SO = "1360 430";
        tl.to("#f12-shin", { rotation: 90, svgOrigin: SO, duration: 1.0, ease: "sine.inOut" }, K.dobro);
        tl.to("#f12-shin", { rotation: 0, svgOrigin: SO, duration: 1.0, ease: "sine.inOut" }, K.dobro + 1.0);
        tl.to("#f12-shin", { rotation: 30, svgOrigin: SO, duration: 0.6, ease: "power2.out" }, K.trinta - 0.3);
        tl.set("#f12-npain", { opacity: 1 }, K.trinta + 0.2);
        tl.fromTo("#f12-npain", { scale: 0.6, svgOrigin: "1326 404" }, { scale: 1.35, svgOrigin: "1326 404", duration: 0.25, yoyo: true, repeat: 5 }, K.trinta + 0.2);
        R.face(tl, c, K.aparece, { eyes: "pain", mouth: "frown" });
        // agachamento numa perna
        R.fadeOut(tl, "#f12-noble", K.agach - 0.3, 0.3);
        tl.to("#f12-pain", { opacity: 0, duration: 0.2 }, K.agach - 0.3);
        R.pop(tl, "#f12-front", K.agach, 0.4);
        R.pose(tl, c, K.agach, 0.6, { hipB: 30, knB: 80, hipF: -45, knF: 70, torso: 18, shF: -80, elF: -10, shB: -60, elB: -10 });
        tl.to("#f12-c-wrap", { y: 40, duration: 0.6, ease: "power2.inOut" }, K.agach);
        tl.to("#f12-legin, #f12-legok", { attr: { d: "M220 20 L170 150 L220 280" }, duration: 0.5, ease: "power2.in" }, K.dentro - 0.4);
        tl.to("#f12-arr, #f12-arr2", { opacity: 1, duration: 0.2 }, K.dentro - 0.1);
        R.pop(tl, "#f12-x", K.dentro + 0.1, 0.3);
        R.face(tl, c, K.dentro, { eyes: "pain", mouth: "frown" });
        // Dona Cida: "Bem nesse calombinho!"
        R.pose(tl, c, K.c0 - 0.3, 0.4, { hipB: 0, knB: 0, hipF: 0, knF: 0, torso: 26, neck: -10, shF: 10, elF: -20, shB: 20, elB: -20 });
        tl.to("#f12-c-wrap", { y: 0, duration: 0.4 }, K.c0 - 0.3);
        tl.set("#f12-pain", { opacity: 1 }, K.calo - 0.1);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "574 736" }, { scale: 1.3, svgOrigin: "574 736", duration: 0.2, yoyo: true, repeat: 3 }, K.calo - 0.1);
        R.face(tl, c, K.c0 - 0.2, { eyes: "wide", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.fora - 0.2, vol: 0.35 },
        { name: "click", t: k.doer - 0.2, vol: 0.5 },
        { name: "pop", t: k.doer, vol: 0.5 },
        { name: "whoosh-short", t: k.noble - 0.4, vol: 0.4 },
        { name: "glitch-1", t: k.trinta + 0.2, vol: 0.3 },
        { name: "pop", t: k.agach, vol: 0.35 },
        { name: "error", t: k.dentro + 0.1, vol: 0.3 },
      ],
    };
  },
};
