// F13 — Os impostores da lateral do joelho (com o Patelito inocente)
export default {
  speakers: { patelito: "f13pt" },
  tail: 1.0,
  build(ctx) {
    const { C, w, patelito, lines } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "menisco"), w(0, "ligamento"), w(0, "patelofemoral"), w(0, "tendão"), w(0, "fratura")],
      p0: lines[1].start, p1: lines[1].end, ino: w(1, "inocente"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // cada suspeito: corpo (blob colorido), um ícone no peito, olhos desconfiados
    const sus = [
      { name: "MENISCO LATERAL", hint: "“Dói NA LINHA<br>do joelho,<br>trava e incha”", color: "#D9C8FF",
        icon: `<path d="M-34 -10 Q0 -34 34 -10 Q0 4 -34 -10Z" fill="#fff" ${st}/><path d="M-10 -18 L4 -2" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>` },
      { name: "LIGAMENTO LATERAL", hint: "“Depois de<br>uma torção”", color: "#BFE8F7",
        icon: `<path d="M-30 -30 L30 30" stroke="#fff" stroke-width="16" stroke-linecap="round"/><path d="M-30 -30 L30 30" ${st} fill="none" stroke-width="4"/><path d="M-6 -10 L6 6" stroke="${C.pain}" stroke-width="6"/>` },
      { name: "PATELOFEMORAL", hint: "“Na FRENTE<br>da rótula”", color: "#FFE39A",
        icon: `<ellipse cx="0" cy="-6" rx="26" ry="30" fill="#fff" ${st}/><circle cx="0" cy="-6" r="44" fill="none" stroke="${C.pain}" stroke-width="5" stroke-dasharray="8 8"/>` },
      { name: "TENDÃO POSTEROLATERAL", hint: "“Atrás e<br>do lado<br>do joelho”", color: "#F6B8C4",
        icon: `<path d="M-6 -40 Q20 -10 -6 36" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M-6 -40 Q20 -10 -6 36" fill="none" ${st} stroke-width="4"/>` },
      { name: "FRATURA POR ESTRESSE", hint: "“Dói até<br>em repouso”", color: C.bone,
        icon: `<rect x="-14" y="-40" width="28" height="80" rx="10" fill="#fff" ${st}/><path d="M-14 -4 L-2 -10 L4 2 L14 -4" fill="none" stroke="${C.pain}" stroke-width="5"/>` },
    ];


    const N = 5; const X = (i) => 230 + i * 365;
    const suspect = (s, i) => `
      <g id="f13-s${i}"><g transform="translate(${X(i)},460) scale(0.85)">
        <g id="f13-b${i}">
          <path d="M-95 150 Q-110 -60 -60 -110 Q0 -150 60 -110 Q110 -60 95 150 Z" fill="${s.color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="-28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/><ellipse cx="28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          <g id="f13-pu${i}"><circle cx="-28" cy="-56" r="6" fill="${C.ink}"/><circle cx="28" cy="-56" r="6" fill="${C.ink}"/></g>
          <path d="M-46 -78 L-12 -70 M46 -78 L12 -70" ${st} stroke-width="7"/>
          <path d="M-18 -22 Q0 -30 18 -22" fill="none" ${st}/>
          <g transform="translate(0,48)">${s.icon}</g>
        </g>
        <rect x="-118" y="130" width="236" height="56" rx="10" fill="${C.ink}"/>
        <text x="0" y="168" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${s.name.length > 18 ? 15 : s.name.length > 14 ? 18 : 22}" fill="#fff">${s.name}</text>
      </g></g>`;
    return {
      k,
      css: `
        #f13-title { left:0; right:0; top:46px; text-align:center; font-size:76px; }
        #f13-title span { color:${C.pain}; }
        #root .f13-hint { position:absolute; top:640px; width:300px; text-align:center; font-size:27px; line-height:1.15; padding:12px 10px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#DCE8E6"/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1860" y2="${200 + i * 80}" stroke="${C.ink}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.25"/><text x="70" y="${192 + i * 80}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.4">${(2.0 - i * 0.2).toFixed(1)}</text>`).join("")}
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${sus.map(suspect).join("")}
      <rect id="f13-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
      <g id="f13-pt-wrap" opacity="0"><g transform="translate(960,870) scale(0.95)">${patelito("f13pt")}</g></g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">Cuidado com os <span>IMPOSTORES</span></div>
    ${sus.map((s, i) => `<div id="f13-h${i}" class="f13-hint card label" style="left:${X(i) - 150}px;opacity:0">${s.hint}</div>`).join("")}`,
      js: function (tl, K, R) {
        R.drop(tl, "#f13-title", 0.1, 0.7, -260);
        // suspeitos entram em fila, um após o outro
        for (let i = 0; i < 5; i++) tl.fromTo(`#f13-s${i}`, { x: -1400, opacity: 1 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2 + i * 0.12);
        // olhares desconfiados (finito)
        for (let i = 0; i < 5; i++) {
          tl.to(`#f13-pu${i}`, { x: -7, duration: 0.25, ease: "power1.inOut" }, 1.2 + i * 0.1);
          tl.to(`#f13-pu${i}`, { x: 7, duration: 0.4, ease: "power1.inOut" }, 1.8 + i * 0.1);
          tl.to(`#f13-pu${i}`, { x: 0, duration: 0.3, ease: "power1.inOut" }, 2.5 + i * 0.1);
        }
        // cada suspeito "acende" quando é citado: flash de foto, os outros escurecem
        K.s.forEach((t, i) => {
          tl.fromTo("#f13-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, t - 0.05);
          for (let j = 0; j < 5; j++) tl.to(`#f13-s${j}`, { opacity: j === i ? 1 : 0.35, duration: 0.2 }, t - 0.05);
          tl.fromTo(`#f13-b${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          if (i > 0) R.fadeOut(tl, `#f13-h${i - 1}`, t - 0.1, 0.2);
          R.pop(tl, `#f13-h${i}`, t + 0.1, 0.4);
        });
        // no fim, todos voltam (são só impostores)
        R.fadeOut(tl, "#f13-h4", K.p0 - 0.6, 0.25);
        tl.to("#f13-s0, #f13-s1, #f13-s2, #f13-s3, #f13-s4", { opacity: 0.35, duration: 0.3 }, K.p0 - 0.6);
        // Patelito entra: "Dessa vez eu sou inocente!"
        R.face(tl, "f13pt", 0, { eyes: "normal", mouth: "smile" });
        tl.set("#f13-pt-wrap", { opacity: 1 }, K.p0 - 0.6);
        tl.fromTo("#f13-pt-wrap", { y: 300 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.p0 - 0.6);
        R.pose(tl, "f13pt", K.p0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f13pt", K.ino, { eyes: "happy" });
        tl.to("#f13-s0, #f13-s1, #f13-s2, #f13-s3, #f13-s4", { opacity: 1, duration: 0.3 }, K.p1 + 0.1);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.p0 - 0.6, vol: 0.4 },
        ...k.s.map((t) => ({ name: "click", t: t - 0.05, vol: 0.5 })),
      ],
    };
  },
};
