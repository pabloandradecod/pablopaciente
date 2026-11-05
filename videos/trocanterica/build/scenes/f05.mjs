// F5 — O bairro do trocânter: o ossinho lateral, os tendões (Glutinho), a bursa (Bursinha) e a banda iliotibial (Dona Faixa)
export default {
  speakers: { bursinha: "f05b" },
  build(ctx) {
    const { C, human, glutinho, bursinha, faixa, w, lines } = ctx;
    const k = {
      oss: w(0, "ossinho"), lat: w(0, "lateral"), troc: w(0, "trocânter"), tend: w(0, "tendões"), glut: w(0, "Glutinho"),
      burs: w(0, "bursas"), almo: w(0, "almofadinhas"), bursi: w(0, "Bursinha"), fx: w(0, "faixa"), banda: w(0, "banda"), dona: w(0, "Faixa", 1),
      b0: lines[1].start, b1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const lab = (id, x, y, txt, col = C.ink) => `<div id="${id}" class="abs card label f05-lab" style="left:${x}px;top:${y}px;color:${col};opacity:0">${txt}</div>`;
    return {
      k,
      css: `
        #root .f05-lab { padding:8px 18px; font-size:28px; border-width:5px; border-radius:16px; box-shadow:5px 5px 0 ${C.ink}; }
        #f05-title { left:90px; top:70px; font-size:56px; }
        #f05-title span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="380" cy="560" r="290" fill="${C.wall}"/>
      <g transform="translate(380,640) scale(1.3)">${human("f05c", "cida")}</g>
      <g id="f05-dot" opacity="0"><circle cx="404" cy="652" r="36" fill="${C.sun}" opacity="0.45"/><circle cx="404" cy="652" r="16" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/></g>
      <path id="f05-zline" d="M430 640 L780 360" stroke="${C.ink}" stroke-width="5" stroke-dasharray="14 10" fill="none" opacity="0"/>
      <!-- painel de zoom -->
      <g id="f05-panel" opacity="0">
        <rect x="780" y="150" width="1060" height="700" rx="36" fill="#fff" ${st}/>
        <clipPath id="f05-clip"><rect x="784" y="154" width="1052" height="692" rx="32"/></clipPath>
        <g clip-path="url(#f05-clip)">
          <rect x="784" y="154" width="1052" height="692" fill="#FFF0EA"/>
          <g transform="translate(40,140)">
          <!-- fêmur com o trocânter maior -->
          <g id="f05-bone">
            <path d="M900 330 Q860 300 880 260 Q910 230 950 250 Q990 270 1000 300 L1060 340" fill="${C.bone}" ${st}/>
            <path d="M1010 320 Q1020 250 1100 240 Q1190 236 1210 300 Q1226 360 1180 400 L1170 860 L1040 860 L1040 420 Q990 380 1010 320Z" fill="${C.bone}" ${st}/>
            <path d="M1060 520 Q1080 600 1066 760" stroke="#E6D9BE" stroke-width="6" fill="none"/>
          </g>
          <g id="f05-glow" opacity="0"><circle cx="1150" cy="300" r="70" fill="${C.sun}" opacity="0.4"/></g>
          <!-- tendões dos glúteos -->
          <g id="f05-tendon" opacity="0">
            <path d="M880 170 Q1000 160 1120 230 L1180 270 L1150 300 Q1040 250 900 240Z" fill="#E0675A" ${st}/>
            <path d="M920 190 Q1020 200 1110 250 M930 220 Q1030 225 1130 275" stroke="#B9473E" stroke-width="5" fill="none"/>
            <path d="M1120 230 L1196 268 L1206 296 L1150 300 Z" fill="#F2E8D8" ${st}/>
          </g>
          <!-- bursa -->
          <g id="f05-bursa" opacity="0"><ellipse cx="1214" cy="340" rx="30" ry="58" fill="#BFE8F7" ${st}/><path d="M1204 304 Q1210 296 1220 298" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>
          <!-- banda iliotibial -->
          <g id="f05-band" opacity="0"><path d="M1250 170 Q1270 300 1250 420 L1240 860 L1290 860 L1300 420 Q1320 300 1300 170 Z" fill="#8FA7C2" ${st} opacity="0.92"/><path d="M1262 200 L1258 840 M1288 200 L1284 840" stroke="#6E86A3" stroke-width="4" stroke-dasharray="14 10"/></g>
          </g>
          <!-- personagens -->
          <g id="f05-g-wrap" opacity="0"><g transform="translate(1440,820) scale(0.62)">${glutinho("f05g")}</g></g>
          <g id="f05-b-wrap" opacity="0"><g transform="translate(1590,820) scale(0.62)">${bursinha("f05b")}</g></g>
          <g id="f05-f-wrap" opacity="0"><g transform="translate(1740,820) scale(0.6)">${faixa("f05f")}</g></g>
        </g>
      </g>
    </svg>
    <div id="f05-title" class="abs title" style="opacity:0">O bairro do <span>trocânter</span></div>
    ${lab("f05-l-oss", 470, 600, "o ossinho do lado do quadril")}
    ${lab("f05-l-troc", 1360, 300, "TROCÂNTER MAIOR", C.pain)}
    ${lab("f05-l-tend", 1360, 230, "tendões dos glúteos médio e mínimo", "#B9473E")}
    ${lab("f05-l-burs", 1360, 370, "bursa = almofadinha de líquido", "#2C8FB8")}
    ${lab("f05-l-band", 1360, 440, "banda iliotibial (faixa grossa)", "#4F6886")}`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-title", 0.2, 0.5);
        const c = "f05c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        // a mão aponta o ossinho
        R.pose(tl, c, K.oss - 0.3, 0.4, { shF: 20, elF: -70 });
        tl.set("#f05-dot", { opacity: 1 }, K.oss);
        tl.fromTo("#f05-dot", { scale: 0.5, svgOrigin: "404 652" }, { scale: 1.25, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.oss);
        R.pop(tl, "#f05-l-oss", K.lat, 0.35);
        // zoom
        tl.set("#f05-zline", { opacity: 1 }, K.troc - 0.4);
        R.draw(tl, "#f05-zline", K.troc - 0.4, 0.35);
        R.pop(tl, "#f05-panel", K.troc - 0.2, 0.45, 0.6);
        R.fadeOut(tl, "#f05-l-oss", K.troc);
        tl.set("#f05-glow", { opacity: 1 }, K.troc + 0.2);
        tl.fromTo("#f05-glow", { scale: 0.7, svgOrigin: "1190 440" }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 3 }, K.troc + 0.2);
        R.pop(tl, "#f05-l-troc", K.troc + 0.3, 0.35);
        // tendões / Glutinho
        tl.fromTo("#f05-tendon", { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.tend - 0.1);
        R.pop(tl, "#f05-l-tend", K.tend + 0.3, 0.35);
        R.pop(tl, "#f05-g-wrap", K.glut - 0.1, 0.4);
        R.face(tl, "f05g", K.glut, { eyes: "happy", mouth: "smile" });
        R.pose(tl, "f05g", K.glut, 0.3, { armF: -140 }, "back.out(2)");
        R.pose(tl, "f05g", K.glut + 1.0, 0.3, { armF: 0 });
        // bursa / Bursinha
        R.pop(tl, "#f05-bursa", K.burs, 0.4);
        R.pop(tl, "#f05-l-burs", K.almo, 0.35);
        R.pop(tl, "#f05-b-wrap", K.bursi - 0.1, 0.4);
        R.face(tl, "f05b", K.bursi, { eyes: "happy", mouth: "smile" });
        // banda / Dona Faixa
        tl.fromTo("#f05-band", { opacity: 0, y: -500 }, { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out" }, K.fx);
        R.pop(tl, "#f05-l-band", K.banda, 0.35);
        R.pop(tl, "#f05-f-wrap", K.dona - 0.1, 0.4);
        R.face(tl, "f05f", K.dona, { eyes: "normal", mouth: "grin" });
        R.pose(tl, "f05f", K.dona + 0.1, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        // fala da Bursinha
        tl.to("#f05-b-wrap", { y: -40, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 3 }, K.b0);
        R.pose(tl, "f05b", K.b0, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f05g", K.b0, { eyes: "normal", mouth: "flat" });
        R.face(tl, c, K.b0, { eyes: "happy" });
      },
      sfx: [
        { name: "pop", t: k.oss, vol: 0.35 },
        { name: "whoosh", t: k.troc - 0.3, vol: 0.4 },
        { name: "whoosh-short", t: k.tend - 0.1, vol: 0.35 },
        { name: "pop", t: k.glut - 0.1, vol: 0.35 },
        { name: "pop", t: k.burs, vol: 0.35 },
        { name: "pop", t: k.bursi - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.fx + 0.3, vol: 0.35 },
        { name: "pop", t: k.dona - 0.1, vol: 0.35 },
      ],
    };
  },
};
