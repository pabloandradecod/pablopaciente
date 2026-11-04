import { useEffect, useMemo, useState } from 'react'
import Modal from '../components/ui/Modal.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import VideoLoop from '../components/VideoLoop.jsx'

const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Galeria de animações de exercícios (arquivos em /public/galeria).
 * modo "unico": escolhe uma animação para um exercício.
 * modo "varios": marca várias e adiciona todas à biblioteca.
 */
export default function Galeria({ aberto, aoFechar, modo = 'unico', aoEscolher, jaUsados = [] }) {
  const [indice, setIndice] = useState(null)
  const [categoria, setCategoria] = useState('todas')
  const [busca, setBusca] = useState('')
  const [marcados, setMarcados] = useState([])
  const [previa, setPrevia] = useState(null)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (aberto && !indice) import('../lib/galeria.json').then((m) => setIndice(m.default))
    if (aberto) {
      setMarcados([])
      setPrevia(null)
    }
  }, [aberto, indice])

  const usados = useMemo(() => new Set(jaUsados), [jaUsados])
  const lista = useMemo(() => {
    if (!indice) return []
    const b = semAcento(busca.trim())
    return indice.itens.filter((i) => (categoria === 'todas' || i.categoria === categoria) && (!b || semAcento(i.nome).includes(b)))
  }, [indice, categoria, busca])

  const tocar = (item) => {
    if (modo === 'unico') return setPrevia(item)
    setMarcados((m) => (m.some((x) => x.id === item.id) ? m.filter((x) => x.id !== item.id) : [...m, item]))
  }

  return (
    <Modal aberto={aberto} aoFechar={aoFechar} titulo={modo === 'unico' ? 'Escolher animação' : 'Adicionar da galeria'} largura="max-w-3xl">
      {!indice ? (
        <p className="text-sm text-cinza-600">Carregando galeria...</p>
      ) : previa ? (
        <div>
          <div className="overflow-hidden rounded-2xl border border-cinza-100">
            <VideoLoop src={`/${previa.video}`} proporcao="aspect-square" />
          </div>
          <p className="mt-3 font-bold">{previa.nome}</p>
          <div className="mt-4 flex gap-2">
            <Botao variante="secundario" onClick={() => setPrevia(null)} icone="voltar">Voltar</Botao>
            <Botao className="flex-1" icone="check" onClick={() => aoEscolher(previa)}>Usar esta animação</Botao>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <Icone nome="busca" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-400" />
            <input
              type="search"
              placeholder="Buscar animação"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="h-11 w-full rounded-xl border border-cinza-200 pl-11 pr-4 text-[15px] focus:border-petroleo focus:outline-none"
            />
          </div>
          <div className="sem-barra -mx-5 mt-3 flex gap-1.5 overflow-x-auto px-5">
            {[{ id: 'todas', nome: 'Todas' }, ...indice.categorias].map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoria(c.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold ${categoria === c.id ? 'bg-petroleo text-white' : 'bg-cinza-100 text-cinza-600'}`}
              >
                {c.nome}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-cinza-600">{lista.length} animações{modo === 'varios' ? '. Toque para marcar.' : '. Toque para ver em movimento.'}</p>
          <div className="mt-2 grid max-h-[52vh] grid-cols-3 gap-2 overflow-y-auto pb-2 sm:grid-cols-4">
            {lista.map((i) => {
              const marcado = marcados.some((x) => x.id === i.id)
              const usado = usados.has(i.video)
              return (
                <button
                  key={i.id}
                  onClick={() => tocar(i)}
                  aria-pressed={marcado}
                  className={`relative overflow-hidden rounded-xl border-2 bg-white text-left transition ${marcado ? 'border-petroleo' : 'border-transparent hover:border-cinza-200'}`}
                >
                  <img src={`/${i.capa}`} alt="" loading="lazy" className="aspect-square w-full object-contain" />
                  <span className="block px-1.5 pb-1.5 text-[11px] font-semibold leading-tight text-tinta">{i.nome}</span>
                  {marcado && (
                    <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-petroleo text-white">
                      <Icone nome="check" tamanho={14} espessura={2.5} />
                    </span>
                  )}
                  {usado && !marcado && (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-destaque px-1.5 py-0.5 text-[10px] font-bold text-petroleo-escuro">Na biblioteca</span>
                  )}
                </button>
              )
            })}
          </div>
          {modo === 'varios' && (
            <Botao
              bloco
              tamanho="lg"
              className="mt-3"
              disabled={marcados.length === 0}
              carregando={enviando}
              icone="mais"
              onClick={async () => {
                setEnviando(true)
                await aoEscolher(marcados)
                setEnviando(false)
              }}
            >
              {marcados.length ? `Adicionar ${marcados.length} à biblioteca` : 'Marque as animações'}
            </Botao>
          )}
        </>
      )}
    </Modal>
  )
}
