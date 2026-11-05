// F21 — Exercício 5: descida controlada do degrau (3 s pra descer, joelho alinhado com o pé; X quando cai pra dentro)
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w, dur } = ctx;
    const k = {
      cinco: w(0, "Cinco"), cima: w(0, "cima"), desce: w(0, "desce"), tres: w(0, "três"), alin: w(0, "alinhado"), cair: w(0, "cair"), series: w(0, "Três", 1),
    };
    const reps = [];
    for (let t = k.desce; t < dur - 3.2; t += 4.2) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.alin, vol: 0.35 }, { name: "error", t: k.cair + 0.15, vol: 0.3 }, { name: "pop", t: k.series, vol: 0.4 }];
    reps.forEach((t) => sfx.push({ name: "click-soft", t: t + 3.0, vol: 0.35 }));
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    // perna vista de frente: coxa + canela com joelho em (kx, 130)
    const legF = (id, kx, ok) => `<g id="${id}"${ok ? "" : ' opacity="0"'}>
      <line x1="150" y1="20" x2="150" y2="250" stroke="${ok ? C.good : C.pain}" stroke-width="5" stroke-dasharray="12 10"/>
      <path d="M150 20 L${kx} 130 L150 236" fill="none" stroke="${C.ink}" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M150 20 L${kx} 130 L150 236" fill="none" stroke="#3E5A8A" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${kx}" cy="130" r="16" fill="${ok ? C.good : C.pain}" stroke="${C.ink}" stroke-width="5"/>
      <path d="M120 240 L190 240 Q200 256 186 262 L120 262 Z" fill="#8E2F45" ${st}/>
      ${ok ? `<path d="M240 40 L258 58 L290 20" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M244 24 L290 70 M290 24 L244 70" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`}
    </g>`;
    return {
      k,
      sfx,
      css: `
        #f21-head { left:110px; top:80px; font-size:72px; }
        #f21-head span { color:${C.good}; }
        #f21-card { left:1340px; top:150px; width:480px; padding:26px 30px; }
        #f21-card .t { font-size:40px; }
        #f21-card .row { font-size:29px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f21-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f21-ok { left:1380px; top:690px; width:440px; padding:14px 18px; font-size:28px; background:${C.sun}; text-align:center; }
        #f21-ok b { font-size:32px; display:block; color:${C.pain}; }
        #f21-front { left:120px; top:220px; width:330px; padding:14px; text-align:center; }
        #f21-front .cap { font-size:24px; }
        #f21-timer { left:1020px; top:240px; width:150px; height:150px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-direction:column; font-size:62px; color:#fff; background:${C.ink}; border:7px solid ${C.ink}; }
        #f21-timer small { font-size:22px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="850" fill="${C.wall}"/>
      <rect y="850" width="1920" height="230" fill="${C.floor}"/>
      <line x1="0" y1="850" x2="1920" y2="850" stroke="${C.ink}" stroke-width="7"/>
      <!-- degrau -->
      <rect x="560" y="700" width="340" height="150" rx="8" fill="#C99A62" ${st}/>
      <path d="M572 724 L888 724" stroke="#B07A4A" stroke-width="5"/>
      <g id="f21-cw"><g transform="translate(840,506) scale(1.1)">${human("f21c", "cida")}</g></g>
    </svg>
    <div id="f21-head" class="abs title">5. <span>DESCIDA DO DEGRAU</span></div>
    <div id="f21-front" class="abs card" style="opacity:0">
      <svg width="300" height="270" viewBox="0 0 300 270">${legF("f21-good", 150, true)}${legF("f21-bad", 108, false)}</svg>
      <div class="cap label">visto de frente: joelho <b style="color:#1E9C72">alinhado com o pé</b></div>
    </div>
    <div id="f21-timer" class="abs title" style="opacity:0"><span id="f21-t1">1</span><small>segundos</small></div>
    <div id="f21-card" class="abs card">
      <div class="t title">Descida do degrau</div>
      <div class="row label" id="f21-r0"><div class="dot"></div>Em cima de um degrau baixo</div>
      <div class="row label" id="f21-r1"><div class="dot"></div>Desce a outra perna em 3 s</div>
      <div class="row label" id="f21-r2"><div class="dot"></div>Joelho alinhado com o pé</div>
      <div class="row label" id="f21-r3"><div class="dot" style="background:${C.sun}"></div><b>3 x 8 a 10</b></div>
    </div>
    <div id="f21-ok" class="abs card label">Doeu na lateral do joelho?<b>DIMINUI</b></div>`,
      js: function (tl, K, R) {
        const c = "f21c";
        // em pé em cima do degrau, perna da frente solta pra fora da borda
        R.setPose(tl, c, 0, { shF: -40, elF: -30, shB: 20, elB: -20, hipF: -30, knF: 10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f21-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f21-card", 0.2, 0.55, 400);
        R.pop(tl, "#f21-ok", 0.6, 0.4);
        [K.cima, K.desce, K.alin, K.series].forEach((t, i) => tl.fromTo(`#f21-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // repetições: desce devagar (3 s) dobrando a perna de apoio, encosta o calcanhar e sobe
        K.reps.forEach((t) => {
          R.pose(tl, c, t, 3.0, { hipB: -45, knB: 80, hipF: -18, knF: 0, torso: 14, shF: -70 }, "sine.inOut");
          tl.to("#f21-cw", { y: 96, duration: 3.0, ease: "sine.inOut" }, t);
          R.face(tl, c, t + 0.4, { eyes: "normal", mouth: "flat" });
          R.pose(tl, c, t + 3.1, 0.8, { hipB: 0, knB: 0, hipF: -30, knF: 10, torso: 0, shF: -40 }, "power2.inOut");
          tl.to("#f21-cw", { y: 0, duration: 0.8, ease: "power2.inOut" }, t + 3.1);
          R.face(tl, c, t + 3.3, { eyes: "happy", mouth: "smile" });
        });
        // cronômetro 1-2-3 na primeira descida
        const t0 = K.reps[0];
        tl.set("#f21-timer", { opacity: 1 }, t0);
        R.pop(tl, "#f21-timer", t0, 0.3);
        ["2", "3"].forEach((n, i) => tl.set("#f21-t1", { textContent: n }, t0 + 1 + i));
        tl.set("#f21-t1", { textContent: "1" }, 0);
        R.fadeOut(tl, "#f21-timer", t0 + 3.2);
        // visto de frente: alinhado x caindo pra dentro
        R.pop(tl, "#f21-front", K.alin - 0.2, 0.4);
        tl.set("#f21-good", { opacity: 0 }, K.cair - 0.05);
        tl.set("#f21-bad", { opacity: 1 }, K.cair - 0.05);
        R.shake(tl, "#f21-front", K.cair, 0.3, 4);
        tl.set("#f21-good", { opacity: 1 }, K.series - 0.2);
        tl.set("#f21-bad", { opacity: 0 }, K.series - 0.2);
      },
    };
  },
};
