// F18 — Passo 1: ajustar a carga — halter de 6 kg vai pra prateleira ("volta depois"), varal mais baixo, banquinho pra prateleira alta; Dona Cida segue treinando pernas; Seu Zé: "Pausa não é parada"
export default {
  speakers: { ze: "f18z" },
  extra: 0.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      prim: w(0, "Primeiro"), ajust: w(0, "ajustar"), tirar: w(0, "Tirar"), peso: w(0, "peso"), irr: w(0, "irritou"),
      abai: w(0, "abaixar"), varal: w(0, "varal"), banq: w(0, "banquinho"), prat: w(0, "prateleira"),
      resto: w(0, "resto"), trein: w(0, "treino"), cont: w(0, "continua"),
      z0: lines[1].start, z1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const card = (x) => `<rect x="${x + 10}" y="170" width="500" height="300" rx="26" fill="${C.ink}"/><rect x="${x}" y="160" width="500" height="300" rx="26" fill="#fff" stroke="${C.ink}" stroke-width="7"/>`;
    const lbl = (x, t) => `<text x="${x + 250}" y="440" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.ink}">${t}</text>`;
    const db = `<rect x="-50" y="-8" width="100" height="16" rx="6" fill="#555" stroke="${C.ink}" stroke-width="4"/><rect x="-74" y="-34" width="28" height="68" rx="6" fill="#3A3A3A" stroke="${C.ink}" stroke-width="4"/><rect x="46" y="-34" width="28" height="68" rx="6" fill="#3A3A3A" stroke="${C.ink}" stroke-width="4"/><text x="0" y="-18" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.ink}">6 kg</text>`;
    return {
      k,
      css: `
        #f18-head { left:110px; top:50px; font-size:66px; }
        #f18-head span { color:#1E9C72; }
        #f18-back { left:340px; top:182px; padding:4px 14px; font-size:24px; color:#fff; background:${C.pain}; border:5px solid ${C.ink}; border-radius:12px; transform:rotate(-4deg); }
        #f18-legs { left:1000px; top:600px; padding:10px 20px; font-size:34px; }
        #f18-legs b { color:#1E9C72; }
        #f18-bal { left:1000px; top:520px; width:440px; padding:14px 20px; font-size:38px; text-align:center; }
        #f18-bal b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="#E9E4F5"/>
      <rect y="900" width="1920" height="180" fill="#B8B0CC"/><line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <!-- 1: halter vai pra prateleira -->
      <g id="f18-p0" opacity="0">${card(110)}
        <rect x="200" y="250" width="320" height="18" rx="5" fill="#B07A4A" ${st}/>
        <g transform="translate(360,370)"><g id="f18-db">${db}</g></g>
        ${lbl(110, "tirar o peso que irritou")}
      </g>
      <!-- 2: varal mais baixo -->
      <g id="f18-p1" opacity="0">${card(710)}
        <rect x="780" y="190" width="12" height="220" fill="#8B5A2B" ${st}/><rect x="1130" y="190" width="12" height="220" fill="#8B5A2B" ${st}/>
        <path id="f18-line" d="M786 200 Q960 220 1136 200" fill="none" stroke="${C.ink}" stroke-width="5"/>
        <g id="f18-cl"><path d="M880 206 L920 206 L930 222 L920 228 L918 262 L882 262 L880 228 L870 222 Z" fill="#7FC8F8" stroke="${C.ink}" stroke-width="4"/><rect x="1000" y="208" width="46" height="56" rx="5" fill="#B07ED8" stroke="${C.ink}" stroke-width="4"/></g>
        <path id="f18-arr" d="M1180 220 L1180 300 M1166 284 L1180 300 L1194 284" fill="none" stroke="#1E9C72" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
        ${lbl(710, "abaixar o varal")}
      </g>
      <!-- 3: banquinho pra prateleira alta -->
      <g id="f18-p2" opacity="0">${card(1310)}
        <rect x="1400" y="210" width="320" height="18" rx="5" fill="#B07A4A" ${st}/>
        ${[0, 1, 2].map((i) => `<rect x="${1420 + i * 60}" y="168" width="40" height="42" rx="6" fill="${["#7FC8F8", "#3DD9A4", "#B07ED8"][i]}" stroke="${C.ink}" stroke-width="4"/>`).join("")}
        <g id="f18-stool"><rect x="1490" y="330" width="140" height="22" rx="6" fill="#C98A4A" ${st}/><path d="M1505 352 L1495 410 M1615 352 L1625 410 M1500 384 L1620 384" stroke="#8B5A2B" stroke-width="10" stroke-linecap="round"/></g>
        <g id="f18-ok" opacity="0"><circle cx="1700" cy="330" r="30" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M1686 330 L1697 342 L1716 318" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
        ${lbl(1310, "banquinho pra prateleira")}
      </g>
      <!-- Dona Cida treinando pernas -->
      <g id="f18-c-wrap" opacity="0"><g transform="translate(700,743) scale(0.85)"><g id="f18-c-sq">${human("f18c", "cida")}</g></g></g>
      <!-- Seu Zé -->
      <g id="f18-z-wrap" opacity="0"><g transform="translate(1600,743) scale(0.85)">${human("f18z", "ze")}</g></g>
    </svg>
    <div id="f18-head" class="abs title" style="opacity:0">Passo 1: <span>ajustar a carga</span></div>
    <div id="f18-back" class="abs title" style="opacity:0">volta depois</div>
    <div id="f18-legs" class="abs card label" style="opacity:0">o resto do treino <b>continua ✓</b></div>
    <div id="f18-bal" class="abs card label" style="opacity:0">Pausa <b>não é</b> parada, Cida!</div>`,
      js: function (tl, K, R) {
        const c = "f18c", z = "f18z";
        R.rise(tl, "#f18-head", K.prim - 0.2, 0.45, 30);
        // 1: halter pra prateleira
        R.pop(tl, "#f18-p0", K.tirar - 0.3, 0.4, 0.6);
        tl.to("#f18-db", { y: -150, duration: 0.6, ease: "back.out(1.4)" }, K.irr - 0.1);
        R.pop(tl, "#f18-back", K.irr + 0.4, 0.35);
        // 2: varal desce
        R.pop(tl, "#f18-p1", K.abai - 0.3, 0.4, 0.6);
        tl.to("#f18-line", { attr: { d: "M786 290 Q960 310 1136 290" }, duration: 0.6, ease: "power2.inOut" }, K.varal - 0.1);
        tl.to("#f18-cl", { y: 90, duration: 0.6, ease: "power2.inOut" }, K.varal - 0.1);
        tl.to("#f18-arr", { opacity: 1, duration: 0.2 }, K.varal - 0.1);
        // 3: banquinho
        R.pop(tl, "#f18-p2", K.banq - 0.35, 0.4, 0.6);
        tl.fromTo("#f18-stool", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, K.banq - 0.1);
        R.pop(tl, "#f18-ok", K.prat + 0.3, 0.35);
        // o resto do treino continua: agachamento
        R.setPose(tl, c, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "smile" });
        tl.set("#f18-c-wrap", { opacity: 1 }, K.resto - 0.4);
        tl.fromTo("#f18-c-wrap", { x: -700 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, K.resto - 0.4);
        R.pop(tl, "#f18-legs", K.trein, 0.4);
        const t0 = K.trein + 0.1, sp = 1.2;
        const n = Math.max(3, Math.floor((K.z1 + 0.4 - t0) / sp));
        for (let i = 0; i < n; i++) {
          const t = t0 + i * sp;
          R.pose(tl, c, t, sp * 0.45, { hipF: -70, knF: 80, hipB: -70, knB: 80, torso: 22, shF: -80, shB: -80, elF: 0, elB: 0 }, "power2.inOut");
          tl.to("#f18-c-sq", { x: -67, y: 59, duration: sp * 0.45, ease: "power2.inOut" }, t);
          R.pose(tl, c, t + sp * 0.5, sp * 0.45, { hipF: 0, knF: 0, hipB: 0, knB: 0, torso: 0, shF: 10, shB: 10, elF: -10, elB: -10 }, "power2.inOut");
          tl.to("#f18-c-sq", { x: 0, y: 0, duration: sp * 0.45, ease: "power2.inOut" }, t + sp * 0.5);
        }
        // Seu Zé
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f18-z-wrap", { opacity: 1 }, K.z0 - 0.6);
        tl.fromTo("#f18-z-wrap", { x: 500 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, K.z0 - 0.6);
        R.fadeOut(tl, "#f18-legs", K.z0 - 0.4);
        R.pop(tl, "#f18-bal", K.z0 - 0.1, 0.4);
        R.pose(tl, z, K.z0, 0.3, { shF: -130, elF: -20 }, "back.out(2)");
      },
      sfx: [
        { name: "whoosh", t: Math.max(0, k.prim - 0.2), vol: 0.35 },
        { name: "pop", t: k.tirar - 0.3, vol: 0.35 },
        { name: "click", t: k.irr + 0.4, vol: 0.4 },
        { name: "pop", t: k.abai - 0.3, vol: 0.35 },
        { name: "pop", t: k.banq - 0.35, vol: 0.35 },
        { name: "ping", t: k.prat + 0.3, vol: 0.3 },
        { name: "whoosh-short", t: k.resto - 0.4, vol: 0.4 },
        { name: "whoosh-short", t: k.z0 - 0.6, vol: 0.4 },
      ],
    };
  },
};
