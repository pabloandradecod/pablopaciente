// F6 — Nervo só de sensibilidade: painel com botões; área lilás em forma de bolso na coxa; perna continua forte
export default {
  speakers: { vertebra: "f06v" },
  build(ctx) {
    const { C, human, vertebra, w, lines, LILAC } = ctx;
    const k = {
      imp: w(0, "importante"), sens: w(0, "sensibilidade"), nao: w(0, "Não"), forca: w(0, "força"), musc: w(0, "músculo"),
      queim: w(0, "queimação"), form: w(0, "formigamento"), dorm: w(0, "dormência"), lat: w(0, "lateral"), fraca: w(0, "fraca"),
      v0: lines[1].start, v1: lines[1].end, ufa: w(1, "Ufa"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    return {
      k,
      css: `
        #f06-t { left:110px; top:60px; font-size:56px; }
        #f06-t span { color:#8E6CD8; }
        #f06-panel { left:110px; top:170px; width:760px; padding:30px 34px; }
        #f06-panel .h { font-size:34px; margin-bottom:22px; }
        .f06-row { display:flex; align-items:center; gap:24px; margin:18px 0; font-size:36px; }
        .f06-btn { width:120px; height:66px; border-radius:40px; border:6px solid ${C.ink}; position:relative; flex:none; }
        .f06-knob { position:absolute; top:5px; width:44px; height:44px; border-radius:50%; background:#fff; border:5px solid ${C.ink}; }
        #f06-note { left:430px; top:440px; width:380px; padding:14px 18px; background:#FFF59A; font-size:30px; transform: rotate(-4deg); border:5px solid ${C.ink}; border-radius:6px; box-shadow:6px 6px 0 ${C.ink}; }
        .f06-sym { position:absolute; padding:8px 18px; font-size:30px; background:#fff; border:5px solid ${C.ink}; border-radius:16px; font-family:"Nunito"; font-weight:900; white-space:nowrap; }
        #f06-ok { left:110px; top:640px; padding:14px 26px; font-size:40px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1400" cy="560" r="330" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(1380,598) scale(1.35)">${human("f06z", "ze")}</g>
      <g id="f06-pocket" opacity="0"><path d="M1372 618 L1424 618 Q1430 700 1402 744 Q1384 744 1372 720 Z" fill="${LILAC}" stroke="#fff" stroke-width="5" opacity="0.92"/></g>
      <g id="f06-fire" opacity="0"><path d="M1450 610 Q1436 576 1456 552 Q1462 578 1478 568 Q1482 600 1450 610Z" fill="${C.pain}" ${st}/></g>
      <g id="f06-ants" opacity="0">${[0, 1, 2].map((i) => `<g transform="translate(${1460 + i * 18},${660 + i * 22})"><ellipse rx="7" ry="5" fill="${C.ink}"/><circle cx="9" r="4" fill="${C.ink}"/></g>`).join("")}</g>
      <g id="f06-ice" opacity="0"><rect x="1450" y="730" width="38" height="38" rx="6" fill="#CFEFF7" ${st} transform="rotate(12 1469 749)"/></g>
      <g id="f06-v-wrap"><g transform="translate(1040,880) scale(0.8)">${vertebra("f06v")}</g></g>
    </svg>
    <div id="f06-t" class="abs title">Um nervo <span>só de sensibilidade</span></div>
    <div id="f06-panel" class="abs card" style="opacity:0">
      <div class="h title">PAINEL DO NERVINHO</div>
      <div class="f06-row label"><div id="f06-b1" class="f06-btn" style="background:#ddd"><div id="f06-k1" class="f06-knob" style="left:6px"></div></div><span>SENSIBILIDADE: <span id="f06-on" style="color:#8E6CD8;opacity:0">LIGADA</span></span></div>
      <div class="f06-row label"><div class="f06-btn" style="border-style:dashed;background:transparent"></div><span>FORÇA: <span style="color:${C.pain}">???</span></span></div>
    </div>
    <div id="f06-note" class="abs label" style="opacity:0">"Não tenho esse botão!"<br/><span style="font-size:24px">— assinado: Nervinho</span></div>
    <div id="f06-s1" class="f06-sym" style="left:1500px;top:540px;opacity:0">queimação</div>
    <div id="f06-s2" class="f06-sym" style="left:1520px;top:640px;opacity:0">formigamento</div>
    <div id="f06-s3" class="f06-sym" style="left:1510px;top:740px;opacity:0">dormência</div>
    <div id="f06-ok" class="abs card label" style="opacity:0">perna <span style="color:${C.good}">FORTE</span>: não fica fraca!</div>`,
      js: function (tl, K, R) {
        const z = "f06z";
        R.setPose(tl, z, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.3, K.dur);
        R.idle(tl, z, 0.2, K.dur, 1.2);
        R.rise(tl, "#f06-t", 0, 0.4, -30);
        R.pop(tl, "#f06-panel", K.imp - 0.2, 0.5);
        // liga a sensibilidade
        tl.to("#f06-k1", { x: 56, duration: 0.25, ease: "back.out(2)" }, K.sens);
        tl.to("#f06-b1", { backgroundColor: "#B79CF2", duration: 0.25 }, K.sens);
        R.fadeIn(tl, "#f06-on", K.sens + 0.1, 0.2);
        // força: não tem botão
        R.pop(tl, "#f06-note", K.forca - 0.1, 0.45);
        tl.to("#f06-note", { rotation: 4, duration: 0.15, yoyo: true, repeat: 3 }, K.musc);
        // sintomas na coxa
        R.fadeIn(tl, "#f06-pocket", K.queim - 0.4, 0.3);
        R.face(tl, z, K.queim, { eyes: "wide", mouth: "frown" });
        R.pop(tl, "#f06-fire", K.queim, 0.3); R.pop(tl, "#f06-s1", K.queim + 0.1, 0.35);
        R.pop(tl, "#f06-ants", K.form, 0.3); R.pop(tl, "#f06-s2", K.form + 0.1, 0.35);
        tl.to("#f06-ants", { y: -30, duration: 1.2, ease: "none" }, K.form + 0.3);
        R.pop(tl, "#f06-ice", K.dorm, 0.3); R.pop(tl, "#f06-s3", K.dorm + 0.1, 0.35);
        tl.to("#f06-pocket", { scale: 1.08, svgOrigin: "1398 680", duration: 0.2, yoyo: true, repeat: 1 }, K.lat);
        // mas não deixa a perna fraca: chute firme
        R.fadeOut(tl, "#f06-s1, #f06-s2, #f06-s3, #f06-fire, #f06-ants, #f06-ice", K.fraca - 0.5, 0.25);
        R.pose(tl, z, K.fraca - 0.2, 0.3, { hipF: -80, knF: 0, shF: -150, elF: -30, shB: 30 }, "back.out(2)");
        R.face(tl, z, K.fraca, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f06-ok", K.fraca, 0.4);
        R.pose(tl, z, K.fraca + 0.9, 0.35, { hipF: 0, shF: -10, elF: -20, shB: 5 });
        // Vértebra: ufa!
        const v = "f06v";
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, v, K.v0, { eyes: "wide" });
        tl.to("#f06-v-wrap", { y: -60, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }, K.v0);
        R.pose(tl, v, K.ufa - 0.1, 0.3, { armF: -160, armB: 20 }, "back.out(2)");
        R.face(tl, v, K.ufa, { eyes: "happy" });
      },
      sfx: [
        { name: "pop", t: k.imp - 0.1, vol: 0.35 },
        { name: "click", t: k.sens, vol: 0.5 },
        { name: "pop", t: k.forca, vol: 0.35 },
        { name: "pop", t: k.queim, vol: 0.3 }, { name: "pop", t: k.form, vol: 0.3 }, { name: "pop", t: k.dorm, vol: 0.3 },
        { name: "whoosh-short", t: k.fraca - 0.2, vol: 0.45 },
        { name: "sparkle", t: k.ufa, vol: 0.3 },
      ],
    };
  },
};
