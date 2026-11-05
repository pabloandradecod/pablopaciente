// F5 — Sintoma, não diagnóstico: placa da definição, carimbo, painel do carro, Vértebra confusa
export default {
  speakers: { pablo: "f05p", vertebra: "f05v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      cia: w(0, "Ciatalgia"), cam: w(0, "caminho"), det: w(0, "detalhe"), sint: w(0, "SINTOMA"), diag: w(0, "diagnóstico"),
      luz: w(0, "luz"), acende: w(0, "acende"), porq: w(0, "porquê"),
      v0: lines[1].start, v1: lines[1].end, alarme: w(1, "alarme"), ladrao: w(1, "ladrão"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const gauge = (cx, id) => `<g transform="translate(${cx},640)">
        <circle r="105" fill="#12313A" stroke="${C.ink}" stroke-width="8"/>
        ${Array.from({ length: 9 }, (_, i) => { const a = (-210 + i * 30) * Math.PI / 180; return `<line x1="${Math.cos(a) * 78}" y1="${Math.sin(a) * 78}" x2="${Math.cos(a) * 92}" y2="${Math.sin(a) * 92}" stroke="#CFE3DF" stroke-width="6" stroke-linecap="round"/>`; }).join("")}
        <g id="${id}"><line x1="0" y1="0" x2="0" y2="-74" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/></g>
        <circle r="12" fill="${C.cream}" stroke="${C.ink}" stroke-width="4"/></g>`;
    return {
      k,
      css: `
        #f05-def { left:470px; top:70px; width:980px; padding:22px 36px; font-size:52px; text-align:center; line-height:1.15; }
        #f05-def b { color:${C.pain}; }
        #f05-stamp { left:610px; top:268px; padding:10px 34px; font-size:58px; color:${C.pain}; border:9px solid ${C.pain}; border-radius:18px; background:rgba(255,246,233,0.92); white-space:nowrap; }
        #f05-cmp { left:470px; top:410px; width:980px; text-align:center; font-size:40px; }
        #f05-cmp .tag { display:inline-block; padding:8px 22px; border-radius:16px; border:6px solid ${C.ink}; background:#fff; margin:0 14px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- painel do carro -->
      <g id="f05-dash" opacity="0">
        <path d="M560 860 L560 560 Q560 470 660 470 L1260 470 Q1360 470 1360 560 L1360 860 Z" fill="#24485A" stroke="${C.ink}" stroke-width="9" stroke-linejoin="round"/>
        ${gauge(720, "f05-needle1")}
        ${gauge(1200, "f05-needle2")}
        <g transform="translate(960,640)">
          <g id="f05-glow" opacity="0"><circle r="95" fill="${C.sun}" opacity="0.35"/><circle r="70" fill="${C.sun}" opacity="0.45"/></g>
          <g id="f05-light">
            <path d="M0 -58 L54 40 L-54 40 Z" fill="#5B6B70" ${st}/>
            <path d="M0 -24 L0 10" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="26" r="6" fill="${C.ink}"/>
          </g>
        </g>
        <rect x="860" y="760" width="200" height="56" rx="12" fill="#12313A" stroke="${C.ink}" stroke-width="6"/>
        <text x="960" y="799" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="#7FE0C4">88 km/h</text>
      </g>
      <!-- lupa (mecânico procurando o porquê) -->
      <g transform="translate(1290,470)"><g id="f05-lupa" opacity="0"><circle r="52" fill="#E8F7FF" fill-opacity="0.6" ${st} stroke-width="10"/><path d="M38 38 L92 92" ${st} stroke-width="18"/></g></g>
      <g transform="translate(330,640) scale(1.25)">${human("f05p", "pablo")}</g>
      <g id="f05-v-wrap"><g transform="translate(1660,880) scale(0.9)">${vertebra("f05v")}</g></g>
      <g id="f05-scratch" opacity="0"><path d="M1600 560 q10 -16 20 0 q10 16 20 0" fill="none" ${st} stroke-width="5"/><path d="M1700 540 q10 -16 20 0 q10 16 20 0" fill="none" ${st} stroke-width="5"/></g>
      <!-- ícones alarme x ladrão -->
      <g transform="translate(1470,480)"><g id="f05-bell" opacity="0">
        <path d="M-40 30 Q-40 -40 0 -44 Q40 -40 40 30 L52 44 L-52 44 Z" fill="${C.sun}" ${st}/><circle cx="0" cy="54" r="12" fill="${C.sun}" ${st}/>
        <path d="M-66 -30 q-14 20 0 40 M66 -30 q14 20 0 40" fill="none" ${st} stroke-width="6"/>
      </g></g>
      <g transform="translate(1700,460)"><g id="f05-thief" opacity="0">
        <circle r="48" fill="${C.skinB}" ${st}/><rect x="-52" y="-18" width="104" height="26" rx="12" fill="${C.ink}"/>
        <circle cx="-18" cy="-5" r="6" fill="#fff"/><circle cx="18" cy="-5" r="6" fill="#fff"/>
        <path d="M-64 -64 L64 64" stroke="${C.pain}" stroke-width="14" stroke-linecap="round"/>
      </g></g>
    </svg>
    <div id="f05-def" class="abs card label" style="opacity:0">CIATALGIA = <b>dor</b> no caminho do <b>nervo ciático</b></div>
    <div id="f05-stamp" class="abs title" style="opacity:0">É SINTOMA, NÃO DIAGNÓSTICO</div>`,
      js: function (tl, K, R) {
        const p = "f05p", v = "f05v";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.blinks(tl, p, 0.3, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.blinks(tl, v, 0.5, K.v0);
        // placa da definição
        R.drop(tl, "#f05-def", K.cia - 0.15, 0.7, -320);
        R.pose(tl, p, K.cia, 0.4, { shF: -120, elF: -30 }, "back.out(1.8)");
        R.pose(tl, p, K.det - 0.3, 0.4, { shF: -20, elF: -40 });
        // carimbo
        tl.fromTo("#f05-stamp", { scale: 2.6, opacity: 0, rotation: -18 }, { scale: 1, opacity: 1, rotation: -5, duration: 0.25, ease: "power4.in" }, K.sint - 0.1);
        R.shake(tl, "#f05-def", K.sint + 0.15, 0.25, 6);
        R.face(tl, p, K.sint, { eyes: "wide" });
        R.pose(tl, p, K.sint, 0.3, { shF: -80, elF: -90 }, "back.out(2)");
        R.face(tl, p, K.diag + 0.4, { eyes: "normal" });
        // Vértebra confusa coça a cabeça
        R.face(tl, v, K.diag, { mouth: "flat" });
        R.pose(tl, v, K.diag, 0.3, { armF: -160 }, "back.out(2)");
        for (let i = 0; i < 4; i++) R.pose(tl, v, K.diag + 0.3 + i * 0.18, 0.09, { armF: i % 2 ? -160 : -140 }, "sine.inOut");
        R.fadeIn(tl, "#f05-scratch", K.diag + 0.2, 0.2);
        R.fadeOut(tl, "#f05-scratch", K.luz + 0.3, 0.2);
        R.pose(tl, v, K.luz + 0.2, 0.4, { armF: 20 });
        // painel do carro
        R.pop(tl, "#f05-dash", K.luz - 0.2, 0.5, 0.6);
        tl.fromTo("#f05-needle1", { rotation: -110, svgOrigin: "0 0" }, { rotation: 10, svgOrigin: "0 0", duration: 0.8, ease: "back.out(1.5)" }, K.luz);
        tl.fromTo("#f05-needle2", { rotation: -110, svgOrigin: "0 0" }, { rotation: -30, svgOrigin: "0 0", duration: 0.9, ease: "back.out(1.5)" }, K.luz + 0.1);
        R.pose(tl, p, K.luz, 0.4, { shF: -70, elF: -10 });
        // acende!
        tl.to("#f05-light path:first-child", { fill: "#FF8A3D", duration: 0.05 }, K.acende);
        for (let i = 0; i < 6; i++) tl.set("#f05-glow", { opacity: i % 2 ? 0 : 1 }, K.acende + i * 0.22);
        tl.set("#f05-glow", { opacity: 1 }, K.acende + 1.4);
        R.squash(tl, "#f05-light", K.acende, "50% 70%");
        // lupa procurando o porquê
        tl.fromTo("#f05-lupa", { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, K.porq - 0.5);
        tl.to("#f05-lupa", { x: -330, y: 170, duration: 0.6, ease: "power2.inOut" }, K.porq - 0.4);
        tl.to("#f05-lupa", { x: -260, y: 140, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.porq + 0.2);
        R.pose(tl, p, K.porq, 0.4, { shF: -20, elF: -40 });
        // Vértebra pergunta: alarme, não o ladrão
        R.fadeOut(tl, "#f05-lupa", K.v0 - 0.3);
        R.face(tl, v, K.v0 - 0.2, { eyes: "wide" });
        R.pose(tl, v, K.v0, 0.3, { armF: -90, armB: 30 }, "back.out(2)");
        R.pop(tl, "#f05-bell", K.alarme - 0.05, 0.4);
        R.shake(tl, "#f05-bell", K.alarme + 0.35, 0.5, 4);
        R.pop(tl, "#f05-thief", K.ladrao - 0.05, 0.4);
        // Dr. Pablo aprova
        R.face(tl, p, K.v1 + 0.05, { eyes: "happy", mouth: "grin" });
        R.pose(tl, p, K.v1, 0.35, { shF: -150, elF: -20 }, "back.out(2)");
        R.face(tl, v, K.v1 + 0.15, { eyes: "happy" });
      },
      sfx: [
        { name: "whoosh-short", t: k.cia - 0.15, vol: 0.4 },
        { name: "impact-bass-1", t: k.sint + 0.12, vol: 0.55 },
        { name: "pop", t: k.luz - 0.15, vol: 0.4 },
        { name: "ping", t: k.acende, vol: 0.35 },
        { name: "pop", t: k.alarme, vol: 0.4 },
        { name: "pop", t: k.ladrao, vol: 0.4 },
      ],
    };
  },
};
