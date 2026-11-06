// F13 — Fraqueza de verdade: braço que cai depois de queda (suspeita de rotura) × o caso do Seu Zé (dói, mas a força é boa); Supra: "Ufa!"
export default {
  speakers: { supra: "f13s" },
  tail: 1.0,
  build(ctx) {
    const { C, human, supra, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      queda: w(0, "queda"), perde: w(0, "perde"), seg: w(0, "segurar"), alto: w(0, "alto"), rot: w(0, "rotura"), rap: w(0, "rápida"),
      caso: w(0, "caso"), doi: w(0, "dói"), boa: w(0, "boa"), s0: L1.start, s1: L1.end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f13-title { left:0; right:0; top:50px; text-align:center; font-size:66px; }
        #f13-title span { color:${C.pain}; }
        #root .f13-panel { position:absolute; top:160px; width:820px; height:640px; background:#fff; border:7px solid ${C.ink}; border-radius:28px; box-shadow:10px 10px 0 ${C.ink}; }
        #f13-L { left:70px; } #f13-R { left:1030px; }
        #root .f13-h { position:absolute; left:0; right:0; top:20px; text-align:center; font-size:38px; }
        #f13-queda { left:560px; top:244px; padding:8px 18px; font-size:30px; }
        #f13-rot { left:110px; top:640px; width:740px; padding:14px 18px; font-size:32px; text-align:center; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:18px; }
        #f13-ok { left:1080px; top:660px; width:720px; padding:14px 18px; font-size:36px; text-align:center; color:${C.ink}; background:#9BE8C9; border:6px solid ${C.ink}; border-radius:18px; }
        #f13-push { left:1560px; top:290px; padding:8px 16px; font-size:28px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.wall}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
    </svg>
    <div id="f13-title" class="abs title">Fraqueza de verdade: <span>ROMPEU?</span></div>
    <div id="f13-L" class="f13-panel" style="opacity:0">
      <div class="f13-h title">Braço que <span style="color:${C.pain}">não se segura</span></div>
      <svg style="position:absolute;left:0;top:0" width="820" height="640" viewBox="0 0 820 640">
        <!-- figura de frente, braço cai -->
        <g transform="translate(330,0)">
          <circle cx="0" cy="190" r="50" fill="${C.skinA}" ${st}/>
          <path d="M-14 172 L-4 172 M14 172 L4 172" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><path d="M-14 214 Q0 204 14 214" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
          <path d="M-70 260 Q0 236 70 260 L80 470 L-80 470 Z" fill="#E8875E" ${st}/>
          <rect x="-86" y="262" width="34" height="190" rx="16" fill="#E8875E" ${st}/>
          <g transform="translate(70,268)"><g id="f13-arm"><rect x="-17" y="0" width="34" height="200" rx="16" fill="#E8875E" ${st}/><circle cx="0" cy="210" r="19" fill="${C.skinA}" ${st}/></g></g>
          <path id="f13-mot" d="M300 300 Q320 380 290 450 M330 330 Q346 400 320 460" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" opacity="0"/>
        </g>
        <g id="f13-x" opacity="0" transform="translate(690,200)"><circle r="54" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/><path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>
      </svg>
    </div>
    <div id="f13-queda" class="abs card label" style="opacity:0">depois de uma <b style="color:${C.pain}">QUEDA</b></div>
    <div id="f13-rot" class="abs title" style="opacity:0">Suspeita de ROTURA do manguito: avaliar RÁPIDO!</div>
    <div id="f13-R" class="f13-panel" style="opacity:0">
      <div class="f13-h title">O caso do <span style="color:#1E9C74">Seu Zé</span></div>
      <svg style="position:absolute;left:0;top:0" width="820" height="640" viewBox="0 0 820 640">
        <g transform="translate(300,400) scale(1.05)">${human("f13z", "ze")}
          <g id="f13-pain" opacity="0"><circle cx="6" cy="-112" r="26" fill="${C.pain}" opacity="0.4"/><circle cx="6" cy="-112" r="11" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        </g>
        <g id="f13-arrow" opacity="0"><path d="M600 120 L600 210" stroke="${C.ink}" stroke-width="14" stroke-linecap="round"/><path d="M576 196 L600 236 L624 196 Z" fill="${C.ink}"/></g>
        <g id="f13-chk" opacity="0" transform="translate(700,150)"><circle r="50" fill="#3DD9A4" stroke="${C.ink}" stroke-width="6"/><path d="M-22 0 L-6 18 L24 -18" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>
      </svg>
    </div>
    <div id="f13-ok" class="abs title" style="opacity:0">DOR, mas força BOA ✓</div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080" style="pointer-events:none">
      <g id="f13-s-wrap" opacity="0"><g transform="translate(960,890) scale(0.75)">${supra("f13s")}</g></g>
    </svg>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f13-title", 0.05, 0.5);
        // painel da rotura
        R.pop(tl, "#f13-L", 0.3, 0.45);
        tl.set("#f13-arm", { rotation: -95, svgOrigin: "0 0" }, 0);
        R.pop(tl, "#f13-queda", K.queda - 0.1, 0.4);
        tl.to("#f13-arm", { rotation: -100, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 3 }, K.seg);
        tl.to("#f13-arm", { rotation: 0, svgOrigin: "0 0", duration: 0.35, ease: "power3.in" }, K.alto);
        tl.set("#f13-mot", { opacity: 1 }, K.alto + 0.2);
        tl.to("#f13-mot", { opacity: 0, duration: 0.4 }, K.alto + 0.6);
        R.pop(tl, "#f13-x", K.alto + 0.35, 0.35);
        tl.fromTo("#f13-rot", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.rot - 0.1);
        R.shake(tl, "#f13-rot", K.rap, 0.3, 5);
        // o caso do Seu Zé
        tl.to("#f13-L, #f13-queda, #f13-rot", { opacity: 0.35, duration: 0.3 }, K.caso - 0.3);
        R.pop(tl, "#f13-R", K.caso - 0.3, 0.45);
        R.setPose(tl, "f13z", 0, { shF: -90, elF: 0, shB: 10, elB: -10 });
        R.face(tl, "f13z", 0, { eyes: "normal", mouth: "flat" });
        tl.set("#f13-arrow", { opacity: 1 }, K.caso + 0.2);
        tl.fromTo("#f13-arrow", { y: -40 }, { y: 0, duration: 0.25, yoyo: true, repeat: 3 }, K.caso + 0.2);
        tl.set("#f13-pain", { opacity: 1 }, K.doi);
        tl.fromTo("#f13-pain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 5 }, K.doi);
        R.face(tl, "f13z", K.doi, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f13-chk", K.boa - 0.2, 0.35);
        tl.fromTo("#f13-ok", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.boa - 0.2);
        R.face(tl, "f13z", K.boa + 0.4, { eyes: "normal", mouth: "smile" });
        // Supra sobe: "Ufa!"
        R.setPose(tl, "f13s", 0, { armF: -30, armB: 30 });
        R.face(tl, "f13s", 0, { eyes: "happy", mouth: "smile" });
        tl.set("#f13-s-wrap", { opacity: 1 }, K.s0 - 0.5);
        tl.fromTo("#f13-s-wrap", { y: 300 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.s0 - 0.5);
        tl.set("#f13s-sweat", { opacity: 1 }, K.s0 - 0.5);
        R.pose(tl, "f13s", K.s0 + 0.5, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.queda - 0.1, vol: 0.4 },
        { name: "whoosh-short", t: k.alto, vol: 0.45 },
        { name: "error", t: k.alto + 0.35, vol: 0.3 },
        { name: "impact-bass-1", t: k.rot - 0.1, vol: 0.4 },
        { name: "pop", t: k.caso - 0.3, vol: 0.4 },
        { name: "chime", t: k.boa - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.s0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
