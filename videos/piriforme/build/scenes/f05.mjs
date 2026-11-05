// F5 — Conheça o piriforme: pelve vista de trás, músculo do sacro ao trocânter maior, formato de pera, função
const ink = "#013E4C";
// pelve vista de trás (centro x=620). Retorna SVG com ids prefixados.
export function pelvis(P, C) {
  const st = `stroke="${ink}" stroke-width="7" stroke-linejoin="round"`;
  return `
    <g id="${P}-bones">
      <!-- ílios -->
      <path d="M560 300 Q470 200 330 230 Q250 260 270 360 Q300 440 390 480 Q450 500 520 470 Z" fill="${C.bone}" ${st}/>
      <path d="M680 300 Q770 200 910 230 Q990 260 970 360 Q940 440 850 480 Q790 500 720 470 Z" fill="${C.bone}" ${st}/>
      <!-- L5 -->
      <rect x="585" y="210" width="70" height="56" rx="14" fill="${C.bone}" ${st}/>
      <rect x="590" y="268" width="60" height="12" rx="6" fill="#9CD3E6" stroke="${ink}" stroke-width="4"/>
      <!-- sacro -->
      <path d="M555 282 L685 282 Q690 380 640 470 Q620 500 600 470 Q550 380 555 282 Z" fill="#EADFC6" ${st}/>
      ${[310, 345, 380, 415].map((y, i) => `<circle cx="${592 + i * 2}" cy="${y}" r="7" fill="${ink}" opacity="0.35"/><circle cx="${648 - i * 2}" cy="${y}" r="7" fill="${ink}" opacity="0.35"/>`).join("")}
      <!-- ísquios -->
      <path d="M430 480 Q420 560 470 600 Q520 610 540 570 Q520 520 500 488 Z" fill="${C.bone}" ${st}/>
      <path d="M810 480 Q820 560 770 600 Q720 610 700 570 Q720 520 740 488 Z" fill="${C.bone}" ${st}/>
      <!-- fêmures -->
      <g id="${P}-femL"><circle cx="400" cy="520" r="40" fill="${C.bone}" ${st}/>
        <path d="M400 520 L340 530 Q300 520 296 560 Q300 600 330 600 L360 860 L420 860 L410 600 Q420 560 400 520 Z" fill="${C.bone}" ${st}/></g>
      <g id="${P}-femR"><circle cx="840" cy="520" r="40" fill="${C.bone}" ${st}/>
        <path d="M840 520 L900 530 Q940 520 944 560 Q940 600 910 600 L880 860 L820 860 L830 600 Q820 560 840 520 Z" fill="${C.bone}" ${st}/></g>
      <circle id="${P}-troc" cx="928" cy="548" r="10" fill="${C.pain}" opacity="0"/>
    </g>`;
}
// músculo piriforme (lado direito e esquerdo), do sacro ao trocânter maior
export const PIRI_R = "M676 360 Q760 360 860 470 Q910 520 930 540 Q930 562 908 560 Q850 540 770 510 Q700 486 650 460 Q660 400 676 360 Z";
export const PIRI_L = "M564 360 Q480 360 380 470 Q330 520 310 540 Q310 562 332 560 Q390 540 470 510 Q540 486 590 460 Q580 400 564 360 Z";

export default {
  tail: 1.0,
  build(ctx) {
    const { C, piriforme, w } = ctx;
    const k = {
      musc: w(0, "músculo"), fundo: w(0, "fundo"), nome: w(0, "nome"), forma: w(0, "formato"), sai: w(0, "Sai"), sacro: w(0, "sacro"),
      topo: w(0, "topo"), femur: w(0, "fêmur"), func: w(0, "função"), girar: w(0, "Girar"), estab: w(0, "estabilizar"), anda: w(0, "anda"),
    };
    const st = `stroke="${ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const stripes = (d) => `<path d="${d}" fill="#F2766B" ${st}/>`;
    const tag = (id, x, y, txt, color = ink) => `<g id="${id}" opacity="0"><rect x="${x}" y="${y}" width="${txt.length * 19 + 36}" height="48" rx="14" fill="${color}"/><text x="${x + 18}" y="${y + 34}" font-family="Nunito" font-weight="900" font-size="30" fill="#fff">${txt}</text></g>`;
    return {
      k,
      css: `
        #f05-title { left:120px; top:60px; font-size:64px; }
        #f05-title span { color:#E2574C; }
        #f05-pear-lbl { left:1330px; top:120px; width:520px; text-align:center; font-size:46px; }
        #f05-pear-lbl b { color:#E2574C; }
        #f05-fn { left:1270px; top:110px; width:590px; padding:24px 28px; }
        #f05-fn h3 { font-family:"Montserrat"; font-weight:900; font-size:40px; margin-bottom:12px; }
        #root .f05-row { display:flex; align-items:center; gap:18px; font-size:36px; font-weight:900; margin-top:10px; opacity:0; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1210" height="1080" fill="${C.wall}"/>
      <line x1="1210" y1="0" x2="1210" y2="1080" stroke="${ink}" stroke-width="7"/>
      <rect x="1210" y="880" width="710" height="200" fill="${C.floor}"/>
      <line x1="1210" y1="880" x2="1920" y2="880" stroke="${ink}" stroke-width="7"/>
      <g id="f05-diag">
        <!-- pele/nádega (some no raio-x) -->
        <g id="f05-skin"><path d="M260 220 Q240 520 300 700 Q420 820 610 760 L620 300 Z M980 220 Q1000 520 940 700 Q820 820 630 760 L620 300 Z" fill="#F7DCC6" stroke="${ink}" stroke-width="7"/>
          <path d="M620 300 L620 760" stroke="${ink}" stroke-width="6"/></g>
        <g id="f05-xr" opacity="0">${pelvis("f05", C)}
          <clipPath id="f05-clipR"><rect id="f05-clipRr" x="640" y="330" width="0" height="260"/></clipPath>
          <clipPath id="f05-clipL"><rect id="f05-clipLr" x="600" y="330" width="0" height="260"/></clipPath>
          <g clip-path="url(#f05-clipR)">${stripes(PIRI_R)}<path d="M690 390 Q800 440 900 535 M680 430 Q780 470 890 548" stroke="#C94C42" stroke-width="5" fill="none" stroke-linecap="round"/></g>
          <g clip-path="url(#f05-clipL)" opacity="0.55">${stripes(PIRI_L)}</g>
        </g>
        ${tag("f05-t-sac", 520, 180, "SACRO")}
        ${tag("f05-t-fem", 930, 620, "FÊMUR")}
        ${tag("f05-t-pir", 730, 300, "PIRIFORME", "#E2574C")}
        <circle id="f05-sacdot" cx="664" cy="400" r="16" fill="${C.sun}" stroke="${ink}" stroke-width="5" opacity="0"/>
      </g>
      <!-- painel direito -->
      <g id="f05-m-wrap"><g transform="translate(1440,880)">${piriforme("f05m")}</g></g>
      <g id="f05-pear" opacity="0"><g transform="translate(1720,880)"><g id="f05-pearin">
        <path d="M0 -330 Q40 -330 44 -270 Q48 -230 82 -180 Q108 -130 94 -94 Q76 -60 0 -60 Q-76 -60 -94 -94 Q-108 -130 -82 -180 Q-48 -230 -44 -270 Q-40 -330 0 -330 Z" fill="#C8DB5A" ${st}/>
        <path d="M0 -330 L6 -360" ${st}/><path d="M6 -350 Q34 -372 46 -350 Q24 -336 6 -350 Z" fill="${C.good}" ${st}/>
        <ellipse cx="-36" cy="-150" rx="14" ry="26" fill="#fff" opacity="0.5"/>
        <path d="M-20 0 L-20 -60 M20 0 L20 -60" stroke="transparent"/>
      </g></g></g>
    </svg>
    <div id="f05-title" class="abs title" style="opacity:0">Conheça o <span>PIRIFORME</span></div>
    <div id="f05-pear-lbl" class="abs label" style="opacity:0">PIRIFORME = <b>forma de pera</b></div>
    <div id="f05-fn" class="abs card" style="opacity:0">
      <h3>A FUNÇÃO DELE</h3>
      <div id="f05-fn1" class="f05-row"><svg width="80" height="80" viewBox="-40 -40 80 80"><path d="M0 26 L0 -10" ${st} stroke-width="8"/><path d="M-16 -4 L0 -22 L16 -4" fill="none" ${st} stroke-width="8"/><path d="M-26 20 A30 30 0 0 1 22 -24" fill="none" stroke="${C.good}" stroke-width="7" stroke-linecap="round"/><path d="M14 -30 L24 -24 L16 -14" fill="none" stroke="${C.good}" stroke-width="7" stroke-linecap="round"/></svg><span>Gira a coxa pra fora</span></div>
      <div id="f05-fn2" class="f05-row"><svg width="80" height="80" viewBox="-40 -40 80 80"><path d="M-30 20 L30 20 M-20 20 L-12 -20 M20 20 L12 -20 M-14 -20 L14 -20" ${st} stroke-width="7"/></svg><span>Estabiliza o quadril</span></div>
    </div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-title", 0.1, 0.45);
        // personagem
        const m = "f05m";
        R.setPose(tl, m, 0, { armF: 0, armB: 0, legF: 0, legB: 0 });
        R.face(tl, m, 0, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f05-m-wrap", { x: 500 }, { x: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.2);
        R.blinks(tl, m, 1, K.dur);
        // "pequeno": ele encolhe envergonhado
        tl.to("#f05m-body", { scale: 0.85, svgOrigin: "0 -30", duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, K.musc + 0.4);
        // "fundo da nádega": pele vira raio-x
        tl.to("#f05-skin", { opacity: 0.18, duration: 0.5 }, K.fundo);
        R.fadeIn(tl, "#f05-xr", K.fundo, 0.5);
        // pera
        R.pop(tl, "#f05-pear", K.forma - 0.2, 0.5);
        R.pop(tl, "#f05-pear-lbl", K.forma, 0.4);
        R.face(tl, m, K.forma + 0.2, { eyes: "happy", mouth: "grin" });
        R.pose(tl, m, K.forma + 0.2, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        tl.to("#f05-pearin", { rotation: -8, svgOrigin: "0 -60", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.forma + 0.3);
        R.pose(tl, m, K.sai - 0.2, 0.3, { armF: 0, armB: 0 });
        // sai do sacro...
        R.pop(tl, "#f05-t-sac", K.sacro - 0.1, 0.35);
        R.pop(tl, "#f05-sacdot", K.sacro, 0.35);
        tl.to("#f05-clipRr", { attr: { width: 320 }, duration: 1.6, ease: "power1.inOut" }, K.sacro + 0.2);
        tl.to("#f05-clipLr", { attr: { x: 280, width: 320 }, duration: 1.6, ease: "power1.inOut" }, K.sacro + 0.2);
        // ... até o topo do fêmur
        tl.set("#f05-troc", { opacity: 1 }, K.topo);
        tl.fromTo("#f05-troc", { attr: { r: 6 } }, { attr: { r: 18 }, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.topo);
        R.pop(tl, "#f05-t-fem", K.femur - 0.1, 0.35);
        R.pop(tl, "#f05-t-pir", K.femur + 0.4, 0.4);
        // função
        tl.to("#f05-pear-lbl, #f05-pear", { opacity: 0, duration: 0.25 }, K.func - 0.3);
        R.pop(tl, "#f05-fn", K.func - 0.1, 0.45);
        R.rise(tl, "#f05-fn1", K.girar, 0.35, 20);
        // fêmur gira um pouco (rotação externa ilustrativa)
        tl.to("#f05-femR", { rotation: 8, svgOrigin: "840 520", duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 3 }, K.girar + 0.1);
        R.rise(tl, "#f05-fn2", K.estab, 0.35, 20);
        // personagem anda, estável
        for (let i = 0; i < 5; i++) R.pose(tl, m, K.estab + 0.2 + i * 0.3, 0.28, { legF: i % 2 ? 22 : -22, legB: i % 2 ? -22 : 22, armF: i % 2 ? -20 : 20, armB: i % 2 ? 20 : -20 }, "sine.inOut");
        R.pose(tl, m, K.estab + 1.75, 0.3, { legF: 0, legB: 0, armF: 0, armB: 0 });
        R.face(tl, m, K.anda, { eyes: "happy", mouth: "grin" });
        tl.to("#f05-title, #f05-fn", { opacity: 0, duration: 0.3 }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        { name: "glitch-1", t: k.fundo, vol: 0.2, dur: 0.4 },
        { name: "pop", t: k.forma - 0.15, vol: 0.45 },
        { name: "pop", t: k.sacro, vol: 0.35 },
        { name: "whoosh-short", t: k.sacro + 0.2, vol: 0.35 },
        { name: "pop", t: k.femur, vol: 0.35 },
        { name: "pop", t: k.func, vol: 0.4 },
      ],
    };
  },
};
