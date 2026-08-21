import { useState } from 'react'
import DeclaracaoRenda from '../DeclaracaoRenda'
import Orcamentos from './Orcamentos'

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('declaracao')

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-10">
      {/* Barra de Navegação Superior */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setAbaAtiva('declaracao')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition cursor-pointer ${abaAtiva === 'declaracao' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            📄 Declaração de Renda
          </button>
          
          <button 
            onClick={() => setAbaAtiva('orcamentos')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition cursor-pointer ${abaAtiva === 'orcamentos' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            🛠️ Orçamentos
          </button>
        </div>
      </nav>

      {/* Conteúdo Dinâmico */}
      <main className="p-4 mt-4">
        {abaAtiva === 'declaracao' && <DeclaracaoRenda />}
        {abaAtiva === 'orcamentos' && <Orcamentos />}
      </main>
    </div>
  )
}
