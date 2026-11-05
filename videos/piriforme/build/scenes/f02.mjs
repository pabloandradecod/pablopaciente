// F2 — Gancho: Seu Zé virou motorista de app; carteira no bolso; desce do carro e trava; Piriforme abraça o nervo
export default {
  speakers: { piriforme: "f02m", nervo: "f02n" },
  build(ctx) {
    const { C, human, nerve, piriforme, smooth, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const nPts = [[1160, 470], [1240, 470], [1330, 470], [1420, 470], [1510, 470], [1600, 470], [1700, 470]];
    const nSq = [[1160, 470], [1240, 470], [1330, 478], [1420, 488], [1510, 478], [1600, 470], [1700, 470]];
    const k = {
      lembra: w(0, "Lembra"), melh: w(0, "melhorou"), mexer: w(0, "mexer"), mot: w(0, "motorista"), dez: w(0, "Dez"), cart: w(0, "carteira"),
      desce: w(0, "desce"), ai: w(0, "AI"), nad: w(0, "nádega"),
      m0: L1.start, m1: L1.end, n0: L2.start, n1: L2.end, p3: L3.start, cia: w(3, "ciatalgia"), outra: w(3, "outra"), inv: w(3, "investigar"),
      sq: smooth(nSq),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f02-ep { left:120px; top:110px; padding:14px 26px; font-size:34px; transform: rotate(-4deg); }
        #f02-clock-l { left:1370px; top:250px; font-size:44px; color:${C.pain}; }
        #f02-q { left:0; right:0; top:80px; text-align:center; font-size:92px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <g fill="#fff" stroke="${C.ink}" stroke-width="6" opacity="0.9"><ellipse cx="300" cy="200" rx="110" ry="40"/><ellipse cx="1600" cy="150" rx="130" ry="44"/></g>
      <g id="f02-city">${[[60, 380], [260, 300], [460, 420], [1420, 330], [1640, 400], [1820, 300]].map(([x, h], i) => `<rect x="${x}" y="${880 - h}" width="170" height="${h}" fill="${i % 2 ? "#9CC9D3" : "#B5D9E0"}" stroke="${C.ink}" stroke-width="6"/>`).join("")}</g>
      <rect y="880" width="1920" height="200" fill="#8E9AA0"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g stroke="#fff" stroke-width="12">${[100, 500, 900, 1300, 1700].map((x) => `<line x1="${x}" y1="980" x2="${x + 160}" y2="980"/>`).join("")}</g>
      <g transform="translate(900,640) scale(1.3)">${human("f02z", "ze")}</g>
      <!-- carro (na frente do Seu Zé) -->
      <g id="f02-car">
        <path d="M560 520 L640 300 Q660 250 720 250 L1140 250 Q1200 250 1230 300 L1330 500 L1330 800 L560 800 Z" fill="none" ${st}/>
        <path d="M600 440 L650 300 Q665 270 720 270 L1130 270 Q1180 270 1205 310 L1270 440 Z" fill="#CFEFF7" opacity="0.35"/>
        <path d="M470 560 Q470 520 520 520 L1360 520 Q1430 520 1440 580 L1450 760 Q1450 800 1410 800 L500 800 Q470 800 470 770 Z" fill="${C.sun}" ${st}/>
        <path d="M580 520 L640 300 Q660 250 720 250 L1140 250 Q1200 250 1230 300 L1300 520" fill="none" stroke="${C.sun}" stroke-width="26" stroke-linejoin="round"/>
        <path d="M580 520 L640 300 Q660 250 720 250 L1140 250 Q1200 250 1230 300 L1300 520" fill="none" ${st}/>
        <line x1="960" y1="250" x2="960" y2="520" stroke="${C.sun}" stroke-width="22"/><line x1="960" y1="250" x2="960" y2="520" ${st} fill="none"/>
        <rect x="830" y="210" width="200" height="44" rx="12" fill="${C.ink}"/><text x="930" y="241" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="#fff">APP</text>
        <rect x="1080" y="560" width="70" height="16" rx="8" fill="${C.ink}"/>
        <circle cx="1415" cy="600" r="22" fill="#fff" ${st}/>
        <g><circle cx="680" cy="810" r="70" fill="#333" ${st}/><circle cx="680" cy="810" r="28" fill="#ccc" stroke="${C.ink}" stroke-width="6"/></g>
        <g><circle cx="1250" cy="810" r="70" fill="#333" ${st}/><circle cx="1250" cy="810" r="28" fill="#ccc" stroke="${C.ink}" stroke-width="6"/></g>
      </g>
      <!-- relógio -->
      <g id="f02-clock" opacity="0"><circle cx="1500" cy="190" r="90" fill="#fff" ${st}/><g id="f02-hand"><line x1="1500" y1="190" x2="1500" y2="122" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/></g><line x1="1500" y1="190" x2="1548" y2="190" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><circle cx="1500" cy="190" r="10" fill="${C.ink}"/></g>
      <!-- raio-x do bolso -->
      <g id="f02-xray" opacity="0">
        <circle cx="430" cy="430" r="190" fill="#1B3440" stroke="${C.ink}" stroke-width="9"/>
        <path d="M300 340 Q430 300 560 340 L540 560 Q430 600 320 560 Z" fill="#3E6A80" stroke="#BFE6EE" stroke-width="5"/>
        <g id="f02-wallet"><rect x="350" y="400" width="160" height="110" rx="16" fill="#8B5A2B" stroke="#FFE7A3" stroke-width="6"/><rect x="362" y="420" width="136" height="16" fill="#3DD9A4" opacity="0.8"/><rect x="362" y="444" width="136" height="12" fill="#FFC94A" opacity="0.8"/></g>
        <path d="M330 380 L300 350 M530 380 L560 350 M330 535 L300 565 M530 535 L560 565" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/>
        <text x="430" y="610" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="#fff">CARTEIRA GORDA</text>
      </g>
      <g id="f02-glow" opacity="0"><circle cx="868" cy="610" r="46" fill="${C.pain}" opacity="0.45"/><circle cx="868" cy="610" r="22" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- bolha: Piriforme abraçando o nervo -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1430" cy="470" r="300"/></clipPath>
        <circle cx="1430" cy="470" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1110" y="160" width="660" height="640" fill="#FFE4DC"/>
          <g transform="translate(1430,600) scale(1.05)">${piriforme("f02m")}</g>
          <g>${nerve("f02n", nPts, 38)}</g>
          <g id="f02-hug"><path d="M1340 455 Q1430 545 1520 455" fill="none" stroke="${C.ink}" stroke-width="44" stroke-linecap="round"/><path d="M1340 455 Q1430 545 1520 455" fill="none" stroke="#F2766B" stroke-width="30" stroke-linecap="round"/><circle cx="1340" cy="455" r="17" fill="#F2766B" stroke="${C.ink}" stroke-width="6"/><circle cx="1520" cy="455" r="17" fill="#F2766B" stroke="${C.ink}" stroke-width="6"/></g>
        </g>
        <path d="M1180 690 L1060 790 L1220 730" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-ep" class="abs card label" style="opacity:0">No episódio anterior: <span style="color:${C.good}">CIATALGIA</span></div>
    <div id="f02-clock-l" class="abs title" style="opacity:0">10 HORAS!</div>
    <div id="f02-q" class="abs title" style="opacity:0">Ciatalgia <span>de novo?</span></div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        // em pé, feliz, no começo
        R.setPose(tl, z, 0, { hipB: 0, hipF: 0, knB: 0, knF: 0, shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f02-car", { x: 1500 }, 0);
        R.pop(tl, "#f02-ep", K.lembra, 0.4);
        // dancinha: "voltou a se mexer"
        for (let i = 0; i < 4; i++) R.pose(tl, z, K.melh + i * 0.35, 0.3, { shF: i % 2 ? -150 : -40, elF: i % 2 ? -20 : -80, hipF: i % 2 ? -25 : 0, knF: i % 2 ? 30 : 0, torso: i % 2 ? 6 : -6 }, "back.out(2)");
        R.fadeOut(tl, "#f02-ep", K.mot - 0.5);
        // carro chega e ele está sentado ao volante
        tl.to("#f02-car", { x: 0, duration: 0.7, ease: "back.out(1.2)" }, K.mot - 0.3);
        R.pose(tl, z, K.mot - 0.1, 0.3, { hipB: -88, hipF: -92, knB: 88, knF: 92, torso: -4, shF: -70, elF: -50, shB: -60, elB: -50 });
        R.face(tl, z, K.mot + 0.3, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, K.mot, K.ai);
        // 10 horas
        R.pop(tl, "#f02-clock", K.dez - 0.1, 0.4);
        R.pop(tl, "#f02-clock-l", K.dez + 0.3, 0.4);
        tl.to("#f02-hand", { rotation: 1440, svgOrigin: "1500 190", duration: 2.2, ease: "power1.inOut" }, K.dez);
        R.face(tl, z, K.dez + 1.2, { eyes: "closed", mouth: "flat" });
        // raio-x da carteira
        R.pop(tl, "#f02-xray", K.cart - 0.2, 0.45);
        tl.fromTo("#f02-wallet", { scaleY: 0.6, transformOrigin: "50% 50%" }, { scaleY: 1.15, duration: 0.5, ease: "back.out(3)" }, K.cart + 0.4);
        R.fadeOut(tl, "#f02-xray, #f02-clock, #f02-clock-l", K.desce - 0.5);
        // desce do carro: o carro vai embora e ele fica em pé
        R.pose(tl, z, K.desce, 0.4, { hipB: 0, hipF: 0, knB: 0, knF: 0, torso: 0, shF: -10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, z, K.desce, { eyes: "normal", mouth: "smile" });
        tl.to("#f02-car", { x: -1700, duration: 0.8, ease: "power2.in" }, K.desce + 0.2);
        // AI!
        R.face(tl, z, K.ai, { eyes: "wide", mouth: "scream" });
        R.pose(tl, z, K.ai, 0.15, { torso: 14, shB: 40, elB: -60, shF: -140, elF: -30, hipB: 10 }, "power4.out");
        R.shake(tl, "#f02z-root", K.ai, 0.6, 6);
        tl.set("#f02-glow", { opacity: 1 }, K.ai);
        tl.fromTo("#f02-glow", { scale: 0.6, svgOrigin: "868 610" }, { scale: 1.25, duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.ai);
        R.face(tl, z, K.nad + 0.4, { eyes: "pain", mouth: "frown" });
        // bolha: Piriforme abraça, Nervo reclama
        R.pop(tl, "#f02-bubble", K.m0 - 0.5, 0.45, 0.3);
        R.face(tl, "f02m", K.m0 - 0.5, { eyes: "happy" });
        R.face(tl, "f02n", K.m0 - 0.5, { eyes: "wide" });
        tl.set("#f02m-armF, #f02m-armB", { opacity: 0 }, 0);
        tl.fromTo("#f02-hug", { scaleY: 0.2, svgOrigin: "1430 450" }, { scaleY: 1, duration: 0.3, ease: "back.out(2)" }, K.m0 - 0.1);
        R.nerveTo(tl, "f02n", K.m0 + 0.2, 0.3, K.sq);
        R.squash(tl, "#f02m-body", K.m0 + 0.3);
        R.face(tl, "f02n", K.n0 - 0.1, { eyes: "pain" });
        R.shake(tl, "#f02n-face", K.n0, K.n1 - K.n0, 5);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1430 470", duration: 0.3, ease: "back.in(2)" }, K.n1 + 0.15);
        tl.to("#f02-glow", { opacity: 0, duration: 0.3 }, K.n1 + 0.15);
        // E agora?
        R.face(tl, z, K.p3, { eyes: "wide", mouth: "flat" });
        R.pose(tl, z, K.p3, 0.5, { torso: 0, shB: 30, elB: -70, shF: -60, elF: -110, neck: 8 });
        R.drop(tl, "#f02-q", K.cia - 0.3, 0.8, -300);
        R.pose(tl, z, K.outra, 0.4, { neck: -10, shF: -150, elF: -20 }, "back.out(2)");
        R.face(tl, z, K.inv, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, K.p3, K.dur);
      },
      sfx: [
        { name: "pop", t: k.lembra, vol: 0.4 },
        { name: "whoosh", t: k.mot - 0.3, vol: 0.5 },
        { name: "pop", t: k.dez, vol: 0.4 },
        { name: "typing", t: k.dez, vol: 0.25, dur: 1.5 },
        { name: "pop", t: k.cart + 0.4, vol: 0.4 },
        { name: "whoosh-short", t: k.desce + 0.2, vol: 0.5 },
        { name: "glitch-1", t: k.ai - 0.02, vol: 0.45 },
        { name: "impact-bass-2", t: k.ai, vol: 0.45 },
        { name: "whoosh-short", t: k.m0 - 0.5, vol: 0.45 },
        { name: "pop", t: k.m0 + 0.3, vol: 0.4 },
        { name: "impact-bass-1", t: k.cia + 0.1, vol: 0.4 },
      ],
    };
  },
};
