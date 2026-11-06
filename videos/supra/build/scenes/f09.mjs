// F9 — A Pedrinha: depósito de cálcio dentro do tendão; quando o corpo dissolve, brilho vermelho e termômetro de dor até 10; "tendinite calcária: dor fortíssima, mas costuma passar"
export default {
  speakers: { pedrinha: "f09p" },
  build(ctx) {
    const { C, pedrinha, w, lines } = ctx;
    const k = {
      esp: w(0, "especial"), dep: w(0, "depósito"), calc: w(0, "cálcio"), tend: w(0, "tendinite"), dissol: w(0, "dissolver"),
      dor: w(0, "dor"), fort: w(0, "fortíssima"), pass: w(0, "passar"),
      p0: lines[1].start, p1: lines[1].end, vis: w(1, "visita"), bar: w(1, "barulho"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const fibers = [0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M140 ${430 + i * 24} L1240 ${430 + i * 24}" stroke="#D8CBB4" stroke-width="5"/>`).join("");
    return {
      k,
      css: `
        #f09-h { left:90px; top:50px; font-size:62px; }
        #f09-h span { color:${C.pain}; }
        #f09-sign { left:150px; top:760px; width:880px; padding:16px 24px; text-align:center; }
        #f09-sign .a { font-size:42px; color:${C.pain}; } #f09-sign .b { font-size:32px; margin-top:4px; }
        #f09-tm { left:1440px; top:140px; width:380px; padding:16px; text-align:center; }
        #f09-tm .t { font-size:30px; }
        #f09-cal { left:520px; top:240px; padding:10px 20px; font-size:32px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#FFF1E6"/>
      <rect id="f09-tint" x="120" y="400" width="1140" height="190" rx="50" fill="${C.pain}" opacity="0"/>
      <rect x="140" y="410" width="1100" height="170" rx="50" fill="#F2E8D8" ${st}/>
      ${fibers}
      <path d="M1240 330 L1340 330 L1340 660 L1240 660 Q1200 495 1240 330Z" fill="${C.bone}" ${st}/>
      <text x="690" y="390" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">TENDÃO DO SUPRAESPINHAL</text>
      <g id="f09-p-wrap" opacity="0"><g transform="translate(700,560) scale(0.85)">${pedrinha("f09p")}</g></g>
      <g id="f09-boom" opacity="0">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return `<line x1="${700 + Math.cos(a) * 140}" y1="${495 + Math.sin(a) * 140}" x2="${700 + Math.cos(a) * 200}" y2="${495 + Math.sin(a) * 200}" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`; }).join("")}</g>
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">Um caso <span>especial</span></div>
    <div id="f09-cal" class="abs card title" style="opacity:0">depósito de CÁLCIO</div>
    <div id="f09-tm" class="abs card" style="opacity:0"><div class="t title">DOR</div>
      <svg width="200" height="600" viewBox="0 0 200 600">
        <rect x="70" y="20" width="60" height="480" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect id="f09-fill" x="80" y="40" width="40" height="460" rx="20" fill="${C.pain}"/>
        <circle cx="100" cy="530" r="54" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/>
        ${[0, 2, 4, 6, 8, 10].map((n) => `<text x="150" y="${500 - n * 44}" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">${n}</text>`).join("")}
      </svg></div>
    <div id="f09-sign" class="abs card" style="opacity:0"><div class="a title">TENDINITE CALCÁRIA</div><div class="b label">dor fortíssima, mas <b style="color:#1E9E73">costuma passar</b></div></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f09-h", 0.1, 0.5);
        tl.set("#f09-fill", { scaleY: 0.05, svgOrigin: "100 500" }, 0);
        // a Pedrinha se instala
        tl.set("#f09-p-wrap", { opacity: 1 }, K.dep - 0.1);
        tl.fromTo("#f09-p-wrap", { scale: 0, svgOrigin: "700 560" }, { scale: 1, svgOrigin: "700 560", duration: 0.5, ease: "back.out(2)" }, K.dep - 0.1);
        R.setPose(tl, "f09p", 0, { armF: -20, armB: 20 });
        R.face(tl, "f09p", K.dep, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f09-cal", K.calc - 0.1, 0.4);
        R.pop(tl, "#f09-sign", K.tend - 0.1, 0.45);
        tl.to("#f09-sign .b", { opacity: 0, duration: 0.01 }, K.tend - 0.1);
        // dissolvendo: brilho vermelho, rachaduras, dor sobe até 10
        R.fadeOut(tl, "#f09-cal", K.dissol - 0.3);
        tl.set("#f09p-glow, #f09p-cracks", { opacity: 1 }, K.dissol);
        tl.to("#f09-tint", { opacity: 0.35, duration: 0.4 }, K.dissol);
        R.face(tl, "f09p", K.dissol, { eyes: "wide", mouth: "open" });
        R.pop(tl, "#f09-tm", K.dor - 0.3, 0.4);
        tl.to("#f09-fill", { scaleY: 1, svgOrigin: "100 500", duration: 0.7, ease: "power3.in" }, K.dor);
        tl.set("#f09-boom", { opacity: 1 }, K.fort);
        tl.fromTo("#f09-boom", { scale: 0.6, svgOrigin: "700 495" }, { scale: 1.2, svgOrigin: "700 495", duration: 0.25, yoyo: true, repeat: 3 }, K.fort);
        R.shake(tl, "#f09-tm", K.fort, 0.5, 6);
        // costuma passar
        tl.to("#f09-sign .b", { opacity: 1, duration: 0.3 }, K.pass - 0.3);
        tl.to("#f09-boom, #f09-tint", { opacity: 0, duration: 0.4 }, K.pass);
        tl.to("#f09p-glow", { opacity: 0, duration: 0.4 }, K.pass);
        tl.to("#f09-fill", { scaleY: 0.25, svgOrigin: "100 500", duration: 0.8, ease: "power2.out" }, K.pass);
        tl.to("#f09-p-wrap", { scale: 0.7, svgOrigin: "700 560", duration: 0.6 }, K.pass);
        // fala da Pedrinha
        R.face(tl, "f09p", K.p0, { eyes: "happy", mouth: "smile" });
        R.pose(tl, "f09p", K.vis, 0.3, { armF: -140 }, "back.out(2)");
        R.pose(tl, "f09p", K.bar, 0.25, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f09p", K.bar, { eyes: "happy", mouth: "grin" });
        tl.to("#f09-p-wrap", { y: -30, duration: 0.15, yoyo: true, repeat: 3 }, K.bar);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.3 },
        { name: "pop", t: k.dep - 0.1, vol: 0.4 },
        { name: "pop", t: k.tend - 0.1, vol: 0.3 },
        { name: "riser", t: k.dor, vol: 0.25, dur: 1 },
        { name: "impact-bass-2", t: k.fort, vol: 0.4 },
        { name: "sparkle", t: k.pass, vol: 0.3 },
        { name: "glitch-2", t: k.bar, vol: 0.25 },
      ],
    };
  },
};
