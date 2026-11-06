// F5 — Por dentro do ombro (visto de frente): bola do úmero no pratinho; manguito abraçando; Supra sob o telhado do Seu Acrômio; Bursinha no meio
export default {
  speakers: { acromio: "f05a" },
  build(ctx) {
    const { C, supra, acromio, bursinha, w, lines } = ctx;
    const k = {
      bola: w(0, "bola"), prat: w(0, "pratinho"), seg: w(0, "segura"), mang: w(0, "manguito"), quatro: w(0, "quatro"), abr: w(0, "abraçam"),
      sup: w(0, "supraespinhal"), telh: w(0, "telhadinho"), acr: w(0, "acrômio"), bur: w(0, "bursa"), desl: w(0, "deslizar"),
      a0: lines[1].start, a1: lines[1].end, tel: w(1, "telhado"), esp: w(1, "espaço"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // 4 músculos do manguito como arcos em volta da bola (centro 720,640)
    const cuffCol = ["#E0675A", "#F29A6B", "#D9574D", "#F2766B"];
    const arc = (i, a0, a1) => {
      const r = 205, cx = 720, cy = 640, rad = (a) => (a * Math.PI) / 180;
      const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0)), x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
      const hx = x1, hy = y1;
      return `<g id="f05-cuff${i}" opacity="0"><path id="f05-cp${i}" d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/>
        <path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${cuffCol[i]}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="20" fill="${cuffCol[i]}" stroke="${C.ink}" stroke-width="5"/></g>`;
    };
    return {
      k,
      css: `
        #f05-h { left:90px; top:50px; font-size:64px; }
        #f05-h span { color:${C.pain}; }
        #f05-bp { left:1180px; top:200px; width:620px; padding:20px 24px; text-align:center; font-size:40px; }
        #f05-bp b { color:${C.pain}; }
        #f05-mr { left:1180px; top:420px; width:620px; padding:22px 24px; text-align:center; }
        #f05-mr .a { font-size:46px; color:${C.pain}; } #f05-mr .b { font-size:34px; margin-top:6px; }
        #f05-tag { padding:8px 18px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#FFE4DC"/>
      <g transform="translate(0,60)">
      <g id="f05-anat">
        <!-- escápula (pratinho) -->
        <path d="M420 380 Q520 420 520 520 Q500 600 520 700 Q520 820 420 900 L300 900 L300 380 Z" fill="#EADFC8" ${st}/>
        <path id="f05-plate" d="M520 520 Q470 640 520 760 L548 760 Q500 640 548 520 Z" fill="${C.bone}" ${st}/>
        <!-- úmero -->
        <path d="M760 760 L700 1100 L860 1100 L860 760 Z" fill="${C.bone}" ${st}/>
        <circle id="f05-ball" cx="720" cy="640" r="170" fill="${C.bone}" ${st}/>
        <path d="M640 560 Q700 520 770 540" stroke="#D8CBB4" stroke-width="6" fill="none" stroke-linecap="round"/>
        ${arc(0, 120, 175)}${arc(1, 65, 115)}${arc(2, 15, 60)}${arc(3, -30, 10)}
      </g>
      <g id="f05-a-wrap" opacity="0"><g transform="translate(720,330) scale(1.1)">${acromio("f05a")}</g></g>
      <g id="f05-b-wrap" opacity="0"><g transform="translate(790,318) scale(0.4)">${bursinha("f05b")}</g></g>
      <g id="f05-s-wrap" opacity="0"><g transform="translate(700,472) scale(0.5)">${supra("f05s")}</g></g>
      </g>
    </svg>
    <div id="f05-h" class="abs title" style="opacity:0">Por dentro do <span>ombro</span></div>
    <div id="f05-tb" class="abs card label f05-t" style="left:880px;top:820px;opacity:0;padding:8px 18px;font-size:28px">ÚMERO (a bola)</div>
    <div id="f05-tp" class="abs card label" style="left:110px;top:940px;opacity:0;padding:8px 18px;font-size:28px">ESCÁPULA (o pratinho)</div>
    <div id="f05-ts" class="abs card label" style="left:180px;top:360px;opacity:0;padding:8px 18px;font-size:28px">SUPRAESPINHAL</div>
    <div id="f05-tr" class="abs card label" style="left:930px;top:200px;opacity:0;padding:8px 18px;font-size:28px">ACRÔMIO (o telhado)</div>
    <div id="f05-tu" class="abs card label" style="left:920px;top:380px;opacity:0;padding:8px 18px;font-size:28px">BURSA</div>
    <div id="f05-bp" class="abs card label" style="opacity:0">bola <b>grande</b> num pratinho <b>pequeno</b></div>
    <div id="f05-mr" class="abs card" style="opacity:0"><div class="a title">MANGUITO ROTADOR</div><div class="b label">= 4 músculos que abraçam a bola</div></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-h", 0.1, 0.5);
        tl.fromTo("#f05-anat", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        tl.fromTo("#f05-ball", { scale: 1 }, { scale: 1.08, svgOrigin: "720 640", duration: 0.2, yoyo: true, repeat: 1 }, K.bola);
        R.pop(tl, "#f05-tb", K.bola, 0.4);
        tl.fromTo("#f05-plate", { fill: "#F7EEDB" }, { fill: "#FFC94A", duration: 0.25, yoyo: true, repeat: 1 }, K.prat);
        R.pop(tl, "#f05-tp", K.prat, 0.4);
        R.pop(tl, "#f05-bp", K.prat + 0.3, 0.45);
        // manguito: 4 braços abraçando
        R.fadeOut(tl, "#f05-bp", K.mang - 0.3);
        R.pop(tl, "#f05-mr", K.mang, 0.5);
        [0, 1, 2, 3].forEach((i) => {
          tl.set(`#f05-cuff${i}`, { opacity: 1 }, K.quatro + i * 0.2);
          R.draw(tl, `#f05-cuff${i} path`, K.quatro + i * 0.2, 0.5);
        });
        tl.to("#f05-cuff0, #f05-cuff1, #f05-cuff2, #f05-cuff3", { scale: 0.96, svgOrigin: "720 640", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.abr);
        // supraespinhal sob o telhado
        R.fadeOut(tl, "#f05-mr", K.sup - 0.3);
        tl.set("#f05-s-wrap", { opacity: 1 }, K.sup - 0.1);
        tl.fromTo("#f05-s-wrap", { y: 80 }, { y: 0, duration: 0.4, ease: "back.out(2)" }, K.sup - 0.1);
        R.face(tl, "f05s", K.sup, { eyes: "happy", mouth: "grin" });
        R.setPose(tl, "f05s", 0, { armF: -30, armB: 30 });
        R.pose(tl, "f05s", K.sup, 0.3, { armF: -140, armB: 30 }, "back.out(2)");
        R.pop(tl, "#f05-ts", K.sup, 0.4);
        R.pose(tl, "f05s", K.sup + 1, 0.3, { armF: -30, armB: 30 });
        // telhado: Seu Acrômio desce
        tl.set("#f05-a-wrap", { opacity: 1 }, K.telh - 0.3);
        R.drop(tl, "#f05-a-wrap", K.telh - 0.3, 0.7, -500);
        R.face(tl, "f05a", K.telh, { eyes: "normal", mouth: "frown" });
        R.face(tl, "f05s", K.telh + 0.4, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f05-tr", K.acr, 0.4);
        // bursa no meio
        tl.set("#f05-b-wrap", { opacity: 1 }, K.bur - 0.1);
        R.pop(tl, "#f05-b-wrap", K.bur - 0.1, 0.4);
        R.face(tl, "f05b", K.bur, { eyes: "happy", mouth: "smile" });
        R.pop(tl, "#f05-tu", K.bur + 0.1, 0.4);
        tl.to("#f05-s-wrap", { x: 14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.desl);
        tl.to("#f05-b-wrap", { x: -8, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.desl);
        // fala do Acrômio
        tl.to("#f05-tb, #f05-tp, #f05-ts, #f05-tr, #f05-tu", { opacity: 0, duration: 0.3 }, K.a0 - 0.3);
        R.face(tl, "f05a", K.a0, { eyes: "normal", mouth: "frown" });
        R.pose(tl, "f05a", K.tel, 0.3, { armF: -100, armB: 100 }, "back.out(2)");
        tl.to("#f05a-brows", { y: 8, duration: 0.2 }, K.esp - 0.2);
        R.pose(tl, "f05a", K.esp, 0.3, { armF: -40, armB: 40 });
        tl.to("#f05-a-wrap", { y: -16, duration: 0.12, yoyo: true, repeat: 3 }, K.esp);
        R.face(tl, "f05s", K.esp, { eyes: "pain", mouth: "flat" });
        R.face(tl, "f05b", K.esp, { eyes: "wide", mouth: "flat" });
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.bola, vol: 0.3 },
        { name: "pop", t: k.prat, vol: 0.3 },
        { name: "pop", t: k.mang, vol: 0.35 },
        ...[0, 1, 2, 3].map((i) => ({ name: "click-soft", t: k.quatro + i * 0.2, vol: 0.3 })),
        { name: "whoosh-short", t: k.sup - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.telh + 0.2, vol: 0.3 },
        { name: "pop", t: k.bur - 0.1, vol: 0.35 },
      ],
    };
  },
};
