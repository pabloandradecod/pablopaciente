// F5 — Quem é o supraespinhal: escápula vista de trás; o músculo na valetinha em cima, o trajeto por baixo do Seu Acrômio até o topo do úmero; o Supra na ponta
export default {
  speakers: { acromio: "f05a", supra: "f05s" },
  build(ctx) {
    const { C, supra, acromio, w, lines } = ctx;
    const k = {
      nasce: w(0, "nasce"), esc: w(0, "escápula"), passa: w(0, "passa"), acr: w(0, "acrômio"), prende: w(0, "prende"), umero: w(0, "úmero"),
      quatro: w(0, "quatro"), mang: w(0, "manguito"), tendao: w(0, "tendão"), probl: w(0, "problema"),
      a0: lines[1].start, a1: lines[1].end, lic: w(1, "licença"), viu: w(1, "viu"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    return {
      k,
      css: `
        #f05-h { left:90px; top:50px; font-size:62px; }
        #f05-h span { color:${C.pain}; }
        #root .f05-t { padding:8px 18px; font-size:28px; }
        #f05-mr { left:1300px; top:620px; width:540px; padding:18px 22px; text-align:center; }
        #f05-mr .a { font-size:30px; } #f05-mr .b { font-size:44px; color:${C.pain}; line-height:1.05; margin-top:4px; }
        #f05-top { left:1300px; top:820px; width:540px; padding:12px 18px; text-align:center; font-size:30px; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#FFF1E6"/>
      <g id="f05-anat">
        <!-- escápula vista de trás -->
        <path d="M380 300 L900 330 Q960 360 930 430 L520 900 Q470 930 440 880 L330 380 Q320 310 380 300Z" fill="#EADFC8" ${st}/>
        <!-- músculo na fossa (acima da espinha) -->
        <path id="f05-mus" d="M370 330 L880 350 Q900 380 870 400 L420 470 Q370 440 370 330Z" fill="#E0675A" ${st} opacity="0"/>
        <path id="f05-musl" d="M420 360 L840 370 M420 400 L820 385 M440 440 L800 400" stroke="#B9473E" stroke-width="5" opacity="0"/>
        <!-- espinha da escápula -->
        <path d="M400 490 Q650 430 960 360" stroke="${C.ink}" stroke-width="40" fill="none" stroke-linecap="round"/>
        <path d="M400 490 Q650 430 960 360" stroke="${C.bone}" stroke-width="26" fill="none" stroke-linecap="round"/>
        <!-- úmero -->
        <path d="M1110 520 L1060 960 L1200 960 L1220 520 Z" fill="${C.bone}" ${st}/>
        <circle cx="1150" cy="440" r="110" fill="${C.bone}" ${st}/>
        <text x="1150" y="470" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">ÚMERO</text>
      </g>
      <!-- trajeto do tendão -->
      <path id="f05-path" d="M600 400 Q860 380 1000 330 Q1100 300 1150 334" fill="none" stroke="${C.good}" stroke-width="14" stroke-dasharray="26 18" stroke-linecap="round" opacity="0"/>
      <g id="f05-a-wrap" opacity="0"><g transform="translate(1010,250) scale(0.72)">${acromio("f05a")}</g></g>
      <g id="f05-s-wrap" opacity="0"><g transform="translate(1150,334) scale(0.4)">${supra("f05s")}</g></g>
      <g id="f05-ins" opacity="0"><circle cx="1150" cy="334" r="26" fill="none" stroke="${C.pain}" stroke-width="6"/></g>
    </svg>
    <div id="f05-h" class="abs title" style="opacity:0">Quem é o <span>supraespinhal</span>?</div>
    <div id="f05-te" class="abs card label f05-t" style="left:640px;top:790px;opacity:0">ESCÁPULA (vista de trás)</div>
    <div id="f05-tm" class="abs card label f05-t" style="left:250px;top:200px;opacity:0">MÚSCULO SUPRAESPINHAL</div>
    <div id="f05-ta" class="abs card label f05-t" style="left:1170px;top:130px;opacity:0">ACRÔMIO</div>
    <div id="f05-tu" class="abs card label f05-t" style="left:1260px;top:420px;opacity:0">topo do úmero</div>
    <div id="f05-mr" class="abs card" style="opacity:0"><div class="a label">1 dos 4 músculos do</div><div class="b title">MANGUITO ROTADOR</div></div>
    <div id="f05-top" class="abs card label" style="opacity:0">o tendão que <b style="color:${C.pain}">mais tem problema</b> no ombro</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-h", 0.1, 0.5);
        tl.fromTo("#f05-anat", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        R.pop(tl, "#f05-te", K.esc - 0.2, 0.4);
        // músculo nasce na valetinha
        tl.to("#f05-mus, #f05-musl", { opacity: 1, duration: 0.4 }, K.nasce - 0.1);
        tl.fromTo("#f05-mus", { scaleX: 0.2, svgOrigin: "370 400" }, { scaleX: 1, svgOrigin: "370 400", duration: 0.6, ease: "power2.out" }, K.nasce - 0.1);
        R.pop(tl, "#f05-tm", K.nasce + 0.3, 0.4);
        // passa por baixo do acrômio
        tl.set("#f05-a-wrap", { opacity: 1 }, K.passa - 0.2);
        R.drop(tl, "#f05-a-wrap", K.passa - 0.2, 0.6, -400);
        R.face(tl, "f05a", K.passa, { eyes: "normal", mouth: "frown" });
        tl.set("#f05-path", { opacity: 1 }, K.passa);
        R.draw(tl, "#f05-path", K.passa, Math.max(0.8, K.prende - K.passa));
        R.pop(tl, "#f05-ta", K.acr - 0.1, 0.4);
        // prende no topo do úmero: o Supra aparece
        tl.set("#f05-s-wrap, #f05-ins", { opacity: 1 }, K.prende);
        tl.fromTo("#f05-s-wrap", { scale: 0, svgOrigin: "1150 334" }, { scale: 1, svgOrigin: "1150 334", duration: 0.45, ease: "back.out(2)" }, K.prende);
        tl.fromTo("#f05-ins circle", { scale: 0.6, svgOrigin: "1150 334" }, { scale: 1.4, svgOrigin: "1150 334", duration: 0.3, yoyo: true, repeat: 3 }, K.prende);
        R.pop(tl, "#f05-tu", K.umero - 0.1, 0.4);
        R.setPose(tl, "f05s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f05s", K.prende, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f05s", K.umero, 0.3, { armF: -150 }, "back.out(2)");
        R.pose(tl, "f05s", K.umero + 0.8, 0.3, { armF: -20 });
        // manguito
        R.pop(tl, "#f05-mr", K.quatro - 0.1, 0.45);
        R.pop(tl, "#f05-top", K.probl - 0.2, 0.4);
        R.face(tl, "f05s", K.probl, { eyes: "wide", mouth: "flat" });
        tl.set("#f05s-sweat", { opacity: 1 }, K.probl);
        // fala do Acrômio
        tl.to("#f05-te, #f05-tm, #f05-ta, #f05-tu", { opacity: 0, duration: 0.3 }, K.a0 - 0.3);
        R.pose(tl, "f05a", K.a0, 0.3, { armF: -100, armB: 100 }, "back.out(2)");
        tl.to("#f05a-brows", { y: 8, duration: 0.2 }, K.lic - 0.2);
        R.pose(tl, "f05a", K.lic, 0.3, { armF: -40, armB: 40 });
        tl.to("#f05-a-wrap", { y: -14, duration: 0.12, yoyo: true, repeat: 3 }, K.viu);
        R.face(tl, "f05s", K.lic, { eyes: "normal", mouth: "smile" });
        R.pose(tl, "f05s", K.lic, 0.3, { armB: 120 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.nasce - 0.1, vol: 0.3 },
        { name: "impact-bass-1", t: k.passa + 0.3, vol: 0.3 },
        { name: "pop", t: k.prende, vol: 0.4 },
        { name: "pop", t: k.quatro - 0.1, vol: 0.3 },
        { name: "pop", t: k.probl - 0.2, vol: 0.3 },
      ],
    };
  },
};
