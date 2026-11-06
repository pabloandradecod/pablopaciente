// F19 — Degrau 1: isometria de abdução — de lado pra parede, cotovelo esticado, empurra o dorso da mão pra fora contra a parede; 30 s x 5; dor diminui; Supra "força sem movimento"
export default {
  extra: 1.4,
  build(ctx) {
    const { C, human, supra, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), iso: w(0, "isometria"), lado: w(0, "lado"), par: w(0, "parede"), emp: w(0, "empurra"), mao: w(0, "mão"),
      abrir: w(0, "abrir"), sem: w(0, "sem"), mex: w(0, "mexer"), seg: w(0, "Segura"), tri: w(0, "trinta"), cinco: w(0, "cinco"), vez: w(0, "vezes"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const sk = "#E3A47E";
    return {
      k,
      css: `
        #f19-head { left:110px; top:60px; font-size:72px; }
        #f19-head span { color:#1E9C72; }
        #f19-front { left:110px; top:180px; width:470px; padding:16px 20px; text-align:center; }
        #f19-front .t { font-size:26px; margin-top:4px; }
        #f19-card { left:1300px; top:150px; width:540px; padding:24px 30px; }
        #f19-card .t { font-size:38px; }
        #f19-card .row { font-size:28px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f19-timer { left:1050px; top:190px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f19-reps { left:1080px; top:370px; padding:8px 18px; font-size:40px; }
        #f19-pain { left:990px; top:480px; width:300px; padding:14px 18px; }
        #f19-pain .l { font-size:24px; }
        #f19-still { left:1380px; top:520px; padding:10px 20px; font-size:32px; }
        #f19-still b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="220" width="320" height="640" fill="#CFE0E6" stroke="${C.ink}" stroke-width="7"/>
      <text x="780" y="206" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="#7A9AA6">PAREDE (do lado)</text>
      <g id="f19-c-wrap"><g transform="translate(760,628) scale(1.3)">${human("f19c", "cida")}
        <g id="f19-glow" opacity="0"><circle cx="6" cy="-112" r="26" fill="${C.pain}" opacity="0.35"/><circle cx="6" cy="-112" r="11" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
      </g></g>
      <g id="f19-s-wrap" opacity="0"><g transform="translate(1540,860) scale(0.62)">${supra("f19s")}</g></g>
    </svg>
    <div id="f19-head" class="abs title">Degrau 1: <span>ISOMETRIA</span></div>
    <div id="f19-front" class="abs card" style="opacity:0">
      <svg width="420" height="300" viewBox="-200 -170 420 300">
        <rect x="150" y="-160" width="26" height="280" fill="#9AB4BD" stroke="${C.ink}" stroke-width="4"/>
        <circle cx="0" cy="-118" r="34" fill="${sk}" ${st}/>
        <path d="M-60 -76 Q0 -92 60 -76 L52 60 L-52 60 Z" fill="#B07ED8" ${st}/>
        <line x1="-62" y1="-70" x2="-80" y2="40" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><line x1="-62" y1="-70" x2="-80" y2="40" stroke="#B07ED8" stroke-width="18" stroke-linecap="round"/>
        <g id="f19-arm"><line x1="62" y1="-70" x2="80" y2="44" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><line x1="62" y1="-70" x2="80" y2="44" stroke="#B07ED8" stroke-width="18" stroke-linecap="round"/><circle cx="82" cy="58" r="17" fill="${sk}" ${st}/></g>
        <g id="f19-arr" opacity="0"><path d="M100 90 L140 90" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/><path d="M132 78 L148 90 L132 102 Z" fill="${C.pain}"/></g>
        <rect x="-50" y="60" width="40" height="60" fill="#3E5A8A" ${st}/><rect x="10" y="60" width="40" height="60" fill="#3E5A8A" ${st}/>
      </svg>
      <div class="t label">visto de frente: a mão empurra a parede <b style="color:${C.pain}">pra fora</b></div>
    </div>
    <div id="f19-timer" class="abs title" style="opacity:0">${["0s", "10s", "20s", "30s"].map((s, i) => `<span id="f19-s${i}" style="position:absolute;opacity:${i ? 0 : 1}">${s}</span>`).join("")}</div>
    <div id="f19-reps" class="abs card title" style="opacity:0">x 5</div>
    <div id="f19-pain" class="abs card" style="opacity:0">
      <div class="l label">DOR NO OMBRO</div>
      <svg width="264" height="40" viewBox="0 0 264 40"><rect x="2" y="6" width="260" height="28" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect id="f19-pbar" x="6" y="10" width="200" height="20" rx="10" fill="${C.pain}"/></svg>
    </div>
    <div id="f19-card" class="abs card" style="opacity:0">
      <div class="t title">Empurra e segura</div>
      <div class="row label"><span class="dot"></span>De lado para a parede</div>
      <div class="row label"><span class="dot"></span>Cotovelo esticado, braço ao lado do corpo</div>
      <div class="row label"><span class="dot"></span>Empurra como se fosse abrir o braço</div>
      <div class="row label"><span class="dot"></span>30 s · 5 vezes</div>
    </div>
    <div id="f19-still" class="abs card label" style="opacity:0">força <b>sem movimento</b></div>`,
      js: function (tl, K, R) {
        const c = "f19c";
        R.setPose(tl, c, 0, { shF: 4, elF: 0, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        R.pop(tl, "#f19-card", K.iso - 0.2, 0.45, 0.6);
        R.pop(tl, "#f19-front", K.lado - 0.2, 0.45, 0.6);
        // empurra pra fora, sem mexer
        tl.to("#f19-arm", { rotation: -4, svgOrigin: "62 -70", duration: 0.3, ease: "power2.out" }, K.emp);
        tl.to("#f19-arr", { opacity: 1, duration: 0.2 }, K.abrir - 0.2);
        tl.fromTo("#f19-arr", { opacity: 1 }, { opacity: 0.3, duration: 0.25, yoyo: true, repeat: 9 }, K.abrir);
        R.face(tl, c, K.sem, { eyes: "normal", mouth: "flat" });
        tl.fromTo("#f19-c-wrap", { x: -2 }, { x: 2, duration: 0.06, yoyo: true, repeat: 20, ease: "none" }, K.sem);
        tl.set("#f19-c-wrap", { x: 0 }, K.sem + 1.3);
        // Supra: força sem movimento
        R.setPose(tl, "f19s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f19s", 0, { eyes: "normal", mouth: "smile" });
        tl.set("#f19-s-wrap", { opacity: 1 }, K.mex - 0.3);
        tl.fromTo("#f19-s-wrap", { y: 400 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.mex - 0.3);
        R.pose(tl, "f19s", K.mex + 0.2, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        R.pop(tl, "#f19-still", K.mex + 0.2, 0.4);
        // cronômetro até 30
        R.pop(tl, "#f19-timer", K.tri - 0.3, 0.4);
        const span = Math.max(1.2, K.vez - K.tri);
        for (let i = 1; i < 4; i++) { const t = K.tri + (span * i) / 3; tl.set(`#f19-s${i - 1}`, { opacity: 0 }, t); tl.set(`#f19-s${i}`, { opacity: 1 }, t); }
        R.pop(tl, "#f19-reps", K.cinco - 0.1, 0.35);
        // dor diminui
        tl.set("#f19-glow", { opacity: 1 }, K.iso);
        R.pop(tl, "#f19-pain", K.seg - 0.2, 0.4);
        tl.to("#f19-pbar", { attr: { width: 50 }, fill: "#3DD9A4", duration: 0.9, ease: "power2.inOut" }, K.vez);
        tl.to("#f19-glow", { opacity: 0, duration: 0.6 }, K.vez + 0.3);
        R.face(tl, c, K.vez, { eyes: "happy", mouth: "smile" });
        R.face(tl, "f19s", K.vez, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "pop", t: k.iso - 0.2, vol: 0.35 },
        { name: "pop", t: k.lado - 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.mex - 0.3, vol: 0.35 },
        { name: "typing", t: k.tri, vol: 0.25, dur: 1.2 },
        { name: "pop", t: k.cinco - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.vez + 0.2, vol: 0.35 },
      ],
    };
  },
};
