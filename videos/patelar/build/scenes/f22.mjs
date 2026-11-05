// F22 — Ajudantes: quadril e panturrilha, faixa abaixo da rótula, ondas de choque, sono e recuperação; selo "nenhum substitui a escada da carga"
export default {
  extra: 0.8,
  build(ctx) {
    const { C, molao, w } = ctx;
    const k = {
      aj: w(0, "ajudam"), quad: w(0, "quadril"), pant: w(0, "panturrilha"), faixa: w(0, "faixa"), ondas: w(0, "ondas"),
      sono: w(0, "sono"), nenh: w(0, "nenhum"), esc: w(0, "escada"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      // quadril + panturrilha: haltere
      `<path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-52" y="-24" width="16" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="36" y="-24" width="16" height="48" rx="5" fill="${C.pain}" ${st}/>`,
      // faixa abaixo da rótula
      `<circle cx="0" cy="-22" r="18" fill="${C.bone}" ${st}/><rect x="-26" y="2" width="52" height="16" rx="6" fill="#FF8A3D" ${st}/><path d="M-20 18 L-20 40 M20 18 L20 40" ${st}/>`,
      // ondas de choque
      `<path d="M-40 0 Q-30 -20 -20 0 Q-10 20 0 0 Q10 -20 20 0 Q30 20 40 0" fill="none" ${st} stroke="#8E6CD8" stroke-width="8"/><circle cx="-46" cy="0" r="8" fill="#8E6CD8"/>`,
      // sono
      `<path d="M10 -30 A30 30 0 1 0 22 18 A24 24 0 1 1 10 -30 Z" fill="${C.sun}" ${st}/><text x="22" y="-14" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.ink}">z</text>`,
    ];
    const labs = [["Força de quadril", "e panturrilha"], ["Faixa abaixo", "da rótula"], ["Ondas de choque", "(alguns casos)"], ["Sono e", "recuperação"]];
    const pos = [[110, 220], [570, 220], [110, 470], [570, 470]];
    const card = (i) => `<div id="f22-c${i}" class="abs card f22-card" style="left:${pos[i][0]}px;top:${pos[i][1]}px;opacity:0">
        <svg width="120" height="120" viewBox="-60 -60 120 120"><circle r="54" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>${icons[i]}</svg>
        <div class="label f22-t">${labs[i][0]}<br><span>${labs[i][1]}</span></div></div>`;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.quad, vol: 0.35 },
      { name: "pop", t: k.faixa, vol: 0.35 },
      { name: "pop", t: k.ondas, vol: 0.35 },
      { name: "pop", t: k.sono, vol: 0.35 },
      { name: "impact-bass-1", t: k.nenh + 0.1, vol: 0.4 },
    ];
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:70px; font-size:72px; }
        #f22-head span { color:${C.good}; }
        #root .f22-card { width:420px; height:200px; padding:18px; display:flex; align-items:center; gap:16px; }
        #root .f22-t { font-size:32px; line-height:1.15; }
        #root .f22-t span { font-size:26px; color:${C.grey}; }
        #f22-seal { left:180px; top:720px; width:760px; padding:16px 26px; font-size:38px; text-align:center; background:${C.pain}; color:#fff; border-color:${C.ink}; transform: rotate(-2deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1450" cy="560" r="300" fill="${C.wall}"/>
      <!-- escada da carga ao fundo -->
      <g id="f22-stairs" opacity="0">${[0, 1, 2, 3].map((i) => `<rect x="${1160 + i * 140}" y="${820 - (i + 1) * 90}" width="140" height="${(i + 1) * 90}" fill="${[C.sky, C.sun, "#FFB98A", C.good][i]}" stroke="${C.ink}" stroke-width="6"/>`).join("")}</g>
      <g id="f22-mw"><g transform="translate(1450,880) scale(1.0)">${molao("f22m")}</g></g>
      <!-- faixa no Molão -->
      <g id="f22-strap" opacity="0"><rect x="1385" y="700" width="130" height="30" rx="10" fill="#FF8A3D" stroke="${C.ink}" stroke-width="6"/></g>
      <g id="f22-zz" opacity="0">${[0, 1, 2].map((i) => `<text x="${1530 + i * 26}" y="${520 - i * 30}" font-family="Montserrat" font-weight="900" font-size="${30 + i * 8}" fill="${C.ink}">z</text>`).join("")}</g>
      <g id="f22-wave" opacity="0"><path d="M1290 640 Q1310 610 1330 640 Q1350 670 1370 640" fill="none" stroke="#8E6CD8" stroke-width="8" stroke-linecap="round"/><path d="M1530 640 Q1550 610 1570 640 Q1590 670 1610 640" fill="none" stroke="#8E6CD8" stroke-width="8" stroke-linecap="round"/></g>
    </svg>
    <div id="f22-head" class="abs title">Os <span>AJUDANTES</span></div>
    ${[0, 1, 2, 3].map(card).join("")}
    <div id="f22-seal" class="abs card title" style="opacity:0">NENHUM SUBSTITUI A ESCADA DA CARGA!</div>`,
      js: function (tl, K, R) {
        const m = "f22m";
        R.setPose(tl, m, 0, { armF: 20, armB: -20 });
        R.face(tl, m, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, m, 0, K.sono);
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        tl.fromTo("#f22-mw", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // quadril e panturrilha: o Molão "malha" (pula de leve)
        R.pop(tl, "#f22-c0", K.quad - 0.1, 0.4);
        R.pose(tl, m, K.quad, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        for (let i = 0; i < 2; i++) {
          tl.to("#f22m-coil", { scaleY: 0.8, transformOrigin: "50% 100%", duration: 0.15, ease: "power2.in" }, K.pant + i * 0.4);
          tl.to("#f22m-top", { y: 42, duration: 0.15, ease: "power2.in" }, K.pant + i * 0.4);
          tl.to("#f22m-coil", { scaleY: 1, transformOrigin: "50% 100%", duration: 0.2, ease: "back.out(3)" }, K.pant + i * 0.4 + 0.15);
          tl.to("#f22m-top", { y: 0, duration: 0.2, ease: "back.out(3)" }, K.pant + i * 0.4 + 0.15);
        }
        // faixa abaixo da rótula
        R.pop(tl, "#f22-c1", K.faixa - 0.1, 0.4);
        R.pop(tl, "#f22-strap", K.faixa + 0.2, 0.35);
        R.face(tl, m, K.faixa + 0.3, { eyes: "happy", mouth: "smile" });
        // ondas de choque
        R.pop(tl, "#f22-c2", K.ondas - 0.1, 0.4);
        tl.fromTo("#f22-wave", { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 5 }, K.ondas + 0.1);
        R.face(tl, m, K.ondas + 0.1, { eyes: "wide", mouth: "grin" });
        // sono e recuperação
        R.pop(tl, "#f22-c3", K.sono - 0.1, 0.4);
        R.face(tl, m, K.sono + 0.2, { eyes: "closed", mouth: "smile" });
        R.pose(tl, m, K.sono + 0.2, 0.4, { armF: 40, armB: -40 });
        tl.set("#f22-zz", { opacity: 1 }, K.sono + 0.3);
        tl.fromTo("#f22-zz text", { opacity: 0, y: 10 }, { opacity: 1, y: -10, duration: 0.6, stagger: 0.2, ease: "sine.out" }, K.sono + 0.3);
        // nenhum substitui a escada
        tl.to("#f22-zz", { opacity: 0, duration: 0.2 }, K.nenh - 0.2);
        R.face(tl, m, K.nenh, { eyes: "wide", mouth: "open" });
        tl.to(".f22-card", { opacity: 0.45, scale: 0.94, duration: 0.3 }, K.nenh);
        tl.fromTo("#f22-seal", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, K.nenh + 0.1);
        R.fadeIn(tl, "#f22-stairs", K.esc - 0.2, 0.4);
        tl.fromTo("#f22-stairs rect", { y: 300 }, { y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.6)" }, K.esc - 0.2);
        R.face(tl, m, K.esc + 0.3, { eyes: "happy", mouth: "grin" });
        R.pose(tl, m, K.esc + 0.3, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
      },
    };
  },
};
