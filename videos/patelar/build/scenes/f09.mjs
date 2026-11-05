// F9 — O que se sente: dor num ponto logo abaixo da rótula (aponta com um dedo); gráfico da dor no treino; o que piora
export default {
  speakers: {},
  tail: 1.2,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      loc: w(0, "localizada"), rot: w(0, "rótula"), dedo: w(0, "dedo"),
      com: w(0, "começo"), aq: w(0, "aquece"), volt: w(0, "voltar"), seg: w(0, "seguinte"),
      pio: w(0, "Piora"), it: [w(0, "pular"), w(0, "agachar"), w(0, "descer"), w(0, "sentado")],
    };
    const st = `stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<circle cx="0" cy="-20" r="7" fill="#C98A5E" ${st}/><path d="M0 -12 L0 4 M0 4 L-10 16 M0 4 L10 16 M-12 -6 L12 -6" ${st}/><path d="M-18 24 L18 24" stroke="${C.pain}" stroke-width="4" stroke-dasharray="4 4"/>`,
      `<circle cx="-4" cy="-20" r="7" fill="#C98A5E" ${st}/><path d="M-4 -12 L-6 2 L8 8 L2 22" fill="none" ${st}/>`,
      `<path d="M-24 -20 L-10 -20 L-10 -6 L4 -6 L4 8 L18 8 L18 22" fill="none" ${st} stroke-width="6"/><path d="M-2 -24 L10 -12" stroke="${C.pain}" stroke-width="5"/>`,
      `<rect x="-24" y="-22" width="48" height="20" rx="6" fill="#8E2F45" ${st}/><rect x="-24" y="-4" width="48" height="22" rx="6" fill="#A23A55" ${st}/><path d="M8 -30 A8 8 0 1 1 8 -29" fill="none" ${st}/>`,
    ];
    const labels = ["Pular", "Agachar", "Descer escada", "Muito tempo sentado (joelho dobrado)"];
    return {
      k,
      css: `
        #f09-title { left:110px; top:70px; font-size:72px; }
        #f09-title span { color:${C.pain}; }
        #f09-graph { left:920px; top:150px; width:860px; padding:16px 22px; }
        #f09-graph .h { font-size:30px; }
        #f09-piora { left:920px; top:560px; padding:8px 22px; font-size:36px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:16px; }
        #root .f09-it { position:absolute; width:420px; height:84px; padding:0 14px 0 96px; font-size:30px; line-height:1.1; display:flex; align-items:center; }
        #root .f09-it svg { position:absolute; left:14px; top:10px; }
        #f09-tag { left:110px; top:170px; padding:10px 18px; font-size:30px; }
        #f09-tag b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="520" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(520,640) scale(1.35)">${human("f09j", "juninho")}</g>
      <g id="f09-glow" opacity="0"><circle cx="560" cy="780" r="42" fill="${C.pain}" opacity="0.4"/><circle cx="560" cy="780" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- dedo apontando -->
      <g id="f09-finger" opacity="0"><g transform="translate(600,790)"><path d="M0 0 L90 30" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><path d="M0 0 L90 30" stroke="#C98A5E" stroke-width="20" stroke-linecap="round"/><circle cx="104" cy="36" r="24" fill="#C98A5E" stroke="${C.ink}" stroke-width="5"/></g></g>
    </svg>
    <div id="f09-title" class="abs title" style="opacity:0">O que <span>se sente</span>:</div>
    <div id="f09-tag" class="abs card label" style="opacity:0">logo abaixo da rótula: <b>dá pra apontar com 1 dedo</b></div>
    <div id="f09-graph" class="abs card" style="opacity:0">
      <div class="h label">DOR NO TREINO</div>
      <svg width="816" height="300" viewBox="0 0 816 300">
        <line x1="30" y1="260" x2="800" y2="260" stroke="${C.ink}" stroke-width="5"/><line x1="30" y1="20" x2="30" y2="260" stroke="${C.ink}" stroke-width="5"/>
        <path id="f09-gline" d="M40 80 Q140 100 230 200 Q300 230 380 200 Q500 110 600 70 Q690 40 790 30" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>
        <g id="f09-l0" opacity="0"><circle cx="40" cy="80" r="11" fill="${C.pain}"/><text x="60" y="64" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">começo</text></g>
        <g id="f09-l1" opacity="0"><circle cx="300" cy="220" r="11" fill="${C.good}"/><text x="250" y="252" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">aqueceu</text></g>
        <g id="f09-l2" opacity="0"><circle cx="600" cy="70" r="11" fill="${C.pain}"/><text x="520" y="130" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">depois</text></g>
        <g id="f09-l3" opacity="0"><circle cx="790" cy="30" r="11" fill="${C.pain}"/><text x="640" y="30" font-family="Nunito" font-weight="900" font-size="26" fill="${C.pain}">dia seguinte!</text></g>
      </svg>
    </div>
    <div id="f09-piora" class="abs title" style="opacity:0">PIORA:</div>
    ${labels.map((l, i) => `<div id="f09-it${i}" class="f09-it card label" style="left:${920 + (i % 2) * 440}px;top:${650 + Math.floor(i / 2) * 100}px;opacity:0"><svg width="64" height="64" viewBox="-32 -32 64 64"><circle r="30" fill="#FFE0D8" stroke="${C.ink}" stroke-width="4"/>${icons[i]}</svg>${l}</div>`).join("")}`,
      js: function (tl, K, R) {
        const j = "f09j";
        R.setPose(tl, j, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, j, 0.3, K.dur);
        R.rise(tl, "#f09-title", 0.1, 0.5);
        // ponto logo abaixo da rótula
        tl.set("#f09-glow", { opacity: 1 }, K.loc);
        tl.fromTo("#f09-glow", { scale: 0.6, svgOrigin: "560 780" }, { scale: 1.25, svgOrigin: "560 780", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.loc);
        R.face(tl, j, K.loc, { eyes: "pain", mouth: "frown" });
        R.pose(tl, j, K.rot, 0.5, { torso: 28, neck: -14, shF: -20, elF: -30 });
        tl.set("#f09-finger", { opacity: 1 }, K.dedo - 0.2);
        tl.fromTo("#f09-finger", { x: 160, y: 40 }, { x: 0, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.dedo - 0.2);
        R.pop(tl, "#f09-tag", K.dedo, 0.4);
        // gráfico: começo, aquece, volta, dia seguinte
        R.pop(tl, "#f09-graph", K.com - 0.3, 0.4);
        R.pose(tl, j, K.com - 0.3, 0.5, { torso: 0, neck: 0, shF: -10, elF: -20 });
        R.fadeOut(tl, "#f09-finger", K.com - 0.3, 0.3);
        R.draw(tl, "#f09-gline", K.com, K.seg + 0.4 - K.com, "none");
        R.pop(tl, "#f09-l0", K.com, 0.3);
        R.pop(tl, "#f09-l1", K.aq, 0.3);
        R.face(tl, j, K.aq, { eyes: "normal", mouth: "smile" });
        tl.to("#f09-glow", { opacity: 0.3, duration: 0.3 }, K.aq);
        R.pop(tl, "#f09-l2", K.volt, 0.3);
        tl.to("#f09-glow", { opacity: 1, duration: 0.2 }, K.volt);
        R.face(tl, j, K.volt, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f09-l3", K.seg, 0.3);
        R.shake(tl, "#f09j-root", K.seg, 0.35, 3);
        // o que piora
        R.pop(tl, "#f09-piora", K.pio - 0.1, 0.4);
        K.it.forEach((t, i) => {
          R.slideIn(tl, `#f09-it${i}`, t - 0.1, 0.4, 200);
          tl.fromTo("#f09-glow", { scale: 1 }, { scale: 1.35, svgOrigin: "560 780", duration: 0.15, yoyo: true, repeat: 1 }, t);
        });
        R.pose(tl, j, K.it[3], 0.4, { torso: 10, shB: 30, elB: -60 });
      },
      sfx: [
        { name: "pop", t: k.loc, vol: 0.4 },
        { name: "pop", t: k.dedo, vol: 0.35 },
        { name: "pop", t: k.com - 0.3, vol: 0.35 },
        { name: "pop", t: k.pio - 0.1, vol: 0.4 },
        ...k.it.map((t) => ({ name: "click-soft", t, vol: 0.45 })),
      ],
    };
  },
};
