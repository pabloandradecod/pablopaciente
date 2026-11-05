// F3 — Título MERALGIA PARESTÉSICA + tradução MERO / ALGIA / PARESTESIA + Vértebra com dicionário
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines, LILAC } = ctx;
    const k = {
      hoje: w(0, "Hoje"), nome: w(0, "Nome"), olha: w(0, "olha"), mero: w(0, "mero"), algia: w(0, "algia"), par: w(0, "parestesia"),
      seja: w(0, "seja"), coxa2: w(0, "coxa", 1),
      v0: lines[1].start, v1: lines[1].end, spo: w(1, "spoiler"),
    };
    const chip = (i, a, b, color) => `<div id="f03-ch${i}" class="abs card" style="left:${110 + i * 400}px;top:480px;width:370px;padding:18px 20px;text-align:center;opacity:0">
        <div class="title" style="font-size:44px;color:${color}">${a}</div>
        <div class="label" style="font-size:34px">= ${b}</div></div>`;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f03-title { left:110px; top:120px; font-size:150px; color:${C.ink}; line-height:1; }
        #f03-title .c { display:inline-block; }
        #f03-title2 { left:116px; top:280px; font-size:92px; color:#8E6CD8; }
        #f03-res { left:110px; top:690px; padding:18px 30px; font-size:48px; background:${LILAC}; }
        #f03-res b { color:${C.ink}; font-family:"Montserrat"; font-weight:900; }
        #f03-dict { left:1610px; top:520px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1480" cy="520" r="360" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1440,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1740,880) scale(0.9)">${vertebra("f03v")}</g></g>
    </svg>
    <svg id="f03-dict" class="abs" width="170" height="140" viewBox="-85 -70 170 140" style="opacity:0">
      <path d="M-76 -50 L0 -40 L76 -50 L76 50 L0 60 L-76 50 Z" fill="${C.pain}" ${st}/>
      <path d="M-66 -42 L-4 -34 L-4 50 L-66 42 Z" fill="#fff" ${st} stroke-width="4"/>
      <path d="M66 -42 L4 -34 L4 50 L66 42 Z" fill="#fff" ${st} stroke-width="4"/>
      <path d="M-56 -22 L-16 -18 M-56 -6 L-16 -2 M-56 10 L-24 13 M16 -18 L56 -22 M16 -2 L56 -6 M16 14 L48 11" ${st} stroke-width="3"/>
      <text x="0" y="-56" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.ink}">DICIONÁRIO</text>
    </svg>
    <div id="f03-title" class="abs title">${"MERALGIA".split("").map((c, i) => `<span class="c" id="f03-c${i}">${c}</span>`).join("")}</div>
    <div id="f03-title2" class="abs title" style="opacity:0">PARESTÉSICA</div>
    ${chip(0, "MERO", "coxa", "#8E6CD8")}
    ${chip(1, "ALGIA", "dor", C.pain)}
    ${chip(2, "PARESTESIA", "formigamento", "#2E8B6E")}
    <div id="f03-res" class="abs card label" style="opacity:0">Ou seja: <b>DOR + FORMIGAMENTO</b> na <b>COXA</b></div>`,
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
        // "Nome difícil": coça a cabeça
        R.pose(tl, p, K.nome, 0.3, { shF: -170, elF: -110 }, "back.out(2)");
        R.face(tl, p, K.nome, { eyes: "wide" });
        R.pose(tl, p, K.olha, 0.3, { shF: -100, elF: -30 }, "back.out(2)");
        R.face(tl, p, K.olha, { eyes: "normal" });
        // tradução, peça por peça
        [K.mero, K.algia, K.par].forEach((t, i) => {
          R.pop(tl, `#f03-ch${i}`, t - 0.1, 0.45);
          tl.to(`#f03-ch${i}`, { y: -12, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.out" }, t + 0.5);
        });
        R.gesture(tl, p, K.algia + 0.3, K.seja - 0.1, 7);
        R.pop(tl, "#f03-res", K.seja - 0.1, 0.5);
        tl.to("#f03-res", { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.coxa2);
        R.face(tl, p, K.seja, { eyes: "happy" });
        // Vértebra pula com o dicionário
        const v = "f03v";
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: -110, duration: 0.35, ease: "power2.out" }, K.v0 - 0.45);
        tl.to("#f03-v-wrap", { y: 0, duration: 0.3, ease: "power2.in" }, K.v0 - 0.1);
        R.squash(tl, "#f03v-root", K.v0 + 0.2);
        tl.fromTo("#f03-dict", { y: 300, opacity: 0, rotation: -20 }, { y: 0, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, K.v0 + 0.1);
        R.pose(tl, v, K.v0 + 0.1, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.face(tl, v, K.spo - 0.2, { eyes: "happy" });
        tl.to("#f03-dict", { rotation: 12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.spo);
        R.face(tl, p, K.spo + 0.2, { eyes: "happy" });
        tl.to("#f03-title, #f03-title2, #f03-res", { y: -40, opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.5, vol: 0.2 },
        ...[k.mero, k.algia, k.par].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.4 })),
        { name: "sparkle", t: k.seja, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.45, vol: 0.4 },
        { name: "pop", t: k.v0 + 0.15, vol: 0.35 },
      ],
    };
  },
};
