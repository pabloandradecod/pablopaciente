// F23 — Degrau 4: volta à corrida em etapas (caminhada → trote intercalado → corrida no plano → mais distância → ladeiras); no fim corre com a Dona Cida e o Seu Zé de bicicleta
export default {
  speakers: { ze: "f23z" },
  extra: 0.8,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      deg: w(0, "degrau"), volta: w(0, "volta"), etap: w(0, "etapas"), cam: w(0, "caminhada"), trote: w(0, "trote"), plano: w(0, "plano"), dist: w(0, "distância"),
      ult: w(0, "último"), lad: w(0, "ladeiras"), z0: lines[1].start, z1: lines[1].end,
    };
    const W = 290, X0 = 90, DX = 320, T0 = 740, DT = 85, S = 0.5;
    const cols = ["#BFE6EE", C.sun, "#FFB98A", "#B9A4F0", C.good];
    const labs = [["Caminhada", ""], ["Trote", "intercalado"], ["Corrida", "no plano"], ["Mais", "distância"], ["Ladeiras!", ""]];
    const steps = labs.map((a, i) => ({ x: X0 + i * DX, top: T0 - i * DT, c: cols[i], n: i + 1, a }));
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const tree = (x) => `<g transform="translate(${x},0)"><rect x="-14" y="640" width="28" height="120" fill="#8B5A2B" ${st}/><circle cx="0" cy="610" r="70" fill="#5DB560" ${st}/></g>`;
    k.hipY = T0 - 194 * S;
    return {
      k,
      css: `
        #f23-head { left:110px; top:60px; font-size:64px; }
        #f23-head span { color:${C.good}; }
        #root .f23-lab { width:${W - 20}px; text-align:center; font-size:28px; line-height:1.1; }
        #f23-bal { left:280px; top:200px; width:520px; padding:14px 18px; font-size:36px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f23-gym">
        <rect width="1920" height="860" fill="#DCEAF2"/>
        <rect y="860" width="1920" height="220" fill="#9AA3A8"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
        ${steps.map((s, i) => `<g id="f23-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8"/>
          <circle cx="${s.x + 40}" cy="${s.top + 40}" r="24" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
          <text x="${s.x + 40}" y="${s.top + 51}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">${s.n}</text></g>`).join("")}
        <g id="f23-jw"><g transform="translate(${X0 + 150},${T0 - 194 * S}) scale(${S})">${human("f23p", "pablo")}</g></g>
      </g>
      <!-- final: parque, todos correndo -->
      <g id="f23-park" opacity="0">
        <rect width="1920" height="1080" fill="${C.sky}"/>
        <circle cx="1760" cy="110" r="56" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
        <g id="f23-scroll">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tree(200 + i * 460)).join("")}</g>
        <rect y="760" width="1920" height="320" fill="#9AA3A8"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
        <g id="f23-dash">${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 340}" y="900" width="170" height="14" fill="#fff"/>`).join("")}</g>
        <g transform="translate(-40,40)">
          <circle id="f23-w1" cx="300" cy="830" r="62" fill="none" ${st}/><circle cx="520" cy="830" r="62" fill="none" ${st}/>
          <path d="M300 830 L380 730 L500 730 L520 830 M380 730 L420 830 L500 730 M380 730 L370 700 M500 730 L510 690 L540 690" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <g transform="translate(400,700) scale(1.0)">${human("f23z", "ze")}</g>
        </g>
        <g transform="translate(1000,600) scale(1.25)">${human("f23r", "pablo")}</g>
        <g transform="translate(1380,600) scale(1.25)">${human("f23c", "cida")}</g>
      </g>
    </svg>
    <div id="f23-head" class="abs title">Degrau 4: <span>VOLTA À CORRIDA</span></div>
    ${steps.map((s, i) => `<div id="f23-l${i}" class="abs f23-lab label" style="left:${s.x + 10}px;top:${s.top + 72}px;opacity:0">${s.a[0]}${s.a[1] ? `<br>${s.a[1]}` : ""}</div>`).join("")}
    <div id="f23-bal" class="abs card label" style="opacity:0">Vai, doutor! A <b style="color:#8E6CD8">Cida</b> tá na frente!</div>`,
      js: function (tl, K, R) {
        const j = "f23p";
        R.setPose(tl, j, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0, K.z0);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        [0, 1, 2, 3, 4].forEach((i) => tl.fromTo(`#f23-st${i}`, { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.15 + i * 0.08));
        tl.fromTo("#f23-jw", { y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, Math.max(0.3, K.etap - 0.5));
        R.fadeIn(tl, "#f23-l0", K.cam - 0.2, 0.3);
        // pulos de degrau (unidades do root, escala 0.5)
        const hop = (t, n) => {
          R.pose(tl, j, t - 0.15, 0.15, { hipF: -40, knF: 60, hipB: 20, knB: 40, shF: -60, shB: 40 }, "power2.out");
          tl.to("#f23p-root", { x: (n * 320) / 0.5, duration: 0.55, ease: "none" }, t);
          tl.to("#f23p-root", { y: (-n * 85) / 0.5 - 110, duration: 0.28, ease: "power2.out" }, t);
          tl.to("#f23p-root", { y: (-n * 85) / 0.5, duration: 0.27, ease: "power2.in" }, t + 0.28);
          R.pose(tl, j, t + 0.5, 0.2, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -8, shB: 8 });
          R.squash(tl, "#f23p-root", t + 0.55);
          R.fadeIn(tl, `#f23-l${n}`, t + 0.3, 0.3);
        };
        hop(K.trote - 0.3, 1);
        hop(K.plano - 0.3, 2);
        hop(K.dist - 0.3, 3);
        hop(K.ult - 0.2, 4);
        R.pose(tl, j, K.lad, 0.3, { shF: -150, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
        R.face(tl, j, K.lad, { eyes: "happy", mouth: "grin" });
        // final: todos correndo no parque
        const tp = Math.max(K.z0 - 0.5, K.lad + 0.7);
        tl.to("#f23-gym, #f23-head, #f23-l0, #f23-l1, #f23-l2, #f23-l3, #f23-l4", { opacity: 0, duration: 0.35 }, tp);
        tl.to("#f23-park", { opacity: 1, duration: 0.35 }, tp);
        tl.to("#f23-scroll", { x: -1600, duration: K.dur - tp, ease: "none" }, tp);
        tl.to("#f23-dash", { x: -1020, duration: K.dur - tp, ease: "none" }, tp);
        const runners = ["f23r", "f23c"];
        runners.forEach((r, ri) => {
          R.face(tl, r, 0, { eyes: "happy", mouth: "grin" });
          const n = Math.floor((K.dur - tp) / 0.36);
          for (let i = 0; i < n; i++) {
            const a = (i + ri) % 2;
            R.pose(tl, r, tp + i * 0.36, 0.34, { hipF: a ? 30 : -45, knF: a ? 70 : 20, hipB: a ? -45 : 30, knB: a ? 20 : 70, shF: a ? -50 : 30, shB: a ? 30 : -50, elF: -80, elB: -80, torso: 8 }, "sine.inOut");
          }
        });
        const z = "f23z";
        R.setPose(tl, z, 0, { hipF: -60, knF: 80, hipB: -60, knB: 80, shF: -60, elF: -30, shB: -60, elB: -30, torso: 14 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        const nz = Math.floor((K.dur - tp) / 0.5);
        for (let i = 0; i < nz; i++) { const a = i % 2; R.pose(tl, z, tp + i * 0.5, 0.48, { hipF: a ? -40 : -75, knF: a ? 60 : 100, hipB: a ? -75 : -40, knB: a ? 100 : 60 }, "sine.inOut"); }
        R.pose(tl, z, K.z0, 0.25, { shF: -160, elF: -20 }, "back.out(2)");
        R.talk(tl, z, K.z0, K.z1, "grin", "open");
        R.pop(tl, "#f23-bal", K.z0, 0.4);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "pop", t: k.cam - 0.2, vol: 0.35 },
        { name: "pop", t: k.trote, vol: 0.35 },
        { name: "pop", t: k.plano, vol: 0.35 },
        { name: "pop", t: k.dist, vol: 0.35 },
        { name: "pop", t: k.lad - 0.1, vol: 0.4 },
        { name: "sparkle", t: k.lad, vol: 0.35 },
        { name: "whoosh", t: k.z0 - 0.5, vol: 0.35 },
      ],
    };
  },
};
