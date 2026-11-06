// F8 — A escadinha do tendão: sadio → sobrecarregado → desgastado → rotura parcial → rotura completa; seta verde de volta do degrau 2 pro 1; rotura parcial é comum e muitas vezes nem dói
export default {
  speakers: {},
  build(ctx) {
    const { C, supra, w } = ctx;
    const k = {
      esc: w(0, "escadinha"), sadio: w(0, "sadio"), sobre: w(0, "sobrecarregado"), dol: w(0, "dolorido"), desg: w(0, "desgastando"),
      parc: w(0, "parcial"), compl: w(0, "completo"), boa: w(0, "boa"), volt: w(0, "voltar"), nem: w(0, "nem"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const names = ["Sadio", "Sobrecarregado", "Desgastado", "Rotura parcial", "Rotura completa"];
    const cols = ["#BDF0DC", "#FFE08A", "#FFC79E", "#FFB3AA", "#FF8A80"];
    const step = (i) => {
      const x = 90 + i * 345, y = 380 + i * 100;
      return `<g id="f08-st${i}" opacity="0"><rect x="${x}" y="${y}" width="345" height="${900 - y}" fill="${cols[i]}" ${st}/>
        <text x="${x + 172}" y="${y + 60}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${i > 2 ? 30 : 34}" fill="${C.ink}">${i + 1}. ${names[i]}</text></g>`;
    };
    const sup = (i) => {
      const x = 90 + i * 345 + 172, y = 380 + i * 100;
      const tear = i === 3 ? `<path d="M${x - 14} ${y - 70} L${x + 4} ${y - 58} L${x - 6} ${y - 46} L${x + 12} ${y - 34}" stroke="${C.pain}" stroke-width="6" fill="none" stroke-linecap="round"/>` : "";
      const split = i === 4 ? `<path d="M${x - 26} ${y - 66} L${x - 6} ${y - 56} L${x - 20} ${y - 44} L${x + 2} ${y - 34} L${x - 12} ${y - 22} L${x + 30} ${y - 22} L${x + 30} ${y - 66} Z" fill="${cols[4]}"/><path d="M${x - 26} ${y - 66} L${x - 6} ${y - 56} L${x - 20} ${y - 44} L${x + 2} ${y - 34} L${x - 12} ${y - 22}" stroke="${C.ink}" stroke-width="5" fill="none"/>` : "";
      return `<g id="f08-s${i}" opacity="0"><g transform="translate(${x},${y}) scale(${i === 1 ? "0.5,0.45" : "0.45"})">${supra("f08s" + i)}</g>${tear}${split}</g>`;
    };
    return {
      k,
      css: `
        #f08-h { left:90px; top:50px; font-size:62px; }
        #f08-h span { color:${C.pain}; }
        #f08-back { left:650px; top:250px; padding:10px 20px; font-size:32px; color:#1E9E73; }
        #f08-foot { left:1080px; top:150px; width:740px; padding:16px 22px; text-align:center; font-size:34px; background:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      ${[0, 1, 2, 3, 4].map(step).join("")}
      ${[0, 1, 2, 3, 4].map(sup).join("")}
      <g id="f08-arrow" opacity="0">
        <path id="f08-arp" d="M610 300 Q460 160 300 230" fill="none" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/>
        <path d="M610 300 Q460 160 300 230" fill="none" stroke="${C.good}" stroke-width="14" stroke-linecap="round"/>
        <path d="M322 196 L280 240 L338 256 Z" fill="${C.good}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f08-h" class="abs title" style="opacity:0">A <span>escadinha</span> do tendão</div>
    <div id="f08-back" class="abs card title" style="opacity:0">com carga certa, dá pra voltar!</div>
    <div id="f08-foot" class="abs card label" style="opacity:0">rotura parcial é <b>comum</b>, e muitas vezes <b style="color:${C.pain}">nem dói</b></div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f08-h", 0.1, 0.5);
        const show = (i, t) => {
          tl.set(`#f08-st${i}`, { opacity: 1 }, t);
          tl.fromTo(`#f08-st${i}`, { y: 300 }, { y: 0, duration: 0.45, ease: "back.out(1.4)" }, t);
          tl.set(`#f08-s${i}`, { opacity: 1 }, t + 0.25);
          tl.fromTo(`#f08-s${i}`, { y: -300 }, { y: 0, duration: 0.45, ease: "bounce.out" }, t + 0.25);
        };
        for (let i = 0; i < 5; i++) R.setPose(tl, `f08s${i}`, 0, { armF: -20, armB: 20 });
        R.face(tl, "f08s0", 0, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f08s1", 0, { eyes: "pain", mouth: "frown" });
        R.face(tl, "f08s2", 0, { eyes: "normal", mouth: "flat" });
        R.face(tl, "f08s3", 0, { eyes: "pain", mouth: "flat" });
        R.face(tl, "f08s4", 0, { eyes: "pain", mouth: "scream" });
        tl.set("#f08s1-sweat", { opacity: 1 }, 0);
        tl.set("#f08s2-fray, #f08s3-fray, #f08s4-fray", { opacity: 1 }, 0);
        show(0, K.sadio - 0.2);
        R.pose(tl, "f08s0", K.sadio + 0.4, 0.3, { armF: -150 }, "back.out(2)");
        show(1, K.sobre - 0.2);
        tl.fromTo("#f08-s1", { scaleX: 1 }, { scaleX: 1.08, svgOrigin: `${90 + 345 + 172} 480`, duration: 0.25, yoyo: true, repeat: 3 }, K.dol);
        show(2, K.desg - 0.2);
        show(3, K.parc - 0.3);
        show(4, K.compl - 0.3);
        R.shake(tl, "#f08s4-root", K.compl + 0.3, 0.4, 4);
        // a boa notícia: volta do degrau 2 pro 1
        tl.set("#f08-arrow", { opacity: 1 }, K.boa);
        R.draw(tl, "#f08-arrow path", K.boa, 0.6);
        R.pop(tl, "#f08-back", K.volt - 0.1, 0.4);
        R.face(tl, "f08s1", K.volt, { eyes: "happy", mouth: "smile" });
        tl.to("#f08s1-sweat", { opacity: 0, duration: 0.3 }, K.volt);
        R.pose(tl, "f08s1", K.volt, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.pop(tl, "#f08-foot", K.nem - 0.6, 0.45);
        R.face(tl, "f08s3", K.nem, { eyes: "happy", mouth: "smile" });
        R.pose(tl, "f08s3", K.nem, 0.3, { armF: -120 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.3 },
        { name: "pop", t: k.sadio - 0.2, vol: 0.3 },
        { name: "pop", t: k.sobre - 0.2, vol: 0.3 },
        { name: "pop", t: k.desg - 0.2, vol: 0.3 },
        { name: "glitch-1", t: k.parc - 0.3, vol: 0.2 },
        { name: "impact-bass-1", t: k.compl - 0.3, vol: 0.3 },
        { name: "sparkle", t: k.boa, vol: 0.3 },
        { name: "pop", t: k.nem - 0.6, vol: 0.3 },
      ],
    };
  },
};
