// F21 — Exercício 4: sentar e levantar da cadeira com joelhos alinhados (Dona Cida)
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      q: w(0, "Quatro"), sent: w(0, "sentar"), joel: w(0, "joelhos"), dent: w(0, "dentro"), com: w(0, "Comece"), alta: w(0, "alta"), tres: w(0, "Três"),
    };
    // repetições: levanta (0.8 s), fica em pé (0.5 s), senta (0.8 s), pausa
    const reps = [];
    for (let t = k.sent + 0.2; t < ctx.dur - 2.2; t += 2.6) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.joel, vol: 0.35 }, { name: "error", t: k.dent + 0.2, vol: 0.3 }, { name: "pop", t: k.tres, vol: 0.4 }];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const legs = (bad) => bad
      ? `<path d="M60 20 L92 110 L70 200" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/><path d="M60 20 L92 110 L70 200" fill="none" stroke="#3E5A8A" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M150 20 L118 110 L140 200" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/><path d="M150 20 L118 110 L140 200" fill="none" stroke="#3E5A8A" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M60 20 L60 110 L60 200" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round"/><path d="M60 20 L60 110 L60 200" fill="none" stroke="#3E5A8A" stroke-width="22" stroke-linecap="round"/>
         <path d="M150 20 L150 110 L150 200" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round"/><path d="M150 20 L150 110 L150 200" fill="none" stroke="#3E5A8A" stroke-width="22" stroke-linecap="round"/>`;
    return {
      k,
      sfx,
      css: `
        #f21-head { left:110px; top:80px; font-size:80px; }
        #f21-head span { color:${C.good}; }
        #f21-card { left:1340px; top:150px; width:480px; padding:26px 30px; }
        #f21-card .t { font-size:40px; }
        #f21-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f21-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f21-ok { left:1380px; top:690px; width:440px; padding:14px 18px; font-size:27px; background:${C.good}; text-align:center; }
        #f21-ok b { font-size:31px; display:block; }
        #f21-front { left:880px; top:200px; width:400px; padding:16px; text-align:center; }
        #f21-front .cap { font-size:24px; margin-top:4px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="850" fill="${C.wall}"/>
      <rect y="850" width="1920" height="230" fill="${C.floor}"/>
      <line x1="0" y1="850" x2="1920" y2="850" stroke="${C.ink}" stroke-width="7"/>
      <!-- cadeira -->
      <rect x="470" y="470" width="34" height="380" rx="10" fill="#B07A4A" ${st}/>
      <rect x="470" y="712" width="210" height="34" rx="10" fill="#B07A4A" ${st}/>
      <rect x="650" y="740" width="26" height="110" rx="8" fill="#B07A4A" ${st}/>
      <rect x="470" y="430" width="34" height="60" rx="10" fill="#C99A62" ${st}/>
      <g id="f21-cw"><g transform="translate(600,700) scale(1.4)">${human("f21c", "cida")}</g></g>
    </svg>
    <div id="f21-head" class="abs title">4. <span>SENTAR E LEVANTAR</span></div>
    <div id="f21-front" class="abs card" style="opacity:0">
      <svg width="370" height="230" viewBox="0 0 370 230">
        <g id="f21-good"><g transform="translate(0,10)">${legs(false)}</g><path d="M230 80 L260 110 L320 40" fill="none" stroke="${C.good}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g id="f21-bad" opacity="0"><g transform="translate(0,10)">${legs(true)}</g><path d="M240 50 L320 130 M320 50 L240 130" stroke="${C.pain}" stroke-width="16" stroke-linecap="round"/></g>
      </svg>
      <div id="f21-cap1" class="cap label">visto de frente: joelhos <b style="color:#1E9C72">alinhados</b></div>
      <div id="f21-cap2" class="cap label" style="display:none"></div>
    </div>
    <div id="f21-card" class="abs card">
      <div class="t title">Sentar e levantar</div>
      <div class="row label" id="f21-r0"><div class="dot"></div>Da cadeira, devagar</div>
      <div class="row label" id="f21-r1"><div class="dot"></div>Joelhos alinhados</div>
      <div class="row label" id="f21-r2"><div class="dot"></div>Cadeira mais alta no começo</div>
      <div class="row label" id="f21-r3"><div class="dot" style="background:${C.sun}"></div><b>3 x 8 a 10</b></div>
    </div>
    <div id="f21-ok" class="abs card label">Dor até 5/10 e passa no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const c = "f21c";
        const SIT = { hipB: -88, hipF: -92, knB: 88, knF: 92, anB: 0, anF: 0, torso: -2, neck: 0, shF: -30, elF: -50, shB: -20, elB: -50 };
        R.setPose(tl, c, 0, SIT);
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f21-card", 0.2, 0.55, 400);
        R.pop(tl, "#f21-ok", 0.6, 0.4);
        [K.sent, K.joel, K.com, K.tres].forEach((t, i) => tl.fromTo(`#f21-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // visto de frente: alinhado x caindo pra dentro
        R.pop(tl, "#f21-front", K.joel - 0.1, 0.4);
        tl.set("#f21-bad", { opacity: 1 }, K.dent - 0.1);
        tl.set("#f21-good", { opacity: 0 }, K.dent - 0.1);
        R.shake(tl, "#f21-bad", K.dent, 0.3, 4);
        tl.set("#f21-bad", { opacity: 0 }, K.com - 0.1);
        tl.set("#f21-good", { opacity: 1 }, K.com - 0.1);
        // cadeira mais alta: almofada sobe no assento
        // repetições
        K.reps.forEach((t) => {
          R.pose(tl, c, t, 0.35, { torso: 34, neck: -20, shF: -70, elF: -10, shB: -60, elB: -10 }, "power2.inOut");
          R.pose(tl, c, t + 0.35, 0.5, { hipB: 0, hipF: 0, knB: 0, knF: 0, torso: 0, neck: 0, shF: -10, elF: -20, shB: 5, elB: -10 }, "power2.out");
          tl.to("#f21-cw", { x: 123, y: -123, duration: 0.5, ease: "power2.out" }, t + 0.35);
          R.face(tl, c, t + 0.4, { eyes: "happy", mouth: "smile" });
          R.pose(tl, c, t + 1.35, 0.3, { torso: 30, neck: -16, shF: -70, elF: -10, shB: -60, elB: -10, hipB: -40, hipF: -40, knB: 40, knF: 40 }, "power2.in");
          tl.to("#f21-cw", { x: 60, y: -60, duration: 0.3, ease: "power2.in" }, t + 1.35);
          R.pose(tl, c, t + 1.65, 0.4, SIT, "power2.out");
          tl.to("#f21-cw", { x: 0, y: 0, duration: 0.4, ease: "power2.out" }, t + 1.65);
          R.face(tl, c, t + 1.7, { eyes: "normal", mouth: "smile" });
        });
      },
    };
  },
};
