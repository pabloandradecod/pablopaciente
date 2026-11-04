import { useEffect, useRef, useState } from 'react'

// Ditado por voz do navegador (pt-BR). Funciona melhor no Chrome/Android.
export function useDitado(aoTexto) {
  const [ouvindo, setOuvindo] = useState(false)
  const [parcial, setParcial] = useState('')
  const rec = useRef(null)
  const Reconhecimento = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

  useEffect(() => () => rec.current?.abort?.(), [])

  function iniciar() {
    if (!Reconhecimento) return
    const r = new Reconhecimento()
    r.lang = 'pt-BR'
    r.continuous = true
    r.interimResults = true
    r.onresult = (e) => {
      let final = ''
      let temp = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) final += t
        else temp += t
      }
      if (final) aoTexto(final.trim())
      setParcial(temp)
    }
    r.onend = () => {
      setOuvindo(false)
      setParcial('')
    }
    r.onerror = () => setOuvindo(false)
    rec.current = r
    r.start()
    setOuvindo(true)
  }

  function parar() {
    rec.current?.stop()
  }

  return { suportado: Boolean(Reconhecimento), ouvindo, parcial, iniciar, parar }
}
