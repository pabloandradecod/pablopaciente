import { useState } from 'react'
import { pacientePedirSOS } from '../lib/api.js'
import { linkWhatsapp, WHATSAPP_CONSULTORIO } from '../lib/whatsapp.js'
import { preencher, TEXTOS } from '../lib/textos.js'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'
import Modal from '../components/ui/Modal.jsx'

const T = TEXTOS.sos

// Botão fixo no rodapé + triagem de sinais de alerta (cauda equina).
export default function BotaoSOS({ token, chave, nome }) {
  const [aberto, setAberto] = useState(false)
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto max-w-xl">
          <Botao variante="destaque" tamanho="lg" bloco icone="sirene" onClick={() => setAberto(true)} className="shadow-[0_6px_20px_-6px_rgba(244,197,66,0.8)]">
            {T.botao}
          </Botao>
        </div>
      </div>
      {aberto && <Triagem token={token} chave={chave} nome={nome} aoFechar={() => setAberto(false)} />}
    </>
  )
}

function Triagem({ token, chave, nome, aoFechar }) {
  const [respostas, setRespostas] = useState({})
  const [etapa, setEtapa] = useState('perguntas') // perguntas | alerta | registrado | erro
  const [enviando, setEnviando] = useState(false)

  const completas = T.perguntas.every((p) => typeof respostas[p.chave] === 'boolean')
  const algumSim = T.perguntas.some((p) => respostas[p.chave] === true)
  const mensagem = preencher(T.mensagem, { nome })

  async function continuar() {
    if (algumSim) return setEtapa('alerta')
    setEnviando(true)
    try {
      const r = await pacientePedirSOS(token, chave, respostas)
      if (r.ok) setEtapa('registrado')
      else if (r.erro === 'sinal_alerta') setEtapa('alerta')
      else setEtapa('erro')
    } catch {
      setEtapa('erro')
    }
    setEnviando(false)
  }

  if (etapa === 'alerta') {
    return (
      <Modal aberto aoFechar={aoFechar} titulo="">
        <div className="-mt-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-alerta-claro text-alerta">
            <Icone nome="alerta" tamanho={34} />
          </div>
          <h3 className="mt-4 text-2xl font-extrabold text-alerta">{T.alertaTitulo}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-tinta">{T.alertaTexto}</p>
          <Botao href="tel:192" variante="perigo" tamanho="lg" bloco icone="telefone" className="mt-6">
            {T.alertaAcao}
          </Botao>
          <p className="mt-3 text-sm text-cinza-600">Ou vá direto ao pronto-socorro mais próximo.</p>
        </div>
      </Modal>
    )
  }

  if (etapa === 'registrado' || etapa === 'erro') {
    return (
      <Modal aberto aoFechar={aoFechar} titulo={etapa === 'registrado' ? 'Pedido registrado' : 'Fale com o consultório'}>
        <div className="rounded-2xl bg-petroleo-claro p-4">
          <div className="flex items-center gap-2 font-semibold text-petroleo-escuro">
            <Icone nome="relogio" tamanho={20} />
            {T.expectativa}
          </div>
          <p className="mt-1 text-sm text-petroleo-escuro/80">Envie a mensagem abaixo para combinar o dia e o horário.</p>
        </div>
        {etapa === 'erro' && <p className="mt-3 text-sm text-cinza-600">Não conseguimos registrar o pedido agora, mas você pode avisar pelo WhatsApp.</p>}
        <div className="mt-4 rounded-2xl border border-cinza-100 bg-cinza-50 p-3 text-sm text-tinta">“{mensagem}”</div>
        <Botao
          href={linkWhatsapp(WHATSAPP_CONSULTORIO, mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          variante="primario"
          tamanho="lg"
          bloco
          icone="whatsapp"
          className="mt-4"
        >
          {T.confirmar}
        </Botao>
      </Modal>
    )
  }

  return (
    <Modal aberto aoFechar={aoFechar} titulo={T.titulo}>
      <p className="-mt-2 mb-4 text-sm text-cinza-600">{T.subtitulo}</p>
      <div className="space-y-4">
        {T.perguntas.map((p, i) => (
          <div key={p.chave}>
            <p className="mb-2 text-[15px] font-semibold">
              {i + 1}. {p.texto}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                [true, 'Sim'],
                [false, 'Não']
              ].map(([v, t]) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRespostas((r) => ({ ...r, [p.chave]: v }))}
                  aria-pressed={respostas[p.chave] === v}
                  className={`h-12 rounded-xl border text-[15px] font-semibold transition ${
                    respostas[p.chave] === v
                      ? v
                        ? 'border-alerta bg-alerta text-white'
                        : 'border-petroleo bg-petroleo text-white'
                      : 'border-cinza-200 bg-white text-tinta'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Botao tamanho="lg" bloco className="mt-6" disabled={!completas} carregando={enviando} onClick={continuar}>
        Continuar
      </Botao>
    </Modal>
  )
}
