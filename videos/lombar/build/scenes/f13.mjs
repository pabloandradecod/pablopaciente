// F13 — O exame: movimento (frente, trás, lados), palpação da lombar e neurológico (força, sensibilidade, reflexos) → normal
const inNeck = (svg, id, extra) => {
  const i = svg.indexOf(`<g transform="translate(4,-138)"><g id="${id}-shF">`);
  const j = svg.lastIndexOf("</g></g>", i);
  return svg.slice(0, j) + extra + svg.slice(j);
};
const hat = (id, C) => `<g id="${id}-hat">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g>`;

export default {
  speakers: { pablo: "f13p" },
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      ex: w(0, "exame"), mexe: w(0, "mexe"), frente: w(0, "frente"), tras: w(0, "trás"), lados: w(0, "lados"), aliv: w(0, "alivia"), piora: w(0, "piora"),
      palpo: w(0, "Palpo"), neuro: w(0, "neurológico"), forca: w(0, "força"), sens: w(0, "sensibilidade"), refl: w(0, "reflexos"), caso: w(0, "caso"), normal: w(0, "normal"),
    };
    const pab = inNeck(human("f13p", "pablo"), "f13p", hat("f13p", C));
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const ic = {
      arrowF: `<path d="M-20 0 L20 0 M8 -12 L20 0 L8 12" fill="none" ${st}/>`,
      arrowB: `<path d="M20 0 L-20 0 M-8 -12 L-20 0 L-8 12" fill="none" ${st}/>`,
      side: `<path d="M-18 -10 Q0 -26 18 -10 M-18 10 Q0 26 18 10" fill="none" ${st}/>`,
      arm: `<path d="M-20 14 L-4 -6 Q4 -20 16 -14 Q22 -4 10 2 L2 14" fill="#FFD3C9" ${st}/>`,
      brush: `<path d="M-18 18 L8 -8" ${st} stroke-width="8"/><path d="M8 -8 L18 -18 Q24 -10 14 -2 Z" fill="${C.sun}" ${st}/>`,
      ham: `<path d="M-16 18 L6 -4" ${st} stroke-width="8"/><rect x="0" y="-22" width="28" height="18" rx="6" fill="${C.pain}" ${st} transform="rotate(-45 14 -13)"/>`,
    };
    const row = (id, icon, txt) => `<div id="${id}" class="f13-row label" style="opacity:0"><svg width="52" height="52" viewBox="-26 -26 52 52"><circle r="24" fill="#EAF6F8" stroke="${C.ink}" stroke-width="4"/>${icon}</svg><span>${txt}</span><svg class="ok" style="opacity:0" width="40" height="40" viewBox="-20 -20 40 40"><circle r="18" fill="#3DD9A4" stroke="${C.ink}" stroke-width="4"/><path d="M-8 0 L-2 7 L9 -6" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></svg></div>`;
    return {
      k,
      css: `
        #f13-title { left:110px; top:70px; font-size:66px; }
        #f13-title span { color:#2E9E78; }
        #root .f13-box { position:absolute; left:1080px; width:740px; padding:18px 24px; background:#fff; border:7px solid ${C.ink}; border-radius:24px; box-shadow:9px 9px 0 ${C.ink}; }
        #root .f13-box .h { font-size:32px; margin-bottom:8px; }
        #root .f13-row { display:flex; align-items:center; gap:14px; font-size:32px; height:58px; }
        #root .f13-row span { flex:1; }
        #f13-mv { top:110px; } #f13-nr { top:450px; }
        #f13-chips { left:1110px; top:390px; display:flex; gap:14px; }
        #root .f13-chip { padding:6px 16px; border:5px solid ${C.ink}; border-radius:14px; font-size:26px; background:#fff; }
        #f13-stamp { left:1120px; top:770px; padding:14px 30px; font-size:46px; color:#fff; background:#2E9E78; border:7px solid ${C.ink}; border-radius:20px; box-shadow:8px 8px 0 ${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f13-p-wrap"><g transform="translate(410,650) scale(1.22)">${pab}</g></g>
      <g transform="translate(690,650) scale(1.3)">${human("f13z", "ze")}</g>
      <g id="f13-target" opacity="0"><circle cx="634" cy="566" r="34" fill="none" stroke="${C.pain}" stroke-width="7"/><circle cx="634" cy="566" r="12" fill="${C.pain}"/></g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">O <span>EXAME</span></div>
    <div id="f13-mv" class="f13-box" style="opacity:0">
      <div class="h title">MOVIMENTO</div>
      ${row("f13-r0", ic.arrowF, "Pra frente")}${row("f13-r1", ic.arrowB, "Pra trás")}${row("f13-r2", ic.side, "Pros lados")}
    </div>
    <div id="f13-chips" class="abs"><div id="f13-al" class="f13-chip label" style="opacity:0;color:#2E9E78">o que ALIVIA</div><div id="f13-pi" class="f13-chip label" style="opacity:0;color:${C.pain}">o que PIORA</div></div>
    <div id="f13-nr" class="f13-box" style="opacity:0">
      <div class="h title">NEUROLÓGICO</div>
      ${row("f13-n0", ic.arm, "Força")}${row("f13-n1", ic.brush, "Sensibilidade")}${row("f13-n2", ic.ham, "Reflexos")}
    </div>
    <div id="f13-stamp" class="abs title" style="opacity:0">NEUROLÓGICO NORMAL</div>`,
      js: function (tl, K, R) {
        const p = "f13p", z = "f13z";
        R.drop(tl, "#f13-title", 0.2, 0.7, -260);
        R.setPose(tl, p, 0, { shF: -20, elF: -30, shB: 8, elB: -10 });
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, p, 0.3, K.dur);
        R.blinks(tl, z, 0.6, K.dur);
        // movimento
        R.pop(tl, "#f13-mv", K.mexe - 0.3, 0.45, 0.7);
        R.pose(tl, p, K.mexe - 0.2, 0.35, { shF: -90, elF: -40 }, "back.out(1.6)");
        R.fadeIn(tl, "#f13-r0", K.frente - 0.1, 0.25);
        R.pose(tl, z, K.frente, 0.5, { torso: 55, neck: -20, shF: -20, shB: -20 });
        tl.to("#f13-r0 .ok", { opacity: 1, duration: 0.2 }, K.frente + 0.5);
        R.fadeIn(tl, "#f13-r1", K.tras - 0.1, 0.25);
        R.pose(tl, z, K.tras, 0.5, { torso: -22, neck: 10, shF: 10, shB: 20 });
        tl.to("#f13-r1 .ok", { opacity: 1, duration: 0.2 }, K.tras + 0.5);
        R.fadeIn(tl, "#f13-r2", K.lados - 0.1, 0.25);
        R.pose(tl, z, K.lados, 0.4, { torso: 0, neck: 0, shF: -10, shB: 5 });
        tl.to("#f13z-root", { rotation: 6, svgOrigin: "0 160", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.lados);
        tl.to("#f13-r2 .ok", { opacity: 1, duration: 0.2 }, K.lados + 0.6);
        R.pop(tl, "#f13-al", K.aliv - 0.1, 0.35);
        R.pop(tl, "#f13-pi", K.piora - 0.1, 0.35);
        // palpação
        R.pose(tl, p, K.palpo - 0.3, 0.4, { shF: -55, elF: -5 });
        tl.to("#f13-p-wrap", { x: 20, duration: 0.4, ease: "power2.out" }, K.palpo - 0.3);
        R.pop(tl, "#f13-target", K.palpo, 0.35);
        R.face(tl, z, K.palpo + 0.2, { eyes: "closed", mouth: "flat" });
        // neurológico
        tl.to("#f13-target", { opacity: 0, duration: 0.3 }, K.neuro - 0.2);
        tl.to("#f13-p-wrap", { x: 0, duration: 0.4 }, K.neuro - 0.2);
        R.pose(tl, p, K.neuro - 0.2, 0.4, { shF: -100, elF: -50 });
        R.face(tl, z, K.neuro, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f13-nr", K.neuro - 0.2, 0.45, 0.7);
        [[K.forca, 0], [K.sens, 1], [K.refl, 2]].forEach(([t, i]) => {
          R.fadeIn(tl, `#f13-n${i}`, t - 0.1, 0.25);
          tl.to(`#f13-n${i} .ok`, { opacity: 1, duration: 0.2 }, t + 0.5);
        });
        R.pose(tl, z, K.forca, 0.25, { shF: -150, elF: -60 }, "back.out(2)");
        R.pose(tl, z, K.forca + 0.6, 0.3, { shF: -10, elF: -20 });
        R.pose(tl, z, K.refl + 0.2, 0.12, { hipF: -10, knF: -40 }, "power3.out");
        R.pose(tl, z, K.refl + 0.35, 0.2, { hipF: 0, knF: 0 });
        // tudo normal
        R.pop(tl, "#f13-stamp", K.normal - 0.2, 0.4);
        R.face(tl, z, K.normal, { eyes: "happy", mouth: "grin" });
        R.face(tl, p, K.normal, { eyes: "happy" });
        R.pose(tl, z, K.normal, 0.4, { shF: -150, elF: -40 }, "back.out(2)");
      },
      sfx: [
        ...[k.frente, k.tras, k.lados].map((t) => ({ name: "click-soft", t: t + 0.5, vol: 0.45 })),
        { name: "pop", t: k.palpo, vol: 0.4 },
        ...[k.forca, k.sens, k.refl].map((t) => ({ name: "click-soft", t: t + 0.5, vol: 0.45 })),
        { name: "sparkle", t: k.normal - 0.2, vol: 0.45 },
      ],
    };
  },
};
