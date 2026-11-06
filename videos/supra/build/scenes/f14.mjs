// F14 — Rompeu ou não rompeu? Rotura depois de queda (braço que não sobe; avaliar em poucas semanas) × rotura por desgaste (muitas vezes vai bem com exercício); Supra com curativo
export default {
  speakers: { supra: "f14s" },
  tail: 1.0,
  build(ctx) {
    const { C, human, supra, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      romp: w(0, "Rompeu"), queda: w(0, "queda"), perda: w(0, "perda"), jovem: w(0, "jovem"), aval: w(0, "avaliação"), cir: w(0, "cirurgia"),
      desg: w(0, "desgaste"), trauma: w(0, "trauma"), exer: w(0, "exercício"), s0: L1.start, s1: L1.end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const db = `<g transform="rotate(90)"><rect x="-26" y="-5" width="52" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-36" y="-16" width="14" height="32" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/><rect x="22" y="-16" width="14" height="32" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/></g>`;
    let cida = human("f14c", "cida");
    cida = cida.replace('<g id="f14c-handF">', `<g id="f14c-handF">${db}`).replace('<g id="f14c-handB">', `<g id="f14c-handB">${db}`);
    return {
      k,
      css: `
        #f14-title { left:0; right:0; top:50px; text-align:center; font-size:66px; }
        #f14-title span { color:${C.pain}; }
        #root .f14-panel { position:absolute; top:160px; width:820px; height:640px; background:#fff; border:7px solid ${C.ink}; border-radius:28px; box-shadow:10px 10px 0 ${C.ink}; }
        #f14-L { left:70px; } #f14-R { left:1030px; }
        #root .f14-h { position:absolute; left:20px; right:20px; top:18px; text-align:center; font-size:34px; line-height:1.15; }
        #f14-clock { left:560px; top:330px; width:300px; padding:12px 14px; font-size:28px; text-align:center; }
        #f14-clock b { color:${C.pain}; }
        #f14-rot { left:110px; top:650px; width:740px; padding:14px 18px; font-size:30px; text-align:center; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:18px; }
        #f14-ok { left:1080px; top:650px; width:720px; padding:14px 18px; font-size:32px; text-align:center; color:${C.ink}; background:#9BE8C9; border:6px solid ${C.ink}; border-radius:18px; }
        #f14-cal { left:1520px; top:330px; width:280px; padding:12px 14px; font-size:26px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.wall}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
    </svg>
    <div id="f14-title" class="abs title">Rompeu ou <span>não rompeu?</span></div>
    <div id="f14-L" class="f14-panel" style="opacity:0">
      <div class="f14-h title">Rotura depois de <span style="color:${C.pain}">QUEDA</span>, em quem tinha força boa</div>
      <svg style="position:absolute;left:0;top:0" width="820" height="640" viewBox="0 0 820 640">
        <!-- figura de frente: o braço tenta subir e cai -->
        <g transform="translate(260,0)">
          <circle cx="0" cy="210" r="50" fill="${C.skinA}" ${st}/>
          <path d="M-14 192 L-4 192 M14 192 L4 192" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><path d="M-14 234 Q0 224 14 234" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
          <path d="M-70 280 Q0 256 70 280 L80 490 L-80 490 Z" fill="#3DA5D9" ${st}/>
          <rect x="-86" y="282" width="34" height="190" rx="16" fill="#3DA5D9" ${st}/>
          <g transform="translate(70,288)"><g id="f14-arm"><rect x="-17" y="0" width="34" height="200" rx="16" fill="#3DA5D9" ${st}/><circle cx="0" cy="210" r="19" fill="${C.skinA}" ${st}/></g></g>
          <path id="f14-mot" d="M170 320 Q190 400 160 470 M200 350 Q216 420 190 480" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" opacity="0"/>
          <g id="f14-pain" opacity="0"><circle cx="70" cy="290" r="30" fill="${C.pain}" opacity="0.45"/><circle cx="70" cy="290" r="12" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        </g>
        <g id="f14-x" opacity="0" transform="translate(100,170)"><circle r="46" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/><path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="#fff" stroke-width="11" stroke-linecap="round"/></g>
      </svg>
    </div>
    <div id="f14-clock" class="abs card label" style="opacity:0">
      <svg width="90" height="90" viewBox="-45 -45 90 90"><circle r="38" fill="#fff" stroke="${C.ink}" stroke-width="6"/><line x1="0" y1="0" x2="0" y2="-26" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><g id="f14-hand"><line x1="0" y1="0" x2="20" y2="0" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/></g></svg>
      <div>avaliar em <b>poucas semanas</b></div><div style="font-size:22px;margin-top:4px">às vezes a cirurgia é indicada cedo</div>
    </div>
    <div id="f14-rot" class="abs title" style="opacity:0">Jovem e ativo + perda de força súbita: avaliar RÁPIDO!</div>
    <div id="f14-R" class="f14-panel" style="opacity:0">
      <div class="f14-h title">Rotura por <span style="color:#1E9C74">DESGASTE</span>, sem trauma</div>
      <svg style="position:absolute;left:0;top:0" width="820" height="640" viewBox="0 0 820 640">
        <g transform="translate(260,440) scale(1.05)">${cida}</g>
      </svg>
    </div>
    <div id="f14-cal" class="abs card label" style="opacity:0">
      <svg width="110" height="90" viewBox="0 0 110 90"><rect x="6" y="14" width="98" height="70" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect x="6" y="14" width="98" height="20" rx="6" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>${[0, 1, 2, 3].map((i) => `<path d="M${20 + i * 22} 50 l6 8 l10 -12" fill="none" stroke="#1E9C74" stroke-width="5" stroke-linecap="round"/>`).join("")}</svg>
      <div>sem queda, aos poucos, com a idade</div>
    </div>
    <div id="f14-ok" class="abs title" style="opacity:0">Muitas vezes vai bem com EXERCÍCIO ✓</div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080" style="pointer-events:none">
      <g id="f14-s-wrap" opacity="0"><g transform="translate(960,900) scale(0.78)">${supra("f14s")}
        <g id="f14-band" opacity="0" transform="translate(4,-120) rotate(-18)"><rect x="-44" y="-15" width="88" height="30" rx="12" fill="#F5C99B" stroke="${C.ink}" stroke-width="5"/><rect x="-14" y="-11" width="28" height="22" rx="4" fill="#FBE3C6"/>${[-8, 0, 8].map((x) => `<circle cx="${x}" cy="0" r="2" fill="#C9A27A"/>`).join("")}</g>
      </g></g>
    </svg>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f14-title", 0.05, 0.5);
        // painel da queda
        R.pop(tl, "#f14-L", Math.min(0.7, K.queda - 0.5), 0.45);
        tl.set("#f14-arm", { rotation: 0, svgOrigin: "0 0" }, 0);
        tl.to("#f14-arm", { rotation: -60, svgOrigin: "0 0", duration: 0.5, ease: "power2.out" }, K.perda - 0.4);
        tl.to("#f14-arm", { rotation: -66, svgOrigin: "0 0", duration: 0.1, yoyo: true, repeat: 3 }, K.perda + 0.1);
        tl.to("#f14-arm", { rotation: 0, svgOrigin: "0 0", duration: 0.35, ease: "power3.in" }, K.perda + 0.55);
        tl.set("#f14-mot", { opacity: 1 }, K.perda + 0.75);
        tl.to("#f14-mot", { opacity: 0, duration: 0.4 }, K.perda + 1.1);
        tl.set("#f14-pain", { opacity: 1 }, K.perda + 0.6);
        R.pop(tl, "#f14-x", K.perda + 0.8, 0.35);
        tl.fromTo("#f14-rot", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.jovem - 0.1);
        R.pop(tl, "#f14-clock", K.aval - 0.1, 0.4);
        tl.to("#f14-hand", { rotation: 720, svgOrigin: "0 0", duration: 1.6, ease: "power1.inOut" }, K.aval + 0.2);
        R.shake(tl, "#f14-clock", K.cir, 0.3, 4);
        // painel do desgaste
        tl.to("#f14-L, #f14-clock, #f14-rot", { opacity: 0.35, duration: 0.3 }, K.desg - 0.4);
        R.pop(tl, "#f14-R", K.desg - 0.4, 0.45);
        R.setPose(tl, "f14c", 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, "f14c", 0, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f14-cal", K.trauma - 0.1, 0.4);
        for (let i = 0; i < 3; i++) {
          R.pose(tl, "f14c", K.exer - 0.4 + i * 1.0, 0.45, { shF: -85, shB: -85, elF: 0, elB: 0 }, "power2.out");
          R.pose(tl, "f14c", K.exer + 0.1 + i * 1.0, 0.45, { shF: 10, shB: 10, elF: -10, elB: -10 }, "power2.in");
        }
        R.face(tl, "f14c", K.exer, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f14-ok", { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.exer - 0.1);
        // Supra com curativo: "Tô com um arranhão, mas trabalhando!"
        R.setPose(tl, "f14s", 0, { armF: -30, armB: 30 });
        R.face(tl, "f14s", 0, { eyes: "happy", mouth: "smile" });
        tl.set("#f14-s-wrap", { opacity: 1 }, K.s0 - 0.5);
        tl.fromTo("#f14-s-wrap", { y: 300 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.s0 - 0.5);
        tl.set("#f14s-fray", { opacity: 1 }, K.s0 - 0.5);
        tl.set("#f14-band", { opacity: 1 }, K.s0 - 0.1);
        R.pop(tl, "#f14-band", K.s0 - 0.1, 0.3);
        R.pose(tl, "f14s", K.s0 + 0.6, 0.3, { armF: -120, armB: 30 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "pop", t: Math.min(0.7, k.queda - 0.5), vol: 0.4 },
        { name: "whoosh-short", t: k.perda + 0.55, vol: 0.45 },
        { name: "error", t: k.perda + 0.8, vol: 0.3 },
        { name: "impact-bass-1", t: k.jovem - 0.1, vol: 0.4 },
        { name: "pop", t: k.aval - 0.1, vol: 0.35 },
        { name: "pop", t: k.desg - 0.4, vol: 0.4 },
        { name: "chime", t: k.exer - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.s0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
