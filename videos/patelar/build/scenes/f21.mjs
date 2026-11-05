// F21 — Degrau 4: volta ao esporte em etapas (sem salto → poucos saltos → treino completo → jogo); Seu Zé: "Esse é o meu neto!"
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), esp: w(0, "esporte"), sem: w(0, "sem"), pouc: w(0, "poucos"), comp: w(0, "completo"), jogo: w(0, "jogo"),
      z0: lines[1].start, z1: lines[1].end,
    };
    const W = 340, X0 = 110, DX = 370, T0 = 690, DT = 100, S = 0.55, HIP = 194;
    const cols = ["#BFE6EE", C.sun, "#FFB98A", C.good];
    const labs = [["Treino", "sem salto"], ["Poucos", "saltos"], ["Treino", "completo"], ["JOGO!", ""]];
    const steps = labs.map((a, i) => ({ x: X0 + i * DX, top: T0 - i * DT, c: cols[i], n: i + 1, a }));
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.sem, vol: 0.35 },
      { name: "pop", t: k.pouc + 0.35, vol: 0.35 },
      { name: "pop", t: k.comp + 0.35, vol: 0.35 },
      { name: "pop", t: k.jogo + 0.1, vol: 0.4 },
      { name: "impact-bass-1", t: k.jogo + 0.75, vol: 0.4 },
      { name: "sparkle", t: k.z0, vol: 0.35 },
    ];
    return {
      k,
      sfx,
      css: `
        #f21-head { left:110px; top:70px; font-size:68px; }
        #f21-head span { color:${C.good}; }
        #root .f21-lab { width:${W - 20}px; text-align:center; font-size:32px; line-height:1.1; }
        #f21-rule { left:110px; top:170px; width:470px; padding:12px 18px; font-size:24px; text-align:center; background:${C.good}; color:${C.ink}; }
        #f21-bal { left:1580px; top:250px; width:320px; padding:14px 18px; font-size:36px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="#DCEAF2"/>
      <rect y="860" width="1920" height="220" fill="#E9B872"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <line x1="0" y1="980" x2="1920" y2="980" stroke="#fff" stroke-width="8"/>
      <!-- arquibancada com o Seu Zé -->
      <rect x="1600" y="480" width="320" height="380" fill="#B9CFDB" ${st}/>
      ${[0, 1, 2].map((r) => `<rect x="1600" y="${520 + r * 70}" width="320" height="18" fill="#93AFC0"/>`).join("")}
      <g id="f21-zw"><g transform="translate(1760,640) scale(0.62)">${human("f21z", "ze")}</g></g>
      <rect x="1600" y="660" width="320" height="200" fill="#7F99A8" ${st}/>
      <g id="f21-flag"><line x1="1860" y1="520" x2="1860" y2="660" stroke="${C.ink}" stroke-width="6"/><path d="M1860 520 L1920 538 L1860 560 Z" fill="${C.good}" ${st}/></g>
      ${steps.map((s, i) => `<g id="f21-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8"/>
        <circle cx="${s.x + 44}" cy="${s.top + 42}" r="26" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 44}" y="${s.top + 54}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="32" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <g id="f21-ball" opacity="0"><circle cx="0" cy="0" r="30" fill="#fff" ${st}/><path d="M-26 -12 Q0 0 26 -12 M-22 16 Q0 4 22 16 M0 -30 Q-10 0 0 30" stroke="#3E7FD8" stroke-width="5" fill="none"/></g>
      <g id="f21-jw" opacity="0"><g transform="translate(${X0 + 170},${T0 - HIP * S}) scale(${S})">${human("f21j", "juninho")}</g></g>
      <g id="f21-ponto" opacity="0"><g transform="translate(1180,240)"><path d="M0 -60 L16 -18 L60 -18 L24 8 L38 52 L0 26 L-38 52 L-24 8 L-60 -18 L-16 -18 Z" fill="${C.sun}" ${st}/></g></g>
    </svg>
    <div id="f21-head" class="abs title">Degrau 4: <span>VOLTA AO ESPORTE</span></div>
    <div id="f21-rule" class="abs card label">Dor até 3/10 e normal no dia seguinte: OK</div>
    ${steps.map((s, i) => `<div id="f21-l${i}" class="abs f21-lab label" style="left:${s.x + 10}px;top:${s.top + 70}px;opacity:0">${s.a[0]}${s.a[1] ? `<br>${s.a[1]}` : ""}</div>`).join("")}
    <div id="f21-bal" class="abs card label" style="opacity:0">Esse é o meu <b style="color:#FF8A3D">NETO!</b></div>`,
      js: function (tl, K, R) {
        const j = "f21j", z = "f21z";
        R.setPose(tl, j, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0, K.dur);
        R.setPose(tl, z, 0, { shF: -20, elF: -40 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.z0);
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.pop(tl, "#f21-rule", 0.3, 0.4);
        [0, 1, 2, 3].forEach((i) => tl.fromTo(`#f21-st${i}`, { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.2 + i * 0.1));
        tl.fromTo("#f21-flag", { rotation: -8 }, { rotation: 8, svgOrigin: "1860 660", duration: 0.35, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.4);
        // Juninho cai no degrau 1: treino sem salto (bate bola parado)
        tl.fromTo("#f21-jw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.esp - 0.3);
        R.fadeIn(tl, "#f21-l0", K.sem - 0.2, 0.3);
        for (let i = 0; i < 3; i++) R.pose(tl, j, K.sem + i * 0.3, 0.25, { shF: i % 2 ? -60 : -110, elF: i % 2 ? -60 : -20 }, "sine.inOut");
        // pulos de degrau (unidades do root, escala 0.55)
        const hop = (t, n) => {
          R.pose(tl, j, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
          tl.to("#f21j-root", { x: (n * 370) / 0.55, duration: 0.6, ease: "none" }, t);
          tl.to("#f21j-root", { y: (-n * 100) / 0.55 - 110, duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f21j-root", { y: (-n * 100) / 0.55, duration: 0.3, ease: "power2.in" }, t + 0.3);
          R.pose(tl, j, t + 0.55, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
          R.squash(tl, "#f21j-root", t + 0.6);
          R.fadeIn(tl, `#f21-l${n}`, t + 0.35, 0.3);
        };
        hop(K.pouc - 0.2, 1);
        hop(K.comp - 0.3, 2);
        hop(K.jogo - 0.5, 3);
        // no topo: corta!
        const tj = K.jogo + 0.3;
        tl.set("#f21-ball", { x: 1500, y: 160, opacity: 1 }, tj - 0.4);
        tl.to("#f21-ball", { x: 1330, y: 270, duration: 0.5, ease: "power1.out" }, tj - 0.4);
        R.pose(tl, j, tj - 0.2, 0.2, { hipF: -40, knF: 70, hipB: -30, knB: 60, shF: 40, shB: 40 }, "power2.out");
        tl.to("#f21j-root", { y: (-3 * 100) / 0.55 - 120, duration: 0.3, ease: "power2.out" }, tj);
        R.pose(tl, j, tj, 0.25, { hipF: -10, knF: 30, hipB: 10, knB: 30, shF: -170, elF: -20, shB: -40 });
        R.pose(tl, j, tj + 0.4, 0.12, { shF: -40, elF: 0 }, "power4.out");
        tl.to("#f21-ball", { x: 1700, y: 840, duration: 0.35, ease: "power2.in" }, tj + 0.45);
        tl.to("#f21-ball", { opacity: 0, duration: 0.15 }, tj + 0.85);
        tl.to("#f21j-root", { y: (-3 * 100) / 0.55, duration: 0.3, ease: "power2.in" }, tj + 0.45);
        R.pose(tl, j, tj + 0.75, 0.3, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -150, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
        R.face(tl, j, tj + 0.75, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f21-ponto", tj + 0.75, 0.4);
        // Seu Zé: "Esse é o meu neto!"
        R.pose(tl, z, K.z0 - 0.1, 0.25, { shF: -160, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
        R.face(tl, z, K.z0, { eyes: "happy" });
        R.talk(tl, z, K.z0, K.z1, "grin", "open");
        R.pop(tl, "#f21-bal", K.z0, 0.4);
        tl.to("#f21-zw", { y: -30, duration: 0.15, yoyo: true, repeat: 5, ease: "power1.inOut" }, K.z0);
      },
    };
  },
};
