// F14 — Tela dividida: sinal de Tinel (esquerda) e teste de compressão pélvica (direita)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w, LILAC } = ctx;
    const k = {
      bat: w(0, "Batidinhas"), ponta: w(0, "ponta"), disp: w(0, "disparar"), coxa: w(0, "coxa"), tin: w(0, "Tinel"),
      comp: w(0, "compressão"), deit: w(0, "deitado"), emp: w(0, "empurro"), qc: w(0, "quarenta"), tens: w(0, "tensão"),
      ali: w(0, "aliviam"), ref: w(0, "reforça"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const glove = `<circle r="22" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M-10 -14 L-10 -30 M0 -16 L0 -34 M10 -14 L10 -30" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>`;
    // nervo no diagrama (sem rosto): de dentro da pelve, passa medial à ponta do quadril e desce na coxa lateral
    const nd = "M520 300 Q500 380 452 446 Q420 490 392 560 Q370 630 362 720";
    const fan = "M392 560 Q350 610 330 690 M392 560 Q380 640 392 740";
    return {
      k,
      css: `
        #root .f14-panel { position:absolute; top:150px; width:880px; height:700px; background:#fff; border:7px solid ${C.ink}; border-radius:30px; box-shadow:10px 10px 0 ${C.ink}; }
        #root .f14-h { position:absolute; left:0; right:0; top:22px; text-align:center; font-size:54px; }
        #root .f14-chip { position:absolute; font-size:30px; padding:6px 16px; border-radius:16px; border:5px solid ${C.ink}; background:${C.sun}; white-space:nowrap; }
        #root .f14-lil { background:${LILAC}; }
        #root .f14-ok { background:${C.good}; }
        #f14-badge { left:0; right:0; top:46px; text-align:center; }
        #f14-badge span { display:inline-block; font-size:40px; background:${C.good}; color:${C.ink}; padding:8px 26px; border-radius:20px; border:6px solid ${C.ink}; box-shadow:6px 6px 0 ${C.ink}; }
        #root .f14-num { position:absolute; left:1650px; top:300px; width:150px; text-align:center; font-size:64px; color:${C.ink}; }
        #f14-sec { left:1650px; top:378px; width:150px; text-align:center; font-size:26px; }
        #f14-barlab { left:1040px; top:258px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="${C.wall}"/></svg>
    <div id="f14-pl" class="f14-panel" style="left:60px"><div class="f14-h title">SINAL DE <span style="color:#8E6CD8">TINEL</span></div></div>
    <div id="f14-pr" class="f14-panel" style="left:980px"><div class="f14-h title">COMPRESSÃO <span style="color:#8E6CD8">PÉLVICA</span></div></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f14-L">
        <!-- quadril e coxa vistos de frente (lado direito) -->
        <path d="M240 340 Q250 260 360 250 Q440 248 446 330 Q448 390 428 430 L300 470 Q250 430 240 340 Z" fill="${C.bone}" ${st}/>
        <path d="M280 470 Q270 600 300 790 L520 790 Q560 600 560 470 Q500 430 420 440 Q330 440 280 470 Z" fill="${C.skinB}" ${st}/>
        <path d="M560 470 Q600 420 660 400" fill="none" ${st}/>
        <circle id="f14-asis" cx="428" cy="430" r="14" fill="${C.bone}" ${st}/>
        <g id="f14-patch" opacity="0"><ellipse cx="350" cy="640" rx="56" ry="120" fill="${LILAC}" opacity="0.75"/></g>
        <path d="${nd}" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/>
        <path id="f14-nv" d="${nd}" fill="none" stroke="${LILAC}" stroke-width="12" stroke-linecap="round"/>
        <path d="${fan}" fill="none" stroke="${LILAC}" stroke-width="7" stroke-linecap="round"/>
        <path id="f14-zap" d="${nd}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0"/>
        <g transform="translate(470,452)"><g id="f14-tap" opacity="0">${glove}</g></g>
        <g id="f14-rings" opacity="0"><circle cx="458" cy="462" r="30" fill="none" stroke="#8E6CD8" stroke-width="5"/><circle cx="458" cy="462" r="50" fill="none" stroke="#8E6CD8" stroke-width="4" opacity="0.6"/></g>
      </g>
      <g id="f14-R">
        <rect x="1060" y="640" width="560" height="34" rx="12" fill="#7FB8C4" stroke="${C.ink}" stroke-width="6"/>
        <rect x="1090" y="674" width="20" height="120" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/><rect x="1580" y="674" width="20" height="120" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>
        <rect x="1060" y="608" width="110" height="34" rx="15" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(1360,596) scale(0.82)">${human("f14z", "ze")}</g>
        <g id="f14-zpatch" opacity="0"><ellipse cx="1430" cy="582" rx="70" ry="22" fill="${LILAC}" opacity="0.8"/></g>
        <g id="f14-press"><g transform="translate(1340,520)">${glove}</g><g transform="translate(1390,520)">${glove}</g>
          <path d="M1365 450 L1365 486 M1351 474 L1365 490 L1379 474" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
        <!-- barra de formigamento -->
        <rect x="1040" y="300" width="360" height="40" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect id="f14-bar" x="1046" y="306" width="348" height="28" rx="10" fill="${LILAC}"/>
        <!-- cronômetro -->
        <circle cx="1725" cy="340" r="88" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <path id="f14-sweep" d="M1725 340 L1725 262" stroke="#8E6CD8" stroke-width="10" stroke-linecap="round"/>
      </g>
    </svg>
    <div id="f14-barlab" class="abs label">formigamento</div>
    ${["0", "15", "30", "45"].map((n, i) => `<div id="f14-n${i}" class="f14-num title" style="opacity:${i ? 0 : 1}">${n}</div>`).join("")}
    <div id="f14-sec" class="abs label">segundos</div>
    <div id="f14-c1" class="f14-chip label" style="left:120px;top:250px;opacity:0">ponta do quadril</div>
    <div id="f14-c2" class="f14-chip label" style="left:520px;top:420px;opacity:0">batidinhas</div>
    <div id="f14-c3" class="f14-chip f14-lil label" style="left:420px;top:700px;opacity:0">formiga na coxa!</div>
    <div id="f14-c4" class="f14-chip label" style="left:1040px;top:720px;opacity:0">deitado de lado · lado bom embaixo</div>
    <div id="f14-c5" class="f14-chip f14-ok label" style="left:1100px;top:380px;opacity:0">ALIVIOU!</div>
    <div id="f14-badge" class="abs label" style="opacity:0"><span>Alívio dos sintomas = REFORÇA A SUSPEITA</span></div>`,
      js: function (tl, K, R) {
        const z = "f14z";
        tl.fromTo("#f14-pl", { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
        tl.fromTo("#f14-pr", { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0.1);
        R.fadeIn(tl, "#f14-L", 0.3, 0.3);
        R.fadeIn(tl, "#f14-R", 0.4, 0.3);
        tl.set("#f14-R, #f14-barlab, #f14-n0, #f14-sec", { opacity: 0.3 }, 0.75);
        // ---- esquerda: Tinel
        R.pop(tl, "#f14-c1", K.ponta - 0.1, 0.35);
        tl.fromTo("#f14-asis", { scale: 1 }, { scale: 1.5, svgOrigin: "428 430", duration: 0.2, yoyo: true, repeat: 1 }, K.ponta);
        tl.set("#f14-tap", { opacity: 1 }, K.bat - 0.1);
        for (let i = 0; i < 4; i++) {
          tl.fromTo("#f14-tap", { y: -26 }, { y: 0, duration: 0.12, ease: "power3.in" }, K.bat + i * 0.32);
          tl.to("#f14-tap", { y: -26, duration: 0.14, ease: "power2.out" }, K.bat + i * 0.32 + 0.12);
        }
        R.pop(tl, "#f14-c2", K.bat + 0.2, 0.35);
        tl.fromTo("#f14-rings", { opacity: 1, scale: 0.5, svgOrigin: "458 462" }, { opacity: 0, scale: 1.4, svgOrigin: "458 462", duration: 0.5, ease: "power2.out" }, K.disp);
        tl.set("#f14-zap", { opacity: 1 }, K.disp);
        R.draw(tl, "#f14-zap", K.disp, 0.5, "power1.in");
        tl.to("#f14-zap", { opacity: 0, duration: 0.3 }, K.disp + 0.6);
        tl.fromTo("#f14-patch", { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3 }, K.coxa - 0.2);
        tl.set("#f14-patch", { opacity: 1 }, K.coxa + 0.45);
        R.pop(tl, "#f14-c3", K.coxa, 0.35);
        tl.to("#f14-tap", { opacity: 0, duration: 0.2 }, K.tin + 0.4);
        // ---- foco passa para a direita
        tl.to("#f14-L, #f14-c1, #f14-c2, #f14-c3", { opacity: 0.3, duration: 0.3 }, K.comp - 0.3);
        tl.to("#f14-R, #f14-barlab, #f14-n0, #f14-sec", { opacity: 1, duration: 0.3 }, K.comp - 0.3);
        // Seu Zé deitado
        R.setPose(tl, z, 0, { root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4, hipF: -10, hipB: -25, knF: 20, knB: 35, anF: 0, anB: 0 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "flat" });
        tl.set("#f14-zpatch", { opacity: 1 }, K.comp);
        R.pop(tl, "#f14-c4", K.deit - 0.1, 0.35);
        R.face(tl, z, K.deit, { eyes: "pain", mouth: "frown" });
        // mãos empurram a pelve para baixo
        tl.fromTo("#f14-press", { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, K.emp - 0.2);
        tl.to("#f14-press", { y: 14, duration: 0.3, ease: "power2.in" }, K.emp + 0.2);
        // cronômetro 0 → 45 e barra esvaziando
        const t0 = K.qc - 0.1, t1 = K.ali;
        tl.fromTo("#f14-sweep", { rotation: 0, svgOrigin: "1725 340" }, { rotation: 270, svgOrigin: "1725 340", duration: t1 - t0, ease: "none" }, t0);
        [1, 2, 3].forEach((i) => {
          const t = t0 + ((t1 - t0) * i) / 3;
          tl.set(`#f14-n${i - 1}`, { opacity: 0 }, t);
          tl.set(`#f14-n${i}`, { opacity: 1 }, t);
        });
        tl.fromTo("#f14-bar", { scaleX: 1, svgOrigin: "1046 320" }, { scaleX: 0.12, svgOrigin: "1046 320", duration: t1 - t0, ease: "power1.inOut" }, t0);
        tl.to("#f14-zpatch", { opacity: 0.15, duration: t1 - t0 }, t0);
        R.face(tl, z, K.tens, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f14-c5", K.ali, 0.4);
        R.face(tl, z, K.ali + 0.2, { eyes: "happy", mouth: "grin" });
        // conclusão
        tl.to("#f14-L, #f14-c1, #f14-c2, #f14-c3", { opacity: 1, duration: 0.3 }, K.ref - 0.3);
        R.drop(tl, "#f14-badge", K.ref - 0.2, 0.6, -200);
      },
      sfx: [
        { name: "whoosh", t: 0, vol: 0.35 },
        { name: "click-soft", t: k.bat, vol: 0.5 }, { name: "click-soft", t: k.bat + 0.32, vol: 0.5 }, { name: "click-soft", t: k.bat + 0.64, vol: 0.5 },
        { name: "glitch-1", t: k.disp, vol: 0.3, dur: 0.5 },
        { name: "whoosh-short", t: k.comp - 0.3, vol: 0.35 },
        { name: "pop", t: k.emp - 0.2, vol: 0.35 },
        { name: "sparkle", t: k.ali, vol: 0.4 },
        { name: "pop", t: k.ref - 0.2, vol: 0.4 },
      ],
    };
  },
};
