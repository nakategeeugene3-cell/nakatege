"use client"
import { useState, useMemo, useEffect } from "react"
import { catalog as baseCatalog } from "@/lib/catalog"

type AnyProduct = any

export default function Storefront(){
  const [allProducts,setAllProducts]=useState<AnyProduct[]>(baseCatalog)
  const [cat,setCat]=useState("Autre")
  const [show,setShow]=useState(20)
  const [search,setSearch]=useState("")

  useEffect(()=>{
    const saved = localStorage.getItem("king_store_autre")
    if(saved){
      try{
        const autreProducts = JSON.parse(saved).map((p:any)=>({...p, subCategory:"Autre", brand:"KING", rating:"5.0", reviews:1, video:"", price:p.priceUSD*129}))
        setAllProducts([...autreProducts, ...baseCatalog])
      }catch{}
    }
  },[])

  const categoryNames = ["Autre","Électronique","Électroménager","Éclairage","Construction","Habillement & Maison","Voitures & Motos","Cosmétiques & Soins","Matériel Scolaire & Ménage"]

  const filtered = useMemo(()=>{
    let f=allProducts
    if(search) f=f.filter((p:any)=>p.name.toLowerCase().includes(search.toLowerCase()))
    else {
      if(cat==="Autre") f=f.filter((p:any)=>p.category==="Autre" || p.subCategory==="Autre")
      else f=f.filter((p:any)=>p.category===cat)
    }
    return f
  },[cat,search,allProducts])

  const isAutreEmpty = cat==="Autre" && filtered.length===0

  return(
    <div className="min-h-screen bg-[#f5f5f5] text-black max-w-[500px] mx-auto pb-20">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="p-2 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#f2f2f2] rounded-full px-3 py-2">
            <span>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent outline-none text-sm" />
          </div>
          <a href="/admin" className="bg-yellow-400 text-black text-xs font-black px-3 py-2 rounded-full flex items-center">+ PUBLIER</a>
        </div>
        <div className="flex gap-2 overflow-x-auto px-2 py-2">
          {categoryNames.map(c=>(
            <button key={c} onClick={()=>{setCat(c); setShow(20)}} className={`whitespace-nowrap text-[12px] px-3 py-1.5 rounded-full border font-bold ${cat===c?"bg-black text-yellow-400 border-black":"bg-white text-gray-600"}`}>{c} {c==="Autre" ? `(${allProducts.filter((p:any)=>p.category==="Autre"||p.subCategory==="Autre").length})` : ""}</button>
          ))}
        </div>
      </div>

      <div className="bg-black text-yellow-400 p-2 text-[11px] font-bold flex justify-between">
        <span>👑 CATÉGORIE: {cat.toUpperCase()} - ${" "} DOLLAR</span>
        <span>{filtered.length} produits</span>
      </div>

      {isAutreEmpty ? (
        <div className="bg-white m-3 p-10 rounded-xl text-center">
          <p className="text-5xl mb-3">📦</p>
          <p className="font-black text-sm">Catégorie AUTRE vide</p>
          <p className="text-xs text-gray-500 mt-2">C'est toi qui publies ici KING!<br/>Clique en haut + PUBLIER pour ajouter ton premier produit.</p>
          <a href="/admin" className="inline-block mt-4 bg-yellow-400 text-black font-black px-6 py-3 rounded-xl text-sm">+ PUBLIER MON PREMIER PRODUIT</a>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[1px] bg-[#e0e0e0]">
          {filtered.slice(0,show).map((p:any)=>(
            <div key={p.id} className="bg-white p-2">
              <img src={p.image} alt={p.name} className="w-full h-[140px] object-cover rounded" />
              <p className="text-[10px] text-gray-400 uppercase">{p.category}</p>
              <p className="text-[11px] mt-1 line-clamp-2 h-8 font-bold">{p.name}</p>
              <p className="font-black text-[14px] mt-1">$ {(p.priceUSD || p.price/129 || 0).toFixed ? `$ ${(p.priceUSD||p.price/129).toFixed(2)}` : `$ ${p.priceUSD}`}</p>
              <button className="w-full mt-2 bg-yellow-400 text-black text-[11px] font-bold py-1.5 rounded">+ Ajouter</button>
            </div>
          ))}
        </div>
      )}

      {filtered.length>show && <div className="flex justify-center p-4 bg-white"><button onClick={()=>setShow(s=>s+40)} className="border px-6 py-2 rounded-full text-sm">Voir plus ({filtered.length-show})</button></div>}
    </div>
  )
}
