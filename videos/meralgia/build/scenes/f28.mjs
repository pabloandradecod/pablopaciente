// F28 — Resumo em 4 ideias + Seu Zé de suspensório faz joinha; o Nervinho dá tchau
export default {
  extra: 1.6,
  build(ctx) {
    const { C, human, nervinho, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), mer: w(0, "meralgia"), nerv: w(0, "nervinho"), vir: w(0, "virilha"),
      tira: w(0, "Tira"), peso: w(0, "peso"), mexe: w(0, "mexe"), coxa: w(0, "coxa"), normal: w(0, "normal"), end: lines[0].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.nerv, vol: 0.4 }, { name: "pop", t: k.tira, vol: 0.4 }, { name: "pop", t: k.peso, vol: 0.4 }, { name: "pop", t: k.mexe, vol: 0.4 },
      { name: "sparkle", t: k.normal, vol: 0.45 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const row = (i, label, svg, color) => `<div id="f28-r${i}" class="abs card f28-row" style="top:${120 + i * 175}px;opacity:0">
      <svg width="120" height="120" viewBox="-60 -60 120 120" style="flex:none"><circle r="54" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
      <div class="label" style="font-size:33px;line-height:1.15">${label}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f28-h { left:110px; top:60px; font-size:60px; color:${C.pain}; }
        #root .f28-row { left:1150px; width:670px; padding:12px 22px; display:flex; align-items:center; gap:22px; }
        #f28-ok { left:150px; top:250px; padding:14px 24px; font-size:40px; background:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="600" cy="560" r="300" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(600,650) scale(1.3)">
        ${human("f28z", "ze")}
        <g id="f28-susp">
          <path d="M-14 -148 L-10 4" stroke="${C.ink}" stroke-width="16" stroke-linecap="round"/><path d="M-14 -148 L-10 4" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/>
          <path d="M28 -150 L34 4" stroke="${C.ink}" stroke-width="16" stroke-linecap="round"/><path d="M28 -150 L34 4" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/>
          <circle cx="-10" cy="0" r="7" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/><circle cx="34" cy="0" r="7" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
        </g>
      </g>
      <g transform="translate(860,330)"><g id="f28-badge" opacity="0">
        <circle r="70" fill="${C.good}" stroke="${C.ink}" stroke-width="8"/>
        <path d="M-34 -2 L-14 -2 L-14 44 L-34 44 Z" fill="#fff" ${st}/>
        <path d="M-14 0 L4 -38 Q10 -54 22 -44 Q28 -36 22 -14 L42 -14 Q54 -12 50 2 L44 34 Q40 44 28 44 L-14 44 Z" fill="#fff" ${st}/>
      </g></g>
      <g id="f28-nvw" opacity="0">${nervinho("f28n", [[300, 800], [380, 800], [460, 796], [540, 800]], 16, 1.5)}</g>
    </svg>
    <div id="f28-h" class="abs title">RESUMINDO</div>
    ${row(0, "Meralgia: um <b>nervinho de sensibilidade</b> apertado na virilha", `<path d="M-34 6 Q-12 -14 10 6 Q24 18 36 4" fill="none" stroke="${C.ink}" stroke-width="16" stroke-linecap="round"/><path d="M-34 6 Q-12 -14 10 6 Q24 18 36 4" fill="none" stroke="#B79CF2" stroke-width="9" stroke-linecap="round"/>`, "#EFE7FF")}
    ${row(1, "Tira a pressão: cinto e roupa folgados", `<rect x="-36" y="-10" width="72" height="20" rx="7" fill="#6B3E1F" ${st}/><rect x="-14" y="-18" width="28" height="36" rx="6" fill="${C.sun}" ${st}/><path d="M-36 30 L36 -30" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/>`, "#FFE3DE")}
    ${row(2, "Cuida do peso", `<rect x="-34" y="-20" width="68" height="46" rx="10" fill="#fff" ${st}/><path d="M-16 -4 A16 16 0 0 1 16 -4" fill="none" ${st}/><path d="M0 -4 L8 -14" ${st}/>`, C.sky)}
    ${row(3, "Mexe com calma: caminhada e exercícios suaves", `<path d="M-34 14 L-30 -12 Q-24 -20 -14 -14 L4 -2 L30 0 Q38 2 36 14 Z" fill="#fff" ${st}/><path d="M-34 14 L36 14" ${st}/>`, C.good)}
    <div id="f28-ok" class="abs card title" style="opacity:0">COXA NORMAL!</div>`,
      js: function (tl, K, R) {
        const z = "f28z", n = "f28n";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.face(tl, n, 0, { eyes: "happy", mouth: "smile" });
        R.slideIn(tl, "#f28-h", 0.05, 0.5, -300);
        R.slideIn(tl, "#f28-r0", K.nerv - 0.1, 0.45, 300);
        R.fadeIn(tl, "#f28-nvw", K.nerv, 0.3);
        R.slideIn(tl, "#f28-r1", K.tira - 0.1, 0.45, 300);
        R.slideIn(tl, "#f28-r2", K.peso - 0.1, 0.45, 300);
        R.slideIn(tl, "#f28-r3", K.mexe - 0.1, 0.45, 300);
        // suspensório: ele puxa as alças
        R.pose(tl, z, K.tira, 0.3, { shF: -40, elF: -100 }, "back.out(2)");
        tl.fromTo("#f28-susp", { y: 0 }, { y: -6, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.tira + 0.3);
        R.pose(tl, z, K.peso, 0.4, { shF: -10, elF: -20 });
        // coxa normal: joinha
        R.pose(tl, z, K.coxa - 0.2, 0.35, { shF: -50, elF: -120 }, "back.out(2)");
        R.face(tl, z, K.coxa, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f28-badge", K.coxa, 0.45);
        R.pop(tl, "#f28-ok", K.normal - 0.1, 0.45);
        // Nervinho dá tchau
        tl.fromTo("#f28n-face", { rotation: -12 }, { rotation: 12, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.normal);
        R.face(tl, n, K.normal, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
