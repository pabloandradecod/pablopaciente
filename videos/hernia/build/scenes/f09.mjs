// F9 — O que se sente: lombar + dor que desce pela perna (passa do joelho), formigamento, fraqueza; piora sentado, tossindo, dobrando
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      sente: w(0, "sente"), lomb: w(0, "lombar"), desce: w(0, "desce"), joe: w(0, "joelho"), forte: w(0, "forte"), costas: w(0, "costas"),
      form: w(0, "formigamento"), fraq: w(0, "fraqueza"), piorar: w(0, "piorar"), sent: w(0, "sentado"), toss: w(0, "tossir"),
      esp: w(0, "espirrar"), dobr: w(0, "dobrar"), frente: w(0, "frente"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const rows = [
      ["Dor na <b>LOMBAR</b>", C.pain],
      ["Dor que <b>DESCE</b> pela perna, passando do joelho", C.pain],
      ["Às vezes <b>mais forte</b> na perna que nas costas", C.sun],
      ["<b>Formigamento</b>", C.purple],
      ["<b>Fraqueza</b>", C.grey],
    ];
    const chip = (i, label, svg) => `<div id="f09-pc${i}" class="abs" style="left:${300 + i * 200}px;top:720px;width:180px;text-align:center;opacity:0">
        <svg width="110" height="110" viewBox="-55 -55 110 110"><circle r="48" fill="#FFE4DC" ${st(6)}/>${svg}</svg>
        <div class="label" style="font-size:26px">${label}</div></div>`;
    return {
      k,
      css: `
        #f09-h { left:110px; top:70px; font-size:64px; }
        #root .f09-row { position:absolute; left:110px; width:820px; padding:10px 22px 10px 70px; font-size:32px; line-height:1.15; background:#fff;
          border:6px solid ${C.ink}; border-radius:18px; box-shadow:6px 6px 0 ${C.ink}; }
        #root .f09-row b { color:${C.pain}; }
        #root .f09-dot { position:absolute; left:20px; top:50%; width:30px; height:30px; margin-top:-15px; border-radius:50%; border:5px solid ${C.ink}; }
        #f09-pl { left:110px; top:740px; padding:10px 20px; font-size:40px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:16px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1440" cy="520" r="330" fill="${C.wall}"/>
      <g transform="translate(1430,620) scale(1.45)">${human("f09z", "ze")}</g>
      <g id="f09-lomb" opacity="0"><circle cx="1385" cy="565" r="46" fill="${C.pain}" opacity="0.4"/><circle cx="1385" cy="565" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <path id="f09-ray" d="M1388 590 L1416 650 L1400 668 L1432 728 L1418 744 L1442 800 L1430 812 L1448 864" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      <g id="f09-knee" opacity="0"><circle cx="1440" cy="752" r="24" fill="none" stroke="${C.sun}" stroke-width="6" stroke-dasharray="8 6"/></g>
      <g id="f09-ting" opacity="0">${[[1420, 800], [1468, 820], [1430, 850], [1470, 790], [1410, 840]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${C.purple}"/>`).join("")}</g>
      <g id="f09-bars" opacity="0">
        <rect x="1620" y="400" width="44" height="120" fill="${C.pain}" ${st(5)}/><rect x="1690" y="460" width="44" height="60" fill="${C.sun}" ${st(5)}/>
        <text x="1642" y="550" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">perna</text>
        <text x="1712" y="550" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">costas</text>
      </g>
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">O que se sente:</div>
    ${rows.map(([t, c], i) => `<div id="f09-r${i}" class="f09-row label" style="top:${160 + i * 112}px;opacity:0"><span class="f09-dot" style="background:${c}"></span>${t}</div>`).join("")}
    <div id="f09-pl" class="abs title" style="opacity:0">PIORA:</div>
    ${chip(0, "sentado", `<rect x="-30" y="-6" width="60" height="12" rx="5" fill="${C.brown}" ${st(5)}/><path d="M-24 6 L-24 36 M24 6 L24 36 M22 -6 L32 -40" ${st(6)}/>`)}
    ${chip(1, "tossir, espirrar", `<circle cx="-8" cy="0" r="22" fill="${C.skinB}" ${st(5)}/><path d="M18 -10 L36 -18 M20 0 L40 0 M18 10 L36 18" ${st(5)}/>`)}
    ${chip(2, "dobrar pra frente", `<path d="M-20 34 L-20 0 L24 -20" fill="none" stroke="${C.blue}" stroke-width="12" stroke-linecap="round"/><circle cx="30" cy="-24" r="10" fill="${C.skinB}" ${st(4)}/><path d="M-30 -30 Q-10 -46 10 -36" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round"/>`)}`,
      js: function (tl, K, R) {
        const z = "f09z";
        R.setPose(tl, z, 0, { shF: -8, elF: -15, shB: 6, elB: -10, hipF: 4, hipB: -4 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, z, 0.3, K.dur);
        R.idle(tl, z, 0, K.dur, 1.5);
        R.slideIn(tl, "#f09-h", K.sente - 0.4, 0.5, -200);
        // lombar
        R.slideIn(tl, "#f09-r0", K.lomb - 0.2, 0.4, -120);
        R.pop(tl, "#f09-lomb", K.lomb, 0.35);
        R.pose(tl, z, K.lomb, 0.3, { shB: 40, elB: -70, torso: 6 });
        R.face(tl, z, K.lomb, { eyes: "pain", mouth: "frown" });
        // desce pela perna, passa do joelho
        R.slideIn(tl, "#f09-r1", K.desce - 0.2, 0.4, -120);
        tl.set("#f09-ray", { opacity: 1 }, K.desce);
        R.draw(tl, "#f09-ray", K.desce, 0.8, "power1.in");
        R.pop(tl, "#f09-knee", K.joe, 0.3);
        // mais forte que nas costas
        R.slideIn(tl, "#f09-r2", K.forte - 0.3, 0.4, -120);
        tl.set("#f09-bars", { opacity: 1 }, K.forte);
        tl.fromTo("#f09-bars rect", { scaleY: 0 }, { scaleY: 1, svgOrigin: "1680 520", duration: 0.5, stagger: 0.15, ease: "back.out(2)" }, K.forte);
        // formigamento
        R.slideIn(tl, "#f09-r3", K.form - 0.2, 0.4, -120);
        tl.set("#f09-ting", { opacity: 1 }, K.form);
        R.shake(tl, "#f09-ting", K.form, 1.0, 5);
        // fraqueza: perna bambeia
        R.slideIn(tl, "#f09-r4", K.fraq - 0.2, 0.4, -120);
        for (let i = 0; i < 4; i++) R.pose(tl, z, K.fraq + i * 0.2, 0.18, { knF: i % 2 ? 4 : 18, hipF: i % 2 ? 4 : -6 }, "sine.inOut");
        R.pose(tl, z, K.fraq + 0.85, 0.3, { knF: 6, hipF: 4 });
        // piora: sentado, tossir/espirrar, dobrar
        R.pop(tl, "#f09-pl", K.piorar - 0.1, 0.4);
        R.pop(tl, "#f09-pc0", K.sent - 0.1, 0.35);
        R.pop(tl, "#f09-pc1", K.toss - 0.1, 0.35);
        R.shake(tl, "#f09-pc1", K.esp, 0.3, 4);
        R.face(tl, z, K.esp, { eyes: "wide", mouth: "scream" });
        R.shake(tl, "#f09z-root", K.esp, 0.35, 4);
        R.pop(tl, "#f09-pc2", K.dobr - 0.1, 0.35);
        R.pose(tl, z, K.dobr, 0.4, { torso: 30, neck: -10 });
        R.face(tl, z, K.frente, { eyes: "pain", mouth: "frown" });
        R.pose(tl, z, K.frente + 0.5, 0.4, { torso: 6, neck: 0 });
      },
      sfx: [
        { name: "whoosh-short", t: k.sente - 0.4, vol: 0.35 },
        { name: "pop", t: k.lomb, vol: 0.35 },
        { name: "glitch-1", t: k.desce, vol: 0.25, dur: 0.5 },
        { name: "pop", t: k.forte, vol: 0.3 },
        { name: "pop", t: k.piorar - 0.1, vol: 0.35 },
        { name: "pop", t: k.dobr - 0.1, vol: 0.3 },
      ],
    };
  },
};
