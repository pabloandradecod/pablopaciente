// F12 — As pistas: quadro de cortiça com 6 perguntas ligadas à foto da lombar do Seu Zé
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
  speakers: { pablo: "f12p" },
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      com: w(0, "começou"), muda: w(0, "muda"), desce: w(0, "Desce"), noite: w(0, "noite"), sono: w(0, "sono"), medo: w(0, "medo"),
      essas: w(0, "Essas"), alarme: w(0, "alarme"),
    };
    let pab = inHand(inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C)), "f12p", lupa("f12p", C));
    const cards = [
      { x: 680, y: 140, r: -3, c: "#FFF6C8", t: "Como <b>COMEÇOU</b>?" },
      { x: 1490, y: 140, r: 3, c: "#DFF3F7", t: "Muda com <b>MOVIMENTO</b> e posição?" },
      { x: 680, y: 370, r: 2, c: "#E6F7EC", t: "<b>DESCE</b> pela perna?" },
      { x: 1490, y: 370, r: -2, c: "#FFE0D8", t: "Dói mais à <b>NOITE</b>, mesmo parado?" },
      { x: 680, y: 590, r: 1, c: "#F1E8FF", t: "<b>SONO</b>, estresse, trabalho?" },
      { x: 1490, y: 590, r: -1, c: "#FFF0D6", t: "Tem <b>MEDO</b> de se mexer?" },
    ];
    const pins = [[850, 158], [1660, 158], [850, 388], [1660, 388], [850, 608], [1660, 608]];
    const legPins = [[1290, 300], [1290, 300], [1270, 470], [1290, 300], [1300, 230], [1300, 230]];
    return {
      k,
      css: `
        #root .f12-card { position:absolute; width:340px; height:200px; padding:34px 22px 16px; border:6px solid ${C.ink}; border-radius:8px;
          box-shadow: 8px 8px 0 rgba(1,62,76,0.35); font-size:35px; line-height:1.12; text-align:center; }
        #root .f12-card b { color:${C.pain}; }
        #f12-stamp { left:700px; top:330px; width:1100px; padding:26px 30px; text-align:center; font-size:66px; color:#fff; background:${C.pain};
          border:8px solid ${C.ink}; border-radius:24px; box-shadow:10px 10px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="620" y="100" width="1250" height="720" rx="22" fill="#C8955C" stroke="${C.ink}" stroke-width="8"/>
      <rect x="648" y="128" width="1194" height="664" rx="10" fill="#D9A86C"/>
      <!-- foto: lombar do Seu Zé vista de trás -->
      <g transform="translate(1290,370) rotate(-2) scale(0.8)">
        <rect x="-120" y="-190" width="240" height="380" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <rect x="-100" y="-170" width="200" height="300" fill="#EAF6F8"/>
        <path d="M-60 -170 L-56 -60 L-44 -40 M60 -170 L56 -60 L44 -40" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
        <rect x="-56" y="-170" width="112" height="120" fill="${C.blue}" stroke="${C.ink}" stroke-width="6"/>
        ${[0, 1, 2, 3].map((i) => `<circle cx="0" cy="${-150 + i * 26}" r="7" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`).join("")}
        <path d="M-50 -50 L50 -50 L48 -10 L-48 -10 Z" fill="${C.brown}" stroke="${C.ink}" stroke-width="6"/>
        <path d="M-46 -10 L-40 120 M-4 -10 L-10 120 M4 -10 L10 120 M46 -10 L40 120" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
        <rect x="-44" y="-10" width="34" height="130" fill="${C.brown}"/><rect x="10" y="-10" width="34" height="130" fill="${C.brown}"/>
        <g id="f12-pain"><circle cx="0" cy="-90" r="22" fill="${C.pain}" opacity="0.45"/>
        <path id="f12-ray" d="M-6 -80 L-20 -20 L-30 30 L-24 80 L-30 118" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-dasharray="14 12" opacity="0"/></g>
        <text x="0" y="168" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">SEU ZÉ</text>
      </g>
      ${pins.map((p, i) => `<path id="f12-s${i}" d="M${p[0]} ${p[1]} Q${(p[0] + legPins[i][0]) / 2} ${(p[1] + legPins[i][1]) / 2 + 40} ${legPins[i][0]} ${legPins[i][1]}" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linecap="round" opacity="0"/>`).join("")}
      ${legPins.map((p, i) => `<circle id="f12-lp${i}" cx="${p[0]}" cy="${p[1]}" r="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="4" opacity="0"/>`).join("")}
      <g id="f12-p-wrap"><g transform="translate(330,640) scale(1.15)">${pab}</g></g>
    </svg>
    ${cards.map((c, i) => `<div id="f12-c${i}" class="f12-card label" style="left:${c.x}px;top:${c.y}px;background:${c.c};rotate:${c.r}deg;opacity:0">
      <svg style="position:absolute;left:153px;top:-6px" width="34" height="34" viewBox="-17 -17 34 34"><circle r="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></svg>
      ${c.t}</div>`).join("")}
    <div id="f12-stamp" class="abs title" style="opacity:0">RESPOSTAS = VOLUME DO ALARME</div>`,
      js: function (tl, K, R) {
        const p = "f12p";
        R.setPose(tl, p, 0, { shF: -70, elF: -40, shB: 10, elB: -20 });
        R.blinks(tl, p, 0.3, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.fadeIn(tl, "#f12-p-wrap", 0, 0.3);
        tl.fromTo("#f12-pain", { scale: 0.7, svgOrigin: "0 -90" }, { scale: 1.15, svgOrigin: "0 -90", duration: 0.35, yoyo: true, repeat: 3 }, K.com);
        tl.set("#f12-ray", { opacity: 0.8 }, K.desce);
        const t0 = [K.com - 0.4, K.muda, K.desce, K.noite, K.sono, K.medo];
        t0.forEach((t, i) => {
          tl.fromTo(`#f12-c${i}`, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, t - 0.15);
          tl.set(`#f12-s${i}`, { opacity: 1 }, t + 0.2);
          R.draw(tl, `#f12-s${i}`, t + 0.2, 0.45);
          R.pop(tl, `#f12-lp${i}`, t + 0.6, 0.3);
          R.pose(tl, p, t - 0.2, 0.35, { shF: i % 2 ? -125 : -100, elF: i % 2 ? -20 : -45 }, "back.out(1.6)");
        });
        R.shake(tl, "#f12-c5", K.medo + 0.4, 0.3, 5);
        R.face(tl, p, K.medo, { eyes: "wide" });
        R.face(tl, p, K.medo + 0.6, { eyes: "normal" });
        // cada resposta é uma pista
        tl.to("#f12-c0, #f12-c1, #f12-c2, #f12-c3, #f12-c4, #f12-c5", { opacity: 0.3, duration: 0.3 }, K.essas - 0.3);
        tl.fromTo("#f12-stamp", { scale: 2, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in" }, K.alarme - 0.2);
        R.shake(tl, "#f12-stamp", K.alarme + 0.12, 0.25, 6);
        R.face(tl, p, K.alarme + 0.3, { eyes: "happy" });
        R.pose(tl, p, K.alarme - 0.2, 0.4, { shF: -150, elF: -20 }, "back.out(2)");
      },
      sfx: [
        ...[k.com - 0.4, k.muda, k.desce, k.noite, k.sono, k.medo].map((t) => ({ name: "click-soft", t: t + 0.05, vol: 0.5 })),
        { name: "impact-bass-1", t: k.alarme + 0.1, vol: 0.45 },
      ],
    };
  },
};
