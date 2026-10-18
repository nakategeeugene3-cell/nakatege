"use client"
import { useState, useMemo, useEffect } from "react"
import { catalog as baseCatalog, categoryNames } from "@/lib/catalog"

export default function Storefront(){
  const [cat,setCat]=useState("1) Electronique")
  const [all,setAll]=useState<any[]>(baseCatalog)

  useEffect(()=>{
    const s=localStorage.getItem("king_store_autre")
    if(s){
      try{
        const a=JSON.parse(s).map((p:any)=>({id:p.id,name:p.name,brand:"KING",category:"8) Autre",subCategory:"Autre",priceUSD:p.priceUSD,image:p.image,rating:"5.0",reviews:1}))
        setAll([...a,...baseCatalog])
      }catch{}
    }else setAll(baseCatalog)
  },[])

  const filtered = useMemo(()=> all.filter(p=>p.category===cat),[cat,all])

  return(
    <div className="min-h-screen bg-[#f5f5f5] text-black max-w-[500px] mx-auto">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="p-2 flex gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm">🔍 {cat} - {filtered.length} produits</div>
          <a href="/admin" className="bg-yellow-400 text-black font-black px-4 py-2 rounded-full text-xs">+ AUTRE</a>
        </div>
        <div className="flex gap-1 overflow-x-auto px-2 py-2">
          {categoryNames.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`whitespace-nowrap px-3 py-2 rounded-full text-[11px] font-black border ${cat===c?"bg-black text-yellow-400":"bg-white"}`}>{c}</button>
          ))}
        </div>
        <div className="bg-black text-yellow-400 text-[11px] p-2 font-bold">📍 TU ES: {cat} = {filtered.length} PRODUITS - CHANGE VRAIMENT ICI</div>
      </div>

      <div className="grid grid-cols-2 gap-1 bg-gray-200">
        {filtered.map((p:any)=>(
          <div key={p.id} className="bg-white p-2">
            <img src={p.image} className="w-full h-32 object-cover rounded"/>
            <p className="text-[10px] bg-black text-white inline-block px-1 rounded mt-1">{p.subCategory}</p>
            <p className="text-xs font-bold mt-1 line-clamp-2 h-8">{p.name}</p>
            <p className="font-black">$ {p.priceUSD}</p>
            <p className="text-[10px] text-gray-500">{p.brand}</p>
          </div>
        ))}
      </div>

      {filtered.length===0 && <div className="p-10 text-center bg-white m-3 rounded-xl"><p className="text-4xl">📦</p><p className="font-bold mt-2">{cat} VIDE</p><a href="/admin" className="inline-block mt-3 bg-yellow-400 px-6 py-3 rounded-xl font-black">+ PUBLIER</a></div>}
    </div>
  )
}
