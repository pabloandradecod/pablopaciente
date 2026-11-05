// F22 — Exercício 3: liberação com bolinha de tênis (sentado no chão, rola na nádega)
export default {
  speakers: { piriforme: "f22m" },
  gaps: [0.35],
  extra: 0.8,
  build(ctx) {
    const { C, human, piriforme, w, lines } = ctx;
    const k = {
      tres: w(0, "Três"), bol: w(0, "bolinha"), senta: w(0, "Senta"), tenis: w(0, "tênis"), rola: w(0, "rola"), dev: w(0, "devagar"),
      um: w(0, "um"), min: w(0, "minutos"), desc: w(0, "Desconforto"), forte: w(0, "forte"),
      m0: lines[1].start, m1: lines[1].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.tenis, vol: 0.4 },
      { name: "pop", t: k.um, vol: 0.35 },
      { name: "ping", t: k.desc, vol: 0.3 },
      { name: "error", t: k.forte, vol: 0.25, dur: 0.6 },
      { name: "sparkle", t: k.m0, vol: 0.4 },
    ];
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f22-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    // repetições de rolar
    const rolls = [];
    for (let t = k.rola + 0.1; t < k.m1 + 0.6; t += 1.2) rolls.push(+t.toFixed(3));
    k.rolls = rolls;
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:90px; font-size:76px; }
        #f22-head span { color:${C.good}; }
        #f22-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f22-card .t { font-size:42px; }
        #f22-card .row { font-size:32px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f22-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f22-stop { left:1360px; top:700px; width:460px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f22-stop b { font-size:40px; display:block; }
        #f22-ok { left:860px; top:230px; width:330px; padding:14px 18px; font-size:30px; background:${C.good}; text-align:center; }
        #f22-no { left:860px; top:330px; width:330px; padding:14px 18px; font-size:30px; background:${C.pain}; color:#fff; text-align:center; }
        #f22-tl { left:120px; top:250px; width:200px; text-align:center; font-size:26px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="260" y="700" width="760" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f22-ballw"><g id="f22-ball"><circle cx="560" cy="676" r="26" fill="#D7F05A" stroke="${C.ink}" stroke-width="6"/><path d="M538 662 Q560 676 538 692 M582 660 Q560 676 582 692" fill="none" stroke="#fff" stroke-width="4"/></g></g>
      <g transform="translate(590,644) scale(1.45)">${human("f22z", "ze")}</g>
      <!-- termômetro -->
      <g id="f22-th" opacity="0" transform="translate(220,420)">
        <rect x="-26" y="-140" width="52" height="260" rx="26" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <circle cx="0" cy="140" r="44" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
        <rect id="f22-mer" x="-12" y="20" width="24" height="110" rx="12" fill="${C.good}"/>
        <line x1="-40" y1="-30" x2="40" y2="-30" stroke="${C.pain}" stroke-width="6" stroke-dasharray="8 6"/>
      </g>
      <!-- bolha: o Piriforme curtindo a massagem -->
      <g id="f22-bub" opacity="0">
        <circle cx="1030" cy="330" r="150" fill="#FFE4DC" stroke="${C.ink}" stroke-width="8"/>
        <clipPath id="f22-clip"><circle cx="1030" cy="330" r="142"/></clipPath>
        <g clip-path="url(#f22-clip)"><g transform="translate(1030,470) scale(0.78)">${piriforme("f22m")}</g></g>
        <path d="M900 420 L800 520 L930 450" fill="#FFE4DC" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
        <g id="f22-sp">${[[920, 220], [1150, 250], [1140, 420]].map(([x, y]) => `<path transform="translate(${x},${y})" d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
      </g>
    </svg>
    <div id="f22-tl" class="abs label" style="opacity:0">medidor de dor</div>
    <div id="f22-head" class="abs title">3. <span>BOLINHA</span></div>
    <div id="f22-ok" class="abs card label" style="opacity:0">Desconforto: <b>PODE</b></div>
    <div id="f22-no" class="abs card label" style="opacity:0">Dor forte: <b>NÃO</b></div>
    <div id="f22-card" class="abs card">
      <div class="t title">Liberação com bolinha</div>
      ${row(0, "Senta sobre a bolinha")}
      ${row(1, "Rola devagar na nádega")}
      ${row(2, "<b>1 a 2 minutos</b>", C.sun)}
      ${row(3, "Desconforto leve, nunca dor forte", C.sky)}
    </div>
    <div id="f22-stop" class="abs card label">Dor forte ou formigando mais?<b>PARE</b></div>`,
      js: function (tl, K, R) {
        const z = "f22z";
        // sentado no chão: pernas esticadas, mãos apoiadas atrás
        const sit = { torso: -14, neck: 8, shB: 40, elB: 10, shF: 34, elF: 8, hipB: -90, hipF: -93, knB: 0, knF: 0, anB: -10, anF: -10 };
        R.setPose(tl, z, 0, sit);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        tl.set("#f22-ballw", { opacity: 0 }, 0);
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f22-card", 0.2, 0.55, 400);
        R.pop(tl, "#f22-stop", 0.6, 0.4);
        [K.senta, K.rola, K.um, K.desc].forEach((t, i) => tl.fromTo(`#f22-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // a bolinha entra quicando e ele senta em cima
        tl.fromTo("#f22-ballw", { opacity: 1, x: -380, y: -260 }, { x: 0, y: 0, duration: 0.7, ease: "bounce.out" }, K.bol - 0.2);
        R.move(tl, z, K.tenis, 0.35, 0, -16, "power2.out");
        R.face(tl, z, K.tenis + 0.2, { eyes: "wide", mouth: "flat" });
        // rola devagar (vai e volta)
        K.rolls.forEach((t, i) => {
          const dx = i % 2 ? -10 : 10;
          R.move(tl, z, t, 1.1, dx, -16, "sine.inOut");
          tl.to("#f22-ball", { rotation: i % 2 ? -50 : 50, svgOrigin: "560 676", duration: 1.1, ease: "sine.inOut" }, t);
          tl.to("#f22-ballw", { x: dx * 1.45, duration: 1.1, ease: "sine.inOut" }, t);
        });
        R.face(tl, z, K.dev, { eyes: "closed", mouth: "smile" });
        // termômetro: desconforto pode, dor forte não
        R.pop(tl, "#f22-th", K.desc - 0.4, 0.4);
        R.fadeIn(tl, "#f22-tl", K.desc - 0.2);
        R.pop(tl, "#f22-ok", K.desc, 0.4);
        tl.to("#f22-mer", { attr: { y: -80, height: 210 }, duration: 0.5, ease: "power2.inOut" }, K.forte - 0.2);
        tl.to("#f22-mer, #f22-th circle", { attr: { fill: "#FF5A4E" }, duration: 0.3 }, K.forte);
        R.pop(tl, "#f22-no", K.forte, 0.4);
        R.shake(tl, "#f22-no", K.forte + 0.4, 0.4, 5);
        tl.to("#f22-mer", { attr: { y: 20, height: 110 }, duration: 0.5, ease: "power2.inOut" }, K.forte + 1.0);
        tl.to("#f22-mer, #f22-th circle", { attr: { fill: "#3DD9A4" }, duration: 0.3 }, K.forte + 1.0);
        // o Piriforme curte a massagem
        R.fadeOut(tl, "#f22-ok, #f22-no", K.m0 - 0.5);
        R.pop(tl, "#f22-bub", K.m0 - 0.4, 0.45, 0.3);
        R.face(tl, "f22m", K.m0 - 0.4, { eyes: "closed" });
        tl.fromTo("#f22-sp", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, K.m0);
        tl.to("#f22m-body", { rotation: 4, svgOrigin: "0 -40", duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.m0);
        R.face(tl, z, K.m0, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
