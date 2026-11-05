// F6 — Anatomia: as raízes L4–S3 formam o nervo ciático, que desce pela perna e se divide no joelho
export default {
  speakers: { nervo: "f06n" },
  tail: 1.0,
  build(ctx) {
    const { C, nerve, smooth, w, lines } = ctx;
    const k = {
      con: w(0, "Conheça"), maior: w(0, "maior"), dedo: w(0, "dedo"), raiz: w(0, "raízes"), col: w(0, "coluna"),
      l4: w(0, "L4"), s3: w(0, "S3"), tranca: w(0, "trança"), nad: w(0, "nádega"), coxa: w(0, "coxa"),
      joelho: w(0, "joelho"), divid: w(0, "dividem"), pe: w(0, "pé"),
      n0: lines[1].start, n1: lines[1].end, cel: w(1, "celebridade"),
    };
    // perna em vista lateral, virada para a direita (costas à esquerda). Coordenadas do diagrama.
    const body = "M520 70 Q548 200 530 330 Q486 400 498 470 Q512 520 548 530 Q560 610 562 700 Q536 760 556 840 L566 872 L728 872 Q740 860 712 842 L640 822 Q632 760 646 700 Q666 650 672 560 Q690 470 694 410 Q712 330 702 200 Q696 120 700 70 Z";
    const verts = [["L3", 92], ["L4", 146], ["L5", 200]];
    const roots = [
      ["L4", "M608 176 Q640 200 646 250 Q648 330 620 420"],
      ["L5", "M608 230 Q634 250 638 290 Q640 360 620 420"],
      ["S1", "M606 280 Q628 300 630 330 Q632 380 620 420"],
      ["S2", "M598 318 Q616 336 618 360 Q620 395 620 420"],
      ["S3", "M590 350 Q604 366 608 385 Q614 405 620 420"],
    ];
    const trunk = "M620 420 Q600 470 596 530 Q590 610 600 690";
    const tib = "M600 690 Q590 760 594 830 Q600 862 640 864";
    const fib = "M600 690 Q630 730 650 770 Q672 820 700 852";
    const nervePts = [[1110, 330], [1220, 300], [1330, 350], [1440, 310], [1550, 350], [1660, 320], [1740, 340]];
    const labels = [
      ["nad", 790, 444, "nádega"], ["coxa", 790, 590, "trás da coxa"], ["joelho", 790, 676, "divide em 2"], ["pe", 830, 812, "até o pé"],
    ];
    return {
      k,
      css: `
        #f06-title { left:1040px; top:80px; font-size:64px; }
        #f06-title span { color:#C99A00; }
        #f06-ruler-lbl { left:1060px; top:470px; width:720px; text-align:center; font-size:40px; }
        #f06-ruler-lbl b { color:${C.pain}; }
        #f06-dedo-lbl { left:1365px; top:640px; font-size:40px; }
        #root .f06-tag { padding:6px 18px; font-size:34px; border-radius:16px; border:6px solid ${C.ink}; background:#fff; white-space:nowrap; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="980" height="1080" fill="${C.wall}"/>
      <line x1="980" y1="0" x2="980" y2="1080" stroke="${C.ink}" stroke-width="7"/>
      <g id="f06-cam">
        <path d="${body}" fill="#F7DCC6" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M548 530 Q600 548 672 560" fill="none" stroke="${C.ink}" stroke-width="4" opacity="0.35"/>
        <!-- coluna -->
        ${verts.map(([n, y]) => `<rect x="552" y="${y}" width="58" height="40" rx="10" fill="${C.bone}" stroke="${C.ink}" stroke-width="5"/><rect x="556" y="${y + 42}" width="50" height="10" rx="5" fill="#9CD3E6" stroke="${C.ink}" stroke-width="3"/>`).join("")}
        <path d="M552 256 L612 256 L604 340 Q590 380 566 384 Q548 370 548 330 Z" fill="${C.bone}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M556 290 L600 290 M556 318 L596 318 M558 346 L590 346" stroke="${C.ink}" stroke-width="3" opacity="0.4"/>
        <!-- raízes -->
        ${roots.map(([n, d], i) => `<path class="f06-root" id="f06-r${i}" d="${d}" fill="none" stroke="#C99A00" stroke-width="9" stroke-linecap="round"/><path class="f06-rootin" id="f06-ri${i}" d="${d}" fill="none" stroke="${C.nerve}" stroke-width="5" stroke-linecap="round"/>`).join("")}
        ${roots.map(([n], i) => { const y = [176, 230, 280, 318, 350][i]; return `<g id="f06-rl${i}" opacity="0"><line x1="550" y1="${y}" x2="470" y2="${y - 6}" stroke="${C.ink}" stroke-width="2.5"/><rect x="416" y="${y - 22}" width="54" height="30" rx="8" fill="${C.ink}"/><text x="443" y="${y}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="#fff">${n}</text></g>`; }).join("")}
        <!-- tronco e ramos -->
        ${[["t", trunk, 20], ["b1", tib, 13], ["b2", fib, 13]].map(([id, d, sw]) => `<path class="f06-nv" id="f06-${id}o" d="${d}" fill="none" stroke="${C.ink}" stroke-width="${sw + 8}" stroke-linecap="round"/><path class="f06-nv" id="f06-${id}i" d="${d}" fill="none" stroke="${C.nerve}" stroke-width="${sw}" stroke-linecap="round"/>`).join("")}
        <circle id="f06-footglow" cx="660" cy="860" r="40" fill="${C.sun}" opacity="0"/>
        <circle id="f06-split" cx="600" cy="690" r="14" fill="${C.pain}" stroke="#fff" stroke-width="4" opacity="0"/>
      </g>
      <!-- painel direito: o nervo-celebridade -->
      <g id="f06-n-wrap" opacity="0">${nerve("f06n", nervePts, 40)}</g>
      <g transform="translate(1110,320)"><g id="f06-shades" opacity="0">
        <rect x="-44" y="-26" width="38" height="24" rx="8" fill="${C.ink}"/><rect x="6" y="-26" width="38" height="24" rx="8" fill="${C.ink}"/><path d="M-6 -16 L6 -16" stroke="${C.ink}" stroke-width="5"/>
        <path d="M-36 -20 L-26 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      </g></g>
      <g id="f06-ruler" opacity="0">
        <rect x="1080" y="400" width="680" height="54" rx="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
        ${Array.from({ length: 17 }, (_, i) => `<line x1="${1100 + i * 40}" y1="400" x2="${1100 + i * 40}" y2="${i % 4 === 0 ? 432 : 418}" stroke="${C.ink}" stroke-width="4"/>`).join("")}
      </g>
      <g id="f06-dedo" opacity="0" transform="translate(1180,700)">
        <rect x="-38" y="-110" width="76" height="190" rx="38" fill="${C.skinB}" stroke="${C.ink}" stroke-width="7"/>
        <rect x="-24" y="-98" width="48" height="50" rx="20" fill="#FBE3E6" stroke="${C.ink}" stroke-width="5"/>
        <path d="M-26 0 Q0 8 26 0 M-26 30 Q0 38 26 30" fill="none" stroke="${C.ink}" stroke-width="4" opacity="0.5"/>
      </g>
      <g id="f06-cross" opacity="0" transform="translate(1290,690)"><circle r="40" fill="${C.nerve}" stroke="${C.ink}" stroke-width="7"/>${[[-14, -10], [12, -14], [0, 12], [18, 12], [-18, 14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#F3B800" stroke="${C.ink}" stroke-width="2"/>`).join("")}</g>
      <g id="f06-flash">${[[1060, 210], [1720, 220], [1250, 520], [1600, 540], [1800, 420]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="f06-fl${i}" opacity="0"><path d="M0 -40 L10 -10 L40 0 L10 10 L0 40 L-10 10 L-40 0 L-10 -10 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g></g>`).join("")}</g>
      <g transform="translate(1790,190)"><g id="f06-star" opacity="0"><path d="M0 -70 L20 -22 L70 -20 L30 12 L44 62 L0 34 L-44 62 L-30 12 L-70 -20 L-20 -22 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/></g></g>
    </svg>
    <div id="f06-title" class="abs title" style="opacity:0">NERVO <span>CIÁTICO</span></div>
    <div id="f06-ruler-lbl" class="abs label" style="opacity:0">o <b>MAIOR</b> e mais <b>GROSSO</b> do corpo</div>
    <div id="f06-dedo-lbl" class="abs label" style="opacity:0">quase a grossura<br/>de um dedo!</div>
    ${labels.map(([id, x, y, t]) => `<div id="f06-lb-${id}" class="abs f06-tag label" style="left:${x}px;top:${y}px;opacity:0">${t}</div>`).join("")}`,
      js: function (tl, K, R) {
        // câmera: começa com zoom na lombar, depois mostra a perna inteira
        tl.set("#f06-cam", { attr: { transform: "translate(-650,-170) scale(2.4)" } }, 0);
        tl.set(".f06-root, .f06-rootin, .f06-nv", { opacity: 0 }, 0);
        // painel direito
        R.rise(tl, "#f06-title", K.con - 0.2, 0.4);
        tl.set("#f06-n-wrap", { opacity: 1 }, K.con);
        tl.fromTo("#f06-n-wrap", { x: 900 }, { x: 0, duration: 0.7, ease: "back.out(1.2)" }, K.con);
        R.blinks(tl, "f06n", 0.5, K.dur);
        R.face(tl, "f06n", K.con + 0.6, { mouth: "grin" });
        tl.set("#f06-ruler", { opacity: 1 }, K.maior - 0.1);
        tl.fromTo("#f06-ruler", { scaleX: 0, svgOrigin: "1080 427" }, { scaleX: 1, svgOrigin: "1080 427", duration: 0.5, ease: "power3.out" }, K.maior - 0.1);
        R.rise(tl, "#f06-ruler-lbl", K.maior + 0.1, 0.4);
        R.pop(tl, "#f06-dedo", K.dedo - 0.3, 0.45);
        R.pop(tl, "#f06-cross", K.dedo - 0.1, 0.45);
        R.rise(tl, "#f06-dedo-lbl", K.dedo, 0.4);
        R.face(tl, "f06n", K.dedo, { eyes: "happy" });
        R.face(tl, "f06n", K.dedo + 1.2, { eyes: "normal", mouth: "smile" });
        // raízes saem da coluna, uma a uma
        const rt = [K.raiz, K.raiz + 0.4, K.col, K.l4, K.s3];
        rt.forEach((t, i) => {
          tl.set(`#f06-r${i}, #f06-ri${i}`, { opacity: 1 }, t);
          R.draw(tl, `#f06-r${i}, #f06-ri${i}`, t, 0.5);
          R.pop(tl, `#f06-rl${i}`, t + 0.05, 0.35);
        });
        // trança: brilho nas raízes
        tl.to(".f06-rootin", { stroke: "#FFF3B8", duration: 0.15, yoyo: true, repeat: 3 }, K.tranca);
        // zoom out e o nervo desce
        tl.to("#f06-cam", { attr: { transform: "translate(60,0) scale(1)" }, duration: 1.0, ease: "power2.inOut" }, K.tranca + 0.2);
        tl.to("[id^=f06-rl]", { opacity: 0, duration: 0.3 }, K.tranca + 0.2);
        tl.set("#f06-to, #f06-ti", { opacity: 1 }, K.nad - 0.2);
        tl.fromTo("#f06-to, #f06-ti", { attr: { "stroke-dasharray": "300 300", "stroke-dashoffset": 300 } }, { attr: { "stroke-dashoffset": 155 }, duration: 0.5, ease: "power2.out" }, K.nad - 0.2);
        R.pop(tl, "#f06-lb-nad", K.nad, 0.35);
        tl.to("#f06-to, #f06-ti", { attr: { "stroke-dashoffset": 0 }, duration: 0.8, ease: "power2.inOut" }, K.coxa - 0.2);
        R.pop(tl, "#f06-lb-coxa", K.coxa, 0.35);
        R.pop(tl, "#f06-split", K.joelho, 0.35);
        R.pop(tl, "#f06-lb-joelho", K.joelho + 0.1, 0.35);
        tl.set("#f06-b1o, #f06-b1i, #f06-b2o, #f06-b2i", { opacity: 1 }, K.divid);
        R.draw(tl, "#f06-b1o, #f06-b1i, #f06-b2o, #f06-b2i", K.divid, 1.2);
        tl.fromTo("#f06-footglow", { opacity: 0 }, { opacity: 0.6, duration: 0.2, yoyo: true, repeat: 3 }, K.pe);
        R.pop(tl, "#f06-lb-pe", K.pe, 0.35);
        // celebridade!
        R.face(tl, "f06n", K.n0 - 0.2, { eyes: "happy" });
        R.pop(tl, "#f06-shades", K.n0 - 0.1, 0.35, 2);
        tl.fromTo("#f06-n-wrap", { y: 0 }, { y: -30, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }, K.n0 - 0.1);
        [0, 1, 2, 3, 4].forEach((i) => {
          const t = K.n0 + 0.15 + i * 0.32;
          tl.fromTo(`#f06-fl${i}`, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1.2, duration: 0.1 }, t);
          tl.to(`#f06-fl${i}`, { opacity: 0, scale: 0.6, duration: 0.2 }, t + 0.15);
        });
        R.pop(tl, "#f06-star", K.cel, 0.45);
        tl.to("#f06-star", { rotation: 20, svgOrigin: "0 0", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.cel + 0.4);
      },
      sfx: [
        { name: "whoosh", t: k.con, vol: 0.4 },
        { name: "pop", t: k.dedo - 0.25, vol: 0.35 },
        ...[k.raiz, k.raiz + 0.4, k.col, k.l4, k.s3].map((t) => ({ name: "click-soft", t, vol: 0.45 })),
        { name: "whoosh-short", t: k.tranca + 0.2, vol: 0.4 },
        { name: "pop", t: k.joelho, vol: 0.35 },
        { name: "sparkle", t: k.pe, vol: 0.35 },
        { name: "click", t: k.n0 + 0.15, vol: 0.4 },
        { name: "click", t: k.n0 + 0.79, vol: 0.4 },
        { name: "sparkle", t: k.cel, vol: 0.45 },
      ],
    };
  },
};
