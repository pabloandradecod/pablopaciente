// F15 — Bandeiras AMARELAS: atenção, não perigo. O Alarmildo fica mais alto a cada placa e se acalma no fim.
export default {
  speakers: { alarmildo: "f15a" },
  tail: 1.0,
  build(ctx) {
    const { C, alarmildo, w } = ctx;
    const k = {
      ama: w(0, "amarelas"), per: w(0, "perigo"), dem: w(0, "demorar"),
      p0: w(0, "Medo"), p1: w(0, "achar"), p2: w(0, "estresse"), p3: w(0, "problemas"), p4: w(0, "esperar"),
      tamb: w(0, "também"), trat: w(0, "tratamento", 1),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    // ícones simples dentro da placa amarela
    const icons = [
      // medo de se mexer: carinha assustada
      `<circle cx="0" cy="6" r="22" fill="#fff" ${st}/><circle cx="-8" cy="2" r="4" fill="${C.ink}"/><circle cx="8" cy="2" r="4" fill="${C.ink}"/><ellipse cx="0" cy="16" rx="6" ry="7" fill="${C.ink}"/>`,
      // só vai piorar: seta descendo
      `<path d="M-22 -10 L-4 8 L6 -2 L22 18" fill="none" ${st} stroke-width="7"/><path d="M10 18 L22 18 L22 6" fill="none" ${st} stroke-width="7"/>`,
      // estresse e tristeza: nuvem de chuva
      `<path d="M-22 4 Q-24 -12 -8 -12 Q-2 -24 12 -16 Q26 -16 24 2 Z" fill="#fff" ${st}/><path d="M-10 12 L-14 22 M2 12 L-2 22 M14 12 L10 22" ${st} stroke="#3A9BD5"/>`,
      // trabalho: maleta
      `<rect x="-22" y="-8" width="44" height="30" rx="5" fill="#B07A4A" ${st}/><path d="M-8 -8 L-8 -16 L8 -16 L8 -8" fill="none" ${st}/>`,
      // só tratamento passivo: sofá
      `<rect x="-24" y="0" width="48" height="16" rx="5" fill="#8E6CD8" ${st}/><rect x="-24" y="-14" width="48" height="16" rx="5" fill="#8E6CD8" ${st}/><path d="M-20 16 L-20 22 M20 16 L20 22" ${st}/>`,
    ];
    const labels = ["Medo de se mexer", "Achar que só vai piorar", "Estresse e tristeza", "Problemas no trabalho", "Esperar só tratamento passivo"];
    const pos = [[720, 300], [1080, 300], [1440, 300], [900, 560], [1260, 560]];
    const sign = (i) => `<div id="f15-s${i}" class="abs card f15-sign" style="left:${pos[i][0]}px;top:${pos[i][1]}px;opacity:0">
        <svg width="110" height="110" viewBox="-55 -55 110 110" style="flex:none"><g transform="rotate(45)"><rect x="-36" y="-36" width="72" height="72" rx="10" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/></g>${icons[i]}</svg>
        <div class="label">${labels[i]}</div></div>`;
    return {
      k,
      css: `
        #f15-title { left:110px; top:80px; font-size:80px; }
        #f15-title span { color:#D9A100; -webkit-text-stroke:3px ${C.ink}; paint-order:stroke fill; }
        #f15-sub { left:116px; top:190px; font-size:40px; padding:8px 22px; background:${C.sun}; border:6px solid ${C.ink}; border-radius:16px; }
        #root .f15-sign { width:330px; height:220px; padding:14px 16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; text-align:center; border-color:${C.ink}; background:#FFF8DE; }
        #root .f15-sign .label { font-size:30px; line-height:1.1; }
        #f15-ok { left:720px; top:810px; padding:14px 30px; font-size:40px; display:flex; align-items:center; gap:16px; background:#E3FAF1; }
        #f15-ok b { color:#1E9C72; }
        #f15-vol { left:140px; top:300px; width:60px; height:330px; border-radius:20px; background:#fff; border:6px solid ${C.ink}; overflow:hidden; }
        #f15-vol-fill { position:absolute; left:0; right:0; bottom:0; height:100%; background:linear-gradient(0deg, ${C.good}, ${C.sun} 55%, ${C.pain}); }
        #f15-voll { left:110px; top:640px; width:120px; text-align:center; font-size:24px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f15-a-wrap"><g transform="translate(420,880) scale(1.25)"><g id="f15-a-scale">${alarmildo("f15a")}</g></g></g>
    </svg>
    <div id="f15-vol" class="abs"><div id="f15-vol-fill"></div></div>
    <div id="f15-voll" class="abs label" style="opacity:0">VOLUME DO ALARME</div>
    <div id="f15-title" class="abs title" style="opacity:0">Bandeiras <span>AMARELAS</span></div>
    <div id="f15-sub" class="abs label" style="opacity:0">atenção, NÃO perigo: a dor pode demorar mais</div>
    ${[0, 1, 2, 3, 4].map(sign).join("")}
    <div id="f15-ok" class="abs card label" style="opacity:0">
      <svg width="54" height="54" viewBox="-27 -27 54 54"><circle r="23" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M-11 0 L-3 9 L12 -9" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Elas também <b>fazem parte do tratamento</b></div>`,
      js: function (tl, K, R) {
        const a = "f15a";
        R.slideIn(tl, "#f15-title", 0.05, 0.5, -300);
        R.rise(tl, "#f15-sub", K.per - 0.2, 0.4, 20);
        tl.fromTo("#f15-a-wrap", { y: 500 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.1);
        R.face(tl, a, 0, { eyes: "normal", mouth: "smile" });
        R.setPose(tl, a, 0, { armF: 20, armB: -20 });
        R.blinks(tl, a, 0.5, K.p0);
        R.fadeIn(tl, "#f15-vol", 0.3, 0.3);
        R.fadeIn(tl, "#f15-voll", 0.4, 0.3);
        tl.fromTo("#f15-vol-fill", { scaleY: 0.15, transformOrigin: "50% 100%" }, { scaleY: 0.15, duration: 0.01 }, 0);
        tl.set("#f15a-rays", { opacity: 0.15 }, 0);
        // cada placa: a placa pula, o alarme sobe o volume e cresce
        const ts = [K.p0, K.p1, K.p2, K.p3, K.p4];
        ts.forEach((t, i) => {
          R.pop(tl, `#f15-s${i}`, t - 0.1, 0.4, 0.5);
          tl.to("#f15-vol-fill", { scaleY: 0.3 + i * 0.17, duration: 0.35, ease: "back.out(2)" }, t);
          tl.to("#f15-a-scale", { scale: 1 + (i + 1) * 0.06, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2.5)" }, t);
          tl.to("#f15a-rays", { opacity: 0.4 + i * 0.15, duration: 0.15 }, t);
          R.shake(tl, "#f15a-body", t, 0.25 + i * 0.05, 2 + i);
        });
        R.face(tl, a, K.p1, { eyes: "wide", mouth: "open" });
        R.pose(tl, a, K.p2, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, a, K.p3, { eyes: "wide", mouth: "scream" });
        tl.fromTo("#f15a-rays", { opacity: 1 }, { opacity: 0.2, duration: 0.12, yoyo: true, repeat: 7, ease: "none" }, K.p4 + 0.2);
        // "também fazem parte do tratamento": o alarme se acalma
        R.pop(tl, "#f15-ok", K.tamb - 0.1, 0.45, 0.6);
        tl.to("#f15-vol-fill", { scaleY: 0.25, duration: 0.6, ease: "power2.inOut" }, K.trat);
        tl.to("#f15-a-scale", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power2.inOut" }, K.trat);
        tl.to("#f15a-rays", { opacity: 0.15, duration: 0.4 }, K.trat);
        R.pose(tl, a, K.trat, 0.4, { armF: 20, armB: -20 });
        R.face(tl, a, K.trat + 0.2, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.p0 - 0.1, vol: 0.3 },
        { name: "pop", t: k.p1 - 0.1, vol: 0.33 },
        { name: "pop", t: k.p2 - 0.1, vol: 0.36 },
        { name: "pop", t: k.p3 - 0.1, vol: 0.4 },
        { name: "error", t: k.p4 - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.trat, vol: 0.35 },
      ],
    };
  },
};
