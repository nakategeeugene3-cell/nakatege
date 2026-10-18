"use client"
import { useState, useMemo, useEffect } from "react"
import { catalog as baseCatalog, categoryNames, subCategoriesMap } from "@/lib/catalog"

export default function Storefront(){
  const [cat,setCat]=useState("8) Autre")
  const [sub,setSub]=useState("All")
  const [search,setSearch]=useState("")
  const [show,setShow]=useState(30)
  const [allProducts,setAllProducts]=useState<any[]>(baseCatalog)

  useEffect(()=>{
    const saved=localStorage.getItem("king_store_autre")
    if(saved){
      try{
        const autres=JSON.parse(saved).map((p:any)=>({id:p.id,name:p.name,brand:"KING",category:"8) Autre",subCategory:"Autre",priceUSD:p.priceUSD,image:p.image,video:"",rating:"5.0",reviews:1}))
        setAllProducts([...autres,...baseCatalog])
      }catch{}
    }
  },[])

  const subs = useMemo(()=> cat==="8) Autre" ? ["Autre"] : Object.keys((subCategoriesMap as any)[cat] || {}),[cat])
  
  const filtered = useMemo(()=>{
    let f=allProducts
    if(search) f=f.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()))
    else {
      f=f.filter(p=>p.category===cat)
      if(sub!=="All") f=f.filter(p=>p.subCategory===sub)
    }
    return f
  },[cat,sub,search,allProducts])

  return(
    <div className="min-h-screen bg-[#f5f5f5] text-black max-w-[500px] mx-auto pb-20">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="p-2 flex gap-2">
          <div className="flex-1 bg-[#f2f2f2] rounded-full px-3 py-2 flex items-center gap-2">
            <span>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent outline-none text-sm" />
          </div>
          <a href="/admin" className="bg-yellow-400 text-black text-[11px] font-black px-3 py-2 rounded-full">+ AUTRE</a>
        </div>
        <div className="flex gap-2 overflow-x-auto px-2 py-2">
          {categoryNames.map(c=>(
            <button key={c} onClick={()=>{setCat(c); setSub("All"); setShow(30)}} className={`whitespace-nowrap text-[11px] px-3 py-1.5 rounded-full border font-bold ${cat===c?"bg-black text-yellow-400 border-black":"bg-white text-gray-600"}`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto px-2 pb-2">
          <button onClick={()=>setSub("All")} className={`text-[10px] px-2 py-1 rounded ${sub==="All"?"bg-yellow-400 font-bold":"bg-gray-100"}`}>All ({filtered.length})</button>
          {subs.map(s=>(
            <button key={s} onClick={()=>{setSub(s); setShow(30)}} className={`whitespace-nowrap text-[10px] px-2 py-1 rounded ${sub===s?"bg-yellow-400 font-bold":"bg-gray-100"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="bg-black text-yellow-400 p-2 text-[10px] font-bold">📖 CAHIER: {cat} {sub!=="All" ? `> ${sub}` : ""} - {filtered.length} produits - $ DOLLAR</div>

      {cat==="8) Autre" && filtered.filter(p=>p.category==="8) Autre").length===0 && !search ? (
        <div className="bg-white m-3 p-8 rounded-xl text-center">
          <p className="text-4xl">📦</p>
          <p className="font-black mt-2">CATEGORIE AUTRE - VIDE</p>
          <p className="text-xs text-gray-500 mt-1">C'est toi qui publies ici KING!<br/>Clique + AUTRE en haut</p>
          <a href="/admin" className="inline-block mt-4 bg-yellow-400 text-black font-black px-6 py-3 rounded-xl text-sm">+ PUBLIER DANS AUTRE</a>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[1px] bg-[#e0e0e0]">
          {filtered.slice(0,show).map((p:any)=>(
            <div key={p.id} className="bg-white p-2">
              <img src={p.image} alt={p.name} className="w-full h-[130px] object-cover rounded" />
              <p className="text-[9px] text-gray-400 mt-1">{p.subCategory}</p>
              <p className="text-[11px] font-bold line-clamp-2 h-8">{p.name}</p>
              <p className="font-black text-[13px] mt-1">$ {p.priceUSD.toFixed ? p.priceUSD.toFixed(2) : p.priceUSD}</p>
              <p className="text-[10px] text-orange-500">★ {p.rating}</p>
              <button className="w-full mt-1 bg-yellow-400 text-black text-[10px] font-bold py-1 rounded">+ Ajouter</button>
            </div>
          ))}
        </div>
      )}

      {filtered.length>show && <div className="flex justify-center p-4 bg-white"><button onClick={()=>setShow(s=>s+40)} className="border px-6 py-2 rounded-full text-xs">Voir plus ({filtered.length-show})</button></div>}
    </div>
  )
}
