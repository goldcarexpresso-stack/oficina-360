import { useState, useEffect } from 'react'

export default function Banco() {
  const [banco, setBanco] = useState([])

  useEffect(() => {
    setBanco(JSON.parse(localStorage.getItem('banco_ia') || '[]'))
  }, [])

  const apagarUm = (id) => {
    const novo = banco.filter((b) => b.id !== id)
    localStorage.setItem('banco_ia', JSON.stringify(novo))
    setBanco(novo)
  }

  const apagarTudo = () => {
    if (window.confirm('Apagar todos os orçamentos salvos neste aparelho?')) {
      localStorage.setItem('banco_ia', JSON.stringify([]))
      setBanco([])
    }
  }

  const totalFaturado = banco.reduce((acc, b) => acc + (b.total || 0), 0)

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white mt-4">
      <h2 className="text-2xl font-bold text-emerald-400">Banco de Orçamentos</h2>
      <p className="text-xs text-slate-400 mt-1">
        {banco.length} orçamento(s) salvos neste aparelho · Total: R$ {totalFaturado.toFixed(2)}
      </p>

      {banco.length === 0 && (
        <p className="text-slate-500 text-sm mt-6">
          Nenhum orçamento salvo ainda. Cada orçamento enviado no WhatsApp aparece aqui.
        </p>
      )}

      <div className="mt-5 space-y-3">
        {banco.slice().reverse().map((b) => (
          <div key={b.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="font-bold">{b.cliente || 'Sem nome'}</p>
                <p className="text-xs text-slate-400">{b.veiculo || 'Veículo não informado'}</p>
              </div>
              <p className="text-emerald-400 font-bold whitespace-nowrap">R$ {(b.total || 0).toFixed(2)}</p>
            </div>

            <div className="mt-3 space-y-1">
              {(b.itens || []).map((i, idx) => (
                <p key={idx} className="text-xs text-slate-300">• {i.desc} — R$ {i.preco.toFixed(2)}</p>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] text-slate-500">{b.data}</p>
              <button onClick={() => apagarUm(b.id)} className="text-slate-500 text-xs font-bold hover:text-red-400 transition cursor-pointer">
                apagar
              </button>
            </div>
          </div>
        ))}
      </div>

      {banco.length > 0 && (
        <button onClick={apagarTudo} className="w-full mt-5 bg-slate-800 border border-slate-700 py-3 rounded-xl font-bold text-slate-400 hover:text-red-400 transition cursor-pointer">
          Limpar todo o banco
        </button>
      )}
    </div>
  )
}
