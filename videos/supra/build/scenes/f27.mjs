// F27 — Resumo: 3 cartões (Supra segurando a bola, garrafinha com polegar pra cima, tartaruga); Dona Cida na academia faz elevação lateral com peso moderado ao lado do Seu Zé; Deltoidão e Supra fazem pose de dupla
export default {
  speakers: { cida: "f27c" },
  extra: 0.8,
  build(ctx) {
    const { C, human, supra, deltoidao, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), peq: w(0, "pequeno"), gig: w(0, "gigante"), aj: w(0, "Ajusta"), fort: w(0, "fortalece"),
      pac: w(0, "paciência"), peso: w(0, "peso"), pouc: w(0, "poucos"), braco: w(0, "braço"), volta: w(0, "volta"),
      c0: lines[1].start, c1: lines[1].end, cpeso: w(1, "peso"), dev: w(1, "devagar"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.peq - 0.1, vol: 0.4 },
      { name: "pop", t: k.fort - 0.1, vol: 0.4 },
      { name: "pop", t: k.pac - 0.1, vol: 0.4 },
      { name: "impact-bass-2", t: k.aj, vol: 0.25 },
      { name: "sparkle", t: k.braco, vol: 0.35 },
      { name: "pop", t: k.c0, vol: 0.3 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const db = (id) => `<g transform="rotate(90)"><g id="${id}"><rect x="-26" y="-5" width="52" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-36" y="-16" width="14" height="32" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/><rect x="22" y="-16" width="14" height="32" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/></g></g>`;
    let cida = human("f27c", "cida");
    cida = cida.replace('<g id="f27c-handF">', `<g id="f27c-handF">${db("f27-dbF")}`).replace('<g id="f27c-handB">', `<g id="f27c-handB">${db("f27-dbB")}`);
    const card = (i, y, svg, html) => `<div id="f27-k${i}" class="abs card f27-k" style="left:1240px;top:${y}px;opacity:0"><svg width="90" height="90" viewBox="-45 -45 90 90">${svg}</svg><div class="label">${html}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f27-head { left:1240px; top:110px; font-size:60px; color:#D23B30; }
        #root .f27-k { width:560px; padding:12px 18px; display:flex; align-items:center; gap:14px; font-size:29px; line-height:1.15; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#E9E4F5"/>
      <rect x="80" y="160" width="560" height="380" rx="12" fill="#CFE3EE" ${st}/><line x1="360" y1="160" x2="360" y2="540" stroke="${C.ink}" stroke-width="5"/>
      <text x="360" y="130" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="44" fill="${C.ink}">ACADEMIA</text>
      <rect y="880" width="1920" height="200" fill="#B8B0CC"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- Dona Cida com halteres moderados -->
      <g id="f27-cw"><g transform="translate(330,667) scale(1.1)">${cida}</g></g>
      <!-- Seu Zé -->
      <g id="f27-zw"><g transform="translate(760,667) scale(1.1)">${human("f27z", "ze")}</g></g>
      <!-- dupla: Supra e Deltoidão -->
      <g id="f27-sw" opacity="0"><g transform="translate(1380,880) scale(0.6)"><g id="f27-sin">${supra("f27s")}</g></g></g>
      <g id="f27-dw" opacity="0"><g transform="translate(1660,880) scale(0.55)"><g id="f27-din">${deltoidao("f27d")}</g></g></g>
      <g id="f27-spark" opacity="0">${[[330, 300], [520, 380], [880, 330], [1520, 640]].map(([x, y]) => `<path d="M${x} ${y - 22} L${x + 6} ${y - 6} L${x + 22} ${y} L${x + 6} ${y + 6} L${x} ${y + 22} L${x - 6} ${y + 6} L${x - 22} ${y} L${x - 6} ${y - 6} Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f27-head" class="abs title">RESUMINDO</div>
    ${card(0, 200, `<circle cx="10" cy="10" r="28" fill="${C.bone}" stroke="${C.ink}" stroke-width="5"/><rect x="-40" y="-34" width="18" height="52" rx="8" fill="#F2E8D8" stroke="${C.ink}" stroke-width="4"/><rect x="-42" y="-30" width="22" height="7" rx="3" fill="${C.pain}"/><path d="M-22 -6 L-14 -2" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`, `Tendão <b>pequeno</b>, trabalho <b style="color:#D23B30">gigante</b>`)}
    ${card(1, 340, `<rect x="-24" y="-20" width="30" height="56" rx="8" fill="#7FC8F8" stroke="${C.ink}" stroke-width="4"/><rect x="-18" y="-32" width="18" height="14" rx="3" fill="#3DD9A4" stroke="${C.ink}" stroke-width="3"/><path d="M22 30 L22 -10 M10 2 L22 -12 L34 2" fill="none" stroke="#178A63" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`, `<b>Lata cheia</b> e carga <b style="color:#178A63">progressiva</b>`)}
    ${card(2, 480, `<ellipse cx="-4" cy="6" rx="30" ry="20" fill="#4FA36B" stroke="${C.ink}" stroke-width="5"/><circle cx="32" cy="0" r="12" fill="#7CC48E" stroke="${C.ink}" stroke-width="4"/><rect x="22" y="-14" width="22" height="6" rx="3" fill="${C.pain}"/>`, `<b style="color:#2E7D4A">Paciência</b>: o peso sobe aos poucos`)}`,
      js: function (tl, K, R) {
        const c = "f27c", z = "f27z", s = "f27s", d = "f27d";
        R.setPose(tl, c, 0, { shF: 10, elF: -5, shB: 10, elB: -5 });
        tl.set("#f27-dbF, #f27-dbB", { scale: 1.2, svgOrigin: "0 0" }, 0);
        R.face(tl, c, 0, { eyes: "happy", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur, "happy");
        R.setPose(tl, z, 0, { shF: -30, elF: -60, shB: 10, elB: -20 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur, "happy");
        R.slideIn(tl, "#f27-head", 0.05, 0.5, 300);
        // elevações tranquilas, sem dor
        const r0 = 0.4, r1 = K.c0 - 0.3, sp = 1.6, n = Math.max(3, Math.floor((r1 - r0) / sp));
        for (let i = 0; i < n; i++) {
          R.pose(tl, c, r0 + i * sp, sp * 0.45, { shF: -85, shB: -85, elF: 0, elB: 0 }, "sine.inOut");
          R.pose(tl, c, r0 + i * sp + sp * 0.5, sp * 0.45, { shF: 10, shB: 10, elF: -5, elB: -5 }, "sine.inOut");
        }
        // cartões
        R.pop(tl, "#f27-k0", K.peq - 0.1, 0.4);
        R.pop(tl, "#f27-k1", K.fort - 0.1, 0.4);
        R.pop(tl, "#f27-k2", K.pac - 0.1, 0.4);
        // dupla Supra + Deltoidão
        R.setPose(tl, s, 0, { armF: -10, armB: 10 });
        R.setPose(tl, d, 0, { armF: -10, armB: 10 });
        R.face(tl, s, 0, { eyes: "happy", mouth: "smile" });
        R.face(tl, d, 0, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f27-sw, #f27-dw", { opacity: 0, y: 260 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", stagger: 0.12 }, K.aj - 0.3);
        R.pose(tl, d, K.fort, 0.35, { armF: -120, armB: 120 }, "back.out(2)");
        tl.set("#f27d-shades", { opacity: 1 }, K.fort);
        R.face(tl, d, K.fort, { eyes: "happy", mouth: "grin" });
        R.pose(tl, s, K.fort + 0.15, 0.35, { armF: -130, armB: 130 }, "back.out(2)");
        R.face(tl, s, K.fort + 0.15, { eyes: "happy", mouth: "grin" });
        tl.to("#f27-sin", { y: -50, duration: 0.2, ease: "power2.out" }, K.pac);
        tl.to("#f27-sin", { y: 0, duration: 0.25, ease: "power2.in" }, K.pac + 0.2);
        tl.to("#f27-din", { y: -40, duration: 0.2, ease: "power2.out" }, K.pac + 0.15);
        tl.to("#f27-din", { y: 0, duration: 0.25, ease: "power2.in" }, K.pac + 0.35);
        // o braço volta lá pra cima: brilho e Seu Zé comemora
        tl.fromTo("#f27-spark", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.braco);
        tl.fromTo("#f27-spark path", { scale: 0.4, transformOrigin: "50% 50%" }, { scale: 1.1, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.braco);
        R.pose(tl, z, K.volta, 0.3, { shF: -150, elF: -10 }, "back.out(2)");
        R.face(tl, z, K.volta, { eyes: "happy", mouth: "grin" });
        // fala da Cida: halteres no alto, devagar
        R.pose(tl, c, K.c0, 0.3, { shF: -40, elF: -90, shB: 10, elB: -10 });
        R.face(tl, c, K.c0, { eyes: "happy", mouth: "grin" });
        R.pose(tl, c, K.dev - 0.1, 0.8, { shF: -85, elF: 0, shB: -85, elB: 0 }, "sine.inOut");
      },
    };
  },
};
