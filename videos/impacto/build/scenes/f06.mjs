// F6 — A ideia antiga (quadro sépia): braço sobe, Supra pinçado entre a bola e o telhado ("IMPACTO!"); cartaz de PROCURADO do Seu Acrômio; carimbo EXPLICAÇÃO INCOMPLETA
export default {
  speakers: { acromio: "f06a" },
  build(ctx) {
    const { C, supra, acromio, w, lines } = ctx;
    const k = {
      tempo: w(0, "tempo"), osso: w(0, "osso"), rasp: w(0, "raspando"), lev: w(0, "levanta"), imp: w(0, "impacto"), cir: w(0, "cirurgia"), rasp2: w(0, "raspar"),
      a0: lines[1].start, a1: lines[1].end, sobra: w(1, "sobra"),
    };
    const st = `stroke="#5A3E22" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const sep = "#F1E0BE";
    return {
      k,
      css: `
        #f06-h { left:90px; top:50px; font-size:60px; }
        #f06-h span { color:#8A5A2B; }
        #f06-imp { left:560px; top:330px; font-size:80px; color:${C.pain}; transform: rotate(-8deg); }
        #f06-want { left:1300px; top:120px; width:470px; padding:16px; text-align:center; background:#F6E7C1; transform: rotate(3deg); }
        #f06-want .a { font-size:62px; letter-spacing:0.04em; } #f06-want .b { font-size:28px; color:${C.pain}; }
        #f06-stamp { left:160px; top:470px; padding:10px 26px; font-size:64px; color:${C.pain}; border:9px solid ${C.pain}; border-radius:14px; transform: rotate(-12deg); background:rgba(255,255,255,0.7); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <!-- quadro antigo -->
      <g id="f06-frame">
        <rect x="90" y="150" width="1080" height="700" rx="10" fill="#B07A4A" stroke="${C.ink}" stroke-width="9"/>
        <rect x="130" y="190" width="1000" height="620" fill="${sep}" stroke="#5A3E22" stroke-width="5"/>
        <g style="filter: sepia(0.85) saturate(0.7)">
          <path d="M150 360 Q260 400 260 500 Q240 580 260 680 Q260 780 150 810 Z" fill="#E6D3AE" ${st}/>
          <g id="f06-arm"><path d="M520 620 L940 590 L940 690 L520 720 Z" fill="#EADBB8" ${st}/>
            <circle cx="470" cy="610" r="130" fill="#EADBB8" ${st}/></g>
          <g id="f06-s-wrap"><g transform="translate(470,478) scale(0.42)">${supra("f06s")}</g></g>
          <g transform="translate(470,300) scale(0.9)">${acromio("f06ah")}</g>
        </g>
        <g id="f06-spark" opacity="0">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return `<line x1="${470 + Math.cos(a) * 40}" y1="${360 + Math.sin(a) * 40}" x2="${470 + Math.cos(a) * 90}" y2="${360 + Math.sin(a) * 90}" stroke="${C.sun}" stroke-width="10" stroke-linecap="round"/>`; }).join("")}<circle cx="470" cy="360" r="26" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/></g>
        <g id="f06-rasp" opacity="0"><rect x="560" y="254" width="220" height="34" rx="8" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<line x1="${576 + i * 22}" y1="258" x2="${566 + i * 22}" y2="284" stroke="${C.ink}" stroke-width="3"/>`).join("")}<rect x="780" y="258" width="110" height="26" rx="10" fill="#8B5A2B" stroke="${C.ink}" stroke-width="5"/></g>
        <g id="f06-dust" opacity="0">${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${520 + i * 28}" cy="${360 + (i % 2) * 18}" r="${6 + (i % 3) * 3}" fill="#D8CBB4"/>`).join("")}</g>
      </g>
      <!-- Seu Acrômio de verdade -->
      <g id="f06-a-wrap" opacity="0"><g transform="translate(1520,880) scale(1.15)">${acromio("f06a")}</g></g>
    </svg>
    <div id="f06-h" class="abs title" style="opacity:0">A ideia <span>antiga</span></div>
    <div id="f06-imp" class="abs title" style="opacity:0">IMPACTO!</div>
    <div id="f06-want" class="abs card" style="opacity:0">
      <div class="a title">PROCURADO</div>
      <svg width="300" height="190" viewBox="-160 -230 320 230">${acromio("f06aw")}</svg>
      <div class="b label">acusado de raspar o tendão</div>
    </div>
    <div id="f06-stamp" class="abs title" style="opacity:0">EXPLICAÇÃO INCOMPLETA</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-h", 0.1, 0.5);
        tl.fromTo("#f06-frame", { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 0.1);
        R.face(tl, "f06s", 0, { eyes: "normal", mouth: "smile" });
        R.face(tl, "f06ah", 0, { eyes: "normal", mouth: "frown" });
        R.face(tl, "f06aw", 0, { eyes: "normal", mouth: "frown" });
        // braço sobe: a bola sobe e espreme o Supra
        tl.to("#f06-arm", { rotation: -32, svgOrigin: "470 610", duration: 0.7, ease: "power2.inOut" }, K.lev - 0.2);
        tl.to("#f06-arm", { y: -26, duration: 0.7, ease: "power2.inOut" }, K.lev - 0.2);
        tl.to("#f06-s-wrap", { scaleY: 0.8, svgOrigin: "470 478", y: -26, duration: 0.6, ease: "power2.in" }, K.lev - 0.1);
        R.face(tl, "f06s", K.lev + 0.4, { eyes: "pain", mouth: "scream" });
        tl.set("#f06-spark", { opacity: 1 }, K.imp - 0.1);
        tl.fromTo("#f06-spark", { scale: 0.3, svgOrigin: "470 360" }, { scale: 1.1, svgOrigin: "470 360", duration: 0.3, ease: "back.out(3)" }, K.imp - 0.1);
        R.pop(tl, "#f06-imp", K.imp - 0.1, 0.4);
        tl.to("#f06-spark", { opacity: 0, duration: 0.3 }, K.cir - 0.3);
        // cirurgia para raspar o osso
        tl.set("#f06-rasp", { opacity: 1 }, K.cir);
        tl.fromTo("#f06-rasp", { x: 200 }, { x: 0, duration: 0.4, ease: "power2.out" }, K.cir);
        tl.to("#f06-rasp", { x: -60, duration: 0.18, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.rasp2);
        tl.fromTo("#f06-dust", { opacity: 0, y: 0 }, { opacity: 1, y: 40, duration: 1.2, ease: "power1.out" }, K.rasp2);
        R.face(tl, "f06ah", K.rasp2, { eyes: "pain", mouth: "scream" });
        // cartaz de procurado
        R.pop(tl, "#f06-want", K.osso, 0.5);
        tl.to("#f06-want", { rotation: -2, duration: 0.15, yoyo: true, repeat: 3 }, K.rasp);
        // fala do Acrômio real
        tl.set("#f06-a-wrap", { opacity: 1 }, K.a0 - 0.6);
        tl.fromTo("#f06-a-wrap", { x: 600 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.a0 - 0.6);
        R.face(tl, "f06a", K.a0 - 0.6, { eyes: "normal", mouth: "frown" });
        R.pose(tl, "f06a", K.a0, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        tl.to("#f06a-brows", { y: 8, duration: 0.2 }, K.a0);
        R.pose(tl, "f06a", K.sobra, 0.3, { armF: -60, armB: 60 });
        // carimbo
        tl.set("#f06-stamp", { opacity: 1 }, K.a1 + 0.1);
        tl.fromTo("#f06-stamp", { scale: 2.4 }, { scale: 1, duration: 0.3, ease: "power4.in" }, K.a1 + 0.1);
        tl.to("#f06-frame", { x: 6, duration: 0.05, yoyo: true, repeat: 3 }, K.a1 + 0.4);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.osso, vol: 0.35 },
        { name: "whoosh-short", t: k.lev - 0.2, vol: 0.3 },
        { name: "impact-bass-1", t: k.imp - 0.1, vol: 0.35 },
        { name: "glitch-2", t: k.rasp2, vol: 0.25 },
        { name: "whoosh-short", t: k.a0 - 0.6, vol: 0.35 },
        { name: "impact-bass-2", t: k.a1 + 0.35, vol: 0.4 },
      ],
    };
  },
};
