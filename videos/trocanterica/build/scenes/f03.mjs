// F3 — Título BURSITE TROCANTÉRICA → carimbo "ou melhor: SÍNDROME DOLOROSA DO TROCÂNTER MAIOR"; Vértebra com dicionário e "plot twist"
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      ass: w(0, "assunto"), fam: w(0, "famosa"), seg: w(0, "segredo"), chama: w(0, "chama"), sind: w(0, "síndrome"),
      maio: w(0, "maioria"), bursa: w(0, "bursa"), culp: w(0, "culpada"),
      v0: lines[1].start, v1: lines[1].end, nome: w(1, "Nome"), plot: w(1, "plot"),
    };
    const t1 = "BURSITE", t2 = "TROCANTÉRICA";
    const letters = (s, off) => s.split("").map((c, i) => `<span class="c" id="f03-c${off + i}">${c}</span>`).join("");
    return {
      k,
      css: `
        #f03-title { left:100px; top:120px; font-size:118px; line-height:1.0; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-strike { left:96px; top:168px; width:560px; height:18px; background:${C.pain}; border-radius:9px; transform-origin:0 50%; }
        #f03-stamp { left:110px; top:400px; width:820px; padding:18px 28px; font-size:44px; line-height:1.15; color:${C.pain}; background:#fff; border:7px solid ${C.pain}; border-radius:20px; transform: rotate(-3deg); }
        #f03-stamp small { display:block; font-size:30px; color:${C.ink}; }
        #f03-secret { left:120px; top:640px; padding:12px 24px; font-size:36px; }
        #f03-culp { left:120px; top:640px; padding:12px 24px; font-size:36px; color:${C.ink}; }
        #f03-culp b { color:${C.pain}; }
        #f03-twist { left:1060px; top:200px; padding:14px 28px; font-size:52px; color:#fff; background:#8E6CD8; border:7px solid ${C.ink}; border-radius:22px; box-shadow:8px 8px 0 ${C.ink}; transform: rotate(4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1500" cy="520" r="350" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap"><g transform="translate(1620,650) scale(-1.3,1.3)">${human("f03p", "pablo")}</g></g>
      <g id="f03-v-wrap"><g transform="translate(1180,880) scale(1.0)">${vertebra("f03v")}</g></g>
      <g id="f03-dict" opacity="0"><g transform="translate(1260,730)"><g id="f03-dict-in">
        <rect x="-70" y="-50" width="140" height="100" rx="10" fill="${C.pain}" stroke="${C.ink}" stroke-width="7"/>
        <rect x="-58" y="-40" width="116" height="80" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
        <line x1="0" y1="-40" x2="0" y2="40" stroke="${C.ink}" stroke-width="4"/>
        <path d="M-48 -22 L-10 -22 M-48 -8 L-14 -8 M-48 6 L-10 6 M10 -22 L48 -22 M10 -8 L44 -8 M10 6 L48 6" stroke="${C.ink}" stroke-width="3"/>
        <text x="0" y="-60" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">DICIONÁRIO</text>
      </g></g></g>
    </svg>
    <div id="f03-title" class="abs title"><div>${letters(t1, 0)}</div><div>${letters(t2, t1.length)}</div></div>
    <div id="f03-strike" class="abs" style="opacity:0"></div>
    <div id="f03-secret" class="abs card title" style="opacity:0">SEGREDO: nome novo!</div>
    <div id="f03-stamp" class="abs title" style="opacity:0"><small>ou melhor:</small>SÍNDROME DOLOROSA DO TROCÂNTER MAIOR</div>
    <div id="f03-culp" class="abs card label" style="opacity:0">A bursa? Quase nunca é a <b>principal culpada</b>.</div>
    <div id="f03-twist" class="abs title" style="opacity:0">PLOT TWIST!</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.035 }, 0);
        const p = "f03p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10, hipF: 0, hipB: 0, knF: 0, knB: 0 });
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        for (let i = 0; i < 4; i++) R.pose(tl, p, 0.1 + i * 0.2, 0.2, { hipF: i % 2 ? 25 : -25, hipB: i % 2 ? -25 : 25, knF: i % 2 ? 0 : 20, knB: i % 2 ? 20 : 0 }, "sine.inOut");
        R.pose(tl, p, 0.9, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0.5, K.dur);
        R.idle(tl, p, 1.0, K.dur, 1.5);
        R.pose(tl, p, K.ass - 0.2, 0.3, { shF: -115, elF: -25 }, "back.out(2)");
        // segredo
        R.pop(tl, "#f03-secret", K.seg - 0.1, 0.4);
        R.pose(tl, p, K.seg, 0.3, { shF: -150, elF: -120, neck: 10 }, "back.out(2)");
        R.face(tl, p, K.seg, { eyes: "happy" });
        // carimbo com o nome novo
        R.fadeOut(tl, "#f03-secret", K.sind - 0.3);
        tl.set("#f03-strike", { opacity: 1 }, K.chama);
        tl.fromTo("#f03-strike", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out" }, K.chama);
        tl.to("#f03-title", { opacity: 0.45, duration: 0.3 }, K.chama + 0.2);
        tl.fromTo("#f03-stamp", { scale: 2.2, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in" }, K.sind - 0.1);
        R.shake(tl, "#f03-stamp", K.sind + 0.2, 0.25, 5);
        R.face(tl, p, K.sind, { eyes: "normal" });
        R.gesture(tl, p, K.sind + 0.4, K.bursa - 0.3, 5);
        // a bursa nem é a culpada
        R.pop(tl, "#f03-culp", K.bursa - 0.1, 0.4);
        R.pose(tl, p, K.culp - 0.2, 0.3, { shF: -60, elF: -10 }, "back.out(2)");
        // Vértebra com dicionário
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.6);
        R.face(tl, v, K.v0 - 0.6, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f03-dict", K.v0 - 0.3, 0.4);
        R.pose(tl, v, K.v0 - 0.3, 0.3, { armF: -110, armB: 40 }, "back.out(2)");
        tl.to("#f03-dict-in", { y: -14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.nome);
        R.face(tl, v, K.nome + 0.4, { eyes: "wide" });
        R.pop(tl, "#f03-twist", K.plot - 0.1, 0.4);
        R.shake(tl, "#f03-twist", K.plot + 0.3, 0.3, 6);
        R.face(tl, v, K.plot, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, K.plot, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, p, K.v0, { eyes: "happy" });
        tl.to("#f03-title, #f03-strike, #f03-stamp, #f03-culp, #f03-twist", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: 0.5, vol: 0.2 },
        { name: "pop", t: k.seg - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.chama, vol: 0.35 },
        { name: "impact-bass-1", t: k.sind + 0.15, vol: 0.45 },
        { name: "pop", t: k.bursa - 0.1, vol: 0.35 },
        { name: "pop", t: k.v0 - 0.3, vol: 0.35 },
        { name: "sparkle", t: k.plot - 0.1, vol: 0.4 },
      ],
    };
  },
};
