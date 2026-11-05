// F24 — A ordem certa: 3 fases, Seu Zé sobe a escadinha
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { ordem: w(0, "ordem"), dor: w(0, "dor"), mel: w(0, "Melhorando"), dep: w(0, "Depois"), volt: w(0, "voltar") };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.dor + 0.35, vol: 0.45 },
      { name: "pop", t: k.mel + 0.35, vol: 0.45 },
      { name: "pop", t: k.dep + 0.35, vol: 0.45 },
      { name: "sparkle", t: k.volt, vol: 0.4 },
    ];
    const steps = [
      { x: 250, top: 660, c: C.pain, n: "1", a: "Dor forte", b: "caminhada + deslizamento" },
      { x: 670, top: 520, c: C.sun, n: "2", a: "Melhorando", b: "extensão + ponte" },
      { x: 1090, top: 380, c: C.good, n: "3", a: "Fortalecer", b: "perdigueiro + treino" },
    ];
    const W = 420;
    return {
      k,
      sfx,
      css: `
        #f24-head { left:110px; top:80px; font-size:80px; }
        #f24-head span { color:${C.pain}; }
        #root .f24-lab { width:${W - 40}px; text-align:center; }
        #root .f24-lab .a { font-size:38px; }
        #root .f24-lab .b { font-size:25px; margin-top:4px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f24-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8"/>
        <circle cx="${s.x + 52}" cy="${s.top + 48}" r="30" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 52}" y="${s.top + 61}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="36" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <g id="f24-star" opacity="0" transform="translate(1600,260)">
        <path d="M0 -70 L20 -22 L70 -20 L30 12 L44 62 L0 34 L-44 62 L-30 12 L-70 -20 L-20 -22 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
      </g>
      <g id="f24-zw"><g transform="translate(460,534) scale(0.65)">${human("f24z", "ze")}</g></g>
    </svg>
    <div id="f24-head" class="abs title">A <span>ORDEM</span> IMPORTA</div>
    ${steps.map((s, i) => `<div id="f24-l${i}" class="abs f24-lab label" style="left:${s.x + 30}px;top:${s.top + 70}px;opacity:0"><div class="a">${s.a}</div><div class="b">${s.b}</div></div>`).join("")}`,
      js: function (tl, K, R) {
        const z = "f24z";
        R.setPose(tl, z, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f24-head", 0.05, 0.5, -300);
        tl.set("#f24-zw", { opacity: 0 }, 0);
        // degraus sobem do chão
        [0, 1, 2].forEach((i) => tl.fromTo(`#f24-st${i}`, { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.25 + i * 0.12));
        // Seu Zé cai no degrau 1
        tl.fromTo("#f24-zw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.dor - 0.3);
        R.fadeIn(tl, "#f24-l0", K.dor, 0.3);
        // pulo para o degrau seguinte (unidades do root: escala 0.8)
        const hop = (t, x, y) => {
          R.pose(tl, z, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
          tl.to("#f24z-root", { x, duration: 0.6, ease: "none" }, t);
          tl.to("#f24z-root", { y: y - 120, duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f24z-root", { y, duration: 0.3, ease: "power2.in" }, t + 0.3);
          R.pose(tl, z, t + 0.55, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
          R.squash(tl, "#f24z-root", t + 0.6);
        };
        hop(K.mel, 646, -215.4);
        R.fadeIn(tl, "#f24-l1", K.mel + 0.35, 0.3);
        hop(K.dep, 1292, -430.8);
        R.fadeIn(tl, "#f24-l2", K.dep + 0.35, 0.3);
        // comemora no topo
        R.pose(tl, z, K.volt, 0.35, { shF: -150, shB: 150, elF: -20, elB: 20 }, "back.out(2)");
        R.face(tl, z, K.volt, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f24-star", K.volt, 0.5);
      },
    };
  },
};
