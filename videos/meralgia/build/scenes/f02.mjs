// F2 — Gancho: churrasco, cinto no último furo, segunda-feira a coxa formiga; Cintão aperta o Nervinho
export default {
  speakers: { cintao: "f02c", nervinho: "f02v" },
  build(ctx) {
    const { C, human, nervinho, cintao, smooth, w, lines, LILAC } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const vPts = [[1330, 650], [1395, 600], [1460, 555], [1530, 520], [1615, 485], [1720, 450]];
    const vSq = [[1330, 650], [1395, 602], [1460, 565], [1530, 530], [1615, 487], [1720, 450]];
    const k = {
      chur: w(0, "churrasco"), calca: w(0, "calça"), apert: w(0, "apertadinha"), sol: w(0, "Solução"), ult: w(0, "último"),
      seg: w(0, "segunda"), lat: w(0, "lateral"), queim: w(0, "queimando"), form: w(0, "formigando"), dorm: w(0, "dormente"), formiga: w(0, "formiga", 1),
      c0: L1.start, c1: L1.end, v0: L2.start, v1: L2.end, p3: L3.start, forca: w(3, "força"), inv: w(3, "investigar"),
      sq: smooth(vSq),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const ants = Array.from({ length: 6 }, (_, i) => `<g id="f02-ant${i}"><ellipse cx="0" cy="0" rx="7" ry="5" fill="${C.ink}"/><circle cx="8" cy="0" r="4" fill="${C.ink}"/></g>`).join("");
    return {
      k,
      css: `
        #f02-belt { left:1120px; top:170px; width:640px; padding:24px 28px; }
        #f02-belt .t { font-size:40px; text-align:center; margin-top:10px; color:${C.pain}; }
        #f02-seg { left:1250px; top:170px; padding:18px 34px; font-size:56px; transform: rotate(3deg); }
        #f02-q { left:0; right:0; top:70px; text-align:center; font-size:84px; }
        #f02-q span { color:#8E6CD8; }
        #f02-ok { left:1080px; top:420px; padding:14px 26px; font-size:42px; color:${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="#CDEBD9"/>
      <g id="f02-yard">
        <rect width="1920" height="880" fill="#CDEBD9"/>
        <path d="M0 140 Q480 220 960 140 Q1440 60 1920 140" fill="none" stroke="${C.ink}" stroke-width="4"/>
        ${Array.from({ length: 12 }, (_, i) => { const x = 80 + i * 160; const y = 140 + Math.sin(i * 1.3) * 30 + 20; return `<circle cx="${x}" cy="${y}" r="14" fill="${["#FFC94A", "#FF5A4E", "#3DD9A4"][i % 3]}" stroke="${C.ink}" stroke-width="4"/>`; }).join("")}
        <g id="f02-grill">
          <rect x="230" y="560" width="300" height="70" rx="14" fill="#444" ${st}/>
          <path d="M250 560 L510 560" stroke="#999" stroke-width="8"/>
          <rect x="270" y="530" width="80" height="34" rx="12" fill="#9B3B2A" ${st}/><rect x="380" y="532" width="90" height="30" rx="12" fill="#B4472F" ${st}/>
          <line x1="270" y1="630" x2="250" y2="870" ${st}/><line x1="490" y1="630" x2="510" y2="870" ${st}/>
          <g id="f02-smoke" fill="#fff" opacity="0.8"><circle cx="330" cy="480" r="26"/><circle cx="370" cy="430" r="32"/><circle cx="330" cy="370" r="24"/></g>
        </g>
      </g>
      <g id="f02-office" opacity="0">
        <rect width="1920" height="880" fill="${C.wall}"/>
        <rect x="160" y="160" width="320" height="200" rx="12" fill="#fff" ${st}/><path d="M190 320 L260 250 L320 290 L400 210 L450 240" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="1650" cy="230" r="70" fill="#fff" ${st}/><line x1="1650" y1="230" x2="1650" y2="180" ${st}/><line x1="1650" y1="230" x2="1690" y2="230" ${st}/>
        <rect x="200" y="620" width="380" height="40" rx="10" fill="#B07A4A" ${st}/><line x1="230" y1="660" x2="230" y2="870" ${st}/><line x1="550" y1="660" x2="550" y2="870" ${st}/>
      </g>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(760,640) scale(1.3)">${human("f02z", "ze")}</g>
      <g id="f02-belly" opacity="0"><ellipse cx="826" cy="566" rx="38" ry="60" fill="${C.blue}" ${st}/><path d="M800 566 L852 566" stroke="#fff" stroke-width="4" opacity="0.35"/></g>
      <g id="f02-skewer"><g transform="translate(880,520)"><line x1="0" y1="0" x2="110" y2="-60" stroke="#8B5A2B" stroke-width="8" stroke-linecap="round"/><rect x="40" y="-48" width="40" height="30" rx="8" fill="#B4472F" ${st} transform="rotate(-28 60 -33)"/></g></g>
      <!-- coxa lilás -->
      <g id="f02-patch" opacity="0">
        <ellipse cx="772" cy="705" rx="34" ry="60" fill="${LILAC}" opacity="0.85" stroke="#fff" stroke-width="5"/>
        <g id="f02-fire" opacity="0"><path d="M712 640 Q700 610 716 590 Q722 612 734 604 Q736 630 712 640Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>
        <g id="f02-ice" opacity="0"><rect x="816" y="700" width="34" height="34" rx="6" fill="#CFEFF7" stroke="${C.ink}" stroke-width="4" transform="rotate(12 833 717)"/></g>
        ${ants}
      </g>
      <!-- bolha -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1470" cy="520" r="290"/></clipPath>
        <circle cx="1470" cy="520" r="302" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1160" y="220" width="620" height="620" fill="#F1EAFF"/>
          <text x="1470" y="300" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}" opacity="0.6">VIRILHA</text>
          <g>${nervinho("f02v", vPts)}</g>
          <g id="f02-c-wrap"><g transform="translate(1480,520) scale(0.85)">${cintao("f02c", 240)}</g></g>
        </g>
        <path d="M1220 690 L1100 800 L1270 740" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-belt" class="abs card" style="opacity:0">
      <svg width="584" height="110" viewBox="0 0 584 110">
        <rect x="0" y="30" width="584" height="54" rx="16" fill="#6B3E1F" stroke="${C.ink}" stroke-width="6"/>
        ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${300 + i * 56}" cy="57" rx="9" ry="12" fill="#2A160A"/><text x="${300 + i * 56}" y="22" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">${i + 1}</text>`).join("")}
        <g id="f02-buckle"><rect x="150" y="14" width="110" height="86" rx="16" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/><line x1="205" y1="57" x2="290" y2="57" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/></g>
      </svg>
      <div class="t title">ÚLTIMO FURO!</div>
    </div>
    <div id="f02-seg" class="abs card title" style="opacity:0">SEGUNDA-FEIRA</div>
    <div id="f02-ok" class="abs card label" style="opacity:0">FORÇA: <span style="color:${C.good}">NORMAL</span></div>
    <div id="f02-q" class="abs title" style="opacity:0">Por que a <span>COXA</span> formiga?</div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        R.setPose(tl, z, 0, { shF: -70, elF: -80, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        R.blinks(tl, z, 0.5, K.seg, "happy");
        tl.fromTo("#f02-smoke circle", { y: 0, opacity: 0.8 }, { y: -60, opacity: 0, duration: 1.6, stagger: 0.3, repeat: 3, ease: "none" }, 0);
        R.talk(tl, z, 0.6, K.calca - 0.3, "grin", "open");
        // barriga cresce
        tl.set("#f02-belly", { opacity: 1 }, K.calca);
        tl.fromTo("#f02-belly", { scaleX: 0.5, transformOrigin: "0% 50%" }, { scaleX: 1.15, duration: 0.6, ease: "back.out(3)" }, K.calca);
        R.face(tl, z, K.apert, { eyes: "wide", mouth: "flat" });
        // cinto no último furo
        R.pop(tl, "#f02-belt", K.sol - 0.2, 0.4);
        [0, 1, 2].forEach((i) => tl.to("#f02-buckle", { x: 112 + i * 56, duration: 0.2, ease: "back.out(3)" }, K.ult - 0.6 + i * 0.35));
        R.face(tl, z, K.ult + 0.3, { eyes: "happy", mouth: "grin" });
        // segunda-feira: troca de cenário
        R.fadeOut(tl, "#f02-belt", K.seg - 0.4);
        tl.to("#f02-yard", { opacity: 0, duration: 0.35 }, K.seg - 0.2);
        tl.to("#f02-office", { opacity: 1, duration: 0.35 }, K.seg - 0.2);
        tl.set("#f02-skewer", { opacity: 0 }, K.seg - 0.2);
        R.pose(tl, z, K.seg - 0.2, 0.4, { shF: -10, elF: -20 });
        R.face(tl, z, K.seg, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f02-seg", K.seg, 0.4);
        R.fadeOut(tl, "#f02-seg", K.lat - 0.2);
        // coxa lilás: queimando, formigando, dormente
        R.fadeIn(tl, "#f02-patch", K.lat, 0.3);
        R.face(tl, z, K.queim, { eyes: "wide", mouth: "scream" });
        R.pop(tl, "#f02-fire", K.queim, 0.3);
        R.shake(tl, "#f02z-root", K.queim, 0.4, 4);
        R.face(tl, z, K.form + 0.2, { eyes: "pain", mouth: "frown" });
        // formigas andando
        for (let i = 0; i < 6; i++) {
          tl.fromTo(`#f02-ant${i}`, { x: 752 + (i % 2) * 22, y: 650 + i * 8, opacity: 0 }, { x: 760 + ((i + 1) % 2) * 16, y: 760 - i * 6, opacity: 1, duration: 1.6, ease: "none" }, K.form + i * 0.15);
          tl.to(`#f02-ant${i}`, { y: "-=70", duration: 1.6, ease: "none" }, K.form + 1.6 + i * 0.15);
        }
        R.pop(tl, "#f02-ice", K.dorm, 0.3);
        // tapa na coxa
        R.pose(tl, z, K.dorm + 0.1, 0.2, { shF: -20, elF: -40 }, "power3.out");
        R.pose(tl, z, K.dorm + 0.4, 0.15, { shF: -5, elF: -5 }, "power4.in");
        R.shake(tl, "#f02-patch", K.dorm + 0.55, 0.25, 4);
        // bolha: Cintão aperta o Nervinho
        R.pop(tl, "#f02-bubble", K.c0 - 0.5, 0.45, 0.3);
        R.face(tl, "f02c", K.c0 - 0.5, { eyes: "normal", mouth: "grin" });
        R.face(tl, "f02v", K.c0 - 0.5, { eyes: "wide", mouth: "flat" });
        tl.fromTo("#f02-c-wrap", { y: -60 }, { y: 0, duration: 0.25, ease: "power3.in" }, K.c0 - 0.2);
        R.nerveTo(tl, "f02v", K.c0, 0.2, K.sq);
        R.setPose(tl, "f02c", 0, { armF: -30, armB: 30 });
        R.pose(tl, "f02c", K.c0, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        tl.fromTo("#f02c-band", { scaleX: 1 }, { scaleX: 0.86, svgOrigin: "0 0", duration: 0.25, ease: "power2.in" }, K.c0 + 0.3);
        R.face(tl, "f02v", K.v0 - 0.1, { eyes: "pain" });
        R.shake(tl, "#f02v-face", K.v0, K.v1 - K.v0, 4);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1470 520", duration: 0.3, ease: "back.in(2)" }, K.v1 + 0.15);
        // força normal + pergunta
        R.face(tl, z, K.p3, { eyes: "normal", mouth: "flat" });
        R.pose(tl, z, K.forca - 0.3, 0.3, { hipF: -70, knF: 10 }, "back.out(2)");
        R.pop(tl, "#f02-ok", K.forca, 0.4);
        R.pose(tl, z, K.forca + 0.8, 0.3, { hipF: 0, knF: 0 });
        R.face(tl, z, K.forca + 0.4, { eyes: "happy", mouth: "smile" });
        R.drop(tl, "#f02-q", K.inv - 0.5, 0.8, -300);
        R.fadeOut(tl, "#f02-ok", K.inv - 0.5);
      },
      sfx: [
        { name: "sparkle", t: k.chur, vol: 0.35 },
        { name: "pop", t: k.calca + 0.1, vol: 0.45 },
        { name: "pop", t: k.ult - 0.6, vol: 0.35 }, { name: "pop", t: k.ult - 0.25, vol: 0.35 }, { name: "pop", t: k.ult + 0.1, vol: 0.45 },
        { name: "whoosh", t: k.seg - 0.2, vol: 0.45 },
        { name: "glitch-1", t: k.queim, vol: 0.35 },
        { name: "click", t: k.dorm + 0.55, vol: 0.5 },
        { name: "whoosh-short", t: k.c0 - 0.5, vol: 0.45 },
        { name: "impact-bass-1", t: k.c0 + 0.3, vol: 0.4 },
        { name: "pop", t: k.forca, vol: 0.4 },
        { name: "impact-bass-1", t: k.inv - 0.1, vol: 0.35 },
      ],
    };
  },
};
