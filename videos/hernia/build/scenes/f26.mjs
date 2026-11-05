// F26 — Vai melhorar? 6 a 12 semanas, 9 de 10 sem cirurgia, células comilonas reabsorvem a Geleia
export default {
  speakers: { geleia: "f26g" },
  gaps: [0.3],
  extra: 0.5,
  build(ctx) {
    const { C, disquinho, geleia, w, lines } = ctx;
    const k = {
      melhor: w(0, "melhor"), maioria: w(0, "maioria"), seis: w(0, "seis"), sem: w(0, "sem", 1), cir: w(0, "cirurgia"),
      truque: w(0, "truque"), reconh: w(0, "reconhece"), saiu: w(0, "saiu"), reab: w(0, "reabsorvendo"),
      curi: w(0, "Curiosamente"), mais: w(0, "mais"), enc: w(0, "encolhem"),
      g0: lines[1].start, g1: lines[1].end, volto: w(1, "volto"),
    };
    // ritmo de mordidas das células (finito)
    const bites = [];
    for (let t = k.reconh + 0.6; t < k.curi - 0.3; t += 0.32) bites.push(+t.toFixed(3));
    for (let t = k.g0; t < k.volto - 0.2; t += 0.32) bites.push(+t.toFixed(3));
    k.bites = bites;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "riser", t: k.seis, vol: 0.25, dur: 1.3 },
      { name: "sparkle", t: k.cir, vol: 0.4 },
      { name: "whoosh-short", t: k.truque - 0.3, vol: 0.4 },
      ...[0, 1, 2].map((i) => ({ name: "pop", t: k.reconh + 0.2 + i * 0.18, vol: 0.3 })),
      { name: "pop", t: k.curi, vol: 0.35 },
      { name: "pop", t: k.volto, vol: 0.4 },
    ];
    const person = (i) => {
      const x = 260 + (i % 5) * 150, y = 640 + Math.floor(i / 5) * 190;
      return `<g transform="translate(${x},${y})"><g id="f26-pi${i}">
        <circle cx="0" cy="-70" r="30" fill="${C.grey}" stroke="${C.ink}" stroke-width="6"/>
        <path d="M-42 40 Q-44 -30 0 -32 Q44 -30 42 40 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g></g>`;
    };
    const pac = (i, x, y) => `<g transform="translate(${x},${y})"><g id="f26-pc${i}"><g id="f26-pci${i}">
        <g class="f26-open"><path d="M0 0 L-46 -26 A52 52 0 1 1 -46 26 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g>
        <g class="f26-shut" opacity="0"><circle r="52" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/><path d="M-8 0 L-48 0" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g>
        <circle cx="6" cy="-24" r="8" fill="#fff" stroke="${C.ink}" stroke-width="4"/><circle cx="4" cy="-23" r="3.5" fill="${C.ink}"/>
        <ellipse cx="26" cy="4" rx="9" ry="5" fill="${C.pain}" opacity="0.4"/>
      </g></g></g>`;
    return {
      k,
      sfx,
      css: `
        #f26-h { left:110px; top:80px; font-size:72px; }
        #f26-h span { color:${C.good}; }
        #f26-wk { left:400px; top:300px; font-size:46px; }
        #f26-wk b { color:${C.good}; }
        #f26-nine { left:1100px; top:560px; width:420px; font-size:44px; text-align:center; padding:18px; }
        #f26-nine b { color:${C.good}; font-size:84px; display:block; }
        #f26-trick { left:110px; top:190px; font-size:44px; padding:14px 24px; }
        #f26-trick b { color:#C98A00; }
        #f26-more { left:110px; top:300px; width:640px; padding:22px 28px; font-size:36px; line-height:1.2; }
        #f26-more b { color:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f26-A">
        <g transform="translate(230,250)">
          <rect x="-70" y="-60" width="140" height="130" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
          <rect x="-70" y="-60" width="140" height="38" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="7"/>
          <path d="M-40 -76 L-40 -48 M40 -76 L40 -48" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
          ${Array.from({ length: 9 }, (_, i) => `<rect x="${-48 + (i % 3) * 36}" y="${-10 + Math.floor(i / 3) * 24}" width="22" height="14" rx="3" fill="${C.sky}"/>`).join("")}
        </g>
        <rect x="360" y="200" width="1000" height="80" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <g id="f26-fillw"><rect id="f26-fill" x="370" y="210" width="980" height="60" rx="30" fill="${C.good}"/></g>
        ${Array.from({ length: 10 }, (_, i) => person(i)).join("")}
      </g>
      <g id="f26-B" opacity="0">
        <g transform="translate(560,760) scale(1.25)">${disquinho("f26d")}</g>
        <g id="f26-gw"><g transform="translate(1000,760)"><g id="f26-gs">${geleia("f26g")}</g></g></g>
        ${pac(0, 1300, 520)}${pac(1, 1360, 700)}${pac(2, 1200, 830)}
      </g>
    </svg>
    <div id="f26-h" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f26-wk" class="abs title" style="opacity:0">em <b>6 a 12 semanas</b></div>
    <div id="f26-nine" class="abs card label" style="opacity:0"><b>9 em 10</b>melhoram sem cirurgia</div>
    <div id="f26-trick" class="abs card label" style="opacity:0">O truque do corpo: <b>reabsorver</b> o que saiu do lugar</div>
    <div id="f26-more" class="abs card label" style="opacity:0">Curiosidade: as hérnias que <b>saíram mais</b> costumam ser as que <b>mais encolhem</b>.</div>`,
      js: function (tl, K, R) {
        R.slideIn(tl, "#f26-h", 0.05, 0.5, -300);
        // barra até 6 a 12 semanas
        tl.fromTo("#f26-fill", { scaleX: 0.02 }, { scaleX: 1, svgOrigin: "370 240", duration: 1.6, ease: "power2.out" }, K.seis - 0.2);
        R.pop(tl, "#f26-wk", K.seis + 0.4, 0.45);
        // 10 bonequinhos: 9 ficam verdes
        for (let i = 0; i < 10; i++) R.pop(tl, `#f26-pi${i}`, K.maioria - 0.3 + i * 0.05, 0.35);
        for (let i = 0; i < 9; i++) tl.to(`#f26-pi${i} circle, #f26-pi${i} path`, { attr: { fill: "#3DD9A4" }, duration: 0.2 }, K.sem + i * 0.07);
        for (let i = 0; i < 9; i++) tl.fromTo(`#f26-pi${i}`, { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.cir + i * 0.06);
        R.pop(tl, "#f26-nine", K.cir, 0.45);
        // troca para o truque do corpo
        tl.to("#f26-A, #f26-wk, #f26-nine", { opacity: 0, duration: 0.3 }, K.truque - 0.3);
        tl.to("#f26-B", { opacity: 1, duration: 0.3 }, K.truque - 0.2);
        R.pop(tl, "#f26-trick", K.truque, 0.45);
        R.face(tl, "f26g", 0, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f26d", 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f26d", K.truque, K.dur);
        // células comilonas chegam
        [0, 1, 2].forEach((i) => tl.fromTo(`#f26-pc${i}`, { x: 700, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, K.reconh + 0.2 + i * 0.18));
        [0, 1, 2].forEach((i) => tl.to(`#f26-pci${i}`, { x: -150 + i * 20, duration: 1.4, ease: "power1.inOut" }, K.saiu));
        // mordidas
        K.bites.forEach((t, j) => {
          tl.set(".f26-open", { opacity: 0 }, t);
          tl.set(".f26-shut", { opacity: 1 }, t);
          tl.set(".f26-open", { opacity: 1 }, t + 0.16);
          tl.set(".f26-shut", { opacity: 0 }, t + 0.16);
          if (j % 2 === 0) R.shake(tl, "#f26-gs", t, 0.15, 3);
        });
        // a Geleia encolhe
        tl.to("#f26-gs", { scale: 0.7, svgOrigin: "0 0", duration: 1.6, ease: "power1.inOut" }, K.reab);
        R.face(tl, "f26g", K.reab, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f26-more", K.curi, 0.45);
        tl.to("#f26-gs", { scale: 0.5, svgOrigin: "0 0", duration: 1.2, ease: "power1.inOut" }, K.enc);
        // fala da Geleia: "tão me comendo!" ... "eu volto pra casa!"
        R.face(tl, "f26g", K.g0 - 0.1, { eyes: "wide" });
        R.pose(tl, "f26g", K.g0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f26-gs", { scale: 0.4, svgOrigin: "0 0", duration: 0.8, ease: "power1.in" }, K.g0 + 0.3);
        tl.to("#f26-gw", { x: -260, duration: 0.9, ease: "power2.inOut" }, K.volto - 0.1);
        R.face(tl, "f26g", K.volto, { eyes: "happy" });
        R.pose(tl, "f26g", K.volto, 0.3, { armF: 0, armB: 0 });
        [0, 1, 2].forEach((i) => tl.to(`#f26-pci${i}`, { x: 60, duration: 0.6, ease: "power2.out" }, K.volto + 0.2));
        R.face(tl, "f26d", K.volto + 0.5, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
