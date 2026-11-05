// F27 — E se não melhorar? Escada: cuidados → remédios para dor de nervo → infiltração por ultrassom → cirurgia (rara)
export default {
  speakers: { pablo: "f27p" },
  extra: 1.4,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      se: w(0, "Se"), mel: w(0, "melhorar"), med: w(0, "médico"), rem: w(0, "remédios"), inf: w(0, "infiltração"), us: w(0, "ultrassom"),
      cir: w(0, "Cirurgia"), rara: w(0, "rara"), casos: w(0, "casos"), end: lines[0].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "pop", t: k.se, vol: 0.4 },
      { name: "pop", t: k.rem, vol: 0.4 },
      { name: "pop", t: k.inf, vol: 0.4 },
      { name: "pop", t: k.cir, vol: 0.4 },
      { name: "impact-bass-1", t: k.rara + 0.1, vol: 0.35 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const steps = [
      { x: 90, top: 680, c: C.good, n: "1", a: "Cuidados + exercícios", b: "tirar a pressão, primeiro" },
      { x: 410, top: 570, c: "#BFE6EE", n: "2", a: "Remédios pra dor de nervo", b: "com prescrição médica" },
      { x: 730, top: 460, c: C.sun, n: "3", a: "Infiltração guiada por ultrassom", b: "feita pelo médico" },
      { x: 1050, top: 350, c: "#DDE5E8", n: "4", a: "Cirurgia", b: "rara: só se nada mais funcionar" },
    ];
    const W = 310;
    return {
      k,
      sfx,
      css: `
        #f27-h { left:110px; top:80px; font-size:72px; }
        #f27-h span { color:${C.pain}; }
        #root .f27-lab { width:${W - 30}px; text-align:center; }
        #root .f27-lab .a { font-size:29px; line-height:1.1; }
        #root .f27-lab .b { font-size:23px; margin-top:6px; opacity:0.85; }
        #f27-raro { left:1110px; top:250px; font-size:54px; color:${C.pain}; border:7px solid ${C.pain}; border-radius:16px; padding:4px 22px; background:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1610" cy="540" r="290" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f27-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${880 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8" ${i === 3 ? 'stroke-dasharray="22 14"' : ""}/>
        <circle cx="${s.x + 48}" cy="${s.top + 46}" r="28" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 48}" y="${s.top + 58}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <!-- ícones -->
      <g transform="translate(${steps[0].x + W - 60},${steps[0].top - 50})"><g id="f27-i0" opacity="0"><circle r="38" fill="#fff" ${st}/><path d="M-18 10 L-18 -6 Q-18 -16 -8 -16 L8 -16 Q18 -16 18 -6 L18 10" fill="none" ${st}/><path d="M-26 10 L26 10" ${st}/></g></g>
      <g transform="translate(${steps[1].x + W - 60},${steps[1].top - 50})"><g id="f27-i1" opacity="0"><circle r="38" fill="#fff" ${st}/><g transform="rotate(-35)"><rect x="-24" y="-11" width="48" height="22" rx="11" fill="#fff" ${st}/><path d="M-24 0 Q-24 -11 -13 -11 L0 -11 L0 11 L-13 11 Q-24 11 -24 0 Z" fill="${C.pain}" ${st}/></g></g></g>
      <g transform="translate(${steps[2].x + W - 60},${steps[2].top - 50})"><g id="f27-i2" opacity="0"><circle r="38" fill="#fff" ${st}/><rect x="-26" y="-18" width="30" height="24" rx="4" fill="${C.sky}" ${st}/><path d="M10 14 L30 -10 M24 -16 L36 -4" ${st}/><path d="M6 18 L12 12" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/></g></g>
      <g transform="translate(${steps[3].x + W - 60},${steps[3].top - 50})"><g id="f27-i3" opacity="0"><circle r="38" fill="#fff" ${st}/><path d="M-22 10 L14 -14 L24 -6 L-14 18 Z" fill="#DCE3E6" ${st}/></g></g>
      <g id="f27-pw"><g transform="translate(1660,667) scale(-1.1,1.1)">${human("f27p", "pablo")}</g></g>
    </svg>
    <div id="f27-h" class="abs title">E SE <span>NÃO MELHORAR?</span></div>
    ${steps.map((s, i) => `<div id="f27-l${i}" class="abs f27-lab label" style="left:${s.x + 15}px;top:${s.top + 90}px;opacity:0"><div class="a">${s.a}</div><div class="b">${s.b}</div></div>`).join("")}
    <div id="f27-raro" class="abs title" style="opacity:0">RARO</div>`,
      js: function (tl, K, R) {
        const p = "f27p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.slideIn(tl, "#f27-h", 0.05, 0.5, -300);
        tl.fromTo("#f27-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        tl.set("#f27-st0, #f27-st1, #f27-st2, #f27-st3", { opacity: 0 }, 0);
        const step = (i, t) => {
          tl.fromTo(`#f27-st${i}`, { opacity: 1, y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, t);
          R.fadeIn(tl, `#f27-l${i}`, t + 0.35, 0.3);
          R.pop(tl, `#f27-i${i}`, t + 0.3, 0.4);
        };
        step(0, K.se - 0.1);
        R.pose(tl, p, K.se, 0.4, { shF: -80, elF: -10 }, "back.out(1.6)");
        step(1, K.rem - 0.15);
        R.pose(tl, p, K.rem, 0.4, { shF: -100, elF: -10 }, "back.out(1.6)");
        step(2, K.inf - 0.15);
        R.pose(tl, p, K.inf, 0.4, { shF: -115, elF: -10 }, "back.out(1.6)");
        step(3, K.cir - 0.15);
        R.pose(tl, p, K.cir, 0.4, { shF: -130, elF: -10 }, "back.out(1.6)");
        // carimbo RARO
        tl.fromTo("#f27-raro", { opacity: 0, scale: 2.2, rotation: -14 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.3, ease: "power4.in" }, K.rara);
        R.shake(tl, "#f27-st3", K.rara + 0.3, 0.3, 5);
        R.pose(tl, p, K.casos, 0.4, { shF: -40, elF: -60 });
        R.face(tl, p, K.end, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
