// Fotos posturais: reduz no próprio celular antes de enviar.
// Versão de 1568 px para guardar, mostrar e enviar à IA.
const LADO_MAX = 1568

// "Automática": a IA identifica a vista sozinha.
export const VISTAS = ['Automática', 'Anterior', 'Posterior', 'Lateral direita', 'Lateral esquerda', 'Teste de Adams', 'Outra']

function carregar(arquivo) {
  return new Promise((ok, falha) => {
    const url = URL.createObjectURL(arquivo)
    const img = new Image()
    img.onload = () => ok({ img, url })
    img.onerror = () => {
      URL.revokeObjectURL(url)
      falha(new Error('Não consegui abrir esta foto. Use JPG ou PNG.'))
    }
    img.src = url
  })
}

function desenhar(img, lado) {
  const escala = Math.min(1, lado / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.round(img.naturalWidth * escala)
  const h = Math.round(img.naturalHeight * escala)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h) // o navegador já respeita a rotação da câmera (EXIF)
  return canvas
}

// Devolve { blob, data (base64 sem prefixo), media_type, previa, proporcao }.
export async function reduzirFoto(arquivo) {
  if (!arquivo.type.startsWith('image/')) throw new Error('Escolha um arquivo de imagem.')
  const { img, url } = await carregar(arquivo)
  const grande = desenhar(img, LADO_MAX)
  URL.revokeObjectURL(url)
  const blob = await new Promise((ok) => grande.toBlob(ok, 'image/jpeg', 0.86))
  if (!blob) throw new Error('Não consegui preparar a foto.')
  const data = grande.toDataURL('image/jpeg', 0.86).split(',')[1]
  return { blob, data, media_type: 'image/jpeg', previa: URL.createObjectURL(blob), proporcao: grande.width / grande.height }
}
