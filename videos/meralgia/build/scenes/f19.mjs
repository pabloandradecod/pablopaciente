// F19 — Cuidado 1: liberta o Nervinho! Afrouxa o cinto, calça folgada, suspensório; o Cintão é demitido
export default {
  speakers: { cintao: "f19c" },
  tail: 1.2,
  build(ctx) {
    const { C, human, nervinho, cintao, smooth, w, lines, LILAC } = ctx;
    const L1 = lines[1];
    const k = {
      um: w(0, "Um"), lib: w(0, "liberta"), afr: w(0, "Afrouxa"), cin: w(0, "cinto"), cal: w(0, "calça"), just: w(0, "justa"),
      ferr: w(0, "ferramentas"), dist: w(0, "distribui"), susp: w(0, "suspensório"), c0: L1.start, c1: L1.end,
      relax: smooth([[1395, 560], [1450, 520], [1505, 480], [1560, 440], [1620, 400], [1690, 360]]),
    };
    const sq = [[1395, 560], [1450, 524], [1505, 490], [1560, 452], [1620, 404], [1690, 360]];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, icon, text) => `<div id="${id}" class="f19-item label" style="opacity:0">
        <svg width="62" height="62" viewBox="-31 -31 62 62" style="flex:none">${icon}</svg><span>${text}</span></div>`;
    return {
      k,
      css: `
        #f19-title { left:90px; top:60px; font-size:72px; }
        #f19-title span { color:#8E6CD8; }
        #f19-list { left:760px; top:200px; width:560px; padding:22px 26px; }
        #root .f19-item { display:flex; align-items:center; gap:14px; font-size:31px; line-height:1.12; margin:12px 0; }
        #f19-sign { left:1440px; top:40px; width:420px; padding:12px 18px; font-size:26px; line-height:1.15; background:${C.pain}; color:#fff; text-align:center; border-radius:20px; border:6px solid ${C.ink}; box-shadow:6px 6px 0 ${C.ink}; }
        #f19-fired { left:1280px; top:610px; font-size:46px; color:${C.pain}; transform: rotate(-6deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(470,640) scale(1.3)">${human("f19z", "ze")}</g>
      <!-- cinto na cintura -->
      <g id="f19-belt"><rect x="410" y="618" width="138" height="26" rx="8" fill="#6B3E1F" stroke="${C.ink}" stroke-width="5"/>
        <g id="f19-buckle"><rect x="488" y="612" width="36" height="38" rx="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/></g></g>
      <!-- suspensório -->
      <g id="f19-susp" opacity="0">
        <path d="M440 448 L436 630" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/>
        <path d="M498 444 L512 630" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="436" cy="626" r="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/><circle cx="512" cy="626" r="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
      </g>
      <!-- bolha: Nervinho livre -->
      <g id="f19-bubble" opacity="0">
        <clipPath id="f19-clip"><circle cx="1540" cy="460" r="230"/></clipPath>
        <circle cx="1540" cy="460" r="240" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
        <g clip-path="url(#f19-clip)">
          <rect x="1300" y="220" width="480" height="480" fill="#F1EAFF"/>
          <g>${nervinho("f19v", sq, 16, 1.4)}</g>
          <g id="f19-bc"><g transform="translate(1535,470) scale(0.62)">${cintao("f19b", 220)}</g></g>
        </g>
      </g>
      <!-- Cintão demitido, com a caixinha -->
      <g id="f19-exit" opacity="0"><g id="f19-walk">
        <g transform="translate(1560,720) scale(0.75)">${cintao("f19c", 170)}</g>
        <g id="f19-box" transform="translate(0,60)"><rect x="1490" y="740" width="140" height="96" rx="6" fill="#C98A4B" stroke="${C.ink}" stroke-width="6"/>
          <path d="M1490 740 L1470 716 M1630 740 L1650 716" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
          <path d="M1520 740 Q1514 700 1534 690 Q1544 712 1530 740" fill="${C.good}" stroke="${C.ink}" stroke-width="4"/>
          <rect x="1566" y="712" width="34" height="30" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="4"/></g>
      </g></g>
    </svg>
    <div id="f19-title" class="abs title" style="opacity:0">1. LIBERTA O <span>NERVINHO!</span></div>
    <div id="f19-sign" class="abs label">Formigou mais forte?<br>Diminui a amplitude</div>
    <div id="f19-list" class="abs card" style="opacity:0">
      ${item("f19-i0", `<rect x="-26" y="-10" width="52" height="20" rx="6" fill="#6B3E1F" ${st}/><rect x="-8" y="-14" width="16" height="28" rx="4" fill="${C.sun}" ${st}/><path d="M-26 -22 L-38 -22 M26 -22 L38 -22" stroke="${C.good}" stroke-width="6" stroke-linecap="round"/>`, "Afrouxa o cinto")}
      ${item("f19-i1", `<path d="M-18 -26 L18 -26 L22 26 L6 26 L0 -4 L-6 26 L-22 26 Z" fill="${C.blue}" ${st}/><path d="M-28 -28 L28 28" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>`, "Nada de calça<br>muito justa")}
      ${item("f19-i2", `<rect x="-28" y="-8" width="56" height="18" rx="5" fill="#6B3E1F" ${st}/><rect x="-22" y="8" width="12" height="18" fill="${C.grey}" ${st}/><rect x="8" y="8" width="14" height="14" fill="${C.grey}" ${st}/>`, "Cinto de ferramentas?<br>Distribui o peso")}
      ${item("f19-i3", `<path d="M-14 -28 L-12 26 M14 -28 L12 26" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/>`, "...ou usa suspensório")}
    </div>
    <div id="f19-fired" class="abs title" style="opacity:0">DEMITIDO!</div>`,
      js: function (tl, K, R) {
        const z = "f19z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "pain", mouth: "frown" });
        R.blinks(tl, z, 0.5, K.dur, "normal");
        R.drop(tl, "#f19-title", Math.max(0.05, K.um - 0.2), 0.7, -260);
        tl.fromTo("#f19-sign", { y: -160 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.3);
        // bolha com o Cintão apertando o Nervinho
        R.pop(tl, "#f19-bubble", K.lib - 0.2, 0.45, 0.3);
        R.face(tl, "f19v", 0, { eyes: "pain", mouth: "frown" });
        R.face(tl, "f19b", 0, { eyes: "normal", mouth: "grin" });
        R.slideIn(tl, "#f19-list", K.lib, 0.5, 200);
        // afrouxa o cinto: fivela abre, cinto cai um pouco, Cintão sai da bolha
        R.pop(tl, "#f19-i0", K.afr - 0.1, 0.4, 0.6);
        R.pose(tl, z, K.afr - 0.2, 0.3, { shF: -40, elF: -80 });
        tl.to("#f19-buckle", { rotation: -50, svgOrigin: "506 650", duration: 0.25, ease: "back.out(2)" }, K.cin);
        tl.to("#f19-belt", { y: 8, duration: 0.3, ease: "bounce.out" }, K.cin + 0.15);
        tl.to("#f19-bc", { y: -320, duration: 0.5, ease: "back.in(1.4)" }, K.cin + 0.1);
        R.nerveTo(tl, "f19v", K.cin + 0.4, 0.4, K.relax, "back.out(2)");
        R.face(tl, "f19v", K.cin + 0.4, { eyes: "happy", mouth: "grin" });
        R.face(tl, z, K.cin + 0.4, { eyes: "happy", mouth: "smile" });
        R.pose(tl, z, K.cin + 0.6, 0.3, { shF: -10, elF: -20 });
        // calça justa
        R.pop(tl, "#f19-i1", K.cal - 0.1, 0.4, 0.6);
        // ferramentas / suspensório
        R.pop(tl, "#f19-i2", K.ferr - 0.1, 0.4, 0.6);
        R.pop(tl, "#f19-i3", K.susp - 0.3, 0.4, 0.6);
        tl.set("#f19-susp", { opacity: 1 }, K.susp);
        tl.fromTo("#f19-susp path", { scaleY: 0, svgOrigin: "475 446" }, { scaleY: 1, svgOrigin: "475 446", duration: 0.35, ease: "back.out(2)", stagger: 0.08 }, K.susp);
        R.pose(tl, z, K.susp + 0.3, 0.3, { shF: -95, elF: -70 }, "back.out(2)");
        R.face(tl, z, K.susp + 0.3, { eyes: "happy", mouth: "grin" });
        // Cintão demitido sai de cena
        tl.to("#f19-bubble", { scale: 0, opacity: 0, svgOrigin: "1540 460", duration: 0.3, ease: "back.in(2)" }, K.c0 - 0.6);
        tl.set("#f19-exit", { opacity: 1 }, K.c0 - 0.35);
        tl.fromTo("#f19-walk", { y: 300 }, { y: 0, duration: 0.35, ease: "power2.out" }, K.c0 - 0.35);
        R.face(tl, "f19c", K.c0 - 0.35, { eyes: "wide", mouth: "frown" });
        R.pop(tl, "#f19-fired", K.c0, 0.35);
        R.face(tl, "f19c", K.c1, { eyes: "closed", mouth: "frown" });
        for (let i = 0; i < 4; i++) tl.to("#f19-walk", { y: i % 2 ? 0 : -14, duration: 0.15, ease: "sine.inOut" }, K.c1 + 0.1 + i * 0.15);
        tl.to("#f19-walk", { x: 700, duration: 1.0, ease: "power1.in" }, K.c1 + 0.1);
        R.fadeOut(tl, "#f19-fired", K.c1 + 0.6, 0.3);
      },
      sfx: [
        { name: "pop", t: k.lib - 0.2, vol: 0.4 },
        { name: "click", t: k.cin, vol: 0.5 },
        { name: "whoosh-short", t: k.cin + 0.1, vol: 0.4 },
        { name: "sparkle", t: k.cin + 0.4, vol: 0.35 },
        { name: "pop", t: k.susp, vol: 0.4 },
        { name: "impact-bass-1", t: k.c0, vol: 0.4 },
        { name: "whoosh", t: k.c1 + 0.1, vol: 0.35 },
      ],
    };
  },
};
