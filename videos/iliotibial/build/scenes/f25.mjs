// F25 — Vai melhorar? Barra "4 a 8 semanas", escadinha de volta (plano → distância → descidas → velocidade), Dona Cida cruza a chegada dos 10 km com o Seu Zé de bicicleta
export default {
  extra: 0.8,
  gaps: [0.3],
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      boa: w(0, "boa"), quatro: w(0, "quatro"), oito: w(0, "oito"), etapas: w(0, "etapas"), plano: w(0, "plano"), alt: w(0, "alternados"),
      dist: w(0, "distância"), desc: w(0, "descidas"), vel: w(0, "velocidade"),
      z0: L1.start, z1: L1.end, dez: w(1, "Dez"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const steps = [["Plano", "dias alternados"], ["Mais", "distância"], ["Descidas", ""], ["Velocidade", "e prova"]];
    const stairs = steps.map((s, i) => `<g id="f25-st${i}" opacity="0"><rect x="${110 + i * 180}" y="${830 - (i + 1) * 70}" width="180" height="${(i + 1) * 70}" fill="${[C.sky, C.sun, "#FFB98A", C.good][i]}" ${st}/>
      <circle cx="${134 + i * 180}" cy="${852 - (i + 1) * 70}" r="16" fill="#fff" stroke="${C.ink}" stroke-width="4"/><text x="${134 + i * 180}" y="${860 - (i + 1) * 70}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="20" fill="${C.ink}">${i + 1}</text>
      <text x="${200 + i * 180}" y="${830 - (i + 1) * 70 + 52}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">${s[0]}</text>
      <text x="${200 + i * 180}" y="${830 - (i + 1) * 70 + 76}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="19" fill="${C.ink}">${s[1]}</text></g>`).join("");
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "sparkle", t: k.oito + 0.3, vol: 0.4 },
      { name: "pop", t: k.plano, vol: 0.35 }, { name: "pop", t: k.dist, vol: 0.35 }, { name: "pop", t: k.desc, vol: 0.35 }, { name: "pop", t: k.vel, vol: 0.35 },
      { name: "whoosh-short", t: k.z0 - 0.9, vol: 0.4 },
      { name: "impact-bass-1", t: k.z0 - 0.3, vol: 0.4 },
      { name: "sparkle", t: k.dez, vol: 0.45 },
    ];
    return {
      k,
      sfx,
      css: `
        #f25-head { left:110px; top:60px; font-size:72px; }
        #f25-head span { color:${C.good}; }
        #f25-bar { left:110px; top:190px; width:820px; height:56px; border-radius:28px; border:7px solid ${C.ink}; background:#fff; overflow:hidden; }
        #f25-fill { position:absolute; left:0; top:0; bottom:0; width:100%; background:${C.good}; transform-origin:0% 50%; }
        #f25-bl { left:110px; top:262px; font-size:36px; }
        #f25-bl b { color:#1E9C72; }
        #f25-et { left:110px; top:330px; padding:10px 18px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <!-- rua da prova (lado direito) -->
      <rect x="950" y="0" width="970" height="1080" fill="${C.sky}"/>
      <rect x="950" y="760" width="970" height="320" fill="#9AA3A8"/>
      <line x1="950" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <g>${[1060, 1720].map((x) => `<rect x="${x - 10}" y="420" width="20" height="340" fill="${C.ink}"/>`).join("")}
        <rect x="1040" y="400" width="700" height="90" rx="14" fill="${C.pain}" ${st}/>
        <text x="1390" y="462" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="54" fill="#fff">CHEGADA · 10 KM</text></g>
      <g id="f25-tape"><line x1="1060" y1="660" x2="1720" y2="660" stroke="#FFE08A" stroke-width="12" stroke-dasharray="30 14"/></g>
      <g id="f25-tapeL" opacity="0"><path d="M1060 660 Q1200 700 1300 760" fill="none" stroke="#FFE08A" stroke-width="12"/></g>
      <g id="f25-tapeR" opacity="0"><path d="M1720 660 Q1600 700 1500 760" fill="none" stroke="#FFE08A" stroke-width="12"/></g>
      <rect x="0" y="830" width="950" height="250" fill="${C.floor}"/><line x1="0" y1="830" x2="950" y2="830" stroke="${C.ink}" stroke-width="7"/>
      ${stairs}
      <!-- Dona Cida (sobe a escada e depois aparece na chegada) -->
      <g id="f25-cw"><g transform="translate(200,724) scale(0.6)">${human("f25c", "cida")}</g></g>
      <g id="f25-cw2" opacity="0"><g transform="translate(1100,580) scale(1.0)">${human("f25c2", "cida")}</g></g>
      <!-- Seu Zé de bicicleta -->
      <g id="f25-bike" opacity="0"><g transform="translate(1250,40)">
        <circle cx="300" cy="830" r="62" fill="none" ${st}/><circle cx="520" cy="830" r="62" fill="none" ${st}/>
        <path d="M300 830 L380 730 L500 730 L520 830 M380 730 L420 830 L500 730 M380 730 L370 700 M500 730 L510 690 L540 690" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <g transform="translate(400,700) scale(1.0)">${human("f25z", "ze")}</g>
      </g></g>
      <g id="f25-conf">${Array.from({ length: 22 }, (_, i) => `<rect id="f25-cf${i}" x="${980 + (i * 43) % 900}" y="300" width="14" height="24" rx="3" fill="${[C.pain, C.sun, C.good, "#8E6CD8"][i % 4]}" opacity="0"/>`).join("")}</g>
    </svg>
    <div id="f25-head" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f25-bar" class="abs" style="opacity:0"><div id="f25-fill"></div></div>
    <div id="f25-bl" class="abs label" style="opacity:0">a maioria melhora em <b>4 a 8 semanas</b></div>
    <div id="f25-et" class="abs card label" style="opacity:0">a volta é em etapas</div>`,
      js: function (tl, K, R) {
        const c = "f25c", c2 = "f25c2", z = "f25z";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f25-head", 0.05, 0.5, -300);
        // barra 4 a 8 semanas
        R.fadeIn(tl, "#f25-bar", K.boa, 0.3);
        tl.fromTo("#f25-fill", { scaleX: 0 }, { scaleX: 1, duration: K.oito + 0.4 - K.boa, ease: "power1.inOut" }, K.boa);
        R.pop(tl, "#f25-bl", K.quatro, 0.4);
        // etapas
        R.pop(tl, "#f25-et", K.etapas - 0.1, 0.35);
        const pts = [[K.plano, 0], [K.dist, 1], [K.desc, 2], [K.vel, 3]];
        pts.forEach(([t, i]) => {
          tl.fromTo(`#f25-st${i}`, { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, t - 0.15);
          tl.to("#f25-cw", { x: i * 180, y: -(i + 1) * 70, duration: 0.45, ease: "power2.out" }, t + 0.25);
          R.pose(tl, c, t + 0.25, 0.22, { hipF: -60, knF: 70, shF: -60, shB: 40 }, "power2.out");
          R.pose(tl, c, t + 0.5, 0.25, { hipF: 0, knF: 0, shF: -10, shB: 5 });
        });
        R.face(tl, c, K.vel + 0.5, { eyes: "happy", mouth: "grin" });
        R.fadeOut(tl, "#f25-bl, #f25-et", K.vel - 0.2);
        // chegada: Dona Cida corre e rompe a fita
        R.setPose(tl, c2, 0, { shF: -20, elF: -70, shB: 20, elB: -70 });
        R.face(tl, c2, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f25-cw2", { opacity: 1 }, K.z0 - 1.0);
        tl.fromTo("#f25-cw2", { x: -260 }, { x: 290, duration: 0.8, ease: "power1.out" }, K.z0 - 1.0);
        for (let i = 0; i < 3; i++) {
          const a = i % 2;
          R.pose(tl, c2, K.z0 - 1.0 + i * 0.26, 0.24, { hipF: a ? 30 : -45, knF: a ? 70 : 20, hipB: a ? -45 : 30, knB: a ? 20 : 70 }, "sine.inOut");
        }
        tl.set("#f25-tape", { opacity: 0 }, K.z0 - 0.3);
        tl.set("#f25-tapeL, #f25-tapeR", { opacity: 1 }, K.z0 - 0.3);
        R.pose(tl, c2, K.z0 - 0.2, 0.35, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -160, elF: -10, shB: -150, elB: -10 }, "back.out(2)");
        for (let i = 0; i < 22; i++) tl.fromTo(`#f25-cf${i}`, { opacity: 1, y: 0, rotation: 0 }, { opacity: 1, y: 520, rotation: (i % 2 ? 1 : -1) * 360, svgOrigin: `${980 + (i * 43) % 900 + 7} 312`, duration: 2.2, ease: "none" }, K.z0 - 0.25 + (i % 5) * 0.08);
        // Seu Zé comemora de bicicleta
        R.setPose(tl, z, 0, { hipF: -60, knF: 80, hipB: -60, knB: 80, shF: -60, elF: -30, shB: -60, elB: -30, torso: 14 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f25-bike", { opacity: 1 }, K.z0 - 0.6);
        tl.fromTo("#f25-bike", { x: 700 }, { x: 0, duration: 0.6, ease: "power2.out" }, K.z0 - 0.6);
        R.pose(tl, z, K.z0, 0.25, { shF: -160, elF: -20 }, "back.out(2)");
        R.talk(tl, z, K.z0, K.z1, "grin", "open");
      },
    };
  },
};
