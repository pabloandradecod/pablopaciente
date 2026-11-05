// F26 — Vai melhorar? Gráfico da dor caindo nas primeiras semanas, pode voltar (normal), exercício diminui recaídas; Seu Zé destravado dançando
export default {
  extra: 0.5,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      boa: w(0, "boa"), agu: w(0, "aguda"), mai: w(0, "maioria"), sem: w(0, "semanas"), vol: w(0, "voltar"), nor: w(0, "normal"), exe: w(0, "exercício"), rec: w(0, "recaídas"),
    };
    // curva: alta no começo, cai rápido nas primeiras semanas, plana baixa; depois uma ondinha
    const X0 = 170, Y0 = 760, W = 960, H = 440;
    const px = (wk) => X0 + (wk / 12) * W, py = (p) => Y0 - (p / 10) * H;
    const fall = `M${px(0)} ${py(9)} C${px(1)} ${py(8.6)} ${px(2)} ${py(5)} ${px(3.2)} ${py(3)} S${px(5)} ${py(1.6)} ${px(6)} ${py(1.4)} L${px(8)} ${py(1.3)}`;
    const wave = `M${px(8)} ${py(1.3)} C${px(8.5)} ${py(1.3)} ${px(8.8)} ${py(3.6)} ${px(9.3)} ${py(3.6)} S${px(10)} ${py(1.3)} ${px(10.5)} ${py(1.2)} L${px(12)} ${py(1.1)}`;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f26-h { left:110px; top:60px; font-size:76px; }
        #f26-h span { color:${C.good}; }
        #f26-l1 { left:420px; top:330px; padding:12px 20px; font-size:30px; }
        #f26-l1 b { color:#1E9C72; }
        #f26-l2 { left:780px; top:420px; padding:10px 18px; font-size:26px; border-color:#E8A23A; }
        #f26-sh { left:1050px; top:170px; width:340px; padding:14px 18px; display:flex; gap:14px; align-items:center; font-size:28px; line-height:1.1; }
        #f26-sh b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1580" cy="600" r="250" fill="#E2F7EE"/>
      <!-- eixos -->
      <rect x="${X0 - 40}" y="${Y0 - H - 50}" width="${W + 80}" height="${H + 120}" rx="26" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
      <line x1="${X0}" y1="${Y0}" x2="${X0 + W}" y2="${Y0}" ${st}/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0 - H}" ${st}/>
      <text x="${X0 - 20}" y="${Y0 - H - 14}" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">DOR</text>
      ${[0, 2, 4, 6, 8, 10, 12].map((wk) => `<text x="${px(wk)}" y="${Y0 + 36}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="#3B5A63">${wk}</text>`).join("")}
      <text x="${X0 + W}" y="${Y0 + 62}" text-anchor="end" font-family="Nunito" font-weight="900" font-size="22" fill="#3B5A63">semanas</text>
      <path id="f26-fall" d="${fall}" fill="none" stroke="${C.good}" stroke-width="12" stroke-linecap="round"/>
      <path id="f26-wave" d="${wave}" fill="none" stroke="#E8A23A" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 0"/>
      <g id="f26-zw"><g transform="translate(1580,640) scale(1.3)">${human("f26z", "ze")}</g></g>
      <g id="f26-notes" opacity="0">${[[1700, 300], [1460, 280], [1740, 380]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="f26-n${i}"><path d="M0 0 L0 -40 L22 -46 L22 -6" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><ellipse cx="-6" cy="2" rx="10" ry="8" fill="${C.ink}"/></g></g>`).join("")}</g>
    </svg>
    <div id="f26-h" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f26-l1" class="abs card label" style="opacity:0">Melhora bastante em <b>poucas semanas</b></div>
    <div id="f26-l2" class="abs card label" style="opacity:0">pode voltar? <b>é normal</b></div>
    <div id="f26-sh" class="abs card label" style="opacity:0"><svg width="70" height="80" viewBox="-35 -40 70 80" style="flex:none"><path d="M0 -36 L30 -24 L28 8 Q20 30 0 38 Q-20 30 -28 8 L-30 -24 Z" fill="${C.good}" ${st}/><path d="M-12 0 L-2 10 L14 -10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><span><b>Exercício</b> diminui as recaídas</span></div>`,
      js: function (tl, K, R) {
        const z = "f26z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f26-h", 0.05, 0.5, -300);
        // curva cai
        tl.set("#f26-wave", { opacity: 0 }, 0);
        R.draw(tl, "#f26-fall", K.agu - 0.2, (K.sem - K.agu) + 0.6, "power1.inOut");
        R.pop(tl, "#f26-l1", K.sem - 0.1, 0.4);
        // Seu Zé destravado: dança
        R.face(tl, z, K.mai, { eyes: "happy", mouth: "grin" });
        tl.to("#f26-notes", { opacity: 1, duration: 0.3 }, K.mai);
        const n = Math.max(4, Math.floor((K.vol - K.mai) / 0.4));
        for (let i = 0; i < n; i++) {
          const t = K.mai + i * 0.4, s = i % 2 ? 1 : -1;
          R.pose(tl, z, t, 0.3, { shF: s > 0 ? -160 : -40, elF: s > 0 ? -20 : -90, shB: s > 0 ? -40 : -160, elB: s > 0 ? -90 : -20, hipF: s > 0 ? -30 : 0, knF: s > 0 ? 40 : 0, torso: 6 * s }, "back.out(1.6)");
        }
        for (let i = 0; i < 3; i++) tl.fromTo(`#f26-n${i}`, { y: 10 }, { y: -20, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.mai + i * 0.2);
        // pode voltar: ondinha
        R.pose(tl, z, K.vol - 0.2, 0.4, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, knF: 0, torso: 0 });
        R.face(tl, z, K.vol, { eyes: "wide", mouth: "flat" });
        tl.set("#f26-wave", { opacity: 1 }, K.vol);
        R.draw(tl, "#f26-wave", K.vol, 1.0, "power1.inOut");
        R.pop(tl, "#f26-l2", K.nor - 0.1, 0.4);
        R.face(tl, z, K.nor, { eyes: "happy", mouth: "smile" });
        // escudo do exercício
        R.pop(tl, "#f26-sh", K.exe - 0.1, 0.45);
        R.pose(tl, z, K.rec, 0.4, { shF: -150, elF: -30 }, "back.out(2)");
        R.face(tl, z, K.rec, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.sem - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.mai, vol: 0.35 },
        { name: "pop", t: k.nor - 0.1, vol: 0.35 },
        { name: "pop", t: k.exe - 0.1, vol: 0.4 },
      ],
    };
  },
};
