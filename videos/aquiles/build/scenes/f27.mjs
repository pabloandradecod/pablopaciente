// F27 — Resumo: 3 cartões (capacete, panturrilha, tartaruga); Dr. Pablo e Dona Cida cruzam a linha de chegada; a Vértebra devolve o jaleco
export default {
  speakers: { vertebra: "f27v" },
  extra: 0.8,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), fort: w(0, "fortíssimo"), carga: w(0, "carga"), aj: w(0, "Ajusta"), esc: w(0, "escada"), pac: w(0, "paciência"),
      calc: w(0, "calcanhar"), ponto: w(0, "ponto"),
      v0: lines[1].start, v1: lines[1].end, jal: w(1, "jaleco"), div: w(1, "divertido"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.fort - 0.1, vol: 0.4 },
      { name: "pop", t: k.esc - 0.1, vol: 0.4 },
      { name: "pop", t: k.pac - 0.1, vol: 0.4 },
      { name: "impact-bass-1", t: k.calc, vol: 0.35 },
      { name: "sparkle", t: k.calc + 0.1, vol: 0.35 },
      { name: "whoosh-short", t: k.jal, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const card = (i, x, svg, html) => `<div id="f27-k${i}" class="abs card f27-k" style="left:${x}px;top:150px;opacity:0"><svg width="90" height="90" viewBox="-45 -45 90 90">${svg}</svg><div class="label">${html}</div></div>`;
    const tree = (x) => `<g transform="translate(${x},0)"><rect x="-14" y="700" width="28" height="100" fill="#8B5A2B" ${st}/><circle cx="0" cy="680" r="60" fill="#5DB560" ${st}/></g>`;
    const checks = Array.from({ length: 12 }, (_, i) => `<rect x="${1090 + i * 30}" y="${i % 2 ? 450 : 420}" width="30" height="30" fill="${C.ink}"/>`).join("");
    return {
      k,
      sfx,
      css: `
        #f27-head { left:110px; top:50px; font-size:64px; color:${C.pain}; }
        #root .f27-k { width:500px; padding:14px 18px; display:flex; align-items:center; gap:14px; font-size:29px; line-height:1.15; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.sky}"/>
      ${[160, 560, 1500, 1820].map(tree).join("")}
      <rect y="800" width="1920" height="280" fill="#9AA3A8"/><line x1="0" y1="800" x2="1920" y2="800" stroke="${C.ink}" stroke-width="7"/>
      <!-- linha de chegada -->
      <rect x="1080" y="420" width="16" height="440" fill="${C.ink}"/><rect x="1440" y="420" width="16" height="440" fill="${C.ink}"/>
      <rect x="1090" y="420" width="360" height="60" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${checks}
      <text x="1270" y="530" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">CHEGADA</text>
      <g id="f27-ribL"><line x1="1096" y1="650" x2="1268" y2="650" stroke="${C.pain}" stroke-width="10"/></g>
      <g id="f27-ribR"><line x1="1268" y1="650" x2="1440" y2="650" stroke="${C.pain}" stroke-width="10"/></g>
      <rect y="860" width="1920" height="12" fill="#fff" opacity="0.8"/>
      <!-- corredores -->
      <g id="f27-cw"><g transform="translate(-260,682) scale(1.0)">${human("f27c", "cida")}</g></g>
      <g id="f27-pw"><g transform="translate(-120,682) scale(1.0)">${human("f27p", "pablo")}</g></g>
      <!-- Vértebra com o jaleco -->
      <g id="f27-vw" opacity="0"><g transform="translate(1780,880) scale(0.9)">${vertebra("f27v")}</g></g>
      <g id="f27-coat" opacity="0"><g transform="translate(1700,600)"><g id="f27-coat-in">
        <path d="M-40 -50 L-14 -60 L0 -36 L14 -60 L40 -50 L52 40 L28 44 L26 0 L24 60 L-24 60 L-26 0 L-28 44 L-52 40 Z" fill="#fff" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M0 -36 L0 60" stroke="${C.ink}" stroke-width="3"/><circle cx="-8" cy="0" r="3" fill="${C.ink}"/><circle cx="-8" cy="20" r="3" fill="${C.ink}"/>
      </g></g></g>
      <g id="f27-conf" opacity="0">${Array.from({ length: 18 }, (_, i) => `<rect x="${1100 + ((i * 53) % 340)}" y="${300 + ((i * 37) % 120)}" width="14" height="22" rx="3" fill="${[C.pain, C.sun, C.good, C.blue][i % 4]}" transform="rotate(${i * 23} ${1107 + ((i * 53) % 340)} ${311 + ((i * 37) % 120)})"/>`).join("")}</g>
    </svg>
    <div id="f27-head" class="abs title">RESUMINDO</div>
    ${card(0, 110, `<path d="M-34 20 Q-38 -30 0 -34 Q38 -30 34 20 L22 20 L22 6 Q0 -2 -22 6 L-22 20 Z" fill="#F2B53A" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M-16 -32 Q0 -60 16 -32" fill="#D94A3D" stroke="${C.ink}" stroke-width="4"/>`, `Tendão <b style="color:#D94A3D">forte</b>, mas com limite`)}
    ${card(1, 710, `<path d="M-10 -40 L-10 18 Q-10 30 4 30 L30 30" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/><path d="M-28 34 L36 34" stroke="${C.ink}" stroke-width="6"/><path d="M24 -8 L24 -32 M16 -24 L24 -34 L32 -24" stroke="${C.good}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, `<b>Elevação de calcanhar</b> progressiva`)}
    ${card(2, 1310, `<ellipse cx="-4" cy="6" rx="30" ry="20" fill="#4FA36B" stroke="${C.ink}" stroke-width="5"/><circle cx="32" cy="0" r="12" fill="#7CC48E" stroke="${C.ink}" stroke-width="4"/><rect x="22" y="-14" width="22" height="6" rx="3" fill="${C.pain}"/>`, `<b style="color:#2E7D4A">Paciência</b>: tendão é lento`)}`,
      js: function (tl, K, R) {
        const p = "f27p", c = "f27c", v = "f27v";
        R.face(tl, p, 0, { eyes: "happy", mouth: "grin" });
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        R.slideIn(tl, "#f27-head", 0.05, 0.5, -300);
        R.pop(tl, "#f27-k0", K.fort - 0.1, 0.4);
        R.pop(tl, "#f27-k1", K.esc - 0.1, 0.4);
        R.pop(tl, "#f27-k2", K.pac - 0.1, 0.4);
        // corrida até a linha de chegada
        const t0 = 0.4, t1 = K.calc + 0.9;
        tl.to("#f27p-root", { x: 1720, duration: t1 - t0, ease: "none" }, t0);
        tl.to("#f27c-root", { x: 1760, duration: t1 - t0, ease: "none" }, t0);
        const n = Math.floor((t1 - t0) / 0.34);
        for (let i = 0; i < n; i++) {
          const a = i % 2;
          const pz = { hipF: a ? 30 : -45, knF: a ? 70 : 20, hipB: a ? -45 : 30, knB: a ? 20 : 70, shF: a ? -50 : 30, shB: a ? 30 : -50, elF: -80, elB: -80, torso: 10 };
          R.pose(tl, p, t0 + i * 0.34, 0.32, pz, "sine.inOut");
          R.pose(tl, c, t0 + i * 0.34 + 0.08, 0.32, pz, "sine.inOut");
        }
        // cruzam: a fita arrebenta quando o Dr. Pablo passa (x 1268), confete
        const tc = t0 + (t1 - t0) * (1388 / 1720);
        tl.to("#f27-ribL", { rotation: 70, svgOrigin: "1096 650", duration: 0.4, ease: "power2.in" }, tc);
        tl.to("#f27-ribR", { rotation: -70, svgOrigin: "1440 650", duration: 0.4, ease: "power2.in" }, tc);
        tl.fromTo("#f27-conf", { opacity: 0, y: -80 }, { opacity: 1, y: 60, duration: 1.4, ease: "power1.out" }, tc);
        const win = { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -160, elF: -10, shB: 160, elB: 10, torso: 0 };
        R.pose(tl, p, t1, 0.35, win, "back.out(2)");
        R.pose(tl, c, t1 + 0.1, 0.35, win, "back.out(2)");
        R.blinks(tl, p, t1 + 0.5, K.dur, "happy");
        // a Vértebra devolve o jaleco
        R.setPose(tl, v, 0, { armF: -150, armB: 20 });
        R.face(tl, v, 0, { eyes: "happy", mouth: "smile" });
        tl.to("#f27-vw", { opacity: 1, duration: 0.3 }, K.v0 - 0.6);
        tl.fromTo("#f27-vw", { y: 300 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.v0 - 0.6);
        tl.set("#f27-coat", { opacity: 1 }, K.v0 - 0.3);
        tl.fromTo("#f27-coat-in", { y: 120, scale: 0.3, transformOrigin: "50% 50%" }, { y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }, K.v0 - 0.3);
        tl.to("#f27-coat-in", { rotation: -10, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1 }, K.v0);
        // joga para o Dr. Pablo (arco)
        tl.to("#f27-coat", { x: -80, duration: 0.6, ease: "none" }, K.jal + 0.1);
        tl.to("#f27-coat", { y: -120, duration: 0.3, ease: "power2.out" }, K.jal + 0.1);
        tl.to("#f27-coat", { y: -60, duration: 0.3, ease: "power2.in" }, K.jal + 0.4);
        R.pose(tl, v, K.jal, 0.3, { armF: -60 }, "back.out(2)");
        R.pose(tl, p, K.jal + 0.4, 0.3, { shF: -120, elF: -30, shB: 20, elB: -20 }, "back.out(2)");
        tl.to("#f27-coat", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 0.3 }, K.jal + 0.9);
        R.face(tl, p, K.jal + 0.8, { eyes: "happy", mouth: "grin" });
        R.face(tl, v, K.div, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
