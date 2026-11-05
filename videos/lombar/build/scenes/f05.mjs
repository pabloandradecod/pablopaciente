// F5 — A dor mais comum do mundo: faixa lombar nas costas, troféu, 8 em cada 10, afastamento do trabalho
export default {
  speakers: { vertebra: "f05v" },
  build(ctx) {
    const { C, vertebra, w, lines } = ctx;
    const k = {
      baixo: w(0, "baixo"), cost: w(0, "costelas"), bum: w(0, "bumbum"), camp: w(0, "campeã"), oito: w(0, "oito"), dez: w(0, "dez"),
      crise: w(0, "crise"), afas: w(0, "afastamento"), mundo: w(0, "mundo"),
      v0: lines[1].start, v1: lines[1].end, soz: w(1, "sozinho"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const person = (i) => {
      const x = 800 + (i % 5) * 140, y = 360 + Math.floor(i / 5) * 190;
      return `<g id="f05-pp${i}"><g transform="translate(${x},${y})">
        <circle cx="0" cy="-60" r="28" fill="${C.skinB}" ${st} stroke-width="5"/>
        <path d="M-32 70 L-32 0 Q-32 -28 0 -28 Q32 -28 32 0 L32 70 Z" fill="#B9C7CC" stroke="${C.ink}" stroke-width="5"/>
        <g id="f05-pr${i}" opacity="0"><path d="M-32 70 L-32 0 Q-32 -28 0 -28 Q32 -28 32 0 L32 70 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><circle cx="22" cy="40" r="10" fill="${C.skinB}" stroke="${C.ink}" stroke-width="4"/><path d="M-10 -66 L-2 -60 L-10 -54 M10 -66 L2 -60 L10 -54" stroke="${C.ink}" stroke-width="4" fill="none"/></g>
        <g id="f05-pn${i}"><circle cx="-9" cy="-63" r="4" fill="${C.ink}"/><circle cx="9" cy="-63" r="4" fill="${C.ink}"/></g>
      </g></g>`;
    };
    return {
      k,
      css: `
        #f05-ttl { left:100px; top:60px; font-size:60px; }
        #f05-ttl span { color:${C.pain}; }
        #f05-cnt { left:790px; top:200px; font-size:58px; }
        #f05-cnt span { color:${C.pain}; }
        #f05-afas { left:780px; top:730px; width:720px; padding:18px 26px; font-size:34px; display:flex; align-items:center; gap:20px; }
        #f05-cost, #f05-bum { font-size:30px; padding:8px 16px; }
        #f05-cost { left:520px; top:300px; } #f05-bum { left:520px; top:640px; }
        #f05-lomb { left:110px; top:470px; font-size:34px; padding:8px 18px; color:#fff; background:${C.pain}; border-color:${C.ink}; }
        #f05-sozi { left:1520px; top:430px; padding:12px 20px; font-size:30px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- costas do Seu Zé (vista de trás) -->
      <g id="f05-back">
        <circle cx="360" cy="230" r="62" fill="${C.skinB}" ${st}/>
        <path d="M300 200 Q300 170 330 175 M420 200 Q420 170 390 175" stroke="${C.grey}" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M230 310 Q360 280 490 310 L500 560 Q500 600 470 610 L250 610 Q220 600 220 560 Z" fill="${C.blue}" ${st}/>
        <path d="M215 330 L165 520 M505 330 L555 520" fill="none" stroke="${C.ink}" stroke-width="54" stroke-linecap="round"/>
        <path d="M215 330 L165 520 M505 330 L555 520" fill="none" stroke="${C.blue}" stroke-width="40" stroke-linecap="round"/>
        <path d="M245 610 Q250 720 360 730 Q470 720 475 610 Z" fill="${C.brown}" ${st}/>
        <path d="M360 640 L360 728" stroke="${C.ink}" stroke-width="5"/>
        ${[330, 360, 390, 420, 450, 480, 510, 540, 570].map((y) => `<circle cx="360" cy="${y}" r="7" fill="${C.ink}" opacity="0.35"/>`).join("")}
        <g id="f05-ribs" opacity="0"><path d="M260 420 Q300 450 350 440 M460 420 Q420 450 370 440" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
        <g id="f05-band" opacity="0"><rect x="226" y="452" width="268" height="150" rx="30" fill="${C.pain}" opacity="0.55"/><rect x="226" y="452" width="268" height="150" rx="30" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="14 10"/></g>
      </g>
      <line id="f05-lc" x1="490" y1="320" x2="440" y2="440" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 6" opacity="0"/>
      <line id="f05-lb" x1="510" y1="660" x2="450" y2="640" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 6" opacity="0"/>
      <!-- troféu irônico -->
      <g id="f05-tro" opacity="0"><g transform="translate(1660,250)"><path d="M-70 -120 L70 -120 L58 -30 Q0 20 -58 -30 Z" fill="${C.sun}" ${st}/><path d="M-70 -108 Q-120 -96 -90 -54 Q-80 -44 -62 -48 M70 -108 Q120 -96 90 -54 Q80 -44 62 -48" fill="none" stroke="${C.ink}" stroke-width="8"/><rect x="-14" y="-8" width="28" height="44" fill="${C.sun}" ${st}/><rect x="-60" y="34" width="120" height="34" rx="6" fill="${C.ink}"/><text x="0" y="58" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="20" fill="#fff">CAMPEÃ</text><text x="0" y="-62" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">#1</text></g></g>
      ${Array.from({ length: 10 }, (_, i) => person(i)).join("")}
      <g id="f05-v-wrap"><g transform="translate(1660,880) scale(0.95)">${vertebra("f05v")}</g></g>
    </svg>
    <div id="f05-ttl" class="abs title">A dor mais <span>comum</span> do mundo</div>
    <div id="f05-cost" class="abs card label" style="opacity:0">costelas</div>
    <div id="f05-bum" class="abs card label" style="opacity:0">bumbum</div>
    <div id="f05-lomb" class="abs card label" style="opacity:0">REGIÃO LOMBAR</div>
    <div id="f05-cnt" class="abs title" style="opacity:0"><span>8</span> em cada <span>10</span> pessoas</div>
    <div id="f05-afas" class="abs card label" style="opacity:0">
      <svg width="90" height="90" viewBox="-45 -45 90 90"><circle r="40" fill="${C.sky}" stroke="${C.ink}" stroke-width="5"/><path d="M-30 -10 Q-10 -30 10 -16 Q20 0 0 10 Q-20 20 -30 -10Z M8 18 Q24 10 30 22 Q20 34 8 18Z" fill="${C.good}" stroke="${C.ink}" stroke-width="3"/></svg>
      <div>Uma das principais causas de <b style="color:${C.pain}">afastamento do trabalho</b> no mundo</div>
    </div>
    <div id="f05-sozi" class="abs card label" style="opacity:0">você não tá sozinho!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f05-ttl", 0.1, 0.5);
        tl.fromTo("#f05-back", { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, 0.2);
        // região: entre as costelas e o bumbum
        R.fadeIn(tl, "#f05-ribs", K.cost - 0.1, 0.3);
        R.pop(tl, "#f05-cost", K.cost - 0.1, 0.35);
        tl.set("#f05-lc", { opacity: 1 }, K.cost);
        R.draw(tl, "#f05-lc", K.cost, 0.3);
        R.pop(tl, "#f05-bum", K.bum - 0.1, 0.35);
        tl.set("#f05-lb", { opacity: 1 }, K.bum);
        R.draw(tl, "#f05-lb", K.bum, 0.3);
        tl.set("#f05-band", { opacity: 1 }, K.bum + 0.3);
        tl.fromTo("#f05-band", { scaleY: 0, svgOrigin: "360 527" }, { scaleY: 1, svgOrigin: "360 527", duration: 0.4, ease: "back.out(2)" }, K.bum + 0.3);
        tl.to("#f05-band", { opacity: 0.6, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.bum + 0.8);
        R.pop(tl, "#f05-lomb", K.bum + 0.5, 0.4);
        // campeã
        R.pop(tl, "#f05-tro", K.camp - 0.1, 0.5);
        tl.to("#f05-tro", { rotation: 8, svgOrigin: "1660 250", duration: 0.2, yoyo: true, repeat: 3 }, K.camp + 0.5);
        // 10 pessoas, 8 com dor
        for (let i = 0; i < 10; i++) R.pop(tl, `#f05-pp${i}`, K.camp + 0.4 + i * 0.06, 0.3);
        R.rise(tl, "#f05-cnt", K.oito - 0.1, 0.4);
        for (let i = 0; i < 8; i++) {
          const t = K.oito + 0.3 + i * 0.12;
          tl.set(`#f05-pr${i}`, { opacity: 1 }, t);
          tl.set(`#f05-pn${i}`, { opacity: 0 }, t);
          R.shake(tl, `#f05-pp${i}`, t, 0.2, 3);
        }
        // afastamento
        R.pop(tl, "#f05-afas", K.afas - 0.2, 0.45);
        // Vértebra: você não tá sozinho
        tl.fromTo("#f05-v-wrap", { y: 420 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.v0 - 0.5);
        R.face(tl, "f05v", K.v0 - 0.5, { eyes: "happy" });
        R.pose(tl, "f05v", K.v0, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.pop(tl, "#f05-sozi", K.soz - 0.2, 0.4);
        for (let i = 0; i < 10; i++) tl.to(`#f05-pp${i}`, { y: -14, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, K.soz + i * 0.04);
      },
      sfx: [
        { name: "whoosh", t: 0.2, vol: 0.4 },
        { name: "pop", t: k.cost - 0.1, vol: 0.35 },
        { name: "pop", t: k.bum - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.camp - 0.1, vol: 0.4 },
        { name: "pop", t: k.oito, vol: 0.35 },
        { name: "pop", t: k.afas - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.v0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
