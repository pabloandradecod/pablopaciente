// F16 — E os exames? Diagnóstico clínico; ultrassom ótimo pra ver o supra (o Supra aparece na tela); raio-X mostra a Pedrinha;
// acima dos 60, rotura parcial sem dor é muito comum; exame sempre junto com o exame físico. Pedrinha: "Saí bem na foto?"
export default {
  speakers: { pedrinha: "f16e" },
  tail: 1.4,
  build(ctx) {
    const { C, w, lines, supra, pedrinha } = ctx;
    const k = {
      exa: w(0, "exames"), diag: w(0, "diagnóstico"), clin: w(0, "clínico"), us: w(0, "ultrassom"), otimo: w(0, "ótimo"),
      raio: w(0, "raio"), ped: w(0, "pedrinha"), acima: w(0, "acima"), sem: w(0, "sem"), rasg: w(0, "rasguinho"), junto: w(0, "junto"),
      e0: lines[1].start, e1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f16-sign { left:150px; top:150px; padding:10px 24px; font-size:50px; background:${C.sun}; border:7px solid ${C.ink}; border-radius:18px; transform:rotate(-4deg); }
        #root .f16-card { position:absolute; left:700px; width:600px; padding:16px 22px; font-size:34px; line-height:1.15; }
        #root .f16-card b { color:${C.pain}; } #root .f16-card i { font-style:normal; color:#137A5A; }
        #f16-c0 { top:150px; } #f16-c1 { top:290px; } #f16-c2 { top:430px; }
        #f16-stamp { left:700px; top:620px; width:1140px; padding:16px 30px; text-align:center; font-size:40px; color:${C.ink}; background:#BFE8F7; border:7px solid ${C.ink}; border-radius:20px; transform:rotate(-2deg); }
        #f16-stamp span { color:${C.pain}; }
        #f16-jn { left:700px; top:748px; white-space:nowrap; padding:12px 26px; font-size:32px; background:#9BE8C9; border:6px solid ${C.ink}; border-radius:40px; }
        #f16-xl { left:1380px; top:150px; font-size:30px; color:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <clipPath id="f16-scr"><rect x="222" y="300" width="276" height="180" rx="16"/></clipPath>
      <g id="f16-us"><g id="f16-us-in">
        <rect x="200" y="640" width="320" height="40" rx="14" fill="${C.grey}" ${st}/>
        <rect x="340" y="500" width="40" height="150" fill="${C.grey}" ${st}/>
        <rect x="220" y="680" width="20" height="120" fill="${C.grey}" ${st}/><rect x="480" y="680" width="20" height="120" fill="${C.grey}" ${st}/>
        <circle cx="230" cy="812" r="18" fill="${C.ink}"/><circle cx="490" cy="812" r="18" fill="${C.ink}"/>
        <rect x="190" y="270" width="340" height="240" rx="30" fill="#fff" ${st}/>
        <rect x="222" y="300" width="276" height="180" rx="16" fill="#1B3440" stroke="${C.ink}" stroke-width="5"/>
        <g clip-path="url(#f16-scr)">
          <path d="M240 470 L290 320 L430 320 L480 470 Z" fill="#2E5566" opacity="0.8"/>
          <g id="f16-sc" opacity="0"><g transform="translate(360,486) scale(0.5)">${supra("f16s")}</g></g>
        </g>
        <path id="f16-scan" d="M240 420 Q300 380 330 400 Q380 420 480 390" fill="none" stroke="#BFE6EE" stroke-width="4" opacity="0.6"/>
        <path d="M530 400 Q610 420 600 520" fill="none" stroke="${C.ink}" stroke-width="7"/>
        <g id="f16-probe"><rect x="582" y="510" width="40" height="80" rx="14" fill="${C.sky}" ${st}/></g>
      </g></g>
      <!-- raio-X -->
      <g id="f16-xr" opacity="0">
        <rect x="1360" y="130" width="480" height="420" rx="18" fill="#1B2630" stroke="${C.ink}" stroke-width="8"/>
        <rect x="1376" y="146" width="448" height="388" rx="10" fill="none" stroke="#3E5563" stroke-width="3"/>
        <path d="M1420 250 Q1560 220 1700 250 L1710 280 Q1560 258 1420 290 Z" fill="#9FB4C1" opacity="0.7"/>
        <circle cx="1600" cy="430" r="96" fill="#9FB4C1" opacity="0.55"/>
        <rect x="1560" y="440" width="80" height="94" fill="#9FB4C1" opacity="0.55"/>
        <g id="f16-pe-wrap"><g transform="translate(1660,390) scale(0.75)">${pedrinha("f16e")}</g></g>
        <g id="f16-flash" opacity="0"><rect x="1360" y="130" width="480" height="420" rx="18" fill="#fff"/></g>
      </g>
    </svg>
    <div id="f16-xl" class="abs title" style="opacity:0">RAIO-X</div>
    <div id="f16-sign" class="abs title" style="opacity:0">E OS EXAMES?</div>
    <div id="f16-c0" class="f16-card card label" style="opacity:0">Diagnóstico: <i>CLÍNICO</i> (conversa + exame físico)</div>
    <div id="f16-c1" class="f16-card card label" style="opacity:0"><b>Ultrassom:</b> ótimo pra ver o supra</div>
    <div id="f16-c2" class="f16-card card label" style="opacity:0"><b>Raio-X:</b> mostra a Pedrinha de cálcio</div>
    <div id="f16-stamp" class="abs title" style="opacity:0">Acima dos 60: rotura parcial <span>SEM DOR</span> é muito comum</div>
    <div id="f16-jn" class="abs label" style="opacity:0">exame de imagem + exame físico: sempre juntos</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f16-us", { x: -700 }, { x: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f16-sign", Math.max(0.3, K.exa - 0.1), 0.4);
        tl.fromTo("#f16-scan", { y: 0 }, { y: -30, duration: 0.6, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.6);
        tl.to("#f16-probe", { rotation: -12, svgOrigin: "602 550", duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.8);
        R.slideIn(tl, "#f16-c0", K.diag - 0.3, 0.5, 200);
        tl.to("#f16-c0", { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1 }, K.clin);
        // ultrassom: o Supra aparece na tela
        R.slideIn(tl, "#f16-c1", K.us - 0.2, 0.5, 200);
        R.setPose(tl, "f16s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f16s", 0, { eyes: "happy", mouth: "smile" });
        tl.to("#f16-sc", { opacity: 1, duration: 0.4 }, K.us);
        R.pose(tl, "f16s", K.otimo, 0.3, { armF: -140, armB: 20 }, "back.out(2)");
        // raio-X com a Pedrinha
        R.setPose(tl, "f16e", 0, { armF: -20, armB: 20 });
        R.face(tl, "f16e", 0, { eyes: "normal", mouth: "smile" });
        tl.to("#f16-xr", { opacity: 1, duration: 0.3 }, K.raio - 0.3);
        R.fadeIn(tl, "#f16-xl", K.raio - 0.2, 0.3);
        R.slideIn(tl, "#f16-c2", K.raio - 0.1, 0.5, 200);
        tl.fromTo("#f16-pe-wrap", { scale: 0.6, svgOrigin: "1660 390" }, { scale: 1, svgOrigin: "1660 390", duration: 0.4, ease: "back.out(2.4)" }, K.ped - 0.1);
        tl.set("#f16e-glow", { opacity: 0 }, 0);
        // acima dos 60
        tl.to("#f16-c0, #f16-c1", { opacity: 0.35, duration: 0.3 }, K.acima - 0.3);
        tl.fromTo("#f16-stamp", { scale: 2.0, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: -2, duration: 0.35, ease: "back.out(2)" }, K.acima - 0.2);
        tl.to("#f16-stamp", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.sem);
        tl.set("#f16s-fray", { opacity: 1 }, K.rasg);
        R.face(tl, "f16s", K.rasg, { eyes: "wide", mouth: "smile" });
        R.pose(tl, "f16s", K.rasg, 0.3, { armF: -20, armB: 20 });
        R.pop(tl, "#f16-jn", K.junto - 0.2, 0.4);
        // Pedrinha posa pra foto
        tl.set("#f16-flash", { opacity: 0.9 }, K.e0 - 0.2);
        tl.to("#f16-flash", { opacity: 0, duration: 0.4, ease: "power2.out" }, K.e0 - 0.15);
        R.pose(tl, "f16e", K.e0, 0.3, { armF: -150, armB: 60 }, "back.out(2)");
        R.face(tl, "f16e", K.e0, { eyes: "happy", mouth: "grin" });
        tl.to("#f16-pe-wrap", { scale: 1.15, svgOrigin: "1660 390", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.e0 + 0.2);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: Math.max(0.3, k.exa - 0.1), vol: 0.35 },
        { name: "whoosh-short", t: k.diag - 0.3, vol: 0.35 },
        { name: "whoosh-short", t: k.us - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.raio - 0.1, vol: 0.35 },
        { name: "pop", t: k.ped - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.acima - 0.1, vol: 0.4 },
        { name: "pop", t: k.junto - 0.2, vol: 0.35 },
        { name: "sparkle", t: k.e0 - 0.2, vol: 0.4 },
      ],
    };
  },
};
