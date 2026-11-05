// F28 — Resumo: Dona Cida dorme tranquila com travesseiro entre os joelhos; agora quem não dorme é o Seu Zé
export default {
  speakers: { cida: "f28c" },
  talkRest: { cida: "smile" },
  extra: 0.8,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), ten: w(0, "tendões"), menos: w(0, "Menos"), mais: w(0, "mais"), dorm: w(0, "dormir"), paz: w(0, "paz"),
      c0: lines[1].start, c1: lines[1].end, ron: w(1, "roncar"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.ten, vol: 0.4 },
      { name: "pop", t: k.menos, vol: 0.4 },
      { name: "pop", t: k.mais, vol: 0.4 },
      { name: "sparkle", t: k.paz, vol: 0.35 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const card = (i, x, svg, html) => `<div id="f28-k${i}" class="abs card f28-k" style="left:${x}px;top:150px;opacity:0"><svg width="90" height="90" viewBox="-45 -45 90 90">${svg}</svg><div class="label">${html}</div></div>`;
    const zzz = `${[0, 1, 2].map((i) => `<text id="f28-z${i}" x="${700 + i * 30}" y="${470 - i * 34}" font-family="Montserrat" font-weight="900" font-size="${34 + i * 10}" fill="#FFF3B8" opacity="0">z</text>`).join("")}`;
    return {
      k,
      sfx,
      css: `
        #f28-head { left:110px; top:50px; font-size:64px; color:${C.pain}; }
        #root .f28-k { width:500px; padding:14px 18px; display:flex; align-items:center; gap:14px; font-size:30px; line-height:1.15; }
        #f28-ze { left:1330px; top:400px; padding:12px 20px; font-size:34px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="#2E3E66"/>
      ${[[600, 360], [760, 330], [1100, 380], [1700, 350], [300, 400]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FFF3B8"/>`).join("")}
      <rect y="880" width="1920" height="200" fill="#3D4F7A"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="560" width="40" height="320" rx="10" fill="#8B5A2B" ${st}/>
      <rect x="420" y="640" width="900" height="80" rx="20" fill="#fff" ${st}/>
      <rect x="420" y="712" width="900" height="44" rx="12" fill="#8B5A2B" ${st}/>
      <rect x="440" y="560" width="150" height="70" rx="30" fill="#BFE6EE" ${st}/>
      <rect x="1150" y="560" width="150" height="70" rx="30" fill="#BFE6EE" ${st}/>
      <!-- Seu Zé acordado -->
      <g id="f28-zeh"><circle cx="1230" cy="560" r="46" fill="${C.skinB}" ${st}/>
        <ellipse cx="1214" cy="552" rx="9" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="1210" cy="554" r="4" fill="${C.ink}"/>
        <ellipse cx="1244" cy="552" rx="9" ry="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="1240" cy="554" r="4" fill="${C.ink}"/>
        <path d="M1212 582 L1248 580" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/><path d="M1206 586 Q1230 598 1252 586" stroke="#C9C9C9" stroke-width="9" stroke-linecap="round" fill="none"/></g>
      <g transform="translate(860,610) scale(1.1)">${human("f28c", "cida")}</g>
      <!-- travesseiro entre os joelhos -->
      <g id="f28-pil" opacity="0"><ellipse cx="985" cy="585" rx="46" ry="26" fill="#FFD3E0" ${st}/><path d="M955 580 Q985 590 1015 580" stroke="#fff" stroke-width="5" fill="none"/></g>
      ${zzz}
    </svg>
    <div id="f28-head" class="abs title">RESUMINDO</div>
    ${card(0, 110, `<ellipse cx="0" cy="0" rx="34" ry="22" fill="#BFE8F7" stroke="${C.ink}" stroke-width="5"/><path d="M-36 -30 L36 30" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/>`, `Quase sempre é o <b style="color:#E0675A">tendão</b>, não a bursa`)}
    ${card(1, 710, `<path d="M-34 0 L18 0 M4 -16 L22 0 L4 16" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>`, `<b>Menos</b> compressão`)}
    ${card(2, 1310, `<path d="M-36 0 L36 0" stroke="${C.ink}" stroke-width="8"/><rect x="-42" y="-20" width="14" height="40" rx="4" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><rect x="28" y="-20" width="14" height="40" rx="4" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>`, `<b>Mais</b> força`)}
    <div id="f28-ze" class="abs card label" style="opacity:0">...e agora quem não dorme sou eu!</div>`,
      js: function (tl, K, R) {
        const c = "f28c";
        R.setPose(tl, c, 0, { root: -90, hipF: -20, hipB: -10, knF: 30, knB: 20, shF: 20, elF: -60, shB: 10, elB: -40 });
        R.face(tl, c, 0, { eyes: "closed", mouth: "smile" });
        R.slideIn(tl, "#f28-head", 0.05, 0.5, -300);
        R.pop(tl, "#f28-pil", 0.5, 0.4);
        // ronquinho da Dona Cida (finito)
        for (let i = 0; i < 3; i++) tl.fromTo(`#f28-z${i}`, { opacity: 0, y: 10 }, { opacity: 1, y: -14, duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor((K.dur - 1) / 1.8) * 2 - 1), ease: "sine.inOut" }, 0.6 + i * 0.3);
        R.pop(tl, "#f28-k0", K.ten - 0.1, 0.4);
        R.pop(tl, "#f28-k1", K.menos - 0.1, 0.4);
        R.pop(tl, "#f28-k2", K.mais - 0.1, 0.4);
        // Seu Zé acordado, olhando de lado
        R.shake(tl, "#f28-zeh", K.dorm, 0.4, 3);
        R.pop(tl, "#f28-ze", K.paz, 0.4);
        R.fadeOut(tl, "#f28-ze", K.c0 - 0.1);
        R.face(tl, c, K.c1 + 0.1, { eyes: "closed", mouth: "smile" });
      },
    };
  },
};
