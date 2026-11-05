// F29 — Aviso educativo + inscreva-se, sininho e comentário
export default {
  speakers: { pablo: "f29p", vertebra: "f29v" },
  gaps: [0.3],
  extra: 0.6,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      lem: w(0, "Lembrando"), edu: w(0, "educativo"), insc: w(0, "inscreve"), sin: w(0, "sininho"), com: w(0, "comenta"), prox: w(0, "próximo"),
      v0: lines[1].start, v1: lines[1].end,
    };
    const sfx = [
      { name: "whoosh", t: k.lem, vol: 0.35 },
      { name: "click", t: k.insc + 0.45, vol: 0.6 },
      { name: "notification", t: k.sin, vol: 0.4 },
      { name: "pop", t: k.com, vol: 0.4 },
      { name: "pop", t: k.v0, vol: 0.4 },
    ];
    return {
      k,
      sfx,
      css: `
        #f29-ban { left:160px; right:160px; top:60px; padding:20px 30px; text-align:center; font-size:38px; background:${C.sun}; }
        #f29-ban b { color:${C.ink}; }
        #f29-bal { left:1210px; top:560px; width:400px; padding:20px 26px; font-size:40px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f29-pw"><g transform="translate(560,667) scale(1.1)">${human("f29p", "pablo")}</g></g>
      <g id="f29-vw"><g transform="translate(1720,882) scale(0.85)">${vertebra("f29v")}</g></g>
      <g id="f29-bell" opacity="0" transform="translate(1530,440)"><g id="f29-bell-in">
        <path d="M-46 30 Q-40 22 -40 -6 Q-40 -50 0 -54 Q40 -50 40 -6 Q40 22 46 30 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="0" cy="40" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/><circle cx="0" cy="-58" r="7" fill="${C.ink}"/></g>
        <g id="f29-waves" opacity="0"><path d="M-66 -30 Q-80 0 -66 30 M66 -30 Q80 0 66 30" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>
      </g>
      <g id="f29-cur" opacity="0" transform="translate(1300,560)"><g id="f29-cur-in"><path d="M0 0 L0 64 L16 48 L28 74 L40 68 L28 44 L50 44 Z" fill="#fff" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g></g>
      <g id="f29-cm" opacity="0" transform="translate(1530,620)"><path d="M-50 -36 L50 -36 Q60 -36 60 -26 L60 20 Q60 30 50 30 L-10 30 L-34 52 L-30 30 L-50 30 Q-60 30 -60 20 L-60 -26 Q-60 -36 -50 -36 Z" fill="#fff" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-34 -12 L34 -12 M-34 8 L14 8" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>
    </svg>
    <div id="f29-ban" class="abs card label" style="opacity:0"><b>Conteúdo educativo.</b> Não substitui avaliação individual com um profissional de saúde.</div>
    <div id="f29-btnw" class="abs" style="left:0;top:0;opacity:0">
      <div id="f29-btn-on" class="abs title f29b" style="left:960px;top:380px;width:440px;height:120px;border-radius:24px;border:7px solid ${C.ink};box-shadow:8px 8px 0 ${C.ink};display:flex;align-items:center;justify-content:center;font-size:52px;color:#fff;background:${C.pain}">INSCREVA-SE</div>
      <div id="f29-btn-off" class="abs title f29b" style="left:960px;top:380px;width:440px;height:120px;border-radius:24px;border:7px solid ${C.ink};box-shadow:8px 8px 0 ${C.ink};display:flex;align-items:center;justify-content:center;font-size:52px;color:#fff;background:${C.grey};opacity:0">INSCRITO</div>
    </div>
    <div id="f29-bal" class="abs card label" style="opacity:0">Hérnia de disco!</div>`,
      js: function (tl, K, R) {
        const p = "f29p", v = "f29v";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.blinks(tl, v, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        tl.fromTo("#f29-pw", { x: -500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        tl.set("#f29-vw", { opacity: 0 }, 0);
        // aviso
        R.drop(tl, "#f29-ban", K.lem - 0.1, 0.7, -250);
        R.pose(tl, p, K.lem, 0.4, { shF: -105, elF: -45 }, "back.out(1.6)");
        R.pose(tl, p, K.edu + 0.8, 0.4, { shF: -10, elF: -20 });
        // botão INSCREVA-SE: o cursor clica
        R.pop(tl, "#f29-btnw", K.insc - 0.5, 0.4);
        R.pose(tl, p, K.insc - 0.4, 0.35, { shF: -95, elF: -5 }, "back.out(1.6)");
        tl.set("#f29-cur", { opacity: 1 }, K.insc - 0.2);
        tl.fromTo("#f29-cur-in", { x: 260, y: 200 }, { x: -60, y: -110, duration: 0.6, ease: "power2.inOut" }, K.insc - 0.2);
        tl.to("#f29-cur-in", { scale: 0.85, transformOrigin: "0px 0px", duration: 0.08, yoyo: true, repeat: 1 }, K.insc + 0.42);
        tl.to("#f29-btn-on", { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, K.insc + 0.42);
        tl.set("#f29-btn-on", { opacity: 0 }, K.insc + 0.5);
        tl.set("#f29-btn-off", { opacity: 1 }, K.insc + 0.5);
        R.face(tl, p, K.insc + 0.5, { eyes: "happy" });
        // sininho
        R.pop(tl, "#f29-bell", K.sin - 0.25, 0.4);
        tl.fromTo("#f29-bell-in", { rotation: -18, svgOrigin: "0 -58" }, { rotation: 18, svgOrigin: "0 -58", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.sin);
        tl.to("#f29-bell-in", { rotation: 0, svgOrigin: "0 -58", duration: 0.1 }, K.sin + 0.96);
        tl.fromTo("#f29-waves", { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 }, K.sin);
        R.fadeOut(tl, "#f29-cur", K.sin, 0.2);
        // comentário
        R.pop(tl, "#f29-cm", K.com - 0.1, 0.4);
        R.pose(tl, p, K.com, 0.4, { shF: -40, elF: -60 });
        // Vértebra vota
        tl.fromTo("#f29-vw", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.prox);
        R.fadeOut(tl, "#f29-cm", K.v0 - 0.3);
        R.pose(tl, v, K.v0, 0.3, { armF: -160, armB: 20 }, "back.out(2)");
        R.face(tl, v, K.v0, { eyes: "happy" });
        R.pop(tl, "#f29-bal", K.v0 + 0.1, 0.4);
        R.squash(tl, "#f29v-root", K.v0);
        R.face(tl, p, K.v1, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
