// F7 — A zona crítica: perto da inserção os vasos ficam fininhos; o relógio passa os anos e as fibras ficam bagunçadas e amareladas; o Supra prefere "experiência"
export default {
  speakers: { supra: "f07s" },
  build(ctx) {
    const { C, supra, w, lines } = ctx;
    const k = {
      perto: w(0, "Perto"), osso: w(0, "osso"), circ: w(0, "circulação"), zona: w(0, "zona"), crit: w(0, "crítica"), anos: w(0, "anos"),
      desg: w(0, "desgastado"), nat: w(0, "natural"), cab: w(0, "cabelo"),
      s0: lines[1].start, s1: lines[1].end, exp: w(1, "experiência"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const neat = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M240 ${448 + i * 20} L1300 ${448 + i * 20}" stroke="#D8CBB4" stroke-width="5"/>`).join("");
    const messy = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M1040 ${448 + i * 20} Q1100 ${430 + i * 22 + (i % 2 ? 26 : -20)} 1160 ${452 + i * 20} Q1230 ${470 + i * 18 + (i % 2 ? -24 : 22)} 1300 ${448 + i * 20}" stroke="#C9A85A" stroke-width="5" fill="none"/>`).join("");
    return {
      k,
      css: `
        #f07-h { left:90px; top:50px; font-size:62px; }
        #f07-h span { color:${C.pain}; }
        #f07-zt { left:1000px; top:300px; padding:10px 22px; font-size:36px; color:${C.pain}; }
        #f07-cl { left:160px; top:720px; width:480px; padding:16px 20px; text-align:center; }
        #f07-cl .a { font-size:30px; } #f07-cl .b { font-size:72px; color:${C.pain}; line-height:1.05; }
        #f07-nat { left:700px; top:740px; padding:12px 22px; font-size:34px; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#FFF1E6"/>
      <!-- músculo, tendão e osso (úmero) -->
      <path d="M40 380 Q160 360 260 420 L260 580 Q160 640 40 620 Z" fill="#E0675A" ${st}/>
      <rect id="f07-tendon" x="240" y="430" width="1080" height="130" rx="40" fill="#F2E8D8" ${st}/>
      ${neat}
      <g id="f07-old" opacity="0"><rect x="1040" y="434" width="270" height="122" rx="30" fill="#F2D98A" opacity="0.75"/>${messy}</g>
      <path d="M1300 300 L1880 300 L1880 820 L1300 820 Q1260 560 1300 300Z" fill="${C.bone}" ${st}/>
      <text x="1600" y="580" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">OSSO (úmero)</text>
      <!-- vasos: grossos à esquerda, fininhos perto do osso -->
      <g id="f07-vess" opacity="0">
        <path d="M60 470 Q400 450 700 470 Q900 480 1040 470" stroke="#D9283B" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M60 520 Q400 540 700 520 Q900 512 1040 520" stroke="#D9283B" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M1040 470 Q1100 474 1160 470" stroke="#D9283B" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="8 10"/>
        <path d="M1040 520 Q1100 516 1160 520" stroke="#D9283B" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="8 10"/>
      </g>
      <g id="f07-zone" opacity="0"><ellipse cx="1180" cy="495" rx="150" ry="110" fill="none" stroke="${C.pain}" stroke-width="8" stroke-dasharray="20 14"/></g>
      <g id="f07-s-wrap" opacity="0"><g transform="translate(1600,1000) scale(0.62)">${supra("f07s")}</g>
        <g id="f07-hair" opacity="0"><path d="M1572 812 Q1580 790 1594 806 Q1600 784 1612 804 Q1622 788 1628 812" fill="#fff" stroke="${C.ink}" stroke-width="4"/></g></g>
    </svg>
    <div id="f07-h" class="abs title" style="opacity:0">A <span>zona crítica</span></div>
    <div id="f07-zt" class="abs card title" style="opacity:0">ZONA CRÍTICA: menos circulação</div>
    <div id="f07-cl" class="abs card" style="opacity:0"><div class="a label">idade</div><div class="b title"><span id="f07-age">30</span> anos</div></div>
    <div id="f07-nat" class="abs card title" style="opacity:0">natural, como cabelo branco por dentro</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-h", 0.1, 0.5);
        // vasos chegando e afinando
        tl.set("#f07-vess", { opacity: 1 }, K.circ - 0.4);
        R.draw(tl, "#f07-vess path", K.circ - 0.4, 0.8);
        tl.set("#f07-zone", { opacity: 1 }, K.zona - 0.1);
        tl.fromTo("#f07-zone ellipse", { scale: 0.5, svgOrigin: "1180 495" }, { scale: 1, svgOrigin: "1180 495", duration: 0.45, ease: "back.out(2)" }, K.zona - 0.1);
        R.pop(tl, "#f07-zt", K.crit, 0.4);
        // o relógio passa os anos
        R.pop(tl, "#f07-cl", K.anos - 0.2, 0.4);
        tl.set("#f07-age", { textContent: "50" }, K.anos + 0.5);
        tl.set("#f07-age", { textContent: "70" }, K.anos + 1.1);
        tl.to("#f07-old", { opacity: 0.5, duration: 0.3 }, K.anos + 0.5);
        tl.to("#f07-old", { opacity: 1, duration: 0.3 }, K.desg);
        R.pop(tl, "#f07-nat", K.nat - 0.1, 0.4);
        // o Supra se ofende
        tl.set("#f07-s-wrap", { opacity: 1 }, K.cab - 0.2);
        tl.fromTo("#f07-s-wrap", { y: 400 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.cab - 0.2);
        tl.set("#f07-hair", { opacity: 1 }, K.cab - 0.2);
        R.setPose(tl, "f07s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f07s", K.cab, { eyes: "wide", mouth: "open" });
        R.face(tl, "f07s", K.s0 + 0.3, { eyes: "normal", mouth: "flat" });
        R.pose(tl, "f07s", K.s0, 0.3, { armF: -90, armB: 90 }, "back.out(2)");
        R.face(tl, "f07s", K.exp, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f07s", K.exp, 0.3, { armF: -150, armB: 20 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.3 },
        { name: "pop", t: k.zona - 0.1, vol: 0.35 },
        { name: "click", t: k.anos + 0.5, vol: 0.3 },
        { name: "click", t: k.anos + 1.1, vol: 0.3 },
        { name: "pop", t: k.nat - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.cab - 0.2, vol: 0.4 },
        { name: "sparkle", t: k.exp, vol: 0.3 },
      ],
    };
  },
};
