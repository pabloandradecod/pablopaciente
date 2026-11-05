// F2 — Gancho: Dona Cida não dorme de nenhum lado; de dia, escada; "Zé! Acorda!"; Dona Faixa espreme o Glutinho
export default {
  speakers: { cida: "f02c", glutinho: "f02g" },
  build(ctx) {
    const { C, human, glutinho, faixa, bursinha, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      cida: w(0, "Cida"), dorm: w(0, "dormindo"), deita: w(0, "Deita"), doi: w(0, "dói"), vira: w(0, "Vira"), cai: w(0, "cai"), doi2: w(0, "dói", 1),
      dia: w(0, "dia"), esc: w(0, "escada"), cad: w(0, "cadeira"), sac: w(0, "sacrifício"),
      c0: L1.start, c1: L1.end, g0: L2.start, g1: L2.end, p3: L3.start, burs: w(3, "bursite"), inv: w(3, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const zzz = (id, x, y) => `<g id="${id}" opacity="0">${[0, 1, 2].map((i) => `<text id="${id}-${i}" x="${x + i * 26}" y="${y - i * 30}" font-family="Montserrat" font-weight="900" font-size="${30 + i * 8}" fill="${C.ink}">z</text>`).join("")}</g>`;
    return {
      k,
      css: `
        #f02-name { left:120px; top:110px; padding:14px 28px; font-size:44px; }
        #f02-clock { left:1500px; top:120px; padding:12px 24px; font-size:56px; color:#fff; background:#2E3E66; border:7px solid ${C.ink}; border-radius:18px; }
        #f02-day { left:120px; top:110px; padding:14px 28px; font-size:44px; }
        #f02-q { left:0; right:0; top:90px; text-align:center; font-size:84px; }
        #f02-q span { color:${C.pain}; text-decoration: line-through; text-decoration-thickness: 8px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f02-night">
        <rect width="1920" height="880" fill="#2E3E66"/>
        <rect x="150" y="140" width="240" height="220" rx="14" fill="#1E2A4A" ${st}/><circle cx="300" cy="210" r="34" fill="#FFF3B8"/>
        ${[[600, 160], [760, 230], [1100, 140], [1300, 260], [1700, 330]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FFF3B8"/>`).join("")}
        <rect y="880" width="1920" height="200" fill="#3D4F7A"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        <!-- cama de casal -->
        <rect x="380" y="560" width="40" height="320" rx="10" fill="#8B5A2B" ${st}/>
        <rect x="420" y="640" width="900" height="80" rx="20" fill="#fff" ${st}/>
        <rect x="420" y="712" width="900" height="44" rx="12" fill="#8B5A2B" ${st}/>
        <rect x="440" y="560" width="150" height="70" rx="30" fill="#BFE6EE" ${st}/>
        <!-- Seu Zé dormindo atrás -->
        <rect x="1150" y="560" width="150" height="70" rx="30" fill="#BFE6EE" ${st}/>
        <g><circle cx="1230" cy="560" r="46" fill="${C.skinB}" ${st}/><path d="M1208 556 Q1218 562 1228 556 M1240 556 Q1250 562 1260 556" stroke="${C.ink}" stroke-width="4" fill="none"/><path d="M1210 578 Q1230 586 1250 578" stroke="#C9C9C9" stroke-width="10" stroke-linecap="round"/></g>
        ${zzz("f02-zzz", 1270, 500)}
      </g>
      <g id="f02-c-wrap"><g id="f02-c-flip"><g transform="translate(860,610) scale(1.1)">${human("f02c", "cida")}</g></g></g>
      <g id="f02-pain" opacity="0"><circle cx="860" cy="600" r="40" fill="${C.pain}" opacity="0.4"/><circle cx="860" cy="600" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <g id="f02-dayg" opacity="0">
        <rect width="1920" height="880" fill="${C.wall}"/>
        <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${900 + i * 120}" y="${800 - i * 80}" width="${1020 - i * 120}" height="80" fill="#C99A62" ${st}/>`).join("")}
        <!-- sofá com o Seu Zé cochilando -->
        <rect x="140" y="660" width="420" height="140" rx="30" fill="#4A90C2" ${st}/><rect x="140" y="600" width="420" height="90" rx="30" fill="#5FA3D3" ${st}/>
        <g><circle cx="230" cy="600" r="44" fill="${C.skinB}" ${st}/><path d="M210 598 Q218 604 228 598 M240 598 Q248 604 256 598" stroke="${C.ink}" stroke-width="4" fill="none"/></g>
        ${zzz("f02-zzz2", 280, 540)}
      </g>
      <g id="f02-c2-wrap" opacity="0"><g transform="translate(1080,720) scale(1.0)">${human("f02c2", "cida")}</g></g>
      <!-- bolha: Dona Faixa espreme o Glutinho contra o osso -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1440" cy="470" r="290"/></clipPath>
        <circle cx="1440" cy="470" r="302" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1140" y="170" width="600" height="600" fill="#FFE4DC"/>
          <path d="M1180 760 Q1200 640 1320 620 Q1440 600 1560 630 Q1680 650 1700 760 Z" fill="${C.bone}" ${st}/>
          <text x="1440" y="720" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="28" fill="${C.ink}">TROCÂNTER</text>
          <g id="f02-b-wrap"><g transform="translate(1600,632) scale(0.6)">${bursinha("f02b")}</g></g>
          <g id="f02-g-wrap"><g transform="translate(1420,640) scale(0.8)">${glutinho("f02g")}</g></g>
          <g id="f02-f-wrap"><g transform="translate(1280,640) scale(0.85)">${faixa("f02f")}</g></g>
        </g>
        <path d="M1180 640 L1050 720 L1220 700" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-name" class="abs card title" style="opacity:0">Dona Cida</div>
    <div id="f02-clock" class="abs title" style="opacity:0">3:00</div>
    <div id="f02-day" class="abs card title" style="opacity:0">DE DIA...</div>
    <div id="f02-q" class="abs title" style="opacity:0">Será que é <span>bursite</span>?</div>`,
      js: function (tl, K, R) {
        const c = "f02c";
        // deitada de lado (perfil), na cama
        R.setPose(tl, c, 0, { root: -90, hipF: -20, hipB: -10, knF: 30, knB: 20, shF: 20, elF: -60, shB: 10, elB: -40 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f02-name", K.cida - 0.1, 0.4);
        tl.set("#f02-zzz", { opacity: 1 }, 0.3);
        for (let i = 0; i < 3; i++) tl.fromTo(`#f02-zzz-${i}`, { opacity: 0, y: 10 }, { opacity: 1, y: -10, duration: 0.8, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.3 + i * 0.3);
        R.pop(tl, "#f02-clock", K.dorm, 0.4);
        R.face(tl, c, K.dorm, { eyes: "wide", mouth: "flat" });
        // deita de um lado: dói
        tl.set("#f02-pain", { opacity: 1 }, K.doi);
        tl.fromTo("#f02-pain", { scale: 0.6, svgOrigin: "860 600" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 3 }, K.doi);
        R.face(tl, c, K.doi, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f02c-root", K.doi, 0.4, 5);
        tl.to("#f02-pain", { opacity: 0, duration: 0.2 }, K.vira - 0.3);
        // vira pro outro lado: a perna de cima cai
        tl.to("#f02-c-flip", { scaleX: -1, svgOrigin: "860 610", duration: 0.35, ease: "power2.inOut" }, K.vira);
        R.face(tl, c, K.vira + 0.2, { eyes: "normal", mouth: "flat" });
        tl.set("#f02-pain", { opacity: 1 }, K.doi2);
        tl.fromTo("#f02-pain", { scale: 0.6, svgOrigin: "860 600" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 3 }, K.doi2);
        R.face(tl, c, K.doi2, { eyes: "pain", mouth: "scream" });
        R.shake(tl, "#f02c-root", K.doi2, 0.4, 5);
        // de dia: escada e cadeira
        tl.to("#f02-night, #f02-c-wrap, #f02-pain, #f02-name, #f02-clock", { opacity: 0, duration: 0.3 }, K.dia - 0.2);
        tl.to("#f02-dayg", { opacity: 1, duration: 0.3 }, K.dia - 0.2);
        tl.to("#f02-c2-wrap", { opacity: 1, duration: 0.3 }, K.dia - 0.2);
        R.pop(tl, "#f02-day", K.dia, 0.35);
        const c2 = "f02c2";
        R.setPose(tl, c2, 0, { shB: 40, elB: -70, shF: -30, elF: -40 });
        R.face(tl, c2, 0, { eyes: "pain", mouth: "frown" });
        tl.set("#f02-zzz2", { opacity: 1 }, K.dia);
        for (let i = 0; i < 3; i++) tl.fromTo(`#f02-zzz2-${i}`, { opacity: 0, y: 10 }, { opacity: 1, y: -10, duration: 0.8, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.dia + i * 0.3);
        // sobe degraus, com dor
        for (let i = 0; i < 2; i++) {
          const t = K.esc + i * 0.8;
          R.pose(tl, c2, t, 0.35, { hipF: -60, knF: 70 }, "power2.out");
          tl.to("#f02-c2-wrap", { x: (i + 1) * 120, y: -(i + 1) * 80, duration: 0.5, ease: "power2.inOut" }, t + 0.25);
          R.pose(tl, c2, t + 0.45, 0.3, { hipF: 0, knF: 0 });
        }
        R.shake(tl, "#f02c2-root", K.sac, 0.4, 4);
        // "Zé! Acorda!"
        R.face(tl, c2, K.c0 - 0.1, { eyes: "wide" });
        R.pose(tl, c2, K.c0, 0.3, { shF: -150, elF: -30 }, "back.out(2)");
        R.talk(tl, c2, K.c0, K.c1, "frown", "scream");
        R.fadeOut(tl, "#f02-day", K.c0);
        // bolha
        R.pop(tl, "#f02-bubble", K.g0 - 0.45, 0.45, 0.3);
        R.face(tl, "f02f", K.g0 - 0.45, { eyes: "normal", mouth: "grin" });
        R.face(tl, "f02b", K.g0 - 0.45, { eyes: "wide", mouth: "flat" });
        R.face(tl, "f02g", K.g0 - 0.45, { eyes: "pain" });
        R.setPose(tl, "f02f", 0, { armF: -60, armB: 40 });
        tl.fromTo("#f02-f-wrap", { rotation: 0 }, { rotation: 32, svgOrigin: "1280 640", duration: 0.4, ease: "power2.in" }, K.g0 - 0.2);
        tl.fromTo("#f02-g-wrap", { scaleY: 1 }, { scaleY: 0.78, svgOrigin: "1420 640", duration: 0.3, ease: "power2.in" }, K.g0);
        tl.fromTo("#f02-b-wrap", { scale: 1 }, { scale: 1.25, svgOrigin: "1600 632", duration: 0.4, ease: "back.out(3)" }, K.g0 + 0.1);
        R.shake(tl, "#f02g-body", K.g0 + 0.3, K.g1 - K.g0 - 0.3, 3);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1440 470", duration: 0.3, ease: "back.in(2)" }, K.g1 + 0.1);
        // será que é bursite?
        R.drop(tl, "#f02-q", K.burs - 0.4, 0.8, -300);
        R.face(tl, c2, K.inv, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.cida - 0.1, vol: 0.4 },
        { name: "pop", t: k.dorm, vol: 0.35 },
        { name: "glitch-1", t: k.doi, vol: 0.3 },
        { name: "whoosh-short", t: k.vira, vol: 0.4 },
        { name: "glitch-1", t: k.doi2, vol: 0.3 },
        { name: "whoosh", t: k.dia - 0.2, vol: 0.45 },
        { name: "pop", t: k.c0, vol: 0.35 },
        { name: "whoosh-short", t: k.g0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.g0, vol: 0.4 },
        { name: "impact-bass-1", t: k.burs - 0.1, vol: 0.35 },
      ],
    };
  },
};
