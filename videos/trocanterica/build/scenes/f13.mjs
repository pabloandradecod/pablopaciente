// F13 — Outros testes: compressão (perna dobrada cruzando pra dentro) e força dos glúteos (deitada de lado) + neurológico normal
export default {
  tail: 1.2,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      test: w(0, "testo"), aper: w(0, "apertam"), cruz: w(0, "cruzar"), dentro: w(0, "dentro"), forca: w(0, "força"), glut: w(0, "glúteos"),
      neuro: w(0, "neurológico"), normal: w(0, "normal"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const panel = (x, id, title) => `<g id="${id}"><rect x="${x}" y="150" width="840" height="560" rx="28" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
      <text x="${x + 420}" y="215" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="40" fill="${C.ink}">${title}</text></g>`;
    return {
      k,
      css: `
        #f13-title { left:0; right:0; top:50px; text-align:center; font-size:64px; }
        #f13-title span { color:${C.pain}; }
        #root .f13-chip { position:absolute; padding:10px 20px; font-size:30px; }
        #f13-neuro { left:610px; top:745px; width:700px; padding:12px 24px; text-align:center; font-size:40px; color:${C.ink}; background:#E6F7EC; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.wall}"/>
      ${panel(100, "f13-pl", "COMPRESSÃO")}
      ${panel(980, "f13-pr", "FORÇA DOS GLÚTEOS")}
      <rect x="180" y="560" width="680" height="34" rx="12" fill="${C.sky}" stroke="${C.ink}" stroke-width="6"/>
      <rect x="1060" y="560" width="680" height="34" rx="12" fill="${C.sky}" stroke="${C.ink}" stroke-width="6"/>
      <clipPath id="f13-cl"><rect x="100" y="230" width="840" height="470"/></clipPath>
      <clipPath id="f13-cr"><rect x="980" y="230" width="840" height="470"/></clipPath>
      <g clip-path="url(#f13-cl)"><g transform="translate(560,525) scale(0.95)">${human("f13a", "cida")}</g>
        <path id="f13-arrL" d="M640 330 Q700 300 720 360" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" opacity="0"/>
        <g id="f13-painL" opacity="0"><circle cx="560" cy="515" r="36" fill="${C.pain}" opacity="0.4"/><circle cx="560" cy="515" r="15" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
      </g>
      <g clip-path="url(#f13-cr)"><g transform="translate(1440,525) scale(0.95)">${human("f13b", "cida")}</g>
        <g id="f13-handR" opacity="0"><circle cx="1565" cy="392" r="26" fill="#fff" ${st}/><path d="M1565 366 L1565 290" ${st} stroke-width="26" stroke="${C.ink}"/><path d="M1565 366 L1565 290" stroke="#fff" stroke-width="16" stroke-linecap="round"/></g>
      </g>
      <g id="f13-bar" opacity="0"><rect x="1080" y="620" width="400" height="34" rx="17" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect id="f13-fill" x="1084" y="624" width="250" height="26" rx="13" fill="${C.sun}"/>
        <text x="1500" y="648" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">força</text></g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">Outros <span>testes</span></div>
    <div id="f13-c1" class="f13-chip card label" style="left:150px;top:620px;opacity:0">perna dobrada <b style="color:${C.pain}">pra dentro</b> → dói na lateral</div>
    <div id="f13-c2" class="f13-chip card label" style="left:1030px;top:250px;opacity:0">deitada de lado: sobe a perna contra a mão</div>
    <div id="f13-neuro" class="abs card label" style="opacity:0">exame neurológico: <b style="color:${C.good}">NORMAL</b> ✓</div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f13-title", 0.05, 0.6, -240);
        tl.fromTo("#f13-pl", { x: -900 }, { x: 0, duration: 0.5, ease: "power3.out" }, 0.1);
        tl.fromTo("#f13-pr", { x: 900 }, { x: 0, duration: 0.5, ease: "power3.out" }, 0.2);
        // esquerda: deitada de costas, joelho dobrado vai pra dentro
        const a = "f13a", b = "f13b";
        R.setPose(tl, a, 0, { root: -90, shF: 10, elF: -20, shB: 10, elB: -20 });
        R.setPose(tl, b, 0, { root: -90, shF: 10, elF: -60, shB: 10, elB: -20, hipF: -8, knF: 20, hipB: -8, knB: 20 });
        R.face(tl, a, 0, { eyes: "normal", mouth: "flat" });
        R.face(tl, b, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, a, 0.3, K.dur);
        R.blinks(tl, b, 0.6, K.dur);
        R.pose(tl, a, K.aper, 0.5, { hipF: -90, knF: 100 });
        tl.set("#f13-arrL", { opacity: 1 }, K.cruz);
        R.draw(tl, "#f13-arrL", K.cruz, 0.5);
        R.pose(tl, a, K.cruz + 0.2, 0.45, { hipF: -105, knF: 110 });
        R.pop(tl, "#f13-c1", K.dentro, 0.4);
        tl.set("#f13-painL", { opacity: 1 }, K.dentro);
        tl.fromTo("#f13-painL", { scale: 0.6, svgOrigin: "560 515" }, { scale: 1.3, svgOrigin: "560 515", duration: 0.25, yoyo: true, repeat: 3 }, K.dentro);
        R.face(tl, a, K.dentro, { eyes: "pain", mouth: "frown" });
        // direita: força dos glúteos — perna de cima sobe contra a mão
        R.pop(tl, "#f13-c2", K.forca - 0.2, 0.4);
        R.pop(tl, "#f13-handR", K.forca, 0.35);
        R.pop(tl, "#f13-bar", K.forca, 0.35);
        for (let i = 0; i < 2; i++) {
          R.pose(tl, b, K.forca + 0.2 + i * 1.0, 0.4, { hipF: -40 }, "power2.out");
          R.pose(tl, b, K.forca + 0.7 + i * 1.0, 0.4, { hipF: -8 });
        }
        tl.fromTo("#f13-fill", { attr: { width: 60 } }, { attr: { width: 220 }, duration: 0.8, ease: "power2.out" }, K.glut);
        R.face(tl, b, K.forca + 0.2, { eyes: "closed", mouth: "flat" });
        // neurológico normal
        R.pop(tl, "#f13-neuro", K.neuro - 0.1, 0.45);
        R.face(tl, a, K.normal, { eyes: "happy", mouth: "smile" });
        R.face(tl, b, K.normal, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.dentro, vol: 0.4 },
        { name: "pop", t: k.forca, vol: 0.35 },
        { name: "sparkle", t: k.neuro - 0.1, vol: 0.4 },
      ],
    };
  },
};
