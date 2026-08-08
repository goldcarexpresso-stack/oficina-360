import { useState } from 'react'

export default function DeclaracaoRenda({ nomeOficinaInicial = 'OFICINA 360' }) {
  const [nome, setNome] = useState(nomeOficinaInicial)
  const [mes, setMes] = useState('Agosto')
  const [ano, setAno] = useState('2026')
  const [faturamento, setFaturamento] = useState('25000')
  const [despesas, setDespesas] = useState('12000')

  const gerarPDF = () => {
    alert(`Gerando PDF da Declaração de Renda para ${nome} referentes a ${mes}/${ano}...`)
  }

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white mt-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">📄</span>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Declaração de Renda
        </h2>
      </div>
      <p className="text-slate-400 text-sm mb-6">Gere seu PDF oficial em 10 segundos</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nome da Oficina</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 uppercase font-semibold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Mês</label>
            <select 
              value={mes} 
              onChange={(e) => setMes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
            >
              <option value="Janeiro">Janeiro</option>
              <option value="Fevereiro">Fevereiro</option>
              <option value="Março">Março</option>
              <option value="Abril">Abril</option>
              <option value="Maio">Maio</option>
              <option value="Junho">Junho</option>
              <option value="Julho">Julho</option>
              <option value="Agosto">Agosto</option>
              <option value="Setembro">Setembro</option>
              <option value="Outubro">Outubro</option>
              <option value="Novembro">Novembro</option>
              <option value="Dezembro">Dezembro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Ano</label>
            <input 
              type="text" 
              value={ano} 
              onChange={(e) => setAno(e.target.value)} 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Faturamento Bruto (R$)</label>
          <input 
            type="number" 
            value={faturamento} 
            onChange={(e) => setFaturamento(e.target.value)} 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Despesas (R$)</label>
          <input 
            type="number" 
            value={despesas} 
            onChange={(e) => setDespesas(e.target.value)} 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <button 
          onClick={gerarPDF}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:opacity-90 font-bold py-3.5 rounded-xl transition shadow-lg mt-4 cursor-pointer"
        >
          Baixar PDF da Declaração
        </button>
      </div>
    </div>
  )
}

