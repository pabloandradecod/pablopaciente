// F26 — E a cirurgia? Escada: exercício bem feito → reavaliar → infiltração/opções com o médico → cirurgia (rotura traumática em quem é ativo, ou quando nada funcionou). O caminho na maioria: exercício
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      cir: w(0, "cirurgia"), rot: w(0, "rotura"), trau: w(0, "trauma"), ativo: w(0, "ativo"), func: w(0, "funcionou"),
      maior: w(0, "maioria"), cam: w(0, "caminho"), exe: w(0, "exercício"),
    };
    const W = 380, S = 0.55, HIP = 194;
    const steps = [
      { x: 90, top: 640, c: C.good, n: "1", a: "Exercício bem feito", b: "por tempo suficiente", dash: false },
      { x: 500, top: 540, c: C.sun, n: "2", a: "Reavaliar", b: "impostores, pescoço", dash: false },
      { x: 910, top: 440, c: "#BFE6EE", n: "3", a: "Infiltração ou outras opções", b: "com o médico", dash: false },
      { x: 1320, top: 340, c: "#FFD3C9", n: "4", a: "Cirurgia", b: "casos específicos", dash: true },
    ];
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.cir, vol: 0.35 },
      { name: "pop", t: k.trau, vol: 0.35 },
      { name: "pop", t: k.func, vol: 0.35 },
      { name: "sparkle", t: k.cam, vol: 0.4 },
    ];
    return {
      k,
      sfx,
      css: `
        #f26-head { left:110px; top:70px; font-size:76px; }
        #f26-head span { color:#D23B30; }
        #root .f26-lab { width:${W - 60}px; text-align:center; }
        #root .f26-lab .a { font-size:32px; }
        #root .f26-lab .b { font-size:26px; margin-top:4px; }
        #root .f26-chip { left:1040px; width:820px; white-space:nowrap; padding:10px 20px; font-size:30px; color:${C.ink}; text-align:center; }
        #root .f26-chip b { color:#C9302C; }
        #f26-best { left:470px; top:420px; padding:10px 22px; font-size:40px; background:${C.good}; color:${C.ink}; transform: rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="860" fill="${C.wall}"/>
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      ${steps.map((s, i) => `<g id="f26-st${i}"><rect x="${s.x}" y="${s.top}" width="${W}" height="${860 - s.top}" rx="14" fill="${s.c}" stroke="${C.ink}" stroke-width="8" ${s.dash ? 'stroke-dasharray="26 16"' : ""}/>
        <circle cx="${s.x + 48}" cy="${s.top + 46}" r="28" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
        <text x="${s.x + 48}" y="${s.top + 58}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">${s.n}</text></g>`).join("")}
      <g id="f26-glow" opacity="0"><rect x="80" y="630" width="400" height="240" rx="20" fill="none" stroke="${C.sun}" stroke-width="14"/></g>
      <g id="f26-jw" opacity="0"><g transform="translate(${90 + 190},${640 - HIP * S}) scale(${S})">${human("f26c", "pablo")}</g></g>
    </svg>
    <div id="f26-head" class="abs title">E a <span>CIRURGIA</span>?</div>
    <div id="f26-ch0" class="abs card label f26-chip" style="top:150px;opacity:0"><b>Rotura depois de trauma</b> em quem é ativo</div>
    <div id="f26-ch1" class="abs card label f26-chip" style="top:240px;opacity:0">ou quando um bom tratamento <b>não funcionou</b></div>
    <div id="f26-best" class="abs card title" style="opacity:0">Na maioria: EXERCÍCIO!</div>
    ${steps.map((s, i) => `<div id="f26-l${i}" class="abs f26-lab label" style="left:${s.x + 30}px;top:${s.top + 76}px;opacity:0"><div class="a">${s.a}</div><div class="b">${s.b}</div></div>`).join("")}`,
      js: function (tl, K, R) {
        const j = "f26c";
        R.setPose(tl, j, 0, { shB: 8, shF: -8, elB: -15, elF: -15 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0, K.dur);
        R.slideIn(tl, "#f26-head", 0.05, 0.5, -300);
        [0, 1, 2, 3].forEach((i) => tl.fromTo(`#f26-st${i}`, { y: 520 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.2 + i * 0.12));
        [0, 1, 2].forEach((i) => R.fadeIn(tl, `#f26-l${i}`, 0.7 + i * 0.15, 0.3));
        tl.fromTo("#f26-jw", { opacity: 1, y: -700 }, { y: 0, duration: 0.6, ease: "bounce.out" }, 0.6);
        // cirurgia: o degrau 4 acende e o doutor aponta
        R.fadeIn(tl, "#f26-l3", K.cir, 0.3);
        tl.fromTo("#f26-st3", { scale: 1 }, { scale: 1.05, svgOrigin: "1510 860", duration: 0.25, yoyo: true, repeat: 1 }, K.cir);
        R.pose(tl, j, K.cir, 0.35, { shF: -130, elF: -10 }, "back.out(2)");
        R.face(tl, j, K.cir, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f26-ch0", K.trau - 0.2, 0.4);
        R.pop(tl, "#f26-ch1", K.func - 0.6, 0.4);
        R.pose(tl, j, K.func, 0.3, { shF: -8, elF: -15 });
        // na maioria: exercício
        R.face(tl, j, K.maior, { eyes: "happy", mouth: "grin" });
        tl.to("#f26-glow", { opacity: 1, duration: 0.25 }, K.cam - 0.1);
        tl.fromTo("#f26-glow", { scale: 1 }, { scale: 1.04, svgOrigin: "280 750", duration: 0.3, yoyo: true, repeat: 3 }, K.cam);
        R.pop(tl, "#f26-best", K.cam, 0.45);
        R.pose(tl, j, K.exe - 0.1, 0.35, { shF: -160, elF: -10, shB: 160, elB: 10 }, "back.out(2)");
        tl.to("#f26-jw", { y: -30, duration: 0.2, ease: "power2.out" }, K.exe);
        tl.to("#f26-jw", { y: 0, duration: 0.25, ease: "power2.in" }, K.exe + 0.2);
      },
    };
  },
};
