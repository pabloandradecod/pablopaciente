// F14 — Tela dividida: teste de Freiberg (esquerda) e teste de Pace (direita)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      frei: w(0, "Freiberg"), esti: w(0, "esticada"), giro: w(0, "giro"), dentro: w(0, "dentro"),
      pace: w(0, "Pace"), sent: w(0, "sentado"), emp: w(0, "empurra"), fora: w(0, "fora"), mao: w(0, "mão"),
      dor: w(0, "Dor"), ref: w(0, "reforça"),
    };
    const glove = `<circle r="22" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M-10 -14 L-10 -30 M0 -16 L0 -34 M10 -14 L10 -30" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>`;
    const HL = [470, 598], sl = 0.85, HR = [1180, 600], sr = 0.95;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #root .f14-panel { position:absolute; top:150px; width:880px; height:700px; background:#fff; border:7px solid ${C.ink}; border-radius:30px; box-shadow:10px 10px 0 ${C.ink}; }
        #root .f14-h { position:absolute; left:0; right:0; top:22px; text-align:center; font-size:56px; }
        #root .f14-chip { position:absolute; font-size:30px; padding:6px 16px; border-radius:16px; border:5px solid ${C.ink}; background:${C.sun}; white-space:nowrap; }
        #root .f14-pain { background:${C.pain}; color:#fff; }
        #f14-badge { left:0; right:0; top:46px; text-align:center; }
        #f14-badge span { display:inline-block; font-size:40px; background:${C.good}; color:${C.ink}; padding:8px 26px; border-radius:20px; border:6px solid ${C.ink}; box-shadow:6px 6px 0 ${C.ink}; }
        #f14-front-l { left:1500px; top:262px; width:200px; text-align:center; font-size:24px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="${C.wall}"/></svg>
    <div id="f14-pl" class="f14-panel" style="left:60px"><div class="f14-h title">TESTE DE <span style="color:${C.pain}">FREIBERG</span></div></div>
    <div id="f14-pr" class="f14-panel" style="left:980px"><div class="f14-h title">TESTE DE <span style="color:${C.pain}">PACE</span></div></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f14-L">
        <rect x="150" y="642" width="600" height="34" rx="12" fill="#7FB8C4" stroke="${C.ink}" stroke-width="6"/>
        <rect x="190" y="676" width="20" height="120" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/><rect x="690" y="676" width="20" height="120" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>
        <rect x="150" y="612" width="120" height="34" rx="15" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(${HL[0]},${HL[1]}) scale(${sl})">${human("f14a", "ze")}</g>
        <g id="f14-gL" opacity="0"><circle cx="462" cy="622" r="40" fill="${C.pain}" opacity="0.45"/><circle cx="462" cy="622" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
        <g id="f14-rotarc" opacity="0">
          <path id="f14-arc" d="M600 548 A26 56 0 1 1 572 640" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/>
          <path d="M560 626 L572 642 L590 632" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g transform="translate(632,566)"><g id="f14-glA" opacity="0">${glove}</g></g>
        <g transform="translate(548,566)"><g id="f14-glB" opacity="0">${glove}</g></g>
      </g>
      <g id="f14-R">
        <rect x="1040" y="628" width="300" height="34" rx="12" fill="#7FB8C4" stroke="${C.ink}" stroke-width="6"/>
        <rect x="1070" y="662" width="20" height="130" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/><rect x="1300" y="662" width="20" height="130" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(${HR[0]},${HR[1]}) scale(${sr})">${human("f14b", "ze")}</g>
        <g id="f14-gR" opacity="0"><circle cx="1158" cy="596" r="40" fill="${C.pain}" opacity="0.45"/><circle cx="1158" cy="596" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
        <!-- detalhe "de frente": joelhos empurram para fora, as mãos seguram -->
        <g id="f14-front" opacity="0">
          <circle cx="1600" cy="470" r="175" fill="${C.cream}" stroke="${C.ink}" stroke-width="7"/>
          <rect x="1460" y="400" width="280" height="30" rx="10" fill="#7FB8C4" stroke="${C.ink}" stroke-width="5"/>
          <g id="f14-kL"><rect x="1532" y="440" width="44" height="120" rx="20" fill="${C.brown}" ${st}/><circle cx="1554" cy="440" r="32" fill="${C.brown}" ${st}/><path d="M1528 560 L1580 560 L1584 580 L1524 580 Z" fill="#4A2E1A" ${st}/></g>
          <g id="f14-kR"><rect x="1624" y="440" width="44" height="120" rx="20" fill="${C.brown}" ${st}/><circle cx="1646" cy="440" r="32" fill="${C.brown}" ${st}/><path d="M1620 560 L1672 560 L1676 580 L1616 580 Z" fill="#4A2E1A" ${st}/></g>
          <g id="f14-hL"><g transform="translate(1494,478)">${glove}</g></g>
          <g id="f14-hR"><g transform="translate(1706,478)">${glove}</g></g>
          <g id="f14-arrows" opacity="0">
            <path d="M1520 500 L1470 500 M1484 488 L1470 500 L1484 512" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1680 500 L1730 500 M1716 488 L1730 500 L1716 512" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </g>
      </g>
    </svg>
    <div id="f14-front-l" class="abs label" style="opacity:0">visto de frente</div>
    <div id="f14-c1" class="f14-chip label" style="left:330px;top:300px;opacity:0">perna esticada</div>
    <div id="f14-c2" class="f14-chip label" style="left:560px;top:420px;opacity:0">gira pra DENTRO</div>
    <div id="f14-c3" class="f14-chip f14-pain label" style="left:300px;top:720px;opacity:0">dói na NÁDEGA</div>
    <div id="f14-c4" class="f14-chip label" style="left:1040px;top:250px;opacity:0">sentado</div>
    <div id="f14-c5" class="f14-chip label" style="left:1430px;top:670px;opacity:0">joelhos pra FORA</div>
    <div id="f14-c6" class="f14-chip label" style="left:1240px;top:740px;opacity:0;background:#fff">contra a mão do doutor</div>
    <div id="f14-c7" class="f14-chip f14-pain label" style="left:1040px;top:740px;opacity:0">dor</div>
    <div id="f14-badge" class="abs label" style="opacity:0"><span>Dor na nádega = REFORÇA A SUSPEITA</span></div>`,
      js: function (tl, K, R) {
        const a = "f14a", b = "f14b";
        tl.fromTo("#f14-pl", { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
        tl.fromTo("#f14-pr", { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0.1);
        R.fadeIn(tl, "#f14-L", 0.3, 0.3);
        R.fadeIn(tl, "#f14-R", 0.4, 0.3);
        tl.set("#f14-R", { opacity: 0.35 }, 0.75);
        // ---- esquerda: Freiberg (barriga pra cima, perna esticada, rotação interna)
        R.setPose(tl, a, 0, { root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4, hipF: 0, hipB: 0, knF: 0, knB: 0, anF: 0, anB: 0 });
        R.blinks(tl, a, 0.3, K.dur);
        R.pop(tl, "#f14-c1", K.esti - 0.1, 0.35);
        R.pop(tl, "#f14-glA", K.esti, 0.35);
        R.pop(tl, "#f14-glB", K.esti + 0.15, 0.35);
        // gira pra dentro: o pé "vira" (encurta) e a seta circular aparece
        tl.set("#f14-rotarc", { opacity: 1 }, K.giro - 0.1);
        R.draw(tl, "#f14-arc", K.giro - 0.1, 0.5);
        tl.to("#f14a-anF", { scaleX: 0.4, svgOrigin: "0 0", duration: 0.5, ease: "power2.inOut" }, K.giro);
        tl.to("#f14a-anB", { scaleX: 0.55, svgOrigin: "0 0", duration: 0.5, ease: "power2.inOut" }, K.giro + 0.05);
        tl.to("#f14-glA", { y: 8, duration: 0.5, ease: "power2.inOut" }, K.giro);
        R.pop(tl, "#f14-c2", K.dentro - 0.1, 0.35);
        R.face(tl, a, K.dentro + 0.2, { eyes: "pain", mouth: "scream" });
        tl.set("#f14-gL", { opacity: 1 }, K.dentro + 0.2);
        tl.fromTo("#f14-gL", { scale: 0.6, svgOrigin: "462 622" }, { scale: 1.2, svgOrigin: "462 622", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.dentro + 0.2);
        R.pop(tl, "#f14-c3", K.dentro + 0.4, 0.35);
        R.shake(tl, "#f14a-head", K.dentro + 0.25, 0.4, 4);
        // ---- direita: Pace (sentado, empurra os joelhos para fora contra a resistência)
        tl.to("#f14-L, #f14-c1, #f14-c2, #f14-c3", { opacity: 0.35, duration: 0.3 }, K.pace - 0.2);
        tl.to("#f14-R", { opacity: 1, duration: 0.3 }, K.pace - 0.2);
        R.setPose(tl, b, 0, { hipF: -92, knF: 92, hipB: -88, knB: 88, torso: -4, neck: 0, shF: -20, elF: -40, shB: -15, elB: -40, anF: 0 });
        R.blinks(tl, b, 0.3, K.dur);
        R.squash(tl, "#f14b-root", K.sent);
        R.pop(tl, "#f14-c4", K.sent - 0.1, 0.35);
        R.pop(tl, "#f14-front", K.emp - 0.4, 0.45, 0.4);
        R.fadeIn(tl, "#f14-front-l", K.emp - 0.2, 0.3);
        R.face(tl, b, K.emp, { eyes: "normal", mouth: "flat" });
        R.pose(tl, b, K.emp, 0.4, { torso: 2, shF: -40, elF: -20 });
        // joelhos forçam para fora; mãos seguram (finito)
        tl.set("#f14-arrows", { opacity: 1 }, K.fora - 0.1);
        for (let i = 0; i < 3; i++) {
          const t = K.fora + i * 0.6;
          tl.to("#f14-kL, #f14-hL", { x: -10, duration: 0.25, ease: "power2.out" }, t);
          tl.to("#f14-kR, #f14-hR", { x: 10, duration: 0.25, ease: "power2.out" }, t);
          tl.to("#f14-kL, #f14-hL, #f14-kR, #f14-hR", { x: 0, duration: 0.3, ease: "power2.inOut" }, t + 0.28);
        }
        R.pop(tl, "#f14-c5", K.fora - 0.1, 0.35);
        R.pop(tl, "#f14-c6", K.mao - 0.1, 0.35);
        // dor na nádega (Pace positivo)
        R.face(tl, b, K.dor, { eyes: "pain", mouth: "scream" });
        tl.set("#f14-gR", { opacity: 1 }, K.dor);
        tl.fromTo("#f14-gR", { scale: 0.6, svgOrigin: "1158 596" }, { scale: 1.2, svgOrigin: "1158 596", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.dor);
        R.fadeOut(tl, "#f14-c6", K.dor - 0.1, 0.2);
        R.pop(tl, "#f14-c7", K.dor + 0.1, 0.35);
        // os dois painéis juntos + selo
        tl.to("#f14-L, #f14-c1, #f14-c2, #f14-c3", { opacity: 1, duration: 0.3 }, K.ref - 0.3);
        R.drop(tl, "#f14-badge", K.ref - 0.2, 0.7, -200);
      },
      sfx: [
        { name: "whoosh", t: 0, vol: 0.4 },
        { name: "click-soft", t: k.esti, vol: 0.45 },
        { name: "whoosh-short", t: k.giro, vol: 0.35 },
        { name: "error", t: k.dentro + 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.pace - 0.2, vol: 0.35 },
        { name: "pop", t: k.emp - 0.4, vol: 0.4 },
        { name: "error", t: k.dor, vol: 0.3 },
        { name: "impact-bass-1", t: k.ref + 0.15, vol: 0.4 },
      ],
    };
  },
};
