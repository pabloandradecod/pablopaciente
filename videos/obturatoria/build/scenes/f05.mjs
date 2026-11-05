// F5 — Conheça o Turão: de L2-L4, pela parede da pelve, pelo canal obturatório (topo do forame obturado) até a parte de dentro da coxa
export default {
  speakers: { nervinho: "f05nv" },
  build(ctx) {
    const { C, turao, nervinho, w, lines, MINT } = ctx;
    const k = {
      con: w(0, "Conheça"), tur: w(0, "Turão"), nasce: w(0, "nasce"), l2: w(0, "L2"), l3: w(0, "L3"), l4: w(0, "L4"), desce: w(0, "desce"),
      tunel: w(0, "túnel"), canal: w(0, "canal"), topo: w(0, "topo"), bur: w(0, "buraco"), dep: w(0, "Depois"), dentro: w(0, "dentro", 1),
      n0: lines[1].start, n1: lines[1].end, primo: w(1, "primo"), malha: w(1, "malha"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const bone = C.bone;
    const vert = (i) => { const y = 140 + i * 52; return `<g id="f05-v${i}"><rect x="610" y="${y}" width="80" height="42" rx="12" fill="${bone}" ${st}/><rect x="606" y="${y + 42}" width="88" height="10" rx="5" fill="#9CD3E6" stroke="${C.ink}" stroke-width="4"/></g>`; };
    // L2-L4 → parede lateral da pelve → canal obturatório (topo do forame) → coxa medial
    const path = "M694 266 Q742 300 750 380 Q756 470 736 560 Q722 615 714 642 Q712 684 730 724 Q752 792 770 852";
    return {
      k,
      css: `
        #f05-t { left:110px; top:60px; font-size:54px; }
        #f05-t span { color:#2E9E78; }
        #f05-name { left:110px; top:130px; padding:10px 20px; font-size:30px; }
        .f05-lab { position:absolute; padding:6px 14px; font-size:26px; background:#fff; border:5px solid ${C.ink}; border-radius:14px; font-family:"Nunito"; font-weight:900; white-space:nowrap; }
        #f05-panel { left:1250px; top:150px; width:560px; height:660px; border-radius:30px; background:#E3FAF1; border:7px solid ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f05-anat">
        <path d="M410 560 Q380 720 430 870 L560 870 Q560 720 600 620 Z" fill="#F7D9C2" ${st}/>
        <path d="M890 560 Q930 720 880 870 L750 870 Q750 720 700 620 Z" fill="#F7D9C2" ${st}/>
        <path id="f05-patch" d="M712 690 Q760 720 790 800 Q792 840 772 846 Q744 790 712 740 Z" fill="${MINT}" opacity="0"/>
        <!-- ílios e sacro -->
        <path d="M590 420 Q480 300 360 340 Q340 420 395 520 Q480 520 580 500 Z" fill="${bone}" ${st}/>
        <path d="M710 420 Q820 300 940 340 Q960 420 905 520 Q820 520 720 500 Z" fill="${bone}" ${st}/>
        <path d="M590 410 L710 410 L650 520 Z" fill="${bone}" ${st}/>
        <!-- anel do púbis/ísquio com os forames obturados -->
        <path d="M540 580 Q650 560 760 580 Q790 640 760 700 Q700 730 650 690 Q600 730 540 700 Q510 640 540 580 Z" fill="${bone}" ${st}/>
        <ellipse cx="592" cy="648" rx="38" ry="32" fill="#F3E6CF" ${st}/>
        <ellipse id="f05-for" cx="708" cy="648" rx="38" ry="32" fill="#F3E6CF" ${st}/>
        <g id="f05-memb" opacity="0"><ellipse cx="708" cy="652" rx="32" ry="24" fill="${MINT}" opacity="0.45"/></g>
        <circle cx="510" cy="585" r="34" fill="${bone}" ${st}/><circle cx="790" cy="585" r="34" fill="${bone}" ${st}/>
        <path d="M790 600 L830 870" stroke="${bone}" stroke-width="44" stroke-linecap="round"/>
        <path d="M510 600 L470 870" stroke="${bone}" stroke-width="44" stroke-linecap="round"/>
        ${[0, 1, 2, 3, 4].map(vert).join("")}
        <!-- canal (a porta) -->
        <g id="f05-door" opacity="0"><circle cx="714" cy="630" r="20" fill="none" stroke="${C.pain}" stroke-width="7"/></g>
        <path id="f05-nerve" d="${path}" fill="none" stroke="${MINT}" stroke-width="13" stroke-linecap="round" opacity="0"/>
        <g id="f05-fan" opacity="0"><path d="M730 724 L700 744 M742 760 L716 790 M752 790 L790 776 M760 820 L736 842" stroke="${MINT}" stroke-width="7" stroke-linecap="round"/></g>
        <g id="f05-root" opacity="0">${[214, 266, 318].map((y) => `<circle cx="694" cy="${y}" r="12" fill="${MINT}" stroke="${C.ink}" stroke-width="4"/><path d="M694 ${y} Q726 ${y + 20} 744 ${y + 40}" stroke="${MINT}" stroke-width="9" fill="none" stroke-linecap="round"/>`).join("")}</g>
      </g>
    </svg>
    <div id="f05-panel" class="abs"></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f05-t-wrap" opacity="0">${turao("f05t", [[1450, 340], [1460, 430], [1445, 520], [1465, 610], [1450, 700], [1470, 780]], 34, 1.35)}</g>
      <g id="f05-v-wrap" opacity="0">${nervinho("f05nv", [[1680, 520], [1690, 580], [1680, 640], [1695, 700], [1685, 760]])}</g>
      <g id="f05-db" opacity="0"><g transform="translate(1560,330)"><g id="f05-db-in"><rect x="-50" y="-8" width="100" height="16" rx="6" fill="#666" stroke="${C.ink}" stroke-width="5"/><rect x="-66" y="-30" width="22" height="60" rx="6" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><rect x="44" y="-30" width="22" height="60" rx="6" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></g></g></g>
    </svg>
    <div id="f05-t" class="abs title">Conheça o <span>TURÃO</span></div>
    <div id="f05-name" class="abs card label" style="opacity:0">nervo obturatório</div>
    <div id="f05-lL2" class="f05-lab" style="left:470px;top:190px;opacity:0">L2</div>
    <div id="f05-lL3" class="f05-lab" style="left:470px;top:242px;opacity:0">L3</div>
    <div id="f05-lL4" class="f05-lab" style="left:470px;top:294px;opacity:0">L4</div>
    <div id="f05-lCan" class="f05-lab" style="left:850px;top:600px;opacity:0;color:${C.pain}">canal obturatório (a portinha)</div>
    <div id="f05-lBur" class="f05-lab" style="left:300px;top:720px;opacity:0">buraco do osso (forame obturado)</div>
    <div id="f05-lCox" class="f05-lab" style="left:850px;top:770px;opacity:0;background:${MINT}">parte de DENTRO da coxa</div>
    <div id="f05-tag" class="f05-lab" style="left:1350px;top:200px;opacity:0;background:${MINT}">TURÃO</div>
    <div id="f05-tag2" class="f05-lab" style="left:1610px;top:420px;opacity:0;background:#B79CF2">NERVINHO</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-t", 0, 0.4, -30);
        R.pop(tl, "#f05-name", K.tur, 0.4);
        tl.fromTo("#f05-anat", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.1);
        tl.fromTo("#f05-panel", { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.3);
        // Turão aparece no painel
        tl.set("#f05-t-wrap", { opacity: 1 }, K.tur - 0.2);
        tl.fromTo("#f05-t-wrap", { y: 500 }, { y: 0, duration: 0.45, ease: "back.out(1.4)" }, K.tur - 0.2);
        R.pop(tl, "#f05-tag", K.tur + 0.2, 0.35);
        R.face(tl, "f05t", K.tur, { eyes: "happy", mouth: "grin" });
        R.blinks(tl, "f05t", K.tur + 0.5, K.dur, "happy");
        // raízes L2, L3, L4
        tl.to("#f05-v1, #f05-v2, #f05-v3", { x: 10, duration: 0.12, yoyo: true, repeat: 3 }, K.nasce);
        R.pop(tl, "#f05-lL2", K.l2 - 0.05, 0.35);
        R.pop(tl, "#f05-lL3", K.l3 - 0.05, 0.35);
        R.pop(tl, "#f05-lL4", K.l4 - 0.05, 0.35);
        R.fadeIn(tl, "#f05-root", K.l2, 0.3);
        // desce pela pelve e passa pela portinha
        tl.set("#f05-nerve", { opacity: 1 }, K.desce);
        R.draw(tl, "#f05-nerve", K.desce, K.dep - K.desce + 0.6, "none");
        R.pop(tl, "#f05-door", K.tunel - 0.1, 0.4);
        R.pop(tl, "#f05-lCan", K.canal, 0.4);
        tl.to("#f05-door", { scale: 1.3, svgOrigin: "714 630", duration: 0.2, yoyo: true, repeat: 3 }, K.topo);
        R.fadeIn(tl, "#f05-memb", K.bur, 0.4);
        R.pop(tl, "#f05-lBur", K.bur + 0.1, 0.4);
        R.face(tl, "f05t", K.tunel, { eyes: "wide", mouth: "flat" });
        tl.to("#f05t-face", { y: -14, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.canal);
        // parte de dentro da coxa
        R.fadeIn(tl, "#f05-fan", K.dep + 0.2, 0.3);
        tl.to("#f05-patch", { opacity: 0.75, duration: 0.5 }, K.dentro - 0.2);
        R.pop(tl, "#f05-lCox", K.dentro, 0.4);
        R.face(tl, "f05t", K.dep, { eyes: "happy", mouth: "smile" });
        // Nervinho apresenta o primo
        tl.set("#f05-v-wrap", { opacity: 1 }, K.n0 - 0.7);
        tl.fromTo("#f05-v-wrap", { y: 380 }, { y: 0, duration: 0.4, ease: "back.out(2)" }, K.n0 - 0.7);
        R.pop(tl, "#f05-tag2", K.n0 - 0.4, 0.35);
        R.face(tl, "f05nv", K.n0 - 0.5, { eyes: "happy" });
        tl.to("#f05nv-face", { rotation: -12, svgOrigin: "0 0", duration: 0.15, yoyo: true, repeat: 3 }, K.primo);
        // "Ele malha": halter
        R.pop(tl, "#f05-db", K.malha - 0.1, 0.35);
        tl.to("#f05-db-in", { y: -26, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.malha + 0.2);
        R.face(tl, "f05t", K.malha, { eyes: "closed", mouth: "grin" });
        tl.to("#f05t-face", { scale: 1.15, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 3 }, K.malha + 0.1);
      },
      sfx: [
        { name: "whoosh-short", t: k.tur - 0.2, vol: 0.4 },
        { name: "pop", t: k.l2, vol: 0.3 },
        { name: "pop", t: k.l3, vol: 0.3 },
        { name: "pop", t: k.l4, vol: 0.3 },
        { name: "pop", t: k.canal, vol: 0.4 },
        { name: "sparkle", t: k.dentro, vol: 0.35 },
        { name: "whoosh-short", t: k.n0 - 0.7, vol: 0.4 },
        { name: "pop", t: k.malha - 0.1, vol: 0.4 },
      ],
    };
  },
};
