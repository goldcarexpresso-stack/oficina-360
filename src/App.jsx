import { useState } from 'react'
import DeclaracaoRenda from './DeclaracaoRenda'

export default function App() {
  const [nome, setNome] = useState('Gold car expresso')
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)

  const handleLogin = () => {
    // Aqui liberamos o acesso assim que clicar
    setLogado(true)
  }

  // Se já estiver logado, mostra o painel/declaração de renda
  if (logado) {
    return <DeclaracaoRenda nomeOficinaInicial={nome} />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          OFICINA 360
        </h1>
        <p className="text-center text-slate-400 mb-8">Gestão Completa para sua Oficina</p>

        <div className="space-y-4">
          <input 
            type="text"
            placeholder="Nome da Oficina"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
          />
          
          <input 
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
          />
          
          <button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 py-3 rounded-lg font-bold text-lg active:scale-95 transition cursor-pointer"
          >
            Acessar Sistema
          </button>
        </div>

      </div>
    </div>
  )
}
