// F2 — Gancho: Seu Zé pinta o teto; dor do lado do ombro ao levantar o braço; à noite deitado em cima dói; carteira no bolso de trás; bolha com o Supra espremido
export default {
  speakers: { cida: "f02c", supra: "f02s" },
  build(ctx) {
    const { C, human, supra, acromio, bursinha, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      pint: w(0, "pintar"), tres: w(0, "Três"), lev: w(0, "levanta"), dor: w(0, "dor"), desce: w(0, "desce"), noite: w(0, "noite"),
      doi: w(0, "dói"), cart: w(0, "carteira"), bolso: w(0, "bolso"), des: w(0, "desafio"),
      c0: L1.start, c1: L1.end, s0: L2.start, s1: L2.end, p3: L3.start, romp: w(3, "rompeu"), inv: w(3, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f02-name { left:120px; top:250px; padding:14px 28px; font-size:44px; }
        #f02-days { left:1380px; top:250px; padding:14px 28px; font-size:52px; }
        #f02-ai { left:1180px; top:330px; font-size:90px; color:${C.pain}; }
        #f02-q { left:0; right:0; top:80px; text-align:center; font-size:78px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- sala -->
      <g id="f02-room">
        <rect width="1920" height="1080" fill="${C.wall}"/>
        <rect width="1920" height="200" fill="#D9D2C4"/>
        <rect id="f02-paint" width="0" height="200" fill="#8FD3C6"/>
        <line x1="0" y1="200" x2="1920" y2="200" stroke="${C.ink}" stroke-width="7"/>
        <rect x="1500" y="330" width="260" height="200" rx="10" fill="#BFE6EE" ${st}/>
        <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        <g transform="translate(1200,880)"><rect x="-40" y="-60" width="80" height="60" rx="8" fill="#7FB3D5" ${st}/><rect x="-46" y="-70" width="92" height="14" rx="6" fill="#5C8FB5" ${st}/></g>
        <path d="M100 880 L130 820 L250 820 L280 880" fill="#ddd" ${st}/>
      </g>
      <!-- noite -->
      <g id="f02-night" opacity="0">
        <rect width="1920" height="1080" fill="#2E3E66"/>
        <circle cx="1600" cy="200" r="70" fill="#FFF3B8" stroke="${C.ink}" stroke-width="6"/><circle cx="1630" cy="180" r="60" fill="#2E3E66"/>
        <rect x="420" y="640" width="1000" height="80" rx="20" fill="#fff" ${st}/><rect x="420" y="712" width="1000" height="44" rx="12" fill="#8B5A2B" ${st}/>
        <rect x="440" y="560" width="160" height="90" rx="34" fill="#BFE6EE" ${st}/>
        <g><circle cx="540" cy="570" r="50" fill="${C.skinB}" ${st}/><path d="M514 568 Q526 576 538 568" stroke="${C.ink}" stroke-width="4" fill="none"/><path d="M522 592 Q540 600 558 592" stroke="#C9C9C9" stroke-width="10" stroke-linecap="round"/></g>
        <path d="M580 600 Q1000 540 1420 620 L1420 660 L580 660 Z" fill="#7FB3D5" ${st}/>
        <g id="f02-npain"><circle cx="640" cy="610" r="40" fill="${C.pain}" opacity="0.4"/><circle cx="640" cy="610" r="17" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
        <text id="f02-zzz" x="620" y="460" font-family="Montserrat" font-weight="900" font-size="56" fill="#fff">z z z</text>
        <rect y="880" width="1920" height="200" fill="#3D4F7A"/>
      </g>
      <!-- Seu Zé -->
      <g id="f02-z-wrap"><g transform="translate(700,700) scale(1.2)">${human("f02z", "ze")}
        <g id="f02-roller" opacity="0"><rect x="-8" y="-420" width="12" height="150" rx="5" fill="#8B5A2B" stroke="${C.ink}" stroke-width="4"/><rect x="-60" y="-446" width="116" height="34" rx="14" fill="#8FD3C6" stroke="${C.ink}" stroke-width="5"/></g>
        <g id="f02-pain" opacity="0"><circle cx="24" cy="-128" r="28" fill="${C.pain}" opacity="0.4"/><circle cx="24" cy="-128" r="12" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        <path id="f02-streak" d="M30 -110 L34 -60" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" opacity="0"/>
        <rect id="f02-wallet" x="-64" y="-20" width="34" height="26" rx="4" fill="#6B3E1E" stroke="${C.ink}" stroke-width="4" opacity="0"/>
      </g></g>
      <!-- Dona Cida -->
      <g id="f02-c-wrap" opacity="0"><g transform="translate(250,650) scale(1.25)">${human("f02c", "cida")}</g></g>
      <!-- bolha: dentro do ombro -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1440" cy="500" r="300"/></clipPath>
        <circle cx="1440" cy="500" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1130" y="190" width="620" height="620" fill="#FFE4DC"/>
          <circle cx="1440" cy="900" r="230" fill="${C.bone}" ${st}/>
          <text x="1440" y="760" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">ÚMERO</text>
          <g transform="translate(1440,470) scale(0.95)">${acromio("f02a")}</g>
          <g transform="translate(1600,690) scale(0.42)">${bursinha("f02b")}</g>
          <g id="f02-s-wrap"><g transform="translate(1420,690) scale(0.72)">${supra("f02s")}</g></g>
        </g>
        <path d="M1170 690 L1050 790 L1220 740" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-name" class="abs card title" style="opacity:0">Missão: pintar o teto</div>
    <div id="f02-days" class="abs card title" style="opacity:0">Dia <span id="f02-dn">1</span> de 3</div>
    <div id="f02-ai" class="abs title" style="opacity:0">AI!</div>
    <div id="f02-q" class="abs title" style="opacity:0">Será que <span>rompeu</span> alguma coisa?</div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dor);
        R.pop(tl, "#f02-name", K.pint - 0.1, 0.4);
        // braço lá em cima com o rolo
        R.pose(tl, z, K.pint + 0.2, 0.4, { shF: -175, elF: 0, torso: -6, neck: -14 }, "back.out(1.4)");
        tl.to("#f02-roller", { opacity: 1, duration: 0.2 }, K.pint + 0.5);
        const p0 = K.pint + 0.6, p1 = K.lev - 0.3;
        const n = Math.max(3, Math.floor((p1 - p0) / 0.7));
        for (let i = 0; i < n; i++) tl.to("#f02-z-wrap", { x: i % 2 ? -60 : 160, duration: 0.65, ease: "sine.inOut" }, p0 + i * 0.7);
        tl.to("#f02-paint", { attr: { width: 1300 }, duration: p1 - p0, ease: "none" }, p0);
        R.fadeOut(tl, "#f02-name", K.tres - 0.3);
        R.pop(tl, "#f02-days", K.tres - 0.1, 0.4);
        tl.set("#f02-dn", { textContent: "2" }, K.tres + 0.7);
        tl.set("#f02-dn", { textContent: "3" }, K.tres + 1.4);
        R.face(tl, z, K.tres + 1.4, { eyes: "normal", mouth: "flat" });
        R.fadeOut(tl, "#f02-days", K.lev - 0.4);
        // levanta o braço: dor do lado do ombro, que desce
        tl.to("#f02-z-wrap", { x: 0, duration: 0.3 }, K.lev - 0.3);
        R.pose(tl, z, K.lev - 0.3, 0.3, { shF: 10, elF: -10, torso: 0, neck: 0 });
        tl.to("#f02-roller", { opacity: 0, duration: 0.2 }, K.lev - 0.3);
        R.pose(tl, z, K.lev + 0.1, 0.5, { shF: -100, elF: -5 }, "power2.out");
        tl.set("#f02-pain", { opacity: 1 }, K.dor);
        tl.fromTo("#f02-pain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 5 }, K.dor);
        R.face(tl, z, K.dor, { eyes: "pain", mouth: "frown" });
        R.pose(tl, z, K.dor + 0.3, 0.3, { shF: 10, elF: -10 });
        tl.fromTo("#f02-streak", { opacity: 0, attr: { d: "M30 -110 L30 -110" } }, { opacity: 0.85, attr: { d: "M30 -110 L34 -60" }, duration: 0.5, ease: "power2.out" }, K.desce);
        // noite
        tl.to("#f02-room, #f02-z-wrap", { opacity: 0, duration: 0.3 }, K.noite - 0.25);
        tl.to("#f02-night", { opacity: 1, duration: 0.3 }, K.noite - 0.25);
        R.fadeIn(tl, "#f02-zzz", K.noite);
        tl.fromTo("#f02-npain", { opacity: 0 }, { opacity: 1, duration: 0.1 }, K.doi);
        tl.fromTo("#f02-npain circle", { scale: 0.6, svgOrigin: "640 610" }, { scale: 1.3, svgOrigin: "640 610", duration: 0.25, yoyo: true, repeat: 3 }, K.doi);
        tl.to("#f02-zzz", { opacity: 0, y: -40, duration: 0.3 }, K.doi);
        // carteira no bolso de trás
        tl.to("#f02-night", { opacity: 0, duration: 0.3 }, K.cart - 0.4);
        tl.to("#f02-room, #f02-z-wrap", { opacity: 1, duration: 0.3 }, K.cart - 0.4);
        tl.set("#f02-pain, #f02-streak", { opacity: 0 }, K.cart - 0.4);
        R.face(tl, z, K.cart - 0.4, { eyes: "normal", mouth: "flat" });
        tl.set("#f02-wallet", { opacity: 1 }, K.cart - 0.4);
        R.pose(tl, z, K.cart, 0.5, { shF: 50, elF: -90, torso: 6 }, "power2.inOut");
        tl.set("#f02-pain", { opacity: 1 }, K.bolso + 0.2);
        R.face(tl, z, K.bolso + 0.2, { eyes: "pain", mouth: "scream" });
        R.pop(tl, "#f02-ai", K.bolso + 0.2, 0.3);
        R.shake(tl, "#f02z-root", K.bolso + 0.25, 0.4, 4);
        R.fadeOut(tl, "#f02-ai", K.c0 - 0.3);
        // Dona Cida
        R.pose(tl, z, K.des, 0.4, { shF: 10, elF: -10, torso: 0 });
        R.face(tl, z, K.des, { eyes: "normal", mouth: "frown" });
        R.setPose(tl, "f02c", 0, { shF: -40, elF: -100, shB: 30, elB: -100 });
        R.face(tl, "f02c", 0, { eyes: "normal", mouth: "flat" });
        tl.set("#f02-c-wrap", { opacity: 1 }, K.c0 - 0.5);
        tl.fromTo("#f02-c-wrap", { x: -500 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.c0 - 0.5);
        R.pose(tl, "f02c", K.c0, 0.3, { shF: -110, elF: -10 }, "back.out(2)");
        // bolha: Supra espremido
        R.pop(tl, "#f02-bubble", K.s0 - 0.45, 0.45, 0.3);
        tl.set("#f02s-sweat", { opacity: 1 }, K.s0 - 0.45);
        R.face(tl, "f02a", K.s0 - 0.45, { eyes: "normal", mouth: "frown" });
        R.face(tl, "f02b", K.s0 - 0.45, { eyes: "pain", mouth: "frown" });
        tl.fromTo("#f02-s-wrap", { scaleY: 1 }, { scaleY: 0.82, svgOrigin: "1420 690", duration: 0.3, ease: "power3.in" }, K.s0 - 0.2);
        R.setPose(tl, "f02s", 0, { armF: -30, armB: 30 });
        R.pose(tl, "f02s", K.s0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1440 500", duration: 0.3, ease: "back.in(2)" }, K.s1 + 0.1);
        // rompeu?
        R.drop(tl, "#f02-q", K.romp - 0.5, 0.8, -300);
        R.face(tl, z, K.romp, { eyes: "wide", mouth: "flat" });
        R.face(tl, "f02c", K.romp, { eyes: "wide", mouth: "flat" });
        tl.to("#f02-pain", { opacity: 0, duration: 0.3 }, K.inv);
        R.face(tl, z, K.inv, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.pint - 0.1, vol: 0.4 },
        { name: "pop", t: k.tres - 0.1, vol: 0.35 },
        { name: "glitch-1", t: k.dor, vol: 0.3 },
        { name: "whoosh", t: k.noite - 0.25, vol: 0.4 },
        { name: "glitch-2", t: k.doi, vol: 0.25 },
        { name: "whoosh-short", t: k.cart - 0.4, vol: 0.35 },
        { name: "impact-bass-1", t: k.bolso + 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.c0 - 0.5, vol: 0.4 },
        { name: "whoosh-short", t: k.s0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.romp - 0.1, vol: 0.35 },
      ],
    };
  },
};
