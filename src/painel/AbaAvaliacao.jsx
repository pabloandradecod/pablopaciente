import { useEffect, useState } from 'react'
import { definirRelatorioVisivel, listarCampos, listarRelatorios, salvarAvaliacao, ultimaAvaliacao } from '../lib/api.js'
import TextoRelatorio from '../components/TextoRelatorio.jsx'
import Icone from '../components/ui/Icone.jsx'
import GerarExercicios from './GerarExercicios.jsx'
import { formatarData, formatarDataHora, hojeISO } from '../lib/datas.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import { Campo } from '../components/ui/Campo.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import CampoAvaliacao from './CampoAvaliacao.jsx'
import AnalisePostural from './AnalisePostural.jsx'

export default function AbaAvaliacao({ pacienteId, paciente }) {
  const [campos, setCampos] = useState(null)
  const [av, setAv] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState('')
  const [versaoRel, setVersaoRel] = useState(0) // recarrega os relatórios depois de salvar a análise postural

  useEffect(() => {
    Promise.all([listarCampos(), ultimaAvaliacao(pacienteId)])
      .then(([c, a]) => {
        setCampos(c)
        setAv(a || { paciente_id: pacienteId, data: hojeISO(), respostas: {} })
      })
      .catch((e) => setMsg(e.message))
  }, [pacienteId])

  if (!campos || !av) return msg ? <p className="text-sm text-alerta">{msg}</p> : <Carregando />

  const definir = (chave, valor) => {
    setMsg('')
    setAv((a) => ({ ...a, respostas: { ...a.respostas, [chave]: valor } }))
  }

  async function salvar() {
    setSalvando(true)
    setMsg('')
    try {
      const { id, paciente_id, data, respostas } = av
      const salvo = await salvarAvaliacao({ ...(id ? { id } : {}), paciente_id, data, respostas })
      setAv(salvo)
      setMsg('Avaliação salva.')
    } catch (e) {
      setMsg(e.message)
    }
    setSalvando(false)
  }

  function novaReavaliacao() {
    if (!confirm('Criar uma nova avaliação? A anterior fica guardada e o link passa a mostrar a nova.')) return
    setAv({ paciente_id: pacienteId, data: hojeISO(), respostas: {} })
    setMsg('')
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-5">
        <div className="flex items-end justify-between gap-3">
          <Campo id="data-av" type="date" rotulo="Data da avaliação" value={av.data} onChange={(e) => setAv((a) => ({ ...a, data: e.target.value }))} className="w-48" />
          {av.id && (
            <Botao variante="fantasma" tamanho="sm" onClick={novaReavaliacao}>Nova reavaliação</Botao>
          )}
        </div>
        {campos.map((c) => (
          <div key={c.id}>
            <CampoAvaliacao campo={c} valor={av.respostas?.[c.chave]} onChange={(v) => definir(c.chave, v)} />
            {!c.visivel_paciente && <p className="mt-1 text-xs text-cinza-600">Não aparece no link do paciente.</p>}
          </div>
        ))}
      </Card>
      <div className="flex items-center gap-3">
        <Botao onClick={salvar} carregando={salvando} icone="check">Salvar avaliação</Botao>
        {msg && <span className={`text-sm font-medium ${msg.includes('salva') ? 'text-ok' : 'text-alerta'}`}>{msg}</span>}
      </div>
      {av.id && <p className="text-xs text-cinza-600">Avaliação de {formatarData(av.data)}. Os campos podem ser ajustados em Ajustes.</p>}
      {paciente && <GerarExercicios key={av.id || 'nova'} paciente={paciente} campos={campos} avaliacao={av} aoSalvar={() => setVersaoRel((v) => v + 1)} />}
      <Relatorios key={versaoRel} pacienteId={pacienteId} />
    </div>
  )
}

function Relatorios({ pacienteId }) {
  const [lista, setLista] = useState([])
  useEffect(() => {
    listarRelatorios(pacienteId).then(setLista).catch(() => {})
  }, [pacienteId])
  // A análise postural mais recente fica em destaque na ficha.
  const postural = lista.find((r) => r.resposta?.postura)
  return (
    <>
    {postural && (
      <Card>
        <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="camera" tamanho={18} /> Análise postural</h2>
        <p className="mb-3 mt-1 text-xs text-cinza-600">Feita pelas fotos em {formatarDataHora(postural.criado_em)}. Toque numa foto para ampliar.</p>
        <label className="mb-3 flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
          <input
            type="checkbox"
            checked={Boolean(postural.visivel_paciente)}
            onChange={async (e) => {
              const v = e.target.checked
              setLista((l) => l.map((r) => (r.id === postural.id ? { ...r, visivel_paciente: v } : r)))
              await definirRelatorioVisivel(postural.id, v).catch(() => {})
            }}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]"
          />
          <span>
            <strong>Mostrar no link do paciente</strong>
            <span className="block text-xs text-cinza-600">Ele vê as fotos com as marcações, as medidas e os achados, e o PDF dele inclui a análise.</span>
          </span>
        </label>
        <AnalisePostural postura={postural.resposta.postura} fotos={postural.fotos || []} marcacoes={postural.resposta.marcacoes || []} />
      </Card>
    )}
    <Card>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="conversa" tamanho={18} /> Relatórios do assistente</h2>
        <Botao para={`/painel?paciente=${pacienteId}`} tamanho="sm" variante="secundario">Nova avaliação</Botao>
      </div>
      <p className="mt-1 text-xs text-cinza-600">Só você vê. Não aparecem no link do paciente.</p>
      {lista.length === 0 && <p className="mt-3 text-sm text-cinza-600">Nenhum relatório ainda.</p>}
      <div className="mt-3 space-y-2">
        {lista.map((r) => (
          <details key={r.id} className="rounded-xl border border-cinza-100 p-3">
            <summary className="cursor-pointer text-sm font-semibold">
              {formatarDataHora(r.criado_em)}
              {r.resposta?.alertas?.length > 0 && <span className="ml-2 rounded bg-alerta-claro px-1.5 py-0.5 text-[11px] font-bold text-alerta">alerta</span>}
            </summary>
            {r.resposta?.postura && r !== postural && (
              <div className="mt-3 rounded-2xl bg-cinza-50 p-3"><AnalisePostural postura={r.resposta.postura} fotos={r.fotos || []} marcacoes={r.resposta.marcacoes || []} /></div>
            )}
            <div className="mt-3"><TextoRelatorio texto={r.relatorio} /></div>
          </details>
        ))}
      </div>
    </Card>
    </>
  )
}
