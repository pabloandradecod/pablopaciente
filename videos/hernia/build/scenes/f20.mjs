// F20 — Exercício 2: extensão estilo McKenzie (de bruços → cotovelos → braços), só se centralizar
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      tres: w(0, "Dois"), bru: w(0, "bruços"), cot: w(0, "cotovelos"), prog: w(0, "progredindo"),
      sinal: w(0, "sinal"), sub: w(0, "subir"), lomb: w(0, "lombar"), desc: w(0, "descer"), agora: w(0, "agora"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f20-sign { right:40px; top:34px; width:360px; padding:12px 18px; font-size:26px; line-height:1.1; border-color:#C9372A; display:flex; gap:12px; align-items:center; }
        #f20-sign b { color:#C9372A; }
        #f20-card { left:110px; top:110px; width:640px; padding:24px 30px; }
        #f20-card .n { font-size:40px; color:#fff; background:${C.ink}; display:inline-block; padding:4px 18px; border-radius:12px; margin-bottom:10px; }
        #f20-card .h { font-size:52px; line-height:1; margin-bottom:12px; }
        #f20-card .r { font-size:34px; line-height:1.25; }
        #f20-card .r b { color:#1E9C72; }
        #root .f20-stage { top:430px; font-size:34px; padding:6px 16px; border-radius:12px; background:#fff; border:5px solid ${C.ink}; }
        #f20-ok { left:800px; top:190px; font-size:46px; padding:12px 24px; background:${C.good}; }
        #f20-no { left:800px; top:190px; font-size:40px; padding:12px 24px; background:#FFE1DC; border-color:#C9372A; }
        #f20-no b { color:#C9372A; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="760" fill="${C.wall}"/>
      <rect x="0" y="760" width="1920" height="320" fill="${C.floor}"/>
      <line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <rect x="380" y="736" width="1200" height="34" rx="14" fill="#8E6CD8" ${st}/>
      <g transform="translate(940,674) scale(1.5)">${human("f20z", "ze")}</g>
      <!-- dor: marcador que sobe da perna para a lombar -->
      <g id="f20-pain"><circle id="f20-dot" cx="730" cy="688" r="26" fill="${C.pain}" stroke="#fff" stroke-width="6" opacity="0"/></g>
      <path id="f20-arrow" d="M740 640 Q860 540 960 590" fill="none" stroke="#1E9C72" stroke-width="12" stroke-linecap="round" stroke-dasharray="1 0" opacity="0"/>
      <path id="f20-head" d="M930 566 L964 594 L922 616" fill="none" stroke="#1E9C72" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
    </svg>
    <div id="f20-sign" class="abs card label"><svg width="48" height="48" viewBox="-24 -24 48 48" style="flex:none"><path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`; }).join(" ")} Z" fill="#D64534" stroke="${C.ink}" stroke-width="4"/></svg><span>Dor desceu mais pro pé? <b>PARE</b></span></div>
    <div id="f20-card" class="abs card" style="opacity:0">
      <div class="n label">EXERCÍCIO 2</div>
      <div class="h title">Extensão da coluna</div>
      <div id="f20-r1" class="r label" style="opacity:0">De bruços, <b>1 a 2 min</b></div>
      <div id="f20-r2" class="r label" style="opacity:0">Cotovelos → braços, <b>devagar</b></div>
    </div>
    <div id="f20-s1" class="abs f20-stage label" style="left:120px;opacity:0">1. de bruços</div>
    <div id="f20-s2" class="abs f20-stage label" style="left:120px;opacity:0">2. nos cotovelos</div>
    <div id="f20-s3" class="abs f20-stage label" style="left:120px;opacity:0">3. braços esticados</div>
    <div id="f20-ok" class="abs card title" style="opacity:0">A dor SUBIU? Centralizou!</div>
    <div id="f20-no" class="abs card label" style="opacity:0">Dor <b>descendo</b>? Esse exercício<br><b>não é pra você agora.</b></div>`,
      js: function (tl, K, R) {
        const z = "f20z";
        // de bruços: root +90 (cabeça à direita, barriga para baixo)
        const flat = { root: 90, torso: 0, neck: -8, shF: -170, elF: -10, shB: -168, elB: -10, hipF: -8, hipB: -6, knF: 0, knB: 0, anF: 98, anB: 96 };
        const elbows = { torso: -22, neck: -18, shF: -68, elF: -88, shB: -66, elB: -88 };
        const press = { torso: -52, neck: -6, shF: -40, elF: -8, shB: -38, elB: -8 };
        R.setPose(tl, z, 0, flat);
        R.face(tl, z, 0, { eyes: "closed", mouth: "smile" });
        R.slideIn(tl, "#f20-card", Math.max(0.1, K.tres - 0.3), 0.5, -300);
        R.pop(tl, "#f20-s1", K.bru - 0.1, 0.35, 0.6);
        R.pop(tl, "#f20-r1", K.bru, 0.4, 0.6);
        // cotovelos
        R.fadeOut(tl, "#f20-s1", K.cot - 0.3, 0.2);
        R.pose(tl, z, K.cot - 0.3, 0.7, elbows, "power2.inOut");
        R.face(tl, z, K.cot, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f20-s2", K.cot, 0.35, 0.6);
        // progredindo: braços esticados e repetições (finito)
        R.fadeOut(tl, "#f20-s2", K.prog - 0.2, 0.2);
        R.pop(tl, "#f20-s3", K.prog, 0.35, 0.6);
        R.pop(tl, "#f20-r2", K.prog + 0.2, 0.4, 0.6);
        let t = K.prog - 0.2;
        while (t + 1.4 < K.sub - 0.3) {
          R.pose(tl, z, t, 0.7, press, "sine.inOut");
          R.pose(tl, z, t + 0.7, 0.7, elbows, "sine.inOut");
          t += 1.45;
        }
        R.pose(tl, z, Math.min(t, K.sub - 0.3), 0.5, press, "power2.out");
        R.fadeOut(tl, "#f20-s3", K.sinal - 0.2, 0.2);
        // a dor sobe da perna para a lombar (centralização)
        tl.set("#f20-dot", { opacity: 1 }, K.sinal);
        R.pop(tl, "#f20-dot", K.sinal, 0.35);
        tl.to("#f20-dot", { x: 230, y: -78, duration: 1.3, ease: "power2.inOut" }, K.sub);
        tl.to("#f20-dot", { attr: { fill: "#3DD9A4" }, duration: 0.3 }, K.lomb);
        tl.set("#f20-arrow, #f20-head", { opacity: 1 }, K.sub);
        R.draw(tl, "#f20-arrow", K.sub, 0.9);
        R.pop(tl, "#f20-ok", K.lomb - 0.2, 0.45, 0.5);
        R.face(tl, z, K.lomb, { eyes: "happy", mouth: "grin" });
        // se descer: alerta
        R.fadeOut(tl, "#f20-ok, #f20-arrow, #f20-head", K.desc - 0.3, 0.2);
        tl.to("#f20-dot", { x: -40, y: 12, attr: { fill: "#FF5A4E" }, duration: 0.6, ease: "power2.in" }, K.desc - 0.2);
        R.pop(tl, "#f20-no", K.desc - 0.1, 0.45, 0.5);
        R.shake(tl, "#f20-no", K.agora, 0.3, 5);
        R.face(tl, z, K.desc, { eyes: "wide", mouth: "frown" });
        R.pose(tl, z, K.desc + 0.2, 0.6, { torso: 0, neck: -8, shF: -170, elF: -10, shB: -168, elB: -10 });
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.tres - 0.3), vol: 0.35 },
        { name: "pop", t: k.bru - 0.1, vol: 0.3 },
        { name: "pop", t: k.cot, vol: 0.3 },
        { name: "pop", t: k.prog, vol: 0.3 },
        { name: "sparkle", t: k.lomb - 0.2, vol: 0.4 },
        { name: "error", t: k.desc - 0.1, vol: 0.3 },
      ],
    };
  },
};
