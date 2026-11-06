// F14 — Sinais de alerta (tom sério): joelho quente com febre, batata da perna inchada (trombose), trauma sem apoiar, dor forte à noite
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), s: [w(0, "quente"), w(0, "Batata"), w(0, "Trauma"), w(0, "noite")],
      tromb: w(0, "trombose"), av: w(0, "avaliação"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = [
      // joelho quente + termômetro
      `<circle cx="-10" cy="4" r="28" fill="#FF8A7A" ${st}/><path d="M-24 -40 Q-18 -48 -24 -56 M-8 -40 Q-2 -48 -8 -56" fill="none" stroke="${RED}" stroke-width="4"/><rect x="22" y="-36" width="14" height="46" rx="7" fill="#fff" ${st} stroke-width="4"/><circle cx="29" cy="18" r="11" fill="${RED}" ${st} stroke-width="4"/>`,
      // batata da perna inchada
      `<path d="M-14 -44 Q-16 -10 -30 8 Q-36 30 -12 42 L10 42 Q14 10 8 -44 Z" fill="#FF8A7A" ${st}/><path d="M-36 -8 Q-44 -2 -40 6 M-44 14 Q-50 22 -44 28" fill="none" stroke="${RED}" stroke-width="4"/>`,
      // trauma: perna com X no apoio
      `<path d="M-6 -44 L-6 20 L18 20" fill="none" stroke="#3E5A8A" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M-36 30 L36 30" ${st}/><path d="M18 -36 L42 -12 M42 -36 L18 -12" stroke="${RED}" stroke-width="7" stroke-linecap="round"/>`,
      // lua: dor à noite
      `<path d="M12 -34 Q-30 -26 -26 8 Q-20 38 16 34 Q-8 22 -6 -4 Q-4 -24 12 -34Z" fill="${C.sun}" ${st}/>`,
    ];
    const tx = ["Joelho <b>quente, vermelho</b><br>e muito inchado, com <b>febre</b>", "Batata da perna <b>inchada,<br>quente e dolorida</b>", "Trauma e <b>não consegue<br>apoiar</b> a perna", "Dor <b>forte à noite</b><br>que não melhora"];
    const pos = [[500, 120], [1160, 120], [500, 430], [1160, 430]];
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f14-sign { width:620px; height:230px; display:flex; align-items:center; gap:18px; padding:10px 24px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #root .f14-sign b { color:${RED}; }
        #f14-ce { left:500px; top:60px; font-size:36px; color:${RED}; }
        #f14-tv { left:1180px; top:366px; padding:8px 20px; font-size:34px; color:#fff; background:${RED}; border:6px solid ${C.ink}; border-radius:14px; transform:rotate(-3deg); }
        #f14-em { left:500px; top:680px; width:1280px; height:120px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:56px; box-shadow:8px 8px 0 ${C.ink}; }
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
    ${tx.map((t, i) => { const [x, y] = pos[i]; return `<div id="f14-s${i}" class="abs f14-sign" style="left:${x}px;top:${y}px;opacity:0"><svg width="110" height="110" viewBox="-55 -55 110 110" style="flex:none">${ic[i]}</svg><div class="label" style="font-size:32px;line-height:1.15">${t}</div></div>`; }).join("")}
    <div id="f14-tv" class="abs title" style="opacity:0">PODE SER TROMBOSE: URGENTE</div>
    <div id="f14-em" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA RÁPIDA</div>`,
      js: function (tl, K, R) {
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f14-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f14-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        const mv = Math.max(t0 + 0.55, Math.min(K.s[0] - 0.75, t0 + 0.6));
        tl.to("#f14-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, mv);
        tl.to("#f14-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, mv);
        tl.to("#f14-pole", { opacity: 1, duration: 0.3 }, mv + 0.4);
        R.fadeIn(tl, "#f14-ce", mv + 0.4, 0.3);
        K.s.forEach((t, i) => R.pop(tl, `#f14-s${i}`, t - 0.15, 0.4, 0.6));
        // trombose: destaque
        tl.to("#f14-s0", { opacity: 0.5, duration: 0.3 }, K.tromb - 0.3);
        tl.to("#f14-s1", { borderWidth: 12, scale: 1.06, duration: 0.3 }, K.tromb - 0.3);
        R.pop(tl, "#f14-tv", K.tromb, 0.4, 0.6);
        tl.to("#f14-s0", { opacity: 1, duration: 0.3 }, K.s[2] - 0.3);
        tl.to("#f14-s1", { scale: 1, duration: 0.3 }, K.s[2] - 0.3);
        R.pop(tl, "#f14-em", K.av - 0.2, 0.4, 0.7);
        tl.to("#f14-em", { scale: 1.04, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
        tl.to("#f14-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        ...k.s.map((t) => ({ name: "click-soft", t: t - 0.1, vol: 0.4 })),
        { name: "impact-bass-2", t: k.tromb, vol: 0.4 },
        { name: "impact-bass-2", t: k.av - 0.2, vol: 0.45 },
      ],
    };
  },
};
