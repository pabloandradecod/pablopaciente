// F20 — Degrau 3: a mola volta — saltos baixos → mais altos → aterrissagem na caixa; Molão comprime e solta feliz
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, molao, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), mola: w(0, "mola"), trab: w(0, "trabalhar"), forca: w(0, "força"), boa: w(0, "boa"), sal: w(0, "saltos"),
      baix: w(0, "baixinhos"), alt: w(0, "altos"), ate: w(0, "aterrissagens"), aum: w(0, "aumentando"), pou: w(0, "poucos"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // saltos: [início, altura, duração]
    const jumps = [];
    for (let i = 0; i < 3; i++) jumps.push([k.baix + i * 0.45, 50, 0.4]);
    for (let i = 0; i < 2; i++) jumps.push([k.alt + i * 0.7, 160, 0.6]);
    k.jumps = jumps;
    const chip = (id, n, txt) => `<div id="${id}" class="abs card label f20-chip" style="opacity:0"><b>${n}</b> ${txt}</div>`;
    return {
      k,
      css: `
        #f20-head { left:110px; top:60px; font-size:70px; }
        #f20-head span { color:#1E9C72; }
        #f20-cond { left:700px; top:170px; width:540px; padding:16px 22px; font-size:30px; line-height:1.2; }
        #f20-cond b { color:#1E9C72; }
        #f20-panel { left:1290px; top:150px; width:560px; height:420px; }
        #f20-panel .cap { position:absolute; left:20px; top:14px; font-size:24px; }
        #root .f20-chip { top:600px; padding:10px 16px; font-size:26px; }
        #root .f20-chip b { display:inline-block; width:34px; height:34px; border-radius:50%; background:${C.sun}; border:4px solid ${C.ink}; text-align:center; line-height:28px; margin-right:6px; }
        #f20-c0 { left:1290px; } #f20-c1 { left:1560px; } #f20-c2 { left:1290px; top:670px !important; }
        #f20-stop { left:1330px; top:760px; width:520px; padding:12px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f20-stop b { font-size:28px; display:block; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="830" fill="#DCEAF2"/>
      <rect y="830" width="1920" height="250" fill="#E9B872"/><line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f20-box" opacity="0"><rect x="820" y="700" width="200" height="130" rx="10" fill="#C99A62" ${st}/><path d="M820 740 L1020 740" stroke="${C.ink}" stroke-width="5"/></g>
      <g id="f20-j-wrap"><g transform="translate(560,640) scale(1.25)">${human("f20j", "juninho")}</g></g>
      <g id="f20-dust" opacity="0">${[-40, 0, 40].map((dx) => `<circle cx="${590 + dx}" cy="830" r="${14 + Math.abs(dx) / 8}" fill="#fff" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f20-head" class="abs title">3. <span>A MOLA VOLTA!</span></div>
    <div id="f20-cond" class="abs card label" style="opacity:0">Só quando a <b>força estiver boa</b><br>Começa baixo e devagar</div>
    <div id="f20-panel" class="abs card" style="opacity:0">
      <div class="cap label">RAIO-X: o Molão no salto</div>
      <svg class="abs" style="left:0;top:0" width="560" height="420" viewBox="0 0 560 420">
        <path d="M120 400 Q180 330 280 330 Q380 330 440 400 Z" fill="${C.bone}" stroke="${C.ink}" stroke-width="6"/>
        <g id="f20-m-wrap"><g transform="translate(280,340) scale(0.72)">${molao("f20m")}</g></g>
      </svg>
    </div>
    ${chip("f20-c0", "1", "baixinhos")}
    ${chip("f20-c1", "2", "mais altos")}
    ${chip("f20-c2", "3", "aterrissagens na caixa")}
    <div id="f20-stop" class="abs card label">Dor até 3/10 e normal no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const j = "f20j";
        R.setPose(tl, j, 0, { shF: -20, elF: -40, shB: 10, elB: -30 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0.4, K.dur);
        R.face(tl, "f20m", 0, { eyes: "normal", mouth: "smile" });
        R.setPose(tl, "f20m", 0, { armF: 20, armB: -20 });
        R.pop(tl, "#f20-panel", K.mola - 0.2, 0.45, 0.6);
        R.pose(tl, "f20m", K.trab, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f20m", K.trab, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f20-cond", K.forca - 0.2, 0.4, 0.7);
        tl.to("#f20-cond", { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1 }, K.boa);
        R.fadeOut(tl, "#f20-cond", K.ate - 0.6, 0.3);
        // um salto: agacha (mola comprime), sobe (mola solta), aterrissa
        const jump = (t0, h, d) => {
          R.pose(tl, j, t0, 0.12, { hipF: -40, knF: 60, hipB: -40, knB: 60, torso: 15, shF: 40, shB: 40 }, "power2.out");
          tl.to("#f20-j-wrap", { y: 30, duration: 0.12, ease: "power2.out" }, t0);
          tl.to("#f20m-coil", { scaleY: 0.55, transformOrigin: "50% 100%", duration: 0.12, ease: "power2.in" }, t0);
          tl.to("#f20m-top", { y: 95, duration: 0.12, ease: "power2.in" }, t0);
          R.pose(tl, j, t0 + 0.12, d / 2, { hipF: 0, knF: 10, hipB: 0, knB: 10, torso: 0, shF: -160, shB: -150 }, "power2.out");
          tl.to("#f20-j-wrap", { y: -h, duration: d / 2, ease: "power2.out" }, t0 + 0.12);
          tl.to("#f20m-coil", { scaleY: 1.1, transformOrigin: "50% 100%", duration: d / 2, ease: "back.out(3)" }, t0 + 0.12);
          tl.to("#f20m-top", { y: -20, duration: d / 2, ease: "back.out(3)" }, t0 + 0.12);
          tl.to("#f20-j-wrap", { y: 0, duration: d / 2, ease: "power2.in" }, t0 + 0.12 + d / 2);
          tl.to("#f20m-coil", { scaleY: 1, transformOrigin: "50% 100%", duration: d / 2, ease: "power2.in" }, t0 + 0.12 + d / 2);
          tl.to("#f20m-top", { y: 0, duration: d / 2, ease: "power2.in" }, t0 + 0.12 + d / 2);
        };
        R.pop(tl, "#f20-c0", K.baix - 0.2, 0.35);
        K.jumps.slice(0, 3).forEach(([t, h, d]) => jump(t, h, d));
        R.pop(tl, "#f20-c1", K.alt - 0.2, 0.35);
        K.jumps.slice(3).forEach(([t, h, d]) => jump(t, h, d));
        R.pose(tl, j, K.alt + 1.5, 0.3, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: -20, elF: -40, shB: 10, elB: -30 });
        // aterrissagem: desce da caixa e amortece
        R.pop(tl, "#f20-c2", K.ate - 0.2, 0.35);
        tl.set("#f20-box", { opacity: 1 }, K.ate - 0.3);
        tl.fromTo("#f20-box", { y: 200 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, K.ate - 0.3);
        tl.to("#f20-j-wrap", { x: 360, y: -130, duration: 0.01 }, K.ate + 0.2);
        tl.to("#f20-j-wrap", { x: 120, y: -40, duration: 0.25, ease: "power1.out" }, K.ate + 0.5);
        tl.to("#f20-j-wrap", { x: 0, y: 30, duration: 0.2, ease: "power2.in" }, K.ate + 0.75);
        R.pose(tl, j, K.ate + 0.95, 0.15, { hipF: -50, knF: 70, hipB: -50, knB: 70, torso: 20, shF: 30, shB: 30 }, "power2.out");
        tl.to("#f20m-coil", { scaleY: 0.6, transformOrigin: "50% 100%", duration: 0.15, ease: "power2.out" }, K.ate + 0.95);
        tl.to("#f20m-top", { y: 85, duration: 0.15, ease: "power2.out" }, K.ate + 0.95);
        tl.fromTo("#f20-dust", { opacity: 1, scale: 0.6, svgOrigin: "590 830" }, { opacity: 0, scale: 1.4, duration: 0.5 }, K.ate + 0.95);
        R.pose(tl, j, K.ate + 1.4, 0.4, { hipF: 0, knF: 0, hipB: 0, knB: 0, torso: 0, shF: -150, elF: -20 }, "back.out(2)");
        tl.to("#f20-j-wrap", { y: 0, duration: 0.4 }, K.ate + 1.4);
        tl.to("#f20m-coil", { scaleY: 1, transformOrigin: "50% 100%", duration: 0.4, ease: "back.out(3)" }, K.ate + 1.4);
        tl.to("#f20m-top", { y: 0, duration: 0.4, ease: "back.out(3)" }, K.ate + 1.4);
        R.face(tl, j, K.aum, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f20m", K.pou, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "pop", t: k.mola - 0.2, vol: 0.35 },
        { name: "pop", t: k.forca - 0.2, vol: 0.3 },
        ...k.jumps.map(([t]) => ({ name: "whoosh-short", t: t + 0.12, vol: 0.25 })),
        { name: "pop", t: k.ate - 0.3, vol: 0.35 },
        { name: "impact-bass-1", t: k.ate + 0.95, vol: 0.35 },
        { name: "sparkle", t: k.pou, vol: 0.3 },
      ],
    };
  },
};
