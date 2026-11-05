// F12 — Tela dividida: Lasègue cruzado (esquerda) e Slump test (direita)
const rad = (d) => (d * Math.PI) / 180;
const rot = ([x, y], a) => [x * Math.cos(rad(a)) - y * Math.sin(rad(a)), x * Math.sin(rad(a)) + y * Math.cos(rad(a))];
const add = (...v) => v.reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
// cinemática direta do rig humano (convenções do lib.mjs)
function fk(H, s, p) {
  const P = (v) => { const r = rot(v, p.root || 0); return [+(H[0] + s * r[0]).toFixed(1), +(H[1] + s * r[1]).toFixed(1)]; };
  const T = p.torso || 0, N = p.neck || 0;
  const leg = (side) => {
    const h = p["hip" + side] || 0, k = p["kn" + side] || 0, a = p["an" + side] || 0, o = [side === "B" ? -8 : 8, 0];
    const at = (seg, along, back) => seg === 0 ? add(o, rot([back, along], h)) : add(o, rot([0, 88], h), rot([back, along], h + k));
    const ankle = add(o, rot([0, 88], h), rot([0, 90], h + k));
    return { at: (seg, along, back = 0) => P(at(seg, along, back)), ankle: P(ankle), heel: P(add(ankle, rot([-12, 10], h + k + a))) };
  };
  return {
    P, legF: leg("F"), legB: leg("B"),
    torsoPt: (x, y) => P(rot([x, y], T)),
    neckPt: (x, y) => P(add(rot([4, -150], T), rot([x, y], T + N))),
  };
}

export default {
  build(ctx) {
    const { C, human, smooth, w } = ctx;
    const k = {
      lev: w(0, "levanto"), boa: w(0, "boa"), doi: w(0, "dói"), lado: w(0, "lado"), cruz: w(0, "cruzado"), pista: w(0, "pista"),
      slump: w(0, "Slump"), sent: w(0, "sentado"), curva: w(0, "curva"), abaixa: w(0, "abaixa"), estica: w(0, "estica"), tens: w(0, "tensionando"),
    };
    // ---- esquerda: Seu Zé deitado, levanta a perna de trás (a "boa")
    const HL = [470, 598], sl = 0.85;
    const supine = { root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4 };
    const heelB = (th) => fk(HL, sl, { ...supine, hipB: -th }).legB.heel;
    k.g0 = heelB(0); k.g25 = heelB(25); k.g45 = heelB(45);
    // ---- direita: Slump
    const HR = [1250, 600], sr = 0.95;
    const sit0 = { hipF: -92, knF: 92, hipB: -88, knB: 88, torso: -4, neck: 0, shF: -20, elF: -40, shB: -15, elB: -40 };
    const slump = { ...sit0, torso: 28, neck: 36, hipF: -94, knF: 4, anF: -14, shF: 50, elF: -70, shB: 45, elB: -60 };
    const f = fk(HR, sr, slump);
    k.nerve = smooth([f.neckPt(-30, -40), f.torsoPt(-44, -150), f.torsoPt(-50, -80), f.torsoPt(-48, -20), f.legF.at(0, 20, -18), f.legF.at(0, 60, -18), f.legF.at(1, 10, -16), f.legF.at(1, 50, -15), f.legF.heel]);
    const glove = `<g><circle r="22" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M-10 -14 L-10 -30 M0 -16 L0 -34 M10 -14 L10 -30" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>`;
    return {
      k,
      css: `
        #root .f12-panel { position:absolute; top:150px; width:880px; height:700px; background:#fff; border:7px solid ${C.ink}; border-radius:30px; box-shadow:10px 10px 0 ${C.ink}; }
        #root .f12-h { position:absolute; left:0; right:0; top:22px; text-align:center; font-size:56px; }
        #root .f12-chip { position:absolute; font-size:30px; padding:6px 16px; border-radius:16px; border:5px solid ${C.ink}; background:${C.sun}; white-space:nowrap; }
        #f12-badge { left:200px; top:790px; font-size:34px; background:${C.pain}; color:#fff; padding:8px 22px; border-radius:20px; border:6px solid ${C.ink}; rotate:-3deg; }
        #root .f12-say { position:absolute; font-size:30px; color:${C.ink}; }
        #root .f12-say b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="${C.wall}"/></svg>
    <div id="f12-pl" class="f12-panel" style="left:60px"><div class="f12-h title">LASÈGUE <span style="color:${C.pain}">CRUZADO</span></div></div>
    <div id="f12-pr" class="f12-panel" style="left:980px"><div class="f12-h title">SLUMP <span style="color:${C.pain}">TEST</span></div></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f12-L">
        <rect x="150" y="642" width="600" height="34" rx="12" fill="#7FB8C4" stroke="${C.ink}" stroke-width="6"/>
        <rect x="190" y="676" width="20" height="120" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/><rect x="690" y="676" width="20" height="120" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>
        <rect x="150" y="612" width="120" height="34" rx="15" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(${HL[0]},${HL[1]}) scale(${sl})">${human("f12a", "ze")}</g>
        <g id="f12-zap" opacity="0"><path d="M520 610 L545 595 L565 615 L590 595 L612 615 L636 598" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>
        <path id="f12-arrow" d="M640 470 Q760 520 680 600" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" opacity="0"/>
        <path id="f12-arrowhead" d="M660 576 L680 604 L708 586" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <g id="f12-glove" transform="translate(${k.g0[0]},${k.g0[1] + 22})"><g id="f12-glove-in">${glove}</g></g>
      </g>
      <g id="f12-R">
        <rect x="1040" y="628" width="300" height="34" rx="12" fill="#7FB8C4" stroke="${C.ink}" stroke-width="6"/>
        <rect x="1070" y="662" width="20" height="130" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/><rect x="1300" y="662" width="20" height="130" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(${HR[0]},${HR[1]}) scale(${sr})">${human("f12b", "ze")}</g>
        <path id="f12-nglow" d="${k.nerve}" fill="none" stroke="${C.pain}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <path id="f12-nerve" d="${k.nerve}" fill="none" stroke="${C.nerve}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      </g>
    </svg>
    <div id="f12-s1" class="f12-say label abs" style="left:520px;top:300px;opacity:0">levanta a perna <b>BOA</b>...</div>
    <div id="f12-s2" class="f12-say label abs" style="left:300px;top:700px;opacity:0">...e dói a <b>OUTRA</b>!</div>
    <div id="f12-badge" class="abs label" style="opacity:0">pista forte de HÉRNIA DE DISCO</div>
    <div id="f12-c1" class="f12-chip label" style="left:1030px;top:250px;opacity:0">1. curva o tronco</div>
    <div id="f12-c2" class="f12-chip label" style="left:1360px;top:250px;opacity:0">2. queixo no peito</div>
    <div id="f12-c3" class="f12-chip label" style="left:1490px;top:720px;opacity:0">3. estica o joelho</div>
    <div id="f12-c4" class="f12-say label abs" style="left:1440px;top:340px;opacity:0;font-size:34px">nervo inteiro <b>TENSO</b>!</div>`,
      js: function (tl, K, R) {
        const a = "f12a", b = "f12b";
        tl.fromTo("#f12-pl", { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
        tl.fromTo("#f12-pr", { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0.1);
        R.fadeIn(tl, "#f12-L", 0.3, 0.3);
        R.fadeIn(tl, "#f12-R", 0.4, 0.3);
        tl.set("#f12-R", { opacity: 0.35 }, 0.75);
        // ---- esquerda
        R.setPose(tl, a, 0, { root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.blinks(tl, a, 0.3, K.dur);
        const t0 = K.lev, t1 = K.boa + 0.4, tm = (t0 + t1) / 2;
        R.pose(tl, a, t0, tm - t0, { hipB: -25 }, "sine.in");
        R.pose(tl, a, tm, t1 - tm, { hipB: -45 }, "sine.out");
        tl.to("#f12-glove-in", { x: K.g25[0] - K.g0[0], y: K.g25[1] - K.g0[1], duration: tm - t0, ease: "sine.in" }, t0);
        tl.to("#f12-glove-in", { x: K.g45[0] - K.g0[0], y: K.g45[1] - K.g0[1], duration: t1 - tm, ease: "sine.out" }, tm);
        R.rise(tl, "#f12-s1", K.boa, 0.35);
        R.face(tl, a, K.doi, { eyes: "pain", mouth: "scream" });
        tl.set("#f12-zap", { opacity: 1 }, K.doi);
        tl.fromTo("#f12-zap", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.doi);
        tl.set("#f12-arrow, #f12-arrowhead", { opacity: 1 }, K.doi - 0.1);
        R.draw(tl, "#f12-arrow", K.doi - 0.1, 0.4);
        R.rise(tl, "#f12-s2", K.lado, 0.35);
        R.shake(tl, "#f12a-head", K.doi + 0.1, 0.5, 4);
        tl.fromTo("#f12-badge", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.2)" }, K.pista);
        // ---- direita: Slump
        tl.to("#f12-L", { opacity: 0.35, duration: 0.3 }, K.slump - 0.2);
        tl.to("#f12-s1, #f12-s2", { opacity: 0.35, duration: 0.3 }, K.slump - 0.2);
        tl.to("#f12-R", { opacity: 1, duration: 0.3 }, K.slump - 0.2);
        R.setPose(tl, b, 0, { hipF: -92, knF: 92, hipB: -88, knB: 88, torso: -4, neck: 0, shF: -20, elF: -40, shB: -15, elB: -40, anF: 0 });
        R.blinks(tl, b, 0.3, K.dur);
        R.squash(tl, "#f12b-root", K.sent);
        R.pose(tl, b, K.curva, 0.6, { torso: 28, shF: 50, elF: -70, shB: 45, elB: -60 });
        R.pop(tl, "#f12-c1", K.curva, 0.35);
        R.pose(tl, b, K.abaixa, 0.5, { neck: 36 });
        R.pop(tl, "#f12-c2", K.abaixa, 0.35);
        R.pose(tl, b, K.estica, 0.7, { hipF: -94, knF: 4, anF: -14 }, "power2.out");
        R.pop(tl, "#f12-c3", K.estica, 0.35);
        tl.set("#f12-nerve", { opacity: 1 }, K.tens - 0.1);
        R.draw(tl, "#f12-nerve", K.tens - 0.1, 0.8, "power1.inOut");
        tl.fromTo("#f12-nglow", { opacity: 0 }, { opacity: 0.55, duration: 0.15, yoyo: true, repeat: 7 }, K.tens + 0.7);
        tl.to("#f12-nerve", { attr: { stroke: "#FF5A4E" }, duration: 0.3 }, K.tens + 0.7);
        R.face(tl, b, K.tens + 0.7, { eyes: "pain", mouth: "frown" });
        R.rise(tl, "#f12-c4", K.tens + 0.5, 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0, vol: 0.4 },
        { name: "error", t: k.doi, vol: 0.3 },
        { name: "pop", t: k.pista, vol: 0.45 },
        { name: "whoosh-short", t: k.slump - 0.2, vol: 0.35 },
        ...[k.curva, k.abaixa, k.estica].map((t) => ({ name: "click-soft", t, vol: 0.45 })),
        { name: "sparkle", t: k.tens, vol: 0.35 },
      ],
    };
  },
};
