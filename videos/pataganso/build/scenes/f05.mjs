// F5 — Por que "pata de ganso": joelho visto de frente, três tendões se juntando na tíbia; Dona Gansa mostra o pé; mnemônico
export default {
  speakers: { gansa: "f05g" },
  build(ctx) {
    const { C, gansa, w, lines } = ctx;
    const k = {
      dentro: w(0, "dentro"), tres: w(0, "três"), desc: w(0, "descem"), prend: w(0, "prendem"), tib: w(0, "tíbia"), abaixo: w(0, "abaixo"),
      des: w(0, "desenho"), ganso: w(0, "ganso"), sart: w(0, "sartório"), grac: w(0, "grácil"), semi: w(0, "semitendinoso"),
      lemb: w(0, "lembrar"), sempre: w(0, "sempre"), gosto: w(0, "gosto"), sorv: w(0, "sorvete"),
      g0: lines[1].start, g1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const T = [
      { id: "s", c: "#8E6CD8", d: "M520 160 Q470 380 470 560 Q470 650 545 700" },
      { id: "g", c: "#2BB5A0", d: "M470 200 Q440 400 455 560 Q462 650 548 712" },
      { id: "t", c: "#FF8A3D", d: "M610 220 Q520 380 488 560 Q478 640 552 724" },
    ];
    return {
      k,
      css: `
        #f05-h { left:90px; top:70px; font-size:56px; }
        #f05-h span { color:#FF9F1C; }
        #f05-lbl0, #f05-lbl1, #f05-lbl2 { padding:6px 16px; font-size:30px; color:#fff; border-radius:12px; border:5px solid ${C.ink}; }
        #f05-lbl0 { left:150px; top:300px; background:#8E6CD8; } #f05-lbl1 { left:100px; top:390px; background:#2BB5A0; } #f05-lbl2 { left:640px; top:380px; background:#FF8A3D; }
        #f05-tag { left:640px; top:770px; padding:8px 16px; font-size:26px; }
        #f05-igual { left:1500px; top:230px; padding:10px 22px; font-size:40px; transform: rotate(4deg); }
        #f05-mn { left:820px; top:180px; padding:18px 26px; font-size:40px; line-height:1.35; }
        #f05-mn b { font-size:52px; } #f05-mn .s1 { color:#8E6CD8; } #f05-mn .g1 { color:#2BB5A0; } #f05-mn .s2 { color:#FF8A3D; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- joelho direito visto de frente -->
      <g transform="translate(115,176) scale(0.8)">
      <g id="f05-leg">
        <path d="M440 100 L700 100 Q690 400 660 600 L470 600 Q440 400 440 100Z" fill="#F2C59A" ${st}/>
        <path d="M470 600 L660 600 Q650 740 640 880 L500 880 Q490 740 470 600Z" fill="#F2C59A" ${st}/>
        <ellipse cx="575" cy="600" rx="62" ry="70" fill="${C.bone}" ${st}/>
        <path d="M455 610 Q575 640 670 610" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="12 10" opacity="0.6"/>
        <text x="285" y="608" text-anchor="end" font-family="Nunito" font-weight="900" font-size="34" fill="${C.ink}">dobra do joelho</text>
        <text x="285" y="410" text-anchor="end" font-family="Nunito" font-weight="900" font-size="34" fill="${C.ink}">lado de dentro</text>
        <path d="M300 398 L440 398" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
      </g>
      ${T.map((t) => `<path id="f05-t${t.id}" d="${t.d}" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/><path id="f05-t${t.id}c" d="${t.d}" fill="none" stroke="${t.c}" stroke-width="12" stroke-linecap="round"/>`).join("")}
      <g id="f05-ins" opacity="0"><circle cx="550" cy="715" r="26" fill="none" stroke="${C.pain}" stroke-width="6" stroke-dasharray="10 8"/></g>
      <g id="f05-ruler" opacity="0"><line x1="700" y1="605" x2="700" y2="715" stroke="${C.ink}" stroke-width="5"/><line x1="688" y1="605" x2="712" y2="605" stroke="${C.ink}" stroke-width="5"/><line x1="688" y1="715" x2="712" y2="715" stroke="${C.ink}" stroke-width="5"/><text x="720" y="668" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">4–5 cm</text></g>
      <g id="f05-g-wrap"><g transform="translate(1560,880) scale(1.1)">${gansa("f05g")}</g></g>
      <g id="f05-arrow" opacity="0"><path d="M760 760 Q1100 900 1500 860" fill="none" stroke="${C.ink}" stroke-width="6" stroke-dasharray="14 12"/></g>
    </svg>
    <div id="f05-h" class="abs title">Por que <span>"pata de ganso"</span>?</div>
    <div id="f05-lbl0" class="abs label" style="opacity:0">sartório</div>
    <div id="f05-lbl1" class="abs label" style="opacity:0">grácil</div>
    <div id="f05-lbl2" class="abs label" style="opacity:0">semitendinoso</div>
    <div id="f05-tag" class="abs card label" style="opacity:0">os 3 se prendem juntinhos na <b>tíbia</b></div>
    <div id="f05-igual" class="abs card title" style="opacity:0">igualzinho!</div>
    <div id="f05-mn" class="abs card title" style="opacity:0">Pra lembrar:<br><span id="f05-m0"><b class="s1">S</b>empre</span> <span id="f05-m1"><b class="g1">G</b>osto</span> de <span id="f05-m2"><b class="s2">S</b>orvete</span></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-h", 0.1, 0.4);
        tl.fromTo("#f05-leg", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 0.2);
        tl.set("#f05-ts, #f05-tsc, #f05-tg, #f05-tgc, #f05-tt, #f05-ttc", { opacity: 0 }, 0);
        ["s", "g", "t"].forEach((id, i) => {
          const t = K.desc + i * 0.35;
          tl.set(`#f05-t${id}, #f05-t${id}c`, { opacity: 1 }, t);
          R.draw(tl, `#f05-t${id}`, t, 0.7);
          R.draw(tl, `#f05-t${id}c`, t, 0.7);
        });
        R.pop(tl, "#f05-ins", K.prend, 0.4);
        R.pop(tl, "#f05-tag", K.tib - 0.1, 0.4);
        tl.set("#f05-ruler", { opacity: 1 }, K.abaixo);
        R.draw(tl, "#f05-ruler line", K.abaixo, 0.4);
        // Dona Gansa mostra o pé
        R.setPose(tl, "f05g", 0, { armF: 0, armB: 0 });
        R.face(tl, "f05g", 0, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f05-g-wrap", { x: 500 }, { x: 0, duration: 0.6, ease: "back.out(1.4)" }, K.des - 0.4);
        tl.set("#f05-arrow", { opacity: 1 }, K.ganso - 0.2);
        R.draw(tl, "#f05-arrow path", K.ganso - 0.2, 0.5);
        tl.fromTo("#f05g-foot", { scale: 1 }, { scale: 1.8, svgOrigin: "1591 873", duration: 0.35, ease: "back.out(2)" }, K.ganso);
        tl.to("#f05g-toe0, #f05g-toe1, #f05g-toe2", { fill: "#FF5A4E", duration: 0.15, yoyo: true, repeat: 3 }, K.ganso + 0.3);
        R.pop(tl, "#f05-igual", K.ganso + 0.2, 0.4);
        R.face(tl, "f05g", K.ganso, { eyes: "happy" });
        R.pose(tl, "f05g", K.ganso, 0.3, { armF: -70 }, "back.out(2)");
        // nomes
        [K.sart, K.grac, K.semi].forEach((t, i) => {
          R.pop(tl, `#f05-lbl${i}`, t - 0.1, 0.35);
          const id = ["s", "g", "t"][i];
          tl.to(`#f05-t${id}c`, { attr: { "stroke-width": 18 }, duration: 0.15, yoyo: true, repeat: 1 }, t);
        });
        R.fadeOut(tl, "#f05-igual, #f05-arrow", K.lemb - 0.4);
        // mnemônico
        R.pop(tl, "#f05-mn", K.lemb - 0.1, 0.4);
        [K.sempre, K.gosto, K.sorv].forEach((t, i) => tl.fromTo(`#f05-m${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.2 }, t));
        tl.set("#f05-m0, #f05-m1, #f05-m2", { opacity: 0.25 }, K.lemb - 0.1);
        // fala da Gansa
        R.face(tl, "f05g", K.g0, { eyes: "happy" });
        R.pose(tl, "f05g", K.g0, 0.25, { armF: -110, armB: 110 }, "back.out(2)");
        tl.to("#f05-g-wrap", { y: -40, duration: 0.2, yoyo: true, repeat: 3, ease: "power2.out" }, K.g0);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.35 },
        { name: "pop", t: k.prend, vol: 0.35 },
        { name: "whoosh-short", t: k.des - 0.4, vol: 0.4 },
        { name: "pop", t: k.ganso, vol: 0.45 },
        ...[k.sart, k.grac, k.semi].map((t) => ({ name: "click-soft", t, vol: 0.35 })),
        { name: "sparkle", t: k.lemb, vol: 0.35 },
      ],
    };
  },
};
