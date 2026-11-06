// F8 — Como acontece: balança CARGA x CAPACIDADE; itens de carga caem no prato até passar da capacidade; Supra suando; ponteiro no vermelho
export default {
  build(ctx) {
    const { C, supra, w } = ctx;
    const k = {
      carga: w(0, "carga"), cap: w(0, "capacidade"), acima: w(0, "acima"), pint: w(0, "pintar"), nad: w(0, "nadar"), vol: w(0, "vôlei"), acad: w(0, "academia"),
      som: w(0, "Somando"), mang: w(0, "manguito"), fraco: w(0, "fraco"), recl: w(0, "reclama"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const pan = (id, x, label, col) => `<g id="${id}"><line x1="${x - 110}" y1="330" x2="${x}" y2="490" stroke="${C.ink}" stroke-width="4"/><line x1="${x + 110}" y1="330" x2="${x}" y2="490" stroke="${C.ink}" stroke-width="4"/>
      <path d="M${x - 150} 490 L${x + 150} 490 Q${x + 130} 540 ${x} 540 Q${x - 130} 540 ${x - 150} 490 Z" fill="${col}" ${st}/>
      <text x="${x}" y="600" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">${label}</text></g>`;
    const item = (i, x, svg) => `<g id="f08-i${i}" opacity="0"><g transform="translate(${x},450)">${svg}</g></g>`;
    return {
      k,
      css: `
        #f08-h { left:90px; top:50px; font-size:60px; }
        #f08-h span { color:${C.pain}; }
        #root .f08-cap { padding:8px 14px; font-size:24px; }
        #f08-mf { left:1180px; top:640px; padding:10px 20px; font-size:32px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <path d="M960 330 L900 900 L1020 900 Z" fill="#9AA7AD" ${st}/>
      <g id="f08-beam"><rect x="510" y="318" width="900" height="24" rx="10" fill="#B07A4A" ${st}/></g>
      <circle cx="960" cy="330" r="22" fill="${C.sun}" ${st}/>
      <g id="f08-left">${pan("f08-pl", 510, "CARGA", "#FFD3C9")}
        ${item(0, 420, `<rect x="-10" y="-60" width="12" height="80" rx="4" fill="#8B5A2B" ${st}/><rect x="-46" y="-80" width="90" height="28" rx="12" fill="#8FD3C6" ${st}/>`)}
        ${item(1, 500, `<path d="M-40 0 Q-30 -16 -20 0 Q-10 16 0 0 Q10 -16 20 0 Q30 16 40 0" fill="none" stroke="${C.blue}" stroke-width="10"/><circle cx="0" cy="-34" r="16" fill="${C.skinB}" ${st}/>`)}
        ${item(2, 580, `<circle cx="0" cy="-26" r="30" fill="#fff" ${st}/><path d="M-28 -36 Q0 -20 28 -36 M-14 -52 Q-6 -26 -16 2 M14 -52 Q6 -26 16 2" fill="none" stroke="${C.ink}" stroke-width="4"/>`)}
        ${item(3, 500, `<g transform="translate(0,-90)"><path d="M-40 0 L40 0" ${st} stroke-width="10"/><rect x="-50" y="-20" width="16" height="40" rx="5" fill="${C.pain}" ${st}/><rect x="34" y="-20" width="16" height="40" rx="5" fill="${C.pain}" ${st}/></g>`)}
      </g>
      <g id="f08-right">${pan("f08-pr", 1410, "CAPACIDADE", "#CFF5E7")}
        <g transform="translate(1340,450)"><path d="M-30 20 Q-34 -20 -10 -30 Q10 -46 26 -26 Q36 -10 20 6 L20 20 Z" fill="#E0675A" ${st}/></g>
        <g transform="translate(1480,440)"><circle r="28" fill="#FFF3B8" ${st}/><circle cx="12" cy="-8" r="24" fill="#CFF5E7"/></g>
      </g>
      <!-- medidor -->
      <g id="f08-gauge" opacity="0" transform="translate(300,830)">
        <path d="M-150 0 A150 150 0 0 1 -50 -141" fill="none" stroke="${C.good}" stroke-width="34"/>
        <path d="M-50 -141 A150 150 0 0 1 75 -130" fill="none" stroke="${C.sun}" stroke-width="34"/>
        <path d="M75 -130 A150 150 0 0 1 150 0" fill="none" stroke="${C.pain}" stroke-width="34"/>
        <g id="f08-needle"><line x1="0" y1="0" x2="0" y2="-120" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/></g>
        <circle r="16" fill="${C.ink}"/>
      </g>
      <g id="f08-s-wrap"><g transform="translate(1680,900) scale(0.95)">${supra("f08s")}</g></g>
    </svg>
    <div id="f08-h" class="abs title" style="opacity:0">Carga <span>x</span> capacidade</div>
    <div id="f08-mf" class="abs card label" style="opacity:0">+ manguito fraco</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f08-h", 0.1, 0.5);
        R.setPose(tl, "f08s", 0, { armF: -20, armB: 20 });
        R.face(tl, "f08s", 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f08s", 0.3, K.acad);
        tl.fromTo("#f08-beam, #f08-left, #f08-right", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2);
        const tilt = (t, r, d = 0.45) => {
          const dy = 450 * Math.sin((r * Math.PI) / 180);
          tl.to("#f08-beam", { rotation: r, svgOrigin: "960 330", duration: d, ease: "back.out(1.6)" }, t);
          tl.to("#f08-left", { y: -dy, duration: d, ease: "back.out(1.6)" }, t);
          tl.to("#f08-right", { y: dy, duration: d, ease: "back.out(1.6)" }, t);
        };
        tilt(0, 8, 0.01);
        tl.fromTo("#f08-pl", { scale: 1 }, { scale: 1.06, svgOrigin: "510 500", duration: 0.2, yoyo: true, repeat: 1 }, K.carga);
        tl.fromTo("#f08-pr", { scale: 1 }, { scale: 1.06, svgOrigin: "1410 500", duration: 0.2, yoyo: true, repeat: 1 }, K.cap);
        R.fadeIn(tl, "#f08-gauge", K.cap);
        tl.set("#f08-needle", { rotation: -70, svgOrigin: "0 0" }, 0);
        // itens caem no prato da carga
        const ts = [K.pint, K.nad, K.vol, K.acad];
        ts.forEach((t, i) => {
          tl.set(`#f08-i${i}`, { opacity: 1 }, t - 0.1);
          tl.fromTo(`#f08-i${i}`, { y: -400 }, { y: 0, duration: 0.4, ease: "bounce.out" }, t - 0.1);
          tilt(t + 0.15, [3, -2, -6, -10][i]);
          tl.to("#f08-needle", { rotation: [-35, -5, 20, 45][i], svgOrigin: "0 0", duration: 0.4, ease: "back.out(2)" }, t + 0.15);
        });
        R.face(tl, "f08s", K.nad, { eyes: "wide", mouth: "flat" });
        tl.to("#f08s-sweat", { opacity: 1, duration: 0.2 }, K.vol);
        R.face(tl, "f08s", K.acad, { eyes: "pain", mouth: "frown" });
        // manguito fraco
        R.pop(tl, "#f08-mf", K.mang - 0.1, 0.4);
        tilt(K.fraco, -16);
        tl.to("#f08-needle", { rotation: 72, svgOrigin: "0 0", duration: 0.4, ease: "back.out(2)" }, K.fraco);
        tl.to("#f08-needle", { rotation: 66, svgOrigin: "0 0", duration: 0.1, yoyo: true, repeat: 7 }, K.fraco + 0.4);
        R.face(tl, "f08s", K.recl, { eyes: "pain", mouth: "scream" });
        R.pose(tl, "f08s", K.recl, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.shake(tl, "#f08s-root", K.recl + 0.2, 0.6, 5);
        tl.to("#f08s-fray", { opacity: 1, duration: 0.2 }, K.recl);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.3 },
        { name: "pop", t: k.carga, vol: 0.3 },
        { name: "pop", t: k.cap, vol: 0.3 },
        ...[k.pint, k.nad, k.vol, k.acad].map((t) => ({ name: "click", t: t + 0.15, vol: 0.35 })),
        { name: "pop", t: k.mang - 0.1, vol: 0.35 },
        { name: "error", t: k.fraco, vol: 0.3 },
        { name: "glitch-1", t: k.recl, vol: 0.25 },
      ],
    };
  },
};
