// F21 — Exercício 3: alongamento do flexor do quadril (posição de cavaleiro)
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      tres: w(0, "Três"), along: w(0, "alongamento"), joelho: w(0, "joelho"), outro: w(0, "outro"), leva: w(0, "leva"),
      tronco: w(0, "tronco"), trinta: w(0, "Trinta"), vezes: w(0, "vezes"), forcar: w(0, "forçar"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.joelho, vol: 0.35 },
      { name: "pop", t: k.outro, vol: 0.35 },
      { name: "pop", t: k.trinta, vol: 0.35 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f21-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f21-head { left:110px; top:80px; font-size:76px; }
        #f21-head span { color:${C.good}; }
        #f21-card { left:1290px; top:150px; width:530px; padding:26px 32px; }
        #f21-card .t { font-size:40px; line-height:1.05; }
        #f21-card .row { font-size:31px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f21-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f21-stop { left:1360px; top:680px; width:460px; padding:14px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f21-stop b { font-size:34px; display:block; }
        #f21-timer { left:220px; top:330px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:52px; display:flex; align-items:center; justify-content:center; }
        #f21-tag { left:110px; top:540px; padding:10px 18px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="790" fill="${C.wall}"/>
      <rect x="0" y="790" width="1920" height="290" fill="${C.floor}"/>
      <line x1="0" y1="790" x2="1920" y2="790" stroke="${C.ink}" stroke-width="7"/>
      <rect x="440" y="770" width="760" height="34" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f21-glow" opacity="0"><ellipse cx="0" cy="0" rx="60" ry="80" fill="${C.sun}" opacity="0.6"/></g>
      <g id="f21-zw"><g transform="translate(800,620) scale(1.45)">${human("f21z", "ze")}</g></g>
      <g id="f21-arrow" opacity="0"><path d="M560 520 L700 520" stroke="${C.good}" stroke-width="16" stroke-linecap="round"/><path d="M670 492 L706 520 L670 548" fill="none" stroke="${C.good}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
    </svg>
    <div id="f21-head" class="abs title">3. <span>ALONGAMENTO</span></div>
    <div id="f21-timer" class="abs title" style="opacity:0">30 s</div>
    <div id="f21-tag" class="abs card label" style="opacity:0">frente do quadril alongando</div>
    <div id="f21-card" class="abs card">
      <div class="t title">Flexor do quadril (cavaleiro)</div>
      ${row(0, "Um joelho no chão")}
      ${row(1, "Outro pé à frente")}
      ${row(2, "Quadril pra frente, tronco reto")}
      ${row(3, "<b>30 s · 3 vezes</b>", C.sun)}
      ${row(4, "Sem forçar", C.pain)}
    </div>
    <div id="f21-stop" class="abs card label">Formigou mais forte?<b>Diminui a amplitude</b></div>`,
      js: function (tl, K, R) {
        const z = "f21z";
        // cavaleiro: perna de trás (B) com joelho no chão; perna da frente (F) com pé no chão
        const base = { torso: 0, neck: 0, shF: 10, elF: -110, shB: 15, elB: -100, hipF: -88, knF: 92, anF: -4, hipB: 22, knB: 68, anB: 0 };
        const fwd = { torso: -4, neck: 4, hipF: -70, knF: 104, anF: -30, hipB: 40, knB: 50, anB: 0 };
        R.setPose(tl, z, 0, base);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f21-card", 0.2, 0.55, 400);
        R.pop(tl, "#f21-stop", 0.6, 0.4);
        [K.joelho, K.outro, K.leva, K.trinta, K.forcar].forEach((t, i) => tl.fromTo(`#f21-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // quadril vai à frente, tronco reto
        R.pop(tl, "#f21-arrow", K.leva, 0.35);
        R.pose(tl, z, K.leva + 0.1, 0.9, fwd, "power2.inOut");
        tl.to("#f21-zw", { x: 30, duration: 0.9, ease: "power2.inOut" }, K.leva + 0.1);
        tl.set("#f21-glow", { x: 836, y: 640 }, 0);
        tl.to("#f21-glow", { opacity: 1, duration: 0.4 }, K.leva + 0.6);
        R.pop(tl, "#f21-tag", K.leva + 0.8, 0.4);
        R.face(tl, z, K.tronco, { eyes: "closed", mouth: "flat" });
        R.fadeOut(tl, "#f21-arrow", K.trinta - 0.3);
        // segura 30 s (timer)
        R.pop(tl, "#f21-timer", K.trinta, 0.4);
        tl.fromTo("#f21-timer", { rotation: -6 }, { rotation: 6, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.trinta + 0.4);
        // volta e repete (sem forçar)
        R.pose(tl, z, K.vezes, 0.6, base, "power2.inOut");
        tl.to("#f21-zw", { x: 0, duration: 0.6, ease: "power2.inOut" }, K.vezes);
        tl.to("#f21-glow", { opacity: 0, duration: 0.3 }, K.vezes);
        R.face(tl, z, K.vezes, { eyes: "normal", mouth: "smile" });
        R.pose(tl, z, K.forcar, 0.8, fwd, "power2.inOut");
        tl.to("#f21-zw", { x: 30, duration: 0.8, ease: "power2.inOut" }, K.forcar);
        tl.to("#f21-glow", { opacity: 1, duration: 0.3 }, K.forcar + 0.4);
        R.face(tl, z, K.forcar + 0.5, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
