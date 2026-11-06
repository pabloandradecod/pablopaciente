// F2 — Gancho: Seu Zé sobe a escada com as sacolas; dor por dentro do joelho; à noite os joelhos encostam; a Dona Gansa com o pé dolorido
export default {
  speakers: { gansa: "f02g" },
  build(ctx) {
    const { C, human, gansa, bursinha, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      cida: w(0, "Cida"), merc: w(0, "mercado"), sac: w(0, "sacolas"), deg: w(0, "Degrau"), dor: w(0, "dor"), dentro: w(0, "dentro"), noite: w(0, "noite"), enc: w(0, "encosta"), doi: w(0, "dói"),
      c0: L1.start, c1: L1.end, g0: L2.start, g1: L2.end, p3: L3.start, art: w(3, "artrose"), inv: w(3, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const bag = (x, y, c) => `<g transform="translate(${x},${y})"><path d="M-34 0 L34 0 L28 70 L-28 70 Z" fill="${c}" ${st}/><path d="M-16 0 Q-16 -24 0 -24 Q16 -24 16 0" fill="none" stroke="${C.ink}" stroke-width="6"/></g>`;
    const leg = (x, id) => `<g id="${id}"><rect x="${x - 26}" y="0" width="52" height="210" rx="24" fill="${C.brown}" ${st}/></g>`;
    return {
      k,
      css: `
        #f02-name { left:120px; top:110px; padding:14px 28px; font-size:44px; }
        #f02-front { left:1240px; top:200px; width:420px; padding:18px; text-align:center; }
        #f02-front .t { font-size:30px; margin-top:6px; }
        #f02-q { left:0; right:0; top:90px; text-align:center; font-size:82px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f02-house">
        <rect width="1920" height="880" fill="${C.wall}"/>
        <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${760 + i * 140}" y="${800 - i * 80}" width="${1160 - i * 140}" height="80" fill="#C99A62" ${st}/>`).join("")}
        <rect x="120" y="440" width="220" height="440" rx="10" fill="#B07A4A" ${st}/><circle cx="310" cy="660" r="10" fill="${C.sun}"/>
      </g>
      <g id="f02-night" opacity="0">
        <rect width="1920" height="1080" fill="#2E3E66"/>
        <rect x="380" y="640" width="900" height="80" rx="20" fill="#fff" ${st}/><rect x="380" y="712" width="900" height="44" rx="12" fill="#8B5A2B" ${st}/>
        <rect x="400" y="580" width="150" height="70" rx="30" fill="#BFE6EE" ${st}/>
        <path d="M520 610 Q900 560 1280 620 L1280 660 L520 660 Z" fill="#7FB3D5" ${st}/>
        <g><circle cx="480" cy="590" r="46" fill="${C.skinB}" ${st}/><path d="M458 588 Q468 594 478 588" stroke="${C.ink}" stroke-width="4" fill="none"/><path d="M462 608 Q480 616 498 608" stroke="#C9C9C9" stroke-width="10" stroke-linecap="round"/></g>
        <rect y="880" width="1920" height="200" fill="#3D4F7A"/>
      </g>
      <g id="f02-z-wrap"><g transform="translate(560,680) scale(1.1)">${human("f02z", "ze")}</g></g>
      <g id="f02-bags">${bag(630, 690, "#3DD9A4")}${bag(510, 700, "#FFC94A")}</g>
      <g id="f02-pain" opacity="0"><circle cx="0" cy="0" r="36" fill="${C.pain}" opacity="0.4"/><circle cx="0" cy="0" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <g id="f02-c-wrap" opacity="0"><g transform="translate(300,640) scale(1.3)">${human("f02c", "cida")}</g>${bag(390, 660, "#FF8A3D")}${bag(250, 660, "#B07ED8")}${bag(450, 600, "#3DD9A4")}</g>
      <!-- bolha: Dona Gansa -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1440" cy="490" r="300"/></clipPath>
        <circle cx="1440" cy="490" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1130" y="180" width="620" height="620" fill="#FFE4DC"/>
          <path d="M1150 800 L1150 700 Q1440 650 1730 700 L1730 800 Z" fill="${C.bone}" ${st}/>
          <text x="1440" y="770" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">TÍBIA (por dentro)</text>
          <g transform="translate(1600,690) scale(0.5)">${bursinha("f02b")}</g>
          <g id="f02-g-wrap"><g transform="translate(1400,690) scale(1.0)">${gansa("f02g")}</g></g>
        </g>
        <path d="M1180 690 L1060 790 L1230 740" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-name" class="abs card title" style="opacity:0">Missão: subir as sacolas</div>
    <div id="f02-front" class="abs card" style="opacity:0">
      <svg width="380" height="250" viewBox="0 0 380 250">${leg(150, "f02-legL")}${leg(232, "f02-legR")}<circle id="f02-kdot" cx="191" cy="110" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5" opacity="0"/></svg>
      <div class="t label">visto de frente: joelho <b style="color:${C.pain}">encosta</b> no joelho</div>
    </div>
    <div id="f02-q" class="abs title" style="opacity:0">Será a <span>artrose</span> piorando?</div>`,
      js: function (tl, K, R) {
        const z = "f02z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dor);
        R.pop(tl, "#f02-name", K.sac - 0.1, 0.4);
        // sobe degrau por degrau carregando
        for (let i = 0; i < 3; i++) {
          const t = K.deg + i * 0.75;
          R.pose(tl, z, t, 0.3, { hipF: -60, knF: 70 }, "power2.out");
          tl.to("#f02-z-wrap, #f02-bags", { x: 140 * (i + 1) + 160, y: -80 * (i + 1), duration: 0.45, ease: "power2.inOut" }, t + 0.2);
          R.pose(tl, z, t + 0.45, 0.3, { hipF: 0, knF: 0 });
        }
        R.fadeOut(tl, "#f02-name", K.deg + 0.5);
        tl.set("#f02-pain", { opacity: 1 }, K.dor);
        tl.to("#f02-pain", { x: 0, y: 0, duration: 0 }, 0);
        R.face(tl, z, K.dor, { eyes: "pain", mouth: "frown" });
        // o ponto de dor acompanha o joelho (abaixo da dobra)
        for (let i = 0; i < 3; i++) tl.set("#f02-pain", { x: 576 + 140 * (i + 1) + 160, y: 802 - 80 * (i + 1) }, K.deg + i * 0.75 + 0.65);
        tl.set("#f02-pain", { x: 576 + 420 + 160, y: 802 - 240 }, K.dor);
        tl.fromTo("#f02-pain circle", { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 7 }, K.dor);
        R.shake(tl, "#f02z-root", K.dentro, 0.4, 4);
        // à noite
        tl.to("#f02-house, #f02-z-wrap, #f02-bags, #f02-pain", { opacity: 0, duration: 0.3 }, K.noite - 0.2);
        tl.to("#f02-night", { opacity: 1, duration: 0.3 }, K.noite - 0.2);
        R.pop(tl, "#f02-front", K.noite + 0.2, 0.4);
        tl.to("#f02-legR", { x: -20, duration: 0.4, ease: "power2.in" }, K.enc - 0.2);
        tl.set("#f02-kdot", { opacity: 1 }, K.doi);
        tl.fromTo("#f02-kdot", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 3 }, K.doi);
        // Dona Cida com MAIS sacolas
        tl.to("#f02-night, #f02-front", { opacity: 0, duration: 0.3 }, K.c0 - 0.4);
        tl.to("#f02-house", { opacity: 1, duration: 0.3 }, K.c0 - 0.4);
        tl.set("#f02-c-wrap", { opacity: 1 }, K.c0 - 0.4);
        tl.fromTo("#f02-c-wrap", { x: -400 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.c0 - 0.4);
        R.setPose(tl, "f02c", 0, { shF: -40, elF: -60, shB: 10, elB: -20 });
        R.face(tl, "f02c", 0, { eyes: "happy", mouth: "grin" });
        R.talk(tl, "f02c", K.c0, K.c1, "grin", "open");
        R.pose(tl, "f02c", K.c0, 0.3, { shF: -150, elF: -20 }, "back.out(2)");
        // bolha: Dona Gansa com o pé dolorido
        R.pop(tl, "#f02-bubble", K.g0 - 0.45, 0.45, 0.3);
        R.face(tl, "f02g", K.g0 - 0.45, { eyes: "wide" });
        R.face(tl, "f02b", K.g0 - 0.45, { eyes: "pain", mouth: "frown" });
        tl.to("#f02g-toe0, #f02g-toe1, #f02g-toe2", { fill: "#FF5A4E", duration: 0.2 }, K.g0 - 0.2);
        R.setPose(tl, "f02g", 0, { armF: 0, armB: 0 });
        R.pose(tl, "f02g", K.g0, 0.25, { armF: -60, armB: 60 }, "back.out(2)");
        R.shake(tl, "#f02-g-wrap", K.g0 + 0.2, K.g1 - K.g0 - 0.2, 5);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1440 490", duration: 0.3, ease: "back.in(2)" }, K.g1 + 0.1);
        // artrose piorando?
        R.drop(tl, "#f02-q", K.art - 0.4, 0.8, -300);
        R.face(tl, "f02c", K.art, { eyes: "wide", mouth: "flat" });
      },
      sfx: [
        { name: "pop", t: k.sac - 0.1, vol: 0.4 },
        { name: "glitch-1", t: k.dor, vol: 0.3 },
        { name: "whoosh", t: k.noite - 0.2, vol: 0.4 },
        { name: "pop", t: k.doi, vol: 0.35 },
        { name: "whoosh-short", t: k.c0 - 0.4, vol: 0.4 },
        { name: "whoosh-short", t: k.g0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.art - 0.1, vol: 0.35 },
      ],
    };
  },
};
