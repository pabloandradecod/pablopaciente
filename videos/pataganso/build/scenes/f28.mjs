// F28 — Aviso educativo + inscreva-se, sininho e comentário; Vértebra: manda pro tio das dez sacolas
export default {
  speakers: { pablo: "f28p", vertebra: "f28v" },
  gaps: [0.3],
  extra: 0.6,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      lem: w(0, "Lembrando"), edu: w(0, "educativo"), insc: w(0, "inscreve"), sin: w(0, "sininho"), com: w(0, "comenta"), prox: w(0, "próximo"),
      v0: lines[1].start, v1: lines[1].end, desc: w(1, "manda"), tia: w(1, "tio"), nao: w(1, "sacolas"),
    };
    const sfx = [
      { name: "whoosh", t: k.lem, vol: 0.35 },
      { name: "click", t: k.insc + 0.45, vol: 0.6 },
      { name: "notification", t: k.sin, vol: 0.4 },
      { name: "pop", t: k.com, vol: 0.4 },
      { name: "pop", t: k.v0, vol: 0.4 },
      { name: "pop", t: k.v0 + (k.v1 - k.v0) / 3, vol: 0.35 },
      { name: "pop", t: k.v0 + (2 * (k.v1 - k.v0)) / 3, vol: 0.35 },
    ];
    return {
      k,
      sfx,
      css: `
        #f28-ban { left:160px; right:160px; top:60px; padding:20px 30px; text-align:center; font-size:38px; background:${C.sun}; }
        #f28-ban b { color:${C.ink}; }
        #f28-bal { left:1100px; top:520px; width:500px; padding:20px 26px; font-size:40px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="880" fill="${C.cream}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f28-pw"><g transform="translate(560,667) scale(1.1)">${human("f28p", "pablo")}</g></g>
      <g id="f28-vw"><g transform="translate(1720,882) scale(0.85)">${vertebra("f28v")}</g></g>
      <g id="f28-bell" opacity="0" transform="translate(1530,440)"><g id="f28-bell-in">
        <path d="M-46 30 Q-40 22 -40 -6 Q-40 -50 0 -54 Q40 -50 40 -6 Q40 22 46 30 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="0" cy="40" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/><circle cx="0" cy="-58" r="7" fill="${C.ink}"/></g>
        <g id="f28-waves" opacity="0"><path d="M-66 -30 Q-80 0 -66 30 M66 -30 Q80 0 66 30" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>
      </g>
      <g id="f28-cur" opacity="0" transform="translate(1300,560)"><g id="f28-cur-in"><path d="M0 0 L0 64 L16 48 L28 74 L40 68 L28 44 L50 44 Z" fill="#fff" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g></g>
      <g id="f28-pil" opacity="0"><g transform="translate(990,820)"><g transform="translate(-70,0)"><path d="M-30 0 L30 0 L25 60 L-25 60 Z" fill="#3DD9A4" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-14 0 Q-14 -20 0 -20 Q14 -20 14 0" fill="none" stroke="${C.ink}" stroke-width="5"/></g><g transform="translate(0,0)"><path d="M-30 0 L30 0 L25 60 L-25 60 Z" fill="#FFC94A" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-14 0 Q-14 -20 0 -20 Q14 -20 14 0" fill="none" stroke="${C.ink}" stroke-width="5"/></g><g transform="translate(70,0)"><path d="M-30 0 L30 0 L25 60 L-25 60 Z" fill="#FF8A3D" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-14 0 Q-14 -20 0 -20 Q14 -20 14 0" fill="none" stroke="${C.ink}" stroke-width="5"/></g><g transform="translate(-35,-62)"><path d="M-30 0 L30 0 L25 60 L-25 60 Z" fill="#B07ED8" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-14 0 Q-14 -20 0 -20 Q14 -20 14 0" fill="none" stroke="${C.ink}" stroke-width="5"/></g><g transform="translate(35,-62)"><path d="M-30 0 L30 0 L25 60 L-25 60 Z" fill="#7FB3D5" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-14 0 Q-14 -20 0 -20 Q14 -20 14 0" fill="none" stroke="${C.ink}" stroke-width="5"/></g><g transform="translate(0,-124)"><path d="M-30 0 L30 0 L25 60 L-25 60 Z" fill="#FF5A4E" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-14 0 Q-14 -20 0 -20 Q14 -20 14 0" fill="none" stroke="${C.ink}" stroke-width="5"/></g><text x="0" y="-160" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="#B8322A">x10</text></g></g>
      <g id="f28-band" opacity="0"><g transform="translate(1270,840)"><path d="M-70 40 L-70 10 L-30 10 L-30 -20 L10 -20 L10 -50 L50 -50 L50 40 Z" fill="#C99A62" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/></g></g>
      <g id="f28-cm" opacity="0" transform="translate(1530,620)"><path d="M-50 -36 L50 -36 Q60 -36 60 -26 L60 20 Q60 30 50 30 L-10 30 L-34 52 L-30 30 L-50 30 Q-60 30 -60 20 L-60 -26 Q-60 -36 -50 -36 Z" fill="#fff" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-34 -12 L34 -12 M-34 8 L14 8" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>
    </svg>
    <div id="f28-ban" class="abs card label" style="opacity:0"><b>Conteúdo educativo.</b> Não substitui avaliação individual com um profissional de saúde.</div>
    <div id="f28-btnw" class="abs" style="left:0;top:0;opacity:0">
      <div id="f28-btn-on" class="abs title f28b" style="left:960px;top:380px;width:440px;height:120px;border-radius:24px;border:7px solid ${C.ink};box-shadow:8px 8px 0 ${C.ink};display:flex;align-items:center;justify-content:center;font-size:52px;color:#fff;background:${C.pain}">INSCREVA-SE</div>
      <div id="f28-btn-off" class="abs title f28b" style="left:960px;top:380px;width:440px;height:120px;border-radius:24px;border:7px solid ${C.ink};box-shadow:8px 8px 0 ${C.ink};display:flex;align-items:center;justify-content:center;font-size:52px;color:#fff;background:${C.grey};opacity:0">INSCRITO</div>
    </div>
    <div id="f28-bal" class="abs card label" style="opacity:0">Manda pro tio das <b style="color:#FF5A4E">DEZ SACOLAS</b> de uma vez!</div>`,
      js: function (tl, K, R) {
        const p = "f28p", v = "f28v";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.setPose(tl, v, 0, { armF: 20, armB: -20 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.blinks(tl, v, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.5);
        tl.fromTo("#f28-pw", { x: -500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0);
        tl.set("#f28-vw", { opacity: 0 }, 0);
        // aviso
        R.drop(tl, "#f28-ban", K.lem - 0.1, 0.7, -250);
        R.pose(tl, p, K.lem, 0.4, { shF: -105, elF: -45 }, "back.out(1.6)");
        R.pose(tl, p, K.edu + 0.8, 0.4, { shF: -10, elF: -20 });
        // botão INSCREVA-SE: o cursor clica
        R.pop(tl, "#f28-btnw", K.insc - 0.5, 0.4);
        R.pose(tl, p, K.insc - 0.4, 0.35, { shF: -95, elF: -5 }, "back.out(1.6)");
        tl.set("#f28-cur", { opacity: 1 }, K.insc - 0.2);
        tl.fromTo("#f28-cur-in", { x: 260, y: 200 }, { x: -60, y: -110, duration: 0.6, ease: "power2.inOut" }, K.insc - 0.2);
        tl.to("#f28-cur-in", { scale: 0.85, transformOrigin: "0px 0px", duration: 0.08, yoyo: true, repeat: 1 }, K.insc + 0.42);
        tl.to("#f28-btn-on", { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, K.insc + 0.42);
        tl.set("#f28-btn-on", { opacity: 0 }, K.insc + 0.5);
        tl.set("#f28-btn-off", { opacity: 1 }, K.insc + 0.5);
        R.face(tl, p, K.insc + 0.5, { eyes: "happy" });
        // sininho
        R.pop(tl, "#f28-bell", K.sin - 0.25, 0.4);
        tl.fromTo("#f28-bell-in", { rotation: -18, svgOrigin: "0 -58" }, { rotation: 18, svgOrigin: "0 -58", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, K.sin);
        tl.to("#f28-bell-in", { rotation: 0, svgOrigin: "0 -58", duration: 0.1 }, K.sin + 0.96);
        tl.fromTo("#f28-waves", { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 }, K.sin);
        R.fadeOut(tl, "#f28-cur", K.sin, 0.2);
        // comentário
        R.pop(tl, "#f28-cm", K.com - 0.1, 0.4);
        R.pose(tl, p, K.com, 0.4, { shF: -40, elF: -60 });
        // Vértebra vota
        tl.fromTo("#f28-vw", { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.prox);
        R.fadeOut(tl, "#f28-cm", K.v0 - 0.3);
        R.pose(tl, v, K.v0, 0.3, { armF: -160, armB: 20 }, "back.out(2)");
        R.face(tl, v, K.v0, { eyes: "happy" });
        R.pop(tl, "#f28-bal", K.v0 + 0.1, 0.4);
        // "compartilha" (aponta) "...travado!" (imita o robô travado)
        R.pose(tl, v, K.desc, 0.3, { armF: -100, armB: 20 }, "back.out(2)");
        R.pop(tl, "#f28-pil", K.tia - 0.1, 0.35);
        R.pop(tl, "#f28-band", K.nao - 0.1, 0.35);
        R.pose(tl, v, K.nao, 0.3, { armF: 40, armB: -40 }, "back.out(2)");
        R.face(tl, v, K.nao, { eyes: "closed", mouth: "smile" });
        tl.to("#f28-vw", { rotation: -6, svgOrigin: "1720 882", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.nao + 0.1);
        R.shake(tl, "#f28-bal", K.nao, 0.3, 5);
        R.face(tl, p, K.v1, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
