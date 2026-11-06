// F18 — Exercício 2: isometria da coxa — sentado, toalha enrolada embaixo do joelho, aperta pra baixo e segura 10 s x 10
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      dois: w(0, "Dois"), iso: w(0, "isometria"), sent: w(0, "Sentado"), toa: w(0, "toalha"), aperta: w(0, "aperta"), seg: w(0, "segura"),
      dez: w(0, "dez"), dez2: w(0, "Dez", 1), vez: w(0, "vezes"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // Seu Zé sentado no colchonete: quadril (560,770) escala 1.3; pernas esticadas pra frente
    const HX = 560, HY = 770, KX = HX + 8 * 1.3 + 88 * 1.3, KY = HY;
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
        #f18-timer { left:880px; top:230px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:54px; display:flex; align-items:center; justify-content:center; }
        #f18-reps { left:1060px; top:270px; padding:8px 18px; font-size:40px; }
        #f18-lbl { left:800px; top:560px; padding:8px 18px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="830" fill="${C.wall}"/>
      <rect y="830" width="1920" height="250" fill="${C.floor}"/><line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="812" width="640" height="22" rx="10" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/>
      <g id="f18-towel"><g transform="translate(${KX},${KY + 30})"><g id="f18-towel-in"><ellipse cx="0" cy="0" rx="46" ry="28" fill="#FFC94A" ${st}/><path d="M-30 -6 Q0 6 30 -6 M-30 8 Q0 20 30 8" fill="none" stroke="#E0A92E" stroke-width="5"/></g></g></g>
      <g id="f18-z-wrap"><g transform="translate(${HX},${HY}) scale(1.3)">${human("f18z", "ze")}</g></g>
      <g id="f18-quad" opacity="0"><ellipse cx="${(HX + KX) / 2 + 6}" cy="${HY - 18}" rx="70" ry="22" fill="${C.pain}" opacity="0.45"/></g>
      <g id="f18-arrow" opacity="0"><path d="M${KX} ${KY - 140} L${KX} ${KY - 50}" stroke="${C.pain}" stroke-width="14" stroke-linecap="round"/><path d="M${KX - 26} ${KY - 76} L${KX} ${KY - 46} L${KX + 26} ${KY - 76}" fill="none" stroke="${C.pain}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></g>
    </svg>
    <div id="f18-head" class="abs title">2. <span>ISOMETRIA DA COXA</span></div>
    <div id="f18-timer" class="abs title" style="opacity:0">${["0s", "5s", "10s"].map((s, i) => `<span id="f18-s${i}" style="position:absolute;opacity:${i ? 0 : 1}">${s}</span>`).join("")}</div>
    <div id="f18-reps" class="abs card title" style="opacity:0">x 10</div>
    <div id="f18-lbl" class="abs card label" style="opacity:0">toalha embaixo do joelho</div>
    <div id="f18-card" class="abs card" style="opacity:0">
      <div class="t title">Isometria da coxa</div>
      <div class="row label"><span class="dot"></span>Sentado, perna esticada</div>
      <div class="row label"><span class="dot"></span>Toalha enrolada embaixo do joelho</div>
      <div class="row label"><span class="dot"></span>Aperta o joelho pra baixo</div>
      <div class="row label"><span class="dot"></span>Segura 10 s · 10 vezes</div>
    </div>
    <div id="f18-stop" class="abs card label">Dor até 3/10 e normal no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const z = "f18z";
        // sentado no chão, pernas esticadas, mãos apoiadas atrás
        R.setPose(tl, z, 0, { hipF: -90, hipB: -90, knF: 0, knB: 0, anF: 0, anB: 0, torso: -8, shF: 30, elF: 0, shB: 40, elB: 0 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        tl.fromTo("#f18-towel", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0);
        R.pop(tl, "#f18-card", K.iso - 0.2, 0.45, 0.6);
        R.pop(tl, "#f18-lbl", K.toa - 0.1, 0.4);
        tl.fromTo("#f18-towel-in", { scale: 0.6, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.4, ease: "back.out(2)" }, K.toa);
        // aperta pra baixo: duas contrações
        const press = (t, d) => {
          tl.set("#f18-arrow", { opacity: 1 }, t);
          tl.to("#f18-towel-in", { scaleY: 0.7, svgOrigin: "0 28", duration: 0.25, ease: "power2.in" }, t);
          tl.to("#f18-quad", { opacity: 1, duration: 0.2 }, t);
          R.face(tl, z, t, { eyes: "closed", mouth: "flat" });
          tl.fromTo("#f18-z-wrap", { y: 0 }, { y: 4, duration: 0.07, yoyo: true, repeat: Math.max(2, Math.floor(d / 0.14) * 2 - 1), ease: "none" }, t + 0.25);
          tl.to("#f18-towel-in", { scaleY: 1, duration: 0.3, ease: "back.out(2)" }, t + d);
          tl.to("#f18-quad", { opacity: 0, duration: 0.2 }, t + d);
          tl.set("#f18-arrow", { opacity: 0 }, t + d);
          R.face(tl, z, t + d, { eyes: "happy", mouth: "smile" });
        };
        press(K.aperta, Math.max(1.2, K.dez2 - K.aperta - 0.4));
        // cronômetro 0 → 10 s
        R.pop(tl, "#f18-timer", K.seg - 0.3, 0.4);
        const span = Math.max(1.2, K.dez2 - K.seg - 0.2);
        for (let i = 1; i < 3; i++) { const t = K.seg + (span * i) / 2; tl.set(`#f18-s${i - 1}`, { opacity: 0 }, t); tl.set(`#f18-s${i}`, { opacity: 1 }, t); }
        R.pop(tl, "#f18-reps", K.dez2 - 0.1, 0.35);
        press(K.vez + 0.4, 1.0);
        R.fadeOut(tl, "#f18-lbl", K.vez, 0.25);
      },
      sfx: [
        { name: "pop", t: k.iso - 0.2, vol: 0.35 },
        { name: "pop", t: k.toa, vol: 0.3 },
        { name: "click-soft", t: k.aperta, vol: 0.35 },
        { name: "typing", t: k.seg, vol: 0.22, dur: 1.2 },
        { name: "pop", t: k.dez2 - 0.1, vol: 0.3 },
      ],
    };
  },
};
