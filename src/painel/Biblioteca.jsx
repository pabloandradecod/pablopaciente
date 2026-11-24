import { useEffect, useState } from 'react'
import { enviarFotoExercicio, enviarVideo, excluirExercicio, listarExercicios, removerFotoExercicio, removerVideo, salvarExercicio, urlFoto, urlVideo } from '../lib/api.js'
import MidiaExercicio from '../components/MidiaExercicio.jsx'
import VideoGuiado, { ehVideoGuiado } from '../components/VideoGuiado.jsx'
import { reduzirFoto } from '../lib/fotos.js'
import GaleriaAcademia from './GaleriaAcademia.jsx'
import Botao from '../components/ui/Botao.jsx'
import { AreaTexto, Campo, Rotulo } from '../components/ui/Campo.jsx'
import Icone from '../components/ui/Icone.jsx'
import Modal from '../components/ui/Modal.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import VideoLoop from '../components/VideoLoop.jsx'

const VAZIO = { nome: '', instrucoes: '', series_padrao: 3, reps_padrao: '10', video_path: null, fotos: [], ativo: true }

export default function Biblioteca() {
  const [lista, setLista] = useState(null)
  const [edicao, setEdicao] = useState(null)
  const [arquivo, setArquivo] = useState(null)
  const [novasFotos, setNovasFotos] = useState([]) // [{ blob, previa }]
  const [removidas, setRemovidas] = useState([])
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [aba, setAba] = useState('pablo') // 'pablo' | 'academia'

  const carregar = () => listarExercicios({ incluirInativos: true }).then(setLista).catch((e) => setErro(e.message))
  useEffect(() => {
    carregar()
  }, [])

  function abrir(ex) {
    setEdicao(ex ? { ...ex, fotos: ex.fotos || [] } : { ...VAZIO })
    setArquivo(null)
    setNovasFotos([])
    setRemovidas([])
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
      // Fotos novas vão para o bucket; as tiradas da lista são apagadas depois de salvar.
      const caminhos = []
      for (const f of novasFotos) caminhos.push(await enviarFotoExercicio(f.blob))
      dados.fotos = [...(dados.fotos || []), ...caminhos]
      await salvarExercicio(dados)
      for (const c of removidas) await removerFotoExercicio(c)
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
      for (const c of edicao.fotos || []) await removerFotoExercicio(c)
      setEdicao(null)
      carregar()
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-petroleo-escuro">Exercícios</h1>
      <div className="my-4 grid grid-cols-2 gap-1 rounded-2xl bg-cinza-100 p-1">
        {[
          ['pablo', 'Exercícios do Dr. Pablo'],
          ['academia', 'Exercícios para academia']
        ].map(([id, rotulo]) => (
          <button key={id} onClick={() => setAba(id)} className={`rounded-xl px-2 py-2.5 text-sm font-bold ${aba === id ? 'bg-white text-petroleo shadow-sm' : 'text-cinza-600'}`}>
            {rotulo}
          </button>
        ))}
      </div>

      {aba === 'academia' ? (
        <GaleriaAcademia />
      ) : (
      <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-cinza-600">Sua biblioteca, com as fotos e os vídeos que você grava. É daqui que sai a prescrição terapêutica dos pacientes.</p>
        <Botao icone="mais" onClick={() => abrir(null)}>Novo</Botao>
      </div>

      {!lista && <Carregando />}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lista?.map((ex) => (
          <button key={ex.id} onClick={() => abrir(ex)} className={`overflow-hidden rounded-2xl border border-cinza-100 bg-white text-left transition hover:border-petroleo/30 ${ex.ativo ? '' : 'opacity-60'}`}>
            <MidiaExercicio video={ex.video_path} fotos={ex.fotos} proporcao="aspect-[4/3]" nome={ex.nome} estatico />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{ex.nome}</span>
                {!ex.ativo && <span className="rounded-full bg-cinza-100 px-2 py-0.5 text-xs font-semibold text-cinza-600">Inativo</span>}
                {ex.ativo && ex.crise_ordem != null && <span className="shrink-0 rounded-full bg-destaque-claro px-2 py-0.5 text-xs font-semibold text-petroleo-escuro">Crise</span>}
                {ex.ativo && !ex.video_path && !ex.fotos?.length && <span className="rounded-full bg-alerta-claro px-2 py-0.5 text-xs font-semibold text-alerta">Sem foto</span>}
                {ex.ativo && !ex.video_path && ex.fotos?.length > 0 && (
                  <span className="shrink-0 rounded-full bg-petroleo-claro px-2 py-0.5 text-xs font-semibold text-petroleo">{ex.fotos.length} {ex.fotos.length === 1 ? 'foto' : 'fotos'}</span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-cinza-600">{ex.series_padrao} {Number(ex.series_padrao) === 1 ? "série" : "séries"} × {ex.reps_padrao}</div>
            </div>
          </button>
        ))}
      </div>
      </>
      )}

      <Modal aberto={!!edicao} aoFechar={() => setEdicao(null)} titulo={edicao?.id ? 'Editar exercício' : 'Novo exercício'}>
        {edicao && (
          <form onSubmit={salvar} className="space-y-4">
            <Campo id="ex-nome" rotulo="Nome" required value={edicao.nome} onChange={(e) => setEdicao({ ...edicao, nome: e.target.value })} />
            <div>
              <Rotulo dica="(10 a 20 s, vertical, até 50 MB)">Vídeo em loop</Rotulo>
              {(arquivo || edicao.video_path) && (
                <div className="mb-2 overflow-hidden rounded-xl">
                  {!arquivo && ehVideoGuiado(edicao.video_path) ? (
                    <VideoGuiado caminho={edicao.video_path} nome={edicao.nome} />
                  ) : (
                    <VideoLoop src={arquivo ? URL.createObjectURL(arquivo) : urlVideo(edicao.video_path)} />
                  )}
                </div>
              )}
              <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-cinza-200 text-sm font-semibold text-petroleo hover:bg-petroleo-claro">
                <Icone nome="upload" tamanho={18} />
                <span className="truncate">{arquivo ? arquivo.name : edicao.video_path ? 'Trocar vídeo' : 'Enviar vídeo'}</span>
                <input type="file" accept="video/*" className="hidden" onChange={(e) => setArquivo(e.target.files?.[0] || null)} />
              </label>
            </div>
            <div>
              <Rotulo dica="(início e fim do movimento; alternam sozinhas)">Fotos</Rotulo>
              {(edicao.fotos.length > 0 || novasFotos.length > 0) && (
                <div className="mb-2 grid grid-cols-3 gap-2">
                  {edicao.fotos.map((c) => (
                    <div key={c} className="relative overflow-hidden rounded-xl bg-cinza-50">
                      <img src={urlFoto(c)} alt="" className="aspect-[4/3] w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => {
                          setEdicao({ ...edicao, fotos: edicao.fotos.filter((x) => x !== c) })
                          setRemovidas((r) => [...r, c])
                        }}
                        aria-label="Remover foto"
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white"
                      >
                        <Icone nome="x" tamanho={12} />
                      </button>
                    </div>
                  ))}
                  {novasFotos.map((f, k) => (
                    <div key={f.previa} className="relative overflow-hidden rounded-xl bg-cinza-50 ring-2 ring-destaque">
                      <img src={f.previa} alt="" className="aspect-[4/3] w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setNovasFotos((l) => l.filter((_, i) => i !== k))}
                        aria-label="Remover foto nova"
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white"
                      >
                        <Icone nome="x" tamanho={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-cinza-200 text-sm font-semibold text-petroleo hover:bg-petroleo-claro">
                <Icone nome="camera" tamanho={18} />
                Adicionar fotos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const arqs = [...(e.target.files || [])]
                    e.target.value = ''
                    for (const a of arqs) {
                      try {
                        const f = await reduzirFoto(a)
                        setNovasFotos((l) => [...l, { blob: f.blob, previa: f.previa }])
                      } catch (err) {
                        setErro(err.message)
                      }
                    }
                  }}
                />
              </label>
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
            <label className="flex items-start gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={edicao.crise_ordem != null}
                onChange={(e) => setEdicao({ ...edicao, crise_ordem: e.target.checked ? 50 : null })}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]"
              />
              <span>
                Rotina para dias de crise
                <span className="block text-xs font-normal text-cinza-600">Aparece no link de todos os pacientes quando pedem retorno e na seção de exercícios.</span>
              </span>
            </label>
            {erro && <p className="text-sm font-medium text-alerta">{erro}</p>}
            <div className="flex gap-2">
              <Botao type="submit" className="flex-1" carregando={salvando}>Salvar</Botao>
              {edicao.id && <Botao type="button" variante="secundario" onClick={excluir} aria-label="Excluir"><Icone nome="lixo" /></Botao>}
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
