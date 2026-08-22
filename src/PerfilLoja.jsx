import { useState, useEffect } from 'react'

const MODELOS_PADRAO = [
  { id: 1, servico: 'Polimento técnico - risco superficial no verniz', valor: 450 },
  { id: 2, servico: 'Martelinho de ouro - amassado sem quebrar a tinta', valor: 250 },
  { id: 3, servico: 'Funilaria + pintura localizada + polimento (garantia 1 ano)', valor: 1200 },
]

export default function PerfilLoja({ onSalvar }) {
  const [nome, setNome] = useState(localStorage.getItem('loja_nome') || 'Gold Care Expresso')
  const [dono, setDono] = useState(localStorage.getItem('dono_nome') || '')
  const [desc, setDesc] = useState(localStorage.getItem('loja_desc') || 'Funilaria, pintura e martelinho - 1 ano de garantia')
  const [logo, setLogo] = useState(localStorage.getItem('loja_logo') || '')
  const [salvo, setSalvo] = useState(false)

  const [modelos, setModelos] = useState([])
  const [novoServico, setNovoServico] = useState('')
  const [novoValor, setNovoValor] = useState('')

  useEffect(() => {
    const guardados = localStorage.getItem('modelos_servicos')
    if (guardados) {
      setModelos(JSON.parse(guardados))
    } else {
      setModelos(MODELOS_PADRAO)
      localStorage.setItem('modelos_servicos', JSON.stringify(MODELOS_PADRAO))
    }
  }, [])

  const gravarModelos = (lista) => {
    setModelos(lista)
    localStorage.setItem('modelos_servicos', JSON.stringify(lista))
  }

  const escolherLogo = (e) => {
    const arquivo = e.target.files && e.target.files[0]
    if (!arquivo) return

    const leitor = new FileReader()
    leitor.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const max = 400
        let l = img.width
        let a = img.height
        if (l > a && l > max) {
          a = Math.round((a * max) / l)
          l = max
        } else if (a >= l && a > max) {
          l = Math.round((l * max) / a)
          a = max
        }
        const tela = document.createElement('canvas')
        tela.width = l
        tela.height = a
        tela.getContext('2d').drawImage(img, 0, 0, l, a)
        const reduzida = tela.toDataURL('image/jpeg', 0.8)
        try {
          localStorage.setItem('loja_logo', reduzida)
          setLogo(reduzida)
        } catch (erro) {
          alert('Não foi possível salvar a logo. Tente uma imagem menor.')
        }
      }
      img.src = ev.target.result
    }
    leitor.readAsDataURL(arquivo)
  }

  const removerLogo = () => {
    localStorage.removeItem('loja_logo')
    setLogo('')
  }

  const salvar = () => {
    localStorage.setItem('loja_nome', nome)
    localStorage.setItem('dono_nome', dono)
    localStorage.setItem('loja_desc', desc)
    if (onSalvar) onSalvar({ nome, dono, desc })
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2500)
  }

  const adicionarModelo = () => {
    if (!novoServico || !novoValor) return
    gravarModelos([...modelos, { id: Date.now(), servico: novoServico, valor: Number(novoValor) }])
    setNovoServico('')
    setNovoValor('')
  }

  const alterarModelo = (id, campo, valor) => {
    gravarModelos(modelos.map((m) => (m.id === id ? { ...m, [campo]: campo === 'valor' ? Number(valor) : valor } : m)))
  }

  const removerModelo = (id) => {
    gravarModelos(modelos.filter((m) => m.id !== id))
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
        <h2 className="text-xl font-bold text-emerald-400">Perfil da Loja</h2>
        <p className="text-xs text-slate-400 mt-1">Fica salvo neste aparelho. Você troca quando quiser.</p>

        <label className="block text-xs text-slate-400 mt-4 mb-2">Logo da loja</label>
        {logo && (
          <div className="mb-3">
            <img src={logo} alt="Logo" className="w-28 h-28 object-cover rounded-2xl border-2 border-emerald-500" />
            <button onClick={removerLogo} className="text-xs text-slate-500 font-bold mt-2 hover:text-red-400 transition cursor-pointer">
              remover logo
            </button>
          </div>
        )}
        <input type="file" accept="image/*" onChange={escolherLogo} className="mb-2 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer" />

        <label className="block text-xs text-slate-400 mt-4 mb-1">Nome da loja</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white font-bold outline-none border border-slate-700 focus:border-emerald-500" placeholder="Nome da loja" />

        <label className="block text-xs text-slate-400 mt-3 mb-1">Seu nome (responsável)</label>
        <input value={dono} onChange={(e) => setDono(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500" placeholder="Seu nome" />

        <label className="block text-xs text-slate-400 mt-3 mb-1">Descrição / serviços</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full h-24 p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500" placeholder="Serviços, cidade, garantia..." />

        <button onClick={salvar} className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-xl font-bold transition cursor-pointer">
          Salvar perfil
        </button>

        {salvo && <p className="text-center text-emerald-400 text-sm mt-3 font-bold">Perfil salvo neste aparelho.</p>}
      </div>

      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
        <h2 className="text-xl font-bold text-emerald-400">Meus Serviços</h2>
        <p className="text-xs text-slate-400 mt-1">
          {modelos.length} cadastrado(s). Aparecem como atalho na tela de Orçamentos. Edite o texto ou o valor direto aqui.
        </p>

        <div className="mt-4 space-y-3">
          {modelos.map((m) => (
            <div key={m.id} className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
              <textarea value={m.servico} onChange={(e) => alterarModelo(m.id, 'servico', e.target.value)} className="w-full h-16 p-2 rounded-xl bg-slate-900 text-white text-sm outline-none border border-slate-700 focus:border-emerald-500" />
              <div className="flex items-center gap-3 mt-2">
                <input type="number" value={m.valor} onChange={(e) => alterarModelo(m.id, 'valor', e.target.value)} className="flex-1 p-2 rounded-xl bg-slate-900 text-emerald-400 font-bold outline-none border border-slate-700 focus:border-emerald-500" />
                <button onClick={() => removerModelo(m.id)} className="text-slate-500 text-xs font-bold px-2 hover:text-red-400 transition cursor-pointer">
                  apagar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-700 pt-4">
          <label className="block text-xs text-slate-400 mb-2">Cadastrar novo serviço</label>
          <input value={novoServico} onChange={(e) => setNovoServico(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500" placeholder="Ex: Troca de para-choque dianteiro" />
          <input type="number" value={novoValor} onChange={(e) => setNovoValor(e.target.value)} className="w-full mt-2 p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500" placeholder="Valor (R$)" />
          <button onClick={adicionarModelo} className="w-full mt-3 bg-slate-800 border border-emerald-600 text-emerald-400 p-3 rounded-xl font-bold hover:bg-slate-700 transition cursor-pointer">
            + Cadastrar serviço
          </button>
        </div>
      </div>
    </div>
  )
}
