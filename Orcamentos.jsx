import { useState, useEffect } from 'react'

export default function Orcamentos() {
  const [cliente, setCliente] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [zap, setZap] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [fotos, setFotos] = useState([])
  const [listaItens, setListaItens] = useState([])
  const [aviso, setAviso] = useState('')
  const [modelos, setModelos] = useState([])

  const loja = localStorage.getItem('loja_nome') || 'Gold Care Expresso'
  const logo = localStorage.getItem('loja_logo') || ''

  useEffect(() => {
    setModelos(JSON.parse(localStorage.getItem('modelos_servicos') || '[]'))
  }, [])

  const handleFileChange = (e) => {
    const arquivos = Array.from(e.target.files || [])
    if (arquivos.length === 0) return
    const novas = arquivos.map((a) => ({ id: Math.random().toString(36).slice(2), url: URL.createObjectURL(a) }))
    setFotos([...fotos, ...novas])
    e.target.value = ''
  }

  const removerFoto = (id) => {
    setFotos(fotos.filter((f) => f.id !== id))
  }

  const usarModelo = (m) => {
    setServico(m.servico)
    setValor(String(m.valor))
  }

  const adicionarItem = () => {
    if (servico && valor) {
      setListaItens([...listaItens, { desc: servico, preco: Number(valor), fotos: fotos }])
      setServico('')
      setValor('')
      setFotos([])
    }
  }

  const removerItem = (index) => {
    setListaItens(listaItens.filter((_, i) => i !== index))
  }

  const totalGeral = listaItens.reduce((acc, item) => acc + item.preco, 0)

  const salvarNoBanco = () => {
    const banco = JSON.parse(localStorage.getItem('banco_ia') || '[]')
    banco.push({
      id: Date.now(),
      loja: loja,
      cliente: cliente,
      veiculo: veiculo,
      itens: listaItens.map((i) => ({ desc: i.desc, preco: i.preco })),
      total: totalGeral,
      data: new Date().toLocaleString('pt-BR'),
    })
    localStorage.setItem('banco_ia', JSON.stringify(banco))
  }

  const enviarWhatsApp = () => {
    if (listaItens.length === 0) {
      setAviso('Adicione pelo menos um item antes de enviar.')
      setTimeout(() => setAviso(''), 3000)
      return
    }

    let texto = '*' + loja + '*\n\n'
    texto += 'Orçamento' + (cliente ? ' para ' + cliente : '') + '\n'
    if (veiculo) texto += 'Veículo: ' + veiculo + '\n'
    texto += '\n'
    listaItens.forEach((item) => {
      texto += '• ' + item.desc + ' — R$ ' + item.preco.toFixed(2) + '\n'
    })
    texto += '\n*TOTAL: R$ ' + totalGeral.toFixed(2) + '*'

    let numero = zap.replace(/\D/g, '')
    if (numero.length === 10 || numero.length === 11) numero = '55' + numero

    salvarNoBanco()

    const url = numero
      ? 'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto)
      : 'https://wa.me/?text=' + encodeURIComponent(texto)

    window.open(url, '_blank')
  }

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white mt-4">
      <div className="flex items-center gap-3 mb-4">
        {logo && <img src={logo} alt="Logo" className="w-14 h-14 object-cover rounded-2xl border border-slate-700" />}
        <div>
          <h2 className="text-2xl font-bold text-emerald-400">Novo Orçamento</h2>
          <p className="text-xs text-slate-400">{loja}</p>
        </div>
      </div>

      <input type="text" placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700 outline-none focus:border-emerald-500" />
      <input type="text" placeholder="Veículo / Placa" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700 outline-none focus:border-emerald-500" />
      <input type="tel" placeholder="WhatsApp do cliente (opcional)" value={zap} onChange={(e) => setZap(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700 outline-none focus:border-emerald-500" />

      <div className="border-t border-slate-700 pt-4 mt-2">
        <h3 className="text-slate-400 mb-2 text-xs font-bold">MEUS SERVIÇOS:</h3>
        {modelos.length === 0 && <p className="text-slate-500 text-xs mb-3">Nenhum serviço cadastrado. Cadastre na aba Perfil.</p>}
        <div className="flex flex-wrap gap-2 mb-4">
          {modelos.map((m) => (
            <button key={m.id} onClick={() => usarModelo(m)} className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold hover:border-emerald-500 transition cursor-pointer">
              R$ {m.valor} · {m.servico.length > 28 ? m.servico.slice(0, 28) + '...' : m.servico}
            </button>
          ))}
        </div>

        <input type="text" placeholder="Peça ou Serviço" value={servico} onChange={(e) => setServico(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700 outline-none focus:border-emerald-500" />
        <input type="number" placeholder="Valor (R$)" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700 outline-none focus:border-emerald-500" />

        <label className="block text-sm text-slate-400 mb-2">Fotos do dano (pode escolher várias):</label>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="mb-3 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer" />

        {fotos.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-slate-400 mb-2">{fotos.length} foto(s) nesta peça</p>
            <div className="grid grid-cols-4 gap-2">
              {fotos.map((f) => (
                <div key={f.id} className="relative">
                  <img src={f.url} className="w-full h-20 object-cover rounded-lg border border-slate-700" />
                  <button onClick={() => removerFoto(f.id)} className="absolute -top-2 -right-2 bg-slate-950 border border-slate-600 text-white w-6 h-6 rounded-full text-xs font-bold cursor-pointer">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={adicionarItem} className="w-full bg-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-500 transition cursor-pointer">
          + Adicionar Item ao Orçamento
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-slate-400 mb-2 text-xs font-bold">ITENS DO ORÇAMENTO:</h3>
        {listaItens.length === 0 && <p className="text-slate-500 text-sm">Nenhum item adicionado ainda.</p>}
        {listaItens.map((item, index) => (
          <div key={index} className="bg-slate-800 p-3 rounded-xl mb-2">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="font-bold">{item.desc}</p>
                <p className="text-emerald-400">R$ {item.preco.toFixed(2)}</p>
              </div>
              <button onClick={() => removerItem(index)} className="text-slate-500 text-xs font-bold px-2 py-1 hover:text-red-400 transition cursor-pointer">
                remover
              </button>
            </div>
            {item.fotos && item.fotos.length > 0 && (
              <div className="grid grid-cols-5 gap-1 mt-2">
                {item.fotos.map((f) => (
                  <img key={f.id} src={f.url} className="w-full h-14 object-cover rounded-lg border border-slate-700" />
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="text-xl font-bold mt-4 text-right">TOTAL GERAL: R$ {totalGeral.toFixed(2)}</div>

        <button onClick={enviarWhatsApp} className="w-full mt-4 bg-emerald-500 py-3 rounded-xl font-bold hover:bg-emerald-400 transition cursor-pointer">
          Enviar no WhatsApp e salvar no Banco
        </button>

        {aviso && <p className="text-center text-amber-400 text-sm mt-3 font-bold">{aviso}</p>}
      </div>
    </div>
  )
        }
