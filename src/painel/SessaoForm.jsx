import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { excluirSessao, listarSessoes, salvarSessao } from '../lib/api.js'
import { hojeISO } from '../lib/datas.js'
import { TODOS_CODIGOS } from '../components/coluna/segmentos.js'
import MapaColuna, { SeletorSegmentos } from '../components/coluna/MapaColuna.jsx'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import { AreaTexto, Campo } from '../components/ui/Campo.jsx'
import EscalaDor from '../components/ui/EscalaDor.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'

export default function SessaoForm() {
  const { id: pacienteId, sessaoId } = useParams()
  const navegar = useNavigate()
  const [s, setS] = useState(sessaoId ? null : { paciente_id: pacienteId, data: hojeISO(), dor_antes: null, dor_depois: null, segmentos: [], notas_internas: '' })
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!sessaoId) return
    listarSessoes(pacienteId)
      .then((l) => {
        const achada = l.find((x) => x.id === sessaoId)
        if (achada) setS(achada)
        else setErro('Sessão não encontrada.')
      })
      .catch((e) => setErro(e.message))
  }, [pacienteId, sessaoId])

  if (erro && !s) return <p className="text-sm text-alerta">{erro}</p>
  if (!s) return <Carregando />

  const voltar = `/painel/pacientes/${pacienteId}?aba=sessoes`
  const alternar = (c) =>
    setS((x) => {
      const set = new Set(x.segmentos)
      set.has(c) ? set.delete(c) : set.add(c)
      // mantém a ordem anatômica
      return { ...x, segmentos: TODOS_CODIGOS.filter((k) => set.has(k)) }
    })

  async function salvar() {
    setSalvando(true)
    setErro('')
    try {
      const { id, paciente_id, data, dor_antes, dor_depois, segmentos, notas_internas } = s
      await salvarSessao({ ...(id ? { id } : {}), paciente_id, data, dor_antes, dor_depois, segmentos, notas_internas })
      navegar(voltar, { replace: true })
    } catch (e) {
      setErro(e.message)
      setSalvando(false)
    }
  }

  return (
    <div>
      <Link to={voltar} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-petroleo">
        <Icone nome="voltar" tamanho={16} /> Voltar
      </Link>
      <h1 className="mb-4 text-2xl font-bold text-petroleo-escuro">{s.id ? 'Editar sessão' : 'Nova sessão'}</h1>

      <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <Card className="space-y-5">
            <Campo id="data" type="date" rotulo="Data" value={s.data} onChange={(e) => setS({ ...s, data: e.target.value })} className="w-48" />
            <EscalaDor rotulo="Dor antes" valor={s.dor_antes} onChange={(v) => setS({ ...s, dor_antes: v })} />
            <EscalaDor rotulo="Dor depois" valor={s.dor_depois} onChange={(v) => setS({ ...s, dor_depois: v })} />
            <AreaTexto id="notas" rotulo="Notas internas" dica="(não aparecem para o paciente)" value={s.notas_internas || ''} onChange={(e) => setS({ ...s, notas_internas: e.target.value })} />
          </Card>
          <Card>
            <h2 className="mb-3 font-bold text-petroleo-escuro">Segmentos tratados</h2>
            <SeletorSegmentos selecionados={s.segmentos} onAlternar={alternar} />
          </Card>
        </div>
        <Card>
          <p className="mb-2 text-sm text-cinza-600">Toque no mapa para marcar ou desmarcar.</p>
          <MapaColuna modo="editar" selecionados={s.segmentos} onAlternar={alternar} className="mx-auto w-full max-w-md" />
        </Card>
      </div>

      {erro && <p className="mt-3 text-sm font-medium text-alerta">{erro}</p>}
      <div className="sticky bottom-20 mt-4 flex gap-3 md:bottom-4">
        <Botao tamanho="lg" className="flex-1 shadow-lg" onClick={salvar} carregando={salvando} icone="check">Salvar sessão</Botao>
        {s.id && (
          <Botao
            tamanho="lg"
            variante="secundario"
            className="shadow-lg"
            aria-label="Excluir sessão"
            onClick={async () => {
              if (!confirm('Excluir esta sessão?')) return
              await excluirSessao(s.id)
              navegar(voltar, { replace: true })
            }}
          >
            <Icone nome="lixo" />
          </Botao>
        )}
      </div>
    </div>
  )
}
