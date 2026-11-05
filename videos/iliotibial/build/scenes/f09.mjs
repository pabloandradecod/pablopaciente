// F9 — O que se sente: dor na lateral do joelho; gráfico da dor na corrida (km 3 até parar, some em repouso); o que piora
export default {
  speakers: {},
  tail: 1.2,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      lat: w(0, "lateral"), mesmo: w(0, "mesmo"), terc: w(0, "terceiro"), pior: w(0, "piorando"), parar: w(0, "parar"),
      rep: w(0, "repouso"), desc: w(0, "Descer"), esc: w(0, "escada"), lad: w(0, "ladeira"), est: w(0, "esticada"),
    };
    const st = `stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<path d="M-24 -20 L-10 -20 L-10 -6 L4 -6 L4 8 L18 8 L18 22" fill="none" ${st} stroke-width="6"/><path d="M-2 -24 L10 -12" stroke="${C.pain}" stroke-width="5"/>`,
      `<path d="M-26 -14 L26 20" ${st} stroke-width="7"/><circle cx="-14" cy="-20" r="6" fill="#E3A47E" ${st}/><path d="M-14 -14 L-8 2 L2 8" fill="none" ${st}/>`,
      `<circle cx="0" cy="-20" r="7" fill="#E3A47E" ${st}/><path d="M0 -12 L0 4 M0 4 L-6 22 M0 4 L8 22 M-10 -4 L10 -4" ${st}/><path d="M12 6 L18 22" stroke="${C.pain}" stroke-width="4" stroke-dasharray="3 4"/>`,
    ];
    const labels = ["Descer escada", "Descer ladeira", "Anda com a perna esticada pra fugir da dor"];
    return {
      k,
      css: `
        #f09-title { left:110px; top:70px; font-size:72px; }
        #f09-title span { color:${C.pain}; }
        #f09-graph { left:900px; top:130px; width:880px; padding:16px 22px; }
        #f09-graph .h { font-size:30px; }
        #f09-piora { left:900px; top:560px; padding:8px 22px; font-size:36px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:16px; }
        #root .f09-it { position:absolute; width:440px; height:84px; padding:0 14px 0 96px; font-size:28px; line-height:1.1; display:flex; align-items:center; }
        #root .f09-it svg { position:absolute; left:14px; top:10px; }
        #f09-tag { left:110px; top:150px; padding:10px 18px; font-size:30px; }
        #f09-tag b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="520" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <line x1="440" y1="758" x2="640" y2="758" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8" opacity="0" id="f09-line"/>
      <g id="f09-c-wrap"><g transform="translate(520,640) scale(1.35)">${human("f09c", "cida")}</g></g>
      <g id="f09-glow" opacity="0"><circle cx="532" cy="728" r="42" fill="${C.pain}" opacity="0.4"/><circle cx="532" cy="728" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <g id="f09-finger" opacity="0"><g transform="translate(570,728)"><path d="M0 0 L100 -20" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><path d="M0 0 L100 -20" stroke="#E3A47E" stroke-width="20" stroke-linecap="round"/><circle cx="114" cy="-24" r="24" fill="#E3A47E" stroke="${C.ink}" stroke-width="5"/></g></g>
    </svg>
    <div id="f09-title" class="abs title" style="opacity:0">O que <span>se sente</span>:</div>
    <div id="f09-tag" class="abs card label" style="opacity:0">dor na <b>LATERAL do joelho</b>, um pouco acima da linha</div>
    <div id="f09-graph" class="abs card" style="opacity:0">
      <div class="h label">DOR NA CORRIDA</div>
      <svg width="836" height="320" viewBox="0 0 836 320">
        <line x1="30" y1="270" x2="820" y2="270" stroke="${C.ink}" stroke-width="5"/><line x1="30" y1="20" x2="30" y2="270" stroke="${C.ink}" stroke-width="5"/>
        ${[1, 2, 3, 4].map((n) => `<line x1="${30 + n * 140}" y1="264" x2="${30 + n * 140}" y2="276" stroke="${C.ink}" stroke-width="4"/><text x="${30 + n * 140}" y="304" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">km ${n}</text>`).join("")}
        <path id="f09-gl1" d="M34 262 L450 262 Q520 220 570 120 Q600 60 620 40" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>
        <path id="f09-gl2" d="M620 40 Q680 40 720 180 Q760 262 810 262" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 0"/>
        <g id="f09-l0" opacity="0"><circle cx="34" cy="262" r="11" fill="${C.good}"/><text x="50" y="246" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">começa: zero</text></g>
        <g id="f09-l1" opacity="0"><circle cx="450" cy="262" r="11" fill="${C.pain}"/><text x="300" y="236" font-family="Nunito" font-weight="900" font-size="24" fill="${C.pain}">km 3: aparece</text></g>
        <g id="f09-l2" opacity="0"><rect x="560" y="10" width="120" height="36" rx="8" fill="${C.pain}"/><text x="620" y="36" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="#fff">PAROU!</text></g>
        <g id="f09-l3" opacity="0"><circle cx="810" cy="262" r="11" fill="${C.good}"/><text x="626" y="212" font-family="Nunito" font-weight="900" font-size="24" fill="#2E9E78">repouso: melhora</text></g>
      </svg>
    </div>
    <div id="f09-piora" class="abs title" style="opacity:0">PIORA:</div>
    ${labels.map((l, i) => `<div id="f09-it${i}" class="f09-it card label" style="left:${i < 2 ? 900 + i * 460 : 900}px;top:${i < 2 ? 650 : 750}px;${i === 2 ? "width:900px;" : ""}opacity:0"><svg width="64" height="64" viewBox="-32 -32 64 64"><circle r="30" fill="#FFE0D8" stroke="${C.ink}" stroke-width="4"/>${icons[i]}</svg>${l}</div>`).join("")}`,
      js: function (tl, K, R) {
        const c = "f09c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, c, 0.3, K.dur);
        R.rise(tl, "#f09-title", 0.1, 0.5);
        // dor na lateral do joelho
        tl.set("#f09-glow", { opacity: 1 }, K.lat);
        tl.fromTo("#f09-glow", { scale: 0.6, svgOrigin: "532 728" }, { scale: 1.25, svgOrigin: "532 728", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.lat);
        R.face(tl, c, K.lat, { eyes: "pain", mouth: "frown" });
        tl.set("#f09-finger", { opacity: 1 }, K.lat + 0.2);
        tl.fromTo("#f09-finger", { x: 160, y: -40 }, { x: 0, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.lat + 0.2);
        tl.to("#f09-line", { opacity: 0.7, duration: 0.3 }, K.lat + 0.4);
        R.pop(tl, "#f09-tag", K.lat + 0.4, 0.4);
        // gráfico da corrida
        R.pop(tl, "#f09-graph", K.mesmo - 0.3, 0.4);
        R.fadeOut(tl, "#f09-finger, #f09-line", K.mesmo - 0.2, 0.3);
        R.pop(tl, "#f09-l0", K.mesmo, 0.3);
        R.draw(tl, "#f09-gl1", K.mesmo, K.parar + 0.2 - K.mesmo, "none");
        R.pop(tl, "#f09-l1", K.terc, 0.3);
        R.face(tl, c, K.pior, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f09c-root", K.pior, 0.35, 3);
        R.pop(tl, "#f09-l2", K.parar, 0.3);
        R.draw(tl, "#f09-gl2", K.rep - 0.2, 0.9, "power1.out");
        R.pop(tl, "#f09-l3", K.rep + 0.3, 0.3);
        R.face(tl, c, K.rep + 0.3, { eyes: "normal", mouth: "smile" });
        tl.to("#f09-glow", { opacity: 0.25, duration: 0.3 }, K.rep + 0.3);
        // o que piora
        R.pop(tl, "#f09-piora", K.desc - 0.2, 0.4);
        [K.esc, K.lad, K.est].forEach((t, i) => R.slideIn(tl, `#f09-it${i}`, t - 0.15, 0.4, 200));
        tl.to("#f09-glow", { opacity: 1, duration: 0.2 }, K.esc);
        R.face(tl, c, K.esc, { eyes: "pain", mouth: "frown" });
        // anda com a perna dura
        R.pose(tl, c, K.est, 0.4, { hipF: -18, knF: 0, hipB: 14, knB: 0, torso: 8, shF: -30, shB: 30 });
        R.pose(tl, c, K.est + 0.6, 0.4, { hipF: 14, knF: 0, hipB: -18, knB: 20, shF: 30, shB: -30 });
        R.pose(tl, c, K.est + 1.2, 0.4, { hipF: -10, knF: 0, hipB: 6, knB: 0, shF: -10, shB: 10 });
      },
      sfx: [
        { name: "pop", t: k.lat, vol: 0.4 },
        { name: "pop", t: k.mesmo - 0.3, vol: 0.35 },
        { name: "pop", t: k.parar, vol: 0.4 },
        { name: "pop", t: k.desc - 0.2, vol: 0.4 },
        ...[k.esc, k.lad, k.est].map((t) => ({ name: "click-soft", t, vol: 0.45 })),
      ],
    };
  },
};
