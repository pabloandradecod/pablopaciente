import { useEffect, useState } from 'react'
import { urlFoto, urlVideo } from '../lib/api.js'
import VideoLoop from './VideoLoop.jsx'
import VideoGuiado, { ehVideoGuiado } from './VideoGuiado.jsx'
import Icone from './ui/Icone.jsx'

const semMovimento = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Fotos do exercício: alternam sozinhas (início e fim do movimento), como uma animação curta.
// A proporção segue a primeira foto (entre 3:4 e 16:9), para não cortar nem sobrar espaço.
export function FotosExercicio({ fotos, className = '', intervalo = 1600, nome = '', proporcaoFixa = '' }) {
  const [atual, setAtual] = useState(0)
  const [proporcao, setProporcao] = useState(4 / 3)
  const [parado, setParado] = useState(semMovimento())
  const urls = fotos.map(urlFoto).filter(Boolean)

  useEffect(() => {
    if (urls.length < 2 || parado) return
    const t = setInterval(() => setAtual((a) => (a + 1) % urls.length), intervalo)
    return () => clearInterval(t)
  }, [urls.length, parado, intervalo])

  if (!urls.length) return null
  return (
    <div className={`relative w-full overflow-hidden bg-cinza-50 ${proporcaoFixa} ${className}`} style={proporcaoFixa ? undefined : { aspectRatio: proporcao }}>
      {urls.map((u, i) => (
        <img
          key={u}
          src={u}
          alt={i === 0 ? nome : ''}
          loading="lazy"
          onLoad={i === 0 ? (e) => setProporcao(Math.min(16 / 9, Math.max(3 / 4, e.currentTarget.naturalWidth / e.currentTarget.naturalHeight))) : undefined}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${i === atual ? 'opacity-100' : 'opacity-0'}`}
          draggable={false}
        />
      ))}
      {urls.length > 1 && (
        <div className="nao-imprimir absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/85 px-2 py-1.5 shadow-sm">
          {urls.map((u, i) => (
            <button
              key={u}
              type="button"
              aria-label={`Foto ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation()
                setAtual(i)
                setParado(true)
              }}
              className={`h-2 rounded-full transition-all ${i === atual ? 'w-5 bg-petroleo' : 'w-2 bg-petroleo/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Mídia de um exercício do Dr. Pablo: vídeo (se houver), senão fotos, senão aviso.
export default function MidiaExercicio({ video, fotos = [], proporcao = 'aspect-[4/3]', className = '', nome = '', estatico = false }) {
  if (video && ehVideoGuiado(video) && estatico) {
    return (
      <div className={`relative ${proporcao} w-full overflow-hidden bg-petroleo-escuro ${className}`}>
        <img src={`/${video.replace(/\.mp4$/, '.webp')}`} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-bold text-white">
          <Icone nome="video" tamanho={12} /> Vídeo do Dr. Pablo
        </span>
      </div>
    )
  }
  if (video && ehVideoGuiado(video)) return <VideoGuiado caminho={video} nome={nome} className={className} />
  if (video) return <VideoLoop src={urlVideo(video)} proporcao={proporcao} className={className} />
  if (fotos?.length) return <FotosExercicio fotos={fotos} className={className} nome={nome} proporcaoFixa={proporcao} />
  return (
    <div className={`flex ${proporcao} w-full flex-col items-center justify-center gap-1 bg-petroleo-claro text-petroleo/60 ${className}`}>
      <Icone nome="camera" tamanho={26} />
      <span className="text-xs font-semibold">Foto em breve</span>
    </div>
  )
}
