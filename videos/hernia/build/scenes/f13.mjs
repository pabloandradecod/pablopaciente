// F13 — Os testes: Lasègue (esquerda) e Lasègue cruzado (direita) + rodapé força/sensibilidade/reflexos
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
  speakers: {},
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      exame: w(0, "exame"), las: w(0, "Lasègue"), lev: w(0, "levanto"), est: w(0, "esticada"), trinta: w(0, "trinta"), setenta: w(0, "setenta"),
      pos: w(0, "positivo"), cruz: w(0, "cruzado"), levd: w(0, "levantando"), boa: w(0, "boa"), pista: w(0, "pista"),
      forca: w(0, "força"), sens: w(0, "sensibilidade"), refl: w(0, "reflexos"),
    };
    const supine = { root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4 };
    // esquerda: Lasègue na perna da frente (a que dói)
    const HL = [430, 560], sl = 0.85;
    const heelF = (th) => fk(HL, sl, { ...supine, hipF: -th }).legF.heel;
    k.a0 = heelF(0); k.a30 = heelF(30); k.a55 = heelF(55);
    // direita: Lasègue cruzado, levanta a perna de trás (a boa)
    const HR = [1310, 560];
    const heelB = (th) => fk(HR, sl, { ...supine, hipB: -th }).legB.heel;
    k.b0 = heelB(0); k.b25 = heelB(25); k.b45 = heelB(45);
    const P = (a, r) => [HL[0] + r * Math.cos((a * Math.PI) / 180), HL[1] - r * Math.sin((a * Math.PI) / 180)];
    const arc = (a0, a1, r) => { const p0 = P(a0, r), p1 = P(a1, r); return `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${r} ${r} 0 0 0 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`; };
    const l30 = P(30, 205), l70 = P(70, 205);
    const glove = `<g><circle r="22" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M-10 -14 L-10 -30 M0 -16 L0 -34 M10 -14 L10 -30" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>`;
    const table = (x0) => `<rect x="${x0}" y="604" width="560" height="34" rx="12" fill="#7FB8C4" stroke="${C.ink}" stroke-width="6"/>
        <rect x="${x0 + 40}" y="638" width="20" height="100" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/><rect x="${x0 + 500}" y="638" width="20" height="100" fill="#9AA7AD" stroke="${C.ink}" stroke-width="5"/>
        <rect x="${x0}" y="574" width="110" height="34" rx="15" fill="#fff" stroke="${C.ink}" stroke-width="5"/>`;
    return {
      k,
      css: `
        #root .f13-panel { position:absolute; top:120px; width:880px; height:640px; background:#fff; border:7px solid ${C.ink}; border-radius:30px; box-shadow:10px 10px 0 ${C.ink}; }
        #root .f13-h { position:absolute; left:0; right:0; top:20px; text-align:center; font-size:54px; }
        #f13-pos { left:150px; top:250px; padding:8px 24px; font-size:56px; color:${C.pain}; border:8px solid ${C.pain}; border-radius:16px; background:#fff; transform: rotate(-8deg); }
        #f13-badge { left:1060px; top:660px; font-size:34px; background:${C.pain}; color:#fff; padding:8px 22px; border-radius:20px; border:6px solid ${C.ink}; rotate:-3deg; white-space:nowrap; }
        #root .f13-say { position:absolute; font-size:30px; color:${C.ink}; }
        #root .f13-say b { color:${C.pain}; }
        #root .f13-chip { position:absolute; top:780px; min-width:300px; white-space:nowrap; display:flex; align-items:center; gap:12px; padding:8px 16px; font-size:34px;
          background:#fff; border:6px solid ${C.ink}; border-radius:18px; box-shadow:6px 6px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="${C.wall}"/><rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/></svg>
    <div id="f13-pl" class="f13-panel" style="left:60px"><div class="f13-h title">TESTE DE <span style="color:${C.pain}">LASÈGUE</span></div></div>
    <div id="f13-pr" class="f13-panel" style="left:980px"><div class="f13-h title">LASÈGUE <span style="color:${C.pain}">CRUZADO</span></div></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f13-L">
        ${table(120)}
        <g id="f13-prot" opacity="0">
          <path d="${arc(0, 90, 205)}" fill="none" stroke="#C9D3D6" stroke-width="14"/>
          <path id="f13-band" d="${arc(30, 70, 205)}" fill="none" stroke="${C.pain}" stroke-width="18"/>
          <text x="${(l30[0] + 18).toFixed(0)}" y="${(l30[1] + 8).toFixed(0)}" font-family="Nunito" font-weight="900" font-size="30" fill="${C.pain}">30°</text>
          <text x="${(l70[0] + 14).toFixed(0)}" y="${(l70[1] - 2).toFixed(0)}" font-family="Nunito" font-weight="900" font-size="30" fill="${C.pain}">70°</text>
        </g>
        <g transform="translate(${HL[0]},${HL[1]}) scale(${sl})">${human("f13a", "ze")}</g>
        <path id="f13-ray" d="M${HL[0] - 10} ${HL[1] - 6} L${HL[0] + 30} ${HL[1] - 40} L${HL[0] + 40} ${HL[1] - 20} L${HL[0] + 80} ${HL[1] - 70}" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <g id="f13-ga" transform="translate(${k.a0[0]},${k.a0[1] + 22})"><g id="f13-ga-in">${glove}</g></g>
      </g>
      <g id="f13-R">
        ${table(1000)}
        <g transform="translate(${HR[0]},${HR[1]}) scale(${sl})">${human("f13b", "ze")}</g>
        <g id="f13-zap" opacity="0"><path d="M1360 572 L1385 557 L1405 577 L1430 557 L1452 577 L1476 560" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>
        <path id="f13-arrow" d="M1480 430 Q1600 480 1520 562" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" opacity="0"/>
        <path id="f13-arrowhead" d="M1500 538 L1520 566 L1548 548" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <g id="f13-gb" transform="translate(${k.b0[0]},${k.b0[1] + 22})"><g id="f13-gb-in">${glove}</g></g>
      </g>
    </svg>
    <div id="f13-pos" class="abs title" style="opacity:0">POSITIVO</div>
    <div id="f13-s1" class="f13-say label abs" style="left:1360px;top:250px;opacity:0">levanta a perna <b>BOA</b>...</div>
    <div id="f13-s2" class="f13-say label abs" style="left:1575px;top:540px;opacity:0">...e dói a <b>OUTRA</b>!</div>
    <div id="f13-badge" class="abs label" style="opacity:0">pista AINDA MAIS FORTE de hérnia</div>
    <div id="f13-f0" class="f13-chip label" style="left:260px;opacity:0"><svg width="54" height="54" viewBox="-27 -27 54 54"><path d="M-20 10 Q-20 -14 0 -14 Q10 -24 18 -14 Q24 -4 14 6 Q8 20 -6 20 Q-20 20 -20 10Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="4"/></svg>Força</div>
    <div id="f13-f1" class="f13-chip label" style="left:810px;opacity:0"><svg width="54" height="54" viewBox="-27 -27 54 54"><path d="M-18 18 L10 -10" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><path d="M10 -10 L22 -22" stroke="${C.purple}" stroke-width="10" stroke-linecap="round"/></svg>Sensibilidade</div>
    <div id="f13-f2" class="f13-chip label" style="left:1360px;opacity:0"><svg width="54" height="54" viewBox="-27 -27 54 54"><rect x="-6" y="-4" width="10" height="30" rx="4" fill="#B07A4A" stroke="${C.ink}" stroke-width="4" transform="rotate(-30)"/><rect x="-20" y="-20" width="34" height="16" rx="6" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" transform="rotate(-30)"/></svg>Reflexos</div>`,
      js: function (tl, K, R) {
        const a = "f13a", b = "f13b";
        tl.fromTo("#f13-pl", { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
        tl.fromTo("#f13-pr", { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0.1);
        R.fadeIn(tl, "#f13-L", 0.3, 0.3);
        R.fadeIn(tl, "#f13-R", 0.4, 0.3);
        tl.set("#f13-R", { opacity: 0.35 }, 0.75);
        tl.set("#f13-pr", { opacity: 0.5 }, 0.75);
        // ---- Lasègue: perna esticada sobe
        R.setPose(tl, a, 0, { ...{ root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4 }, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.blinks(tl, a, 0.3, K.dur);
        R.fadeIn(tl, "#f13-prot", K.lev - 0.2, 0.3);
        const t0 = K.lev, t1 = K.trinta, t2 = K.setenta;
        R.pose(tl, a, t0, t1 - t0, { hipF: -30 }, "sine.inOut");
        tl.to("#f13-ga-in", { x: K.a30[0] - K.a0[0], y: K.a30[1] - K.a0[1], duration: t1 - t0, ease: "sine.inOut" }, t0);
        R.pose(tl, a, t1, t2 - t1 + 0.2, { hipF: -55 }, "sine.out");
        tl.to("#f13-ga-in", { x: K.a55[0] - K.a0[0], y: K.a55[1] - K.a0[1], duration: t2 - t1 + 0.2, ease: "sine.out" }, t1);
        tl.fromTo("#f13-band", { opacity: 0.4 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 5 }, K.trinta);
        R.face(tl, a, K.trinta + 0.2, { eyes: "pain", mouth: "scream" });
        tl.set("#f13-ray", { opacity: 1 }, K.trinta + 0.2);
        R.draw(tl, "#f13-ray", K.trinta + 0.2, 0.3);
        tl.fromTo("#f13-pos", { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.pos - 0.2);
        R.shake(tl, "#f13-pos", K.pos + 0.12, 0.25, 5);
        // ---- cruzado
        tl.to("#f13-L, #f13-pos", { opacity: 0.35, duration: 0.3 }, K.cruz - 0.4);
        tl.to("#f13-pl", { opacity: 0.5, duration: 0.3 }, K.cruz - 0.4);
        tl.to("#f13-R, #f13-pr", { opacity: 1, duration: 0.3 }, K.cruz - 0.4);
        R.setPose(tl, b, 0, { root: -90, neck: -6, shF: -4, elF: -6, shB: -2, elB: -4, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.blinks(tl, b, 0.3, K.dur);
        const u0 = K.levd, u1 = K.boa + 0.4, um = (u0 + u1) / 2;
        R.pose(tl, b, u0, um - u0, { hipB: -25 }, "sine.in");
        R.pose(tl, b, um, u1 - um, { hipB: -45 }, "sine.out");
        tl.to("#f13-gb-in", { x: K.b25[0] - K.b0[0], y: K.b25[1] - K.b0[1], duration: um - u0, ease: "sine.in" }, u0);
        tl.to("#f13-gb-in", { x: K.b45[0] - K.b0[0], y: K.b45[1] - K.b0[1], duration: u1 - um, ease: "sine.out" }, um);
        R.rise(tl, "#f13-s1", K.boa - 0.2, 0.35);
        R.face(tl, b, K.boa + 0.4, { eyes: "pain", mouth: "scream" });
        tl.set("#f13-zap", { opacity: 1 }, K.boa + 0.4);
        tl.fromTo("#f13-zap", { scale: 0.6, svgOrigin: "1418 567" }, { scale: 1, svgOrigin: "1418 567", duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.boa + 0.4);
        tl.set("#f13-arrow, #f13-arrowhead", { opacity: 1 }, K.boa + 0.3);
        R.draw(tl, "#f13-arrow", K.boa + 0.3, 0.4);
        R.rise(tl, "#f13-s2", K.boa + 0.6, 0.35);
        tl.fromTo("#f13-badge", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.2)" }, K.pista);
        // ---- rodapé
        R.pop(tl, "#f13-f0", K.forca - 0.1, 0.35);
        R.pop(tl, "#f13-f1", K.sens - 0.1, 0.35);
        R.pop(tl, "#f13-f2", K.refl - 0.1, 0.35);
        tl.to("#f13-f2 svg", { rotation: -25, duration: 0.12, yoyo: true, repeat: 3 }, K.refl + 0.3);
      },
      sfx: [
        { name: "whoosh", t: 0, vol: 0.4 },
        { name: "error", t: k.trinta + 0.2, vol: 0.3 },
        { name: "impact-bass-1", t: k.pos - 0.05, vol: 0.4 },
        { name: "whoosh-short", t: k.cruz - 0.4, vol: 0.35 },
        { name: "error", t: k.boa + 0.4, vol: 0.3 },
        { name: "pop", t: k.pista, vol: 0.45 },
        ...[k.forca, k.sens, k.refl].map((t) => ({ name: "click-soft", t: t - 0.05, vol: 0.45 })),
      ],
    };
  },
};
