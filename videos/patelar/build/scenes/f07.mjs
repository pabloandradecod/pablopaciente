// F7 — O segredo é a carga: termômetro POUCA / CERTA / DEMAIS, Molão de pijama, amassado e forte; treino que sobe de repente
export default {
  build(ctx) {
    const { C, molao, w } = ctx;
    const k = {
      seg: w(0, "segredo"), carga: w(0, "carga"), pouca: w(0, "Pouca"), enf: w(0, "enfraquece"), dem: w(0, "demais"),
      saltos: w(0, "saltos"), ater: w(0, "aterrissagens"), aum: w(0, "aumento"), conta: w(0, "conta"), doer: w(0, "doer"),
      adora: w(0, "adora"), certa: w(0, "certa"), poucos: w(0, "poucos"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // gráfico: treinos (barras) estáveis e depois um pico
    const bars = [40, 44, 42, 46, 150, 170].map((h, i) => `<rect class="f07-bar" x="${30 + i * 62}" y="${200 - h}" width="44" height="${h}" rx="6" fill="${i >= 4 ? C.pain : C.sky}" stroke="${C.ink}" stroke-width="4"/>`).join("");
    const stairs = [40, 70, 100, 130, 160, 190].map((h, i) => `<rect class="f07-st" x="${30 + i * 62}" y="${200 - h}" width="44" height="${h}" rx="6" fill="${C.good}" stroke="${C.ink}" stroke-width="4"/>`).join("");
    return {
      k,
      css: `
        #f07-h { left:0; right:0; top:60px; text-align:center; font-size:66px; }
        #f07-h span { color:${C.pain}; }
        #f07-g1 { left:110px; top:420px; width:470px; padding:16px; }
        #f07-g2 { left:1340px; top:420px; width:470px; padding:16px; }
        #f07-g1 .t, #f07-g2 .t { font-size:28px; margin-bottom:6px; }
        #f07-pij { left:640px; top:440px; padding:10px 20px; font-size:30px; color:#5A6B8C; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- termômetro de carga -->
      <g id="f07-thermo" opacity="0">
        <rect x="360" y="190" width="400" height="80" rx="20" fill="#B7C7DA" ${st}/>
        <rect x="760" y="190" width="400" height="80" fill="${C.good}" ${st}/>
        <rect x="1160" y="190" width="400" height="80" rx="20" fill="${C.pain}" ${st}/>
        <text x="560" y="243" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">POUCA CARGA</text>
        <text x="960" y="243" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">CARGA CERTA</text>
        <text x="1360" y="243" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="#fff">CARGA DEMAIS</text>
      </g>
      <g id="f07-ptr" opacity="0"><path d="M960 330 L930 290 L990 290 Z" fill="${C.ink}"/><rect x="954" y="330" width="12" height="40" fill="${C.ink}"/></g>
      <g id="f07-m-wrap"><g transform="translate(960,860) scale(0.8)">${molao("f07m")}</g></g>
      <g id="f07-cap" opacity="0"><path d="M900 610 Q960 560 1022 606 L1090 540 Q1060 600 1040 620 Z" fill="#5A6B8C" ${st}/><circle cx="1092" cy="536" r="16" fill="#fff" stroke="${C.ink}" stroke-width="5"/></g>
      <g id="f07-zz" opacity="0"><text x="1060" y="520" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">z z</text></g>
      <g id="f07-boom" opacity="0">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return `<line x1="${960 + Math.cos(a) * 120}" y1="${700 + Math.sin(a) * 120}" x2="${960 + Math.cos(a) * 170}" y2="${700 + Math.sin(a) * 170}" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/>`; }).join("")}</g>
      <g id="f07-jumps" opacity="0">${[0, 1, 2].map((i) => `<path d="M${640 + i * 50} 760 Q${660 + i * 50} 640 ${680 + i * 50} 760" stroke="${C.pain}" stroke-width="7" fill="none" stroke-dasharray="12 10"/>`).join("")}<text x="620" y="820" font-family="Nunito" font-weight="900" font-size="28" fill="${C.pain}">saltos!</text></g>
      <g id="f07-flex" opacity="0">${[0, 1, 2, 3].map((i) => `<path d="M${1060 + (i % 2) * 40} ${560 + i * 30} l18 -10" stroke="${C.sun}" stroke-width="8" stroke-linecap="round"/>`).join("")}</g>
    </svg>
    <div id="f07-h" class="abs title" style="opacity:0">O segredo do tendão é a <span>CARGA</span></div>
    <div id="f07-pij" class="abs card label" style="opacity:0">repouso total: enfraquece</div>
    <div id="f07-g1" class="abs card" style="opacity:0"><div class="t label">TREINO: aumento rápido</div><svg width="440" height="210" viewBox="0 0 440 210"><line x1="20" y1="202" x2="430" y2="202" stroke="${C.ink}" stroke-width="4"/>${bars}</svg></div>
    <div id="f07-g2" class="abs card" style="opacity:0"><div class="t label" style="color:${C.good}">CARGA CERTA: aos poucos</div><svg width="440" height="210" viewBox="0 0 440 210"><line x1="20" y1="202" x2="430" y2="202" stroke="${C.ink}" stroke-width="4"/>${stairs}</svg></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-h", 0.2, 0.5);
        const m = "f07m";
        R.face(tl, m, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, m, 0.4, K.pouca);
        R.pop(tl, "#f07-thermo", K.carga - 0.1, 0.45);
        // pouca carga: ponteiro à esquerda, Molão de pijama, fraquinho
        tl.set("#f07-ptr", { opacity: 1, x: -400 }, K.pouca - 0.1);
        tl.fromTo("#f07-ptr", { y: -60 }, { y: 0, duration: 0.35, ease: "bounce.out" }, K.pouca - 0.1);
        tl.set("#f07-cap", { opacity: 1 }, K.pouca);
        tl.fromTo("#f07-cap", { y: -80 }, { y: 0, duration: 0.35, ease: "bounce.out" }, K.pouca);
        tl.set("#f07-zz", { opacity: 1 }, K.pouca + 0.3);
        tl.to("#f07-zz", { y: -20, duration: 0.6, yoyo: true, repeat: 2, ease: "sine.inOut" }, K.pouca + 0.3);
        R.face(tl, m, K.pouca, { eyes: "closed", mouth: "flat" });
        R.pop(tl, "#f07-pij", K.enf - 0.1, 0.35);
        tl.to("#f07-m-wrap", { scaleX: 0.8, svgOrigin: "960 860", duration: 0.4, ease: "power2.inOut" }, K.enf);
        R.pose(tl, m, K.enf, 0.4, { armF: 20, armB: -20 });
        // carga demais: ponteiro à direita, Molão amassado
        tl.to("#f07-cap, #f07-zz, #f07-pij", { opacity: 0, duration: 0.2 }, K.dem - 0.2);
        tl.to("#f07-m-wrap", { scaleX: 1, svgOrigin: "960 860", duration: 0.2 }, K.dem - 0.2);
        tl.to("#f07-ptr", { x: 400, duration: 0.45, ease: "power2.inOut" }, K.dem - 0.1);
        tl.to("#f07m-coil", { scaleY: 0.5, transformOrigin: "50% 100%", duration: 0.3, ease: "power3.in" }, K.dem);
        tl.to("#f07m-top", { y: 105, duration: 0.3, ease: "power3.in" }, K.dem);
        R.face(tl, m, K.dem + 0.2, { eyes: "pain", mouth: "scream" });
        tl.set("#f07-boom", { opacity: 1 }, K.dem + 0.25);
        tl.fromTo("#f07-boom", { scale: 0.6, svgOrigin: "960 700" }, { scale: 1.1, svgOrigin: "960 700", duration: 0.3, yoyo: true, repeat: 3 }, K.dem + 0.25);
        R.pop(tl, "#f07-jumps", K.saltos - 0.1, 0.35);
        // aumento rápido do treino
        R.pop(tl, "#f07-g1", K.aum - 0.2, 0.4);
        tl.fromTo(".f07-bar", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, stagger: 0.15, ease: "back.out(2)" }, K.aum);
        tl.to("#f07-boom", { opacity: 0, duration: 0.2 }, K.doer + 0.4);
        // carga certa: ponteiro no meio, Molão forte
        tl.to("#f07-ptr", { x: 0, duration: 0.45, ease: "back.out(1.6)" }, K.adora - 0.1);
        tl.to("#f07-jumps, #f07-g1", { opacity: 0.25, duration: 0.3 }, K.adora);
        tl.to("#f07m-coil", { scaleY: 1, transformOrigin: "50% 100%", duration: 0.35, ease: "back.out(2)" }, K.adora);
        tl.to("#f07m-top", { y: 0, duration: 0.35, ease: "back.out(2)" }, K.adora);
        R.face(tl, m, K.certa, { eyes: "happy", mouth: "grin" });
        R.pose(tl, m, K.certa, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        tl.set("#f07-flex", { opacity: 1 }, K.certa + 0.2);
        R.pop(tl, "#f07-g2", K.certa, 0.4);
        tl.fromTo(".f07-st", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, stagger: 0.2, ease: "back.out(2)" }, K.poucos - 0.6);
      },
      sfx: [
        { name: "pop", t: k.carga - 0.1, vol: 0.35 },
        { name: "pop", t: k.pouca, vol: 0.35 },
        { name: "whoosh-short", t: k.dem - 0.1, vol: 0.4 },
        { name: "impact-bass-1", t: k.dem + 0.25, vol: 0.4 },
        { name: "pop", t: k.aum - 0.2, vol: 0.3 },
        { name: "whoosh-short", t: k.adora - 0.1, vol: 0.4 },
        { name: "sparkle", t: k.certa, vol: 0.35 },
      ],
    };
  },
};
