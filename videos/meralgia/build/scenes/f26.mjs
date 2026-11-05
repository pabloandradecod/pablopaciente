// F26 — Vai melhorar? Semanas a meses com tratamento conservador; o Nervinho passa de vermelho a lilás calmo; "não causa fraqueza"
export default {
  speakers: { pablo: "f26p" },
  extra: 1.0,
  build(ctx) {
    const { C, human, nerve, LILAC, w } = ctx;
    const k = {
      boa: w(0, "boa"), maioria: w(0, "maioria"), cons: w(0, "conservador"), sem: w(0, "semanas"), meses: w(0, "meses"),
      causa: w(0, "causa"), ret: w(0, "retirada"), nervo: w(0, "nervo"), sens: w(0, "sensibilidade"), fraq: w(0, "fraqueza"),
      dorm: w(0, "dormência"), sumir: w(0, "sumir"), bem: w(0, "bem"),
      lilac: LILAC, shine: "#E9DEFF",
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "riser", t: k.cons, vol: 0.2, dur: 1.6 },
      { name: "pop", t: k.sem, vol: 0.35 },
      { name: "pop", t: k.causa, vol: 0.35 },
      { name: "sparkle", t: k.ret + 0.3, vol: 0.4 },
      { name: "impact-bass-1", t: k.fraq, vol: 0.35 },
      { name: "pop", t: k.dorm, vol: 0.35 },
    ];
    const pts = [[260, 600], [400, 600], [540, 606], [680, 612], [820, 606], [960, 600], [1080, 600]];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f26-h { left:110px; top:70px; font-size:72px; }
        #f26-h span { color:${C.good}; }
        #f26-wk { left:400px; top:290px; font-size:40px; }
        #f26-wk b { color:${C.good}; }
        #f26-chip { left:120px; top:380px; padding:12px 22px; font-size:32px; display:flex; gap:14px; align-items:center; }
        #f26-seal { left:120px; top:690px; padding:16px 26px; font-size:36px; display:flex; gap:16px; align-items:center; background:${C.good}; }
        #f26-note { left:640px; top:690px; width:520px; padding:16px 24px; font-size:30px; display:flex; gap:16px; align-items:center; line-height:1.15; }
        #f26-note b { color:#8E6CD8; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1560" cy="520" r="330" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(220,275)"><g id="f26-cal">
        <rect x="-70" y="-60" width="140" height="130" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect x="-70" y="-60" width="140" height="38" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="7"/>
        <path d="M-40 -76 L-40 -48 M40 -76 L40 -48" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
        ${Array.from({ length: 9 }, (_, i) => `<rect x="${-48 + (i % 3) * 36}" y="${-10 + Math.floor(i / 3) * 24}" width="22" height="14" rx="3" fill="${C.sky}"/>`).join("")}
      </g></g>
      <rect x="340" y="200" width="760" height="70" rx="35" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
      <rect id="f26-fill" x="350" y="210" width="0" height="50" rx="25" fill="${C.good}"/>
      <g id="f26-nw">${nerve("f26n", pts, 26, 1.5, C.pain, "#FFC2BC")}</g>
    </svg>
    <div id="f26-h" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f26-wk" class="abs title" style="opacity:0">em <b>semanas a alguns meses</b></div>
    <div id="f26-chip" class="abs card label" style="opacity:0">
      <svg width="90" height="50" viewBox="0 0 90 50"><rect x="4" y="14" width="82" height="22" rx="8" fill="#6B3E1F" ${st}/><rect x="30" y="8" width="30" height="34" rx="6" fill="${C.sun}" ${st}/><path d="M6 46 L84 4" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/></svg>
      quando a causa é retirada
    </div>
    <div id="f26-seal" class="abs card label" style="opacity:0">
      <svg width="70" height="70" viewBox="-35 -35 70 70"><path d="M-24 18 Q-30 -6 -12 -14 Q-14 -28 0 -28 Q12 -26 10 -12 Q28 -12 26 10 Q24 24 6 24 L-20 24 Z" fill="#fff" ${st}/></svg>
      NÃO causa fraqueza
    </div>
    <div id="f26-note" class="abs card label" style="opacity:0">
      <svg width="90" height="70" viewBox="0 0 90 70" style="flex:none"><path d="M10 56 L80 56" ${st}/><circle cx="46" cy="34" r="20" fill="${C.sun}" ${st}/><path d="M46 34 m-10 0 a10 10 0 1 0 10 -10" fill="none" ${st}/><path d="M26 54 Q14 40 20 30" fill="none" ${st}/><circle cx="18" cy="26" r="4" fill="${C.ink}"/></svg>
      <span>A <b>dormência</b> pode demorar mais pra sumir. E tudo bem!</span>
    </div>
    <div id="f26-pw" class="abs" style="left:0;top:0;width:1920px;height:1080px"><svg width="1920" height="1080" viewBox="0 0 1920 1080"><g transform="translate(1690,667) scale(-1.1,1.1)">${human("f26p", "pablo")}</g></svg></div>`,
      js: function (tl, K, R) {
        const p = "f26p", n = "f26n";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.slideIn(tl, "#f26-h", 0.05, 0.5, -300);
        tl.fromTo("#f26-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        R.face(tl, n, 0, { eyes: "pain", mouth: "frown" });
        R.shake(tl, "#f26n-face", 0.3, 0.6, 3);
        // barra enche
        R.pop(tl, "#f26-cal", K.boa, 0.4);
        tl.fromTo("#f26-cal", { rotation: -8 }, { rotation: 8, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.cons);
        tl.to("#f26-fill", { attr: { width: 740 }, duration: 2.2, ease: "power2.inOut" }, K.cons);
        R.pop(tl, "#f26-wk", K.sem - 0.1, 0.45);
        R.gesture(tl, p, K.boa, K.nervo - 0.3, 5);
        // tira a causa: o Nervinho acalma e fica lilás
        R.pop(tl, "#f26-chip", K.causa - 0.1, 0.45);
        tl.to(`#${n}-fill, #${n}-face > circle`, { attr: { stroke: K.lilac }, duration: 1.2, ease: "power1.inOut" }, K.ret);
        tl.to(`#${n}-face > circle`, { attr: { fill: K.lilac }, duration: 1.2, ease: "power1.inOut" }, K.ret);
        tl.to(`#${n}-shine`, { attr: { stroke: K.shine }, duration: 1.2 }, K.ret);
        R.face(tl, n, K.ret + 0.6, { eyes: "happy", mouth: "smile" });
        // não causa fraqueza
        R.pop(tl, "#f26-seal", K.fraq - 0.15, 0.45);
        R.pose(tl, p, K.fraq, 0.4, { shF: -150, elF: -80 }, "back.out(2)");
        R.pose(tl, p, K.fraq + 1.2, 0.4, { shF: -10, elF: -20 });
        // dormência pode demorar
        R.pop(tl, "#f26-note", K.dorm - 0.1, 0.45);
        R.face(tl, n, K.dorm, { eyes: "closed", mouth: "smile" });
        R.face(tl, n, K.bem, { eyes: "happy", mouth: "grin" });
        R.face(tl, p, K.bem, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
