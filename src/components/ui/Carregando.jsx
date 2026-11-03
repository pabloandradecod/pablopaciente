export default function Carregando({ texto = 'Carregando...' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-cinza-600">
      <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-petroleo border-t-transparent" />
      <span className="text-sm font-medium">{texto}</span>
    </div>
  )
}
