// F15 — Bandeiras vermelhas (tom sério): estalo/chute atrás da perna (ruptura), dor após antibiótico, inchaço quente com febre, várias articulações
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), s: [w(0, "estalo"), w(0, "antibióticos"), w(0, "inchaço"), w(0, "várias")],
      rupt: w(0, "ruptura"), av: w(0, "avaliação"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = [
      // estalo atrás da perna
      `<path d="M-10 -46 L-10 24 L22 24" fill="none" stroke="${C.skinA}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="M-10 -46 L-10 24 L22 24" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/><path d="M-40 -6 L-26 0 L-40 8 M-44 -20 L-26 -10 M-44 22 L-26 12" stroke="${RED}" stroke-width="5" stroke-linecap="round"/><text x="10" y="-18" font-family="Montserrat" font-weight="900" font-size="22" fill="${RED}">PÁ!</text>`,
      // comprimido
      `<rect x="-36" y="-16" width="72" height="32" rx="16" fill="#fff" ${st}/><path d="M0 -16 L0 16" ${st}/><rect x="-36" y="-16" width="36" height="32" rx="16" fill="${RED}" ${st}/>`,
      // inchaço quente + termômetro
      `<circle cx="-10" cy="4" r="28" fill="#FF8A7A" ${st}/><path d="M-24 -40 Q-18 -48 -24 -56 M-8 -40 Q-2 -48 -8 -56" fill="none" stroke="${RED}" stroke-width="4"/><rect x="22" y="-36" width="14" height="46" rx="7" fill="#fff" ${st} stroke-width="4"/><circle cx="29" cy="18" r="11" fill="${RED}" ${st} stroke-width="4"/>`,
      // várias articulações
      `<circle cx="-26" cy="-24" r="12" fill="#FF8A7A" ${st} stroke-width="4"/><circle cx="24" cy="-24" r="12" fill="#FF8A7A" ${st} stroke-width="4"/><circle cx="-26" cy="24" r="12" fill="#FF8A7A" ${st} stroke-width="4"/><circle cx="24" cy="24" r="12" fill="#FF8A7A" ${st} stroke-width="4"/><path d="M-26 -12 L-26 12 M24 -12 L24 12" ${st} stroke-width="4"/>`,
    ];
    const tx = ["<b>Estalo</b> de repente, como um <b>chute</b> atrás da perna, e não fica na ponta do pé", "Dor que começou depois de<br>certos <b>antibióticos</b>", "Inchaço <b>quente e vermelho</b><br>com <b>febre</b>", "Dor em <b>várias articulações</b><br>ao mesmo tempo"];
    const pos = [[500, 120], [1160, 120], [500, 430], [1160, 430]];
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f15-sign { width:620px; height:230px; display:flex; align-items:center; gap:18px; padding:10px 24px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #root .f15-sign b { color:${RED}; }
        #f15-ce { left:500px; top:60px; font-size:36px; color:${RED}; }
        #f15-tv { left:520px; top:366px; padding:8px 20px; font-size:34px; color:#fff; background:${RED}; border:6px solid ${C.ink}; border-radius:14px; transform:rotate(-3deg); }
        #f15-em { left:500px; top:680px; width:1280px; height:120px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:56px; box-shadow:8px 8px 0 ${C.ink}; }
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
    ${tx.map((t, i) => { const [x, y] = pos[i]; return `<div id="f15-s${i}" class="abs f15-sign" style="left:${x}px;top:${y}px;opacity:0"><svg width="110" height="110" viewBox="-55 -55 110 110" style="flex:none">${ic[i]}</svg><div class="label" style="font-size:31px;line-height:1.15">${t}</div></div>`; }).join("")}
    <div id="f15-tv" class="abs title" style="opacity:0">PODE SER RUPTURA: URGENTE</div>
    <div id="f15-em" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA RÁPIDA</div>`,
      js: function (tl, K, R) {
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f15-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f15-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        const mv = Math.max(t0 + 0.55, Math.min(K.s[0] - 0.75, t0 + 0.6));
        tl.to("#f15-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, mv);
        tl.to("#f15-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, mv);
        tl.to("#f15-pole", { opacity: 1, duration: 0.3 }, mv + 0.4);
        R.fadeIn(tl, "#f15-ce", mv + 0.4, 0.3);
        K.s.forEach((t, i) => R.pop(tl, `#f15-s${i}`, t - 0.15, 0.4, 0.6));
        // ruptura: destaque
        R.pop(tl, "#f15-tv", K.rupt, 0.4, 0.6);
        tl.to("#f15-s0", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1 }, K.rupt);
        R.pop(tl, "#f15-em", K.av - 0.2, 0.4, 0.7);
        tl.to("#f15-em", { scale: 1.04, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
        tl.to("#f15-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        ...k.s.map((t) => ({ name: "click-soft", t: t - 0.1, vol: 0.4 })),
        { name: "impact-bass-2", t: k.rupt, vol: 0.4 },
        { name: "impact-bass-2", t: k.av - 0.2, vol: 0.45 },
      ],
    };
  },
};
