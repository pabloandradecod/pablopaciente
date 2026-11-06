// F6 — O trabalho dele: dupla com o Deltoidão. O Deltoidão puxa a bola pra cima, o Supra segura a bola centralizada; o braço sobe bonito; quando o Supra cansa, a bola sobe e bate no telhado
export default {
  speakers: { deltoidao: "f06d" },
  build(ctx) {
    const { C, supra, acromio, deltoidao, w, lines } = ctx;
    const k = {
      trab: w(0, "trabalho"), comecar: w(0, "começar"), levantar: w(0, "levantar"), princ: w(0, "principalmente"), cent: w(0, "centralizada"),
      delt: w(0, "deltoide"), grand: w(0, "grandão"), puxa: w(0, "puxa"), dupla: w(0, "dupla"), cansa: w(0, "cansa"), bola: w(0, "bola", 1), ctrl: w(0, "controle"),
      d0: lines[1].start, d1: lines[1].end, lev: w(1, "levanto"), seg: w(1, "segura"), foto: w(1, "foto"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const arrow = (id, x1, y1, x2, y2, col) => `<g id="${id}" opacity="0"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="14" stroke-linecap="round"/></g>`;
    return {
      k,
      css: `
        #f06-h { left:90px; top:50px; font-size:62px; }
        #f06-h span { color:${C.pain}; }
        #f06-up { left:1000px; top:250px; padding:10px 18px; font-size:30px; color:${C.pain}; }
        #f06-dn { left:110px; top:560px; padding:10px 18px; font-size:30px; color:#1E9E73; }
        #f06-du { left:820px; top:140px; padding:10px 24px; font-size:44px; background:${C.sun}; }
        #f06-oops { left:250px; top:200px; padding:10px 24px; font-size:42px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#FFE4DC"/>
      <rect id="f06-flash" width="1920" height="1080" fill="#fff" opacity="0"/>
      <!-- pratinho (escápula) -->
      <path d="M420 380 Q520 420 520 520 Q500 600 520 700 Q520 820 420 900 L300 900 L300 380 Z" fill="#EADFC8" ${st}/>
      <path d="M560 500 Q510 620 560 740 L586 740 Q540 620 586 500 Z" fill="${C.bone}" ${st}/>
      <g id="f06-a-wrap"><g transform="translate(730,400) scale(0.85)">${acromio("f06a")}</g></g>
      <!-- bola + braço (gira em torno do centro da bola) -->
      <g id="f06-ballmove"><g id="f06-arm">
        <path d="M700 640 L680 1010 L780 1010 L770 640 Z" fill="${C.bone}" ${st}/>
        <circle id="f06-ball" cx="730" cy="620" r="135" fill="${C.bone}" ${st}/>
        <path d="M650 545 Q710 505 780 525" stroke="#D8CBB4" stroke-width="6" fill="none" stroke-linecap="round"/>
      </g></g>
      <g id="f06-s-wrap"><g transform="translate(610,548) scale(0.42)">${supra("f06s")}</g></g>
      ${arrow("f06-arU", 900, 560, 900, 360, C.pain)}<path id="f06-arUh" d="M870 380 L900 330 L930 380 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5" opacity="0"/>
      ${arrow("f06-arD", 560, 420, 640, 520, C.good)}<path id="f06-arDh" d="M612 528 L668 548 L650 492 Z" fill="${C.good}" stroke="${C.ink}" stroke-width="5" opacity="0"/>
      <g id="f06-d-wrap" opacity="0"><g transform="translate(1420,880) scale(1.0)">${deltoidao("f06d")}</g></g>
      <g id="f06-bump" opacity="0"><path d="M700 440 L680 400 M740 436 L744 392 M780 444 L804 404" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/></g>
    </svg>
    <div id="f06-h" class="abs title" style="opacity:0">Uma <span>dupla</span> no ombro</div>
    <div id="f06-up" class="abs card title" style="opacity:0">DELTOIDE: puxa pra cima</div>
    <div id="f06-dn" class="abs card title" style="opacity:0">SUPRA: segura no centro</div>
    <div id="f06-du" class="abs card title" style="opacity:0">É UMA DUPLA!</div>
    <div id="f06-oops" class="abs card title" style="opacity:0">Supra cansou: a bola sobe!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-h", 0.1, 0.5);
        R.setPose(tl, "f06s", 0, { armF: -60, armB: 20 });
        R.face(tl, "f06s", 0, { eyes: "normal", mouth: "smile" });
        R.face(tl, "f06a", 0, { eyes: "normal", mouth: "flat" });
        // começa a levantar o braço
        tl.to("#f06-arm", { rotation: -20, svgOrigin: "730 620", duration: 0.6, ease: "power2.out" }, K.comecar);
        tl.to("#f06-arm", { rotation: 0, svgOrigin: "730 620", duration: 0.5, ease: "power2.inOut" }, K.princ - 0.2);
        // segura a bola centralizada
        tl.set("#f06-arD, #f06-arDh", { opacity: 1 }, K.cent - 0.2);
        R.draw(tl, "#f06-arD line", K.cent - 0.2, 0.4);
        R.pop(tl, "#f06-dn", K.cent, 0.4);
        R.pose(tl, "f06s", K.cent, 0.3, { armF: -80, armB: -20 }, "back.out(2)");
        R.face(tl, "f06s", K.cent, { eyes: "normal", mouth: "flat" });
        // Deltoidão puxa pra cima
        tl.set("#f06-d-wrap", { opacity: 1 }, K.delt - 0.3);
        tl.fromTo("#f06-d-wrap", { x: 600 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.delt - 0.3);
        R.setPose(tl, "f06d", 0, { armF: -30, armB: 30 });
        R.face(tl, "f06d", K.delt, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f06d", K.grand, 0.35, { armF: -120, armB: 120 }, "back.out(2)");
        tl.set("#f06-arU, #f06-arUh", { opacity: 1 }, K.puxa - 0.1);
        R.draw(tl, "#f06-arU line", K.puxa - 0.1, 0.4);
        R.pop(tl, "#f06-up", K.puxa, 0.4);
        // dupla: braço sobe bonito, bola no lugar
        R.pop(tl, "#f06-du", K.dupla - 0.1, 0.4);
        tl.to("#f06-arm", { rotation: -95, svgOrigin: "730 620", duration: 1.1, ease: "power2.inOut" }, K.dupla);
        tl.to("#f06-arm", { rotation: 0, svgOrigin: "730 620", duration: 0.6, ease: "power2.inOut" }, Math.max(K.dupla + 1.15, K.cansa - 0.7));
        R.fadeOut(tl, "#f06-du, #f06-up, #f06-dn", K.cansa - 0.4);
        // Supra cansa: bola sobe e bate no telhado
        tl.set("#f06s-sweat, #f06s-fray", { opacity: 1 }, K.cansa);
        R.face(tl, "f06s", K.cansa, { eyes: "pain", mouth: "frown" });
        R.pose(tl, "f06s", K.cansa, 0.3, { armF: -20, armB: 20 });
        tl.to("#f06-arD, #f06-arDh", { opacity: 0.25, duration: 0.3 }, K.cansa);
        tl.to("#f06-ballmove", { y: -58, duration: 0.35, ease: "power3.in" }, K.bola - 0.1);
        tl.set("#f06-bump", { opacity: 1 }, K.bola + 0.25);
        R.shake(tl, "#f06a-root", K.bola + 0.25, 0.4, 5);
        R.face(tl, "f06a", K.bola + 0.25, { eyes: "pain", mouth: "scream" });
        R.pop(tl, "#f06-oops", K.ctrl - 0.2, 0.4);
        tl.to("#f06-ballmove", { y: 0, duration: 0.4 }, K.d0 - 0.4);
        tl.to("#f06-bump, #f06-oops", { opacity: 0, duration: 0.3 }, K.d0 - 0.4);
        R.face(tl, "f06a", K.d0 - 0.4, { eyes: "normal", mouth: "frown" });
        // fala do Deltoidão
        tl.set("#f06d-shades", { opacity: 1 }, K.d0 - 0.1);
        R.pose(tl, "f06d", K.lev, 0.3, { armF: -150, armB: 120 }, "back.out(2)");
        R.pose(tl, "f06d", K.seg, 0.3, { armF: -60, armB: 120 });
        R.pose(tl, "f06d", K.foto - 0.1, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        tl.fromTo("#f06-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.35 }, K.foto);
        R.face(tl, "f06s", K.foto, { eyes: "wide", mouth: "flat" });
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.3 },
        { name: "pop", t: k.cent, vol: 0.3 },
        { name: "whoosh-short", t: k.delt - 0.3, vol: 0.4 },
        { name: "pop", t: k.puxa, vol: 0.3 },
        { name: "pop", t: k.dupla - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.bola + 0.25, vol: 0.35 },
        { name: "click", t: k.foto, vol: 0.5 },
      ],
    };
  },
};
