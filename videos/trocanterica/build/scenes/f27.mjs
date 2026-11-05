// F27 — E se não melhorar? Escada: educação + exercício → ondas de choque / infiltração (médico) → cirurgia (rara)
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { mel: w(0, "melhorar"), ond: w(0, "ondas"), inf: w(0, "infiltração"), med: w(0, "médico"), cir: w(0, "cirurgia"), rar: w(0, "raros"), rup: w(0, "ruptura") };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.mel, vol: 0.35 },
      { name: "pop", t: k.ond + 0.2, vol: 0.35 },
      { name: "pop", t: k.cir + 0.2, vol: 0.35 },
      { name: "impact-bass-1", t: k.rar + 0.1, vol: 0.4 },
    ];
    const W = 460;
    const steps = [
      { x: 120, top: 650, c: C.good, n: "1", a: "Educação +", b: "exercício bem feitos", dash: false },
      { x: 600, top: 560, c: C.sun, n: "2", a: "Ondas de choque", b: "ou infiltração (médico)", dash: false },
      { x: 1080, top: 430, c: "#FFD3C9", n: "3", a: "Cirurgia", b: "ruptura que não responde", dash: true },
    ];
    return {
      k,
      sfx,
      css: `
        #f27-head { left:110px; top:70px; font-size:76px; }
        #f27-head span { color:${C.pain}; }
        #root .f27-lab { width:${W - 60}px; text-align:center; }
        #root .f27-lab .a { font-size:36px; }
        #root .f27-lab .b { font-size:28px; margin-top:4px; }
        #f27-rare { left:1250px; top:250px; padding:10px 28px; font-size:58px; color:${C.pain}; border:7px solid ${C.pain}; border-radius:14px; transform: rotate(-10deg); background:rgba(255,255,255,0.85); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f27-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8" ${s.dash ? 'stroke-dasharray="26 16"' : ""}/>
        <circle cx="${s.x + 52}" cy="${s.top + 48}" r="30" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 52}" y="${s.top + 61}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="36" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <g id="f27-zw" opacity="0"><g transform="translate(300,487) scale(0.62)">${human("f27c", "cida")}</g></g>
    </svg>
    <div id="f27-head" class="abs title">E se <span>NÃO MELHORAR</span>?</div>
    <div id="f27-rare" class="abs title" style="opacity:0">RARA</div>
    ${steps.map((s, i) => `<div id="f27-l${i}" class="abs f27-lab label" style="left:${s.x + 30}px;top:${s.top + 66}px;opacity:0"><div class="a">${s.a}</div><div class="b">${s.b}</div></div>`).join("")}`,
      js: function (tl, K, R) {
        const c = "f27c";
        R.setPose(tl, c, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f27-head", 0.05, 0.5, -300);
        [0, 1, 2].forEach((i) => tl.fromTo(`#f27-st${i}`, { y: 520 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.2 + i * 0.12));
        tl.fromTo("#f27-zw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.mel - 0.4);
        R.fadeIn(tl, "#f27-l0", K.mel, 0.3);
        // pula para o degrau 2
        const t = K.ond;
        R.pose(tl, c, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
        tl.to("#f27c-root", { x: 480 / 0.62, duration: 0.5, ease: "none" }, t);
        tl.to("#f27c-root", { y: -90 / 0.62 - 120, duration: 0.25, ease: "power2.out" }, t);
        tl.to("#f27c-root", { y: -90 / 0.62, duration: 0.25, ease: "power2.in" }, t + 0.25);
        R.pose(tl, c, t + 0.45, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
        R.squash(tl, "#f27c-root", t + 0.5);
        R.fadeIn(tl, "#f27-l1", K.ond + 0.3, 0.3);
        R.pose(tl, c, K.med, 0.3, { shF: -110, elF: -20 }, "back.out(2)");
        // cirurgia: degrau tracejado, carimbo RARA; ela não sobe
        R.fadeIn(tl, "#f27-l2", K.cir, 0.3);
        tl.fromTo("#f27-rare", { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, K.rar);
        R.face(tl, c, K.rar + 0.2, { eyes: "happy", mouth: "smile" });
        R.pose(tl, c, K.rar + 0.2, 0.3, { shF: -10, elF: -20 });
      },
    };
  },
};
