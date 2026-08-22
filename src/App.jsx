import { useState } from 'react'
import DeclaracaoRenda from '../DeclaracaoRenda'
import Orcamentos from './Orcamentos'
import Banco from './Banco'
import PerfilLoja from './PerfilLoja'

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('declaracao')
  const [loja, setLoja] = useState(localStorage.getItem('loja_nome') || 'Gold Care Expresso')

  const abas = [
    { id: 'declaracao', label: '📄 Declaração de Renda' },
    { id: 'orcamentos', label: '🛠️ Orçamentos' },
    { id: 'banco', label: '📚 Banco' },
    { id: 'perfil', label: '⚙️ Perfil' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-10">
      {/* Barra de Navegação Superior */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50">
        <p className="text-center text-xs text-slate-500 mb-3 font-bold">{loja}</p>
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
          {abas.map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition cursor-pointer ${abaAtiva === aba.id ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              {aba.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Conteúdo Dinâmico */}
      <main className="p-4 mt-4">
        {abaAtiva === 'declaracao' && <DeclaracaoRenda />}
        {abaAtiva === 'orcamentos' && <Orcamentos />}
        {abaAtiva === 'banco' && <Banco />}
        {abaAtiva === 'perfil' && <PerfilLoja onSalvar={(p) => setLoja(p.nome)} />}
      </main>
    </div>
  )
}
