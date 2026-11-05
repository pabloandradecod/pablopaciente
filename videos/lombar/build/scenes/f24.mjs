// F24 — Cuidados que ajudam: 4 cartões e o Alarmildo abaixando o volume
export default {
  speakers: { alarmildo: "f24a" },
  extra: 0.4,
  build(ctx) {
    const { C, alarmildo, w, lines } = ctx;
    const k = {
      vol: w(0, "volume"), cal: w(0, "calor"), dor: w(0, "dormir"), pau: w(0, "pausas"), ter: w(0, "terapia"), qui: w(0, "quiropraxia"), exe: w(0, "exercício"),
      a0: lines[1].start, a1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const card = (i, x, y, title, sub, icon) => `<div id="f24-c${i}" class="abs card" style="left:${x}px;top:${y}px;width:470px;height:240px;padding:22px 26px;display:flex;gap:20px;align-items:center;opacity:0">
        <svg width="120" height="120" viewBox="-60 -60 120 120" style="flex:none"><circle r="56" fill="${["#FFE1D6", "#E3E7FF", "#E2F7EE", "#FFF1CF"][i]}" stroke="${C.ink}" stroke-width="5"/>${icon}</svg>
        <div><div class="title" style="font-size:38px;line-height:1.05">${title}</div><div class="label" style="font-size:26px;margin-top:8px;color:#3B5A63">${sub}</div></div></div>`;
    const icons = [
      `<rect x="-30" y="-6" width="60" height="34" rx="12" fill="${C.pain}" ${st}/><path d="M-14 -16 Q-6 -28 -14 -40 M2 -16 Q10 -28 2 -40 M18 -16 Q26 -28 18 -40" fill="none" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/>`,
      `<path d="M14 -30 A30 30 0 1 0 30 12 A24 24 0 1 1 14 -30Z" fill="#8E6CD8" ${st}/><text x="-22" y="-14" font-family="Montserrat" font-weight="900" font-size="20" fill="${C.ink}">z</text><text x="-8" y="-30" font-family="Montserrat" font-weight="900" font-size="16" fill="${C.ink}">z</text>`,
      `<circle r="34" fill="#fff" ${st}/><path d="M0 0 L0 -22 M0 0 L16 8" ${st} fill="none"/><path d="M-44 40 L44 40" ${st}/>`,
      `<path d="M-30 20 Q-34 -12 -10 -16 L-10 -34 Q-10 -42 -2 -42 Q6 -42 6 -34 L6 -14 Q30 -14 30 12 Q30 30 8 34 L-14 34 Q-28 32 -30 20Z" fill="${C.skinB}" ${st}/>`,
    ];
    return {
      k,
      css: `
        #f24-h { left:90px; top:70px; font-size:66px; }
        #f24-h span { color:${C.good}; }
        #f24-vlab { left:1620px; top:118px; width:200px; text-align:center; font-size:26px; }
        #f24-calm { left:1180px; top:150px; padding:12px 22px; font-size:32px; background:${C.good}; color:#fff; transform: rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1440" cy="620" r="250" fill="#F6E0E6"/>
      <g id="f24-aw"><g transform="translate(1440,870) scale(1.35)">${alarmildo("f24a")}</g></g>
      <!-- medidor de volume -->
      <rect x="1680" y="200" width="80" height="560" rx="20" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
      <g id="f24-bars">${Array.from({ length: 8 }, (_, i) => `<rect id="f24-b${i}" x="1694" y="${700 - i * 64}" width="52" height="50" rx="10" fill="${i < 3 ? C.good : i < 6 ? C.sun : C.pain}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
      <g id="f24-zz" opacity="0"><text x="1530" y="430" font-family="Montserrat" font-weight="900" font-size="54" fill="${C.ink}">z</text><text x="1570" y="380" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">z</text></g>
    </svg>
    <div id="f24-h" class="abs title">Cuidados que <span>ajudam</span></div>
    <div id="f24-vlab" class="abs label">VOLUME DO ALARME</div>
    ${card(0, 90, 190, "Calor local", "na crise", icons[0])}
    ${card(1, 600, 190, "Dormir bem", "sono em dia", icons[1])}
    ${card(2, 90, 470, "Pausas", "a cada 30–40 min sentado", icons[2])}
    ${card(3, 600, 470, "Terapia manual e quiropraxia", "aliviam, junto com o exercício", icons[3])}
    <div id="f24-calm" class="abs title card" style="opacity:0">MAIS CALMO!</div>`,
      js: function (tl, K, R) {
        const a = "f24a";
        R.face(tl, a, 0, { eyes: "wide", mouth: "open" });
        R.setPose(tl, a, 0, { armF: -150, armB: 150 });
        R.slideIn(tl, "#f24-h", 0.05, 0.5, -300);
        // alarme tocando forte no começo
        tl.fromTo("#f24a-rays", { opacity: 1 }, { opacity: 0.15, duration: 0.14, yoyo: true, repeat: 13, ease: "none" }, 0.1);
        R.shake(tl, "#f24a-body", 0.1, 1.6, 4);
        // a cada cuidado, um cartão entra e o volume cai
        const ts = [K.cal, K.dor, K.pau, K.ter];
        ts.forEach((t, i) => {
          R.pop(tl, `#f24-c${i}`, t - 0.1, 0.45, 0.5);
          [7 - i * 2, 6 - i * 2].forEach((b) => b >= 0 && tl.to(`#f24-b${b}`, { opacity: 0.12, duration: 0.25 }, t + 0.1));
          tl.to("#f24a-rays", { opacity: 0.9 - i * 0.22, duration: 0.3 }, t + 0.1);
        });
        R.face(tl, a, K.cal, { eyes: "normal", mouth: "flat" });
        R.pose(tl, a, K.dor, 0.5, { armF: -60, armB: 60 });
        R.face(tl, a, K.pau, { eyes: "normal", mouth: "smile" });
        R.pose(tl, a, K.ter, 0.5, { armF: -10, armB: 10 });
        tl.fromTo("#f24-c3", { boxShadow: "10px 10px 0 #013E4C" }, { boxShadow: "10px 10px 0 #3DD9A4", duration: 0.3 }, K.exe);
        // Alarmildo relaxa
        tl.to("#f24a-rays", { opacity: 0, duration: 0.4 }, K.a0 - 0.3);
        R.face(tl, a, K.a0 - 0.2, { eyes: "happy" });
        R.squash(tl, "#f24a-body", K.a0);
        R.pop(tl, "#f24-calm", K.a0 + 0.4, 0.4);
        R.face(tl, a, K.a1 + 0.1, { eyes: "closed", mouth: "smile" });
        tl.to("#f24-zz", { opacity: 1, duration: 0.3 }, K.a1 + 0.15);
        tl.fromTo("#f24-zz", { y: 0 }, { y: -30, duration: 0.6, ease: "sine.out" }, K.a1 + 0.15);
      },
      sfx: [
        { name: "error", t: 0.15, vol: 0.3 },
        { name: "pop", t: k.cal - 0.1, vol: 0.35 },
        { name: "pop", t: k.dor - 0.1, vol: 0.35 },
        { name: "pop", t: k.pau - 0.1, vol: 0.35 },
        { name: "pop", t: k.ter - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.a0 + 0.4, vol: 0.35 },
      ],
    };
  },
};
