// F18 — Exercício 1: caminhada leve (Seu Zé no parque, de fone)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = { cam: w(0, "caminhada"), gos: w(0, "goste"), bic: w(0, "Bicicleta"), nat: w(0, "natação"), pil: w(0, "pilates"), mus: w(0, "musculação"), dan: w(0, "dança"), mel: w(0, "melhor"), man: w(0, "manter") };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    // fone de ouvido, injetado na cabeça antes dos olhos
    const phones = `<path d="M-50 -92 Q-40 -150 10 -146 Q58 -142 60 -100" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><rect x="-62" y="-92" width="34" height="46" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/>`;
    const ze = human("f23z", "ze").replace('<g id="f23z-eyes">', phones + '<g id="f23z-eyes">');
    const tree = (x, s) => `<g transform="translate(${x},800) scale(${s})"><rect x="-16" y="-150" width="32" height="150" fill="#9B6B43" ${st}/><circle cx="0" cy="-210" r="95" fill="#5DBB7A" ${st}/><circle cx="-60" cy="-160" r="60" fill="#5DBB7A" ${st}/><circle cx="60" cy="-165" r="60" fill="#5DBB7A" ${st}/></g>`;
    return {
      k,
      bg: "#CDEFF5",
      css: `
        #f23-sign { right:40px; top:34px; width:360px; padding:12px 18px; font-size:26px; line-height:1.1; border-color:#C9372A; display:flex; gap:12px; align-items:center; }
        #f23-sign b { color:#C9372A; }
        #f23-card { left:1180px; top:190px; width:620px; padding:26px 32px; }
        #f23-card .n { font-size:40px; color:#fff; background:${C.ink}; display:inline-block; padding:4px 18px; border-radius:12px; margin-bottom:10px; }
        #f23-card .h { font-size:56px; line-height:1; margin-bottom:14px; }
        #f23-card .r { font-size:38px; line-height:1.25; }
        #f23-card .r b { color:#1E9C72; }
        #root .f23-chip { top:520px; width:150px; padding:14px 4px 10px; text-align:center; font-size:21px; }
        #f23-med { left:1010px; top:700px; width:800px; padding:14px 26px; font-size:40px; line-height:1.1; background:${C.good}; transform:rotate(-3deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="260" cy="170" r="70" fill="${C.sun}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f23-far">${[100, 520, 940, 1360, 1780, 2200, 2620].map((x) => `<path d="M${x - 200} 800 Q${x} 560 ${x + 200} 800 Z" fill="#9ADBA9"/>`).join("")}</g>
      <g id="f23-trees">${[180, 760, 1340, 1920, 2500].map((x, i) => tree(x, 0.9 + (i % 2) * 0.15)).join("")}</g>
      <rect x="0" y="800" width="1920" height="280" fill="#7CCB8E"/>
      <rect x="0" y="830" width="1920" height="60" fill="#E7D3A8"/>
      <line x1="0" y1="800" x2="1920" y2="800" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(380,590) scale(1.2)">${ze}</g>
      <g id="f23-notes" opacity="0">${[[500, 300], [540, 240], [580, 290]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="f23-note${i}"><path d="M0 0 L0 -40 L22 -46 L22 -6" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><ellipse cx="-6" cy="2" rx="10" ry="8" fill="${C.ink}"/></g></g>`).join("")}</g>
    </svg>
    <div id="f23-sign" class="abs card label"><svg width="48" height="48" viewBox="-24 -24 48 48" style="flex:none"><path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`; }).join(" ")} Z" fill="#D64534" stroke="${C.ink}" stroke-width="4"/></svg><span>Desconforto leve: OK · <b>Dor forte: diminui</b></span></div>
    <div id="f23-card" class="abs card" style="opacity:0">
      <div class="n label">EXERCÍCIO 6</div>
      <div class="h title">Caminhada</div>
      <div id="f23-r1" class="r label" style="opacity:0">+ <b>qualquer exercício</b></div>
      <div id="f23-r2" class="r label" style="opacity:0">que <b>você goste</b></div>
    </div>
    <div id="f23-c0" class="abs card label f23-chip" style="left:1010px;opacity:0"><svg width="110" height="80" viewBox="-55 -40 110 80"><circle cx="-30" cy="14" r="22" stroke="#013E4C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="32" cy="14" r="22" stroke="#013E4C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M-30 14 L-6 -18 L22 -18 L32 14 M-6 -18 L4 14 L22 -18 M-14 -26 L0 -26" stroke="#013E4C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg><div>Bicicleta</div></div>
    <div id="f23-c1" class="abs card label f23-chip" style="left:1175px;opacity:0"><svg width="110" height="80" viewBox="-55 -40 110 80"><circle cx="18" cy="-16" r="12" fill="#F2C59A" stroke="#013E4C" stroke-width="5"/><path d="M-44 -2 L12 -8" stroke="#013E4C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M-50 18 Q-38 8 -26 18 Q-14 28 -2 18 Q10 8 22 18 Q34 28 46 18" stroke="#4A90C2" stroke-width="7" fill="none" stroke-linecap="round"/></svg><div>Natação</div></div>
    <div id="f23-c2" class="abs card label f23-chip" style="left:1340px;opacity:0"><svg width="110" height="80" viewBox="-55 -40 110 80"><circle cx="0" cy="-2" r="28" fill="#8E6CD8" stroke="#013E4C" stroke-width="5"/><rect x="-48" y="26" width="96" height="10" rx="5" fill="#3DD9A4" stroke="#013E4C" stroke-width="4"/></svg><div>Pilates</div></div>
    <div id="f23-c3" class="abs card label f23-chip" style="left:1505px;opacity:0"><svg width="110" height="80" viewBox="-55 -40 110 80"><path d="M-36 0 L36 0" stroke="#013E4C" stroke-width="9" stroke-linecap="round"/><rect x="-48" y="-22" width="14" height="44" rx="4" fill="#FF5A4E" stroke="#013E4C" stroke-width="4"/><rect x="34" y="-22" width="14" height="44" rx="4" fill="#FF5A4E" stroke="#013E4C" stroke-width="4"/></svg><div>Musculação</div></div>
    <div id="f23-c4" class="abs card label f23-chip" style="left:1670px;opacity:0"><svg width="110" height="80" viewBox="-55 -40 110 80"><path d="M-8 18 L-8 -26 L22 -32 L22 10" stroke="#013E4C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><ellipse cx="-16" cy="20" rx="12" ry="9" fill="#013E4C"/><ellipse cx="14" cy="12" rx="12" ry="9" fill="#013E4C"/></svg><div>Dança</div></div>
    <div id="f23-med" class="abs title card" style="opacity:0">O melhor exercício é o que você faz com constância!</div>`,
      js: function (tl, K, R) {
        const z = "f23z";
        // cenário passando (ele caminha "no lugar")
        tl.fromTo("#f23-trees", { x: 0 }, { x: -1160, duration: K.dur, ease: "none" }, 0);
        tl.fromTo("#f23-far", { x: 0 }, { x: -420, duration: K.dur, ease: "none" }, 0);
        R.face(tl, z, 0, { eyes: "happy", mouth: "smile" });
        R.setPose(tl, z, 0, { torso: 4, neck: -4, shF: 0, elF: -50, shB: 0, elB: -50 });
        // ciclo de caminhada (finito)
        const step = 0.42;
        const n = Math.floor((K.dur - 0.3) / step);
        for (let i = 0; i < n; i++) {
          const t = 0.1 + i * step, a = i % 2 ? 1 : -1;
          R.pose(tl, z, t, step, { hipF: 24 * a, hipB: -24 * a, knF: a > 0 ? 30 : 4, knB: a > 0 ? 4 : 30, shF: -28 * a, shB: 28 * a }, "sine.inOut");
          tl.to("#f23z-root", { y: -6, duration: step / 2, ease: "sine.out", yoyo: true, repeat: 1 }, t);
        }
        // notinhas de música
        tl.to("#f23-notes", { opacity: 1, duration: 0.3 }, 0.6);
        for (let i = 0; i < 3; i++) tl.fromTo(`#f23-note${i}`, { y: 20 }, { y: -30, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.6 + i * 0.3);
        // cartão
        R.slideIn(tl, "#f23-card", K.cam - 0.3, 0.5, 300);
        R.pop(tl, "#f23-r1", K.gos - 0.6, 0.4, 0.6);
        R.pop(tl, "#f23-r2", K.gos - 0.1, 0.4, 0.6);
        [K.bic, K.nat, K.pil, K.mus, K.dan].forEach((t, i) => R.pop(tl, `#f23-c${i}`, t - 0.08, 0.4, 0.4));
        R.pop(tl, "#f23-med", K.mel - 0.1, 0.5, 0.4);
        R.face(tl, z, K.man, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: k.cam - 0.3, vol: 0.35 },
        ...[k.bic, k.nat, k.pil, k.mus, k.dan].map((t) => ({ name: "pop", t: t - 0.08, vol: 0.3 })),
        { name: "sparkle", t: k.mel - 0.1, vol: 0.4 },
      ],
    };
  },
};
