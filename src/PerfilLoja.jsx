import { useState } from 'react'

export default function PerfilLoja({ onSalvar }) {
  const [nome, setNome] = useState(localStorage.getItem('loja_nome') || 'Gold Care Expresso')
  const [dono, setDono] = useState(localStorage.getItem('dono_nome') || '')
  const [desc, setDesc] = useState(localStorage.getItem('loja_desc') || 'Funilaria, pintura e martelinho em BH - 1 ano de garantia')
  const [salvo, setSalvo] = useState(false)

  function salvar() {
    localStorage.setItem('loja_nome', nome)
    localStorage.setItem('dono_nome', dono)
    localStorage.setItem('loja_desc', desc)
    if (onSalvar) onSalvar({ nome, dono, desc })
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2500)
  }

  return (
    <div className="max-w-4xl mx-auto bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <h2 className="text-lg font-bold text-emerald-400">Perfil da Loja</h2>
      <p className="text-xs text-slate-400 mt-1">Fica salvo neste aparelho. Você troca quando quiser.</p>

      <label className="block text-xs text-slate-400 mt-4 mb-1">Nome da loja</label>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 text-white font-bold outline-none border border-slate-700 focus:border-emerald-500"
        placeholder="Nome da loja"
      />

      <label className="block text-xs text-slate-400 mt-3 mb-1">Seu nome (responsável)</label>
      <input
        value={dono}
        onChange={(e) => setDono(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500"
        placeholder="Seu nome"
      />

      <label className="block text-xs text-slate-400 mt-3 mb-1">Descrição / serviços</label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full h-24 p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500"
        placeholder="Serviços, cidade, garantia..."
      />

      <button
        onClick={salvar}
        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-xl font-bold transition cursor-pointer"
      >
        Salvar perfil
      </button>

      {salvo && <p className="text-center text-emerald-400 text-sm mt-3 font-bold">Perfil salvo neste aparelho.</p>}
    </div>
  )
}
