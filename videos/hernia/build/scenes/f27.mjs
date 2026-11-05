// F27 — E a cirurgia? 3 indicações + gráfico: alivia mais rápido, em 1–2 anos resultados parecidos; decisão com o médico
export default {
  speakers: { pablo: "f27p" },
  extra: 0.5,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      cir: w(0, "cirurgia"), cauda: w(0, "cauda"), fraq: w(0, "fraqueza"), inc: w(0, "incapacita"), seis: w(0, "seis"),
      alivia: w(0, "aliviar"), rap: w(0, "rápido"), depois: w(0, "depois", 1), anos: w(0, "anos"), parec: w(0, "parecidos"), cons: w(0, "conservador"),
      dec: w(0, "decisão"), med: w(0, "médico"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "pop", t: k.cauda, vol: 0.35 }, { name: "pop", t: k.fraq, vol: 0.35 }, { name: "pop", t: k.inc, vol: 0.35 },
      { name: "whoosh-short", t: k.alivia - 0.3, vol: 0.35 },
      { name: "sparkle", t: k.parec, vol: 0.35 },
      { name: "pop", t: k.dec, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const card = (i, h, s) => `<div id="f27-c${i}" class="abs card f27-card" style="left:${110 + i * 360}px;opacity:0">
      <svg width="40" height="40" viewBox="-20 -20 40 40"><path d="M-14 12 L10 -12 M6 -16 L16 -6" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/></svg>
      <div class="h title">${h}</div><div class="s label">${s}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f27-h { left:110px; top:60px; font-size:72px; }
        #f27-h span { color:${C.pain}; }
        #root .f27-card { top:170px; width:330px; padding:16px 20px; }
        #root .f27-card .h { font-size:34px; line-height:1.05; margin-top:4px; }
        #root .f27-card .s { font-size:24px; color:#5B6B70; margin-top:6px; }
        #f27-l1 { left:560px; top:440px; font-size:30px; color:${C.pain}; }
        #f27-l2 { left:560px; top:490px; font-size:30px; color:#1E9C72; }
        #f27-par { left:1010px; top:580px; width:260px; font-size:30px; padding:10px 16px; }
        #f27-dec { left:110px; top:780px; font-size:36px; padding:14px 24px; }
        #f27-dec b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1620" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f27-chart" opacity="0">
        <rect x="110" y="390" width="1180" height="370" rx="24" fill="#fff" ${st}/>
        <line x1="190" y1="430" x2="190" y2="700" ${st}/><line x1="190" y1="700" x2="1000" y2="700" ${st}/>
        <text x="150" y="560" transform="rotate(-90 150 560)" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">dor na perna</text>
        <text x="500" y="742" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">tempo</text>
        <line x1="860" y1="430" x2="860" y2="700" stroke="${C.grey}" stroke-width="5" stroke-dasharray="10 8"/>
        <text x="860" y="732" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">1–2 anos</text>
        <path id="f27-pc" d="M200 450 C260 450 270 620 340 640 C460 660 700 670 980 668" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/>
        <path id="f27-pg" d="M200 450 C340 460 420 560 560 610 C700 650 820 664 980 672" fill="none" stroke="${C.good}" stroke-width="12" stroke-linecap="round"/>
      </g>
      <g id="f27-pw"><g transform="translate(1640,690) scale(-1.25,1.25)">${human("f27p", "pablo")}</g></g>
    </svg>
    <div id="f27-h" class="abs title">E A <span>CIRURGIA</span>?</div>
    ${card(0, "Cauda equina", "emergência")}
    ${card(1, "Fraqueza que piora", "déficit progressivo")}
    ${card(2, "Dor que incapacita", "sem melhora após 6–12 semanas")}
    <div id="f27-l1" class="abs label" style="opacity:0">— cirurgia: alivia <b>mais rápido</b></div>
    <div id="f27-l2" class="abs label" style="opacity:0">— conservador: melhora mais devagar</div>
    <div id="f27-par" class="abs card label" style="opacity:0">depois: resultados <b style="color:#1E9C72">parecidos</b></div>
    <div id="f27-dec" class="abs card label" style="opacity:0">Decisão <b>conversada com o médico</b></div>`,
      js: function (tl, K, R) {
        const p = "f27p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.idle(tl, p, 0.5, K.dur, 1.5);
        R.slideIn(tl, "#f27-h", 0.05, 0.5, -300);
        tl.fromTo("#f27-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        [K.cauda, K.fraq, K.inc].forEach((t, i) => R.pop(tl, `#f27-c${i}`, t - 0.1, 0.4));
        R.pose(tl, p, K.cauda, 0.4, { shF: -100, elF: -40 }, "back.out(1.6)");
        R.pose(tl, p, K.seis + 0.5, 0.4, { shF: -10, elF: -20 });
        // gráfico
        R.fadeIn(tl, "#f27-chart", K.alivia - 0.4, 0.3);
        tl.set("#f27-pc, #f27-pg", { opacity: 1 }, K.alivia - 0.4);
        R.draw(tl, "#f27-pc", K.alivia - 0.1, 1.2);
        R.fadeIn(tl, "#f27-l1", K.rap - 0.1, 0.3);
        R.draw(tl, "#f27-pg", K.depois - 0.2, 1.8);
        R.fadeIn(tl, "#f27-l2", K.anos, 0.3);
        R.pop(tl, "#f27-par", K.parec - 0.1, 0.4);
        R.gesture(tl, p, K.alivia, K.dec - 0.3, 4);
        // decisão compartilhada
        R.pop(tl, "#f27-dec", K.dec - 0.1, 0.45);
        R.pose(tl, p, K.dec, 0.4, { shF: -60, elF: -90 }, "back.out(1.6)");
        R.face(tl, p, K.med, { eyes: "happy" });
      },
    };
  },
};
