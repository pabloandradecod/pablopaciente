// F15 — Os impostores da neuralgia obturatória
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "tendinopatia"), w(0, "pubalgia"), w(0, "quadril"), w(0, "hérnia"), w(0, "coluna")],
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // cada suspeito: corpo (blob colorido), um ícone no peito, olhos desconfiados
    const sus = [
      { name: "TENDÃO ADUTOR", hint: "“Dói no tendão,<br>perto do púbis.<br>Sem formigar”", color: "#F6B8C4",
        icon: `<path d="M-30 -30 Q0 -40 30 -30 L20 30 Q0 40 -20 30 Z" fill="#E86A5C" ${st}/><path d="M-30 -30 L-38 -44 M30 -30 L38 -44" ${st} stroke-width="9"/><circle cx="0" cy="-30" r="9" fill="${C.pain}" ${st} stroke-width="4"/>` },
      { name: "PUBALGIA", hint: "“Dor no púbis<br>do atleta”", color: "#FFE39A",
        icon: `<circle cx="0" cy="0" r="30" fill="#fff" ${st}/><path d="M0 -30 L0 30 M-30 0 L30 0" stroke="${C.ink}" stroke-width="4"/><path d="M-10 -10 L10 10 M10 -10 L-10 10" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>` },
      { name: "QUADRIL", hint: "“Dói na virilha<br>ao dobrar e girar”", color: C.good,
        icon: `<path d="M-38 -10 Q-38 -40 0 -40 Q38 -40 38 -10" fill="none" ${st} stroke-width="9"/><circle cx="0" cy="-6" r="22" fill="#fff" ${st}/><path d="M10 12 L30 40" ${st} stroke-width="14"/>` },
      { name: "HÉRNIA INGUINAL", hint: "“Caroço<br>na virilha”", color: C.sky,
        icon: `<path d="M-36 -30 L36 -30 L20 30 L-20 30 Z" fill="#F2C59A" ${st}/><circle cx="8" cy="4" r="14" fill="${C.pain}" ${st} stroke-width="4"/>` },
      { name: "RAIZ L3-L4", hint: "“Dor nas costas<br>+ joelho fraco”", color: C.bone,
        icon: `<rect x="-30" y="-40" width="60" height="30" rx="8" fill="#fff" ${st}/><rect x="-30" y="0" width="60" height="30" rx="8" fill="#fff" ${st}/><path d="M30 -6 Q46 0 44 26" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>` },
    ];

    const N = 5; const X = (i) => 220 + i * 370;
    const suspect = (s, i) => `
      <g id="f15-s${i}"><g transform="translate(${X(i)},440) scale(1.0)">
        <g id="f15-b${i}">
          <path d="M-95 150 Q-110 -60 -60 -110 Q0 -150 60 -110 Q110 -60 95 150 Z" fill="${s.color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="-28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/><ellipse cx="28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          <g id="f15-pu${i}"><circle cx="-28" cy="-56" r="6" fill="${C.ink}"/><circle cx="28" cy="-56" r="6" fill="${C.ink}"/></g>
          <path d="M-46 -78 L-12 -70 M46 -78 L12 -70" ${st} stroke-width="7"/>
          <path d="M-18 -22 Q0 -30 18 -22" fill="none" ${st}/>
          <g transform="translate(0,48)">${s.icon}</g>
        </g>
        <rect x="-118" y="130" width="236" height="56" rx="10" fill="${C.ink}"/>
        <text x="0" y="168" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${s.name.length > 12 ? 20 : s.name.length > 9 ? 23 : 28}" fill="#fff">${s.name}</text>
      </g></g>`;
    return {
      k,
      css: `
        #f15-title { left:0; right:0; top:46px; text-align:center; font-size:76px; }
        #f15-title span { color:${C.pain}; }
        #root .f15-hint { position:absolute; top:668px; width:330px; text-align:center; font-size:27px; line-height:1.15; padding:12px 10px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#DCE8E6"/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1860" y2="${200 + i * 80}" stroke="${C.ink}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.25"/><text x="70" y="${192 + i * 80}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.4">${(2.0 - i * 0.2).toFixed(1)}</text>`).join("")}
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${sus.map(suspect).join("")}
      <rect id="f15-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
    </svg>
    <div id="f15-title" class="abs title" style="opacity:0">Cuidado com os <span>IMPOSTORES</span></div>
    ${sus.map((s, i) => `<div id="f15-h${i}" class="f15-hint card label" style="left:${X(i) - 165}px;opacity:0">${s.hint}</div>`).join("")}`,
      js: function (tl, K, R) {
        R.drop(tl, "#f15-title", 0.1, 0.7, -260);
        // suspeitos entram em fila, um após o outro
        for (let i = 0; i < 5; i++) tl.fromTo(`#f15-s${i}`, { x: -1400, opacity: 1 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2 + i * 0.12);
        // olhares desconfiados (finito)
        for (let i = 0; i < 5; i++) {
          tl.to(`#f15-pu${i}`, { x: -7, duration: 0.25, ease: "power1.inOut" }, 1.2 + i * 0.1);
          tl.to(`#f15-pu${i}`, { x: 7, duration: 0.4, ease: "power1.inOut" }, 1.8 + i * 0.1);
          tl.to(`#f15-pu${i}`, { x: 0, duration: 0.3, ease: "power1.inOut" }, 2.5 + i * 0.1);
        }
        // cada suspeito "acende" quando é citado: flash de foto, os outros escurecem
        K.s.forEach((t, i) => {
          tl.fromTo("#f15-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, t - 0.05);
          for (let j = 0; j < 5; j++) tl.to(`#f15-s${j}`, { opacity: j === i ? 1 : 0.35, duration: 0.2 }, t - 0.05);
          tl.fromTo(`#f15-b${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          if (i > 0) R.fadeOut(tl, `#f15-h${i - 1}`, t - 0.1, 0.2);
          R.pop(tl, `#f15-h${i}`, t + 0.1, 0.4);
        });
        // no fim, todos voltam (são só impostores)
        tl.to("#f15-s0, #f15-s1, #f15-s2, #f15-s3, #f15-s4", { opacity: 1, duration: 0.3 }, K.dur - 0.9);
        R.fadeOut(tl, "#f15-h4", K.dur - 0.9, 0.25);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        ...k.s.map((t) => ({ name: "click", t: t - 0.05, vol: 0.5 })),
      ],
    };
  },
};
