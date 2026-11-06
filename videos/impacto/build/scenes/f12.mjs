// F12 — O exame: arco doloroso (Seu Zé visto de frente com um transferidor gigante), testes que apertam o espaço (Hawkins e Neer) e teste de força
export default {
  tail: 1.2,
  build(ctx) {
    const { C, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      ex: w(0, "exame"), arco: w(0, "arco"), lev: w(0, "levantando"), meio: w(0, "meio"), alivia: w(0, "alivia"),
      testes: w(0, "testes"), repr: w(0, "reproduzem"), forca: w(0, "força"), aguenta: w(0, "aguenta"), fraco: w(0, "fraco"),
      z0: L1.start, z1: L1.end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const SX = 600, SY = 470, RR = 300;
    const pt = (a, r) => [SX + r * Math.sin((a * Math.PI) / 180), SY + r * Math.cos((a * Math.PI) / 180)];
    const wedge = (a0, a1, fill, id) => {
      const [x0, y0] = pt(a0, RR), [x1, y1] = pt(a1, RR);
      return `<path id="${id}" d="M${SX} ${SY} L${x0.toFixed(1)} ${y0.toFixed(1)} A${RR} ${RR} 0 0 0 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${fill}" stroke="${C.ink}" stroke-width="5" opacity="0.9"/>`;
    };
    const lab = (a, t) => { const [x, y] = pt(a, RR + 34); return `<text x="${x.toFixed(0)}" y="${(y + 12).toFixed(0)}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">${t}</text>`; };
    // mini figura de lado para os testes
    const mini = (arm, extra) => `<circle cx="0" cy="-120" r="26" fill="${C.skinB}" stroke="${C.ink}" stroke-width="5"/>
      <rect x="-26" y="-92" width="52" height="110" rx="18" fill="${C.blue}" stroke="${C.ink}" stroke-width="5"/>
      ${arm}${extra}
      <circle cx="10" cy="-80" r="16" fill="${C.pain}" opacity="0.45"/><circle cx="10" cy="-80" r="7" fill="${C.pain}"/>`;
    const hawk = mini(`<path d="M10 -80 L90 -80 L90 -10" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 -80 L90 -80 L90 -10" fill="none" stroke="${C.skinB}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M126 -30 Q130 10 96 22" fill="none" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/><path d="M90 12 L100 28 L106 12 Z" fill="${C.pain}"/>`);
    const neer = mini(`<path d="M10 -80 L50 -200" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/><path d="M10 -80 L50 -200" fill="none" stroke="${C.skinB}" stroke-width="12" stroke-linecap="round"/>`,
      `<circle cx="-4" cy="-98" r="14" fill="#F7C9A8" stroke="${C.ink}" stroke-width="4"/><path d="M70 -150 Q80 -190 60 -214" fill="none" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/><path d="M52 -220 L68 -222 L62 -206 Z" fill="${C.pain}"/>`);
    return {
      k,
      css: `
        #f12-title { left:960px; top:70px; font-size:64px; }
        #f12-title span { color:${C.pain}; }
        #f12-front { left:90px; top:160px; padding:8px 18px; font-size:26px; }
        #f12-arc { left:1060px; top:180px; width:760px; padding:20px 26px; font-size:34px; text-align:center; }
        #f12-arc b { color:${C.pain}; } #f12-arc i { font-style:normal; color:#1E9C74; }
        #f12-tests { left:1060px; top:180px; width:760px; height:420px; }
        #f12-tests .h { position:absolute; left:0; right:0; top:16px; text-align:center; font-size:34px; }
        #f12-tests .n { position:absolute; top:360px; width:380px; text-align:center; font-size:28px; }
        #f12-str { left:1060px; top:640px; width:760px; padding:18px 26px; }
        #f12-str .h { font-size:32px; text-align:center; }
        #f12-ok { left:1460px; top:835px; padding:10px 22px; font-size:34px; transform:rotate(-4deg); }
        #f12-ok b { color:${C.pain}; }
        #f12-ai { left:740px; top:300px; font-size:96px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="900" fill="${C.wall}"/><rect y="900" width="1920" height="180" fill="${C.floor}"/>
      <line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <!-- transferidor gigante -->
      <g id="f12-prot" opacity="0">
        ${wedge(0, 60, "#9BE8C9", "f12-w0")}${wedge(60, 120, "#FF9C92", "f12-w1")}${wedge(120, 180, "#9BE8C9", "f12-w2")}
        ${lab(0, "0°")}${lab(60, "60°")}${lab(120, "120°")}${lab(180, "180°")}
        <g id="f12-arcl" opacity="0"><text x="${SX + 160}" y="${SY + 12}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="#fff" stroke="${C.ink}" stroke-width="6" paint-order="stroke">ARCO</text>
        <text x="${SX + 160}" y="${SY + 46}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="#fff" stroke="${C.ink}" stroke-width="6" paint-order="stroke">DOLOROSO</text></g>
      </g>
      <!-- Seu Zé visto de frente -->
      <g id="f12-z">
        <rect x="455" y="750" width="60" height="150" rx="20" fill="${C.brown}" ${st}/><rect x="525" y="750" width="60" height="150" rx="20" fill="${C.brown}" ${st}/>
        <ellipse cx="482" cy="900" rx="44" ry="16" fill="#4A2E1A" stroke="${C.ink}" stroke-width="5"/><ellipse cx="558" cy="900" rx="44" ry="16" fill="#4A2E1A" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(440,470)"><rect x="-22" y="0" width="44" height="250" rx="20" fill="${C.blue}" ${st}/><circle cx="0" cy="262" r="24" fill="${C.skinB}" ${st}/></g>
        <path d="M440 460 Q520 430 600 460 L612 770 L428 770 Z" fill="${C.blue}" ${st}/>
        <path d="M450 540 L590 540 M446 610 L596 610 M440 680 L602 680" stroke="#fff" stroke-width="5" opacity="0.35"/>
        <rect x="428" y="740" width="184" height="24" rx="8" fill="#3B2A1C" stroke="${C.ink}" stroke-width="5"/>
        <rect x="502" y="410" width="36" height="40" rx="10" fill="${C.skinB}" ${st}/>
        <circle cx="520" cy="360" r="66" fill="${C.skinB}" ${st}/>
        <path d="M456 350 Q450 300 476 296 M584 350 Q590 300 564 296" stroke="#C9C9C9" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="452" cy="364" rx="12" ry="18" fill="${C.skinB}" ${st}/><ellipse cx="588" cy="364" rx="12" ry="18" fill="${C.skinB}" ${st}/>
        <g id="f12-eN"><circle cx="498" cy="352" r="8" fill="${C.ink}"/><circle cx="542" cy="352" r="8" fill="${C.ink}"/></g>
        <g id="f12-eP" opacity="0"><path d="M488 344 L506 352 L488 360 M552 344 L534 352 L552 360" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
        <path d="M494 384 Q520 376 546 384 Q536 394 520 390 Q504 394 494 384 Z" fill="#C9C9C9" stroke="${C.ink}" stroke-width="4"/>
        <path id="f12-mS" d="M502 404 Q520 418 538 404" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
        <path id="f12-mP" d="M502 412 Q520 398 538 412" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" opacity="0"/>
        <ellipse id="f12-mO" cx="520" cy="408" rx="14" ry="12" fill="#7A2B2B" stroke="${C.ink}" stroke-width="5" opacity="0"/>
        <!-- braço que levanta (pivô no ombro) -->
        <g transform="translate(${SX},${SY})"><g id="f12-arm"><rect x="-22" y="0" width="44" height="250" rx="20" fill="${C.blue}" ${st}/><rect x="-20" y="130" width="40" height="118" rx="18" fill="${C.skinB}" ${st}/><circle cx="0" cy="262" r="24" fill="${C.skinB}" ${st}/></g></g>
        <g id="f12-pain" opacity="0"><circle cx="${SX + 8}" cy="${SY + 6}" r="34" fill="${C.pain}" opacity="0.45"/><circle cx="${SX + 8}" cy="${SY + 6}" r="14" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      </g>
    </svg>
    <div id="f12-title" class="abs title">O <span>EXAME</span> do ombro</div>
    <div id="f12-front" class="abs card label">visto de frente</div>
    <div id="f12-arc" class="abs card label" style="opacity:0">Levantando de lado: <i>0–60° tranquilo</i> · <b>60–120° DÓI</b> · <i>lá em cima alivia</i></div>
    <div id="f12-tests" class="abs card" style="opacity:0">
      <div class="h title">Testes que <span style="color:${C.pain}">apertam</span> o espaço</div>
      <svg style="position:absolute;left:0;top:60px" width="760" height="300" viewBox="0 0 760 300">
        <g transform="translate(160,260)">${hawk}</g>
        <line x1="380" y1="20" x2="380" y2="290" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8" opacity="0.4"/>
        <g transform="translate(540,260)">${neer}</g>
      </svg>
      <div class="n label" style="left:0">Hawkins</div><div class="n label" style="left:380px">Neer</div>
    </div>
    <div id="f12-str" class="abs card" style="opacity:0">
      <div class="h title">Teste de FORÇA</div>
      <svg width="708" height="110" viewBox="0 0 708 110">
        <rect x="20" y="30" width="330" height="44" rx="10" fill="#FF9C92" stroke="${C.ink}" stroke-width="5"/>
        <rect x="350" y="30" width="338" height="44" rx="10" fill="#9BE8C9" stroke="${C.ink}" stroke-width="5"/>
        <text x="185" y="62" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">FRACO</text>
        <text x="519" y="62" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">AGUENTA</text>
        <g id="f12-needle"><path d="M0 8 L-16 -18 L16 -18 Z" transform="translate(60,28)" fill="${C.ink}"/><rect x="56" y="24" width="8" height="58" fill="${C.ink}"/></g>
      </svg>
    </div>
    <div id="f12-ok" class="abs card title" style="opacity:0">força OK... <b>mas dói!</b></div>
    <div id="f12-ai" class="abs title" style="opacity:0">AI!</div>`,
      js: function (tl, K, R) {
        const face = (t, mode) => {
          tl.set("#f12-eN", { opacity: mode === "pain" ? 0 : 1 }, t);
          tl.set("#f12-eP", { opacity: mode === "pain" ? 1 : 0 }, t);
          tl.set("#f12-mS", { opacity: mode === "ok" ? 1 : 0 }, t);
          tl.set("#f12-mP", { opacity: mode === "pain" ? 1 : 0 }, t);
        };
        face(0, "ok");
        R.rise(tl, "#f12-title", 0.05, 0.5);
        R.pop(tl, "#f12-front", 0.3, 0.4);
        tl.fromTo("#f12-z", { x: -700 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        // transferidor e arco
        tl.set("#f12-prot", { opacity: 1 }, K.arco - 0.2);
        tl.fromTo("#f12-prot", { scale: 0, svgOrigin: "600 470" }, { scale: 1, svgOrigin: "600 470", duration: 0.5, ease: "back.out(1.6)" }, K.arco - 0.2);
        R.pop(tl, "#f12-arc", K.arco + 0.2, 0.45);
        // levantando o braço de lado
        const a0 = K.lev, a1 = K.meio - 0.2;
        tl.to("#f12-arm", { rotation: -60, svgOrigin: "0 0", duration: Math.max(0.4, a1 - a0), ease: "sine.inOut" }, a0);
        tl.to("#f12-arm", { rotation: -120, svgOrigin: "0 0", duration: Math.max(0.6, K.alivia - K.meio), ease: "none" }, K.meio - 0.2);
        tl.set("#f12-pain", { opacity: 1 }, K.meio - 0.1);
        tl.fromTo("#f12-pain circle", { scale: 0.6, svgOrigin: "608 476" }, { scale: 1.3, svgOrigin: "608 476", duration: 0.2, yoyo: true, repeat: 5 }, K.meio - 0.1);
        face(K.meio - 0.1, "pain");
        tl.set("#f12-arcl", { opacity: 1 }, K.meio - 0.1);
        tl.fromTo("#f12-w1", { opacity: 0.9 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 5 }, K.meio - 0.1);
        tl.to("#f12-arm", { rotation: -175, svgOrigin: "0 0", duration: 0.7, ease: "power2.out" }, K.alivia - 0.2);
        tl.set("#f12-pain", { opacity: 0 }, K.alivia + 0.1);
        face(K.alivia + 0.1, "ok");
        // testes: braço desce, card dos testes
        tl.to("#f12-arm", { rotation: 0, svgOrigin: "0 0", duration: 0.6, ease: "power2.inOut" }, K.testes - 0.5);
        R.fadeOut(tl, "#f12-arc", K.testes - 0.4);
        R.pop(tl, "#f12-tests", K.testes - 0.1, 0.45);
        tl.set("#f12-pain", { opacity: 1 }, K.repr);
        face(K.repr, "pain");
        tl.set("#f12-pain", { opacity: 0 }, K.forca - 0.3);
        face(K.forca - 0.3, "ok");
        // força: ponteiro vai para "aguenta", mas dói
        R.pop(tl, "#f12-str", K.forca - 0.2, 0.45);
        tl.to("#f12-needle", { x: 300, duration: 0.6, ease: "power2.out" }, K.forca + 0.3);
        tl.to("#f12-needle", { x: 470, duration: 0.5, ease: "back.out(2)" }, K.aguenta - 0.1);
        tl.to("#f12-needle", { x: 80, duration: 0.5, ease: "power2.inOut", yoyo: true, repeat: 1 }, K.fraco - 0.2);
        // Seu Zé: "Ai! Bem aí no meio"
        tl.to("#f12-arm", { rotation: -90, svgOrigin: "0 0", duration: 0.4, ease: "power2.out" }, K.z0 - 0.35);
        tl.set("#f12-pain", { opacity: 1 }, K.z0);
        face(K.z0, "pain");
        tl.set("#f12-mP", { opacity: 0 }, K.z0);
        const n = Math.max(2, Math.floor((K.z1 - K.z0) / 0.24));
        for (let i = 0; i < n; i++) tl.set("#f12-mO", { opacity: i % 2 ? 0 : 1 }, K.z0 + i * 0.24);
        tl.set("#f12-mO", { opacity: 0 }, K.z1);
        tl.set("#f12-mP", { opacity: 1 }, K.z1);
        R.pop(tl, "#f12-ai", K.z0, 0.3);
        R.shake(tl, "#f12-ai", K.z0 + 0.3, 0.3, 6);
        tl.fromTo("#f12-pain circle", { scale: 0.6, svgOrigin: "608 476" }, { scale: 1.3, svgOrigin: "608 476", duration: 0.2, yoyo: true, repeat: 5 }, K.z0);
        R.pop(tl, "#f12-ok", K.z0 + 0.2, 0.4);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.arco - 0.2, vol: 0.4 },
        { name: "glitch-1", t: k.meio - 0.1, vol: 0.3 },
        { name: "sparkle", t: k.alivia, vol: 0.3 },
        { name: "pop", t: k.testes - 0.1, vol: 0.4 },
        { name: "pop", t: k.forca - 0.2, vol: 0.4 },
        { name: "click-soft", t: k.aguenta, vol: 0.4 },
        { name: "impact-bass-1", t: k.z0, vol: 0.35 },
      ],
    };
  },
};
