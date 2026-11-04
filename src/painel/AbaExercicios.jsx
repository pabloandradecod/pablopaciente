import { useEffect, useState } from 'react'
import { adicionarPrescricao, atualizarPrescricao, listarExercicios, listarPrescricao, removerPrescricao } from '../lib/api.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Modal from '../components/ui/Modal.jsx'
import Carregando from '../components/ui/Carregando.jsx'

export default function AbaExercicios({ pacienteId }) {
  const [itens, setItens] = useState(null)
  const [biblioteca, setBiblioteca] = useState([])
  const [adicionando, setAdicionando] = useState(false)
  const [erro, setErro] = useState('')

  const carregar = () => listarPrescricao(pacienteId).then(setItens).catch((e) => setErro(e.message))
  useEffect(() => {
    carregar()
    listarExercicios().then(setBiblioteca).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacienteId])

  if (!itens) return erro ? <p className="text-sm text-alerta">{erro}</p> : <Carregando />

  const usados = new Set(itens.map((i) => i.exercicio_id))
  // Só exercícios com animação podem ser prescritos.
  // Só a biblioteca do Dr. Pablo (as animações da galeria ficam na aba Academia).
  const disponiveis = biblioteca.filter((e) => !usados.has(e.id) && !String(e.video_path || '').startsWith('galeria/'))

  async function adicionar(ex) {
    await adicionarPrescricao({
      paciente_id: pacienteId,
      exercicio_id: ex.id,
      series: ex.series_padrao,
      reps: ex.reps_padrao,
      ordem: itens.length + 1
    })
    setAdicionando(false)
    carregar()
  }

  async function atualizar(id, campo, valor) {
    setItens((l) => l.map((i) => (i.id === id ? { ...i, [campo]: valor } : i)))
  }
  async function persistir(item) {
    try {
      await atualizarPrescricao(item.id, { series: Number(item.series) || 1, reps: item.reps || '1', observacao: item.observacao || null })
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-petroleo-escuro">Exercícios do Dr. Pablo</h2>
          <p className="text-xs text-cinza-600">Prescrição terapêutica para casa. O treino com animações fica na aba Academia.</p>
        </div>
        <Botao icone="mais" onClick={() => setAdicionando(true)}>Adicionar</Botao>
      </div>
      {erro && <p className="text-sm text-alerta">{erro}</p>}

      {itens.length === 0 && (
        <div className="rounded-2xl border border-dashed border-cinza-200 bg-white p-8 text-center text-sm text-cinza-600">
          Nenhum exercício prescrito.
        </div>
      )}

      <ul className="space-y-2">
        {itens.map((i) => (
          <li key={i.id} className="rounded-2xl border border-cinza-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold">
                {i.exercicios?.nome}
                {!i.exercicios?.video_path && <span className="ml-2 rounded bg-alerta-claro px-1.5 py-0.5 text-[11px] font-bold text-alerta">sem vídeo</span>}
              </div>
              <button
                onClick={async () => {
                  await removerPrescricao(i.id)
                  carregar()
                }}
                className="rounded-lg p-1 text-cinza-600 hover:bg-cinza-100"
                aria-label="Remover exercício"
              >
                <Icone nome="x" tamanho={18} />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-[90px_1fr] gap-2">
              <label className="text-xs font-semibold text-cinza-600">
                Séries
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={i.series}
                  onChange={(e) => atualizar(i.id, 'series', e.target.value)}
                  onBlur={() => persistir(i)}
                  className="mt-1 h-10 w-full rounded-lg border border-cinza-200 px-2 text-sm text-tinta"
                />
              </label>
              <label className="text-xs font-semibold text-cinza-600">
                Repetições / tempo
                <input
                  value={i.reps}
                  onChange={(e) => atualizar(i.id, 'reps', e.target.value)}
                  onBlur={() => persistir(i)}
                  className="mt-1 h-10 w-full rounded-lg border border-cinza-200 px-2 text-sm text-tinta"
                />
              </label>
            </div>
            <input
              placeholder="Observação para este paciente (opcional)"
              value={i.observacao || ''}
              onChange={(e) => atualizar(i.id, 'observacao', e.target.value)}
              onBlur={() => persistir(i)}
              className="mt-2 h-10 w-full rounded-lg border border-cinza-200 px-2 text-sm"
            />
          </li>
        ))}
      </ul>

      <Modal aberto={adicionando} aoFechar={() => setAdicionando(false)} titulo="Adicionar exercício">
        {disponiveis.length === 0 ? (
          <p className="text-sm text-cinza-600">Todos os exercícios da biblioteca já foram adicionados.</p>
        ) : (
          <ul className="space-y-2">
            {disponiveis.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => adicionar(e)}
                  className="flex w-full items-center justify-between rounded-xl border border-cinza-200 p-3 text-left hover:border-petroleo"
                >
                  <span>
                    <span className="block font-semibold">{e.nome}</span>
                    <span className="text-xs text-cinza-600">
                      {e.series_padrao} séries × {e.reps_padrao}
                      {!e.video_path && <span className="ml-1.5 font-semibold text-alerta">· sem vídeo</span>}
                    </span>
                  </span>
                  <Icone nome="mais" className="text-petroleo" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  )
}
