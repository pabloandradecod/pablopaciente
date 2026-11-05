// F6 — Mito: não é atrito. Placa "esfrega pra frente e pra trás" riscada; zoom: calombo do fêmur + Gordurinha + Dona Faixa;
// joelho dobra 20–30° (ZONA DE APERTO), a faixa aperta a Gordurinha; "milhares de vezes" irrita
export default {
  speakers: { gordurinha: "f06g" },
  build(ctx) {
    const { C, faixa, gordurinha, w, lines } = ctx;
    const k = {
      esfr: w(0, "esfregando"), frente: w(0, "frente"), hoje: w(0, "Hoje"), expl: w(0, "explicação"), emb: w(0, "embaixo"), almo: w(0, "almofadinha"),
      sens: w(0, "sensível"), gord: w(0, "Gordurinha"), dobr: w(0, "dobrado"), vinte: w(0, "vinte"), trinta: w(0, "trinta"), aperta: w(0, "aperta"),
      calombo: w(0, "calombo"), repetir: w(0, "repetir"), milh: w(0, "milhares"), irrita: w(0, "irrita"),
      g0: lines[1].start, g1: lines[1].end, nerv: w(1, "nervinhos"), sens2: w(1, "sensível"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const lab = (id, x, y, txt, col) => `<g id="${id}" opacity="0"><rect x="${x}" y="${y - 28}" width="${txt.length * 14 + 30}" height="42" rx="11" fill="#fff" stroke="${C.ink}" stroke-width="5"/><text x="${x + 15}" y="${y + 1}" font-family="Nunito" font-weight="900" font-size="24" fill="${col || C.ink}">${txt}</text></g>`;
    // joelho de lado (mini diagrama): coxa fixa, perna gira no joelho (300,700)
    return {
      k,
      css: `
        #f06-old { left:90px; top:110px; width:760px; padding:22px 26px; }
        #f06-old .t { font-size:40px; }
        #f06-old .s { font-size:26px; color:${C.pain}; margin-top:6px; }
        #f06-mito { left:520px; top:90px; padding:8px 22px; font-size:46px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:14px; transform: rotate(8deg); }
        #f06-new { left:960px; top:70px; width:860px; padding:14px 22px; font-size:34px; text-align:center; }
        #f06-new b { color:${C.good}; }
        #f06-zone { left:400px; top:560px; padding:10px 22px; font-size:40px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:16px; }
        #f06-mil { left:1260px; top:820px; padding:10px 22px; font-size:38px; }
        #f06-mil b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- mini joelho: coxa + perna -->
      <g id="f06-knee" opacity="0">
        <rect x="270" y="420" width="64" height="290" rx="32" fill="${C.bone}" stroke="${C.ink}" stroke-width="7" transform="rotate(-8 302 700)"/>
        <g id="f06-shin"><rect x="272" y="690" width="60" height="190" rx="30" fill="${C.bone}" ${st}/></g>
        <circle cx="302" cy="700" r="26" fill="#C9B48E" ${st}/>
        <g id="f06-prot" opacity="0"><path d="M302 700 L302 860 A160 160 0 0 0 357 850 Z" fill="${C.pain}" opacity="0.15"/>
          <path d="M302 700 L357 850 A160 160 0 0 1 382 838 Z" fill="${C.pain}" opacity="0.75"/>
          <path d="M302 860 A160 160 0 0 0 462 700" fill="none" stroke="${C.ink}" stroke-width="5" stroke-dasharray="8 8"/>
          <text x="420" y="860" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.pain}">20–30°</text></g>
      </g>
      <!-- painel de zoom -->
      <g id="f06-zoom" opacity="0">
        <rect x="940" y="180" width="900" height="620" rx="30" fill="#FFE4DC" ${st}/>
        <path d="M960 790 L960 640 Q1140 560 1390 610 Q1640 560 1820 640 L1820 790 Z" fill="${C.bone}" ${st}/>
        <g id="f06-g-wrap"><g transform="translate(1390,612) scale(1.2)">${gordurinha("f06g")}</g></g>
        <g id="f06-f-wrap"><g transform="translate(1080,420)"><g transform="rotate(90) scale(1.0)">${faixa("f06f")}</g></g></g>
        <g id="f06-fl" opacity="0"><path d="M1610 300 L1680 380" stroke="${C.ink}" stroke-width="4"/></g>
        ${lab("f06-l1", 1500, 260, "Dona Faixa (o trato)", "#6E86A3")}
        ${lab("f06-l2", 1440, 690, "Gordurinha: cheia de nervos", "#B98A00")}
        ${lab("f06-l3", 1010, 760, "calombo do fêmur", C.ink)}
        <g id="f06-zz" opacity="0">${[0, 1, 2, 3, 4].map((i) => `<path d="M${1290 + i * 50} 450 l10 -16 l10 16" stroke="${C.pain}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")}</g>
      </g>
      <g id="f06-saw"><g transform="translate(470,420)"><g id="f06-saw-in"><path d="M-110 -16 L110 -16 L110 16 L-110 16 Z" fill="#C7D1D6" stroke="${C.ink}" stroke-width="5"/><path d="M-110 16 ${Array.from({ length: 11 }, (_, i) => `L${-100 + i * 20} 30 L${-90 + i * 20} 16`).join(" ")}" fill="#C7D1D6" stroke="${C.ink}" stroke-width="4"/><rect x="110" y="-24" width="50" height="48" rx="12" fill="#8B5A2B" stroke="${C.ink}" stroke-width="5"/></g></g></g>
      <line id="f06-strike" x1="80" y1="250" x2="870" y2="130" stroke="${C.pain}" stroke-width="14" stroke-linecap="round" opacity="0"/>
    </svg>
    <div id="f06-old" class="abs card"><div class="t title">"A faixa ESFREGA no osso, pra frente e pra trás"</div><div class="s label">explicação antiga</div></div>
    <div id="f06-mito" class="abs title" style="opacity:0">MITO!</div>
    <div id="f06-new" class="abs card label" style="opacity:0">Hoje: a faixa <b>APERTA</b> uma almofadinha sensível contra o osso</div>
    <div id="f06-zone" class="abs title" style="opacity:0">ZONA DE APERTO</div>
    <div id="f06-mil" class="abs card label" style="opacity:0">× <b>milhares</b> de vezes = irrita!</div>`,
      js: function (tl, K, R) {
        // placa antiga + serrote indo e voltando
        tl.fromTo("#f06-old", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.1);
        tl.fromTo("#f06-saw", { opacity: 0 }, { opacity: 1, duration: 0.3 }, K.esfr - 0.2);
        tl.fromTo("#f06-saw-in", { x: -60 }, { x: 60, duration: 0.25, yoyo: true, repeat: 9, ease: "sine.inOut" }, K.esfr);
        // riscada
        tl.set("#f06-strike", { opacity: 1 }, K.hoje - 0.1);
        R.draw(tl, "#f06-strike", K.hoje - 0.1, 0.3, "power2.out");
        R.pop(tl, "#f06-mito", K.hoje + 0.1, 0.35);
        tl.to("#f06-old, #f06-saw, #f06-strike, #f06-mito", { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" }, K.emb - 0.4);
        // painel novo
        R.pop(tl, "#f06-new", K.expl - 0.1, 0.4);
        tl.fromTo("#f06-zoom", { opacity: 0, scale: 0.9, svgOrigin: "1390 490" }, { opacity: 1, scale: 1, svgOrigin: "1390 490", duration: 0.45, ease: "back.out(1.6)" }, K.emb - 0.2);
        R.face(tl, "f06f", 0, { eyes: "normal", mouth: "smile" });
        R.face(tl, "f06g", 0, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f06-l1", K.emb + 0.2, 0.3);
        tl.fromTo("#f06-g-wrap", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, K.almo - 0.2);
        R.pop(tl, "#f06-l2", K.sens - 0.1, 0.3);
        tl.fromTo("#f06g-nerves", { opacity: 1 }, { opacity: 0.25, duration: 0.12, yoyo: true, repeat: 5 }, K.sens);
        R.face(tl, "f06g", K.gord, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f06g", K.gord, 0.25, { armF: -140, armB: 140 }, "back.out(2)");
        R.pose(tl, "f06g", K.gord + 0.6, 0.25, { armF: 0, armB: 0 });
        // joelho dobra 20–30°
        tl.fromTo("#f06-knee", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, K.dobr - 0.5);
        tl.to("#f06-shin", { rotation: -25, svgOrigin: "302 700", duration: 0.6, ease: "power2.inOut" }, K.dobr);
        R.pop(tl, "#f06-prot", K.vinte - 0.1, 0.35);
        R.pop(tl, "#f06-zone", K.trinta, 0.4);
        // aperta!
        tl.to("#f06-f-wrap", { y: 54, duration: 0.25, ease: "power3.in" }, K.aperta);
        tl.to("#f06-g-wrap", { scaleY: 0.72, svgOrigin: "1390 612", duration: 0.25, ease: "power3.in" }, K.aperta + 0.05);
        R.face(tl, "f06f", K.aperta, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f06g", K.aperta + 0.1, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f06-l3", K.calombo - 0.1, 0.3);
        // repetir milhares de vezes: aperta e solta, junto com o joelho
        const n = 5;
        for (let i = 0; i < n; i++) {
          const t = K.repetir + i * 0.42;
          tl.to("#f06-f-wrap", { y: 20, duration: 0.18, ease: "power2.out" }, t);
          tl.to("#f06-f-wrap", { y: 54, duration: 0.18, ease: "power2.in" }, t + 0.2);
          tl.to("#f06-shin", { rotation: -5, svgOrigin: "302 700", duration: 0.18 }, t);
          tl.to("#f06-shin", { rotation: -25, svgOrigin: "302 700", duration: 0.18 }, t + 0.2);
        }
        R.pop(tl, "#f06-mil", K.milh - 0.1, 0.4);
        tl.set("#f06-zz", { opacity: 1 }, K.irrita);
        tl.fromTo("#f06-zz", { y: 10 }, { y: -6, duration: 0.15, yoyo: true, repeat: 7 }, K.irrita);
        R.face(tl, "f06g", K.irrita, { eyes: "pain", mouth: "scream" });
        // fala da Gordurinha
        R.face(tl, "f06g", K.g0 - 0.1, { eyes: "wide" });
        tl.to("#f06g-nerves", { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 9 }, K.nerv);
        R.face(tl, "f06g", K.sens2, { eyes: "pain" });
      },
      sfx: [
        { name: "whoosh-short", t: k.esfr, vol: 0.3 },
        { name: "error", t: k.hoje, vol: 0.3 },
        { name: "pop", t: k.emb - 0.2, vol: 0.35 },
        { name: "pop", t: k.almo - 0.2, vol: 0.35 },
        { name: "pop", t: k.trinta, vol: 0.35 },
        { name: "impact-bass-1", t: k.aperta, vol: 0.4 },
        { name: "glitch-1", t: k.irrita, vol: 0.25 },
      ],
    };
  },
};
