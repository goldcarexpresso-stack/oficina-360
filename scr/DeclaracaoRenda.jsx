import { useState } from 'react'

export default function DeclaracaoRenda() {
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('2026')
  const [faturamento, setFaturamento] = useState('')
  const [despesas, setDespesas] = useState('')

  const gerarPDF = () => {
    const rendaLiquida = faturamento - despesas
    alert(`PDF Gerado!\nMês: ${mes}/${ano}\nFaturamento: R$ ${faturamento}\nDespesas: R$ ${despesas}\nRenda Líquida: R$ ${rendaLiquida}`)
    // Aqui depois a gente conecta com biblioteca pra gerar PDF de verdade
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">📄 Declaração de Renda</h1>
        <p className="text-slate-400 mb-8">Gere sua declaração em 30 segundos</p>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">Mês</label>
              <select value={mes} onChange={(e)=>setMes(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3">
                <option value="">Selecione</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                {/* ... até dezembro */}
                <option value="08">Agosto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Ano</label>
              <input type="text" value={ano} onChange={(e)=>setAno(e.target.value)} className="w-full bg-slate-900 border-slate-700 rounded-lg p-3"/>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Faturamento Bruto R$</label>
            <input type="number" value={faturamento} onChange={(e)=>setFaturamento(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"/>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Despesas R$</label>
            <input type="number" value={despesas} onChange={(e)=>setDespesas(e.target.value)} className="w-full bg-slate-900 border-slate-700 rounded-lg p-3"/>
          </div>

          <button onClick={gerarPDF} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition">
            Gerar e Enviar Declaração
          </button>
        </div>
      </div>
    </div>
  )
}
