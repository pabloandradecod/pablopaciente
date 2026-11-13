// Fotos posturais: reduz no próprio celular antes de enviar.
// Lado maior de até 1568 px (o tamanho que a IA analisa sem cortar detalhe) em JPEG.
const LADO_MAX = 1568

export const VISTAS = ['Anterior', 'Posterior', 'Lateral direita', 'Lateral esquerda', 'Outra']

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

// Devolve { blob, data (base64 sem prefixo), media_type, previa }.
export async function reduzirFoto(arquivo) {
  if (!arquivo.type.startsWith('image/')) throw new Error('Escolha um arquivo de imagem.')
  const { img, url } = await carregar(arquivo)
  const escala = Math.min(1, LADO_MAX / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.round(img.naturalWidth * escala)
  const h = Math.round(img.naturalHeight * escala)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h) // o navegador já respeita a rotação da câmera (EXIF)
  URL.revokeObjectURL(url)
  const blob = await new Promise((ok) => canvas.toBlob(ok, 'image/jpeg', 0.86))
  if (!blob) throw new Error('Não consegui preparar a foto.')
  const data = canvas.toDataURL('image/jpeg', 0.86).split(',')[1]
  return { blob, data, media_type: 'image/jpeg', previa: URL.createObjectURL(blob) }
}
