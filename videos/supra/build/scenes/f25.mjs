// F25 — Quanto tempo? Calendário com a tartaruga atleta + 3 cartões (tendinopatia, rotura parcial, tendinite calcária); o Supra costura o rasguinho e flexiona
export default {
  speakers: { supra: "f25s" },
  extra: 0.6,
  build(ctx) {
    const { C, supra, pedrinha, w, lines } = ctx;
    const k = {
      quanto: w(0, "Quanto"), tend: w(0, "tendinopatia"), meses: w(0, "meses"), exe: w(0, "exercício"), rot: w(0, "Rotura"),
      trat: w(0, "tratamento"), calc: w(0, "calcária"), crise: w(0, "crise"), passar: w(0, "passar"), teim: w(0, "teimosos"), med: w(0, "médico"),
      s0: lines[1].start, s1: lines[1].end, forte: w(1, "forte"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.tend - 0.1, vol: 0.35 },
      { name: "pop", t: k.rot - 0.1, vol: 0.35 },
      { name: "click-soft", t: k.rot + 0.6, vol: 0.3 },
      { name: "click-soft", t: k.rot + 1.4, vol: 0.3 },
      { name: "pop", t: k.calc - 0.1, vol: 0.35 },
      { name: "glitch-2", t: k.crise, vol: 0.2 },
      { name: "sparkle", t: k.trat, vol: 0.3 },
      { name: "impact-bass-1", t: k.s0 + 0.1, vol: 0.3 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f25-head { left:110px; top:60px; font-size:72px; }
        #f25-head span { color:#178A63; }
        #root .f25-c { left:110px; width:1000px; padding:14px 24px; font-size:34px; line-height:1.2; color:${C.ink}; display:flex; align-items:center; gap:18px; }
        #root .f25-c .n { flex:none; width:54px; height:54px; border-radius:50%; border:5px solid ${C.ink}; display:flex; align-items:center; justify-content:center; font-size:30px; }
        #root .f25-c b { color:#178A63; }
        #root .f25-c i { font-style:normal; color:#C9302C; }
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
      <!-- Pedrinha (aparece no cartão da calcária) -->
      <g id="f25-pw" opacity="0"><g transform="translate(1180,840) scale(0.6)"><g id="f25-pin">${pedrinha("f25p")}</g></g></g>
      <!-- Supra, com o rasguinho -->
      <g id="f25-sw"><g transform="translate(1520,880) scale(1.15)">${supra("f25s")}
        <g id="f25-stitch" opacity="0">${[-58, -74, -90].map((y) => `<path d="M-22 ${y} L22 ${y + 6} M-10 ${y - 6} L-10 ${y + 10} M8 ${y - 4} L8 ${y + 12}" stroke="${C.pain}" stroke-width="4" stroke-linecap="round"/>`).join("")}</g>
      </g></g>
      <!-- agulha e linha -->
      <g id="f25-needle" opacity="0"><g transform="translate(1560,800)"><g id="f25-nin">
        <path d="M-60 -40 Q-30 -60 0 -20" fill="none" stroke="${C.pain}" stroke-width="4"/>
        <path d="M0 -20 L40 30" stroke="#8A97A0" stroke-width="7" stroke-linecap="round"/><circle cx="4" cy="-14" r="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>
      </g></g></g>
      <g id="f25-spark" opacity="0">${[[1360, 430], [1660, 380], [1720, 560], [1330, 620]].map(([x, y]) => `<path d="M${x} ${y - 22} L${x + 6} ${y - 6} L${x + 22} ${y} L${x + 6} ${y + 6} L${x} ${y + 22} L${x - 6} ${y + 6} L${x - 22} ${y} L${x - 6} ${y - 6} Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f25-head" class="abs title">Quanto <span>TEMPO</span>?</div>
    <div id="f25-c0" class="abs card label f25-c" style="top:350px;opacity:0"><div class="n title" style="background:${C.good}">1</div><div><b>Tendinopatia:</b> 3 a 6 meses de exercício</div></div>
    <div id="f25-c1" class="abs card label f25-c" style="top:490px;opacity:0"><div class="n title" style="background:${C.sun}">2</div><div><b>Rotura parcial:</b> muitas vezes vai bem com exercício</div></div>
    <div id="f25-c2" class="abs card label f25-c" style="top:630px;opacity:0"><div class="n title" style="background:#BFE6EE">3</div><div><b>Tendinite calcária:</b> <i>crise forte</i>, mas costuma passar · casos teimosos: opções com o médico</div></div>`,
      js: function (tl, K, R) {
        const s = "f25s";
        R.setPose(tl, s, 0, { armF: -10, armB: 10 });
        tl.set("#f25s-fray", { opacity: 1 }, 0);
        R.face(tl, s, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, s, 0, K.dur);
        R.slideIn(tl, "#f25-head", 0.05, 0.5, -300);
        tl.fromTo("#f25-sw", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // calendário enche e a tartaruga caminha
        tl.fromTo("#f25-calfill", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: Math.max(1, K.exe + 0.5 - K.quanto), ease: "none" }, K.quanto);
        tl.fromTo("#f25-turtle", { x: 0 }, { x: 1080, duration: K.s1 - K.quanto, ease: "none" }, K.quanto);
        tl.fromTo("#f25-legs", { y: 0 }, { y: -6, duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((K.s1 - K.quanto) / 0.25)), ease: "sine.inOut" }, K.quanto);
        // cartões
        R.pop(tl, "#f25-c0", K.tend - 0.1, 0.4);
        R.pop(tl, "#f25-c1", K.rot - 0.1, 0.4);
        R.pop(tl, "#f25-c2", K.calc - 0.1, 0.4);
        // o Supra costura o rasguinho durante a rotura parcial
        R.face(tl, s, K.rot, { eyes: "normal", mouth: "smile" });
        R.pose(tl, s, K.rot, 0.3, { armF: -40, armB: 40 });
        tl.set("#f25-needle", { opacity: 1 }, K.rot);
        const n0 = K.rot + 0.1, n1 = Math.max(n0 + 1.2, K.trat - 0.1), nn = Math.max(2, Math.floor((n1 - n0) / 0.6));
        for (let i = 0; i < nn; i++) {
          tl.to("#f25-nin", { x: -70, y: 20, duration: 0.3, ease: "power2.in" }, n0 + i * 0.6);
          tl.to("#f25-nin", { x: 0, y: 0, duration: 0.3, ease: "power2.out" }, n0 + i * 0.6 + 0.3);
        }
        tl.fromTo("#f25-stitch path", { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: Math.max(0.1, (n1 - n0) / 4) }, n0);
        tl.set("#f25-stitch", { opacity: 1 }, n0);
        tl.to("#f25s-fray", { opacity: 0, duration: 0.4 }, n1);
        R.fadeOut(tl, "#f25-needle", n1, 0.3);
        R.face(tl, s, n1, { eyes: "happy", mouth: "grin" });
        R.pose(tl, s, n1, 0.3, { armF: -10, armB: 10 });
        // Pedrinha: crise forte, depois passa
        tl.set("#f25-pw", { opacity: 1 }, K.calc);
        tl.fromTo("#f25-pin", { y: 300 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.calc);
        R.face(tl, "f25p", K.calc, { eyes: "normal", mouth: "grin" });
        tl.set("#f25p-glow", { opacity: 1 }, K.crise);
        R.face(tl, "f25p", K.crise, { eyes: "wide", mouth: "scream" });
        R.face(tl, s, K.crise, { eyes: "pain", mouth: "frown" });
        tl.set("#f25p-cracks", { opacity: 1 }, K.passar);
        tl.to("#f25p-glow", { opacity: 0, duration: 0.4 }, K.passar);
        tl.to("#f25-pw", { opacity: 0, scale: 0.4, svgOrigin: "1180 790", duration: 0.6, ease: "power2.in" }, K.passar + 0.3);
        R.face(tl, s, K.passar, { eyes: "happy", mouth: "smile" });
        // fala do Supra: muque e pulinho
        R.pose(tl, s, K.s0, 0.35, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, s, K.s0, { eyes: "happy", mouth: "grin" });
        tl.to("#f25-sw", { y: -40, duration: 0.2, ease: "power2.out" }, K.forte);
        tl.to("#f25-sw", { y: 0, duration: 0.25, ease: "power2.in" }, K.forte + 0.2);
        tl.fromTo("#f25-spark", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.s0 + 0.2);
        tl.fromTo("#f25-spark path", { scale: 0.4, transformOrigin: "50% 50%" }, { scale: 1.1, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.s0 + 0.2);
      },
    };
  },
};
