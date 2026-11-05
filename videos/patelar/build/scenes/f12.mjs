// F12 — Os testes: palpação abaixo da rótula ("É AÍ!"), agachamento numa perna na prancha inclinada, saltinho numa perna; a dor sobe com a carga
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
  speakers: { juninho: "f12j" },
  tail: 1.2,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      palp: w(0, "palpação"), rot: w(0, "rótula"), doer: w(0, "doer"), carr: w(0, "carregar"), agach: w(0, "agachar"), prancha: w(0, "prancha"),
      salt: w(0, "saltinho"), ponto: w(0, "ponto"), aum: w(0, "aumenta"), carga: w(0, "carga"), j0: L1.start, j1: L1.end,
    };
    const pab = inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C));
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f12-title { left:110px; top:70px; font-size:66px; }
        #f12-title span { color:${C.pain}; }
        #f12-title2 { left:110px; top:70px; font-size:66px; }
        #f12-title2 span { color:${C.pain}; }
        #f12-ai { left:300px; top:200px; padding:16px 30px; font-size:58px; color:${C.pain}; transform: rotate(-5deg); }
        #f12-tag1 { left:900px; top:200px; padding:12px 22px; font-size:30px; }
        #f12-tag2 { left:900px; top:290px; padding:12px 22px; font-size:30px; }
        #f12-meter { left:1600px; top:180px; width:260px; padding:16px; text-align:center; }
        #f12-meter .h { font-size:30px; }
        #f12-ok { left:900px; top:700px; padding:14px 26px; font-size:38px; }
        #f12-ok b { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- prancha inclinada (declive) -->
      <g id="f12-wedge" opacity="0"><path d="M470 880 L860 880 L470 820 Z" fill="#C99A62" ${st}/><text x="560" y="868" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">declive</text></g>
      <g id="f12-p-wrap"><g transform="translate(1020,640) scale(-1.25,1.25)">${pab}</g></g>
      <g id="f12-j-wrap"><g transform="translate(640,640) scale(1.3)">${human("f12j", "juninho")}</g></g>
      <!-- mão do doutor apertando abaixo da rótula -->
      <g id="f12-hand" opacity="0"><g transform="translate(688,778)"><path d="M10 0 L170 -40" ${st} stroke-width="30"/><path d="M10 0 L170 -40" stroke="#fff" stroke-width="20" stroke-linecap="round"/><circle cx="0" cy="0" r="22" fill="#fff" ${st}/></g></g>
      <g id="f12-target" opacity="0"><circle cx="672" cy="778" r="30" fill="none" stroke="${C.pain}" stroke-width="6"/><circle cx="672" cy="778" r="12" fill="${C.pain}"/></g>
      <g id="f12-pain" opacity="0"><circle cx="672" cy="778" r="42" fill="${C.pain}" opacity="0.4"/><circle cx="672" cy="778" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">O EXAME: <span>palpação</span></div>
    <div id="f12-title2" class="abs title" style="opacity:0">O EXAME: <span>carregar o tendão</span></div>
    <div id="f12-ai" class="abs card title" style="opacity:0">É AÍ!</div>
    <div id="f12-tag1" class="abs card label" style="opacity:0">1. agachar numa perna (prancha inclinada)</div>
    <div id="f12-tag2" class="abs card label" style="opacity:0">2. saltinho numa perna</div>
    <div id="f12-meter" class="abs card" style="opacity:0">
      <div class="h label">CARGA × DOR</div>
      <svg width="228" height="380" viewBox="0 0 228 380">
        <rect x="24" y="10" width="64" height="350" rx="14" fill="#EEF2F3" stroke="${C.ink}" stroke-width="5"/>
        <rect id="f12-bar" x="30" y="16" width="52" height="338" rx="10" fill="${C.sun}"/>
        <text x="56" y="376" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="${C.ink}">carga</text>
        <circle id="f12-pdot" cx="164" cy="180" r="40" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>
        <text x="164" y="250" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">dor</text>
      </svg>
    </div>
    <div id="f12-ok" class="abs card label" style="opacity:0">dor no ponto e <b>maior com mais carga</b></div>`,
      js: function (tl, K, R) {
        const j = "f12j", p = "f12p";
        R.setPose(tl, j, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.setPose(tl, p, 0, { shF: -20, elF: -30, shB: 10, elB: -10 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, j, 0.3, K.dur);
        R.blinks(tl, p, 0.5, K.dur);
        R.rise(tl, "#f12-title", 0.1, 0.5);
        // palpação logo abaixo da rótula
        R.pop(tl, "#f12-target", K.palp, 0.35);
        R.pose(tl, p, K.palp, 0.4, { shF: -60, elF: -10 });
        tl.set("#f12-hand", { opacity: 1 }, K.rot - 0.3);
        tl.fromTo("#f12-hand", { x: 260 }, { x: 0, duration: 0.4, ease: "power2.out" }, K.rot - 0.3);
        tl.to("#f12-hand", { x: -12, duration: 0.12, yoyo: true, repeat: 1 }, K.doer - 0.2);
        tl.set("#f12-pain", { opacity: 1 }, K.doer - 0.1);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "672 778" }, { scale: 1.3, svgOrigin: "672 778", duration: 0.25, yoyo: true, repeat: 3 }, K.doer - 0.1);
        R.face(tl, j, K.doer - 0.1, { eyes: "wide", mouth: "scream" });
        tl.to("#f12-j-wrap", { y: -50, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.doer - 0.1);
        R.pop(tl, "#f12-ai", K.doer, 0.35);
        // carregar o tendão: o doutor sai, entra a prancha e o medidor
        R.fadeOut(tl, "#f12-ai, #f12-hand, #f12-target, #f12-pain", K.carr - 0.4, 0.25);
        tl.to("#f12-p-wrap", { x: 400, opacity: 0, duration: 0.5, ease: "power2.in" }, K.carr - 0.4);
        R.fadeOut(tl, "#f12-title", K.carr - 0.2, 0.2);
        R.rise(tl, "#f12-title2", K.carr, 0.45);
        R.face(tl, j, K.carr, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f12-meter", K.carr + 0.2, 0.4);
        tl.set("#f12-bar", { scaleY: 0.08, transformOrigin: "50% 100%" }, 0);
        tl.set("#f12-pdot", { scale: 0.3, transformOrigin: "50% 50%" }, 0);
        // agachar numa perna só, na prancha inclinada
        R.pop(tl, "#f12-tag1", K.agach - 0.1, 0.4);
        R.fadeIn(tl, "#f12-wedge", K.prancha - 0.3, 0.3);
        tl.to("#f12-j-wrap", { y: -36, duration: 0.3 }, K.prancha - 0.3);
        R.pose(tl, j, K.prancha, 0.6, { hipB: 30, knB: 70, hipF: -50, knF: 75, torso: 18, shF: -70, elF: -10, shB: -60, elB: -10 });
        tl.to("#f12-j-wrap", { y: 20, duration: 0.6, ease: "power2.inOut" }, K.prancha);
        tl.to("#f12-bar", { scaleY: 0.5, duration: 0.6 }, K.prancha);
        tl.to("#f12-pdot", { scale: 0.65, duration: 0.6 }, K.prancha);
        tl.set("#f12-pain", { opacity: 1, y: 30, x: 14 }, K.prancha + 0.5);
        R.face(tl, j, K.prancha + 0.5, { eyes: "pain", mouth: "frown" });
        R.pose(tl, j, K.salt - 0.5, 0.4, { hipF: 0, knF: 0, torso: 0 });
        tl.to("#f12-j-wrap", { y: -36, duration: 0.4 }, K.salt - 0.5);
        tl.to("#f12-pain", { opacity: 0, duration: 0.2 }, K.salt - 0.5);
        // saltinho numa perna
        R.pop(tl, "#f12-tag2", K.salt - 0.1, 0.4);
        R.fadeOut(tl, "#f12-wedge", K.salt - 0.4, 0.3);
        tl.to("#f12-j-wrap", { y: 0, duration: 0.3 }, K.salt - 0.4);
        for (let i = 0; i < 2; i++) {
          const t = K.salt + 0.2 + i * 0.6;
          tl.to("#f12-j-wrap", { y: -120, duration: 0.25, ease: "power2.out" }, t);
          tl.to("#f12-j-wrap", { y: 0, duration: 0.25, ease: "power2.in" }, t + 0.25);
        }
        tl.to("#f12-bar", { scaleY: 0.95, duration: 0.8 }, K.salt + 0.2);
        tl.to("#f12-pdot", { scale: 1, duration: 0.8 }, K.salt + 0.2);
        // a dor aparece no ponto e cresce com a carga
        tl.set("#f12-pain", { opacity: 1, x: 0, y: 0 }, K.ponto);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "672 778" }, { scale: 1.4, svgOrigin: "672 778", duration: 0.3, yoyo: true, repeat: 5 }, K.ponto);
        R.face(tl, j, K.ponto, { eyes: "pain", mouth: "scream" });
        R.pop(tl, "#f12-ok", K.aum - 0.1, 0.4);
        tl.fromTo("#f12-pdot", { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 3 }, K.carga);
        // Juninho: "É aí, doutor!"
        R.pose(tl, j, K.j0 - 0.3, 0.4, { torso: 30, neck: -10, shF: -10, elF: -10, shB: 20, elB: -20 }, "back.out(1.6)");
        R.face(tl, j, K.j0 - 0.2, { eyes: "wide", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.palp, vol: 0.35 },
        { name: "click", t: k.doer - 0.2, vol: 0.5 },
        { name: "pop", t: k.doer, vol: 0.5 },
        { name: "whoosh-short", t: k.carr - 0.4, vol: 0.4 },
        { name: "pop", t: k.agach - 0.1, vol: 0.35 },
        { name: "pop", t: k.salt - 0.1, vol: 0.35 },
        { name: "glitch-1", t: k.ponto, vol: 0.3 },
        { name: "pop", t: k.aum - 0.1, vol: 0.4 },
      ],
    };
  },
};
