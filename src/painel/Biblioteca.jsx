import { useEffect, useState } from 'react'
import { criarExercicios, enviarVideo, excluirExercicio, listarExercicios, removerVideo, salvarExercicio, urlVideo } from '../lib/api.js'
import Galeria from './Galeria.jsx'
import Botao from '../components/ui/Botao.jsx'
import { AreaTexto, Campo, Rotulo } from '../components/ui/Campo.jsx'
import Icone from '../components/ui/Icone.jsx'
import Modal from '../components/ui/Modal.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import VideoLoop from '../components/VideoLoop.jsx'

const VAZIO = { nome: '', instrucoes: '', series_padrao: 3, reps_padrao: '10', video_path: null, ativo: true }

export default function Biblioteca() {
  const [lista, setLista] = useState(null)
  const [edicao, setEdicao] = useState(null)
  const [arquivo, setArquivo] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [galeria, setGaleria] = useState(null) // null | 'unico' | 'varios'

  const carregar = () => listarExercicios({ incluirInativos: true }).then(setLista).catch((e) => setErro(e.message))
  useEffect(() => {
    carregar()
  }, [])

  function abrir(ex) {
    setEdicao(ex ? { ...ex } : { ...VAZIO })
    setArquivo(null)
    setErro('')
  }

  async function salvar(e) {
    e.preventDefault()
    setSalvando(true)
    setErro('')
    try {
      const dados = { ...edicao, series_padrao: Number(edicao.series_padrao) || 1 }
      delete dados.criado_em
      if (arquivo) {
        if (arquivo.size > 50 * 1024 * 1024) throw new Error('Vídeo acima de 50 MB. Grave de 10 a 20 segundos, em 1080p ou 720p.')
        const antigo = dados.video_path
        dados.video_path = await enviarVideo(arquivo)
        await removerVideo(antigo)
      }
      await salvarExercicio(dados)
      setEdicao(null)
      carregar()
    } catch (err) {
      setErro(err.message)
    }
    setSalvando(false)
  }

  async function excluir() {
    if (!confirm(`Excluir "${edicao.nome}"?`)) return
    try {
      await excluirExercicio(edicao.id)
      await removerVideo(edicao.video_path)
      setEdicao(null)
      carregar()
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-petroleo-escuro">Exercícios</h1>
          <p className="text-sm text-cinza-600">Sua biblioteca. Na ficha de cada paciente você escolhe e ajusta.</p>
        </div>
        <div className="flex gap-2">
          <Botao variante="secundario" icone="video" onClick={() => setGaleria('varios')}>Galeria</Botao>
          <Botao icone="mais" onClick={() => abrir(null)}>Novo</Botao>
        </div>
      </div>

      {!lista && <Carregando />}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lista?.map((ex) => (
          <button key={ex.id} onClick={() => abrir(ex)} className={`overflow-hidden rounded-2xl border border-cinza-100 bg-white text-left transition hover:border-petroleo/30 ${ex.ativo ? '' : 'opacity-60'}`}>
            <VideoLoop src={urlVideo(ex.video_path)} />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{ex.nome}</span>
                {!ex.ativo && <span className="rounded-full bg-cinza-100 px-2 py-0.5 text-xs font-semibold text-cinza-600">Inativo</span>}
                {ex.ativo && !ex.video_path && <span className="rounded-full bg-alerta-claro px-2 py-0.5 text-xs font-semibold text-alerta">Sem vídeo</span>}
              </div>
              <div className="mt-0.5 text-xs text-cinza-600">{ex.series_padrao} séries × {ex.reps_padrao}</div>
            </div>
          </button>
        ))}
      </div>

      <Modal aberto={!!edicao} aoFechar={() => setEdicao(null)} titulo={edicao?.id ? 'Editar exercício' : 'Novo exercício'}>
        {edicao && (
          <form onSubmit={salvar} className="space-y-4">
            <Campo id="ex-nome" rotulo="Nome" required value={edicao.nome} onChange={(e) => setEdicao({ ...edicao, nome: e.target.value })} />
            <div>
              <Rotulo dica="(10 a 20 s, vertical, até 50 MB)">Vídeo em loop</Rotulo>
              {(arquivo || edicao.video_path) && (
                <div className="mb-2 overflow-hidden rounded-xl">
                  <VideoLoop src={arquivo ? URL.createObjectURL(arquivo) : urlVideo(edicao.video_path)} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGaleria('unico')}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-cinza-200 text-sm font-semibold text-petroleo hover:bg-petroleo-claro"
                >
                  <Icone nome="video" tamanho={18} />
                  Da galeria
                </button>
                <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-cinza-200 text-sm font-semibold text-petroleo hover:bg-petroleo-claro">
                  <Icone nome="upload" tamanho={18} />
                  <span className="truncate">{arquivo ? arquivo.name : 'Enviar vídeo'}</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => setArquivo(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>
            <AreaTexto id="ex-inst" rotulo="Instruções" rows={4} value={edicao.instrucoes} onChange={(e) => setEdicao({ ...edicao, instrucoes: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Campo id="ex-series" type="number" min="1" max="20" rotulo="Séries padrão" value={edicao.series_padrao} onChange={(e) => setEdicao({ ...edicao, series_padrao: e.target.value })} />
              <Campo id="ex-reps" rotulo="Repetições padrão" placeholder="10 ou 30 s" value={edicao.reps_padrao} onChange={(e) => setEdicao({ ...edicao, reps_padrao: e.target.value })} />
            </div>
            <label className="flex items-center gap-3 text-sm font-medium">
              <input type="checkbox" checked={edicao.ativo} onChange={(e) => setEdicao({ ...edicao, ativo: e.target.checked })} className="h-5 w-5 accent-[#0E5C62]" />
              Ativo (aparece para prescrever)
            </label>
            {erro && <p className="text-sm font-medium text-alerta">{erro}</p>}
            <div className="flex gap-2">
              <Botao type="submit" className="flex-1" carregando={salvando}>Salvar</Botao>
              {edicao.id && <Botao type="button" variante="secundario" onClick={excluir} aria-label="Excluir"><Icone nome="lixo" /></Botao>}
            </div>
          </form>
        )}
      </Modal>
      <Galeria
        aberto={!!galeria}
        modo={galeria || 'unico'}
        jaUsados={(lista || []).map((e) => e.video_path).filter(Boolean)}
        aoFechar={() => setGaleria(null)}
        aoEscolher={async (escolha) => {
          if (galeria === 'unico') {
            setArquivo(null)
            setEdicao((ed) => ({ ...ed, video_path: escolha.video, nome: ed.nome || escolha.nome }))
            setGaleria(null)
            return
          }
          try {
            await criarExercicios(
              escolha.map((i) => ({ nome: i.nome, video_path: i.video, instrucoes: '', series_padrao: 3, reps_padrao: '12' }))
            )
            setGaleria(null)
            carregar()
          } catch (err) {
            setErro(err.message)
          }
        }}
      />
    </div>
  )
}
