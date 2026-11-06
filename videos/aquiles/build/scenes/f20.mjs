// F20 — Degrau 2: força lenta e pesada — elevação de calcanhar em pé (joelho esticado) e sentado com peso nos joelhos (sóleo); 3 s sobe / 3 s desce; carga sobe aos poucos; Aquiles fica forte
export default {
  speakers: { aquiles: "f20a" },
  extra: 0.4,
  build(ctx) {
    const { C, human, aquiles, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), forca: w(0, "força"), lenta: w(0, "lenta"), elev: w(0, "Elevação"), pe: w(0, "pé,"), esti: w(0, "esticado"), sent: w(0, "sentado"),
      peso: w(0, "peso"), trab: w(0, "trabalha"), outro: w(0, "outro"), tres: w(0, "Três"), sub: w(0, "subir"), desc: w(0, "descer"), aum: w(0, "aumentando"),
      a0: lines[1].start, a1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    return {
      k,
      css: `
        #f20-head { left:110px; top:60px; font-size:64px; }
        #f20-head span { color:#1E9C72; }
        #f20-card { left:1330px; top:150px; width:520px; padding:22px 28px; }
        #f20-card .t { font-size:36px; }
        #f20-card .row { font-size:27px; margin-top:11px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f20-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f20-tag1, #f20-tag2 { left:110px; top:170px; padding:10px 18px; font-size:30px; }
        #f20-tempo { left:960px; top:170px; width:230px; padding:12px; text-align:center; }
        #f20-tempo .n { font-size:42px; }
        #f20-load { left:1330px; top:620px; width:380px; padding:12px 18px; }
        #f20-load .l { font-size:22px; }
        #f20-strong { left:1040px; top:420px; padding:10px 18px; font-size:30px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <!-- metrônomo -->
      <g id="f20-metro" opacity="0">
        <path d="M120 850 L250 850 L212 630 L158 630 Z" fill="#8B5A2B" ${st}/>
        <g id="f20-pend"><line x1="185" y1="830" x2="185" y2="640" stroke="${C.ink}" stroke-width="8"/><rect x="171" y="690" width="28" height="22" rx="4" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/></g>
      </g>
      <!-- em pé -->
      <g id="f20-stand"><g transform="translate(560,608) scale(1.3)">${human("f20p", "pablo")}</g></g>
      <!-- sentado com peso -->
      <g id="f20-sit" opacity="0">
        <rect x="430" y="720" width="230" height="40" rx="10" fill="#C99A62" stroke="${C.ink}" stroke-width="7"/>
        <rect x="450" y="760" width="26" height="100" fill="#A87A4A" stroke="${C.ink}" stroke-width="6"/><rect x="614" y="760" width="26" height="100" fill="#A87A4A" stroke="${C.ink}" stroke-width="6"/>
        <g transform="translate(560,722) scale(1.3)">${human("f20s", "pablo")}
          <g id="f20-plate"><rect x="40" y="-38" width="100" height="26" rx="8" fill="#5E6B73" stroke="${C.ink}" stroke-width="5"/><text x="90" y="-18" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="18" fill="#fff">10 kg</text></g>
        </g>
      </g>
      <g id="f20-a-wrap" opacity="0"><g transform="translate(900,850) scale(0.62)">${aquiles("f20a")}</g></g>
    </svg>
    <div id="f20-head" class="abs title">Degrau 2: <span>FORÇA LENTA E PESADA</span></div>
    <div id="f20-tag1" class="abs card label" style="opacity:0">Em pé · <b style="color:#1E9C72">joelho esticado</b></div>
    <div id="f20-tag2" class="abs card label" style="opacity:0">Sentado · <b style="color:#1E9C72">peso nos joelhos</b></div>
    <div id="f20-tempo" class="abs card" style="opacity:0"><div class="n title"><span style="color:#1E9C72">3s</span> sobe</div><div class="n title"><span style="color:${C.pain}">3s</span> desce</div></div>
    <div id="f20-strong" class="abs card label" style="opacity:0">tendão mais forte!</div>
    <div id="f20-load" class="abs card" style="opacity:0"><div class="l label">CARGA NAS SEMANAS</div>
      <svg width="340" height="120" viewBox="0 0 340 120"><line x1="10" y1="112" x2="330" y2="112" stroke="${C.ink}" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect id="f20-l${i}" x="${20 + i * 52}" y="${108 - (14 + i * 14)}" width="38" height="${14 + i * 14}" rx="6" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</svg></div>
    <div id="f20-card" class="abs card" style="opacity:0">
      <div class="t title">Elevação de calcanhar</div>
      <div class="row label"><span class="dot"></span>Em pé, joelho esticado</div>
      <div class="row label"><span class="dot"></span>Sentado, peso nos joelhos</div>
      <div class="row label"><span class="dot"></span>3 s sobe · 3 s desce</div>
      <div class="row label"><span class="dot"></span>3 séries de 8 a 15</div>
    </div>`,
      js: function (tl, K, R) {
        const p = "f20p", s = "f20s";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.4, K.sent);
        R.pop(tl, "#f20-card", K.forca - 0.2, 0.45, 0.6);
        // metrônomo
        tl.set("#f20-metro", { opacity: 1 }, K.lenta - 0.2);
        tl.fromTo("#f20-metro", { y: 200 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.lenta - 0.2);
        tl.fromTo("#f20-pend", { rotation: -22 }, { rotation: 22, svgOrigin: "185 830", duration: 0.75, yoyo: true, repeat: Math.max(3, Math.floor((K.dur - K.lenta) / 0.75) - 1), ease: "sine.inOut" }, K.lenta);
        // em pé: sobe e desce devagar
        R.pop(tl, "#f20-tag1", K.elev - 0.1, 0.4);
        let t = K.elev;
        const upEnd = K.sent - 0.4;
        while (t + 2.2 < upEnd) {
          R.pose(tl, p, t, 1.0, { anF: 32, anB: 32 }, "sine.inOut");
          R.move(tl, p, t, 1.0, 0, -26, "sine.inOut");
          R.pose(tl, p, t + 1.1, 1.0, { anF: 0, anB: 0 }, "sine.inOut");
          R.move(tl, p, t + 1.1, 1.0, 0, 0, "sine.inOut");
          t += 2.2;
        }
        R.face(tl, p, K.elev + 0.5, { eyes: "normal", mouth: "flat" });
        // troca para sentado
        R.fadeOut(tl, "#f20-tag1", K.sent - 0.3, 0.2);
        tl.to("#f20-stand", { opacity: 0, duration: 0.3 }, K.sent - 0.3);
        tl.to("#f20-sit", { opacity: 1, duration: 0.3 }, K.sent - 0.3);
        R.pop(tl, "#f20-tag2", K.sent, 0.4);
        R.setPose(tl, s, 0, { hipF: -90, knF: 90, hipB: -88, knB: 88, shF: -50, elF: -40, shB: -40, elB: -50 });
        R.face(tl, s, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, s, K.sent, K.dur);
        tl.fromTo("#f20-plate", { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "bounce.out" }, K.peso - 0.1);
        // reps sentado, devagar (3 s / 3 s comprimido pra caber)
        let u = K.trab;
        while (u + 2.4 < K.a0 - 0.2) {
          R.pose(tl, s, u, 1.1, { anF: 26, anB: 26 }, "sine.inOut");
          R.move(tl, s, u, 1.1, 0, -16, "sine.inOut");
          tl.to("#f20-plate", { y: -16, duration: 1.1, ease: "sine.inOut" }, u);
          R.pose(tl, s, u + 1.2, 1.1, { anF: 0, anB: 0 }, "sine.inOut");
          R.move(tl, s, u + 1.2, 1.1, 0, 0, "sine.inOut");
          tl.to("#f20-plate", { y: 0, duration: 1.1, ease: "sine.inOut" }, u + 1.2);
          u += 2.4;
        }
        R.pop(tl, "#f20-tempo", K.tres - 0.2, 0.4);
        // carga semana a semana
        R.fadeOut(tl, "#f20-card", K.aum - 0.5, 0.2);
        tl.to("#f20-load", { y: -470, duration: 0.01 }, 0);
        R.pop(tl, "#f20-load", K.aum - 0.3, 0.4);
        for (let i = 0; i < 6; i++) tl.fromTo(`#f20-l${i}`, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, K.aum + i * 0.1);
        // Aquiles fica forte
        tl.set("#f20-a-wrap", { opacity: 1 }, K.a0 - 0.4);
        tl.fromTo("#f20-a-wrap", { y: 300 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, K.a0 - 0.4);
        R.face(tl, "f20a", 0, { eyes: "happy", mouth: "grin" });
        R.setPose(tl, "f20a", 0, { armF: -20, armB: 20 });
        R.pose(tl, "f20a", K.a0, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        tl.fromTo("#f20a-body", { scale: 1 }, { scale: 1.12, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.a0 + 0.3);
        R.pop(tl, "#f20-strong", K.a0 + 0.3, 0.4);
      },
      sfx: [
        { name: "pop", t: k.forca - 0.2, vol: 0.35 },
        { name: "click-soft", t: k.lenta + 0.75, vol: 0.3 }, { name: "click-soft", t: k.lenta + 2.25, vol: 0.3 }, { name: "click-soft", t: k.lenta + 3.75, vol: 0.3 },
        { name: "pop", t: k.elev - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.sent - 0.3, vol: 0.35 },
        { name: "impact-bass-2", t: k.peso + 0.2, vol: 0.3 },
        { name: "pop", t: k.tres - 0.2, vol: 0.3 },
        { name: "pop", t: k.aum - 0.3, vol: 0.3 },
        { name: "sparkle", t: k.a0 + 0.3, vol: 0.35 },
      ],
    };
  },
};
