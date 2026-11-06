// F7 — O que a ciência mostrou: cirurgia de raspar o osso x cirurgia de mentirinha = empate; o foco vai para o Supra cansado e a Bursinha irritada; DOR SUBACROMIAL
export default {
  speakers: { bursinha: "f07b" },
  build(ctx) {
    const { C, supra, bursinha, w, lines } = ctx;
    const k = {
      est: w(0, "estudos"), rasp: w(0, "raspar"), ment: w(0, "mentirinha"), res: w(0, "resultado"), par: w(0, "parecido"),
      hoje: w(0, "Hoje"), tend: w(0, "tendão"), sobre: w(0, "sobrecarregado"), bur: w(0, "bursa"), irr: w(0, "irritada"), mod: w(0, "moderno"), sub: w(0, "subacromial"),
      b0: lines[1].start, b1: lines[1].end, moro: w(1, "moro"),
    };
    const st = `stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
    const people = (x0, col) => [0, 1, 2, 3, 4].map((i) => `<g transform="translate(${x0 + i * 92},0)"><circle cx="0" cy="560" r="26" fill="${C.skinB}" ${st}/><path d="M-30 650 Q-30 596 0 596 Q30 596 30 650 Z" fill="${col}" ${st}/><rect x="10" y="600" width="22" height="16" rx="4" fill="#fff" ${st} stroke-width="3"/></g>`).join("");
    return {
      k,
      css: `
        #f07-h { left:90px; top:50px; font-size:60px; }
        #f07-h span { color:${C.good}; }
        #root .f07-p { top:190px; width:780px; padding:18px 20px; text-align:center; font-size:36px; }
        #f07-pa { left:90px; } #f07-pb { left:1050px; }
        #f07-tie { left:0; right:0; top:560px; text-align:center; font-size:110px; color:${C.pain}; }
        #f07-sign { left:310px; top:160px; width:1300px; padding:22px 26px; text-align:center; }
        #f07-sign .a { font-size:66px; color:${C.pain}; } #f07-sign .b { font-size:40px; margin-top:8px; }
        #f07-tt { left:520px; top:870px; padding:8px 18px; font-size:30px; }
        #f07-tb { left:1180px; top:870px; padding:8px 18px; font-size:30px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <g id="f07-study">
        <g id="f07-ga" opacity="0">${people(300, "#7FB3D5")}</g>
        <g id="f07-gb" opacity="0">${people(1260, "#B07ED8")}</g>
        <g id="f07-bars" opacity="0">
          <text x="120" y="745" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">melhora</text>
          <rect x="300" y="710" width="440" height="50" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="6"/><rect id="f07-ba" x="300" y="710" width="0" height="50" rx="14" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/>
          <rect x="1260" y="710" width="440" height="50" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="6"/><rect id="f07-bb" x="1260" y="710" width="0" height="50" rx="14" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/>
        </g>
      </g>
      <g id="f07-focus" opacity="0">
        <g id="f07-s-wrap"><g transform="translate(700,880) scale(1.4)">${supra("f07s")}</g></g>
        <g id="f07-b-wrap"><g transform="translate(1300,880) scale(1.5)">${bursinha("f07b")}</g></g>
        <g id="f07-steam" opacity="0">${[0, 1, 2].map((i) => `<path d="M${1240 + i * 60} 700 Q${1226 + i * 60} 670 ${1240 + i * 60} 640 Q${1254 + i * 60} 610 ${1240 + i * 60} 580" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
      </g>
    </svg>
    <div id="f07-h" class="abs title" style="opacity:0">O que a <span>ciência</span> mostrou</div>
    <div id="f07-pa" class="abs card label f07-p" style="opacity:0">Cirurgia de <b style="color:${C.pain}">raspar o osso</b></div>
    <div id="f07-pb" class="abs card label f07-p" style="opacity:0">Cirurgia de <b style="color:${C.purple}">mentirinha</b> (só olhar)</div>
    <div id="f07-tie" class="abs title" style="opacity:0">= EMPATE!</div>
    <div id="f07-sign" class="abs card" style="opacity:0"><div class="a title">DOR SUBACROMIAL</div><div class="b label">= tendão sobrecarregado <b style="color:${C.pain}">±</b> bursa irritada</div></div>
    <div id="f07-tt" class="abs card label" style="opacity:0">tendão do manguito</div>
    <div id="f07-tb" class="abs card label" style="opacity:0">bursa</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-h", 0.1, 0.5);
        R.pop(tl, "#f07-pa", K.rasp - 0.2, 0.45);
        R.fadeIn(tl, "#f07-ga", K.rasp);
        R.pop(tl, "#f07-pb", K.ment - 0.2, 0.45);
        R.fadeIn(tl, "#f07-gb", K.ment);
        R.fadeIn(tl, "#f07-bars", K.res - 0.2);
        tl.to("#f07-ba", { attr: { width: 330 }, duration: 1.0, ease: "power2.out" }, K.res);
        tl.to("#f07-bb", { attr: { width: 330 }, duration: 1.0, ease: "power2.out" }, K.res + 0.1);
        tl.set("#f07-tie", { opacity: 1 }, K.par);
        tl.fromTo("#f07-tie", { scale: 2.2 }, { scale: 1, duration: 0.35, ease: "power4.in" }, K.par);
        // foco no tendão e na bursa
        tl.to("#f07-study, #f07-pa, #f07-pb, #f07-tie", { opacity: 0, duration: 0.35 }, K.hoje - 0.3);
        tl.set("#f07-focus", { opacity: 1 }, K.hoje - 0.1);
        R.setPose(tl, "f07s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f07s", 0, { eyes: "normal", mouth: "flat" });
        R.face(tl, "f07b", 0, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f07-s-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.hoje - 0.1);
        tl.fromTo("#f07-b-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.hoje + 0.1);
        R.pop(tl, "#f07-tt", K.tend, 0.4);
        tl.to("#f07s-fray, #f07s-sweat", { opacity: 1, duration: 0.3 }, K.sobre);
        R.face(tl, "f07s", K.sobre, { eyes: "pain", mouth: "frown" });
        R.pose(tl, "f07s", K.sobre, 0.4, { armF: 10, armB: -10, torso: 0 });
        tl.to("#f07-s-wrap", { y: 16, duration: 0.4, ease: "power2.inOut" }, K.sobre);
        R.pop(tl, "#f07-tb", K.bur, 0.4);
        tl.to("#f07b-body > path:first-of-type", { fill: "#FF9E94", duration: 0.3 }, K.irr);
        R.face(tl, "f07b", K.irr, { eyes: "pain", mouth: "frown" });
        tl.set("#f07-steam", { opacity: 1 }, K.irr);
        tl.fromTo("#f07-steam path", { y: 0, opacity: 1 }, { y: -40, opacity: 0, duration: 0.7, stagger: 0.15, repeat: 1 }, K.irr);
        // nome moderno
        R.fadeOut(tl, "#f07-h", K.mod - 0.3);
        R.pop(tl, "#f07-sign", K.sub - 0.3, 0.5);
        // Bursinha dá oi
        tl.to("#f07b-body > path:first-of-type", { fill: "#BFE8F7", duration: 0.3 }, K.b0 - 0.2);
        R.face(tl, "f07b", K.b0, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f07b", K.b0, 0.25, { armF: -130 }, "back.out(2)");
        tl.to("#f07b-armF", { rotation: -100, svgOrigin: "0 0", duration: 0.18, yoyo: true, repeat: 5 }, K.b0 + 0.3);
        tl.to("#f07-b-wrap", { y: -30, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.moro);
        R.face(tl, "f07s", K.b0 + 0.3, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.rasp - 0.2, vol: 0.35 },
        { name: "pop", t: k.ment - 0.2, vol: 0.35 },
        { name: "riser", t: k.res, vol: 0.25, dur: 1.2 },
        { name: "impact-bass-1", t: k.par, vol: 0.4 },
        { name: "whoosh", t: k.hoje - 0.3, vol: 0.35 },
        { name: "glitch-1", t: k.irr, vol: 0.25 },
        { name: "pop", t: k.sub - 0.3, vol: 0.4 },
        { name: "sparkle", t: k.b0, vol: 0.3 },
      ],
    };
  },
};
