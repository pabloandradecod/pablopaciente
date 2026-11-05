// F18 — Degrau 1: isometria — cadeirinha na parede (~60°), 30–45 s x 5; costuma aliviar a dor na hora; Molão relaxa
export default {
  speakers: { molao: "f18m" },
  extra: 0.4,
  build(ctx) {
    const { C, human, molao, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), iso: w(0, "isometria"), cad: w(0, "cadeirinha"), par: w(0, "parede"), parado: w(0, "parado"),
      tri: w(0, "trinta"), cinco: w(0, "cinco"), dim: w(0, "diminuir"), dor: w(0, "dor"), hora: w(0, "hora"),
      m0: lines[1].start, m1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // joelho na cadeirinha: quadril (620,635) escala 1.3; coxa a 60° pra frente
    const KX = 620 + 76 * 1.3, KY = 635 + 44 * 1.3;
    k.kx = KX; k.ky = KY;
    return {
      k,
      css: `
        #f18-head { left:110px; top:70px; font-size:72px; }
        #f18-head span { color:#1E9C72; }
        #f18-card { left:1300px; top:150px; width:540px; padding:26px 32px; }
        #f18-card .t { font-size:40px; }
        #f18-card .row { font-size:29px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f18-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f18-stop { left:1320px; top:700px; width:520px; padding:14px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f18-stop b { font-size:30px; display:block; }
        #f18-timer { left:880px; top:200px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f18-reps { left:1060px; top:240px; padding:8px 18px; font-size:40px; }
        #f18-pain { left:880px; top:420px; width:360px; padding:14px 18px; }
        #f18-pain .l { font-size:24px; }
        #f18-relief { left:880px; top:590px; padding:10px 20px; font-size:32px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="830" fill="${C.wall}"/>
      <rect y="830" width="1920" height="250" fill="${C.floor}"/><line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <rect x="470" y="120" width="80" height="710" fill="#BFD7DE" stroke="${C.ink}" stroke-width="7"/>
      <g id="f18-j-wrap"><g transform="translate(620,635) scale(1.3)">${human("f18j", "juninho")}</g></g>
      <g id="f18-prot" opacity="0">
        <path d="M${KX - 70} ${KY} A70 70 0 0 1 ${KX + 70} ${KY}" fill="#fff" fill-opacity="0.85" stroke="${C.ink}" stroke-width="5"/>
        <path d="M${KX} ${KY} L${KX - 60} ${KY - 35}" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>
        <path d="M${KX} ${KY} L${KX} ${KY - 70}" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>
        <text x="${KX + 18}" y="${KY - 22}" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">~60°</text>
      </g>
      <g id="f18-m-wrap" opacity="0"><g transform="translate(1110,800) scale(0.55)">${molao("f18m")}</g></g>
    </svg>
    <div id="f18-head" class="abs title">1. <span>ISOMETRIA</span></div>
    <div id="f18-timer" class="abs title" style="opacity:0">${["0s", "15s", "30s", "45s"].map((s, i) => `<span id="f18-s${i}" style="position:absolute;opacity:${i ? 0 : 1}">${s}</span>`).join("")}</div>
    <div id="f18-reps" class="abs card title" style="opacity:0">x 5</div>
    <div id="f18-pain" class="abs card" style="opacity:0">
      <div class="l label">DOR NO JOELHO</div>
      <svg width="324" height="40" viewBox="0 0 324 40"><rect x="2" y="6" width="320" height="28" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect id="f18-pbar" x="6" y="10" width="250" height="20" rx="10" fill="${C.pain}"/></svg>
    </div>
    <div id="f18-relief" class="abs card label" style="opacity:0">alivia na hora!</div>
    <div id="f18-card" class="abs card" style="opacity:0">
      <div class="t title">Cadeirinha na parede</div>
      <div class="row label"><span class="dot"></span>Costas na parede, joelhos ~60°</div>
      <div class="row label"><span class="dot"></span>Segura parado</div>
      <div class="row label"><span class="dot"></span>30 a 45 s · 5 vezes</div>
      <div class="row label"><span class="dot"></span>Descanso de 2 min</div>
    </div>
    <div id="f18-stop" class="abs card label">Dor até 3/10 e normal no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const j = "f18j";
        R.setPose(tl, j, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0.4, K.dur);
        tl.fromTo("#f18-j-wrap", { y: -80 }, { y: -80, duration: 0.01 }, 0);
        R.pop(tl, "#f18-card", K.iso - 0.2, 0.45, 0.6);
        // desce na cadeirinha
        tl.to("#f18-j-wrap", { y: 0, duration: 0.6, ease: "power2.inOut" }, K.cad);
        R.pose(tl, j, K.cad, 0.6, { hipF: -60, knF: 60, hipB: -60, knB: 60, torso: 0, shF: -70, elF: -30, shB: -60, elB: -30 });
        R.face(tl, j, K.cad + 0.6, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f18-prot", K.par, 0.4);
        // tremidinha de esforço, parado
        tl.fromTo("#f18-j-wrap", { x: -2 }, { x: 2, duration: 0.06, yoyo: true, repeat: 30, ease: "none" }, K.parado);
        tl.set("#f18-j-wrap", { x: 0 }, K.parado + 1.9);
        // cronômetro até 45
        R.pop(tl, "#f18-timer", K.tri - 0.3, 0.4);
        const span = Math.max(1.5, K.dim - K.tri);
        for (let i = 1; i < 4; i++) { const t = K.tri + (span * i) / 3; tl.set(`#f18-s${i - 1}`, { opacity: 0 }, t); tl.set(`#f18-s${i}`, { opacity: 1 }, t); }
        R.pop(tl, "#f18-reps", K.cinco - 0.1, 0.35);
        // a dor diminui
        R.pop(tl, "#f18-pain", K.dim - 0.2, 0.4);
        tl.to("#f18-pbar", { attr: { width: 60 }, fill: "#3DD9A4", duration: 0.9, ease: "power2.inOut" }, K.dor);
        R.pop(tl, "#f18-relief", K.hora - 0.1, 0.4);
        R.face(tl, j, K.hora, { eyes: "happy", mouth: "smile" });
        // Molão relaxando
        tl.set("#f18-m-wrap", { opacity: 1 }, K.m0 - 0.4);
        tl.fromTo("#f18-m-wrap", { y: 300 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.m0 - 0.4);
        R.face(tl, "f18m", 0, { eyes: "closed", mouth: "smile" });
        R.setPose(tl, "f18m", 0, { armF: -150, armB: 150 });
        R.fadeOut(tl, "#f18-relief", K.m0 - 0.4, 0.2);
        tl.fromTo("#f18m-coil", { scaleY: 1 }, { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.m0);
        tl.fromTo("#f18m-top", { y: 0 }, { y: 17, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.m0);
        R.face(tl, "f18m", K.m1 - 0.2, { eyes: "happy" });
      },
      sfx: [
        { name: "pop", t: k.iso - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.cad, vol: 0.35 },
        { name: "pop", t: k.par, vol: 0.3 },
        { name: "typing", t: k.tri, vol: 0.25, dur: 1.5 },
        { name: "pop", t: k.cinco - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.hora - 0.1, vol: 0.35 },
        { name: "pop", t: k.m0 - 0.4, vol: 0.35 },
      ],
    };
  },
};
