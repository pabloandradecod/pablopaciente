// F15 — Bandeiras vermelhas (tom sério): ombro + aperto no peito (coração), queda/deformidade, ombro quente com febre, dor noturna forte, perda de peso
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), s: [w(0, "aperto"), w(0, "Queda"), w(0, "quente"), w(0, "noite"), w(0, "peso")],
      rupt: w(0, "coração"), av: w(0, "avaliação"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = [
      // coração + ombro esquerdo
      `<path d="M0 30 Q-44 2 -40 -20 Q-36 -42 -14 -38 Q-4 -36 0 -24 Q4 -36 14 -38 Q36 -42 40 -20 Q44 2 0 30 Z" fill="${RED}" ${st}/><path d="M-26 -6 L-12 -6 L-6 -18 L4 8 L10 -6 L26 -6" fill="none" stroke="#fff" stroke-width="5"/>`,
      // queda / ombro deformado
      `<circle cx="-20" cy="-30" r="12" fill="${C.skinA}" ${st} stroke-width="4"/><path d="M-14 -16 L10 10 M-4 -4 L-30 4 M10 10 L30 0 M10 10 L4 36" ${st} stroke-width="7"/><path d="M-44 40 L44 40" ${st}/><path d="M22 -36 L30 -24 M34 -32 L38 -20" stroke="${RED}" stroke-width="4"/>`,
      // ombro quente + termômetro
      `<circle cx="-10" cy="4" r="28" fill="#FF8A7A" ${st}/><path d="M-24 -40 Q-18 -48 -24 -56 M-8 -40 Q-2 -48 -8 -56" fill="none" stroke="${RED}" stroke-width="4"/><rect x="22" y="-36" width="14" height="46" rx="7" fill="#fff" ${st} stroke-width="4"/><circle cx="29" cy="18" r="11" fill="${RED}" ${st} stroke-width="4"/>`,
      // noite
      `<path d="M10 -36 Q-30 -30 -30 4 Q-28 38 14 38 Q-10 22 -10 0 Q-10 -24 10 -36 Z" fill="#FFE79A" ${st}/><path d="M18 -8 L30 -2 M22 10 L34 14" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`,
      // balança: perda de peso
      `<rect x="-40" y="-4" width="80" height="40" rx="10" fill="#fff" ${st}/><circle cx="0" cy="16" r="12" fill="none" ${st} stroke-width="4"/><path d="M0 16 L-8 8" ${st} stroke-width="4"/><path d="M0 -40 L0 -14 M-10 -24 L0 -12 L10 -24" fill="none" stroke="${RED}" stroke-width="6"/>`,
    ];
    const tx = ["Dor no ombro com <b>aperto no peito</b>, falta de ar ou suor frio", "<b>Queda</b> com perda de força ou ombro <b>deformado</b>", "Ombro <b>quente</b> com <b>febre</b>", "Dor forte à <b>noite</b> que não melhora com nada", "Perda de <b>peso</b> sem explicação"];
    const pos = [[500, 110], [1160, 110], [500, 290], [1160, 290], [500, 470]];
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f15-sign { width:620px; height:160px; display:flex; align-items:center; gap:18px; padding:10px 24px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #root .f15-sign b { color:${RED}; }
        #f15-ce { left:500px; top:60px; font-size:36px; color:${RED}; }
        #f15-tv { left:1160px; top:490px; width:620px; padding:22px 20px; text-align:center; font-size:38px; color:#fff; background:${RED}; border:6px solid ${C.ink}; border-radius:14px; transform:rotate(-3deg); }
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
    ${tx.map((t, i) => { const [x, y] = pos[i]; return `<div id="f15-s${i}" class="abs f15-sign" style="left:${x}px;top:${y}px;opacity:0"><svg width="110" height="110" viewBox="-55 -55 110 110" style="flex:none;width:96px;height:96px">${ic[i]}</svg><div class="label" style="font-size:30px;line-height:1.15">${t}</div></div>`; }).join("")}
    <div id="f15-tv" class="abs title" style="opacity:0">PODE SER O CORAÇÃO: EMERGÊNCIA</div>
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
        // coração: destaque
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
