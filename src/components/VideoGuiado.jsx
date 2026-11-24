import { useRef, useState } from 'react'
import Icone from './ui/Icone.jsx'

// Vídeo guiado do Dr. Pablo (Protocolo Postura Livre): explicação narrada, legendas e dicas na tela.
// Mostra a capa com o botão de play; ao tocar, toca com som e controles (um de cada vez na página).
export function ehVideoGuiado(caminho) {
  return String(caminho || '').startsWith('videos-exercicios/')
}

export default function VideoGuiado({ caminho, nome = '', className = '', compacto = false }) {
  const [tocando, setTocando] = useState(false)
  const video = useRef(null)
  const src = `/${caminho}`
  const capa = `/${caminho.replace(/\.mp4$/, '.webp')}`

  function tocar(e) {
    e.stopPropagation()
    // Pausa outro vídeo guiado que esteja tocando.
    document.querySelectorAll('video[data-guiado]').forEach((v) => v !== video.current && v.pause())
    setTocando(true)
  }

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-petroleo-escuro ${className}`}>
      {tocando ? (
        <video ref={video} data-guiado src={src} poster={capa} className="h-full w-full object-contain" controls autoPlay playsInline preload="auto" />
      ) : (
        <button type="button" onClick={tocar} className="group absolute inset-0 h-full w-full" aria-label={`Ver o vídeo: ${nome}`}>
          <img src={capa} alt="" loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <span
            className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-petroleo shadow-lg transition group-hover:scale-105 ${compacto ? 'h-10 w-10' : 'h-16 w-16'}`}
          >
            <svg viewBox="0 0 24 24" className={compacto ? 'ml-0.5 h-5 w-5' : 'ml-1 h-8 w-8'} fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>
          </span>
          {!compacto && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
              <Icone nome="video" tamanho={14} /> Vídeo com a explicação do Dr. Pablo
            </span>
          )}
        </button>
      )}
    </div>
  )
}
