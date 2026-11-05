// F27 — Quando pensar em cirurgia + o que acelera / atrasa a melhora
export default {
  speakers: { pablo: "f27p" },
  extra: 2.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = { cir: w(0, "cirurgia"), cauda: w(0, "cauda"), fraq: w(0, "fraqueza"), dor: w(0, "dor"), seis: w(0, "seis"), trat: w(0, "tratamento"), end: lines[0].end };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "pop", t: k.cauda, vol: 0.4 }, { name: "pop", t: k.fraq, vol: 0.4 }, { name: "pop", t: k.dor, vol: 0.4 },
      { name: "whoosh-short", t: k.end + 0.1, vol: 0.4 },
    ];
    const scal = `<svg width="64" height="40" viewBox="-40 -20 80 40"><path d="M-30 6 L22 -12 L34 -4 L-22 16 Z" fill="#DCE3E6" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/><rect x="-40" y="8" width="26" height="11" rx="4" fill="${C.ink}" transform="rotate(-20 -27 13)"/></svg>`;
    const card = (i, t, s) => `<div id="f27-c${i}" class="abs card" style="left:${110 + i * 400}px;top:220px;width:370px;min-height:230px;padding:24px;opacity:0">
      <div style="display:flex;align-items:center;gap:10px">${scal}<div class="title" style="font-size:22px;color:${C.pain}">CIRURGIA SE...</div></div>
      <div class="title" style="font-size:40px;margin-top:14px;line-height:1.1">${t}</div>
      <div class="label" style="font-size:26px;margin-top:8px;opacity:0.8">${s}</div></div>`;
    const list = (id, title, color, items) => `<div id="${id}" class="abs card" style="opacity:0;top:540px;width:570px;padding:22px 30px;border-color:${C.ink};background:${color}">
      <div class="title" style="font-size:40px;color:${C.ink}">${title}</div>
      ${items.map((x) => `<div class="label" style="font-size:34px;margin-top:8px">• ${x}</div>`).join("")}</div>`;
    return {
      k,
      sfx,
      css: `
        #f27-h { left:110px; top:80px; font-size:72px; }
        #f27-h span { color:${C.pain}; }
        #f27-acc { left:110px; }
        #f27-atr { left:790px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1650" cy="560" r="260" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f27-pw"><g transform="translate(1680,667) scale(-1.1,1.1)">${human("f27p", "pablo")}</g></g>
    </svg>
    <div id="f27-h" class="abs title">E A <span>CIRURGIA</span>?</div>
    ${card(0, "Cauda equina", "emergência")}
    ${card(1, "Fraqueza que piora", "perda de força progressiva")}
    ${card(2, "Dor que incapacita", "sem melhora após 6–12 semanas")}
    ${list("f27-acc", "ACELERA", C.good, ["se mexer", "dormir bem", "não fumar"])}
    ${list("f27-atr", "ATRASA", C.pain, ["repouso total", "medo de se mexer", "sedentarismo"])}`,
      js: function (tl, K, R) {
        const p = "f27p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.slideIn(tl, "#f27-h", 0.05, 0.5, -300);
        tl.fromTo("#f27-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        [K.cauda, K.fraq, K.dor].forEach((t, i) => {
          R.pop(tl, `#f27-c${i}`, t - 0.1, 0.45);
          R.pose(tl, p, t - 0.1, 0.35, { shF: -95 + i * 8, elF: -10 }, "back.out(1.6)");
        });
        R.pose(tl, p, K.seis, 0.4, { shF: -40, elF: -60 });
        // acelera / atrasa
        R.slideIn(tl, "#f27-acc", K.end + 0.1, 0.5, -200);
        R.slideIn(tl, "#f27-atr", K.end + 0.5, 0.5, 200);
        R.face(tl, p, K.end + 0.1, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
