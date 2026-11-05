// F2 — Gancho: pelada de sábado, chutaço, fisgada na parte de dentro da coxa, perna que não fecha; Turão entalado na porta
export default {
  speakers: { turao: "f02t" },
  build(ctx) {
    const { C, human, turao, smooth, w, lines, MINT } = ctx;
    const L1 = lines[1], L2 = lines[2];
    const tPts = [[1560, 470], [1490, 474], [1420, 480], [1375, 484], [1330, 490], [1260, 540], [1200, 620]];
    const tSq = [[1560, 470], [1490, 476], [1420, 486], [1375, 488], [1330, 494], [1260, 542], [1200, 620]];
    const k = {
      pel: w(0, "pelada"), chu: w(0, "chutaço"), fis: w(0, "fisgada"), dias: w(0, "dias"), vir: w(0, "virilha"), form: w(0, "formigamento"),
      esq: w(0, "esquisita"), fech: w(0, "fechar"),
      t0: L1.start, t1: L1.end, p2: L2.start, les: w(2, "Lesão"), ner: w(2, "nervo"), inv: w(2, "investigar"),
      sq: smooth(tSq),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const ants = Array.from({ length: 5 }, (_, i) => `<g id="f02-ant${i}" opacity="0"><ellipse cx="0" cy="0" rx="7" ry="5" fill="${C.ink}"/><circle cx="8" cy="0" r="4" fill="${C.ink}"/></g>`).join("");
    const leg = (x, id) => `<g id="${id}"><rect x="${x - 26}" y="0" width="52" height="210" rx="24" fill="${C.brown}" ${st}/><path d="M${x - 30} 205 L${x + 40} 205 Q${x + 50} 225 ${x + 30} 230 L${x - 30} 230 Z" fill="#4A2E1A" ${st}/></g>`;
    return {
      k,
      css: `
        #f02-days { left:1180px; top:150px; padding:16px 30px; font-size:50px; }
        #f02-days span { color:${C.pain}; }
        #f02-front { left:1180px; top:330px; width:420px; padding:18px; text-align:center; }
        #f02-front .t { font-size:34px; margin-top:6px; }
        #f02-c1, #f02-c2 { top:110px; padding:18px 30px; font-size:52px; }
        #f02-c1 { left:300px; } #f02-c2 { left:1080px; color:#2E9E78; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <g fill="#fff" stroke="${C.ink}" stroke-width="6" opacity="0.9"><ellipse cx="260" cy="170" rx="110" ry="40"/><ellipse cx="1400" cy="120" rx="130" ry="44"/></g>
      <rect y="560" width="1920" height="520" fill="#6CC56F"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 340}" y="560" width="170" height="520" fill="#5DB560"/>`).join("")}
      <line x1="0" y1="560" x2="1920" y2="560" stroke="${C.ink}" stroke-width="6"/>
      <!-- gol -->
      <g><rect x="1620" y="400" width="250" height="300" fill="none" stroke="#fff" stroke-width="16"/><g stroke="#fff" stroke-width="3" opacity="0.7">${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${1640 + i * 40}" y1="400" x2="${1640 + i * 40}" y2="700"/>`).join("")}${[0, 1, 2, 3, 4, 5, 6].map((i) => `<line x1="1620" y1="${420 + i * 40}" x2="1870" y2="${420 + i * 40}"/>`).join("")}</g></g>
      <!-- banco -->
      <g id="f02-bench" opacity="0"><rect x="430" y="650" width="420" height="40" rx="12" fill="#B07A4A" ${st}/><line x1="470" y1="690" x2="470" y2="860" ${st}/><line x1="810" y1="690" x2="810" y2="860" ${st}/></g>
      <g id="f02-z-wrap"><g transform="translate(700,640) scale(1.3)">${human("f02z", "ze")}</g></g>
      <g id="f02-ball"><g transform="translate(1500,830)"><g id="f02-ball-in"><circle r="34" fill="#fff" ${st}/><path d="M0 -14 L13 -4 L8 12 L-8 12 L-13 -4 Z" fill="${C.ink}"/></g></g></g>
      <!-- coxa por dentro (verde-menta) -->
      <g id="f02-glow" opacity="0"><ellipse cx="722" cy="700" rx="40" ry="66" fill="${MINT}" opacity="0.55"/><ellipse cx="722" cy="700" rx="20" ry="40" fill="${MINT}" stroke="#fff" stroke-width="5"/></g>
      ${ants}
      <!-- bolha: Turão entalado na porta -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1400" cy="520" r="290"/></clipPath>
        <circle cx="1400" cy="520" r="302" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1100" y="220" width="600" height="600" fill="#E8FBF3"/>
          <path d="M1100 300 Q1400 260 1700 300 L1700 820 L1100 820 Z" fill="${C.bone}" stroke="${C.ink}" stroke-width="7"/>
          <ellipse cx="1420" cy="600" rx="190" ry="150" fill="#E8FBF3" stroke="${C.ink}" stroke-width="7"/>
          <ellipse cx="1420" cy="600" rx="170" ry="132" fill="#CFEFE3" opacity="0.8"/>
          <text x="1420" y="640" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}" opacity="0.6">membrana</text>
          <g>${turao("f02t", tPts)}</g>
          <path d="M1300 380 L1450 380 L1450 600 L1300 600 Z M1340 440 Q1340 420 1360 420 L1390 420 Q1410 420 1410 440 L1410 540 L1340 540 Z" fill="#C9B48E" fill-rule="evenodd" stroke="${C.ink}" stroke-width="8" opacity="0.95"/>
          <text x="1260" y="380" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">PORTA (canal)</text>
        </g>
        <path d="M1150 690 L1030 790 L1200 740" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-days" class="abs card title" style="opacity:0">DIAS DEPOIS... <span>ai!</span></div>
    <div id="f02-front" class="abs card" style="opacity:0">
      <svg width="380" height="250" viewBox="0 0 380 250">${leg(130, "f02-legL")}${leg(250, "f02-legR")}<path id="f02-arrow" d="M300 110 Q240 60 200 110" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round"/><g id="f02-x" opacity="0"><path d="M300 30 L350 80 M350 30 L300 80" stroke="${C.pain}" stroke-width="14" stroke-linecap="round"/></g></svg>
      <div class="t label">visto de frente: a perna <b style="color:${C.pain}">não fecha</b></div>
    </div>
    <div id="f02-c1" class="abs card title" style="opacity:0">Lesão de virilha?</div>
    <div id="f02-c2" class="abs card title" style="opacity:0">Nervo pedindo socorro?</div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        R.setPose(tl, z, 0, { shF: -20, elF: -30, shB: 15, elB: -20 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        R.blinks(tl, z, 0.5, K.chu, "happy");
        // bola chega rolando
        tl.fromTo("#f02-ball", { x: 400 }, { x: 0, duration: 1.2, ease: "power2.out" }, K.pel);
        tl.fromTo("#f02-ball-in", { rotation: 0 }, { rotation: -540, svgOrigin: "0 0", duration: 1.2, ease: "power2.out" }, K.pel);
        tl.to("#f02-ball", { x: -640, duration: 1.0, ease: "power1.out" }, K.pel + 1.3);
        tl.to("#f02-ball-in", { rotation: -1100, svgOrigin: "0 0", duration: 1.0, ease: "power1.out" }, K.pel + 1.3);
        // chutaço: prepara e chuta
        R.face(tl, z, K.chu - 0.6, { eyes: "normal", mouth: "flat" });
        R.pose(tl, z, K.chu - 0.6, 0.35, { hipF: 35, knF: 60, shF: -60, shB: 40, torso: -6 }, "power2.out");
        R.pose(tl, z, K.chu - 0.15, 0.18, { hipF: -85, knF: 0, shF: 30, shB: -60, torso: 8 }, "power4.out");
        tl.to("#f02-ball", { x: 1100, y: -460, duration: 0.8, ease: "power1.out" }, K.chu);
        tl.to("#f02-ball", { opacity: 0, duration: 0.1 }, K.chu + 0.75);
        // fisgada
        R.face(tl, z, K.fis, { eyes: "wide", mouth: "scream" });
        tl.set("#f02-glow", { opacity: 1 }, K.fis);
        tl.fromTo("#f02-glow", { scale: 0.6, svgOrigin: "722 700" }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.fis);
        R.pose(tl, z, K.fis + 0.1, 0.4, { hipF: 0, knF: 10, shF: -10, elF: -80, shB: 20, torso: 14 });
        R.shake(tl, "#f02z-root", K.fis, 0.5, 5);
        R.face(tl, z, K.fis + 0.8, { eyes: "pain", mouth: "frown" });
        // dias depois, no banco
        R.pop(tl, "#f02-days", K.dias - 0.1, 0.4);
        tl.to("#f02-glow", { opacity: 0, duration: 0.2 }, K.dias - 0.2);
        tl.set("#f02-bench", { opacity: 1 }, K.dias);
        tl.to("#f02-z-wrap", { x: -60, y: 20, duration: 0.01 }, K.dias);
        R.pose(tl, z, K.dias, 0.01, { hipB: -88, hipF: -92, knB: 88, knF: 92, torso: 0, shF: -40, elF: -40, shB: -20, elB: -40 });
        R.face(tl, z, K.dias, { eyes: "normal", mouth: "frown" });
        R.blinks(tl, z, K.dias, K.t0);
        tl.set("#f02-glow", { x: -40, y: -30, opacity: 1 }, K.vir);
        for (let i = 0; i < 5; i++) {
          tl.set(`#f02-ant${i}`, { opacity: 1 }, K.form + i * 0.12);
          tl.fromTo(`#f02-ant${i}`, { x: 650 + (i % 2) * 20, y: 640 + i * 10 }, { x: 700 + ((i + 1) % 2) * 14, y: 700 - i * 6, duration: 1.8, ease: "none" }, K.form + i * 0.12);
        }
        tl.to("#f02-ant0, #f02-ant1, #f02-ant2, #f02-ant3, #f02-ant4", { opacity: 0, duration: 0.2 }, K.esq);
        R.fadeOut(tl, "#f02-days", K.esq - 0.2);
        // a perna não fecha (vista de frente)
        R.pop(tl, "#f02-front", K.esq, 0.4);
        tl.to("#f02-legR", { rotation: -8, svgOrigin: "250 0", duration: 0.4, ease: "power2.out" }, K.fech - 0.4);
        tl.to("#f02-legR", { rotation: 4, svgOrigin: "250 0", duration: 0.3, ease: "back.out(3)" }, K.fech + 0.05);
        R.pop(tl, "#f02-x", K.fech + 0.3, 0.3);
        R.face(tl, z, K.fech, { eyes: "wide", mouth: "flat" });
        R.fadeOut(tl, "#f02-front", K.t0 - 0.6);
        // bolha: Turão entalado
        R.pop(tl, "#f02-bubble", K.t0 - 0.5, 0.45, 0.3);
        R.face(tl, "f02t", K.t0 - 0.5, { eyes: "pain" });
        R.nerveTo(tl, "f02t", K.t0, 0.25, K.sq);
        R.shake(tl, "#f02t-face", K.t0, K.t1 - K.t0, 5);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1400 520", duration: 0.3, ease: "back.in(2)" }, K.t1 + 0.15);
        tl.to("#f02-glow", { opacity: 0, duration: 0.3 }, K.t1 + 0.15);
        // lesão ou nervo?
        R.pop(tl, "#f02-c1", K.les - 0.1, 0.4);
        R.pop(tl, "#f02-c2", K.ner - 0.1, 0.4);
        R.face(tl, z, K.les, { eyes: "normal", mouth: "flat" });
        R.pose(tl, z, K.les, 0.4, { shF: -150, elF: -40 }, "back.out(2)");
        tl.to("#f02-c1", { opacity: 0.35, scale: 0.92, duration: 0.3 }, K.inv - 0.3);
        R.shake(tl, "#f02-c2", K.inv, 0.4, 5);
        R.face(tl, z, K.inv, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "ping", t: k.pel, vol: 0.45 },
        { name: "whoosh-short", t: k.chu - 0.15, vol: 0.5 },
        { name: "impact-bass-1", t: k.chu, vol: 0.35 },
        { name: "glitch-1", t: k.fis, vol: 0.35 },
        { name: "pop", t: k.dias - 0.1, vol: 0.4 },
        { name: "pop", t: k.esq, vol: 0.35 },
        { name: "error", t: k.fech + 0.3, vol: 0.3 },
        { name: "whoosh-short", t: k.t0 - 0.5, vol: 0.45 },
        { name: "pop", t: k.les - 0.1, vol: 0.4 },
        { name: "pop", t: k.ner - 0.1, vol: 0.4 },
      ],
    };
  },
};
