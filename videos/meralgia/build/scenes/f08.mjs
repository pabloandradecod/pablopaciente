// F8 — Causas: "QUEM APERTA O NERVINHO?" — roupa/cinto, peso/gravidez, diabetes, em pé/cirurgias. Cintão "culpado com estilo".
export default {
  speakers: { cintao: "f08c" },
  build(ctx) {
    const { C, cintao, w, lines, LILAC } = ctx;
    const k = {
      aperta: w(0, "aperta"), roupa: w(0, "Roupa"), cinto: w(0, "cinto"), ferr: w(0, "ferramentas"), pol: w(0, "policial"),
      ganho: w(0, "Ganho"), grav: w(0, "gravidez"), emp: w(0, "empurram"),
      diab: w(0, "Diabetes"), sens: w(0, "sensível"),
      tempo: w(0, "tempo"), cir: w(0, "cirurgias"), vir: w(0, "virilha"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const X = [330, 720, 1110, 1500];
    const card = (i, title) => `<div id="f08-c${i}" class="abs card" style="left:${X[i]}px;top:200px;width:360px;height:480px;opacity:0">
        <div class="label" style="position:absolute;left:0;right:0;bottom:18px;text-align:center;font-size:32px;line-height:1.1">${title}</div></div>`;
    const cx = (i) => X[i] + 180;
    return {
      k,
      css: `
        #f08-title { left:0; right:0; top:70px; text-align:center; font-size:76px; white-space:nowrap; }
        #f08-title b { color:${LILAC}; }
        #f08-say { left:40px; top:470px; width:260px; padding:14px 16px; font-size:28px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f08-c-wrap"><g transform="translate(170,760) scale(0.55)">${cintao("f08c", 200)}</g></g>
      <g id="f08-shades" opacity="0"><g transform="translate(170,752)">
        <rect x="-50" y="-16" width="42" height="26" rx="8" fill="${C.ink}"/><rect x="8" y="-16" width="42" height="26" rx="8" fill="${C.ink}"/><line x1="-8" y1="-6" x2="8" y2="-6" stroke="${C.ink}" stroke-width="6"/>
      </g></g>
    </svg>
    ${card(0, "Roupa e cinto<br/><span style='color:${C.pain}'>apertados</span>")}
    ${card(1, "Peso e<br/>gravidez")}
    ${card(2, "Diabetes")}
    ${card(3, "Muito tempo em pé<br/><span style='font-size:24px'>posições e cirurgias</span>")}
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- 0: calça justa + cintos -->
      <g transform="translate(${cx(0)},0)"><g id="f08-g0" opacity="0">
        <path d="M-70 270 L70 270 L80 520 L18 520 L0 360 L-18 520 L-80 520 Z" fill="${C.blue}" ${st()}/>
        <g id="f08-belt0"><rect x="-82" y="262" width="164" height="30" rx="8" fill="#6B3E1F" ${st(6)}/><rect x="-18" y="258" width="36" height="38" rx="8" fill="${C.sun}" ${st(5)}/></g>
        <g id="f08-squeeze" opacity="0"><path d="M-108 278 l-22 0 M108 278 l22 0" ${st(8)} stroke="${C.pain}"/><path d="M-118 262 l-14 -12 M118 262 l14 -12 M-118 294 l-14 12 M118 294 l14 12" ${st(5)} stroke="${C.pain}"/></g>
        <g transform="translate(-80,556)"><g id="f08-tool" opacity="0"><rect x="-44" y="-18" width="88" height="36" rx="8" fill="#8B5A2B" ${st(5)}/><path d="M-26 -18 L-26 -50 M-14 -18 L-8 -44 M14 -18 L22 -50" ${st(6)}/><circle cx="22" cy="-54" r="8" fill="${C.grey}" ${st(4)}/></g></g>
        <g transform="translate(80,556)"><g id="f08-pol" opacity="0"><rect x="-44" y="-18" width="88" height="36" rx="8" fill="#1F3550" ${st(5)}/><path d="M0 -14 L10 -2 L0 14 L-10 -2 Z" fill="${C.sun}" ${st(3)}/><rect x="24" y="-12" width="16" height="24" rx="4" fill="#333" ${st(3)}/></g></g>
      </g></g>
      <!-- 1: barriga empurrando de dentro -->
      <g transform="translate(${cx(1)},0)"><g id="f08-g1" opacity="0">
        <path d="M-60 260 L-60 560 M60 260 Q60 260 60 300" ${st(8)}/>
        <g id="f08-belly"><path d="M-60 300 Q-60 260 0 262 Q40 264 60 300 Q120 400 60 520 Q30 560 -60 560 Z" fill="${C.blue}" ${st(7)}/></g>
        <g id="f08-push" opacity="0">${[[110, 360, 150, 330], [124, 420, 172, 420], [110, 480, 150, 510]].map(([a, b, c2, d]) => `<path d="M${a} ${b} L${c2} ${d}" ${st(8)} stroke="${C.pain}"/>`).join("")}</g>
        <g transform="translate(-6,430)"><g id="f08-baby" opacity="0"><circle r="30" fill="#FFD3C9" ${st(5)}/><path d="M-10 -2 Q0 8 10 -2" fill="none" ${st(4)}/><circle cx="-10" cy="-10" r="3" fill="${C.ink}"/><circle cx="10" cy="-10" r="3" fill="${C.ink}"/></g></g>
      </g></g>
      <!-- 2: diabetes: gota + glicosímetro, nervo sensível -->
      <g transform="translate(${cx(2)},0)"><g id="f08-g2" opacity="0">
        <rect x="-70" y="270" width="140" height="190" rx="22" fill="#fff" ${st()}/>
        <rect x="-50" y="294" width="100" height="70" rx="10" fill="${C.sky}" ${st(5)}/>
        <text x="0" y="342" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">mg/dL</text>
        <circle cx="-26" cy="410" r="14" fill="${C.good}" ${st(4)}/><circle cx="26" cy="410" r="14" fill="${C.pain}" ${st(4)}/>
        <g transform="translate(0,560)"><g id="f08-nv2" opacity="0">
          <path d="M-110 0 Q-55 -30 0 0 Q55 30 110 0" fill="none" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/>
          <path id="f08-nv2i" d="M-110 0 Q-55 -30 0 0 Q55 30 110 0" fill="none" stroke="${LILAC}" stroke-width="14" stroke-linecap="round"/>
          <path d="M-120 -40 l-10 -16 M0 -36 l0 -20 M120 -40 l10 -16" ${st(5)} stroke="${C.pain}"/>
        </g></g>
      </g></g>
      <!-- 3: em pé muito tempo + maca de cirurgia -->
      <g transform="translate(${cx(3)},0)"><g id="f08-g3" opacity="0">
        <g id="f08-stand"><circle cx="-60" cy="290" r="26" fill="${C.skinB}" ${st(5)}/><path d="M-60 316 L-60 420 M-60 420 L-80 520 M-60 420 L-40 520 M-60 340 L-90 400 M-60 340 L-30 400" ${st(9)}/></g>
        <circle cx="60" cy="300" r="44" fill="#fff" ${st(6)}/><g id="f08-hand"><line x1="60" y1="300" x2="60" y2="268" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/></g><circle cx="60" cy="300" r="6" fill="${C.ink}"/>
        <g transform="translate(70,40) scale(0.75)"><g id="f08-surg" opacity="0">
          <rect x="-120" y="560" width="240" height="22" rx="8" fill="#9CD3E6" ${st(5)}/>
          <path d="M-90 582 L-90 640 M90 582 L90 640" ${st(6)}/>
          <circle cx="-96" cy="544" r="16" fill="${C.skinB}" ${st(4)}/><rect x="-80" y="534" width="170" height="26" rx="10" fill="#B6E3D2" ${st(4)}/>
          <circle cx="40" cy="547" r="14" fill="${C.pain}" opacity="0.6"/>
        </g></g>
      </g></g>
    </svg>
    <div id="f08-title" class="abs title" style="opacity:0">QUEM <b>APERTA</b> O NERVINHO?</div>
    <div id="f08-say" class="abs card label" style="opacity:0">Culpado... mas com estilo!</div>`,
      js: function (tl, K, R) {
        const c = "f08c";
        R.drop(tl, "#f08-title", 0.05, 0.7, -260);
        R.fadeIn(tl, "#f08-c-wrap", 0, 0.3);
        R.setPose(tl, c, 0, { armF: -20, armB: 20 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.3, K.c0 - 0.3);
        // cada causa: o Cintão se gaba
        const brag = (t, i) => {
          R.face(tl, c, t, { eyes: "happy", mouth: "grin" });
          R.pose(tl, c, t, 0.25, { armF: i % 2 ? -150 : -90, armB: i % 2 ? 150 : 90 }, "back.out(2)");
          R.squash(tl, "#f08c-body", t + 0.05);
          R.pose(tl, c, t + 0.6, 0.3, { armF: -20, armB: 20 });
          R.face(tl, c, t + 0.7, { eyes: "normal", mouth: "smile" });
        };
        // 0 roupa e cintos
        R.pop(tl, "#f08-c0", K.roupa - 0.25, 0.4);
        R.pop(tl, "#f08-g0", K.roupa - 0.15, 0.4);
        tl.fromTo("#f08-belt0", { scaleX: 1.15 }, { scaleX: 0.9, svgOrigin: "0 277", duration: 0.35, ease: "power3.in" }, K.cinto);
        tl.set("#f08-squeeze", { opacity: 1 }, K.cinto + 0.3);
        brag(K.cinto, 0);
        R.pop(tl, "#f08-tool", K.ferr - 0.1, 0.35);
        R.pop(tl, "#f08-pol", K.pol - 0.1, 0.35);
        // 1 peso e gravidez
        R.pop(tl, "#f08-c1", K.ganho - 0.25, 0.4);
        R.fadeIn(tl, "#f08-g1", K.ganho - 0.15, 0.3);
        tl.fromTo("#f08-belly", { scaleX: 0.7 }, { scaleX: 1.12, svgOrigin: "-60 410", duration: 0.6, ease: "back.out(2.5)" }, K.ganho + 0.1);
        R.pop(tl, "#f08-baby", K.grav - 0.05, 0.4);
        R.fadeIn(tl, "#f08-push", K.emp, 0.2);
        tl.fromTo("#f08-push", { x: -10 }, { x: 10, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.emp);
        brag(K.emp, 1);
        // 2 diabetes
        R.pop(tl, "#f08-c2", K.diab - 0.25, 0.4);
        R.pop(tl, "#f08-g2", K.diab - 0.15, 0.4);
        R.pop(tl, "#f08-nv2", K.sens - 0.4, 0.35);
        tl.to("#f08-nv2i", { stroke: "#FF5A4E", duration: 0.2, yoyo: true, repeat: 3 }, K.sens);
        R.shake(tl, "#f08-nv2", K.sens, 0.5, 3);
        // 3 em pé / cirurgias
        R.pop(tl, "#f08-c3", K.tempo - 0.45, 0.4);
        R.fadeIn(tl, "#f08-g3", K.tempo - 0.35, 0.3);
        tl.to("#f08-hand", { rotation: 1080, svgOrigin: "60 300", duration: 1.4, ease: "power1.inOut" }, K.tempo);
        tl.fromTo("#f08-stand", { x: 0 }, { x: 4, duration: 0.25, yoyo: true, repeat: 5 }, K.tempo + 0.3);
        R.pop(tl, "#f08-surg", K.cir - 0.1, 0.4);
        brag(K.vir, 3);
        // Culpado... mas com estilo!
        R.fadeIn(tl, "#f08-shades", K.c0 - 0.2, 0.2);
        tl.fromTo("#f08-shades", { y: -80 }, { y: 0, duration: 0.35, ease: "bounce.out" }, K.c0 - 0.2);
        R.pop(tl, "#f08-say", K.c0, 0.35);
        R.pose(tl, c, K.c0, 0.3, { armF: -160, armB: 40 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.roupa - 0.2, vol: 0.35 },
        { name: "click", t: k.cinto + 0.3, vol: 0.4 },
        { name: "pop", t: k.ganho - 0.2, vol: 0.35 },
        { name: "pop", t: k.diab - 0.2, vol: 0.35 },
        { name: "glitch-1", t: k.sens, vol: 0.2, dur: 0.4 },
        { name: "pop", t: k.tempo - 0.4, vol: 0.35 },
        { name: "sparkle", t: k.c0 - 0.1, vol: 0.4 },
      ],
    };
  },
};
