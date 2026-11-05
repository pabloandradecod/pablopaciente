// F24 — Exercício 6: volta ao esporte em etapas (caminhar → trotar → correr reto → mudar de direção → chutar); Vértebra: "Sem pular degrau!"
export default {
  speakers: { vertebra: "f24v" },
  extra: 0.6,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      seis: w(0, "seis"), esp: w(0, "esporte"), cam: w(0, "caminhar"), tro: w(0, "trotar"), cor: w(0, "correr"), mud: w(0, "mudar"),
      chu: w(0, "chutar"), pul: w(0, "Pular"), banco: w(0, "banco"), v0: lines[1].start, v1: lines[1].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.cam, vol: 0.4 },
      { name: "pop", t: k.tro + 0.35, vol: 0.4 },
      { name: "pop", t: k.cor + 0.35, vol: 0.4 },
      { name: "pop", t: k.mud + 0.35, vol: 0.4 },
      { name: "whoosh-short", t: k.chu + 0.45, vol: 0.45 },
      { name: "error", t: k.pul + 0.5, vol: 0.3 },
      { name: "ping", t: k.v0, vol: 0.4 },
    ];
    const W = 300, X0 = 110, DX = 330, T0 = 700, DT = 90;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const cols = [C.sky, "#BFE6EE", C.sun, "#FFB98A", C.good];
    const labs = ["Caminhar", "Trotar", "Correr reto", "Mudar de direção", "Chutar"];
    const steps = labs.map((a, i) => ({ x: X0 + i * DX, top: T0 - i * DT, c: cols[i], n: i + 1, a }));
    const S = 0.55, HIP = 194;
    return {
      k,
      sfx,
      css: `
        #f24-head { left:110px; top:70px; font-size:72px; }
        #f24-head span { color:${C.good}; }
        #root .f24-lab { width:${W - 20}px; text-align:center; font-size:30px; }
        #f24-skip { left:110px; top:180px; padding:10px 20px; font-size:34px; color:${C.pain}; }
        #f24-bal { left:960px; top:170px; width:470px; padding:16px 22px; font-size:36px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="#CDEBD9"/>
      <rect x="0" y="860" width="1920" height="220" fill="#6CC56F"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f24-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8"/>
        <circle cx="${s.x + 44}" cy="${s.top + 42}" r="26" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 44}" y="${s.top + 54}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="32" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <!-- seta de pular etapa -->
      <g id="f24-jump" opacity="0"><path d="M${X0 + 150} ${T0 - 40} Q${X0 + 800} ${T0 - 600} ${X0 + 4 * DX + 150} ${T0 - 4 * DT - 40}" fill="none" stroke="${C.pain}" stroke-width="10" stroke-dasharray="22 16" stroke-linecap="round"/>
        <g transform="translate(${X0 + 800},${T0 - 330})"><path d="M-40 -40 L40 40 M40 -40 L-40 40" stroke="${C.pain}" stroke-width="18" stroke-linecap="round"/></g></g>
      <g id="f24-ball" opacity="0"><g transform="translate(${X0 + 4 * DX + 210},${T0 - 4 * DT - 26})"><circle r="26" fill="#fff" ${st}/><path d="M0 -10 L10 -3 L6 9 L-6 9 L-10 -3 Z" fill="${C.ink}"/></g></g>
      <g id="f24-zw" opacity="0"><g transform="translate(${X0 + 150},${T0 - HIP * S}) scale(${S})">${human("f24z", "ze")}</g></g>
      <g id="f24-vw" opacity="0"><g transform="translate(1800,862) scale(0.75)">${vertebra("f24v")}</g></g>
    </svg>
    <div id="f24-head" class="abs title">6. <span>VOLTA AO ESPORTE</span></div>
    ${steps.map((s, i) => `<div id="f24-l${i}" class="abs f24-lab label" style="left:${s.x + 10}px;top:${s.top + 80}px;opacity:0">${s.a}</div>`).join("")}
    <div id="f24-skip" class="abs card label" style="opacity:0">Pular etapa = volta pro banco!</div>
    <div id="f24-bal" class="abs card label" style="opacity:0">Sem pular degrau, Seu Zé!</div>`,
      js: function (tl, K, R) {
        const z = "f24z", v = "f24v";
        R.setPose(tl, z, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f24-head", 0.05, 0.5, -300);
        [0, 1, 2, 3, 4].forEach((i) => tl.fromTo(`#f24-st${i}`, { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.2 + i * 0.1));
        // Seu Zé cai no degrau 1 e caminha
        tl.fromTo("#f24-zw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.esp - 0.2);
        R.fadeIn(tl, "#f24-l0", K.cam, 0.3);
        for (let i = 0; i < 3; i++) R.pose(tl, z, K.cam + i * 0.25, 0.25, { hipF: i % 2 ? 20 : -20, hipB: i % 2 ? -20 : 20, shF: i % 2 ? -20 : 20, shB: i % 2 ? 20 : -20 }, "sine.inOut");
        // pulos (unidades do root, escala 0.55)
        const hop = (t, n) => {
          R.pose(tl, z, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
          tl.to("#f24z-root", { x: n * 600, duration: 0.6, ease: "none" }, t);
          tl.to("#f24z-root", { y: -n * 163.6 - 110, duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f24z-root", { y: -n * 163.6, duration: 0.3, ease: "power2.in" }, t + 0.3);
          R.pose(tl, z, t + 0.55, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
          R.squash(tl, "#f24z-root", t + 0.6);
          R.fadeIn(tl, `#f24-l${n}`, t + 0.35, 0.3);
        };
        hop(K.tro, 1);
        hop(K.cor, 2);
        hop(K.mud, 3);
        hop(K.chu - 0.5, 4);
        // chute
        R.pop(tl, "#f24-ball", K.chu - 0.1, 0.3);
        R.pose(tl, z, K.chu + 0.25, 0.2, { hipF: 30, knF: 50 }, "power2.out");
        R.pose(tl, z, K.chu + 0.45, 0.15, { hipF: -80, knF: 0 }, "power4.out");
        tl.to("#f24-ball", { x: 420, y: -260, duration: 0.7, ease: "power1.out" }, K.chu + 0.5);
        tl.to("#f24-ball", { opacity: 0, duration: 0.15 }, K.chu + 1.1);
        R.pose(tl, z, K.chu + 0.9, 0.3, { hipF: 0, knF: 0, shF: -150, shB: 150 }, "back.out(2)");
        R.face(tl, z, K.chu + 0.9, { eyes: "happy", mouth: "grin" });
        // pular etapa = banco
        R.fadeIn(tl, "#f24-jump", K.pul, 0.3);
        R.draw(tl, "#f24-jump path", K.pul, 0.6);
        R.pop(tl, "#f24-skip", K.pul + 0.3, 0.4);
        R.face(tl, z, K.banco, { eyes: "wide", mouth: "flat" });
        // Vértebra apita
        tl.fromTo("#f24-vw", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.v0 - 0.4);
        R.pose(tl, v, K.v0, 0.3, { armF: -160, armB: 20 }, "back.out(2)");
        R.pop(tl, "#f24-bal", K.v0, 0.4);
        R.face(tl, z, K.v1, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
