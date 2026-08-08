import { useState } from 'react'

export default function Orcamentos() {
  const [cliente, setCliente] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [foto, setFoto] = useState(null)
  const [listaItens, setListaItens] = useState([])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(URL.createObjectURL(e.target.files[0]))
    }
  }

  const adicionarItem = () => {
    if (servico && valor) {
      setListaItens([...listaItens, { desc: servico, preco: Number(valor), foto }])
      setServico('')
      setValor('')
      setFoto(null)
    }
  }

  const totalGeral = listaItens.reduce((acc, item) => acc + item.preco, 0)

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white mt-4">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Novo Orçamento</h2>
      
      <input type="text" placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700" />
      <input type="text" placeholder="Veículo / Placa" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700" />
      
      <div className="border-t border-slate-700 pt-4 mt-2">
        <input type="text" placeholder="Peça ou Serviço" value={servico} onChange={(e) => setServico(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700" />
        <input type="number" placeholder="Valor (R$)" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700" />
        
        <label className="block text-sm text-slate-400 mb-2">Adicionar foto do dano:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 text-sm" />
        
        {foto && <img src={foto} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-4 border-2 border-emerald-500" />}
        
        <button onClick={adicionarItem} className="w-full bg-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-500 transition">
          + Adicionar Item
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-slate-400 mb-2">ITENS DO ORÇAMENTO:</h3>
        {listaItens.map((item, index) => (
          <div key={index} className="bg-slate-800 p-3 rounded-xl mb-2 flex items-center gap-4">
            {item.foto && <img src={item.foto} className="w-16 h-16 object-cover rounded-lg" />}
            <div>
              <p className="font-bold">{item.desc}</p>
              <p className="text-emerald-400">R$ {item.preco.toFixed(2)}</p>
            </div>
          </div>
        ))}
        <div className="text-xl font-bold mt-4 text-right">TOTAL GERAL: R$ {totalGeral.toFixed(2)}</div>
      </div>
    </div>
  )
}
}

