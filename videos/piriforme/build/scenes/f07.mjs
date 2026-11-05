// F7 — Diagnóstico de exclusão: internet exagera, pizza (<1% a ~6%), carimbo, balança "primeiro a coluna", Vértebra aliviada
export default {
  speakers: { vertebra: "f07v" },
  tail: 0.9,
  build(ctx) {
    const { C, vertebra, w, lines } = ctx;
    const k = {
      at: w(0, "Atenção"), comum: w(0, "comum"), net: w(0, "internet"), est: w(0, "estimativas"), menos1: w(0, "menos", 1), cerca: w(0, "cerca"),
      ciat: w(0, "ciáticas"), excl: w(0, "exclusão"), prim: w(0, "primeiro"), desc: w(0, "descarta"), col: w(0, "coluna"),
      v0: lines[1].start, v1: lines[1].end, culpa: w(1, "culpa"),
    };
    const ink = C.ink;
    const st = `stroke="${ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // fatia de pizza de ~6% (21,6°) começando no topo
    const cx = 760, cy = 470, r = 220;
    const a = (6 / 100) * Math.PI * 2;
    const sx = cx, sy = cy - r, ex = cx + r * Math.sin(a), ey = cy - r * Math.cos(a);
    const a1 = (1 / 100) * Math.PI * 2;
    const e1x = cx + r * Math.sin(a1), e1y = cy - r * Math.cos(a1);
    return {
      k,
      css: `
        #f07-title { left:0; right:0; top:44px; text-align:center; font-size:66px; }
        #f07-title span { color:${C.pain}; }
        #f07-stamp { left:430px; top:420px; padding:14px 30px; font-size:56px; color:${C.pain}; border:9px solid ${C.pain}; border-radius:18px; background:rgba(255,255,255,0.92); transform:rotate(-10deg); white-space:nowrap; }
        #f07-pz-lbl { left:1010px; top:250px; font-size:40px; line-height:1.15; }
        #f07-pz-lbl b { color:${C.pain}; font-size:60px; }
        #f07-step { left:1150px; top:180px; width:640px; padding:20px 26px; font-size:38px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${ink}" stroke-width="7"/>
      <!-- celular -->
      <g id="f07-phone" opacity="0"><g transform="translate(160,200)">
        <rect width="360" height="620" rx="44" fill="${ink}"/>
        <rect x="20" y="60" width="320" height="500" rx="16" fill="#fff"/>
        <rect x="40" y="80" width="280" height="46" rx="23" fill="${C.wall}" stroke="${ink}" stroke-width="4"/>
        <text x="62" y="111" font-family="Nunito" font-weight="800" font-size="22" fill="${ink}">dor na nádega</text>
        ${[0, 1, 2, 3].map((i) => `<g class="f07-res" opacity="0"><rect x="40" y="${150 + i * 96}" width="280" height="80" rx="12" fill="#FFE4DC" stroke="${C.pain}" stroke-width="4"/><text x="60" y="${200 + i * 96}" font-family="Nunito" font-weight="900" font-size="28" fill="${C.pain}">PIRIFORME!!!</text></g>`).join("")}
      </g></g>
      <!-- pizza -->
      <g id="f07-pizza" opacity="0">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#9CD3E6" ${st}/>
        <path id="f07-slice" d="M${cx} ${cy} L${sx} ${sy} A${r} ${r} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)} Z" fill="${C.pain}" ${st}/>
        <path id="f07-slice1" d="M${cx} ${cy} L${sx} ${sy} A${r} ${r} 0 0 1 ${e1x.toFixed(1)} ${e1y.toFixed(1)} Z" fill="#B3261E" opacity="0"/>
        <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="34" fill="${ink}">outras causas</text>
        <text x="${cx}" y="${cy + 110}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="28" fill="${ink}">(coluna, quadril...)</text>
      </g>
      <!-- balança -->
      <g id="f07-bal" opacity="0">
        <path d="M1480 840 L1400 860 L1560 860 Z" fill="${ink}"/>
        <rect x="1470" y="420" width="20" height="430" fill="${ink}"/>
        <g id="f07-beam">
          <rect x="1210" y="410" width="540" height="20" rx="10" fill="${ink}"/>
          <g id="f07-panL"><path d="M1230 420 L1180 560 M1230 420 L1280 560" stroke="${ink}" stroke-width="5"/><path d="M1160 560 L1300 560 Q1290 600 1230 600 Q1170 600 1160 560 Z" fill="${C.sun}" ${st}/>
            <rect x="1196" y="514" width="70" height="46" rx="10" fill="#F2766B" ${st}/><text x="1231" y="545" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="#fff">PIRI</text></g>
          <g id="f07-panR"><path d="M1730 420 L1680 560 M1730 420 L1780 560" stroke="${ink}" stroke-width="5"/><path d="M1660 560 L1800 560 Q1790 600 1730 600 Q1670 600 1660 560 Z" fill="${C.sun}" ${st}/>
            <rect x="1662" y="436" width="136" height="124" rx="16" fill="${C.bone}" ${st}/><text x="1730" y="490" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${ink}">COLUNA</text><text x="1730" y="522" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="18" fill="${ink}">hérnia, estenose</text></g>
        </g>
        <g id="f07-check" opacity="0"><circle cx="1730" cy="380" r="34" fill="${C.good}" ${st}/><path d="M1714 380 L1726 394 L1748 366" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
        <text id="f07-1st" x="1730" y="330" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${ink}" opacity="0">1º</text>
      </g>
      <g id="f07-v-wrap"><g transform="translate(1010,880) scale(0.78)">${vertebra("f07v")}</g></g>
      <g id="f07-sweat" opacity="0"><path d="M1066 650 Q1078 674 1066 686 Q1054 674 1066 650 Z" fill="#9CD3E6" stroke="${ink}" stroke-width="4"/></g>
    </svg>
    <div id="f07-title" class="abs title" style="opacity:0"><span>ATENÇÃO:</span> é menos comum do que parece!</div>
    <div id="f07-pz-lbl" class="abs label" style="opacity:0">das dores ciáticas:<br/>de <b>&lt;1%</b><br/>até <b>~6%</b></div>
    <div id="f07-stamp" class="abs title" style="opacity:0">DIAGNÓSTICO DE EXCLUSÃO</div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f07-title", K.at - 0.2, 0.7, -250);
        // internet exagerando
        R.pop(tl, "#f07-phone", K.comum, 0.45);
        tl.fromTo(".f07-res", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.2, stagger: 0.15, ease: "back.out(2)" }, K.net);
        R.shake(tl, "#f07-phone", K.net + 0.8, 0.4, 5);
        tl.to("#f07-phone", { opacity: 0, x: -200, duration: 0.35, ease: "power2.in" }, K.est - 0.4);
        // pizza
        R.pop(tl, "#f07-pizza", K.est - 0.2, 0.5);
        tl.set("#f07-slice1", { opacity: 1 }, K.menos1);
        tl.fromTo("#f07-slice", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.menos1);
        tl.fromTo("#f07-slice", { scale: 1 }, { scale: 1.12, svgOrigin: "760 470", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.cerca);
        R.pop(tl, "#f07-pz-lbl", K.menos1, 0.4);
        // carimbo
        tl.fromTo("#f07-stamp", { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power4.in" }, K.excl - 0.15);
        R.shake(tl, "#f07-pizza", K.excl + 0.1, 0.25, 6);
        // balança: primeiro a coluna
        tl.to("#f07-stamp", { scale: 0.7, x: -150, y: 300, opacity: 0, duration: 0.4, ease: "power2.in" }, K.prim - 0.3);
        tl.to("#f07-pz-lbl", { opacity: 0, duration: 0.3 }, K.prim - 0.3);
        R.pop(tl, "#f07-bal", K.prim - 0.1, 0.45);
        tl.fromTo("#f07-beam", { rotation: 0 }, { rotation: 10, svgOrigin: "1480 420", duration: 0.7, ease: "bounce.out" }, K.desc);
        tl.fromTo("#f07-panL", { rotation: 0 }, { rotation: -10, svgOrigin: "1230 420", duration: 0.7, ease: "bounce.out" }, K.desc);
        tl.fromTo("#f07-panR", { rotation: 0 }, { rotation: -10, svgOrigin: "1730 420", duration: 0.7, ease: "bounce.out" }, K.desc);
        R.pop(tl, "#f07-1st", K.col - 0.1, 0.35);
        R.pop(tl, "#f07-check", K.col + 0.3, 0.35);
        // Vértebra suando, depois aliviada
        const v = "f07v";
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, v, 0, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f07-v-wrap", { x: -1300 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.prim);
        R.face(tl, v, K.desc, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f07-sweat", K.desc + 0.2, 0.3);
        tl.to("#f07-sweat", { y: 40, opacity: 0, duration: 0.6, ease: "power1.in" }, K.desc + 0.7);
        R.face(tl, v, K.v0, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, K.v0 + 0.1, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.squash(tl, "#f07v-root", K.culpa);
        R.blinks(tl, v, K.prim, K.v0, "normal");
        R.pose(tl, v, K.v1 + 0.1, 0.4, { armF: 20, armB: -20 });
      },
      sfx: [
        { name: "impact-bass-1", t: k.at + 0.3, vol: 0.35 },
        { name: "notification", t: k.net, vol: 0.3, dur: 1.0 },
        { name: "pop", t: k.est - 0.15, vol: 0.4 },
        { name: "pop", t: k.menos1, vol: 0.35 },
        { name: "impact-bass-2", t: k.excl + 0.1, vol: 0.45 },
        { name: "whoosh-short", t: k.prim - 0.1, vol: 0.35 },
        { name: "pop", t: k.col + 0.3, vol: 0.4 },
        { name: "sparkle", t: k.v0 + 0.1, vol: 0.35 },
      ],
    };
  },
};
