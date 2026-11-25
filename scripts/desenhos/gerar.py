import sys, os, traceback
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cena import cena
from catalogo import TODOS
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
so = set(sys.argv[2:])
for e in TODOS:
    if so and e['slug'] not in so: continue
    try:
        a, b = cena(e['cena'])
        open(f"{out}/{e['slug']}-1.svg", 'w').write(a); open(f"{out}/{e['slug']}-2.svg", 'w').write(b)
    except Exception as ex:
        print('ERRO', e['slug'], repr(ex)); traceback.print_exc(limit=2)
