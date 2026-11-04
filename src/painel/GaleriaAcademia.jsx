import { useEffect, useMemo, useState } from 'react'
import Icone from '../components/ui/Icone.jsx'
import Modal from '../components/ui/Modal.jsx'
import VideoLoop from '../components/VideoLoop.jsx'

const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Exercícios para academia: as animações da galeria (só consulta).
// São usadas no treino A/B/C de cada paciente (aba Academia da ficha), nunca na biblioteca do Dr. Pablo.
export default function GaleriaAcademia() {
  const [indice, setIndice] = useState(null)
  const [categoria, setCategoria] = useState('todas')
  const [busca, setBusca] = useState('')
  const [previa, setPrevia] = useState(null)

  useEffect(() => {
    import('../lib/galeria.json').then((m) => setIndice(m.default))
  }, [])

  const lista = useMemo(() => {
    if (!indice) return []
    const b = semAcento(busca.trim())
    return indice.itens.filter((i) => (categoria === 'todas' || i.categoria === categoria) && (!b || semAcento(i.nome).includes(b)))
  }, [indice, categoria, busca])

  if (!indice) return <p className="text-sm text-cinza-600">Carregando animações...</p>

  return (
    <div>
      <p className="mb-3 text-sm text-cinza-600">
        {indice.itens.length} animações para montar o treino A, B e C na aba <strong>Academia</strong> da ficha do paciente. Elas não entram nos
        exercícios do Dr. Pablo.
      </p>
      <div className="relative">
        <Icone nome="busca" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-400" />
        <input
          type="search"
          placeholder="Buscar animação"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="h-11 w-full rounded-xl border border-cinza-200 bg-white pl-11 pr-4 text-[15px] focus:border-petroleo focus:outline-none"
        />
      </div>
      <div className="sem-barra -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4">
        {[{ id: 'todas', nome: 'Todas' }, ...indice.categorias].map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoria(c.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold ${categoria === c.id ? 'bg-petroleo text-white' : 'bg-white text-cinza-600'}`}
          >
            {c.nome}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {lista.map((i) => (
          <button key={i.id} onClick={() => setPrevia(i)} className="overflow-hidden rounded-xl bg-white text-left">
            <img src={`/${i.capa}`} alt="" loading="lazy" className="aspect-square w-full object-contain" />
            <span className="block px-1.5 pb-1.5 text-[11px] font-semibold leading-tight">{i.nome}</span>
          </button>
        ))}
      </div>
      <Modal aberto={!!previa} aoFechar={() => setPrevia(null)} titulo={previa?.nome || ''}>
        {previa && (
          <div className="overflow-hidden rounded-2xl border border-cinza-100">
            <VideoLoop src={`/${previa.video}`} proporcao="aspect-square" />
          </div>
        )}
      </Modal>
    </div>
  )
}
