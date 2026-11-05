// F17 — Ajuste 1: carga do treino (menos distância e descidas, correr até antes da dor, dias alternados, natação), diminuir ≠ parar
export default {
  tail: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      um: w(0, "Um"), aju: w(0, "ajustar"), dim: w(0, "Diminuir"), dist: w(0, "distância"), desc: w(0, "descidas"), corr: w(0, "correr"),
      antes: w(0, "antes"), dor: w(0, "dor"), alt: w(0, "alternados"), cond: w(0, "condicionamento"), nat: w(0, "natação"), ativ: w(0, "atividade"), doa: w(0, "doa"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const before = [220, 250, 280, 300];
    const bars = before.map((h, i) => `<rect id="f17-b${i}" x="${70 + i * 120}" y="${380 - h}" width="80" height="${h}" rx="8" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/>`).join("");
    const days = ["S", "T", "Q", "Q", "S", "S", "D"];
    const runDays = [0, 2, 4];
    return {
      k,
      css: `
        #f17-title { left:110px; top:60px; font-size:70px; }
        #f17-title span { color:#1E9C72; }
        #f17-chart { left:110px; top:170px; width:560px; padding:16px 22px 8px; }
        #f17-chart .t { font-size:26px; }
        #f17-desc { left:470px; top:186px; padding:8px 18px; font-size:28px; color:#fff; background:${C.pain}; border:5px solid ${C.ink}; border-radius:14px; }
        #f17-run { left:720px; top:170px; width:640px; padding:18px 24px; }
        #f17-run .t { font-size:28px; margin-bottom:8px; }
        #f17-week { left:720px; top:420px; width:640px; padding:18px 24px; }
        #f17-week .t { font-size:28px; margin-bottom:8px; }
        #f17-cross { left:720px; top:660px; width:640px; padding:16px 24px; display:flex; align-items:center; gap:20px; }
        #f17-cross .t { font-size:30px; line-height:1.1; }
        #f17-stamp { left:110px; top:610px; padding:12px 26px; font-size:48px; color:#fff; background:${C.good}; border:7px solid ${C.ink}; border-radius:22px; transform:rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.sky}"/>
      <rect y="860" width="1920" height="220" fill="#9AA3A8"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f17-c-wrap"><g transform="translate(1640,640) scale(1.05)">${human("f17c", "cida")}</g></g>
    </svg>
    <div id="f17-title" class="abs title" style="opacity:0">1. Ajustar a <span>carga do treino</span></div>
    <div id="f17-chart" class="abs card" style="opacity:0">
      <div class="t label">KM POR SEMANA</div>
      <svg width="456" height="320" viewBox="0 0 570 400"><line x1="40" y1="380" x2="560" y2="380" stroke="${C.ink}" stroke-width="5"/><line x1="40" y1="60" x2="40" y2="380" stroke="${C.ink}" stroke-width="5"/>${bars}</svg>
    </div>
    <div id="f17-desc" class="abs label" style="opacity:0">menos descidas</div>
    <div id="f17-run" class="abs card" style="opacity:0">
      <div class="t label">Corre até <b style="color:#1E9C72">um pouco ANTES</b> da dor</div>
      <svg width="590" height="90" viewBox="0 0 590 90">
        <rect x="10" y="34" width="560" height="22" rx="11" fill="#E8EEF1" stroke="${C.ink}" stroke-width="5"/>
        <rect id="f17-fill" x="10" y="34" width="0" height="22" rx="11" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>
        <line x1="400" y1="16" x2="400" y2="74" stroke="${C.pain}" stroke-width="6" stroke-dasharray="8 6"/>
        <text x="400" y="14" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="20" fill="${C.pain}">dor (km 3)</text>
        <g id="f17-stop" opacity="0"><circle cx="350" cy="45" r="20" fill="#fff" stroke="${C.ink}" stroke-width="5"/><rect x="342" y="37" width="16" height="16" fill="${C.ink}"/></g>
      </svg>
    </div>
    <div id="f17-week" class="abs card" style="opacity:0">
      <div class="t label">Dias <b style="color:#1E9C72">alternados</b></div>
      <svg width="590" height="90" viewBox="0 0 590 90">${days.map((d, i) => `<g><rect x="${i * 82 + 6}" y="8" width="72" height="72" rx="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/><text x="${i * 82 + 42}" y="34" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="${C.ink}">${d}</text>${runDays.includes(i) ? `<g id="f17-r${i}" opacity="0"><circle cx="${i * 82 + 42}" cy="58" r="14" fill="${C.good}" stroke="${C.ink}" stroke-width="3"/><path d="M${i * 82 + 36} 58 L${i * 82 + 41} 63 L${i * 82 + 49} 52" fill="none" stroke="${C.ink}" stroke-width="3"/></g>` : ""}</g>`).join("")}</svg>
    </div>
    <div id="f17-cross" class="abs card" style="opacity:0">
      <svg width="200" height="90" viewBox="0 0 200 90" style="flex:none">
        <g id="f17-swim"><path d="M6 66 Q26 54 46 66 Q66 78 86 66" fill="none" stroke="#3E7FD8" stroke-width="6"/><circle cx="40" cy="40" r="12" fill="#E3A47E" stroke="${C.ink}" stroke-width="4"/><path d="M52 44 L80 34" stroke="#B07ED8" stroke-width="9" stroke-linecap="round"/></g>
        <g id="f17-bike" opacity="0"><circle cx="128" cy="62" r="20" fill="none" stroke="${C.ink}" stroke-width="5"/><circle cx="180" cy="62" r="20" fill="none" stroke="${C.ink}" stroke-width="5"/><path d="M128 62 L148 34 L174 34 L180 62 M148 34 L156 62 L174 34" fill="none" stroke="${C.pain}" stroke-width="5" stroke-linejoin="round"/></g>
      </svg>
      <div class="t label">Mantém o condicionamento: <b>natação</b> ou outra atividade <b style="color:#1E9C72">que não doa</b></div>
    </div>
    <div id="f17-stamp" class="abs title" style="opacity:0">DIMINUIR ≠ PARAR</div>`,
      js: function (tl, K, R) {
        const c = "f17c";
        R.setPose(tl, c, 0, { shF: -20, elF: -40, shB: 10, elB: -20 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        R.rise(tl, "#f17-title", Math.max(0.1, K.um - 0.2), 0.45, 30);
        tl.fromTo("#f17-c-wrap", { x: 400 }, { x: 0, duration: 0.6, ease: "back.out(1.3)" }, 0.1);
        // km por semana diminuem (não zeram)
        R.slideIn(tl, "#f17-chart", K.aju - 0.2, 0.5, -300);
        const after = [140, 130, 120, 120];
        after.forEach((h, i) => tl.to(`#f17-b${i}`, { attr: { y: 380 - h, height: h }, fill: "#FFC94A", duration: 0.5, ease: "power2.inOut" }, K.dist - 0.2 + i * 0.12));
        R.pop(tl, "#f17-desc", K.desc - 0.1, 0.4);
        R.face(tl, c, K.dim, { eyes: "wide", mouth: "flat" });
        // correr até antes da dor
        R.pop(tl, "#f17-run", K.corr - 0.2, 0.4, 0.7);
        tl.to("#f17-fill", { attr: { width: 340 }, duration: 1.0, ease: "power1.out" }, K.corr);
        tl.set("#f17-stop", { opacity: 1 }, K.antes + 0.2);
        R.pop(tl, "#f17-stop", K.antes + 0.2, 0.3);
        R.face(tl, c, K.antes, { eyes: "normal", mouth: "smile" });
        // dias alternados
        R.pop(tl, "#f17-week", K.alt - 0.5, 0.4, 0.7);
        [0, 2, 4].forEach((d, i) => R.pop(tl, `#f17-r${d}`, K.alt - 0.2 + i * 0.18, 0.3));
        // natação / atividade que não doa
        R.pop(tl, "#f17-cross", K.cond - 0.2, 0.4, 0.7);
        tl.fromTo("#f17-swim", { x: 0 }, { x: 10, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.nat);
        R.fadeIn(tl, "#f17-bike", K.ativ - 0.1, 0.3);
        R.pose(tl, c, K.nat, 0.4, { shF: -150, elF: -30 }, "back.out(2)");
        R.face(tl, c, K.nat, { eyes: "happy", mouth: "grin" });
        // selo
        tl.fromTo("#f17-stamp", { scale: 2.2, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.35, ease: "back.out(2)" }, K.ativ + 0.3);
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.1, k.um - 0.2), vol: 0.35 },
        { name: "whoosh-short", t: k.aju - 0.2, vol: 0.35 },
        { name: "pop", t: k.desc - 0.1, vol: 0.35 },
        { name: "pop", t: k.corr - 0.2, vol: 0.3 },
        { name: "click", t: k.antes + 0.2, vol: 0.4 },
        { name: "pop", t: k.alt - 0.5, vol: 0.3 },
        { name: "pop", t: k.cond - 0.2, vol: 0.3 },
        { name: "impact-bass-1", t: k.ativ + 0.3, vol: 0.4 },
      ],
    };
  },
};
