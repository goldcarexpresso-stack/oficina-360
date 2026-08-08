import { useState } from 'react'
import jsPDF from 'jspdf'

export default function DeclaracaoRenda() {
  const [mes, setMes] = useState('08')
  const [ano, setAno] = useState('2026')
  const [faturamento, setFaturamento] = useState('')
  const [despesas, setDespesas] = useState('')
  const [nomeOficina, setNomeOficina] = useState('OFICINA 360')

  const gerarPDF = () => {
    const rendaLiquida = Number(faturamento) - Number(despesas)
    
    const doc = new jsPDF()
    
    doc.setFillColor(15, 23, 42)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text(nomeOficina, 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.text('DECLARAÇÃO DE RENDA MENSAL', 105, 30, { align: 'center' })

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text(`Período: ${mes}/${ano}`, 20, 55)
    doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 20, 62)
    
    doc.line(20, 70, 190, 70)

    doc.text(`Faturamento Bruto: R$ ${Number(faturamento).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, 20, 85)
    doc.text(`Despesas: R$ ${Number(despesas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, 20, 95)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text(`RENDA LÍQUIDA: R$ ${rendaLiquida.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, 20, 110)

    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')
    doc.text('Este documento foi gerado automaticamente pelo sistema OFICINA 360', 105, 280, { align: 'center' })

    doc.save(`Declaracao_Renda_${mes}-${ano}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">📄 Declaração de Renda</h1>
        <p className="text-slate-400 mb-8">Gere seu PDF oficial em 10 segundos</p>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-4">
            <label className="block text-sm mb-2 text-slate-300">Nome da Oficina</label>
            <input type="text" value={nomeOficina} onChange={(e)=>setNomeOficina(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 focus:border-emerald-500 outline-none"/>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2 text-slate-300">Mês</label>
              <select value={mes} onChange={(e)=>setMes(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3">
                <option value="01">Janeiro</option><option value="02">Fevereiro</option><option value="03">Março</option>
                <option value="04">Abril</option><option value="05">Maio</option><option value="06">Junho</option>
                <option value="07">Julho</option><option value="08">Agosto</option><option value="09">Setembro</option>
                <option value="10">Outubro</option><option value="11">Novembro</option><option value="12">Dezembro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-slate-300">Ano</label>
              <input type="text" value={ano} onChange={(e)=>setAno(e.target.value)} className="w-full bg-slate-900/50 border-slate-700 rounded-xl p-3"/>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-slate-300">Faturamento Bruto R$</label>
            <input type="number" placeholder="25000" value={faturamento} onChange={(e)=>setFaturamento(e.target.value)} className="w-full bg-slate-900/50 border-slate-700 rounded-xl p-3"/>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2 text-slate-300">Despesas R$</label>
            <input type="number" placeholder="12000" value={despesas} onChange={(e)=>setDespesas(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3"/>
          </div>

          <button onClick={gerarPDF} className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition transform hover:scale-[1.02]">
            Baixar PDF da Declaração
          </button>
        </div>
      </div>
    </div>
  )
}
