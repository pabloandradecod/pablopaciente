// F5 — Conheça o Molão (tendão patelar) e o Patelito (patela): joelho de lado, chute, e a mola no salto
export default {
  speakers: { patelito: "f05p" },
  build(ctx) {
    const { C, molao, patelito, w, lines } = ctx;
    const k = {
      con: w(0, "Conheça"), mol: w(0, "Molão"), liga: w(0, "liga"), ponta: w(0, "ponta"), pat: w(0, "Patelito"), tib: w(0, "tíbia"),
      forca: w(0, "força"), musc: w(0, "músculo"), saltos: w(0, "saltos"), mola: w(0, "mola"), guarda: w(0, "guarda"), dev: w(0, "devolve"),
      p0: lines[1].start, p1: lines[1].end, esc: w(1, "escudo"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const tag = (id, x, y, txt, col) => `<g id="${id}" opacity="0"><rect x="${x}" y="${y}" width="${txt.length * 15 + 34}" height="44" rx="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/><text x="${x + 17}" y="${y + 30}" font-family="Nunito" font-weight="900" font-size="24" fill="${col || C.ink}">${txt}</text></g>`;
    return {
      k,
      css: `
        #f05-h { left:110px; top:70px; font-size:60px; }
        #f05-h span { color:#C9A15A; }
        #f05-mola { left:1080px; top:150px; padding:12px 24px; font-size:36px; }
        #f05-g { left:1060px; top:380px; padding:10px 20px; font-size:30px; color:#3E7FD8; }
        #f05-d { left:1060px; top:450px; padding:10px 20px; font-size:30px; color:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="80" y="170" width="860" height="690" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
      <text x="120" y="215" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}" opacity="0.6">joelho visto de lado</text>
      <!-- fêmur -->
      <rect x="420" y="240" width="90" height="330" rx="40" fill="${C.bone}" ${st}/>
      <ellipse cx="465" cy="580" rx="66" ry="42" fill="${C.bone}" ${st}/>
      <!-- quadríceps -->
      <g id="f05-quad"><path d="M512 250 Q585 300 590 420 Q588 500 560 540 L520 540 Q530 420 506 270 Z" fill="#E0675A" ${st}/>
        <path d="M530 300 Q560 400 545 520" stroke="#B9473E" stroke-width="5" fill="none"/></g>
      <!-- perna (tíbia + patela + tendão) que gira no joelho -->
      <g id="f05-leg">
        <rect x="430" y="620" width="74" height="230" rx="34" fill="${C.bone}" ${st}/>
        <ellipse cx="500" cy="660" rx="22" ry="16" fill="${C.bone}" ${st}/>
        <path id="f05-tendon" d="M578 600 Q560 640 512 660" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round"/>
        <path d="M578 600 Q560 640 512 660" fill="none" stroke="#F2E8D8" stroke-width="22" stroke-linecap="round"/>
        <ellipse id="f05-pat" cx="582" cy="568" rx="26" ry="42" fill="${C.bone}" ${st}/>
      </g>
      <path id="f05-force" d="M550 270 Q590 420 580 540 Q570 620 512 660" fill="none" stroke="${C.sun}" stroke-width="12" stroke-linecap="round" stroke-dasharray="20 18" opacity="0"/>
      ${tag("f05-t1", 620, 310, "QUADRÍCEPS", C.pain)}
      ${tag("f05-t2", 640, 520, "PATELA = Patelito")}
      ${tag("f05-t3", 620, 640, "TENDÃO PATELAR = Molão", "#9A7A3A")}
      ${tag("f05-t4", 560, 770, "TÍBIA")}
      <!-- personagens -->
      <g id="f05-m-wrap" opacity="0"><g transform="translate(1290,850) scale(0.95)">${molao("f05m")}</g></g>
      <g id="f05-p-wrap" opacity="0"><g transform="translate(1640,840) scale(1.05)">${patelito("f05p")}</g></g>
      <g id="f05-shield" opacity="0"><path d="M1790 470 L1840 490 L1836 560 Q1820 600 1790 616 Q1760 600 1744 560 L1740 490 Z" fill="${C.sky}" ${st}/></g>
      <g id="f05-arD" opacity="0"><path d="M1460 560 L1460 680" stroke="#3E7FD8" stroke-width="16" stroke-linecap="round"/><path d="M1430 650 L1460 690 L1490 650" fill="none" stroke="#3E7FD8" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g id="f05-arU" opacity="0"><path d="M1460 690 L1460 570" stroke="${C.good}" stroke-width="16" stroke-linecap="round"/><path d="M1430 600 L1460 560 L1490 600" fill="none" stroke="${C.good}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
    </svg>
    <div id="f05-h" class="abs title" style="opacity:0">Conheça o <span>MOLÃO</span></div>
    <div id="f05-mola" class="abs card title" style="opacity:0">nos saltos: uma MOLA</div>
    <div id="f05-g" class="abs card label" style="opacity:0">desce: GUARDA energia</div>
    <div id="f05-d" class="abs card label" style="opacity:0">sobe: DEVOLVE energia</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-h", 0.2, 0.5);
        // Molão entra
        tl.set("#f05-m-wrap", { opacity: 1 }, K.mol - 0.2);
        tl.fromTo("#f05-m-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.mol - 0.2);
        R.face(tl, "f05m", 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f05m", K.mol, K.dur);
        R.pose(tl, "f05m", K.mol + 0.3, 0.3, { armF: -130, armB: 40 }, "back.out(2)");
        R.pose(tl, "f05m", K.liga + 0.4, 0.3, { armF: 0, armB: 0 });
        // tags no diagrama
        R.pop(tl, "#f05-t3", K.liga - 0.1, 0.35);
        tl.fromTo("#f05-tendon", { opacity: 0.3 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3 }, K.liga);
        R.pop(tl, "#f05-t2", K.ponta, 0.35);
        tl.fromTo("#f05-pat", { scale: 1 }, { scale: 1.2, svgOrigin: "582 568", duration: 0.2, yoyo: true, repeat: 1 }, K.ponta + 0.1);
        // Patelito entra
        tl.set("#f05-p-wrap", { opacity: 1 }, K.pat - 0.2);
        tl.fromTo("#f05-p-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.pat - 0.2);
        R.face(tl, "f05p", 0, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f05-t4", K.tib - 0.1, 0.35);
        // força do quadríceps passa pelo tendão: a perna chuta
        R.pop(tl, "#f05-t1", K.forca - 0.3, 0.35);
        tl.set("#f05-force", { opacity: 1 }, K.forca);
        tl.fromTo("#f05-force", { attr: { "stroke-dashoffset": 0 } }, { attr: { "stroke-dashoffset": -152 }, duration: 1.4, ease: "none" }, K.forca);
        tl.fromTo("#f05-quad", { scaleY: 1 }, { scaleY: 0.9, svgOrigin: "540 250", duration: 0.3, ease: "power2.out" }, K.musc);
        tl.to("#f05-leg", { rotation: -55, svgOrigin: "470 600", duration: 0.35, ease: "back.out(1.6)" }, K.musc + 0.1);
        tl.to("#f05-leg", { rotation: 0, svgOrigin: "470 600", duration: 0.5, ease: "power2.inOut" }, K.musc + 1.0);
        tl.to("#f05-quad", { scaleY: 1, svgOrigin: "540 250", duration: 0.4 }, K.musc + 1.0);
        tl.to("#f05-force", { opacity: 0, duration: 0.3 }, K.saltos - 0.2);
        // a mola: guarda e devolve
        R.pop(tl, "#f05-mola", K.saltos - 0.1, 0.4);
        R.face(tl, "f05m", K.mola, { eyes: "happy", mouth: "grin" });
        for (let i = 0; i < 3; i++) {
          const t = K.guarda - 0.2 + i * 1.0;
          tl.to("#f05m-coil", { scaleY: 0.6, transformOrigin: "50% 100%", duration: 0.35, ease: "power2.in" }, t);
          tl.to("#f05m-top", { y: 84, duration: 0.35, ease: "power2.in" }, t);
          tl.to("#f05m-coil", { scaleY: 1.12, transformOrigin: "50% 100%", duration: 0.25, ease: "power3.out" }, t + 0.4);
          tl.to("#f05m-top", { y: -25, duration: 0.25, ease: "power3.out" }, t + 0.4);
          tl.to("#f05m-coil", { scaleY: 1, transformOrigin: "50% 100%", duration: 0.25, ease: "power2.inOut" }, t + 0.7);
          tl.to("#f05m-top", { y: 0, duration: 0.25, ease: "power2.inOut" }, t + 0.7);
        }
        tl.set("#f05-arD", { opacity: 1 }, K.guarda - 0.2); R.pop(tl, "#f05-g", K.guarda - 0.1, 0.35);
        tl.set("#f05-arU", { opacity: 1 }, K.dev); R.pop(tl, "#f05-d", K.dev - 0.1, 0.35);
        // Patelito: "sou o escudo do joelho"
        R.face(tl, "f05p", K.p0 - 0.1, { eyes: "normal" });
        R.pose(tl, "f05p", K.p0, 0.3, { armF: -150, armB: 30 }, "back.out(2)");
        R.pop(tl, "#f05-shield", K.esc - 0.1, 0.4);
        R.squash(tl, "#f05p-body", K.esc + 0.2);
        R.face(tl, "f05p", K.esc + 0.3, { eyes: "happy" });
      },
      sfx: [
        { name: "whoosh-short", t: k.mol - 0.2, vol: 0.4 },
        { name: "pop", t: k.liga - 0.1, vol: 0.3 },
        { name: "pop", t: k.pat - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.musc + 0.1, vol: 0.4 },
        { name: "pop", t: k.saltos - 0.1, vol: 0.35 },
        { name: "pop", t: k.guarda + 0.2, vol: 0.3 }, { name: "pop", t: k.guarda + 1.2, vol: 0.3 }, { name: "pop", t: k.guarda + 2.2, vol: 0.3 },
        { name: "sparkle", t: k.esc - 0.1, vol: 0.35 },
      ],
    };
  },
};
