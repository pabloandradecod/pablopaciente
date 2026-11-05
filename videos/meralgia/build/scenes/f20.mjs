// F20 — Cuidado 2: caminhada e controle de peso (Seu Zé no parque, gráfico de peso descendo)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, nervinho, w } = ctx;
    const k = {
      dois: w(0, "Dois"), cam: w(0, "caminhada"), peso: w(0, "peso"), menos: w(0, "Menos"), dentro: w(0, "dentro"),
      nerv: w(0, "Nervinho"), poucos: w(0, "poucos"), const: w(0, "constância"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const phones = `<path d="M-50 -92 Q-40 -150 10 -146 Q58 -142 60 -100" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><rect x="-62" y="-92" width="34" height="46" rx="14" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/>`;
    const ze = human("f20z", "ze").replace('<g id="f20z-eyes">', phones + '<g id="f20z-eyes">');
    const tree = (x, s) => `<g transform="translate(${x},800) scale(${s})"><rect x="-16" y="-150" width="32" height="150" fill="#9B6B43" ${st}/><circle cx="0" cy="-210" r="95" fill="#5DBB7A" ${st}/><circle cx="-60" cy="-160" r="60" fill="#5DBB7A" ${st}/><circle cx="60" cy="-165" r="60" fill="#5DBB7A" ${st}/></g>`;
    return {
      k,
      bg: "#CDEFF5",
      css: `
        #f20-sign { right:40px; top:34px; width:380px; padding:12px 18px; font-size:26px; line-height:1.1; border-color:#C9372A; }
        #f20-sign b { color:#C9372A; display:block; font-size:30px; }
        #f20-card { left:1180px; top:190px; width:620px; padding:26px 32px; }
        #f20-card .n { font-size:36px; color:#fff; background:${C.ink}; display:inline-block; padding:4px 18px; border-radius:12px; margin-bottom:10px; }
        #f20-card .h { font-size:50px; line-height:1.05; margin-bottom:10px; }
        #f20-card .h b { color:#1E9C72; }
        #f20-graph { left:1180px; top:500px; width:620px; padding:18px 24px; display:flex; gap:18px; align-items:center; }
        #f20-graph .t { font-size:34px; line-height:1.1; }
        #f20-graph .t b { color:#1E9C72; }
        #f20-nv { left:110px; top:150px; width:600px; padding:16px 22px; display:flex; gap:16px; align-items:center; }
        #f20-nv .t { font-size:30px; line-height:1.1; }
        #f20-cal { left:110px; top:430px; padding:14px 22px; display:flex; gap:12px; align-items:center; }
        #f20-cal .t { font-size:34px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="900" cy="150" r="64" fill="${C.sun}" stroke="${C.ink}" stroke-width="7"/>
      <g id="f20-far">${[100, 520, 940, 1360, 1780, 2200, 2620].map((x) => `<path d="M${x - 200} 800 Q${x} 560 ${x + 200} 800 Z" fill="#9ADBA9"/>`).join("")}</g>
      <g id="f20-trees">${[180, 760, 1340, 1920, 2500].map((x, i) => tree(x, 0.9 + (i % 2) * 0.15)).join("")}</g>
      <rect x="0" y="800" width="1920" height="280" fill="#7CCB8E"/>
      <rect x="0" y="830" width="1920" height="60" fill="#E7D3A8"/>
      <line x1="0" y1="800" x2="1920" y2="800" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(800,590) scale(1.2)">${ze}</g>
      <g transform="translate(862,505)"><g id="f20-belly"><g id="f20-belly-in"><ellipse cx="0" cy="0" rx="30" ry="50" fill="${C.blue}" stroke="${C.ink}" stroke-width="6"/></g></g></g>
    </svg>
    <div id="f20-sign" class="abs card label">Formigou mais forte?<b>Diminui a amplitude</b></div>
    <div id="f20-card" class="abs card" style="opacity:0">
      <div class="n label">CUIDADO 2</div>
      <div class="h title"><span id="f20-h1">Caminhada</span><br><span id="f20-h2" style="opacity:0">e <b>controle de peso</b></span></div>
    </div>
    <div id="f20-graph" class="abs card" style="opacity:0">
      <svg width="200" height="120" viewBox="0 0 200 120" style="flex:none">
        <path d="M10 10 L10 110 L190 110" fill="none" ${st}/>
        <path id="f20-line" d="M20 24 L60 34 L100 52 L140 66 L180 86" fill="none" stroke="#1E9C72" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="t label">Peso descendo<br><b>aos poucos</b></div>
    </div>
    <div id="f20-nv" class="abs card" style="opacity:0">
      <svg width="170" height="110" viewBox="0 0 170 110" style="flex:none">${nervinho("f20n", [[40, 56], [80, 56], [120, 56], [160, 56]], 14, 1.3)}</svg>
      <div class="t label">Menos pressão de dentro pra fora = Nervinho aliviado</div>
    </div>
    <div id="f20-cal" class="abs card" style="opacity:0">
      ${[0, 1, 2, 3, 4].map((i) => `<svg id="f20-ck${i}" width="54" height="54" viewBox="-27 -27 54 54"><rect x="-23" y="-23" width="46" height="46" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="5"/><path d="M-11 0 L-3 9 L13 -10" fill="none" stroke="#1E9C72" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`).join("")}
      <div class="t label">constância</div>
    </div>`,
      js: function (tl, K, R) {
        const z = "f20z";
        tl.fromTo("#f20-trees", { x: 0 }, { x: -1160, duration: K.dur, ease: "none" }, 0);
        tl.fromTo("#f20-far", { x: 0 }, { x: -420, duration: K.dur, ease: "none" }, 0);
        R.face(tl, z, 0, { eyes: "happy", mouth: "smile" });
        R.setPose(tl, z, 0, { torso: 4, neck: -4, shF: 0, elF: -50, shB: 0, elB: -50 });
        const step = 0.42;
        const n = Math.floor((K.dur - 0.3) / step);
        for (let i = 0; i < n; i++) {
          const t = 0.1 + i * step, a = i % 2 ? 1 : -1;
          R.pose(tl, z, t, step, { hipF: 24 * a, hipB: -24 * a, knF: a > 0 ? 30 : 4, knB: a > 0 ? 4 : 30, shF: -28 * a, shB: 28 * a }, "sine.inOut");
          tl.to("#f20z-root", { y: -6, duration: step / 2, ease: "sine.out", yoyo: true, repeat: 1 }, t);
          tl.to("#f20-belly", { y: -7, duration: step / 2, ease: "sine.out", yoyo: true, repeat: 1 }, t);
        }
        R.slideIn(tl, "#f20-card", K.dois - 0.2, 0.5, 300);
        tl.to("#f20-h2", { opacity: 1, duration: 0.3 }, K.peso - 0.4);
        // peso descendo: gráfico e barriga diminuindo
        R.pop(tl, "#f20-graph", K.peso, 0.45, 0.6);
        R.draw(tl, "#f20-line", K.peso + 0.2, 1.2);
        tl.to("#f20-belly-in", { scaleX: 0.55, svgOrigin: "-30 0", duration: 2.4, ease: "power1.inOut" }, K.peso + 0.2);
        // Nervinho aliviado
        R.pop(tl, "#f20-nv", K.menos - 0.1, 0.45, 0.6);
        R.face(tl, "f20n", K.menos - 0.1, { eyes: "pain", mouth: "frown" });
        R.face(tl, "f20n", K.nerv, { eyes: "happy", mouth: "grin" });
        tl.fromTo("#f20n-face", { y: 0 }, { y: -8, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.nerv);
        // constância: checks um por dia
        R.pop(tl, "#f20-cal", K.poucos - 0.1, 0.4, 0.6);
        for (let i = 0; i < 5; i++) tl.fromTo(`#f20-ck${i}`, { opacity: 0.2, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, K.poucos + 0.2 + i * 0.22);
        R.face(tl, z, K.const, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: k.dois - 0.2, vol: 0.35 },
        { name: "pop", t: k.peso, vol: 0.35 },
        { name: "pop", t: k.menos - 0.1, vol: 0.35 },
        { name: "pop", t: k.poucos - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.const, vol: 0.35 },
      ],
    };
  },
};
