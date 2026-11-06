// F6 — E a bursa? Zoom com a Bursinha embaixo dos tendões; tendinopatia × bursite; "muitas vezes vêm juntos"
export default {
  speakers: { bursinha: "f06b" },
  build(ctx) {
    const { C, bursinha, w, lines } = ctx;
    const k = {
      emb: w(0, "embaixo"), bursa: w(0, "bursa"), alm: w(0, "almofadinha"), desl: w(0, "deslizarem"), prob: w(0, "problema"),
      tend: w(0, "tendinopatia"), bursite: w(0, "bursite"), juntos: w(0, "juntos"),
      b0: lines[1].start, b1: lines[1].end, joelho: w(1, "joelho"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const T = [["#8E6CD8", 380], ["#2BB5A0", 430], ["#FF8A3D", 480]];
    return {
      k,
      css: `
        #f06-h { left:90px; top:70px; font-size:56px; } #f06-h span { color:#2E9BD6; }
        #f06-c1, #f06-c2 { top:260px; width:460px; padding:20px 24px; }
        #f06-c1 { left:1010px; } #f06-c2 { left:1010px; top:470px; }
        #f06-c1 .t, #f06-c2 .t { font-size:40px; } #f06-c1 .s, #f06-c2 .s { font-size:28px; margin-top:4px; }
        #f06-c1 .t { color:#E0675A; } #f06-c2 .t { color:#2E9BD6; }
        #f06-seal { left:1500px; top:360px; width:300px; padding:18px; text-align:center; font-size:34px; color:#fff; background:${C.pain}; border:7px solid ${C.ink}; border-radius:22px; transform: rotate(-6deg); }
        #f06-lbl { left:140px; top:690px; padding:8px 16px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f06-panel">
        <rect x="90" y="170" width="820" height="680" rx="30" fill="#FFE4DC" ${st}/>
        <path d="M110 830 L110 640 Q500 560 890 640 L890 830 Z" fill="${C.bone}" ${st}/>
        <text x="500" y="800" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">TÍBIA</text>
        <g id="f06-b-wrap"><g transform="translate(560,640) scale(1.15)">${bursinha("f06b")}</g></g>
        <g id="f06-tendons">${T.map(([c, y], i) => `<path id="f06-t${i}" d="M110 ${y} Q400 ${y + 40} 560 ${y + 140} Q640 ${y + 190} 860 ${560 + i * 20}" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round"/><path d="M110 ${y} Q400 ${y + 40} 560 ${y + 140} Q640 ${y + 190} 860 ${560 + i * 20}" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round"/>`).join("")}</g>
        <g id="f06-glowT" opacity="0"><path d="M300 420 Q480 470 620 600" fill="none" stroke="${C.pain}" stroke-width="70" stroke-linecap="round" opacity="0.35"/></g>
        <g id="f06-glowB" opacity="0"><ellipse cx="560" cy="600" rx="150" ry="70" fill="${C.pain}" opacity="0.35"/></g>
      </g>
    </svg>
    <div id="f06-h" class="abs title">E a <span>bursa</span>?</div>
    <div id="f06-lbl" class="abs card label" style="opacity:0">bursa = almofadinha que ajuda a <b>deslizar</b></div>
    <div id="f06-c1" class="abs card" style="opacity:0"><div class="t title">TENDINOPATIA</div><div class="s label">o problema nos tendões</div></div>
    <div id="f06-c2" class="abs card" style="opacity:0"><div class="t title">BURSITE</div><div class="s label">o problema na bursa</div></div>
    <div id="f06-seal" class="abs title" style="opacity:0">muitas vezes vêm JUNTOS!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-h", 0.1, 0.4);
        tl.fromTo("#f06-panel", { opacity: 0, scale: 0.85, svgOrigin: "500 510" }, { opacity: 1, scale: 1, svgOrigin: "500 510", duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        R.setPose(tl, "f06b", 0, { armF: 20, armB: -20 });
        R.face(tl, "f06b", 0, { eyes: "closed", mouth: "smile" });
        tl.set("#f06-b-wrap", { opacity: 0 }, 0);
        // os tendões levantam um pouco e a bursa aparece embaixo
        tl.to("#f06-tendons", { y: -70, duration: 0.5, ease: "power2.out" }, K.emb);
        tl.set("#f06-b-wrap", { opacity: 1 }, K.bursa - 0.1);
        tl.fromTo("#f06-b-wrap", { scale: 0.3, svgOrigin: "560 640" }, { scale: 1, svgOrigin: "560 640", duration: 0.45, ease: "back.out(2.2)" }, K.bursa - 0.1);
        R.face(tl, "f06b", K.alm, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f06-lbl", K.alm - 0.1, 0.4);
        tl.to("#f06-tendons", { y: -20, duration: 0.5, ease: "power2.in" }, K.desl - 0.3);
        tl.to("#f06-tendons", { x: 40, duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.desl);
        R.squash(tl, "#f06b-body", K.desl + 0.2);
        // tendinopatia × bursite
        R.pop(tl, "#f06-c1", K.tend - 0.1, 0.4);
        tl.to("#f06-glowT", { opacity: 1, duration: 0.2, yoyo: true, repeat: 3 }, K.tend);
        R.pop(tl, "#f06-c2", K.bursite - 0.1, 0.4);
        tl.to("#f06-glowB", { opacity: 1, duration: 0.2, yoyo: true, repeat: 3 }, K.bursite);
        R.face(tl, "f06b", K.bursite, { eyes: "pain", mouth: "frown" });
        // juntos
        R.pop(tl, "#f06-seal", K.juntos - 0.3, 0.45);
        tl.to("#f06-glowT, #f06-glowB", { opacity: 1, duration: 0.25 }, K.juntos);
        // fala da Bursinha
        tl.to("#f06-glowT, #f06-glowB", { opacity: 0, duration: 0.25 }, K.b0 - 0.3);
        R.face(tl, "f06b", K.b0, { eyes: "happy" });
        R.pose(tl, "f06b", K.b0, 0.25, { armF: -120, armB: 120 }, "back.out(2)");
        R.squash(tl, "#f06b-body", K.joelho);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.35 },
        { name: "pop", t: k.bursa - 0.1, vol: 0.45 },
        { name: "pop", t: k.tend - 0.1, vol: 0.35 },
        { name: "pop", t: k.bursite - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.juntos - 0.1, vol: 0.35 },
      ],
    };
  },
};
