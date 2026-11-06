// F21 — Degrau 3: elevação na diagonal (em V, polegar pra cima, até a altura do ombro, com garrafinha) + remada com elástico (escápulas se aproximam); "escápula firme = telhado com mais espaço"; Seu Acrômio feliz
export default {
  speakers: { acromio: "f21a" },
  extra: 0.6,
  build(ctx) {
    const { C, human, acromio, supra, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), elev: w(0, "elevação"), diag: w(0, "diagonal"), pol: w(0, "polegar"), alt: w(0, "altura"), garr: w(0, "garrafinha"),
      rem: w(0, "remada"), ela: w(0, "elástico"), apr: w(0, "aproximando"), esc: w(0, "escápula", 0), esc2: w(0, "escápula", 1), espaco: w(0, "espaço"),
      a0: lines[1].start, a1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const bottle = `<g><rect x="-11" y="-30" width="22" height="46" rx="8" fill="#9FD8F0" stroke="${C.ink}" stroke-width="4"/><rect x="-6" y="-40" width="12" height="12" rx="3" fill="${C.blue}" stroke="${C.ink}" stroke-width="3"/></g>`;
    const farm = (id, side) => `<g transform="translate(${side * 54},-96)"><g id="${id}"><line x1="0" y1="0" x2="0" y2="120" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="120" stroke="${C.skinB}" stroke-width="18" stroke-linecap="round"/><g transform="translate(0,132)">${bottle}</g></g></g>`;
    return {
      k,
      css: `
        #f21-head { left:110px; top:60px; font-size:64px; }
        #f21-head span { color:#1E9C72; }
        #f21-front { left:1180px; top:160px; width:420px; padding:14px 18px; text-align:center; }
        #f21-front .t { font-size:24px; }
        #f21-back { left:1180px; top:160px; width:420px; padding:14px 18px; text-align:center; }
        #f21-back .t { font-size:24px; }
        #f21-tip { left:110px; top:170px; padding:10px 20px; font-size:30px; }
        #f21-sign { left:340px; top:200px; padding:16px 30px; font-size:46px; background:${C.sun}; }
        #f21-sign b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f21-door" opacity="0"><rect x="1100" y="300" width="40" height="560" fill="#B07A4A" stroke="${C.ink}" stroke-width="6"/><circle cx="1120" cy="520" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/></g>
      <g id="f21-z-wrap"><g transform="translate(560,600) scale(1.3)">${human("f21z", "ze")}
        <g id="f21-bot" opacity="0" transform="translate(140,-150)">${bottle}</g>
        <path id="f21-band" d="M136 -115 L431 -62" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round" opacity="0"/>
      </g></g>
      <!-- Seu Acrômio com espaço sobrando -->
      <g id="f21-roof" opacity="0">
        <circle cx="960" cy="1180" r="300" fill="${C.bone}" stroke="${C.ink}" stroke-width="7"/>
        <g transform="translate(960,560) scale(1.1)">${acromio("f21a")}</g>
        <g transform="translate(960,890) scale(0.7)">${supra("f21s")}</g>
        <path id="f21-gap" d="M820 640 L820 680 M1100 640 L1100 680" stroke="${C.good}" stroke-width="8" stroke-linecap="round"/>
      </g>
    </svg>
    <div id="f21-head" class="abs title">Degrau 3: <span>ELEVAÇÃO E ESCÁPULA</span></div>
    <div id="f21-tip" class="abs card label" style="opacity:0">polegar <b style="color:#1E9C72">pra cima</b> · até a <b style="color:#1E9C72">altura do ombro</b></div>
    <div id="f21-front" class="abs card" style="opacity:0">
      <svg width="380" height="330" viewBox="-190 -210 380 330">
        <line x1="-180" y1="-96" x2="180" y2="-96" stroke="${C.good}" stroke-width="4" stroke-dasharray="10 8"/>
        <path d="M0 -100 L-150 -200 M0 -100 L150 -200" stroke="#BFD7DE" stroke-width="4" stroke-dasharray="6 8"/>
        <rect x="-46" y="-110" width="92" height="150" rx="24" fill="${C.blue}" ${st}/>
        <circle cx="0" cy="-146" r="36" fill="${C.skinB}" ${st}/>
        ${farm("f21-aL", -1)}${farm("f21-aR", 1)}
        <rect x="-40" y="40" width="34" height="70" rx="10" fill="#7A5634" ${st}/><rect x="6" y="40" width="34" height="70" rx="10" fill="#7A5634" ${st}/>
      </svg>
      <div class="t label">visto de frente: braços em <b style="color:#1E9C72">V</b></div>
    </div>
    <div id="f21-back" class="abs card" style="opacity:0">
      <svg width="380" height="300" viewBox="-190 -150 380 300">
        <rect x="-130" y="-120" width="260" height="250" rx="50" fill="${C.blue}" ${st}/>
        <line x1="0" y1="-110" x2="0" y2="120" stroke="${C.ink}" stroke-width="5" stroke-dasharray="10 8"/>
        <g id="f21-scL"><path d="M-110 -80 L-40 -80 L-60 60 Z" fill="${C.bone}" ${st}/></g>
        <g id="f21-scR"><path d="M110 -80 L40 -80 L60 60 Z" fill="${C.bone}" ${st}/></g>
        <path id="f21-arrL" d="M-120 0 L-80 0 M-92 -12 L-78 0 L-92 12" stroke="${C.pain}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0"/>
        <path id="f21-arrR" d="M120 0 L80 0 M92 -12 L78 0 L92 12" stroke="${C.pain}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0"/>
      </svg>
      <div class="t label">visto de costas: as <b style="color:#1E9C72">escápulas se aproximam</b></div>
    </div>
    <div id="f21-sign" class="abs card title" style="opacity:0">escápula firme = <b>telhado com mais espaço</b></div>`,
      js: function (tl, K, R) {
        const z = "f21z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        // elevação em V (vista de frente) + vista de lado
        R.pop(tl, "#f21-front", K.elev - 0.2, 0.45, 0.6);
        tl.set("#f21-aL", { rotation: 0, svgOrigin: "0 0" }, 0);
        tl.set("#f21-aR", { rotation: 0, svgOrigin: "0 0" }, 0);
        const t0 = K.diag, reps = Math.max(2, Math.floor((K.rem - 0.6 - t0) / 1.6));
        for (let i = 0; i < reps; i++) {
          const t = t0 + i * 1.6;
          tl.to("#f21-aL", { rotation: 88, svgOrigin: "0 0", duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f21-aR", { rotation: -88, svgOrigin: "0 0", duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f21-aL", { rotation: 0, svgOrigin: "0 0", duration: 0.7, ease: "sine.inOut" }, t + 0.8);
          tl.to("#f21-aR", { rotation: 0, svgOrigin: "0 0", duration: 0.7, ease: "sine.inOut" }, t + 0.8);
          R.pose(tl, z, t, 0.7, { shF: -88, elF: 0 }, "sine.inOut");
          tl.to("#f21-bot", { opacity: 1, duration: 0.2 }, t + 0.5);
          tl.to("#f21-bot", { opacity: 0, duration: 0.15 }, t + 0.8);
          R.pose(tl, z, t + 0.8, 0.7, { shF: 10, elF: -10 }, "sine.inOut");
        }
        R.pop(tl, "#f21-tip", K.pol - 0.1, 0.4);
        R.face(tl, z, K.alt, { eyes: "normal", mouth: "flat" });
        // remada com elástico
        R.fadeOut(tl, "#f21-front, #f21-tip", K.rem - 0.5);
        tl.to("#f21-door", { opacity: 1, duration: 0.3 }, K.rem - 0.5);
        R.pose(tl, z, K.rem - 0.4, 0.4, { shF: -80, elF: 0 });
        tl.to("#f21-band", { opacity: 1, duration: 0.2 }, K.rem);
        R.pop(tl, "#f21-back", K.ela - 0.1, 0.45, 0.6);
        const r0 = K.ela + 0.2, rr = Math.max(2, Math.floor((K.esc2 - 0.4 - r0) / 1.6));
        for (let i = 0; i < rr; i++) {
          const t = r0 + i * 1.6;
          R.pose(tl, z, t, 0.7, { shF: 30, elF: -110 }, "sine.inOut");
          tl.to("#f21-band", { attr: { d: "M35 -68 L431 -62" }, duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f21-scL", { x: 24, duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f21-scR", { x: -24, duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f21-arrL, #f21-arrR", { opacity: 1, duration: 0.2 }, t);
          R.pose(tl, z, t + 0.8, 0.7, { shF: -80, elF: 0 }, "sine.inOut");
          tl.to("#f21-band", { attr: { d: "M136 -115 L431 -62" }, duration: 0.7, ease: "sine.inOut" }, t + 0.8);
          tl.to("#f21-scL, #f21-scR", { x: 0, duration: 0.7, ease: "sine.inOut" }, t + 0.8);
          tl.to("#f21-arrL, #f21-arrR", { opacity: 0, duration: 0.2 }, t + 0.8);
        }
        // escápula firme = telhado com mais espaço
        tl.to("#f21-z-wrap, #f21-door, #f21-band, #f21-back", { opacity: 0, duration: 0.3 }, K.esc2 - 0.4);
        R.pop(tl, "#f21-sign", K.esc2 - 0.2, 0.45, 0.6);
        tl.to("#f21-roof", { opacity: 1, duration: 0.35 }, K.esc2);
        R.face(tl, "f21s", 0, { eyes: "happy", mouth: "smile" });
        R.setPose(tl, "f21s", 0, { armF: -40, armB: 40 });
        R.face(tl, "f21a", 0, { eyes: "normal", mouth: "flat" });
        tl.fromTo("#f21-gap", { opacity: 0 }, { opacity: 1, duration: 0.25, yoyo: true, repeat: 3 }, K.espaco);
        // Seu Acrômio feliz
        R.face(tl, "f21a", K.a0 - 0.2, { eyes: "happy", mouth: "grin" });
        tl.to("#f21a-brows", { y: -10, duration: 0.25 }, K.a0 - 0.2);
        R.pose(tl, "f21a", K.a0, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.pose(tl, "f21s", K.a0 + 0.3, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
      },
      sfx: [
        { name: "pop", t: k.elev - 0.2, vol: 0.35 },
        { name: "pop", t: k.pol - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.rem - 0.5, vol: 0.3 },
        { name: "pop", t: k.ela - 0.1, vol: 0.3 },
        { name: "pop", t: k.esc2 - 0.2, vol: 0.35 },
        { name: "sparkle", t: k.espaco, vol: 0.35 },
        { name: "chime", t: k.a0, vol: 0.3 },
      ],
    };
  },
};
