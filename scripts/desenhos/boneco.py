# Motor de desenho dos exercícios: boneco com proporções anatômicas em vista lateral (ou frontal),
# posições definidas por ângulos absolutos (graus; 0 = direita, 90 = cima) ou por alvos (cinemática inversa).
import math, copy

L = dict(tronco=50, pescoco=6, cabeca=9.5, braco=27, antebraco=25, coxa=42, perna=40, pe=11)
LARG = dict(tronco=18, braco=8.5, antebraco=7.5, coxa=13, perna=10, pe=6, pescoco=7)
COR_PERTO, COR_LONGE = '#0E5C62', '#86B5B8'
AMARELO, ESCURO = '#F4C542', '#0A4247'

def rad(a): return math.radians(a)
def mv(p, a, l): return (p[0] + l * math.cos(rad(a)), p[1] + l * math.sin(rad(a)))
def ang(p, q): return math.degrees(math.atan2(q[1] - p[1], q[0] - p[0]))
def dist(p, q): return math.hypot(q[0] - p[0], q[1] - p[1])

# ---- especificações de membro
def A(a1, a2, pe=None, e1=1, e2=1): return dict(tipo='a', a1=a1, a2=a2, pe=pe, e1=e1, e2=e2)
def R(a1, a2, pe=None): return dict(tipo='r', a1=a1, a2=a2, pe=pe)            # relativo ao tronco
def T(x, y, lado='cima', pe=None, e1=1, e2=1): return dict(tipo='t', alvo=(x, y), lado=lado, pe=pe, e1=e1, e2=e2)
def J(junta, dx=0, dy=0, lado='cima', pe=None): return dict(tipo='j', junta=junta, dx=dx, dy=dy, lado=lado, pe=pe)

def ik(raiz, alvo, l1, l2, lado):
    d = max(1e-6, min(dist(raiz, alvo), l1 + l2 - 0.05))
    base = ang(raiz, alvo)
    c = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)
    a = math.degrees(math.acos(max(-1, min(1, c))))
    op = [mv(raiz, base + a, l1), mv(raiz, base - a, l1)]
    crit = {'cima': lambda p: p[1], 'baixo': lambda p: -p[1], 'dir': lambda p: p[0], 'esq': lambda p: -p[0]}[lado]
    j = max(op, key=crit)
    fim = mv(j, ang(j, alvo), l2)
    return j, fim

def membro(raiz, spec, l1, l2, T_ang, juntas):
    t = spec['tipo']
    if t in ('a', 'r'):
        a1 = spec['a1'] + (T_ang if t == 'r' else 0)
        a2 = spec['a2'] + (T_ang if t == 'r' else 0)
        j = mv(raiz, a1, l1 * spec.get('e1', 1)); f = mv(j, a2, l2 * spec.get('e2', 1))
        return j, f
    if t == 'j':
        b = juntas[spec['junta']]
        alvo = (b[0] + spec['dx'], b[1] + spec['dy'])
        return ik(raiz, alvo, l1, l2, spec['lado'])
    j, f = ik(raiz, spec['alvo'], l1 * spec.get('e1', 1), l2 * spec.get('e2', 1), spec['lado'])
    return j, f

def montar(p):
    """Calcula as juntas de uma pose."""
    p = copy.deepcopy(p)
    vista = p.get('vista', 'lado')
    Tg = p['T']
    pel = p['pelvis']
    S = mv(pel, Tg, L['tronco'] * p.get('e_tronco', 1))
    cab = mv(S, p.get('H', Tg), L['pescoco'] + L['cabeca'])
    J_ = dict(pelvis=pel, ombro=S, cabeca=cab)
    if vista == 'frente':
        J_['ombroN'], J_['ombroF'] = mv(S, Tg - 90, 15), mv(S, Tg + 90, 15)
        J_['quadrilN'], J_['quadrilF'] = mv(pel, Tg - 90, 9), mv(pel, Tg + 90, 9)
    else:
        J_['ombroN'] = J_['ombroF'] = S
        J_['quadrilN'] = J_['quadrilF'] = pel
    f = p.get('f', 1)
    ordem = [('pF', 'quadrilF', 'joelhoF', 'tornF', 'coxa', 'perna'), ('pN', 'quadrilN', 'joelhoN', 'tornN', 'coxa', 'perna'),
             ('bF', 'ombroF', 'cotoveloF', 'maoF', 'braco', 'antebraco'), ('bN', 'ombroN', 'cotoveloN', 'maoN', 'braco', 'antebraco')]
    pes = {}
    for chave, raiz, jn, fn, l1, l2 in ordem:
        spec = p[chave]
        j, fim = membro(J_[raiz], spec, L[l1] * p.get('e_' + l1, 1), L[l2] * p.get('e_' + l2, 1), Tg, J_)
        J_[jn], J_[fn] = j, fim
        if chave[0] == 'p':
            pa = spec.get('pe')
            if pa is None: pa = 0 if f == 1 else 180
            pes[chave[1]] = pa
    J_['peN'] = mv(J_['tornN'], pes['N'], L['pe'] * p.get('e_pe', 1))
    J_['peF'] = mv(J_['tornF'], pes['F'], L['pe'] * p.get('e_pe', 1))
    J_['_p'] = p
    return J_

# ---- desenho SVG
def seg(a, b, w, cor, op=1):
    return f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{cor}" stroke-width="{w:.1f}" stroke-linecap="round" opacity="{op}"/>'

def figura(J_, tela, op=1.0):
    p = J_['_p']; X = tela
    vista = p.get('vista', 'lado')
    s = X['s']
    def q(n): return X['pt'](J_[n])
    out = []
    longe = COR_PERTO if vista == 'frente' else COR_LONGE
    def braco(lado, cor):
        out.append(seg(q('ombro' + lado), q('cotovelo' + lado), LARG['braco'] * s, cor, op))
        out.append(seg(q('cotovelo' + lado), q('mao' + lado), LARG['antebraco'] * s, cor, op))
        m = q('mao' + lado); out.append(f'<circle cx="{m[0]:.1f}" cy="{m[1]:.1f}" r="{4.6 * s:.1f}" fill="{cor}" opacity="{op}"/>')
    def perna(lado, cor):
        out.append(seg(q('quadril' + lado), q('joelho' + lado), LARG['coxa'] * s, cor, op))
        out.append(seg(q('joelho' + lado), q('torn' + lado), LARG['perna'] * s, cor, op))
        out.append(seg(q('torn' + lado), q('pe' + lado), LARG['pe'] * s, cor, op))
    if vista == 'frente':
        perna('F', longe); perna('N', COR_PERTO)
        pts = [q('ombroN'), q('ombroF'), q('quadrilF'), q('quadrilN')]
        d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + ' Z'
        out.append(f'<path d="{d}" fill="{COR_PERTO}" stroke="{COR_PERTO}" stroke-width="{12 * s:.1f}" stroke-linejoin="round" opacity="{op}"/>')
        braco('F', longe); braco('N', COR_PERTO)
    else:
        braco('F', longe); perna('F', longe)
        out.append(seg(q('pelvis'), q('ombro'), LARG['tronco'] * s, COR_PERTO, op))
        pv = q('pelvis'); out.append(f'<circle cx="{pv[0]:.1f}" cy="{pv[1]:.1f}" r="{10.5 * s:.1f}" fill="{COR_PERTO}" opacity="{op}"/>')
        perna('N', COR_PERTO)
    # pescoço e cabeça
    out.append(seg(q('ombro'), X['pt'](mv(J_['ombro'], ang(J_['ombro'], J_['cabeca']), L['pescoco'])), LARG['pescoco'] * s, COR_PERTO, op))
    c = q('cabeca'); out.append(f'<circle cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="{L["cabeca"] * s:.1f}" fill="{COR_PERTO}" opacity="{op}"/>')
    ro = p.get('rosto')
    if ro is not None:  # nariz: mostra para onde o rosto aponta
        n = X['pt'](mv(J_['cabeca'], ro, L['cabeca'] - 0.5))
        out.append(f'<circle cx="{n[0]:.1f}" cy="{n[1]:.1f}" r="{2.9 * s:.1f}" fill="{COR_PERTO}" opacity="{op}"/>')
    if vista == 'frente' and p.get('giro') is not None:  # rosto girando (vista de frente)
        g = p['giro']
        n = X['pt']((J_['cabeca'][0] + g * 7.5, J_['cabeca'][1] - 1.5))
        out.append(f'<circle cx="{n[0]:.1f}" cy="{n[1]:.1f}" r="{3.2 * s:.1f}" fill="#E1EEEE" opacity="{op}"/>')
    if vista != 'frente':
        braco('N', COR_PERTO)
    return ''.join(out)

def pontos(J_):
    return [v for k, v in J_.items() if not k.startswith('_')]
