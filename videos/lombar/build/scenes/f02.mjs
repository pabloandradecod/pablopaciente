// F2 — Gancho: domingo no jardim, segunda trava, anda igual robô; Guardas travam a lombar e o Alarmildo dispara
export default {
  speakers: { guardas: "f02g-g0", alarmildo: "f02a" },
  build(ctx) {
    const { C, human, guardas, alarmildo, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      jard: w(0, "jardim"), carr: w(0, "carregou"), arr: w(0, "arrancou"), horas: w(0, "horas"),
      seg: w(0, "segunda"), desp: w(0, "despertador"), levan: w(0, "levantar"), trav: w(0, "travou"), robo: w(0, "robô"), medo: w(0, "medo"),
      g0: L1.start, g1: L1.end, a0: L2.start, a1: L2.end, p3: L3.start, estr: w(3, "estragou"), calma: w(3, "Calma"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f02-dom { left:120px; top:110px; padding:14px 28px; font-size:46px; }
        #f02-seg { left:120px; top:110px; padding:14px 28px; font-size:46px; }
        #f02-robo { left:860px; top:260px; font-size:58px; color:${C.ink}; }
        #f02-q { left:0; right:0; top:90px; text-align:center; font-size:86px; }
        #f02-q span { color:${C.pain}; }
        #f02-calma { left:1240px; top:420px; padding:18px 36px; font-size:70px; color:#fff; background:${C.good}; border:8px solid ${C.ink}; border-radius:24px; transform: rotate(-6deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f02-garden">
        <rect width="1920" height="880" fill="${C.sky}"/>
        <circle cx="1650" cy="170" r="70" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
        <rect y="760" width="1920" height="320" fill="#6CC56F"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="6"/>
        <rect y="880" width="1920" height="200" fill="#8B5A2B"/>
        ${[1100, 1250, 1400, 1550].map((x, i) => `<g><line x1="${x}" y1="880" x2="${x}" y2="800" stroke="#2E7D32" stroke-width="8"/><circle cx="${x}" cy="790" r="26" fill="${["#FF5A4E", "#FFC94A", "#8E6CD8", "#FF5A4E"][i]}" stroke="${C.ink}" stroke-width="5"/></g>`).join("")}
        <g id="f02-weeds">${[920, 980, 1040].map((x) => `<path d="M${x} 880 L${x - 10} 830 M${x} 880 L${x + 8} 822 M${x} 880 L${x} 815" stroke="#2E7D32" stroke-width="7" stroke-linecap="round"/>`).join("")}</g>
        <g id="f02-sack"><g transform="translate(860,610)"><path d="M-60 -70 Q-70 50 -50 70 L50 70 Q70 50 60 -70 Q0 -90 -60 -70Z" fill="#B58A5A" ${st}/><text x="0" y="20" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">TERRA</text></g></g>
        <g id="f02-clock" opacity="0"><circle cx="1500" cy="420" r="70" fill="#fff" ${st}/><g id="f02-hand"><line x1="1500" y1="420" x2="1500" y2="368" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/></g><circle cx="1500" cy="420" r="9" fill="${C.ink}"/></g>
      </g>
      <g id="f02-room" opacity="0">
        <rect width="1920" height="880" fill="${C.wall}"/>
        <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        <rect x="160" y="140" width="240" height="220" rx="14" fill="#2E3E66" ${st}/><circle cx="320" cy="200" r="26" fill="#FFF3B8"/>
        <g id="f02-bed"><rect x="300" y="640" width="640" height="70" rx="18" fill="#fff" ${st}/><rect x="300" y="700" width="640" height="50" rx="12" fill="#B07A4A" ${st}/><rect x="270" y="560" width="40" height="320" rx="10" fill="#B07A4A" ${st}/><rect x="330" y="600" width="140" height="56" rx="26" fill="${C.sky}" ${st}/></g>
        <g id="f02-alarm"><g transform="translate(1120,620)"><circle r="54" fill="${C.pain}" ${st}/><circle r="38" fill="#fff" stroke="${C.ink}" stroke-width="5"/><line x1="0" y1="0" x2="0" y2="-26" stroke="${C.ink}" stroke-width="6"/><line x1="0" y1="0" x2="18" y2="0" stroke="${C.ink}" stroke-width="6"/><circle cx="-40" cy="-50" r="16" fill="${C.sun}" ${st}/><circle cx="40" cy="-50" r="16" fill="${C.sun}" ${st}/></g></g>
        <rect x="1060" y="680" width="120" height="200" fill="#B07A4A" ${st}/>
      </g>
      <g id="f02-z-wrap"><g transform="translate(700,640) scale(1.3)">${human("f02z", "ze")}</g></g>
      <g id="f02-glow" opacity="0"><circle cx="0" cy="0" r="40" fill="${C.pain}" opacity="0.4"/><circle cx="0" cy="0" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- bolhas: Guardas (lombar) e Alarmildo (cérebro) -->
      <g id="f02-b1" opacity="0">
        <clipPath id="f02-c1"><circle cx="1420" cy="560" r="270"/></clipPath>
        <circle cx="1420" cy="560" r="282" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-c1)"><rect x="1140" y="280" width="560" height="560" fill="#FFE4DC"/><text x="1420" y="350" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">LOMBAR</text>
          <g transform="translate(1420,800) scale(0.95)">${guardas("f02g")}</g>
          <path d="M1180 420 L1660 420" stroke="${C.sun}" stroke-width="18" stroke-dasharray="40 24"/></g>
      </g>
      <g id="f02-b2" opacity="0">
        <clipPath id="f02-c2"><circle cx="1420" cy="420" r="230"/></clipPath>
        <circle cx="1420" cy="420" r="242" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-c2)"><rect x="1180" y="180" width="480" height="480" fill="#F6D5E0"/><path d="M1240 320 Q1250 220 1360 230 Q1420 190 1490 230 Q1600 230 1600 330 Q1640 420 1560 470 Q1480 520 1400 490 Q1300 520 1250 460 Q1200 400 1240 320Z" fill="#F7B7C8" stroke="${C.ink}" stroke-width="6" opacity="0.6"/>
          <text x="1420" y="250" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">CÉREBRO</text>
          <g transform="translate(1420,600) scale(0.95)">${alarmildo("f02a")}</g></g>
        <path d="M1220 560 L1060 470 L1240 520" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-dom" class="abs card title" style="opacity:0">DOMINGO</div>
    <div id="f02-seg" class="abs card title" style="opacity:0">SEGUNDA, 7h...</div>
    <div id="f02-robo" class="abs title" style="opacity:0">bip... bop... bip...</div>
    <div id="f02-q" class="abs title" style="opacity:0">Estragou a <span>coluna</span>?</div>
    <div id="f02-calma" class="abs title" style="opacity:0">CALMA!</div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        R.setPose(tl, z, 0, { shF: -60, elF: -80, shB: -50, elB: -80 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f02-dom", 0.2, 0.4);
        R.blinks(tl, z, 0.5, K.seg, "happy");
        // carrega terra (saco nos braços), depois arranca mato abaixado
        tl.set("#f02-sack", { x: -60, y: 0 }, 0);
        tl.fromTo("#f02-z-wrap", { x: -200 }, { x: 0, duration: 1.4, ease: "power1.inOut" }, K.carr - 0.4);
        tl.fromTo("#f02-sack", { x: -260 }, { x: -60, duration: 1.4, ease: "power1.inOut" }, K.carr - 0.4);
        tl.to("#f02-sack", { x: 300, y: 200, opacity: 0, duration: 0.5, ease: "power2.in" }, K.arr - 0.4);
        R.pose(tl, z, K.arr - 0.2, 0.5, { torso: 70, neck: -30, shF: -30, elF: -10, shB: -20, elB: -10, hipF: -10, knF: 20 });
        for (let i = 0; i < 3; i++) R.pose(tl, z, K.arr + 0.4 + i * 0.5, 0.25, { shF: i % 2 ? -30 : 10, elF: i % 2 ? -10 : -60 }, "power2.out");
        tl.to("#f02-weeds path", { y: -40, opacity: 0, duration: 0.3, stagger: 0.12 }, K.arr + 0.5);
        R.pop(tl, "#f02-clock", K.horas - 0.1, 0.35);
        tl.to("#f02-hand", { rotation: 1080, svgOrigin: "1500 420", duration: 1.6, ease: "power1.inOut" }, K.horas);
        // segunda: quarto, deitado
        tl.to("#f02-garden, #f02-dom", { opacity: 0, duration: 0.3 }, K.seg - 0.2);
        tl.to("#f02-room", { opacity: 1, duration: 0.3 }, K.seg - 0.2);
        R.pop(tl, "#f02-seg", K.seg + 0.1, 0.35);
        tl.set("#f02-z-wrap", { x: 60, y: -20 }, K.seg - 0.2);
        R.setPose(tl, z, K.seg - 0.2, { root: -90, torso: 0, neck: 0, hipF: 0, hipB: 0, knF: 0, knB: 0, shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, z, K.seg - 0.2, { eyes: "closed", mouth: "flat" });
        // despertador
        R.shake(tl, "#f02-alarm", K.desp, 1.0, 6);
        R.face(tl, z, K.desp + 0.5, { eyes: "normal", mouth: "flat" });
        // tenta levantar... travou!
        R.pose(tl, z, K.levan, 0.4, { root: -50, hipF: -40, hipB: -40 });
        R.face(tl, z, K.trav, { eyes: "wide", mouth: "scream" });
        R.shake(tl, "#f02z-root", K.trav, 0.5, 6);
        tl.set("#f02-glow", { x: 780, y: 560, opacity: 1 }, K.trav);
        tl.fromTo("#f02-glow", { scale: 0.6, svgOrigin: "0 0" }, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 5 }, K.trav);
        R.fadeOut(tl, "#f02-seg", K.trav);
        // anda igual robô
        tl.to("#f02-glow", { opacity: 0, duration: 0.2 }, K.robo - 0.6);
        tl.set("#f02-z-wrap", { x: 0, y: 0 }, K.robo - 0.4);
        R.setPose(tl, z, K.robo - 0.4, { root: 0, torso: -4, neck: 0, hipF: 0, hipB: 0, knF: 0, knB: 0, shF: -20, elF: -90, shB: -20, elB: -90 });
        R.face(tl, z, K.robo - 0.4, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f02-robo", K.robo, 0.3);
        for (let i = 0; i < 6; i++) {
          tl.to("#f02-z-wrap", { x: (i + 1) * 40, duration: 0.25, ease: "steps(2)" }, K.robo + i * 0.35);
          R.pose(tl, z, K.robo + i * 0.35, 0.15, { hipF: i % 2 ? 10 : -10, hipB: i % 2 ? -10 : 10 }, "steps(1)");
        }
        R.fadeOut(tl, "#f02-robo", K.g0 - 0.6);
        // bolha dos Guardas
        R.pop(tl, "#f02-b1", K.g0 - 0.5, 0.45, 0.3);
        ["f02g-g0", "f02g-g1"].forEach((g) => { R.setPose(tl, g, 0, { armF: 70, armB: -70 }); R.face(tl, g, 0, { mouth: "flat" }); });
        R.pose(tl, "f02g-g0", K.g0, 0.25, { armF: 110, armB: -110 }, "back.out(2)");
        R.pose(tl, "f02g-g1", K.g0 + 0.05, 0.25, { armF: 110, armB: -110 }, "back.out(2)");
        R.talk(tl, "f02g-g1", K.g0, K.g1, "flat");
        tl.to("#f02-b1", { scale: 0, opacity: 0, svgOrigin: "1420 560", duration: 0.3, ease: "back.in(2)" }, K.g1 + 0.1);
        // bolha do Alarmildo
        R.pop(tl, "#f02-b2", K.a0 - 0.35, 0.4, 0.3);
        R.face(tl, "f02a", K.a0 - 0.35, { eyes: "wide" });
        tl.fromTo("#f02a-rays", { opacity: 1 }, { opacity: 0.1, duration: 0.12, yoyo: true, repeat: 15, ease: "none" }, K.a0);
        R.shake(tl, "#f02a-body", K.a0, K.a1 - K.a0, 4);
        R.pose(tl, "f02a", K.a0, 0.2, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f02-b2", { scale: 0, opacity: 0, svgOrigin: "1420 420", duration: 0.3, ease: "back.in(2)" }, K.a1 + 0.15);
        // estragou? calma!
        R.drop(tl, "#f02-q", K.estr - 0.3, 0.8, -300);
        R.face(tl, z, K.estr, { eyes: "wide", mouth: "frown" });
        R.pop(tl, "#f02-calma", K.calma - 0.1, 0.4);
        R.face(tl, z, K.calma + 0.3, { eyes: "normal", mouth: "smile" });
        R.pose(tl, z, K.calma + 0.3, 0.5, { shF: -10, elF: -20, shB: 5, elB: -10, torso: 0 });
      },
      sfx: [
        { name: "pop", t: 0.2, vol: 0.4 },
        { name: "pop", t: k.horas, vol: 0.35 },
        { name: "whoosh", t: k.seg - 0.2, vol: 0.45 },
        { name: "notification", t: k.desp, vol: 0.4, dur: 1.0 },
        { name: "glitch-1", t: k.trav, vol: 0.4 },
        { name: "impact-bass-2", t: k.trav + 0.05, vol: 0.4 },
        { name: "key-press", t: k.robo, vol: 0.4 }, { name: "key-press", t: k.robo + 0.7, vol: 0.4 }, { name: "key-press", t: k.robo + 1.4, vol: 0.4 },
        { name: "whoosh-short", t: k.g0 - 0.5, vol: 0.45 },
        { name: "error", t: k.a0, vol: 0.35 },
        { name: "impact-bass-1", t: k.estr - 0.1, vol: 0.35 },
        { name: "pop", t: k.calma - 0.1, vol: 0.45 },
      ],
    };
  },
};
