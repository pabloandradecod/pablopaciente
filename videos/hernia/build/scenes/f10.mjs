// F10 — O segredo que a ressonância não conta: muita gente sem dor tem protrusão; cresce com a idade; IMAGEM ≠ DOR; Vértebra: "não se assuste com o laudo!"
export default {
  speakers: { vertebra: "f10v" },
  build(ctx) {
    const { C, vertebra, w, lines } = ctx;
    const k = {
      seg: w(0, "segredo"), nenh: w(0, "nenhuma"), prot: w(0, "protrusão"), hern: w(0, "hérnia"), idade: w(0, "idade"), cabelo: w(0, "cabelo"),
      img: w(0, "imagem"), explica: w(0, "explica"), manda: w(0, "manda"), aval: w(0, "avaliação"),
      v0: lines[1].start, laudo: w(1, "laudo"),
    };
    const st = (sw = 6) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const skins = [C.skinA, C.skinB, "#C98E62", "#F5D2B0", "#A86D46"];
    const shirts = [C.blue, C.good, C.sun, C.purple, C.pain, "#4FB3C9", "#F08A6E", C.navy, "#7FD3F0", C.brown];
    const hasDisc = [0, 2, 3, 5, 6, 8, 9];
    const person = (i) => {
      const x = 170 + i * 160;
      return `<g id="f10-pp${i}"><g transform="translate(${x},0)">
        <rect x="-44" y="380" width="88" height="110" rx="34" fill="${shirts[i]}" ${st()}/>
        <circle cx="0" cy="330" r="46" fill="${skins[i % 5]}" ${st()}/>
        <g id="f10-hair${i}" opacity="${i % 3 === 0 ? 1 : 0}"><path d="M-44 318 Q-40 280 0 280 Q40 280 44 318 Q30 300 0 302 Q-30 300 -44 318Z" fill="#3A2A20" stroke="${C.ink}" stroke-width="4"/></g>
        <g id="f10-white${i}" opacity="0"><path d="M-44 318 Q-40 280 0 280 Q40 280 44 318 Q30 300 0 302 Q-30 300 -44 318Z" fill="#EDEDED" stroke="${C.ink}" stroke-width="4"/></g>
        <circle cx="-16" cy="326" r="5" fill="${C.ink}"/><circle cx="16" cy="326" r="5" fill="${C.ink}"/>
        <path d="M-18 346 Q0 362 18 346" fill="none" ${st(5)}/>
        ${hasDisc.includes(i) ? `<g id="f10-mri${i}" opacity="0"><rect x="-34" y="404" width="68" height="64" rx="8" fill="#1B3440" stroke="#BFE6EE" stroke-width="4"/>
          <rect x="-20" y="414" width="40" height="14" rx="4" fill="#cfd8dc"/><rect x="-20" y="446" width="40" height="14" rx="4" fill="#cfd8dc"/>
          <rect x="-20" y="431" width="40" height="11" rx="4" fill="#7FD3F0"/><circle cx="24" cy="436" r="7" fill="#7FD3F0" stroke="${C.pain}" stroke-width="3"/></g>` : ""}
      </g></g>`;
    };
    const ages = [20, 30, 40, 50, 60, 70, 80];
    return {
      k,
      css: `
        #f10-title { left:0; right:0; top:60px; text-align:center; font-size:62px; }
        #f10-title b { color:${C.pain}; }
        #f10-tag { left:0; right:0; top:520px; text-align:center; }
        #f10-tag span { display:inline-block; padding:8px 22px; font-size:34px; background:#fff; border:5px solid ${C.ink}; border-radius:14px; }
        #f10-stamp { left:1010px; top:640px; padding:18px 34px; font-size:76px; color:${C.pain}; border:10px solid ${C.pain}; border-radius:20px; background:rgba(255,255,255,0.9); transform: rotate(-6deg); }
        #f10-aval { left:1010px; top:640px; width:560px; padding:20px 26px; font-size:44px; text-align:center; }
        #f10-aval b { color:${C.good}; }
        #f10-age { left:160px; top:530px; font-size:34px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      ${Array.from({ length: 10 }, (_, i) => person(i)).join("")}
      <!-- barras de idade -->
      <g id="f10-chart" opacity="0">
        <line x1="150" y1="790" x2="860" y2="790" ${st(6)}/>
        ${ages.map((a, i) => `<rect id="f10-b${i}" x="${180 + i * 96}" y="${790 - (40 + i * 28)}" width="62" height="${40 + i * 28}" rx="6" fill="${i > 3 ? C.sun : "#7FD3F0"}" ${st(5)}/><text x="${211 + i * 96}" y="${822}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">${a}</text>`).join("")}
        <path id="f10-arrow" d="M200 700 Q500 640 820 560" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 10"/>
      </g>
      <g id="f10-v-wrap"><g transform="translate(1780,870) scale(0.85)">${vertebra("f10v")}</g></g>
      <g id="f10-laudo" opacity="0"><g transform="translate(1610,640) rotate(-8)"><rect x="-50" y="-66" width="100" height="132" rx="6" fill="#fff" ${st(5)}/><text x="0" y="-36" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.ink}">LAUDO</text><path d="M-34 -14 L34 -14 M-34 6 L28 6 M-34 26 L20 26 M-34 46 L30 46" ${st(4)} opacity="0.5"/></g></g>
    </svg>
    <div id="f10-title" class="abs title" style="opacity:0">O segredo que a <b>ressonância</b> não conta</div>
    <div id="f10-tag" class="abs label" style="opacity:0"><span>SEM DOR NENHUMA... e com <b style="color:${C.pain}">protrusão</b> na imagem!</span></div>
    <div id="f10-age" class="abs label" style="opacity:0">mais comum com a idade</div>
    <div id="f10-stamp" class="abs title" style="opacity:0">IMAGEM ≠ DOR</div>
    <div id="f10-aval" class="abs card label" style="opacity:0">Quem manda é a <b>AVALIAÇÃO CLÍNICA</b></div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f10-title", Math.max(0, K.seg - 0.4), 0.7, -240);
        for (let i = 0; i < 10; i++) R.rise(tl, `#f10-pp${i}`, 0.3 + i * 0.08, 0.4, 60);
        R.pop(tl, "#f10-tag", K.nenh - 0.1, 0.4);
        // raio-x com protrusão aparece em várias pessoas
        [0, 2, 3, 5, 6, 8, 9].forEach((i, j) => R.pop(tl, `#f10-mri${i}`, K.prot + j * 0.12, 0.3));
        tl.to("#f10-tag", { opacity: 0, duration: 0.3 }, K.idade - 0.4);
        // idade: barras crescendo
        tl.set("#f10-chart", { opacity: 1 }, K.idade - 0.3);
        for (let i = 0; i < 7; i++) { const h = 40 + i * 28; tl.fromTo(`#f10-b${i}`, { attr: { y: 790, height: 0 } }, { attr: { y: 790 - h, height: h }, duration: 0.35, ease: "power2.out" }, K.idade - 0.2 + i * 0.1); }
        R.draw(tl, "#f10-arrow", K.idade + 0.6, 0.6);
        R.rise(tl, "#f10-age", K.idade + 0.3, 0.4);
        // cabelo branco por dentro
        for (let i = 0; i < 10; i++) tl.set(`#f10-white${i}`, { opacity: 1 }, K.cabelo + 0.2 + i * 0.05);
        // IMAGEM ≠ DOR
        tl.fromTo("#f10-stamp", { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.img - 0.2);
        R.shake(tl, "#f10-stamp", K.img + 0.12, 0.25, 6);
        // avaliação clínica manda
        tl.to("#f10-stamp", { opacity: 0, y: -40, duration: 0.3 }, K.manda - 0.5);
        R.pop(tl, "#f10-aval", K.manda - 0.3, 0.4);
        // Vértebra: não se assuste com o laudo
        R.setPose(tl, "f10v", 0, { armF: 20, armB: -20 });
        R.face(tl, "f10v", 0, { eyes: "normal" });
        R.blinks(tl, "f10v", 0.3, K.v0);
        tl.to("#f10-v-wrap", { y: -80, duration: 0.22, ease: "power2.out" }, K.v0 - 0.4);
        tl.to("#f10-v-wrap", { y: 0, duration: 0.22, ease: "power2.in" }, K.v0 - 0.18);
        R.pose(tl, "f10v", K.v0, 0.3, { armF: -140, armB: 40 }, "back.out(2)");
        R.pop(tl, "#f10-laudo", K.v0, 0.35);
        R.face(tl, "f10v", K.laudo, { eyes: "happy" });
        tl.to("#f10-laudo", { rotation: 20, svgOrigin: "1610 640", duration: 0.15, yoyo: true, repeat: 3 }, K.laudo);
      },
      sfx: [
        { name: "whoosh", t: Math.max(0, k.seg - 0.4), vol: 0.35 },
        { name: "pop", t: k.nenh - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.prot, vol: 0.3 },
        { name: "pop", t: k.idade - 0.2, vol: 0.3 },
        { name: "impact-bass-1", t: k.img - 0.05, vol: 0.45 },
        { name: "pop", t: k.manda - 0.3, vol: 0.35 },
        { name: "pop", t: k.v0, vol: 0.35 },
      ],
    };
  },
};
