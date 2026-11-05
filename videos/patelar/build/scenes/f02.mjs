// F2 — Gancho: Juninho corta no vôlei, dor abaixo da rótula; no cinema com o Seu Zé, levantar dói; Molão amassado
export default {
  speakers: { molao: "f02m" },
  build(ctx) {
    const { C, human, molao, patelito, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      jun: w(0, "Juninho"), cort: w(0, "cortador"), pula: w(0, "Pula"), dor: w(0, "dor"), rot: w(0, "rótula"),
      com: w(0, "começo"), esq: w(0, "esquenta"), volta: w(0, "volta"), cine: w(0, "cinema"), horas: w(0, "horas"), lev: w(0, "levantar"), doi: w(0, "dói"),
      z0: L1.start, z1: L1.end, m0: L2.start, m1: L2.end, p3: L3.start, cans: w(3, "cansaço"), inv: w(3, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f02-name { left:120px; top:110px; padding:14px 28px; font-size:44px; }
        #f02-graph { left:1260px; top:120px; width:540px; padding:18px 22px; }
        #f02-graph .t { font-size:26px; margin-bottom:6px; }
        #f02-2h { left:1500px; top:120px; padding:12px 24px; font-size:52px; color:#fff; background:${C.pain}; border:7px solid ${C.ink}; border-radius:18px; }
        #f02-q { left:0; right:0; top:90px; text-align:center; font-size:84px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f02-court">
        <rect width="1920" height="1080" fill="#DCEAF2"/>
        <rect x="0" y="180" width="560" height="300" fill="#B9CFDB" ${st}/>
        ${[0, 1, 2].map((r) => `<rect x="0" y="${240 + r * 80}" width="560" height="20" fill="#93AFC0"/>`).join("")}
        <rect y="760" width="1920" height="320" fill="#E9B872"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
        <line x1="0" y1="900" x2="1920" y2="900" stroke="#fff" stroke-width="8"/>
        <!-- rede -->
        <line x1="1180" y1="380" x2="1180" y2="880" stroke="${C.ink}" stroke-width="12"/>
        <rect x="1180" y="400" width="24" height="240" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
        <g stroke="${C.ink}" stroke-width="2" opacity="0.6">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="1180" y1="${410 + i * 30}" x2="1204" y2="${410 + i * 30}"/>`).join("")}</g>
        <g transform="translate(330,520) scale(0.7)">${human("f02z", "ze")}</g>
        <rect x="0" y="470" width="560" height="290" fill="#7F99A8" ${st}/>
        <g id="f02-flag"><line x1="470" y1="330" x2="470" y2="470" stroke="${C.ink}" stroke-width="6"/><path d="M470 330 L560 352 L470 376 Z" fill="${C.good}" ${st}/></g>
      </g>
      <g id="f02-cinema" opacity="0">
        <rect width="1920" height="1080" fill="#1E1A2E"/>
        <rect x="360" y="90" width="1200" height="420" rx="12" fill="#CFE8FF" ${st}/>
        <g id="f02-scr" opacity="0.8"><line x1="960" y1="200" x2="960" y2="500" stroke="${C.ink}" stroke-width="8"/><circle cx="820" cy="220" r="30" fill="#fff" ${st}/><text x="960" y="160" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">VÔLEI: A FINAL</text></g>
        ${[0, 1, 2, 3, 4].map((i) => `<rect x="${200 + i * 320}" y="720" width="260" height="200" rx="40" fill="#8E2F45" ${st}/>`).join("")}
        <rect y="900" width="1920" height="180" fill="#2A2440"/>
      </g>
      <g id="f02-j-wrap"><g transform="translate(800,640) scale(1.3)">${human("f02j", "juninho")}</g></g>
      <g id="f02-z2" opacity="0"><g transform="translate(1150,700) scale(1.2)">${human("f02z2", "ze")}</g></g>
      <g id="f02-seatfront" opacity="0">${[0, 1, 2, 3, 4].map((i) => `<rect x="${200 + i * 320}" y="830" width="260" height="120" rx="30" fill="#A23A55" ${st}/>`).join("")}</g>
      <g id="f02-ball"><circle cx="0" cy="0" r="34" fill="#fff" ${st}/><path d="M-30 -14 Q0 0 30 -14 M-26 18 Q0 4 26 18 M0 -34 Q-12 0 0 34" stroke="#3E7FD8" stroke-width="5" fill="none"/></g>
      <g id="f02-pain" opacity="0"><circle cx="838" cy="776" r="40" fill="${C.pain}" opacity="0.4"/><circle cx="838" cy="776" r="17" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- bolha: dentro do joelho -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1460" cy="500" r="290"/></clipPath>
        <circle cx="1460" cy="500" r="302" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1160" y="200" width="600" height="600" fill="#FFE4DC"/>
          <path d="M1240 800 Q1300 690 1460 690 Q1620 690 1680 800 Z" fill="${C.bone}" ${st}/>
          <text x="1460" y="770" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="${C.ink}">TÍBIA</text>
          <g id="f02-m-wrap"><g transform="translate(1440,700) scale(0.95)">${molao("f02m")}</g></g>
          <g transform="translate(1620,500) scale(0.75)">${patelito("f02p")}</g>
        </g>
        <path d="M1200 680 L1060 770 L1240 730" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-name" class="abs card title" style="opacity:0">Juninho, 17</div>
    <div id="f02-graph" class="abs card" style="opacity:0">
      <div class="t label">DOR NO TREINO</div>
      <svg width="490" height="170" viewBox="0 0 490 170"><line x1="20" y1="150" x2="480" y2="150" stroke="${C.ink}" stroke-width="5"/><line x1="20" y1="10" x2="20" y2="150" stroke="${C.ink}" stroke-width="5"/>
        <path id="f02-gline" d="M24 40 Q90 60 150 120 Q220 140 280 110 Q360 50 470 24" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round"/>
        <text x="40" y="34" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">começo</text><text x="170" y="142" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">aqueceu</text><text x="390" y="62" font-family="Nunito" font-weight="900" font-size="20" fill="${C.pain}">depois!</text></svg>
    </div>
    <div id="f02-2h" class="abs title" style="opacity:0">2 HORAS</div>
    <div id="f02-q" class="abs title" style="opacity:0">Será que é <span>só cansaço</span>?</div>`,
      js: function (tl, K, R) {
        const j = "f02j";
        R.setPose(tl, j, 0, { shF: -20, elF: -40, shB: 10, elB: -30, hipF: -20, knF: 30, hipB: 10, knB: 20 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0.4, K.dor);
        R.setPose(tl, "f02z", 0, { shF: -150, elF: -20 });
        R.face(tl, "f02z", 0, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f02-name", K.jun - 0.1, 0.4);
        tl.fromTo("#f02-flag", { rotation: -10 }, { rotation: 10, svgOrigin: "470 470", duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.2);
        // a bola vem e ele corta
        tl.set("#f02-ball", { x: 300, y: 120 }, 0);
        tl.to("#f02-ball", { x: 900, y: 240, duration: 1.0, ease: "power1.out" }, K.cort - 0.9);
        R.pose(tl, j, K.cort - 0.6, 0.3, { hipF: -60, knF: 90, hipB: -40, knB: 80, shF: 40, shB: 40 }, "power2.out");
        tl.to("#f02-j-wrap", { y: -260, duration: 0.4, ease: "power2.out" }, K.cort - 0.3);
        R.pose(tl, j, K.cort - 0.3, 0.3, { hipF: -10, knF: 30, hipB: 10, knB: 40, shF: -170, elF: -20, shB: -40 });
        R.pose(tl, j, K.cort + 0.1, 0.12, { shF: -40, elF: 0 }, "power4.out");
        tl.to("#f02-ball", { x: 1500, y: 760, duration: 0.35, ease: "power2.in" }, K.cort + 0.12);
        tl.to("#f02-j-wrap", { y: 0, duration: 0.35, ease: "power2.in" }, K.cort + 0.25);
        R.pose(tl, j, K.cort + 0.5, 0.2, { hipF: -40, knF: 70, hipB: -30, knB: 60 }, "power2.out");
        R.pose(tl, j, K.cort + 0.8, 0.3, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -10, elF: -20 });
        tl.to("#f02-ball", { opacity: 0, duration: 0.2 }, K.cort + 0.6);
        // pula, pula, pula
        for (let i = 0; i < 3; i++) {
          tl.to("#f02-j-wrap", { y: -140, duration: 0.2, ease: "power2.out" }, K.pula + i * 0.45);
          tl.to("#f02-j-wrap", { y: 0, duration: 0.2, ease: "power2.in" }, K.pula + i * 0.45 + 0.2);
        }
        // dor abaixo da rótula
        tl.set("#f02-pain", { opacity: 1 }, K.dor);
        tl.fromTo("#f02-pain", { scale: 0.6, svgOrigin: "838 776" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 5 }, K.dor);
        R.face(tl, j, K.dor, { eyes: "pain", mouth: "frown" });
        R.pose(tl, j, K.rot, 0.4, { torso: 30, shF: 10, elF: -20, shB: 20, elB: -10, neck: -10 });
        R.fadeOut(tl, "#f02-name", K.com - 0.3);
        // gráfico da dor no treino
        R.pop(tl, "#f02-graph", K.com - 0.1, 0.4);
        R.draw(tl, "#f02-gline", K.com, K.volta + 0.8 - K.com, "none");
        R.face(tl, j, K.esq, { eyes: "normal", mouth: "smile" });
        R.pose(tl, j, K.esq, 0.4, { torso: 0, neck: 0 });
        tl.to("#f02-pain", { opacity: 0.3, duration: 0.3 }, K.esq);
        tl.to("#f02-pain", { opacity: 1, duration: 0.2 }, K.volta);
        R.face(tl, j, K.volta, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f02j-root", K.volta, 0.4, 4);
        // cinema
        tl.to("#f02-court, #f02-graph, #f02-pain", { opacity: 0, duration: 0.3 }, K.cine - 0.2);
        tl.to("#f02-cinema, #f02-z2, #f02-seatfront", { opacity: 1, duration: 0.3 }, K.cine - 0.2);
        tl.set("#f02-j-wrap", { x: -70, y: 60 }, K.cine - 0.2);
        R.setPose(tl, j, K.cine - 0.2, { torso: -6, neck: 0, hipF: -88, hipB: -92, knF: 92, knB: 88, shF: -40, elF: -60, shB: -30, elB: -60 });
        R.face(tl, j, K.cine - 0.2, { eyes: "normal", mouth: "smile" });
        R.setPose(tl, "f02z2", 0, { hipF: -88, hipB: -92, knF: 92, knB: 88, shF: -30, elF: -60 });
        R.face(tl, "f02z2", 0, { eyes: "happy", mouth: "smile" });
        R.pop(tl, "#f02-2h", K.horas - 0.2, 0.4);
        // levantar dói
        tl.set("#f02-pain", { x: -70, y: 0 }, K.lev - 0.1);
        tl.to("#f02-j-wrap", { y: 0, duration: 0.4, ease: "power2.out" }, K.lev);
        R.pose(tl, j, K.lev, 0.4, { hipF: -10, hipB: -10, knF: 10, knB: 10, torso: 20 });
        tl.set("#f02-pain", { opacity: 1 }, K.doi);
        R.face(tl, j, K.doi, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f02j-root", K.doi, 0.4, 5);
        R.fadeOut(tl, "#f02-2h", K.z0 - 0.2);
        // Seu Zé torcendo pro filme
        R.face(tl, "f02z2", K.z0, { eyes: "happy" });
        R.pose(tl, "f02z2", K.z0, 0.25, { shF: -160, elF: -20, shB: -150, elB: -20 }, "back.out(2)");
        R.talk(tl, "f02z2", K.z0, K.z1, "grin", "open");
        // bolha: Molão amassado
        R.pop(tl, "#f02-bubble", K.m0 - 0.45, 0.45, 0.3);
        R.face(tl, "f02m", K.m0 - 0.45, { eyes: "pain" });
        R.face(tl, "f02p", K.m0 - 0.45, { eyes: "wide", mouth: "flat" });
        tl.fromTo("#f02m-coil", { scaleY: 1 }, { scaleY: 0.55, transformOrigin: "50% 100%", duration: 0.25, ease: "power3.in" }, K.m0 - 0.2);
        tl.fromTo("#f02m-top", { y: 0 }, { y: 95, duration: 0.25, ease: "power3.in" }, K.m0 - 0.2);
        R.shake(tl, "#f02-m-wrap", K.m0, K.m1 - K.m0, 3);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1460 500", duration: 0.3, ease: "back.in(2)" }, K.m1 + 0.1);
        // só cansaço?
        tl.to("#f02-scr", { opacity: 0, duration: 0.3 }, K.cans - 0.6);
        R.drop(tl, "#f02-q", K.cans - 0.5, 0.8, -300);
        R.face(tl, j, K.cans, { eyes: "wide", mouth: "flat" });
        R.pose(tl, j, K.cans, 0.4, { torso: 0, shF: -150, elF: -40 }, "back.out(2)");
        R.face(tl, j, K.inv, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.jun - 0.1, vol: 0.4 },
        { name: "whoosh-short", t: k.cort - 0.3, vol: 0.4 },
        { name: "impact-bass-1", t: k.cort + 0.12, vol: 0.45 },
        { name: "glitch-1", t: k.dor, vol: 0.3 },
        { name: "pop", t: k.com - 0.1, vol: 0.35 },
        { name: "whoosh", t: k.cine - 0.2, vol: 0.4 },
        { name: "pop", t: k.horas - 0.2, vol: 0.35 },
        { name: "glitch-1", t: k.doi, vol: 0.3 },
        { name: "whoosh-short", t: k.m0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.cans - 0.1, vol: 0.35 },
      ],
    };
  },
};
