// F16 — Bandeiras vermelhas (tom sério): hérnia obturatória com intestino preso = EMERGÊNCIA; outros sinais pedem avaliação rápida
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "Atenção"), den: w(0, "dentro"), bar: w(0, "barriga"), vom: w(0, "vômitos"), eva: w(0, "evacuar"), her: w(0, "hérnia"),
      em: w(0, "emergência"), fra: w(0, "Fraqueza"), mas: w(0, "massa"), peso: w(0, "peso"), feb: w(0, "febre"), can: w(0, "câncer"), av: w(0, "avaliação"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    const ic = {
      thigh: `<rect x="-30" y="-36" width="24" height="72" rx="11" fill="#F2C59A" ${st}/><rect x="6" y="-36" width="24" height="72" rx="11" fill="#F2C59A" ${st}/><rect x="-10" y="-26" width="6" height="52" fill="#4FD1A5"/><path d="M-4 -40 L4 -40" stroke="${RED}" stroke-width="5"/>`,
      belly: `<ellipse cx="0" cy="4" rx="38" ry="32" fill="#F2C59A" ${st}/><path d="M-50 4 L-40 4 M40 4 L50 4 M0 -40 L0 -32" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>`,
      vomit: `<circle cx="0" cy="-2" r="32" fill="#CDEBB0" ${st}/><path d="M-14 -10 L-6 -10 M6 -10 L14 -10" ${st}/><path d="M-12 14 Q0 4 12 14" fill="none" ${st}/><path d="M24 -30 Q34 -40 30 -50" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>`,
      toilet: `<rect x="-26" y="-36" width="36" height="30" rx="6" fill="#fff" ${st}/><path d="M-32 -4 L30 -4 Q30 30 0 34 Q-32 30 -32 -4Z" fill="#fff" ${st}/><path d="M-40 -40 L40 40" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`,
      weak: `<path d="M-16 -36 L-16 20 L14 20" fill="none" ${st} stroke-width="12"/><path d="M28 -30 L28 18 M16 6 L28 20 L40 6" fill="none" stroke="${RED}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
      mass: `<path d="M-38 -20 Q-38 -40 0 -40 Q38 -40 38 -20 L26 30 L-26 30 Z" fill="${C.bone}" ${st}/><circle cx="6" cy="0" r="14" fill="${RED}" ${st}/>`,
      scale: `<rect x="-34" y="-24" width="68" height="52" rx="12" fill="#fff" ${st}/><path d="M-16 -8 Q0 -20 16 -8" fill="none" ${st}/><path d="M0 -8 L8 -16" ${st}/><path d="M-8 14 L8 14" ${st}/>`,
      fever: `<rect x="-8" y="-36" width="16" height="50" rx="8" fill="#fff" ${st}/><circle cx="0" cy="22" r="14" fill="${RED}" ${st}/><rect x="-3" y="-18" width="6" height="36" fill="${RED}"/>`,
      ribbon: `<path d="M0 -10 Q-22 -40 -6 -40 Q0 -40 0 -26 Q0 -40 6 -40 Q22 -40 0 -10 L-20 34 M0 -10 L20 34" fill="none" stroke="${RED}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    };
    const sign = (id, x, y, wd, ht, icon, text, size) => `<div id="${id}" class="abs f16-sign" style="left:${x}px;top:${y}px;width:${wd}px;height:${ht}px;opacity:0">
        <svg width="70" height="70" viewBox="-45 -45 90 90" style="flex:none">${icon}</svg><div class="label" style="font-size:${size}px;line-height:1.1">${text}</div></div>`;
    const X4 = (i) => 500 + i * 330; // 4 placas de 310
    const X5 = (i) => 500 + i * 264; // 5 placas de 248
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f16-sign { display:flex; align-items:center; gap:10px; padding:10px 14px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #f16-ho { left:500px; top:58px; font-size:36px; color:${RED}; }
        #f16-em { left:500px; top:300px; width:1300px; height:96px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:42px; box-shadow:8px 8px 0 ${C.ink}; }
        #f16-ot { left:500px; top:440px; font-size:32px; color:${C.ink}; }
        #f16-av { left:500px; top:700px; width:1300px; height:84px; background:${C.sun}; border:7px solid ${C.ink}; border-radius:22px; display:flex; align-items:center; justify-content:center; font-size:36px; box-shadow:8px 8px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="20" y="20" width="1880" height="1040" rx="30" fill="none" stroke="${RED}" stroke-width="12" opacity="0.5"/>
      <g id="f16-stop" opacity="0"><g transform="translate(260,300)"><g id="f16-stop-in">
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 190).toFixed(1)} ${(Math.sin(a) * 190).toFixed(1)}`; }).join(" ")} Z" fill="${RED}" stroke="${C.ink}" stroke-width="10" stroke-linejoin="round"/>
        <path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 166).toFixed(1)} ${(Math.sin(a) * 166).toFixed(1)}`; }).join(" ")} Z" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>
        <text x="0" y="30" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="96" fill="#fff">PARE</text>
      </g></g></g>
      <rect id="f16-pole" opacity="0" x="250" y="480" width="20" height="340" fill="${C.grey}" stroke="${C.ink}" stroke-width="6"/>
      <path id="f16-plus" d="M500 278 L1800 278" stroke="${RED}" stroke-width="6" stroke-linecap="round" stroke-dasharray="4 14" opacity="0"/>
    </svg>
    <div id="f16-ho" class="abs label" style="opacity:0">HÉRNIA OBTURATÓRIA COM O INTESTINO PRESO?</div>
    ${sign("f16-a0", X4(0), 110, 310, 150, ic.thigh, "Dor por dentro<br>da coxa", 28)}
    ${sign("f16-a1", X4(1), 110, 310, 150, ic.belly, "Barriga<br>inchada", 30)}
    ${sign("f16-a2", X4(2), 110, 310, 150, ic.vomit, "Vômitos", 32)}
    ${sign("f16-a3", X4(3), 110, 310, 150, ic.toilet, "Sem conseguir<br>evacuar", 28)}
    <div id="f16-em" class="abs title" style="opacity:0">EMERGÊNCIA: PRONTO-SOCORRO AGORA!</div>
    <div id="f16-ot" class="abs label" style="opacity:0">OUTROS SINAIS DE ALERTA</div>
    ${sign("f16-b0", X5(0), 490, 248, 170, ic.weak, "Fraqueza<br>piorando", 26)}
    ${sign("f16-b1", X5(1), 490, 248, 170, ic.mass, "Massa<br>na pelve", 26)}
    ${sign("f16-b2", X5(2), 490, 248, 170, ic.scale, "Perda de<br>peso sem<br>motivo", 24)}
    ${sign("f16-b3", X5(3), 490, 248, 170, ic.fever, "Febre", 30)}
    ${sign("f16-b4", X5(4), 490, 248, 170, ic.ribbon, "Histórico<br>de câncer", 26)}
    <div id="f16-av" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA RÁPIDA</div>`,
      js: function (tl, K, R) {
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f16-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f16-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        tl.to("#f16-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, K.den - 0.75);
        tl.to("#f16-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, K.den - 0.75);
        tl.to("#f16-pole", { opacity: 1, duration: 0.3 }, K.den - 0.2);
        // os 4 sinais juntos da hérnia obturatória
        R.fadeIn(tl, "#f16-ho", K.den - 0.2, 0.3);
        R.pop(tl, "#f16-a0", K.den - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-a1", K.bar - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-a2", K.vom - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-a3", K.eva - 0.2, 0.4, 0.6);
        tl.to("#f16-plus", { opacity: 1, duration: 0.3 }, K.her - 0.2);
        tl.to("#f16-ho", { scale: 1.06, transformOrigin: "0% 50%", duration: 0.2, yoyo: true, repeat: 1 }, K.her);
        // EMERGÊNCIA
        R.pop(tl, "#f16-em", K.em - 0.15, 0.4, 0.7);
        tl.to("#f16-em", { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.em + 0.3);
        tl.to("#f16-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.em + 0.3);
        // outros sinais
        R.fadeIn(tl, "#f16-ot", K.fra - 0.3, 0.3);
        R.pop(tl, "#f16-b0", K.fra - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-b1", K.mas - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-b2", K.peso - 0.2, 0.4, 0.6);
        R.pop(tl, "#f16-b3", K.feb - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-b4", K.can - 0.2, 0.4, 0.6);
        R.pop(tl, "#f16-av", K.av - 0.1, 0.4, 0.7);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        { name: "whoosh-short", t: k.den - 0.75, vol: 0.35 },
        { name: "impact-bass-2", t: k.em - 0.15, vol: 0.5 },
        { name: "pop", t: k.av - 0.1, vol: 0.35 },
      ],
    };
  },
};
