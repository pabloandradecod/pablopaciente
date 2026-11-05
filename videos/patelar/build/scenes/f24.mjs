// F24 — Quanto tempo? Calendário longo com tartaruga atleta, dor descendo em degraus com pico "pulou etapa?", fibras do Molão se reorganizando
export default {
  speakers: { molao: "f24m" },
  extra: 0.6,
  build(ctx) {
    const { C, molao, w, lines } = ctx;
    const k = {
      quanto: w(0, "quanto"), pac: w(0, "paciente"), doze: w(0, "doze"), seis: w(0, "seis"), mais: w(0, "mais"),
      pular: w(0, "Pular"), zero: w(0, "zero"), const: w(0, "constância"), maior: w(0, "maioria"), pula2: w(0, "pular", 1),
      m0: lines[1].start, m1: lines[1].end,
    };
    // gráfico de dor (x 150..950, y 380..760): desce em degraus, pico no meio
    const g = "M150 400 L280 400 L280 470 L410 470 L410 540 L470 540 L500 420 L530 540 L560 600 L690 600 L690 660 L820 660 L820 720 L950 720";
    // novelo bagunçado → cordas alinhadas
    let nov = "M1330 300";
    for (let i = 0; i < 14; i++) nov += ` Q${1330 + ((i * 97) % 420)} ${270 + ((i * 53) % 150)} ${1340 + ((i * 131) % 400)} ${280 + ((i * 71) % 140)}`;
    const cords = [0, 1, 2, 3, 4].map((i) => `<line x1="1340" y1="${300 + i * 24}" x2="1760" y2="${300 + i * 24}" stroke="${C.bone}" stroke-width="12" stroke-linecap="round"/><line x1="1340" y1="${300 + i * 24}" x2="1760" y2="${300 + i * 24}" stroke="#D8CBB4" stroke-width="3"/>`).join("");
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.doze, vol: 0.35 },
      { name: "pop", t: k.seis, vol: 0.35 },
      { name: "error", t: k.pular + 0.3, vol: 0.3 },
      { name: "sparkle", t: k.const, vol: 0.35 },
      { name: "pop", t: k.m0, vol: 0.35 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f24-head { left:110px; top:60px; font-size:72px; }
        #f24-head span { color:${C.good}; }
        #f24-time { left:150px; top:316px; padding:8px 20px; font-size:36px; color:${C.ink}; }
        #f24-time b { color:${C.good}; }
        #f24-skip { left:430px; top:392px; padding:8px 16px; font-size:28px; color:${C.pain}; }
        #f24-ok { left:520px; top:800px; padding:8px 16px; font-size:30px; color:${C.ink}; background:${C.good}; }
        #f24-fib { left:1330px; top:220px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- calendário longo -->
      <g id="f24-cal" transform="translate(0,50)">
        <rect x="110" y="190" width="1100" height="56" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect id="f24-calfill" x="114" y="194" width="1092" height="48" rx="12" fill="${C.good}"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<line x1="${110 + i * 100}" y1="190" x2="${110 + i * 100}" y2="246" stroke="${C.ink}" stroke-width="3" opacity="0.4"/>`).join("")}
        <path d="M1210 218 L1290 218" stroke="${C.ink}" stroke-width="7" stroke-dasharray="12 10"/>
      </g>
      <g id="f24-turtle"><g transform="translate(150,210)"><g id="f24-tt">
        <ellipse cx="0" cy="0" rx="46" ry="30" fill="#4FA36B" ${st}/><path d="M-30 -6 L30 -6 M-20 -24 L-20 20 M20 -24 L20 20" stroke="#2E7D4A" stroke-width="4"/>
        <circle cx="56" cy="-8" r="18" fill="#7CC48E" ${st}/><rect x="40" y="-26" width="34" height="8" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="3"/><circle cx="62" cy="-12" r="3" fill="${C.ink}"/>
        <g id="f24-legs"><rect x="-34" y="22" width="14" height="18" rx="6" fill="#7CC48E" ${st}/><rect x="20" y="22" width="14" height="18" rx="6" fill="#7CC48E" ${st}/></g>
      </g></g></g>
      <!-- gráfico da dor -->
      <g id="f24-graph" opacity="0" transform="translate(0,40)">
        <rect x="110" y="330" width="890" height="470" rx="24" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <line x1="150" y1="370" x2="150" y2="770" stroke="${C.ink}" stroke-width="5"/><line x1="150" y1="770" x2="970" y2="770" stroke="${C.ink}" stroke-width="5"/>
        <text x="170" y="370" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">dor</text>
        <text x="880" y="795" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">tempo</text>
        <path id="f24-line" d="${g}" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <circle id="f24-spike" cx="500" cy="420" r="24" fill="none" stroke="${C.pain}" stroke-width="6" opacity="0"/>
      </g>
      <!-- fibras do Molão -->
      <g id="f24-fibbox" opacity="0"><rect x="1310" y="250" width="470" height="190" rx="20" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <g id="f24-nov"><path d="${nov}" fill="none" stroke="${C.bone}" stroke-width="10" stroke-linecap="round"/><path d="${nov}" fill="none" stroke="#C9B48E" stroke-width="3"/></g>
        <g id="f24-cords" opacity="0">${cords}</g></g>
      <g id="f24-mw"><g transform="translate(1540,880) scale(0.95)">${molao("f24m")}</g></g>
    </svg>
    <div id="f24-head" class="abs title">Quanto <span>TEMPO</span>?</div>
    <div id="f24-time" class="abs card label" style="opacity:0"><b>12 semanas</b> a <b>6 meses</b>... às vezes mais</div>
    <div id="f24-skip" class="abs card label" style="opacity:0">pulou etapa?</div>
    <div id="f24-ok" class="abs card label" style="opacity:0">com constância: volta a pular sem dor!</div>
    <div id="f24-fib" class="abs label" style="opacity:0">fibras do Molão</div>`,
      js: function (tl, K, R) {
        const m = "f24m";
        R.setPose(tl, m, 0, { armF: 20, armB: -20 });
        R.face(tl, m, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, m, 0, K.dur);
        R.slideIn(tl, "#f24-head", 0.05, 0.5, -300);
        tl.fromTo("#f24-mw", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // calendário enche devagar e a tartaruga caminha (lenta e constante)
        tl.fromTo("#f24-calfill", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: K.mais + 0.6 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f24-turtle", { x: 0 }, { x: 1080, duration: K.m1 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f24-legs", { y: 0 }, { y: -6, duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((K.m1 - K.quanto) / 0.25)), ease: "sine.inOut" }, K.quanto);
        R.pop(tl, "#f24-time", K.doze - 0.1, 0.4);
        // novelo aparece ("tendão é paciente")
        R.fadeIn(tl, "#f24-fibbox", K.pac, 0.3);
        R.fadeIn(tl, "#f24-fib", K.pac, 0.3);
        R.face(tl, m, K.pac, { eyes: "pain", mouth: "flat" });
        // gráfico em degraus
        R.fadeIn(tl, "#f24-graph", K.seis - 0.2, 0.3);
        R.draw(tl, "#f24-line", K.seis, K.const - K.seis, "none");
        // pico: pulou etapa
        tl.to("#f24-spike", { opacity: 1, duration: 0.2 }, K.pular + 0.2);
        tl.fromTo("#f24-spike", { scale: 0.6, svgOrigin: "500 460" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 3, svgOrigin: "500 460" }, K.pular + 0.2);
        R.pop(tl, "#f24-skip", K.pular + 0.1, 0.4);
        R.face(tl, m, K.zero, { eyes: "wide", mouth: "scream" });
        R.shake(tl, "#f24-mw", K.zero, 0.4, 5);
        // constância: novelo vira cordas alinhadas
        tl.to("#f24-nov", { opacity: 0, duration: 0.5 }, K.const);
        tl.to("#f24-cords", { opacity: 1, duration: 0.5 }, K.const);
        tl.fromTo("#f24-cords line", { scaleX: 0.3, transformOrigin: "50% 50%" }, { scaleX: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.6)" }, K.const);
        R.face(tl, m, K.const + 0.2, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f24-ok", K.maior, 0.4);
        // Molão pula de alegria em "pular sem dor"
        tl.to("#f24-mw", { y: -80, duration: 0.25, ease: "power2.out" }, K.pula2);
        tl.to("#f24-mw", { y: 0, duration: 0.25, ease: "power2.in" }, K.pula2 + 0.25);
        R.pose(tl, m, K.pula2, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        // fala do Molão
        R.pose(tl, m, K.m0, 0.4, { armF: -60, armB: 60 });
      },
    };
  },
};
