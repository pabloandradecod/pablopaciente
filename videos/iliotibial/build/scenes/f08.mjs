// F8 — Quem tem: corredores (mais comum), ciclistas, trilha, marchas; fatores: quadril fraco, joelho pra dentro, aumento brusco
export default {
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      comum: w(0, "comum"), corr: w(0, "corredores"), cicl: w(0, "ciclistas"), trilha: w(0, "trilha"), marchas: w(0, "marchas"),
      pesa: w(0, "pesa"), quad: w(0, "quadril"), joelho: w(0, "joelho"), dentro: w(0, "dentro"), aum: w(0, "aumento"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const sport = (i, label, svg) => `<div id="f08-s${i}" class="abs card" style="left:${100 + (i % 2) * 230}px;top:${200 + Math.floor(i / 2) * 270}px;width:200px;padding:14px 8px;text-align:center;opacity:0">
      <svg width="120" height="120" viewBox="-60 -60 120 120">${svg}</svg><div class="label" style="font-size:26px">${label}</div></div>`;
    const chip = (i, txt) => `<div id="f08-r${i}" class="abs card label" style="left:1300px;top:${300 + i * 130}px;width:520px;padding:14px 20px;font-size:32px;opacity:0">${txt}</div>`;
    return {
      k,
      css: `
        #f08-h { left:0; right:0; top:60px; text-align:center; font-size:64px; }
        #f08-h span { color:${C.pain}; }
        #f08-top { left:96px; top:168px; padding:6px 14px; font-size:22px; color:#fff; background:${C.pain}; border:4px solid ${C.ink}; border-radius:12px; transform: rotate(-6deg); z-index:3; }
        #f08-pesa { left:1300px; top:210px; font-size:46px; color:${C.pain}; }
        #f08-front { left:990px; top:640px; width:300px; padding:10px; text-align:center; }
        #f08-front .t { font-size:24px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="840" cy="560" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f08-c-wrap"><g transform="translate(840,640) scale(1.3)">${human("f08c", "cida")}</g></g>
      <g id="f08-zz" opacity="0"><text x="720" y="560" font-family="Montserrat" font-weight="900" font-size="40" fill="#6E86A3">z z</text></g>
    </svg>
    <div id="f08-h" class="abs title" style="opacity:0">Quem tem? Muito comum em <span>CORREDORES</span></div>
    ${sport(0, "Corredores", `<path d="M-34 14 Q-38 34 -18 36 L32 36 Q46 32 42 18 Q34 2 6 2 L-18 0 Q-32 0 -34 14Z" fill="${C.good}" ${st}/><path d="M-10 14 L20 14" stroke="#fff" stroke-width="5"/>`)}
    ${sport(1, "Ciclistas", `<circle cx="-26" cy="16" r="22" fill="none" ${st}/><circle cx="28" cy="16" r="22" fill="none" ${st}/><path d="M-26 16 L-4 -14 L22 -14 L28 16 M-4 -14 L4 16 L22 -14" fill="none" stroke="${C.pain}" stroke-width="6"/>`)}
    ${sport(2, "Trilha", `<path d="M-50 36 L-14 -26 L6 6 L22 -14 L50 36 Z" fill="#5DB560" ${st}/><path d="M-22 -12 L-14 -26 L-6 -12" fill="#fff"/>`)}
    ${sport(3, "Marchas longas", `<path d="M-30 -36 L-6 -36 L-6 14 L28 14 Q36 16 36 26 L36 34 L-30 34 Z" fill="#8B5A2B" ${st}/><path d="M-30 22 L36 22" stroke="${C.ink}" stroke-width="4"/>`)}
    <div id="f08-top" class="abs title" style="opacity:0">MAIS COMUM</div>
    <div id="f08-pesa" class="abs title" style="opacity:0">E pesa:</div>
    ${chip(0, "quadril fraco (glúteo \"dormindo\")")}
    ${chip(1, "joelho que cai pra dentro na passada")}
    ${chip(2, "aumento brusco do treino")}
    <div id="f08-front" class="abs card" style="opacity:0">
      <svg width="280" height="125" viewBox="0 0 380 170">
        <g><rect x="110" y="10" width="44" height="150" rx="20" fill="#3E5A8A" stroke="${C.ink}" stroke-width="5"/></g>
        <g id="f08-lk"><rect x="226" y="10" width="44" height="150" rx="20" fill="#3E5A8A" stroke="${C.ink}" stroke-width="5"/></g>
        <path d="M300 70 L250 84" stroke="${C.pain}" stroke-width="8" stroke-linecap="round"/><path d="M262 70 L248 86 L268 92" fill="none" stroke="${C.pain}" stroke-width="6"/>
      </svg>
      <div class="t label">visto de frente: joelho <b style="color:${C.pain}">pra dentro</b></div>
    </div>`,
      js: function (tl, K, R) {
        const c = "f08c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        R.rise(tl, "#f08-h", K.comum - 0.4, 0.5);
        [K.corr, K.cicl, K.trilha, K.marchas].forEach((t, i) => R.pop(tl, `#f08-s${i}`, t - 0.1, 0.4));
        R.pop(tl, "#f08-top", K.corr + 0.2, 0.35);
        // trotinho em "corredores"
        for (let i = 0; i < 4; i++) R.pose(tl, c, K.corr + i * 0.2, 0.2, { hipF: i % 2 ? 0 : -40, knF: i % 2 ? 0 : 60, hipB: i % 2 ? -40 : 0, knB: i % 2 ? 60 : 0, shF: i % 2 ? -50 : 20, elF: -80 }, "sine.inOut");
        R.pose(tl, c, K.corr + 0.8, 0.25, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -10, elF: -20 });
        R.face(tl, c, K.corr, { eyes: "happy", mouth: "grin" });
        // fatores
        R.fadeIn(tl, "#f08-pesa", K.pesa - 0.2, 0.3);
        R.slideIn(tl, "#f08-r0", K.quad - 0.1, 0.4, 200);
        tl.set("#f08-zz", { opacity: 1 }, K.quad + 0.2);
        tl.fromTo("#f08-zz", { y: 10 }, { y: -10, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.quad + 0.2);
        R.slideIn(tl, "#f08-r1", K.joelho - 0.1, 0.4, 200);
        R.pop(tl, "#f08-front", K.joelho, 0.4);
        tl.to("#f08-lk", { rotation: 8, svgOrigin: "248 10", duration: 0.4, ease: "power2.inOut", yoyo: true, repeat: 3 }, K.dentro);
        R.face(tl, c, K.dentro, { eyes: "wide", mouth: "flat" });
        R.slideIn(tl, "#f08-r2", K.aum - 0.1, 0.4, 200);
        R.face(tl, c, K.aum + 0.3, { eyes: "pain", mouth: "frown" });
      },
      sfx: [
        ...[k.corr, k.cicl, k.trilha, k.marchas].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "pop", t: k.pesa - 0.2, vol: 0.3 },
        ...[k.quad, k.joelho, k.aum].map((t) => ({ name: "whoosh-short", t: t - 0.1, vol: 0.25 })),
      ],
    };
  },
};
