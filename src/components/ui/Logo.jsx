// Logo oficial (imagem). `claro` usa a versão branca sobre fundo escuro.
export default function Logo({ claro = false, altura = 40, className = '' }) {
  return (
    <img
      src={claro ? '/marca/logo-completa-branca.webp' : '/marca/logo-completa.webp'}
      alt="Quiropraxia Dr. Pablo Andrade"
      style={{ height: altura, width: 'auto' }}
      className={`select-none ${className}`}
      draggable="false"
    />
  )
}

export function Simbolo({ tamanho = 40, className = '' }) {
  return <img src="/marca/simbolo.webp" alt="" aria-hidden="true" style={{ height: tamanho, width: 'auto' }} className={className} draggable="false" />
}
