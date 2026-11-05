// F8 — Fatores de risco: genética (destaque), idade, cigarro, sobrepeso/sedentarismo, carga/vibração/técnica ruim (Seu Zé com a caixa e X)
export default {
  speakers: { disquinho: "f08d" },
  build(ctx) {
    const { C, human, disquinho, w } = ctx;
    const k = {
      risco: w(0, "risco"), gen: w(0, "genética"), enorme: w(0, "enorme"), idade: w(0, "idade"), trinta: w(0, "trinta"), cinq: w(0, "cinquenta"),
      cig: w(0, "Cigarro"), ress: w(0, "resseca"), sobre: w(0, "Sobrepeso"), sed: w(0, "sedentarismo"),
      carga: w(0, "carga"), vib: w(0, "vibração"), lev: w(0, "levantar"), err: w(0, "errado"), ze: w(0, "Zé"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const X = [110, 470, 820, 1170, 1520];
    const cx = (i) => X[i] + 150;
    const card = (i, title, extra = "") => `<div id="f08-c${i}" class="abs card" style="left:${X[i]}px;top:220px;width:300px;height:460px;opacity:0;${extra}">
        <div class="label" style="position:absolute;left:8px;right:8px;bottom:16px;text-align:center;font-size:30px;line-height:1.1">${title}</div></div>`;
    // mini Seu Zé levantando a caixa errado
    return {
      k,
      css: `
        #f08-title { left:0; right:0; top:70px; text-align:center; font-size:76px; white-space:nowrap; }
        #f08-title b { color:${C.pain}; }
        #f08-badge { left:${X[0] + 150 - 110}px; top:190px; width:220px; padding:8px 0; text-align:center; font-size:28px; color:#fff; background:${C.pain};
          border:5px solid ${C.ink}; border-radius:14px; transform: rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f08-d-wrap"><g transform="translate(960,870) scale(0.62)">${disquinho("f08d")}</g></g>
      <g id="f08-sweat" opacity="0"><path d="M1060 760 q-10 18 0 26 q10 -8 0 -26 Z" fill="#7FD3F0" ${st(3)}/><path d="M860 770 q-8 14 0 20 q8 -6 0 -20 Z" fill="#7FD3F0" ${st(3)}/></g>
    </svg>
    ${card(0, "<span style='color:#FF5A4E'>GENÉTICA</span><br/>herança da família", `border-color:#FF5A4E;box-shadow:10px 10px 0 #FF5A4E`)}
    ${card(1, "Idade<br/>30 a 50 anos")}
    ${card(2, "Cigarro<br/>resseca o disco")}
    ${card(3, "Sobrepeso e<br/>sedentarismo")}
    ${card(4, "Carga, vibração<br/>e técnica ruim")}
    <div id="f08-badge" class="abs label" style="opacity:0">PESO ENORME!</div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- 0: árvore da família com discos -->
      <g transform="translate(${cx(0)},0)"><g id="f08-g0" opacity="0">
        <path d="M0 330 L0 380 M-70 380 L70 380 M-70 380 L-70 420 M70 380 L70 420 M-70 470 L-70 500 M-110 500 L-30 500 M-110 500 L-110 530 M-30 500 L-30 530" fill="none" ${st(5)}/>
        ${[[0, 310], [-70, 445], [70, 445], [-110, 555], [-30, 555]].map(([x, y], i) => `<g id="f08-fam${i}"><ellipse cx="${x}" cy="${y}" rx="34" ry="14" fill="#FBF5E6" ${st(4)}/><rect x="${x - 34}" y="${y}" width="68" height="16" fill="#F3EAD3" stroke="${C.ink}" stroke-width="4"/><ellipse cx="${x}" cy="${y}" rx="11" ry="5" fill="#7FD3F0"/></g>`).join("")}
        <g id="f08-dna"><g transform="translate(-10,-80)"><path d="M70 500 Q100 520 70 540 Q40 560 70 580 Q100 600 70 620 M110 500 Q80 520 110 540 Q140 560 110 580 Q80 600 110 620" fill="none" stroke="${C.pain}" stroke-width="6"/>
          <path d="M74 512 L106 512 M74 548 L106 548 M74 588 L106 588" stroke="${C.ink}" stroke-width="4"/></g></g>
      </g></g>
      <!-- 1: idade -->
      <g transform="translate(${cx(1)},0)"><g id="f08-g1" opacity="0">
        <path d="M-100 480 A100 100 0 0 1 100 480" fill="none" stroke="#E5E5E5" stroke-width="26"/>
        <path id="f08-arc" d="M-71 409 A100 100 0 0 1 71 409" fill="none" stroke="${C.sun}" stroke-width="26"/>
        <g id="f08-needle"><line x1="0" y1="480" x2="0" y2="400" ${st(8)}/></g><circle cx="0" cy="480" r="12" fill="${C.ink}"/>
        <text x="-120" y="520" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">20</text><text x="96" y="520" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">80</text>
        <text id="f08-age" x="0" y="350" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="54" fill="${C.pain}" opacity="0">30–50</text>
      </g></g>
      <!-- 2: cigarro + disco ressecando -->
      <g transform="translate(${cx(2)},0)"><g id="f08-g2" opacity="0">
        <g transform="rotate(-18 0 330)"><rect x="-100" y="315" width="170" height="30" rx="6" fill="#fff" ${st(5)}/><rect x="70" y="315" width="40" height="30" rx="4" fill="#E8A35A" ${st(5)}/><circle cx="-102" cy="330" r="10" fill="${C.pain}"/></g>
        <g id="f08-smoke" fill="#C9C9C9" opacity="0.8"><circle cx="-120" cy="290" r="12"/><circle cx="-130" cy="262" r="16"/><circle cx="-118" cy="232" r="11"/></g>
        <g id="f08-wet"><ellipse cx="0" cy="470" rx="90" ry="24" fill="#FBF5E6" ${st(5)}/><rect x="-90" y="470" width="180" height="40" fill="#F3EAD3" stroke="${C.ink}" stroke-width="5"/><ellipse cx="0" cy="470" rx="34" ry="9" fill="#7FD3F0"/></g>
        <g id="f08-dry" opacity="0"><path d="M-60 520 L-50 540 M0 520 L0 546 M50 520 L44 540" ${st(4)}/><path d="M-30 470 l10 8 l-6 10 M20 466 l-8 10 l8 8" fill="none" stroke="#B4472F" stroke-width="4"/></g>
      </g></g>
      <!-- 3: sofá + balança -->
      <g transform="translate(${cx(3)},0)"><g id="f08-g3" opacity="0">
        <g id="f08-scale"><rect x="-70" y="290" width="140" height="44" rx="12" fill="#fff" ${st(6)}/><g id="f08-sneedle"><line x1="0" y1="324" x2="-26" y2="304" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/></g></g>
        <g id="f08-sofa" opacity="0"><rect x="-110" y="440" width="220" height="70" rx="20" fill="#8E6CD8" ${st(6)}/><rect x="-120" y="410" width="40" height="110" rx="14" fill="#7A58C4" ${st(6)}/><rect x="80" y="410" width="40" height="110" rx="14" fill="#7A58C4" ${st(6)}/>
          <rect x="-80" y="380" width="160" height="70" rx="18" fill="#9B7BE0" ${st(6)}/><text x="0" y="580" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">zZz</text></g>
      </g></g>
      <!-- 4: carga, vibração, técnica ruim -->
      <g id="f08-g4" opacity="0">
        <g id="f08-vib"><path d="M${cx(4) - 110} 300 l20 -16 l20 16 l20 -16 l20 16 l20 -16 l20 16 l20 -16 l20 16 l20 -16 l20 16" fill="none" stroke="${C.blue}" stroke-width="6" stroke-linecap="round"/></g>
        <g transform="translate(${cx(4) - 40},430) scale(0.5)">${human("f08z", "ze")}</g>
        <g id="f08-box"><rect x="${cx(4) + 10}" y="484" width="84" height="64" rx="6" fill="#C99A62" ${st(5)}/></g>
        <line x1="${X[4] + 20}" y1="551" x2="${X[4] + 280}" y2="551" ${st(5)}/>
        <g id="f08-x" opacity="0"><path d="M${cx(4) + 50} 330 l70 70 M${cx(4) + 120} 330 l-70 70" stroke="${C.pain}" stroke-width="16" stroke-linecap="round"/></g>
      </g>
    </svg>
    <div id="f08-title" class="abs title" style="opacity:0">O QUE <b>AUMENTA</b> O RISCO?</div>`,
      js: function (tl, K, R) {
        const d = "f08d", z = "f08z";
        R.drop(tl, "#f08-title", 0.05, 0.7, -260);
        R.fadeIn(tl, "#f08-d-wrap", 0, 0.3);
        R.setPose(tl, d, 0, { armF: 20, armB: -20 });
        R.face(tl, d, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, d, 0.3, K.dur);
        const worry = (t, i) => {
          R.face(tl, d, t, { eyes: i > 2 ? "pain" : "wide", mouth: i > 2 ? "frown" : "flat" });
          tl.to("#f08d-body", { scaleY: 0.9 - i * 0.02, svgOrigin: "0 -24", duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          R.pose(tl, d, t, 0.25, { armF: i % 2 ? -130 : -40, armB: i % 2 ? 130 : 40 }, "back.out(2)");
        };
        // 0 genética
        R.pop(tl, "#f08-c0", K.gen - 0.25, 0.4);
        R.pop(tl, "#f08-g0", K.gen - 0.15, 0.4);
        [0, 1, 2, 3, 4].forEach((i) => R.pop(tl, `#f08-fam${i}`, K.gen + 0.05 + i * 0.12, 0.3));
        tl.to("#f08-dna", { y: -8, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.gen + 0.6);
        tl.fromTo("#f08-badge", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.enorme - 0.2);
        R.shake(tl, "#f08-c0", K.enorme + 0.1, 0.3, 5);
        worry(K.enorme, 0);
        // 1 idade
        R.pop(tl, "#f08-c1", K.idade - 0.25, 0.4);
        R.pop(tl, "#f08-g1", K.idade - 0.15, 0.4);
        tl.fromTo("#f08-needle", { rotation: -80 }, { rotation: -25, svgOrigin: "0 480", duration: 0.6, ease: "back.out(1.6)" }, K.trinta - 0.1);
        tl.to("#f08-needle", { rotation: 25, svgOrigin: "0 480", duration: 0.6, ease: "back.out(1.6)" }, K.cinq - 0.1);
        R.pop(tl, "#f08-age", K.trinta, 0.35);
        worry(K.cinq, 1);
        // 2 cigarro
        R.pop(tl, "#f08-c2", K.cig - 0.25, 0.4);
        R.pop(tl, "#f08-g2", K.cig - 0.15, 0.4);
        tl.fromTo("#f08-smoke circle", { y: 0, opacity: 0.8 }, { y: -40, opacity: 0, duration: 1.2, stagger: 0.25, ease: "none" }, K.cig);
        tl.to("#f08-wet", { scaleY: 0.7, svgOrigin: "0 510", duration: 0.5, ease: "power2.in" }, K.ress);
        R.fadeIn(tl, "#f08-dry", K.ress + 0.3, 0.3);
        worry(K.ress, 2);
        // 3 sobrepeso e sedentarismo
        R.pop(tl, "#f08-c3", K.sobre - 0.25, 0.4);
        R.pop(tl, "#f08-g3", K.sobre - 0.15, 0.4);
        tl.to("#f08-sneedle", { rotation: 70, svgOrigin: "0 324", duration: 0.5, ease: "back.out(2)" }, K.sobre + 0.1);
        R.pop(tl, "#f08-sofa", K.sed - 0.1, 0.4);
        worry(K.sed, 3);
        // 4 carga, vibração, técnica ruim (Seu Zé com a caixa, X)
        R.pop(tl, "#f08-c4", K.carga - 0.25, 0.4);
        R.fadeIn(tl, "#f08-g4", K.carga - 0.15, 0.3);
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 6, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        tl.to("#f08-vib", { x: 10, duration: 0.06, yoyo: true, repeat: 9, ease: "none" }, K.vib);
        R.pose(tl, z, K.lev - 0.1, 0.4, { torso: 80, neck: -30, shF: -10, elF: 0, shB: -10, elB: 0 });
        R.face(tl, z, K.err, { eyes: "wide", mouth: "scream" });
        R.pop(tl, "#f08-x", K.err, 0.3);
        R.shake(tl, "#f08z-root", K.err, 0.4, 4);
        worry(K.ze, 4);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.gen - 0.2, vol: 0.4 },
        { name: "impact-bass-1", t: k.enorme - 0.05, vol: 0.4 },
        { name: "pop", t: k.idade - 0.2, vol: 0.35 },
        { name: "pop", t: k.cig - 0.2, vol: 0.35 },
        { name: "pop", t: k.sobre - 0.2, vol: 0.35 },
        { name: "pop", t: k.carga - 0.2, vol: 0.35 },
        { name: "error", t: k.err, vol: 0.3 },
      ],
    };
  },
};
