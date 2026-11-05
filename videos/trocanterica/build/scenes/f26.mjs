// F26 — Vai melhorar? Sem tratar: dor que dura meses. Com educação + exercício: melhora clara em 8–12 semanas.
// O Glutinho fica forte ("Olha o shape!") e a Dona Faixa afrouxa.
export default {
  speakers: { glutinho: "f26g" },
  extra: 0.6,
  build(ctx) {
    const { C, glutinho, faixa, w, lines } = ctx;
    const k = {
      noti: w(0, "notícia"), sem: w(0, "sem"), mes: w(0, "meses"), edu: w(0, "educação"), mai: w(0, "maioria"), oito: w(0, "oito"), cont: w(0, "continua"),
      g0: lines[1].start, g1: lines[1].end, shape: w(1, "shape"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.sem, vol: 0.35 },
      { name: "pop", t: k.edu, vol: 0.35 },
      { name: "ping", t: k.oito, vol: 0.4 },
      { name: "sparkle", t: k.shape, vol: 0.45 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const FLAT = "M220 380 C420 350 620 400 820 370 S1020 360 1120 380";
    const DOWN = "M220 380 C360 400 520 600 640 640 S980 700 1120 720";
    return {
      k,
      sfx,
      css: `
        #f26-head { left:110px; top:60px; font-size:76px; }
        #f26-head span { color:${C.good}; }
        #f26-l1 { left:240px; top:200px; padding:10px 18px; font-size:28px; }
        #f26-l2 { left:600px; top:200px; padding:10px 18px; font-size:28px; }
        #f26-n1 { left:560px; top:300px; padding:10px 16px; font-size:26px; }
        #f26-n2 { left:740px; top:450px; padding:10px 16px; font-size:26px; }
        #f26-n3 { left:860px; top:590px; padding:10px 16px; font-size:24px; }
        #f26-shape { left:1450px; top:250px; padding:12px 22px; font-size:40px; transform: rotate(-5deg); }
        #root .f26-x { position:absolute; font-family:"Nunito"; font-weight:900; font-size:26px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="900" fill="${C.cream}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/>
      <line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <rect x="170" y="270" width="1010" height="520" rx="22" fill="#fff" ${st}/>
      <line x1="220" y1="300" x2="220" y2="740" stroke="${C.ink}" stroke-width="6"/>
      <line x1="220" y1="740" x2="1150" y2="740" stroke="${C.ink}" stroke-width="6"/>
      <text x="200" y="320" text-anchor="end" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" transform="rotate(-90 200 320)">dor</text>
      <g id="f26-mk" opacity="0"><rect x="560" y="300" width="160" height="440" fill="${C.good}" opacity="0.18"/><line x1="560" y1="300" x2="560" y2="740" stroke="#1E9C72" stroke-width="4" stroke-dasharray="10 8"/><line x1="720" y1="300" x2="720" y2="740" stroke="#1E9C72" stroke-width="4" stroke-dasharray="10 8"/></g>
      <path id="f26-flat" opacity="0" d="${FLAT}" fill="none" stroke="${C.grey}" stroke-width="12" stroke-linecap="round"/>
      <path id="f26-down" opacity="0" d="${DOWN}" fill="none" stroke="#1E9C72" stroke-width="12" stroke-linecap="round"/>
      <g id="f26-arrow" opacity="0"><path d="M1060 700 L1125 722 L1070 760" fill="none" stroke="#1E9C72" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>
      <!-- Dona Faixa e Glutinho -->
      <g id="f26-fw"><g transform="translate(1440,880) scale(0.8)">${faixa("f26f")}</g></g>
      <g id="f26-gw"><g transform="translate(1640,880) scale(1)">${glutinho("f26g")}</g></g>
      <g id="f26-spark" opacity="0">${[[1560, 560], [1740, 580], [1650, 520]].map(([x, y]) => `<path d="M${x} ${y - 24} L${x + 7} ${y - 7} L${x + 24} ${y} L${x + 7} ${y + 7} L${x} ${y + 24} L${x - 7} ${y + 7} L${x - 24} ${y} L${x - 7} ${y - 7} Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div class="f26-x" style="left:200px;top:752px">início</div>
    <div class="f26-x" style="left:560px;top:752px">8–12 sem</div>
    <div class="f26-x" style="left:1050px;top:752px">meses</div>
    <div id="f26-head" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f26-l1" class="abs card label" style="opacity:0"><span style="color:${C.grey}">━</span> Sem tratar</div>
    <div id="f26-l2" class="abs card label" style="opacity:0"><span style="color:#1E9C72">━</span> Educação + exercício</div>
    <div id="f26-n1" class="abs card label" style="opacity:0">pode durar meses</div>
    <div id="f26-n2" class="abs card label" style="opacity:0">melhora clara em <b style="color:#1E9C72">8 a 12 semanas</b></div>
    <div id="f26-n3" class="abs card label" style="opacity:0">...e continua melhorando</div>
    <div id="f26-shape" class="abs card title" style="opacity:0">SHAPE <span style="color:#1E9C72">EM DIA!</span></div>`,
      js: function (tl, K, R) {
        R.slideIn(tl, "#f26-head", 0.05, 0.5, -300);
        // personagens: a Faixa aperta e o Glutinho está espremido
        R.face(tl, "f26f", 0, { eyes: "normal", mouth: "grin" });
        R.face(tl, "f26g", 0, { eyes: "pain", mouth: "frown" });
        R.setPose(tl, "f26f", 0, { armF: -50, armB: 30 });
        tl.set("#f26-fw", { rotation: 18, svgOrigin: "1440 880" }, 0);
        tl.set("#f26-gw", { scaleY: 0.82, svgOrigin: "1640 880" }, 0);
        R.blinks(tl, "f26f", 0, K.dur);
        // sem tratar
        R.pop(tl, "#f26-l1", K.sem - 0.1, 0.35);
        tl.set("#f26-flat", { opacity: 1 }, K.sem);
        R.draw(tl, "#f26-flat", K.sem, 1.4);
        R.pop(tl, "#f26-n1", K.mes - 0.1, 0.35);
        // com educação + exercício
        R.fadeOut(tl, "#f26-n1", K.edu - 0.2);
        R.pop(tl, "#f26-l2", K.edu - 0.1, 0.35);
        tl.set("#f26-down", { opacity: 1 }, K.edu);
        R.draw(tl, "#f26-down", K.edu, Math.max(1.6, K.cont - K.edu), "power1.inOut");
        // a Faixa afrouxa, o Glutinho se recupera
        tl.to("#f26-fw", { rotation: 0, svgOrigin: "1440 880", duration: 0.7, ease: "back.out(1.6)" }, K.edu + 0.2);
        R.face(tl, "f26f", K.edu + 0.4, { eyes: "happy", mouth: "smile" });
        R.pose(tl, "f26f", K.edu + 0.4, 0.4, { armF: 20, armB: -20 });
        tl.to("#f26-gw", { scaleY: 1, svgOrigin: "1640 880", duration: 0.5, ease: "back.out(2)" }, K.mai);
        R.face(tl, "f26g", K.mai, { eyes: "normal", mouth: "smile" });
        R.fadeIn(tl, "#f26-mk", K.oito - 0.1, 0.3);
        R.pop(tl, "#f26-n2", K.oito, 0.4);
        R.pop(tl, "#f26-arrow", K.cont, 0.35);
        R.pop(tl, "#f26-n3", K.cont + 0.1, 0.35);
        // "Olha o shape!"
        tl.to("#f26-gw", { scale: 1.15, svgOrigin: "1640 880", duration: 0.4, ease: "back.out(2.5)" }, K.g0 - 0.1);
        R.pose(tl, "f26g", K.g0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f26g", K.g0, { eyes: "happy" });
        tl.fromTo("#f26-spark", { opacity: 0, scale: 0.4, svgOrigin: "1650 560" }, { opacity: 1, scale: 1, svgOrigin: "1650 560", duration: 0.35, ease: "back.out(2)" }, K.shape);
        R.pop(tl, "#f26-shape", K.shape + 0.1, 0.4);
      },
    };
  },
};
