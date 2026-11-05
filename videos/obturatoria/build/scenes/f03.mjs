// F3 — Título NEURALGIA OBTURATÓRIA + explicação do nome (obturar = fechar) + Vértebra com placa "PORTA"
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines, MINT } = ctx;
    const k = {
      hoje: w(0, "Hoje"), dor: w(0, "dor"), ner: w(0, "nervo"), dica: w(0, "dica"), obt: w(0, "obturar"), fech: w(0, "fechar"),
      bur: w(0, "buraco"), tod: w(0, "todo"),
      v0: lines[1].start, v1: lines[1].end, mag: w(1, "mágico"),
    };
    const chip = (i, a, b, color, x, y, wd) => `<div id="f03-ch${i}" class="abs card" style="left:${x}px;top:${y}px;width:${wd}px;padding:16px 20px;text-align:center;opacity:0">
        <div class="title" style="font-size:42px;color:${color}">${a}</div>
        <div class="label" style="font-size:32px">= ${b}</div></div>`;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f03-title { left:110px; top:110px; font-size:150px; color:${C.ink}; line-height:1; }
        #f03-title .c { display:inline-block; }
        #f03-title2 { left:116px; top:270px; font-size:96px; color:#2E9E78; }
        #f03-hole { left:110px; top:650px; width:780px; padding:16px 22px; display:flex; align-items:center; gap:22px; }
        #f03-hole .t { font-size:36px; }
        #f03-hole .t b { color:#2E9E78; }
        #f03-sign { left:1560px; top:470px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1480" cy="520" r="360" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1400,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1740,880) scale(0.9)">${vertebra("f03v")}</g></g>
    </svg>
    <svg id="f03-sign" class="abs" width="230" height="230" viewBox="-115 -115 230 230" style="opacity:0">
      <line x1="0" y1="20" x2="0" y2="110" ${st} stroke-width="10"/>
      <rect x="-100" y="-100" width="200" height="120" rx="16" fill="#fff" ${st}/>
      <path d="M-40 -6 L-40 -70 Q-40 -86 -24 -86 L24 -86 Q40 -86 40 -70 L40 -6 Z" fill="${MINT}" ${st} stroke-width="5"/>
      <circle cx="24" cy="-40" r="5" fill="${C.ink}"/>
      <text x="0" y="12" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.ink}">PORTA</text>
    </svg>
    <div id="f03-title" class="abs title">${"NEURALGIA".split("").map((c, i) => `<span class="c" id="f03-c${i}">${c}</span>`).join("")}</div>
    <div id="f03-title2" class="abs title" style="opacity:0">OBTURATÓRIA</div>
    ${chip(0, "NEURALGIA", "dor de nervo", C.pain, 110, 420, 380)}
    ${chip(1, "OBTURATÓRIA", "do nervo obturatório", "#2E9E78", 520, 420, 470)}
    <div id="f03-ob" class="abs card" style="left:110px;top:420px;width:880px;padding:16px 20px;text-align:center;opacity:0">
      <div class="title" style="font-size:46px;color:#2E9E78">OBTURAR</div><div class="label" style="font-size:36px">= fechar, tampar</div></div>
    <div id="f03-hole" class="abs card" style="opacity:0">
      <svg width="170" height="130" viewBox="-85 -65 170 130">
        <path d="M-78 -40 Q-60 -62 0 -60 Q60 -62 78 -40 L78 52 L-78 52 Z" fill="${C.bone}" ${st}/>
        <ellipse cx="0" cy="8" rx="46" ry="34" fill="#CFEFE3" ${st}/>
        <g id="f03-memb"><ellipse cx="0" cy="8" rx="46" ry="34" fill="${MINT}" opacity="0.65"/></g>
        <path d="M-18 -26 Q0 -34 18 -26" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round"/>
      </svg>
      <div class="t label">Um buraco do osso da bacia <b>quase todo fechado</b> (só sobra uma portinha em cima)</div>
    </div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420, opacity: 1 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.05 }, 0.05);
        R.rise(tl, "#f03-title2", 0.75, 0.45, 40);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.0, K.dur, 1.5);
        // NEURALGIA = dor de nervo, OBTURATÓRIA = do nervo obturatório
        R.pop(tl, "#f03-ch0", K.dor - 0.1, 0.45);
        R.pop(tl, "#f03-ch1", K.ner - 0.1, 0.45);
        R.gesture(tl, p, K.dor, K.dica, 5);
        // a dica: obturar = fechar
        R.pose(tl, p, K.dica - 0.1, 0.3, { shF: -170, elF: -40 }, "back.out(2)");
        R.face(tl, p, K.dica, { eyes: "wide" });
        R.fadeOut(tl, "#f03-ch0, #f03-ch1", K.obt - 0.25, 0.2);
        R.pop(tl, "#f03-ob", K.obt - 0.05, 0.45);
        tl.to("#f03-ob", { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.fech);
        R.face(tl, p, K.fech, { eyes: "normal" });
        R.pose(tl, p, K.fech, 0.3, { shF: -60, elF: -50 });
        // buraco quase todo fechado
        R.pop(tl, "#f03-hole", K.bur - 0.1, 0.45);
        tl.fromTo("#f03-memb", { scale: 0, svgOrigin: "0 8" }, { scale: 1, svgOrigin: "0 8", duration: 0.5, ease: "back.out(2)" }, K.tod);
        R.face(tl, p, K.tod, { eyes: "happy" });
        // Vértebra pula com a placa PORTA
        const v = "f03v";
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: -110, duration: 0.35, ease: "power2.out" }, K.v0 - 0.45);
        tl.to("#f03-v-wrap", { y: 0, duration: 0.3, ease: "power2.in" }, K.v0 - 0.1);
        R.squash(tl, "#f03v-root", K.v0 + 0.2);
        tl.fromTo("#f03-sign", { y: 300, opacity: 0, rotation: -20 }, { y: 0, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, K.v0 + 0.1);
        R.pose(tl, v, K.v0 + 0.1, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.face(tl, v, K.v0 + 0.1, { eyes: "wide" });
        R.face(tl, v, K.mag - 0.1, { eyes: "happy" });
        tl.to("#f03-sign", { rotation: 12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.mag);
        tl.to("#f03-title, #f03-title2, #f03-ob, #f03-hole", { y: -40, opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.5, vol: 0.2 },
        { name: "pop", t: k.dor - 0.05, vol: 0.4 },
        { name: "pop", t: k.ner - 0.05, vol: 0.4 },
        { name: "pop", t: k.obt, vol: 0.45 },
        { name: "sparkle", t: k.tod, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.45, vol: 0.4 },
        { name: "pop", t: k.v0 + 0.15, vol: 0.35 },
      ],
    };
  },
};
