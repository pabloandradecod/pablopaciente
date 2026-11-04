// Mostra o relatório (markdown simples: ##, -, **negrito**) sem bibliotecas.
function emLinha(t) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p))
}

export default function TextoRelatorio({ texto }) {
  const linhas = (texto || '').split('\n')
  const blocos = []
  let lista = []
  const fecharLista = () => {
    if (lista.length) blocos.push(<ul key={`l${blocos.length}`} className="my-2 list-disc space-y-1 pl-5">{lista}</ul>)
    lista = []
  }
  linhas.forEach((l, i) => {
    const t = l.trim()
    if (!t) return fecharLista()
    if (/^#{1,4}\s/.test(t)) {
      fecharLista()
      blocos.push(<h4 key={i} className="mt-4 text-[13px] font-extrabold uppercase tracking-wide text-petroleo first:mt-0">{t.replace(/^#+\s*/, '')}</h4>)
    } else if (/^[-*•]\s/.test(t) || /^\d+[.)]\s/.test(t)) {
      lista.push(<li key={i}>{emLinha(t.replace(/^([-*•]|\d+[.)])\s*/, ''))}</li>)
    } else {
      fecharLista()
      blocos.push(<p key={i} className="my-1.5">{emLinha(t)}</p>)
    }
  })
  fecharLista()
  return <div className="text-[14px] leading-relaxed text-tinta">{blocos}</div>
}
