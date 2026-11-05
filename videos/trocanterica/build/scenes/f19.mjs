// F19 — Exercício 2: isometria deitada com faixa nos joelhos, empurrando pra fora (30–45 s x 5)
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      dois: w(0, "Dois"), iso: w(0, "isometria"), dei: w(0, "Deitada"), fx: w(0, "faixa"), emp: w(0, "empurra"), seg: w(0, "segura"),
      tri: w(0, "trinta"), cinco: w(0, "cinco"), ali: w(0, "aliviar"),
    };
    // empurrões: longo do "empurra" até depois de "trinta", e outro no "aliviar"
    k.sq = [[k.emp, Math.max(2.2, k.tri - k.emp + 0.8)], [k.ali - 0.3, 1.6]];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, ...k.sq.map(([t]) => ({ name: "pop", t: t + 0.1, vol: 0.3 })), { name: "sparkle", t: k.ali, vol: 0.35 }];
    return {
      k,
      css: `
        #f19-head { left:110px; top:80px; font-size:72px; }
        #f19-head span { color:${C.good}; }
        #f19-card { left:1300px; top:150px; width:540px; padding:26px 32px; }
        #f19-card .t { font-size:40px; }
        #f19-card .row { font-size:29px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:1320px; top:690px; width:520px; padding:14px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f19-stop b { font-size:30px; display:block; }
        #f19-inset { left:840px; top:60px; width:420px; padding:10px 16px 14px; }
        #f19-inset .cap { font-size:20px; text-align:center; opacity:0.75; }
        #f19-inset .bar-l { font-size:19px; display:flex; justify-content:space-between; margin-top:4px; }
        #f19-timer { left:690px; top:230px; width:130px; height:130px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:30px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
        #f19-relief { left:300px; top:330px; padding:10px 22px; font-size:34px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(820,622) scale(1.5)">${human("f19c", "cida")}</g>
      <g id="f19-band"><rect x="884" y="470" width="50" height="84" rx="10" fill="none" stroke="${C.pain}" stroke-width="12" transform="rotate(-24 909 512)"/></g>
    </svg>
    <div id="f19-head" class="abs title">2. <span>ISOMETRIA</span></div>
    <div id="f19-inset" class="abs card" style="opacity:0">
      <svg width="388" height="200" viewBox="0 0 480 260">
        <rect x="70" y="232" width="340" height="22" rx="10" fill="#3E5A8A" ${st} stroke-width="5"/>
        <g id="f19-thL"><path d="M190 240 L210 70" stroke="${C.ink}" stroke-width="58" stroke-linecap="round"/><path d="M190 240 L210 70" stroke="#3E5A8A" stroke-width="44" stroke-linecap="round"/></g>
        <g id="f19-thR"><path d="M290 240 L270 70" stroke="${C.ink}" stroke-width="58" stroke-linecap="round"/><path d="M290 240 L270 70" stroke="#3E5A8A" stroke-width="44" stroke-linecap="round"/></g>
        <rect id="f19-iband" x="170" y="88" width="140" height="30" rx="12" fill="none" stroke="${C.pain}" stroke-width="12"/>
        <path id="f19-arL" d="M150 100 L100 100 M112 88 L100 100 L112 112" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <path id="f19-arR" d="M330 100 L380 100 M368 88 L380 100 L368 112" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      </svg>
      <div class="cap label">visto de frente: joelhos empurram a faixa pra fora, sem mexer</div>
      <svg width="388" height="34" viewBox="0 0 480 44">
        <rect x="10" y="8" width="460" height="28" rx="14" fill="#fff" ${st} stroke-width="5"/>
        <rect x="194" y="8" width="138" height="28" fill="#CFF5E6"/>
        <rect id="f19-fill" x="12" y="10" width="456" height="24" rx="12" fill="${C.good}"/>
        <rect x="10" y="8" width="460" height="28" rx="14" fill="none" ${st} stroke-width="5"/>
      </svg>
      <div class="bar-l label"><span>força</span><span style="color:#1E9C72">moderada</span><span>máxima</span></div>
    </div>
    <div id="f19-timer" class="abs title" style="opacity:0">30 a<br>45 s</div>
    <div id="f19-relief" class="abs card label" style="opacity:0">costuma até aliviar!</div>
    <div id="f19-card" class="abs card">
      <div class="t title">Isometria com faixa</div>
      <div class="row label" id="f19-r0"><div class="dot"></div>Deitada, joelhos dobrados</div>
      <div class="row label" id="f19-r1"><div class="dot"></div>Faixa elástica nos joelhos</div>
      <div class="row label" id="f19-r2"><div class="dot"></div>Empurra pra fora e segura</div>
      <div class="row label" id="f19-r3"><div class="dot" style="background:${C.sun}"></div><b>30 a 45 s · 5 vezes</b></div>
    </div>
    <div id="f19-stop" class="abs card label">Dor até 5/10 e passa no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const c = "f19c";
        R.setPose(tl, c, 0, { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f19-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f19-card", 0.2, 0.55, 400);
        R.pop(tl, "#f19-stop", 0.6, 0.4);
        R.pop(tl, "#f19-inset", Math.max(0.3, K.dei - 0.3), 0.45, 0.6);
        tl.set("#f19-fill", { attr: { width: 0 } }, 0);
        tl.set("#f19-r0, #f19-r1, #f19-r2, #f19-r3", { opacity: 0.25 }, 0);
        [K.dei, K.fx, K.emp, K.tri].forEach((t, i) => tl.fromTo(`#f19-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        R.pop(tl, "#f19-band", K.fx - 0.1, 0.35);
        R.pop(tl, "#f19-timer", K.tri - 0.1, 0.4);
        K.sq.forEach(([t, hold]) => {
          tl.to("#f19-thL", { rotation: -4, svgOrigin: "190 240", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-thR", { rotation: 4, svgOrigin: "290 240", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-iband", { scaleX: 1.12, svgOrigin: "240 103", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-arL, #f19-arR", { opacity: 1, duration: 0.15 }, t);
          tl.to("#f19-fill", { attr: { width: 270 }, duration: 0.35, ease: "power2.out" }, t);
          R.face(tl, c, t, { eyes: "closed", mouth: "flat" });
          const e = t + hold;
          tl.to("#f19-thL, #f19-thR", { rotation: 0, duration: 0.3, ease: "power2.inOut" }, e);
          tl.to("#f19-iband", { scaleX: 1, svgOrigin: "240 103", duration: 0.3, ease: "back.out(2)" }, e);
          tl.to("#f19-arL, #f19-arR", { opacity: 0, duration: 0.15 }, e);
          tl.to("#f19-fill", { attr: { width: 0 }, duration: 0.3 }, e);
          R.face(tl, c, e, { eyes: "happy", mouth: "smile" });
        });
        R.pop(tl, "#f19-relief", K.ali - 0.1, 0.4);
      },
      sfx,
    };
  },
};
