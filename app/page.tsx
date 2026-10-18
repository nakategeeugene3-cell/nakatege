"use client"
import { useState } from "react"
const CATS = ["1) Electronique","2) Beauty","3) Habillement","4) Mecanique","5) Matelas & Drap","6) Accessoire Sport et Sante","7) Construction & Securite","8) Autre"]
const PRODUCTS = [
  {id:1,name:"Toyota Corolla 2018",cat:"4) Mecanique",price:8500,img:"https://picsum.photos/seed/corolla/400/400"},
  {id:2,name:"VW Golf 7 2018",cat:"4) Mecanique",price:8000,img:"https://picsum.photos/seed/golf/400/400"},
  {id:3,name:"BMW Serie 3 2017",cat:"4) Mecanique",price:11000,img:"https://picsum.photos/seed/bmw/400/400"},
  {id:4,name:"Bajaj Boxer 150",cat:"4) Mecanique",price:1100,img:"https://picsum.photos/seed/boxer/400/400"},
  {id:5,name:"iPhone 15 Pro Max",cat:"1) Electronique",price:1199,img:"https://picsum.photos/seed/iphone/400/400"},
  {id:6,name:"Frigo Samsung 200L",cat:"1) Electronique",price:450,img:"https://picsum.photos/seed/frigo/400/400"},
  {id:7,name:"Dior Sauvage 100ml",cat:"2) Beauty",price:95,img:"https://picsum.photos/seed/dior/400/400"},
  {id:8,name:"Robe Ankara Femme",cat:"3) Habillement",price:35,img:"https://picsum.photos/seed/ankara/400/400"},
]
export default function Page(){
  const [cat,setCat]=useState("1) Electronique")
  const filtered = PRODUCTS.filter(p=>p.cat===cat)
  return(
    <div className="min-h-screen bg-white text-black max-w-[500px] mx-auto">
      <div className="bg-black text-yellow-400 p-3 font-black text-center">👑 KING SHIPPING - 8 CATEGORIES</div>
      <div className="flex gap-1 overflow-x-auto p-2 bg-white sticky top-0 border-b z-10">
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)} className={`whitespace-nowrap px-3 py-2 rounded-full text-[11px] font-black border ${cat===c?"bg-black text-yellow-400":"bg-white"}`}>{c}</button>
        ))}
      </div>
      <div className="bg-yellow-400 text-black p-2 text-xs font-bold">📍 TU ES: {cat} = {filtered.length} PRODUITS</div>
      <div className="grid grid-cols-2 gap-1 bg-gray-200">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white p-2">
            <img src={p.img} className="w-full h-32 object-cover rounded" alt={p.name}/>
            <p className="text-xs font-bold mt-1">{p.name}</p>
            <p className="font-black">$ {p.price}</p>
          </div>
        ))}
      </div>
      {filtered.length===0 && <div className="p-10 text-center bg-white"><p className="text-4xl">📦</p><p className="font-bold">{cat} VIDE</p></div>}
      <div className="p-4 text-center"><a href="/admin" className="bg-black text-yellow-400 px-6 py-3 rounded-full font-black text-sm">→ PUBLIER DANS AUTRE</a></div>
    </div>
  )
}
