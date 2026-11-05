// F5 — Conheça o Nervinho: de L2-L3, pela pelve, ao lado da ponta do quadril, sob o ligamento inguinal, até a pele da coxa lateral
export default {
  speakers: { nervo: "f05n" },
  build(ctx) {
    const { C, nerve, nervinho, w, lines, LILAC } = ctx;
    const k = {
      con: w(0, "Conheça"), nasce: w(0, "nasce"), l2: w(0, "L2"), l3: w(0, "L3"), desce: w(0, "desce"), pelve: w(0, "pelve"),
      ponta: w(0, "ponta"), lig: w(0, "ligamento"), virilha: w(0, "virilha"), espalha: w(0, "espalha"), lat: w(0, "lateral", 1),
      n0: lines[1].start, n1: lines[1].end, primo: w(1, "primo"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const bone = C.bone;
    const vert = (i) => { const y = 140 + i * 52; return `<g id="f05-v${i}"><rect x="610" y="${y}" width="80" height="42" rx="12" fill="${bone}" ${st}/><rect x="606" y="${y + 42}" width="88" height="10" rx="5" fill="#9CD3E6" stroke="${C.ink}" stroke-width="4"/></g>`; };
    // caminho anatômico (tela): raízes L2/L3 → fossa ilíaca → medial à EIAS → sob o ligamento → coxa lateral
    const path = "M694 236 Q740 260 780 300 Q850 370 878 460 Q890 505 902 540 Q912 600 914 680 Q912 760 902 850";
    return {
      k,
      css: `
        #f05-t { left:110px; top:60px; font-size:54px; }
        #f05-t span { color:#8E6CD8; }
        #f05-name { left:110px; top:130px; padding:10px 20px; font-size:30px; }
        .f05-lab { position:absolute; padding:6px 14px; font-size:26px; background:#fff; border:5px solid ${C.ink}; border-radius:14px; font-family:"Nunito"; font-weight:900; white-space:nowrap; }
        #f05-panel { left:1250px; top:150px; width:560px; height:660px; border-radius:30px; background:#FFF3C9; border:7px solid ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f05-anat">
        <!-- coxas (contorno da pele) -->
        <path d="M410 560 Q380 720 430 870 L560 870 Q560 720 600 620 Z" fill="#F7D9C2" ${st}/>
        <path id="f05-thighR" d="M890 560 Q930 720 880 870 L750 870 Q750 720 700 620 Z" fill="#F7D9C2" ${st}/>
        <path id="f05-patch" d="M886 610 Q930 700 900 820 Q880 840 868 820 Q890 720 862 630 Z" fill="${LILAC}" opacity="0"/>
        <!-- pelve -->
        <path d="M590 420 Q480 300 360 340 Q340 420 395 520 Q480 520 580 500 Z" fill="${bone}" ${st}/>
        <path d="M710 420 Q820 300 940 340 Q960 420 905 520 Q820 520 720 500 Z" fill="${bone}" ${st}/>
        <path d="M590 410 L710 410 L650 520 Z" fill="${bone}" ${st}/>
        <path d="M560 590 Q650 640 740 590 L740 620 Q650 670 560 620 Z" fill="${bone}" ${st}/>
        <circle cx="560" cy="600" r="44" fill="none" stroke="${C.ink}" stroke-width="5" opacity="0.5"/><circle cx="740" cy="600" r="44" fill="none" stroke="${C.ink}" stroke-width="5" opacity="0.5"/>
        <path d="M790 590 L830 870" stroke="${bone}" stroke-width="44" stroke-linecap="round"/><path d="M790 590 L830 870" stroke="${C.ink}" stroke-width="2" opacity="0"/>
        <path d="M510 590 L470 870" stroke="${bone}" stroke-width="44" stroke-linecap="round"/>
        <circle cx="790" cy="585" r="34" fill="${bone}" ${st}/><circle cx="510" cy="585" r="34" fill="${bone}" ${st}/>
        ${[0, 1, 2, 3, 4].map(vert).join("")}
        <!-- ponta do quadril (EIAS) -->
        <g id="f05-asis" opacity="0"><circle cx="905" cy="520" r="22" fill="none" stroke="${C.pain}" stroke-width="7"/><circle cx="905" cy="520" r="7" fill="${C.pain}"/></g>
        <!-- ligamento inguinal -->
        <path id="f05-lig" d="M905 525 Q820 585 742 612" fill="none" stroke="#E0A85A" stroke-width="16" stroke-linecap="round" opacity="0"/>
        <!-- o nervo -->
        <path id="f05-nerve" d="${path}" fill="none" stroke="${LILAC}" stroke-width="12" stroke-linecap="round" opacity="0"/>
        <g id="f05-fan" opacity="0"><path d="M912 690 L944 668 M912 740 L948 744 M906 800 L940 822 M912 690 L880 676 M906 780 L872 790" stroke="${LILAC}" stroke-width="7" stroke-linecap="round"/></g>
        <g id="f05-root" opacity="0"><circle cx="694" cy="236" r="12" fill="${LILAC}" stroke="${C.ink}" stroke-width="4"/><circle cx="694" cy="288" r="12" fill="${LILAC}" stroke="${C.ink}" stroke-width="4"/><path d="M694 236 Q720 250 740 270 M694 288 Q720 290 744 282" stroke="${LILAC}" stroke-width="9" fill="none" stroke-linecap="round"/></g>
      </g>
    </svg>
    <div id="f05-panel" class="abs"></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f05-n-wrap" opacity="0">${nerve("f05n", [[1420, 330], [1440, 420], [1430, 520], [1450, 620], [1440, 720], [1460, 790]], 40)}</g>
      <g id="f05-v-wrap" opacity="0">${nervinho("f05nv", [[1640, 520], [1650, 580], [1640, 640], [1655, 700], [1645, 760]])}</g>
      <g id="f05-heart" opacity="0"><path d="M1540 420 C1540 400 1510 395 1510 418 C1510 440 1540 455 1540 470 C1540 455 1570 440 1570 418 C1570 395 1540 400 1540 420Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></g>
    </svg>
    <div id="f05-t" class="abs title">Conheça o <span>NERVINHO</span></div>
    <div id="f05-name" class="abs card label" style="opacity:0">nervo cutâneo femoral lateral</div>
    <div id="f05-lL2" class="f05-lab" style="left:470px;top:212px;opacity:0">L2</div>
    <div id="f05-lL3" class="f05-lab" style="left:470px;top:266px;opacity:0">L3</div>
    <div id="f05-lPon" class="f05-lab" style="left:960px;top:470px;opacity:0;color:${C.pain}">ponta do osso do quadril</div>
    <div id="f05-lLig" class="f05-lab" style="left:560px;top:650px;opacity:0">ligamento da virilha</div>
    <div id="f05-lCox" class="f05-lab" style="left:960px;top:720px;opacity:0;background:${LILAC}">pele da lateral da coxa</div>
    <div id="f05-tag" class="f05-lab" style="left:1330px;top:180px;opacity:0;background:${C.sun}">NERVO CIÁTICO</div>
    <div id="f05-tag2" class="f05-lab" style="left:1560px;top:410px;opacity:0;background:${LILAC}">NERVINHO</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-t", 0, 0.4, -30);
        R.pop(tl, "#f05-name", K.con + 0.4, 0.4);
        tl.fromTo("#f05-anat", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.1);
        tl.fromTo("#f05-panel", { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.3);
        // raízes
        tl.to("#f05-v2, #f05-v3", { x: 10, duration: 0.12, yoyo: true, repeat: 3 }, K.nasce);
        R.pop(tl, "#f05-lL2", K.l2 - 0.05, 0.35);
        R.pop(tl, "#f05-lL3", K.l3 - 0.05, 0.35);
        R.fadeIn(tl, "#f05-root", K.l2, 0.3);
        // desce pela pelve até a coxa
        tl.set("#f05-nerve", { opacity: 1 }, K.desce);
        R.draw(tl, "#f05-nerve", K.desce, K.espalha - K.desce, "none");
        R.pop(tl, "#f05-asis", K.ponta - 0.1, 0.4);
        R.pop(tl, "#f05-lPon", K.ponta, 0.4);
        tl.set("#f05-lig", { opacity: 1 }, K.lig - 0.1);
        R.draw(tl, "#f05-lig", K.lig - 0.1, 0.5);
        R.pop(tl, "#f05-lLig", K.lig + 0.2, 0.4);
        // espalha na pele da lateral da coxa
        R.fadeIn(tl, "#f05-fan", K.espalha, 0.3);
        tl.to("#f05-patch", { opacity: 0.75, duration: 0.5 }, K.espalha + 0.2);
        R.pop(tl, "#f05-lCox", K.lat, 0.4);
        // painel: o Ciático apresenta o primo
        tl.set("#f05-n-wrap", { opacity: 1 }, K.n0 - 0.7);
        tl.fromTo("#f05-n-wrap", { y: 500 }, { y: 0, duration: 0.45, ease: "back.out(1.4)" }, K.n0 - 0.7);
        R.pop(tl, "#f05-tag", K.n0 - 0.4, 0.35);
        R.face(tl, "f05n", K.n0 - 0.5, { eyes: "happy" });
        tl.set("#f05-v-wrap", { opacity: 1 }, K.con + 0.6);
        tl.fromTo("#f05-v-wrap", { y: 380 }, { y: 0, duration: 0.4, ease: "back.out(2)" }, K.con + 0.6);
        R.pop(tl, "#f05-tag2", K.con + 0.9, 0.35);
        R.face(tl, "f05nv", K.con + 0.9, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f05nv", K.con + 1, K.dur);
        tl.to("#f05nv-face", { y: -14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.desce);
        R.face(tl, "f05nv", K.ponta, { eyes: "wide", mouth: "flat" });
        R.face(tl, "f05nv", K.espalha, { eyes: "happy", mouth: "smile" });
        R.face(tl, "f05nv", K.primo, { eyes: "happy", mouth: "grin" });
        tl.to("#f05nv-face", { rotation: -12, svgOrigin: "0 0", duration: 0.15, yoyo: true, repeat: 3 }, K.primo + 0.3);
        R.pop(tl, "#f05-heart", K.n1 + 0.1, 0.35);
        tl.to("#f05-heart", { y: -40, opacity: 0, duration: 0.7 }, K.n1 + 0.6);
      },
      sfx: [
        { name: "pop", t: k.l2, vol: 0.35 },
        { name: "pop", t: k.l3, vol: 0.35 },
        { name: "pop", t: k.ponta, vol: 0.35 },
        { name: "sparkle", t: k.espalha, vol: 0.35 },
        { name: "whoosh-short", t: k.n0 - 0.7, vol: 0.4 },
        { name: "pop", t: k.primo - 0.3, vol: 0.4 },
      ],
    };
  },
};
