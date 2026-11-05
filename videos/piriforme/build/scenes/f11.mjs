// F11 — A conversa: pistas no quadro ligadas à foto da nádega; depois o ranking (coluna desce, piriforme sobe)
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
    const { C, human, w } = ctx;
    const k = {
      conv: w(0, "conversa"), nad: w(0, "nádega"), lomb: w(0, "lombar"), piora: w(0, "Piora"), lev: w(0, "levantar"),
      rep: w(0, "repare"), toss: w(0, "tossir"), perda: w(0, "perda"), sens: w(0, "sensibilidade"),
      col: w(0, "coluna"), menos: w(0, "menos"), pir: w(0, "piriforme"), sobe: w(0, "sobe"), rank: w(0, "ranking"),
    };
    let pab = inHand(inNeck(human("f11p", "pablo"), "f11p", hat("f11p", C)), "f11p", lupa("f11p", C));
    // cartões (pistas) e onde ficam os alfinetes
    const cards = [
      { x: 690, y: 150, r: -3, c: "#FFF6C8", t: "Dói mais na <b>NÁDEGA</b> que na lombar?", tag: "" },
      { x: 1470, y: 150, r: 3, c: "#DFF3F7", t: "Piora <b>SENTADO</b> ou ao levantar?", tag: "" },
      { x: 690, y: 500, r: 2, c: "#E6F7EC", t: "Tossir e espirrar <b>NÃO</b> piora?", tag: "" },
      { x: 1470, y: 500, r: -2, c: "#FFE0D8", t: "Força e sensibilidade <b>NORMAIS</b>?", tag: "" },
    ];
    const pins = [[860, 168], [1640, 168], [860, 518], [1640, 518]];
    const legPins = [[1230, 360], [1350, 360], [1230, 540], [1350, 540]];
    return {
      k,
      css: `
        #root .f11-card { position:absolute; width:340px; height:230px; padding:34px 22px 16px; border:6px solid ${C.ink}; border-radius:8px;
          box-shadow: 8px 8px 0 rgba(1,62,76,0.35); font-size:38px; line-height:1.12; text-align:center; }
        #root .f11-card b { color:${C.pain}; }
        #root .f11-tag { position:absolute; left:16px; right:16px; bottom:14px; font-size:26px; color:#fff; background:${C.ink}; border-radius:12px; padding:4px 8px; }
        #root .f11-row { position:absolute; left:60px; right:60px; height:130px; display:flex; align-items:center; gap:30px; font-size:56px;
          background:${C.cream}; border:6px solid ${C.ink}; border-radius:22px; padding:0 30px; }
        #root .f11-pos { position:relative; font-family:"Montserrat"; font-weight:900; font-size:64px; width:90px; }
        #root .f11-pos span { position:absolute; left:0; top:-40px; }
        #root .f11-arr { margin-left:auto; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="100" width="1250" height="720" rx="22" fill="#C8955C" stroke="${C.ink}" stroke-width="8"/>
      <rect x="648" y="128" width="1194" height="664" rx="10" fill="#D9A86C"/>
      <!-- foto da nádega no centro -->
      <g transform="translate(1290,450) rotate(-2)">
        <rect x="-120" y="-190" width="240" height="380" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect x="-100" y="-170" width="200" height="300" fill="#EAF6F8"/>
        <path d="M-70 -150 L-60 -40 Q-70 30 -40 80 L-40 120 M70 -150 L60 -40 Q70 30 40 80 L40 120" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
        <path d="M-64 -70 Q-30 -20 0 -60 Q30 -20 64 -70 Q72 10 40 50 Q0 70 -40 50 Q-72 10 -64 -70 Z" fill="${C.brown}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M0 -60 L0 40" stroke="${C.ink}" stroke-width="5" opacity="0.6"/>
        <g id="f11-spot"><circle cx="-34" cy="-14" r="26" fill="${C.pain}" opacity="0.45"/><circle cx="-34" cy="-14" r="12" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        <text x="0" y="168" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">SEU ZÉ</text>
      </g>
      ${pins.map((p, i) => `<path id="f11-s${i}" d="M${p[0]} ${p[1]} Q${(p[0] + legPins[i][0]) / 2} ${(p[1] + legPins[i][1]) / 2 + 40} ${legPins[i][0]} ${legPins[i][1]}" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round" opacity="0"/>`).join("")}
      ${legPins.map((p, i) => `<circle id="f11-lp${i}" cx="${p[0]}" cy="${p[1]}" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" opacity="0"/>`).join("")}
      <g id="f11-p-wrap"><g transform="translate(330,640) scale(1.15)">${pab}</g></g>
    </svg>
    ${cards.map((c, i) => `<div id="f11-c${i}" class="f11-card label" style="left:${c.x}px;top:${c.y}px;background:${c.c};rotate:${c.r}deg;opacity:0">
      <svg style="position:absolute;left:153px;top:-6px" width="34" height="34" viewBox="-17 -17 34 34"><circle r="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></svg>
      ${c.t}${c.tag ? `<div id="f11-t${i}" class="f11-tag" style="opacity:0">${c.tag}</div>` : ""}</div>`).join("")}
    <div id="f11-rank" class="abs card" style="left:760px;top:180px;width:980px;height:560px;opacity:0">
      <div class="title" style="position:absolute;left:0;right:0;top:26px;text-align:center;font-size:54px">RANKING DE SUSPEITOS</div>
      <div id="f11-r0" class="label f11-row" style="top:150px"><span class="f11-pos"><span id="f11-p0a">1º</span><span id="f11-p0b" style="opacity:0">2º</span></span><span id="f11-n0">COLUNA (hérnia)</span><svg id="f11-a0" class="f11-arr" width="70" height="70" viewBox="-35 -35 70 70" style="opacity:0"><path d="M-26 -14 L0 22 L26 -14 Z" fill="${C.good}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></svg></div>
      <div id="f11-r1" class="label f11-row" style="top:330px"><span class="f11-pos"><span id="f11-p1a">2º</span><span id="f11-p1b" style="opacity:0">1º</span></span><span id="f11-n1" style="color:${C.pain}">PIRIFORME</span><svg id="f11-a1" class="f11-arr" width="70" height="70" viewBox="-35 -35 70 70" style="opacity:0"><path d="M-26 14 L0 -22 L26 14 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></svg></div>
    </div>`,
      js: function (tl, K, R) {
        const p = "f11p";
        R.setPose(tl, p, 0, { shF: -70, elF: -40, shB: 10, elB: -20 });
        R.blinks(tl, p, 0.3, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.fadeIn(tl, "#f11-p-wrap", 0, 0.3);
        const t0 = [K.nad - 0.3, K.piora, K.toss, K.perda];
        t0.forEach((t, i) => {
          tl.fromTo(`#f11-c${i}`, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, t - 0.15);
          tl.set(`#f11-s${i}`, { opacity: 1 }, t + 0.2);
          R.draw(tl, `#f11-s${i}`, t + 0.2, 0.45);
          R.pop(tl, `#f11-lp${i}`, t + 0.6, 0.3);
          R.pose(tl, p, t - 0.2, 0.35, { shF: i % 2 ? -125 : -100, elF: i % 2 ? -20 : -45 }, "back.out(1.6)");
        });
        tl.fromTo("#f11-spot", { scale: 0.6 }, { scale: 1.25, svgOrigin: "-34 -14", duration: 0.25, yoyo: true, repeat: 3 }, K.nad);
        R.shake(tl, "#f11-c1", K.lev, 0.35, 5);
        R.face(tl, p, K.rep, { eyes: "wide" });
        R.face(tl, p, K.rep + 0.6, { eyes: "normal" });
        // ranking: coluna desce, piriforme sobe
        tl.to("#f11-c0, #f11-c1, #f11-c2, #f11-c3", { opacity: 0.25, duration: 0.3 }, K.col - 0.35);
        R.pop(tl, "#f11-rank", K.col - 0.3, 0.45, 0.6);
                tl.fromTo("#f11-a0", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, K.menos);
        tl.to("#f11-r0", { y: 180, duration: 0.5, ease: "power2.inOut" }, K.sobe - 0.1);
        tl.to("#f11-r1", { y: -180, duration: 0.5, ease: "power2.inOut" }, K.sobe - 0.1);
                tl.fromTo("#f11-a1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, K.sobe);
        tl.set("#f11-p0a, #f11-p1a", { opacity: 0 }, K.sobe + 0.4);
        tl.set("#f11-p0b, #f11-p1b", { opacity: 1 }, K.sobe + 0.4);
        tl.to("#f11-r1", { scale: 1.05, duration: 0.18, yoyo: true, repeat: 3 }, K.rank);
        R.pose(tl, p, K.col - 0.2, 0.4, { shF: -115, elF: -35 });
        R.face(tl, p, K.rank, { eyes: "happy" });
        R.pose(tl, p, K.dur - 0.9, 0.5, { shF: -70, elF: -40 });
      },
      sfx: [
        ...[k.nad - 0.3, k.piora, k.toss, k.perda].map((t) => ({ name: "click-soft", t: t + 0.05, vol: 0.5 })),
        { name: "whoosh-short", t: k.col - 0.3, vol: 0.4 },
        { name: "whoosh", t: k.sobe - 0.1, vol: 0.35 },
        { name: "pop", t: k.sobe + 0.4, vol: 0.4 },
      ],
    };
  },
};
