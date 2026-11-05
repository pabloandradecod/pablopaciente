// F14 — Bandeiras vermelhas do joelho (tom sério): seis sinais e "avaliação médica"
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), s: [w(0, "inchado"), w(0, "travamento"), w(0, "falseio"), w(0, "febre"), w(0, "repouso"), w(0, "apoiar")],
      av: w(0, "avaliação"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = [
      `<circle r="30" fill="#FF8A7A" ${st}/><path d="M-12 -4 Q0 -14 12 -4" fill="none" ${st}/>`,
      `<rect x="-24" y="-6" width="48" height="40" rx="8" fill="${C.sun}" ${st}/><path d="M-14 -6 L-14 -20 Q-14 -38 0 -38 Q14 -38 14 -20 L14 -6" fill="none" ${st} stroke-width="7"/>`,
      `<path d="M-10 -40 L4 -6 L-10 4 L6 40" fill="none" stroke="#3E5A8A" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 -10 L28 -20 M16 4 L30 4" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`,
      `<rect x="-8" y="-36" width="16" height="50" rx="8" fill="#fff" ${st}/><circle cx="0" cy="22" r="14" fill="${RED}" ${st}/><rect x="-3" y="-18" width="6" height="36" fill="${RED}"/>`,
      `<path d="M12 -34 Q-30 -26 -26 8 Q-20 38 16 34 Q-8 22 -6 -4 Q-4 -24 12 -34Z" fill="${C.sun}" ${st}/>`,
      `<path d="M-30 20 L-30 -10 Q-30 -26 -10 -26 L24 -26 Q34 -26 34 -14 L34 20 Z" fill="#8E2F45" ${st}/><path d="M-36 -36 L40 32 M40 -36 L-36 32" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`,
    ];
    const tx = ["Joelho muito<br>inchado", "Travamento<br>verdadeiro", "Falseio depois<br>de uma torção", "Febre + joelho<br>quente e vermelho", "Dor forte<br>em repouso", "Não consegue<br>apoiar a perna"];
    const pos = (i) => [500 + (i % 3) * 445, 120 + Math.floor(i / 3) * 270];
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f14-sign { width:400px; height:230px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:10px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #f14-ce { left:500px; top:60px; font-size:36px; color:${RED}; }
        #f14-em { left:500px; top:690px; width:1300px; height:110px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:52px; box-shadow:8px 8px 0 ${C.ink}; }
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
    <div id="f14-ce" class="abs label" style="opacity:0">SINAIS DE ALERTA NO JOELHO</div>
    ${tx.map((t, i) => { const [x, y] = pos(i); return `<div id="f14-s${i}" class="abs f14-sign" style="left:${x}px;top:${y}px;opacity:0"><svg width="96" height="96" viewBox="-48 -48 96 96">${ic[i]}</svg><div class="label" style="font-size:30px;line-height:1.1;text-align:center">${t}</div></div>`; }).join("")}
    <div id="f14-em" class="abs title" style="opacity:0">PEDEM AVALIAÇÃO MÉDICA</div>`,
      js: function (tl, K, R) {
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f14-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f14-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        tl.to("#f14-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, K.s[0] - 0.75);
        tl.to("#f14-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, K.s[0] - 0.75);
        tl.to("#f14-pole", { opacity: 1, duration: 0.3 }, K.s[0] - 0.2);
        R.fadeIn(tl, "#f14-ce", K.s[0] - 0.2, 0.3);
        K.s.forEach((t, i) => R.pop(tl, `#f14-s${i}`, t - 0.15, 0.4, 0.6));
        R.pop(tl, "#f14-em", K.av - 0.2, 0.4, 0.7);
        tl.to("#f14-em", { scale: 1.04, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
        tl.to("#f14-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        { name: "whoosh-short", t: k.s[0] - 0.75, vol: 0.35 },
        ...k.s.map((t) => ({ name: "click-soft", t: t - 0.1, vol: 0.4 })),
        { name: "impact-bass-2", t: k.av - 0.2, vol: 0.45 },
      ],
    };
  },
};
