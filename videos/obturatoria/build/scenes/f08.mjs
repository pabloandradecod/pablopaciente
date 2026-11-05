// F8 — Causas: "QUEM APERTA O TURÃO?" — esporte com chute, cirurgia de pelve/quadril, parto, causas raras.
export default {
  speakers: { },
  build(ctx) {
    const { C, turao, smooth, w, MINT } = ctx;
    const tPts = [[150, 640], [210, 660], [270, 690], [320, 730], [350, 790]];
    const tSq = [[150, 640], [212, 664], [272, 698], [320, 736], [350, 790]];
    const k = {
      aperta: w(0, "aperta"), esp: w(0, "Esportes"), chute: w(0, "chute"), dir: w(0, "direção"), fut: w(0, "futebol"),
      cir: w(0, "Cirurgias"), prot: w(0, "prótese"),
      parto: w(0, "parto"), pos: w(0, "posição"), cab: w(0, "cabeça"),
      raras: w(0, "raras"), hern: w(0, "hérnia"), hema: w(0, "hematoma"), endo: w(0, "endometriose"), tum: w(0, "tumor"), frat: w(0, "fratura"),
      sq: smooth(tSq), rel: smooth(tPts),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const X = [470, 830, 1190, 1550];
    const card = (i, title) => `<div id="f08-c${i}" class="abs card" style="left:${X[i] - 160}px;top:200px;width:320px;height:470px;opacity:0">
        <div class="label" style="position:absolute;left:0;right:0;bottom:18px;text-align:center;font-size:30px;line-height:1.1">${title}</div></div>`;
    const chip = (i, txt) => `<div id="f08-r${i}" class="abs label" style="left:${X[3] - 130}px;top:${262 + i * 56}px;width:260px;padding:6px 10px;font-size:24px;text-align:center;background:#FFF0EC;border:4px solid ${C.ink};border-radius:14px;opacity:0">${txt}</div>`;
    return {
      k,
      css: `
        #f08-title { left:0; right:0; top:70px; text-align:center; font-size:76px; white-space:nowrap; }
        #f08-title b { color:#2E9E78; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f08-t-wrap" opacity="0">${turao("f08t", tPts, 26, 1.1)}</g>
    </svg>
    ${card(0, "Esporte com chute<br/><span style='font-size:24px'>e mudança de direção</span>")}
    ${card(1, "Cirurgia da pelve<br/>e do quadril")}
    ${card(2, "Parto")}
    ${card(3, "<span style='color:${C.pain}'>Mais raras</span>")}
    ${["hérnia obturatória", "hematoma", "endometriose", "tumor na pelve", "fratura da pelve"].map((t, i) => chip(i, t)).join("")}
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- 0: chuteira + bola + setas de direção -->
      <g transform="translate(${X[0]},0)"><g id="f08-g0" opacity="0">
        <g transform="translate(-30,420)"><g id="f08-boot"><path d="M-70 -40 L-10 -40 L-4 0 L70 10 Q86 14 82 34 L-74 34 Q-84 34 -82 20 Z" fill="${C.ink}" ${st(5)}/><path d="M-60 34 l0 12 M-20 34 l0 12 M20 34 l0 12 M60 34 l0 12" ${st(6)}/></g></g>
        <g transform="translate(80,330)"><g id="f08-ball"><circle r="34" fill="#fff" ${st(6)}/><path d="M0 -14 L13 -4 L8 12 L-8 12 L-13 -4 Z" fill="${C.ink}"/></g></g>
        <g id="f08-zz" opacity="0"><path d="M-110 520 L-50 480 L0 540 L60 490" fill="none" ${st(9)} stroke="#2E9E78"/><path d="M40 478 L64 488 L56 512" fill="none" ${st(8)} stroke="#2E9E78"/></g>
      </g></g>
      <!-- 1: prótese de quadril -->
      <g transform="translate(${X[1]},0)"><g id="f08-g1" opacity="0">
        <path d="M-90 300 Q-40 250 30 270 Q70 285 60 330 Q40 360 -20 350 Z" fill="${C.bone}" ${st(6)}/>
        <g id="f08-prot"><circle cx="20" cy="330" r="38" fill="#C9D3D8" ${st(6)}/><path d="M30 360 L52 420 L40 540 L70 540 L84 420 L60 350 Z" fill="#AEB9BF" ${st(6)}/></g>
        <path d="M-60 400 L-20 440 M-20 400 L-60 440" ${st(6)} stroke="${C.pain}" opacity="0"/>
      </g></g>
      <!-- 2: parto: pelve + seta + ícone de bebê/carrinho -->
      <g transform="translate(${X[2]},0)"><g id="f08-g2" opacity="0">
        <path d="M-110 280 Q-120 360 -60 400 Q-30 420 -20 460 L20 460 Q30 420 60 400 Q120 360 110 280 Q60 320 0 320 Q-60 320 -110 280 Z" fill="${C.bone}" ${st(6)}/>
        <circle cx="0" cy="380" r="32" fill="#FFF6E9" ${st(5)}/>
        <g id="f08-arrow" opacity="0"><path d="M0 250 L0 320" ${st(9)} stroke="${C.pain}"/><path d="M-18 302 L0 324 L18 302" fill="none" ${st(8)} stroke="${C.pain}"/></g>
        <g id="f08-pram" opacity="0" transform="translate(0,520)">
          <path d="M-60 -40 Q-60 -80 -10 -80 L-10 -40 Z" fill="${C.sky}" ${st(5)}/><rect x="-62" y="-42" width="120" height="44" rx="14" fill="${C.sky}" ${st(5)}/>
          <circle cx="-36" cy="16" r="12" fill="#fff" ${st(4)}/><circle cx="36" cy="16" r="12" fill="#fff" ${st(4)}/><path d="M58 -40 L80 -66" ${st(5)}/>
        </g>
      </g></g>
    </svg>
    <div id="f08-title" class="abs title" style="opacity:0">QUEM <b>APERTA</b> O TURÃO?</div>`,
      js: function (tl, K, R) {
        const t = "f08t";
        R.drop(tl, "#f08-title", 0.05, 0.7, -260);
        R.fadeIn(tl, "#f08-t-wrap", 0.2, 0.3);
        R.face(tl, t, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, t, 0.3, K.dur);
        const ouch = (time) => {
          R.face(tl, t, time, { eyes: "pain", mouth: "frown" });
          R.nerveTo(tl, t, time, 0.2, K.sq);
          R.shake(tl, "#f08t-face", time, 0.35, 4);
          R.nerveTo(tl, t, time + 0.7, 0.3, K.rel);
          R.face(tl, t, time + 0.9, { eyes: "normal", mouth: "flat" });
        };
        // 0 esporte
        R.pop(tl, "#f08-c0", K.esp - 0.25, 0.4);
        R.fadeIn(tl, "#f08-g0", K.esp - 0.15, 0.3);
        tl.fromTo("#f08-boot", { rotation: -30, svgOrigin: "0 0" }, { rotation: 15, svgOrigin: "0 0", duration: 0.25, ease: "power4.out" }, K.chute);
        tl.fromTo("#f08-ball", { x: 0, y: 0 }, { x: 60, y: -80, duration: 0.5, ease: "power2.out" }, K.chute + 0.15);
        R.fadeIn(tl, "#f08-zz", K.dir - 0.1, 0.2);
        R.draw(tl, "#f08-zz path", K.dir - 0.1, 0.5);
        ouch(K.fut);
        // 1 cirurgia
        R.pop(tl, "#f08-c1", K.cir - 0.25, 0.4);
        R.fadeIn(tl, "#f08-g1", K.cir - 0.15, 0.3);
        tl.fromTo("#f08-prot", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(2)" }, K.prot - 0.2);
        ouch(K.prot + 0.2);
        // 2 parto
        R.pop(tl, "#f08-c2", K.parto - 0.25, 0.4);
        R.fadeIn(tl, "#f08-g2", K.parto - 0.15, 0.3);
        R.pop(tl, "#f08-pram", K.pos, 0.4);
        R.fadeIn(tl, "#f08-arrow", K.cab - 0.2, 0.2);
        tl.fromTo("#f08-arrow", { y: -20 }, { y: 0, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.cab - 0.2);
        ouch(K.cab + 0.2);
        // 3 raras
        R.pop(tl, "#f08-c3", K.raras - 0.25, 0.4);
        [K.hern, K.hema, K.endo, K.tum, K.frat].forEach((time, i) => R.pop(tl, `#f08-r${i}`, time - 0.1, 0.35));
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.esp - 0.2, vol: 0.35 },
        { name: "click", t: k.chute, vol: 0.45 },
        { name: "pop", t: k.cir - 0.2, vol: 0.35 },
        { name: "pop", t: k.parto - 0.2, vol: 0.35 },
        { name: "pop", t: k.raras - 0.2, vol: 0.35 },
        ...[k.hern, k.hema, k.endo, k.tum, k.frat].map((t) => ({ name: "click-soft", t: t - 0.1, vol: 0.3 })),
      ],
    };
  },
};
