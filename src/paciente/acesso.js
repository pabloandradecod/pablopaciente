// Guarda token + chave do aparelho. Os dados de saúde nunca ficam no aparelho:
// eles são buscados no servidor a cada abertura.
const CHAVE = 'pp_acesso'

export function lerAcesso() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || {}
  } catch {
    return {}
  }
}

export function gravarAcesso(acesso) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(acesso))
  } catch {
    /* navegação privada: segue só com a sessão atual */
  }
}

export function limparChave() {
  const a = lerAcesso()
  gravarAcesso({ token: a.token })
}

// Lê o token do #hash do link, guarda e limpa a barra de endereço.
export function tokenDoLink() {
  const hash = window.location.hash.replace(/^#/, '').trim()
  const salvo = lerAcesso()
  if (hash && /^[A-Za-z0-9_-]{32,}$/.test(hash)) {
    const acesso = hash === salvo.token ? salvo : { token: hash }
    gravarAcesso(acesso)
    window.history.replaceState(null, '', window.location.pathname)
    return acesso
  }
  return salvo
}
