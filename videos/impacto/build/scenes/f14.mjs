// F14 — Os impostores da dor no ombro: fila de suspeitos (ombro congelado, artrose, tendinite calcária, articulação AC, pescoço)
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w, supra } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "congelado"), w(0, "artrose"), w(0, "calcária"), w(0, "articulação"), w(0, "pescoço")],
      end: ctx.we(0, "formigamento"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const sus = [
      { name: "OMBRO CONGELADO", hint: "“Trava até quando<br><b>OUTRA PESSOA</b><br>tenta mexer”", color: "#CDEFFF",
        icon: `<rect x="-42" y="-34" width="84" height="68" rx="10" fill="#E6F8FF" ${st}/><path d="M-30 -20 L-14 -30 M14 20 L30 8" stroke="#fff" stroke-width="6"/><circle cx="0" cy="0" r="16" fill="${C.bone}" ${st} stroke-width="4"/>` },
      { name: "ARTROSE DO OMBRO", hint: "“Desgaste da<br><b>ARTICULAÇÃO</b>,<br>rangidos”", color: "#FFE0A8",
        icon: `<circle cx="-8" cy="0" r="30" fill="${C.bone}" ${st}/><path d="M24 -32 Q40 0 24 32" fill="none" ${st} stroke-width="8"/><path d="M-20 -14 L-10 -4 M-24 10 L-14 6" stroke="${C.pain}" stroke-width="4"/>` },
      { name: "TENDINITE CALCÁRIA", hint: "“Uma <b>PEDRINHA</b><br>no tendão: dor<br>fortíssima de repente”", color: "#E3E3E3",
        icon: `<rect x="-44" y="-12" width="88" height="24" rx="12" fill="#F2E8D8" ${st}/><circle cx="6" cy="0" r="14" fill="#FFFFFF" ${st} stroke-width="4"/><path d="M-4 -26 L2 -38 M14 -26 L22 -36" stroke="${C.pain}" stroke-width="5"/>` },
      { name: "ARTICULAÇÃO AC", hint: "“Dor bem<br><b>EM CIMA</b><br>do ombro”", color: "#D9F2C8",
        icon: `<path d="M-46 -6 L-4 -14 M4 -14 L46 -2" stroke="${C.bone}" stroke-width="16" stroke-linecap="round"/><path d="M-46 -6 L-4 -14 M4 -14 L46 -2" stroke="${C.ink}" stroke-width="3" fill="none"/><circle cx="0" cy="-14" r="13" fill="${C.pain}" opacity="0.6"/><circle cx="0" cy="-14" r="6" fill="${C.pain}"/>` },
      { name: "PESCOÇO", hint: "“Dor que desce<br><b>ABAIXO</b> do cotovelo,<br>com formigamento”", color: "#E3D6FF",
        icon: `<rect x="-14" y="-40" width="28" height="22" rx="6" fill="${C.bone}" ${st} stroke-width="4"/><rect x="-14" y="-12" width="28" height="22" rx="6" fill="${C.bone}" ${st} stroke-width="4"/><path d="M14 -2 Q40 10 30 40" fill="none" stroke="#B79CF2" stroke-width="8" stroke-linecap="round"/><path d="M36 14 L44 22 L36 28 L44 36" fill="none" stroke="${C.sun}" stroke-width="5" stroke-linecap="round"/>` },
    ];
    const X = (i) => 230 + i * 365;
    const suspect = (s, i) => `
      <g id="f14-s${i}"><g transform="translate(${X(i)},460) scale(0.85)">
        <g id="f14-b${i}">
          <path d="M-95 150 Q-110 -60 -60 -110 Q0 -150 60 -110 Q110 -60 95 150 Z" fill="${s.color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="-28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/><ellipse cx="28" cy="-58" rx="17" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          <g id="f14-pu${i}"><circle cx="-28" cy="-56" r="6" fill="${C.ink}"/><circle cx="28" cy="-56" r="6" fill="${C.ink}"/></g>
          <path d="M-46 -78 L-12 -70 M46 -78 L12 -70" ${st} stroke-width="7"/>
          <path d="M-18 -22 Q0 -30 18 -22" fill="none" ${st}/>
          <g transform="translate(0,48)">${s.icon}</g>
        </g>
        <rect x="-122" y="130" width="244" height="56" rx="10" fill="${C.ink}"/>
        <text x="0" y="167" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${s.name.length > 18 ? 17 : 21}" fill="#fff">${s.name}</text>
      </g></g>`;
    return {
      k,
      css: `
        #f14-title { left:0; right:0; top:46px; text-align:center; font-size:76px; }
        #f14-title span { color:${C.pain}; }
        #root .f14-hint { position:absolute; top:640px; width:300px; text-align:center; font-size:27px; line-height:1.15; padding:12px 10px; }
        #root .f14-hint b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#DCE8E6"/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1860" y2="${200 + i * 80}" stroke="${C.ink}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.25"/><text x="70" y="${192 + i * 80}" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.4">${(2.0 - i * 0.2).toFixed(1)}</text>`).join("")}
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${sus.map(suspect).join("")}
      <rect id="f14-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
      <g id="f14-a-wrap" opacity="0"><g transform="translate(1810,1060) scale(0.55)">${supra("f14a")}</g></g>
    </svg>
    <div id="f14-title" class="abs title" style="opacity:0">Cuidado com os <span>IMPOSTORES</span></div>
    ${sus.map((s, i) => `<div id="f14-h${i}" class="f14-hint card label" style="left:${X(i) - 150}px;opacity:0">${s.hint}</div>`).join("")}`,
      js: function (tl, K, R) {
        R.drop(tl, "#f14-title", 0.1, 0.7, -260);
        for (let i = 0; i < 5; i++) tl.fromTo(`#f14-s${i}`, { x: -1400, opacity: 1 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2 + i * 0.12);
        for (let i = 0; i < 5; i++) {
          tl.to(`#f14-pu${i}`, { x: -7, duration: 0.25, ease: "power1.inOut" }, 1.2 + i * 0.1);
          tl.to(`#f14-pu${i}`, { x: 7, duration: 0.4, ease: "power1.inOut" }, 1.8 + i * 0.1);
          tl.to(`#f14-pu${i}`, { x: 0, duration: 0.3, ease: "power1.inOut" }, 2.5 + i * 0.1);
        }
        K.s.forEach((t, i) => {
          tl.fromTo("#f14-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, t - 0.05);
          for (let j = 0; j < 5; j++) tl.to(`#f14-s${j}`, { opacity: j === i ? 1 : 0.35, duration: 0.2 }, t - 0.05);
          tl.fromTo(`#f14-b${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          if (i > 0) R.fadeOut(tl, `#f14-h${i - 1}`, t - 0.1, 0.2);
          R.pop(tl, `#f14-h${i}`, t + 0.1, 0.4);
        });
        // no fim, todos voltam; o Supra espia
        R.fadeOut(tl, "#f14-h4", K.end + 0.3, 0.25);
        tl.to("#f14-s0, #f14-s1, #f14-s2, #f14-s3, #f14-s4", { opacity: 1, duration: 0.3 }, K.end + 0.3);
        R.setPose(tl, "f14a", 0, { armF: -20, armB: 20 });
        R.face(tl, "f14a", 0, { eyes: "normal", mouth: "flat" });
        tl.set("#f14-a-wrap", { opacity: 1 }, K.end + 0.1);
        tl.fromTo("#f14-a-wrap", { y: 300 }, { y: 0, duration: 0.45, ease: "back.out(1.4)" }, K.end + 0.1);
        R.face(tl, "f14a", K.end + 0.6, { eyes: "wide", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        ...k.s.map((t) => ({ name: "click", t: t - 0.05, vol: 0.5 })),
        { name: "whoosh-short", t: k.end + 0.1, vol: 0.35 },
      ],
    };
  },
};
