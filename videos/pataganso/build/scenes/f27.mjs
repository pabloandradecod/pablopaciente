// F27 — Resumo: o casal dorme, cada um com um travesseiro entre os joelhos; a Dona Gansa cochila na beira da cama; Dona Cida: "Agora é casal do travesseiro, Zé!"
export default {
  speakers: { cida: "f27c" },
  talkRest: { cida: "smile" },
  extra: 0.8,
  build(ctx) {
    const { C, human, gansa, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), ten: w(0, "tendões"), comp: w(0, "compressão"), carga: w(0, "carga"), fort: w(0, "fortalece"), todo: w(0, "todo"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.ten, vol: 0.4 },
      { name: "pop", t: k.comp, vol: 0.4 },
      { name: "pop", t: k.fort, vol: 0.4 },
      { name: "sparkle", t: k.c1, vol: 0.35 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const card = (i, x, svg, html) => `<div id="f27-k${i}" class="abs card f27-k" style="left:${x}px;top:150px;opacity:0"><svg width="90" height="90" viewBox="-45 -45 90 90">${svg}</svg><div class="label">${html}</div></div>`;
    const zzz = (id, x, y) => [0, 1, 2].map((i) => `<text class="${id}" x="${x + i * 30}" y="${y - i * 34}" font-family="Montserrat" font-weight="900" font-size="${34 + i * 10}" fill="#FFF3B8" opacity="0">z</text>`).join("");
    const pil = (id, x, y) => `<g id="${id}" opacity="0"><ellipse cx="${x}" cy="${y}" rx="46" ry="26" fill="#FFD3E0" ${st}/><path d="M${x - 30} ${y - 5} Q${x} ${y + 5} ${x + 30} ${y - 5}" stroke="#fff" stroke-width="5" fill="none"/></g>`;
    return {
      k,
      sfx,
      css: `
        #f27-head { left:110px; top:50px; font-size:64px; color:${C.pain}; }
        #root .f27-k { width:500px; padding:14px 18px; display:flex; align-items:center; gap:14px; font-size:29px; line-height:1.15; }
        #f27-bal { left:120px; top:400px; padding:14px 24px; font-size:40px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="#2E3E66"/>
      ${[[600, 360], [760, 330], [1100, 380], [1700, 350], [300, 400]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FFF3B8"/>`).join("")}
      <rect y="880" width="1920" height="200" fill="#3D4F7A"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="540" width="40" height="340" rx="10" fill="#8B5A2B" ${st}/>
      <rect x="1320" y="620" width="40" height="260" rx="10" fill="#8B5A2B" ${st}/>
      <rect x="420" y="640" width="900" height="80" rx="20" fill="#fff" ${st}/>
      <rect x="420" y="712" width="900" height="44" rx="12" fill="#8B5A2B" ${st}/>
      <rect x="380" y="400" width="40" height="160" rx="10" fill="#8B5A2B" ${st}/><rect x="450" y="496" width="170" height="70" rx="30" fill="#A9D8E2" ${st}/><rect x="440" y="560" width="170" height="74" rx="30" fill="#BFE6EE" ${st}/>
      <!-- Seu Zé atrás, Dona Cida na frente -->
      <g transform="translate(880,540) scale(0.95)">${human("f27z", "ze")}</g>
      ${pil("f27-pz", 988, 518)}
      <g transform="translate(860,615) scale(1.1)">${human("f27c", "cida")}</g>
      ${pil("f27-pc", 985, 590)}
      <!-- Dona Gansa cochilando na beira da cama -->
      <g id="f27-gw"><g transform="translate(1215,642) scale(0.55)">${gansa("f27g")}</g></g>
      ${zzz("f27-zc", 700, 470)}
      ${zzz("f27-zg", 1250, 430)}
    </svg>
    <div id="f27-head" class="abs title">RESUMINDO</div>
    ${card(0, 110, `<path d="M-30 -36 L-30 30 M-10 -36 L-10 30 M10 -36 L10 30" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><ellipse cx="24" cy="18" rx="14" ry="11" fill="#BFE8F7" stroke="${C.ink}" stroke-width="5"/>`, `<b style="color:#E0675A">3 tendões + 1 bursa</b> por dentro do joelho`)}
    ${card(1, 710, `<ellipse cx="0" cy="0" rx="36" ry="22" fill="#FFD3E0" stroke="${C.ink}" stroke-width="5"/><path d="M-30 -30 L30 30" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>`, `<b>Menos</b> compressão, carga ajustada`)}
    ${card(2, 1310, `<path d="M-36 0 L36 0" stroke="${C.ink}" stroke-width="8"/><rect x="-42" y="-20" width="14" height="40" rx="4" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><rect x="28" y="-20" width="14" height="40" rx="4" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>`, `<b>Mais</b> força + joelho como um todo`)}
    <div id="f27-bal" class="abs card title" style="opacity:0">Agora é casal do <span style="color:#E0675A">travesseiro</span>, Zé!</div>`,
      js: function (tl, K, R) {
        const c = "f27c", z = "f27z", g = "f27g";
        const lie = { root: -90, hipF: -20, hipB: -10, knF: 30, knB: 20, shF: 20, elF: -60, shB: 10, elB: -40 };
        R.setPose(tl, c, 0, lie);
        R.setPose(tl, z, 0, lie);
        R.face(tl, c, 0, { eyes: "closed", mouth: "smile" });
        R.face(tl, z, 0, { eyes: "closed", mouth: "smile" });
        R.setPose(tl, g, 0, { neck: 35, armF: 10, armB: -10 });
        R.face(tl, g, 0, { eyes: "closed", mouth: "smile" });
        R.slideIn(tl, "#f27-head", 0.05, 0.5, -300);
        R.pop(tl, "#f27-pc", 0.5, 0.4);
        R.pop(tl, "#f27-pz", 0.8, 0.4);
        // ronquinhos (finitos)
        const rep = Math.max(1, Math.floor((K.dur - 1) / 1.8) * 2 - 1);
        tl.fromTo(".f27-zc", { opacity: 0, y: 10 }, { opacity: 1, y: -14, duration: 0.9, yoyo: true, repeat: rep, stagger: 0.3, ease: "sine.inOut" }, 0.6);
        tl.fromTo(".f27-zg", { opacity: 0, y: 10 }, { opacity: 1, y: -14, duration: 0.9, yoyo: true, repeat: rep, stagger: 0.3, ease: "sine.inOut" }, 1.0);
        // Dona Gansa cabeceando
        tl.to("#f27-gw", { rotation: 4, svgOrigin: "1215 642", duration: 1.2, yoyo: true, repeat: Math.max(1, Math.floor(K.dur / 1.2) - 1), ease: "sine.inOut" }, 0.4);
        R.pop(tl, "#f27-k0", K.ten - 0.1, 0.4);
        R.pop(tl, "#f27-k1", K.comp - 0.1, 0.4);
        R.pop(tl, "#f27-k2", K.fort - 0.1, 0.4);
        // Dona Cida fala sem acordar direito
        R.face(tl, c, K.c0 - 0.1, { eyes: "happy", mouth: "smile" });
        R.pop(tl, "#f27-bal", K.c0, 0.4);
        R.face(tl, c, K.c1 + 0.2, { eyes: "closed", mouth: "smile" });
        R.face(tl, z, K.c1 + 0.1, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
