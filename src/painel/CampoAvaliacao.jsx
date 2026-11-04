import { AreaTexto, Campo, Escolhas, paraLista, Rotulo, SimNao } from '../components/ui/Campo.jsx'
import EscalaDor from '../components/ui/EscalaDor.jsx'

// Renderiza um campo configurável da avaliação conforme o tipo.
export default function CampoAvaliacao({ campo, valor, onChange }) {
  const id = `campo-${campo.chave}`
  const opcoes = campo.opcoes || []
  switch (campo.tipo) {
    case 'texto':
      return <Campo id={id} rotulo={campo.rotulo} value={valor ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'texto_longo':
      return <AreaTexto id={id} rotulo={campo.rotulo} value={valor ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'escala':
      return <EscalaDor rotulo={campo.rotulo} valor={valor} onChange={onChange} />
    case 'sim_nao':
      return <SimNao rotulo={campo.rotulo} valor={valor} onChange={onChange} />
    case 'lista':
      return <Escolhas rotulo={campo.rotulo} opcoes={opcoes} valor={valor} onChange={onChange} />
    case 'multipla':
      return <Escolhas rotulo={campo.rotulo} opcoes={opcoes} valor={paraLista(valor)} onChange={onChange} multipla outro />
    case 'sim_nao_texto': {
      const v = valor || { resposta: null, detalhe: '', opcoes: [] }
      return (
        <div className="space-y-3">
          <SimNao rotulo={campo.rotulo} valor={v.resposta} onChange={(r) => onChange({ ...v, resposta: r })} />
          {v.resposta === 'sim' && (
            <div className="rounded-2xl bg-cinza-50 p-3">
              {opcoes.length > 0 ? (
                <Escolhas
                  rotulo={campo.detalhe_rotulo || 'Detalhe'}
                  opcoes={opcoes}
                  valor={[...paraLista(v.opcoes), ...(v.detalhe ? [v.detalhe] : [])]}
                  onChange={(lista) => onChange({ ...v, opcoes: lista, detalhe: '' })}
                  multipla
                  outro
                />
              ) : (
                <Campo id={id} placeholder={campo.detalhe_rotulo || 'Detalhe'} value={v.detalhe} onChange={(e) => onChange({ ...v, detalhe: e.target.value })} />
              )}
            </div>
          )}
        </div>
      )
    }
    default:
      return <Rotulo>{campo.rotulo}</Rotulo>
  }
}
