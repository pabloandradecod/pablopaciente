// F5 — O calcanhar de Aquiles: mito em estilo de vaso grego (mãe mergulha o bebê segurando pelo calcanhar; flecha no calcanhar); placa "ponto fraco"
export default {
  speakers: { aquiles: "f05a" },
  build(ctx) {
    const { C, aquiles, w, lines } = ctx;
    const k = {
      mit: w(0, "mitologia"), her: w(0, "herói"), merg: w(0, "mergulhado"), inv: w(0, "invencível"), mae: w(0, "mãe"), calc: w(0, "calcanhar"),
      ponto: w(0, "ponto"), fraco: w(0, "fraco"), por: w(0, "Por"), nome: w(0, "nome", 1),
      a0: lines[1].start, a1: lines[1].end, emb: +(lines[1].start + 0.55 * (lines[1].end - lines[1].start)).toFixed(3),
    };
    const BK = "#2A1A12", OR = "#E08A4E";
    const key = (y) => Array.from({ length: 20 }, (_, i) => `<path d="M${90 + i * 60} ${y + 30} L${90 + i * 60} ${y} L${130 + i * 60} ${y} L${130 + i * 60} ${y + 20} L${110 + i * 60} ${y + 20} L${110 + i * 60} ${y + 12}" fill="none" stroke="${BK}" stroke-width="6"/>`).join("");
    return {
      k,
      css: `
        #f05-h { left:110px; top:40px; font-size:56px; color:${C.ink}; }
        #f05-sign { left:1310px; top:110px; width:520px; padding:20px 24px; text-align:center; transform: rotate(2deg); }
        #f05-sign .a { font-size:44px; line-height:1.05; } #f05-sign .b { font-size:40px; color:${C.pain}; margin-top:6px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <!-- painel de vaso grego -->
      <clipPath id="f05-clip"><rect x="80" y="130" width="1180" height="800" rx="30"/></clipPath>
      <g clip-path="url(#f05-clip)">
        <rect x="80" y="130" width="1180" height="800" fill="${OR}"/>
        <rect x="80" y="130" width="1180" height="60" fill="${BK}"/><rect x="80" y="870" width="1180" height="60" fill="${BK}"/>
        <g transform="translate(0,195)">${key(0)}</g><g transform="translate(0,825)">${key(0)}</g>
        <!-- cena 1: mãe e bebê no rio -->
        <g id="f05-myth1">
          <g id="f05-mom">
            <circle cx="520" cy="330" r="42" fill="${BK}"/>
            <path d="M500 296 Q470 300 480 340 L490 400" fill="none" stroke="${BK}" stroke-width="16" stroke-linecap="round"/>
            <path d="M480 380 L560 380 L640 720 L400 720 Z" fill="${BK}"/>
            <path d="M560 400 Q640 420 700 470" fill="none" stroke="${BK}" stroke-width="22" stroke-linecap="round"/>
          </g>
          <g id="f05-baby"><g id="f05-baby-in">
            <path d="M706 470 L712 540" stroke="${BK}" stroke-width="14" stroke-linecap="round"/>
            <ellipse cx="714" cy="580" rx="24" ry="44" fill="${BK}"/><circle cx="716" cy="640" r="26" fill="${BK}"/>
          </g></g>
          <g id="f05-glow" opacity="0"><circle cx="706" cy="478" r="36" fill="none" stroke="${C.sun}" stroke-width="10"/><circle cx="706" cy="478" r="54" fill="none" stroke="${C.sun}" stroke-width="5" opacity="0.6"/></g>
          <g id="f05-water"><path d="M80 690 Q160 670 240 690 T400 690 T560 690 T720 690 T880 690 T1040 690 T1200 690 T1360 690 L1360 870 L80 870 Z" fill="#3C6F8F"/>
            <path d="M120 740 Q160 728 200 740 M420 770 Q460 758 500 770 M820 750 Q860 738 900 750 M1050 790 Q1090 778 1130 790" stroke="#BFE6EE" stroke-width="6" fill="none" stroke-linecap="round"/></g>
          <g id="f05-spark" opacity="0">${[[640, 560], [790, 600], [700, 520], [820, 520], [610, 640]].map(([x, y]) => `<path d="M${x} ${y - 20} L${x + 6} ${y - 6} L${x + 20} ${y} L${x + 6} ${y + 6} L${x} ${y + 20} L${x - 6} ${y + 6} L${x - 20} ${y} L${x - 6} ${y - 6} Z" fill="${C.sun}"/>`).join("")}</g>
        </g>
        <!-- cena 2: o herói adulto e a flecha -->
        <g id="f05-myth2" opacity="0">
          <g id="f05-hero">
            <path d="M700 300 Q700 230 760 230 Q820 230 820 300 Z" fill="${BK}"/><path d="M720 236 Q760 150 800 236" fill="${BK}"/>
            <circle cx="760" cy="320" r="38" fill="${BK}"/>
            <path d="M720 360 L800 360 L820 560 L700 560 Z" fill="${BK}"/>
            <circle cx="660" cy="450" r="70" fill="${BK}"/><circle cx="660" cy="450" r="40" fill="${OR}"/><circle cx="660" cy="450" r="16" fill="${BK}"/>
            <path d="M860 230 L860 700" stroke="${BK}" stroke-width="10"/><path d="M846 240 L860 200 L874 240 Z" fill="${BK}"/>
            <path d="M800 380 L860 420" stroke="${BK}" stroke-width="20" stroke-linecap="round"/>
            <path d="M730 560 L720 790 M790 560 L800 790" stroke="${BK}" stroke-width="26" stroke-linecap="round"/>
            <path d="M700 800 L740 800 M790 800 L840 800" stroke="${BK}" stroke-width="20" stroke-linecap="round"/>
          </g>
          <g id="f05-hit" opacity="0"><circle cx="722" cy="792" r="34" fill="none" stroke="${C.pain}" stroke-width="9"/><circle cx="722" cy="792" r="56" fill="none" stroke="${C.pain}" stroke-width="5" opacity="0.6"/></g>
          <g id="f05-arrow"><g transform="translate(0,0)"><path d="M200 790 L690 790" stroke="${BK}" stroke-width="8"/><path d="M690 776 L722 790 L690 804 Z" fill="${BK}"/><path d="M200 790 L180 770 M200 790 L180 810 M220 790 L200 770 M220 790 L200 810" stroke="${BK}" stroke-width="6"/></g></g>
        </g>
      </g>
      <rect x="80" y="130" width="1180" height="800" rx="30" fill="none" stroke="${C.ink}" stroke-width="9"/>
      <g id="f05-a-wrap" opacity="0"><g transform="translate(1560,960) scale(1.05)">${aquiles("f05a")}</g></g>
    </svg>
    <div id="f05-h" class="abs title" style="opacity:0">Mitologia grega</div>
    <div id="f05-sign" class="abs card" style="opacity:0"><div class="a title">calcanhar de Aquiles</div><div class="b title">= ponto fraco</div></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-h", 0.1, 0.5);
        tl.fromTo("#f05-mom, #f05-baby", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2);
        // mergulha o bebê segurando pelo calcanhar
        tl.to("#f05-baby-in", { y: 190, duration: 0.6, ease: "power2.in" }, K.merg - 0.3);
        tl.set("#f05-spark", { opacity: 1 }, K.inv - 0.2);
        tl.fromTo("#f05-spark path", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1.2, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 3, ease: "back.out(2)" }, K.inv - 0.2);
        tl.to("#f05-baby-in", { y: 0, duration: 0.6, ease: "power2.out" }, Math.max(K.inv + 0.6, K.mae - 0.2));
        tl.set("#f05-glow", { opacity: 1 }, K.calc);
        tl.fromTo("#f05-glow", { scale: 0.5, svgOrigin: "706 478" }, { scale: 1.2, svgOrigin: "706 478", duration: 0.3, yoyo: true, repeat: 5 }, K.calc);
        // anos depois: herói e a flecha
        tl.to("#f05-myth1", { opacity: 0, duration: 0.35 }, K.ponto - 0.9);
        tl.to("#f05-myth2", { opacity: 1, duration: 0.35 }, K.ponto - 0.7);
        tl.fromTo("#f05-arrow", { x: -800 }, { x: 0, duration: 0.35, ease: "power2.in" }, K.ponto - 0.2);
        tl.set("#f05-hit", { opacity: 1 }, K.fraco - 0.05);
        R.shake(tl, "#f05-hero", K.fraco, 0.5, 8);
        tl.fromTo("#f05-hit", { scale: 0.6, svgOrigin: "722 792" }, { scale: 1.25, svgOrigin: "722 792", duration: 0.25, yoyo: true, repeat: 5 }, K.fraco);
        R.pop(tl, "#f05-sign", K.por - 0.1, 0.45);
        // Aquiles aparece e aponta pro próprio calcanhar
        const a = "f05a";
        R.setPose(tl, a, 0, { armF: -20, armB: 20 });
        R.face(tl, a, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f05-a-wrap", { opacity: 1 }, K.a0 - 0.6);
        tl.fromTo("#f05-a-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.a0 - 0.6);
        R.pose(tl, a, K.a0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.pose(tl, a, K.emb - 0.2, 0.3, { armF: 30, armB: -30 });
        R.face(tl, a, K.emb, { eyes: "pain", mouth: "frown" });
        tl.to("#f05a-heel path", { fill: "#FF8A80", duration: 0.2 }, K.emb);
        R.blinks(tl, a, K.a0 - 0.6, K.emb, "happy");
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.merg, vol: 0.35 },
        { name: "sparkle", t: k.inv - 0.2, vol: 0.4 },
        { name: "ping", t: k.calc, vol: 0.3 },
        { name: "whoosh-short", t: k.ponto - 0.25, vol: 0.45 },
        { name: "impact-bass-1", t: k.fraco, vol: 0.4 },
        { name: "pop", t: k.por - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.a0 - 0.6, vol: 0.4 },
      ],
    };
  },
};
