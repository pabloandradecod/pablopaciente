import { useState } from 'react'
import { pacienteCheckin } from '../lib/api.js'
import { linkWhatsapp, WHATSAPP_CONSULTORIO } from '../lib/whatsapp.js'
import { formatarDataCurta } from '../lib/datas.js'
import { corDor } from '../components/GraficoEvolucao.jsx'
import { FotosExercicio } from '../components/MidiaExercicio.jsx'
import VideoGuiado, { ehVideoGuiado } from '../components/VideoGuiado.jsx'
import Botao from '../components/ui/Botao.jsx'
import Icone from '../components/ui/Icone.jsx'

const EXERCICIOS = [
  ['todos', 'Todos os dias'],
  ['alguns', 'Alguns dias'],
  ['nenhum', 'Não consegui']
]

// Dor no check-in subiu em relação à última sessão (ou está alta)?
export function dorSubiu(dor, ultimaSessao) {
  const ref = ultimaSessao?.dor_depois ?? ultimaSessao?.dor_antes
  return dor >= 6 || (ref != null && dor >= ref + 2)
}

// ---------------------------------------------------------------- check-in

// "Como está sua coluna hoje?": aparece a partir de 5 dias depois da última sessão, no máximo 1 vez por semana.
export function CheckinCard({ acesso, nome, ultimaSessao, aoResponder }) {
  const [dor, setDor] = useState(null)
  const [exercicios, setExercicios] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  async function enviar() {
    setEnviando(true)
    setErro('')
    try {
      const r = await pacienteCheckin(acesso.token, acesso.chave, dor, exercicios)
      if (!r.ok) throw new Error()
      setEnviado(true)
      aoResponder?.({ dor, exercicios })
    } catch {
      setErro('Não conseguimos registrar agora. Tente de novo em instantes.')
    }
    setEnviando(false)
  }

  if (enviado) {
    const subiu = dorSubiu(dor, ultimaSessao)
    const mensagem = `Sou ${nome}, paciente do Dr. Pablo. Minha dor está em ${dor} de 10 e quero agendar um retorno.`
    return (
      <div className="rounded-[28px] bg-petroleo-escuro p-6 text-white">
        <div className="flex items-center gap-2 text-sm font-bold text-destaque">
          <Icone nome="check" tamanho={18} espessura={2.4} /> Resposta enviada ao Dr. Pablo
        </div>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight">Obrigado, {nome}.</h3>
        {subiu ? (
          <>
            <p className="mt-2 text-[15px] leading-relaxed text-white/80">
              Sua dor está mais alta do que no fim da última sessão. Vale marcar um retorno para o Dr. Pablo avaliar.
            </p>
            <Botao href={linkWhatsapp(WHATSAPP_CONSULTORIO, mensagem)} target="_blank" rel="noopener noreferrer" variante="destaque" tamanho="lg" bloco icone="whatsapp" className="mt-4">
              Marcar retorno pelo WhatsApp
            </Botao>
          </>
        ) : exercicios === 'nenhum' ? (
          <p className="mt-2 text-[15px] leading-relaxed text-white/80">
            Que tal começar hoje com um exercício só? Leva poucos minutos. Seus exercícios estão logo abaixo.
          </p>
        ) : (
          <p className="mt-2 text-[15px] leading-relaxed text-white/80">Continue com os exercícios no seu ritmo. Até a próxima.</p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-[28px] bg-petroleo-escuro p-6 text-white">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-destaque">Check-in da semana</p>
      <h3 className="mt-2 text-2xl font-extrabold leading-tight">Como está sua coluna hoje?</h3>
      <p className="mt-1 text-sm text-white/70">Leva 10 segundos e ajuda o Dr. Pablo a acompanhar você entre as sessões.</p>

      <p className="mt-5 text-sm font-bold">Sua dor agora, de 0 a 10</p>
      <div className="mt-2 grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, n) => (
          <button
            key={n}
            type="button"
            onClick={() => setDor(n)}
            aria-pressed={dor === n}
            className={`h-11 rounded-xl text-sm font-extrabold transition ${dor === n ? 'scale-110 text-petroleo-escuro shadow-lg' : 'bg-white/10 text-white'}`}
            style={dor === n ? { background: corDor(n) === '#0E5C62' ? '#7FC4C9' : corDor(n) } : undefined}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-white/60">
        <span>Sem dor</span>
        <span>Pior dor possível</span>
      </div>

      <p className="mt-5 text-sm font-bold">Fez os exercícios nesta semana?</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {EXERCICIOS.map(([v, t]) => (
          <button
            key={v}
            type="button"
            onClick={() => setExercicios(v)}
            aria-pressed={exercicios === v}
            className={`h-12 rounded-xl text-sm font-bold transition ${exercicios === v ? 'bg-destaque text-petroleo-escuro' : 'bg-white/10 text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {erro && <p className="mt-3 text-sm font-semibold text-destaque">{erro}</p>}
      <Botao variante="destaque" tamanho="lg" bloco className="mt-5" disabled={dor == null || !exercicios} carregando={enviando} onClick={enviar}>
        Enviar para o Dr. Pablo
      </Botao>
    </div>
  )
}

// Respostas anteriores, para a seção de evolução.
export function CheckinsAnteriores({ checkins }) {
  if (!checkins?.length) return null
  return (
    <div className="mt-6 border-t border-cinza-100 pt-5">
      <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-cinza-600">Entre as sessões (suas respostas)</div>
      <div className="flex flex-wrap gap-2">
        {checkins.map((c, i) => (
          <span key={i} className="flex items-center gap-2 rounded-full bg-papel px-3 py-1.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: corDor(c.dor) }} />
            <span className="font-extrabold text-petroleo-escuro">{c.dor}</span>
            <span className="text-xs font-semibold text-cinza-600">{formatarDataCurta(String(c.data).slice(0, 10))}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- plano

export function PlanoCard({ plano, feitas, nome }) {
  const total = plano.sessoes
  const atual = Math.min(feitas, total)
  const concluido = feitas >= total
  const mensagem = `Sou ${nome}, paciente do Dr. Pablo. Concluí meu plano de tratamento e quero marcar uma reavaliação.`
  return (
    <div className="rounded-[28px] border border-petroleo/10 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-petroleo/70">Seu plano de tratamento</p>
          <h3 className="mt-1.5 text-2xl font-extrabold leading-tight tracking-tight text-petroleo-escuro">
            {concluido ? 'Plano concluído' : `Sessão ${atual} de ${total}`}
          </h3>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-petroleo-claro text-sm font-extrabold text-petroleo">
          {Math.round((atual / total) * 100)}%
        </div>
      </div>
      <div className="mt-4 flex gap-1" aria-label={`${atual} de ${total} sessões`}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-2.5 flex-1 rounded-full ${i < atual ? 'bg-petroleo' : 'bg-cinza-100'} ${i === atual && !concluido ? 'bg-destaque' : ''}`} />
        ))}
      </div>
      {plano.objetivo && (
        <p className="mt-4 text-[15px] leading-relaxed text-tinta">
          <span className="font-bold text-petroleo-escuro">Objetivo: </span>
          {plano.objetivo}
        </p>
      )}
      <div className="mt-3 rounded-2xl bg-papel p-3 text-sm text-cinza-600">
        {concluido ? (
          <>
            Continue com os exercícios. Quando quiser, marque uma reavaliação para comparar sua evolução.
            <Botao href={linkWhatsapp(WHATSAPP_CONSULTORIO, mensagem)} target="_blank" rel="noopener noreferrer" variante="secundario" bloco icone="whatsapp" className="mt-3">
              Marcar reavaliação
            </Botao>
          </>
        ) : (
          <>
            <span className="font-bold text-petroleo-escuro">Próxima etapa:</span> sessão {atual + 1}
            {plano.frequencia ? `, ${plano.frequencia}` : ''}. Entre as sessões, os exercícios de casa fazem parte do plano.
          </>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- rotina de crise

export function RotinaCrise({ crise, compacta = false }) {
  if (!crise?.length) return null
  return (
    <ol className="space-y-3">
      {crise.map((e, i) => (
        <li key={i} className="flex gap-3 rounded-2xl border border-cinza-100 bg-white p-2.5">
          <div className="w-28 shrink-0 overflow-hidden rounded-xl">
            {ehVideoGuiado(e.video_path) ? (
              <VideoGuiado caminho={e.video_path} nome={e.nome} compacto />
            ) : e.fotos?.length ? (
              <FotosExercicio fotos={e.fotos} nome={e.nome} proporcaoFixa="aspect-[4/3]" />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-petroleo-claro text-lg font-extrabold text-petroleo">{i + 1}</div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-extrabold leading-tight text-petroleo-escuro">
              {i + 1}. {e.nome.replace(/\s*\(dias de crise\)/i, '')}
            </div>
            <div className="mt-0.5 text-xs font-bold text-tinta">{e.series} × {e.reps}</div>
            {!compacta && e.instrucoes && <p className="mt-1 text-xs leading-relaxed text-cinza-600">{e.instrucoes}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
