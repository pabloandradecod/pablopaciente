import Icone from './Icone.jsx'

const variantes = {
  primario: 'bg-petroleo text-white hover:bg-petroleo-escuro active:bg-petroleo-escuro',
  destaque: 'bg-destaque text-petroleo-escuro hover:brightness-95 active:brightness-90',
  secundario: 'bg-white text-petroleo border border-cinza-200 hover:bg-petroleo-claro',
  fantasma: 'bg-transparent text-petroleo hover:bg-petroleo-claro',
  perigo: 'bg-alerta text-white hover:brightness-95'
}
const tamanhos = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-[15px] gap-2',
  lg: 'h-14 px-5 text-base gap-2.5'
}

export default function Botao({
  variante = 'primario', tamanho = 'md', icone, carregando, bloco, className = '', children, ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${variantes[variante]} ${tamanhos[tamanho]} ${bloco ? 'w-full' : ''} ${className}`}
      disabled={carregando || props.disabled}
      {...props}
    >
      {carregando ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : icone ? (
        <Icone nome={icone} tamanho={tamanho === 'lg' ? 22 : 18} />
      ) : null}
      {children}
    </button>
  )
}
