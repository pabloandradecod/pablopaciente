// F2 — Gancho: Dona Cida na musculação (o halter cresce toda semana), varal alto, pote na prateleira: o braço falha; bolha com o Supra segurando a bola e o Deltoidão puxando
export default {
  speakers: { ze: "f02z", supra: "f02s" },
  build(ctx) {
    const { C, human, supra, deltoidao, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      musc: w(0, "musculação"), prim: w(0, "primeira"), seg: w(0, "segunda"), dobr: w(0, "dobrou"), terc: w(0, "terceira"), casa: w(0, "casa"),
      varal: w(0, "varal"), pote: w(0, "pote"), prat: w(0, "prateleira"), doi: w(0, "dói"), forca: w(0, "força"), cam: w(0, "caminho"),
      z0: L1.start, z1: L1.end, s0: L2.start, s1: L2.end, p3: L3.start, romp: w(3, "rompeu"), inv: w(3, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const db = (id) => `<g transform="rotate(90)"><g id="${id}"><rect x="-26" y="-5" width="52" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-36" y="-16" width="14" height="32" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/><rect x="22" y="-16" width="14" height="32" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/></g></g>`;
    const cloth = `<g id="f02-shirt" opacity="0"><path d="M-30 -10 L30 -10 L44 10 L30 18 L28 60 L-28 60 L-30 18 L-44 10 Z" fill="#FF8A3D" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/></g>`;
    const pot = `<g id="f02-pot" opacity="0"><rect x="-20" y="-44" width="40" height="44" rx="8" fill="#FFC94A" stroke="${C.ink}" stroke-width="4"/><rect x="-24" y="-52" width="48" height="12" rx="5" fill="#E05A4E" stroke="${C.ink}" stroke-width="4"/></g>`;
    let cida = human("f02c", "cida");
    cida = cida.replace('<g id="f02c-handF">', `<g id="f02c-handF">${db("f02-dbF")}${cloth}${pot}`).replace('<g id="f02c-handB">', `<g id="f02c-handB">${db("f02-dbB")}`);
    return {
      k,
      css: `
        #f02-week { left:1240px; top:150px; width:470px; padding:16px; text-align:center; }
        #f02-week .a { font-size:34px; } #f02-week .b { font-size:96px; line-height:1.05; color:${C.pain}; }
        #f02-tag { left:120px; top:120px; padding:14px 26px; font-size:42px; }
        #f02-q { left:0; right:0; top:80px; text-align:center; font-size:80px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- academia -->
      <g id="f02-gym">
        <rect width="1920" height="1080" fill="#E9E4F5"/>
        <rect x="80" y="180" width="640" height="420" rx="12" fill="#CFE3EE" ${st}/><line x1="400" y1="180" x2="400" y2="600" stroke="${C.ink}" stroke-width="5"/>
        <text x="400" y="150" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="44" fill="${C.ink}">ACADEMIA</text>
        <g transform="translate(1500,880)"><rect x="-200" y="-90" width="400" height="16" rx="6" fill="#777" ${st}/>${[-170, -100, -30, 40, 110].map((x, i) => `<rect x="${x}" y="${-150 + i * 6}" width="${40 + i * 6}" height="${60 - i * 6}" rx="8" fill="#3A3A3A" stroke="${C.ink}" stroke-width="4"/>`).join("")}<rect x="-190" y="-80" width="16" height="80" fill="#777" ${st}/><rect x="174" y="-80" width="16" height="80" fill="#777" ${st}/></g>
        <rect y="880" width="1920" height="200" fill="#B8B0CC"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      </g>
      <!-- quintal com varal -->
      <g id="f02-yard" opacity="0">
        <rect width="1920" height="1080" fill="${C.sky}"/>
        <circle cx="1650" cy="170" r="60" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
        <rect x="300" y="300" width="18" height="580" fill="#8B5A2B" ${st}/><rect x="1500" y="300" width="18" height="580" fill="#8B5A2B" ${st}/>
        <path d="M309 310 Q910 360 1509 310" fill="none" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(560,330)"><path d="M-30 -6 L30 -6 L44 14 L30 22 L28 64 L-28 64 L-30 22 L-44 14 Z" fill="#7FC8F8" stroke="${C.ink}" stroke-width="4"/></g>
        <g transform="translate(1260,330)"><rect x="-34" y="-4" width="68" height="80" rx="6" fill="#B07ED8" stroke="${C.ink}" stroke-width="4"/></g>
        <rect y="880" width="1920" height="200" fill="#8CC56A"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      </g>
      <!-- cozinha com prateleira alta -->
      <g id="f02-kit" opacity="0">
        <rect width="1920" height="1080" fill="#FCE9C8"/>
        <rect x="700" y="250" width="700" height="24" rx="6" fill="#B07A4A" ${st}/>
        ${[0, 1, 2].map((i) => `<rect x="${760 + i * 90}" y="${190}" width="56" height="60" rx="8" fill="${["#7FC8F8", "#3DD9A4", "#B07ED8"][i]}" stroke="${C.ink}" stroke-width="4"/>`).join("")}
        <rect id="f02-slot" x="1180" y="190" width="56" height="60" rx="8" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/>
        <rect x="1200" y="520" width="600" height="360" fill="#D9B98C" ${st}/>
        <rect y="880" width="1920" height="200" fill="#D9B98C"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      </g>
      <!-- Dona Cida -->
      <g id="f02-c-wrap"><g transform="translate(860,640) scale(1.3)">${cida}
        <g id="f02-pain" opacity="0"><circle cx="6" cy="-112" r="26" fill="${C.pain}" opacity="0.4"/><circle cx="6" cy="-112" r="11" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
      </g></g>
      <!-- Seu Zé -->
      <g id="f02-z-wrap" opacity="0"><g transform="translate(1500,660) scale(1.2)">${human("f02z", "ze")}</g></g>
      <!-- bolha: dentro do ombro -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1440" cy="480" r="300"/></clipPath>
        <circle cx="1440" cy="480" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1130" y="170" width="620" height="620" fill="#FFE4DC"/>
          <circle cx="1400" cy="510" r="120" fill="${C.bone}" ${st}/>
          <text x="1400" y="520" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="${C.ink}">ÚMERO</text>
          <g id="f02-d-wrap"><g transform="translate(1620,700) scale(0.55)">${deltoidao("f02d")}</g></g>
          <g id="f02-s-wrap"><g transform="translate(1250,640) scale(0.62)">${supra("f02s")}</g></g>
        </g>
        <path d="M1170 680 L1050 780 L1220 730" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-week" class="abs card" style="opacity:0"><div class="a label">Semana <span id="f02-wn">1</span></div><div class="b title"><span id="f02-kg">2</span> kg</div></div>
    <div id="f02-tag" class="abs card title" style="opacity:0">Elevação lateral</div>
    <div id="f02-q" class="abs title" style="opacity:0">Será que <span>rompeu</span> o tendão?</div>`,
      js: function (tl, K, R) {
        const c = "f02c";
        R.setPose(tl, c, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        R.blinks(tl, c, 0.4, K.doi, "happy");
        tl.set("#f02-shirt, #f02-pot", { opacity: 0 }, 0);
        tl.set("#f02-dbF, #f02-dbB", { scale: 0.8, svgOrigin: "0 0" }, 0);
        R.pop(tl, "#f02-tag", K.musc - 0.1, 0.4);
        // elevações: sobe e desce o braço com o halter
        const reps = (t0, t1, sp) => {
          const n = Math.max(2, Math.floor((t1 - t0) / sp));
          for (let i = 0; i < n; i++) {
            R.pose(tl, c, t0 + i * sp, sp * 0.45, { shF: -85, shB: -85, elF: 0, elB: 0 }, "power2.out");
            R.pose(tl, c, t0 + i * sp + sp * 0.5, sp * 0.45, { shF: 10, shB: 10, elF: -5, elB: -5 }, "power2.in");
          }
        };
        R.pop(tl, "#f02-week", K.prim - 0.1, 0.4);
        reps(K.prim, K.seg - 0.1, 1.1);
        tl.set("#f02-wn", { textContent: "2" }, K.seg);
        tl.set("#f02-kg", { textContent: "4" }, K.dobr);
        tl.to("#f02-dbF, #f02-dbB", { scale: 1.3, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, K.dobr);
        R.face(tl, c, K.dobr, { eyes: "normal", mouth: "flat" });
        reps(K.dobr + 0.1, K.terc - 0.1, 1.3);
        tl.set("#f02-wn", { textContent: "3" }, K.terc);
        tl.set("#f02-kg", { textContent: "6" }, K.terc + 0.3);
        tl.to("#f02-dbF, #f02-dbB", { scale: 1.9, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, K.terc + 0.3);
        R.face(tl, c, K.terc + 0.3, { eyes: "wide", mouth: "open" });
        reps(K.terc + 0.4, K.casa - 0.4, 1.5);
        tl.fromTo("#f02-week", { rotation: -4 }, { rotation: 4, duration: 0.12, yoyo: true, repeat: 5 }, K.terc + 0.3);
        R.fadeOut(tl, "#f02-week, #f02-tag", K.casa - 0.4);
        // varal alto
        tl.to("#f02-gym", { opacity: 0, duration: 0.3 }, K.casa - 0.3);
        tl.to("#f02-yard", { opacity: 1, duration: 0.3 }, K.casa - 0.3);
        tl.set("#f02-dbF, #f02-dbB", { opacity: 0 }, K.casa - 0.1);
        R.pose(tl, c, K.casa - 0.3, 0.3, { shF: 10, shB: 10, elF: -10, elB: -10 });
        R.face(tl, c, K.casa, { eyes: "happy", mouth: "smile" });
        tl.set("#f02-shirt", { opacity: 1 }, K.varal - 0.2);
        for (let i = 0; i < 2; i++) {
          R.pose(tl, c, K.varal - 0.1 + i * 1.1, 0.4, { shF: -170, elF: -10 }, "power2.out");
          R.pose(tl, c, K.varal + 0.5 + i * 1.1, 0.4, { shF: 10, elF: -10 });
        }
        tl.to("#f02-c-wrap", { x: 260, duration: 1.2, ease: "power1.inOut" }, K.varal + 0.2);
        // cozinha: pote na prateleira de cima
        tl.to("#f02-yard", { opacity: 0, duration: 0.3 }, K.pote - 0.4);
        tl.to("#f02-kit", { opacity: 1, duration: 0.3 }, K.pote - 0.4);
        tl.set("#f02-shirt", { opacity: 0 }, K.pote - 0.2);
        tl.set("#f02-pot", { opacity: 1 }, K.pote - 0.2);
        tl.set("#f02-c-wrap", { x: 120 }, K.pote - 0.1);
        R.face(tl, c, K.pote, { eyes: "normal", mouth: "smile" });
        R.pose(tl, c, K.prat, 0.6, { shF: -110, elF: -10 }, "power1.out");
        R.face(tl, c, K.doi, { eyes: "pain", mouth: "frown" });
        tl.set("#f02-pain", { opacity: 1 }, K.doi);
        tl.fromTo("#f02-pain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 5 }, K.doi);
        R.pose(tl, c, K.forca, 0.35, { shF: -40, elF: -40 }, "power3.in");
        R.shake(tl, "#f02c-root", K.forca + 0.3, 0.4, 4);
        R.face(tl, c, K.cam, { eyes: "pain", mouth: "scream" });
        // Seu Zé brinca
        R.setPose(tl, "f02z", 0, { shF: -30, elF: -40, shB: 10, elB: -20 });
        R.face(tl, "f02z", 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f02-z-wrap", { opacity: 1 }, K.z0 - 0.5);
        tl.fromTo("#f02-z-wrap", { x: 500 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.z0 - 0.5);
        R.pose(tl, "f02z", K.z0, 0.3, { shF: -120, elF: -10 }, "back.out(2)");
        R.face(tl, c, K.z0, { eyes: "normal", mouth: "flat" });
        // bolha: o Supra segura a bola, o Deltoidão puxa
        R.pop(tl, "#f02-bubble", K.s0 - 0.45, 0.45, 0.3);
        tl.set("#f02s-fray, #f02s-sweat", { opacity: 1 }, K.s0 - 0.45);
        R.setPose(tl, "f02s", 0, { armF: -75, armB: 20 });
        R.setPose(tl, "f02d", 0, { armF: -150, armB: 150 });
        R.face(tl, "f02d", K.s0 - 0.45, { eyes: "happy", mouth: "grin" });
        tl.set("#f02d-shades", { opacity: 1 }, K.s0 - 0.45);
        R.face(tl, "f02s", K.s0 - 0.45, { eyes: "pain", mouth: "frown" });
        tl.fromTo("#f02-d-wrap", { y: 0 }, { y: -18, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.s0);
        tl.fromTo("#f02-s-wrap", { scaleY: 1 }, { scaleY: 0.9, svgOrigin: "1250 640", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.s0);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1440 480", duration: 0.3, ease: "back.in(2)" }, K.s1 + 0.1);
        // rompeu?
        R.drop(tl, "#f02-q", K.romp - 0.5, 0.8, -300);
        R.face(tl, "f02z", K.romp, { eyes: "wide", mouth: "flat" });
        R.face(tl, c, K.romp, { eyes: "wide", mouth: "open" });
        tl.to("#f02-pain", { opacity: 0, duration: 0.3 }, K.inv);
        R.face(tl, c, K.inv, { eyes: "normal", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.musc - 0.1, vol: 0.4 },
        { name: "pop", t: k.prim - 0.1, vol: 0.35 },
        { name: "click", t: k.dobr, vol: 0.4 },
        { name: "impact-bass-2", t: k.terc + 0.3, vol: 0.3 },
        { name: "whoosh", t: k.casa - 0.3, vol: 0.35 },
        { name: "whoosh", t: k.pote - 0.4, vol: 0.35 },
        { name: "glitch-1", t: k.doi, vol: 0.3 },
        { name: "whoosh-short", t: k.z0 - 0.5, vol: 0.4 },
        { name: "whoosh-short", t: k.s0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.romp - 0.1, vol: 0.35 },
      ],
    };
  },
};
