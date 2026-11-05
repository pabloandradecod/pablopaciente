// F8 — Quem tem: esportes de salto, 15–30 anos (mais em homens) e fatores de risco; Juninho no centro
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      com: w(0, "comum"), salto: w(0, "salto"), dir: w(0, "direção"), vol: w(0, "vôlei"), bas: w(0, "basquete"), fut: w(0, "futebol"), atl: w(0, "atletismo"),
      quin: w(0, "quinze"), trin: w(0, "trinta"), hom: w(0, "homens"), pesa: w(0, "pesa"), aum: w(0, "aumento"), forca: w(0, "força"),
      quad: w(0, "quadril"), saltos: w(0, "saltos"), dura: w(0, "dura"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const sport = (i, label, svg) => `<div id="f08-s${i}" class="abs card" style="left:${100 + (i % 2) * 230}px;top:${200 + Math.floor(i / 2) * 260}px;width:200px;padding:14px 8px;text-align:center;opacity:0">
      <svg width="120" height="120" viewBox="-60 -60 120 120">${svg}</svg><div class="label" style="font-size:26px">${label}</div></div>`;
    const chip = (i, txt) => `<div id="f08-r${i}" class="abs card label" style="left:1300px;top:${430 + i * 120}px;width:520px;padding:14px 20px;font-size:30px;opacity:0">${txt}</div>`;
    return {
      k,
      css: `
        #f08-h { left:0; right:0; top:60px; text-align:center; font-size:64px; }
        #f08-h span { color:#FF8A3D; }
        #f08-age { left:1300px; top:180px; width:520px; padding:16px 22px; }
        #f08-age .n { font-size:64px; color:${C.ink}; }
        #f08-age .n b { color:#FF8A3D; }
        #f08-age .s { font-size:30px; color:${C.ink}; }
        #f08-pesa { left:1300px; top:360px; font-size:40px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="840" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="#E9B872"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f08-j-wrap"><g transform="translate(840,640) scale(1.3)">${human("f08j", "juninho")}</g></g>
      <g id="f08-hard" opacity="0"><rect x="560" y="880" width="560" height="22" fill="#B98B4E"/><text x="840" y="870" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">quadra dura</text></g>
    </svg>
    <div id="f08-h" class="abs title" style="opacity:0">Quem tem? Esportes de <span>SALTO</span></div>
    ${sport(0, "Vôlei", `<circle r="44" fill="#fff" ${st}/><path d="M-40 -18 Q0 0 40 -18 M-36 22 Q0 6 36 22 M0 -44 Q-16 0 0 44" stroke="#3E7FD8" stroke-width="5" fill="none"/>`)}
    ${sport(1, "Basquete", `<circle r="44" fill="#FF8A3D" ${st}/><path d="M-44 0 L44 0 M0 -44 L0 44 M-30 -32 Q-10 0 -30 32 M30 -32 Q10 0 30 32" stroke="${C.ink}" stroke-width="4" fill="none"/>`)}
    ${sport(2, "Futebol", `<circle r="44" fill="#fff" ${st}/><path d="M0 -16 L15 -5 L9 13 L-9 13 L-15 -5 Z" fill="${C.ink}"/>`)}
    ${sport(3, "Atletismo", `<path d="M-46 30 L46 30 M-30 30 L-30 -10 M30 30 L30 -10 M-38 -10 L38 -10" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/><path d="M-20 -30 L20 -30" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/>`)}
    <div id="f08-age" class="abs card" style="opacity:0"><div class="n title"><b>15</b> a <b>30</b> anos</div><div class="s label" id="f08-men" style="opacity:0">mais comum em homens</div></div>
    <div id="f08-pesa" class="abs title" style="opacity:0">E pesa:</div>
    ${chip(0, "aumento rápido de treino")}
    ${chip(1, "pouca força na coxa e no quadril")}
    ${chip(2, "muitos saltos em quadra dura")}`,
      js: function (tl, K, R) {
        const j = "f08j";
        R.setPose(tl, j, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0.4, K.dur);
        R.rise(tl, "#f08-h", K.com - 0.3, 0.5);
        // salto e mudança de direção
        tl.to("#f08-j-wrap", { y: -150, duration: 0.3, ease: "power2.out" }, K.salto);
        R.pose(tl, j, K.salto, 0.25, { shF: -170, elF: -10, hipF: -20, knF: 40, hipB: 10, knB: 50 });
        tl.to("#f08-j-wrap", { y: 0, duration: 0.3, ease: "power2.in" }, K.salto + 0.3);
        R.pose(tl, j, K.salto + 0.55, 0.25, { shF: -10, elF: -20, hipF: 0, knF: 0, hipB: 0, knB: 0 });
        tl.to("#f08-j-wrap", { x: -80, duration: 0.2, ease: "power2.out" }, K.dir);
        tl.to("#f08-j-wrap", { x: 60, duration: 0.25, ease: "power2.inOut" }, K.dir + 0.2);
        tl.to("#f08-j-wrap", { x: 0, duration: 0.2, ease: "power2.inOut" }, K.dir + 0.45);
        [K.vol, K.bas, K.fut, K.atl].forEach((t, i) => R.pop(tl, `#f08-s${i}`, t - 0.1, 0.4));
        // idade e sexo
        R.pop(tl, "#f08-age", K.quin - 0.1, 0.4);
        R.face(tl, j, K.quin, { eyes: "happy", mouth: "grin" });
        R.pose(tl, j, K.quin, 0.3, { shF: -150, elF: -30 }, "back.out(2)");
        R.fadeIn(tl, "#f08-men", K.hom - 0.1, 0.3);
        R.pose(tl, j, K.hom + 0.5, 0.3, { shF: -10, elF: -20 });
        // fatores de risco
        R.pop(tl, "#f08-pesa", K.pesa - 0.1, 0.35);
        R.pop(tl, "#f08-r0", K.aum - 0.1, 0.35);
        R.pop(tl, "#f08-r1", K.forca - 0.1, 0.35);
        R.pop(tl, "#f08-r2", K.saltos - 0.1, 0.35);
        R.fadeIn(tl, "#f08-hard", K.dura - 0.2, 0.3);
        R.face(tl, j, K.dura, { eyes: "pain", mouth: "frown" });
        tl.to("#f08-j-wrap", { y: -90, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, K.dura);
      },
      sfx: [
        { name: "whoosh-short", t: k.salto, vol: 0.35 },
        ...[k.vol, k.bas, k.fut, k.atl].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "pop", t: k.quin - 0.1, vol: 0.35 },
        { name: "pop", t: k.aum - 0.1, vol: 0.3 }, { name: "pop", t: k.forca - 0.1, vol: 0.3 }, { name: "pop", t: k.saltos - 0.1, vol: 0.3 },
      ],
    };
  },
};
