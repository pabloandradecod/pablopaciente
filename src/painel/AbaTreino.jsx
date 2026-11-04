import { useEffect, useState } from 'react'
import { assistenteDisponivel, chamarAssistente, lerTreino, listarPrescricao, salvarTreino, ultimaAvaliacao } from '../lib/api.js'
import { montarEsquemaTreino, montarMensagemTreino, montarSistemaTreino, treinosDaResposta } from '../lib/assistente.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'
import { AreaTexto } from '../components/ui/Campo.jsx'
import Galeria from './Galeria.jsx'

const VAZIO = () => ['A', 'B', 'C'].map((letra) => ({ letra, foco: '', itens: [] }))

// Sugestão de treino A/B/C (academia), só com exercícios da galeria de animações.
export default function AbaTreino({ paciente }) {
  const [treinos, setTreinos] = useState(null)
  const [observacao, setObservacao] = useState('')
  const [ativo, setAtivo] = useState('A')
  const [galeriaPara, setGaleriaPara] = useState(null) // letra que recebe o exercício
  const [diretriz, setDiretriz] = useState('')
  const [api, setApi] = useState(false)
  const [gerando, setGerando] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState('')
  const [custo, setCusto] = useState(null)

  useEffect(() => {
    lerTreino(paciente.id)
      .then((t) => {
        const base = VAZIO()
        for (const x of t?.treinos || []) {
          const i = base.findIndex((b) => b.letra === x.letra)
          if (i >= 0) base[i] = { ...base[i], ...x }
        }
        setTreinos(base)
        setObservacao(t?.observacao || '')
      })
      .catch((e) => setMsg(e.message))
    assistenteDisponivel().then(setApi)
  }, [paciente.id])

  if (!treinos) return msg ? <p className="text-sm text-alerta">{msg}</p> : <Carregando />

  const atual = treinos.find((t) => t.letra === ativo)
  const mudarTreino = (letra, campos) => setTreinos((l) => l.map((t) => (t.letra === letra ? { ...t, ...campos } : t)))
  const mudarItem = (letra, idx, campo, valor) =>
    setTreinos((l) => l.map((t) => (t.letra === letra ? { ...t, itens: t.itens.map((it, k) => (k === idx ? { ...it, [campo]: valor } : it)) } : t)))
  const removerItem = (letra, idx) => setTreinos((l) => l.map((t) => (t.letra === letra ? { ...t, itens: t.itens.filter((_, k) => k !== idx) } : t)))
  const moverItem = (letra, idx, dir) =>
    setTreinos((l) =>
      l.map((t) => {
        if (t.letra !== letra) return t
        const itens = [...t.itens]
        const j = idx + dir
        if (j < 0 || j >= itens.length) return t
        ;[itens[idx], itens[j]] = [itens[j], itens[idx]]
        return { ...t, itens }
      })
    )

  async function gerar() {
    if (treinos.some((t) => t.itens.length) && !confirm('Gerar de novo substitui o treino atual (A, B e C). Continuar?')) return
    setGerando(true)
    setMsg('')
    try {
      const [galeria, avaliacaoAnterior, prescricao] = await Promise.all([
        import('../lib/galeria.json').then((m) => m.default),
        ultimaAvaliacao(paciente.id),
        listarPrescricao(paciente.id)
      ])
      const r = await chamarAssistente({
        sistema: montarSistemaTreino({ galeria }),
        mensagem: montarMensagemTreino({ paciente, avaliacaoAnterior, prescricao, diretriz }),
        esquema: montarEsquemaTreino({ galeria }),
        esquemaReserva: montarEsquemaTreino({ galeria }, { idsLivres: true })
      })
      setTreinos(treinosDaResposta(r.dados, galeria))
      setObservacao(r.dados?.orientacoes || '')
      setCusto(r.custo_usd)
      setAtivo('A')
      setMsg('Treino gerado. Revise e toque em Salvar.')
    } catch (e) {
      setMsg(e.message)
    }
    setGerando(false)
  }

  async function salvar() {
    setSalvando(true)
    setMsg('')
    try {
      const limpos = treinos.filter((t) => t.itens.length).map((t) => ({ ...t, itens: t.itens.map((i) => ({ ...i, series: Math.max(1, Number(i.series) || 1) })) }))
      await salvarTreino(paciente.id, limpos, observacao)
      setMsg(limpos.length ? 'Treino salvo. Já aparece no link do paciente.' : 'Treino removido do link.')
    } catch (e) {
      setMsg(e.message)
    }
    setSalvando(false)
  }

  const total = treinos.reduce((n, t) => n + t.itens.length, 0)

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-bold text-petroleo-escuro">Sugestão de treino A, B e C</h2>
        <p className="mt-1 text-sm text-cinza-600">
          Treino de referência para a academia, só com exercícios da galeria. No link, aparece com o aviso de que é uma sugestão do
          fisioterapeuta.
        </p>
        {api && (
          <div className="mt-4 rounded-2xl bg-cinza-50 p-3">
            <AreaTexto
              id="diretriz"
              rotulo="Diretriz para a IA"
              dica="(opcional)"
              rows={2}
              placeholder="Ex.: academia 3x por semana, quer ganhar força, evitar carga na coluna por enquanto"
              value={diretriz}
              onChange={(e) => setDiretriz(e.target.value)}
            />
            <Botao className="mt-2" icone="estrela" onClick={gerar} carregando={gerando}>
              {total ? 'Gerar de novo com IA' : 'Gerar com IA'}
            </Botao>
            {gerando && <p className="mt-2 text-xs text-cinza-600">Montando A, B e C... leva de 20 a 60 segundos.</p>}
            {custo != null && !gerando && <p className="mt-2 text-xs text-cinza-600">Custo: cerca de US$ {custo.toFixed(3).replace('.', ',')}</p>}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-3 gap-1 rounded-2xl bg-cinza-100 p-1">
        {treinos.map((t) => (
          <button
            key={t.letra}
            onClick={() => setAtivo(t.letra)}
            className={`rounded-xl py-2.5 text-sm font-bold ${ativo === t.letra ? 'bg-white text-petroleo shadow-sm' : 'text-cinza-600'}`}
          >
            Treino {t.letra} <span className="text-xs font-semibold">({t.itens.length})</span>
          </button>
        ))}
      </div>

      <Card className="space-y-3">
        <input
          value={atual.foco}
          onChange={(e) => mudarTreino(ativo, { foco: e.target.value })}
          placeholder={`Foco do treino ${ativo} (ex.: inferiores e glúteos)`}
          className="h-11 w-full rounded-xl border border-cinza-200 px-3 text-[15px] font-semibold focus:border-petroleo focus:outline-none"
        />
        {atual.itens.length === 0 && <p className="py-4 text-center text-sm text-cinza-600">Nenhum exercício no treino {ativo}.</p>}
        {atual.itens.map((it, i) => (
          <div key={`${it.id}-${i}`} className="flex gap-3 rounded-2xl border border-cinza-100 p-2.5">
            <img src={`/${it.video.replace(/\.mp4$/, '.webp')}`} alt="" className="h-16 w-16 shrink-0 rounded-xl bg-white object-contain" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold leading-tight">{it.nome}</span>
                <div className="flex shrink-0 gap-0.5 text-cinza-600">
                  <button onClick={() => moverItem(ativo, i, -1)} aria-label="Subir" className="rounded p-1 hover:bg-cinza-100"><Icone nome="voltar" tamanho={14} className="rotate-90" /></button>
                  <button onClick={() => moverItem(ativo, i, 1)} aria-label="Descer" className="rounded p-1 hover:bg-cinza-100"><Icone nome="seta" tamanho={14} className="rotate-90" /></button>
                  <button onClick={() => removerItem(ativo, i)} aria-label="Remover" className="rounded p-1 hover:bg-cinza-100"><Icone nome="x" tamanho={14} /></button>
                </div>
              </div>
              <div className="mt-1.5 flex gap-1.5">
                <input type="number" min="1" max="20" value={it.series} onChange={(e) => mudarItem(ativo, i, 'series', e.target.value)} className="h-8 w-14 rounded-lg border border-cinza-200 px-2 text-sm" aria-label="Séries" />
                <span className="self-center text-sm text-cinza-600">×</span>
                <input value={it.reps} onChange={(e) => mudarItem(ativo, i, 'reps', e.target.value)} className="h-8 min-w-0 flex-1 rounded-lg border border-cinza-200 px-2 text-sm" aria-label="Repetições" />
              </div>
              <input value={it.observacao} onChange={(e) => mudarItem(ativo, i, 'observacao', e.target.value)} placeholder="Observação" className="mt-1.5 h-8 w-full rounded-lg border border-cinza-200 px-2 text-xs" />
            </div>
          </div>
        ))}
        <Botao variante="secundario" icone="mais" onClick={() => setGaleriaPara(ativo)}>Adicionar da galeria</Botao>
      </Card>

      <Card>
        <AreaTexto id="orientacoes" rotulo="Orientações gerais" dica="(aparece para o paciente)" rows={3} value={observacao} onChange={(e) => setObservacao(e.target.value)} />
      </Card>

      {msg && <p className={`text-sm font-medium ${/salvo|gerado|removido/i.test(msg) ? 'text-ok' : 'text-alerta'}`}>{msg}</p>}
      <Botao tamanho="lg" bloco icone="check" onClick={salvar} carregando={salvando}>Salvar treino</Botao>

      <Galeria
        aberto={!!galeriaPara}
        modo="unico"
        aoFechar={() => setGaleriaPara(null)}
        aoEscolher={(g) => {
          mudarTreino(galeriaPara, {
            itens: [...treinos.find((t) => t.letra === galeriaPara).itens, { id: `gal:${g.id}`, nome: g.nome, video: g.video, series: 3, reps: '12', observacao: '' }]
          })
          setGaleriaPara(null)
        }}
      />
    </div>
  )
}
