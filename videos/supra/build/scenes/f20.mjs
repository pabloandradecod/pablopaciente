// F20 — Degrau 2: elevação "lata cheia" — garrafinhas na mão, braços na diagonal à frente, polegar pra cima, até a altura do ombro, 3 s sobe / 3 s desce; quadro "visto de frente" em V; Supra: "meu exercício favorito!"
export default {
  speakers: { supra: "f20s" },
  extra: 0.6,
  build(ctx) {
    const { C, human, supra, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), elev: w(0, "elevação"), lata: w(0, "lata"), diag: w(0, "diagonal"), pol: w(0, "polegar"), alt: w(0, "altura"),
      sub: w(0, "subindo"), desc: w(0, "descendo"), dev: w(0, "devagar"), quer: w(0, "queridinho"),
      s0: lines[1].start, s1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const sk = "#E3A47E";
    const bottle = `<g><rect x="-11" y="-30" width="22" height="46" rx="8" fill="#9FD8F0" stroke="${C.ink}" stroke-width="4"/><rect x="-6" y="-40" width="12" height="12" rx="3" fill="${C.blue}" stroke="${C.ink}" stroke-width="3"/></g>`;
    const inHand = `<g transform="rotate(90)">${bottle}</g>`;
    let cida = human("f20c", "cida");
    cida = cida.replace('<g id="f20c-handF">', `<g id="f20c-handF">${inHand}`).replace('<g id="f20c-handB">', `<g id="f20c-handB">${inHand}`);
    const farm = (id, side) => `<g transform="translate(${side * 54},-96)"><g id="${id}"><line x1="0" y1="0" x2="0" y2="120" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="120" stroke="${sk}" stroke-width="18" stroke-linecap="round"/><g transform="translate(0,132)">${bottle}</g></g></g>`;
    return {
      k,
      css: `
        #f20-head { left:110px; top:60px; font-size:64px; }
        #f20-head span { color:#1E9C72; }
        #f20-front { left:1240px; top:160px; width:420px; padding:14px 18px; text-align:center; }
        #f20-front .t { font-size:24px; }
        #f20-tip { left:110px; top:170px; padding:10px 20px; font-size:30px; }
        #f20-tip b { color:#1E9C72; }
        #f20-tempo { left:1240px; top:640px; width:420px; padding:14px 18px; text-align:center; }
        #f20-tempo .a { font-size:24px; } #f20-tempo .b { font-size:44px; }
        #f20-tempo .b span { color:#1E9C72; }
        #f20-fav { left:110px; top:470px; padding:12px 24px; font-size:40px; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="#E9E4F5"/>
      <rect y="860" width="1920" height="220" fill="#B8B0CC"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <line id="f20-sh" x1="560" y1="440" x2="1080" y2="440" stroke="#1E9C72" stroke-width="5" stroke-dasharray="14 10" opacity="0"/>
      <g id="f20-c-wrap"><g transform="translate(700,628) scale(1.3)">${cida}</g></g>
      <g id="f20-s-wrap" opacity="0"><g transform="translate(330,860) scale(0.8)">${supra("f20s")}</g></g>
      <g id="f20-heart" opacity="0"><g transform="translate(160,60)"><path d="M330 560 C300 520 250 540 260 580 C270 610 330 640 330 640 C330 640 390 610 400 580 C410 540 360 520 330 560 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></g></g>
    </svg>
    <div id="f20-head" class="abs title">Degrau 2: <span>LATA CHEIA</span></div>
    <div id="f20-tip" class="abs card label" style="opacity:0">diagonal · <b>polegar pra cima</b> · até a <b>altura do ombro</b></div>
    <div id="f20-front" class="abs card" style="opacity:0">
      <svg width="380" height="330" viewBox="-190 -210 380 330">
        <line x1="-180" y1="-96" x2="180" y2="-96" stroke="${C.good}" stroke-width="4" stroke-dasharray="10 8"/>
        <path d="M0 -100 L-150 -200 M0 -100 L150 -200" stroke="#BFD7DE" stroke-width="4" stroke-dasharray="6 8"/>
        <rect x="-46" y="-110" width="92" height="150" rx="24" fill="#B07ED8" ${st}/>
        <circle cx="0" cy="-146" r="36" fill="${sk}" ${st}/>
        ${farm("f20-aL", -1)}${farm("f20-aR", 1)}
        <rect x="-40" y="40" width="34" height="70" rx="10" fill="#3E5A8A" ${st}/><rect x="6" y="40" width="34" height="70" rx="10" fill="#3E5A8A" ${st}/>
      </svg>
      <div class="t label">visto de frente: braços em <b style="color:#1E9C72">V</b>, polegar pra cima</div>
    </div>
    <div id="f20-tempo" class="abs card" style="opacity:0"><div class="a label">devagar</div><div class="b title"><span id="f20-up">3 s sobe</span> · <span id="f20-dn">3 s desce</span></div></div>
    <div id="f20-fav" class="abs card title" style="opacity:0">exercício favorito do Supra!</div>`,
      js: function (tl, K, R) {
        const c = "f20c";
        R.setPose(tl, c, 0, { shF: 10, elF: -6, shB: 10, elB: -6 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        R.pop(tl, "#f20-front", K.lata - 0.2, 0.45, 0.6);
        tl.set("#f20-aL", { rotation: 0, svgOrigin: "0 0" }, 0);
        tl.set("#f20-aR", { rotation: 0, svgOrigin: "0 0" }, 0);
        R.pop(tl, "#f20-tip", K.diag - 0.1, 0.4);
        tl.to("#f20-sh", { opacity: 1, duration: 0.3 }, K.alt);
        R.pop(tl, "#f20-tempo", K.sub - 0.2, 0.4);
        // repetições lentas: 1.4 s sobe, 1.4 s desce
        const t0 = K.diag + 0.1, sp = 3.0, reps = Math.max(2, Math.floor((K.s1 + 0.3 - t0) / sp));
        for (let i = 0; i < reps; i++) {
          const t = t0 + i * sp;
          tl.to("#f20-aL", { rotation: 100, svgOrigin: "0 0", duration: 1.4, ease: "sine.inOut" }, t);
          tl.to("#f20-aR", { rotation: -100, svgOrigin: "0 0", duration: 1.4, ease: "sine.inOut" }, t);
          tl.to("#f20-aL, #f20-aR", { rotation: 0, svgOrigin: "0 0", duration: 1.4, ease: "sine.inOut" }, t + 1.5);
          R.pose(tl, c, t, 1.4, { shF: -85, elF: 0, shB: -85, elB: 0 }, "sine.inOut");
          R.pose(tl, c, t + 1.5, 1.4, { shF: 10, elF: -6, shB: 10, elB: -6 }, "sine.inOut");
          tl.to("#f20-up", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1 }, t);
          tl.to("#f20-dn", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1 }, t + 1.5);
        }
        R.face(tl, c, K.dev, { eyes: "happy", mouth: "smile" });
        // Supra: exercício favorito
        R.setPose(tl, "f20s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f20s", 0, { eyes: "happy", mouth: "grin" });
        R.fadeOut(tl, "#f20-tip", K.quer - 0.4);
        tl.set("#f20-s-wrap", { opacity: 1 }, K.quer - 0.3);
        tl.fromTo("#f20-s-wrap", { y: 400 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.quer - 0.3);
        R.pop(tl, "#f20-fav", K.quer + 0.3, 0.4);
        R.pose(tl, "f20s", K.s0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.pop(tl, "#f20-heart", K.s0 + 0.3, 0.4);
        tl.to("#f20-heart", { scale: 1.15, svgOrigin: "490 640", duration: 0.25, yoyo: true, repeat: 3 }, K.s0 + 0.7);
      },
      sfx: [
        { name: "pop", t: k.lata - 0.2, vol: 0.35 },
        { name: "pop", t: k.diag - 0.1, vol: 0.3 },
        { name: "click-soft", t: k.sub - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.quer - 0.3, vol: 0.35 },
        { name: "sparkle", t: k.s0 + 0.3, vol: 0.35 },
      ],
    };
  },
};
