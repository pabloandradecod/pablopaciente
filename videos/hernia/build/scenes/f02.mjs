// F2 — Gancho: a Vértebra comemora "FINALMENTE!"; Seu Zé levanta a caixa do jeito errado; a Geleia foge e encosta no nervo
export default {
  speakers: { vertebra: "f02v", geleia: "f02g", nervo: "f02n" },
  build(ctx) {
    const { C, human, vertebra, nerve, disquinho, geleia, smooth, w, lines } = ctx;
    const L0 = lines[0], L1 = lines[1], L2 = lines[2], L3 = lines[3], L4 = lines[4];
    const nPts = [[1575, 320], [1575, 390], [1578, 460], [1575, 530], [1572, 600], [1575, 690]];
    const nBent = [[1575, 320], [1582, 390], [1610, 460], [1622, 530], [1590, 600], [1575, 690]];
    const k = {
      fin: w(0, "Finalmente"), dia: w(0, "dia"), v1: L0.end,
      p1: L1.start, venc: w(1, "venceu"), mud: w(1, "mudança"), dobr: w(1, "dobrou"), levan: w(1, "levantou"), gir: w(1, "girou"),
      toin: w(1, "TOIN"), lomb: w(1, "lombar"), perna: w(1, "perna", 1), pe: w(1, "pé", 2),
      g0: L2.start, g1: L2.end, n0: L3.start, n1: L3.end, p4: L4.start, hern: w(4, "hérnia"), ent: w(4, "entender"),
      bent: smooth(nBent),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const confCols = [C.pain, C.sun, C.good, "#8E6CD8", "#fff"];
    const conf = Array.from({ length: 36 }, (_, i) => `<rect id="f02-cf${i}" x="${(i * 157) % 1880 + 20}" y="-40" width="${14 + (i % 3) * 6}" height="${22 + (i % 2) * 8}" rx="3" fill="${confCols[i % 5]}" stroke="${C.ink}" stroke-width="3"/>`).join("");
    const dots = [[742, 600], [736, 680], [742, 760], [754, 840]];
    return {
      k,
      css: `
        #f02-ban { left:0; right:0; top:120px; text-align:center; }
        #f02-ban .b { display:inline-block; padding:22px 44px; font-size:76px; color:#fff; background:${C.pain}; border:8px solid ${C.ink}; border-radius:26px; box-shadow:10px 10px 0 ${C.ink}; transform: rotate(-3deg); }
        #f02-q { left:0; right:0; top:80px; text-align:center; font-size:90px; }
        #f02-q span { color:${C.pain}; }
        #f02-wrong { left:300px; top:230px; padding:12px 24px; font-size:36px; color:${C.pain}; }
      `,
      html: `
    <div id="f02-party" class="abs" style="inset:0;background:${C.ink}"></div>
    <svg id="f02-street" class="abs" width="1920" height="1080" viewBox="0 0 1920 1080" style="opacity:0">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <g fill="#fff" stroke="${C.ink}" stroke-width="6" opacity="0.9"><ellipse cx="300" cy="160" rx="110" ry="40"/></g>
      <rect x="80" y="420" width="420" height="460" fill="#F2D6B3" stroke="${C.ink}" stroke-width="7"/><rect x="230" y="680" width="120" height="200" fill="#B07A4A" stroke="${C.ink}" stroke-width="7"/>
      <rect x="130" y="480" width="110" height="110" fill="#CFEFF7" stroke="${C.ink}" stroke-width="6"/><rect x="340" y="480" width="110" height="110" fill="#CFEFF7" stroke="${C.ink}" stroke-width="6"/>
      <rect y="880" width="1920" height="200" fill="#9AA3A8"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- caminhão de mudança -->
      <g><rect x="1180" y="380" width="560" height="400" rx="20" fill="#fff" ${st}/><text x="1460" y="560" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="54" fill="${C.ink}">MUDANÇA</text>
      <rect x="1740" y="520" width="150" height="260" rx="20" fill="${C.sun}" ${st}/><rect x="1770" y="550" width="90" height="90" rx="10" fill="#CFEFF7" stroke="${C.ink}" stroke-width="6"/>
      <circle cx="1300" cy="800" r="60" fill="#333" ${st}/><circle cx="1780" cy="800" r="60" fill="#333" ${st}/>
      <rect x="1200" y="640" width="120" height="100" rx="8" fill="#C99A62" ${st}/><rect x="1330" y="660" width="100" height="80" rx="8" fill="#C99A62" ${st}/></g>
      <g transform="translate(760,640) scale(1.3)">${human("f02z", "ze")}</g>
      <g id="f02-box"><g transform="translate(980,760)"><rect x="-80" y="-60" width="160" height="120" rx="10" fill="#C99A62" ${st}/><path d="M-80 -20 L80 -20" stroke="${C.ink}" stroke-width="5"/><text x="0" y="30" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">LIVROS</text></g></g>
      <g id="f02-twist" opacity="0"><path d="M640 470 Q760 420 880 470" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/><path d="M860 450 L884 472 L854 482" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>
      <path id="f02-bolt" d="M740 590 L760 640 L728 660 L752 720 L724 740 L750 800 L730 820 L760 860" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      ${dots.map(([x, y], i) => `<circle id="f02-dot${i}" cx="${x}" cy="${y}" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5" opacity="0"/>`).join("")}
      <!-- bolha -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1450" cy="510" r="300"/></clipPath>
        <circle cx="1450" cy="510" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1140" y="200" width="620" height="620" fill="#FFE4DC"/>
          <rect x="1180" y="300" width="360" height="150" rx="34" fill="${C.bone}" ${st}/>
          <rect x="1180" y="600" width="360" height="150" rx="34" fill="${C.bone}" ${st}/>
          <g id="f02-d-wrap"><g transform="translate(1360,600) scale(0.95)">${disquinho("f02d")}</g></g>
          <g id="f02-g-wrap"><g transform="translate(1440,540) scale(0.6)">${geleia("f02g")}</g></g>
          <g>${nerve("f02n", nPts, 34, 0.9)}</g>
        </g>
        <path d="M1200 700 L1080 800 L1250 750" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080" id="f02-partysvg">
      ${conf}
      <g id="f02-v-wrap"><g transform="translate(960,860) scale(1.6)">${vertebra("f02v")}</g></g>
      <g id="f02-trophy"><g transform="translate(1230,560)"><path d="M-60 -120 L60 -120 L50 -40 Q0 10 -50 -40 Z" fill="${C.sun}" ${st}/><path d="M-60 -110 Q-110 -100 -80 -60 Q-70 -50 -54 -54 M60 -110 Q110 -100 80 -60 Q70 -50 54 -54" fill="none" stroke="${C.ink}" stroke-width="8"/><rect x="-14" y="-16" width="28" height="50" fill="${C.sun}" ${st}/><rect x="-50" y="30" width="100" height="30" rx="6" fill="${C.ink}"/></g></g>
    </svg>
    <div id="f02-ban" class="abs title" style="opacity:0"><span class="b">FINALMENTE: HÉRNIA DE DISCO!</span></div>
    <div id="f02-wrong" class="abs card label" style="opacity:0">pernas esticadas + tronco torcendo = <b>ERRADO</b></div>
    <div id="f02-q" class="abs title" style="opacity:0">Será que é <span>HÉRNIA</span>?</div>`,
      js: function (tl, K, R) {
        // festa da Vértebra
        for (let i = 0; i < 36; i++) tl.fromTo(`#f02-cf${i}`, { y: -60 - (i % 5) * 80, rotation: 0 }, { y: 1200, rotation: (i % 2 ? 1 : -1) * 540, svgOrigin: `${(i * 157) % 1880 + 27} -30`, duration: 3.2 + (i % 4) * 0.4, ease: "none" }, 0.1 + (i % 6) * 0.15);
        R.drop(tl, "#f02-ban", 0.2, 0.8, -300);
        tl.fromTo("#f02-v-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.1);
        R.face(tl, "f02v", 0, { eyes: "happy" });
        R.pose(tl, "f02v", 0.5, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        for (let i = 0; i < 3; i++) {
          tl.to("#f02-v-wrap", { y: -90, duration: 0.22, ease: "power2.out" }, K.fin + 0.2 + i * 0.6);
          tl.to("#f02-v-wrap", { y: 0, duration: 0.22, ease: "power2.in" }, K.fin + 0.42 + i * 0.6);
        }
        R.pop(tl, "#f02-trophy", K.dia - 0.2, 0.45);
        // corte para a mudança
        tl.to("#f02-party, #f02-partysvg, #f02-ban", { opacity: 0, duration: 0.3 }, K.venc + 0.3);
        tl.to("#f02-street", { opacity: 1, duration: 0.3 }, K.venc + 0.3);
        const z = "f02z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, K.venc, K.toin);
        // dobrou de pernas esticadas
        R.pose(tl, z, K.dobr, 0.6, { torso: 82, neck: -30, shF: -10, elF: 0, shB: -10, elB: 0 });
        R.pop(tl, "#f02-wrong", K.dobr + 0.3, 0.4);
        // levanta a caixa
        R.pose(tl, z, K.levan + 0.2, 0.6, { torso: 10, neck: 0, shF: -70, elF: -60, shB: -60, elB: -60 });
        tl.to("#f02-box", { x: -40, y: -170, duration: 0.6, ease: "power2.inOut" }, K.levan + 0.2);
        R.face(tl, z, K.levan + 0.2, { eyes: "wide", mouth: "flat" });
        // gira o tronco
        R.pop(tl, "#f02-twist", K.gir, 0.3);
        tl.to("#f02-box", { x: 160, y: -190, duration: 0.5, ease: "power2.inOut" }, K.gir + 0.1);
        R.pose(tl, z, K.gir + 0.1, 0.5, { torso: 22, neck: 10 });
        // TOIN!
        R.face(tl, z, K.toin, { eyes: "wide", mouth: "scream" });
        tl.to("#f02-box", { y: 0, x: 160, duration: 0.35, ease: "bounce.out" }, K.toin);
        R.pose(tl, z, K.toin, 0.15, { torso: 30, shB: 40, elB: -70, shF: -140, elF: -20 }, "power4.out");
        R.shake(tl, "#f02z-root", K.toin, 0.6, 6);
        R.fadeOut(tl, "#f02-twist, #f02-wrong", K.toin);
        tl.set("#f02-bolt", { opacity: 1 }, K.toin + 0.1);
        R.draw(tl, "#f02-bolt", K.toin + 0.1, 0.4, "power1.in");
        [K.lomb, K.perna, K.perna + 0.4, K.pe].forEach((t, i) => R.pop(tl, `#f02-dot${i}`, t, 0.3));
        R.face(tl, z, K.pe + 0.3, { eyes: "pain", mouth: "frown" });
        // bolha: a Geleia foge e encosta no nervo
        R.pop(tl, "#f02-bubble", K.g0 - 0.5, 0.45, 0.3);
        R.face(tl, "f02d", K.g0 - 0.5, { eyes: "pain", mouth: "flat" });
        tl.fromTo("#f02-d-wrap", { scaleY: 1 }, { scaleY: 0.82, svgOrigin: "1360 600", duration: 0.25, ease: "power2.in" }, K.g0 - 0.3);
        R.face(tl, "f02g", K.g0 - 0.5, { eyes: "happy" });
        tl.fromTo("#f02-g-wrap", { x: -90, y: 0 }, { x: 70, y: -10, duration: 0.6, ease: "back.out(1.5)" }, K.g0 - 0.2);
        R.squash(tl, "#f02g-body", K.g0 + 0.4);
        R.pose(tl, "f02g", K.g0, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.nerveTo(tl, "f02n", K.n0 - 0.2, 0.25, K.bent);
        R.face(tl, "f02n", K.n0 - 0.2, { eyes: "wide" });
        R.shake(tl, "#f02n-face", K.n0, K.n1 - K.n0, 4);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1450 510", duration: 0.3, ease: "back.in(2)" }, K.n1 + 0.15);
        // será que é hérnia?
        R.face(tl, z, K.p4, { eyes: "wide", mouth: "flat" });
        R.pose(tl, z, K.p4, 0.5, { torso: 8, shB: 30, elB: -70, shF: -60, elF: -100 });
        R.drop(tl, "#f02-q", K.hern - 0.4, 0.8, -300);
        R.face(tl, z, K.ent, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "sparkle", t: 0.2, vol: 0.45 },
        { name: "impact-bass-1", t: 0.85, vol: 0.4 },
        { name: "pop", t: k.dia - 0.2, vol: 0.45 },
        { name: "whoosh", t: k.venc + 0.3, vol: 0.45 },
        { name: "pop", t: k.dobr + 0.3, vol: 0.35 },
        { name: "whoosh-short", t: k.gir + 0.1, vol: 0.35 },
        { name: "glitch-1", t: k.toin, vol: 0.4 },
        { name: "impact-bass-2", t: k.toin + 0.05, vol: 0.45 },
        { name: "whoosh-short", t: k.g0 - 0.5, vol: 0.45 },
        { name: "pop", t: k.g0 + 0.4, vol: 0.4 },
        { name: "impact-bass-1", t: k.hern - 0.1, vol: 0.35 },
      ],
    };
  },
};
