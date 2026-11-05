// F5 — Conheça o Disquinho: coluna lombar de lado, corte do disco (anel fibroso em camadas + Geleia), amortecimento
export default {
  speakers: { disquinho: "f05d" },
  build(ctx) {
    const { C, disquinho, geleia, w, lines, JELLY } = ctx;
    const k = {
      entre: w(0, "Entre"), disco: w(0, "disco"), disq: w(0, "Disquinho"), fora: w(0, "fora"), cam: w(0, "camadas"), ceb: w(0, "cebola"),
      anel: w(0, "anel"), meio: w(0, "meio"), gel: w(0, "gelatina"), nucl: w(0, "núcleo"), geleia: w(0, "Geleia"),
      amort: w(0, "amortecem"), mexer: w(0, "mexer"), d0: lines[1].start, d1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    // coluna lombar de lado: L1..L5 + sacro, discos entre elas
    const vx = 170, bw = 200, bh = 84, dh = 30;
    let y = 150, spine = "";
    ["L1", "L2", "L3", "L4", "L5"].forEach((n, i) => {
      spine += `<g><rect x="${vx}" y="${y}" width="${bw}" height="${bh}" rx="18" fill="${C.bone}" ${st}/><path d="M${vx + bw} ${y + 20} L${vx + bw + 70} ${y + 34} Q${vx + bw + 84} ${y + 48} ${vx + bw + 66} ${y + 60} L${vx + bw} ${y + 64}" fill="${C.bone}" ${st}/><text x="${vx + bw / 2}" y="${y + bh / 2 + 12}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="32" fill="${C.ink}">${n}</text></g>`;
      y += bh;
      if (i < 4) { spine += `<rect id="f05-disc${i}" x="${vx + 8}" y="${y + 2}" width="${bw - 16}" height="${dh - 4}" rx="10" fill="${JELLY}" ${st}/>`; y += dh; }
    });
    spine += `<rect id="f05-disc4" x="${vx + 8}" y="${y + 2}" width="${bw - 16}" height="${dh - 4}" rx="10" fill="${JELLY}" ${st}/>`;
    y += dh;
    spine += `<path d="M${vx - 10} ${y} L${vx + bw + 20} ${y} L${vx + bw - 30} ${y + 120} L${vx + 40} ${y + 110} Z" fill="${C.bone}" ${st}/><text x="${vx + bw / 2}" y="${y + 64}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">sacro</text>`;
    const discY = 150 + 4 * (bh + dh) - dh; // disco L4-L5 (index 3)
    // corte do disco visto de cima
    const cx = 900, cy = 440;
    const rings = [230, 196, 162, 128].map((r, i) => `<ellipse class="f05-ring" cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.78}" fill="${i === 0 ? "#F3EAD3" : "none"}" stroke="${i === 0 ? C.ink : "#C9B48E"}" stroke-width="${i === 0 ? 7 : 6}"/>`).join("");
    return {
      k,
      css: `
        #f05-t { left:120px; top:50px; font-size:56px; }
        #f05-t span { color:#3BA9D6; }
        .f05-lab { position:absolute; padding:10px 18px; font-size:28px; }
        #f05-onion { left:1150px; top:150px; }
      `,
      html: `
    <div id="f05-t" class="abs title">Conheça o <span>DISQUINHO</span></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f05-spine"><g id="f05-spine-in">${spine}</g></g>
      <g id="f05-hl" opacity="0"><rect x="${vx - 6}" y="${discY - 8}" width="${bw + 12}" height="${dh + 16}" rx="16" fill="none" stroke="${C.pain}" stroke-width="7" stroke-dasharray="14 8"/></g>
      <path id="f05-zoom" d="M${vx + bw + 14} ${discY + 14} Q560 ${discY - 60} ${cx - 240} ${cy + 40}" fill="none" stroke="${C.pain}" stroke-width="6" stroke-dasharray="12 10" opacity="0"/>
      <g id="f05-cut" opacity="0">
        ${rings}
        <path id="f05-crack" d="M0 0" fill="none"/>
        <g id="f05-g-wrap"><g transform="translate(${cx},${cy + 58}) scale(0.9)">${geleia("f05g")}</g></g>
      </g>
      <g id="f05-onion" opacity="0"><g transform="translate(1250,250)"><path d="M0 -80 Q60 -40 50 20 Q40 70 0 76 Q-40 70 -50 20 Q-60 -40 0 -80Z" fill="#F7D9E8" ${st}/><path d="M0 -70 Q30 -30 26 20 Q20 60 0 66 M0 -70 Q-30 -30 -26 20 Q-20 60 0 66" fill="none" stroke="#C77FA6" stroke-width="5"/><path d="M0 -80 L-6 -104 M0 -80 L8 -102" stroke="${C.good}" stroke-width="7" stroke-linecap="round"/></g></g>
      <g id="f05-d-wrap"><g transform="translate(1560,820) scale(1.4)">${disquinho("f05d")}</g></g>
      <g id="f05-imp" opacity="0"><path d="M1560 360 L1560 520" stroke="${C.pain}" stroke-width="22" stroke-linecap="round"/><path d="M1515 490 L1560 545 L1605 490" fill="none" stroke="${C.pain}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><text x="1560" y="340" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.pain}">IMPACTO!</text></g>
    </svg>
    <div id="f05-lab1" class="f05-lab card label" style="left:1150px;top:360px;opacity:0">camadas firmes = <b>anel fibroso</b></div>
    <div id="f05-lab2" class="f05-lab card label" style="left:700px;top:700px;opacity:0;color:#2788B3">gelatina = <b>núcleo pulposo</b></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-t", 0.1, 0.4);
        tl.fromTo("#f05-spine", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.2);
        // um disco destacado
        tl.set("#f05-hl", { opacity: 1 }, K.disco);
        tl.fromTo("#f05-hl", { scale: 1.3, svgOrigin: "270 600" }, { scale: 1, svgOrigin: "270 600", duration: 0.35, ease: "back.out(2)" }, K.disco);
        tl.to("#f05-disc3", { attr: { fill: "#FFC94A" }, duration: 0.2, yoyo: true, repeat: 3 }, K.disco);
        // Disquinho aparece
        tl.fromTo("#f05-d-wrap", { y: 500 }, { y: 0, duration: 0.6, ease: "back.out(1.5)" }, K.disq - 0.3);
        R.face(tl, "f05d", K.disq, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f05d", K.disq + 0.2, 0.3, { armF: -150, armB: 20 }, "back.out(2)");
        R.pose(tl, "f05d", K.fora, 0.3, { armF: 10, armB: -10 });
        R.face(tl, "f05d", K.fora, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f05d", K.fora, K.dur);
        // corte do disco: camadas
        tl.set("#f05-zoom", { opacity: 1 }, K.fora - 0.2);
        R.draw(tl, "#f05-zoom", K.fora - 0.2, 0.5);
        tl.set("#f05-cut", { opacity: 1 }, K.fora);
        tl.fromTo(".f05-ring", { opacity: 0, scale: 0.6, svgOrigin: "900 440" }, { opacity: 1, scale: 1, svgOrigin: "900 440", duration: 0.35, stagger: 0.25, ease: "back.out(2)" }, K.cam - 0.2);
        tl.set("#f05-g-wrap", { opacity: 0 }, 0);
        R.pop(tl, "#f05-onion", K.ceb - 0.1, 0.4);
        R.pop(tl, "#f05-lab1", K.anel - 0.1, 0.4);
        // Geleia no meio
        tl.set("#f05-g-wrap", { opacity: 1 }, K.gel - 0.1);
        tl.fromTo("#f05-g-wrap", { scale: 0, svgOrigin: "900 498" }, { scale: 1, svgOrigin: "900 498", duration: 0.5, ease: "back.out(2.5)" }, K.gel - 0.1);
        R.face(tl, "f05g", K.gel, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f05-lab2", K.nucl - 0.1, 0.4);
        R.squash(tl, "#f05g-body", K.geleia + 0.1);
        R.pose(tl, "f05g", K.geleia, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.blinks(tl, "f05g", K.geleia + 0.5, K.dur, "happy");
        // amortecem: impacto e squash
        R.fadeOut(tl, "#f05-onion", K.amort - 0.4);
        tl.set("#f05-imp", { opacity: 1 }, K.amort - 0.2);
        tl.fromTo("#f05-imp", { y: -220 }, { y: 0, duration: 0.25, ease: "power3.in" }, K.amort - 0.2);
        tl.to("#f05-imp", { opacity: 0, duration: 0.2 }, K.amort + 0.5);
        tl.to("#f05d-body", { scaleY: 0.72, scaleX: 1.15, svgOrigin: "0 -24", duration: 0.12, ease: "power2.out" }, K.amort + 0.05);
        tl.to("#f05d-body", { scaleY: 1.08, scaleX: 0.96, svgOrigin: "0 -24", duration: 0.18, ease: "power2.inOut" }, K.amort + 0.17);
        tl.to("#f05d-body", { scaleY: 1, scaleX: 1, svgOrigin: "0 -24", duration: 0.25, ease: "power2.out" }, K.amort + 0.35);
        R.face(tl, "f05d", K.amort + 0.05, { eyes: "closed" });
        R.face(tl, "f05d", K.amort + 0.5, { eyes: "happy" });
        // mexer: a coluna se curva para a frente e volta
        tl.to("#f05-spine-in", { rotation: 10, svgOrigin: "270 800", duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, K.mexer - 0.1);
        // fala do Disquinho
        R.pose(tl, "f05d", K.d0, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        R.squash(tl, "#f05-d-wrap", K.d0 + 0.6);
        R.pose(tl, "f05d", K.d1 + 0.1, 0.4, { armF: 10, armB: -10 });
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.35 },
        { name: "pop", t: k.disco, vol: 0.35 },
        { name: "whoosh-short", t: k.disq - 0.3, vol: 0.4 },
        { name: "pop", t: k.cam - 0.2, vol: 0.3 },
        { name: "pop", t: k.gel - 0.1, vol: 0.4 },
        { name: "impact-bass-1", t: k.amort + 0.05, vol: 0.4 },
        { name: "pop", t: k.d0 + 0.6, vol: 0.35 },
      ],
    };
  },
};
