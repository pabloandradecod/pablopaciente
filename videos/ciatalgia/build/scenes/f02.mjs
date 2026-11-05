// F2 — Gancho: Seu Zé calçando o sapato, o choque, o nervo espremido, congelado
export default {
  speakers: { nervo: "f02n" },
  build(ctx) {
    const { C, human, nerve, smooth, w, lines } = ctx;
    const L0 = lines[0], L1 = lines[1], L2 = lines[2];
    // caminho da dor (coordenadas da tela), com Seu Zé sentado: quadril (760,640)
    const bolt = "M742 600 L770 640 L752 652 L830 660 L812 676 L888 672 L870 700 L900 720 L876 744 L898 770 L930 790";
    const dots = [[750, 610], [800, 655], [880, 668], [885, 735], [935, 792]];
    const nervePts = [[1215, 430], [1290, 430], [1360, 432], [1440, 436], [1520, 430], [1600, 428], [1680, 430]];
    const squeezed = [[1215, 430], [1290, 430], [1360, 440], [1440, 452], [1520, 440], [1600, 428], [1680, 430]];
    const k = {
        bend: w(0, "calçar"), zas: w(0, "ZÁS"), dots: [w(0, "saiu"), w(0, "lombar"), w(0, "nádega"), w(0, "perna"), w(0, "pé")],
        n0: L1.start, n1: L1.end, l2: L2.start, cong: w(2, "congelado"), esp: w(2, "espirrar"), desce: w(2, "DESCE"), fica: w(2, "fica"), ent: w(2, "entender"),
        sq: smooth(squeezed), sq0: smooth(nervePts),
    };
    return {
      k,
      css: `
        #f02-q { left:0; right:0; top:70px; text-align:center; font-size:96px; color:${C.ink}; }
        #f02-q span { color:${C.pain}; }
        #f02-ice { left:300px; top:430px; font-size:64px; color:#3A9BD5; transform: rotate(-8deg); }
        #f02-atchim { left:1120px; top:330px; width:330px; padding:18px 24px; font-size:46px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="820" fill="${C.wall}"/>
      <rect x="0" y="820" width="1920" height="260" fill="${C.floor}"/>
      <line x1="0" y1="820" x2="1920" y2="820" stroke="${C.ink}" stroke-width="7"/>
      <g id="f02-window"><rect x="150" y="140" width="250" height="230" rx="16" fill="${C.sky}" stroke="${C.ink}" stroke-width="7"/><line x1="275" y1="140" x2="275" y2="370" stroke="${C.ink}" stroke-width="6"/><line x1="150" y1="255" x2="400" y2="255" stroke="${C.ink}" stroke-width="6"/><circle cx="345" cy="195" r="26" fill="${C.sun}"/></g>
      <!-- cama -->
      <g id="f02-bed">
        <rect x="380" y="560" width="40" height="270" rx="10" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
        <rect x="420" y="650" width="440" height="70" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect x="420" y="712" width="440" height="40" rx="10" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
        <rect x="830" y="740" width="26" height="90" rx="8" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
        <rect x="440" y="600" width="130" height="60" rx="26" fill="${C.sky}" stroke="${C.ink}" stroke-width="7"/>
      </g>
      <!-- outro sapato no chão -->
      <path d="M1000 812 Q996 790 1012 788 L1052 786 Q1084 788 1086 812 Z" fill="#4A2E1A" stroke="${C.ink}" stroke-width="6"/>
      <g transform="translate(760,640) scale(1.4)">${human("f02z", "ze")}</g>
      <g id="f02-glow" opacity="0"><path d="${bolt}" fill="none" stroke="${C.pain}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/></g>
      <path id="f02-bolt" d="${bolt}" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      ${dots.map(([x, y], i) => `<circle id="f02-dot${i}" cx="${x}" cy="${y}" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5" opacity="0"/>`).join("")}
      <g id="f02-snow" opacity="0">${[[600, 420], [990, 470], [700, 300], [1010, 640]].map(([x, y]) => `<g transform="translate(${x},${y})"><path d="M0 -30 L0 30 M-26 -15 L26 15 M-26 15 L26 -15" stroke="#3A9BD5" stroke-width="8" stroke-linecap="round"/></g>`).join("")}</g>
      <g id="f02-arrow" opacity="0"><path d="M1060 520 L1060 700" stroke="${C.pain}" stroke-width="26" stroke-linecap="round"/><path d="M1010 680 L1060 750 L1110 680" fill="none" stroke="${C.pain}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/></g>
      <!-- bolha "dentro da perna" -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1450" cy="430" r="280"/></clipPath>
        <circle cx="1450" cy="430" r="292" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1150" y="140" width="600" height="600" fill="#FFE4DC"/>
          <g id="f02-n-wrap">${nerve("f02n", nervePts, 40)}</g>
          <g id="f02-top"><rect x="1330" y="250" width="240" height="140" rx="30" fill="${C.bone}" stroke="${C.ink}" stroke-width="8"/><ellipse cx="1450" cy="392" rx="120" ry="22" fill="#9CD3E6" stroke="${C.ink}" stroke-width="7"/></g>
          <g id="f02-bot"><rect x="1330" y="478" width="240" height="140" rx="30" fill="${C.bone}" stroke="${C.ink}" stroke-width="8"/></g>
        </g>
        <path d="M1240 650 L1150 760 L1290 690" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-ice" class="abs title" style="opacity:0">CONGELADO!</div>
    <div id="f02-atchim" class="abs card label" style="opacity:0">a-a-atchim...? NÃO!</div>
    <div id="f02-q" class="abs title" style="opacity:0">Por que dói na <span>PERNA</span>?</div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        // sentado na beira da cama
        R.setPose(tl, z, 0, { hipB: -88, hipF: -92, knB: 88, knF: 92, anB: 0, anF: 0, shB: -15, shF: -25, elB: -40, elF: -35, torso: -4, neck: 0 });
        R.blinks(tl, z, 0, K.zas);
        R.idle(tl, z, 0, K.bend, 2);
        // curva para calçar o sapato
        R.pose(tl, z, K.bend, 0.7, { torso: 48, neck: -20, shF: -40, elF: -10, shB: -30, elB: -5 });
        R.face(tl, z, K.bend, { mouth: "flat" });
        // ZÁS!
        R.face(tl, z, K.zas, { eyes: "wide", mouth: "scream" });
        R.pose(tl, z, K.zas, 0.12, { torso: 30, neck: -40, shF: -150, elF: -40, shB: -130, elB: -30 }, "power4.out");
        R.shake(tl, "#f02z-root", K.zas, 0.7, 6);
        tl.set("#f02-bolt", { opacity: 1 }, K.zas);
        R.draw(tl, "#f02-bolt", K.zas, 0.35, "power1.in");
        tl.fromTo("#f02-glow", { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 }, K.zas);
        K.dots.forEach((t, i) => R.pop(tl, `#f02-dot${i}`, t, 0.35));
        tl.to("#f02-bolt", { opacity: 0.35, duration: 0.4 }, K.dots[4] + 0.6);
        // dentro da perna: o nervo espremido
        R.pop(tl, "#f02-bubble", K.n0 - 0.5, 0.45, 0.3);
        R.face(tl, "f02n", K.n0 - 0.5, { eyes: "pain" });
        tl.fromTo("#f02-top", { y: -60 }, { y: 0, duration: 0.25, ease: "power3.in" }, K.n0 - 0.2);
        tl.fromTo("#f02-bot", { y: 60 }, { y: 0, duration: 0.25, ease: "power3.in" }, K.n0 - 0.2);
        R.nerveTo(tl, "f02n", K.n0 - 0.05, 0.2, K.sq);
        R.shake(tl, "#f02n-face", K.n0, K.n1 - K.n0, 5);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, transformOrigin: "1450px 430px", duration: 0.3, ease: "back.in(2)" }, K.n1 + 0.15);
        // congelado
        R.face(tl, z, K.l2, { eyes: "wide", mouth: "flat" });
        R.pose(tl, z, K.l2, 0.3, { torso: 40, neck: -10, shF: -60, elF: -20, shB: -50, elB: -10 });
        tl.fromTo("#f02-snow", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, K.cong);
        R.pop(tl, "#f02-ice", K.cong, 0.4);
        R.pop(tl, "#f02-atchim", K.esp - 0.1, 0.4);
        R.shake(tl, "#f02-atchim", K.esp + 0.5, 0.4, 5);
        R.fadeOut(tl, "#f02-atchim, #f02-ice", K.desce - 0.3);
        tl.to("#f02-snow", { opacity: 0, duration: 0.3 }, K.desce - 0.3);
        // DESCE pela perna
        tl.set("#f02-arrow", { opacity: 1 }, K.desce);
        tl.fromTo("#f02-arrow", { y: -80 }, { y: 0, duration: 0.45, ease: "bounce.out" }, K.desce);
        R.face(tl, z, K.fica, { eyes: "normal", mouth: "frown" });
        R.pose(tl, z, K.fica, 0.6, { torso: 10, neck: 10, shF: -20, elF: -60, shB: -10, elB: -30 });
        R.blinks(tl, z, K.fica, K.dur);
        R.drop(tl, "#f02-q", K.ent - 0.6, 0.8, -300);
        R.fadeOut(tl, "#f02-arrow", K.ent - 0.6);
      },
      sfx: [
        { name: "glitch-1", t: k.zas - 0.02, vol: 0.5 },
        { name: "impact-bass-2", t: k.zas, vol: 0.5 },
        ...k.dots.map((t) => ({ name: "pop", t, vol: 0.35 })),
        { name: "whoosh-short", t: k.n0 - 0.5, vol: 0.5 },
        { name: "sparkle", t: k.cong, vol: 0.45 },
        { name: "whoosh", t: k.desce, vol: 0.4 },
        { name: "impact-bass-1", t: k.ent - 0.6 + 0.35, vol: 0.45 },
      ],
    };
  },
};
