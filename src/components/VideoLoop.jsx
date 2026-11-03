import Icone from './ui/Icone.jsx'

// Vídeo curto em loop: autoplay, mudo e inline (necessário no iPhone).
export default function VideoLoop({ src, className = '' }) {
  if (!src) {
    return (
      <div className={`flex aspect-video w-full flex-col items-center justify-center gap-1 bg-petroleo-claro text-petroleo/60 ${className}`}>
        <Icone nome="video" tamanho={28} />
        <span className="text-xs font-semibold">Vídeo em breve</span>
      </div>
    )
  }
  return (
    <video
      src={src}
      className={`aspect-video w-full bg-cinza-100 object-cover ${className}`}
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
