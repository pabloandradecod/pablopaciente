// F27 — Vai melhorar? Algumas semanas de tratamento conservador; o Piriforme relaxa, solta o nervo e os dois fazem as pazes
export default {
  speakers: { pablo: "f27p", piriforme: "f27m" },
  gaps: [0.35],
  extra: 1.0,
  build(ctx) {
    const { C, human, piriforme, nerve, smooth, w, lines } = ctx;
    const k = {
      boa: w(0, "boa"), maioria: w(0, "maioria"), cons: w(0, "conservador"), sem: w(0, "semanas"),
      alon: w(0, "alongamento"), fort: w(0, "fortalecimento"), ter: w(0, "terapia"), hab: w(0, "hábitos"),
      pir: w(0, "piriforme"), rel: w(0, "relaxa"), solta: w(0, "solta"), pazes: w(0, "pazes"),
      m0: lines[1].start, perm: w(1, "permissão"), m1: lines[1].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "riser", t: k.cons, vol: 0.22, dur: 1.4 },
      { name: "pop", t: k.alon, vol: 0.35 }, { name: "pop", t: k.fort, vol: 0.35 }, { name: "pop", t: k.ter, vol: 0.35 }, { name: "pop", t: k.hab, vol: 0.35 },
      { name: "whoosh-short", t: k.pir - 0.4, vol: 0.4 },
      { name: "glitch-2", t: k.rel, vol: 0.15, dur: 0.9 },
      { name: "pop", t: k.solta + 0.2, vol: 0.4 },
      { name: "sparkle", t: k.pazes, vol: 0.45 },
      { name: "pop", t: k.perm + 0.2, vol: 0.4 },
    ];
    const nPts = [[230, 760], [330, 760], [440, 760], [550, 760], [660, 760], [770, 760], [880, 760], [990, 760]];
    const nSq = [[230, 760], [330, 760], [440, 760], [550, 772], [660, 782], [770, 772], [880, 760], [990, 760]];
    k.sq = smooth(nSq);
    k.free = smooth(nPts);
    const chip = (i, txt) => `<div id="f27-c${i}" class="card label f27-chip" style="opacity:0">${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f27-h { left:110px; top:80px; font-size:72px; }
        #f27-h span { color:${C.good}; }
        #root .f27-chip { padding:14px 22px; font-size:32px; border-radius:22px; box-shadow:6px 6px 0 ${C.ink}; white-space:nowrap; }
        #f27-wk { left:420px; top:305px; font-size:40px; }
        #f27-wk b { color:${C.good}; }
        #f27-sign { left:470px; top:250px; width:440px; padding:20px 24px; font-size:36px; text-align:center; }
        #f27-sign .opt { display:flex; justify-content:center; gap:40px; margin-top:12px; font-size:34px; }
        #f27-sign .box { display:inline-block; width:34px; height:34px; border:5px solid ${C.ink}; border-radius:8px; vertical-align:middle; margin-right:10px; background:#fff; }
        #f27-chk { position:absolute; left:0; top:-10px; color:${C.good}; font-size:52px; font-weight:900; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1560" cy="520" r="330" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- etapa A: calendário + barra -->
      <g id="f27-A">
        <g id="f27-cal" transform="translate(220,290)"><g id="f27-cal-in">
          <rect x="-70" y="-60" width="140" height="130" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
          <rect x="-70" y="-60" width="140" height="38" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="7"/>
          <path d="M-40 -76 L-40 -48 M40 -76 L40 -48" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
          ${Array.from({ length: 9 }, (_, i) => `<rect x="${-48 + (i % 3) * 36}" y="${-10 + Math.floor(i / 3) * 24}" width="22" height="14" rx="3" fill="${C.sky}"/>`).join("")}
        </g></g>
        <rect x="340" y="215" width="760" height="70" rx="35" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <rect id="f27-fill" x="350" y="225" width="740" height="50" rx="25" fill="${C.good}"/>
      </g>
      <!-- etapa B: o Piriforme e o nervo -->
      <g id="f27-B" opacity="0">
        <ellipse cx="610" cy="840" rx="200" ry="22" fill="${C.ink}" opacity="0.12"/>
        <g transform="translate(610,830) scale(1.05)"><g id="f27-mw">${piriforme("f27m")}</g></g>
        ${nerve("f27n", nPts, 34)}
        <g id="f27-hug"><path d="M520 745 Q610 840 700 745" fill="none" stroke="${C.ink}" stroke-width="44" stroke-linecap="round"/><path d="M520 745 Q610 840 700 745" fill="none" stroke="#F2766B" stroke-width="30" stroke-linecap="round"/>
          <circle cx="520" cy="745" r="17" fill="#F2766B" stroke="${C.ink}" stroke-width="6"/><circle cx="700" cy="745" r="17" fill="#F2766B" stroke="${C.ink}" stroke-width="6"/></g>
        <g id="f27-heart" opacity="0" transform="translate(610,470)"><g id="f27-heart-in"><path d="M0 30 Q-60 -10 -40 -40 Q-20 -60 0 -36 Q20 -60 40 -40 Q60 -10 0 30 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g></g>
      </g>
      <g id="f27-pw"><g transform="translate(1690,667) scale(-1.1,1.1)">${human("f27p", "pablo")}</g></g>
    </svg>
    <div id="f27-h" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f27-wk" class="abs title" style="opacity:0">em <b>algumas semanas</b></div>
    <div id="f27-chips" class="abs" style="left:130px;top:420px;display:flex;gap:22px">${chip(0, "alongamento")}${chip(1, "fortalecimento")}${chip(2, "terapia manual")}${chip(3, "hábitos")}</div>
    <div id="f27-sign" class="abs card label" style="opacity:0">Posso te abraçar?
      <div class="opt"><span style="position:relative"><span class="box"></span>SIM<span id="f27-chk" style="opacity:0">✓</span></span><span><span class="box"></span>NÃO</span></div></div>`,
      js: function (tl, K, R) {
        const p = "f27p", m = "f27m", n = "f27n";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        R.slideIn(tl, "#f27-h", 0.05, 0.5, -300);
        tl.fromTo("#f27-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        // A: barra enche em "algumas semanas"
        R.pop(tl, "#f27-cal-in", K.boa, 0.4);
        tl.fromTo("#f27-cal-in", { rotation: -8, svgOrigin: "0 0" }, { rotation: 8, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.cons);
        tl.fromTo("#f27-fill", { attr: { width: 0 } }, { attr: { width: 740 }, duration: 1.4, ease: "power2.inOut" }, K.cons);
        R.pop(tl, "#f27-wk", K.sem - 0.1, 0.45);
        R.gesture(tl, p, K.boa, K.pir - 0.4, 7);
        [K.alon, K.fort, K.ter, K.hab].forEach((t, i) => R.pop(tl, `#f27-c${i}`, t - 0.05, 0.4));
        R.fadeOut(tl, "#f27-A, #f27-wk, #f27-c0, #f27-c1, #f27-c2, #f27-c3", K.pir - 0.45);
        // B: Piriforme abraçando forte...
        tl.to("#f27-B", { opacity: 1, duration: 0.25 }, K.pir - 0.3);
        tl.set("#f27m-armF, #f27m-armB", { opacity: 0 }, 0);
        tl.set(`#${n}-out, #${n}-fill, #${n}-shine`, { attr: { d: K.sq } }, 0);
        R.face(tl, n, 0, { eyes: "pain", mouth: "frown" });
        R.face(tl, m, 0, { eyes: "normal", mouth: "grin" });
        tl.set("#f27-mw", { scale: 1.12, svgOrigin: "0 0" }, 0);
        // ...relaxa (desincha) e solta
        tl.to("#f27-mw", { scale: 0.95, svgOrigin: "0 0", duration: 0.9, ease: "power2.inOut" }, K.rel);
        R.face(tl, m, K.rel, { eyes: "closed", mouth: "smile" });
        tl.to("#f27-hug", { opacity: 0, y: 40, duration: 0.35, ease: "power2.in" }, K.solta);
        tl.set("#f27m-armF, #f27m-armB", { opacity: 1 }, K.solta + 0.2);
        R.setPose(tl, m, 0, { armF: 0, armB: 0 });
        R.nerveTo(tl, n, K.solta + 0.1, 0.4, K.free, "back.out(2)");
        R.face(tl, n, K.solta + 0.3, { eyes: "happy", mouth: "smile" });
        // fazem as pazes
        R.pose(tl, m, K.pazes, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, m, K.pazes, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f27-heart-in", K.pazes, 0.45);
        tl.set("#f27-heart", { opacity: 1 }, K.pazes);
        tl.to("#f27-heart-in", { scale: 1.15, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.pazes + 0.5);
        R.face(tl, p, K.pazes, { eyes: "happy" });
        // "Desculpa, amigão. Agora só abraço com permissão!"
        R.fadeOut(tl, "#f27-heart", K.m0 - 0.2, 0.25);
        R.pose(tl, m, K.m0, 0.35, { armF: -60, armB: 60 }, "power2.inOut");
        R.face(tl, m, K.m0, { eyes: "normal" });
        R.pop(tl, "#f27-sign", K.m0 + 0.2, 0.45);
        tl.fromTo("#f27-chk", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, K.perm + 0.2);
        R.face(tl, n, K.perm + 0.2, { eyes: "happy", mouth: "grin" });
        tl.to("#f27-hug", { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, K.m1 + 0.25);
        tl.set("#f27m-armF, #f27m-armB", { opacity: 0 }, K.m1 + 0.25);
        R.face(tl, m, K.m1 + 0.25, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f27-heart-in", K.m1 + 0.3, 0.45);
        tl.set("#f27-heart", { opacity: 1 }, K.m1 + 0.3);
      },
    };
  },
};
