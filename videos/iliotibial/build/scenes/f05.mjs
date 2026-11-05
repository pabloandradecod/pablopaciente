// F5 — A Dona Faixa de cima a baixo: corpo da Dona Cida de lado, trato do quadril à tíbia, dois músculos; Dona Faixa acena
export default {
  speakers: { faixa: "f05f" },
  build(ctx) {
    const { C, human, faixa, w, lines } = ctx;
    const k = {
      trato: w(0, "trato"), grossa: w(0, "grossa"), resist: w(0, "resistente"), quad: w(0, "quadril"), forca: w(0, "força"), dois: w(0, "dois"),
      desce: w(0, "desce"), lat: w(0, "lateral"), tibia: w(0, "tíbia"), abaixo: w(0, "abaixo"), velha: w(0, "velha"), dona: w(0, "Dona"),
      f0: lines[1].start, f1: lines[1].end, pres: w(1, "presente"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const tag = (id, x, y, txt, col) => `<g id="${id}" opacity="0"><rect x="${x}" y="${y - 30}" width="${txt.length * 15 + 34}" height="46" rx="12" fill="#fff" ${st}/><text x="${x + 17}" y="${y + 2}" font-family="Nunito" font-weight="900" font-size="26" fill="${col || C.ink}">${txt}</text></g>`;
    return {
      k,
      css: `
        #f05-h { left:1120px; top:80px; font-size:64px; }
        #f05-h span { color:#6E86A3; }
        #f05-card { left:1120px; top:190px; width:600px; padding:18px 24px; font-size:34px; }
        #f05-card b { color:#6E86A3; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="700" cy="520" r="360" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(700,560) scale(1.5)">${human("f05c", "cida")}</g>
      <!-- dois músculos no quadril -->
      <g id="f05-m1" opacity="0"><ellipse cx="752" cy="538" rx="26" ry="34" fill="${C.pain}" opacity="0.85" ${st}/></g>
      <g id="f05-m2" opacity="0"><ellipse cx="650" cy="540" rx="34" ry="42" fill="${C.pain}" opacity="0.85" ${st}/></g>
      <!-- o trato iliotibial -->
      <path id="f05-band-o" d="M700 500 Q712 560 714 620 Q716 680 720 728" fill="none" stroke="${C.ink}" stroke-width="34" stroke-linecap="round" opacity="0"/>
      <path id="f05-band" d="M700 500 Q712 560 714 620 Q716 680 720 728" fill="none" stroke="#D6E6F5" stroke-width="24" stroke-linecap="round"/>
      <circle id="f05-ins" cx="722" cy="732" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="5" opacity="0"/>
      ${tag("f05-t-quad", 790, 470, "quadril")}
      ${tag("f05-t-mus", 790, 560, "2 músculos puxam", C.pain)}
      ${tag("f05-t-lat", 790, 650, "lateral da coxa")}
      ${tag("f05-t-tib", 790, 740, "tíbia, abaixo do joelho")}
      <path id="f05-arw" d="M760 520 L716 560 M640 520 L700 560" stroke="${C.pain}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0"/>
      <g id="f05-f-wrap"><g transform="translate(1500,880) scale(1.05)">${faixa("f05f")}</g></g>
    </svg>
    <div id="f05-h" class="abs title" style="opacity:0">O trato <span>iliotibial</span></div>
    <div id="f05-card" class="abs card label" style="opacity:0">faixa <b>grossa</b> e muito <b>resistente</b></div>`,
      js: function (tl, K, R) {
        const c = "f05c";
        R.setPose(tl, c, 0, { shF: -75, elF: -70, shB: -55, elB: -70 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.3, K.dur);
        R.rise(tl, "#f05-h", 0.1, 0.5);
        // a faixa se desenha
        tl.set("#f05-band-o", { opacity: 1 }, K.trato);
        R.draw(tl, "#f05-band-o, #f05-band", K.trato, 0.9);
        R.pop(tl, "#f05-card", K.grossa - 0.1, 0.4);
        tl.fromTo("#f05-band", { attr: { "stroke-width": 24 } }, { attr: { "stroke-width": 32 }, duration: 0.2, yoyo: true, repeat: 1 }, K.grossa);
        R.pop(tl, "#f05-t-quad", K.quad - 0.1, 0.35);
        R.pop(tl, "#f05-m1", K.dois - 0.1, 0.35);
        R.pop(tl, "#f05-m2", K.dois + 0.15, 0.35);
        R.pop(tl, "#f05-t-mus", K.forca - 0.1, 0.35);
        tl.fromTo("#f05-arw", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.forca);
        tl.to("#f05-m1, #f05-m2", { scale: 1.15, svgOrigin: "700 540", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.dois + 0.4);
        R.fadeOut(tl, "#f05-card", K.desce - 0.2);
        R.pop(tl, "#f05-t-lat", K.lat - 0.1, 0.35);
        tl.to("#f05-band", { attr: { stroke: "#FFFFFF" }, duration: 0.3, yoyo: true, repeat: 3 }, K.desce);
        R.pop(tl, "#f05-ins", K.tibia - 0.1, 0.35);
        R.pop(tl, "#f05-t-tib", K.tibia - 0.1, 0.35);
        R.face(tl, c, K.velha, { eyes: "wide", mouth: "flat" });
        // a Dona Faixa aparece
        tl.fromTo("#f05-f-wrap", { y: 700 }, { y: 0, duration: 0.6, ease: "back.out(1.4)" }, K.dona - 0.3);
        R.face(tl, "f05f", K.dona - 0.3, { eyes: "happy", mouth: "grin" });
        R.setPose(tl, "f05f", 0, { armF: 20, armB: -20 });
        for (let i = 0; i < 4; i++) R.pose(tl, "f05f", K.f0 + i * 0.3, 0.25, { armF: i % 2 ? -120 : -170 }, "sine.inOut");
        R.pose(tl, "f05f", K.f0 - 0.2, 0.25, { armB: 120 }, "back.out(2)");
        R.face(tl, c, K.f0, { eyes: "happy", mouth: "grin" });
        tl.to("#f05-band", { attr: { stroke: "#FFFFFF" }, duration: 0.2, yoyo: true, repeat: 3 }, K.pres);
      },
      sfx: [
        { name: "whoosh-short", t: k.trato, vol: 0.35 },
        { name: "pop", t: k.grossa - 0.1, vol: 0.3 },
        { name: "pop", t: k.dois, vol: 0.3 },
        { name: "pop", t: k.tibia - 0.1, vol: 0.3 },
        { name: "whoosh", t: k.dona - 0.3, vol: 0.4 },
        { name: "sparkle", t: k.pres, vol: 0.3 },
      ],
    };
  },
};
