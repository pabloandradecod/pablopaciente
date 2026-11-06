// F21 — Degrau 3: rotação externa deitada de lado (peso leve, toalha sob o cotovelo) + remada com elástico (escápulas se aproximam); Deltoidão e Supra: "dupla equilibrada"
export default {
  speakers: { deltoidao: "f21d" },
  extra: 0.6,
  build(ctx) {
    const { C, human, supra, deltoidao, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), rot: w(0, "rotação"), deit: w(0, "deitada"), peso: w(0, "peso"), leve: w(0, "leve"),
      rem: w(0, "remada"), ela: w(0, "elástico"), fort: w(0, "fortalecer"), esc: w(0, "escápula"), assim: w(0, "Assim"), viz: w(0, "vizinhos"),
      d0: lines[1].start, d1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const sk = "#E3A47E", top = "#B07ED8", pants = "#3E5A8A";
    const tube = (x1, y1, x2, y2, wd, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ink}" stroke-width="${wd + 12}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${wd}" stroke-linecap="round"/>`;
    const db = `<rect x="-24" y="-5" width="48" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-32" y="-14" width="12" height="28" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/><rect x="20" y="-14" width="12" height="28" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/>`;
    return {
      k,
      css: `
        #f21-head { left:110px; top:60px; font-size:60px; }
        #f21-head span { color:#1E9C72; }
        #f21-tip { left:110px; top:170px; padding:12px 22px; font-size:30px; }
        #f21-tip b { color:#1E9C72; }
        #f21-back { left:1240px; top:160px; width:420px; padding:14px 18px; text-align:center; }
        #f21-back .t { font-size:24px; }
        #f21-sign { left:0; right:0; margin:auto; width:760px; top:200px; padding:16px 30px; font-size:50px; background:${C.sun}; text-align:center; }
        #f21-sign b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <!-- deitada de lado (vista de frente) -->
      <g id="f21-lie">
        <rect x="430" y="800" width="1060" height="40" rx="14" fill="#3DD9A4" ${st}/>
        ${tube(1010, 730, 1250, 760, 46, pants)}${tube(1250, 760, 1420, 770, 40, pants)}
        <ellipse cx="1430" cy="782" rx="34" ry="18" fill="#8E2F45" ${st}/>
        <path d="M640 690 Q820 660 1020 700 L1020 790 Q820 800 640 790 Z" fill="${top}" ${st}/>
        <rect x="440" y="770" width="170" height="40" rx="18" fill="#BFE6EE" ${st}/>
        <circle cx="560" cy="720" r="58" fill="${sk}" ${st}/>
        <path d="M512 700 Q520 650 570 660 Q610 660 616 700 Q590 680 560 684 Q530 686 512 700Z" fill="#5A3A2A" ${st}/>
        <circle cx="575" cy="725" r="6" fill="${C.ink}"/><path d="M560 750 Q574 758 588 750" stroke="${C.ink}" stroke-width="4" fill="none"/>
        <rect id="f21-towel" x="830" y="700" width="60" height="26" rx="8" fill="#FF8A7A" stroke="${C.ink}" stroke-width="4"/>
        ${tube(680, 690, 860, 690, 30, top)}
        <g id="f21-fa">${tube(860, 690, 860, 790, 26, sk)}<g transform="translate(860,800)">${db}</g><circle cx="860" cy="796" r="15" fill="${sk}" ${st}/></g>
        <path id="f21-arc" d="M900 770 A100 100 0 0 0 900 610" fill="none" stroke="${C.pain}" stroke-width="7" stroke-dasharray="12 10" opacity="0"/>
      </g>
      <!-- remada com elástico -->
      <g id="f21-row" opacity="0">
        <rect x="1100" y="300" width="40" height="560" fill="#B07A4A" stroke="${C.ink}" stroke-width="6"/><circle cx="1120" cy="520" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
        <g transform="translate(560,628) scale(1.3)">${human("f21c", "cida")}
          <path id="f21-band" d="M136 -115 L431 -84" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round"/>
        </g>
      </g>
      <!-- dupla equilibrada -->
      <g id="f21-duo" opacity="0">
        <g id="f21-d-wrap"><g transform="translate(1030,860) scale(0.9)">${deltoidao("f21d")}</g></g>
        <g id="f21-s-wrap"><g transform="translate(800,860) scale(1.2)">${supra("f21s")}</g></g>
        <g id="f21-five" opacity="0"><path transform="translate(-65,0)" d="M950 560 L970 520 M990 560 L1030 540 M930 590 L890 570" stroke="${C.sun}" stroke-width="10" stroke-linecap="round"/></g>
      </g>
    </svg>
    <div id="f21-head" class="abs title">Degrau 3: <span>ROTAÇÃO EXTERNA E ESCÁPULA</span></div>
    <div id="f21-tip" class="abs card label" style="opacity:0">deitada de lado · <b>peso leve</b> · toalha sob o cotovelo</div>
    <div id="f21-back" class="abs card" style="opacity:0">
      <svg width="380" height="300" viewBox="-190 -150 380 300">
        <rect x="-130" y="-120" width="260" height="250" rx="50" fill="${top}" ${st}/>
        <line x1="0" y1="-110" x2="0" y2="120" stroke="${C.ink}" stroke-width="5" stroke-dasharray="10 8"/>
        <g id="f21-scL"><path d="M-110 -80 L-40 -80 L-60 60 Z" fill="${C.bone}" ${st}/></g>
        <g id="f21-scR"><path d="M110 -80 L40 -80 L60 60 Z" fill="${C.bone}" ${st}/></g>
        <path id="f21-arrL" d="M-120 0 L-80 0 M-92 -12 L-78 0 L-92 12" stroke="${C.pain}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0"/>
        <path id="f21-arrR" d="M120 0 L80 0 M92 -12 L78 0 L92 12" stroke="${C.pain}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0"/>
      </svg>
      <div class="t label">visto de costas: as <b style="color:#1E9C72">escápulas se aproximam</b></div>
    </div>
    <div id="f21-sign" class="abs card title" style="opacity:0"><b>dupla equilibrada</b></div>`,
      js: function (tl, K, R) {
        const c = "f21c";
        // rotação externa deitada de lado
        R.pop(tl, "#f21-tip", K.deit - 0.2, 0.4);
        tl.set("#f21-fa", { rotation: 0, svgOrigin: "860 690" }, 0);
        const t0 = K.rot, sp = 1.6, reps = Math.max(2, Math.floor((K.rem - 0.5 - t0) / sp));
        for (let i = 0; i < reps; i++) {
          const t = t0 + i * sp;
          tl.to("#f21-fa", { rotation: 160, svgOrigin: "860 690", duration: 0.7, ease: "sine.inOut" }, t);
          tl.to("#f21-fa", { rotation: 0, svgOrigin: "860 690", duration: 0.7, ease: "sine.inOut" }, t + 0.8);
          tl.fromTo("#f21-arc", { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);
          tl.to("#f21-arc", { opacity: 0, duration: 0.3 }, t + 0.8);
        }
        // remada com elástico
        tl.to("#f21-lie, #f21-tip", { opacity: 0, duration: 0.3 }, K.rem - 0.5);
        tl.to("#f21-row", { opacity: 1, duration: 0.3 }, K.rem - 0.4);
        R.setPose(tl, c, 0, { shF: -80, elF: 0, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        R.pop(tl, "#f21-back", K.ela - 0.1, 0.45, 0.6);
        const r0 = K.ela + 0.1, rr = Math.max(2, Math.floor((K.assim - 0.3 - r0) / 1.5));
        for (let i = 0; i < rr; i++) {
          const t = r0 + i * 1.5;
          R.pose(tl, c, t, 0.65, { shF: 30, elF: -110 }, "sine.inOut");
          tl.to("#f21-band", { attr: { d: "M35 -68 L431 -84" }, duration: 0.65, ease: "sine.inOut" }, t);
          tl.to("#f21-scL", { x: 24, duration: 0.65, ease: "sine.inOut" }, t);
          tl.to("#f21-scR", { x: -24, duration: 0.65, ease: "sine.inOut" }, t);
          tl.to("#f21-arrL, #f21-arrR", { opacity: 1, duration: 0.2 }, t);
          R.pose(tl, c, t + 0.75, 0.65, { shF: -80, elF: 0 }, "sine.inOut");
          tl.to("#f21-band", { attr: { d: "M136 -115 L431 -84" }, duration: 0.65, ease: "sine.inOut" }, t + 0.75);
          tl.to("#f21-scL, #f21-scR", { x: 0, duration: 0.65, ease: "sine.inOut" }, t + 0.75);
          tl.to("#f21-arrL, #f21-arrR", { opacity: 0, duration: 0.2 }, t + 0.75);
        }
        // Deltoidão e Supra: dupla equilibrada
        tl.to("#f21-row, #f21-back", { opacity: 0, duration: 0.3 }, K.assim - 0.3);
        tl.to("#f21-duo", { opacity: 1, duration: 0.3 }, K.assim - 0.2);
        tl.fromTo("#f21-d-wrap", { x: 500 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, K.assim - 0.2);
        tl.fromTo("#f21-s-wrap", { x: -500 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, K.assim - 0.2);
        R.setPose(tl, "f21s", 0, { armF: -30, armB: 30 });
        R.setPose(tl, "f21d", 0, { armF: -30, armB: 30 });
        R.face(tl, "f21s", 0, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f21d", 0, { eyes: "happy", mouth: "grin" });
        // high five: braço da frente do Supra e braço de trás do Deltoidão se encontram no meio
        R.pose(tl, "f21s", K.viz - 0.1, 0.3, { armF: -150 }, "back.out(2)");
        R.pose(tl, "f21d", K.viz - 0.1, 0.3, { armB: 150 }, "back.out(2)");
        tl.to("#f21-five", { opacity: 1, duration: 0.1 }, K.viz + 0.2);
        tl.to("#f21-five", { opacity: 0, duration: 0.3 }, K.viz + 0.8);
        R.pop(tl, "#f21-sign", K.d0 - 0.2, 0.45, 0.6);
        R.pose(tl, "f21d", K.d0 + 0.4, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        R.pose(tl, "f21s", K.d0 + 0.4, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
      },
      sfx: [
        { name: "pop", t: k.deit - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.rem - 0.5, vol: 0.3 },
        { name: "pop", t: k.ela - 0.1, vol: 0.3 },
        { name: "whoosh", t: k.assim - 0.2, vol: 0.35 },
        { name: "impact-bass-2", t: k.viz + 0.2, vol: 0.3 },
        { name: "chime", t: k.d0, vol: 0.3 },
      ],
    };
  },
};
