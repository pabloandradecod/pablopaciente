// F10 — Os Guardas travam tudo (espasmo de proteção); a coluna é forte como uma ponte de aço; dor não é estrago
export default {
  speakers: { guardas: "f10g-g0" },
  build(ctx) {
    const { C, guardas, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      mus: w(0, "músculos"), guar: w(0, "Guardas"), trav: w(0, "travam"), prot: w(0, "proteger"), travm: w(0, "travamento"),
      verd: w(0, "verdade"), forte: w(0, "forte"), mexer: w(0, "mexer"), peso: w(0, "peso"), dor: w(0, "Dor"), estr: w(0, "estrago"),
      g0: L1.start, g1: L1.end, foi: w(1, "foi"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const vert = (y) => `<rect x="1330" y="${y}" width="180" height="70" rx="22" fill="${C.bone}" ${st}/><rect x="1350" y="${y + 70}" width="140" height="16" rx="8" fill="#9CD3E6" stroke="${C.ink}" stroke-width="4"/>`;
    return {
      k,
      css: `
        #f10-title { left:110px; top:70px; font-size:70px; }
        #f10-title span { color:${C.pain}; }
        #f10-esp { left:150px; top:340px; padding:12px 24px; font-size:34px; color:${C.pain}; }
        #f10-sel { left:110px; top:190px; padding:14px 28px; font-size:42px; color:#fff; background:#2E9E78; border:7px solid ${C.ink}; border-radius:20px; box-shadow:8px 8px 0 ${C.ink}; }
        #f10-stamp { left:330px; top:400px; padding:20px 40px; font-size:84px; color:#fff; background:${C.pain}; border:8px solid ${C.ink}; border-radius:24px; box-shadow:10px 10px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f10-g-wrap"><g transform="translate(520,850) scale(1.1)">${guardas("f10g")}</g></g>
      <g id="f10-tape" opacity="0"><g transform="rotate(-6 520 680)"><rect x="160" y="650" width="720" height="60" fill="${C.sun}" ${st}/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${180 + i * 90} 652 L${220 + i * 90} 708" stroke="${C.ink}" stroke-width="16"/>`).join("")}
        <text x="520" y="694" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}" paint-order="stroke" stroke="${C.sun}" stroke-width="10">ÁREA ISOLADA</text></g></g>
      <!-- coluna forte: ponte de aço -->
      <g id="f10-spine" opacity="0"><g id="f10-spine-in">
        <rect x="1250" y="250" width="26" height="600" fill="#8A97A0" ${st}/><rect x="1564" y="250" width="26" height="600" fill="#8A97A0" ${st}/>
        ${[0, 1, 2, 3, 4].map((i) => `<path d="M1276 ${270 + i * 116} L1564 ${380 + i * 116} M1564 ${270 + i * 116} L1276 ${380 + i * 116}" stroke="#8A97A0" stroke-width="10" opacity="0.8"/>`).join("")}
        ${[290, 400, 510, 620, 730].map(vert).join("")}
        ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="1263" cy="${270 + i * 112}" r="7" fill="${C.ink}"/><circle cx="1577" cy="${270 + i * 112}" r="7" fill="${C.ink}"/>`).join("")}
      </g></g>
      <g id="f10-weight" opacity="0"><g transform="translate(1420,200)"><path d="M-40 -30 Q-40 -70 0 -70 Q40 -70 40 -30" fill="none" stroke="${C.ink}" stroke-width="14"/><circle cx="0" cy="10" r="56" fill="#3B4750" ${st}/><text x="0" y="22" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="#fff">20kg</text></g></g>
    </svg>
    <div id="f10-title" class="abs title" style="opacity:0">Os <span>GUARDAS</span> da lombar</div>
    <div id="f10-esp" class="abs card label" style="opacity:0">espasmo de proteção = TRAVAMENTO</div>
    <div id="f10-sel" class="abs title" style="opacity:0">COLUNA FORTE, NÃO FRÁGIL</div>
    <div id="f10-stamp" class="abs title" style="opacity:0">DOR ≠ ESTRAGO</div>`,
      js: function (tl, K, R) {
        const g0 = "f10g-g0", g1 = "f10g-g1";
        R.drop(tl, "#f10-title", 0.2, 0.7, -260);
        tl.fromTo("#f10-g-wrap", { y: 600, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, K.guar - 0.3);
        [g0, g1].forEach((g, i) => { R.setPose(tl, g, 0, { armF: 10, armB: -10 }); R.face(tl, g, 0, { mouth: "flat" }); R.blinks(tl, g, 0.5 + i * 0.4, K.dur); });
        // travam tudo: braços cruzados + fita
        R.pose(tl, g0, K.trav, 0.3, { armF: 110, armB: -110 }, "back.out(2)");
        R.pose(tl, g1, K.trav + 0.08, 0.3, { armF: 110, armB: -110 }, "back.out(2)");
        R.face(tl, g0, K.trav, { mouth: "frown" });
        R.face(tl, g1, K.trav, { mouth: "frown" });
        tl.set("#f10-tape", { opacity: 1 }, K.prot);
        tl.fromTo("#f10-tape", { scaleX: 0, svgOrigin: "160 680" }, { scaleX: 1, svgOrigin: "160 680", duration: 0.5, ease: "power3.out" }, K.prot);
        R.pop(tl, "#f10-esp", K.travm - 0.1, 0.4);
        R.shake(tl, "#f10-g-wrap", K.travm, 0.4, 4);
        // a coluna é forte
        R.pop(tl, "#f10-spine", K.verd, 0.5, 0.6);
        R.pop(tl, "#f10-sel", K.forte - 0.1, 0.4);
        tl.to("#f10-spine-in", { rotation: 4, svgOrigin: "1420 850", duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.mexer - 0.2);
        tl.set("#f10-weight", { opacity: 1 }, K.peso - 0.3);
        tl.fromTo("#f10-weight", { y: -300 }, { y: 0, duration: 0.45, ease: "bounce.out" }, K.peso - 0.3);
        R.squash(tl, "#f10-spine-in", K.peso + 0.05, "50% 100%");
        // dor não é estrago
        tl.fromTo("#f10-stamp", { scale: 2, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.3, ease: "power4.in" }, K.estr - 0.25);
        R.shake(tl, "#f10-stamp", K.estr + 0.05, 0.25, 6);
        R.fadeOut(tl, "#f10-esp, #f10-tape", K.dor - 0.2);
        // Guardas: "exageramos, foi mal!"
        R.fadeOut(tl, "#f10-stamp", K.g0 - 0.4);
        R.pose(tl, g0, K.g0 - 0.2, 0.35, { armF: -165, armB: -10 });
        R.pose(tl, g1, K.g0 - 0.1, 0.35, { armF: 15, armB: -15 });
        R.face(tl, g0, K.g0 - 0.2, { eyes: "closed", mouth: "grin" });
        R.face(tl, g1, K.g0 - 0.1, { eyes: "closed", mouth: "grin" });
        R.talk(tl, g1, K.g0, K.g1, "grin");
        tl.to("#f10g-g0-shades, #f10g-g1-shades", { y: -34, duration: 0.3, ease: "power2.out" }, K.foi);
      },
      sfx: [
        { name: "whoosh", t: k.guar - 0.3, vol: 0.4 },
        { name: "click", t: k.trav + 0.2, vol: 0.45 },
        { name: "whoosh-short", t: k.prot, vol: 0.35 },
        { name: "pop", t: k.verd, vol: 0.4 },
        { name: "impact-bass-1", t: k.peso + 0.05, vol: 0.45 },
        { name: "impact-bass-2", t: k.estr - 0.05, vol: 0.4 },
      ],
    };
  },
};
