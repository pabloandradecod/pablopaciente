// F8 — De onde vem a dor? Fontes acendendo uma a uma (músculos, ligamentos, articulações, disco, sacroilíaca) e "?" gigante
export default {
  speakers: {},
  build(ctx) {
    const { C, guardas, disquinho, w } = ctx;
    const k = {
      onde: w(0, "onde"), musc: w(0, "músculos"), lig: w(0, "ligamentos"), art: w(0, "articulações"), disco: w(0, "disco"), sacro: w(0, "sacroilíaca"),
      mist: w(0, "mistura"), culp: w(0, "culpado"), tudo: w(0, "tudo"), trat: w(0, "tratamento"), func: w(0, "funcionar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // coluna lombar de lado (frente à esquerda)
    const verts = [0, 1, 2].map((i) => {
      const y = 250 + i * 160;
      return `<g><rect x="560" y="${y}" width="200" height="110" rx="24" fill="${C.bone}" ${st}/>
        <path d="M760 ${y + 20} L840 ${y + 30} L880 ${y + 70} L840 ${y + 100} L760 ${y + 90} Z" fill="${C.bone}" ${st}/>
        <circle class="f08-facet" cx="790" cy="${y + 112}" r="20" fill="${C.bone}" ${st}/></g>`;
    }).join("");
    const discs = [0, 1].map((i) => `<rect class="f08-disc" x="570" y="${370 + i * 160}" width="180" height="40" rx="14" fill="#9CD3E6" ${st}/>`).join("");
    return {
      k,
      css: `
        #f08-ttl { left:100px; top:60px; font-size:66px; }
        #f08-ttl span { color:${C.pain}; }
        .f08-tag { padding:8px 18px; font-size:30px; }
        #f08-t0 { left:1010px; top:250px; } #f08-t1 { left:1010px; top:330px; } #f08-t2 { left:1010px; top:410px; } #f08-t3 { left:1010px; top:490px; } #f08-t4 { left:1010px; top:570px; }
        #f08-mix { left:1010px; top:680px; padding:14px 24px; font-size:38px; background:${C.sun}; }
        #f08-ok { left:1260px; top:250px; width:520px; padding:22px 28px; font-size:40px; }
        #f08-ok b { color:#1E9E73; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <text x="500" y="220" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}" opacity="0.6">frente</text>
      <text x="830" y="220" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}" opacity="0.6">costas</text>
      <!-- músculos (atrás da coluna) -->
      <g id="f08-musc"><path d="M880 230 Q960 400 900 760 L960 760 Q1010 420 930 230 Z" fill="#E86A5C" ${st} opacity="0.85"/>
        <path d="M900 300 Q940 450 915 700" stroke="#B9473E" stroke-width="5" fill="none"/></g>
      ${verts}${discs}
      <!-- sacro + sacroilíaca -->
      <path id="f08-sacrum" d="M560 730 L780 730 L740 860 L620 860 Z" fill="${C.bone}" ${st}/>
      <g id="f08-si" opacity="0"><circle cx="680" cy="790" r="46" fill="${C.pain}" opacity="0.45"/></g>
      <!-- ligamentos -->
      <g id="f08-lig" opacity="0.35"><path d="M555 250 L555 730 M885 300 L885 720" stroke="${C.sun}" stroke-width="12" stroke-linecap="round"/></g>
      <!-- brilhos -->
      <g id="f08-gM" opacity="0"><path d="M880 230 Q960 400 900 760 L960 760 Q1010 420 930 230 Z" fill="none" stroke="${C.pain}" stroke-width="14"/></g>
      <g id="f08-gL" opacity="0"><path d="M555 250 L555 730 M885 300 L885 720" stroke="${C.pain}" stroke-width="18" stroke-linecap="round" opacity="0.7"/></g>
      <g id="f08-gF" opacity="0">${[0, 1, 2].map((i) => `<circle cx="790" cy="${362 + i * 160}" r="30" fill="none" stroke="${C.pain}" stroke-width="10"/>`).join("")}</g>
      <g id="f08-gD" opacity="0">${[0, 1].map((i) => `<rect x="560" y="${362 + i * 160}" width="200" height="56" rx="18" fill="none" stroke="${C.pain}" stroke-width="10"/>`).join("")}</g>
      <!-- mini personagens -->
      <g id="f08-gu" style="opacity:0"><g transform="translate(260,860) scale(0.55)">${guardas("f08g")}</g></g>
      <g id="f08-dq" style="opacity:0"><g transform="translate(465,880) scale(0.6)">${disquinho("f08d")}</g></g>
      <!-- ? gigante -->
      <g id="f08-q" opacity="0"><text x="1500" y="760" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="420" fill="${C.sun}" stroke="${C.ink}" stroke-width="12" paint-order="stroke">?</text></g>
    </svg>
    <div id="f08-ttl" class="abs title">De onde vem a <span>dor</span>?</div>
    <div id="f08-t0" class="abs card f08-tag label" style="opacity:0">músculos</div>
    <div id="f08-t1" class="abs card f08-tag label" style="opacity:0">ligamentos</div>
    <div id="f08-t2" class="abs card f08-tag label" style="opacity:0">pequenas articulações</div>
    <div id="f08-t3" class="abs card f08-tag label" style="opacity:0">disco</div>
    <div id="f08-t4" class="abs card f08-tag label" style="opacity:0">sacroilíaca</div>
    <div id="f08-mix" class="abs card title" style="opacity:0">geralmente: uma MISTURA</div>
    <div id="f08-ok" class="abs card label" style="opacity:0">Sem um culpado só?<br/><b>O tratamento funciona mesmo assim!</b></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f08-ttl", 0.1, 0.5);
        R.setPose(tl, "f08g-g0", 0, { armF: 70, armB: -70 });
        R.setPose(tl, "f08g-g1", 0, { armF: 70, armB: -70 });
        const flash = (sel, t) => { tl.set(sel, { opacity: 1 }, t); tl.to(sel, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, t + 0.1); tl.to(sel, { opacity: 0, duration: 0.3 }, t + 1.3); };
        // músculos: os Guardas aparecem
        flash("#f08-gM", K.musc);
        R.pop(tl, "#f08-t0", K.musc, 0.35);
        tl.set("#f08-gu", { opacity: 1 }, K.musc);
        tl.fromTo("#f08-gu", { y: 300 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.musc);
        R.pose(tl, "f08g-g0", K.musc + 0.3, 0.25, { armF: 110, armB: -110 }, "back.out(2)");
        R.pose(tl, "f08g-g1", K.musc + 0.35, 0.25, { armF: 110, armB: -110 }, "back.out(2)");
        // ligamentos
        flash("#f08-gL", K.lig);
        tl.to("#f08-lig", { opacity: 1, duration: 0.3 }, K.lig);
        R.pop(tl, "#f08-t1", K.lig, 0.35);
        // articulações (facetas)
        flash("#f08-gF", K.art);
        R.pop(tl, "#f08-t2", K.art, 0.35);
        // disco: Disquinho acena
        flash("#f08-gD", K.disco);
        R.pop(tl, "#f08-t3", K.disco, 0.35);
        tl.set("#f08-dq", { opacity: 1 }, K.disco);
        R.pop(tl, "#f08-dq", K.disco, 0.4);
        R.face(tl, "f08d", K.disco, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f08d", K.disco + 0.2, 0.25, { armF: -150 }, "back.out(2)");
        for (let i = 0; i < 2; i++) R.pose(tl, "f08d", K.disco + 0.5 + i * 0.3, 0.15, { armF: i % 2 ? -150 : -110 }, "sine.inOut");
        // sacroilíaca
        flash("#f08-si", K.sacro);
        R.pop(tl, "#f08-t4", K.sacro, 0.35);
        // mistura: tudo acende junto
        ["#f08-gM", "#f08-gL", "#f08-gF", "#f08-gD", "#f08-si"].forEach((s) => tl.to(s, { opacity: 0.85, duration: 0.25 }, K.mist));
        R.pop(tl, "#f08-mix", K.mist, 0.4);
        // culpado só: ? gigante
        tl.set("#f08-q", { opacity: 1 }, K.culp - 0.3);
        R.drop(tl, "#f08-q", K.culp - 0.3, 0.8, -900);
        R.face(tl, "f08d", K.culp, { eyes: "wide", mouth: "flat" });
        tl.to("#f08-t0, #f08-t1, #f08-t2, #f08-t3, #f08-t4", { opacity: 0, duration: 0.3 }, K.culp - 0.3);
        // tudo bem: tratamento funciona
        tl.to("#f08-q", { opacity: 0, scale: 0.6, svgOrigin: "1500 600", duration: 0.35, ease: "back.in(2)" }, K.tudo - 0.2);
        ["#f08-gM", "#f08-gL", "#f08-gF", "#f08-gD", "#f08-si"].forEach((s) => tl.to(s, { opacity: 0, duration: 0.4 }, K.tudo));
        R.pop(tl, "#f08-ok", K.tudo, 0.45);
        R.face(tl, "f08d", K.trat, { eyes: "happy", mouth: "grin" });
        tl.to("#f08-ok", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }, K.func);
      },
      sfx: [
        { name: "pop", t: k.musc, vol: 0.3 },
        { name: "pop", t: k.lig, vol: 0.3 },
        { name: "pop", t: k.art, vol: 0.3 },
        { name: "pop", t: k.disco, vol: 0.3 },
        { name: "pop", t: k.sacro, vol: 0.3 },
        { name: "sparkle", t: k.mist, vol: 0.35 },
        { name: "impact-bass-1", t: k.culp + 0.3, vol: 0.35 },
        { name: "sparkle", t: k.tudo, vol: 0.35 },
      ],
    };
  },
};
