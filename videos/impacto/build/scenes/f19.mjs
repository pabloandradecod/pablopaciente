// F19 — Degrau 1: isometria de rotação externa — cotovelo dobrado, mão empurra a parede (com toalha) "girando pra fora"; 30 s x 5; dor diminui
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), iso: w(0, "isometria"), cot: w(0, "Cotovelo"), dob: w(0, "dobrado"), emp: w(0, "empurra"), par: w(0, "parede"),
      gir: w(0, "girar"), fora: w(0, "fora"), seg: w(0, "segura"), tri: w(0, "trinta"), cinco: w(0, "cinco"), vez: w(0, "vezes"), cost: w(0, "Costuma"), ali: w(0, "aliviar"), dor: w(0, "dor"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f19-head { left:110px; top:60px; font-size:72px; }
        #f19-head span { color:#1E9C72; }
        #f19-top { left:110px; top:180px; width:470px; padding:16px 20px; text-align:center; }
        #f19-top .t { font-size:26px; margin-top:4px; }
        #f19-card { left:1300px; top:150px; width:540px; padding:24px 30px; }
        #f19-card .t { font-size:38px; }
        #f19-card .row { font-size:28px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:1300px; top:700px; width:540px; padding:14px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f19-stop b { font-size:30px; display:block; }
        #f19-timer { left:1050px; top:190px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f19-reps { left:1080px; top:370px; padding:8px 18px; font-size:40px; }
        #f19-pain { left:990px; top:480px; width:300px; padding:14px 18px; }
        #f19-pain .l { font-size:24px; }
        #f19-relief { left:1010px; top:640px; padding:10px 20px; font-size:32px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="220" width="320" height="640" fill="#CFE0E6" stroke="${C.ink}" stroke-width="7"/>
      <text x="780" y="206" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="#7A9AA6">PAREDE (do lado)</text>
      <g id="f19-z-wrap"><g transform="translate(760,600) scale(1.3)">${human("f19z", "ze")}
        <rect id="f19-towel" x="74" y="-82" width="30" height="40" rx="8" fill="#FF8A7A" stroke="${C.ink}" stroke-width="4" opacity="0"/>
        <g id="f19-glow" opacity="0"><circle cx="6" cy="-112" r="26" fill="${C.pain}" opacity="0.35"/><circle cx="6" cy="-112" r="11" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
      </g></g>
    </svg>
    <div id="f19-head" class="abs title">Degrau 1: <span>ISOMETRIA</span></div>
    <div id="f19-top" class="abs card" style="opacity:0">
      <svg width="420" height="300" viewBox="-200 -190 420 300">
        <line x1="150" y1="-180" x2="150" y2="100" stroke="#9AB4BD" stroke-width="26"/>
        <line x1="150" y1="-180" x2="150" y2="100" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8"/>
        <ellipse cx="0" cy="20" rx="100" ry="44" fill="${C.blue}" ${st}/>
        <circle cx="0" cy="14" r="38" fill="${C.skinB}" ${st}/>
        <path d="M-12 -18 L0 -36 L12 -18 Z" fill="${C.skinB}" ${st}/>
        <circle cx="96" cy="20" r="16" fill="${C.blue}" ${st}/>
        <g id="f19-fa"><line x1="96" y1="20" x2="96" y2="-110" stroke="${C.ink}" stroke-width="34" stroke-linecap="round"/><line x1="96" y1="20" x2="96" y2="-110" stroke="${C.skinB}" stroke-width="22" stroke-linecap="round"/><circle cx="96" cy="-118" r="18" fill="${C.skinB}" ${st}/></g>
        <rect id="f19-ttop" x="116" y="-140" width="22" height="44" rx="6" fill="#FF8A7A" stroke="${C.ink}" stroke-width="4" opacity="0"/>
        <path id="f19-arr" d="M60 -150 Q110 -176 150 -150" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" opacity="0"/>
        <path id="f19-arrh" d="M140 -164 L156 -148 L136 -138 Z" fill="${C.pain}" opacity="0"/>
        <text x="-150" y="-150" font-family="Montserrat" font-weight="900" font-size="20" fill="${C.ink}">frente ↑</text>
      </svg>
      <div class="t label">visto de cima: a mão empurra <b style="color:${C.pain}">pra fora</b></div>
    </div>
    <div id="f19-timer" class="abs title" style="opacity:0">${["0s", "10s", "20s", "30s"].map((s, i) => `<span id="f19-s${i}" style="position:absolute;opacity:${i ? 0 : 1}">${s}</span>`).join("")}</div>
    <div id="f19-reps" class="abs card title" style="opacity:0">x 5</div>
    <div id="f19-pain" class="abs card" style="opacity:0">
      <div class="l label">DOR NO OMBRO</div>
      <svg width="264" height="40" viewBox="0 0 264 40"><rect x="2" y="6" width="260" height="28" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect id="f19-pbar" x="6" y="10" width="200" height="20" rx="10" fill="${C.pain}"/></svg>
    </div>
    <div id="f19-relief" class="abs card label" style="opacity:0">costuma aliviar!</div>
    <div id="f19-card" class="abs card" style="opacity:0">
      <div class="t title">Empurra e segura</div>
      <div class="row label"><span class="dot"></span>De lado para a parede</div>
      <div class="row label"><span class="dot"></span>Cotovelo dobrado, colado no corpo</div>
      <div class="row label"><span class="dot"></span>Empurra "girando pra fora"</div>
      <div class="row label"><span class="dot"></span>30 s · 5 vezes</div>
    </div>
    <div id="f19-stop" class="abs card label">Dor até 3/10 e passou no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const z = "f19z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        R.pop(tl, "#f19-card", K.iso - 0.2, 0.45, 0.6);
        // cotovelo dobrado a 90°
        R.pose(tl, z, K.cot, 0.4, { shF: 0, elF: -90 }, "power2.out");
        R.pop(tl, "#f19-top", K.dob - 0.2, 0.45, 0.6);
        tl.to("#f19-towel", { opacity: 1, duration: 0.2 }, K.emp);
        tl.to("#f19-ttop", { opacity: 1, duration: 0.2 }, K.emp);
        tl.to("#f19-fa", { rotation: 18, svgOrigin: "96 20", duration: 0.4, ease: "power2.out" }, K.emp);
        tl.to("#f19-arr, #f19-arrh", { opacity: 1, duration: 0.2 }, K.gir);
        R.face(tl, z, K.seg, { eyes: "normal", mouth: "flat" });
        // esforço parado (sem mexer)
        tl.fromTo("#f19-z-wrap", { x: -2 }, { x: 2, duration: 0.06, yoyo: true, repeat: 20, ease: "none" }, K.seg);
        tl.set("#f19-z-wrap", { x: 0 }, K.seg + 1.3);
        tl.fromTo("#f19-arr", { opacity: 1 }, { opacity: 0.3, duration: 0.25, yoyo: true, repeat: 7 }, K.seg);
        // cronômetro até 30
        R.pop(tl, "#f19-timer", K.tri - 0.3, 0.4);
        const span = Math.max(1.5, K.vez - K.tri);
        for (let i = 1; i < 4; i++) { const t = K.tri + (span * i) / 3; tl.set(`#f19-s${i - 1}`, { opacity: 0 }, t); tl.set(`#f19-s${i}`, { opacity: 1 }, t); }
        R.pop(tl, "#f19-reps", K.cinco - 0.1, 0.35);
        // dor diminui
        tl.set("#f19-glow", { opacity: 1 }, K.iso);
        R.pop(tl, "#f19-pain", K.cost - 0.4, 0.4);
        tl.to("#f19-pbar", { attr: { width: 50 }, fill: "#3DD9A4", duration: 0.9, ease: "power2.inOut" }, K.ali);
        tl.to("#f19-glow", { opacity: 0, duration: 0.6 }, K.ali + 0.3);
        R.pop(tl, "#f19-relief", K.dor, 0.4);
        R.face(tl, z, K.ali, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.iso - 0.2, vol: 0.35 },
        { name: "pop", t: k.dob - 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.emp, vol: 0.3 },
        { name: "typing", t: k.tri, vol: 0.25, dur: 1.5 },
        { name: "pop", t: k.cinco - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.dor, vol: 0.35 },
      ],
    };
  },
};
