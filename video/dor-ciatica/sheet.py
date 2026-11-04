import sys, glob
from PIL import Image
d = sys.argv[1]
fs = sorted(glob.glob(d + '/t_*.jpg'))
for k in range(0, len(fs), 9):
    ims = [Image.open(f).resize((640, 360)) for f in fs[k:k+9]]
    rows = (len(ims) + 2) // 3
    S = Image.new('RGB', (1920, rows * 360), 'black')
    for i, im in enumerate(ims): S.paste(im, ((i % 3) * 640, (i // 3) * 360))
    S.save(f'{d}/sheet{k//9}.jpg', quality=85)
print(len(fs))
