// F26 — Prognóstico: 6 a 12 semanas, 9 em cada 10 sem cirurgia, hérnia reabsorvida
export default {
  speakers: { pablo: "f26p", vertebra: "f26v" },
  gaps: [0.3, 0.25],
  extra: 0.4,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      boa: w(0, "boa"), seis: w(0, "seis"), cons: w(0, "conservador"), q: w(0, "quiropraxia"), ex: w(0, "exercício"), inf: w(0, "informação"),
      dez: w(0, "dez"), nove: w(0, "nove"), cir: w(0, "cirurgia"), her: w(0, "hérnias"), reab: w(0, "reabsorvidas"),
      v0: lines[1].start, v1: lines[1].end, p2: lines[2].start, p2e: lines[2].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "riser", t: k.seis, vol: 0.25, dur: 1.4 },
      { name: "pop", t: k.q, vol: 0.35 }, { name: "pop", t: k.ex, vol: 0.35 }, { name: "pop", t: k.inf, vol: 0.35 },
      { name: "whoosh-short", t: k.dez - 0.3, vol: 0.4 },
      { name: "sparkle", t: k.nove, vol: 0.4 },
      { name: "whoosh-short", t: k.her - 0.3, vol: 0.4 },
      { name: "glitch-2", t: k.reab, vol: 0.18, dur: 1.2 },
      { name: "pop", t: k.v0, vol: 0.4 },
    ];
    const person = (i) => {
      const x = 170 + (i % 5) * 150, y = 560 + Math.floor(i / 5) * 190;
      return `<g id="f26-pp${i}" transform="translate(${x},${y})"><g id="f26-pi${i}">
        <circle cx="0" cy="-70" r="30" fill="${C.grey}" stroke="${C.ink}" stroke-width="6"/>
        <path d="M-42 40 Q-44 -30 0 -32 Q44 -30 42 40 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g></g>`;
    };
    const chip = (i, txt) => `<div id="f26-c${i}" class="abs card label f26-chip" style="left:${150 + i * 360}px;top:640px;opacity:0">${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f26-h { left:110px; top:80px; font-size:72px; }
        #f26-h span { color:${C.good}; }
        #root .f26-chip { padding:16px 26px; font-size:38px; border-radius:22px; box-shadow:6px 6px 0 ${C.ink}; }
        #f26-wk { left:150px; top:390px; font-size:56px; }
        #f26-wk b { color:${C.good}; }
        #f26-nine { left:960px; top:600px; width:340px; font-size:46px; text-align:center; }
        #f26-nine b { color:${C.good}; font-size:90px; display:block; }
        #f26-reab { left:820px; top:500px; width:460px; font-size:44px; text-align:center; }
        #f26-pf { left:660px; top:360px; font-size:60px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1560" cy="520" r="330" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- etapa A: calendário + barra -->
      <g id="f26-A">
        <g id="f26-cal" transform="translate(220,290)">
          <rect x="-70" y="-60" width="140" height="130" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
          <rect x="-70" y="-60" width="140" height="38" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="7"/>
          <path d="M-40 -76 L-40 -48 M40 -76 L40 -48" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
          ${Array.from({ length: 9 }, (_, i) => `<rect x="${-48 + (i % 3) * 36}" y="${-10 + Math.floor(i / 3) * 24}" width="22" height="14" rx="3" fill="${C.sky}"/>`).join("")}
        </g>
        <rect x="340" y="250" width="900" height="80" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect id="f26-fill" x="350" y="260" width="880" height="60" rx="30" fill="${C.good}"/>
        <line x1="790" y1="236" x2="790" y2="344" stroke="${C.ink}" stroke-width="6" stroke-dasharray="10 8"/>
      </g>
      <!-- etapa B: 10 pessoas -->
      <g id="f26-B" opacity="0">${Array.from({ length: 10 }, (_, i) => person(i)).join("")}
        <g id="f26-scal" opacity="0" transform="translate(770,700)"><path d="M-40 10 L20 -14 L34 -6 L-30 22 Z" fill="#DCE3E6" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/><rect x="-62" y="12" width="34" height="14" rx="5" fill="${C.ink}" transform="rotate(-22 -45 19)"/></g>
      </g>
      <!-- etapa C: disco com hérnia -->
      <g id="f26-C" opacity="0" transform="translate(480,600)">
        <rect x="-170" y="-170" width="300" height="110" rx="28" fill="${C.bone}" stroke="${C.ink}" stroke-width="8"/>
        <rect x="-170" y="40" width="300" height="110" rx="28" fill="${C.bone}" stroke="${C.ink}" stroke-width="8"/>
        <rect x="-160" y="-58" width="280" height="96" rx="30" fill="#9CD3E6" stroke="${C.ink}" stroke-width="7"/>
        <g id="f26-bulge"><ellipse cx="150" cy="-10" rx="60" ry="46" fill="${C.pain}" stroke="${C.ink}" stroke-width="7"/><circle cx="135" cy="-24" r="10" fill="#fff" opacity="0.6"/></g>
      </g>
      <g id="f26-pw"><g transform="translate(1690,667) scale(-1.1,1.1)">${human("f26p", "pablo")}</g></g>
      <g id="f26-vw"><g transform="translate(1390,882) scale(0.85)">${vertebra("f26v")}</g></g>
    </svg>
    <div id="f26-h" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f26-wk" class="abs title" style="opacity:0"><b>6 a 12</b> semanas</div>
    ${chip(0, "quiropraxia")}${chip(1, "exercício")}${chip(2, "informação")}
    <div id="f26-nine" class="abs label" style="opacity:0"><b>9 em 10</b>sem cirurgia</div>
    <div id="f26-pf" class="abs title" style="opacity:0">pfffff...</div>
    <div id="f26-reab" class="abs label card" style="opacity:0;padding:22px">o corpo <b style="color:${C.good}">reabsorve</b> a hérnia</div>`,
      js: function (tl, K, R) {
        const p = "f26p", v = "f26v";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.blinks(tl, v, 0, K.v0);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.slideIn(tl, "#f26-h", 0.05, 0.5, -300);
        tl.fromTo("#f26-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        tl.fromTo("#f26-vw", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.3);
        // A: calendário folheia, barra enche até 6–12 semanas
        R.pop(tl, "#f26-cal", K.boa, 0.4);
        tl.fromTo("#f26-cal", { rotation: -8, transformOrigin: "50% 50%" }, { rotation: 8, duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.seis);
        tl.fromTo("#f26-fill", { attr: { width: 0 } }, { attr: { width: 880 }, duration: 1.4, ease: "power2.inOut" }, K.seis);
        R.pop(tl, "#f26-wk", K.seis + 0.6, 0.45);
        R.gesture(tl, p, K.boa, K.dez - 0.3, 5);
        [K.q, K.ex, K.inf].forEach((t, i) => R.pop(tl, `#f26-c${i}`, t - 0.05, 0.4));
        R.fadeOut(tl, "#f26-A, #f26-wk, #f26-c0, #f26-c1, #f26-c2", K.dez - 0.35);
        // B: 10 pessoas, 9 ficam verdes
        tl.to("#f26-B", { opacity: 1, duration: 0.2 }, K.dez - 0.15);
        for (let i = 0; i < 10; i++) R.pop(tl, `#f26-pi${i}`, K.dez - 0.15 + i * 0.05, 0.35);
        for (let i = 0; i < 9; i++) {
          tl.to(`#f26-pi${i} circle, #f26-pi${i} path`, { attr: { fill: "#3DD9A4" }, duration: 0.2 }, K.nove + i * 0.06);
          tl.fromTo(`#f26-pi${i}`, { y: 0 }, { y: -26, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, K.nove + i * 0.06);
        }
        R.pop(tl, "#f26-nine", K.nove + 0.3, 0.45);
        R.pop(tl, "#f26-scal", K.cir, 0.35);
        R.face(tl, p, K.nove, { eyes: "happy" });
        R.face(tl, p, K.her - 0.3, { eyes: "normal" });
        R.fadeOut(tl, "#f26-B, #f26-nine", K.her - 0.35);
        // C: hérnia murcha
        tl.to("#f26-C", { opacity: 1, duration: 0.25 }, K.her - 0.15);
        tl.fromTo("#f26-bulge", { scale: 1.15, transformOrigin: "60px 0px" }, { scale: 1, duration: 0.6, ease: "elastic.out(1,0.4)" }, K.her);
        tl.to("#f26-bulge", { scale: 0.08, opacity: 0.2, transformOrigin: "100px 0px", duration: 1.6, ease: "power2.in" }, K.reab);
        tl.fromTo("#f26-bulge", { x: 0 }, { x: 6, duration: 0.08, yoyo: true, repeat: 15, ease: "none" }, K.reab);
        R.pop(tl, "#f26-pf", K.reab + 0.1, 0.35);
        R.fadeOut(tl, "#f26-pf", K.reab + 1.7);
        R.pop(tl, "#f26-reab", K.reab + 1.0, 0.45);
        R.pose(tl, p, K.reab, 0.4, { shF: -100, elF: -20 }, "back.out(1.6)");
        // Vértebra: "O corpo come a hérnia?!"
        R.face(tl, v, K.v0, { eyes: "wide" });
        R.pose(tl, v, K.v0, 0.25, { armF: -160, armB: 160 }, "back.out(2)");
        R.squash(tl, "#f26v-root", K.v0 - 0.05);
        R.pose(tl, v, K.v1, 0.3, { armF: 20, armB: -20 });
        // Pablo: "Mais ou menos isso!"
        R.face(tl, p, K.p2, { eyes: "happy" });
        R.pose(tl, p, K.p2, 0.3, { shF: -60, elF: -80 }, "back.out(2)");
        R.pose(tl, p, K.p2 + 0.3, 0.15, { elF: -50 }, "sine.inOut");
        R.pose(tl, p, K.p2 + 0.45, 0.15, { elF: -80 }, "sine.inOut");
        R.face(tl, v, K.p2e, { eyes: "happy" });
      },
    };
  },
};
