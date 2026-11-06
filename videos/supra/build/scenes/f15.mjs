// F15 — Os impostores (ombro congelado, pescoço, artrose, tendão do bíceps) e, em tom sério, as bandeiras vermelhas
// (ombro + aperto no peito = coração; queda com braço que não sobe; febre; perda de peso)
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w, we } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "congelado"), w(0, "pescoço"), w(0, "artrose"), w(0, "bíceps")], end: we(0, "frente"),
      at: w(0, "atenção"), r: [w(0, "aperto"), w(0, "Queda"), w(0, "febre"), w(0, "perda")], cor: w(0, "coração"), av: w(0, "avaliação"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const sus = [
      { name: "OMBRO CONGELADO", hint: "“Trava até quando<br><b>OUTRA PESSOA</b><br>tenta mexer”", color: "#CDEFFF",
        icon: `<rect x="-42" y="-34" width="84" height="68" rx="10" fill="#E6F8FF" ${st}/><path d="M-30 -20 L-14 -30 M14 20 L30 8" stroke="#fff" stroke-width="6"/><circle cx="0" cy="0" r="16" fill="${C.bone}" ${st} stroke-width="4"/>` },
      { name: "PESCOÇO", hint: "“Dor <b>descendo</b> +<br><b>formigamento</b> +<br>fraqueza”", color: "#E3D6FF",
        icon: `<rect x="-14" y="-40" width="28" height="22" rx="6" fill="${C.bone}" ${st} stroke-width="4"/><rect x="-14" y="-12" width="28" height="22" rx="6" fill="${C.bone}" ${st} stroke-width="4"/><path d="M14 -2 Q40 10 30 40" fill="none" stroke="#B79CF2" stroke-width="8" stroke-linecap="round"/><path d="M36 14 L44 22 L36 28 L44 36" fill="none" stroke="${C.sun}" stroke-width="5" stroke-linecap="round"/>` },
      { name: "ARTROSE DO OMBRO", hint: "“Desgaste da<br><b>ARTICULAÇÃO</b>,<br>rangidos”", color: "#FFE0A8",
        icon: `<circle cx="-8" cy="0" r="30" fill="${C.bone}" ${st}/><path d="M24 -32 Q40 0 24 32" fill="none" ${st} stroke-width="8"/><path d="M-20 -14 L-10 -4 M-24 10 L-14 6" stroke="${C.pain}" stroke-width="4"/>` },
      { name: "TENDÃO DO BÍCEPS", hint: "“Dói na<br><b>FRENTE</b><br>do ombro”", color: "#FFD3CC",
        icon: `<path d="M-30 30 Q-40 -10 -10 -30 Q20 -40 34 -20" fill="none" stroke="#E0675A" stroke-width="22" stroke-linecap="round"/><path d="M-30 30 Q-40 -10 -10 -30 Q20 -40 34 -20" fill="none" stroke="${C.ink}" stroke-width="4"/><circle cx="30" cy="-22" r="12" fill="${C.pain}" opacity="0.6"/><circle cx="30" cy="-22" r="6" fill="${C.pain}"/>` },
    ];
    const X = (i) => 300 + i * 440;
    const suspect = (s, i) => `
      <g id="f15-s${i}"><g transform="translate(${X(i)},460) scale(0.85)">
        <g id="f15-b${i}">
          <path d="M-95 150 Q-110 -60 -60 -110 Q0 -150 60 -110 Q110 -60 95 150 Z" fill="${s.color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="-28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/><ellipse cx="28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          <g id="f15-pu${i}"><circle cx="-28" cy="-56" r="6" fill="${C.ink}"/><circle cx="28" cy="-56" r="6" fill="${C.ink}"/></g>
          <path d="M-46 -78 L-12 -70 M46 -78 L12 -70" ${st} stroke-width="7"/>
          <path d="M-18 -22 Q0 -30 18 -22" fill="none" ${st}/>
          <g transform="translate(0,48)">${s.icon}</g>
        </g>
        <rect x="-122" y="130" width="244" height="56" rx="10" fill="${C.ink}"/>
        <text x="0" y="167" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${s.name.length > 15 ? 18 : 22}" fill="#fff">${s.name}</text>
      </g></g>`;
    const ic = [
      `<path d="M0 30 Q-44 2 -40 -20 Q-36 -42 -14 -38 Q-4 -36 0 -24 Q4 -36 14 -38 Q36 -42 40 -20 Q44 2 0 30 Z" fill="${RED}" ${st}/><path d="M-26 -6 L-12 -6 L-6 -18 L4 8 L10 -6 L26 -6" fill="none" stroke="#fff" stroke-width="5"/>`,
      `<circle cx="-20" cy="-30" r="12" fill="${C.skinA}" ${st} stroke-width="4"/><path d="M-14 -16 L10 10 M-4 -4 L-30 4 M10 10 L30 0 M10 10 L4 36" ${st} stroke-width="7"/><path d="M-44 40 L44 40" ${st}/><path d="M22 -36 L30 -24 M34 -32 L38 -20" stroke="${RED}" stroke-width="4"/>`,
      `<circle cx="-10" cy="4" r="28" fill="#FF8A7A" ${st}/><path d="M-24 -40 Q-18 -48 -24 -56 M-8 -40 Q-2 -48 -8 -56" fill="none" stroke="${RED}" stroke-width="4"/><rect x="22" y="-36" width="14" height="46" rx="7" fill="#fff" ${st} stroke-width="4"/><circle cx="29" cy="18" r="11" fill="${RED}" ${st} stroke-width="4"/>`,
      `<rect x="-40" y="-4" width="80" height="40" rx="10" fill="#fff" ${st}/><circle cx="0" cy="16" r="12" fill="none" ${st} stroke-width="4"/><path d="M0 16 L-8 8" ${st} stroke-width="4"/><path d="M0 -40 L0 -14 M-10 -24 L0 -12 L10 -24" fill="none" stroke="${RED}" stroke-width="6"/>`,
    ];
    const tx = ["Dor no ombro com <b>aperto no peito</b>", "<b>Queda</b> com o braço que <b>não sobe</b>", "Ombro quente com <b>febre</b>", "Perda de <b>peso</b> sem explicação"];
    const pos = [[500, 130], [1160, 130], [500, 320], [1160, 320]];
    return {
      k,
      css: `
        #f15-title { left:0; right:0; top:46px; text-align:center; font-size:76px; }
        #f15-title span { color:${C.pain}; }
        #root .f15-hint { position:absolute; top:640px; width:320px; text-align:center; font-size:28px; line-height:1.15; padding:12px 10px; }
        #root .f15-hint b { color:${C.pain}; }
        #root .f15-sign { width:620px; height:160px; display:flex; align-items:center; gap:18px; padding:10px 24px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #root .f15-sign b { color:${RED}; }
        #f15-ce { left:500px; top:72px; font-size:36px; color:${RED}; }
        #f15-tv { left:500px; top:530px; width:1280px; padding:18px 20px; text-align:center; font-size:44px; color:#fff; background:${RED}; border:6px solid ${C.ink}; border-radius:14px; }
        #f15-em { left:500px; top:700px; width:1280px; height:120px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:56px; box-shadow:8px 8px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f15-lineup">
        <rect width="1920" height="1080" fill="#DCE8E6"/>
        ${Array.from({ length: 7 }, (_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1860" y2="${200 + i * 80}" stroke="${C.ink}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.25"/><text x="70" y="${192 + i * 80}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.4">${(2.0 - i * 0.2).toFixed(1)}</text>`).join("")}
        <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
        <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
        ${sus.map(suspect).join("")}
      </g>
      <g id="f15-red" opacity="0">
        <rect width="1920" height="1080" fill="#F7DCD6"/>
        <rect x="20" y="20" width="1880" height="1040" rx="30" fill="none" stroke="${RED}" stroke-width="12" opacity="0.5"/>
        <g id="f15-stop"><g transform="translate(260,300)"><g id="f15-stop-in">
          <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 190).toFixed(1)} ${(Math.sin(a) * 190).toFixed(1)}`; }).join(" ")} Z" fill="${RED}" stroke="${C.ink}" stroke-width="10" stroke-linejoin="round"/>
          <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 166).toFixed(1)} ${(Math.sin(a) * 166).toFixed(1)}`; }).join(" ")} Z" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>
          <text x="0" y="30" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="96" fill="#fff">PARE</text>
        </g></g></g>
        <rect id="f15-pole" opacity="0" x="250" y="480" width="20" height="340" fill="${C.grey}" stroke="${C.ink}" stroke-width="6"/>
      </g>
      <rect id="f15-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
    </svg>
    <div id="f15-title" class="abs title" style="opacity:0">Cuidado com os <span>IMPOSTORES</span></div>
    ${sus.map((s, i) => `<div id="f15-h${i}" class="f15-hint card label" style="left:${X(i) - 160}px;opacity:0">${s.hint}</div>`).join("")}
    <div id="f15-ce" class="abs label" style="opacity:0">SINAIS DE ALERTA</div>
    ${tx.map((t, i) => { const [x, y] = pos[i]; return `<div id="f15-r${i}" class="abs f15-sign" style="left:${x}px;top:${y}px;opacity:0"><svg width="110" height="110" viewBox="-55 -55 110 110" style="flex:none;width:96px;height:96px">${ic[i]}</svg><div class="label" style="font-size:32px;line-height:1.15">${t}</div></div>`; }).join("")}
    <div id="f15-tv" class="abs title" style="opacity:0">PODE SER O CORAÇÃO: EMERGÊNCIA</div>
    <div id="f15-em" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA RÁPIDA</div>`,
      js: function (tl, K, R) {
        // parte 1: impostores
        R.drop(tl, "#f15-title", 0.05, 0.6, -260);
        for (let i = 0; i < 4; i++) tl.fromTo(`#f15-s${i}`, { x: -1400, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.05 + i * 0.08);
        K.s.forEach((t, i) => {
          for (let j = 0; j < 4; j++) tl.to(`#f15-s${j}`, { opacity: j === i ? 1 : 0.35, duration: 0.2 }, Math.max(0.9, t - 0.05));
          tl.fromTo(`#f15-b${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, Math.max(0.9, t));
          if (i > 0) R.fadeOut(tl, `#f15-h${i - 1}`, t - 0.1, 0.2);
          R.pop(tl, `#f15-h${i}`, Math.max(0.9, t + 0.1), 0.4);
          tl.to(`#f15-pu${i}`, { x: 7, duration: 0.2, yoyo: true, repeat: 1 }, Math.max(0.9, t + 0.2));
        });
        // parte 2: bandeiras vermelhas (sério)
        const t0 = K.at - 0.35;
        R.fadeOut(tl, "#f15-h3, #f15-title", t0, 0.25);
        tl.set("#f15-flash", { opacity: 0.8 }, t0);
        tl.to("#f15-flash", { opacity: 0, duration: 0.35 }, t0 + 0.05);
        tl.to("#f15-lineup", { opacity: 0, duration: 0.3 }, t0);
        tl.to("#f15-red", { opacity: 1, duration: 0.3 }, t0);
        tl.fromTo("#f15-stop", { x: 700, y: 240 }, { x: 700, y: 240, duration: 0.01 }, t0);
        tl.fromTo("#f15-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        const mv = Math.max(t0 + 0.55, Math.min(K.r[0] - 0.75, t0 + 0.6));
        tl.to("#f15-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, mv);
        tl.to("#f15-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, mv);
        tl.to("#f15-pole", { opacity: 1, duration: 0.3 }, mv + 0.4);
        R.fadeIn(tl, "#f15-ce", mv + 0.4, 0.3);
        K.r.forEach((t, i) => R.pop(tl, `#f15-r${i}`, t - 0.15, 0.4, 0.6));
        R.pop(tl, "#f15-tv", K.cor, 0.4, 0.6);
        tl.to("#f15-r0", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1 }, K.cor);
        R.fadeOut(tl, "#f15-tv", K.r[1] - 0.3, 0.25);
        R.pop(tl, "#f15-em", K.av - 0.2, 0.4, 0.7);
        tl.to("#f15-em", { scale: 1.04, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
        tl.to("#f15-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.av + 0.3);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        ...k.s.map((t) => ({ name: "click", t: Math.max(0.9, t - 0.05), vol: 0.45 })),
        { name: "impact-bass-1", t: k.at - 0.35, vol: 0.55 },
        ...k.r.map((t) => ({ name: "click-soft", t: t - 0.1, vol: 0.4 })),
        { name: "impact-bass-2", t: k.cor, vol: 0.4 },
        { name: "impact-bass-2", t: k.av - 0.2, vol: 0.45 },
      ],
    };
  },
};
