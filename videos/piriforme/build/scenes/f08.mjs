// F8 — Causas: "QUEM IRRITA O PIRIFORME?" — sentado (carteira), sobrecarga, queda sentado (casca de banana), variação anatômica
export default {
  speakers: { piriforme: "f08m" },
  build(ctx) {
    const { C, human, piriforme, w } = ctx;
    const k = {
      irrita: w(0, "irrita"), sent: w(0, "sentado"), horas: w(0, "horas"), sup: w(0, "superfície"), cart: w(0, "carteira"),
      sobre: w(0, "Sobrecarga"), corre: w(0, "corre"), ped: w(0, "pedala"), agacha: w(0, "agacha"),
      queda: w(0, "queda"), bunda: w(0, "bunda"), chao: w(0, "chão"),
      banO: `${1290 + 50} 590`, starO: `${1290 - 30} 535`,
      vari: w(0, "variação"), nervo: w(0, "nervo"), apert: w(0, "apertado"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const X = [330, 720, 1110, 1500];
    const card = (i, title) => `<div id="f08-c${i}" class="abs card" style="left:${X[i]}px;top:200px;width:360px;height:480px;opacity:0">
        <div class="label" style="position:absolute;left:0;right:0;bottom:18px;text-align:center;font-size:32px;line-height:1.1">${title}</div></div>`;
    const cx = (i) => X[i] + 180;
    return {
      k,
      css: `
        #f08-title { left:0; right:0; top:70px; text-align:center; font-size:76px; white-space:nowrap; }
        #f08-title b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f08-m-wrap"><g transform="translate(165,870) scale(0.72)">${piriforme("f08m")}</g></g>
      <g id="f08-steam" opacity="0">${[[120, 600], [210, 590]].map(([x, y]) => `<path d="M${x} ${y} q-14 -20 0 -40 q14 -20 0 -40" fill="none" stroke="${C.grey}" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
    </svg>
    ${card(0, "Sentado por horas<br/><span style='color:${C.pain}'>carteira no bolso!</span>")}
    ${card(1, "Sobrecarga")}
    ${card(2, "Queda sentado")}
    ${card(3, "Variação<br/>anatômica")}
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- 0: cadeira dura + carteira gorda + relógio -->
      <g transform="translate(${cx(0)},0)"><g id="f08-g0" opacity="0">
        <rect id="f08-seat" x="-100" y="430" width="200" height="30" rx="8" fill="${C.brown}" ${st()}/>
        <path d="M-90 460 L-90 560 M90 460 L90 560 M88 430 L110 300" ${st(10)}/>
        <g id="f08-wal"><rect x="-56" y="372" width="112" height="58" rx="12" fill="#8B5A2B" ${st(6)}/><rect x="-46" y="384" width="92" height="10" fill="${C.good}"/><rect x="-46" y="400" width="92" height="8" fill="${C.sun}"/></g>
        <g id="f08-hard" opacity="0"><path d="M-110 424 l-20 -16 M110 424 l20 -16 M0 476 l0 22" ${st(6)} stroke="${C.pain}"/></g>
        <circle cx="-70" cy="300" r="46" fill="#fff" ${st(6)}/><g id="f08-hand"><line x1="-70" y1="300" x2="-70" y2="266" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/></g><circle cx="-70" cy="300" r="6" fill="${C.ink}"/>
      </g></g>
      <!-- 1: corre, pedala, agacha -->
      <g transform="translate(${cx(1)},0)"><g id="f08-g1" opacity="0">
        <g transform="translate(0,300)"><g id="f08-i0" opacity="0"><path d="M-70 10 Q-74 -24 -40 -26 L-10 -26 Q0 -6 30 -2 L64 4 Q80 8 78 24 L-62 24 Q-72 22 -70 10 Z" fill="${C.pain}" ${st(6)}/><path d="M-60 24 L76 24" ${st(6)}/><path d="M-100 -10 L-82 -10 M-104 6 L-84 6" ${st(5)}/></g></g>
        <g transform="translate(0,410)"><g id="f08-i1" opacity="0"><circle r="44" fill="#fff" ${st(7)}/><path d="M0 -44 L0 44 M-44 0 L44 0 M-31 -31 L31 31 M-31 31 L31 -31" stroke="${C.ink}" stroke-width="3"/><circle r="8" fill="${C.ink}"/></g></g>
        <g transform="translate(0,530)"><g id="f08-i2" opacity="0"><path d="M-22 -40 Q-22 -62 0 -62 Q22 -62 22 -40" fill="none" ${st(9)}/><circle cy="-6" r="40" fill="${C.ink}"/><text y="6" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="#fff">20kg</text></g></g>
      </g></g>
      <!-- 2: queda com casca de banana -->
      <g id="f08-g2" opacity="0">
        <line x1="${X[2] + 30}" y1="600" x2="${X[2] + 330}" y2="600" ${st(6)}/>
        <g transform="translate(${cx(2) - 20},486) scale(0.5)">${human("f08z", "ze")}</g>
        <g id="f08-ban"><path d="M${cx(2) + 30} 596 q10 -30 34 -26 q-14 10 -12 26 q16 -18 34 -10 q-20 4 -22 10 Z" fill="${C.sun}" ${st(5)}/></g>
        <g id="f08-stars" opacity="0">${[[-70, 540], [-30, 520], [10, 545]].map(([x, y]) => `<path transform="translate(${cx(2) + x},${y})" d="M0 -14 L4 -4 L14 -4 L6 3 L9 14 L0 7 L-9 14 L-6 3 L-14 -4 L-4 -4 Z" fill="${C.sun}" ${st(3)}/>`).join("")}</g>
      </g>
      <!-- 3: nervo passando por dentro do músculo -->
      <g transform="translate(${cx(3)},0)"><g id="f08-g3" opacity="0">
        <path id="f08-nv" d="M-10 290 Q0 340 -6 420 Q-10 490 6 550" fill="none" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/>
        <path id="f08-nvi" d="M-10 290 Q0 340 -6 420 Q-10 490 6 550" fill="none" stroke="${C.nerve}" stroke-width="18" stroke-linecap="round"/>
        <g id="f08-mus"><path d="M-150 380 Q-60 330 150 370 Q160 420 150 440 Q-40 430 -150 450 Q-162 414 -150 380 Z" fill="#F2766B" ${st(7)}/>
          <path d="M-130 400 Q0 370 140 395 M-130 425 Q0 400 140 420" fill="none" stroke="#fff" stroke-width="4" opacity="0.5"/>
          <path d="M-6 380 L-6 446" stroke="${C.nerve}" stroke-width="10" stroke-dasharray="10 8" stroke-linecap="round"/></g>
        <text x="0" y="266" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">nervo por DENTRO</text>
      </g></g>
    </svg>
    <div id="f08-title" class="abs title" style="opacity:0">QUEM <b>IRRITA</b> O PIRIFORME?</div>`,
      js: function (tl, K, R) {
        const m = "f08m", z = "f08z";
        R.drop(tl, "#f08-title", 0.05, 0.7, -260);
        R.fadeIn(tl, "#f08-m-wrap", 0, 0.3);
        R.setPose(tl, m, 0, { armF: -20, armB: 20 });
        R.face(tl, m, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, m, 0.3, K.dur);
        // cada causa deixa o Piriforme mais bravo
        const anger = (t, i) => {
          R.face(tl, m, t, { eyes: i > 1 ? "pain" : "wide", mouth: i > 1 ? "frown" : "flat" });
          R.shake(tl, "#f08m-body", t, 0.35, 4);
          R.pose(tl, m, t, 0.25, { armF: i % 2 ? -150 : -60, armB: i % 2 ? 150 : 60 }, "back.out(2)");
        };
        // 0 sentado
        R.pop(tl, "#f08-c0", K.sent - 0.25, 0.4);
        R.pop(tl, "#f08-g0", K.sent - 0.15, 0.4);
        tl.to("#f08-hand", { rotation: 1080, svgOrigin: "-70 300", duration: 1.2, ease: "power1.inOut" }, K.horas);
        tl.fromTo("#f08-hard", { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 3 }, K.sup);
        tl.set("#f08-hard", { opacity: 1 }, K.sup + 0.5);
        tl.fromTo("#f08-wal", { scale: 1 }, { scale: 1.35, svgOrigin: "0 430", duration: 0.45, ease: "back.out(3)" }, K.cart);
        anger(K.cart, 0);
        // 1 sobrecarga
        R.pop(tl, "#f08-c1", K.sobre - 0.25, 0.4);
        tl.set("#f08-g1", { opacity: 1 }, K.sobre - 0.15);
        R.pop(tl, "#f08-i0", K.corre - 0.1, 0.35);
        tl.to("#f08-i0", { x: 16, duration: 0.12, yoyo: true, repeat: 5 }, K.corre + 0.25);
        R.pop(tl, "#f08-i1", K.ped - 0.1, 0.35);
        tl.to("#f08-i1", { rotation: 360, svgOrigin: "0 0", duration: 0.9, ease: "power1.inOut" }, K.ped + 0.2);
        R.pop(tl, "#f08-i2", K.agacha - 0.1, 0.35);
        tl.to("#f08-i2", { y: -20, duration: 0.18, yoyo: true, repeat: 3, ease: "power2.out" }, K.agacha + 0.25);
        anger(K.agacha, 1);
        // 2 queda sentado (casca de banana)
        R.pop(tl, "#f08-c2", K.queda - 0.45, 0.4);
        R.fadeIn(tl, "#f08-g2", K.queda - 0.35, 0.3);
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 6, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.move(tl, z, K.queda - 0.3, 0.3, 70, 0, "none");
        R.pose(tl, z, K.queda, 0.18, { hipF: -110, hipB: -60, knF: 0, knB: 10, torso: -25, shF: -160, shB: -150, elF: 0, elB: 0 }, "power3.out");
        R.face(tl, z, K.queda, { eyes: "wide", mouth: "scream" });
        tl.to("#f08-ban", { x: 50, rotation: 40, svgOrigin: K.banO, duration: 0.3 }, K.queda);
        R.move(tl, z, K.queda + 0.12, 0.25, 70, 185, "power3.in");
        R.pose(tl, z, K.queda + 0.37, 0.15, { hipF: -88, hipB: -84, torso: -10 }, "power2.out");
        tl.set("#f08-stars", { opacity: 1 }, K.queda + 0.37);
        tl.to("#f08-stars", { rotation: 30, svgOrigin: K.starO, y: -6, duration: 0.3, yoyo: true, repeat: 5 }, K.queda + 0.37);
        R.face(tl, z, K.bunda, { eyes: "pain", mouth: "frown" });
        anger(K.bunda, 2);
        // 3 variação anatômica
        R.pop(tl, "#f08-c3", K.vari - 0.25, 0.4);
        R.pop(tl, "#f08-g3", K.vari - 0.15, 0.4);
        tl.to("#f08-mus", { scaleY: 0.82, svgOrigin: "0 410", duration: 0.25, ease: "power3.in" }, K.apert - 0.1);
        tl.to("#f08-nvi", { stroke: "#FF5A4E", duration: 0.25 }, K.apert);
        R.shake(tl, "#f08-nv", K.apert, 0.5, 3);
        anger(K.apert, 3);
        tl.set("#f08-steam", { opacity: 1 }, K.apert);
        tl.fromTo("#f08-steam", { y: 0 }, { y: -30, duration: 0.5, repeat: 2, ease: "none" }, K.apert);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.sent - 0.2, vol: 0.35 },
        { name: "pop", t: k.cart + 0.05, vol: 0.4 },
        { name: "pop", t: k.sobre - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.queda, vol: 0.45 },
        { name: "impact-bass-2", t: k.queda + 0.37, vol: 0.45 },
        { name: "pop", t: k.vari - 0.2, vol: 0.35 },
        { name: "glitch-1", t: k.apert, vol: 0.25, dur: 0.4 },
      ],
    };
  },
};
