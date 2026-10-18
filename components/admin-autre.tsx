"use client"
import { useState, useEffect } from "react"
export default function AdminAutre(){
  const [products,setProducts]=useState<any[]>([])
  const [name,setName]=useState("")
  const [price,setPrice]=useState("")
  const [image,setImage]=useState("")
  useEffect(()=>{const s=localStorage.getItem("king_store_autre"); if(s) setProducts(JSON.parse(s))},[])
  const publish=()=>{
    if(!name||!price) return alert("Nom et prix KING!")
    const p={id:Date.now(),name,priceUSD:parseFloat(price),image:image||`https://loremflickr.com/400/400/${name.replace(/ /g,',')}?lock=${Date.now()}`}
    const updated=[p,...products]
    setProducts(updated)
    localStorage.setItem("king_store_autre",JSON.stringify(updated))
    setName(""); setPrice(""); setImage("")
    alert("✅ PUBLIÉ DANS AUTRE!")
  }
  return(
    <div className="min-h-screen bg-black text-white p-4 max-w-[500px] mx-auto">
      <h1 className="text-yellow-400 font-black">👑 PUBLIER DANS AUTRE</h1>
      <p className="text-xs text-zinc-400 mb-4">Ton cahier catégorie 8) Autre - c'est toi qui publies</p>
      <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mb-6">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nom produit" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-2" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Prix $ ex: 25" type="number" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-2" />
        <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Lien image (optionnel)" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-3" />
        <button onClick={publish} className="w-full bg-yellow-400 text-black font-black py-3 rounded-xl">+ PUBLIER DANS AUTRE</button>
      </div>
      <div className="grid grid-cols-2 gap-3">{products.map(p=><div key={p.id} className="bg-zinc-900 p-2 rounded-xl"><img src={p.image} className="w-full h-24 object-cover rounded"/><p className="text-xs mt-2">{p.name}</p><p className="text-yellow-400 font-bold">$ {p.priceUSD}</p></div>)}</div>
    </div>
  )
}
