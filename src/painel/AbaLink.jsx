import { useEffect, useState } from 'react'
import { gerarToken, lerConfiguracoes, revogarToken, statusLink } from '../lib/api.js'
import { formatarDataHora, primeiroNome } from '../lib/datas.js'
import { linkWhatsapp } from '../lib/whatsapp.js'
import { preencher, TEXTOS } from '../lib/textos.js'
import Card from '../components/ui/Card.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Carregando from '../components/ui/Carregando.jsx'

export default function AbaLink({ paciente }) {
  const [status, setStatus] = useState(undefined)
  const [cfg, setCfg] = useState({})
  const [novoLink, setNovoLink] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [erro, setErro] = useState('')

  const carregar = () => statusLink(paciente.id).then(setStatus).catch((e) => setErro(e.message))
  useEffect(() => {
    carregar()
    lerConfiguracoes().then(setCfg).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paciente.id])

  if (status === undefined) return erro ? <p className="text-sm text-alerta">{erro}</p> : <Carregando />

  async function gerar() {
    if (status && !confirm('Já existe um link ativo. Gerar um novo desativa o anterior em todos os aparelhos. Continuar?')) return
    setOcupado(true)
    setErro('')
    try {
      const token = await gerarToken(paciente.id)
      setNovoLink(`${window.location.origin}/p#${token}`)
      await carregar()
    } catch (e) {
      setErro(e.message)
    }
    setOcupado(false)
  }

  async function revogar() {
    if (!confirm('Revogar o link? O paciente perde o acesso até você gerar um novo.')) return
    setOcupado(true)
    await revogarToken(paciente.id).catch((e) => setErro(e.message))
    setNovoLink('')
    await carregar()
    setOcupado(false)
  }

  const mensagem = preencher(cfg.mensagem_link || TEXTOS.mensagemLinkPadrao, {
    nome: primeiroNome(paciente.nome),
    link: novoLink
  })
  const aparelhos = status?.dispositivos || []
  const ultimoAcesso = aparelhos.map((d) => d.ultimo_acesso).sort().at(-1)

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${status ? 'bg-petroleo-claro text-petroleo' : 'bg-cinza-100 text-cinza-600'}`}>
            <Icone nome={status ? 'link' : 'cadeado'} />
          </div>
          <div className="text-sm">
            {status ? (
              <>
                <div className="font-semibold text-tinta">Link ativo desde {formatarDataHora(status.criado_em)}</div>
                <div className="mt-0.5 text-cinza-600">
                  {aparelhos.length === 0
                    ? 'Ainda não foi aberto.'
                    : `Aberto em ${aparelhos.length} aparelho${aparelhos.length > 1 ? 's' : ''}. Último acesso: ${formatarDataHora(ultimoAcesso)}.`}
                </div>
              </>
            ) : (
              <>
                <div className="font-semibold text-tinta">Sem link ativo</div>
                <div className="mt-0.5 text-cinza-600">Gere o link para enviar ao paciente pelo WhatsApp.</div>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Botao onClick={gerar} carregando={ocupado} icone="link">{status ? 'Recriar link' : 'Gerar link'}</Botao>
          {status && <Botao variante="secundario" onClick={revogar} disabled={ocupado}>Revogar</Botao>}
        </div>
        <p className="mt-3 text-xs text-cinza-600">
          Por segurança, o link completo só aparece no momento em que é gerado. Para reenviar, gere um novo.
        </p>
      </Card>

      {novoLink && (
        <Card className="border-petroleo/30">
          <h3 className="font-bold text-petroleo-escuro">Link pronto</h3>
          <div className="mt-2 break-all rounded-xl bg-cinza-50 p-3 font-mono text-xs text-cinza-600">{novoLink}</div>
          <div className="mt-2 whitespace-pre-line rounded-xl border border-cinza-100 p-3 text-sm">{mensagem}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Botao href={linkWhatsapp(paciente.whatsapp, mensagem)} target="_blank" rel="noopener noreferrer" variante="destaque" tamanho="lg" icone="whatsapp">
              Enviar no WhatsApp
            </Botao>
            <Botao
              variante="secundario"
              tamanho="lg"
              icone={copiado ? 'check' : 'copiar'}
              onClick={async () => {
                await navigator.clipboard.writeText(novoLink)
                setCopiado(true)
                setTimeout(() => setCopiado(false), 2000)
              }}
            >
              {copiado ? 'Copiado' : 'Copiar link'}
            </Botao>
          </div>
        </Card>
      )}
      {erro && <p className="text-sm text-alerta">{erro}</p>}
    </div>
  )
}
