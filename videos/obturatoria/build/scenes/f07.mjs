// F7 — Onde o Turão se aperta: no canal obturatório (topo do buraco do osso) e logo na saída, entre músculos e fáscia
export default {
  speakers: { turao: "f07t" },
  build(ctx) {
    const { C, turao, smooth, w, lines, MINT } = ctx;
    const k = {
      aperta: w(0, "aperta"), tunel: w(0, "túnel"), saida: w(0, "saída"), musc: w(0, "músculos"), fasc: w(0, "fáscia"),
      dentro: w(0, "dentro"), saida2: w(0, "saída", 1), coxa: w(0, "coxa"),
      t0: lines[1].start, t1: lines[1].end, passo: w(1, "passo"), emp: w(1, "empurrando"),
    };
    // rosto na coxa (saída), corpo sobe até a pelve passando pelo canal
    const pts = [[1380, 740], [1280, 700], [1180, 646], [1070, 572], [960, 488], [900, 452], [820, 400], [700, 330], [580, 280]];
    const sq = [[1380, 740], [1282, 702], [1184, 652], [1074, 576], [962, 490], [900, 452], [820, 400], [700, 330], [580, 280]];
    k.sq = smooth(sq); k.rel = smooth(pts);
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const band = (id, cx, cy) => `<g id="${id}-w"><g id="${id}"><rect x="${cx - 170}" y="${cy - 30}" width="340" height="60" rx="30" fill="#E86A5C" ${st} transform="rotate(34 ${cx} ${cy})"/><path d="M${cx - 140} ${cy} L${cx + 140} ${cy}" stroke="#B9473E" stroke-width="5" opacity="0.6" transform="rotate(34 ${cx} ${cy})"/></g></g>`;
    return {
      k,
      css: `
        #f07-t { left:110px; top:60px; font-size:56px; }
        #f07-t span { color:${C.pain}; }
        .f07-lab { position:absolute; padding:8px 16px; font-size:30px; background:#fff; border:5px solid ${C.ink}; border-radius:16px; font-family:"Nunito"; font-weight:900; white-space:nowrap; }
        #f07-crit { background:${C.pain}; color:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- zoom: anel do osso com o forame obturado -->
      <path d="M520 560 Q520 300 900 290 Q1280 300 1280 560 Q1280 820 900 840 Q520 820 520 560 Z" fill="${C.bone}" ${st}/>
      <ellipse cx="900" cy="600" rx="230" ry="170" fill="#F3E6CF" ${st}/>
      <ellipse cx="900" cy="612" rx="214" ry="150" fill="${MINT}" opacity="0.35"/>
      <text x="900" y="700" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="34" fill="${C.ink}" opacity="0.55">membrana</text>
      <!-- canal (portinha) no topo -->
      <g id="f07-canal"><ellipse cx="900" cy="452" rx="44" ry="30" fill="#5A4632" ${st}/></g>
      <g id="f07-glow" opacity="0"><circle cx="900" cy="452" r="74" fill="${C.pain}" opacity="0.3"/></g>
      <g id="f07-glow2" opacity="0"><circle cx="1120" cy="610" r="110" fill="${C.pain}" opacity="0.25"/></g>
      <g id="f07-t-wrap">${turao("f07t", pts, 30, 1.4)}</g>
      <!-- músculos e fáscia na saída -->
      <g id="f07-muscles" opacity="0">${band("f07-mA", 1160, 540)}${band("f07-mB", 1080, 690)}</g>
      <g id="f07-fascia" opacity="0"><rect x="980" y="560" width="300" height="110" rx="20" fill="#fff" opacity="0.55" stroke="${C.ink}" stroke-width="4" stroke-dasharray="12 10" transform="rotate(34 1130 615)"/></g>
      <!-- pressão de dentro da pelve -->
      <g id="f07-push" opacity="0"><path d="M520 220 L760 360" ${st} stroke="${C.pain}" stroke-width="14"/><path d="M724 330 L768 366 L716 378" fill="none" ${st} stroke="${C.pain}" stroke-width="14"/></g>
    </svg>
    <div id="f07-t" class="abs title">Onde o Turão <span>se aperta</span></div>
    <div id="f07-l1" class="f07-lab" style="left:960px;top:330px;opacity:0;color:${C.pain}">túnel (canal obturatório)</div>
    <div id="f07-l2" class="f07-lab" style="left:1330px;top:470px;opacity:0;background:#FFC2B5">músculos</div>
    <div id="f07-l3" class="f07-lab" style="left:1330px;top:560px;opacity:0">fáscia</div>
    <div id="f07-l4" class="f07-lab" style="left:110px;top:170px;opacity:0">de dentro da pelve: cirurgia, parto, hematoma</div>
    <div id="f07-l5" class="f07-lab" style="left:1220px;top:800px;opacity:0">na saída, na coxa: atletas</div>
    <div id="f07-crit" class="f07-lab" style="left:1330px;top:650px;opacity:0">PONTO CRÍTICO</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-t", 0, 0.4, -30);
        R.face(tl, "f07t", 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f07t", 0.3, K.t0);
        // túnel
        tl.set("#f07-glow", { opacity: 1 }, K.tunel);
        tl.fromTo("#f07-glow", { scale: 0.6, svgOrigin: "900 452" }, { scale: 1.15, svgOrigin: "900 452", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.tunel);
        R.pop(tl, "#f07-l1", K.tunel + 0.1, 0.4);
        R.face(tl, "f07t", K.tunel, { eyes: "wide", mouth: "flat" });
        // saída: músculos e fáscia
        tl.set("#f07-glow2", { opacity: 1 }, K.saida);
        tl.fromTo("#f07-glow2", { scale: 0.6, svgOrigin: "1120 610" }, { scale: 1.1, svgOrigin: "1120 610", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.saida);
        R.fadeIn(tl, "#f07-muscles", K.musc - 0.2, 0.3);
        R.pop(tl, "#f07-l2", K.musc, 0.35);
        R.fadeIn(tl, "#f07-fascia", K.fasc - 0.1, 0.3);
        R.pop(tl, "#f07-l3", K.fasc + 0.1, 0.35);
        // de dentro da pelve
        R.fadeIn(tl, "#f07-push", K.dentro - 0.1, 0.25);
        tl.fromTo("#f07-push", { x: -40, y: -24 }, { x: 0, y: 0, duration: 0.25, yoyo: true, repeat: 3, ease: "power2.inOut" }, K.dentro);
        R.pop(tl, "#f07-l4", K.dentro, 0.4);
        R.nerveTo(tl, "f07t", K.dentro + 0.1, 0.25, K.sq);
        R.face(tl, "f07t", K.dentro + 0.1, { eyes: "pain", mouth: "frown" });
        R.nerveTo(tl, "f07t", K.dentro + 0.9, 0.3, K.rel);
        R.fadeOut(tl, "#f07-push", K.saida2 - 0.2, 0.2);
        // aperto na saída: músculos fecham
        tl.to("#f07-mA", { x: -14, y: 22, duration: 0.25, ease: "power3.in" }, K.saida2);
        tl.to("#f07-mB", { x: 14, y: -22, duration: 0.25, ease: "power3.in" }, K.saida2);
        R.nerveTo(tl, "f07t", K.saida2 + 0.2, 0.2, K.sq);
        R.pop(tl, "#f07-l5", K.coxa - 0.1, 0.35);
        R.pop(tl, "#f07-crit", K.coxa + 0.3, 0.35);
        // fala do Turão
        R.face(tl, "f07t", K.t0 - 0.1, { eyes: "pain" });
        R.shake(tl, "#f07t-face", K.t0, 0.8, 4);
        tl.to("#f07-mA", { x: 0, y: 0, duration: 0.3, ease: "power2.out" }, K.passo - 0.2);
        tl.to("#f07-mB", { x: 0, y: 0, duration: 0.3, ease: "power2.out" }, K.passo - 0.2);
        R.nerveTo(tl, "f07t", K.passo - 0.2, 0.3, K.rel);
        R.face(tl, "f07t", K.passo, { eyes: "happy" });
        tl.to("#f07t-face", { x: 30, y: 18, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.passo + 0.1);
        tl.to("#f07-mA", { x: -16, y: 24, duration: 0.2, ease: "power3.in" }, K.emp - 0.1);
        tl.to("#f07-mB", { x: 16, y: -24, duration: 0.2, ease: "power3.in" }, K.emp - 0.1);
        R.face(tl, "f07t", K.emp, { eyes: "wide" });
        R.shake(tl, "#f07t-face", K.emp + 0.1, 0.4, 5);
      },
      sfx: [
        { name: "pop", t: k.tunel, vol: 0.35 },
        { name: "pop", t: k.musc, vol: 0.3 },
        { name: "pop", t: k.fasc, vol: 0.3 },
        { name: "impact-bass-1", t: k.dentro + 0.1, vol: 0.3 },
        { name: "impact-bass-2", t: k.saida2 + 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.passo - 0.2, vol: 0.35 },
        { name: "impact-bass-1", t: k.emp, vol: 0.3 },
      ],
    };
  },
};
