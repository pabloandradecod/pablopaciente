# Cena: enquadra as duas posições do exercício, desenha chão, objetos, sombra e seta.
import math
from boneco import montar, figura, pontos, mv, ang, dist, COR_PERTO, AMARELO, ESCURO, L, A, R, T, J

W, H = 800, 600
FUNDO, CHAO, TAPETE = '#F5F7F7', '#DCE3E3', '#E4EFEF'

def _props_pontos(props, J1, J2):
    pts = []
    for pr in props:
        k = pr[0]
        if k == 'cadeira': x = pr[1]; pts += [(x - 22, 0), (x + 22, 95)]
        elif k == 'parede': pts += [(pr[1], 0), (pr[1], 150)]
        elif k == 'degrau': pts += [(pr[1], 0), (pr[1] + pr[2], pr[3])]
        elif k == 'cama': pts += [(pr[1], 0), (pr[2], pr[3])]
        elif k == 'bola': pts += [(pr[1] - pr[3], pr[2] - pr[3]), (pr[1] + pr[3], pr[2] + pr[3])]
        elif k == 'tapete': pts += [(pr[1], 0), (pr[2], 3)]
        elif k == 'banco': pts += [(pr[1], 0), (pr[2], pr[3])]
    return pts

def enquadrar(J1, J2, props):
    pts = pontos(J1) + pontos(J2) + _props_pontos(props, J1, J2) + [(0, 0)]
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    x0, x1 = min(xs) - 16, max(xs) + 16
    y0, y1 = min(0, min(ys)) , max(ys) + 16
    s = min(4.4, 640 / (x1 - x0), 420 / (y1 - y0))
    cx = (x0 + x1) / 2
    chao_px = 505
    def pt(p): return (W / 2 + (p[0] - cx) * s, chao_px - p[1] * s)
    return dict(s=s, pt=pt, chao=chao_px)

def desenhar_props(props, X, J_, frente=False):
    s, pt, out = X['s'], X['pt'], []
    for pr in props:
        k = pr[0]
        if (k in ('bola', 'bola_j', 'faixa', 'bastao', 'aperto', 'bastao_costas')) != frente: continue
        if k == 'tapete':
            a, b = pt((pr[1], 0)), pt((pr[2], 0))
            out.append(f'<rect x="{a[0]:.0f}" y="{a[1] - 7:.0f}" width="{b[0] - a[0]:.0f}" height="12" rx="6" fill="{TAPETE}"/>')
        elif k == 'parede':
            a, b = pt((pr[1], 0)), pt((pr[1], 170))
            lado = pr[2] if len(pr) > 2 else 1
            out.append(f'<rect x="{a[0] if lado == 1 else a[0] - 22:.0f}" y="{b[1]:.0f}" width="22" height="{a[1] - b[1]:.0f}" fill="#E6EBEB"/>')
            out.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}" stroke="#C9D3D3" stroke-width="4"/>')
        elif k == 'cadeira':
            x, f = pr[1], (pr[2] if len(pr) > 2 else 1)
            assento = 40
            for a_, b_ in [((x - 18, assento), (x + 18, assento)), ((x - 16, assento), (x - 16, 0)), ((x + 16, assento), (x + 16, 0)),
                           ((x - 18 * f, assento), (x - 18 * f, assento + 46))]:
                A_, B_ = pt(a_), pt(b_)
                out.append(f'<line x1="{A_[0]:.0f}" y1="{A_[1]:.0f}" x2="{B_[0]:.0f}" y2="{B_[1]:.0f}" stroke="#B9C6C6" stroke-width="{5 * s:.0f}" stroke-linecap="round"/>')
        elif k == 'degrau':
            a, b = pt((pr[1], pr[3])), pt((pr[1] + pr[2], 0))
            out.append(f'<rect x="{a[0]:.0f}" y="{a[1]:.0f}" width="{b[0] - a[0]:.0f}" height="{b[1] - a[1]:.0f}" rx="6" fill="#D5DEDE"/>')
        elif k == 'cama':
            a, b = pt((pr[1], pr[3])), pt((pr[2], 0))
            out.append(f'<rect x="{a[0]:.0f}" y="{a[1]:.0f}" width="{b[0] - a[0]:.0f}" height="{(b[1] - a[1]) * 0.35:.0f}" rx="10" fill="#D5DEDE"/>')
            for xx in (pr[1] + 4, pr[2] - 4):
                A_, B_ = pt((xx, pr[3] * 0.65)), pt((xx, 0))
                out.append(f'<line x1="{A_[0]:.0f}" y1="{A_[1]:.0f}" x2="{B_[0]:.0f}" y2="{B_[1]:.0f}" stroke="#C3CFCF" stroke-width="{4 * s:.0f}"/>')
        elif k == 'toalha_rolo':
            c = pt((pr[1], pr[2])); out.append(f'<ellipse cx="{c[0]:.0f}" cy="{c[1]:.0f}" rx="{9 * s:.0f}" ry="{5 * s:.0f}" fill="{AMARELO}" opacity=".85"/>')
        elif k == 'bola':
            c = pt((pr[1], pr[2])); out.append(f'<circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="{pr[3] * s:.0f}" fill="{AMARELO}" stroke="{ESCURO}" stroke-width="2.5" opacity=".95"/>')
        elif k == 'bola_j':  # bola presa a uma junta (ex.: entre os joelhos)
            b_ = J_[pr[1]]; c = pt((b_[0] + pr[2], b_[1] + pr[3]))
            out.append(f'<circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="{pr[4] * s:.0f}" fill="{AMARELO}" stroke="{ESCURO}" stroke-width="2.5"/>')
        elif k == 'bastao_costas':  # cabo de vassoura encostado nas costas (cabeça, escápulas e bumbum)
            a_, b_ = J_['pelvis'], J_['cabeca']; an = ang(a_, b_)
            p1 = mv(mv(a_, an, -14), an + 90 * pr[1], 17); p2 = mv(mv(b_, an, 12), an + 90 * pr[1], 15)
            A_, B_ = pt(p1), pt(p2)
            out.append(f'<line x1="{A_[0]:.0f}" y1="{A_[1]:.0f}" x2="{B_[0]:.0f}" y2="{B_[1]:.0f}" stroke="#A0703C" stroke-width="{3 * s:.0f}" stroke-linecap="round"/>')
        elif k == 'banco':  # assento visto de frente
            a, b = pt((pr[1], pr[3])), pt((pr[2], 0))
            out.append(f'<rect x="{a[0]:.0f}" y="{a[1]:.0f}" width="{b[0] - a[0]:.0f}" height="{6 * s:.0f}" rx="5" fill="#B9C6C6"/>')
            for xx in (pr[1] + 3, pr[2] - 3):
                A_, B_ = pt((xx, pr[3])), pt((xx, 0))
                out.append(f'<line x1="{A_[0]:.0f}" y1="{A_[1]:.0f}" x2="{B_[0]:.0f}" y2="{B_[1]:.0f}" stroke="#B9C6C6" stroke-width="{5 * s:.0f}" stroke-linecap="round"/>')
        elif k == 'faixa':   # toalha/faixa ligando duas juntas
            a, b = pt(J_[pr[1]]), pt(J_[pr[2]])
            out.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}" stroke="{AMARELO}" stroke-width="{3.2 * s:.0f}" stroke-linecap="round"/>')
        elif k == 'bastao':  # cabo de vassoura passando pelas mãos
            m = J_['maoN']; a_ = mv(m, pr[1], pr[2]); b_ = mv(m, pr[1] + 180, pr[3])
            a, b = pt(a_), pt(b_)
            out.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}" stroke="#A0703C" stroke-width="{3 * s:.0f}" stroke-linecap="round"/>')
        elif k == 'aperto':  # anéis de força (isometria) numa junta
            c = pt(J_[pr[1]])
            for r_ in (10, 16):
                out.append(f'<circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="{r_ * s:.0f}" fill="none" stroke="{AMARELO}" stroke-width="3" opacity="{.95 if r_ == 10 else .5}"/>')
    return ''.join(out)

def seta(p1, p2, X, curva=0.25):
    a, b = X['pt'](p1), X['pt'](p2)
    d = math.hypot(b[0] - a[0], b[1] - a[1])
    if d < 14: return ''
    # encurta as pontas e curva para fora
    ux, uy = (b[0] - a[0]) / d, (b[1] - a[1]) / d
    a = (a[0] + ux * 16, a[1] + uy * 16); b = (b[0] - ux * 14, b[1] - uy * 14)
    mx, my = (a[0] + b[0]) / 2 - uy * d * curva, (a[1] + b[1]) / 2 + ux * d * curva
    # ponta da seta na direção da tangente final
    tx, ty = b[0] - mx, b[1] - my; tn = math.hypot(tx, ty) or 1; tx, ty = tx / tn, ty / tn
    h1 = (b[0] - tx * 18 - ty * 11, b[1] - ty * 18 + tx * 11); h2 = (b[0] - tx * 18 + ty * 11, b[1] - ty * 18 - tx * 11)
    return (f'<path d="M{a[0]:.1f},{a[1]:.1f} Q{mx:.1f},{my:.1f} {b[0]:.1f},{b[1]:.1f}" fill="none" stroke="{ESCURO}" stroke-width="9" stroke-linecap="round" opacity=".18"/>'
            f'<path d="M{a[0]:.1f},{a[1]:.1f} Q{mx:.1f},{my:.1f} {b[0]:.1f},{b[1]:.1f}" fill="none" stroke="{AMARELO}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 11"/>'
            f'<path d="M{h1[0]:.1f},{h1[1]:.1f} L{b[0]:.1f},{b[1]:.1f} L{h2[0]:.1f},{h2[1]:.1f}" fill="none" stroke="{AMARELO}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')

def selo(texto, cor_fundo, cor_texto):
    w = 26 + len(texto) * 12.4
    x0 = W - 28 - w  # canto direito: o link do paciente mostra o contador "1/5" no canto esquerdo
    return (f'<rect x="{x0:.0f}" y="26" width="{w:.0f}" height="44" rx="22" fill="{cor_fundo}"/>'
            f'<text x="{x0 + w / 2:.0f}" y="55" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="21" font-weight="800" fill="{cor_texto}">{texto}</text>')

def svg(conteudo):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{conteudo}</svg>'

def cena(ex):
    """ex: dict(inicio=pose, fim=pose, props=[...], seta=[junta,...], aperto=junta?, props_fim=[...])"""
    J1, J2 = montar(ex['inicio']), montar(ex['fim'])
    props = ex.get('props', [])
    X = enquadrar(J1, J2, props + ex.get('props_fim', []))
    base = f'<rect width="{W}" height="{H}" fill="{FUNDO}"/><rect y="{X["chao"]}" width="{W}" height="{H - X["chao"]}" fill="#ECF0F0"/><line x1="0" y1="{X["chao"]}" x2="{W}" y2="{X["chao"]}" stroke="{CHAO}" stroke-width="4"/>'
    img1 = base + desenhar_props(props, X, J1) + figura(J1, X) + desenhar_props(props, X, J1, frente=True) + selo('1 · Posição inicial', '#E1EEEE', COR_PERTO)
    setas = ''.join(seta(J1[j], J2[j], X, ex.get('curva', 0.25)) for j in ex.get('seta', []))
    props2 = props + ex.get('props_fim', [])
    img2 = (base + desenhar_props(props2, X, J2) + figura(J1, X, op=0.2) + figura(J2, X) + desenhar_props(props2, X, J2, frente=True)
            + setas + selo('2 · Movimento', AMARELO, ESCURO))
    return svg(img1), svg(img2)
