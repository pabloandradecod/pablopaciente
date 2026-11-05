// F14 — Bandeiras vermelhas do joelho (tom sério): destaque para estalo + não conseguir esticar = ruptura do tendão
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), inch: w(0, "inchado"), feb: w(0, "febre"), queda: w(0, "estalo"), apoiar: w(0, "esticar"), frat: w(0, "ruptura"),
      av: w(0, "avaliação"), rap: w(0, "urgente"), trav: w(0, "Travamento"), noi: w(0, "noite"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = {
      fever: `<rect x="-8" y="-36" width="16" height="50" rx="8" fill="#fff" ${st}/><circle cx="0" cy="22" r="14" fill="${RED}" ${st}/><rect x="-3" y="-18" width="6" height="36" fill="${RED}"/>`,
      hot: `<circle r="26" fill="#FF8A7A" ${st}/><path d="M-10 -44 Q-2 -52 -10 -60 M6 -44 Q14 -52 6 -60 M22 -40 Q30 -48 22 -56" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`,
      scale: `<rect x="-34" y="-24" width="68" height="52" rx="12" fill="#fff" ${st}/><path d="M-16 -8 Q0 -20 16 -8" fill="none" ${st}/><path d="M0 -8 L8 -16" ${st}/><path d="M-8 14 L8 14" ${st}/>`,
      ribbon: `<path d="M0 -10 Q-22 -40 -6 -40 Q0 -40 0 -26 Q0 -40 6 -40 Q22 -40 0 -10 L-20 34 M0 -10 L20 34" fill="none" stroke="${RED}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
      lock: `<rect x="-24" y="-6" width="48" height="40" rx="8" fill="${C.sun}" ${st}/><path d="M-14 -6 L-14 -20 Q-14 -38 0 -38 Q14 -38 14 -20 L14 -6" fill="none" ${st} stroke-width="7"/>`,
      moon: `<path d="M12 -34 Q-30 -26 -26 8 Q-20 38 16 34 Q-8 22 -6 -4 Q-4 -24 12 -34Z" fill="${C.sun}" ${st}/><path d="M22 -14 L30 -14 M26 -18 L26 -10" ${st}/>`,
    };
    const sign = (id, x, icon, text) => `<div id="${id}" class="abs f14-sign" style="left:${x}px;top:400px;opacity:0">
        <svg width="90" height="90" viewBox="-48 -62 96 110">${icon}</svg><div class="label" style="font-size:27px;line-height:1.1;text-align:center">${text}</div></div>`;
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f14-sign { width:250px; height:210px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:10px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #f14-ce { left:500px; top:66px; font-size:36px; color:${RED}; }
        #f14-big { left:500px; top:112px; width:1330px; height:240px; display:flex; align-items:center; gap:30px; padding:16px 30px; background:#fff; border:8px solid ${RED}; border-radius:26px; box-shadow:10px 10px 0 ${C.ink}; }
        #f14-big .a { font-size:40px; line-height:1.15; }
        #f14-big .b { font-size:46px; color:${RED}; margin-top:8px; }
        #f14-big .c { font-size:28px; opacity:0.8; }
        #f14-em { left:500px; top:680px; width:1330px; height:110px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:52px; box-shadow:8px 8px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="20" y="20" width="1880" height="1040" rx="30" fill="none" stroke="${RED}" stroke-width="12" opacity="0.5"/>
      <g id="f14-stop" opacity="0"><g transform="translate(260,300)"><g id="f14-stop-in">
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 190).toFixed(1)} ${(Math.sin(a) * 190).toFixed(1)}`; }).join(" ")} Z" fill="${RED}" stroke="${C.ink}" stroke-width="10" stroke-linejoin="round"/>
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 166).toFixed(1)} ${(Math.sin(a) * 166).toFixed(1)}`; }).join(" ")} Z" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>
        <text x="0" y="30" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="96" fill="#fff">PARE</text>
      </g></g></g>
      <rect id="f14-pole" opacity="0" x="250" y="480" width="20" height="340" fill="${C.grey}" stroke="${C.ink}" stroke-width="6"/>
    </svg>
    <div id="f14-ce" class="abs label" style="opacity:0">SINAIS DE ALERTA</div>
    <div id="f14-big" class="abs" style="opacity:0">
      <svg width="230" height="200" viewBox="0 0 230 200" style="flex:none">
        <line x1="10" y1="186" x2="220" y2="186" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
        <g id="f14-fall"><path d="M80 40 L90 110 L110 180" fill="none" stroke="#C98A5E" stroke-width="22" stroke-linecap="round"/><ellipse cx="96" cy="104" rx="16" ry="20" fill="#D9A070" ${st}/></g>
        <g id="f14-bone" opacity="0"><path d="M118 86 L140 70 L132 92 L156 84 L140 108 L164 110 L136 118" fill="${C.sun}" stroke="${RED}" stroke-width="5" stroke-linejoin="round"/><text x="130" y="160" font-family="Montserrat" font-weight="900" font-size="26" fill="${RED}">CRACK!</text></g>
        <path id="f14-x" opacity="0" d="M20 20 L60 60 M60 20 L20 60" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>
      </svg>
      <div><div class="a label">Estalo num salto + <b>não consegue esticar</b> a perna</div>
        <div id="f14-fr" class="b title" style="opacity:0">pode ser RUPTURA DO TENDÃO</div>
        <div id="f14-id" class="c label" style="opacity:0">avaliação médica urgente</div></div>
    </div>
    ${sign("f14-s0", 500, ic.hot, "Inchado, quente,<br>vermelho + febre")}
    ${sign("f14-s1", 770, ic.lock, "Travamento<br>verdadeiro")}
    ${sign("f14-s2", 1040, ic.moon, "Dor forte e<br>constante à noite")}
    <div id="f14-em" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA URGENTE!</div>`,
      js: function (tl, K, R) {
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f14-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f14-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        tl.to("#f14-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, K.inch - 0.75);
        tl.to("#f14-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, K.inch - 0.75);
        tl.to("#f14-pole", { opacity: 1, duration: 0.3 }, K.inch - 0.2);
        R.fadeIn(tl, "#f14-ce", K.inch - 0.2, 0.3);
        // joelho inchado, quente e vermelho com febre
        R.pop(tl, "#f14-s0", K.inch - 0.1, 0.4, 0.6);
        tl.to("#f14-s0", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }, K.feb);
        // destaque: estalo + não conseguir esticar = ruptura do tendão
        R.pop(tl, "#f14-big", K.queda - 0.1, 0.45, 0.7);
        R.pop(tl, "#f14-bone", K.queda, 0.3);
        R.pop(tl, "#f14-x", K.apoiar, 0.3);
        R.rise(tl, "#f14-fr", K.frat - 0.1, 0.35, 16);
        tl.to("#f14-big", { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.frat + 0.3);
        R.rise(tl, "#f14-id", K.av - 0.1, 0.35, 12);
        R.pop(tl, "#f14-em", K.rap - 0.2, 0.4, 0.7);
        tl.to("#f14-em", { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.rap + 0.3);
        // travamento e dor noturna
        R.pop(tl, "#f14-s1", K.trav - 0.2, 0.4, 0.6);
        R.pop(tl, "#f14-s2", K.noi - 0.2, 0.4, 0.6);
        tl.to("#f14-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.noi + 0.4);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        { name: "whoosh-short", t: k.inch - 0.75, vol: 0.35 },
        { name: "click", t: k.queda, vol: 0.4 },
        { name: "impact-bass-2", t: k.rap - 0.2, vol: 0.45 },
      ],
    };
  },
};
