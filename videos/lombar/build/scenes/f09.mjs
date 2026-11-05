// F9 — O Alarmildo: dor é um alarme de proteção; alarme de carro que dispara com uma folha; o que deixa o alarme sensível
export default {
  speakers: { alarmildo: "f09a" },
  build(ctx) {
    const { C, alarmildo, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      seg: w(0, "segredo"), alar: w(0, "alarme"), prot: w(0, "proteção"), sens: w(0, "sensível"), carro: w(0, "carro"), folha: w(0, "folha"),
      dorm: w(0, "Dormir"), estr: w(0, "estresse"), medo: w(0, "medo"), par: w(0, "parado"), frag: w(0, "frágil"), sens2: w(0, "sensível", 1),
      a0: L1.start, a1: L1.end, exag: w(1, "exagero"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const chips = [
      ["Dormir mal", "M-18 -6 Q0 -24 18 -6 M-14 10 L14 10"],
      ["Estresse", "M-16 -16 L16 16 M16 -16 L-16 16"],
      ["Medo de se mexer", "M0 -18 L0 6 M0 16 L0 18"],
      ["Ficar parado", "M-16 -14 L-16 16 M16 -14 L16 16"],
      ["Achar que a coluna é frágil", "M-14 -16 L4 -2 L-6 4 L14 18"],
    ];
    return {
      k,
      css: `
        #f09-title { left:110px; top:70px; font-size:74px; }
        #f09-title span { color:${C.pain}; }
        #f09-list { left:1060px; top:540px; width:760px; }
        #f09-list .h { font-size:30px; margin-bottom:12px; color:${C.ink}; }
        #root .f09-chip { display:flex; align-items:center; gap:14px; height:52px; margin-bottom:10px; padding:0 18px; background:#fff; border:5px solid ${C.ink}; border-radius:16px; font-size:30px; box-shadow:5px 5px 0 ${C.ink}; }
        #f09-uo { left:1480px; top:170px; font-size:54px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- cérebro -->
      <g id="f09-brain" opacity="0"><path d="M160 520 Q150 330 330 300 Q420 230 520 290 Q690 290 700 450 Q760 570 680 680 Q600 790 470 760 Q330 800 240 730 Q130 650 160 520Z" fill="#F7C6D3" stroke="${C.ink}" stroke-width="7"/>
        <path d="M280 420 Q330 380 380 420 M460 360 Q520 340 560 390 M260 600 Q320 560 360 610 M520 560 Q580 520 630 570" fill="none" stroke="#D98BA0" stroke-width="7" stroke-linecap="round"/>
        <text x="430" y="270" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">CÉREBRO</text></g>
      <g id="f09-a-wrap"><g transform="translate(430,770) scale(1.35)">${alarmildo("f09a")}</g></g>
      <!-- medidor de sensibilidade -->
      <g id="f09-meter" opacity="0"><rect x="760" y="380" width="70" height="420" rx="16" fill="#fff" ${st}/>
        ${[0, 1, 2, 3, 4].map((i) => `<rect id="f09-m${i}" x="772" y="${716 - i * 80}" width="46" height="70" rx="8" fill="${["#3DD9A4", "#B7E36A", "#FFC94A", "#FF9A4E", "#FF5A4E"][i]}" stroke="${C.ink}" stroke-width="4" opacity="0.15"/>`).join("")}
        <text x="795" y="360" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">VOLUME</text></g>
      <!-- alarme de carro + folha -->
      <g id="f09-car" opacity="0">
        <rect x="1060" y="130" width="760" height="380" rx="26" fill="#fff" ${st}/>
        <text x="1090" y="185" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">ALARME SENSÍVEL DEMAIS</text>
        <g id="f09-carbody"><path d="M1150 420 L1190 340 Q1210 300 1260 300 L1500 300 Q1550 300 1580 340 L1640 400 L1700 410 Q1730 420 1730 450 L1730 470 L1150 470 Z" fill="${C.blue}" ${st}/>
          <path d="M1220 340 L1300 340 L1300 395 L1200 395 Z M1330 340 L1480 340 L1540 395 L1330 395 Z" fill="#CFEFF7" stroke="${C.ink}" stroke-width="5"/>
          <circle cx="1240" cy="475" r="38" fill="#333" ${st}/><circle cx="1620" cy="475" r="38" fill="#333" ${st}/>
          <g id="f09-flash" opacity="0"><circle cx="1712" cy="430" r="26" fill="${C.sun}" opacity="0.8"/><circle cx="1160" cy="430" r="22" fill="${C.pain}" opacity="0.8"/></g></g>
        <g id="f09-leaf"><g transform="translate(1440,230)"><path d="M0 -20 Q24 -10 18 14 Q0 24 -18 8 Q-20 -12 0 -20Z" fill="#6CC56F" stroke="${C.ink}" stroke-width="4"/><path d="M-12 10 L10 -10" stroke="${C.ink}" stroke-width="3"/></g></g>
      </g>
    </svg>
    <div id="f09-title" class="abs title" style="opacity:0">Dor é um <span>ALARME</span></div>
    <div id="f09-uo" class="abs title" style="opacity:0">UÓ-UÓ-UÓ!</div>
    <div id="f09-list" class="abs" style="opacity:0">
      <div class="h label">O QUE DEIXA O ALARME MAIS SENSÍVEL:</div>
      ${chips.map(([t, d], i) => `<div id="f09-c${i}" class="f09-chip label" style="opacity:0"><svg width="40" height="40" viewBox="-22 -22 44 44"><circle r="20" fill="#FFE0D8" stroke="${C.ink}" stroke-width="4"/><path d="${d}" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></svg>${t}</div>`).join("")}
    </div>`,
      js: function (tl, K, R) {
        const a = "f09a";
        R.drop(tl, "#f09-title", 0.2, 0.7, -260);
        R.fadeIn(tl, "#f09-brain", 0.2, 0.4);
        tl.fromTo("#f09-a-wrap", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, K.alar - 0.3);
        R.face(tl, a, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, a, K.alar, K.dur);
        R.setPose(tl, a, 0, { armF: 20, armB: -20 });
        tl.fromTo("#f09a-rays", { opacity: 1 }, { opacity: 0.15, duration: 0.15, yoyo: true, repeat: 3, ease: "none" }, K.prot);
        R.pose(tl, a, K.prot, 0.3, { armF: -60, armB: 60 }, "back.out(2)");
        // alarme de carro dispara com uma folha
        R.pop(tl, "#f09-car", K.sens - 0.2, 0.45, 0.6);
        tl.fromTo("#f09-leaf", { x: 0, y: -40, rotation: 0 }, { x: -60, y: 150, rotation: 200, svgOrigin: "1440 230", duration: 1.4, ease: "sine.inOut" }, K.carro - 0.2);
        tl.set("#f09-flash", { opacity: 1 }, K.folha + 0.6);
        tl.fromTo("#f09-flash", { opacity: 1 }, { opacity: 0, duration: 0.15, yoyo: true, repeat: 7, ease: "none" }, K.folha + 0.6);
        R.shake(tl, "#f09-carbody", K.folha + 0.6, 0.9, 5);
        R.pop(tl, "#f09-uo", K.folha + 0.6, 0.3);
        R.fadeOut(tl, "#f09-uo", K.folha + 1.6, 0.3);
        R.face(tl, a, K.folha + 0.6, { eyes: "wide", mouth: "open" });
        // o que deixa o alarme mais sensível
        tl.to("#f09-car", { y: -10, scale: 0.98, svgOrigin: "1440 320", duration: 0.3 }, K.dorm - 0.5);
        tl.set("#f09-list", { opacity: 1 }, K.dorm - 0.4);
        R.fadeIn(tl, "#f09-meter", K.dorm - 0.4, 0.3);
        [K.dorm, K.estr, K.medo, K.par, K.frag].forEach((t, i) => {
          R.slideIn(tl, `#f09-c${i}`, t - 0.15, 0.4, 120);
          tl.to(`#f09-m${i}`, { opacity: 1, duration: 0.2 }, t);
          tl.to("#f09-a-wrap", { scale: 1 + (i + 1) * 0.03, svgOrigin: "430 770", duration: 0.25, ease: "back.out(2)" }, t);
        });
        R.face(tl, a, K.estr, { eyes: "wide", mouth: "flat" });
        tl.fromTo("#f09a-rays", { opacity: 1 }, { opacity: 0.1, duration: 0.1, yoyo: true, repeat: 11, ease: "none" }, K.sens2);
        R.shake(tl, "#f09a-body", K.sens2, 1.0, 5);
        R.face(tl, a, K.sens2, { eyes: "wide", mouth: "scream" });
        // fala do Alarmildo
        R.face(tl, a, K.a0 - 0.1, { eyes: "happy" });
        R.pose(tl, a, K.a0, 0.35, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, a, K.exag - 0.2, { eyes: "closed" });
        R.pose(tl, a, K.exag - 0.2, 0.35, { armF: -170, armB: 30 });
        tl.to("#f09-a-wrap", { scale: 1, svgOrigin: "430 770", duration: 0.5 }, K.exag);
      },
      sfx: [
        { name: "pop", t: k.alar - 0.1, vol: 0.4 },
        { name: "error", t: k.folha + 0.6, vol: 0.35 },
        ...[k.dorm, k.estr, k.medo, k.par, k.frag].map((t) => ({ name: "click-soft", t, vol: 0.45 })),
        { name: "glitch-1", t: k.sens2, vol: 0.3 },
      ],
    };
  },
};
