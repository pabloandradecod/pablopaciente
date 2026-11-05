// F15 — O duelo no ringue: Piriforme × Hérnia de disco, 4 rounds no placar; a Vértebra é a juíza
export default {
  speakers: { vertebra: "f15v" },
  tail: 1.0,
  build(ctx) {
    const { C, piriforme, vertebra, w, lines } = ctx;
    const k = {
      duelo: w(0, "duelo"), pir: w(0, "piriforme"), her: w(0, "hérnia"),
      r: [w(0, "No"), w(0, "Tosse"), w(0, "teste"), w(0, "perda")],
      rh: [w(0, "costuma"), w(0, "pioram"), w(0, "positivo"), w(0, "sensibilidade")],
      rp: [w(0, "nádega"), w(0, "não", 0), w(0, "fraco"), w(0, "geralmente")],
      v0: lines[1].start, v1: lines[1].end,
    };
    const BLUE = "#7FB8E6";
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const rows = [
      ["Onde dói", "Nádega", "Lombar + desce<br>abaixo do joelho"],
      ["Tosse e espirro", "Não piora", "Piora"],
      ["Lasègue", "Negativo ou fraco", "Positivo (30°–70°)"],
      ["Força, sensibilidade<br>e reflexos", "Geralmente normais", "Podem estar<br>alterados"],
    ];
    const glove = (c) => `<ellipse cx="0" cy="0" rx="26" ry="22" fill="${c}" stroke="${C.ink}" stroke-width="6"/><path d="M-6 -20 Q8 -10 -4 4" fill="none" stroke="${C.ink}" stroke-width="4"/>`;
    // personagem Hérnia: disco azulado com o "recheio" vermelho escapando
    const hernia = `<g id="f15-hz">
      <g transform="translate(-92,-150)"><g id="f15-hgB"><path d="M0 0 L-30 20" ${st} stroke-width="16"/><g transform="translate(-36,24)">${glove(C.pain)}</g></g></g>
      <rect x="-60" y="-50" width="20" height="50" rx="8" fill="#9AB3C6" ${st}/><rect x="40" y="-50" width="20" height="50" rx="8" fill="#9AB3C6" ${st}/>
      <rect x="-110" y="-220" width="220" height="170" rx="60" fill="${BLUE}" stroke="${C.ink}" stroke-width="7"/>
      <ellipse cx="-12" cy="-135" rx="70" ry="44" fill="#BFE0F7" stroke="${C.ink}" stroke-width="5"/>
      <path d="M100 -150 Q150 -150 150 -128 Q152 -104 100 -110 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-58 -176 L-22 -164 M34 -176 L0 -164" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="-40" cy="-146" rx="11" ry="13" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="-44" cy="-144" r="5" fill="${C.ink}"/>
      <ellipse cx="18" cy="-146" rx="11" ry="13" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="14" cy="-144" r="5" fill="${C.ink}"/>
      <path d="M-34 -108 Q-12 -120 10 -108" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
      <g transform="translate(-100,-120)"><g id="f15-hgF"><path d="M0 0 L-30 10" ${st} stroke-width="16"/><g transform="translate(-36,12)">${glove(C.pain)}</g></g></g>
    </g>`;
    const bell = `<g id="f15-bell"><path d="M-28 20 Q-28 -26 0 -28 Q28 -26 28 20 Z" fill="${C.sun}" ${st}/><rect x="-36" y="18" width="72" height="12" rx="6" fill="${C.sun}" ${st}/><circle cx="0" cy="36" r="8" fill="${C.ink}"/></g>`;
    return {
      k,
      bg: "#1E3F4A",
      css: `
        #f15-board { left:420px; top:40px; width:1080px; padding:16px 18px 12px; background:#fff; border:7px solid ${C.ink}; border-radius:26px; box-shadow:10px 10px 0 #0B2A33; }
        #f15-board .hd { display:grid; grid-template-columns: 1fr 280px 1fr; gap:10px; margin-bottom:8px; text-align:center; font-size:38px; }
        #f15-board .hd .p { color:#D9574D; } #f15-board .hd .h { color:#2F78B8; } #f15-board .hd .vs { color:${C.ink}; font-size:34px; align-self:center; }
        #root .f15-row { display:grid; grid-template-columns: 1fr 280px 1fr; gap:10px; margin-top:8px; align-items:stretch; }
        #root .f15-row > div { border:5px solid ${C.ink}; border-radius:16px; padding:6px 10px; display:flex; align-items:center; justify-content:center; text-align:center; font-size:28px; line-height:1.1; min-height:74px; }
        #root .f15-row .l { background:${C.ink}; color:#fff; font-size:25px; }
        #root .f15-row .p { background:#FFD9D4; } #root .f15-row .h { background:#D8ECFB; }
        #f15-tech { left:0; right:0; top:610px; text-align:center; }
        #f15-tech span { display:inline-block; font-size:54px; background:${C.sun}; padding:6px 30px; border:7px solid ${C.ink}; border-radius:22px; transform: rotate(-3deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g opacity="0.5">${[[300, 0], [960, 0], [1620, 0]].map(([x]) => `<path d="M${x - 60} 0 L${x + 60} 0 L${x + 330} 860 L${x - 330} 860 Z" fill="#FFF6E9" opacity="0.12"/>`).join("")}</g>
      <path d="M40 760 L1880 760 L1920 880 L0 880 Z" fill="#3E7B8C" stroke="${C.ink}" stroke-width="7"/>
      <rect x="0" y="870" width="1920" height="210" fill="#163039"/>
      <rect x="60" y="520" width="26" height="250" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/>
      <rect x="1834" y="520" width="26" height="250" rx="8" fill="#2F78B8" stroke="${C.ink}" stroke-width="6"/>
      ${[560, 620, 680].map((y) => `<line x1="86" y1="${y}" x2="1834" y2="${y}" stroke="#fff" stroke-width="8"/>`).join("")}
      <g id="f15-pw"><g transform="translate(330,830) scale(0.95)">${piriforme("f15m")}</g></g>
      <g id="f15-hw"><g transform="translate(1590,830) scale(1.1)">${hernia}</g></g>
      <g id="f15-vw"><g transform="translate(960,840) scale(0.8)">${vertebra("f15v")}</g><g transform="translate(1060,650)">${bell}</g></g>
      <g id="f15-pow" opacity="0"><path d="M960 360 L990 300 L1010 350 L1060 320 L1040 370 L1090 390 L1040 410 L1060 460 L1010 430 L990 480 L970 430 L920 450 L940 405 L890 390 L940 370 L920 320 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/></g>
    </svg>
    <div id="f15-board" class="abs card" style="opacity:0">
      <div class="hd title"><div class="p">PIRIFORME</div><div class="vs">VS</div><div class="h">HÉRNIA DE DISCO</div></div>
      ${rows.map((r, i) => `<div id="f15-r${i}" class="f15-row label" style="opacity:0"><div class="p" id="f15-r${i}p">${r[1]}</div><div class="l">${r[0]}</div><div class="h" id="f15-r${i}h">${r[2]}</div></div>`).join("")}
    </div>
    <div id="f15-tech" class="abs title" style="opacity:0"><span>LUTA TÉCNICA!</span></div>`,
      js: function (tl, K, R) {
        // lutadores entram
        tl.fromTo("#f15-pw", { x: -600 }, { x: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.1);
        tl.fromTo("#f15-hw", { x: 600 }, { x: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.2);
        R.setPose(tl, "f15m", 0, { armF: -60, armB: 40 });
        R.face(tl, "f15m", 0, { eyes: "normal", mouth: "grin" });
        tl.set("#f15-vw", { opacity: 0 }, 0);
        // quicando como boxeadores (finito)
        for (let i = 0; i < 8; i++) {
          tl.to("#f15m-root", { y: -14, duration: 0.18, ease: "power2.out" }, 0.8 + i * 0.4);
          tl.to("#f15m-root", { y: 0, duration: 0.18, ease: "power2.in" }, 0.98 + i * 0.4);
          tl.to("#f15-hz", { y: -12, duration: 0.18, ease: "power2.out" }, 1.0 + i * 0.4);
          tl.to("#f15-hz", { y: 0, duration: 0.18, ease: "power2.in" }, 1.18 + i * 0.4);
        }
        R.pop(tl, "#f15-board", K.duelo - 0.2, 0.5, 0.6);
        // cada round: a fileira entra, o lado citado dá um soco
        K.r.forEach((t, i) => {
          tl.fromTo(`#f15-r${i}`, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(2)" }, t - 0.15);
          // soco do Piriforme
          const tp = K.rp[i];
          R.pose(tl, "f15m", tp - 0.1, 0.12, { armF: -110 }, "power4.out");
          R.pose(tl, "f15m", tp + 0.25, 0.25, { armF: -60 });
          tl.fromTo(`#f15-r${i}p`, { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, tp - 0.05);
          // soco da Hérnia
          const th = K.rh[i];
          tl.to("#f15-hgF", { x: -60, duration: 0.12, ease: "power4.out" }, th - 0.1);
          tl.to("#f15-hgF", { x: 0, duration: 0.25, ease: "power2.inOut" }, th + 0.25);
          tl.fromTo(`#f15-r${i}h`, { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, th - 0.05);
        });
        // Vértebra juíza toca o sino
        const v = "f15v";
        tl.set("#f15-vw", { opacity: 1 }, K.v0 - 0.5);
        tl.fromTo("#f15-vw", { y: 300 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.v0 - 0.5);
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, v, K.v0 - 0.5, { eyes: "happy" });
        R.pose(tl, v, K.v0, 0.25, { armF: -130, armB: 140 }, "back.out(2)");
        for (let i = 0; i < 3; i++) tl.fromTo("#f15-bell", { rotation: -18, svgOrigin: "0 -20" }, { rotation: 18, svgOrigin: "0 -20", duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.v0 + i * 0.28);
        tl.set("#f15-pow", { opacity: 1 }, K.v0 + 0.8);
        tl.fromTo("#f15-pow", { scale: 0.2, svgOrigin: "990 390" }, { scale: 1, svgOrigin: "990 390", duration: 0.3, ease: "back.out(2.5)" }, K.v0 + 0.8);
        tl.to("#f15-pow", { opacity: 0, duration: 0.2 }, K.v0 + 1.3);
        R.pop(tl, "#f15-tech", K.v0 + 0.9, 0.4);
        R.face(tl, "f15m", K.v0 + 0.9, { eyes: "wide", mouth: "open" });
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "ping", t: k.duelo - 0.2, vol: 0.5 },
        ...k.rp.map((t) => ({ name: "impact-bass-1", t: t, vol: 0.35 })),
        ...k.rh.map((t) => ({ name: "impact-bass-2", t: t, vol: 0.3 })),
        { name: "ping", t: k.v0, vol: 0.5 },
        { name: "ping", t: k.v0 + 0.28, vol: 0.45 },
        { name: "ping", t: k.v0 + 0.56, vol: 0.4 },
      ],
    };
  },
};
