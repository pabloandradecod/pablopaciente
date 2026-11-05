// F18 — Exercício 1: caminhada leve (Seu Zé no parque, de fone)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { um: w(0, "Um"), cam: w(0, "caminhada"), blo: w(0, "blocos"), dia: w(0, "dia"), camr: w(0, "Caminhar"), rem: w(0, "remédios") };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    // fone de ouvido, injetado na cabeça antes dos olhos
    const phones = `<path d="M-50 -92 Q-40 -150 10 -146 Q58 -142 60 -100" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><rect x="-62" y="-92" width="34" height="46" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/>`;
    const ze = human("f19z", "ze").replace('<g id="f19z-eyes">', phones + '<g id="f19z-eyes">');
    const tree = (x, s) => `<g transform="translate(${x},800) scale(${s})"><rect x="-16" y="-150" width="32" height="150" fill="#9B6B43" ${st}/><circle cx="0" cy="-210" r="95" fill="#5DBB7A" ${st}/><circle cx="-60" cy="-160" r="60" fill="#5DBB7A" ${st}/><circle cx="60" cy="-165" r="60" fill="#5DBB7A" ${st}/></g>`;
    return {
      k,
      bg: "#CDEFF5",
      css: `
        #f19-sign { right:40px; top:34px; width:360px; padding:12px 18px; font-size:26px; line-height:1.1; border-color:#C9372A; display:flex; gap:12px; align-items:center; }
        #f19-sign b { color:#C9372A; }
        #f19-card { left:1180px; top:190px; width:620px; padding:26px 32px; }
        #f19-card .n { font-size:40px; color:#fff; background:${C.ink}; display:inline-block; padding:4px 18px; border-radius:12px; margin-bottom:10px; }
        #f19-card .h { font-size:56px; line-height:1; margin-bottom:14px; }
        #f19-card .r { font-size:38px; line-height:1.25; }
        #f19-card .r b { color:#1E9C72; }
        #f19-bed { left:1180px; top:560px; width:620px; padding:16px 26px; display:flex; gap:20px; align-items:center; }
        #f19-bed .t { font-size:36px; line-height:1.1; }
        #f19-bed .t b { color:#C9372A; }
        #f19-med { left:110px; top:120px; padding:16px 30px; font-size:52px; background:${C.good}; transform:rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="260" cy="170" r="70" fill="${C.sun}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f19-far">${[100, 520, 940, 1360, 1780, 2200, 2620].map((x) => `<path d="M${x - 200} 800 Q${x} 560 ${x + 200} 800 Z" fill="#9ADBA9"/>`).join("")}</g>
      <g id="f19-trees">${[180, 760, 1340, 1920, 2500].map((x, i) => tree(x, 0.9 + (i % 2) * 0.15)).join("")}</g>
      <rect x="0" y="800" width="1920" height="280" fill="#7CCB8E"/>
      <rect x="0" y="830" width="1920" height="60" fill="#E7D3A8"/>
      <line x1="0" y1="800" x2="1920" y2="800" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(640,590) scale(1.2)">${ze}</g>
      <g id="f19-notes" opacity="0">${[[760, 300], [800, 240], [840, 290]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="f19-note${i}"><path d="M0 0 L0 -40 L22 -46 L22 -6" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><ellipse cx="-6" cy="2" rx="10" ry="8" fill="${C.ink}"/></g></g>`).join("")}</g>
    </svg>
    <div id="f19-sign" class="abs card label"><svg width="48" height="48" viewBox="-24 -24 48 48" style="flex:none"><path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`; }).join(" ")} Z" fill="#D64534" stroke="${C.ink}" stroke-width="4"/></svg><span>Dor desceu mais pro pé? <b>PARE</b></span></div>
    <div id="f19-card" class="abs card" style="opacity:0">
      <div class="n label">EXERCÍCIO 1</div>
      <div class="h title">Caminhada</div>
      <div id="f19-r1" class="r label" style="opacity:0"><b>10 a 30 min</b> no total</div>
      <div id="f19-r2" class="r label" style="opacity:0">em <b>blocos curtos</b>, ao longo do dia</div>
    </div>
    <div id="f19-med" class="abs title card" style="opacity:0">Caminhar é remédio pra coluna!</div>`,
      js: function (tl, K, R) {
        const z = "f19z";
        // cenário passando (ele caminha "no lugar")
        tl.fromTo("#f19-trees", { x: 0 }, { x: -1160, duration: K.dur, ease: "none" }, 0);
        tl.fromTo("#f19-far", { x: 0 }, { x: -420, duration: K.dur, ease: "none" }, 0);
        R.face(tl, z, 0, { eyes: "happy", mouth: "smile" });
        R.setPose(tl, z, 0, { torso: 4, neck: -4, shF: 0, elF: -50, shB: 0, elB: -50 });
        // ciclo de caminhada (finito)
        const step = 0.42;
        const n = Math.floor((K.dur - 0.3) / step);
        for (let i = 0; i < n; i++) {
          const t = 0.1 + i * step, a = i % 2 ? 1 : -1;
          R.pose(tl, z, t, step, { hipF: 24 * a, hipB: -24 * a, knF: a > 0 ? 30 : 4, knB: a > 0 ? 4 : 30, shF: -28 * a, shB: 28 * a }, "sine.inOut");
          tl.to("#f19z-root", { y: -6, duration: step / 2, ease: "sine.out", yoyo: true, repeat: 1 }, t);
        }
        // notinhas de música
        tl.to("#f19-notes", { opacity: 1, duration: 0.3 }, 0.6);
        for (let i = 0; i < 3; i++) tl.fromTo(`#f19-note${i}`, { y: 20 }, { y: -30, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.6 + i * 0.3);
        // cartão
        R.slideIn(tl, "#f19-card", Math.max(0.1, K.um - 0.2), 0.5, 300);
        R.pop(tl, "#f19-r1", K.cam, 0.4, 0.6);
        R.pop(tl, "#f19-r2", K.blo - 0.1, 0.4, 0.6);
        R.pop(tl, "#f19-med", K.camr - 0.1, 0.5, 0.4);
        R.face(tl, z, K.rem, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.um - 0.2), vol: 0.35 },
        { name: "pop", t: k.cam, vol: 0.35 },
        { name: "pop", t: k.blo - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.camr - 0.1, vol: 0.4 },
      ],
    };
  },
};
