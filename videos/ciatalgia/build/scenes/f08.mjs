// F8 — Quem tem e o que sente: perfis (30–50 anos, sentado, peso, fumo) + sintomas acendendo no Seu Zé
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      comum: w(0, "comum"), idade: w(0, "30"), sent: w(0, "sentado"), peso: w(0, "peso"), fuma: w(0, "fuma"),
      sente: w(0, "sente"), joelho: w(0, "joelho"), formi: w(0, "formigamento"), choque: w(0, "choque"), fraq: w(0, "fraqueza"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const prof = (i, x, y, label, svg, color) => `<div id="f08-pf${i}" class="abs" style="left:${x}px;top:${y}px;width:260px;text-align:center;opacity:0">
        <svg width="180" height="180" viewBox="-90 -90 180 180"><circle r="80" fill="${color}" ${st(7)}/>${svg}</svg>
        <div class="label" style="font-size:32px;margin-top:4px">${label}</div></div>`;
    // Seu Zé em pé: quadril (1430,600) escala 1.4, perna da frente desce reta
    const sym = (i, x, y, label, color, lx, ly) => `<g id="f08-s${i}" opacity="0"><line x1="${x}" y1="${y}" x2="${lx + 260}" y2="${ly}" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/><circle cx="${x}" cy="${y}" r="13" fill="${color}" stroke="#fff" stroke-width="4"/></g>`;
    const syms = [
      [0, 1440, 790, "dor abaixo do joelho", C.pain, 900, 560],
      [1, 1452, 830, "formigamento", C.purple, 900, 650],
      [2, 1420, 740, "choque", C.sun, 900, 740],
      [3, 1430, 690, "fraqueza", C.grey, 900, 830],
    ];
    return {
      k,
      css: `
        #f08-h1 { left:110px; top:70px; font-size:60px; }
        #f08-age { left:110px; top:160px; padding:10px 26px; font-size:52px; }
        #f08-age b { color:${C.pain}; }
        #f08-h2 { left:760px; top:440px; width:500px; text-align:right; font-size:50px; }
        #root .f08-sl { position:absolute; width:500px; text-align:right; }
        #root .f08-sl span { display:inline-block; white-space:nowrap; padding:6px 16px; font-size:32px; border-radius:14px; border:6px solid ${C.ink}; background:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1440" cy="520" r="330" fill="${C.wall}"/>
      <g transform="translate(1430,620) scale(1.45)">${human("f08z", "ze")}</g>
      <g id="f08-redleg" opacity="0"><path d="M1435 780 L1446 868" stroke="${C.pain}" stroke-width="38" stroke-linecap="round" opacity="0.55"/></g>
      <g id="f08-ting" opacity="0">${[[1420, 800], [1468, 820], [1430, 850], [1470, 790], [1410, 840]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${C.purple}"/>`).join("")}</g>
      <g id="f08-bolt" opacity="0"><path d="M1390 690 L1420 720 L1404 730 L1440 770 L1424 776 L1460 830" fill="none" stroke="${C.sun}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${syms.map(([i, x, y, l, c, lx, ly]) => sym(i, x, y, l, c, lx, ly)).join("")}
    </svg>
    <div id="f08-h1" class="abs title" style="opacity:0">Mais comum...</div>
    <div id="f08-age" class="abs card label" style="opacity:0">entre <b>30</b> e <b>50</b> anos</div>
    ${prof(0, 100, 330, "muito tempo sentado", `<rect x="-36" y="-10" width="72" height="16" rx="6" fill="${C.brown}" ${st(6)}/><path d="M-30 6 L-30 50 M30 6 L30 50 M28 -10 L40 -60" ${st(8)}/><circle cx="0" cy="-36" r="22" fill="${C.sky}" ${st(6)}/>`, C.sky)}
    ${prof(1, 370, 330, "carrega peso", `<rect x="-44" y="-30" width="88" height="70" rx="8" fill="#C8955E" ${st(7)}/><path d="M-44 -6 L44 -6 M-12 -30 L-12 -6 M12 -30 L12 -6" ${st(5)}/><path d="M-60 -50 q-8 14 0 26 M60 -50 q8 14 0 26" fill="none" ${st(5)}/>`, C.sun)}
    ${prof(2, 240, 600, "fuma", `<rect x="-52" y="-10" width="90" height="22" rx="6" fill="#fff" ${st(6)}/><rect x="28" y="-10" width="22" height="22" rx="4" fill="${C.pain}" ${st(6)}/><path d="M-60 -24 Q-70 -50 -54 -66 Q-40 -80 -52 -96" fill="none" stroke="#9AA7AD" stroke-width="7" stroke-linecap="round"/>`, "#E6E6E6")}
    <div id="f08-h2" class="abs title" style="opacity:0">O que se sente:</div>
    ${syms.map(([i, , , l, , lx, ly]) => `<div id="f08-sl${i}" class="f08-sl label" style="left:${lx - 240}px;top:${ly - 30}px;opacity:0"><span>${l}</span></div>`).join("")}`,
      js: function (tl, K, R) {
        const z = "f08z";
        R.setPose(tl, z, 0, { shF: -8, elF: -15, shB: 6, elB: -10, hipF: 4, hipB: -4 });
        R.blinks(tl, z, 0.3, K.dur);
        R.idle(tl, z, 0, K.dur, 1.5);
        R.slideIn(tl, "#f08-h1", K.comum - 0.3, 0.5, -200);
        R.pop(tl, "#f08-age", K.idade - 0.1, 0.45);
        R.pop(tl, "#f08-pf0", K.sent - 0.1, 0.45);
        R.pop(tl, "#f08-pf1", K.peso - 0.1, 0.45);
        tl.to("#f08-pf1 svg", { y: -14, duration: 0.18, yoyo: true, repeat: 3, ease: "power2.out" }, K.peso + 0.3);
        R.pop(tl, "#f08-pf2", K.fuma - 0.1, 0.45);
        // perfis saem, sintomas entram
        tl.to("#f08-pf0, #f08-pf1, #f08-pf2, #f08-age", { opacity: 0.45, duration: 0.4 }, K.sente - 0.3);
        R.rise(tl, "#f08-h2", K.sente - 0.1, 0.4);
        // dor abaixo do joelho
        R.pop(tl, "#f08-s0", K.joelho - 0.2, 0.35);
        R.pop(tl, "#f08-sl0", K.joelho - 0.15, 0.35);
        tl.to("#f08-redleg", { opacity: 1, duration: 0.2, yoyo: true, repeat: 3 }, K.joelho);
        tl.set("#f08-redleg", { opacity: 1 }, K.joelho + 0.9);
        R.face(tl, z, K.joelho, { eyes: "pain", mouth: "frown" });
        // formigamento
        R.pop(tl, "#f08-s1", K.formi - 0.1, 0.35);
        R.pop(tl, "#f08-sl1", K.formi - 0.05, 0.35);
        tl.set("#f08-ting", { opacity: 1 }, K.formi);
        R.shake(tl, "#f08-ting", K.formi, 1.0, 5);
        // choque
        R.pop(tl, "#f08-s2", K.choque - 0.1, 0.35);
        R.pop(tl, "#f08-sl2", K.choque - 0.05, 0.35);
        tl.set("#f08-bolt", { opacity: 1 }, K.choque);
        R.draw(tl, "#f08-bolt path", K.choque, 0.25, "power1.in");
        R.shake(tl, "#f08z-root", K.choque, 0.5, 5);
        R.face(tl, z, K.choque, { eyes: "wide", mouth: "scream" });
        tl.to("#f08-bolt", { opacity: 0.3, duration: 0.3 }, K.choque + 0.6);
        // fraqueza: perna bambeia
        R.pop(tl, "#f08-s3", K.fraq - 0.1, 0.35);
        R.pop(tl, "#f08-sl3", K.fraq - 0.05, 0.35);
        R.face(tl, z, K.fraq, { eyes: "pain", mouth: "flat" });
        for (let i = 0; i < 4; i++) R.pose(tl, z, K.fraq + i * 0.2, 0.18, { knF: i % 2 ? 4 : 18, hipF: i % 2 ? 4 : -6, torso: i % 2 ? 0 : 4 }, "sine.inOut");
        R.pose(tl, z, K.fraq + 0.85, 0.3, { knF: 10, torso: 3 });
      },
      sfx: [
        { name: "whoosh-short", t: k.comum - 0.3, vol: 0.35 },
        { name: "pop", t: k.idade, vol: 0.35 },
        { name: "pop", t: k.sent, vol: 0.3 },
        { name: "pop", t: k.peso, vol: 0.3 },
        { name: "pop", t: k.fuma, vol: 0.3 },
        { name: "whoosh", t: k.sente - 0.6, vol: 0.35 },
        { name: "pop", t: k.joelho - 0.15, vol: 0.35 },
        { name: "glitch-1", t: k.choque, vol: 0.3 },
        { name: "pop", t: k.fraq - 0.05, vol: 0.35 },
      ],
    };
  },
};
