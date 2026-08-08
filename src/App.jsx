import { useState } from 'react'
import DeclaracaoRenda from './DeclaracaoRenda'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          OFICINA 360
        </h1>
        <p className="text-slate-400 mb-8">Painel de Controle 2026</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">Faturamento do Mês</p>
            <p className="text-3xl font-bold text-emerald-400">R$ 0,00</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">OS em Aberto</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">Clientes Ativos</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [tela, setTela] = useState('dashboard')

  return (
    <div>
      <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-6">
          <button 
            onClick={() => setTela('dashboard')}
            className={`font-semibold transition ${tela === 'dashboard' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setTela('declaracao')}
            className={`font-semibold transition ${tela === 'declaracao' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
          >
            📄 Declaração de Renda
          </button>
        </div>
      </nav>

      {tela === 'dashboard' && <Dashboard />}
      {tela === 'declaracao' && <DeclaracaoRenda />}
    </div>
  )
}
