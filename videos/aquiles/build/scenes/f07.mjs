// F7 — Dois tipos: tendão em close com duas zonas (meio do tendão, 2–6 cm acima; inserção no osso) + placa "essa diferença muda os exercícios!"
export default {
  speakers: { aquiles: "f07a" },
  build(ctx) {
    const { C, aquiles, w } = ctx;
    const k = {
      dois: w(0, "dois"), meio: w(0, "meio"), dois2: w(0, "dois", 1), cent: w(0, "centímetros"), comum: w(0, "comum"),
      ins: w(0, "inserção"), osso: w(0, "osso"), guarda: w(0, "Guarda"), dif: w(0, "diferença"), exe: w(0, "exercícios"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    return {
      k,
      css: `
        #f07-h { left:120px; top:50px; font-size:66px; }
        #f07-h span { color:${C.pain}; }
        #f07-c1 { left:1080px; top:330px; width:560px; padding:18px 22px; }
        #f07-c2 { left:1080px; top:640px; width:560px; padding:18px 22px; }
        #root .f07-c .a { font-size:40px; } #root .f07-c .b { font-size:30px; margin-top:4px; }
        #f07-sign { left:1080px; top:160px; width:740px; padding:16px 20px; text-align:center; font-size:42px; background:${C.sun}; transform: rotate(-2deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#FFE4DC"/>
      <!-- músculo em cima, tendão, osso do calcanhar embaixo -->
      <path d="M560 150 Q520 260 640 330 L760 330 Q880 260 840 150 Z" fill="#E0675A" ${st}/>
      <path d="M600 170 Q610 250 660 310 M800 170 Q790 250 740 310" stroke="#B9473E" stroke-width="5" fill="none"/>
      <path d="M650 320 Q670 520 664 760 L736 760 Q730 520 750 320 Z" fill="#F2E8D8" ${st}/>
      <path d="M680 340 L684 750 M700 340 L700 750 M720 340 L716 750" stroke="#D8CBB4" stroke-width="4"/>
      <path d="M520 860 Q500 760 600 740 L800 740 Q900 760 880 860 Z" fill="${C.bone}" ${st}/>
      <text x="700" y="830" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">CALCÂNEO</text>
      <g id="f07-bump" opacity="0"><path d="M780 742 Q830 700 860 760" fill="${C.bone}" ${st}/></g>
      <!-- régua 2–6 cm -->
      <g id="f07-ruler" opacity="0">
        <rect x="430" y="420" width="70" height="320" rx="10" fill="#fff" ${st}/>
        ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M430 ${740 - i * 50} L${i % 2 ? 460 : 476} ${740 - i * 50}" stroke="${C.ink}" stroke-width="4"/>`).join("")}
        <text x="465" y="400" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="${C.ink}">cm</text>
        <path d="M512 640 L512 440" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>
        <text x="530" y="652" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.pain}">2</text><text x="530" y="452" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.pain}">6</text>
      </g>
      <!-- zonas -->
      <g id="f07-z1" opacity="0"><ellipse cx="700" cy="540" rx="90" ry="110" fill="${C.pain}" opacity="0.35"/><ellipse cx="700" cy="540" rx="58" ry="74" fill="none" stroke="${C.pain}" stroke-width="8"/></g>
      <g id="f07-z2" opacity="0"><ellipse cx="700" cy="752" rx="100" ry="56" fill="${C.sun}" opacity="0.45"/><ellipse cx="700" cy="752" rx="66" ry="34" fill="none" stroke="#E0A010" stroke-width="8"/></g>
      <path id="f07-ar1" d="M800 540 L1070 420" stroke="${C.ink}" stroke-width="5" stroke-dasharray="12 8" fill="none" opacity="0"/>
      <path id="f07-ar2" d="M810 752 L1070 720" stroke="${C.ink}" stroke-width="5" stroke-dasharray="12 8" fill="none" opacity="0"/>
      <g id="f07-a-wrap" opacity="0"><g transform="translate(1790,870) scale(0.7)">${aquiles("f07a")}</g></g>
    </svg>
    <div id="f07-h" class="abs title" style="opacity:0"><span>2</span> tipos principais</div>
    <div id="f07-c1" class="abs card f07-c" style="opacity:0"><div class="a title" style="color:${C.pain}">1. MEIO DO TENDÃO</div><div class="b label">2 a 6 cm acima do calcanhar · a mais comum</div></div>
    <div id="f07-c2" class="abs card f07-c" style="opacity:0"><div class="a title" style="color:#C98A1E">2. INSERÇÃO</div><div class="b label">bem onde o tendão se prende no osso</div></div>
    <div id="f07-sign" class="abs card title" style="opacity:0">Essa diferença muda os exercícios!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-h", K.dois - 0.3, 0.5);
        // zona 1: meio do tendão
        tl.set("#f07-z1", { opacity: 1 }, K.meio - 0.1);
        tl.fromTo("#f07-z1", { scale: 0.4, svgOrigin: "700 540" }, { scale: 1, svgOrigin: "700 540", duration: 0.4, ease: "back.out(2)" }, K.meio - 0.1);
        tl.set("#f07-ar1", { opacity: 1 }, K.meio + 0.2);
        R.pop(tl, "#f07-c1", K.meio + 0.2, 0.45);
        R.fadeIn(tl, "#f07-ruler", K.dois2 - 0.2);
        tl.to("#f07-z1 ellipse", { opacity: 0.6, duration: 0.3, yoyo: true, repeat: 3 }, K.comum);
        // zona 2: inserção
        tl.set("#f07-z2", { opacity: 1 }, K.ins - 0.1);
        tl.fromTo("#f07-z2", { scale: 0.4, svgOrigin: "700 752" }, { scale: 1, svgOrigin: "700 752", duration: 0.4, ease: "back.out(2)" }, K.ins - 0.1);
        tl.set("#f07-ar2", { opacity: 1 }, K.ins + 0.2);
        R.pop(tl, "#f07-c2", K.ins + 0.2, 0.45);
        R.fadeIn(tl, "#f07-bump", K.osso);
        // placa + Aquiles anotando
        R.fadeOut(tl, "#f07-ruler", K.guarda - 0.3);
        R.pop(tl, "#f07-sign", K.guarda - 0.1, 0.5);
        const a = "f07a";
        R.setPose(tl, a, 0, { armF: -20, armB: 20 });
        R.face(tl, a, 0, { eyes: "wide", mouth: "smile" });
        tl.set("#f07-a-wrap", { opacity: 1 }, K.guarda - 0.4);
        tl.fromTo("#f07-a-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.guarda - 0.4);
        R.pose(tl, a, K.dif, 0.3, { armF: -160 }, "back.out(2)");
        R.face(tl, a, K.exe, { eyes: "happy", mouth: "grin" });
        R.blinks(tl, a, K.guarda, K.dur, "wide");
      },
      sfx: [
        { name: "pop", t: k.dois - 0.3, vol: 0.35 },
        { name: "ping", t: k.meio - 0.1, vol: 0.35 },
        { name: "pop", t: k.meio + 0.2, vol: 0.3 },
        { name: "ping", t: k.ins - 0.1, vol: 0.35 },
        { name: "pop", t: k.ins + 0.2, vol: 0.3 },
        { name: "impact-bass-1", t: k.guarda + 0.3, vol: 0.35 },
        { name: "whoosh-short", t: k.guarda - 0.4, vol: 0.35 },
      ],
    };
  },
};
