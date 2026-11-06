// F2 — Gancho: Dona Cida desafia o Dr. Pablo; ele treina demais (ladeira, gráfico-foguete); de manhã anda de pinguim; bolha com o Aquiles de capa rasgada
export default {
  speakers: { cida: "f02c", aquiles: "f02a" },
  build(ctx) {
    const { C, human, aquiles, w, lines } = ctx;
    const L1 = lines[1], L2 = lines[2], L3 = lines[3];
    const k = {
      hist: w(0, "história"), cida: w(0, "Cida"), des: w(0, "desafiou"), corr: w(0, "Comecei"), lad: w(0, "ladeira"), dist: w(0, "distância"),
      manha: w(0, "manhã"), ping: w(0, "pinguim"), dor: w(0, "dor"), atras: w(0, "atrás"), esq: w(0, "esquenta"),
      c0: L1.start, c1: L1.end, a0: L2.start, a1: L2.end, p3: L3.start, romp: w(3, "rompeu"), inv: w(3, "investigar"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const tree = (x) => `<g transform="translate(${x},0)"><rect x="-14" y="640" width="28" height="120" fill="#8B5A2B" ${st}/><circle cx="0" cy="610" r="70" fill="#5DB560" ${st}/></g>`;
    const medal = `<g><path d="M-6 -150 L12 -104 L30 -150" fill="none" stroke="${C.pain}" stroke-width="8"/><circle cx="12" cy="-96" r="16" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/><text x="12" y="-90" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="14" fill="${C.ink}">10</text></g>`;
    return {
      k,
      css: `
        #f02-chal { left:120px; top:110px; padding:14px 28px; font-size:44px; }
        #f02-chart { left:1240px; top:110px; width:560px; padding:18px 22px; }
        #f02-chart .t { font-size:30px; text-align:center; }
        #f02-lad { left:1290px; top:560px; padding:12px 24px; font-size:40px; transform: rotate(-4deg); }
        #f02-tag { left:140px; top:120px; padding:14px 26px; font-size:40px; }
        #f02-q { left:0; right:0; top:80px; text-align:center; font-size:80px; }
        #f02-q span { color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- parque -->
      <g id="f02-park">
        <rect width="1920" height="1080" fill="${C.sky}"/>
        <circle cx="260" cy="170" r="60" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
        <g id="f02-scroll">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => tree(200 + i * 520)).join("")}
          <path d="M2400 760 L3400 420 L4400 760 Z" fill="#9CCB7A" ${st}/>
        </g>
        <rect y="760" width="1920" height="320" fill="#9AA3A8"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
        <g id="f02-dash">${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 340}" y="900" width="170" height="14" fill="#fff"/>`).join("")}</g>
      </g>
      <!-- quarto, de manhã -->
      <g id="f02-room" opacity="0">
        <rect width="1920" height="1080" fill="#FCE9C8"/>
        <rect x="1380" y="160" width="300" height="240" rx="12" fill="#BFE6EE" ${st}/>
        <circle id="f02-msun" cx="1530" cy="400" r="54" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
        <rect x="1380" y="160" width="300" height="240" rx="12" fill="none" ${st}/><line x1="1530" y1="160" x2="1530" y2="400" stroke="${C.ink}" stroke-width="7"/>
        <rect x="100" y="620" width="560" height="90" rx="20" fill="#fff" ${st}/><rect x="100" y="700" width="560" height="50" rx="12" fill="#8B5A2B" ${st}/>
        <rect x="120" y="560" width="150" height="70" rx="30" fill="#BFE6EE" ${st}/>
        <rect y="860" width="1920" height="220" fill="#D9B98C"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      </g>
      <!-- Dona Cida com a medalha -->
      <g id="f02-c-wrap" opacity="0"><g transform="translate(330,600) scale(1.3)">${human("f02c", "cida")}${medal}</g></g>
      <!-- Dr. Pablo -->
      <g id="f02-p-wrap"><g transform="translate(1000,600) scale(1.3)">${human("f02p", "pablo")}
        <g id="f02-pain" opacity="0"><circle cx="-6" cy="168" r="26" fill="${C.pain}" opacity="0.4"/><circle cx="-6" cy="168" r="12" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
      </g></g>
      <g id="f02-quack" opacity="0" font-family="Montserrat" font-weight="900" font-size="44" fill="${C.ink}">
        <text id="f02-qk1" x="860" y="560">quack!</text><text id="f02-qk2" x="1150" y="520">quack!</text>
      </g>
      <!-- bolha: Aquiles -->
      <g id="f02-bubble" opacity="0">
        <clipPath id="f02-clip"><circle cx="1460" cy="470" r="300"/></clipPath>
        <circle cx="1460" cy="470" r="312" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
        <g clip-path="url(#f02-clip)">
          <rect x="1150" y="160" width="620" height="620" fill="#FFE4DC"/>
          <path d="M1160 780 L1160 700 Q1460 660 1760 700 L1760 780 Z" fill="${C.bone}" ${st}/>
          <text x="1460" y="760" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="26" fill="${C.ink}">CALCANHAR</text>
          <g id="f02-a-wrap"><g transform="translate(1460,700) scale(1.0)">${aquiles("f02a")}</g></g>
        </g>
        <path d="M1200 680 L1080 780 L1250 730" fill="#fff" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round"/>
      </g>
    </svg>
    <div id="f02-chal" class="abs card title" style="opacity:0">Desafio: 10 km com a Dona Cida</div>
    <div id="f02-chart" class="abs card" style="opacity:0">
      <div class="t label">meus km por semana</div>
      <svg width="516" height="250" viewBox="0 0 516 250">
        <line x1="30" y1="220" x2="500" y2="220" stroke="${C.ink}" stroke-width="5"/><line x1="30" y1="220" x2="30" y2="20" stroke="${C.ink}" stroke-width="5"/>
        <path id="f02-line" d="M40 210 L140 200 L240 170 L340 100 L440 30" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="f02-rocket" transform="translate(440,30)"><path d="M0 -26 Q16 -10 12 14 L-12 14 Q-16 -10 0 -26Z" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M-8 16 L0 34 L8 16Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/><circle cx="0" cy="-4" r="5" fill="${C.blue}"/></g>
      </svg>
    </div>
    <div id="f02-lad" class="abs card title" style="opacity:0">+ ladeira!</div>
    <div id="f02-tag" class="abs card title" style="opacity:0">De manhã: passos de <span style="color:${C.pain}">pinguim</span></div>
    <div id="f02-q" class="abs title" style="opacity:0">O doutor <span>rompeu</span> o tendão?</div>`,
      js: function (tl, K, R) {
        const p = "f02p", c = "f02c";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.3, K.corr);
        // Dona Cida chega com a medalha e desafia
        R.setPose(tl, c, 0, { shF: -40, elF: -60, shB: 10, elB: -20 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f02-c-wrap", { opacity: 1 }, K.cida - 0.3);
        tl.fromTo("#f02-c-wrap", { x: -500 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, K.cida - 0.3);
        R.pose(tl, c, K.des, 0.3, { shF: -150, elF: -10 }, "back.out(2)");
        R.pop(tl, "#f02-chal", K.des, 0.4);
        R.face(tl, p, K.des, { eyes: "wide", mouth: "open" });
        // corrida: Cida sai, cenário rola, gráfico-foguete
        R.fadeOut(tl, "#f02-chal", K.corr - 0.3);
        tl.to("#f02-c-wrap", { x: -700, opacity: 0, duration: 0.4, ease: "power2.in" }, K.corr - 0.3);
        tl.to("#f02-p-wrap", { x: -300, duration: 0.5, ease: "power2.inOut" }, K.corr - 0.3);
        const t0 = K.corr, t1 = K.manha - 0.35;
        tl.to("#f02-scroll", { x: -3200, duration: t1 - t0, ease: "power1.in" }, t0);
        tl.to("#f02-dash", { x: -2380, duration: t1 - t0, ease: "none" }, t0);
        const n = Math.floor((t1 - t0) / 0.34);
        for (let i = 0; i < n; i++) {
          const a = i % 2;
          R.pose(tl, p, t0 + i * 0.34, 0.32, { hipF: a ? 30 : -45, knF: a ? 70 : 20, hipB: a ? -45 : 30, knB: a ? 20 : 70, shF: a ? -50 : 30, shB: a ? 30 : -50, elF: -80, elB: -80, torso: 10 }, "sine.inOut");
        }
        R.face(tl, p, t0, { eyes: "happy", mouth: "grin" });
        R.face(tl, p, K.dist, { eyes: "normal", mouth: "open" });
        R.pop(tl, "#f02-chart", K.corr + 0.3, 0.45);
        R.draw(tl, "#f02-line", K.corr + 0.6, Math.max(0.8, K.dist - K.corr));
        tl.fromTo("#f02-rocket", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.dist);
        tl.to("#f02-rocket", { y: -14, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.dist + 0.2);
        R.pop(tl, "#f02-lad", K.lad - 0.1, 0.4);
        R.fadeOut(tl, "#f02-chart, #f02-lad", K.manha - 0.4);
        // de manhã: quarto, passos de pinguim
        tl.to("#f02-park", { opacity: 0, duration: 0.35 }, K.manha - 0.35);
        tl.to("#f02-room", { opacity: 1, duration: 0.35 }, K.manha - 0.35);
        tl.set("#f02-p-wrap", { x: -500 }, K.manha);
        tl.fromTo("#f02-msun", { y: 80 }, { y: -60, duration: 1.4, ease: "power2.out" }, K.manha - 0.2);
        R.pose(tl, p, K.manha - 0.3, 0.3, { hipF: 0, knF: 0, hipB: 0, knB: 0, shF: 40, elF: -10, shB: -30, elB: -10, torso: 0 });
        R.face(tl, p, K.manha, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f02-tag", K.ping - 0.2, 0.4);
        const pt0 = K.ping - 0.1, steps = Math.max(6, Math.floor((K.esq - pt0) / 0.42));
        for (let i = 0; i < steps; i++) {
          const a = i % 2, t = pt0 + i * 0.42;
          R.pose(tl, p, t, 0.2, { root: a ? 7 : -7, hipF: a ? -8 : 4, hipB: a ? 4 : -8, knF: 0, knB: 0 }, "sine.inOut");
          tl.to("#f02-p-wrap", { x: -500 + (i + 1) * 70, duration: 0.2, ease: "power1.out" }, t);
        }
        tl.set("#f02-quack", { opacity: 1 }, K.ping + 0.1);
        R.pop(tl, "#f02-qk1", K.ping + 0.1, 0.3);
        R.pop(tl, "#f02-qk2", K.ping + 0.9, 0.3);
        R.fadeOut(tl, "#f02-quack", K.dor + 0.6);
        tl.set("#f02-pain", { opacity: 1 }, K.dor);
        tl.fromTo("#f02-pain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 7 }, K.dor);
        R.face(tl, p, K.dor, { eyes: "pain", mouth: "frown" });
        R.pose(tl, p, K.esq, 0.3, { root: 0, hipF: 0, hipB: 0, shF: 10, shB: 10 });
        R.face(tl, p, K.esq, { eyes: "normal", mouth: "smile" });
        tl.to("#f02-pain", { opacity: 0.35, duration: 0.4 }, K.esq);
        R.fadeOut(tl, "#f02-tag", K.c0 - 0.4);
        // Cida provoca de novo, já no parque
        tl.to("#f02-room", { opacity: 0, duration: 0.3 }, K.c0 - 0.4);
        tl.to("#f02-park", { opacity: 1, duration: 0.3 }, K.c0 - 0.4);
        tl.set("#f02-p-wrap", { x: 0 }, K.c0 - 0.3);
        tl.set("#f02-pain", { opacity: 0 }, K.c0 - 0.1);
        tl.to("#f02-c-wrap", { x: 0, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, K.c0 - 0.4);
        R.pose(tl, c, K.c0, 0.3, { shF: -100, elF: -10, shB: 30, elB: -90 }, "back.out(2)");
        R.face(tl, p, K.c0, { eyes: "wide", mouth: "flat" });
        // bolha: Aquiles segurando o calcanhar
        R.pop(tl, "#f02-bubble", K.a0 - 0.45, 0.45, 0.3);
        R.setPose(tl, "f02a", 0, { armF: -20, armB: 20 });
        R.face(tl, "f02a", K.a0 - 0.45, { eyes: "pain", mouth: "frown" });
        tl.set("#f02a-tear", { opacity: 1 }, K.a0 - 0.45);
        tl.to("#f02a-heel path", { fill: "#FF8A80", duration: 0.2 }, K.a0 - 0.2);
        R.pose(tl, "f02a", K.a0, 0.3, { armF: -150, armB: 150 }, "back.out(1.6)");
        R.pose(tl, "f02a", K.a0 + 1.1, 0.3, { armF: -50, armB: 50 });
        R.shake(tl, "#f02-a-wrap", K.a0 + 1.2, Math.max(0.3, K.a1 - K.a0 - 1.2), 4);
        tl.to("#f02-bubble", { scale: 0, opacity: 0, svgOrigin: "1460 470", duration: 0.3, ease: "back.in(2)" }, K.a1 + 0.1);
        // rompeu?
        R.drop(tl, "#f02-q", K.romp - 0.5, 0.8, -300);
        R.face(tl, c, K.romp, { eyes: "wide", mouth: "flat" });
        R.face(tl, p, K.romp, { eyes: "wide", mouth: "open" });
        R.face(tl, p, K.inv, { eyes: "happy", mouth: "grin" });
        R.pose(tl, p, K.inv, 0.3, { shF: -150, elF: -20 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh-short", t: k.cida - 0.3, vol: 0.4 },
        { name: "pop", t: k.des, vol: 0.4 },
        { name: "whoosh", t: k.corr - 0.3, vol: 0.35 },
        { name: "riser", t: k.corr + 0.6, vol: 0.25, dur: 2 },
        { name: "pop", t: k.lad - 0.1, vol: 0.35 },
        { name: "whoosh", t: k.manha - 0.35, vol: 0.35 },
        { name: "click-soft", t: k.ping + 0.1, vol: 0.4 },
        { name: "click-soft", t: k.ping + 0.9, vol: 0.4 },
        { name: "glitch-1", t: k.dor, vol: 0.3 },
        { name: "whoosh-short", t: k.c0 - 0.4, vol: 0.4 },
        { name: "whoosh-short", t: k.a0 - 0.45, vol: 0.45 },
        { name: "impact-bass-1", t: k.romp - 0.1, vol: 0.35 },
      ],
    };
  },
};
