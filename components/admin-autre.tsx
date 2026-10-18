"use client"
import { useState, useEffect } from "react"

type MyProduct = {id:number;name:string;priceUSD:number;image:string;category:string;desc:string}

export default function AdminAutre(){
  const [products,setProducts]=useState<MyProduct[]>([])
  const [name,setName]=useState("")
  const [price,setPrice]=useState("")
  const [image,setImage]=useState("")
  const [desc,setDesc]=useState("")

  useEffect(()=>{
    const saved = localStorage.getItem("king_autre_products")
    if(saved) setProducts(JSON.parse(saved))
  },[])

  const publish = ()=>{
    if(!name || !price) return alert("Mets nom et prix KING!")
    const newP: MyProduct = {
      id: Date.now(),
      name,
      priceUSD: parseFloat(price),
      image: image || `https://loremflickr.com/400/400/${name.replace(/ /g,',')}?lock=${Date.now()}`,
      category: "Autre",
      desc
    }
    const updated = [newP, ...products]
    setProducts(updated)
    localStorage.setItem("king_autre_products", JSON.stringify(updated))
    // aussi sauvegarder pour le store principal
    const existing = JSON.parse(localStorage.getItem("king_store_autre") || "[]")
    localStorage.setItem("king_store_autre", JSON.stringify([newP, ...existing]))
    setName(""); setPrice(""); setImage(""); setDesc("")
    alert("✅ PUBLIÉ DANS AUTRE! Va voir dans la boutique KING!")
  }

  const remove = (id:number)=>{
    const updated = products.filter(p=>p.id!==id)
    setProducts(updated)
    localStorage.setItem("king_autre_products", JSON.stringify(updated))
    localStorage.setItem("king_store_autre", JSON.stringify(updated))
  }

  return(
    <div className="min-h-screen bg-black text-white p-4 max-w-[500px] mx-auto">
      <h1 className="text-yellow-400 font-black text-xl mb-2">👑 KING ADMIN - CATÉGORIE AUTRE</h1>
      <p className="text-xs text-zinc-400 mb-4">C'est TOI qui publies ici. Tout ce que tu mets ici va dans "Autre" dans la boutique.</p>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
        <p className="text-xs font-bold mb-3">📦 PUBLIER UN NOUVEAU PRODUIT:</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nom: ex: Montre Casio Dorée" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-2" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Prix en $ : ex: 25" type="number" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-2" />
        <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Lien image (ou vide = auto)" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-2" />
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description petite" className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-3 text-sm mb-3" />
        <button onClick={publish} className="w-full bg-yellow-400 text-black font-black py-3 rounded-xl">+ PUBLIER MAINTENANT DANS AUTRE</button>
      </div>

      <p className="text-sm font-bold mb-3">Tes produits dans Autre ({products.length}):</p>
      <div className="grid grid-cols-2 gap-3">
        {products.map(p=>(
          <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2">
            <img src={p.image} className="w-full h-24 object-cover rounded" />
            <p className="text-xs font-bold mt-2 line-clamp-2">{p.name}</p>
            <p className="text-yellow-400 font-black text-sm">$ {p.priceUSD}</p>
            <button onClick={()=>remove(p.id)} className="w-full mt-2 bg-red-900/50 text-red-400 text-xs py-1 rounded">Supprimer</button>
          </div>
        ))}
      </div>
      {products.length===0 && <p className="text-zinc-600 text-xs text-center mt-10">Aucun produit encore. Publie ton premier KING!</p>}
      
      <div className="mt-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3">
        <p className="text-yellow-400 text-xs font-bold">💡 COMMENT ÇA MARCHE:</p>
        <p className="text-[11px] text-zinc-400 mt-1">1. Tu écris nom + prix + image<br/>2. Tu cliques PUBLIER<br/>3. Ça va direct dans boutique catégorie "Autre"<br/>4. C'est toi qui contrôle, pas automatique!</p>
      </div>
    </div>
  )
}
