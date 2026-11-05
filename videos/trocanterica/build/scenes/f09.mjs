// F9 — O que se sente: lateral do quadril acesa, faixa descendo até o joelho; 6 situações que pioram; "geralmente não formiga"
export default {
  tail: 1.2,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      lat: w(0, "lateral"), desc: w(0, "descer"), joe: w(0, "joelho"), pio: w(0, "Piora"),
      it: [w(0, "deitado"), w(0, "subindo"), w(0, "levantando"), w(0, "tempo"), w(0, "cruzando"), w(0, "caminhando")],
      form: w(0, "formiga"),
    };
    const st = `stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<rect x="-26" y="2" width="52" height="16" rx="6" fill="#fff" ${st}/><circle cx="-16" cy="-6" r="8" fill="#E3A47E" ${st}/><path d="M-6 -4 L22 -4" ${st} stroke-width="9"/>`,
      `<path d="M-26 22 L-26 10 L-10 10 L-10 -4 L6 -4 L6 -18 L24 -18" fill="none" ${st} stroke-width="6"/>`,
      `<path d="M-18 -20 L-18 20 M-18 4 L14 4 L14 20 M-18 4 L-18 -20" fill="none" ${st} stroke-width="6"/><path d="M8 -10 L24 -24" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>`,
      `<circle cx="0" cy="-16" r="8" fill="#E3A47E" ${st}/><path d="M0 -8 L0 10 M0 10 L-8 24 M0 10 L8 24" ${st} stroke-width="5"/><path d="M14 -18 A10 10 0 1 1 14 -17" fill="none" ${st}/>`,
      `<path d="M-22 -10 L8 18 M-10 18 L20 -10" ${st} stroke-width="8"/>`,
      `<path d="M-20 18 L-6 -4 L6 6 L20 -18" fill="none" ${st} stroke-width="6"/><circle cx="20" cy="-18" r="5" fill="${C.pain}"/>`,
    ];
    const labels = ["Deitada de lado", "Subindo escada", "Levantando da cadeira", "Muito tempo em pé", "Cruzando as pernas", "Caminhando mais longe"];
    return {
      k,
      css: `
        #f09-title { left:110px; top:70px; font-size:72px; }
        #f09-title span { color:${C.pain}; }
        #f09-piora { left:920px; top:190px; padding:10px 24px; font-size:40px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:16px; }
        #root .f09-it { position:absolute; left:920px; width:820px; height:84px; padding:0 20px 0 106px; font-size:38px; line-height:84px; }
        #root .f09-it svg { position:absolute; left:20px; top:10px; }
        #f09-nof { left:920px; top:820px; width:820px; padding:12px 20px; font-size:38px; text-align:center; color:${C.ink}; background:#E6F7EC; }
        #f09-tag1 { left:150px; top:520px; padding:8px 16px; font-size:28px; }
        #f09-tag2 { left:150px; top:720px; padding:8px 16px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="520" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(520,640) scale(1.35)">${human("f09c", "cida")}</g>
      <g id="f09-glow" opacity="0"><circle cx="532" cy="630" r="48" fill="${C.pain}" opacity="0.4"/><circle cx="532" cy="630" r="20" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <path id="f09-stripe" d="M536 660 L540 700 L536 740 L540 770" fill="none" stroke="${C.pain}" stroke-width="22" stroke-linecap="round" opacity="0"/>
      <line id="f09-knee" x1="470" y1="790" x2="620" y2="790" stroke="${C.ink}" stroke-width="5" stroke-dasharray="12 8" opacity="0"/>
    </svg>
    <div id="f09-title" class="abs title" style="opacity:0">O que <span>se sente</span>:</div>
    <div id="f09-tag1" class="abs card label" style="opacity:0">lateral do quadril</div>
    <div id="f09-tag2" class="abs card label" style="opacity:0">até perto do joelho</div>
    <div id="f09-piora" class="abs title" style="opacity:0">PIORA:</div>
    ${labels.map((l, i) => `<div id="f09-it${i}" class="f09-it card label" style="top:${290 + i * 88}px;opacity:0"><svg width="64" height="64" viewBox="-32 -32 64 64"><circle r="30" fill="#FFE0D8" stroke="${C.ink}" stroke-width="4"/>${icons[i]}</svg>${l}</div>`).join("")}
    <div id="f09-nof" class="abs card label" style="opacity:0">geralmente <b style="color:${C.good}">NÃO formiga</b></div>`,
      js: function (tl, K, R) {
        const c = "f09c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, c, 0.3, K.dur);
        R.idle(tl, c, 0, K.dur, 1.2);
        R.rise(tl, "#f09-title", 0.1, 0.5);
        // lateral do quadril acende
        tl.set("#f09-glow", { opacity: 1 }, K.lat);
        tl.fromTo("#f09-glow", { scale: 0.6, svgOrigin: "532 630" }, { scale: 1.2, svgOrigin: "532 630", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.lat);
        R.pop(tl, "#f09-tag1", K.lat + 0.2, 0.4);
        R.face(tl, c, K.lat, { eyes: "pain", mouth: "frown" });
        R.pose(tl, c, K.lat, 0.4, { shB: 40, elB: -70 });
        // desce pela lateral da coxa até perto do joelho
        tl.set("#f09-stripe", { opacity: 0.85 }, K.desc);
        R.draw(tl, "#f09-stripe", K.desc, 0.9);
        tl.set("#f09-knee", { opacity: 1 }, K.joe);
        R.pop(tl, "#f09-tag2", K.joe, 0.4);
        // piora
        R.pop(tl, "#f09-piora", K.pio - 0.1, 0.4);
        K.it.forEach((t, i) => {
          R.slideIn(tl, `#f09-it${i}`, t - 0.1, 0.4, 200);
          tl.fromTo("#f09-glow", { scale: 1 }, { scale: 1.35, svgOrigin: "532 630", duration: 0.15, yoyo: true, repeat: 1 }, t);
        });
        R.shake(tl, "#f09c-root", K.it[0], 0.3, 3);
        // não formiga
        tl.to(".f09-it", { opacity: 0.45, duration: 0.3 }, K.form - 0.4);
        R.pop(tl, "#f09-nof", K.form - 0.2, 0.45);
        R.face(tl, c, K.form, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.lat, vol: 0.4 },
        { name: "whoosh-short", t: k.desc, vol: 0.35 },
        { name: "pop", t: k.pio - 0.1, vol: 0.4 },
        ...k.it.map((t) => ({ name: "click-soft", t, vol: 0.45 })),
        { name: "sparkle", t: k.form - 0.2, vol: 0.4 },
      ],
    };
  },
};
