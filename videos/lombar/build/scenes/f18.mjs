// F18 — Exercício 1: gato e camelo, de quatro apoios. Gato e camelo desenhados; a Vértebra confunde os bichos.
export default {
  speakers: { vertebra: "f18v" },
  extra: 0.6,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      um: w(0, "Um"), gato: w(0, "gato"), camelo: w(0, "camelo"), apoios: w(0, "apoios"), arr: w(0, "arredonda"), bravo: w(0, "bravo"),
      barriga: w(0, "barriga"), devagar: w(0, "devagar"), dez: w(0, "Dez"), forcar: w(0, "forçar"),
      v0: lines[1].start, v1: lines[1].end, miau: w(1, "Miau"), muu: w(1, "muuu"), cam2: w(1, "Camelo"),
    };
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f18-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f18-head { left:110px; top:80px; font-size:80px; }
        #f18-head span { color:${C.good}; }
        #f18-card { left:1300px; top:140px; width:520px; padding:26px 32px; }
        #f18-card .t { font-size:44px; }
        #f18-card .row { font-size:32px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f18-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f18-stop { left:1340px; top:720px; width:480px; padding:14px 18px; font-size:30px; text-align:center; line-height:1.25; }
        #f18-stop .ok { color:#1E9C72; } #f18-stop .no { color:#C9372A; }
        #f18-q { left:420px; top:560px; padding:10px 22px; font-size:40px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="716" width="800" height="36" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f18-zwrap"><g transform="translate(700,566) scale(1.5)">${human("f18z", "ze")}</g></g>
      <!-- curva da coluna: arco para cima (gato) / para baixo (camelo) -->
      <path id="f18-arc" d="M560 380 Q720 300 880 380" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-dasharray="22 14" opacity="0"/>
      <!-- gato bravo -->
      <g id="f18-cat" opacity="0"><g transform="translate(250,330)">
        <path d="M-80 60 Q-80 -40 0 -46 Q80 -40 80 60" fill="#3B3B46" ${st}/>
        <rect x="-76" y="40" width="16" height="40" rx="6" fill="#3B3B46" ${st}/><rect x="60" y="40" width="16" height="40" rx="6" fill="#3B3B46" ${st}/>
        <circle cx="96" cy="0" r="30" fill="#3B3B46" ${st}/><path d="M80 -24 L86 -48 L98 -28 M104 -28 L118 -46 L118 -18" fill="#3B3B46" ${st}/>
        <circle cx="90" cy="-4" r="5" fill="${C.sun}"/><circle cx="106" cy="-4" r="5" fill="${C.sun}"/>
        <path d="M-80 50 Q-120 20 -110 -30" fill="none" ${st} stroke-width="12"/>
        <path d="M-50 -50 L-46 -66 M-10 -58 L-10 -74 M30 -54 L34 -70" ${st}/>
      </g></g>
      <!-- camelo -->
      <g id="f18-camel" opacity="0"><g transform="translate(250,330)">
        <path d="M-90 30 Q-90 -10 -60 -10 Q-46 -60 -20 -10 Q0 -60 26 -10 Q60 -10 70 20 Z" fill="#D9A866" ${st}/>
        <path d="M60 10 Q90 -20 96 -60 Q112 -72 124 -60 Q126 -46 112 -46 Q104 -10 76 30" fill="#D9A866" ${st}/>
        <circle cx="114" cy="-62" r="4" fill="${C.ink}"/>
        <path d="M-74 30 L-74 90 M-40 30 L-40 90 M20 30 L20 90 M50 30 L50 90" ${st} stroke-width="12"/>
      </g></g>
      <g id="f18-vwrap"><g transform="translate(230,742) scale(0.85)">${vertebra("f18v")}</g></g>
    </svg>
    <div id="f18-head" class="abs title">1. <span>GATO E CAMELO</span></div>
    <div id="f18-q" class="abs card title" style="opacity:0">? ? ?</div>
    <div id="f18-card" class="abs card">
      <div class="t title">Gato e camelo</div>
      ${row(0, "De quatro apoios")}
      ${row(1, "Arredonda as costas (gato)")}
      ${row(2, "Deixa a barriga descer (camelo)")}
      ${row(3, "Devagar, sem forçar")}
      ${row(4, "<b>10 repetições</b>", C.sun)}
    </div>
    <div id="f18-stop" class="abs card label">Desconforto leve: <b class="ok">OK</b><br>Dor forte: <b class="no">diminui</b></div>`,
      js: function (tl, K, R) {
        const z = "f18z";
        const base = { root: 90, torso: -15, neck: -25, shB: -75, shF: -75, elB: 0, elF: 0, hipB: -90, hipF: -90, knB: 90, knF: 90, anB: 90, anF: 90 };
        // gato: costas arredondam, cabeça desce; camelo: barriga desce, cabeça sobe
        const cat = { torso: -21, shB: -69, shF: -69, neck: 10 };
        const camel = { torso: -9, shB: -81, shF: -81, neck: -55 };
        const mid = { torso: -15, shB: -75, shF: -75, neck: -25 };
        R.setPose(tl, z, 0, base);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f18-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f18-card", 0.2, 0.55, 400);
        R.pop(tl, "#f18-stop", 0.6, 0.4);
        tl.set("#f18-vwrap", { opacity: 0 }, 0);
        [K.apoios, K.arr, K.barriga, K.devagar, K.dez].forEach((t, i) => tl.fromTo(`#f18-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // gato desenhado aparece em "gato", o camelo em "camelo"
        R.pop(tl, "#f18-cat", K.gato - 0.1, 0.4);
        tl.to("#f18-cat", { opacity: 0, duration: 0.2 }, K.camelo - 0.15);
        R.pop(tl, "#f18-camel", K.camelo - 0.1, 0.4);
        tl.to("#f18-camel", { opacity: 0, duration: 0.2 }, K.apoios);
        // rep 1: arredonda (gato bravo)
        tl.set("#f18-arc", { opacity: 1, attr: { d: "M560 380 Q720 300 880 380" } }, K.arr);
        R.pose(tl, z, K.arr, 0.9, cat);
        R.face(tl, z, K.arr + 0.2, { eyes: "closed", mouth: "flat" });
        R.pop(tl, "#f18-cat", K.bravo - 0.1, 0.35);
        tl.to("#f18-cat", { opacity: 0, duration: 0.2 }, K.barriga - 0.2);
        // rep 1: barriga desce (camelo)
        tl.to("#f18-arc", { attr: { d: "M560 380 Q720 450 880 380" }, duration: 0.9, ease: "power2.inOut" }, K.barriga);
        R.pose(tl, z, K.barriga, 0.9, camel);
        R.face(tl, z, K.barriga + 0.2, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f18-camel", K.barriga, 0.35);
        tl.to("#f18-camel", { opacity: 0, duration: 0.2 }, K.dez - 0.2);
        // repetições seguintes, devagar (finitas)
        let t = K.devagar + 0.6, up = true;
        while (t + 1.0 < K.dur - 0.4) {
          R.pose(tl, z, t, 0.95, up ? cat : camel);
          tl.to("#f18-arc", { attr: { d: up ? "M560 380 Q720 300 880 380" : "M560 380 Q720 450 880 380" }, duration: 0.95, ease: "power2.inOut" }, t);
          t += 1.1; up = !up;
        }
        R.pose(tl, z, Math.max(t, K.dur - 1.2), 0.6, mid);
        // a Vértebra confunde os bichos
        tl.fromTo("#f18-vwrap", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.v0 - 0.5);
        R.face(tl, "f18v", K.miau, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f18v", K.miau, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.face(tl, "f18v", K.muu, { eyes: "wide" });
        R.pose(tl, "f18v", K.muu, 0.3, { armF: -160, armB: 20 }, "back.out(2)");
        R.pop(tl, "#f18-q", K.cam2 - 0.1, 0.4);
        tl.to("#f18-q", { rotation: -6, duration: 0.15, yoyo: true, repeat: 3 }, K.cam2 + 0.3);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "pop", t: k.gato - 0.1, vol: 0.35 },
        { name: "pop", t: k.camelo - 0.1, vol: 0.35 },
        { name: "pop", t: k.dez, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.5, vol: 0.4 },
        { name: "pop", t: k.cam2 - 0.1, vol: 0.4 },
      ],
    };
  },
};
