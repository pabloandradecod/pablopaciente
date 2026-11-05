// F18 — Exercício 1: caminhada leve (Seu Zé no parque, de fone)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { um: w(0, "Um"), cam: w(0, "caminhada"), min: w(0, "minutos"), duas: w(0, "duas"), rep: w(0, "Repouso"), atr: w(0, "atrasa"), mov: w(0, "Movimento"), rem: w(0, "remédio") };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    // fone de ouvido, injetado na cabeça antes dos olhos
    const phones = `<path d="M-50 -92 Q-40 -150 10 -146 Q58 -142 60 -100" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><rect x="-62" y="-92" width="34" height="46" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/>`;
    const ze = human("f18z", "ze").replace('<g id="f18z-eyes">', phones + '<g id="f18z-eyes">');
    const tree = (x, s) => `<g transform="translate(${x},800) scale(${s})"><rect x="-16" y="-150" width="32" height="150" fill="#9B6B43" ${st}/><circle cx="0" cy="-210" r="95" fill="#5DBB7A" ${st}/><circle cx="-60" cy="-160" r="60" fill="#5DBB7A" ${st}/><circle cx="60" cy="-165" r="60" fill="#5DBB7A" ${st}/></g>`;
    return {
      k,
      bg: "#CDEFF5",
      css: `
        #f18-sign { right:40px; top:34px; width:360px; padding:12px 18px; font-size:26px; line-height:1.1; border-color:#C9372A; display:flex; gap:12px; align-items:center; }
        #f18-sign b { color:#C9372A; }
        #f18-card { left:1180px; top:190px; width:620px; padding:26px 32px; }
        #f18-card .n { font-size:40px; color:#fff; background:${C.ink}; display:inline-block; padding:4px 18px; border-radius:12px; margin-bottom:10px; }
        #f18-card .h { font-size:56px; line-height:1; margin-bottom:14px; }
        #f18-card .r { font-size:38px; line-height:1.25; }
        #f18-card .r b { color:#1E9C72; }
        #f18-bed { left:1180px; top:560px; width:620px; padding:16px 26px; display:flex; gap:20px; align-items:center; }
        #f18-bed .t { font-size:36px; line-height:1.1; }
        #f18-bed .t b { color:#C9372A; }
        #f18-med { left:110px; top:140px; padding:16px 30px; font-size:58px; background:${C.good}; transform:rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="260" cy="170" r="70" fill="${C.sun}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f18-far">${[100, 520, 940, 1360, 1780, 2200, 2620].map((x) => `<path d="M${x - 200} 800 Q${x} 560 ${x + 200} 800 Z" fill="#9ADBA9"/>`).join("")}</g>
      <g id="f18-trees">${[180, 760, 1340, 1920, 2500].map((x, i) => tree(x, 0.9 + (i % 2) * 0.15)).join("")}</g>
      <rect x="0" y="800" width="1920" height="280" fill="#7CCB8E"/>
      <rect x="0" y="830" width="1920" height="60" fill="#E7D3A8"/>
      <line x1="0" y1="800" x2="1920" y2="800" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(640,590) scale(1.2)">${ze}</g>
      <g id="f18-notes" opacity="0">${[[760, 300], [800, 240], [840, 290]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="f18-note${i}"><path d="M0 0 L0 -40 L22 -46 L22 -6" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><ellipse cx="-6" cy="2" rx="10" ry="8" fill="${C.ink}"/></g></g>`).join("")}</g>
    </svg>
    <div id="f18-sign" class="abs card label"><svg width="48" height="48" viewBox="-24 -24 48 48" style="flex:none"><path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`; }).join(" ")} Z" fill="#D64534" stroke="${C.ink}" stroke-width="4"/></svg><span>Piorou ou desceu pro pé? <b>PARE</b></span></div>
    <div id="f18-card" class="abs card" style="opacity:0">
      <div class="n label">EXERCÍCIO 1</div>
      <div class="h title">Caminhada leve</div>
      <div id="f18-r1" class="r label" style="opacity:0"><b>10 a 20 min</b></div>
      <div id="f18-r2" class="r label" style="opacity:0"><b>2 a 3x</b> por dia</div>
    </div>
    <div id="f18-bed" class="abs card" style="opacity:0">
      <svg width="150" height="100" viewBox="0 0 150 100" style="flex:none"><rect x="10" y="40" width="130" height="34" rx="10" fill="#fff" ${st}/><rect x="16" y="26" width="40" height="22" rx="10" fill="${C.sky}" ${st}/><path d="M14 74 L14 92 M136 74 L136 92" ${st}/><path d="M20 10 L130 96 M130 10 L20 96" stroke="#D64534" stroke-width="12" stroke-linecap="round"/></svg>
      <div class="t label"><b>Repouso absoluto</b><br>atrasa a melhora</div>
    </div>
    <div id="f18-med" class="abs title card" style="opacity:0">Movimento é remédio!</div>`,
      js: function (tl, K, R) {
        const z = "f18z";
        // cenário passando (ele caminha "no lugar")
        tl.fromTo("#f18-trees", { x: 0 }, { x: -1160, duration: K.dur, ease: "none" }, 0);
        tl.fromTo("#f18-far", { x: 0 }, { x: -420, duration: K.dur, ease: "none" }, 0);
        R.face(tl, z, 0, { eyes: "happy", mouth: "smile" });
        R.setPose(tl, z, 0, { torso: 4, neck: -4, shF: 0, elF: -50, shB: 0, elB: -50 });
        // ciclo de caminhada (finito)
        const step = 0.42;
        const n = Math.floor((K.dur - 0.3) / step);
        for (let i = 0; i < n; i++) {
          const t = 0.1 + i * step, a = i % 2 ? 1 : -1;
          R.pose(tl, z, t, step, { hipF: 24 * a, hipB: -24 * a, knF: a > 0 ? 30 : 4, knB: a > 0 ? 4 : 30, shF: -28 * a, shB: 28 * a }, "sine.inOut");
          tl.to("#f18z-root", { y: -6, duration: step / 2, ease: "sine.out", yoyo: true, repeat: 1 }, t);
        }
        // notinhas de música
        tl.to("#f18-notes", { opacity: 1, duration: 0.3 }, 0.6);
        for (let i = 0; i < 3; i++) tl.fromTo(`#f18-note${i}`, { y: 20 }, { y: -30, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.6 + i * 0.3);
        // cartão
        R.slideIn(tl, "#f18-card", K.cam - 0.3, 0.5, 300);
        R.pop(tl, "#f18-r1", K.min - 0.5, 0.4, 0.6);
        R.pop(tl, "#f18-r2", K.duas - 0.1, 0.4, 0.6);
        R.pop(tl, "#f18-bed", K.rep - 0.1, 0.45, 0.6);
        tl.to("#f18-bed", { x: 8, duration: 0.06, yoyo: true, repeat: 5, ease: "none" }, K.atr);
        R.pop(tl, "#f18-med", K.mov - 0.1, 0.5, 0.4);
        R.face(tl, z, K.rem, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: k.cam - 0.3, vol: 0.35 },
        { name: "pop", t: k.min - 0.5, vol: 0.35 },
        { name: "pop", t: k.duas - 0.1, vol: 0.35 },
        { name: "error", t: k.rep - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.mov - 0.1, vol: 0.4 },
      ],
    };
  },
};
