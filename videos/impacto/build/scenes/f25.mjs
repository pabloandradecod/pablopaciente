// F25 — Quanto tempo? Calendário com a tartaruga atleta (6 a 12 semanas; alguns até 6 meses), dor noturna descendo, Supra de faixa faz rotação externa com mini-halteres
export default {
  speakers: { supra: "f25s" },
  extra: 0.6,
  build(ctx) {
    const { C, supra, w, lines } = ctx;
    const k = {
      quanto: w(0, "Quanto"), maior: w(0, "maioria"), doze: w(0, "doze"), exe: w(0, "exercício"), alg: w(0, "Alguns"),
      meses: w(0, "meses"), const: w(0, "Constância"), tudo: w(0, "tudo"),
      s0: lines[1].start, s1: lines[1].end, forte: w(1, "forte"),
    };
    // dor noturna (x 150..950, y 380..760): desce em ondinhas
    const g = "M150 400 C230 390 260 450 330 460 C400 470 420 520 490 540 C560 560 600 600 670 620 C740 640 780 680 850 700 C900 712 930 718 950 720";
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.maior, vol: 0.35 },
      { name: "pop", t: k.alg, vol: 0.35 },
      { name: "click-soft", t: k.exe, vol: 0.3 },
      { name: "sparkle", t: k.const, vol: 0.35 },
      { name: "impact-bass-1", t: k.s0 + 0.1, vol: 0.3 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const db = (id) => `<g id="${id}"><g transform="translate(0,62)"><rect x="-26" y="-6" width="52" height="12" rx="5" fill="#5B6770" stroke="${C.ink}" stroke-width="4"/><rect x="-34" y="-16" width="14" height="32" rx="4" fill="${C.ink}"/><rect x="20" y="-16" width="14" height="32" rx="4" fill="${C.ink}"/></g></g>`;
    return {
      k,
      sfx,
      css: `
        #f25-head { left:110px; top:60px; font-size:72px; }
        #f25-head span { color:#178A63; }
        #f25-time { left:150px; top:316px; padding:8px 20px; font-size:36px; color:${C.ink}; }
        #f25-time b { color:#178A63; }
        #f25-alg { left:990px; top:316px; padding:8px 18px; font-size:32px; color:${C.ink}; }
        #f25-alg b { color:${C.pain}; }
        #f25-ok { left:300px; top:812px; padding:8px 18px; font-size:32px; color:${C.ink}; background:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- calendário -->
      <g id="f25-cal" transform="translate(0,50)">
        <rect x="110" y="190" width="1100" height="56" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect id="f25-calfill" x="114" y="194" width="1092" height="48" rx="12" fill="${C.good}"/>
        ${Array.from({ length: 11 }, (_, i) => `<line x1="${110 + i * 100}" y1="190" x2="${110 + i * 100}" y2="246" stroke="${C.ink}" stroke-width="3" opacity="0.4"/>`).join("")}
        <path d="M1210 218 L1290 218" stroke="${C.ink}" stroke-width="7" stroke-dasharray="12 10"/>
      </g>
      <g id="f25-turtle"><g transform="translate(150,210)"><g id="f25-tt">
        <ellipse cx="0" cy="0" rx="46" ry="30" fill="#4FA36B" ${st}/><path d="M-30 -6 L30 -6 M-20 -24 L-20 20 M20 -24 L20 20" stroke="#2E7D4A" stroke-width="4"/>
        <circle cx="56" cy="-8" r="18" fill="#7CC48E" ${st}/><rect x="40" y="-26" width="34" height="8" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="3"/><circle cx="62" cy="-12" r="3" fill="${C.ink}"/>
        <g id="f25-legs"><rect x="-34" y="22" width="14" height="18" rx="6" fill="#7CC48E" ${st}/><rect x="20" y="22" width="14" height="18" rx="6" fill="#7CC48E" ${st}/></g>
      </g></g></g>
      <!-- gráfico da dor noturna -->
      <g id="f25-graph" opacity="0" transform="translate(0,40)">
        <rect x="110" y="330" width="890" height="470" rx="24" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <line x1="150" y1="370" x2="150" y2="770" stroke="${C.ink}" stroke-width="5"/><line x1="150" y1="770" x2="970" y2="770" stroke="${C.ink}" stroke-width="5"/>
        <text x="960" y="420" text-anchor="end" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">dor à noite</text>
        <g transform="translate(900,470)"><path d="M0 -24 A24 24 0 1 0 18 16 A18 18 0 1 1 0 -24Z" fill="#FFE08A" stroke="${C.ink}" stroke-width="4"/></g>
        <text x="880" y="795" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">semanas</text>
        <path id="f25-line" d="${g}" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Supra com os mini-halteres -->
      <g id="f25-sw"><g transform="translate(1500,880) scale(1.15)">${supra("f25s")}
        <g transform="translate(-46,-190)">${db("f25-dbB")}</g>
        <g transform="translate(46,-190)">${db("f25-dbF")}</g>
      </g></g>
      <g id="f25-spark" opacity="0">${[[1360, 430], [1640, 380], [1700, 560], [1330, 620]].map(([x, y]) => `<path d="M${x} ${y - 22} L${x + 6} ${y - 6} L${x + 22} ${y} L${x + 6} ${y + 6} L${x} ${y + 22} L${x - 6} ${y + 6} L${x - 22} ${y} L${x - 6} ${y - 6} Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f25-head" class="abs title">Quanto <span>TEMPO</span>?</div>
    <div id="f25-time" class="abs card label" style="opacity:0"><b>6 a 12 semanas</b>: a maioria melhora bastante</div>
    <div id="f25-alg" class="abs card label" style="opacity:0">alguns: <b>até 6 meses</b></div>
    <div id="f25-ok" class="abs card label" style="opacity:0">Constância é tudo!</div>`,
      js: function (tl, K, R) {
        const s = "f25s";
        const arm = (t, d, f, b, ease) => {
          R.pose(tl, s, t, d, { armF: f, armB: b }, ease);
          tl.to("#f25-dbF", { rotation: f, svgOrigin: "0 0", duration: d, ease: ease || "power2.inOut" }, t);
          tl.to("#f25-dbB", { rotation: b, svgOrigin: "0 0", duration: d, ease: ease || "power2.inOut" }, t);
        };
        R.setPose(tl, s, 0, { armF: -10, armB: 10 });
        tl.set("#f25-dbF", { rotation: -10, svgOrigin: "0 0" }, 0);
        tl.set("#f25-dbB", { rotation: 10, svgOrigin: "0 0" }, 0);
        tl.set("#f25s-sweat", { opacity: 1 }, 0);
        R.face(tl, s, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, s, 0, K.dur);
        R.slideIn(tl, "#f25-head", 0.05, 0.5, -300);
        tl.fromTo("#f25-sw", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // calendário enche e a tartaruga caminha
        tl.fromTo("#f25-calfill", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: K.meses + 0.5 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f25-turtle", { x: 0 }, { x: 1080, duration: K.s1 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f25-legs", { y: 0 }, { y: -6, duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((K.s1 - K.quanto) / 0.25)), ease: "sine.inOut" }, K.quanto);
        R.pop(tl, "#f25-time", K.maior - 0.1, 0.4);
        // rotação externa: abre e fecha os braços com os halteres
        const r0 = K.maior + 0.3, reps = Math.max(3, Math.floor((K.s0 - 0.4 - r0) / 0.9));
        for (let i = 0; i < reps; i++) {
          arm(r0 + i * 0.9, 0.45, -80, 80, "sine.inOut");
          arm(r0 + i * 0.9 + 0.45, 0.45, -10, 10, "sine.inOut");
        }
        R.face(tl, s, K.maior + 0.3, { eyes: "normal", mouth: "smile" });
        // gráfico desce com o exercício
        R.fadeIn(tl, "#f25-graph", K.exe - 0.3, 0.3);
        R.draw(tl, "#f25-line", K.exe - 0.1, Math.max(0.8, K.const - K.exe), "none");
        R.pop(tl, "#f25-alg", K.alg - 0.1, 0.4);
        // constância
        tl.to("#f25s-sweat", { opacity: 0, duration: 0.4 }, K.const);
        R.face(tl, s, K.const + 0.2, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f25-ok", K.const, 0.4);
        // fala do Supra: halteres pra cima
        arm(K.s0, 0.35, -160, 160, "back.out(2)");
        tl.to("#f25-sw", { y: -40, duration: 0.2, ease: "power2.out" }, K.s0);
        tl.to("#f25-sw", { y: 0, duration: 0.25, ease: "power2.in" }, K.s0 + 0.2);
        tl.fromTo("#f25-spark", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.s0 + 0.2);
        tl.fromTo("#f25-spark path", { scale: 0.4, transformOrigin: "50% 50%" }, { scale: 1.1, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.s0 + 0.2);
      },
    };
  },
};
