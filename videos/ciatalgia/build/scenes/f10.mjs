// F10 — Anamnese: cada pergunta vira uma pista no quadro, ligada à perna por barbante
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
  speakers: { pablo: "f10p" },
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      conv: w(0, "conversa"), passa: w(0, "passa"), raiz: w(0, "raiz"), form: w(0, "Formiga"), choque: w(0, "choque"),
      piora: w(0, "Piora"), press: w(0, "pressão"), imp: w(0, "importante"), perd: w(0, "perdeu"),
    };
    let pab = inHand(inNeck(human("f10p", "pablo"), "f10p", hat("f10p", C)), "f10p", lupa("f10p", C));
    // cartões (pistas) e onde ficam os alfinetes
    const cards = [
      { x: 690, y: 150, r: -3, c: "#FFF6C8", t: "A dor <b>PASSA</b> do joelho?", tag: "raiz do nervo envolvida" },
      { x: 1470, y: 150, r: 3, c: "#DFF3F7", t: "Formiga?<br>Dá <b>choque</b>?", tag: "" },
      { x: 690, y: 500, r: 2, c: "#E6F7EC", t: "Piora ao <b>tossir</b>, espirrar ou sentar?", tag: "mais pressão no disco" },
      { x: 1470, y: 500, r: -2, c: "#FFE0D8", t: "<b>PERDEU FORÇA</b> na perna?", tag: "a mais importante!" },
    ];
    const pins = [[860, 168], [1640, 168], [860, 518], [1640, 518]];
    const legPins = [[1230, 300], [1350, 330], [1230, 560], [1350, 600]];
    return {
      k,
      css: `
        #root .f10-card { position:absolute; width:340px; height:230px; padding:34px 22px 16px; border:6px solid ${C.ink}; border-radius:8px;
          box-shadow: 8px 8px 0 rgba(1,62,76,0.35); font-size:38px; line-height:1.12; text-align:center; }
        #root .f10-card b { color:${C.pain}; }
        #root .f10-tag { position:absolute; left:16px; right:16px; bottom:14px; font-size:26px; color:#fff; background:${C.ink}; border-radius:12px; padding:4px 8px; }
        #f10-c3 { border-color:${C.pain}; border-width:8px; }
        #f10-c3 .f10-tag { background:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="100" width="1250" height="720" rx="22" fill="#C8955C" stroke="${C.ink}" stroke-width="8"/>
      <rect x="648" y="128" width="1194" height="664" rx="10" fill="#D9A86C"/>
      <!-- foto da perna no centro -->
      <g transform="translate(1290,450) rotate(-2)">
        <rect x="-120" y="-190" width="240" height="380" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect x="-100" y="-170" width="200" height="300" fill="#EAF6F8"/>
        <path d="M-40 -160 L-30 -20 L-20 110 L50 110" fill="none" stroke="${C.ink}" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M-40 -160 L-30 -20 L-20 110 L50 110" fill="none" stroke="${C.skinB}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="-30" cy="-20" r="10" fill="${C.ink}"/>
        <text x="40" y="-14" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">joelho</text>
        <path id="f10-zap" d="M-34 -6 L-14 20 L-34 40 L-10 66 L-30 90 L-6 112" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <g id="f10-weak" opacity="0" transform="translate(0,85)"><path d="M60 -60 Q80 -40 60 -20 Q40 0 60 20" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/><path d="M80 -70 Q100 -50 80 -30 Q60 -10 80 10" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/></g>
        <text x="0" y="168" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">SEU ZÉ</text>
      </g>
      ${pins.map((p, i) => `<path id="f10-s${i}" d="M${p[0]} ${p[1]} Q${(p[0] + legPins[i][0]) / 2} ${(p[1] + legPins[i][1]) / 2 + 40} ${legPins[i][0]} ${legPins[i][1]}" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round" opacity="0"/>`).join("")}
      ${legPins.map((p, i) => `<circle id="f10-lp${i}" cx="${p[0]}" cy="${p[1]}" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" opacity="0"/>`).join("")}
      <g id="f10-p-wrap"><g transform="translate(330,640) scale(1.15)">${pab}</g></g>
    </svg>
    ${cards.map((c, i) => `<div id="f10-c${i}" class="f10-card label" style="left:${c.x}px;top:${c.y}px;background:${c.c};rotate:${c.r}deg;opacity:0">
      <svg style="position:absolute;left:153px;top:-6px" width="34" height="34" viewBox="-17 -17 34 34"><circle r="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></svg>
      ${c.t}${c.tag ? `<div id="f10-t${i}" class="f10-tag" style="opacity:0">${c.tag}</div>` : ""}</div>`).join("")}`,
      js: function (tl, K, R) {
        const p = "f10p";
        R.setPose(tl, p, 0, { shF: -70, elF: -40, shB: 10, elB: -20 });
        R.blinks(tl, p, 0.3, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.fadeIn(tl, "#f10-p-wrap", 0, 0.3);
        // cada pista: cartão aparece, barbante liga à foto
        const t0 = [K.passa, K.form, K.piora, K.perd - 0.3];
        t0.forEach((t, i) => {
          tl.fromTo(`#f10-c${i}`, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, t - 0.15);
          tl.set(`#f10-s${i}`, { opacity: 1 }, t + 0.2);
          R.draw(tl, `#f10-s${i}`, t + 0.2, 0.45);
          R.pop(tl, `#f10-lp${i}`, t + 0.6, 0.3);
          // Pablo aponta a lupa para o cartão
          R.pose(tl, p, t - 0.2, 0.35, { shF: i % 2 ? -125 : -100, elF: i % 2 ? -20 : -45 }, "back.out(1.6)");
        });
        // pistas extras
        tl.set("#f10-zap", { opacity: 1 }, K.passa + 0.5);
        R.draw(tl, "#f10-zap", K.passa + 0.5, 0.35);
        R.fadeIn(tl, "#f10-t0", K.raiz, 0.3);
        R.shake(tl, "#f10-c1", K.choque, 0.4, 6);
        R.fadeIn(tl, "#f10-t2", K.press, 0.3);
        // a pergunta mais importante
        R.face(tl, p, K.imp, { eyes: "wide" });
        R.pop(tl, "#f10-t3", K.imp, 0.35);
        tl.to("#f10-c3", { scale: 1.12, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.perd + 0.1);
        tl.fromTo("#f10-weak", { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 5 }, K.perd + 0.1);
        tl.to("#f10-weak", { opacity: 1, duration: 0.1 }, K.perd + 1.0);
        R.pose(tl, p, K.dur - 0.9, 0.5, { shF: -70, elF: -40 });
      },
      sfx: [
        ...[k.passa, k.form, k.piora, k.perd - 0.3].map((t) => ({ name: "click-soft", t: t + 0.05, vol: 0.5 })),
        { name: "glitch-1", t: k.passa + 0.5, vol: 0.25, dur: 0.4 },
        { name: "impact-bass-1", t: k.imp, vol: 0.45 },
      ],
    };
  },
};
