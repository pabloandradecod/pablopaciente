// F14 — Os impostores da dor no calcanhar: fila de suspeitos (bursite, fascite plantar, Sever, fratura por estresse, nervo sural)
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w, aquiles } = ctx;
    const k = {
      imp: w(0, "impostores"), s: [w(0, "bursite"), w(0, "fascite"), w(0, "Sever"), w(0, "fratura"), w(0, "nervo")],
      end: ctx.we(0, "formigamento"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const sus = [
      { name: "BURSITE DO CALCANHAR", hint: "“Entre o tendão<br>e o osso<br>do calcanhar”", color: "#BFE8F7",
        icon: `<path d="M-40 30 Q-40 -10 0 -10 Q40 -10 40 30 Z" fill="${C.bone}" ${st}/><ellipse cx="0" cy="-22" rx="22" ry="14" fill="#7FC4E0" ${st} stroke-width="4"/><path d="M-30 -50 L-24 -10" stroke="#F2E8D8" stroke-width="12" stroke-linecap="round"/>` },
      { name: "FASCITE PLANTAR", hint: "“Dói na<br><b>SOLA</b> do pé”", color: "#FFE0A8",
        icon: `<path d="M-44 0 Q-46 -26 -24 -26 L36 -10 Q50 -4 46 10 L-40 12 Z" fill="${C.skinA}" ${st}/><path d="M-34 14 Q0 22 40 14" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>` },
      { name: "DOENÇA DE SEVER", hint: "“Criança:<br>crescimento<br>do calcanhar”", color: "#D9F2C8",
        icon: `<circle cx="0" cy="-20" r="16" fill="#F2C59A" ${st} stroke-width="4"/><path d="M-12 -2 L12 -2 L14 30 L-14 30 Z" fill="#FF8A3D" ${st} stroke-width="4"/><path d="M-30 30 L-30 -30 M-36 -24 L-30 -32 L-24 -24 M30 30 L30 -10" stroke="${C.ink}" stroke-width="4" fill="none"/>` },
      { name: "FRATURA POR ESTRESSE", hint: "“Dói ao <b>APERTAR</b><br>o osso dos lados”", color: C.bone,
        icon: `<path d="M-40 26 Q-44 -14 -10 -20 L24 -20 Q46 -14 42 26 Z" fill="#fff" ${st}/><path d="M-4 -20 L4 -4 L-6 6 L4 24" fill="none" stroke="${C.pain}" stroke-width="5"/>` },
      { name: "NERVO SURAL", hint: "“<b>FORMIGAMENTO</b><br>na lateral<br>do pé”", color: "#E3D6FF",
        icon: `<path d="M-40 -30 Q-10 -10 -20 10 Q-30 30 30 30" fill="none" stroke="#B79CF2" stroke-width="10" stroke-linecap="round"/><path d="M14 -24 L20 -14 L12 -10 L20 0" fill="none" stroke="${C.sun}" stroke-width="5" stroke-linecap="round"/>` },
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
      <g id="f14-a-wrap" opacity="0"><g transform="translate(1800,1060) scale(0.55)">${aquiles("f14a")}</g></g>
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
        // no fim, todos voltam; o Aquiles espia de braços cruzados
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
