import { supabase } from './supabase.js'

// Lança o erro do Supabase com mensagem em português quando possível.
function checar({ data, error }) {
  if (error) {
    const msg = error.message || ''
    if (msg.includes('acesso_negado') || error.code === '42501') throw new Error('Acesso negado.')
    if (msg.includes('violates foreign key') && msg.includes('exercicio')) {
      throw new Error('Este exercício está prescrito para algum paciente. Desative em vez de excluir.')
    }
    throw new Error(msg || 'Erro inesperado.')
  }
  return data
}

// ---------------- Configurações ----------------
export async function lerConfiguracoes() {
  const rows = checar(await supabase.from('configuracoes').select('chave, valor'))
  return Object.fromEntries(rows.map((r) => [r.chave, r.valor]))
}
export async function salvarConfiguracao(chave, valor) {
  return checar(await supabase.from('configuracoes').upsert({ chave, valor }))
}

// ---------------- Pacientes ----------------
export async function listarPacientes() {
  return checar(
    await supabase
      .from('pacientes')
      .select('id, nome, whatsapp, data_nascimento, primeira_consulta, sessoes(data), paciente_tokens(criado_em, revogado_em)')
      .order('nome')
  )
}
export async function lerPaciente(id) {
  return checar(await supabase.from('pacientes').select('*').eq('id', id).single())
}
export async function salvarPaciente(dados) {
  const q = dados.id
    ? supabase.from('pacientes').update(dados).eq('id', dados.id)
    : supabase.from('pacientes').insert(dados)
  return checar(await q.select().single())
}
export async function excluirPaciente(id) {
  return checar(await supabase.from('pacientes').delete().eq('id', id))
}

// ---------------- Avaliação ----------------
export async function listarCampos({ incluirInativos = false } = {}) {
  let q = supabase.from('avaliacao_campos').select('*').order('ordem')
  if (!incluirInativos) q = q.eq('ativo', true)
  return checar(await q)
}
export async function salvarCampo(campo) {
  const q = campo.id
    ? supabase.from('avaliacao_campos').update(campo).eq('id', campo.id)
    : supabase.from('avaliacao_campos').insert(campo)
  return checar(await q.select().single())
}
export async function ultimaAvaliacao(pacienteId) {
  const rows = checar(
    await supabase
      .from('avaliacoes')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('data', { ascending: false })
      .order('criado_em', { ascending: false })
      .limit(1)
  )
  return rows[0] || null
}
export async function salvarAvaliacao(av) {
  const q = av.id
    ? supabase.from('avaliacoes').update(av).eq('id', av.id)
    : supabase.from('avaliacoes').insert(av)
  return checar(await q.select().single())
}

// ---------------- Sessões ----------------
export async function listarSessoes(pacienteId) {
  return checar(
    await supabase
      .from('sessoes')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('data', { ascending: false })
      .order('criado_em', { ascending: false })
  )
}
export async function salvarSessao(s) {
  const q = s.id ? supabase.from('sessoes').update(s).eq('id', s.id) : supabase.from('sessoes').insert(s)
  return checar(await q.select().single())
}
export async function excluirSessao(id) {
  return checar(await supabase.from('sessoes').delete().eq('id', id))
}

// ---------------- Exercícios ----------------
export async function listarExercicios({ incluirInativos = false } = {}) {
  let q = supabase.from('exercicios').select('*').order('nome')
  if (!incluirInativos) q = q.eq('ativo', true)
  return checar(await q)
}
export async function salvarExercicio(e) {
  const q = e.id ? supabase.from('exercicios').update(e).eq('id', e.id) : supabase.from('exercicios').insert(e)
  return checar(await q.select().single())
}
export async function excluirExercicio(id) {
  return checar(await supabase.from('exercicios').delete().eq('id', id))
}
export async function enviarVideo(arquivo) {
  const ext = (arquivo.name.split('.').pop() || 'mp4').toLowerCase()
  const caminho = `${crypto.randomUUID()}.${ext}`
  checar(await supabase.storage.from('exercicios').upload(caminho, arquivo, { contentType: arquivo.type, upsert: false }))
  return caminho
}
export async function removerVideo(caminho) {
  if (!caminho) return
  await supabase.storage.from('exercicios').remove([caminho])
}
export function urlVideo(caminho) {
  if (!caminho || !supabase) return null
  return supabase.storage.from('exercicios').getPublicUrl(caminho).data.publicUrl
}

export async function listarPrescricao(pacienteId) {
  return checar(
    await supabase
      .from('paciente_exercicios')
      .select('*, exercicios(id, nome, video_path, instrucoes)')
      .eq('paciente_id', pacienteId)
      .order('ordem')
  )
}
export async function adicionarPrescricao(item) {
  return checar(await supabase.from('paciente_exercicios').insert(item).select().single())
}
export async function atualizarPrescricao(id, dados) {
  return checar(await supabase.from('paciente_exercicios').update(dados).eq('id', id))
}
export async function removerPrescricao(id) {
  return checar(await supabase.from('paciente_exercicios').delete().eq('id', id))
}

// ---------------- Link do paciente ----------------
export async function statusLink(pacienteId) {
  const rows = checar(
    await supabase
      .from('paciente_tokens')
      .select('id, criado_em, dispositivos(ultimo_acesso)')
      .eq('paciente_id', pacienteId)
      .is('revogado_em', null)
  )
  return rows[0] || null
}
export async function gerarToken(pacienteId) {
  return checar(await supabase.rpc('admin_gerar_token', { p_paciente_id: pacienteId }))
}
export async function revogarToken(pacienteId) {
  return checar(await supabase.rpc('admin_revogar_token', { p_paciente_id: pacienteId }))
}

// ---------------- Fila SOS ----------------
export async function listarSOS() {
  return checar(
    await supabase
      .from('sos_pedidos')
      .select('*, pacientes(id, nome, whatsapp)')
      .order('criado_em', { ascending: false })
      .limit(200)
  )
}
export async function contarSOSNovos() {
  const { count, error } = await supabase
    .from('sos_pedidos')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'novo')
  if (error) return 0
  return count || 0
}
export async function mudarStatusSOS(id, status) {
  return checar(await supabase.from('sos_pedidos').update({ status }).eq('id', id))
}

// ---------------- Acesso do paciente (anon) ----------------
export async function pacienteConfirmar(token, nascimento) {
  return checar(await supabase.rpc('paciente_confirmar', { p_token: token, p_nascimento: nascimento }))
}
export async function pacienteDados(token, chave) {
  return checar(await supabase.rpc('paciente_dados', { p_token: token, p_chave: chave }))
}
export async function pacientePedirSOS(token, chave, triagem) {
  return checar(await supabase.rpc('paciente_pedir_sos', { p_token: token, p_chave: chave, p_triagem: triagem }))
}
