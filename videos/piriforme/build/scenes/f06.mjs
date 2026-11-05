// F6 — O vizinho famoso: o nervo ciático passa logo abaixo do piriforme (às vezes por dentro); músculo incha e aperta
import { pelvis, PIRI_R, PIRI_L } from "./f05.mjs";
const ink = "#013E4C";

export default {
  speakers: { nervo: "f06n" },
  tail: 1.0,
  build(ctx) {
    const { C, piriforme, nerve, smooth, w, lines } = ctx;
    const k = {
      prob: w(0, "problema"), ciat: w(0, "ciático"), colad: w(0, "coladinho"), emb: w(0, "embaixo"), alg: w(0, "algumas"), dentro: w(0, "dentro"),
      tenso: w(0, "tenso"), inch: w(0, "inchado"), irrit: w(0, "irritado"), aperta: w(0, "aperta"), viz: w(0, "vizinho"),
      n0: lines[1].start, n1: lines[1].end,
    };
    const nPts = [[1300, 720], [1390, 720], [1480, 720], [1570, 720], [1660, 720], [1750, 720], [1850, 720]];
    const nSq = [[1300, 795], [1390, 795], [1480, 803], [1575, 816], [1670, 803], [1760, 795], [1850, 795]];
    k.sq = smooth(nSq);
    const st = `stroke="${ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const sciaR = "M672 450 Q700 500 760 560 Q792 620 796 700 Q800 790 796 860";
    const sciaL = "M568 450 Q540 500 480 560 Q448 620 444 700 Q440 790 444 860";
    const mini = (id, x, title, through) => `<g id="${id}" opacity="0"><g transform="translate(${x},90)">
        <rect width="300" height="300" rx="24" fill="#fff" ${st}/>
        <text x="150" y="48" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${ink}">${title[0]}</text>
        <text x="150" y="80" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${through ? "#E2574C" : C.good}">${title[1]}</text>
        ${through ? "" : `<path d="M40 220 Q150 230 260 250" fill="none" stroke="${ink}" stroke-width="26" stroke-linecap="round"/><path d="M40 220 Q150 230 260 250" fill="none" stroke="${C.nerve}" stroke-width="16" stroke-linecap="round"/>`}
        <ellipse cx="150" cy="168" rx="110" ry="38" fill="#F2766B" ${st} transform="rotate(8 150 168)"/>
        ${through ? `<path d="M40 150 Q150 172 260 196" fill="none" stroke="${ink}" stroke-width="26" stroke-linecap="round"/><path d="M40 150 Q150 172 260 196" fill="none" stroke="${C.nerve}" stroke-width="16" stroke-linecap="round"/><ellipse cx="150" cy="140" rx="96" ry="16" fill="#F2766B" opacity="0.9" transform="rotate(8 150 140)"/>` : ""}
      </g></g>`;
    return {
      k,
      css: `
        #f06-title { left:110px; top:50px; font-size:58px; }
        #f06-title span { color:#C99A00; }
        #root .f06-tag { padding:6px 18px; font-size:32px; border-radius:16px; border:6px solid ${ink}; background:#fff; white-space:nowrap; }
        #f06-sw { left:280px; top:880px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1210" height="1080" fill="${C.wall}"/>
      <line x1="1210" y1="0" x2="1210" y2="1080" stroke="${ink}" stroke-width="7"/>
      <rect x="1210" y="880" width="710" height="200" fill="${C.floor}"/>
      <line x1="1210" y1="880" x2="1920" y2="880" stroke="${ink}" stroke-width="7"/>
      <g id="f06-diag">
        ${pelvis("f06", C)}
        <!-- nervos (por baixo do músculo) -->
        <path d="${sciaL}" fill="none" stroke="${ink}" stroke-width="30" stroke-linecap="round" opacity="0.5"/><path d="${sciaL}" fill="none" stroke="${C.nerve}" stroke-width="18" stroke-linecap="round" opacity="0.5"/>
        <path id="f06-sco" d="${sciaR}" fill="none" stroke="${ink}" stroke-width="34" stroke-linecap="round"/>
        <path id="f06-sci" d="${sciaR}" fill="none" stroke="${C.nerve}" stroke-width="22" stroke-linecap="round"/>
        <path d="${PIRI_L}" fill="#F2766B" opacity="0.5" ${st}/>
        <g id="f06-piri"><path id="f06-pirip" d="${PIRI_R}" fill="#F2766B" ${st}/>
          <path d="M690 390 Q800 440 900 535 M680 430 Q780 470 890 548" stroke="#C94C42" stroke-width="5" fill="none" stroke-linecap="round"/>
          <g id="f06-angry" opacity="0"><path d="M752 432 L772 444 M812 452 L792 456" stroke="${ink}" stroke-width="7" stroke-linecap="round"/><circle cx="768" cy="456" r="6" fill="${ink}"/><circle cx="798" cy="466" r="6" fill="${ink}"/></g>
        </g>
        <g id="f06-heat" opacity="0">${[[700, 520], [760, 600], [790, 690]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="${C.pain}" stroke="#fff" stroke-width="4"/>`).join("")}</g>
        <g id="f06-arrow" opacity="0"><path d="M960 700 L780 570" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/><path d="M790 604 L774 566 L816 562" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>
      </g>
      <!-- painel direito -->
      ${mini("f06-mini1", 1250, ["NA MAIORIA:", "passa por BAIXO"], false)}
      ${mini("f06-mini2", 1580, ["EM ALGUMAS:", "passa por DENTRO"], true)}
      <g id="f06-chars" opacity="0">
        <g transform="translate(1575,880) scale(0.75)">${piriforme("f06m")}</g>
        ${nerve("f06n", [[1300, 795], [1390, 795], [1480, 795], [1575, 795], [1670, 795], [1760, 795], [1850, 795]], 30)}
        <g id="f06-hug" opacity="0"><path d="M1495 781 Q1575 856 1655 781" fill="none" stroke="${ink}" stroke-width="36" stroke-linecap="round"/><path d="M1495 781 Q1575 856 1655 781" fill="none" stroke="#F2766B" stroke-width="24" stroke-linecap="round"/></g>
      </g>
    </svg>
    <div id="f06-title" class="abs title" style="opacity:0">O vizinho <span>famoso</span></div>
    <div id="f06-t-sci" class="abs f06-tag label" style="left:830px;top:760px;opacity:0">nervo ciático</div>
    <div id="f06-t-sw" class="abs f06-tag label" style="left:860px;top:300px;opacity:0;background:${C.pain};color:#fff">tenso · inchado · irritado</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-title", 0.1, 0.45);
        // o nervo se desenha ao ser citado
        R.draw(tl, "#f06-sco, #f06-sci", K.ciat - 0.1, 0.9);
        R.pop(tl, "#f06-t-sci", K.colad, 0.35);
        // seta mostrando "logo embaixo"
        tl.set("#f06-arrow", { opacity: 1 }, K.emb);
        tl.fromTo("#f06-arrow", { x: 60 }, { x: 0, duration: 0.3, ease: "back.out(2)", yoyo: true, repeat: 3 }, K.emb);
        tl.to("#f06-arrow", { opacity: 0, duration: 0.25 }, K.alg);
        // variações
        R.pop(tl, "#f06-mini1", K.alg - 0.1, 0.45);
        R.pop(tl, "#f06-mini2", K.dentro - 0.2, 0.45);
        R.shake(tl, "#f06-mini2", K.dentro + 0.4, 0.3, 4);
        // tenso, inchado, irritado
        tl.to("#f06-mini1, #f06-mini2", { opacity: 0, duration: 0.3 }, K.tenso - 0.3);
        tl.to("#f06-piri", { scale: 1.08, svgOrigin: "790 460", duration: 0.35, ease: "back.out(2)" }, K.tenso);
        tl.to("#f06-piri", { scale: 1.18, svgOrigin: "790 460", duration: 0.35, ease: "back.out(2)" }, K.inch);
        tl.to("#f06-pirip", { attr: { fill: "#E0463C" }, duration: 0.3 }, K.inch);
        tl.set("#f06-angry", { opacity: 1 }, K.irrit);
        R.shake(tl, "#f06-piri", K.irrit, 0.4, 3);
        R.pop(tl, "#f06-t-sw", K.tenso, 0.4);
        // aperta o vizinho: nervo fica vermelho
        tl.to("#f06-sci", { attr: { stroke: "#FF5A4E" }, duration: 0.3 }, K.aperta);
        tl.set("#f06-heat", { opacity: 1 }, K.aperta);
        tl.fromTo("#f06-heat circle", { scale: 0.5, transformOrigin: "50% 50%" }, { scale: 1.2, duration: 0.25, stagger: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.aperta);
        // personagens: o Piriforme abraça e o Nervo reclama
        R.fadeIn(tl, "#f06-chars", K.viz - 0.6, 0.4);
        R.setPose(tl, "f06m", 0, { armF: 0, armB: 0 });
        R.face(tl, "f06m", 0, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f06n", 0, { eyes: "normal", mouth: "smile" });
        tl.set("#f06m-armF, #f06m-armB", { opacity: 0 }, K.viz - 0.1);
        tl.set("#f06-hug", { opacity: 1 }, K.viz - 0.1);
        tl.fromTo("#f06-hug", { scaleY: 0.2, svgOrigin: "1575 781" }, { scaleY: 1, svgOrigin: "1575 781", duration: 0.3, ease: "back.out(2)" }, K.viz - 0.1);
        R.nerveTo(tl, "f06n", K.viz + 0.1, 0.3, K.sq);
        R.face(tl, "f06n", K.n0 - 0.2, { eyes: "pain" });
        R.shake(tl, "#f06n-face", K.n0, K.n1 - K.n0, 4);
        R.face(tl, "f06m", K.n1 + 0.1, { eyes: "wide", mouth: "flat" });
      },
      sfx: [
        { name: "whoosh-short", t: k.ciat - 0.1, vol: 0.4 },
        { name: "pop", t: k.alg, vol: 0.4 },
        { name: "pop", t: k.dentro - 0.15, vol: 0.4 },
        { name: "pop", t: k.tenso, vol: 0.3 },
        { name: "impact-bass-1", t: k.inch, vol: 0.35 },
        { name: "glitch-1", t: k.aperta, vol: 0.3, dur: 0.5 },
        { name: "pop", t: k.viz, vol: 0.4 },
      ],
    };
  },
};
