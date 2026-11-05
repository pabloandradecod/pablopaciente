// F19 — Exercício 1: apertar a bola entre os joelhos (isométrico, força leve a moderada) + os Adutores "versão leve"
export default {
  speakers: { adutores: "f19a-m1" },
  extra: 0.6,
  build(ctx) {
    const { C, human, adutores, w, lines } = ctx;
    const k = {
      um: w(0, "Um"), ap: w(0, "aperta"), dei: w(0, "Deitado"), bola2: w(0, "bola", 1), seg: w(0, "segura"), vez: w(0, "vezes"),
      forca: w(0, "força"), a0: lines[1].start, a1: lines[1].end,
    };
    // apertões: curto no "aperta", segura longo no "segura", e outro no "força"
    k.sq = [[k.ap, 0.9], [k.seg - 0.1, Math.max(1.8, k.vez - k.seg)], [k.forca - 0.2, 1.8]];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, ...k.sq.map(([t]) => ({ name: "pop", t: t + 0.1, vol: 0.3 })), { name: "sparkle", t: k.a0 - 0.3, vol: 0.35 }];
    return {
      k,
      css: `
        #f19-head { left:110px; top:80px; font-size:70px; }
        #f19-head span { color:${C.good}; }
        #f19-card { left:1300px; top:150px; width:540px; padding:26px 32px; }
        #f19-card .t { font-size:40px; }
        #f19-card .row { font-size:29px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:1340px; top:690px; width:500px; padding:14px 20px; font-size:28px; white-space:nowrap; background:${C.pain}; color:#fff; border-color:${C.ink}; text-align:center; }
        #f19-stop b { font-size:36px; display:block; }
        #f19-inset { left:860px; top:60px; width:400px; padding:10px 16px 14px; }
        #f19-inset .cap { font-size:20px; text-align:center; opacity:0.75; }
        #f19-inset .bar-l { font-size:19px; display:flex; justify-content:space-between; margin-top:4px; }
        #f19-timer { left:720px; top:220px; width:120px; height:120px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:34px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <rect x="300" y="690" width="820" height="40" rx="18" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(820,622) scale(1.5)">${human("f19z", "ze")}</g>
      <g id="f19-ball"><g transform="translate(908,512)"><g id="f19-ball-in"><circle r="30" fill="${C.pain}" ${st} stroke-width="6"/><path d="M-20 -6 Q0 -16 20 -6" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.7"/></g></g></g>
      <g id="f19-a-wrap"><g transform="translate(270,740) scale(0.55)">${adutores("f19a")}</g></g>
    </svg>
    <div id="f19-head" class="abs title">1. <span>APERTA A BOLA</span></div>
    <div id="f19-inset" class="abs card" style="opacity:0">
      <svg width="368" height="200" viewBox="0 0 480 260">
        <rect x="70" y="232" width="340" height="22" rx="10" fill="${C.brown}" ${st} stroke-width="5"/>
        <g id="f19-thL"><path d="M150 240 L196 70" stroke="${C.ink}" stroke-width="58" stroke-linecap="round"/><path d="M150 240 L196 70" stroke="${C.brown}" stroke-width="44" stroke-linecap="round"/></g>
        <g id="f19-thR"><path d="M330 240 L284 70" stroke="${C.ink}" stroke-width="58" stroke-linecap="round"/><path d="M330 240 L284 70" stroke="${C.brown}" stroke-width="44" stroke-linecap="round"/></g>
        <g id="f19-iball"><circle cx="240" cy="78" r="30" fill="${C.pain}" ${st} stroke-width="6"/></g>
        <path id="f19-arL" d="M120 110 L160 110 M148 98 L160 110 L148 122" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        <path id="f19-arR" d="M360 110 L320 110 M332 98 L320 110 L332 122" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      </svg>
      <div class="cap label">visto de frente: joelhos fecham na bola</div>
      <svg width="368" height="34" viewBox="0 0 480 44">
        <rect x="10" y="8" width="460" height="28" rx="14" fill="#fff" ${st} stroke-width="5"/>
        <rect x="194" y="8" width="138" height="28" fill="#CFF5E6"/>
        <rect id="f19-fill" x="12" y="10" width="456" height="24" rx="12" fill="${C.good}"/>
        <rect x="10" y="8" width="460" height="28" rx="14" fill="none" ${st} stroke-width="5"/>
      </svg>
      <div class="bar-l label"><span>força</span><span style="color:#1E9C72">leve a moderada</span><span>máxima</span></div>
    </div>
    <div id="f19-timer" class="abs title" style="opacity:0">5 a<br>10 s</div>
    <div id="f19-card" class="abs card">
      <div class="t title">Aperta a bola</div>
      <div class="row label" id="f19-r0"><div class="dot"></div>Deitado, joelhos dobrados</div>
      <div class="row label" id="f19-r1"><div class="dot"></div>Bola entre os joelhos</div>
      <div class="row label" id="f19-r2"><div class="dot"></div>Aperta e segura 5 a 10 s</div>
      <div class="row label" id="f19-r3"><div class="dot" style="background:${C.sun}"></div><b>10 vezes · força leve a moderada</b></div>
    </div>
    <div id="f19-stop" class="abs card label">Choque ou formigou mais?<b>Diminui</b></div>`,
      js: function (tl, K, R) {
        const z = "f19z";
        // deitado de barriga pra cima, joelhos dobrados
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f19-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f19-card", 0.2, 0.55, 400);
        R.pop(tl, "#f19-stop", 0.6, 0.4);
        R.pop(tl, "#f19-inset", Math.max(0.3, K.ap - 0.4), 0.45, 0.6);
        tl.set("#f19-fill", { attr: { width: 0 } }, 0);
        [K.dei, K.bola2, K.seg, K.vez].forEach((t, i) => tl.fromTo(`#f19-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        tl.set("#f19-r0, #f19-r1, #f19-r2, #f19-r3", { opacity: 0.25 }, 0);
        R.pop(tl, "#f19-timer", K.seg, 0.4);
        // apertões
        K.sq.forEach(([t, hold]) => {
          tl.to("#f19-thL", { rotation: 5, svgOrigin: "150 240", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-thR", { rotation: -5, svgOrigin: "330 240", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-iball", { scaleX: 0.72, scaleY: 1.12, svgOrigin: "240 78", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-ball-in", { scaleY: 0.8, scaleX: 1.15, svgOrigin: "0 0", duration: 0.3, ease: "power2.out" }, t);
          tl.to("#f19-arL, #f19-arR", { opacity: 1, duration: 0.15 }, t);
          tl.to("#f19-fill", { attr: { width: 270 }, duration: 0.35, ease: "power2.out" }, t);
          R.face(tl, z, t, { eyes: "closed", mouth: "flat" });
          const e = t + hold;
          tl.to("#f19-thL, #f19-thR", { rotation: 0, duration: 0.3, ease: "power2.inOut" }, e);
          tl.to("#f19-iball", { scaleX: 1, scaleY: 1, svgOrigin: "240 78", duration: 0.3, ease: "back.out(2)" }, e);
          tl.to("#f19-ball-in", { scaleX: 1, scaleY: 1, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, e);
          tl.to("#f19-arL, #f19-arR", { opacity: 0, duration: 0.15 }, e);
          tl.to("#f19-fill", { attr: { width: 0 }, duration: 0.3 }, e);
          R.face(tl, z, e, { eyes: "happy", mouth: "smile" });
        });
        // os Adutores: entram e dançam leve
        tl.fromTo("#f19-a-wrap", { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, K.a0 - 0.6);
        ["f19a-m0", "f19a-m1", "f19a-m2"].forEach((m, i) => {
          R.face(tl, m, 0, { mouth: "grin" });
          R.setPose(tl, m, 0, { armF: 15, armB: -15 });
          for (let j = 0; j < 3; j++) {
            const t = K.a0 - 0.1 + i * 0.08 + j * 0.45;
            R.pose(tl, m, t, 0.2, { armF: -120, armB: 120 }, "power2.out");
            R.pose(tl, m, t + 0.22, 0.2, { armF: 15, armB: -15 }, "power2.in");
            tl.to(`#${m}-body`, { y: -12, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);
          }
        });
        K.lines.filter((l) => l.who === "adutores").forEach((l) => { R.talk(tl, "f19a-m0", l.start, l.end, "grin"); R.talk(tl, "f19a-m2", l.start + 0.05, l.end, "grin"); });
      },
      sfx,
    };
  },
};
