import { useEffect, useState } from 'react'
import { lerConfiguracoes, listarCampos, salvarCampo, salvarConfiguracao } from '../lib/api.js'
import Card, { TituloSecao } from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import { AreaTexto, Campo, Selecao } from '../components/ui/Campo.jsx'
import Modal from '../components/ui/Modal.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'

const TIPOS = {
  texto: 'Texto curto',
  texto_longo: 'Texto longo',
  escala: 'Escala 0 a 10',
  sim_nao: 'Sim / Não',
  sim_nao_texto: 'Sim / Não + detalhe',
  lista: 'Lista de opções'
}

const paraChave = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40)

export default function Configuracoes() {
  const [cfg, setCfg] = useState(null)
  const [campos, setCampos] = useState(null)
  const [edicao, setEdicao] = useState(null)
  const [msg, setMsg] = useState('')

  const carregarCampos = () => listarCampos({ incluirInativos: true }).then(setCampos)
  useEffect(() => {
    lerConfiguracoes().then(setCfg).catch((e) => setMsg(e.message))
    carregarCampos()
  }, [])

  if (!cfg || !campos) return <Carregando />

  async function salvarTextos() {
    setMsg('')
    try {
      for (const k of ['termo_texto', 'termo_versao', 'mensagem_link']) await salvarConfiguracao(k, cfg[k] || '')
      setMsg('Textos salvos.')
    } catch (e) {
      setMsg(e.message)
    }
  }

  async function salvarEdicao(e) {
    e.preventDefault()
    const c = { ...edicao }
    if (!c.id) c.chave = paraChave(c.chave || c.rotulo)
    c.opcoes = typeof c.opcoes === 'string' ? c.opcoes.split('\n').map((o) => o.trim()).filter(Boolean) : c.opcoes
    c.ordem = Number(c.ordem) || 0
    delete c.criado_em
    try {
      await salvarCampo(c)
      setEdicao(null)
      carregarCampos()
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-petroleo-escuro">Ajustes</h1>

      <Card>
        <TituloSecao
          sub="Ative, desative ou mude a ordem. Campos desativados somem do formulário, mas respostas antigas ficam guardadas."
          acao={<Botao tamanho="sm" icone="mais" onClick={() => setEdicao({ rotulo: '', rotulo_paciente: '', tipo: 'texto', opcoes: '', detalhe_rotulo: '', ordem: (campos.at(-1)?.ordem || 0) + 10, ativo: true, visivel_paciente: true })}>Campo</Botao>}
        >
          Campos da avaliação
        </TituloSecao>
        <ul className="divide-y divide-cinza-100">
          {campos.map((c) => (
            <li key={c.id}>
              <button onClick={() => setEdicao({ ...c, opcoes: (c.opcoes || []).join('\n') })} className="flex w-full items-center gap-3 py-3 text-left">
                <span className={`min-w-0 flex-1 ${c.ativo ? '' : 'opacity-50'}`}>
                  <span className="block font-semibold">{c.rotulo}</span>
                  <span className="text-xs text-cinza-600">
                    {TIPOS[c.tipo]}
                    {!c.ativo && ' · desativado'}
                    {c.ativo && !c.visivel_paciente && ' · só no painel'}
                  </span>
                </span>
                <Icone nome="editar" tamanho={18} className="text-cinza-400" />
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-4">
        <TituloSecao sub="Use {nome} e {link} na mensagem. Eles são trocados automaticamente.">Textos</TituloSecao>
        <AreaTexto id="msg-link" rotulo="Mensagem do WhatsApp ao enviar o link" rows={5} value={cfg.mensagem_link || ''} onChange={(e) => setCfg({ ...cfg, mensagem_link: e.target.value })} />
        <AreaTexto id="termo" rotulo="Termo de consentimento" rows={8} value={cfg.termo_texto || ''} onChange={(e) => setCfg({ ...cfg, termo_texto: e.target.value })} />
        <Campo id="termo-versao" rotulo="Versão do termo" dica="(mude sempre que alterar o texto)" value={cfg.termo_versao || ''} onChange={(e) => setCfg({ ...cfg, termo_versao: e.target.value })} />
        <div className="flex items-center gap-3">
          <Botao onClick={salvarTextos} icone="check">Salvar textos</Botao>
          {msg && <span className={`text-sm font-medium ${msg.includes('salvos') ? 'text-ok' : 'text-alerta'}`}>{msg}</span>}
        </div>
      </Card>

      <Modal aberto={!!edicao} aoFechar={() => setEdicao(null)} titulo={edicao?.id ? 'Editar campo' : 'Novo campo'}>
        {edicao && (
          <form onSubmit={salvarEdicao} className="space-y-4">
            <Campo id="c-rot" rotulo="Rótulo no painel" required value={edicao.rotulo} onChange={(e) => setEdicao({ ...edicao, rotulo: e.target.value })} />
            <Campo id="c-rotp" rotulo="Como o paciente vê" dica="(linguagem simples)" value={edicao.rotulo_paciente || ''} onChange={(e) => setEdicao({ ...edicao, rotulo_paciente: e.target.value })} />
            <Selecao id="c-tipo" rotulo="Tipo" value={edicao.tipo} onChange={(e) => setEdicao({ ...edicao, tipo: e.target.value })} disabled={!!edicao.id}>
              {Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </Selecao>
            {edicao.tipo === 'lista' && (
              <AreaTexto id="c-op" rotulo="Opções" dica="(uma por linha)" rows={4} value={edicao.opcoes} onChange={(e) => setEdicao({ ...edicao, opcoes: e.target.value })} />
            )}
            {edicao.tipo === 'sim_nao_texto' && (
              <Campo id="c-det" rotulo="Pergunta do detalhe" placeholder="Para onde?" value={edicao.detalhe_rotulo || ''} onChange={(e) => setEdicao({ ...edicao, detalhe_rotulo: e.target.value })} />
            )}
            <Campo id="c-ordem" type="number" rotulo="Ordem" value={edicao.ordem} onChange={(e) => setEdicao({ ...edicao, ordem: e.target.value })} className="w-32" />
            <label className="flex items-center gap-3 text-sm font-medium">
              <input type="checkbox" checked={edicao.ativo} onChange={(e) => setEdicao({ ...edicao, ativo: e.target.checked })} className="h-5 w-5 accent-[#0E5C62]" />
              Ativo
            </label>
            <label className="flex items-center gap-3 text-sm font-medium">
              <input type="checkbox" checked={edicao.visivel_paciente} onChange={(e) => setEdicao({ ...edicao, visivel_paciente: e.target.checked })} className="h-5 w-5 accent-[#0E5C62]" />
              Aparece no link do paciente
            </label>
            <Botao type="submit" bloco>Salvar campo</Botao>
          </form>
        )}
      </Modal>
    </div>
  )
}
