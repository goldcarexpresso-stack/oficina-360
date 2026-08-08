import { useState } from 'react'

export default function Orcamentos() {
  const [cliente, setCliente] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [listaItens, setListaItens] = useState([])

  const adicionarItem = () => {
    if (!servico || !valor) return
    setListaItens([...listaItens, { desc: servico, preco: Number(valor) }])
    setServico('')
    setValor('')
  }

  const totalGeral = listaItens.reduce((acc, item) => acc + item.preco, 0)

  return (
    <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl text-white">
      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">🛠️ Novo Orçamento</h2>
      <p className="text-slate-400 mb-6">Monte o orçamento rápido para o seu cliente</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-2 text-slate-300">Nome do Cliente</label>
          <input 
            type="text" 
            placeholder="Ex: João da Silva" 
            value={cliente} 
            onChange={(e) => setCliente(e.target.value)} 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-slate-300">Veículo / Placa</label>
          <input 
            type="text" 
            placeholder="Ex: Gol - ABC-1234" 
            value={veiculo} 
            onChange={(e) => setVeiculo(e.target.value)} 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <label className="block text-sm mb-2 text-slate-300">Peça ou Serviço</label>
          <input 
            type="text" 
            placeholder="Ex: Troca de Óleo e Filtro" 
            value={servico} 
            onChange={(e) => setServico(e.target.value)} 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-slate-300">Valor (R$)</label>
          <input 
            type="number" 
            placeholder="150" 
            value={valor} 
            onChange={(e) => setValor(e.target.value)} 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <button 
        onClick={adicionarItem}
        className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 font-bold py-3 rounded-xl mb-6 transition"
      >
        + Adicionar Item ao Orçamento
      </button>

      {/* Lista de itens adicionados */}
      <div className="bg-slate-900/60 rounded-2xl p-4 mb-6 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-400 mb-3">ITENS DO ORÇAMENTO:</h3>
        {listaItens.length === 0 ? (
          <p className="text-slate-500 text-sm">Nenhum item adicionado ainda.</p>
        ) : (
          <ul className="space-y-2">
            {listaItens.map((item, index) => (
              <li key={index} className="flex justify-between border-b border-slate-800 pb-2 text-sm">
                <span>{item.desc}</span>
                <span className="font-bold text-emerald-400">R$ {item.preco.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl mb-6">
        <span className="text-lg font-bold">TOTAL GERAL:</span>
        <span className="text-2xl font-black text-emerald-400">R$ {totalGeral.toFixed(2)}</span>
      </div>

      <button 
        onClick={() => alert(`Orçamento gerado para ${cliente || 'Cliente'} no valor de R$ ${totalGeral.toFixed(2)}!`)}
        className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 font-bold py-4 rounded-xl transition shadow-lg"
      >
        Salvar / Finalizar Orçamento
      </button>
    </div>
  )
}

