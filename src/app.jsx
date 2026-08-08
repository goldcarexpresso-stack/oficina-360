import { useState } from 'react'

function Login({ onLogin }) {
  const [oficina, setOficina] = useState("")
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-black p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border-yellow-500">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2">OFICINA 360</h1>
        <p className="text-center text-gray-400 mb-6 text-sm">Gestão Completa para sua Oficina</p>
        <input value={oficina} onChange={e=>setOficina(e.target.value)} className="w-full p-3 mb-4 rounded bg-zinc-800 border-zinc-700" placeholder="Nome da Oficina" />
        <input className="w-full p-3 mb-6 rounded bg-zinc-800 border border-zinc-700" type="password" placeholder="Senha" />
        <button onClick={()=>onLogin(oficina || "Minha Oficina")} className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400">Acessar Sistema</button>
      </div>
    </div>
  )
}

function Dashboard({ oficina, onLogout }) {
  const [os, setOs] = useState([{id:1, cliente:"João Silva", carro:"Onix", servico:"Pintura Para-choque", status:"Em Andamento"}])
  const [novaOs, setNovaOs] = useState({cliente:"", carro:"", servico:""})
  const [foto, setFoto] = useState("https://placehold.co/100x100/FFD700/000?text=O360")

  const addOS = () => {
    if(novaOs.cliente && novaOs.carro) {
      setOs([...os, {id: Date.now(),...novaOs, status:"Aberta"}])
      setNovaOs({cliente:"", carro:"", servico:""})
    }
  }

  const trocarFoto = (e) => {
    const file = e.target.files[0]
    if(file) setFoto(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img src={foto} className="w-12 h-12 rounded-full border-2 border-yellow-400"/>
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">{oficina}</h1>
            <label className="text-xs text-gray-400 cursor-pointer">Trocar Logo
              <input type="file" className="hidden" onChange={trocarFoto} accept="image/*"/>
            </label>
          </div>
        </div>
        <button onClick={onLogout} className="text-red-400">Sair</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900 p-4 rounded-lg border-yellow-500">
          <p className="text-gray-400 text-sm">OS Abertas</p>
          <p className="text-2xl font-bold text-yellow-400">5</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
          <p className="text-gray-400 text-sm">Faturamento Mês</p>
          <p className="text-2xl font-bold text-green-400">R$ 8.420</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
          <p className="text-gray-400 text-sm">Clientes</p>
          <p className="text-2xl font-bold">42</p>
        </div>
      </div>

      <div className="bg-zinc-900 p-4 rounded-lg mb-6 border border-zinc-800">
        <h2 className="text-lg font-semibold mb-3">Nova Ordem de Serviço</h2>
        <div className="grid grid-cols-1 gap-2">
          <input value={novaOs.cliente} onChange={e=>setNovaOs({...novaOs, cliente:e.target.value})} className="p-2 rounded bg-zinc-800 border-zinc-700" placeholder="Cliente" />
          <input value={novaOs.carro} onChange={e=>setNovaOs({...novaOs, carro:e.target.value})} className="p-2 rounded bg-zinc-800 border-zinc-700" placeholder="Carro" />
          <input value={novaOs.servico} onChange={e=>setNovaOs({...novaOs, servico:e.target.value})} className="p-2 rounded bg-zinc-800 border border-zinc-700" placeholder="Serviço" />
        </div>
        <button onClick={addOS} className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded font-bold">Criar OS</button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
        <h2 className="text-lg font-semibold mb-3">Ordens de Serviço</h2>
        {os.map(o=>(
          <div key={o.id} className="flex justify-between p-3 bg-zinc-800 rounded mb-2">
            <div>
              <p className="font-bold">{o.cliente} - {o.carro}</p>
              <p className="text-sm text-gray-400">{o.servico}</p>
            </div>
            <span className="text-yellow-400 text-sm">{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [logado, setLogado] = useState(false)
  const [oficina, setOficina] = useState("Oficina 360")
  return logado?
    <Dashboard oficina={oficina} onLogout={()=>setLogado(false)} /> :
    <Login onLogin={(nome)=>{setOficina(nome); setLogado(true)}} />
}
