// F24 — A ordem certa: 3 fases, Seu Zé sobe a escadinha
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { cron: w(0, "crônica"), ent: w(0, "entender"), exe: w(0, "exercício"), sono: w(0, "sono"), ter: w(0, "terapia"), aco: w(0, "acompanhamento"), obj: w(0, "objetivo"), gos: w(0, "gosta") };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      ...[k.ent, k.exe, k.sono, k.ter, k.aco].map((t) => ({ name: "pop", t: t + 0.2, vol: 0.35 })),
      { name: "sparkle", t: k.obj, vol: 0.4 },
    ];
    const cols = [C.sky, C.sun, "#C9B8F5", "#FFD3C9", C.good];
    const labs = [["Entender", "a dor"], ["Exercício", "progressivo"], ["Sono e", "estresse"], ["Terapia", "manual"], ["Acompa-", "nhamento"]];
    const steps = labs.map((l, i) => ({ x: 90 + i * 320, top: 700 - i * 90, c: cols[i], n: String(i + 1), a: l[0], b: l[1] }));
    const W = 300;
    return {
      k,
      sfx,
      css: `
        #f27-head { left:110px; top:70px; font-size:76px; }
        #f27-goal { left:720px; top:190px; width:540px; padding:18px 24px; font-size:36px; line-height:1.15; text-align:center; }
        #f27-goal b { color:#1E9C72; }
        #f27-head span { color:${C.pain}; }
        #root .f27-lab { width:${W - 40}px; text-align:center; }
        #root .f27-lab .a { font-size:32px; }
        #root .f27-lab .b { font-size:32px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f27-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8"/>
        <circle cx="${s.x + 52}" cy="${s.top + 48}" r="30" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 52}" y="${s.top + 61}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="36" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <g id="f27-star" opacity="0" transform="translate(1760,330) scale(0.6)">
        <path d="M0 -70 L20 -22 L70 -20 L30 12 L44 62 L0 34 L-44 62 L-30 12 L-70 -20 L-20 -22 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
      </g>
      <g id="f27-zw" opacity="0"><g transform="translate(240,592) scale(0.55)">${human("f27z", "ze")}</g></g>
    </svg>
    <div id="f27-head" class="abs title">E a dor <span>CRÔNICA</span>?</div>
    <div id="f27-goal" class="abs card label" style="opacity:0">Objetivo: <b>voltar a fazer o que você gosta</b></div>
    ${steps.map((s, i) => `<div id="f27-l${i}" class="abs f27-lab label" style="left:${s.x + 30}px;top:${s.top + 70}px;opacity:0"><div class="a">${s.a}</div><div class="b">${s.b}</div></div>`).join("")}`,
      js: function (tl, K, R) {
        const z = "f27z";
        R.setPose(tl, z, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f27-head", 0.05, 0.5, -300);
        // degraus sobem do chão
        [0, 1, 2, 3, 4].forEach((i) => tl.fromTo(`#f27-st${i}`, { y: 520 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.2 + i * 0.1));
        tl.fromTo("#f27-zw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.ent - 0.4);
        R.fadeIn(tl, "#f27-l0", K.ent, 0.3);
        const hop = (t, x, y) => {
          R.pose(tl, z, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
          tl.to("#f27z-root", { x, duration: 0.5, ease: "none" }, t);
          tl.to("#f27z-root", { y: y - 120, duration: 0.25, ease: "power2.out" }, t);
          tl.to("#f27z-root", { y, duration: 0.25, ease: "power2.in" }, t + 0.25);
          R.pose(tl, z, t + 0.45, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
          R.squash(tl, "#f27z-root", t + 0.5);
        };
        [K.exe, K.sono, K.ter, K.aco].forEach((t, i) => { hop(t, (320 / 0.55) * (i + 1), (-90 / 0.55) * (i + 1)); R.fadeIn(tl, `#f27-l${i + 1}`, t + 0.3, 0.3); });
        R.pop(tl, "#f27-goal", K.obj - 0.1, 0.45);
        R.pose(tl, z, K.gos, 0.35, { shF: -150, shB: 150, elF: -20, elB: 20 }, "back.out(2)");
        R.face(tl, z, K.gos, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f27-star", K.gos, 0.5);
      },
    };
  },
};
