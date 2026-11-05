// F11 — As pistas: o Seu Zé "desenha" o bolso na coxa; fraqueza? não; roupa/cinto/peso; dor nas costas separa da coluna
const inNeck = (svg, id, extra) => {
  const i = svg.indexOf(`<g transform="translate(4,-138)"><g id="${id}-shF">`);
  const j = svg.lastIndexOf("</g></g>", i);
  return svg.slice(0, j) + extra + svg.slice(j);
};
const inHand = (svg, id, extra) => svg.replace(`<g id="${id}-handF">`, `<g id="${id}-handF">${extra}`);
const hat = (id, C) => `<g id="${id}-hat">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g>`;
const lupa = (id, C) => `<g id="${id}-lupa">
  <line x1="0" y1="0" x2="0" y2="40" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/>
  <line x1="0" y1="0" x2="0" y2="40" stroke="#7A4E2A" stroke-width="10" stroke-linecap="round"/>
  <circle cx="0" cy="72" r="32" fill="#D6F4FA" stroke="${C.ink}" stroke-width="9"/>
  <path d="M-14 58 Q-4 48 8 52" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</g>`;

export default {
  speakers: { pablo: "f11p" },
  build(ctx) {
    const { C, human, w, LILAC } = ctx;
    const k = {
      conv: w(0, "conversa"), des: w(0, "desenha"), dedo: w(0, "dedo"), form: w(0, "formiga"), lat: w(0, "lateral"), bolso: w(0, "bolso"),
      pista: w(0, "pista"), fraq: w(0, "fraqueza"), mer: w(0, "meralgia"), nao: w(0, "não"), mud: w(0, "Mudou"), peso: w(0, "peso"),
      cost: w(0, "costas"), sep: w(0, "separar"), col: w(0, "coluna"),
    };
    let pab = inHand(inNeck(human("f11p", "pablo"), "f11p", hat("f11p", C)), "f11p", lupa("f11p", C));
    const cards = [
      { x: 690, y: 150, r: -3, c: "#FFF6C8", t: "Onde formiga? <b>Desenha com o dedo!</b>", tag: "" },
      { x: 1470, y: 150, r: 3, c: "#DFF3F7", t: "Tem <b>FRAQUEZA</b>?", tag: "na meralgia: NÃO" },
      { x: 690, y: 500, r: 2, c: "#E6F7EC", t: "Mudou <b>roupa, cinto</b> ou ganhou <b>peso</b>?", tag: "" },
      { x: 1470, y: 500, r: -2, c: "#FFE0D8", t: "Tem dor nas <b>COSTAS</b>?", tag: "separa da coluna" },
    ];
    const pins = [[860, 168], [1640, 168], [860, 518], [1640, 518]];
    const legPins = [[1220, 330], [1360, 330], [1220, 570], [1360, 570]];
    // foto: perna direita vista de frente; lado de fora (lateral) = à direita da foto
    const pocket = "M28 -118 Q60 -110 66 -60 Q70 -10 58 40 Q40 60 24 40 Q18 -10 20 -70 Q20 -104 28 -118 Z";
    return {
      k,
      css: `
        #root .f11-card { position:absolute; width:340px; height:230px; padding:34px 22px 16px; border:6px solid ${C.ink}; border-radius:8px;
          box-shadow: 8px 8px 0 rgba(1,62,76,0.35); font-size:38px; line-height:1.12; text-align:center; }
        #root .f11-card b { color:#7A55C9; }
        #root .f11-tag { position:absolute; left:16px; right:16px; bottom:14px; font-size:26px; color:#fff; background:${C.ink}; border-radius:12px; padding:4px 8px; }
        #f11-stamp { left:1110px; top:690px; padding:8px 22px; font-size:40px; color:${C.pain}; border:6px solid ${C.pain}; border-radius:14px; background:#fff; rotate:-8deg; }
        #f11-pk { left:1420px; top:320px; padding:10px 16px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="100" width="1250" height="720" rx="22" fill="#C8955C" stroke="${C.ink}" stroke-width="8"/>
      <rect x="648" y="128" width="1194" height="664" rx="10" fill="#D9A86C"/>
      <!-- foto da coxa (perna direita de frente) -->
      <g transform="translate(1290,450) rotate(-2)">
        <rect x="-120" y="-190" width="240" height="380" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect x="-100" y="-170" width="200" height="300" fill="#EAF6F8"/>
        <path d="M-58 -160 L58 -160 L62 -150 Q74 -40 52 70 L44 128 L-30 128 L-40 70 Q-60 -40 -58 -150 Z" fill="${C.skinB}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-62 -160 L62 -160 L62 -128 L-62 -128 Z" fill="${C.brown}" stroke="${C.ink}" stroke-width="5"/>
        <ellipse cx="2" cy="78" rx="24" ry="16" fill="none" stroke="${C.ink}" stroke-width="4" opacity="0.5"/>
        <text x="-20" y="160" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">SEU ZÉ</text>
        <text x="70" y="160" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}" opacity="0.7">lado de fora</text>
        <path id="f11-fill" d="${pocket}" fill="${LILAC}" opacity="0"/>
        <path id="f11-bolso" d="${pocket}" fill="none" stroke="#7A55C9" stroke-width="7" stroke-dasharray="14 10" stroke-linecap="round" opacity="0"/>
        <g id="f11-finger" opacity="0"><g id="f11-fing"><path d="M0 0 L10 -40" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/><path d="M0 0 L10 -40" stroke="${C.skinB}" stroke-width="16" stroke-linecap="round"/></g></g>
      </g>
      ${pins.map((p, i) => `<path id="f11-s${i}" d="M${p[0]} ${p[1]} Q${(p[0] + legPins[i][0]) / 2} ${(p[1] + legPins[i][1]) / 2 + 40} ${legPins[i][0]} ${legPins[i][1]}" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round" opacity="0"/>`).join("")}
      ${legPins.map((p, i) => `<circle id="f11-lp${i}" cx="${p[0]}" cy="${p[1]}" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" opacity="0"/>`).join("")}
      <g id="f11-p-wrap"><g transform="translate(330,640) scale(1.15)">${pab}</g></g>
    </svg>
    ${cards.map((c, i) => `<div id="f11-c${i}" class="f11-card label" style="left:${c.x}px;top:${c.y}px;background:${c.c};rotate:${c.r}deg;opacity:0">
      <svg style="position:absolute;left:153px;top:-6px" width="34" height="34" viewBox="-17 -17 34 34"><circle r="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></svg>
      ${c.t}${c.tag ? `<div id="f11-t${i}" class="f11-tag" style="opacity:0">${c.tag}</div>` : ""}</div>`).join("")}
    <div id="f11-stamp" class="abs title" style="opacity:0">PISTA FORTE!</div>`,
      js: function (tl, K, R) {
        const p = "f11p";
        R.setPose(tl, p, 0, { shF: -70, elF: -40, shB: 10, elB: -20 });
        R.blinks(tl, p, 0.3, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.fadeIn(tl, "#f11-p-wrap", 0, 0.3);
        const t0 = [K.des, K.fraq, K.mud, K.cost];
        t0.forEach((t, i) => {
          tl.fromTo(`#f11-c${i}`, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, t - 0.15);
          tl.set(`#f11-s${i}`, { opacity: 1 }, t + 0.2);
          R.draw(tl, `#f11-s${i}`, t + 0.2, 0.45);
          R.pop(tl, `#f11-lp${i}`, t + 0.6, 0.3);
          R.pose(tl, p, t - 0.2, 0.35, { shF: i % 2 ? -125 : -100, elF: i % 2 ? -20 : -45 }, "back.out(1.6)");
        });
        // o dedo desenha o "bolso" na coxa
        tl.set("#f11-finger", { opacity: 1 }, K.dedo);
        tl.set("#f11-bolso", { opacity: 1 }, K.dedo + 0.1);
        R.draw(tl, "#f11-bolso", K.dedo + 0.1, 1.8, "none");
        const pts = [[28, -118], [64, -80], [64, -10], [50, 46], [22, 30], [20, -70], [28, -118]];
        pts.forEach(([x, y], i) => tl.to("#f11-fing", { x, y, duration: 0.3, ease: "none" }, K.dedo + 0.1 + i * 0.28));
        tl.to("#f11-finger", { opacity: 0, duration: 0.2 }, K.dedo + 2.2);
        tl.to("#f11-fill", { opacity: 0.7, duration: 0.3 }, K.lat);
        tl.to("#f11-fill", { opacity: 0.35, duration: 0.25, yoyo: true, repeat: 3 }, K.bolso);
        R.pop(tl, "#f11-stamp", K.pista - 0.1, 0.4);
        R.shake(tl, "#f11-stamp", K.pista + 0.3, 0.25, 4);
        R.fadeOut(tl, "#f11-stamp", K.fraq - 0.4);
        // fraqueza? NÃO
        tl.fromTo("#f11-t1", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" }, K.nao - 0.05);
        tl.set("#f11-t1", { background: "#1E9E73" }, K.nao - 0.05);
        R.face(tl, p, K.nao, { eyes: "happy" });
        R.face(tl, p, K.mud, { eyes: "normal" });
        // costas → separa da coluna
        tl.fromTo("#f11-t3", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" }, K.sep - 0.05);
        R.pose(tl, p, K.dur - 0.9, 0.5, { shF: -70, elF: -40 });
      },
      sfx: [
        ...[k.des, k.fraq, k.mud, k.cost].map((t) => ({ name: "click-soft", t: t + 0.05, vol: 0.5 })),
        { name: "typing", t: k.dedo + 0.1, vol: 0.2, dur: 1.6 },
        { name: "pop", t: k.pista - 0.05, vol: 0.45 },
        { name: "pop", t: k.nao, vol: 0.4 },
        { name: "pop", t: k.sep, vol: 0.35 },
      ],
    };
  },
};
