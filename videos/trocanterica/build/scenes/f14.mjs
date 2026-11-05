// F14 — Os impostores da síndrome dolorosa do trocânter maior (com o Nervinho)
export default {
  speakers: { nervinho: "f14n" },
  tail: 1.0,
  build(ctx) {
    const { C, w, nervinho, lines } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "artrose"), w(0, "coluna"), w(0, "meralgia"), w(0, "ruptura")], n0: lines[1].start, n1: lines[1].end, oss: w(0, "ossinho"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // cada suspeito: corpo (blob colorido), um ícone no peito, olhos desconfiados
    const sus = [
      { name: "ARTROSE QUADRIL", hint: "“Dói mais<br>na virilha”", color: "#FFE39A",
        icon: `<path d="M-38 -10 Q-38 -40 0 -40 Q38 -40 38 -10" fill="none" ${st} stroke-width="9"/><circle cx="0" cy="-6" r="22" fill="#fff" ${st}/><path d="M-8 -14 L8 2 M8 -14 L-8 2" stroke="${C.pain}" stroke-width="5"/>` },
      { name: "COLUNA LOMBAR", hint: "“Dor nas costas<br>+ formigamento”", color: C.bone,
        icon: `<rect x="-30" y="-40" width="60" height="30" rx="8" fill="#fff" ${st}/><rect x="-30" y="0" width="60" height="30" rx="8" fill="#fff" ${st}/><path d="M30 -6 Q46 0 44 26" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>` },
      { name: "MERALGIA", hint: "“Formiga na lateral<br>da coxa, mas o<br>ossinho não dói”", color: "#D9C8FF",
        icon: `<path d="M-30 -30 Q-10 0 -20 30 M0 -34 Q20 0 10 32" fill="none" stroke="#8E6CD8" stroke-width="8" stroke-linecap="round"/><circle cx="24" cy="-20" r="5" fill="${C.ink}"/><circle cx="-6" cy="14" r="5" fill="${C.ink}"/>` },
      { name: "RUPTURA TENDÃO", hint: "“Fraqueza<br>importante<br>e manqueira”", color: "#F6B8C4",
        icon: `<path d="M-34 -10 L-6 -10 L-14 6 L-34 6 Z M34 -10 L8 -10 L16 6 L34 6 Z" fill="#F2E8D8" ${st}/><path d="M-4 -24 L4 -14 M4 14 L-4 24" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>` },
    ];


    const N = 4; const X = (i) => 290 + i * 450;
    const suspect = (s, i) => `
      <g id="f14-s${i}"><g transform="translate(${X(i)},440) scale(1.0)">
        <g id="f14-b${i}">
          <path d="M-95 150 Q-110 -60 -60 -110 Q0 -150 60 -110 Q110 -60 95 150 Z" fill="${s.color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="-28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/><ellipse cx="28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          <g id="f14-pu${i}"><circle cx="-28" cy="-56" r="6" fill="${C.ink}"/><circle cx="28" cy="-56" r="6" fill="${C.ink}"/></g>
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
        #f14-title { left:0; right:0; top:46px; text-align:center; font-size:76px; }
        #f14-title span { color:${C.pain}; }
        #root .f14-hint { position:absolute; top:668px; width:330px; text-align:center; font-size:27px; line-height:1.15; padding:12px 10px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#DCE8E6"/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1860" y2="${200 + i * 80}" stroke="${C.ink}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.25"/><text x="70" y="${192 + i * 80}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.4">${(2.0 - i * 0.2).toFixed(1)}</text>`).join("")}
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${sus.map(suspect).join("")}
      <g id="f14-n-wrap" opacity="0">${nervinho("f14n", [[1840, 300], [1852, 390], [1860, 490], [1866, 600], [1870, 720], [1876, 830]])}</g>
      <rect id="f14-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
    </svg>
    <div id="f14-title" class="abs title" style="opacity:0">Cuidado com os <span>IMPOSTORES</span></div>
    <div id="f14-nb" class="abs card label" style="left:1380px;top:170px;width:420px;padding:14px 18px;font-size:30px;text-align:center;opacity:0">"Essa área é minha... mas a dor <b style="color:${C.pain}">não</b> é minha!"</div>
    ${sus.map((s, i) => `<div id="f14-h${i}" class="f14-hint card label" style="left:${X(i) - 165}px;opacity:0">${s.hint}</div>`).join("")}`,
      js: function (tl, K, R) {
        R.drop(tl, "#f14-title", 0.1, 0.7, -260);
        // suspeitos entram em fila, um após o outro
        for (let i = 0; i < 4; i++) tl.fromTo(`#f14-s${i}`, { x: -1400, opacity: 1 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2 + i * 0.12);
        // olhares desconfiados (finito)
        for (let i = 0; i < 4; i++) {
          tl.to(`#f14-pu${i}`, { x: -7, duration: 0.25, ease: "power1.inOut" }, 1.2 + i * 0.1);
          tl.to(`#f14-pu${i}`, { x: 7, duration: 0.4, ease: "power1.inOut" }, 1.8 + i * 0.1);
          tl.to(`#f14-pu${i}`, { x: 0, duration: 0.3, ease: "power1.inOut" }, 2.5 + i * 0.1);
        }
        // cada suspeito "acende" quando é citado: flash de foto, os outros escurecem
        K.s.forEach((t, i) => {
          tl.fromTo("#f14-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, t - 0.05);
          for (let j = 0; j < 4; j++) tl.to(`#f14-s${j}`, { opacity: j === i ? 1 : 0.35, duration: 0.2 }, t - 0.05);
          tl.fromTo(`#f14-b${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          if (i > 0) R.fadeOut(tl, `#f14-h${i - 1}`, t - 0.1, 0.2);
          R.pop(tl, `#f14-h${i}`, t + 0.1, 0.4);
        });
        // no fim, todos voltam (são só impostores)
        // o Nervinho aparece na fala dele, ao lado da meralgia
        tl.set("#f14-n-wrap", { opacity: 1 }, K.n0 - 0.5);
        tl.fromTo("#f14-n-wrap", { x: 400 }, { x: 0, duration: 0.5, ease: "back.out(1.5)" }, K.n0 - 0.5);
        R.face(tl, "f14n", K.n0 - 0.5, { eyes: "wide" });
        R.pop(tl, "#f14-nb", K.n0, 0.4);
        tl.to("#f14-s2", { opacity: 1, duration: 0.2 }, K.n0);
        R.face(tl, "f14n", K.n1 - 0.6, { eyes: "happy" });
        tl.to("#f14-s0, #f14-s1, #f14-s2, #f14-s3", { opacity: 1, duration: 0.3 }, K.dur - 0.9);
        R.fadeOut(tl, "#f14-h3", K.dur - 0.9, 0.25);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        { name: "whoosh-short", t: k.n0 - 0.5, vol: 0.4 },
        ...k.s.map((t) => ({ name: "click", t: t - 0.05, vol: 0.5 })),
      ],
    };
  },
};
