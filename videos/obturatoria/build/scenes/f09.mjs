// F9 — O que se sente: dor na virilha/parte de dentro da coxa (até perto do joelho), formigamento/dormência,
// fraqueza para fechar a perna, anda com a perna mais aberta, no atleta piora no treino
export default {
  build(ctx) {
    const { C, human, w, MINT } = ctx;
    const k = {
      sente: w(0, "sente"), vir: w(0, "virilha"), dentro: w(0, "dentro"), joelho: w(0, "joelho"), form: w(0, "Formigamento"), dorm: w(0, "dormência"),
      fraq: w(0, "Fraqueza"), fech: w(0, "fechar"), anda: w(0, "anda"), aberta: w(0, "aberta"), atleta: w(0, "atleta"), treino: w(0, "treino"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const items = [
      { t: "Dor na <b>virilha</b> e na parte de <b>DENTRO</b> da coxa", ic: `<path d="M-4 -34 L14 -6 L0 -4 L10 34 L-16 0 L0 -2 Z" fill="${C.pain}" ${st(4)}/>` },
      { t: "Pode descer até perto do <b>joelho</b>", ic: `<path d="M0 -30 L0 22" ${st(8)} stroke="${C.pain}"/><path d="M-14 10 L0 30 L14 10" fill="none" ${st(7)} stroke="${C.pain}"/>` },
      { t: "<b>Formigamento</b> ou <b>dormência</b>", ic: [[-18, -14], [6, 0], [-10, 18], [18, 22]].map(([x, y]) => `<g transform="translate(${x},${y})"><ellipse rx="8" ry="5" fill="${C.ink}"/><circle cx="9" r="4" fill="${C.ink}"/></g>`).join("") },
      { t: "<b>Fraqueza</b> pra fechar a perna", ic: `<circle r="22" fill="#fff" ${st(5)}/><path d="M0 -9 L9 -3 L5 8 L-5 8 L-9 -3 Z" fill="${C.ink}"/>` },
      { t: "Anda com a perna <b>mais aberta</b>", ic: `<path d="M-14 -30 L-14 30 M14 -30 Q14 0 30 28" ${st(9)}/><path d="M18 30 L32 30 L30 16" fill="none" ${st(5)} stroke="#2E9E78"/>` },
    ];
    const leg = (x, id) => `<g id="${id}"><rect x="${x - 22}" y="0" width="44" height="170" rx="20" fill="${C.brown}" ${st(6)}/><path d="M${x - 26} 166 L${x + 34} 166 Q${x + 42} 184 ${x + 26} 188 L${x - 26} 188 Z" fill="#4A2E1A" ${st(6)}/></g>`;
    return {
      k,
      css: `
        #f09-h { left:120px; top:60px; font-size:72px; }
        #root .f09-it { position:absolute; left:120px; width:700px; height:96px; display:flex; align-items:center; gap:22px; font-size:36px; line-height:1.1;
          background:#fff; border:6px solid ${C.ink}; border-radius:22px; padding:0 22px; box-shadow:7px 7px 0 ${C.ink}; }
        #root .f09-it b { color:#1E8F6A; }
        #f09-front { left:880px; top:170px; width:330px; padding:14px; text-align:center; }
        #f09-front .t { font-size:26px; margin-top:4px; }
        #f09-pan { left:880px; top:560px; width:400px; padding:16px 20px; font-size:32px; line-height:1.2; text-align:center; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1520" cy="540" r="330" fill="${C.wall}"/>
      <g transform="translate(1520,620) scale(1.45)">${human("f09z", "ze")}</g>
      <g id="f09-patch" opacity="0">
        <ellipse id="f09-pe" cx="1532" cy="690" rx="30" ry="58" fill="${MINT}" opacity="0.85" stroke="#fff" stroke-width="5"/>
        <circle id="f09-ring" cx="1532" cy="660" r="40" fill="none" stroke="${MINT}" stroke-width="6"/>
      </g>
      <g id="f09-down" opacity="0"><ellipse cx="1534" cy="760" rx="22" ry="40" fill="${MINT}" opacity="0.6" stroke="#fff" stroke-width="4"/></g>
      <g id="f09-lbl" opacity="0"><path d="M1500 650 L1350 560" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/><rect x="1220" y="508" width="260" height="54" rx="14" fill="#fff" ${st(5)}/><text x="1350" y="545" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">parte de DENTRO</text></g>
      <g id="f09-ballg" opacity="0"><g transform="translate(1560,700)"><g id="f09-ball"><circle r="26" fill="#fff" ${st(5)}/><path d="M0 -10 L10 -3 L6 9 L-6 9 L-10 -3 Z" fill="${C.ink}"/></g></g></g>
      ${Array.from({ length: 5 }, (_, i) => `<g id="f09-ant${i}" opacity="0"><ellipse rx="7" ry="5" fill="${C.ink}"/><circle cx="8" r="4" fill="${C.ink}"/></g>`).join("")}
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">O que se sente:</div>
    ${items.map((it, i) => `<div id="f09-i${i}" class="f09-it label" style="top:${170 + i * 124}px;opacity:0"><svg width="80" height="80" viewBox="-40 -40 80 80" style="flex:none">${it.ic}</svg><span>${it.t}</span></div>`).join("")}
    <div id="f09-front" class="abs card" style="opacity:0">
      <svg width="300" height="200" viewBox="0 0 300 200">${leg(110, "f09-legL")}${leg(190, "f09-legR")}<path id="f09-arc" d="M200 120 Q270 120 260 186" fill="none" stroke="#2E9E78" stroke-width="8" stroke-linecap="round" stroke-dasharray="12 10" opacity="0"/></svg>
      <div class="t label">visto de frente: a perna <b style="color:#1E8F6A">abre</b> ao andar</div>
    </div>
    <div id="f09-pan" class="abs card label" style="opacity:0">No atleta: <span style="color:${C.pain}">piora durante ou depois do treino</span></div>`,
      js: function (tl, K, R) {
        const z = "f09z";
        R.setPose(tl, z, 0, { shF: -8, elF: -15, shB: 6, elB: -10, hipF: 4, hipB: -4 });
        R.blinks(tl, z, 0.3, K.dur);
        R.slideIn(tl, "#f09-h", K.sente - 0.4, 0.45, -200);
        const t0 = [K.vir, K.joelho, K.form, K.fraq, K.anda];
        t0.forEach((t, i) => tl.fromTo(`#f09-i${i}`, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, t - 0.2));
        // virilha e parte de dentro da coxa
        tl.set("#f09-patch", { opacity: 1 }, K.vir);
        tl.fromTo("#f09-pe", { scale: 0 }, { scale: 1, svgOrigin: "1532 690", duration: 0.4, ease: "back.out(2.5)" }, K.vir);
        tl.fromTo("#f09-ring", { attr: { r: 30 }, opacity: 1 }, { attr: { r: 90 }, opacity: 0, duration: 0.9, repeat: 3, ease: "power1.out" }, K.vir + 0.3);
        R.face(tl, z, K.vir, { eyes: "pain", mouth: "frown" });
        R.fadeIn(tl, "#f09-lbl", K.dentro, 0.3);
        R.pose(tl, z, K.dentro, 0.3, { shF: -10, elF: -60 });
        // desce até perto do joelho
        tl.fromTo("#f09-down", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, K.joelho - 0.3);
        // formigamento / dormência
        R.fadeOut(tl, "#f09-lbl", K.form - 0.2);
        for (let i = 0; i < 5; i++) {
          tl.set(`#f09-ant${i}`, { opacity: 1 }, K.form + i * 0.12);
          tl.fromTo(`#f09-ant${i}`, { x: 1520 + (i % 2) * 18, y: 640 + i * 10 }, { x: 1530 + ((i + 1) % 2) * 14, y: 760 - i * 8, duration: 1.6, ease: "none" }, K.form + i * 0.12);
        }
        R.shake(tl, "#f09z-root", K.form, 0.4, 3);
        R.face(tl, z, K.dorm, { eyes: "wide", mouth: "flat" });
        tl.to("#f09-ant0, #f09-ant1, #f09-ant2, #f09-ant3, #f09-ant4", { opacity: 0, duration: 0.2 }, K.fraq - 0.2);
        // fraqueza: a bola escapa
        tl.set("#f09-ballg", { opacity: 1 }, K.fraq);
        tl.fromTo("#f09-ball", { x: 0, y: 0 }, { x: 70, y: 150, duration: 0.6, ease: "bounce.out" }, K.fech);
        R.face(tl, z, K.fech, { eyes: "wide", mouth: "frown" });
        // anda com a perna mais aberta (vista de frente)
        R.pop(tl, "#f09-front", K.anda - 0.3, 0.4);
        R.fadeOut(tl, "#f09-ballg", K.anda - 0.3);
        for (let i = 0; i < 3; i++) {
          tl.to("#f09-legR", { rotation: -14, svgOrigin: "190 0", duration: 0.35, ease: "sine.inOut" }, K.aberta - 0.3 + i * 0.75);
          tl.to("#f09-legR", { rotation: 0, svgOrigin: "190 0", duration: 0.35, ease: "sine.inOut" }, K.aberta + 0.05 + i * 0.75);
        }
        tl.to("#f09-arc", { opacity: 1, duration: 0.2 }, K.aberta - 0.2);
        // no atleta
        R.pop(tl, "#f09-pan", K.atleta - 0.1, 0.45);
        R.shake(tl, "#f09-pan", K.treino + 0.2, 0.3, 4);
        R.face(tl, z, K.treino, { eyes: "pain", mouth: "frown" });
      },
      sfx: [
        { name: "whoosh-short", t: k.sente - 0.4, vol: 0.35 },
        { name: "pop", t: k.vir - 0.1, vol: 0.4 },
        { name: "pop", t: k.form - 0.1, vol: 0.3 },
        { name: "pop", t: k.fech, vol: 0.4 },
        { name: "pop", t: k.anda - 0.3, vol: 0.35 },
        { name: "pop", t: k.atleta, vol: 0.4 },
      ],
    };
  },
};
