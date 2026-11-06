// F10 — Quem tem: 40+, braço acima da cabeça, aumento rápido de peso na academia, natação/vôlei/tênis, diabetes, fumo, colesterol alto; Dona Cida carimba dois
export default {
  speakers: { cida: "f10c" },
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      quar: w(0, "quarenta"), trab: w(0, "trabalha"), peso: w(0, "peso"), rap: w(0, "rápido"), acad: w(0, "academia"),
      dia: w(0, "diabetes"), fuma: w(0, "fuma"), col: w(0, "colesterol"), circ: w(0, "circulação"),
      c0: lines[1].start, c1: lines[1].end, cA: w(1, "Academia"), var: w(1, "varal"), duas: w(1, "duas"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const card = (i, label, svg) => `<div id="f10-k${i}" class="abs card" style="left:${70 + (i % 4) * 262}px;top:${160 + Math.floor(i / 4) * 330}px;width:240px;height:270px;padding:10px 8px;text-align:center;opacity:0">
      <svg width="110" height="110" viewBox="-55 -55 110 110">${svg}</svg><div class="label" style="font-size:25px;line-height:1.12">${label}</div>
      <div id="f10-stamp${i}" class="f10-stamp title" style="opacity:0">SOU EU!</div></div>`;
    const stamp = `<g transform="translate(0,6)"><rect x="-16" y="-34" width="32" height="30" rx="6" fill="#8B5A2B" stroke="${C.ink}" stroke-width="4"/><rect x="-26" y="-6" width="52" height="16" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>`;
    const cida = human("f10c", "cida").replace('<g id="f10c-handF">', `<g id="f10c-handF">${stamp}`);
    return {
      k,
      css: `
        #f10-h { left:80px; top:40px; font-size:62px; }
        #f10-h span { color:${C.pain}; }
        #root .f10-stamp { position:absolute; left:30px; top:96px; padding:6px 14px; border:6px solid ${C.pain}; border-radius:12px; color:${C.pain}; font-size:38px; background:rgba(255,255,255,0.85); transform: rotate(-14deg); }
        #f10-circ { left:856px; top:560px; width:240px; padding:16px 12px; text-align:center; font-size:26px; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <circle cx="1500" cy="640" r="250" fill="#E9E4F5"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <g id="f10-c-wrap"><g transform="translate(1500,690) scale(1.3)">${cida}</g></g>
    </svg>
    <div id="f10-h" class="abs title" style="opacity:0">Quem tem <span>mais risco</span>?</div>
    ${card(0, "Depois dos 40", `<rect x="-40" y="-34" width="80" height="72" rx="10" fill="#fff" ${st}/><rect x="-40" y="-34" width="80" height="20" fill="${C.pain}" ${st}/><text x="0" y="28" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">40+</text>`)}
    ${card(1, "Braço acima da cabeça", `<circle cx="-6" cy="-6" r="12" fill="${C.ink}"/><path d="M-6 8 L-6 40 M-6 14 L14 -40 M-6 14 L-26 30 M-6 40 L-20 52 M-6 40 L8 52" ${st} fill="none" stroke-width="7"/><rect x="2" y="-52" width="34" height="14" rx="5" fill="#8FD3C6" ${st} stroke-width="4"/>`)}
    ${card(2, "Aumentar o peso rápido na academia", `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-48" y="-26" width="16" height="52" rx="5" fill="#3A3A3A" ${st}/><rect x="32" y="-26" width="16" height="52" rx="5" fill="#3A3A3A" ${st}/><path d="M20 -48 L36 -32 M36 -48 L36 -32 L20 -32" fill="none" stroke="${C.pain}" stroke-width="6"/>`)}
    ${card(3, "Natação, vôlei, tênis", `<circle r="34" fill="#fff" ${st}/><path d="M-32 -12 Q0 6 32 -12 M-16 -30 Q-6 0 -18 32 M16 -30 Q6 0 18 32" fill="none" stroke="${C.ink}" stroke-width="4"/>`)}
    ${card(4, "Diabetes", `<path d="M0 -40 Q30 0 30 16 Q30 42 0 42 Q-30 42 -30 16 Q-30 0 0 -40Z" fill="${C.pain}" ${st}/>`)}
    ${card(5, "Fumar", `<rect x="-44" y="-6" width="70" height="16" rx="4" fill="#fff" ${st} stroke-width="4"/><rect x="26" y="-6" width="18" height="16" rx="3" fill="#FF8A3D" ${st} stroke-width="4"/><path d="M38 -16 Q30 -30 40 -40" fill="none" stroke="#9AA7AD" stroke-width="5"/><path d="M-50 -40 L50 40" stroke="${C.pain}" stroke-width="8"/>`)}
    ${card(6, "Colesterol alto", `<path d="M-46 0 Q0 -30 46 0 Q0 30 -46 0Z" fill="#FFB3AA" ${st}/><circle cx="-10" cy="0" r="9" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/><circle cx="12" cy="-4" r="7" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/>`)}
    <div id="f10-circ" class="abs card label" style="opacity:0">atrapalham a <b>circulação</b> do tendão</div>`,
      js: function (tl, K, R) {
        const c = "f10c";
        R.setPose(tl, c, 0, { shF: 10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.3, K.dur);
        R.rise(tl, "#f10-h", 0.1, 0.5);
        [K.quar, K.trab, K.peso, K.acad + 0.4, K.dia, K.fuma, K.col].forEach((t, i) => R.pop(tl, `#f10-k${i}`, t - 0.15, 0.4));
        R.pop(tl, "#f10-circ", K.circ - 0.2, 0.4);
        R.face(tl, c, K.peso, { eyes: "wide", mouth: "flat" });
        // Dona Cida carimba
        R.face(tl, c, K.c0, { eyes: "happy", mouth: "grin" });
        const hit = (i, t) => {
          R.pose(tl, c, t - 0.3, 0.2, { shF: -150, elF: -20 }, "power2.out");
          R.pose(tl, c, t - 0.1, 0.12, { shF: -60, elF: -20 }, "power3.in");
          tl.set(`#f10-stamp${i}`, { opacity: 1 }, t);
          tl.fromTo(`#f10-stamp${i}`, { scale: 2.2 }, { scale: 1, duration: 0.25, ease: "back.out(2)" }, t);
        };
        hit(2, K.cA + 0.1);
        hit(1, K.var + 0.1);
        R.pose(tl, c, K.duas, 0.3, { shF: -105, elF: -35, shB: 20 }, "back.out(2)");
      },
      sfx: [
        { name: "pop", t: 0.1, vol: 0.3 },
        ...[k.quar, k.trab, k.peso, k.acad + 0.4, k.dia, k.fuma, k.col].map((t) => ({ name: "pop", t: t - 0.15, vol: 0.28 })),
        { name: "pop", t: k.circ - 0.2, vol: 0.28 },
        { name: "impact-bass-1", t: k.cA + 0.1, vol: 0.3 },
        { name: "impact-bass-1", t: k.var + 0.1, vol: 0.3 },
      ],
    };
  },
};
