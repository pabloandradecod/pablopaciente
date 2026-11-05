// F18 — Ajuste 2: passos mais curtos e mais rápidos (cadência +5 a 10%), metrônomo; Gordurinha respira
export default {
  speakers: { gordurinha: "f18g" },
  tail: 1.0,
  build(ctx) {
    const { C, human, gordurinha, w, lines } = ctx;
    const k = {
      dois: w(0, "Dois"), curt: w(0, "curtos"), rap: w(0, "rápidos"), cad: w(0, "cadência"), cinco: w(0, "cinco"), dim: w(0, "diminui"), carga: w(0, "carga"),
      met: w(0, "metrônomo"), cel: w(0, "celular"), g0: lines[1].start, g1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const foot = (x, y, col) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="12" fill="${col}" stroke="${C.ink}" stroke-width="4"/>`;
    return {
      k,
      css: `
        #f18-title { left:110px; top:60px; font-size:70px; }
        #f18-title span { color:#1E9C72; }
        #root .f18-lab { position:absolute; top:170px; padding:8px 20px; font-size:34px; border:6px solid ${C.ink}; border-radius:16px; }
        #f18-l1 { left:180px; background:#FFD3C9; } #f18-l2 { left:760px; background:#D6F7EA; }
        #f18-cad { left:1240px; top:170px; width:560px; padding:18px 24px; }
        #f18-cad .t { font-size:30px; line-height:1.15; }
        #f18-cad .big { font-size:64px; color:#1E9C72; }
        #f18-load { left:1240px; top:410px; width:560px; padding:16px 24px; }
        #f18-load .t { font-size:26px; margin-bottom:6px; }
        #f18-phone { left:1300px; top:610px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <rect y="800" width="1920" height="280" fill="#9AA3A8"/><line x1="0" y1="800" x2="1920" y2="800" stroke="${C.ink}" stroke-width="7"/>
      <line x1="640" y1="160" x2="640" y2="800" stroke="${C.ink}" stroke-width="5" stroke-dasharray="14 12"/>
      <!-- passada longa -->
      <g id="f18-long"><g transform="translate(320,560) scale(1.0)">${human("f18a", "cida")}</g></g>
      <g id="f18-fl">${foot(150, 826, "#FFB3A7")}${foot(470, 826, "#FFB3A7")}<path d="M180 846 L440 846" stroke="${C.pain}" stroke-width="6" stroke-dasharray="10 8"/><text x="310" y="880" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.pain}">pé lá na frente</text></g>
      <g id="f18-x"><path d="M500 300 L570 370 M570 300 L500 370" stroke="${C.pain}" stroke-width="14" stroke-linecap="round"/></g>
      <!-- passada curta -->
      <g id="f18-short"><g transform="translate(900,560) scale(1.0)">${human("f18b", "cida")}</g></g>
      <g id="f18-fs" opacity="0">${foot(840, 826, "#A6F0D6")}${foot(960, 826, "#A6F0D6")}${foot(1080, 826, "#A6F0D6")}<text x="960" y="870" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="#1E9C72">pé embaixo do corpo</text></g>
      <g id="f18-ok" opacity="0"><circle cx="1110" cy="335" r="40" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/><path d="M1092 336 L1106 350 L1130 320" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/></g>
      <g id="f18-g-wrap" opacity="0"><g transform="translate(1720,790) scale(0.75)">${gordurinha("f18g")}</g></g>
    </svg>
    <div id="f18-title" class="abs title" style="opacity:0">2. Passos <span>mais curtos</span></div>
    <div id="f18-l1" class="f18-lab title" style="opacity:0">PASSADA LONGA</div>
    <div id="f18-l2" class="f18-lab title" style="opacity:0">PASSADA CURTA</div>
    <div id="f18-cad" class="abs card" style="opacity:0"><div class="t label">Cadência (passos por minuto)</div><div class="big title">+5 a 10%</div></div>
    <div id="f18-load" class="abs card" style="opacity:0"><div class="t label">CARGA NO JOELHO</div>
      <svg width="510" height="50" viewBox="0 0 510 50"><rect x="4" y="8" width="500" height="34" rx="17" fill="#E8EEF1" stroke="${C.ink}" stroke-width="5"/><rect id="f18-lbar" x="4" y="8" width="460" height="34" rx="17" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/></svg></div>
    <div id="f18-phone" class="abs" style="opacity:0">
      <svg width="200" height="230" viewBox="0 0 200 230"><rect x="40" y="6" width="120" height="216" rx="22" fill="${C.ink}"/><rect x="52" y="26" width="96" height="170" rx="10" fill="#fff"/>
        <path d="M80 170 L100 60 L120 170 Z" fill="#C99A62" stroke="${C.ink}" stroke-width="4"/><g id="f18-arm"><line x1="100" y1="160" x2="100" y2="80" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/></g>
        <text x="100" y="188" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="18" fill="${C.ink}">♩ 172</text></svg></div>`,
      js: function (tl, K, R) {
        R.setPose(tl, "f18a", 0, { hipF: -55, knF: 0, anF: 20, hipB: 30, knB: 40, shF: 30, elF: -80, shB: -50, elB: -80, torso: 4 });
        R.setPose(tl, "f18b", 0, { hipF: -25, knF: 25, hipB: 20, knB: 40, shF: 20, elF: -80, shB: -30, elB: -80, torso: 8 });
        R.face(tl, "f18a", 0, { eyes: "pain", mouth: "frown" });
        R.face(tl, "f18b", 0, { eyes: "happy", mouth: "smile" });
        tl.set("#f18-short, #f18-ok", { opacity: 0 }, 0);
        R.rise(tl, "#f18-title", Math.max(0.1, K.dois - 0.2), 0.45, 30);
        R.pop(tl, "#f18-l1", 0.3, 0.35);
        R.fadeIn(tl, "#f18-long", 0.2, 0.3);
        R.pop(tl, "#f18-x", 0.8, 0.3);
        // curta
        R.fadeIn(tl, "#f18-short", K.curt - 0.3, 0.3);
        R.pop(tl, "#f18-l2", K.curt - 0.2, 0.35);
        R.fadeIn(tl, "#f18-fs", K.curt, 0.3);
        R.pop(tl, "#f18-ok", K.rap, 0.35);
        // passinhos rápidos da Cida da direita
        for (let i = 0; i < 6; i++) {
          const a = i % 2;
          R.pose(tl, "f18b", K.rap + i * 0.28, 0.26, { hipF: a ? 15 : -25, knF: a ? 50 : 25, hipB: a ? -25 : 15, knB: a ? 25 : 50 }, "sine.inOut");
        }
        // cadência
        R.pop(tl, "#f18-cad", K.cad - 0.2, 0.4, 0.7);
        tl.fromTo("#f18-cad .big", { scale: 1.3 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, K.cinco);
        // carga cai
        R.pop(tl, "#f18-load", K.dim - 0.3, 0.4, 0.7);
        tl.to("#f18-lbar", { attr: { width: 300 }, fill: "#FFC94A", duration: 0.6, ease: "power2.inOut" }, K.carga);
        // metrônomo
        R.pop(tl, "#f18-phone", K.met - 0.2, 0.4);
        tl.fromTo("#f18-arm", { rotation: -25 }, { rotation: 25, svgOrigin: "100 160", duration: 0.35, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.met);
        // Gordurinha respira
        tl.set("#f18-g-wrap", { opacity: 1 }, K.g0 - 0.5);
        tl.fromTo("#f18-g-wrap", { y: 300 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.g0 - 0.5);
        R.face(tl, "f18g", K.g0 - 0.5, { eyes: "happy" });
        tl.fromTo("#f18g-body", { scale: 1 }, { scale: 1.12, svgOrigin: "1720 790", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.g0);
        R.pose(tl, "f18g", K.g0, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.dois - 0.2), vol: 0.35 },
        { name: "error", t: 0.8, vol: 0.25 },
        { name: "pop", t: k.rap, vol: 0.4 },
        { name: "pop", t: k.cad - 0.2, vol: 0.35 },
        { name: "click-soft", t: k.met, vol: 0.4 }, { name: "click-soft", t: k.met + 0.35, vol: 0.4 }, { name: "click-soft", t: k.met + 0.7, vol: 0.4 },
        { name: "whoosh-short", t: k.g0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
