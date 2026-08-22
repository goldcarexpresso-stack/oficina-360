Vou juntar tudo numa aba só, como você já tem. O que muda no `Orcamentos.jsx`:

- Mantive **igual** o que já funciona: cliente, veículo, itens com foto e total geral.
- Entrou o **nome da loja** vindo do Perfil que você acabou de criar.
- Entraram os **3 modelos rápidos** (polimento, martelinho, pintura localizada) — toca e já preenche serviço e valor, você edita se quiser.
- Entrou o botão **Enviar no WhatsApp**, que monta a mensagem com todos os itens e o total.
- Entrou o **salvamento no Banco** (cada orçamento enviado fica guardado no aparelho). As fotos não são salvas, só o texto — foto não cabe nessa memória do celular.

Como fazer:

1. Abra `src` → toque em **Orcamentos.jsx**.
2. Toque no **lápis** (Edit this file).
3. Segure dentro do código → **Selecionar tudo** → apague.
4. Cole o bloco abaixo inteiro.
5. **Commit changes...** → **Commit changes**.

Depois me diga se ficou ✓ verde.

```
import { useState } from 'react'

const MODELOS = [
  { titulo: 'Polimento (risco no verniz)', servico: 'Polimento técnico - risco superficial no verniz', valor: 450 },
  { titulo: 'Martelinho de ouro', servico: 'Martelinho de ouro - amassado sem quebrar a tinta', valor: 250 },
  { titulo: 'Pintura localizada', servico: 'Funilaria + pintura localizada + polimento (garantia 1 ano)', valor: 1200 },
]

export default function Orcamentos() {
  const [cliente, setCliente] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [zap, setZap] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [foto, setFoto] = useState(null)
  const [listaItens, setListaItens] = useState([])
  const [aviso, setAviso] = useState('')

  const loja = localStorage.getItem('loja_nome') || 'Gold Care Expresso'

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(URL.createObjectURL(e.target.files[0]))
    }
  }

  const usarModelo = (m) => {
    setServico(m.servico)
    setValor(String(m.valor))
  }

  const adicionarItem = () => {
    if (servico && valor) {
      setListaItens([...listaItens, { desc: servico, preco: Number(valor), foto }])
      setServico('')
      setValor('')
      setFoto(null)
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
      <h2 className="text-2xl font-bold text-emerald-400">Novo Orçamento com Fotos</h2>
      <p className="text-xs text-slate-400 mb-4">{loja}</p>

      <input type="text" placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700 outline-none focus:border-emerald-500" />
      <input type="text" placeholder="Veículo / Placa" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700 outline-none focus:border-emerald-500" />
      <input type="tel" placeholder="WhatsApp do cliente (opcional)" value={zap} onChange={(e) => setZap(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-3 border border-slate-700 outline-none focus:border-emerald-500" />

      <div className="border-t border-slate-700 pt-4 mt-2">
        <h3 className="text-slate-400 mb-2 text-xs font-bold">MODELOS RÁPIDOS:</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {MODELOS.map((m, i) => (
            <button key={i} onClick={() => usarModelo(m)} className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold hover:border-emerald-500 transition cursor-pointer">
              {m.titulo}
            </button>
          ))}
        </div>

        <input type="text" placeholder="Peça ou Serviço" value={servico} onChange={(e) => setServico(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700 outline-none focus:border-emerald-500" />
        <input type="number" placeholder="Valor (R$)" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 border border-slate-700 outline-none focus:border-emerald-500" />

        <label className="block text-sm text-slate-400 mb-2">Adicionar foto do dano:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer" />

        {foto && <img src={foto} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-4 border-2 border-emerald-500" />}

        <button onClick={adicionarItem} className="w-full bg-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-500 transition cursor-pointer">
          + Adicionar Item ao Orçamento
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-slate-400 mb-2 text-xs font-bold">ITENS DO ORÇAMENTO:</h3>
        {listaItens.length === 0 && <p className="text-slate-500 text-sm">Nenhum item adicionado ainda.</p>}
        {listaItens.map((item, index) => (
          <div key={index} className="bg-slate-800 p-3 rounded-xl mb-2 flex items-center gap-4">
            {item.foto && <img src={item.foto} className="w-16 h-16 object-cover rounded-lg border border-slate-700" />}
            <div className="flex-1">
              <p className="font-bold">{item.desc}</p>
              <p className="text-emerald-400">R$ {item.preco.toFixed(2)}</p>
            </div>
            <button onClick={() => removerItem(index)} className="text-slate-500 text-xs font-bold px-2 py-1 hover:text-red-400 transition cursor-pointer">
              remover
            </button>
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
```
