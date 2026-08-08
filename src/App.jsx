import { useState } from 'react'
import DeclaracaoRenda from './DeclaracaoRenda'

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('declaracao')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Barra de Navegação Superior */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setAbaAtiva('declaracao')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${abaAtiva === 'declaracao' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            📄 Declaração de Renda
          </button>
          
          <button 
            onClick={() => setAbaAtiva('orcamentos')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${abaAtiva === 'orcamentos' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            🛠️ Orçamentos
          </button>

          <button 
            onClick={() => setAbaAtiva('clientes')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${abaAtiva === 'clientes' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            👥 Clientes
          </button>
        </div>
      </nav>

      {/* Conteúdo Dinâmico da Aba Ativa */}
      <main className="p-4">
        {abaAtiva === 'declaracao' && <DeclaracaoRenda />}
        
        {abaAtiva === 'orcamentos' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl mt-6 text-center">
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Módulo de Orçamentos</h2>
            <p className="text-slate-400">Este é o próximo recurso que vamos ativar para o seu atendimento.</p>
          </div>
        )}

        {abaAtiva === 'clientes' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl mt-6 text-center">
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Módulo de Clientes</h2>
            <p className="text-slate-400">Aqui ficará a lista de cadastros salvos no Supabase.</p>
          </div>
        )}
      </main>
    </div>
  )
}
