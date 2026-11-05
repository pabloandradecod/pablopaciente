// F20 — Exercício 4: abdução deitada de lado (perna de cima esticada, um pouco pra trás, sem girar o quadril), 3 x 12 a 15; Vértebra: glúteo acordando
export default {
  speakers: { vertebra: "f20v" },
  tail: 1.0,
  build(ctx) {
    const { C, vertebra, w, lines } = ctx;
    const k = {
      quat: w(0, "Quatro"), abd: w(0, "abdução"), deit: w(0, "deitada"), lev: w(0, "Levanta"), estic: w(0, "esticada"), tras: w(0, "trás"),
      gir: w(0, "girar"), tres: w(0, "Três"), doze: w(0, "doze"), dev: w(0, "devagar"), v0: lines[1].start, v1: lines[1].end,
    };
    const reps = [];
    for (let t = k.lev; t < k.v1 - 0.4; t += 1.5) reps.push(+t.toFixed(3));
    k.reps = reps;
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f20-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    const limbs = (x1, y1, x2, y2, col, wd) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ink}" stroke-width="${wd + 14}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${wd}" stroke-linecap="round"/>`;
    return {
      k,
      css: `
        #f20-head { left:110px; top:70px; font-size:72px; }
        #f20-head span { color:${C.good}; }
        #f20-card { left:1300px; top:140px; width:520px; padding:24px 30px; }
        #f20-card .t { font-size:40px; line-height:1.05; }
        #f20-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f20-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f20-stop { left:110px; top:190px; width:460px; padding:14px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f20-stop b { font-size:34px; display:block; }
        #f20-view { left:110px; top:320px; padding:8px 16px; font-size:24px; }
        #f20-cnt { left:140px; top:400px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:40px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
        #f20-back { left:880px; top:330px; padding:8px 18px; font-size:28px; }
        #f20-nogir { left:300px; top:830px; padding:8px 18px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="760" fill="${C.wall}"/>
      <rect y="760" width="1920" height="320" fill="${C.floor}"/>
      <line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <rect x="220" y="736" width="1020" height="34" rx="16" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <!-- Dona Cida deitada de lado (vista de frente) -->
      <g id="f20-cida">
        ${limbs(720, 690, 1180, 706, "#3E5A8A", 40)}
        <ellipse cx="1190" cy="712" rx="34" ry="18" fill="#8E2F45" ${st}/>
        <path d="M330 690 Q330 640 400 632 L700 640 Q760 650 760 690 Q760 728 700 732 L400 736 Q330 734 330 690Z" fill="#B07ED8" ${st}/>
        ${limbs(420, 650, 520, 600, "#B07ED8", 22)}
        <circle cx="530" cy="596" r="16" fill="#E3A47E" stroke="${C.ink}" stroke-width="5"/>
        <circle cx="290" cy="670" r="58" fill="#E3A47E" ${st}/>
        <circle cx="250" cy="626" r="26" fill="#5A3A2A" ${st}/>
        <path d="M240 650 Q260 610 300 616 Q330 622 340 650" fill="#5A3A2A" stroke="${C.ink}" stroke-width="5"/>
        <g id="f20-eyes"><circle cx="300" cy="676" r="6" fill="${C.ink}"/><circle cx="322" cy="676" r="6" fill="${C.ink}"/></g>
        <path d="M296 700 Q310 708 324 700" stroke="${C.ink}" stroke-width="5" fill="none"/>
        <g id="f20-glute" opacity="0"><ellipse cx="720" cy="660" rx="70" ry="44" fill="${C.sun}" opacity="0.6"/></g>
        <g id="f20-leg">${limbs(720, 668, 1170, 676, "#4F6FA6", 40)}<ellipse cx="1180" cy="680" rx="34" ry="18" fill="#8E2F45" ${st}/></g>
        <line id="f20-pelvis" x1="700" y1="610" x2="700" y2="740" stroke="${C.good}" stroke-width="6" stroke-dasharray="10 8" opacity="0"/>
      </g>
      <path id="f20-arc" d="M1140 640 Q1180 520 1080 430" fill="none" stroke="${C.pain}" stroke-width="7" stroke-dasharray="12 10" opacity="0"/>
      <g id="f20-v-wrap" opacity="0"><g transform="translate(1640,830) scale(0.85)">${vertebra("f20v")}</g></g>
    </svg>
    <div id="f20-head" class="abs title">4. <span>ABDUÇÃO DE LADO</span></div>
    <div id="f20-view" class="abs card label" style="opacity:0">deitada de lado · vista de frente</div>
    <div id="f20-cnt" class="abs title" style="opacity:0">x 12</div>
    <div id="f20-back" class="abs card label" style="opacity:0">um pouquinho pra trás</div>
    <div id="f20-nogir" class="abs card label" style="opacity:0">quadril parado, sem girar</div>
    <div id="f20-card" class="abs card">
      <div class="t title">Abdução deitada de lado</div>
      ${row(0, "Perna de cima esticada")}
      ${row(1, "Um pouco pra trás")}
      ${row(2, "Sem girar o quadril")}
      ${row(3, "<b>3 x 12 a 15 · devagar</b>", C.sun)}
    </div>
    <div id="f20-stop" class="abs card label">Doeu na lateral do joelho?<b>Diminui</b></div>`,
      js: function (tl, K, R) {
        R.slideIn(tl, "#f20-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f20-card", 0.2, 0.55, 400);
        R.pop(tl, "#f20-stop", 0.6, 0.4);
        R.fadeIn(tl, "#f20-view", K.deit - 0.1, 0.3);
        [K.estic, K.tras, K.gir, K.tres].forEach((t, i) => tl.fromTo(`#f20-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // repetições lentas: perna sobe (gira em torno do quadril) e desce
        K.reps.forEach((t) => {
          tl.to("#f20-leg", { rotation: -24, svgOrigin: "720 668", duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f20-glute", { opacity: 1, duration: 0.3 }, t + 0.3);
          tl.to("#f20-leg", { rotation: 0, svgOrigin: "720 668", duration: 0.7, ease: "sine.inOut" }, t + 0.75);
          tl.to("#f20-glute", { opacity: 0.2, duration: 0.3 }, t + 1.0);
        });
        tl.set("#f20-arc", { opacity: 1 }, K.lev);
        R.draw(tl, "#f20-arc", K.lev, 0.6);
        R.pop(tl, "#f20-back", K.tras - 0.1, 0.35);
        tl.set("#f20-pelvis", { opacity: 1 }, K.gir - 0.1);
        R.pop(tl, "#f20-nogir", K.gir - 0.1, 0.35);
        R.pop(tl, "#f20-cnt", K.doze - 0.1, 0.35);
        // Vértebra: glúteo acordando
        tl.set("#f20-v-wrap", { opacity: 1 }, K.v0 - 0.5);
        tl.fromTo("#f20-v-wrap", { y: 300 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.v0 - 0.5);
        R.face(tl, "f20v", K.v0 - 0.5, { eyes: "happy" });
        R.pose(tl, "f20v", K.v0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f20-glute", { opacity: 1, scale: 1.2, svgOrigin: "720 660", duration: 0.3, yoyo: true, repeat: 3 }, K.v0);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "pop", t: k.tras - 0.1, vol: 0.3 },
        { name: "pop", t: k.gir - 0.1, vol: 0.3 },
        { name: "pop", t: k.doze - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.5, vol: 0.4 },
        { name: "sparkle", t: k.v0, vol: 0.35 },
      ],
    };
  },
};
