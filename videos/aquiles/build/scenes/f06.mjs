// F6 — O tendão mais forte do corpo: perna de lado (gastrocnêmio + sóleo → tendão → calcâneo), panturrilha contrai e o calcanhar sobe; medidor 6–8x o peso
export default {
  speakers: { aquiles: "f06a" },
  build(ctx) {
    const { C, aquiles, w, lines } = ctx;
    const k = {
      forte: w(0, "forte"), junta: w(0, "junta"), mus: w(0, "músculos"), pant: w(0, "panturrilha"), prende: w(0, "prende"), calc: w(0, "calcanhar"),
      corr: w(0, "corrida"), seis: w(0, "seis"), oito: w(0, "oito"), peso: w(0, "peso"), pass: w(0, "passada"),
      a0: lines[1].start, a1: lines[1].end, herc: +(lines[1].start + 0.6 * (lines[1].end - lines[1].start)).toFixed(3),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const lab = (id, y, txt, color) => `<div id="${id}" class="abs card label" style="left:90px;top:${y}px;width:380px;padding:10px 16px;font-size:30px;text-align:center;color:${color};opacity:0">${txt}</div>`;
    const bell = (i) => `<g id="f06-kb${i}" opacity="0" transform="translate(${30 + (i % 4) * 120},${i < 4 ? 120 : 30})"><path d="M-22 -30 Q0 -58 22 -30" fill="none" stroke="${C.ink}" stroke-width="9"/><circle cx="0" cy="0" r="38" fill="#4A4A4A" stroke="${C.ink}" stroke-width="6"/><text x="0" y="10" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="#fff">1x</text></g>`;
    return {
      k,
      css: `
        #f06-h { left:90px; top:60px; padding:12px 24px; font-size:44px; }
        #f06-h span { color:${C.pain}; }
        #f06-meter { left:1200px; top:80px; width:620px; padding:18px 22px; text-align:center; }
        #f06-meter .t { font-size:30px; } #f06-meter .n { font-size:64px; color:${C.pain}; line-height:1.1; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <rect y="870" width="1920" height="210" fill="${C.floor}"/><line x1="0" y1="870" x2="1920" y2="870" stroke="${C.ink}" stroke-width="7"/>
      <!-- linhas dos rótulos -->
      <g id="f06-lines" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8" fill="none">
        <path id="f06-ln0" d="M470 290 L600 270" opacity="0"/><path id="f06-ln1" d="M470 470 L640 520" opacity="0"/>
        <path id="f06-ln2" d="M470 650 L690 680" opacity="0"/><path id="f06-ln3" d="M470 830 L700 830" opacity="0"/>
      </g>
      <!-- perna (canela + panturrilha + tendão) -->
      <g id="f06-shank"><g>
        <path d="M760 90 L900 90 Q912 420 862 770 L700 790 Q636 610 600 430 Q560 260 640 90 Z" fill="${C.skinA}" ${st} opacity="0.55"/>
        <path id="f06-sol" d="M650 360 Q600 520 676 650 Q730 610 736 400 Z" fill="#C24E43" ${st}/>
        <path id="f06-gas" d="M640 110 Q540 270 604 440 Q648 486 696 440 Q726 270 706 110 Z" fill="#E0675A" ${st}/>
        <path d="M610 200 Q600 300 630 400 M680 160 Q690 280 670 420" stroke="#B9473E" stroke-width="5" fill="none" opacity="0.7"/>
        <path id="f06-ten" d="M664 460 Q686 620 686 800 L730 800 Q728 620 712 450 Z" fill="#F2E8D8" ${st}/>
        <path d="M684 520 L696 790 M700 520 L710 790" stroke="#D8CBB4" stroke-width="3"/>
        <g id="f06-tglow" opacity="0"><path d="M664 460 Q686 620 686 800 L730 800 Q728 620 712 450 Z" fill="none" stroke="${C.sun}" stroke-width="16" opacity="0.8"/></g>
      </g></g>
      <!-- pé (gira em torno da ponta do pé) -->
      <g id="f06-foot">
        <path d="M680 780 L860 760 Q990 790 1040 862 L690 866 Q664 830 680 780 Z" fill="${C.skinA}" ${st} opacity="0.55"/>
        <path id="f06-calc" d="M672 800 Q668 864 720 866 L770 866 Q790 826 760 800 Z" fill="${C.bone}" ${st}/>
      </g>
      <g transform="translate(1210,450)"><g id="f06-kbs">${Array.from({ length: 8 }, (_, i) => bell(i)).join("")}</g></g>
      <g id="f06-a-wrap" opacity="0"><g transform="translate(1600,960) scale(0.95)">${aquiles("f06a")}</g></g>
    </svg>
    <div id="f06-h" class="abs card title" style="opacity:0">O tendão <span>mais forte</span> do corpo</div>
    ${lab("f06-l0", 250, "GASTROCNÊMIO", "#B9473E")}
    ${lab("f06-l1", 430, "SÓLEO", "#B9473E")}
    ${lab("f06-l2", 610, "TENDÃO DE AQUILES", "#013E4C")}
    ${lab("f06-l3", 790, "CALCÂNEO (calcanhar)", "#013E4C")}
    <div id="f06-meter" class="abs card" style="opacity:0"><div class="t label">na corrida, a cada passada:</div><div class="n title">6 a 8x</div><div class="t label">o peso do corpo!</div></div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f06-shank, #f06-foot", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.1);
        R.pop(tl, "#f06-h", K.forte - 0.3, 0.45);
        tl.set("#f06-tglow", { opacity: 1 }, K.forte);
        tl.fromTo("#f06-tglow", { opacity: 0.2 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 5 }, K.forte);
        // rótulos
        R.slideIn(tl, "#f06-l0", K.mus, 0.45, -200); tl.set("#f06-ln0", { opacity: 1 }, K.mus + 0.2);
        R.slideIn(tl, "#f06-l1", K.pant, 0.45, -200); tl.set("#f06-ln1", { opacity: 1 }, K.pant + 0.2);
        R.slideIn(tl, "#f06-l2", K.junta, 0.45, -200); tl.set("#f06-ln2", { opacity: 1 }, K.junta + 0.2);
        R.slideIn(tl, "#f06-l3", K.calc - 0.2, 0.45, -200); tl.set("#f06-ln3", { opacity: 1 }, K.calc);
        tl.fromTo("#f06-gas, #f06-sol", { fill: "#E0675A" }, { fill: "#FF8A6E", duration: 0.25, yoyo: true, repeat: 3 }, K.pant);
        // corrida: panturrilha contrai, calcanhar sobe (pé gira na ponta), 3 vezes
        for (let i = 0; i < 3; i++) {
          const t = K.corr + i * 0.9;
          tl.to("#f06-foot", { rotation: 18, svgOrigin: "1040 864", duration: 0.35, ease: "power2.out" }, t);
          tl.to("#f06-shank", { x: 14, y: -86, duration: 0.35, ease: "power2.out" }, t);
          tl.to("#f06-gas", { scaleY: 0.9, scaleX: 1.08, svgOrigin: "660 280", duration: 0.35, ease: "power2.out" }, t);
          tl.to("#f06-foot", { rotation: 0, svgOrigin: "1040 864", duration: 0.35, ease: "power2.in" }, t + 0.45);
          tl.to("#f06-shank", { x: 0, y: 0, duration: 0.35, ease: "power2.in" }, t + 0.45);
          tl.to("#f06-gas", { scaleY: 1, scaleX: 1, svgOrigin: "660 280", duration: 0.35, ease: "power2.in" }, t + 0.45);
        }
        // medidor: pesos se empilham
        R.pop(tl, "#f06-meter", K.seis - 0.3, 0.45);
        for (let i = 0; i < 8; i++) {
          const t = (i < 6 ? K.seis : K.oito) + (i < 6 ? i * 0.08 : (i - 6) * 0.1);
          tl.set(`#f06-kb${i}`, { opacity: 1 }, t);
          tl.fromTo(`#f06-kb${i}`, { y: -200 }, { y: 0, duration: 0.3, ease: "bounce.out" }, t);
        }
        // Aquiles se exibe
        const a = "f06a";
        R.setPose(tl, a, 0, { armF: -20, armB: 20 });
        R.face(tl, a, 0, { eyes: "happy", mouth: "grin" });
        tl.to("#f06-l0, #f06-l1, #f06-l2, #f06-l3, #f06-lines path", { opacity: 0, duration: 0.3 }, K.a0 - 0.8);
        tl.to("#f06-kbs", { opacity: 0, duration: 0.3 }, K.a0 - 0.8);
        tl.set("#f06-a-wrap", { opacity: 1 }, K.a0 - 0.6);
        tl.fromTo("#f06-a-wrap", { y: 520 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.a0 - 0.6);
        R.pose(tl, a, K.a0, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.pose(tl, a, K.herc - 0.2, 0.25, { armF: -170, armB: 170 }, "back.out(2)");
        tl.to("#f06a-body", { scaleX: 1.08, scaleY: 1.04, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: 3 }, K.herc);
        R.blinks(tl, a, K.a0 - 0.6, K.dur, "happy");
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.forte - 0.3, vol: 0.35 },
        { name: "click-soft", t: k.mus, vol: 0.3 }, { name: "click-soft", t: k.pant, vol: 0.3 }, { name: "click-soft", t: k.calc - 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.corr, vol: 0.3 },
        { name: "pop", t: k.seis - 0.3, vol: 0.35 },
        { name: "impact-bass-1", t: k.oito, vol: 0.35 },
        { name: "whoosh-short", t: k.a0 - 0.6, vol: 0.4 },
        { name: "sparkle", t: k.herc, vol: 0.35 },
      ],
    };
  },
};
