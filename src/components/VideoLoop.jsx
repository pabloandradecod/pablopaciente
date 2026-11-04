import Icone from './ui/Icone.jsx'

// Vídeo curto em loop: autoplay, mudo e inline (necessário no iPhone).
export default function VideoLoop({ src, className = '', proporcao = 'aspect-[4/3]' }) {
  if (!src) {
    return (
      <div className={`flex ${proporcao} w-full flex-col items-center justify-center gap-1 bg-petroleo-claro text-petroleo/60 ${className}`}>
        <Icone nome="video" tamanho={28} />
        <span className="text-xs font-semibold">Vídeo em breve</span>
      </div>
    )
  }
  return (
    <video
      key={src}
      src={src}
      className={`${proporcao} w-full bg-white object-contain ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controls={false}
    />
  )
}
