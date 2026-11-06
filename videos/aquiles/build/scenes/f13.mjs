// F13 — Teste de Thompson: Dr. Pablo de barriga pra baixo na maca, a Vértebra aperta a panturrilha e o pé mexe (tendão inteiro); quadro da ruptura; o Aquiles aliviado
// Acessórios de detetive para a Vértebra (chapéu enorme e lupa na mão da frente)
const hatSvg = (id, C, op = 1) => `<g id="${id}-hat" opacity="${op}"><g transform="translate(-6,-72) scale(1.3)">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g></g>`;
const lupaSvg = (id, C, op = 1) => `<g id="${id}-lupa" opacity="${op}"><g transform="translate(0,52)">
  <line x1="0" y1="0" x2="0" y2="40" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/>
  <line x1="0" y1="0" x2="0" y2="40" stroke="#7A4E2A" stroke-width="10" stroke-linecap="round"/>
  <circle cx="0" cy="72" r="32" fill="#D6F4FA" stroke="${C.ink}" stroke-width="9"/>
  <path d="M-14 58 Q-4 48 8 52" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</g></g>`;
/** Vértebra detetive: chapéu dentro do corpo, lupa no braço da frente. */
function vDet(vertebra, id, C, { hat = 1, lupa = 1 } = {}) {
  let s = vertebra(id);
  s = s.replace(`<g id="${id}-armF">`, `<g id="${id}-armF">${lupaSvg(id, C, lupa)}`);
  const last = s.lastIndexOf("</g>");
  const bodyEnd = s.lastIndexOf("</g>", last - 1);
  return s.slice(0, bodyEnd) + hatSvg(id, C, hat) + s.slice(bodyEnd);
}

export default {
  speakers: { aquiles: "f13a" },
  tail: 1.0,
  build(ctx) {
    const { C, human, vertebra, aquiles, w, lines } = ctx;
    const k = {
      thom: w(0, "Thompson"), deit: w(0, "deitada"), apert: w(0, "aperta"), mexe: w(0, "mexe"), inte: w(0, "inteiro"),
      nao: w(0, "não", 1), rupt: w(0, "ruptura"), urg: w(0, "urgente"), a0: lines[1].start, a1: lines[1].end, ufa: w(1, "Ufa"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const glove = `<circle cx="0" cy="0" r="22" fill="#fff" ${st}/><path d="M-14 -6 L14 -6 M-14 4 L14 4" stroke="${C.ink}" stroke-width="3" opacity="0.5"/>`;
    return {
      k,
      css: `
        #f13-title { left:110px; top:70px; font-size:66px; }
        #f13-title span { color:${C.pain}; }
        #f13-view { left:140px; top:180px; padding:8px 20px; font-size:28px; }
        #f13-sq { left:560px; top:430px; padding:8px 18px; font-size:28px; }
        #root .f13-card { position:absolute; left:1250px; width:580px; padding:18px 22px; display:flex; gap:18px; align-items:center; }
        #root .f13-card .tx { font-size:32px; line-height:1.15; }
        #f13-ok { top:230px; border-color:${C.good} !important; }
        #f13-ok b { color:#1E9C72; }
        #f13-bad { top:450px; border-color:#D64534 !important; background:#FFF1EE !important; }
        #f13-bad b { color:#D64534; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- maca -->
      <rect x="606" y="640" width="594" height="40" rx="12" fill="#8FD3C9" ${st}/>
      <rect x="636" y="680" width="22" height="200" fill="${C.grey}" ${st}/><rect x="1150" y="680" width="22" height="200" fill="${C.grey}" ${st}/>
      <rect x="1060" y="600" width="140" height="44" rx="18" fill="#fff" ${st}/>
      <!-- Dr. Pablo de barriga pra baixo (o boneco de perfil, girado) -->
      <g id="f13-p-wrap"><g transform="translate(800,578) rotate(90) scale(1.2)">${human("f13p", "pablo")}</g></g>
      <path id="f13-arc" d="M560 610 Q510 660 560 710" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round" opacity="0"/>
      <path id="f13-arch" d="M538 698 L560 712 L568 688" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      <!-- banquinho + Vértebra -->
      <rect x="310" y="520" width="200" height="30" rx="8" fill="#C99A62" ${st}/><rect x="330" y="550" width="18" height="330" fill="#B07A4A" ${st}/><rect x="472" y="550" width="18" height="330" fill="#B07A4A" ${st}/><rect x="330" y="720" width="160" height="14" fill="#B07A4A" ${st}/>
      <g id="f13-v-wrap"><g transform="translate(410,522) scale(0.95)">${vDet(vertebra, "f13v", C, { lupa: 0 })}</g></g>
      <!-- mãos apertando a panturrilha -->
      <g id="f13-hands" opacity="0"><g transform="translate(622,552)"><g id="f13-hT">${glove}</g></g><g transform="translate(664,552)"><g id="f13-hT2">${glove}</g></g>
        <path id="f13-sql" d="M594 520 Q584 548 594 576 M694 520 Q704 548 694 576" fill="none" stroke="${C.pain}" stroke-width="6" stroke-linecap="round"/></g>
      <g id="f13-a-wrap" opacity="0"><g transform="translate(1690,1050) scale(0.75)">${aquiles("f13a")}</g></g>
    </svg>
    <div id="f13-title" class="abs title" style="opacity:0">TESTE DE <span>THOMPSON</span></div>
    <div id="f13-view" class="abs card label" style="opacity:0">visto de lado: deitado de barriga pra baixo</div>
    <div id="f13-sq" class="abs card label" style="opacity:0">aperta a panturrilha</div>
    <div id="f13-ok" class="f13-card card" style="opacity:0">
      <svg width="90" height="90" viewBox="-45 -45 90 90" style="flex:none"><circle r="38" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/><path d="M-18 0 L-4 14 L20 -14" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="tx label">O pé <b>MEXE</b>:<br>tendão <b>inteiro</b></div></div>
    <div id="f13-bad" class="f13-card card" style="opacity:0">
      <svg width="90" height="90" viewBox="-45 -45 90 90" style="flex:none"><circle r="38" fill="#D64534" stroke="${C.ink}" stroke-width="6"/><path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg>
      <div class="tx label">O pé <b>NÃO MEXE</b>:<br>suspeita de <b>RUPTURA</b><br>avaliação <b>URGENTE</b></div></div>`,
      js: function (tl, K, R) {
        const p = "f13p", v = "f13v";
        R.setPose(tl, p, 0, { shF: 0, elF: 0, shB: 0, elB: 0, hipF: 0, hipB: 0, knF: 0, knB: 0, anF: 0, anB: 0 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, p, 0.4, K.dur);
        R.setPose(tl, v, 0, { armF: -30, armB: 20 });
        R.face(tl, v, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, v, 0.6, K.dur);
        R.rise(tl, "#f13-title", Math.max(0.1, K.thom - 0.3), 0.5);
        R.fadeIn(tl, "#f13-p-wrap, #f13-v-wrap", 0, 0.3);
        R.pop(tl, "#f13-view", K.deit, 0.4);
        // aperta a panturrilha
        R.pose(tl, v, K.apert - 0.3, 0.35, { armF: -50 }, "back.out(1.6)");
        tl.set("#f13-hands", { opacity: 1 }, K.apert);
        tl.fromTo("#f13-hT, #f13-hT2", { y: -80 }, { y: 0, duration: 0.3, ease: "power2.out" }, K.apert);
        R.pop(tl, "#f13-sq", K.apert + 0.1, 0.35);
        tl.fromTo("#f13-sql", { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 5 }, K.apert + 0.3);
        tl.to("#f13-hT", { x: 8, duration: 0.15, yoyo: true, repeat: 3 }, K.apert + 0.3);
        tl.to("#f13-hT2", { x: -8, duration: 0.15, yoyo: true, repeat: 3 }, K.apert + 0.3);
        // o pé mexe = tendão inteiro
        R.pose(tl, p, K.mexe - 0.1, 0.25, { anF: 38, anB: 30 }, "power2.out");
        R.pose(tl, p, K.mexe + 0.5, 0.25, { anF: 0, anB: 0 });
        R.pose(tl, p, K.mexe + 0.9, 0.25, { anF: 38, anB: 30 }, "power2.out");
        R.pose(tl, p, K.mexe + 1.3, 0.25, { anF: 0, anB: 0 });
        tl.set("#f13-arc, #f13-arch", { opacity: 1 }, K.mexe);
        R.draw(tl, "#f13-arc", K.mexe, 0.4);
        R.slideIn(tl, "#f13-ok", K.mexe + 0.1, 0.5, 200);
        R.face(tl, v, K.inte, { eyes: "happy", mouth: "grin" });
        // se não mexe: ruptura
        R.fadeOut(tl, "#f13-sq, #f13-arc, #f13-arch", K.nao - 0.3, 0.25);
        R.slideIn(tl, "#f13-bad", K.nao - 0.1, 0.5, 200);
        R.shake(tl, "#f13-bad", K.rupt, 0.35, 6);
        R.face(tl, v, K.rupt, { eyes: "wide", mouth: "flat" });
        tl.to("#f13-bad", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.urg);
        // Aquiles: "Ufa! Estou inteiro, só cansado!"
        R.fadeOut(tl, "#f13-hands", K.a0 - 0.5, 0.25);
        R.pose(tl, v, K.a0 - 0.5, 0.3, { armF: -30 });
        R.setPose(tl, "f13a", 0, { armF: -20, armB: 20 });
        R.face(tl, "f13a", 0, { eyes: "normal", mouth: "smile" });
        tl.set("#f13a-tear", { opacity: 1 }, 0);
        tl.set("#f13-a-wrap", { opacity: 1 }, K.a0 - 0.5);
        tl.fromTo("#f13-a-wrap", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.4)" }, K.a0 - 0.5);
        R.pose(tl, "f13a", K.ufa, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, "f13a", K.ufa, { eyes: "happy" });
        R.pose(tl, "f13a", K.a1 - 0.6, 0.4, { armF: -40, armB: 40 });
        R.face(tl, p, K.ufa, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "pop", t: k.deit, vol: 0.35 },
        { name: "click", t: k.apert + 0.3, vol: 0.45 },
        { name: "ping", t: k.mexe, vol: 0.4 },
        { name: "error", t: k.nao, vol: 0.3 },
        { name: "impact-bass-2", t: k.rupt, vol: 0.35 },
        { name: "whoosh-short", t: k.a0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
