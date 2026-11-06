// F9 — Quem tem e o que sente: 40+, braço acima da cabeça, arremesso, diabetes, fumo; mapa de dor (lateral do ombro até o meio do braço, não passa do cotovelo); o que piora; Seu Zé se reconhece
export default {
  speakers: { ze: "f09z" },
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      quar: w(0, "quarenta"), trab: w(0, "trabalha"), trei: w(0, "treina"), dia: w(0, "diabetes"), fuma: w(0, "fuma"),
      dor: w(0, "dor"), lado: w(0, "lado"), meio: w(0, "meio"), cot: w(0, "cotovelo"), piora: w(0, "Piora"), lev: w(0, "levantar"), deit: w(0, "deitar"), tras: w(0, "trás"),
      z0: lines[1].start, z1: lines[1].end, pint: w(1, "Pintor"), sess: w(1, "sessenta"), sou: w(1, "sou"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const card = (i, label, svg) => `<div id="f09-k${i}" class="abs card" style="left:${80 + (i % 2) * 260}px;top:${150 + Math.floor(i / 2) * 240}px;width:235px;padding:10px 8px;text-align:center;opacity:0">
      <svg width="100" height="100" viewBox="-55 -55 110 110">${svg}</svg><div class="label" style="font-size:25px;line-height:1.1">${label}</div></div>`;
    const check = (i, x, y) => `<g id="f09-ok${i}" opacity="0"><circle cx="${x}" cy="${y}" r="26" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M${x - 12} ${y} L${x - 3} ${y + 10} L${x + 14} ${y - 10}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    const mini = (i, label, svg) => `<div id="f09-w${i}" class="f09-mini" style="opacity:0"><svg width="110" height="110" viewBox="-55 -55 110 110">${svg}</svg><div class="label">${label}</div></div>`;
    return {
      k,
      css: `
        #f09-h { left:80px; top:40px; font-size:58px; }
        #f09-h span { color:${C.pain}; }
        #f09-map { left:1230px; top:110px; width:600px; padding:16px 18px; text-align:center; }
        #f09-map .t { font-size:30px; }
        #f09-no { left:1290px; top:560px; padding:10px 18px; font-size:28px; color:${C.pain}; transform: rotate(-3deg); }
        #f09-wr { left:1180px; top:660px; width:680px; padding:14px 16px; text-align:center; }
        #f09-wr .t { font-size:30px; color:${C.pain}; }
        #f09-wr .row { display:flex; justify-content:space-around; }
        #root .f09-mini { width:200px; } #root .f09-mini .label { font-size:22px; line-height:1.1; }
        #f09-th { left:640px; top:120px; width:480px; padding:14px 18px; text-align:center; font-size:32px; border-radius:40px; }
        #f09-th b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <circle cx="880" cy="640" r="230" fill="${C.wall}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <g id="f09-z-wrap"><g transform="translate(860,690) scale(1.2)">${human("f09z", "ze")}</g></g>
      ${check(0, 1000, 520)}${check(1, 1000, 600)}
    </svg>
    <div id="f09-h" class="abs title" style="opacity:0">Quem tem e <span>o que sente</span></div>
    ${card(0, "Depois dos 40", `<rect x="-40" y="-34" width="80" height="72" rx="10" fill="#fff" ${st}/><rect x="-40" y="-34" width="80" height="20" fill="${C.pain}" ${st}/><text x="0" y="28" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">40+</text>`)}
    ${card(1, "Braço acima da cabeça", `<circle cx="-6" cy="-6" r="12" fill="${C.ink}"/><path d="M-6 8 L-6 40 M-6 14 L14 -40 M-6 14 L-26 30 M-6 40 L-20 52 M-6 40 L8 52" ${st} fill="none" stroke-width="7"/><rect x="2" y="-52" width="34" height="14" rx="5" fill="#8FD3C6" ${st} stroke-width="4"/>`)}
    ${card(2, "Arremesso, natação, vôlei", `<circle r="34" fill="#fff" ${st}/><path d="M-32 -12 Q0 6 32 -12 M-16 -30 Q-6 0 -18 32 M16 -30 Q6 0 18 32" fill="none" stroke="${C.ink}" stroke-width="4"/>`)}
    ${card(3, "Diabetes", `<path d="M0 -40 Q30 0 30 16 Q30 42 0 42 Q-30 42 -30 16 Q-30 0 0 -40Z" fill="${C.pain}" ${st}/>`)}
    ${card(4, "Fumar", `<rect x="-44" y="-6" width="70" height="16" rx="4" fill="#fff" ${st} stroke-width="4"/><rect x="26" y="-6" width="18" height="16" rx="3" fill="#FF8A3D" ${st} stroke-width="4"/><path d="M38 -16 Q30 -30 40 -40" fill="none" stroke="#9AA7AD" stroke-width="5"/><path d="M-50 -40 L50 40" stroke="${C.pain}" stroke-width="8"/>`)}
    <div id="f09-map" class="abs card" style="opacity:0">
      <div class="t title">Onde dói</div>
      <svg width="420" height="380" viewBox="-210 -40 420 380">
        <circle cx="0" cy="10" r="40" fill="${C.skinB}" ${st}/>
        <path d="M-80 70 Q0 50 80 70 L70 250 L-70 250 Z" fill="#7FB3D5" ${st}/>
        <path d="M-82 74 Q-112 80 -116 120 L-120 290 L-92 290 L-86 130" fill="${C.skinB}" ${st}/>
        <path d="M82 74 Q112 80 116 120 L120 290 L92 290 L86 130" fill="${C.skinB}" ${st}/>
        <g id="f09-zone" opacity="0"><path d="M84 72 Q122 80 126 124 L128 186 L90 186 L86 120 Z" fill="${C.pain}" opacity="0.55"/><circle cx="108" cy="104" r="16" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        <path id="f09-elb" d="M70 206 L200 206" stroke="${C.ink}" stroke-width="5" stroke-dasharray="10 8" opacity="0"/>
        <text id="f09-elt" x="130" y="236" text-anchor="start" font-family="Montserrat" font-weight="900" font-size="18" fill="${C.ink}" opacity="0">cotovelo</text>
      </svg>
    </div>
    <div id="f09-no" class="abs card title" style="opacity:0">NÃO costuma passar do cotovelo</div>
    <div id="f09-wr" class="abs card" style="opacity:0"><div class="t title">Piora ao...</div><div class="row">
      ${mini(0, "levantar o braço", `<circle cx="0" cy="-30" r="12" fill="${C.ink}"/><path d="M0 -16 L0 22 M0 -10 L22 -46 M0 -10 L-20 8 M0 22 L-14 46 M0 22 L14 46" ${st} fill="none" stroke-width="7"/>`)}
      ${mini(1, "deitar em cima", `<rect x="-50" y="10" width="100" height="20" rx="6" fill="#fff" ${st}/><circle cx="-30" cy="-4" r="14" fill="${C.skinB}" ${st}/><path d="M-16 0 Q20 -14 50 4 L50 10 L-16 10 Z" fill="#7FB3D5" ${st}/>`)}
      ${mini(2, "mão pra trás", `<circle cx="0" cy="-30" r="12" fill="${C.ink}"/><path d="M0 -16 L0 22 M0 -10 L-16 10 L4 18 M0 22 L-14 46 M0 22 L14 46" ${st} fill="none" stroke-width="7"/><rect x="6" y="12" width="20" height="14" rx="3" fill="#6B3E1E" ${st} stroke-width="3"/>`)}
    </div></div>
    <div id="f09-th" class="abs card label" style="opacity:0">pintor, sessenta e poucos... <b>sou eu!</b></div>`,
      js: function (tl, K, R) {
        const z = "f09z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.3, K.dur);
        R.rise(tl, "#f09-h", 0.1, 0.5);
        [K.quar, K.trab, K.trei, K.dia, K.fuma].forEach((t, i) => R.pop(tl, `#f09-k${i}`, t - 0.15, 0.4));
        // mapa de dor
        R.pop(tl, "#f09-map", K.dor - 0.2, 0.45);
        tl.set("#f09-zone", { opacity: 1 }, K.lado);
        tl.fromTo("#f09-zone path", { scaleY: 0.4, svgOrigin: "108 72" }, { scaleY: 1, svgOrigin: "108 72", duration: 0.6, ease: "power2.out" }, K.meio - 0.3);
        tl.fromTo("#f09-zone circle", { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 5 }, K.lado);
        tl.set("#f09-elb, #f09-elt", { opacity: 1 }, K.cot - 0.2);
        R.pop(tl, "#f09-no", K.cot, 0.4);
        R.face(tl, z, K.dor, { eyes: "normal", mouth: "flat" });
        // o que piora
        R.pop(tl, "#f09-wr", K.piora - 0.1, 0.45);
        [K.lev, K.deit, K.tras].forEach((t, i) => R.pop(tl, `#f09-w${i}`, t - 0.1, 0.35));
        R.pose(tl, z, K.lev, 0.4, { shF: -150, elF: -5 });
        R.face(tl, z, K.lev + 0.3, { eyes: "pain", mouth: "frown" });
        R.pose(tl, z, K.deit, 0.4, { shF: 10, elF: -10 });
        R.pose(tl, z, K.tras, 0.4, { shF: 50, elF: -90 });
        // Seu Zé se reconhece
        R.pose(tl, z, K.z0 - 0.2, 0.3, { shF: -60, elF: -120 }, "back.out(2)");
        R.face(tl, z, K.z0, { eyes: "wide", mouth: "open" });
        [K.pint, K.sess].forEach((t, i) => {
          tl.set(`#f09-ok${i}`, { opacity: 1 }, t + 0.1);
          tl.fromTo(`#f09-ok${i}`, { scale: 0, svgOrigin: `1000 ${520 + i * 80}` }, { scale: 1, svgOrigin: `1000 ${520 + i * 80}`, duration: 0.35, ease: "back.out(2.5)" }, t + 0.1);
        });
        R.pop(tl, "#f09-th", K.sou - 0.2, 0.4);
      },
      sfx: [
        { name: "pop", t: 0.1, vol: 0.3 },
        ...[k.quar, k.trab, k.trei, k.dia, k.fuma].map((t) => ({ name: "pop", t: t - 0.15, vol: 0.28 })),
        { name: "pop", t: k.dor - 0.2, vol: 0.3 },
        { name: "glitch-1", t: k.lado, vol: 0.22 },
        { name: "error", t: k.cot, vol: 0.25 },
        { name: "pop", t: k.piora - 0.1, vol: 0.3 },
        ...[k.pint, k.sess].map((t) => ({ name: "ping", t: t + 0.1, vol: 0.25 })),
      ],
    };
  },
};
