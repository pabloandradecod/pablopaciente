// F23 — Exercício 6: equilíbrio numa perna (mão na parede no começo) + flamingo + "flamingo profissional!"
export default {
  speakers: { cida: "f23c" },
  extra: 0.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      seis: w(0, "Seis"), equi: w(0, "equilíbrio"), mao: w(0, "mão"), com: w(0, "começo"), vinte: w(0, "Vinte"), tres: w(0, "três"), flam: w(0, "flamingo"), trei: w(0, "treino"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.vinte, vol: 0.35 }, { name: "pop", t: k.flam, vol: 0.45 }, { name: "sparkle", t: k.c0, vol: 0.45 }];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const PINK = "#F7A1B8";
    const flamingo = `<g id="f23-fl"><g transform="translate(1180,850)">
      <line x1="0" y1="0" x2="0" y2="-170" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="-170" stroke="#E46F8E" stroke-width="6" stroke-linecap="round"/>
      <g id="f23-flleg"><path d="M0 -150 L40 -110 L4 -86" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M0 -150 L40 -110 L4 -86" fill="none" stroke="#E46F8E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
      <path d="M-24 0 L24 0" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="-10" cy="-210" rx="78" ry="48" fill="${PINK}" ${st}/>
      <path d="M-60 -220 Q-30 -250 10 -232" fill="none" stroke="#E46F8E" stroke-width="7"/>
      <path d="M50 -230 Q90 -270 60 -320 Q40 -360 70 -380" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/>
      <path d="M50 -230 Q90 -270 60 -320 Q40 -360 70 -380" fill="none" stroke="${PINK}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="78" cy="-386" r="26" fill="${PINK}" ${st}/>
      <circle cx="84" cy="-392" r="5" fill="${C.ink}"/>
      <path d="M100 -392 L132 -380 Q124 -364 102 -372 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M118 -376 L132 -380 Q130 -370 120 -368Z" fill="${C.ink}"/>
    </g></g>`;
    return {
      k,
      sfx,
      css: `
        #f23-head { left:110px; top:80px; font-size:80px; }
        #f23-head span { color:${C.good}; }
        #f23-card { left:1340px; top:150px; width:480px; padding:26px 30px; }
        #f23-card .t { font-size:40px; }
        #f23-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f23-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f23-ok { left:1380px; top:690px; width:440px; padding:14px 18px; font-size:27px; background:${C.good}; text-align:center; }
        #f23-ok b { font-size:31px; display:block; }
        #f23-timer { left:900px; top:250px; width:170px; height:170px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:44px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
        #f23-pro { left:820px; top:300px; padding:14px 22px; font-size:38px; transform: rotate(-4deg); }
        #f23-tag { left:180px; top:300px; padding:10px 18px; font-size:26px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="850" fill="${C.wall}"/>
      <rect y="850" width="1920" height="230" fill="${C.floor}"/>
      <line x1="0" y1="850" x2="1920" y2="850" stroke="${C.ink}" stroke-width="7"/>
      <!-- parede de apoio -->
      <rect x="700" y="300" width="60" height="550" fill="#CFE3DF" ${st}/>
      <g transform="translate(560,650) scale(1.1)">${human("f23c", "cida")}</g>
      <g id="f23-flw" opacity="0">${flamingo}</g>
    </svg>
    <div id="f23-head" class="abs title">6. <span>EQUILÍBRIO</span></div>
    <div id="f23-tag" class="abs card label" style="opacity:0">mão na parede no começo</div>
    <div id="f23-timer" class="abs title" style="opacity:0">20 a<br/>30 s</div>
    <div id="f23-pro" class="abs card title" style="opacity:0">FLAMINGO <span style="color:#E46F8E">PRO</span></div>
    <div id="f23-card" class="abs card">
      <div class="t title">Equilíbrio numa perna</div>
      <div class="row label" id="f23-r0"><div class="dot"></div>Numa perna só</div>
      <div class="row label" id="f23-r1"><div class="dot"></div>Mão na parede no começo</div>
      <div class="row label" id="f23-r2"><div class="dot" style="background:${C.sun}"></div><b>3 x 20 a 30 s</b></div>
    </div>
    <div id="f23-ok" class="abs card label">Dor até 5/10 e passa no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const c = "f23c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f23-card", 0.2, 0.55, 400);
        R.pop(tl, "#f23-ok", 0.6, 0.4);
        [K.equi, K.mao, K.vinte].forEach((t, i) => tl.fromTo(`#f23-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // mão na parede + levanta o joelho da frente
        R.pose(tl, c, K.equi, 0.5, { hipB: 10, knB: 80, anB: 10 }, "power2.out");
        R.pose(tl, c, K.mao, 0.4, { shF: -80, elF: -10 }, "power2.out");
        R.pop(tl, "#f23-tag", K.mao + 0.1, 0.35);
        R.fadeOut(tl, "#f23-tag", K.vinte - 0.3);
        // tira a mão e equilibra (pequenas oscilações finitas)
        R.pose(tl, c, K.vinte - 0.2, 0.4, { shF: -30, elF: -70, shB: 45, elB: -30 }, "power2.out");
        R.pop(tl, "#f23-timer", K.vinte, 0.4);
        tl.to("#f23c-torso", { rotation: 3, svgOrigin: "0 0", duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.vinte + 0.3);
        R.face(tl, c, K.vinte + 0.3, { eyes: "normal", mouth: "flat" });
        // flamingo aparece imitando
        tl.fromTo("#f23-flw", { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.flam - 0.2);
        tl.to("#f23-flleg", { rotation: -8, svgOrigin: "0 -150", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.flam + 0.4);
        R.fadeOut(tl, "#f23-timer", K.trei);
        // "Agora sim, flamingo profissional!"
        R.pose(tl, c, K.c0 - 0.1, 0.35, { shF: -120, elF: -10, shB: 120, elB: 10 }, "back.out(2)");
        R.face(tl, c, K.c0, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f23-pro", K.c0 + 0.2, 0.4);
      },
    };
  },
};
