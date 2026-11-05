// F13 — O mapa das raízes: L4, L5 e S1 pintam a perna; Seu Zé não anda no calcanhar → L5
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      mapa: w(0, "mapa"), andar: w(0, "andar"),
      l4: w(0, "L4"), l4a: w(0, "parte"), l4c: w(0, "perna"),
      l5: w(0, "L5"), l5a: w(0, "peito"), l5c: w(0, "dedão"),
      s1: w(0, "S1", 0), s1a: w(0, "lateral"), s1c: w(0, "sola"),
      ze: w(0, "Zé"), cons: w(0, "consegue"), ponta: w(0, "ponta"), apo: w(0, "aponta"), s1f: w(0, "S1", 1),
    };
    const L4C = "#5B8DEF", L5C = C.sun, S1C = C.purple;
    const ic = {
      pele: `<path d="M-22 -14 Q-14 -22 -6 -14 Q2 -6 10 -14 Q18 -22 24 -14 M-22 2 Q-14 -6 -6 2 Q2 10 10 2 Q18 -6 24 2 M-22 18 Q-14 10 -6 18 Q2 26 10 18 Q18 10 24 18" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>`,
      forca: `<path d="M0 26 L0 -18 M-16 -4 L0 -22 L16 -4" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
      reflexo: `<rect x="-24" y="-24" width="30" height="20" rx="6" fill="${C.pain}" stroke="${C.ink}" stroke-width="5" transform="rotate(-30)"/><path d="M0 -6 L18 24" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`,
      ponta: `<path d="M-14 -22 Q-8 -30 2 -24 L22 14 Q24 24 14 24 L-4 24 Q-14 22 -12 10 Z" fill="#4A2E1A" stroke="${C.ink}" stroke-width="5"/><path d="M-26 -8 L-26 -24 M-34 -16 L-26 -26 L-18 -16" fill="none" stroke="${C.good}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
      calc: `<path d="M-22 10 Q-24 -8 -8 -10 L14 -10 Q24 -8 22 10 Z" fill="#4A2E1A" stroke="${C.ink}" stroke-width="5" transform="rotate(-25)"/><path d="M-18 24 L-26 24" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>`,
    };
    const item = (id, icon, txt) => `<div id="${id}" class="f14-it" style="opacity:0"><svg width="70" height="70" viewBox="-35 -35 70 70"><circle r="32" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>${icon}</svg><span>${txt}</span></div>`;
    const card = (id, y, lab, col, items) => `<div id="${id}" class="f14-card" style="top:${y}px;opacity:0">
      <div class="f14-badge title" style="background:${col}">${lab}</div>
      <div class="f14-items">${items.join("")}</div></div>`;
    return {
      k,
      css: `
        #f14-title { left:70px; top:40px; font-size:56px; }
        #f14-title span { color:${C.pain}; }
        #root .f14-card { position:absolute; left:760px; width:1100px; height:190px; background:#fff; border:7px solid ${C.ink}; border-radius:28px; box-shadow:8px 8px 0 ${C.ink}; }
        #root .f14-badge { position:absolute; left:22px; top:30px; width:130px; height:130px; border-radius:50%; border:7px solid ${C.ink}; font-size:56px; line-height:116px; text-align:center; color:${C.ink}; }
        #root .f14-items { position:absolute; left:175px; right:16px; top:20px; bottom:16px; display:flex; gap:12px; }
        #root .f14-it { flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; font-family:"Nunito"; font-weight:900; font-size:27px; line-height:1.1; color:${C.ink}; }
        #root .f14-it svg { margin-bottom:6px; overflow:visible; }
        #f14-x { left:1330px; top:470px; }
        #f14-l5stamp { left:520px; top:300px; font-size:120px; color:#fff; background:${S1C}; border:9px solid ${C.ink}; border-radius:30px; padding:0 26px; rotate:-8deg; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <g opacity="0.12">${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1080" stroke="${C.ink}" stroke-width="2"/><line x1="0" y1="${i * 100}" x2="1920" y2="${i * 100}" stroke="${C.ink}" stroke-width="2"/>`).join("")}</g>
      <!-- rosa dos ventos (cartógrafo) -->
      <g id="f14-rose" transform="translate(690,215)"><g id="f14-rose-in"><circle r="44" fill="#fff" stroke="${C.ink}" stroke-width="5"/><path d="M0 -40 L10 0 L0 40 L-10 0 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/><path d="M-40 0 L0 -8 L40 0 L0 8 Z" fill="${C.sky}" stroke="${C.ink}" stroke-width="4"/></g></g>
      <!-- pernas, vista de frente: a da esquerda (perna direita do paciente) é a do mapa -->
      <g id="f14-legs">
        <path d="M530 150 L690 150 L668 450 L672 560 L645 740 L700 790 L700 850 L600 850 L598 790 L596 740 L568 560 L560 450 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" opacity="0.35"/>
        <path d="M330 150 L500 150 L478 450 L488 560 L456 740 L484 790 L486 850 L370 850 L372 790 L398 740 L366 560 L362 450 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <g id="f14-L4" opacity="0"><path d="M450 462 L476 462 L486 560 L458 742 L436 742 L452 560 Z" fill="${L4C}" opacity="0.9"/></g>
        <g id="f14-L5" opacity="0"><path d="M368 470 L404 468 L418 600 L424 742 L402 742 L368 560 Z" fill="${L5C}" opacity="0.95"/><path d="M404 748 L452 748 L478 794 L484 846 L436 846 L418 796 Z" fill="${L5C}" opacity="0.95"/></g>
        <g id="f14-S1" opacity="0"><path d="M376 760 L400 750 L414 800 L408 846 L374 846 L372 796 Z" fill="${S1C}" opacity="0.9"/><path d="M372 690 L392 700 L398 742 L380 750 Z" fill="${S1C}" opacity="0.9"/></g>
        <path d="M330 150 L500 150 L478 450 L488 560 L456 740 L484 790 L486 850 L370 850 L372 790 L398 740 L366 560 L362 450 Z" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M380 450 Q420 470 462 450" fill="none" stroke="${C.ink}" stroke-width="5" opacity="0.5"/>
        <path d="M440 850 L440 830 M462 850 L462 834 M400 850 L400 836" stroke="${C.ink}" stroke-width="4" opacity="0.6"/>
        <!-- sola (S1) -->
        <g id="f14-sole"><path d="M170 640 Q150 760 190 840 Q220 860 246 836 Q266 760 250 650 Q232 610 200 612 Q176 616 170 640 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="6"/>
          <path id="f14-solefill" opacity="0" d="M178 660 Q164 760 196 828 Q220 846 238 826 Q254 760 242 664 Q228 630 202 632 Q184 636 178 660 Z" fill="${S1C}"/>
          <text x="210" y="890" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">sola</text></g>
        <g id="f14-dentro" opacity="0"><text x="508" y="520" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">lado de</text><text x="508" y="548" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">dentro</text><path d="M500 534 L486 534" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g>
        <g id="f14-tingle" opacity="0"><path d="M478 800 L500 790 L490 812 L514 806 M484 830 L508 836" stroke="${C.pain}" stroke-width="6" stroke-linecap="round" fill="none"/></g>
        <g id="f14-pin" opacity="0"><path d="M386 740 Q350 696 350 676 A36 36 0 1 1 422 676 Q422 696 386 740 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/><circle cx="386" cy="676" r="13" fill="#fff" stroke="${C.ink}" stroke-width="4"/></g>
      </g>
      <g id="f14-z-wrap" opacity="0"><g transform="translate(1180,620) scale(-0.95,0.95)">${human("f14z", "ze")}</g></g>
    </svg>
    <div id="f14-title" class="abs title" style="opacity:0">O ANDAR DA <span>HÉRNIA</span></div>
    ${card("f14-c4", 110, "L4", L4C, [item("f14-i4a", ic.pele, "parte de dentro da perna"), item("f14-i4c", ic.reflexo, "reflexo do joelho")])}
    ${card("f14-c5", 335, "L5", L5C, [item("f14-i5a", ic.pele, "peito do pé e dedão"), item("f14-i5c", ic.calc, "andar no calcanhar")])}
    ${card("f14-c6", 560, "S1", S1C, [item("f14-i6a", ic.pele, "lateral e sola do pé"), item("f14-i6c", ic.ponta, "ficar na ponta do pé")])}
    <svg id="f14-x" class="abs" width="160" height="160" viewBox="-80 -80 160 160" style="opacity:0"><path d="M-55 -55 L55 55 M55 -55 L-55 55" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/><path d="M-55 -55 L55 55 M55 -55 L-55 55" stroke="${C.pain}" stroke-width="26" stroke-linecap="round"/></svg>
    <div id="f14-l5stamp" class="abs title" style="opacity:0">S1!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f14-title", 0.1, 0.4);
        tl.fromTo("#f14-rose-in", { scale: 0, rotation: -180, svgOrigin: "0 0" }, { scale: 1, rotation: 0, svgOrigin: "0 0", duration: 0.7, ease: "back.out(1.6)" }, K.mapa - 0.1);
        tl.fromTo("#f14-legs", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.2);
        const root = (c, reg, t, items) => {
          tl.fromTo(c, { x: 260, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, t - 0.15);
          reg.forEach((r) => tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 4, ease: "none", immediateRender: false }, t));
          items.forEach(([s, ti]) => R.pop(tl, s, ti - 0.05, 0.3));
        };
        root("#f14-c4", ["#f14-L4"], K.l4, [["#f14-i4a", K.l4a], ["#f14-i4c", K.l4c]]);
        root("#f14-c5", ["#f14-L5"], K.l5, [["#f14-i5a", K.l5a], ["#f14-i5c", K.l5c]]);
        root("#f14-c6", ["#f14-S1", "#f14-solefill"], K.s1, [["#f14-i6a", K.s1a], ["#f14-i6c", K.s1c]]);
        R.fadeIn(tl, "#f14-dentro", K.l4a, 0.3);
        // o caso do Seu Zé: ponta do pé
        tl.to("#f14-c4, #f14-c5", { x: 1200, opacity: 0, duration: 0.4, ease: "power2.in" }, K.ze - 0.3);
        tl.to("#f14-c6", { y: -450, duration: 0.5, ease: "power2.inOut" }, K.ze - 0.2);
        tl.to("#f14-L4, #f14-L5", { opacity: 0.25, duration: 0.4 }, K.ze);
        const z = "f14z";
        R.setPose(tl, z, 0, { shF: -20, elF: -30, shB: 20, elB: -30 });
        tl.set("#f14-z-wrap", { opacity: 1 }, K.ze - 0.2);
        tl.fromTo("#f14-z-wrap", { x: 600 }, { x: 0, duration: 0.6, ease: "power2.out" }, K.ze - 0.2);
        R.face(tl, z, K.ze, { eyes: "wide", mouth: "flat" });
        // sobe na ponta do pé... e não consegue
        R.pose(tl, z, K.cons, 0.3, { anF: 35, anB: 35, shF: -120, shB: 120, elF: -20, elB: 20 }, "sine.inOut");
        tl.to("#f14-z-wrap", { y: -26, duration: 0.3, ease: "sine.out" }, K.cons);
        R.pose(tl, z, K.ponta + 0.1, 0.25, { anF: 0, anB: 0, torso: -14, neck: -10, shF: -160, shB: 160, elF: -60, elB: 60 }, "power3.in");
        tl.to("#f14-z-wrap", { y: 0, duration: 0.25, ease: "power3.in" }, K.ponta + 0.1);
        R.face(tl, z, K.ponta + 0.2, { eyes: "pain", mouth: "scream" });
        R.squash(tl, "#f14z-root", K.ponta + 0.35);
        R.pop(tl, "#f14-x", K.ponta + 0.3, 0.35);
        tl.to("#f14-i6c", { scale: 1.2, duration: 0.2, yoyo: true, repeat: 3 }, K.ponta + 0.2);
        // a pista aponta para S1
        tl.fromTo("#f14-S1, #f14-solefill", { opacity: 1 }, { opacity: 0.3, duration: 0.16, yoyo: true, repeat: 7, ease: "none", immediateRender: false }, K.apo);
        tl.set("#f14-S1, #f14-solefill", { opacity: 1 }, K.apo + 1.4);
        tl.set("#f14-pin", { opacity: 1 }, K.apo);
        tl.fromTo("#f14-pin", { y: -400 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.apo);
        tl.set("#f14-l5stamp", { opacity: 1 }, K.s1f);
        tl.fromTo("#f14-l5stamp", { scale: 2.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power4.in" }, K.s1f);
        R.face(tl, z, K.s1f + 0.3, { eyes: "normal", mouth: "frown" });
        R.pose(tl, z, K.s1f + 0.3, 0.5, { torso: 0, neck: 0, shF: -10, shB: 10, elF: -20, elB: -20 });
        R.blinks(tl, z, K.ze + 1, K.dur);
      },
      sfx: [
        { name: "whoosh", t: k.mapa - 0.1, vol: 0.4 },
        ...[k.l4, k.l5, k.s1].map((t) => ({ name: "pop", t, vol: 0.45 })),
        { name: "whoosh-short", t: k.ze - 0.3, vol: 0.4 },
        { name: "impact-bass-2", t: k.ponta + 0.35, vol: 0.45 },
        { name: "whoosh-short", t: k.apo, vol: 0.35 },
        { name: "impact-bass-1", t: k.s1f + 0.2, vol: 0.45 },
      ],
    };
  },
};
