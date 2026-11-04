import { useEffect, useState } from 'react'
import { assistenteDisponivel, chamarAssistente, listarExercicios, listarPrescricao } from '../lib/api.js'
import { ligarSugestoes, montarEsquemaExercicios, montarMensagemExercicios, montarSistemaExercicios } from '../lib/assistente.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import { AreaTexto } from '../components/ui/Campo.jsx'
import { CartoesSugestoes, salvarPrescricaoPropria } from './prescricaoPropria.jsx'

// Depois da avaliação: a IA sugere os EXERCÍCIOS DO DR. PABLO (sem animações de academia).
// Cada vídeo enviado aqui entra direto na biblioteca, para reaproveitar em outros pacientes.
export default function GerarExercicios({ paciente, campos, avaliacao }) {
  const [api, setApi] = useState(null)
  const [notas, setNotas] = useState('')
  const [gerando, setGerando] = useState(false)
  const [sugestoes, setSugestoes] = useState([])
  const [orientacao, setOrientacao] = useState('')
  const [custo, setCusto] = useState(null)
  const [atuais, setAtuais] = useState([])
  const [substituir, setSubstituir] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    assistenteDisponivel().then(setApi)
    listarPrescricao(paciente.id).then(setAtuais).catch(() => {})
  }, [paciente.id])

  const avaliacaoPronta = Boolean(avaliacao?.id) && Object.keys(avaliacao?.respostas || {}).length > 0

  async function gerar() {
    if (sugestoes.length && !confirm('Gerar de novo substitui as sugestões atuais. Continuar?')) return
    setGerando(true)
    setMsg('')
    try {
      const biblioteca = await listarExercicios()
      const r = await chamarAssistente({
        sistema: montarSistemaExercicios({ biblioteca }),
        mensagem: montarMensagemExercicios({ paciente, campos, respostas: avaliacao.respostas, notas }),
        esquema: montarEsquemaExercicios({ biblioteca })
      })
      setSugestoes(ligarSugestoes(r.dados, biblioteca))
      setOrientacao(r.dados?.orientacao || '')
      setCusto(r.custo_usd)
    } catch (e) {
      setMsg(e.message)
    }
    setGerando(false)
  }

  async function prescreverTudo() {
    setSalvando(true)
    setMsg('')
    try {
      const r = await salvarPrescricaoPropria({ pacienteId: paciente.id, sugestoes, substituir, atuais })
      setAtuais(await listarPrescricao(paciente.id))
      setMsg(`Prescrição salva (${r.total} exercícios).${r.semVideo ? ` ${r.semVideo} ainda sem vídeo: o paciente vê só o texto até você enviar.` : ''}`)
    } catch (e) {
      setMsg(e.message)
    }
    setSalvando(false)
  }

  if (api === false) {
    return (
      <Card>
        <h2 className="font-bold text-petroleo-escuro">Gerar exercícios do Dr. Pablo</h2>
        <p className="mt-1 text-sm text-cinza-600">Cadastre a chave da API no Supabase para usar este botão.</p>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className="flex items-center gap-2 font-bold text-petroleo-escuro">
        <Icone nome="estrela" tamanho={18} /> Gerar exercícios do Dr. Pablo
      </h2>
      <p className="mt-1 text-sm text-cinza-600">
        Prescrição terapêutica para casa, a partir desta avaliação. Não usa as animações de academia. Ao enviar o vídeo de um exercício, ele fica
        guardado na sua biblioteca.
      </p>

      {!avaliacaoPronta ? (
        <p className="mt-3 rounded-xl bg-cinza-50 p-3 text-sm text-cinza-600">Preencha e salve a avaliação para liberar o botão.</p>
      ) : (
        <div className="mt-3">
          <AreaTexto
            id="notas-ex"
            rotulo="O que priorizar?"
            dica="(opcional)"
            rows={2}
            placeholder="Ex.: fase aguda, só exercícios deitado; paciente idosa; quer voltar a correr"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
          <Botao className="mt-2" icone="estrela" onClick={gerar} carregando={gerando}>
            {sugestoes.length ? 'Gerar de novo' : 'Gerar exercícios'}
          </Botao>
          {gerando && <p className="mt-2 text-xs text-cinza-600">Montando a prescrição... leva de 15 a 40 segundos.</p>}
          {custo != null && !gerando && <p className="mt-2 text-xs text-cinza-600">Custo: cerca de US$ {custo.toFixed(3).replace('.', ',')}</p>}
        </div>
      )}

      {sugestoes.length > 0 && (
        <div className="mt-4 space-y-3">
          <CartoesSugestoes sugestoes={sugestoes} setSugestoes={setSugestoes} aoMensagem={setMsg} />
          {orientacao && <p className="rounded-2xl bg-cinza-50 p-3 text-sm text-cinza-600">{orientacao}</p>}
          {atuais.length > 0 && (
            <label className="flex items-start gap-2.5 rounded-2xl border border-cinza-100 p-3 text-sm">
              <input type="checkbox" checked={substituir} onChange={(e) => setSubstituir(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0E5C62]" />
              <span>
                <strong>Substituir os exercícios atuais</strong> ({atuais.length}: {atuais.map((p) => p.exercicios?.nome).filter(Boolean).join(', ')}).
              </span>
            </label>
          )}
          <Botao tamanho="lg" bloco icone="check" onClick={prescreverTudo} carregando={salvando}>
            Prescrever para o paciente
          </Botao>
        </div>
      )}

      {msg && <p className={`mt-3 text-sm font-medium ${/salv|Prescrição/.test(msg) ? 'text-ok' : 'text-alerta'}`}>{msg}</p>}
    </Card>
  )
}
