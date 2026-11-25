# Posições básicas (cabeça à direita nas posições deitadas; de frente para a direita em pé e sentado).
import copy
from boneco import A, R, T, J

def _m(base, **kw):
    p = copy.deepcopy(base); p.update(kw); return p

def costas(joelhos=True, **kw):
    p = dict(pelvis=(0, 10), T=0, H=0, rosto=90, f=1,
             bN=A(182, 180), bF=A(182, 180),
             pN=T(-46, 4, 'cima', pe=180) if joelhos else A(180, 180, pe=90),
             pF=T(-46, 4, 'cima', pe=180) if joelhos else A(180, 180, pe=90))
    return _m(p, **kw)

def brucos(**kw):
    p = dict(pelvis=(0, 10), T=0, H=0, rosto=270, f=1, bN=A(182, 180), bF=A(182, 180),
             pN=A(180, 180, pe=200), pF=A(180, 180, pe=200))
    return _m(p, **kw)

def quatro(**kw):
    p = dict(pelvis=(0, 46), T=8, H=-8, rosto=285, f=1, bN=T(52, 3, 'dir'), bF=T(52, 3, 'dir'),
             pN=A(270, 180, pe=180), pF=A(270, 180, pe=180))
    return _m(p, **kw)

def em_pe(**kw):
    p = dict(pelvis=(0, 84), T=90, H=90, rosto=0, f=1, bN=A(272, 276), bF=A(268, 272),
             pN=A(270, 270, pe=0), pF=A(270, 270, pe=0))
    return _m(p, **kw)

def sentado(**kw):
    p = dict(pelvis=(0, 44), T=92, H=92, rosto=0, f=1, bN=T(32, 50, 'baixo'), bF=T(28, 50, 'baixo'),
             pN=A(2, 270, pe=0), pF=A(0, 270, pe=0))
    return _m(p, **kw)

def de_lado(**kw):  # deitado de lado, visto de frente (perna de cima = perto)
    p = dict(pelvis=(0, 15), T=0, H=4, rosto=None, f=1, bN=A(186, 180), bF=A(4, 4),
             pN=A(181, 180, pe=200), pF=A(179, 180, pe=200))
    return _m(p, **kw)

def ajoelhado_meio(**kw):  # semiajoelhado: joelho de trás no chão, pé da frente à frente
    p = dict(pelvis=(0, 46), T=90, H=90, rosto=0, f=1, bN=A(272, 276), bF=A(268, 272),
             pN=T(40, 2, 'cima', pe=0), pF=A(268, 182, pe=150))
    return _m(p, **kw)

def prancha(**kw):  # prancha nos antebraços
    p = dict(pelvis=(1.3, 20.7), T=13, H=8, rosto=280, f=1, bN=A(270, 0), bF=A(270, 0),
             pN=A(193, 193, pe=270), pF=A(193, 193, pe=270))
    return _m(p, **kw)

def em_pe_frente(**kw):
    p = dict(pelvis=(0, 84), T=90, H=90, rosto=None, vista='frente', f=1, e_pe=0.55,
             bN=A(272, 270), bF=A(268, 270), pN=A(270, 270, pe=330), pF=A(270, 270, pe=210))
    return _m(p, **kw)

def sentado_frente(**kw):
    p = dict(pelvis=(0, 53), T=90, H=90, rosto=None, vista='frente', f=1, e_coxa=0.25, e_pe=0.5,
             bN=T(16, 50, 'dir'), bF=T(-16, 50, 'esq'), pN=A(272, 270, pe=330), pF=A(268, 270, pe=210))
    return _m(p, **kw)

def chao_sentado(**kw):  # sentado no chão, pernas esticadas, de frente para a direita
    p = dict(pelvis=(0, 10), T=90, H=90, rosto=0, f=1, bN=T(30, 16, 'baixo'), bF=T(26, 16, 'baixo'),
             pN=A(0, 0, pe=90), pF=A(1, 0, pe=90))
    return _m(p, **kw)
