import { formatarData } from '../lib/datas.js'
import { TEXTOS } from '../lib/textos.js'
import { formatarTelefone, WHATSAPP_CONSULTORIO } from '../lib/whatsapp.js'
import MapaColuna from '../components/coluna/MapaColuna.jsx'
import { nomeSegmento, TODOS_CODIGOS } from '../components/coluna/segmentos.js'
import { paraLista } from '../components/ui/Campo.jsx'

// Versão para impressão / PDF do resumo do paciente.
// parte: 'completo' (para o médico) ou 'exercicios' (para o educador físico).

function valorTexto(item) {
  const v = item.valor
  if (v == null || v === '') return null
  if (item.tipo === 'escala') return `${v} de 10`
  if (item.tipo === 'multipla') return paraLista(v).join(', ')
  if (item.tipo === 'sim_nao') return v === 'sim' ? 'Sim' : 'Não'
  if (item.tipo === 'sim_nao_texto') {
    const extras = [...paraLista(v.opcoes), ...(v.detalhe ? [v.detalhe] : [])]
    return v.resposta === 'sim' ? `Sim${extras.length ? `: ${extras.join(', ')}` : ''}` : 'Não'
  }
  return String(v)
}

function capa(video) {
  return video?.startsWith('galeria/') ? `/${video.replace(/\.mp4$/, '.webp')}` : null
}

function Titulo({ children }) {
  return <h2 className="mb-2 mt-6 border-b-2 border-[#0E5C62] pb-1 text-[13pt] font-extrabold text-[#0A4247]">{children}</h2>
}

export default function Impressao({ dados, parte }) {
  const { paciente, avaliacao, sessoes, exercicios, treino } = dados
  const treinos = (treino?.treinos || []).filter((t) => t.itens?.length)
  const ultima = sessoes.at(-1)
  const itens = (avaliacao?.itens || []).map((i) => ({ ...i, texto: valorTexto(i) })).filter((i) => i.texto)
  const todos = new Set(sessoes.flatMap((s) => s.segmentos))
  const segmentos = TODOS_CODIGOS.filter((c) => todos.has(c))
  const completo = parte === 'completo'

  return (
    <div className="so-impressao bg-white text-[10.5pt] leading-snug text-[#1B2526]">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between gap-6 border-b border-[#DADEDE] pb-3">
        <img src="/marca/logo-completa.webp" alt="Quiropraxia Dr. Pablo Andrade" style={{ height: 46 }} />
        <div className="text-right text-[9pt] text-[#5C6668]">
          <div className="font-bold text-[#0A4247]">{TEXTOS.profissional}</div>
          <div>{TEXTOS.especialidade} · {TEXTOS.cidade}</div>
          <div>WhatsApp {formatarTelefone(WHATSAPP_CONSULTORIO)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[9pt] font-bold uppercase tracking-[0.15em] text-[#0E5C62]">
          {completo ? 'Resumo de acompanhamento fisioterapêutico' : 'Exercícios do Dr. Pablo e exercícios para academia'}
        </div>
        <h1 className="mt-1 text-[20pt] font-extrabold leading-tight text-[#0A4247]">{paciente.nome}</h1>
        <div className="mt-1 text-[9.5pt] text-[#5C6668]">
          Gerado em {new Date().toLocaleDateString('pt-BR')}
          {sessoes.length > 0 && ` · ${sessoes.length} ${sessoes.length === 1 ? 'sessão' : 'sessões'} · última em ${formatarData(ultima.data)}`}
        </div>
        {!completo && (
          <p className="mt-2 rounded-md bg-[#FDF4D6] p-2 text-[9.5pt]">
            Prezado(a) profissional, este documento resume os exercícios orientados ao paciente. Em caso de dúvida, fale com o Dr. Pablo pelo
            WhatsApp acima.
          </p>
        )}
      </div>

      {completo && itens.length > 0 && (
        <section>
          <Titulo>Avaliação ({formatarData(avaliacao.data)})</Titulo>
          <table className="w-full border-collapse text-[10pt]">
            <tbody>
              {itens.map((i) => (
                <tr key={i.chave} className="border-b border-[#ECEEEE] align-top">
                  <td className="w-[40%] py-1 pr-3 font-semibold text-[#5C6668]">{i.rotulo}</td>
                  <td className="py-1">{i.texto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {completo && sessoes.length > 0 && (
        <section>
          <Titulo>Segmentos tratados e evolução da dor</Titulo>
          <div className="quebra-evitar flex gap-5">
            <div className="w-[24%] shrink-0">
              <MapaColuna selecionados={segmentos} className="w-full" />
              <div className="mt-1 text-center text-[8pt] text-[#5C6668]">Em amarelo: segmentos tratados (vista posterior)</div>
            </div>
            <table className="h-fit w-full border-collapse text-[9.5pt]">
              <thead>
                <tr className="bg-[#E7F1F1] text-left text-[#0A4247]">
                  <th className="px-2 py-1">Sessão</th>
                  <th className="px-2 py-1">Dor antes</th>
                  <th className="px-2 py-1">Dor depois</th>
                  <th className="px-2 py-1">Segmentos tratados</th>
                </tr>
              </thead>
              <tbody>
                {sessoes.map((s, k) => (
                  <tr key={k} className="border-b border-[#ECEEEE] align-top">
                    <td className="px-2 py-1 whitespace-nowrap">{formatarData(s.data)}</td>
                    <td className="px-2 py-1">{s.dor_antes ?? '–'}/10</td>
                    <td className="px-2 py-1">{s.dor_depois ?? '–'}/10</td>
                    <td className="px-2 py-1">{s.segmentos.map(nomeSegmento).join(', ') || '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {exercicios.length > 0 && (
        <section>
          <Titulo>Exercícios do Dr. Pablo (para fazer em casa)</Titulo>
          <table className="w-full border-collapse text-[10pt]">
            <tbody>
              {exercicios.map((e, k) => (
                <tr key={k} className="quebra-evitar border-b border-[#ECEEEE] align-top">
                  <td className="w-[62px] py-2 pr-3">
                    {capa(e.video_path) ? (
                      <img src={capa(e.video_path)} alt="" className="h-[56px] w-[56px] object-contain" />
                    ) : (
                      <div className="flex h-[56px] w-[56px] items-center justify-center rounded bg-[#E7F1F1] text-[14pt] font-extrabold text-[#0E5C62]">{k + 1}</div>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="font-bold text-[#0A4247]">
                      {e.nome} <span className="font-semibold text-[#1B2526]">· {e.series} séries × {e.reps}</span>
                    </div>
                    {e.instrucoes && <div className="mt-0.5">{e.instrucoes}</div>}
                    {e.observacao && <div className="mt-0.5 text-[9.5pt] text-[#5C6668]">Cuidado: {e.observacao}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {treinos.length > 0 && (
        <section>
          <Titulo>Exercícios para academia (sugestão de treino A, B e C)</Titulo>
          <p className="mb-2 text-[9pt] text-[#5C6668]">
            Sugestão de referência do fisioterapeuta, não uma prescrição obrigatória. Não substitui o acompanhamento de um profissional de
            educação física.
          </p>
          {treinos.map((t) => (
            <div key={t.letra} className="quebra-evitar mb-3">
              <div className="mb-1 font-extrabold text-[#0A4247]">
                Treino {t.letra}
                {t.foco && <span className="font-semibold text-[#5C6668]"> · {t.foco}</span>}
              </div>
              <table className="w-full border-collapse text-[9.5pt]">
                <tbody>
                  {t.itens.map((i, k) => (
                    <tr key={k} className="border-b border-[#ECEEEE] align-top">
                      <td className="w-[44px] py-1 pr-2">{capa(i.video) && <img src={capa(i.video)} alt="" className="h-[38px] w-[38px] object-contain" />}</td>
                      <td className="py-1 font-semibold">{i.nome}</td>
                      <td className="py-1 whitespace-nowrap px-2">{i.series} × {i.reps}</td>
                      <td className="py-1 text-[#5C6668]">{i.observacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {treino?.observacao && <p className="text-[9.5pt]">{treino.observacao}</p>}
        </section>
      )}

      <div className="mt-8 border-t border-[#DADEDE] pt-2 text-[8.5pt] text-[#5C6668]">
        {TEXTOS.rodapeLegal} Documento gerado pelo paciente a partir do seu link de acompanhamento.
      </div>
    </div>
  )
}
