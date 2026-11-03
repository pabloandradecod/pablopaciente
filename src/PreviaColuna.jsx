import { useState } from 'react'
import MapaColuna, { LegendaMapa, SeletorSegmentos } from './components/coluna/MapaColuna.jsx'
import Card from './components/ui/Card.jsx'
import Logo from './components/ui/Logo.jsx'

// Página de revisão do mapa da coluna (sem dados de paciente).
export default function PreviaColuna() {
  const [sel, setSel] = useState(['L4', 'L5', 'SACRO', 'ILIACO_D'])
  const alternar = (c) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Logo />
      <h1 className="mt-6 text-2xl font-bold text-petroleo-escuro">Prévia do mapa da coluna</h1>
      <p className="mt-1 text-sm text-cinza-600">
        Vista posterior. À esquerda, como fica no painel (clique para marcar). À direita, como o paciente vê.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-bold text-petroleo-escuro">Painel: modo edição</h2>
          <MapaColuna modo="editar" selecionados={sel} onAlternar={alternar} className="mx-auto w-full max-w-sm" />
          <div className="mt-4">
            <SeletorSegmentos selecionados={sel} onAlternar={alternar} />
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-petroleo-escuro">Link do paciente: só visual</h2>
          <MapaColuna selecionados={sel} className="mx-auto w-full max-w-sm" />
          <div className="mt-3"><LegendaMapa /></div>
        </Card>
      </div>
    </div>
  )
}
