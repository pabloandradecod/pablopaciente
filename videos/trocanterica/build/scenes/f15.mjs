// F15 — Bandeiras vermelhas da dor lateral do quadril (tom sério): destaque para queda + não apoiar = fratura do fêmur
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), queda: w(0, "queda"), apoiar: w(0, "apoiar"), frat: w(0, "fratura"), idosos: w(0, "idosos"),
      feb: w(0, "Febre"), verm: w(0, "vermelhidão"), peso: w(0, "peso"), can: w(0, "câncer"), noi: w(0, "noite"),
      av: w(0, "avaliação"), rap: w(0, "rápida"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = {
      fever: `<rect x="-8" y="-36" width="16" height="50" rx="8" fill="#fff" ${st}/><circle cx="0" cy="22" r="14" fill="${RED}" ${st}/><rect x="-3" y="-18" width="6" height="36" fill="${RED}"/>`,
      hot: `<circle r="26" fill="#FF8A7A" ${st}/><path d="M-10 -44 Q-2 -52 -10 -60 M6 -44 Q14 -52 6 -60 M22 -40 Q30 -48 22 -56" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`,
      scale: `<rect x="-34" y="-24" width="68" height="52" rx="12" fill="#fff" ${st}/><path d="M-16 -8 Q0 -20 16 -8" fill="none" ${st}/><path d="M0 -8 L8 -16" ${st}/><path d="M-8 14 L8 14" ${st}/>`,
      ribbon: `<path d="M0 -10 Q-22 -40 -6 -40 Q0 -40 0 -26 Q0 -40 6 -40 Q22 -40 0 -10 L-20 34 M0 -10 L20 34" fill="none" stroke="${RED}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
      moon: `<path d="M12 -34 Q-30 -26 -26 8 Q-20 38 16 34 Q-8 22 -6 -4 Q-4 -24 12 -34Z" fill="${C.sun}" ${st}/><path d="M22 -14 L30 -14 M26 -18 L26 -10" ${st}/>`,
    };
    const sign = (id, x, icon, text) => `<div id="${id}" class="abs f15-sign" style="left:${x}px;top:400px;opacity:0">
        <svg width="90" height="90" viewBox="-48 -62 96 110">${icon}</svg><div class="label" style="font-size:27px;line-height:1.1;text-align:center">${text}</div></div>`;
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f15-sign { width:250px; height:210px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:10px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #f15-ce { left:500px; top:66px; font-size:36px; color:${RED}; }
        #f15-big { left:500px; top:112px; width:1330px; height:240px; display:flex; align-items:center; gap:30px; padding:16px 30px; background:#fff; border:8px solid ${RED}; border-radius:26px; box-shadow:10px 10px 0 ${C.ink}; }
        #f15-big .a { font-size:40px; line-height:1.15; }
        #f15-big .b { font-size:46px; color:${RED}; margin-top:8px; }
        #f15-big .c { font-size:28px; opacity:0.8; }
        #f15-em { left:500px; top:680px; width:1330px; height:110px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:52px; box-shadow:8px 8px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="20" y="20" width="1880" height="1040" rx="30" fill="none" stroke="${RED}" stroke-width="12" opacity="0.5"/>
      <g id="f15-stop" opacity="0"><g transform="translate(260,300)"><g id="f15-stop-in">
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 190).toFixed(1)} ${(Math.sin(a) * 190).toFixed(1)}`; }).join(" ")} Z" fill="${RED}" stroke="${C.ink}" stroke-width="10" stroke-linejoin="round"/>
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 166).toFixed(1)} ${(Math.sin(a) * 166).toFixed(1)}`; }).join(" ")} Z" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>
        <text x="0" y="30" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="96" fill="#fff">PARE</text>
      </g></g></g>
      <rect id="f15-pole" opacity="0" x="250" y="480" width="20" height="340" fill="${C.grey}" stroke="${C.ink}" stroke-width="6"/>
    </svg>
    <div id="f15-ce" class="abs label" style="opacity:0">SINAIS DE ALERTA</div>
    <div id="f15-big" class="abs" style="opacity:0">
      <svg width="230" height="200" viewBox="0 0 230 200" style="flex:none">
        <line x1="10" y1="186" x2="220" y2="186" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
        <g id="f15-fall"><circle cx="70" cy="140" r="20" fill="#E3A47E" ${st}/><path d="M86 150 L150 168 M118 160 L120 120 M118 160 L170 140 M150 168 L190 150 M150 168 L196 178" fill="none" stroke="#B07ED8" stroke-width="14" stroke-linecap="round"/></g>
        <g id="f15-bone" opacity="0"><path d="M150 40 Q140 26 154 20 Q166 16 168 30 L190 52 Q204 50 206 62 Q206 76 192 74 L170 54 Z" fill="#fff" ${st}/><path d="M170 26 L182 40 L174 46 L188 60" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round"/></g>
        <path id="f15-x" opacity="0" d="M20 20 L60 60 M60 20 L20 60" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>
      </svg>
      <div><div class="a label">Queda + dor forte + <b>não consegue apoiar</b> a perna</div>
        <div id="f15-fr" class="b title" style="opacity:0">pode ser FRATURA DO FÊMUR</div>
        <div id="f15-id" class="c label" style="opacity:0">principalmente em idosos</div></div>
    </div>
    ${sign("f15-s0", 500, ic.fever, "Febre")}
    ${sign("f15-s1", 770, ic.hot, "Vermelhidão e<br>calor no local")}
    ${sign("f15-s2", 1040, ic.scale, "Perda de peso<br>sem motivo")}
    ${sign("f15-s3", 1310, ic.ribbon, "Histórico<br>de câncer")}
    ${sign("f15-s4", 1580, ic.moon, "Dor forte à noite<br>sem melhorar")}
    <div id="f15-em" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA RÁPIDA!</div>`,
      js: function (tl, K, R) {
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f15-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f15-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        tl.to("#f15-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, K.queda - 0.75);
        tl.to("#f15-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, K.queda - 0.75);
        tl.to("#f15-pole", { opacity: 1, duration: 0.3 }, K.queda - 0.2);
        R.fadeIn(tl, "#f15-ce", K.queda - 0.2, 0.3);
        // destaque: queda + não apoiar = fratura
        R.pop(tl, "#f15-big", K.queda - 0.1, 0.45, 0.7);
        tl.fromTo("#f15-fall", { rotation: -60, svgOrigin: "120 186" }, { rotation: 0, svgOrigin: "120 186", duration: 0.45, ease: "bounce.out" }, K.queda);
        R.pop(tl, "#f15-x", K.apoiar, 0.3);
        R.pop(tl, "#f15-bone", K.frat - 0.1, 0.35);
        R.rise(tl, "#f15-fr", K.frat - 0.1, 0.35, 16);
        R.rise(tl, "#f15-id", K.idosos - 0.1, 0.35, 12);
        tl.to("#f15-big", { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.frat + 0.3);
        [K.feb, K.verm, K.peso, K.can, K.noi].forEach((t, i) => R.pop(tl, `#f15-s${i}`, t - 0.2, 0.4, 0.6));
        R.pop(tl, "#f15-em", K.av - 0.1, 0.4, 0.7);
        tl.to("#f15-em", { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.rap);
        tl.to("#f15-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.rap);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        { name: "whoosh-short", t: k.queda - 0.75, vol: 0.35 },
        { name: "click", t: k.queda + 0.3, vol: 0.35 },
        { name: "impact-bass-2", t: k.av - 0.1, vol: 0.45 },
      ],
    };
  },
};
