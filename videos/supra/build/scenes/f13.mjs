// F13 — O exame: teste da lata (Dona Cida vista de frente, braços na diagonal e polegar pra cima; o Dr. Pablo empurra pra baixo),
// arco doloroso e rotação externa contra resistência; placa "força boa + dor = tendinopatia · fraqueza grande = investigar rotura"
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      ex: w(0, "exame"), lata: w(0, "lata"), bracos: w(0, "braços"), pol: w(0, "polegar"), emp: w(0, "empurro"),
      doi: w(0, "dói"), seg: w(0, "segura"), tend: w(0, "tendinopatia"), desp: w(0, "despenca"), rot: w(0, "rotura"),
      arco: w(0, "arco"), girar: w(0, "girar"), compl: w(0, "completam"),
      c0: L1.start, c1: L1.end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const skin = "#E3A47E", top = "#B07ED8", pants = "#3E5A8A", shoe = "#8E2F45", hair = "#5A3420";
    // braço visto de frente: pivô no ombro, desce 250; polegar aponta pra cima quando o braço está a ±75°
    const arm = (id, thumbX, thumbY) => `<g id="${id}">
      <rect x="-22" y="0" width="44" height="130" rx="20" fill="${top}" ${st}/>
      <rect x="-20" y="118" width="40" height="132" rx="18" fill="${skin}" ${st}/>
      <g class="f13-thumb" opacity="0"><line x1="0" y1="262" x2="${thumbX}" y2="${262 + thumbY}" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/><line x1="0" y1="262" x2="${thumbX}" y2="${262 + thumbY}" stroke="${skin}" stroke-width="11" stroke-linecap="round"/></g>
      <circle cx="0" cy="262" r="24" fill="${skin}" ${st}/>
    </g>`;
    const push = (x, y, id) => `<g id="${id}" opacity="0"><g transform="translate(${x},${y})">
      <ellipse cx="0" cy="-40" rx="34" ry="22" fill="${C.skinA}" stroke="${C.ink}" stroke-width="6"/>
      <path d="M-22 -58 L-22 -76 M-6 -62 L-6 -82 M10 -62 L10 -80 M24 -56 L24 -72" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M0 -130 L0 -76" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/><path d="M-18 -92 L0 -66 L18 -92 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="3"/>
    </g></g>`;
    // mini transferidor (arco doloroso)
    const PX = 150, PY = 92, PR = 78;
    const pp = (a, r) => [PX + r * Math.sin((a * Math.PI) / 180), PY + r * Math.cos((a * Math.PI) / 180)];
    const wedge = (a0, a1, fill, id) => { const [x0, y0] = pp(a0, PR), [x1, y1] = pp(a1, PR); return `<path ${id ? `id="${id}"` : ""} d="M${PX} ${PY} L${x0.toFixed(1)} ${y0.toFixed(1)} A${PR} ${PR} 0 0 0 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${fill}" stroke="${C.ink}" stroke-width="4"/>`; };
    return {
      k,
      css: `
        #f13-title { left:90px; top:60px; font-size:64px; }
        #f13-title span { color:${C.pain}; }
        #f13-front { left:96px; top:150px; padding:8px 18px; font-size:26px; }
        #f13-lata { left:1040px; top:60px; width:800px; height:390px; }
        #f13-lata .h { position:absolute; left:26px; top:16px; font-size:38px; }
        #f13-lata .h span { color:${C.pain}; }
        #root .f13-row { position:absolute; left:26px; width:748px; padding:10px 16px; border-radius:14px; font-size:28px; border:5px solid ${C.ink}; }
        #f13-r1 { top:200px; background:#DDF7EC; } #f13-r2 { top:290px; background:#FFE3DE; }
        #root .f13-row b { color:${C.pain}; } #root .f13-row i { font-style:normal; color:#137A5A; }
        #f13-arco { left:1040px; top:480px; width:385px; height:250px; }
        #f13-girar { left:1455px; top:480px; width:385px; height:250px; }
        #root .f13-mini .h { position:absolute; left:0; right:0; top:12px; text-align:center; font-size:28px; }
        #f13-sign { left:1040px; top:760px; width:800px; padding:16px 22px; text-align:center; font-size:34px; color:#fff; background:${C.ink};
          border:7px solid ${C.ink}; border-radius:24px; box-shadow:10px 10px 0 ${C.pain}; }
        #f13-sign b { color:${C.good}; } #f13-sign i { font-style:normal; color:#FF9C92; }
        #f13-chip { left:560px; top:220px; padding:12px 22px; font-size:38px; transform:rotate(-3deg); }
        #f13-chip b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="900" fill="${C.wall}"/><rect y="900" width="1920" height="180" fill="${C.floor}"/>
      <line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <!-- Dona Cida vista de frente -->
      <g id="f13-c">
        <rect x="485" y="750" width="60" height="150" rx="20" fill="${pants}" ${st}/><rect x="555" y="750" width="60" height="150" rx="20" fill="${pants}" ${st}/>
        <ellipse cx="512" cy="900" rx="44" ry="16" fill="${shoe}" stroke="${C.ink}" stroke-width="5"/><ellipse cx="588" cy="900" rx="44" ry="16" fill="${shoe}" stroke="${C.ink}" stroke-width="5"/>
        <path d="M470 460 Q550 432 630 460 L642 770 L458 770 Z" fill="${top}" ${st}/>
        <path d="M520 470 Q550 500 580 470" fill="none" stroke="${C.ink}" stroke-width="4"/>
        ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${530 + i * 10}" cy="${486 + Math.sin(i * 0.9) * 4}" r="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`).join("")}
        <rect x="532" y="410" width="36" height="40" rx="10" fill="${skin}" ${st}/>
        <circle cx="550" cy="296" r="34" fill="${hair}" stroke="${C.ink}" stroke-width="6"/>
        <circle cx="550" cy="362" r="64" fill="${skin}" ${st}/>
        <path d="M488 360 Q480 300 550 296 Q620 300 612 360 Q590 322 550 324 Q510 322 488 360 Z" fill="${hair}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
        <circle cx="488" cy="380" r="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/><circle cx="612" cy="380" r="8" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/>
        <g id="f13-eN"><circle cx="528" cy="360" r="8" fill="${C.ink}"/><circle cx="572" cy="360" r="8" fill="${C.ink}"/></g>
        <g id="f13-eP" opacity="0"><path d="M518 352 L536 360 L518 368 M582 352 L564 360 L582 368" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
        <ellipse cx="510" cy="390" rx="12" ry="7" fill="${C.pain}" opacity="0.3"/><ellipse cx="590" cy="390" rx="12" ry="7" fill="${C.pain}" opacity="0.3"/>
        <path id="f13-mS" d="M532 396 Q550 410 568 396" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
        <path id="f13-mP" d="M532 404 Q550 390 568 404" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" opacity="0"/>
        <ellipse id="f13-mO" cx="550" cy="400" rx="14" ry="12" fill="#7A2B2B" stroke="${C.ink}" stroke-width="5" opacity="0"/>
        <g transform="translate(470,470)">${arm("f13-armL", -29, -8)}</g>
        <g transform="translate(630,470)">${arm("f13-armR", 29, -8)}</g>
        <g id="f13-pain" opacity="0"><circle cx="632" cy="476" r="34" fill="${C.pain}" opacity="0.45"/><circle cx="632" cy="476" r="14" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      </g>
      <!-- mãos do Dr. Pablo empurrando pra baixo (punhos a ±75°, braço encurtado 0,8) -->
      ${push(268, 524, "f13-pushL")}${push(832, 524, "f13-pushR")}
    </svg>
    <div id="f13-title" class="abs title">O <span>EXAME</span> do supra</div>
    <div id="f13-front" class="abs card label">visto de frente</div>
    <div id="f13-lata" class="abs card" style="opacity:0">
      <div class="h title">1. Teste da <span>LATA</span></div>
      <div class="label" style="position:absolute;left:26px;top:68px;font-size:24px">diagonal · polegar pra cima · o doutor empurra pra baixo</div>
      <svg style="position:absolute;left:26px;top:112px" width="748" height="80" viewBox="0 0 748 80">
        <rect x="0" y="22" width="360" height="42" rx="10" fill="#FF9C92" stroke="${C.ink}" stroke-width="5"/>
        <rect x="360" y="22" width="380" height="42" rx="10" fill="#9BE8C9" stroke="${C.ink}" stroke-width="5"/>
        <text x="180" y="52" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="${C.ink}">DESPENCA</text>
        <text x="550" y="52" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="${C.ink}">SEGURA</text>
        <g id="f13-needle"><path d="M0 8 L-16 -14 L16 -14 Z" transform="translate(370,20)" fill="${C.ink}"/><rect x="366" y="16" width="8" height="56" fill="${C.ink}"/></g>
      </svg>
      <div id="f13-r1" class="f13-row label" style="opacity:0">Dói, mas <i>SEGURA</i> → cara de <i>tendinopatia</i> ✓</div>
      <div id="f13-r2" class="f13-row label" style="opacity:0"><b>DESPENCA</b> sem força → investigar <b>rotura</b> ✗</div>
    </div>
    <div id="f13-arco" class="abs card f13-mini" style="opacity:0">
      <div class="h title">2. Arco doloroso</div>
      <svg style="position:absolute;left:40px;top:50px" width="300" height="200" viewBox="0 0 300 200">
        <g transform="translate(0,0)">${wedge(0, 60, "#9BE8C9")}${wedge(60, 120, "#FF9C92", "f13-aw")}${wedge(120, 180, "#9BE8C9")}</g>
        <text x="66" y="112" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.pain}">60–120°</text><text x="66" y="138" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.pain}">dói</text>
        <g transform="translate(${PX},${PY})"><g id="f13-aarm"><rect x="-7" y="0" width="14" height="78" rx="6" fill="${C.skinA}" stroke="${C.ink}" stroke-width="4"/></g></g>
      </svg>
    </div>
    <div id="f13-girar" class="abs card f13-mini" style="opacity:0">
      <div class="h title">3. Girar pra fora</div>
      <svg style="position:absolute;left:42px;top:56px" width="300" height="190" viewBox="0 0 300 190">
        <ellipse cx="90" cy="110" rx="70" ry="36" fill="${top}" stroke="${C.ink}" stroke-width="5"/>
        <circle cx="90" cy="110" r="28" fill="${skin}" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(150,110)"><g id="f13-fore"><rect x="0" y="-11" width="100" height="22" rx="10" fill="${skin}" stroke="${C.ink}" stroke-width="5"/><circle cx="104" cy="0" r="14" fill="${skin}" stroke="${C.ink}" stroke-width="4"/></g></g>
        <path d="M262 40 Q290 80 262 120" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/><path d="M250 112 L266 132 L274 108 Z" fill="${C.pain}"/>
        <text x="90" y="166" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">visto de cima</text>
      </svg>
    </div>
    <div id="f13-sign" class="abs title" style="opacity:0"><b>força boa + dor</b> = tendinopatia · <i>fraqueza grande</i> = investigar rotura</div>
    <div id="f13-chip" class="abs card title" style="opacity:0">Dói... <b>mas eu seguro!</b></div>`,
      js: function (tl, K, R) {
        const face = (t, mode) => {
          tl.set("#f13-eN", { opacity: mode === "pain" ? 0 : 1 }, t);
          tl.set("#f13-eP", { opacity: mode === "pain" ? 1 : 0 }, t);
          tl.set("#f13-mS", { opacity: mode === "ok" ? 1 : 0 }, t);
          tl.set("#f13-mP", { opacity: mode === "pain" ? 1 : 0 }, t);
        };
        face(0, "ok");
        R.rise(tl, "#f13-title", 0.05, 0.5);
        R.pop(tl, "#f13-front", 0.3, 0.4);
        tl.fromTo("#f13-c", { x: -700 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        // teste da lata: braços na diagonal, polegar pra cima
        R.pop(tl, "#f13-lata", K.lata - 0.2, 0.45);
        tl.to("#f13-armR", { rotation: -75, scaleY: 0.8, svgOrigin: "0 0", duration: 0.6, ease: "power2.out" }, K.bracos);
        tl.to("#f13-armL", { rotation: 75, scaleY: 0.8, svgOrigin: "0 0", duration: 0.6, ease: "power2.out" }, K.bracos);
        tl.to(".f13-thumb", { opacity: 1, duration: 0.2 }, K.pol);
        tl.fromTo(".f13-thumb", { scale: 0.4, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, K.pol);
        // o doutor empurra
        tl.set("#f13-pushL, #f13-pushR", { opacity: 1 }, K.emp - 0.2);
        tl.fromTo("#f13-pushL, #f13-pushR", { y: -60 }, { y: 0, duration: 0.3, ease: "power2.out" }, K.emp - 0.2);
        tl.to("#f13-pushL, #f13-pushR", { y: 14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.emp + 0.2);
        tl.to("#f13-armR", { rotation: -70, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.emp + 0.2);
        tl.to("#f13-armL", { rotation: 70, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.emp + 0.2);
        tl.to("#f13-needle", { x: 260, duration: 0.6, ease: "power2.out" }, K.emp + 0.2);
        // dói, mas segura
        tl.set("#f13-pain", { opacity: 1 }, K.doi);
        tl.fromTo("#f13-pain circle", { scale: 0.6, svgOrigin: "632 476" }, { scale: 1.3, svgOrigin: "632 476", duration: 0.2, yoyo: true, repeat: 5 }, K.doi);
        face(K.doi, "pain");
        tl.to("#f13-needle", { x: 180, duration: 0.4, ease: "back.out(2)" }, K.seg - 0.1);
        R.rise(tl, "#f13-r1", K.tend - 0.3, 0.4, 20);
        // se despenca: ponteiro vai pro vermelho e volta
        tl.to("#f13-needle", { x: -200, duration: 0.4, ease: "power3.in" }, K.desp - 0.1);
        R.rise(tl, "#f13-r2", K.desp, 0.4, 20);
        R.shake(tl, "#f13-r2", K.rot, 0.3, 5);
        tl.to("#f13-needle", { x: 180, duration: 0.5, ease: "power2.out" }, K.rot + 0.5);
        // braços descem; arco e girar pra fora
        tl.to("#f13-pushL, #f13-pushR", { opacity: 0, y: -60, duration: 0.3 }, K.arco - 0.6);
        tl.to("#f13-armR, #f13-armL", { rotation: 0, scaleY: 1, svgOrigin: "0 0", duration: 0.5, ease: "power2.inOut" }, K.arco - 0.6);
        tl.to(".f13-thumb", { opacity: 0, duration: 0.2 }, K.arco - 0.6);
        tl.set("#f13-pain", { opacity: 0 }, K.arco - 0.4);
        face(K.arco - 0.4, "ok");
        R.pop(tl, "#f13-arco", K.arco - 0.2, 0.45);
        tl.to("#f13-aarm", { rotation: -180, svgOrigin: "0 0", duration: 1.4, ease: "none" }, K.arco + 0.2);
        tl.fromTo("#f13-aw", { opacity: 1 }, { opacity: 0.35, duration: 0.18, yoyo: true, repeat: 5 }, K.arco + 0.6);
        R.pop(tl, "#f13-girar", K.girar - 0.3, 0.45);
        tl.fromTo("#f13-fore", { rotation: 0 }, { rotation: -60, svgOrigin: "0 0", duration: 0.45, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.girar + 0.1);
        // placa-resumo
        tl.fromTo("#f13-sign", { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power4.in" }, K.compl - 0.3);
        R.shake(tl, "#f13-sign", K.compl + 0.05, 0.25, 5);
        // Dona Cida: "Dói, doutor, mas eu seguro!" — braço direito na diagonal de novo, firme
        tl.to("#f13-armR", { rotation: -75, scaleY: 0.8, svgOrigin: "0 0", duration: 0.4, ease: "back.out(1.6)" }, K.c0 - 0.3);
        tl.to("#f13-armR .f13-thumb", { opacity: 1, duration: 0.2 }, K.c0 - 0.1);
        tl.set("#f13-pain", { opacity: 1 }, K.c0);
        face(K.c0, "pain");
        tl.set("#f13-mP", { opacity: 0 }, K.c0);
        const n = Math.max(2, Math.floor((K.c1 - K.c0) / 0.22));
        for (let i = 0; i < n; i++) tl.set("#f13-mO", { opacity: i % 2 ? 0 : 1 }, K.c0 + i * 0.22);
        tl.set("#f13-mO", { opacity: 0 }, K.c1);
        tl.set("#f13-mS", { opacity: 1 }, K.c1);
        tl.set("#f13-eP", { opacity: 0 }, K.c1);
        tl.set("#f13-eN", { opacity: 1 }, K.c1);
        tl.to("#f13-pain circle", { scale: 1.3, svgOrigin: "632 476", duration: 0.2, yoyo: true, repeat: 3 }, K.c0);
        R.pop(tl, "#f13-chip", K.c0 + 0.2, 0.4);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.lata - 0.2, vol: 0.4 },
        { name: "click-soft", t: k.pol, vol: 0.4 },
        { name: "whoosh-short", t: k.emp - 0.2, vol: 0.35 },
        { name: "glitch-1", t: k.doi, vol: 0.25 },
        { name: "error", t: k.desp, vol: 0.3 },
        { name: "pop", t: k.arco - 0.2, vol: 0.35 },
        { name: "pop", t: k.girar - 0.3, vol: 0.35 },
        { name: "impact-bass-1", t: k.compl - 0.05, vol: 0.4 },
        { name: "pop", t: k.c0 + 0.2, vol: 0.35 },
      ],
    };
  },
};
