// F26 — E se não melhorar? Escada: cuidados + exercícios → reavaliar diagnóstico e artrose → infiltração com o médico → cirurgia (muito rara). Seu Zé sobe
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      mel: w(0, "melhorar"), prog: w(0, "melhorar"), reav: w(0, "reavalia"), tec: w(0, "diagnóstico"), fat: w(0, "artrose"),
      opc: w(0, "infiltração"), med: w(0, "médico"), cir: w(0, "cirurgia"), rar: w(0, "rara"),
    };
    const W = 380, S = 0.55, HIP = 194;
    const steps = [
      { x: 90, top: 640, c: C.good, n: "1", a: "Cuidados + exercícios", b: "bem feitos", dash: false },
      { x: 500, top: 540, c: C.sun, n: "2", a: "Reavaliar diagnóstico", b: "e a artrose", dash: false },
      { x: 910, top: 440, c: "#BFE6EE", n: "3", a: "Infiltração", b: "com o médico", dash: false },
      { x: 1320, top: 340, c: "#FFD3C9", n: "4", a: "Cirurgia", b: "muito rara", dash: true },
    ];
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.prog, vol: 0.35 },
      { name: "pop", t: k.reav + 0.3, vol: 0.35 },
      { name: "pop", t: k.opc + 0.3, vol: 0.35 },
      { name: "impact-bass-1", t: k.rar + 0.1, vol: 0.4 },
    ];
    return {
      k,
      sfx,
      css: `
        #f26-head { left:110px; top:70px; font-size:76px; }
        #f26-head span { color:${C.pain}; }
        #root .f26-lab { width:${W - 60}px; text-align:center; }
        #root .f26-lab .a { font-size:32px; }
        #root .f26-lab .b { font-size:26px; margin-top:4px; }
        #f26-rare { left:1380px; top:220px; white-space:nowrap; padding:10px 28px; font-size:58px; color:${C.pain}; border:7px solid ${C.pain}; border-radius:14px; transform: rotate(-10deg); background:rgba(255,255,255,0.85); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f26-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8" ${s.dash ? 'stroke-dasharray="26 16"' : ""}/>
        <circle cx="${s.x + 48}" cy="${s.top + 46}" r="28" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 48}" y="${s.top + 58}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <g id="f26-jw" opacity="0"><g transform="translate(${90 + 190},${640 - HIP * S}) scale(${S})">${human("f26c", "ze")}</g></g>
    </svg>
    <div id="f26-head" class="abs title">E se <span>NÃO MELHORAR</span>?</div>
    <div id="f26-rare" class="abs title" style="opacity:0">MUITO RARA</div>
    ${steps.map((s, i) => `<div id="f26-l${i}" class="abs f26-lab label" style="left:${s.x + 30}px;top:${s.top + 76}px;opacity:0"><div class="a">${s.a}</div><div class="b">${s.b}</div></div>`).join("")}`,
      js: function (tl, K, R) {
        const j = "f26c";
        R.setPose(tl, j, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0, K.dur);
        R.slideIn(tl, "#f26-head", 0.05, 0.5, -300);
        [0, 1, 2, 3].forEach((i) => tl.fromTo(`#f26-st${i}`, { y: 520 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.2 + i * 0.12));
        tl.fromTo("#f26-jw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.mel - 0.4);
        R.fadeIn(tl, "#f26-l0", K.prog - 0.1, 0.3);
        const hop = (t, n) => {
          R.pose(tl, j, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
          tl.to("#f26c-root", { x: (n * 410) / 0.55, duration: 0.5, ease: "none" }, t);
          tl.to("#f26c-root", { y: (-n * 100) / 0.55 - 110, duration: 0.25, ease: "power2.out" }, t);
          tl.to("#f26c-root", { y: (-n * 100) / 0.55, duration: 0.25, ease: "power2.in" }, t + 0.25);
          R.pose(tl, j, t + 0.45, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
          R.squash(tl, "#f26c-root", t + 0.5);
        };
        // reavaliar passada e treino: sobe ao 2
        hop(K.reav, 1);
        R.fadeIn(tl, "#f26-l1", K.reav + 0.3, 0.3);
        R.face(tl, j, K.tec, { eyes: "normal", mouth: "flat" });
        R.pose(tl, j, K.tec, 0.3, { shF: -150, elF: -60 }, "back.out(2)");
        R.pose(tl, j, K.fat + 0.4, 0.3, { shF: -8, elF: -15 });
        // infiltração com o médico: sobe ao 3
        hop(K.opc - 0.2, 2);
        R.fadeIn(tl, "#f26-l2", K.opc + 0.2, 0.3);
        R.pose(tl, j, K.med, 0.3, { shF: -110, elF: -20 }, "back.out(2)");
        // cirurgia: degrau tracejado, ele não sobe
        R.fadeIn(tl, "#f26-l3", K.cir, 0.3);
        tl.fromTo("#f26-rare", { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, K.rar);
        R.face(tl, j, K.rar + 0.2, { eyes: "happy", mouth: "smile" });
        R.pose(tl, j, K.rar + 0.2, 0.3, { shF: -10, elF: -20 });
      },
    };
  },
};
