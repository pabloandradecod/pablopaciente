// F2 — Gancho: Dona Cida corredora, dor na lateral do joelho no km 3; Seu Zé de bicicleta; Dona Faixa aperta a Gordurinha
export default {
  speakers: { gordurinha: "f02g", faixa: "f02f" },
  build(ctx) {
    const { C, human, faixa, gordurinha, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3], L4 = lines[4];
    const k = {
      lembra: w(0, "Lembra"), insc: w(0, "inscreveu"), trein: w(0, "treinos"), terc: w(0, "terceiro"), dor: w(0, "dor"), pior: w(0, "piorando"), parar: w(0, "parar"), lad: w(0, "ladeira"),
      z0: L1.start, z1: L1.end, g0: L2.start, g1: L2.end, f0: L3.start, f1: L3.end, p4: L4.start, estr: w(4, "estragando"), inv: w(4, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const tree = (x) => `<g transform="translate(${x},0)"><rect x="-14" y="640" width="28" height="120" fill="#8B5A2B" ${st}/><circle cx="0" cy="610" r="70" fill="#5DB560" ${st}/></g>`;
    return {
      k,
      css: `
        #f02-poster { left:1240px; top:120px; width:520px; padding:22px; text-align:center; transform: rotate(3deg); }
        #f02-poster .a { font-size:30px; color:${C.pain}; } #f02-poster .b { font-size:96px; line-height:1; } #f02-poster .c { font-size:30px; }
        #f02-lad { left:1260px; top:150px; padding:16px 26px; font-size:44px; }
        #f02-q { left:0; right:0; top:90px; text-align:center; font-size:80px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.sky}"/>
      <circle cx="260" cy="170" r="60" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
      <g id="f02-scroll">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tree(200 + i * 520)).join("")}
        ${[1, 2, 3].map((n, i) => `<g id="f02-km${n}" transform="translate(${1500 + i * 1560},0)"><rect x="-6" y="560" width="12" height="200" fill="${C.ink}"/><rect x="-70" y="500" width="140" height="80" rx="12" fill="#fff" ${st}/><text x="0" y="556" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="44" fill="${n === 3 ? C.pain : C.ink}">${n} km</text></g>`).join("")}
      </g>
      <rect y="760" width="1920" height="320" fill="#9AA3A8"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <g id="f02-dash">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${i * 340}" y="900" width="170" height="14" fill="#fff"/>`).join("")}</g>
      <!-- Seu Zé de bicicleta -->
      <g id="f02-bike" opacity="0"><g transform="translate(-60,0)">
        <circle cx="300" cy="830" r="62" fill="none" ${st}/><circle cx="520" cy="830" r="62" fill="none" ${st}/>
        <path d="M300 830 L380 730 L500 730 L520 830 M380 730 L420 830 L500 730 M380 730 L370 700 M500 730 L510 690 L540 690" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <g transform="translate(400,700) scale(1.0)">${human("f02z", "ze")}</g>
      </g></g>
      <g id="f02-c-wrap"><g transform="translate(980,600) scale(1.3)">${human("f02c", "cida")}</g></g>
      
      <g id="f02-pain" opacity="0"><circle cx="1004" cy="720" r="40" fill="${C.pain}" opacity="0.4"/><circle cx="1004" cy="720" r="17" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- bolha: lateral do joelho -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1450" cy="480" r="300"/></clipPath>
        <circle cx="1450" cy="480" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1140" y="170" width="620" height="620" fill="#FFE4DC"/>
          <path d="M1180 800 L1180 600 Q1300 520 1450 560 Q1600 520 1720 600 L1720 800 Z" fill="${C.bone}" ${st}/>
          <text x="1450" y="740" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">CALOMBO DO FÊMUR</text>
          <g id="f02-g-wrap"><g transform="translate(1450,560) scale(0.85)">${gordurinha("f02g")}</g></g>
          <g id="f02-f-wrap"><g transform="translate(1230,480)"><g transform="rotate(90) scale(0.8)">${faixa("f02f")}</g></g></g>
        </g>
        <path d="M1180 680 L1060 780 L1230 730" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-poster" class="abs card" style="opacity:0"><div class="a label">INSCRIÇÃO CONFIRMADA</div><div class="b title">10 KM</div><div class="c label">Dona Cida · nº 247</div></div>
    <div id="f02-lad" class="abs card title" style="opacity:0">E a ladeira de casa...</div>
    <div id="f02-q" class="abs title" style="opacity:0">O joelho tá <span>estragando</span>?</div>`,
      js: function (tl, K, R) {
        const c = "f02c";
        R.setPose(tl, c, 0, { shF: -20, elF: -70, shB: 20, elB: -70 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f02-poster", K.insc - 0.1, 0.45);
        R.fadeOut(tl, "#f02-poster", K.trein - 0.3);
        // corrida: cenário rolando e passadas
        const t0 = K.trein - 0.3, t1 = K.parar;
        tl.to("#f02-scroll", { x: -3500, duration: t1 - t0, ease: "none" }, t0);
        tl.to("#f02-dash", { x: -2400, duration: t1 - t0, ease: "none" }, t0);
        const n = Math.floor((t1 - t0) / 0.36);
        for (let i = 0; i < n; i++) {
          const a = i % 2;
          R.pose(tl, c, t0 + i * 0.36, 0.34, { hipF: a ? 30 : -45, knF: a ? 70 : 20, hipB: a ? -45 : 30, knB: a ? 20 : 70, shF: a ? -50 : 30, shB: a ? 30 : -50, elF: -80, elB: -80, torso: 8 }, "sine.inOut");
        }
        R.blinks(tl, c, t0, K.terc, "happy");
        // km 3: dor
        R.face(tl, c, K.terc, { eyes: "normal", mouth: "flat" });
        tl.set("#f02-pain", { opacity: 1 }, K.dor);
        tl.fromTo("#f02-pain", { scale: 0.6, svgOrigin: "1004 720" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 7 }, K.dor);
        R.face(tl, c, K.dor, { eyes: "pain", mouth: "frown" });
        R.face(tl, c, K.pior, { eyes: "pain", mouth: "scream" });
        // para, perna esticada
        R.pose(tl, c, K.parar, 0.4, { hipF: -10, knF: 0, hipB: 15, knB: 10, shF: 10, elF: -40, shB: 40, elB: -60, torso: 14 });
        R.shake(tl, "#f02c-root", K.parar, 0.4, 4);
        R.pop(tl, "#f02-lad", K.lad - 0.1, 0.4);
        R.fadeOut(tl, "#f02-lad", K.z0 - 0.3);
        // Seu Zé de bicicleta
        R.setPose(tl, "f02z", 0, { hipF: -60, knF: 80, hipB: -60, knB: 80, shF: -60, elF: -30, shB: -60, elB: -30, torso: 14 });
        R.face(tl, "f02z", 0, { eyes: "wide", mouth: "flat" });
        tl.set("#f02-bike", { opacity: 1 }, K.z0 - 0.8);
        tl.fromTo("#f02-bike", { x: -600 }, { x: 0, duration: 0.7, ease: "power2.out" }, K.z0 - 0.8);
        R.talk(tl, "f02z", K.z0, K.z1, "frown", "open");
        R.pose(tl, "f02z", K.z0, 0.25, { shF: -150, elF: -20 }, "back.out(2)");
        // bolha: Faixa aperta Gordurinha
        R.pop(tl, "#f02-bubble", K.g0 - 0.45, 0.45, 0.3);
        R.face(tl, "f02g", K.g0 - 0.45, { eyes: "pain" });
        R.face(tl, "f02f", K.g0 - 0.45, { eyes: "normal", mouth: "grin" });
        tl.fromTo("#f02-f-wrap", { y: -60 }, { y: 0, duration: 0.3, ease: "power3.in" }, K.g0 - 0.25);
        tl.fromTo("#f02-g-wrap", { scaleY: 1 }, { scaleY: 0.75, svgOrigin: "1450 560", duration: 0.25, ease: "power3.in" }, K.g0 - 0.1);
        tl.fromTo("#f02g-nerves", { opacity: 1 }, { opacity: 0.3, duration: 0.1, yoyo: true, repeat: 9 }, K.g0);
        R.face(tl, "f02f", K.f0, { eyes: "happy" });
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1450 480", duration: 0.3, ease: "back.in(2)" }, K.f1 + 0.1);
        // estragando?
        R.drop(tl, "#f02-q", K.estr - 0.5, 0.8, -300);
        R.face(tl, c, K.estr, { eyes: "wide", mouth: "flat" });
        R.face(tl, c, K.inv, { eyes: "normal", mouth: "smile" });
        tl.to("#f02-pain", { opacity: 0, duration: 0.3 }, K.inv);
      },
      sfx: [
        { name: "pop", t: k.insc - 0.1, vol: 0.4 },
        { name: "whoosh", t: k.trein - 0.3, vol: 0.35 },
        { name: "glitch-1", t: k.dor, vol: 0.3 },
        { name: "pop", t: k.lad - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.z0 - 0.8, vol: 0.4 },
        { name: "whoosh-short", t: k.g0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.g0 - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.estr - 0.1, vol: 0.35 },
      ],
    };
  },
};
