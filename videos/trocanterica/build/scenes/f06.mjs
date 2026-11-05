// F6 — Plot twist no tribunal: Bursinha no banco dos réus, prova de ultrassom, o tendão é o principal; Bursinha "coadjuvante"
export default {
  speakers: { bursinha: "f06b" },
  build(ctx) {
    const { C, human, bursinha, glutinho, w, lines } = ctx;
    const k = {
      plot: w(0, "plot"), ultra: w(0, "ultrassom"), resso: w(0, "ressonância"), maio: w(0, "maioria"), tend: w(0, "tendões"),
      tendi: w(0, "tendinopatia"), bursa: w(0, "bursa"), infl: w(0, "inflamar"), coad: w(0, "coadjuvante"),
      b0: lines[1].start, b1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    return {
      k,
      css: `
        #f06-title { left:90px; top:60px; font-size:56px; }
        #f06-title span { color:#8E6CD8; }
        #f06-acc { left:120px; top:250px; padding:10px 20px; font-size:30px; color:${C.pain}; }
        #f06-tendi { left:1170px; top:540px; padding:12px 22px; font-size:34px; color:#B9473E; }
        #f06-coad { left:150px; top:740px; padding:10px 20px; font-size:30px; color:#2C8FB8; transform: rotate(-4deg); }
        #f06-stamp { left:110px; top:320px; padding:10px 26px; font-size:58px; color:${C.good}; border:8px solid ${C.good}; border-radius:16px; background:rgba(255,255,255,0.9); transform: rotate(-10deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="#EADBC8"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${i * 290 - 20}" y="0" width="30" height="880" fill="#DCC9B2"/>`).join("")}
      <rect y="880" width="1920" height="200" fill="#B58A5A"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- juiz: Dr. Pablo atrás da mesa -->
      <g transform="translate(960,640) scale(1.15)">${human("f06p", "pablo")}</g>
      <rect x="760" y="560" width="400" height="320" rx="16" fill="#8B5A2B" ${st}/>
      <rect x="800" y="600" width="320" height="60" rx="10" fill="#A9733F" stroke="${C.ink}" stroke-width="5"/>
      <text x="960" y="642" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="#fff">JUIZ</text>
      <g id="f06-gavel"><g transform="translate(1110,540)"><g id="f06-gavel-in"><rect x="-6" y="-10" width="12" height="80" rx="6" fill="#6B3E1F" stroke="${C.ink}" stroke-width="5"/><rect x="-40" y="-36" width="80" height="34" rx="10" fill="#8B5A2B" ${st}/></g></g></g>
      <!-- banco dos réus -->
      <rect x="120" y="640" width="440" height="240" rx="14" fill="#8B5A2B" ${st}/>
      <text x="340" y="700" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="#fff">BANCO DOS RÉUS</text>
      <g id="f06-b-wrap"><g transform="translate(340,650) scale(1.05)">${bursinha("f06b")}</g></g>
      <!-- prova: ultrassom -->
      <g id="f06-us" opacity="0">
        <rect x="1240" y="150" width="560" height="380" rx="24" fill="#2B3A44" ${st}/>
        <rect x="1270" y="180" width="500" height="290" rx="12" fill="#0F1A20"/>
        <path d="M1520 190 L1290 460 L1750 460 Z" fill="#1E2B33"/>
        <path d="M1340 430 Q1520 360 1720 430" stroke="#9AA7AD" stroke-width="10" fill="none"/>
        <path id="f06-tendonUS" d="M1360 360 Q1520 300 1700 350" stroke="#C9D3D8" stroke-width="22" fill="none" stroke-linecap="round"/>
        <ellipse cx="1560" cy="395" rx="40" ry="12" fill="#2C4A5A"/>
        <text x="1520" y="510" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="#fff">PROVA Nº 1: ULTRASSOM</text>
      </g>
      <g id="f06-circle" opacity="0"><ellipse cx="1520" cy="330" rx="140" ry="60" fill="none" stroke="${C.pain}" stroke-width="9"/></g>
      <g id="f06-g-wrap" opacity="0"><g transform="translate(1700,860) scale(0.88)">${glutinho("f06g")}</g></g>
    </svg>
    <div id="f06-title" class="abs title" style="opacity:0">PLOT TWIST no <span>tribunal</span></div>
    <div id="f06-acc" class="abs card label" style="opacity:0">Acusação: <b>BURSITE</b></div>
    <div id="f06-tendi" class="abs card title" style="opacity:0">TENDINOPATIA DOS GLÚTEOS</div>
    <div id="f06-coad" class="abs card label" style="opacity:0">pode inflamar junto... mas é <b>COADJUVANTE</b></div>
    <div id="f06-stamp" class="abs title" style="opacity:0">QUASE INOCENTE</div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f06-title", 0.1, 0.7, -200);
        const p = "f06p";
        R.setPose(tl, p, 0, { shF: -40, elF: -60, shB: -30, elB: -60 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, p, 0.4, K.dur);
        R.face(tl, "f06b", 0, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f06-acc", K.plot, 0.4);
        R.shake(tl, "#f06b-body", K.plot + 0.3, 0.4, 3);
        // prova de ultrassom
        R.pop(tl, "#f06-us", K.ultra - 0.1, 0.45);
        R.pose(tl, p, K.ultra, 0.3, { shF: -120, elF: -20 }, "back.out(2)");
        tl.to("#f06-us", { scale: 1.04, svgOrigin: "1520 340", duration: 0.2, yoyo: true, repeat: 1 }, K.resso);
        // o tendão é o principal
        tl.set("#f06-circle", { opacity: 1 }, K.tend);
        tl.fromTo("#f06-circle", { scale: 0.3, svgOrigin: "1520 330" }, { scale: 1, duration: 0.35, ease: "back.out(2)" }, K.tend);
        tl.to("#f06-tendonUS", { attr: { stroke: "#E0675A" }, duration: 0.4 }, K.tend + 0.2);
        tl.fromTo("#f06-g-wrap", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.tendi - 0.3);
        R.face(tl, "f06g", K.tendi - 0.3, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f06-tendi", K.tendi, 0.4);
        R.pose(tl, "f06g", K.tendi + 0.2, 0.3, { armF: -150 }, "back.out(2)");
        R.fadeOut(tl, "#f06-acc", K.tendi);
        // bursa coadjuvante
        R.face(tl, p, K.bursa, { eyes: "normal", mouth: "smile" });
        R.pose(tl, p, K.bursa, 0.3, { shF: -70, elF: -40 });
        R.pop(tl, "#f06-coad", K.coad - 0.2, 0.4);
        R.face(tl, "f06b", K.infl, { eyes: "normal", mouth: "flat" });
        // martelo e carimbo: quase inocente
        tl.to("#f06-gavel-in", { rotation: -50, svgOrigin: "0 60", duration: 0.2, ease: "power2.out" }, K.b0 - 0.6);
        tl.to("#f06-gavel-in", { rotation: 10, svgOrigin: "0 60", duration: 0.12, ease: "power4.in" }, K.b0 - 0.35);
        tl.fromTo("#f06-stamp", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power4.in" }, K.b0 - 0.25);
        R.face(tl, "f06b", K.b0, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f06b", K.b0, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f06-b-wrap", { y: -50, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 3 }, K.b0);
        R.face(tl, p, K.b0, { eyes: "happy" });
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.plot, vol: 0.35 },
        { name: "pop", t: k.ultra - 0.1, vol: 0.4 },
        { name: "ping", t: k.tend, vol: 0.35 },
        { name: "pop", t: k.tendi, vol: 0.4 },
        { name: "pop", t: k.coad - 0.2, vol: 0.3 },
        { name: "impact-bass-2", t: k.b0 - 0.33, vol: 0.5 },
      ],
    };
  },
};
