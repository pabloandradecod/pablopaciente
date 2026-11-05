// F20 — Exercício 2: borboleta (sentado, solas dos pés juntas, joelhos abrem devagar) — Seu Zé visto de frente + borboleta
export default {
  extra: 0.8,
  build(ctx) {
    const { C, w, lines } = ctx;
    const k = {
      dois: w(0, "Dois"), borb: w(0, "borboleta"), sent: w(0, "Sentado"), junta: w(0, "junta"), solas: w(0, "solas"),
      joel: w(0, "joelhos"), abr: w(0, "abrirem"), dev: w(0, "devagar"), vinte: w(0, "Vinte"), tres: w(0, "três"), forte: w(0, "forte"),
      end: lines[0].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "sparkle", t: k.borb, vol: 0.35 },
      { name: "pop", t: k.solas, vol: 0.35 },
      { name: "pop", t: k.vinte, vol: 0.35 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const skin = "#F2C59A";
    // perna vista de frente: quadril (0,0) → joelho → pé perto do centro
    const leg = (side) => {
      const s = side === "L" ? -1 : 1;
      return `<path d="M0 0 L${s * 170} 70 L${-s * 30} 150" fill="none" stroke="${C.ink}" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M0 0 L${s * 170} 70 L${-s * 30} 150" fill="none" stroke="${C.brown}" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="${-s * 34}" cy="160" rx="24" ry="36" fill="#4A2E1A" ${st} transform="rotate(${s * 10} ${-s * 34} 160)"/>`;
    };
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f20-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f20-head { left:110px; top:70px; font-size:84px; }
        #f20-head span { color:${C.good}; }
        #f20-card { left:1300px; top:150px; width:520px; padding:26px 32px; }
        #f20-card .t { font-size:42px; }
        #f20-card .row { font-size:31px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.1; }
        #f20-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f20-stop { left:1360px; top:690px; width:460px; padding:16px 20px; font-size:27px; white-space:nowrap; background:${C.pain}; color:#fff; text-align:center; }
        #f20-stop b { font-size:34px; display:block; }
        #f20-view { left:120px; top:200px; padding:8px 16px; font-size:26px; }
        #f20-timer { left:1060px; top:220px; width:190px; height:120px; border-radius:60px; background:${C.sun}; border:7px solid ${C.ink}; font-size:42px; display:flex; align-items:center; justify-content:center; white-space:nowrap; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="760" fill="${C.wall}"/>
      <rect x="0" y="760" width="1920" height="320" fill="${C.floor}"/>
      <line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <ellipse cx="700" cy="800" rx="420" ry="46" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <!-- Seu Zé sentado, visto de frente -->
      <g id="f20-zw">
        <g transform="translate(700,640)">
          <g transform="translate(-40,0)"><g id="f20-legL">${leg("L")}</g></g>
          <g transform="translate(40,0)"><g id="f20-legR">${leg("R")}</g></g>
          <rect x="-95" y="-20" width="190" height="50" rx="22" fill="${C.brown}" ${st}/>
          <rect x="-105" y="-240" width="210" height="240" rx="70" fill="${C.blue}" ${st}/>
          <path d="M-60 -200 L60 -200 M-80 -150 L80 -150 M-90 -100 L90 -100 M-90 -50 L90 -50" stroke="#fff" stroke-width="4" opacity="0.3"/>
          <path d="M-100 -200 Q-150 -120 -150 -40 Q-150 0 -120 20" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/>
          <path d="M-100 -200 Q-150 -120 -150 -40 Q-150 0 -120 20" fill="none" stroke="${C.blue}" stroke-width="28" stroke-linecap="round"/>
          <path d="M100 -200 Q150 -120 150 -40 Q150 0 120 20" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/>
          <path d="M100 -200 Q150 -120 150 -40 Q150 0 120 20" fill="none" stroke="${C.blue}" stroke-width="28" stroke-linecap="round"/>
          <circle cx="-118" cy="26" r="20" fill="${skin}" ${st}/><circle cx="118" cy="26" r="20" fill="${skin}" ${st}/>
          <g id="f20-headw"><g transform="translate(0,-310)">
            <rect x="-22" y="40" width="44" height="34" fill="${skin}" ${st}/>
            <circle cx="0" cy="0" r="72" fill="${skin}" ${st}/>
            <ellipse cx="-74" cy="6" rx="14" ry="20" fill="${skin}" ${st}/><ellipse cx="74" cy="6" rx="14" ry="20" fill="${skin}" ${st}/>
            <path d="M-72 -20 Q-80 20 -60 44 M72 -20 Q80 20 60 44" fill="none" stroke="#C9C9C9" stroke-width="14" stroke-linecap="round"/>
            <path d="M-38 -26 L-14 -24 M14 -24 L38 -26" stroke="${C.grey}" stroke-width="8" stroke-linecap="round"/>
            <g id="f20-eo"><circle cx="-26" cy="-4" r="9" fill="${C.ink}"/><circle cx="26" cy="-4" r="9" fill="${C.ink}"/></g>
            <g id="f20-ec" opacity="0"><path d="M-36 -4 Q-26 4 -16 -4 M16 -4 Q26 4 36 -4" fill="none" ${st} stroke-width="6"/></g>
            <path d="M-34 26 Q0 12 34 26 Q24 36 0 32 Q-24 36 -34 26 Z" fill="#C9C9C9" stroke="${C.ink}" stroke-width="5"/>
            <path d="M-18 44 Q0 56 18 44" fill="none" ${st} stroke-width="6"/>
          </g></g>
        </g>
      </g>
      <!-- seta de abrir -->
      <g id="f20-arr" opacity="0"><path d="M450 640 Q400 690 420 740" fill="none" ${st} stroke-dasharray="14 10"/><path d="M950 640 Q1000 690 980 740" fill="none" ${st} stroke-dasharray="14 10"/></g>
      <!-- borboleta -->
      <g transform="translate(1060,560)"><g id="f20-bf" opacity="0">
        <g id="f20-wL"><path d="M0 0 Q-70 -80 -90 -20 Q-96 20 0 0 Z M0 0 Q-60 70 -30 80 Q0 70 0 0 Z" fill="${C.sun}" ${st} stroke-width="5"/><circle cx="-50" cy="-28" r="10" fill="${C.pain}"/></g>
        <g id="f20-wR"><path d="M0 0 Q70 -80 90 -20 Q96 20 0 0 Z M0 0 Q60 70 30 80 Q0 70 0 0 Z" fill="${C.sun}" ${st} stroke-width="5"/><circle cx="50" cy="-28" r="10" fill="${C.pain}"/></g>
        <rect x="-8" y="-40" width="16" height="100" rx="8" fill="${C.ink}"/>
        <path d="M-4 -40 Q-14 -66 -26 -70 M4 -40 Q14 -66 26 -70" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
      </g></g>
    </svg>
    <div id="f20-head" class="abs title">2. <span>BORBOLETA</span></div>
    <div id="f20-view" class="abs card label">visto de frente</div>
    <div id="f20-timer" class="abs title" style="opacity:0">20-30s</div>
    <div id="f20-card" class="abs card">
      <div class="t title">Borboleta</div>
      ${row(0, "Sentado")}
      ${row(1, "Solas dos pés juntas")}
      ${row(2, "Joelhos abrem devagar")}
      ${row(3, "<b>20 a 30 s · 3 vezes</b>", C.sun)}
      ${row(4, "Sem dor forte", C.pain)}
    </div>
    <div id="f20-stop" class="abs card label">Choque ou formigou mais?<b>Diminui</b></div>`,
      js: function (tl, K, R) {
        R.slideIn(tl, "#f20-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f20-card", 0.2, 0.55, 400);
        R.pop(tl, "#f20-stop", 0.6, 0.4);
        R.fadeIn(tl, "#f20-view", 0.4, 0.3);
        // pernas começam mais fechadas (joelhos altos)
        tl.set("#f20-legL", { rotation: 22, svgOrigin: "0 0" }, 0);
        tl.set("#f20-legR", { rotation: -22, svgOrigin: "0 0" }, 0);
        tl.fromTo("#f20-zw", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }, K.sent - 0.2);
        [K.sent, K.solas, K.joel, K.vinte, K.forte].forEach((t, i) => tl.fromTo(`#f20-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t - 0.1));
        // borboleta aparece e bate as asas no ritmo
        R.pop(tl, "#f20-bf", K.borb, 0.45);
        tl.fromTo("#f20-wL", { scaleX: 1 }, { scaleX: 0.35, svgOrigin: "0 0", duration: 0.22, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.borb + 0.3);
        tl.fromTo("#f20-wR", { scaleX: 1 }, { scaleX: 0.35, svgOrigin: "0 0", duration: 0.22, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.borb + 0.3);
        // os joelhos abrem devagar e voltam (repetições finitas)
        R.pop(tl, "#f20-arr", K.abr - 0.2, 0.35);
        let t = K.abr;
        let n = 0;
        while (t < K.dur - 1.4 && n < 4) {
          tl.to("#f20-legL", { rotation: -6, svgOrigin: "0 0", duration: 1.2, ease: "sine.inOut" }, t);
          tl.to("#f20-legR", { rotation: 6, svgOrigin: "0 0", duration: 1.2, ease: "sine.inOut" }, t);
          tl.fromTo("#f20-wL", { scaleX: 1 }, { scaleX: 0.4, svgOrigin: "0 0", duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);
          tl.fromTo("#f20-wR", { scaleX: 1 }, { scaleX: 0.4, svgOrigin: "0 0", duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);
          tl.to("#f20-legL", { rotation: 16, svgOrigin: "0 0", duration: 1.0, ease: "sine.inOut" }, t + 1.5);
          tl.to("#f20-legR", { rotation: -16, svgOrigin: "0 0", duration: 1.0, ease: "sine.inOut" }, t + 1.5);
          t += 2.7; n++;
        }
        tl.set("#f20-eo", { opacity: 0 }, K.dev); tl.set("#f20-ec", { opacity: 1 }, K.dev);
        tl.set("#f20-eo", { opacity: 1 }, K.vinte); tl.set("#f20-ec", { opacity: 0 }, K.vinte);
        R.pop(tl, "#f20-timer", K.vinte - 0.1, 0.4);
        tl.fromTo("#f20-headw", { rotation: -3 }, { rotation: 3, svgOrigin: "0 -240", duration: 0.8, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.joel);
      },
    };
  },
};
