// F22 — Exercício 5: subir um degrau baixo com o quadril nivelado (régua de nível) + Vértebra "Nível perfeito!"
export default {
  speakers: { vertebra: "f22v" },
  extra: 0.5,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      cinco: w(0, "Cinco"), sub: w(0, "subir"), dev: w(0, "devagar"), niv: w(0, "nivelado"), cair: w(0, "cair"), tres: w(0, "Três"),
      v0: lines[1].start, v1: lines[1].end,
    };
    const reps = [];
    for (let t = k.sub; t < k.v0 - 1.8; t += 2.7) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.niv, vol: 0.35 }, { name: "error", t: k.cair + 0.15, vol: 0.3 }, { name: "pop", t: k.tres, vol: 0.4 }, { name: "sparkle", t: k.v0, vol: 0.4 }];
    reps.forEach((t) => sfx.push({ name: "click-soft", t: t + 0.5, vol: 0.35 }));
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const pelvis = (id, rot) => `<g id="${id}" transform="rotate(${rot} 150 70)"><path d="M60 40 Q150 10 240 40 L230 100 Q150 130 70 100 Z" fill="${C.bone}" ${st}/><circle cx="90" cy="100" r="16" fill="#fff" ${st}/><circle cx="210" cy="100" r="16" fill="#fff" ${st}/></g>`;
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:80px; font-size:80px; }
        #f22-head span { color:${C.good}; }
        #f22-card { left:1340px; top:150px; width:480px; padding:26px 30px; }
        #f22-card .t { font-size:40px; }
        #f22-card .row { font-size:30px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f22-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f22-ok { left:1380px; top:690px; width:440px; padding:14px 18px; font-size:27px; background:${C.good}; text-align:center; }
        #f22-ok b { font-size:31px; display:block; }
        #f22-front { left:860px; top:190px; width:330px; padding:14px; text-align:center; }
        #f22-front .cap { font-size:24px; }
        #f22-bal { left:1000px; top:520px; padding:14px 22px; font-size:36px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="850" fill="${C.wall}"/>
      <rect y="850" width="1920" height="230" fill="${C.floor}"/>
      <line x1="0" y1="850" x2="1920" y2="850" stroke="${C.ink}" stroke-width="7"/>
      <!-- degrau baixo -->
      <rect x="600" y="770" width="300" height="80" rx="8" fill="#C99A62" ${st}/>
      <path d="M612 790 L888 790" stroke="#B07A4A" stroke-width="5"/>
      <g id="f22-cw">
        <g transform="translate(480,650) scale(1.1)">${human("f22c", "cida")}</g>
        <!-- régua de nível sobre o quadril -->
        <g id="f22-lev"><rect x="405" y="612" width="150" height="34" rx="10" fill="${C.sun}" ${st}/><rect x="455" y="620" width="50" height="18" rx="9" fill="#CFF5E6" stroke="${C.ink}" stroke-width="4"/><circle id="f22-bub" cx="480" cy="629" r="7" fill="${C.good}" stroke="${C.ink}" stroke-width="3"/></g>
      </g>
      <g id="f22-vw" opacity="0"><g transform="translate(1180,850) scale(0.85)">${vertebra("f22v")}</g></g>
    </svg>
    <div id="f22-head" class="abs title">5. <span>SUBIR O DEGRAU</span></div>
    <div id="f22-front" class="abs card" style="opacity:0">
      <svg width="300" height="150" viewBox="0 0 300 150">
        <g id="f22-pg">${pelvis("f22-p0", 0)}<path d="M250 30 L270 50 L296 14" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g id="f22-pb" opacity="0">${pelvis("f22-p1", 12)}<path d="M252 20 L292 60 M292 20 L252 60" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/></g>
      </svg>
      <div class="cap label">visto de frente: pelve <b style="color:#1E9C72">nivelada</b></div>
    </div>
    <div id="f22-card" class="abs card">
      <div class="t title">Subir o degrau</div>
      <div class="row label" id="f22-r0"><div class="dot"></div>Degrau baixo, devagar</div>
      <div class="row label" id="f22-r1"><div class="dot"></div>Quadril nivelado</div>
      <div class="row label" id="f22-r2"><div class="dot"></div>Pelve não cai pro lado</div>
      <div class="row label" id="f22-r3"><div class="dot" style="background:${C.sun}"></div><b>3 x 8 a 10 cada perna</b></div>
    </div>
    <div id="f22-ok" class="abs card label">Dor até 5/10 e passa no dia seguinte:<b>OK</b></div>
    <div id="f22-bal" class="abs card label" style="opacity:0">Nível <b style="color:#1E9C72">PERFEITO!</b></div>`,
      js: function (tl, K, R) {
        const c = "f22c";
        R.setPose(tl, c, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f22-card", 0.2, 0.55, 400);
        R.pop(tl, "#f22-ok", 0.6, 0.4);
        R.pop(tl, "#f22-lev", 0.7, 0.4);
        [K.sub, K.niv, K.cair, K.tres].forEach((t, i) => tl.fromTo(`#f22-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // visto de frente: pelve nivelada x caindo
        R.pop(tl, "#f22-front", K.niv - 0.2, 0.4);
        tl.set("#f22-pg", { opacity: 0 }, K.cair - 0.05);
        tl.set("#f22-pb", { opacity: 1 }, K.cair - 0.05);
        R.shake(tl, "#f22-pb", K.cair, 0.3, 3);
        tl.set("#f22-pg", { opacity: 1 }, K.tres - 0.2);
        tl.set("#f22-pb", { opacity: 0 }, K.tres - 0.2);
        // repetições: pé da frente no degrau, sobe, desce
        K.reps.forEach((t) => {
          R.pose(tl, c, t, 0.4, { hipF: -60, knF: 72, shF: -30, shB: 20 }, "power2.out");
          R.pose(tl, c, t + 0.45, 0.5, { hipF: -6, knF: 8, hipB: 20, knB: 50, torso: 6 }, "power2.inOut");
          tl.to("#f22-cw", { x: 110, y: -80, duration: 0.5, ease: "power2.inOut" }, t + 0.45);
          R.pose(tl, c, t + 0.95, 0.3, { hipB: 0, knB: 0, hipF: 0, knF: 0, torso: 0, shF: -10, shB: 5 });
          R.face(tl, c, t + 1.0, { eyes: "happy", mouth: "smile" });
          R.pose(tl, c, t + 1.6, 0.4, { hipB: 30, knB: 20, hipF: 0, knF: 10 }, "power2.inOut");
          tl.to("#f22-cw", { x: 0, y: 0, duration: 0.45, ease: "power2.inOut" }, t + 1.65);
          R.pose(tl, c, t + 2.1, 0.3, { hipB: 0, knB: 0, hipF: 0, knF: 0 });
          R.face(tl, c, t + 2.1, { eyes: "normal", mouth: "smile" });
        });
        // bolha da régua treme um pouquinho, mas fica no centro
        tl.fromTo("#f22-bub", { x: -3 }, { x: 3, duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.sub);
        tl.to("#f22-bub", { x: 0, duration: 0.2 }, K.sub + 2.1);
        // Vértebra aprova
        tl.fromTo("#f22-vw", { opacity: 0, y: 260 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.v0 - 0.4);
        R.setPose(tl, "f22v", 0, { armF: 20, armB: -20 });
        R.pose(tl, "f22v", K.v0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f22v", K.v0, { eyes: "happy" });
        R.pop(tl, "#f22-bal", K.v0 + 0.1, 0.4);
        R.fadeOut(tl, "#f22-front", K.v0 - 0.4);
        R.face(tl, c, K.v0 + 0.2, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
