// F22 — Exercício 6: agachamento parcial numa perna, mão na parede no começo, espelho mostrando o joelho alinhado
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w, dur } = ctx;
    const k = {
      seis: w(0, "Seis"), aga: w(0, "agachamento"), par: w(0, "parede"), com: w(0, "começo"), esp: w(0, "espelho"), alin: w(0, "alinhado"), tres: w(0, "Três"),
    };
    const reps = [];
    for (let t = k.aga + 0.3; t < dur - 2.2; t += 2.4) reps.push(+t.toFixed(3));
    k.reps = reps;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.esp, vol: 0.4 }, { name: "sparkle", t: k.alin + 0.2, vol: 0.35 }, { name: "pop", t: k.tres, vol: 0.4 }];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:80px; font-size:64px; }
        #f22-head span { color:${C.good}; }
        #f22-card { left:1340px; top:150px; width:480px; padding:26px 30px; }
        #f22-card .t { font-size:40px; }
        #f22-card .row { font-size:29px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f22-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f22-ok { left:1380px; top:690px; width:440px; padding:14px 18px; font-size:28px; background:${C.sun}; text-align:center; }
        #f22-ok b { font-size:32px; display:block; color:${C.pain}; }
        #f22-tag { left:330px; top:220px; padding:10px 18px; font-size:26px; }
        #f22-mtag { left:880px; top:200px; padding:10px 18px; font-size:26px; }
        #f22-good { left:880px; top:200px; padding:10px 18px; font-size:28px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="850" fill="${C.wall}"/>
      <rect y="850" width="1920" height="230" fill="${C.floor}"/>
      <line x1="0" y1="850" x2="1920" y2="850" stroke="${C.ink}" stroke-width="7"/>
      <!-- parede de apoio -->
      <rect x="680" y="280" width="60" height="570" fill="#CFE3DF" ${st}/>
      <g id="f22-cw"><g transform="translate(520,650) scale(1.1)">${human("f22c", "cida")}</g></g>
      <!-- espelho com o reflexo -->
      <g id="f22-mirror" opacity="0">
        <rect x="840" y="270" width="420" height="560" rx="18" fill="#B07A4A" ${st}/>
        <clipPath id="f22-mclip"><rect x="864" y="294" width="372" height="512" rx="10"/></clipPath>
        <rect x="864" y="294" width="372" height="512" rx="10" fill="#DFF3F8" stroke="${C.ink}" stroke-width="5"/>
        <g clip-path="url(#f22-mclip)">
          <g id="f22-mw"><g transform="translate(1050,720) scale(-0.85,0.85)">${human("f22m", "cida")}</g></g>
          <line id="f22-line" x1="1060" y1="560" x2="1060" y2="806" stroke="${C.good}" stroke-width="7" stroke-dasharray="14 10" opacity="0"/>
        </g>
        <path d="M884 320 L940 300 M884 360 L990 316" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
      </g>
    </svg>
    <div id="f22-head" class="abs title">6. <span>AGACHAMENTO NUMA PERNA</span></div>
    <div id="f22-tag" class="abs card label" style="opacity:0">mão na parede no começo</div>
    <div id="f22-mtag" class="abs card label" style="opacity:0">espelho: o joelho fica alinhado?</div>
    <div id="f22-good" class="abs card label" style="opacity:0">joelho alinhado com o pé</div>
    <div id="f22-card" class="abs card">
      <div class="t title">Agachamento parcial</div>
      <div class="row label" id="f22-r0"><div class="dot"></div>Numa perna só, desce pouco</div>
      <div class="row label" id="f22-r1"><div class="dot"></div>Mão na parede no começo</div>
      <div class="row label" id="f22-r2"><div class="dot"></div>Olha o joelho no espelho</div>
      <div class="row label" id="f22-r3"><div class="dot" style="background:${C.sun}"></div><b>3 x 8 de cada lado</b></div>
    </div>
    <div id="f22-ok" class="abs card label">Doeu na lateral do joelho?<b>DIMINUI</b></div>`,
      js: function (tl, K, R) {
        const c = "f22c", m = "f22m";
        [c, m].forEach((id) => {
          R.setPose(tl, id, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
          R.face(tl, id, 0, { eyes: "normal", mouth: "smile" });
        });
        R.blinks(tl, c, 0, K.dur);
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f22-card", 0.2, 0.55, 400);
        R.pop(tl, "#f22-ok", 0.6, 0.4);
        [K.aga, K.par, K.esp, K.tres].forEach((t, i) => tl.fromTo(`#f22-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // fica numa perna (joelho de trás dobrado) com a mão estendida pra parede
        [c, m].forEach((id) => R.pose(tl, id, K.aga - 0.2, 0.45, { knB: 80, hipB: 10, shF: -82, elF: -8 }, "power2.out"));
        R.pop(tl, "#f22-tag", K.par, 0.35);
        R.fadeOut(tl, "#f22-tag", K.esp - 0.3);
        // espelho
        R.pop(tl, "#f22-mirror", K.esp - 0.2, 0.45, 0.6);
        R.pop(tl, "#f22-mtag", K.esp + 0.1, 0.35);
        tl.to("#f22-line", { opacity: 1, duration: 0.3 }, K.alin);
        R.pop(tl, "#f22-good", K.alin + 0.2, 0.35);
        R.fadeOut(tl, "#f22-mtag", K.alin + 0.2);
        // repetições: desce pouco e sobe (o reflexo acompanha)
        K.reps.forEach((t) => {
          [c, m].forEach((id) => {
            R.pose(tl, id, t, 1.0, { hipF: -40, knF: 55, anF: -15, torso: 18, neck: -10 }, "sine.inOut");
            R.pose(tl, id, t + 1.2, 0.9, { hipF: 0, knF: 0, anF: 0, torso: 0, neck: 0 }, "sine.inOut");
          });
          tl.to("#f22-cw", { y: 40, duration: 1.0, ease: "sine.inOut" }, t);
          tl.to("#f22-cw", { y: 0, duration: 0.9, ease: "sine.inOut" }, t + 1.2);
          tl.to("#f22-mw", { y: 32, duration: 1.0, ease: "sine.inOut" }, t);
          tl.to("#f22-mw", { y: 0, duration: 0.9, ease: "sine.inOut" }, t + 1.2);
        });
        R.face(tl, c, K.tres, { eyes: "happy", mouth: "smile" });
        R.face(tl, m, K.tres, { eyes: "happy", mouth: "smile" });
      },
    };
  },
};
