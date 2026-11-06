// F25 — Vai melhorar? Barra 6–12 semanas, dedos da Dona Gansa voltando ao laranja, Bursinha murchando; Seu Zé sobe a escada com as sacolas
export default {
  speakers: { ze: "f25z" },
  extra: 0.6,
  build(ctx) {
    const { C, human, gansa, bursinha, w, lines } = ctx;
    const k = {
      boa: w(0, "boa"), seis: w(0, "seis"), cons: w(0, "conservador"), art: w(0, "artrose"), mais: w(0, "mais"), joelho: w(0, "joelho"), dif: w(0, "diferença"),
      z0: lines[1].start, z1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const bag = (x, y, c) => `<g transform="translate(${x},${y})"><path d="M-34 0 L34 0 L28 70 L-28 70 Z" fill="${c}" ${st}/><path d="M-16 0 Q-16 -24 0 -24 Q16 -24 16 0" fill="none" stroke="${C.ink}" stroke-width="6"/></g>`;
    return {
      k,
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "sparkle", t: k.seis + 0.6, vol: 0.4 },
        { name: "pop", t: k.art, vol: 0.35 },
        { name: "whoosh", t: k.z0 - 0.7, vol: 0.4 },
        { name: "pop", t: k.z0 + 0.2, vol: 0.4 },
      ],
      css: `
        #f25-head { left:110px; top:80px; font-size:80px; }
        #f25-head span { color:${C.good}; }
        #f25-bar { left:110px; top:230px; width:760px; height:56px; border:7px solid ${C.ink}; border-radius:30px; background:#fff; overflow:hidden; }
        #f25-fill { position:absolute; left:0; top:0; bottom:0; width:100%; background:${C.good}; transform-origin:0% 50%; }
        #f25-bl { left:110px; top:300px; font-size:36px; }
        #f25-bl b { color:#1E9C72; }
        #f25-cons { left:110px; top:370px; padding:12px 22px; font-size:30px; }
        #f25-art { left:110px; top:470px; width:600px; padding:16px 24px; font-size:32px; background:${C.sun}; transform: rotate(-2deg); }
        #f25-all { left:110px; top:610px; padding:12px 22px; font-size:30px; }
        #f25-z-bal { left:120px; top:280px; padding:14px 24px; font-size:38px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f25-pane">
        <circle cx="1440" cy="600" r="300" fill="${C.wall}"/>
        <g transform="translate(1660,870) scale(0.7)">${bursinha("f25b")}</g>
        <g transform="translate(1380,870) scale(1.15)">${gansa("f25g")}</g>
      </g>
      <g id="f25-house" opacity="0">
        <rect width="1920" height="880" fill="${C.wall}"/>
        <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${760 + i * 140}" y="${800 - i * 80}" width="${1160 - i * 140}" height="80" fill="#C99A62" ${st}/>`).join("")}
        <rect x="120" y="440" width="220" height="440" rx="10" fill="#B07A4A" ${st}/><circle cx="310" cy="660" r="10" fill="${C.sun}"/>
        <g id="f25-zw"><g transform="translate(560,680) scale(1.1)">${human("f25z", "ze")}</g>${bag(630, 690, "#3DD9A4")}${bag(510, 700, "#FFC94A")}</g>
      </g>
    </svg>
    <div id="f25-head" class="abs title">VAI <span>MELHORAR?</span></div>
    <div id="f25-bar" class="abs"><div id="f25-fill"></div></div>
    <div id="f25-bl" class="abs label" style="opacity:0">a maioria melhora em <b>6 a 12 semanas</b></div>
    <div id="f25-cons" class="abs card label" style="opacity:0">com tratamento conservador</div>
    <div id="f25-art" class="abs card label" style="opacity:0">Com <b>artrose</b> junto, pode levar mais tempo</div>
    <div id="f25-all" class="abs card label" style="opacity:0">cuidar do <b style="color:#1E9C72">joelho como um todo</b> faz diferença</div>
    <div id="f25-z-bal" class="abs card title" style="opacity:0">Sobe sacola, sobe neto, <span style="color:${C.good}">sobe tudo!</span></div>`,
      js: function (tl, K, R) {
        R.slideIn(tl, "#f25-head", 0.05, 0.5, -300);
        R.fadeIn(tl, "#f25-bar", 0.3, 0.3);
        tl.fromTo("#f25-fill", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, K.seis - 0.2);
        R.rise(tl, "#f25-bl", K.seis, 0.4);
        R.pop(tl, "#f25-cons", K.cons - 0.1, 0.4);
        // Dona Gansa: dedos vermelhos voltam ao laranja; Bursinha murcha aliviada
        tl.set("#f25g-toe0, #f25g-toe1, #f25g-toe2", { fill: "#FF5A4E" }, 0);
        R.face(tl, "f25g", 0, { eyes: "pain", mouth: "frown" });
        R.face(tl, "f25b", 0, { eyes: "pain", mouth: "frown" });
        tl.set("#f25b-body", { scale: 1.25, transformOrigin: "50% 100%" }, 0);
        tl.to("#f25g-toe0, #f25g-toe1, #f25g-toe2", { fill: "#FF9F1C", duration: 1.0, stagger: 0.3 }, K.seis + 0.3);
        tl.to("#f25b-body", { scale: 1, duration: 1.2, ease: "power2.out" }, K.seis + 0.5);
        R.face(tl, "f25g", K.seis + 1.3, { eyes: "happy", mouth: "smile" });
        R.face(tl, "f25b", K.seis + 1.5, { eyes: "closed", mouth: "smile" });
        R.setPose(tl, "f25g", 0, { armF: 0, armB: 0 });
        R.pose(tl, "f25g", K.cons, 0.3, { armF: -70, armB: 70 }, "back.out(2)");
        R.blinks(tl, "f25g", K.cons + 0.5, K.z0 - 0.7, "happy");
        // artrose: mais tempo
        R.pop(tl, "#f25-art", K.art - 0.1, 0.4);
        R.pop(tl, "#f25-all", K.joelho - 0.1, 0.4);
        // Seu Zé sobe a escada feliz
        tl.to("#f25-pane, #f25-head, #f25-bar, #f25-bl, #f25-cons, #f25-art, #f25-all", { opacity: 0, duration: 0.3 }, K.z0 - 0.7);
        tl.to("#f25-house", { opacity: 1, duration: 0.3 }, K.z0 - 0.7);
        const z = "f25z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        for (let i = 0; i < 3; i++) {
          const t = K.z0 - 0.4 + i * 0.65;
          R.pose(tl, z, t, 0.25, { hipF: -60, knF: 70 }, "power2.out");
          tl.to("#f25-zw", { x: 140 * (i + 1) + 160, y: -80 * (i + 1), duration: 0.4, ease: "power2.inOut" }, t + 0.15);
          R.pose(tl, z, t + 0.4, 0.25, { hipF: 0, knF: 0 });
        }
        R.pop(tl, "#f25-z-bal", K.z0 + 0.2, 0.4);
      },
    };
  },
};
