import { AreaTexto, Campo, Rotulo, Selecao, SimNao } from '../components/ui/Campo.jsx'
import EscalaDor from '../components/ui/EscalaDor.jsx'

// Renderiza um campo configurável da avaliação conforme o tipo.
export default function CampoAvaliacao({ campo, valor, onChange }) {
  const id = `campo-${campo.chave}`
  switch (campo.tipo) {
    case 'texto':
      return <Campo id={id} rotulo={campo.rotulo} value={valor ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'texto_longo':
      return <AreaTexto id={id} rotulo={campo.rotulo} value={valor ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'escala':
      return <EscalaDor rotulo={campo.rotulo} valor={valor} onChange={onChange} />
    case 'sim_nao':
      return <SimNao rotulo={campo.rotulo} valor={valor} onChange={onChange} />
    case 'sim_nao_texto': {
      const v = valor || { resposta: null, detalhe: '' }
      return (
        <div className="space-y-2">
          <SimNao rotulo={campo.rotulo} valor={v.resposta} onChange={(r) => onChange({ ...v, resposta: r })} />
          {v.resposta === 'sim' && (
            <Campo
              id={id}
              placeholder={campo.detalhe_rotulo || 'Detalhe'}
              aria-label={campo.detalhe_rotulo || 'Detalhe'}
              value={v.detalhe}
              onChange={(e) => onChange({ ...v, detalhe: e.target.value })}
            />
          )}
        </div>
      )
    }
    case 'lista':
      return (
        <Selecao id={id} rotulo={campo.rotulo} value={valor ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Selecione</option>
          {(campo.opcoes || []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </Selecao>
      )
    default:
      return <Rotulo>{campo.rotulo}</Rotulo>
  }
}
