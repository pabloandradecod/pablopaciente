// F9 — O que se sente: dor na parte de DENTRO do joelho, uns 4 dedos abaixo da dobra; o que piora; mais embaixo que a artrose
export default {
  speakers: {},
  tail: 1.2,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      dentro: w(0, "dentro"), abaixo: w(0, "abaixo"), dobra: w(0, "dobra"), piora: w(0, "Piora"), sub: w(0, "subir"), lev: w(0, "levantar"),
      noite: w(0, "noite"), enc: w(0, "encostando"), inch: w(0, "inchacinho"),
    };
    const st = `stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<path d="M-24 22 L-10 22 L-10 8 L4 8 L4 -6 L18 -6 L18 -20" fill="none" ${st} stroke-width="6"/><path d="M-4 -16 L6 -26 M6 -26 L-2 -26 M6 -26 L6 -18" stroke="${C.pain}" stroke-width="4" fill="none"/>`,
      `<path d="M-20 -2 L-20 22 M-20 4 L4 4 L4 22" fill="none" ${st} stroke-width="6"/><path d="M14 18 L14 -16 M6 -8 L14 -18 L22 -8" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M-20 -14 Q-6 -24 -2 -6 Q8 8 -6 18" fill="none" ${st}/><circle cx="12" cy="-12" r="9" fill="#FFF3B8" ${st}/><rect x="-24" y="-6" width="16" height="22" rx="7" fill="${C.brown}" ${st}/><rect x="-6" y="-6" width="16" height="22" rx="7" fill="${C.brown}" ${st}/><circle cx="-7" cy="4" r="5" fill="${C.pain}"/>`,
      `<path d="M-8 -26 L-8 26 M8 -26 L8 26" ${st} stroke-width="7"/><ellipse cx="10" cy="8" rx="11" ry="8" fill="#FFB3AA" ${st}/>`,
    ];
    const labels = ["Subir escada", "Levantar da cadeira", "À noite, joelho encostando no outro", "Às vezes um inchacinho no ponto"];
    // perna vista de frente (lado de dentro à direita do desenho)
    const legFront = `<g>
        <path d="M130 10 Q120 120 132 190 Q140 230 134 300 Q128 360 140 410 L200 410 Q212 360 206 300 Q200 230 210 190 Q222 120 212 10 Z" fill="${C.skinB}" ${st}/>
        <ellipse cx="171" cy="196" rx="30" ry="34" fill="#F7EEDB" stroke="${C.ink}" stroke-width="4"/>
        <line id="f09-jl" x1="96" y1="232" x2="250" y2="232" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8"/>
        <text x="256" y="238" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">dobra</text>
      </g>`;
    return {
      k,
      css: `
        #f09-title { left:110px; top:70px; font-size:72px; }
        #f09-title span { color:${C.pain}; }
        #f09-front { left:860px; top:120px; width:470px; padding:12px 16px; }
        #f09-front .h { font-size:24px; }
        #f09-cmp { left:1350px; top:150px; width:460px; padding:18px 22px; font-size:30px; line-height:1.2; }
        #f09-cmp b { color:${C.pain}; }
        #f09-piora { left:860px; top:600px; padding:8px 22px; font-size:36px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:16px; }
        #root .f09-it { position:absolute; width:450px; height:84px; padding:0 14px 0 96px; font-size:27px; line-height:1.1; display:flex; align-items:center; }
        #root .f09-it svg { position:absolute; left:14px; top:10px; }
        #f09-tag { left:110px; top:160px; padding:10px 18px; font-size:30px; }
        #f09-tag b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="480" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f09-z-wrap"><g transform="translate(480,640) scale(1.35)">${human("f09z", "ze")}</g></g>
      <g id="f09-glow" opacity="0"><circle cx="500" cy="800" r="40" fill="${C.pain}" opacity="0.4"/><circle cx="500" cy="800" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <g id="f09-swell" opacity="0"><ellipse cx="500" cy="800" rx="26" ry="18" fill="#FFB3AA" stroke="${C.ink}" stroke-width="4"/></g>
    </svg>
    <div id="f09-title" class="abs title" style="opacity:0">O que <span>se sente</span>:</div>
    <div id="f09-tag" class="abs card label" style="opacity:0">dor na <b>parte de DENTRO</b> do joelho</div>
    <div id="f09-front" class="abs card" style="opacity:0">
      <div class="h label">visto de frente (joelho direito)</div>
      <svg width="438" height="420" viewBox="0 0 438 420">
        ${legFront}
        <g id="f09-art" opacity="0"><circle cx="200" cy="232" r="14" fill="${C.grey}" stroke="#fff" stroke-width="4"/><text x="40" y="226" font-family="Nunito" font-weight="900" font-size="20" fill="${C.grey}">artrose</text></g>
        <g id="f09-fing" opacity="0">${[0, 1, 2, 3].map((i) => `<rect x="226" y="${240 + i * 15}" width="44" height="13" rx="6" fill="${C.skinA}" stroke="${C.ink}" stroke-width="3"/>`).join("")}<text x="278" y="280" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">4 dedos</text></g>
        <g id="f09-dot" opacity="0"><circle cx="202" cy="300" r="26" fill="${C.pain}" opacity="0.35"/><circle cx="202" cy="300" r="14" fill="${C.pain}" stroke="#fff" stroke-width="4"/><text x="278" y="312" font-family="Nunito" font-weight="900" font-size="20" fill="${C.pain}">pata de ganso</text></g>
      </svg>
    </div>
    <div id="f09-cmp" class="abs card label" style="opacity:0">A dor é <b>mais embaixo e mais pra frente</b> do que a da artrose</div>
    <div id="f09-piora" class="abs title" style="opacity:0">PIORA:</div>
    ${labels.map((l, i) => `<div id="f09-it${i}" class="f09-it card label" style="left:${860 + (i % 2) * 470}px;top:${690 + Math.floor(i / 2) * 100}px;opacity:0"><svg width="64" height="64" viewBox="-32 -32 64 64"><circle r="30" fill="#FFE0D8" stroke="${C.ink}" stroke-width="4"/>${icons[i]}</svg>${l}</div>`).join("")}`,
      js: function (tl, K, R) {
        const z = "f09z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, z, 0.3, K.dur);
        R.rise(tl, "#f09-title", 0.1, 0.5);
        // aponta o ponto
        tl.set("#f09-glow", { opacity: 1 }, K.dentro);
        tl.fromTo("#f09-glow", { scale: 0.6, svgOrigin: "500 800" }, { scale: 1.25, svgOrigin: "500 800", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.dentro);
        R.face(tl, z, K.dentro, { eyes: "pain", mouth: "frown" });
        R.pose(tl, z, K.dentro, 0.5, { torso: 28, neck: -15, shF: 30, elF: -10 });
        R.pop(tl, "#f09-tag", K.dentro + 0.1, 0.4);
        // visto de frente: 4 dedos abaixo da dobra
        R.pop(tl, "#f09-front", K.abaixo - 0.3, 0.4);
        tl.fromTo("#f09-jl", { opacity: 0 }, { opacity: 1, duration: 0.3 }, K.dobra - 0.1);
        R.fadeIn(tl, "#f09-fing", K.dobra, 0.3);
        R.pop(tl, "#f09-dot", K.dobra + 0.4, 0.35);
        // o que piora
        R.pose(tl, z, K.piora - 0.2, 0.5, { torso: 0, neck: 0, shF: -10, elF: -20 });
        R.face(tl, z, K.piora, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f09-piora", K.piora - 0.2, 0.4);
        [K.sub, K.lev, K.noite, K.inch].forEach((t, i) => R.slideIn(tl, `#f09-it${i}`, t - 0.15, 0.4, 200));
        R.face(tl, z, K.sub, { eyes: "pain", mouth: "frown" });
        R.shake(tl, "#f09z-root", K.enc, 0.35, 3);
        tl.set("#f09-swell", { opacity: 1 }, K.inch);
        tl.fromTo("#f09-swell", { scale: 0.3, svgOrigin: "500 800" }, { scale: 1, svgOrigin: "500 800", duration: 0.4, ease: "back.out(2)" }, K.inch);
        // comparação com a artrose
        R.fadeIn(tl, "#f09-art", K.inch + 0.6, 0.3);
        R.pop(tl, "#f09-cmp", K.inch + 0.8, 0.4);
      },
      sfx: [
        { name: "pop", t: k.dentro, vol: 0.4 },
        { name: "pop", t: k.abaixo - 0.3, vol: 0.35 },
        { name: "pop", t: k.piora - 0.2, vol: 0.4 },
        ...[k.sub, k.lev, k.noite, k.inch].map((t) => ({ name: "click-soft", t, vol: 0.45 })),
      ],
    };
  },
};
