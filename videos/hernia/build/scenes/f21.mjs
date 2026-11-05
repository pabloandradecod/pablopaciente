// F21 — Exercício 3: deslizamento neural do ciático (sentado, raio-x do nervo)
export default {
  speakers: { nervo: "f21n" },
  tail: 1.0,
  build(ctx) {
    const { C, human, nerve, w, lines } = ctx;
    const k = {
      dois: w(0, "Três"), sent: w(0, "Sentado"), est: w(0, "estica"), dob: w(0, "dobra"), duas: w(0, "Duas"),
      des: w(0, "devagar"), n0: lines[1].start, n1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    // nervo em "raio-x" desenhado dentro da coxa e da perna (acompanha a pose)
    const nv = (len) => `<line x1="-13" y1="2" x2="-13" y2="${len}" stroke="${C.ink}" stroke-width="13" stroke-linecap="round"/><line x1="-13" y1="2" x2="-13" y2="${len}" stroke="${C.nerve}" stroke-width="7" stroke-linecap="round"/><line class="f21-sh" x1="-13" y1="2" x2="-13" y2="${len}" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 14"/>`;
    let ze = human("f21z", "ze");
    // a perna da frente: insere o nervo após a linha da coxa e da canela
    ze = ze.replace(/(<g id="f21z-hipF">[\s\S]*?stroke-linecap="round"\/>[\s\S]*?stroke-linecap="round"\/>)/, `$1${nv(86)}`);
    ze = ze.replace(/(<g id="f21z-knF">[\s\S]*?stroke-linecap="round"\/>[\s\S]*?stroke-linecap="round"\/>)/, `$1${nv(84)}`);
    return {
      k,
      css: `
        #f21-sign { right:40px; top:34px; width:360px; padding:12px 18px; font-size:26px; line-height:1.1; border-color:#C9372A; display:flex; gap:12px; align-items:center; }
        #f21-sign b { color:#C9372A; }
        #f21-card { left:1180px; top:190px; width:620px; padding:26px 32px; }
        #f21-card .n { font-size:40px; color:#fff; background:${C.ink}; display:inline-block; padding:4px 18px; border-radius:12px; margin-bottom:10px; }
        #f21-card .h { font-size:52px; line-height:1; margin-bottom:14px; }
        #f21-card .r { font-size:36px; line-height:1.25; }
        #f21-card .r b { color:#1E9C72; }
        #f21-x { left:150px; top:120px; font-size:34px; padding:8px 18px; background:${C.ink}; color:${C.nerve}; border-radius:14px; }
                #f21-spa { left:940px; top:600px; font-size:44px; color:${C.ink}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="730" fill="${C.wall}"/>
      <rect x="0" y="730" width="1920" height="350" fill="${C.floor}"/>
      <line x1="0" y1="730" x2="1920" y2="730" stroke="${C.ink}" stroke-width="7"/>
      <!-- cadeira -->
      <rect x="430" y="330" width="34" height="320" rx="12" fill="#C98A4B" ${st}/>
      <rect x="430" y="600" width="300" height="38" rx="12" fill="#C98A4B" ${st}/>
      <rect x="450" y="636" width="26" height="96" fill="#C98A4B" ${st}/><rect x="690" y="636" width="26" height="96" fill="#C98A4B" ${st}/>
      <g transform="translate(560,578) scale(1.3)">${ze}</g>
      <g id="f21-bub" opacity="0">
        <circle cx="1500" cy="700" r="150" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
        <g id="f21-steam">${[1420, 1480, 1540].map((x) => `<path d="M${x + 20} 630 Q${x + 6} 610 ${x + 20} 590 Q${x + 34} 570 ${x + 20} 550" fill="none" stroke="${C.grey}" stroke-width="7" stroke-linecap="round"/>`).join("")}</g>
        <g transform="translate(1440,710) scale(1.0)">${nerve("f21n", [[0, 0], [60, 20], [120, 0], [170, 10]], 30)}</g>
      </g>
    </svg>
    <div id="f21-sign" class="abs card label"><svg width="48" height="48" viewBox="-24 -24 48 48" style="flex:none"><path d="${Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${i ? "L" : "M"}${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`; }).join(" ")} Z" fill="#D64534" stroke="${C.ink}" stroke-width="4"/></svg><span>Dor desceu mais pro pé? <b>PARE</b></span></div>
    <div id="f21-x" class="abs label" style="opacity:0">RAIO-X: o nervo deslizando</div>
    <div id="f21-card" class="abs card" style="opacity:0">
      <div class="n label">EXERCÍCIO 3</div>
      <div class="h title">Deslizamento do nervo</div>
      <div id="f21-r1" class="r label" style="opacity:0"><b>2 x 10</b> · bem devagar</div>
      <div id="f21-r2" class="r label" style="opacity:0">Deslizar, <b>sem dor forte</b></div>
    </div>
    <div id="f21-spa" class="abs title" style="opacity:0">"JÁ CONHEÇO!"</div>`,
      js: function (tl, K, R) {
        const z = "f21z";
        // sentado, mãos nas coxas
        R.setPose(tl, z, 0, { hipF: -90, hipB: -88, knF: 90, knB: 88, anF: 0, anB: 0, torso: -2, neck: 0, shF: -40, elF: -50, shB: -35, elB: -50 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f21-card", Math.max(0.1, K.dois - 0.3), 0.5, 300);
        R.fadeIn(tl, "#f21-x", K.sent, 0.3);
        // repetições: estica o joelho + cabeça pra trás / dobra + cabeça baixa
        let t = K.est - 0.2, i = 0;
        const end = K.n0 - 0.4;
        while (t + 1.7 < end) {
          R.pose(tl, z, t, 0.85, { knF: 8, anF: -15, neck: -24 }, "sine.inOut");
          R.pose(tl, z, t + 0.85, 0.85, { knF: 90, anF: 0, neck: 22 }, "sine.inOut");
          tl.fromTo(".f21-sh", { attr: { "stroke-dashoffset": 0 } }, { attr: { "stroke-dashoffset": -44 }, duration: 0.85, ease: "sine.inOut" }, t);
          tl.to(".f21-sh", { attr: { "stroke-dashoffset": 0 }, duration: 0.85, ease: "sine.inOut" }, t + 0.85);
          t += 1.8; i++;
        }
        R.pose(tl, z, t, 0.5, { knF: 90, neck: 0 });
        R.pop(tl, "#f21-r1", K.duas - 0.1, 0.4, 0.6);
        R.pop(tl, "#f21-r2", K.des - 0.1, 0.4, 0.6);
        // o nervo curtindo o spa
        R.pop(tl, "#f21-bub", K.n0 - 0.4, 0.45, 0.3);
        R.face(tl, "f21n", K.n0 - 0.4, { eyes: "closed", mouth: "smile" });
        tl.fromTo("#f21-steam", { y: 10, opacity: 0.3 }, { y: -10, opacity: 1, duration: 0.7, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.n0 - 0.2);
        R.pop(tl, "#f21-spa", K.n1 - 0.6, 0.4);
        R.face(tl, z, K.n0, { eyes: "happy" });
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.dois - 0.3), vol: 0.35 },
        { name: "pop", t: k.duas - 0.1, vol: 0.35 },
        { name: "pop", t: k.des - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.n0 - 0.4, vol: 0.4 },
      ],
    };
  },
};
