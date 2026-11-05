// F16 — Outros impostores que imitam a síndrome do piriforme
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "sacroilíaca"), w(0, "bursite"), w(0, "tendão"), w(0, "próprio")],
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // cada suspeito: corpo (blob colorido), um ícone no peito, olhos desconfiados
    const sus = [
      { name: "SACROILÍACA", hint: "“Dói na base<br>da coluna”", color: C.bone,
        icon: `<path d="M-30 -36 L30 -36 L18 30 L0 40 L-18 30 Z" fill="#fff" ${st}/><path d="M-10 -20 L-6 20 M10 -20 L6 20" ${st}/>` },
      { name: "BURSITE", hint: "“Dói na lateral<br>do quadril”", color: "#F6B8C4",
        icon: `<circle cx="0" cy="0" r="30" fill="#fff" ${st}/><circle cx="16" cy="0" r="12" fill="${C.pain}" ${st}/>` },
      { name: "ISQUIOTIBIAIS", hint: "“Dói no osso<br>de sentar”", color: C.sky,
        icon: `<rect x="-36" y="-10" width="72" height="18" rx="6" fill="#C98A4B" ${st}/><path d="M-28 8 L-28 40 M28 8 L28 40" ${st}/><circle cx="0" cy="-28" r="12" fill="${C.pain}" ${st}/>` },
      { name: "QUADRIL", hint: "“Dói na<br>virilha”", color: C.good,
        icon: `<path d="M-38 -10 Q-38 -40 0 -40 Q38 -40 38 -10" fill="none" ${st} stroke-width="9"/><circle cx="0" cy="-6" r="22" fill="#fff" ${st}/><path d="M10 12 L30 40" ${st} stroke-width="14"/>` },
    ];

    const X = (i) => 330 + i * 420;
    const suspect = (s, i) => `
      <g id="f16-s${i}"><g transform="translate(${X(i)},430) scale(1.15)">
        <g id="f16-b${i}">
          <path d="M-95 150 Q-110 -60 -60 -110 Q0 -150 60 -110 Q110 -60 95 150 Z" fill="${s.color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="-28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/><ellipse cx="28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          <g id="f16-pu${i}"><circle cx="-28" cy="-56" r="6" fill="${C.ink}"/><circle cx="28" cy="-56" r="6" fill="${C.ink}"/></g>
          <path d="M-46 -78 L-12 -70 M46 -78 L12 -70" ${st} stroke-width="7"/>
          <path d="M-18 -22 Q0 -30 18 -22" fill="none" ${st}/>
          <g transform="translate(0,48)">${s.icon}</g>
        </g>
        <rect x="-118" y="130" width="236" height="56" rx="10" fill="${C.ink}"/>
        <text x="0" y="168" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${s.name.length > 11 ? 24 : 28}" fill="#fff">${s.name}</text>
      </g></g>`;
    return {
      k,
      css: `
        #f16-title { left:0; right:0; top:46px; text-align:center; font-size:76px; }
        #f16-title span { color:${C.pain}; }
        #root .f16-hint { position:absolute; top:680px; width:360px; text-align:center; font-size:32px; line-height:1.15; padding:12px 10px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#DCE8E6"/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1860" y2="${200 + i * 80}" stroke="${C.ink}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.25"/><text x="70" y="${192 + i * 80}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.4">${(2.0 - i * 0.2).toFixed(1)}</text>`).join("")}
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${sus.map(suspect).join("")}
      <rect id="f16-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
    </svg>
    <div id="f16-title" class="abs title" style="opacity:0">Outros <span>IMPOSTORES</span></div>
    ${sus.map((s, i) => `<div id="f16-h${i}" class="f16-hint card label" style="left:${X(i) - 180}px;opacity:0">${s.hint}</div>`).join("")}`,
      js: function (tl, K, R) {
        R.drop(tl, "#f16-title", 0.1, 0.7, -260);
        // suspeitos entram em fila, um após o outro
        for (let i = 0; i < 4; i++) tl.fromTo(`#f16-s${i}`, { x: -1400, opacity: 1 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2 + i * 0.12);
        // olhares desconfiados (finito)
        for (let i = 0; i < 4; i++) {
          tl.to(`#f16-pu${i}`, { x: -7, duration: 0.25, ease: "power1.inOut" }, 1.2 + i * 0.1);
          tl.to(`#f16-pu${i}`, { x: 7, duration: 0.4, ease: "power1.inOut" }, 1.8 + i * 0.1);
          tl.to(`#f16-pu${i}`, { x: 0, duration: 0.3, ease: "power1.inOut" }, 2.5 + i * 0.1);
        }
        // cada suspeito "acende" quando é citado: flash de foto, os outros escurecem
        K.s.forEach((t, i) => {
          tl.fromTo("#f16-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, t - 0.05);
          for (let j = 0; j < 4; j++) tl.to(`#f16-s${j}`, { opacity: j === i ? 1 : 0.35, duration: 0.2 }, t - 0.05);
          tl.fromTo(`#f16-b${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          if (i > 0) R.fadeOut(tl, `#f16-h${i - 1}`, t - 0.1, 0.2);
          R.pop(tl, `#f16-h${i}`, t + 0.1, 0.4);
        });
        // no fim, todos voltam (são só impostores)
        tl.to("#f16-s0, #f16-s1, #f16-s2, #f16-s3", { opacity: 1, duration: 0.3 }, K.dur - 0.9);
        R.fadeOut(tl, "#f16-h3", K.dur - 0.9, 0.25);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        ...k.s.map((t) => ({ name: "click", t: t - 0.05, vol: 0.5 })),
      ],
    };
  },
};
