// "Quem chamar hoje": monta a lista de pacientes para contato a partir das sessões,
// dos check-ins feitos pelo link e dos contatos já registrados.
// Cada paciente aparece em uma categoria só (a mais importante).

const DIA = 86400000
const dias = (a, b) => Math.floor((b - a) / DIA)
const data = (s) => new Date(String(s).length <= 10 ? `${s}T12:00:00` : s)

export const CATEGORIAS = {
  piorou: { titulo: 'Dor subiu', descricao: 'Responderam no link com dor mais alta do que no fim da última sessão.', cor: 'alerta' },
  parou: { titulo: 'Pararam os exercícios', descricao: 'Disseram no check-in que não conseguiram fazer os exercícios.', cor: 'destaque' },
  sumiu: { titulo: 'Sem retorno há 3 semanas ou mais', descricao: 'Plano em andamento e sem sessão recente.', cor: 'petroleo' },
  manutencao: { titulo: 'Plano concluído: reavaliação ou manutenção', descricao: 'Terminaram o plano há algum tempo. Bom momento para uma reavaliação.', cor: 'petroleo' },
  checkin: { titulo: 'Pedir o check-in da semana', descricao: 'A última sessão foi há 6 a 20 dias e ainda não responderam no link.', cor: 'cinza' }
}
export const ORDEM = ['piorou', 'parou', 'sumiu', 'manutencao', 'checkin']

export function montarRetornos({ pacientes, sessoes, checkins, contatos, hoje = new Date() }) {
  const porPaciente = (lista) => {
    const m = {}
    for (const x of lista || []) (m[x.paciente_id] ||= []).push(x)
    return m
  }
  const S = porPaciente(sessoes)
  const C = porPaciente(checkins)
  const K = porPaciente(contatos)
  const itens = []

  for (const p of pacientes || []) {
    const ss = (S[p.id] || []).slice().sort((a, b) => data(a.data) - data(b.data))
    if (!ss.length) continue
    const ultima = ss.at(-1)
    const desde = dias(data(ultima.data), hoje)
    const cks = (C[p.id] || []).filter((c) => data(c.criado_em) >= data(ultima.data)).sort((a, b) => data(a.criado_em) - data(b.criado_em))
    const ck = cks.at(-1)
    const ultimoContato = (K[p.id] || []).map((k) => data(k.criado_em)).sort((a, b) => b - a)[0]
    // Contato registrado depois do motivo (ou nos últimos 7 dias) tira o paciente da lista.
    const jaChamado = (desdeQuando) => ultimoContato && (ultimoContato >= desdeQuando || dias(ultimoContato, hoje) < 7)
    const ref = ultima.dor_depois ?? ultima.dor_antes
    const base = { paciente: p, ultima, desde, checkin: ck, feitas: ss.length }

    let item = null
    if (ck && (ck.dor >= 6 || (ref != null && ck.dor >= ref + 2)) && !(ultimoContato && ultimoContato >= data(ck.criado_em))) {
      item = { ...base, categoria: 'piorou', detalhe: `Dor ${ck.dor} no check-in de ${fmt(ck.criado_em)}${ref != null ? `; saiu da última sessão com ${ref}` : ''}.` }
    } else if (ck && ck.exercicios === 'nenhum' && !jaChamado(data(ck.criado_em))) {
      item = { ...base, categoria: 'parou', detalhe: `Check-in de ${fmt(ck.criado_em)}: não conseguiu fazer os exercícios (dor ${ck.dor}).` }
    } else if (desde >= 21 && desde <= 150 && !jaChamado(new Date(hoje - 7 * DIA))) {
      const concluiu = p.plano_sessoes && ss.length >= p.plano_sessoes
      item = concluiu
        ? { ...base, categoria: 'manutencao', detalhe: `Concluiu o plano de ${p.plano_sessoes} sessões. Última sessão há ${desde} dias.` }
        : { ...base, categoria: 'sumiu', detalhe: `Última sessão há ${desde} dias${p.plano_sessoes ? ` (sessão ${ss.length} de ${p.plano_sessoes})` : ''}.` }
    } else if (desde >= 6 && desde <= 20 && !ck && !jaChamado(data(ultima.data))) {
      item = { ...base, categoria: 'checkin', detalhe: `Última sessão há ${desde} dias, sem check-in no link.` }
    }
    if (item) itens.push(item)
  }
  return ORDEM.map((cat) => ({ categoria: cat, ...CATEGORIAS[cat], itens: itens.filter((i) => i.categoria === cat).sort((a, b) => b.desde - a.desde) })).filter((g) => g.itens.length)
}

function fmt(s) {
  const d = data(s)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

// Mensagem pronta de WhatsApp para cada motivo (sem promessa de resultado nem de horário).
export function mensagemRetorno(item) {
  const nome = item.paciente.nome.trim().split(/\s+/)[0]
  switch (item.categoria) {
    case 'piorou':
      return `Oi, ${nome}! Aqui é o Dr. Pablo. Vi no seu acompanhamento que a dor subiu para ${item.checkin.dor}. Quer marcar um retorno para eu te avaliar? Me diz os melhores dias e horários para você.`
    case 'parou':
      return `Oi, ${nome}! Aqui é o Dr. Pablo. Vi que nesta semana não deu para fazer os exercícios. Acontece! Se algum estiver difícil ou incomodando, me conta que eu ajusto. Quer marcar um retorno para revisarmos juntos?`
    case 'sumiu':
      return `Oi, ${nome}, tudo bem? Aqui é o Dr. Pablo. Faz ${item.desde} dias da nossa última sessão. Como está a coluna? Se quiser seguir com o plano, me diz os melhores dias e horários e eu encaixo um retorno.`
    case 'manutencao':
      return `Oi, ${nome}, tudo bem? Aqui é o Dr. Pablo. Já faz um tempo que você concluiu o plano. Que tal uma reavaliação para vermos como está a coluna e ajustar os exercícios? Me diz os melhores dias e horários.`
    default:
      return `Oi, ${nome}! Aqui é o Dr. Pablo. Passando para saber como você está. Quando puder, abre o link do seu acompanhamento e responde o check-in da semana: leva 10 segundos.`
  }
}
