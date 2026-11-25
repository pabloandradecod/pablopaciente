# Desenhos dos exercícios

Gera as imagens `public/fotos-exercicios/desenho-<slug>-1.webp` (posição inicial) e `-2.webp` (movimento).

- `boneco.py`: boneco articulado (ângulos, alvos e cinemática inversa).
- `poses.py`: posições base (deitado, de bruços, quatro apoios, em pé, sentado...).
- `cena.py`: objetos (cadeira, parede, degrau, bola, toalha...), seta e selo.
- `catalogo.py`: a cena de cada exercício. Para um exercício novo, acrescente uma entrada aqui.

```bash
python3 scripts/desenhos/gerar.py /tmp/svg            # ou: gerar.py /tmp/svg <slug> <slug>
node scripts/desenhos/rasterizar.cjs /tmp/svg /tmp/png
for f in /tmp/png/*.png; do ffmpeg -y -i "$f" -c:v libwebp -quality 82 "public/fotos-exercicios/desenho-$(basename "$f" .png).webp"; done
```
