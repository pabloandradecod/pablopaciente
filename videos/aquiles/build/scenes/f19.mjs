// F19 — Degrau 1: isometria de panturrilha — sobe na ponta dos pés até a metade e segura, apoiado na parede; 30–45 s x 5; dor diminui
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), iso: w(0, "isometria"), sobe: w(0, "Sobe"), ponta: w(0, "ponta"), met: w(0, "metade"), seg: w(0, "segura"), apo: w(0, "apoiado"),
      par: w(0, "parede"), tri: w(0, "trinta"), cinco: w(0, "cinco", 1), vez: w(0, "vezes"), cost: w(0, "Costuma"), ali: w(0, "aliviar"), dor: w(0, "dor"),
    };
    return {
      k,
      css: `
        #f19-head { left:110px; top:60px; font-size:72px; }
        #f19-head span { color:#1E9C72; }
        #f19-card { left:1300px; top:150px; width:540px; padding:24px 30px; }
        #f19-card .t { font-size:38px; }
        #f19-card .row { font-size:28px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:1300px; top:700px; width:540px; padding:14px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f19-stop b { font-size:30px; display:block; }
        #f19-timer { left:960px; top:190px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f19-reps { left:1000px; top:370px; padding:8px 18px; font-size:40px; }
        #f19-pain { left:930px; top:480px; width:340px; padding:14px 18px; }
        #f19-pain .l { font-size:24px; }
        #f19-relief { left:950px; top:640px; padding:10px 20px; font-size:32px; color:#1E9C72; }
        #f19-half { left:110px; top:170px; padding:10px 18px; font-size:30px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <rect x="812" y="120" width="70" height="740" fill="#BFD7DE" stroke="${C.ink}" stroke-width="7"/>
      <g id="f19-p-wrap"><g transform="translate(620,608) scale(1.3)">${human("f19p", "pablo")}</g></g>
      <g id="f19-glow" opacity="0"><circle cx="600" cy="815" r="30" fill="${C.pain}" opacity="0.35"/><circle cx="600" cy="815" r="13" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
    </svg>
    <div id="f19-head" class="abs title">Degrau 1: <span>ISOMETRIA</span></div>
    <div id="f19-half" class="abs card label" style="opacity:0">sobe só até a <b style="color:#1E9C72">metade</b> e segura</div>
    <div id="f19-timer" class="abs title" style="opacity:0">${["0s", "15s", "30s", "45s"].map((s, i) => `<span id="f19-s${i}" style="position:absolute;opacity:${i ? 0 : 1}">${s}</span>`).join("")}</div>
    <div id="f19-reps" class="abs card title" style="opacity:0">x 5</div>
    <div id="f19-pain" class="abs card" style="opacity:0">
      <div class="l label">DOR NO TENDÃO</div>
      <svg width="304" height="40" viewBox="0 0 304 40"><rect x="2" y="6" width="300" height="28" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect id="f19-pbar" x="6" y="10" width="230" height="20" rx="10" fill="${C.pain}"/></svg>
    </div>
    <div id="f19-relief" class="abs card label" style="opacity:0">costuma aliviar!</div>
    <div id="f19-card" class="abs card" style="opacity:0">
      <div class="t title">Ponta dos pés parada</div>
      <div class="row label"><span class="dot"></span>Mãos apoiadas na parede</div>
      <div class="row label"><span class="dot"></span>Sobe até a metade e segura</div>
      <div class="row label"><span class="dot"></span>30 a 45 s · 5 vezes</div>
      <div class="row label"><span class="dot"></span>Descanso de 1 a 2 min</div>
    </div>
    <div id="f19-stop" class="abs card label">Dor até 3/10 e rigidez da manhã sem piorar:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const p = "f19p";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.4, K.dur);
        R.pop(tl, "#f19-card", K.iso - 0.2, 0.45, 0.6);
        // mãos na parede
        R.pose(tl, p, K.sobe - 0.3, 0.4, { shF: -78, elF: -8, shB: -72, elB: -12, torso: 6 });
        // sobe até a metade da ponta dos pés
        R.pose(tl, p, K.ponta, 0.6, { anF: 18, anB: 18 });
        R.move(tl, p, K.ponta, 0.6, 0, -15);
        tl.to("#f19-glow", { y: -20, duration: 0.6 }, K.ponta);
        R.pop(tl, "#f19-half", K.met - 0.2, 0.4);
        R.pop(tl, "#f19-glow", K.met, 0.3);
        R.face(tl, p, K.seg, { eyes: "normal", mouth: "flat" });
        // tremidinha de esforço, parado
        tl.fromTo("#f19-p-wrap", { x: -2 }, { x: 2, duration: 0.06, yoyo: true, repeat: 24, ease: "none" }, K.apo);
        tl.set("#f19-p-wrap", { x: 0 }, K.apo + 1.5);
        // cronômetro até 45
        R.pop(tl, "#f19-timer", K.tri - 0.3, 0.4);
        const span = Math.max(1.5, K.vez - K.tri);
        for (let i = 1; i < 4; i++) { const t = K.tri + (span * i) / 3; tl.set(`#f19-s${i - 1}`, { opacity: 0 }, t); tl.set(`#f19-s${i}`, { opacity: 1 }, t); }
        R.pop(tl, "#f19-reps", K.cinco - 0.1, 0.35);
        // a dor diminui
        R.pop(tl, "#f19-pain", K.cost - 0.4, 0.4);
        tl.to("#f19-pbar", { attr: { width: 60 }, fill: "#3DD9A4", duration: 0.9, ease: "power2.inOut" }, K.ali);
        tl.to("#f19-glow", { opacity: 0, duration: 0.6 }, K.ali + 0.3);
        R.pop(tl, "#f19-relief", K.dor, 0.4);
        R.face(tl, p, K.ali, { eyes: "happy", mouth: "smile" });
        // desce devagar
        R.pose(tl, p, K.dor + 0.6, 0.6, { anF: 0, anB: 0 });
        R.move(tl, p, K.dor + 0.6, 0.6, 0, 0);
      },
      sfx: [
        { name: "pop", t: k.iso - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.ponta, vol: 0.3 },
        { name: "pop", t: k.met - 0.2, vol: 0.3 },
        { name: "typing", t: k.tri, vol: 0.25, dur: 1.5 },
        { name: "pop", t: k.cinco - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.dor, vol: 0.35 },
      ],
    };
  },
};
