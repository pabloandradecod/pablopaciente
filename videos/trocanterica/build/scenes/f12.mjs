// F12 — Palpação do trocânter ("É AÍ!") + teste do flamingo (30 s numa perna só) + Dona Cida "Flamingo eu não sou!"
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
  speakers: { cida: "f12c" },
  tail: 1.0,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      palp: w(0, "palpação"), troc: w(0, "trocânter"), dolor: w(0, "dolorida"), flam: w(0, "flamingo"), perna: w(0, "perna"),
      trinta: w(0, "trinta"), dor: w(0, "dor"), pista: w(0, "pista"), c0: L1.start, c1: L1.end,
    };
    const pab = inNeck(human("f12p", "pablo"), "f12p", hat("f12p", C));
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const secs = [0, 5, 10, 15, 20, 25, 30];
    return {
      k,
      css: `
        #f12-title { left:110px; top:70px; font-size:68px; }
        #f12-title span { color:${C.pain}; }
        #f12-ai { left:400px; top:200px; padding:16px 30px; font-size:58px; color:${C.pain}; transform: rotate(-5deg); }
        #f12-timer { left:1120px; top:170px; width:250px; height:250px; border-radius:50%; background:#fff; border:9px solid ${C.ink}; box-shadow:8px 8px 0 ${C.ink}; }
        #root .f12-sec { position:absolute; left:0; right:0; top:62px; text-align:center; font-size:100px; }
        #f12-timer .u { position:absolute; left:0; right:0; top:172px; text-align:center; font-size:30px; }
        #f12-ok { left:1080px; top:480px; padding:14px 26px; font-size:40px; }
        #f12-ok b { color:${C.pain}; }
        #f12-nope { left:300px; top:160px; padding:16px 28px; font-size:44px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f12-p-wrap"><g transform="translate(1020,640) scale(-1.25,1.25)">${pab}</g></g>
      <g id="f12-c-wrap"><g transform="translate(640,640) scale(1.3)">${human("f12c", "cida")}</g></g>
      <!-- dedo apertando o trocânter -->
      <g id="f12-hand" opacity="0"><g transform="translate(676,618)"><path d="M10 0 L170 -40" ${st} stroke-width="30" stroke="${C.ink}"/><path d="M10 0 L170 -40" stroke="#fff" stroke-width="20" stroke-linecap="round"/><circle cx="0" cy="0" r="22" fill="#fff" ${st}/></g></g>
      <g id="f12-target" opacity="0"><circle cx="652" cy="620" r="34" fill="none" stroke="${C.pain}" stroke-width="6"/><circle cx="652" cy="620" r="14" fill="${C.pain}"/></g>
      <g id="f12-pain" opacity="0"><circle cx="652" cy="620" r="46" fill="${C.pain}" opacity="0.4"/><circle cx="652" cy="620" r="20" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
      <!-- flamingo -->
      <g id="f12-flamingo" opacity="0"><g transform="translate(1600,640)">
        <g id="f12-fl-body">
          <path d="M-70 -40 Q-80 -110 0 -110 Q70 -110 80 -60 Q60 -20 0 -20 Q-50 -20 -70 -40Z" fill="#FF8FB1" ${st}/>
          <path d="M60 -90 Q90 -150 60 -200 Q40 -240 70 -260" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/>
          <path d="M60 -90 Q90 -150 60 -200 Q40 -240 70 -260" fill="none" stroke="#FF8FB1" stroke-width="12" stroke-linecap="round"/>
          <circle cx="76" cy="-268" r="24" fill="#FF8FB1" ${st}/><circle cx="82" cy="-274" r="5" fill="${C.ink}"/>
          <path d="M96 -272 L130 -256 L100 -250 Z" fill="#333" ${st} stroke-width="4"/>
          <path d="M0 -20 L0 230 M0 230 L26 240" ${st} stroke-width="7"/>
          <path d="M-10 -20 L-20 60 L10 70" fill="none" ${st} stroke-width="7"/>
        </g>
        <text x="0" y="280" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">o flamingo</text>
      </g></g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">O EXAME: <span>palpação</span></div>
    <div id="f12-title2" class="abs title" style="left:110px;top:70px;font-size:68px;opacity:0">Teste do <span style="color:#FF8FB1">FLAMINGO</span></div>
    <div id="f12-ai" class="abs card title" style="opacity:0">É AÍ!</div>
    <div id="f12-timer" class="abs title" style="opacity:0">${secs.map((s, i) => `<div id="f12-s${i}" class="f12-sec" style="opacity:${i ? 0 : 1}">${s}</div>`).join("")}<div class="u label">segundos</div></div>
    <div id="f12-ok" class="abs card label" style="opacity:0">dor na lateral = <b>PISTA FORTE</b></div>
    <div id="f12-nope" class="abs card label" style="opacity:0">"Flamingo eu não sou!"</div>`,
      js: function (tl, K, R) {
        const c = "f12c", p = "f12p";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 10, elB: -10 });
        R.setPose(tl, p, 0, { shF: -20, elF: -30, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, c, 0.3, K.dur);
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, c, 0, K.dur, 1.2);
        R.rise(tl, "#f12-title", 0.1, 0.5);
        // palpação
        R.pop(tl, "#f12-target", K.palp, 0.35);
        R.pose(tl, p, K.palp, 0.4, { shF: -80, elF: -10 });
        tl.set("#f12-hand", { opacity: 1 }, K.troc - 0.3);
        tl.fromTo("#f12-hand", { x: 260 }, { x: 0, duration: 0.4, ease: "power2.out" }, K.troc - 0.3);
        tl.to("#f12-hand", { x: -14, duration: 0.12, yoyo: true, repeat: 1 }, K.dolor - 0.2);
        tl.set("#f12-pain", { opacity: 1 }, K.dolor - 0.1);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "652 620" }, { scale: 1.3, svgOrigin: "652 620", duration: 0.25, yoyo: true, repeat: 3 }, K.dolor - 0.1);
        R.face(tl, c, K.dolor - 0.1, { eyes: "wide", mouth: "scream" });
        tl.to("#f12-c-wrap", { y: -60, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.dolor - 0.1);
        R.pop(tl, "#f12-ai", K.dolor, 0.35);
        R.shake(tl, "#f12-ai", K.dolor + 0.4, 0.3, 5);
        // teste do flamingo
        R.fadeOut(tl, "#f12-ai, #f12-hand, #f12-target, #f12-pain", K.flam - 0.5, 0.25);
        tl.to("#f12-p-wrap", { x: 300, opacity: 0, duration: 0.5, ease: "power2.in" }, K.flam - 0.5);
        R.pop(tl, "#f12-flamingo", K.flam, 0.45);
        R.fadeOut(tl, "#f12-title", K.flam - 0.2, 0.2);
        R.rise(tl, "#f12-title2", K.flam, 0.45);
        R.face(tl, c, K.flam, { eyes: "normal", mouth: "flat" });
        R.pose(tl, c, K.perna - 0.1, 0.45, { hipB: -60, knB: 95, shF: -70, elF: -10, shB: -60, elB: -10 }, "back.out(1.4)");
        tl.fromTo("#f12-c-wrap", { rotation: 0 }, { rotation: 2.5, svgOrigin: "650 860", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.perna + 0.3);
        R.pop(tl, "#f12-timer", K.trinta - 0.3, 0.4);
        for (let i = 1; i < 7; i++) {
          const t = K.trinta + i * ((K.pista - K.trinta) / 6);
          tl.set(`#f12-s${i - 1}`, { opacity: 0 }, t);
          tl.set(`#f12-s${i}`, { opacity: 1 }, t);
        }
        tl.set("#f12-pain", { opacity: 1 }, K.dor);
        tl.fromTo("#f12-pain", { scale: 0.6, svgOrigin: "652 620" }, { scale: 1.3, svgOrigin: "652 620", duration: 0.25, yoyo: true, repeat: 5 }, K.dor);
        R.face(tl, c, K.dor, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f12-ok", K.pista - 0.1, 0.4);
        // Dona Cida reclama
        R.pose(tl, c, K.c0 - 0.2, 0.35, { hipB: 0, knB: 0, shF: 40, elF: -120, shB: 40, elB: -120 }, "back.out(1.6)");
        R.face(tl, c, K.c0 - 0.2, { eyes: "normal", mouth: "frown" });
        R.pop(tl, "#f12-nope", K.c0, 0.35);
        tl.to("#f12-fl-body", { rotation: -8, svgOrigin: "0 230", duration: 0.2, yoyo: true, repeat: 3 }, K.c0 + 0.3);
      },
      sfx: [
        { name: "pop", t: k.palp, vol: 0.35 },
        { name: "click", t: k.dolor - 0.2, vol: 0.5 },
        { name: "pop", t: k.dolor, vol: 0.5 },
        { name: "whoosh-short", t: k.flam - 0.5, vol: 0.4 },
        { name: "pop", t: k.flam, vol: 0.4 },
        { name: "typing", t: k.trinta, vol: 0.25, dur: 1.4 },
        { name: "glitch-1", t: k.dor, vol: 0.3 },
        { name: "pop", t: k.pista - 0.1, vol: 0.4 },
      ],
    };
  },
};
