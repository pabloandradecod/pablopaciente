// F25 — Quanto tempo? Calendário longo com a tartaruga atleta, rigidez da manhã descendo, Aquiles costura a capa e mostra os músculos
export default {
  speakers: { aquiles: "f25a" },
  extra: 0.6,
  build(ctx) {
    const { C, aquiles, w, lines } = ctx;
    const k = {
      quanto: w(0, "Quanto"), pac: w(0, "paciente"), doze: w(0, "doze"), seis: w(0, "seis"), mais: w(0, "mais"),
      ins: w(0, "inserção"), dem: w(0, "demorar"), exe: w(0, "exercício"), const: w(0, "constância"), maior: w(0, "maioria"),
      a0: lines[1].start, a1: lines[1].end,
    };
    // rigidez da manhã (x 150..950, y 380..760): desce em ondinhas
    const g = "M150 400 C230 390 260 450 330 460 C400 470 420 520 490 540 C560 560 600 600 670 620 C740 640 780 680 850 700 C900 712 930 718 950 720";
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.doze, vol: 0.35 },
      { name: "pop", t: k.ins, vol: 0.35 },
      { name: "click-soft", t: k.pac + 0.4, vol: 0.3 },
      { name: "sparkle", t: k.const, vol: 0.35 },
      { name: "pop", t: k.maior, vol: 0.35 },
      { name: "impact-bass-1", t: k.a0 + 0.1, vol: 0.3 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f25-head { left:110px; top:60px; font-size:72px; }
        #f25-head span { color:${C.good}; }
        #f25-time { left:150px; top:316px; padding:8px 20px; font-size:36px; color:${C.ink}; }
        #f25-time b { color:${C.good}; }
        #f25-ins { left:620px; top:420px; padding:8px 18px; font-size:30px; color:${C.ink}; }
        #f25-ins b { color:${C.pain}; }
        #f25-ok { left:300px; top:800px; padding:8px 18px; font-size:32px; color:${C.ink}; background:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- calendário longo -->
      <g id="f25-cal" transform="translate(0,50)">
        <rect x="110" y="190" width="1100" height="56" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect id="f25-calfill" x="114" y="194" width="1092" height="48" rx="12" fill="${C.good}"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<line x1="${110 + i * 100}" y1="190" x2="${110 + i * 100}" y2="246" stroke="${C.ink}" stroke-width="3" opacity="0.4"/>`).join("")}
        <path d="M1210 218 L1290 218" stroke="${C.ink}" stroke-width="7" stroke-dasharray="12 10"/>
      </g>
      <g id="f25-turtle"><g transform="translate(150,210)"><g id="f25-tt">
        <ellipse cx="0" cy="0" rx="46" ry="30" fill="#4FA36B" ${st}/><path d="M-30 -6 L30 -6 M-20 -24 L-20 20 M20 -24 L20 20" stroke="#2E7D4A" stroke-width="4"/>
        <circle cx="56" cy="-8" r="18" fill="#7CC48E" ${st}/><rect x="40" y="-26" width="34" height="8" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="3"/><circle cx="62" cy="-12" r="3" fill="${C.ink}"/>
        <g id="f25-legs"><rect x="-34" y="22" width="14" height="18" rx="6" fill="#7CC48E" ${st}/><rect x="20" y="22" width="14" height="18" rx="6" fill="#7CC48E" ${st}/></g>
      </g></g></g>
      <!-- gráfico da rigidez da manhã -->
      <g id="f25-graph" opacity="0" transform="translate(0,40)">
        <rect x="110" y="330" width="890" height="470" rx="24" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <line x1="150" y1="370" x2="150" y2="770" stroke="${C.ink}" stroke-width="5"/><line x1="150" y1="770" x2="970" y2="770" stroke="${C.ink}" stroke-width="5"/>
        <text x="960" y="420" text-anchor="end" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">rigidez da manhã</text>
        <text x="880" y="795" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">semanas</text>
        <path id="f25-line" d="${g}" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Aquiles costurando a capa -->
      <g id="f25-aw"><g transform="translate(1500,880) scale(1.0)">${aquiles("f25a")}
        <g id="f25-needle" opacity="0"><g transform="translate(80,-90)"><g id="f25-nd">
          <path d="M-60 40 Q-30 10 -6 4" fill="none" stroke="${C.pain}" stroke-width="4" stroke-dasharray="8 6"/>
          <line x1="-8" y1="6" x2="34" y2="-30" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><line x1="-8" y1="6" x2="34" y2="-30" stroke="#DDE3E6" stroke-width="4" stroke-linecap="round"/>
          <circle cx="-4" cy="2" r="4" fill="none" stroke="${C.ink}" stroke-width="2"/>
        </g></g></g>
        <g id="f25-stitch" opacity="0"><path d="M62 -110 L92 -96 M66 -90 L96 -76 M66 -70 L96 -56 M64 -50 L92 -36" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g>
      </g></g>
      <g id="f25-spark" opacity="0">${[[1420, 420], [1660, 400], [1720, 560], [1380, 600]].map(([x, y]) => `<path d="M${x} ${y - 22} L${x + 6} ${y - 6} L${x + 22} ${y} L${x + 6} ${y + 6} L${x} ${y + 22} L${x - 6} ${y + 6} L${x - 22} ${y} L${x - 6} ${y - 6} Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f25-head" class="abs title">Quanto <span>TEMPO</span>?</div>
    <div id="f25-time" class="abs card label" style="opacity:0"><b>12 semanas</b> a <b>6 meses</b>... às vezes mais</div>
    <div id="f25-ins" class="abs card label" style="opacity:0">na <b>inserção</b>: costuma demorar mais</div>
    <div id="f25-ok" class="abs card label" style="opacity:0">a grande maioria volta a correr sem dor!</div>`,
      js: function (tl, K, R) {
        const a = "f25a";
        R.setPose(tl, a, 0, { armF: -20, armB: 20 });
        R.face(tl, a, 0, { eyes: "normal", mouth: "flat" });
        tl.set("#f25a-tear", { opacity: 1 }, 0);
        R.blinks(tl, a, 0, K.dur);
        R.slideIn(tl, "#f25-head", 0.05, 0.5, -300);
        tl.fromTo("#f25-aw", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // calendário enche devagar e a tartaruga caminha
        tl.fromTo("#f25-calfill", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: K.mais + 0.6 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f25-turtle", { x: 0 }, { x: 1080, duration: K.a1 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f25-legs", { y: 0 }, { y: -6, duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((K.a1 - K.quanto) / 0.25)), ease: "sine.inOut" }, K.quanto);
        R.pop(tl, "#f25-time", K.doze - 0.1, 0.4);
        // costurando a capa (a agulha vai e volta sobre o rasgo)
        tl.set("#f25-needle", { opacity: 1 }, K.pac);
        R.pose(tl, a, K.pac, 0.3, { armF: -40 });
        const sew = Math.max(2, Math.floor((K.const - K.pac) / 0.5));
        for (let i = 0; i < sew; i++) {
          tl.to("#f25-nd", { x: i % 2 ? 0 : 20, y: Math.min(i * 6, 60), duration: 0.25, ease: "sine.inOut" }, K.pac + i * 0.5);
          tl.to("#f25-nd", { x: i % 2 ? 20 : 0, duration: 0.25, ease: "sine.inOut" }, K.pac + i * 0.5 + 0.25);
        }
        R.face(tl, a, K.pac + 0.2, { eyes: "normal", mouth: "smile" });
        // inserção: demora mais
        tl.fromTo("#f25-ins", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, K.ins - 0.1);
        R.fadeOut(tl, "#f25-ins", K.exe - 0.2);
        // gráfico desce com o exercício
        R.fadeIn(tl, "#f25-graph", K.exe - 0.3, 0.3);
        R.draw(tl, "#f25-line", K.exe - 0.1, Math.max(0.8, K.maior - K.exe), "none");
        // constância: rasgo some, costura aparece
        tl.to("#f25a-tear", { opacity: 0, duration: 0.5 }, K.const);
        tl.to("#f25-stitch", { opacity: 1, duration: 0.5 }, K.const);
        R.fadeOut(tl, "#f25-needle", K.const + 0.3);
        R.face(tl, a, K.const + 0.2, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f25-ok", K.maior, 0.4);
        // fala do Aquiles: mostra os músculos
        R.pose(tl, a, K.a0, 0.35, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f25-aw", { y: -40, duration: 0.2, ease: "power2.out" }, K.a0);
        tl.to("#f25-aw", { y: 0, duration: 0.25, ease: "power2.in" }, K.a0 + 0.2);
        tl.fromTo("#f25-spark", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.a0 + 0.2);
        tl.fromTo("#f25-spark path", { scale: 0.4, transformOrigin: "50% 50%" }, { scale: 1.1, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.a0 + 0.2);
      },
    };
  },
};
