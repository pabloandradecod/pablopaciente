import { useEffect, useState } from 'react'
import {
  assistenteDisponivel, chamarAssistente, enviarFotoPostural, lerTreino, listarExercicios, listarPrescricao, salvarRelatorio, salvarTreino
} from '../lib/api.js'
import {
  ligarSugestoes, montarEsquemaExercicios, montarEsquemaTreino, montarMensagemExercicios, montarMensagemTreino, montarSistemaExercicios,
  montarSistemaTreino, normalizarPostura, treinosDaResposta
} from '../lib/assistente.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import { AreaTexto } from '../components/ui/Campo.jsx'
import { CartoesSugestoes, salvarPrescricaoPropria } from './prescricaoPropria.jsx'
import AnexarFotos from './AnexarFotos.jsx'
import AnalisePostural from './AnalisePostural.jsx'
import { marcarFotos } from '../lib/analisePostural.js'
import { achadosEmTexto } from '../lib/postura.js'

const real = (v) => `US$ ${v.toFixed(3).replace('.', ',')}`

// Depois da avaliação, um clique gera tudo:
// 1) análise postural das fotos (se houver) + EXERCÍCIOS DO DR. PABLO (casa, sem animações);
// 2) EXERCÍCIOS PARA ACADEMIA (treino A/B/C, só animações da galeria), usando os achados posturais.
// São dois pedidos separados à IA, para nunca misturar as duas prescrições.
export default function GerarExercicios({ paciente, campos, avaliacao, aoSalvar }) {
  const [api, setApi] = useState(null)
  const [notas, setNotas] = useState('')
  const [fotos, setFotos] = useState([])
  const [comTreino, setComTreino] = useState(true)
  const [etapa, setEtapa] = useState('') // texto do progresso enquanto gera
  const [resultado, setResultado] = useState(null) // { postura, fotos, orientacao, treinos, orientacoesTreino, custo }
  const [sugestoes, setSugestoes] = useState([])
  const [atuais, setAtuais] = useState([])
  const [treinoAtual, setTreinoAtual] = useState(null)
  const [substituir, setSubstituir] = useState(true)
  const [salvarAcademia, setSalvarAcademia] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    assistenteDisponivel().then(setApi)
    listarPrescricao(paciente.id).then(setAtuais).catch(() => {})
    lerTreino(paciente.id).then(setTreinoAtual).catch(() => {})
  }, [paciente.id])

  const temAvaliacao = Boolean(avaliacao?.id) && Object.keys(avaliacao?.respostas || {}).length > 0
  const pode = temAvaliacao || fotos.length > 0
  const gerando = Boolean(etapa)

  async function gerar() {
    if (resultado && !confirm('Gerar de novo substitui as sugestões atuais. Continuar?')) return
    setMsg('')
    setResultado(null)
    setSugestoes([])
    const vistas = fotos.map((f) => f.vista)
    let custo = 0
    try {
      // 0) Fotos: a IA marca os pontos anatômicos e os desvios de cada foto (em lotes).
      let marcacoes = []
      if (fotos.length) {
        const m = await marcarFotos(fotos, (feitas, total) => setEtapa(`Marcando os pontos e medindo as fotos (${feitas} de ${total})...`))
        marcacoes = m.marcacoes
        custo += m.custo
      }
      // 1) Exercícios do Dr. Pablo + análise postural consolidada (só texto, sem reenviar as fotos)
      setEtapa(fotos.length ? 'Consolidando a análise postural e montando os exercícios do Dr. Pablo...' : 'Montando os exercícios do Dr. Pablo...')
      const biblioteca = await listarExercicios()
      const r1 = await chamarAssistente({
        sistema: montarSistemaExercicios({ biblioteca, comFotos: fotos.length > 0 }),
        mensagem: montarMensagemExercicios({
          paciente, campos, respostas: avaliacao?.respostas || {}, notas, fotos: vistas, analiseFotos: fotos.length ? achadosEmTexto(marcacoes, vistas) : ''
        }),
        esquema: montarEsquemaExercicios({ biblioteca, comFotos: fotos.length > 0 })
      })
      custo += r1.custo_usd || 0
      const novas = ligarSugestoes(r1.dados, biblioteca)
      const postura = normalizarPostura(r1.dados?.postura)
      setSugestoes(novas)
      const base = {
        postura,
        fotos: fotos.map((f) => ({ blob: f.blob, previa: f.previa, vista: f.vista })),
        marcacoes,
        orientacao: r1.dados?.orientacao || '',
        treinos: null,
        orientacoesTreino: '',
        custo
      }
      setResultado(base)

      // 2) Exercícios para academia (treino A/B/C), usando os achados posturais em texto
      if (comTreino) {
        setEtapa('Montando o treino de academia (A, B e C)...')
        try {
          const galeria = (await import('../lib/galeria.json')).default
          const r2 = await chamarAssistente({
            sistema: montarSistemaTreino({ galeria }),
            mensagem: montarMensagemTreino({ paciente, avaliacaoAnterior: avaliacao, prescricao: novas, diretriz: notas, postura }),
            esquema: montarEsquemaTreino({ galeria }),
            esquemaReserva: montarEsquemaTreino({ galeria }, { idsLivres: true })
          })
          custo += r2.custo_usd || 0
          setResultado({ ...base, treinos: treinosDaResposta(r2.dados, galeria), orientacoesTreino: r2.dados?.orientacoes || '', custo })
        } catch (e) {
          setMsg(`Os exercícios do Dr. Pablo ficaram prontos, mas o treino de academia falhou: ${e.message}`)
        }
      }
    } catch (e) {
      setMsg(e.message)
    }
    setEtapa('')
  }

  async function salvarTudo() {
    setSalvando(true)
    setMsg('')
    try {
      const partes = []
      const r = await salvarPrescricaoPropria({ pacienteId: paciente.id, sugestoes, substituir, atuais })
      setAtuais(await listarPrescricao(paciente.id))
      partes.push(`${r.total} exercícios do Dr. Pablo${r.semVideo ? ` (${r.semVideo} ainda sem vídeo)` : ''}`)

      const treinos = (resultado.treinos || []).filter((t) => t.itens.length)
      if (salvarAcademia && treinos.length) {
        await salvarTreino(paciente.id, treinos, resultado.orientacoesTreino)
        setTreinoAtual({ treinos })
        partes.push('treino de academia A, B e C')
      }

      if (resultado.postura) {
        // Fotos no espaço privado; a análise fica nos relatórios da ficha.
        const fotosSalvas = []
        for (const f of resultado.fotos) fotosSalvas.push({ caminho: await enviarFotoPostural(paciente.id, f.blob), vista: f.vista })
        const linhas = resultado.postura.achados.map((a) => `- ${a.regiao} (${a.lado}, ${a.intensidade.toLowerCase()}): ${a.achado}`).join('\n')
        await salvarRelatorio({
          paciente_id: paciente.id,
          relatorio: `## Análise postural\n${resultado.postura.resumo}\n\n${linhas}${resultado.postura.limitacoes ? `\n\n## Limitações das fotos\n${resultado.postura.limitacoes}` : ''}`,
          resposta: { postura: resultado.postura, marcacoes: resultado.marcacoes, exercicios: sugestoes.filter((s) => s.incluir).map((s) => s.nome), alertas: [] },
          origem: 'api',
          fotos: fotosSalvas,
          visivel_paciente: true
        })
        partes.push('análise postural')
      }
      setMsg(`Salvo na ficha: ${partes.join(', ')}. Já aparece no link do paciente.`)
      aoSalvar?.()
    } catch (e) {
      setMsg(e.message)
    }
    setSalvando(false)
  }

  if (api === false) {
    return (
      <Card>
        <h2 className="font-bold text-petroleo-escuro">Gerar exercícios</h2>
        <p className="mt-1 text-sm text-cinza-600">Cadastre a chave da API no Supabase para usar este botão.</p>
      </Card>
    )
  }

  const textoBotao = resultado
    ? 'Gerar de novo'
    : fotos.length
      ? comTreino ? 'Analisar fotos e gerar tudo' : 'Analisar fotos e gerar exercícios'
      : comTreino ? 'Gerar exercícios e treino' : 'Gerar exercícios'
  const treinoTemItens = (treinoAtual?.treinos || []).some((t) => t.itens?.length)

  return (
    <Card>
      <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro">
        <Icone nome="estrela" tamanho={18} /> Gerar exercícios com IA
      </h2>
      <p className="mt-1 text-sm text-cinza-600">
        Um clique: análise postural das fotos, exercícios do Dr. Pablo para casa e treino de academia A, B e C. As duas prescrições são geradas
        separadas e nunca se misturam.
      </p>

      {!pode && <p className="mt-3 rounded-xl bg-cinza-50 p-3 text-sm text-cinza-600">Salve a avaliação ou anexe fotos para liberar o botão.</p>}

      <AnexarFotos fotos={fotos} setFotos={setFotos} />

      <div className="mt-3">
        <AreaTexto
          id="notas-ex"
          rotulo="O que priorizar?"
          dica="(opcional)"
          rows={2}
          placeholder="Ex.: fase aguda, só exercícios deitado; academia 3x por semana; quer voltar a correr"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
        <label className="mt-2 flex items-center gap-2.5 text-sm font-medium">
          <input type="checkbox" checked={comTreino} onChange={(e) => setComTreino(e.target.checked)} className="h-5 w-5 accent-[#0E5C62]" />
          Montar também o treino de academia (A, B e C)
        </label>
        <Botao tamanho="lg" bloco className="mt-3" icone="estrela" onClick={gerar} carregando={gerando} disabled={!pode}>
          {textoBotao}
        </Botao>
        {gerando && (
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-petroleo">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-petroleo border-t-transparent" />
            {etapa}
          </p>
        )}
        {gerando && <p className="mt-1 text-xs text-cinza-600">{fotos.length > 4 ? 'Com muitas fotos leva de 2 a 4 minutos.' : comTreino ? 'O conjunto leva de 1 a 2 minutos.' : 'Leva de 20 a 60 segundos.'}</p>}
      </div>

      {resultado && (
        <div className="mt-5 space-y-5">
          {resultado.custo > 0 && !gerando && <p className="text-xs text-cinza-600">Custo total: cerca de {real(resultado.custo)}</p>}

          {resultado.postura && (
            <section>
              <h3 className="mb-2 flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="camera" tamanho={18} /> Análise postural</h3>
              <div className="rounded-2xl bg-cinza-50 p-3">
                <AnalisePostural
                  postura={resultado.postura}
                  fotos={resultado.fotos}
                  marcacoes={resultado.marcacoes}
                  aoMudarMarcacao={(i, m) => setResultado((r) => ({ ...r, marcacoes: r.marcacoes.map((x, k) => (k === i ? m : x)) }))}
                  aoRemover={(i) => setResultado((r) => ({ ...r, postura: { ...r.postura, achados: r.postura.achados.filter((_, k) => k !== i) } }))}
                />
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="haltere" tamanho={18} /> Exercícios do Dr. Pablo (casa)</h3>
            {sugestoes.length ? (
              <CartoesSugestoes sugestoes={sugestoes} setSugestoes={setSugestoes} aoMensagem={setMsg} />
            ) : (
              <p className="text-sm text-cinza-600">Nenhum exercício sugerido.</p>
            )}
            {resultado.orientacao && <p className="rounded-2xl bg-cinza-50 p-3 text-sm text-cinza-600">{resultado.orientacao}</p>}
            {atuais.length > 0 && (
              <label className="flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
                <input type="checkbox" checked={substituir} onChange={(e) => setSubstituir(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]" />
                <span>
                  <strong>Substituir os exercícios atuais</strong> ({atuais.length}: {atuais.map((p) => p.exercicios?.nome).filter(Boolean).join(', ')}).
                </span>
              </label>
            )}
          </section>

          {resultado.treinos && <PreviaTreino treinos={resultado.treinos} orientacoes={resultado.orientacoesTreino} />}
          {resultado.treinos && (
            <label className="flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
              <input type="checkbox" checked={salvarAcademia} onChange={(e) => setSalvarAcademia(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]" />
              <span>
                <strong>Salvar o treino de academia</strong>
                {treinoTemItens && ' (substitui o treino atual)'}.
                <span className="block text-xs text-cinza-600">Depois dá para trocar exercícios na aba Academia.</span>
              </span>
            </label>
          )}

          {!gerando && (
            <Botao tamanho="lg" bloco icone="check" onClick={salvarTudo} carregando={salvando}>
              Salvar tudo na ficha
            </Botao>
          )}
        </div>
      )}

      {msg && <p className={`mt-3 text-sm font-medium ${/^Salvo/.test(msg) ? 'text-ok' : 'text-alerta'}`}>{msg}</p>}
    </Card>
  )
}

// Prévia do treino A/B/C (só animações da galeria).
function PreviaTreino({ treinos, orientacoes }) {
  const [aba, setAba] = useState('A')
  const atual = treinos.find((t) => t.letra === aba) || treinos[0]
  return (
    <section>
      <h3 className="mb-1 flex items-center gap-2 font-bold text-petroleo-escuro"><Icone nome="haltere" tamanho={18} /> Exercícios para academia</h3>
      <p className="mb-2 text-xs text-cinza-600">Sugestão de treino com as animações da galeria. No link, aparece no card amarelo.</p>
      <div className="grid grid-cols-3 gap-1 rounded-2xl bg-cinza-100 p-1">
        {treinos.map((t) => (
          <button key={t.letra} type="button" onClick={() => setAba(t.letra)} className={`rounded-xl py-2 text-sm font-bold ${aba === t.letra ? 'bg-white text-petroleo shadow-sm' : 'text-cinza-600'}`}>
            Treino {t.letra} <span className="text-xs font-semibold">({t.itens.length})</span>
          </button>
        ))}
      </div>
      {atual.foco && <p className="mt-2 text-sm font-semibold text-petroleo-escuro">{atual.foco}</p>}
      <ul className="mt-2 space-y-2">
        {atual.itens.map((it, i) => (
          <li key={i} className="flex items-center gap-3 rounded-2xl border border-cinza-100 p-2">
            <img src={`/${it.video.replace(/\.mp4$/, '.webp')}`} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain" />
            <div className="min-w-0">
              <div className="text-sm font-bold leading-tight">{it.nome}</div>
              <div className="text-xs text-cinza-600">{it.series} séries × {it.reps}{it.observacao ? ` · ${it.observacao}` : ''}</div>
            </div>
          </li>
        ))}
        {atual.itens.length === 0 && <li className="text-sm text-cinza-600">Nenhum exercício neste treino.</li>}
      </ul>
      {orientacoes && <p className="mt-2 rounded-2xl bg-cinza-50 p-3 text-sm text-cinza-600">{orientacoes}</p>}
    </section>
  )
}
