// F17 — Bandeiras vermelhas continuam valendo (tom sério, sem piadas)
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      at: w(0, "atenção"), ur: w(0, "fraqueza"), dor: w(0, "duas"), fr: w(0, "barriga"),
      peso: w(0, "peso"), feb: w(0, "febre"), can: w(0, "câncer"), em: w(0, "avaliação"), hosp: w(0, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const RED = "#D64534";
    // ícones simples
    const ic = {
      drop: `<path d="M0 -34 Q24 -4 18 12 Q12 28 0 28 Q-12 28 -18 12 Q-24 -4 0 -34Z" fill="${C.sky}" ${st}/><path d="M-30 30 L30 -30" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`,
      legs: `<path d="M-22 -36 L-22 34 M22 -36 L22 34" fill="none" ${st} stroke-width="14"/><path d="M-34 -6 L-10 -6 M10 -6 L34 -6" stroke="#B79CF2" stroke-width="7" stroke-linecap="round"/>`,
      belly: `<ellipse cx="0" cy="0" rx="34" ry="30" fill="#F2C59A" ${st}/><path d="M-4 -18 L-14 2 L2 2 L-8 22" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
      saddle: `<path d="M-40 -4 Q-30 -26 -14 -14 Q0 -4 14 -14 Q30 -26 40 -4 Q30 22 0 24 Q-30 22 -40 -4Z" fill="#C98A4B" ${st}/><path d="M-6 24 L-6 38 M6 24 L6 38" ${st}/>`,
      weak: `<path d="M-16 -36 L-16 20 L14 20" fill="none" ${st} stroke-width="12"/><path d="M28 -30 L28 18 M16 6 L28 20 L40 6" fill="none" stroke="${RED}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
      fever: `<rect x="-8" y="-36" width="16" height="50" rx="8" fill="#fff" ${st}/><circle cx="0" cy="22" r="14" fill="${RED}" ${st}/><rect x="-3" y="-18" width="6" height="36" fill="${RED}"/>`,
      scale: `<rect x="-34" y="-24" width="68" height="52" rx="12" fill="#fff" ${st}/><path d="M-16 -8 Q0 -20 16 -8" fill="none" ${st}/><path d="M0 -8 L8 -16" ${st}/><path d="M-8 14 L8 14" ${st}/>`,
      ribbon: `<path d="M0 -10 Q-22 -40 -6 -40 Q0 -40 0 -26 Q0 -40 6 -40 Q22 -40 0 -10 L-20 34 M0 -10 L20 34" fill="none" stroke="${RED}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
      bolt: `<path d="M10 -38 L-16 4 L2 4 L-8 38 L20 -8 L2 -8 Z" fill="${C.sun}" ${st}/>`,
    };
    const sign = (id, x, y, wd, ht, icon, text, size) => `<div id="${id}" class="abs f16-sign" style="left:${x}px;top:${y}px;width:${wd}px;height:${ht}px;opacity:0">
        <svg width="74" height="74" viewBox="-45 -45 90 90" style="flex:none">${icon}</svg><div class="label" style="font-size:${size}px;line-height:1.1">${text}</div></div>`;
    return {
      k,
      bg: "#F7DCD6",
      css: `
        #root .f16-sign { display:flex; align-items:center; gap:14px; padding:12px 18px; background:#fff; border:6px solid ${RED}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; }
        #f16-em { left:500px; top:730px; width:1300px; height:96px; background:${RED}; color:#fff; border:7px solid ${C.ink}; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:40px; box-shadow:8px 8px 0 ${C.ink}; }
        #f16-ce { left:500px; top:66px; font-size:36px; color:${RED}; }
        #f16-av { left:500px; top:772px; font-size:40px; color:${C.ink}; }
        #f16-av b { color:${RED}; }
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
      <path id="f16-brace" d="M500 620 L500 640 L1800 640 L1800 620" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round" opacity="0"/>
    </svg>
    <div id="f16-ce" class="abs label" style="opacity:0">SINAIS DE ALERTA</div>
    ${sign("f16-a0", 500, 120, 410, 190, ic.weak, "Fraqueza<br>na perna", 34)}
    ${sign("f16-a1", 945, 120, 410, 190, ic.legs, "Nas duas pernas,<br>piorando", 31)}
    ${sign("f16-a2", 1390, 120, 410, 190, ic.belly, "Dor forte na<br>barriga ou pelve", 31)}
    <div id="f16-em" class="abs title" style="opacity:0">AVALIAÇÃO MÉDICA: INVESTIGAR OUTRAS CAUSAS</div>
    ${sign("f16-b1", 500, 400, 410, 190, ic.scale, "Perda de peso<br>sem motivo", 32)}
    ${sign("f16-b0", 945, 400, 410, 190, ic.fever, "Febre", 38)}
    ${sign("f16-b2", 1390, 400, 410, 190, ic.ribbon, "Histórico<br>de câncer", 34)}`,
      js: function (tl, K, R) {
        // placa de PARE entra grande no centro e depois vai para a esquerda
        const t0 = Math.max(0, K.at - 0.3);
        tl.fromTo("#f16-stop", { x: 700, y: 240, opacity: 1 }, { x: 700, y: 240, opacity: 1, duration: 0.01 }, t0);
        tl.fromTo("#f16-stop-in", { rotation: -25, scale: 0.5, svgOrigin: "0 0" }, { rotation: 0, scale: 1.5, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.8)" }, t0);
        tl.to("#f16-stop", { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, K.ur - 0.75);
        tl.to("#f16-stop-in", { scale: 1, svgOrigin: "0 0", duration: 0.6, ease: "power3.inOut" }, K.ur - 0.75);
        tl.to("#f16-pole", { opacity: 1, duration: 0.3 }, K.ur - 0.2);
        // sinais da cauda equina
        R.fadeIn(tl, "#f16-ce", K.ur - 0.2, 0.3);
        R.pop(tl, "#f16-a0", K.ur - 0.15, 0.4, 0.6);
        R.pop(tl, "#f16-a1", K.dor - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-a2", K.fr - 0.1, 0.4, 0.6);
        // EMERGÊNCIA: pulsa algumas vezes (finito)
        R.pop(tl, "#f16-em", K.em - 0.1, 0.4, 0.7);
        tl.to("#f16-em", { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.hosp);
        tl.to("#f16-stop-in", { scale: 1.08, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.hosp);
        // outros sinais de alerta
        R.pop(tl, "#f16-b0", K.feb - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-b1", K.peso - 0.15, 0.4, 0.6);
        R.pop(tl, "#f16-b2", K.can - 0.2, 0.4, 0.6);
        tl.to("#f16-brace", { opacity: 1, duration: 0.3 }, K.em - 0.3);
      },
      sfx: [
        { name: "impact-bass-1", t: Math.max(0, k.at - 0.3), vol: 0.55 },
        { name: "whoosh-short", t: k.ur - 0.75, vol: 0.35 },
        { name: "impact-bass-2", t: k.em - 0.1, vol: 0.45 },
      ],
    };
  },
};
