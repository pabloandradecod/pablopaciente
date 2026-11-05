// F7 — O que machuca o Glutinho: COMPRESSÃO (a Dona Faixa aperta em adução: cruzar pernas, apoiar num lado só, dormir com a perna caída) + SOBRECARGA súbita
export default {
  speakers: { faixa: "f07f" },
  build(ctx) {
    const { C, faixa, w, lines } = ctx;
    const k = {
      mach: w(0, "machuca"), duas: w(0, "Duas"), comp: w(0, "compressão"), cruza: w(0, "cruza"), aper: w(0, "aperta"),
      cruzar: w(0, "cruza", 1), apoi: w(0, "apoiado"), dorm: w(0, "dormir"), cai: w(0, "caída"),
      sobre: w(0, "sobrecarga"), rep: w(0, "repente"), cam: w(0, "caminhada"), esc: w(0, "escada"), corr: w(0, "corrida"),
      f0: lines[1].start, f1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const skin = "#E3A47E", jeans = "#3E5A8A", top = "#B07ED8";
    // ícones de frente (pelve + pernas), desenho simples
    const iconCross = `<g><rect x="-60" y="-110" width="120" height="70" rx="20" fill="${top}" ${st}/>
      <path d="M-30 -40 L30 70" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/><path d="M-30 -40 L30 70" stroke="${jeans}" stroke-width="28" stroke-linecap="round"/>
      <path d="M30 -40 L-30 70" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/><path d="M30 -40 L-30 70" stroke="${jeans}" stroke-width="28" stroke-linecap="round"/>
      <circle cx="-50" cy="-56" r="13" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>`;
    const iconHip = `<g><g transform="rotate(-12)"><rect x="-60" y="-110" width="120" height="70" rx="20" fill="${top}" ${st}/></g>
      <path d="M-34 -44 L-40 80" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/><path d="M-34 -44 L-40 80" stroke="${jeans}" stroke-width="28" stroke-linecap="round"/>
      <path d="M30 -56 L50 20 L40 80" stroke="${C.ink}" stroke-width="40" stroke-linecap="round" fill="none"/><path d="M30 -56 L50 20 L40 80" stroke="${jeans}" stroke-width="28" stroke-linecap="round" fill="none"/>
      <circle cx="-64" cy="-64" r="13" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>`;
    const iconSleep = `<g><rect x="-110" y="40" width="220" height="34" rx="10" fill="#fff" ${st}/>
      <rect x="-100" y="-30" width="70" height="60" rx="18" fill="${top}" ${st}/>
      <path d="M-30 10 L90 20" stroke="${C.ink}" stroke-width="36" stroke-linecap="round"/><path d="M-30 10 L90 20" stroke="${jeans}" stroke-width="24" stroke-linecap="round"/>
      <path d="M-30 -14 L60 30 L100 34" stroke="${C.ink}" stroke-width="36" stroke-linecap="round" fill="none"/><path d="M-30 -14 L60 30 L100 34" stroke="${jeans}" stroke-width="24" stroke-linecap="round" fill="none"/>
      <circle cx="-34" cy="-28" r="13" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>`;
    const card = (i, x, label, svg) => `<g id="f07-card${i}" opacity="0"><rect x="${x}" y="580" width="230" height="250" rx="22" fill="#fff" ${st}/><g transform="translate(${x + 115},700) scale(0.8)">${svg}</g><text x="${x + 115}" y="812" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">${label}</text></g>`;
    return {
      k,
      css: `
        #f07-title { left:90px; top:50px; font-size:54px; }
        #f07-title span { color:${C.pain}; }
        #f07-h1 { left:90px; top:150px; padding:10px 22px; font-size:38px; color:${C.pain}; }
        #f07-h2 { left:1180px; top:150px; padding:10px 22px; font-size:38px; color:#E08A00; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- diagrama da compressão -->
      <g id="f07-diag" opacity="0">
        <rect x="90" y="230" width="860" height="320" rx="26" fill="#FFF0EA" ${st}/>
        <path d="M150 520 Q200 380 360 360 Q520 350 600 420 Q640 470 640 520 Z" fill="${C.bone}" ${st}/>
        <text x="380" y="500" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">OSSO</text>
        <g id="f07-tendon"><path d="M200 380 Q380 300 560 360" stroke="${C.ink}" stroke-width="40" stroke-linecap="round" fill="none"/><path id="f07-tendon-c" d="M200 380 Q380 300 560 360" stroke="#F2E8D8" stroke-width="28" stroke-linecap="round" fill="none"/></g>
        <text x="470" y="430" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="#B9473E">tendão (Glutinho)</text>
        <text x="250" y="262" font-family="Nunito" font-weight="900" font-size="24" fill="#4F6886">Dona Faixa</text>
        <g id="f07-band"><path d="M150 300 Q380 220 650 290" stroke="${C.ink}" stroke-width="34" stroke-linecap="round" fill="none"/><path d="M150 300 Q380 220 650 290" stroke="#8FA7C2" stroke-width="22" stroke-linecap="round" fill="none"/></g>
        <g id="f07-arrow" opacity="0"><path d="M720 300 Q790 380 720 460" stroke="${C.pain}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M700 440 L722 470 L748 446" stroke="${C.pain}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="790" y="390" font-family="Nunito" font-weight="900" font-size="22" fill="${C.pain}">perna</text><text x="790" y="416" font-family="Nunito" font-weight="900" font-size="22" fill="${C.pain}">pra dentro</text></g>
      </g>
      ${card(0, 90, "cruzar as pernas", iconCross)}
      ${card(1, 365, "em pé num lado só", iconHip)}
      ${card(2, 640, "perna de cima caída", iconSleep)}
      <!-- sobrecarga -->
      <g id="f07-load" opacity="0">
        <rect x="1180" y="230" width="640" height="600" rx="26" fill="#FFF8E6" ${st}/>
        <rect x="1260" y="290" width="90" height="480" rx="20" fill="#fff" ${st}/>
        <rect id="f07-bar" x="1270" y="300" width="70" height="460" rx="14" fill="${C.good}"/>
        <line x1="1230" y1="420" x2="1380" y2="420" stroke="${C.pain}" stroke-width="8" stroke-dasharray="16 10"/>
        <text x="1390" y="428" font-family="Nunito" font-weight="900" font-size="26" fill="${C.pain}">LIMITE</text>
        <text x="1305" y="808" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">CARGA</text>
        <g id="f07-boom" opacity="0">${[0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2; return `<line x1="${1305 + Math.cos(a) * 60}" y1="${330 + Math.sin(a) * 60}" x2="${1305 + Math.cos(a) * 100}" y2="${330 + Math.sin(a) * 100}" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`; }).join("")}</g>
      </g>
      ${[["walk", 1540, "caminhada"], ["stairs", 1540, "escada"], ["run", 1540, "corrida"]].map(([id, x, lab], i) => `<g id="f07-ic-${id}" opacity="0"><rect x="${x - 20}" y="${300 + i * 150}" width="260" height="120" rx="20" fill="#fff" ${st}/>
        <g transform="translate(${x + 50},${360 + i * 150})">${i === 0 ? `<circle cx="0" cy="-30" r="12" fill="${C.ink}"/><path d="M0 -16 L0 14 L-16 40 M0 14 L14 40 M0 -6 L-16 8 M0 -6 L16 6" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" fill="none"/>` : i === 1 ? `<path d="M-40 40 L-40 20 L-14 20 L-14 0 L12 0 L12 -20 L38 -20 L38 40 Z" fill="#C99A62" stroke="${C.ink}" stroke-width="5"/>` : `<circle cx="6" cy="-32" r="12" fill="${C.ink}"/><path d="M2 -18 L-6 10 L-30 26 M-6 10 L16 22 L10 44 M0 -8 L-22 -2 M0 -8 L24 -18" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" fill="none"/>`}</g>
        <text x="${x + 150}" y="${370 + i * 150}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">${lab}</text></g>`).join("")}
      <g id="f07-f-wrap"><g transform="translate(1060,860) scale(0.62)">${faixa("f07f")}</g></g>
    </svg>
    <div id="f07-title" class="abs title" style="opacity:0">O que machuca o <span>Glutinho</span>?</div>
    <div id="f07-h1" class="abs card title" style="opacity:0">1. COMPRESSÃO</div>
    <div id="f07-h2" class="abs card title" style="opacity:0">2. SOBRECARGA</div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f07-title", 0.1, 0.7, -200);
        tl.set("#f07-f-wrap", { y: 600 }, 0);
        // 1. compressão
        R.pop(tl, "#f07-h1", K.comp - 0.1, 0.4);
        R.fadeIn(tl, "#f07-diag", K.comp, 0.35);
        R.pop(tl, "#f07-arrow", K.cruza, 0.35);
        tl.to("#f07-band", { y: 50, duration: 0.45, ease: "power3.in" }, K.aper - 0.2);
        tl.to("#f07-tendon", { scaleY: 0.6, svgOrigin: "380 360", duration: 0.45, ease: "power3.in" }, K.aper - 0.2);
        tl.to("#f07-tendon-c", { attr: { stroke: "#E0675A" }, duration: 0.3 }, K.aper + 0.1);
        R.shake(tl, "#f07-tendon", K.aper + 0.3, 0.4, 3);
        // três situações
        [K.cruzar, K.apoi, K.dorm].forEach((t, i) => R.pop(tl, `#f07-card${i}`, t - 0.1, 0.4));
        tl.to("#f07-card2", { rotation: 3, svgOrigin: "755 705", duration: 0.2, yoyo: true, repeat: 1 }, K.cai);
        // 2. sobrecarga
        R.pop(tl, "#f07-h2", K.sobre - 0.1, 0.4);
        R.fadeIn(tl, "#f07-load", K.sobre, 0.35);
        tl.fromTo("#f07-bar", { attr: { y: 700, height: 60 } }, { attr: { y: 640, height: 120 }, duration: 0.4 }, K.sobre + 0.2);
        tl.to("#f07-bar", { attr: { y: 300, height: 460, fill: "#FF5A4E" }, duration: 0.6, ease: "power3.in" }, K.rep);
        tl.set("#f07-boom", { opacity: 1 }, K.rep + 0.6);
        tl.fromTo("#f07-boom", { scale: 0.5, svgOrigin: "1305 330" }, { scale: 1.2, duration: 0.25, yoyo: true, repeat: 3 }, K.rep + 0.6);
        R.shake(tl, "#f07-load", K.rep + 0.6, 0.4, 4);
        R.slideIn(tl, "#f07-ic-walk", K.cam - 0.1, 0.4, 200);
        R.slideIn(tl, "#f07-ic-stairs", K.esc - 0.1, 0.4, 200);
        R.slideIn(tl, "#f07-ic-run", K.corr - 0.1, 0.4, 200);
        // Dona Faixa: "só tô fazendo meu trabalho"
        tl.to("#f07-f-wrap", { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.f0 - 0.5);
        R.face(tl, "f07f", K.f0 - 0.5, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f07f", K.f0, 0.3, { armF: -150, armB: 60 }, "back.out(2)");
        tl.to("#f07f-body", { scaleX: 0.85, svgOrigin: "0 -200", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.f1 - 0.9);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.comp - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.aper + 0.2, vol: 0.4 },
        ...[k.cruzar, k.apoi, k.dorm].map((t) => ({ name: "pop", t: t - 0.1, vol: 0.3 })),
        { name: "pop", t: k.sobre - 0.1, vol: 0.35 },
        { name: "riser", t: k.rep - 0.1, vol: 0.25, dur: 0.8 },
        { name: "impact-bass-2", t: k.rep + 0.6, vol: 0.4 },
        { name: "whoosh-short", t: k.f0 - 0.5, vol: 0.35 },
      ],
    };
  },
};
