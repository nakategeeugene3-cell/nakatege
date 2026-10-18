"use client"
import { useState, useMemo } from "react"
import { catalog, categoryNames } from "@/lib/catalog"

export default function Storefront(){
  const [cat,setCat]=useState("Électronique")
  const [sub,setSub]=useState<string>("All")
  const [search,setSearch]=useState("")
  const [show,setShow]=useState(20)
  const [selectedVideo,setSelectedVideo]=useState<string | null>(null)
  const [currency,setCurrency]=useState("USD")

  const rates:any={USD:{s:"$",r:1},EUR:{s:"€",r:0.92},CDF:{s:"FC",r:2850},XOF:{s:"FCFA",r:605},KSH:{s:"KSh",r:129}}

  const filtered = useMemo(()=>{
    let f=catalog;
    if(search) f=f.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
    else {
      f=f.filter(p=>p.category===cat);
      if(sub!=="All") f=f.filter(p=>p.subCategory===sub);
    }
    return f;
  },[cat,sub,search]);

  const subs = useMemo(()=> search ? [] : [...new Set(catalog.filter(p=>p.category===cat).map(p=>p.subCategory))], [cat,search]);

  return(
    <div className="min-h-screen bg-[#f5f5f5] text-black max-w-[500px] mx-auto pb-20">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="p-2 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#f2f2f2] rounded-full px-3 py-2">
            <span>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search iPhone, Toyota, Gel..." className="flex-1 bg-transparent outline-none text-sm" />
          </div>
          <select value={currency} onChange={e=>setCurrency(e.target.value)} className="bg-black text-yellow-400 text-xs font-bold px-2 rounded-full">
            <option value="USD">$ USD</option><option value="EUR">€ EUR</option><option value="CDF">FC CDF</option><option value="XOF">FCFA</option><option value="KSH">KSh</option>
          </select>
        </div>
        <div className="flex gap-2 overflow-x-auto px-2 py-2">
          {categoryNames.map(c=>(
            <button key={c} onClick={()=>{setCat(c); setSub("All"); setShow(20)}} className={`whitespace-nowrap text-[12px] px-3 py-1 rounded-full border ${cat===c?"bg-black text-white border-black":"bg-white text-gray-600"}`}>{c}</button>
          ))}
        </div>
        {subs.length>0 && (
          <div className="flex gap-2 overflow-x-auto px-2 pb-2">
            <button onClick={()=>setSub("All")} className={`text-[11px] px-2 py-1 rounded ${sub==="All"?"bg-yellow-400 text-black font-bold":"bg-gray-100"}`}>All</button>
            {subs.map(s=>(
              <button key={s} onClick={()=>{setSub(s); setShow(20)}} className={`whitespace-nowrap text-[11px] px-2 py-1 rounded ${sub===s?"bg-yellow-400 text-black font-bold":"bg-gray-100"}`}>{s}</button>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 bg-yellow-50 text-[10px]">💲 Prix en DOLLARS ${" "} | {filtered.length.toLocaleString()} produits | Converti: {rates[currency].s}</div>

      <div className="grid grid-cols-2 gap-[1px] bg-[#e0e0e0]">
        {filtered.slice(0,show).map(p=>(
          <div key={p.id} className="bg-white p-2">
            <img src={p.image} alt={p.name} className="w-full h-[140px] object-cover rounded" />
            <p className="text-[11px] mt-1 line-clamp-2 h-8">{p.name}</p>
            <p className="font-black text-[14px] mt-1">{rates[currency].s} {(p.priceUSD*rates[currency].r).toLocaleString()} <span className="text-[10px] font-normal text-gray-400">${p.priceUSD}</span></p>
            <p className="text-[10px] text-orange-500">★ {p.rating} ({p.reviews})</p>
            <div className="flex gap-1 mt-1">
              <button onClick={()=>setSelectedVideo(p.video)} className="flex-1 bg-black text-white text-[10px] py-1 rounded">▶ Vidéo</button>
              <button className="flex-1 bg-yellow-400 text-black text-[10px] font-bold py-1 rounded">+ Panier</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length>show && <div className="flex justify-center p-4 bg-white"><button onClick={()=>setShow(s=>s+40)} className="border px-6 py-2 rounded-full text-sm">Voir plus ({filtered.length-show})</button></div>}

      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-[400px]">
            <div className="p-2 flex justify-between"><p className="text-xs font-bold">Pub Vidéo - KING ADS</p><button onClick={()=>setSelectedVideo(null)} className="text-xl">✕</button></div>
            <iframe src={selectedVideo} className="w-full h-[220px]" allowFullScreen />
            <div className="p-3 text-[11px]">Cette vidéo génère de l'argent via YouTube Ads / AdMob. Tu remplaceras par tes vidéos produits.</div>
          </div>
        </div>
      )}
    </div>
  )
}
