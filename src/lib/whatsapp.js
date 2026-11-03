export const WHATSAPP_CONSULTORIO = '5535998732804'

// Normaliza número brasileiro para o formato do wa.me (55 + DDD + número).
export function normalizarWhatsapp(numero = '') {
  const digitos = numero.replace(/\D/g, '')
  if (!digitos) return ''
  return digitos.startsWith('55') && digitos.length >= 12 ? digitos : `55${digitos}`
}

export function linkWhatsapp(numero, mensagem) {
  const n = normalizarWhatsapp(numero)
  return `https://wa.me/${n}?text=${encodeURIComponent(mensagem)}`
}

export function abrirWhatsapp(numero, mensagem) {
  window.open(linkWhatsapp(numero, mensagem), '_blank', 'noopener,noreferrer')
}

export function formatarTelefone(numero = '') {
  let d = numero.replace(/\D/g, '')
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2)
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return numero
}
