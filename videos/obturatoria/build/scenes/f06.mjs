// F6 — O nervo do "fecha-perna": painel com DOIS botões ligados, pele da parte de dentro da coxa, adutores e bola entre os joelhos; os Adutores dançam
export default {
  speakers: { adutores: "f06a-m1" },
  build(ctx) {
    const { C, adutores, w, lines, MINT } = ctx;
    const k = {
      dif: w(0, "Diferente"), misto: w(0, "misto"), sens: w(0, "sensibilidade"), pele: w(0, "pele"), forca: w(0, "força"), adut: w(0, "adutores"),
      fecham: w(0, "fecham"), bola: w(0, "bola"), joel: w(0, "joelhos"), com: w(0, "comanda"),
      a0: lines[1].start, a1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const leg = (id, x0, x1, b0, b1) => `<g id="${id}"><path d="M${x0} 0 L${x1} 0 L${b1} 300 L${b0} 300 Z" fill="#F7D9C2" ${st}/>
      <path d="M${b0 - 4} 300 L${b1 + 4} 300 L${b1} 330 L${b0} 330 Z" fill="#F7D9C2" ${st}/></g>`;
    return {
      k,
      css: `
        #f06-t { left:110px; top:60px; font-size:56px; }
        #f06-t span { color:#2E9E78; }
        #f06-panel { left:110px; top:160px; width:780px; padding:26px 32px; }
        #f06-panel .h { font-size:34px; margin-bottom:14px; }
        .f06-row { display:flex; align-items:center; gap:24px; margin:16px 0; font-size:34px; }
        .f06-btn { width:120px; height:66px; border-radius:40px; border:6px solid ${C.ink}; position:relative; flex:none; background:#ddd; }
        .f06-knob { position:absolute; top:5px; left:6px; width:44px; height:44px; border-radius:50%; background:#fff; border:5px solid ${C.ink}; }
        #f06-misto { left:930px; top:190px; padding:12px 24px; font-size:40px; background:${MINT}; }
        .f06-lab { position:absolute; padding:6px 14px; font-size:26px; background:#fff; border:5px solid ${C.ink}; border-radius:14px; font-family:"Nunito"; font-weight:900; white-space:nowrap; }
        #f06-cmd { left:930px; top:300px; padding:12px 24px; font-size:34px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="1480" cy="600" r="300" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- pernas vistas de frente -->
      <g id="f06-legs" opacity="0" transform="translate(0,520)">
        <path d="M320 -30 Q500 -70 680 -30 L690 20 L310 20 Z" fill="#3F6FA0" ${st}/>
        <g id="f06-legL-w"><g id="f06-legL">${leg("f06-lL", 372, 468, 392, 452)}</g></g>
        <g id="f06-legR-w"><g id="f06-legR">${leg("f06-lR", 532, 628, 548, 608)}</g></g>
        <g id="f06-patch" opacity="0"><path d="M460 120 L455 250 L432 250 L436 120 Z" fill="${MINT}" opacity="0.9"/><path d="M540 120 L545 250 L568 250 L564 120 Z" fill="${MINT}" opacity="0.9"/></g>
        <g id="f06-musc" opacity="0"><path d="M466 6 L420 170 L446 176 L468 40 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/><path d="M534 6 L580 170 L554 176 L532 40 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>
        <g id="f06-ball" opacity="0"><g transform="translate(500,175)"><g id="f06-ball-in"><circle r="36" fill="#fff" ${st}/><path d="M0 -16 L15 -5 L9 13 L-9 13 L-15 -5 Z" fill="${C.ink}"/></g></g></g>
      </g>
      <g id="f06-a-wrap" opacity="0"><g transform="translate(1480,880) scale(1.15)">${adutores("f06a")}</g></g>
      <g id="f06-notes" opacity="0" fill="${C.ink}">${[[1260, 470], [1700, 430], [1560, 360]].map(([x, y]) => `<g transform="translate(${x},${y})"><ellipse cx="0" cy="22" rx="12" ry="9"/><rect x="9" y="-20" width="5" height="44"/></g>`).join("")}</g>
    </svg>
    <div id="f06-t" class="abs title">O nervo do <span>FECHA-PERNA</span></div>
    <div id="f06-panel" class="abs card" style="opacity:0">
      <div class="h title">PAINEL DO TURÃO</div>
      <div class="f06-row label"><div id="f06-b1" class="f06-btn"><div id="f06-k1" class="f06-knob"></div></div><span>SENSIBILIDADE: <span id="f06-on1" style="color:#2E9E78;opacity:0">LIGADA</span></span></div>
      <div class="f06-row label"><div id="f06-b2" class="f06-btn"><div id="f06-k2" class="f06-knob"></div></div><span>FORÇA: <span id="f06-on2" style="color:#2E9E78;opacity:0">LIGADA</span></span></div>
    </div>
    <div id="f06-misto" class="abs card title" style="opacity:0">MISTO!</div>
    <div id="f06-lPele" class="f06-lab" style="left:110px;top:640px;opacity:0;background:${MINT}">pele de dentro da coxa</div>
    <div id="f06-lMus" class="f06-lab" style="left:640px;top:600px;opacity:0;background:#FFC2B5">músculos adutores</div>
    <div id="f06-cmd" class="abs card label" style="opacity:0">quem comanda: <span style="color:#2E9E78">TURÃO</span></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-t", 0, 0.4, -30);
        R.pop(tl, "#f06-panel", K.dif - 0.1, 0.5);
        R.pop(tl, "#f06-misto", K.misto - 0.05, 0.4);
        tl.to("#f06-misto", { rotation: -6, duration: 0.12, yoyo: true, repeat: 3 }, K.misto + 0.4);
        // dois botões ligam
        tl.to("#f06-k1", { x: 56, duration: 0.25, ease: "back.out(2)" }, K.sens);
        tl.to("#f06-b1", { backgroundColor: "#4FD1A5", duration: 0.25 }, K.sens);
        R.fadeIn(tl, "#f06-on1", K.sens + 0.1, 0.2);
        tl.to("#f06-k2", { x: 56, duration: 0.25, ease: "back.out(2)" }, K.forca);
        tl.to("#f06-b2", { backgroundColor: "#4FD1A5", duration: 0.25 }, K.forca);
        R.fadeIn(tl, "#f06-on2", K.forca + 0.1, 0.2);
        // pernas: pele de dentro, músculos adutores
        R.fadeIn(tl, "#f06-legs", K.sens - 0.3, 0.35);
        R.fadeIn(tl, "#f06-patch", K.pele, 0.4);
        R.pop(tl, "#f06-lPele", K.pele + 0.2, 0.35);
        R.fadeIn(tl, "#f06-musc", K.adut - 0.2, 0.3);
        R.pop(tl, "#f06-lMus", K.adut, 0.35);
        // fecham a perna + bola entre os joelhos
        tl.to("#f06-legL", { rotation: -5, svgOrigin: "420 0", duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }, K.fecham);
        tl.to("#f06-legR", { rotation: 5, svgOrigin: "580 0", duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }, K.fecham);
        R.fadeOut(tl, "#f06-lPele, #f06-lMus", K.bola - 0.3, 0.2);
        tl.set("#f06-ball", { opacity: 1 }, K.bola);
        tl.fromTo("#f06-ball", { y: -400 }, { y: 0, duration: 0.5, ease: "bounce.out" }, K.bola);
        tl.to("#f06-legL", { rotation: -3, svgOrigin: "420 0", duration: 0.25, ease: "power2.out" }, K.joel);
        tl.to("#f06-legR", { rotation: 3, svgOrigin: "580 0", duration: 0.25, ease: "power2.out" }, K.joel);
        tl.to("#f06-ball-in", { scaleX: 0.82, svgOrigin: "0 0", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.joel);
        R.pop(tl, "#f06-cmd", K.com - 0.1, 0.4);
        // Adutores entram e dançam
        tl.set("#f06-a-wrap", { opacity: 1 }, K.adut);
        tl.fromTo("#f06-a-wrap", { y: 420 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.adut);
        ["f06a-m0", "f06a-m1", "f06a-m2"].forEach((m, i) => {
          R.setPose(tl, m, 0, { armF: 20, armB: -20 });
          R.face(tl, m, K.adut, { mouth: "grin" });
          if (i !== 1) R.talk(tl, m, K.a0, K.a1, "grin", "open");
          for (let j = 0; j < 6; j++) {
            const t = K.a0 - 0.2 + j * 0.42 + i * 0.07;
            tl.to(`#${m}-body`, { rotation: j % 2 ? 8 : -8, svgOrigin: "0 -30", duration: 0.21, ease: "sine.inOut" }, t);
            R.pose(tl, m, t, 0.2, { armF: j % 2 ? -150 : 20, armB: j % 2 ? -20 : 150 }, "back.out(2)");
          }
          tl.to(`#${m}-body`, { rotation: 0, svgOrigin: "0 -30", duration: 0.2 }, K.a1 + 0.2);
          R.pose(tl, m, K.a1 + 0.2, 0.25, { armF: 20, armB: -20 });
        });
        R.fadeIn(tl, "#f06-notes", K.a0, 0.2);
        tl.to("#f06-notes", { y: -30, duration: 0.6, yoyo: true, repeat: 2, ease: "sine.inOut" }, K.a0);
        R.fadeOut(tl, "#f06-notes", K.a1 + 0.2, 0.3);
      },
      sfx: [
        { name: "pop", t: k.dif, vol: 0.35 },
        { name: "pop", t: k.misto, vol: 0.4 },
        { name: "click", t: k.sens, vol: 0.5 },
        { name: "click", t: k.forca, vol: 0.5 },
        { name: "whoosh-short", t: k.adut, vol: 0.4 },
        { name: "pop", t: k.bola + 0.3, vol: 0.4 },
        { name: "sparkle", t: k.a0, vol: 0.3 },
      ],
    };
  },
};
