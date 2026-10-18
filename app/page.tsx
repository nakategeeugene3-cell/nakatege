"use client"
import { useState } from "react"
const CATS = ["1) Electronique","2) Beauty","3) Habillement","4) Mecanique","5) Matelas & Drap","6) Accessoire Sport et Sante","7) Construction & Securite","8) Autre"] as const
const PRODUCTS = [
  {id:1,name:"Toyota Corolla 2018",cat:"4) Mecanique",price:8500,img:"https://picsum.photos/seed/corolla/400/400"},
  {id:2,name:"VW Golf 7 2018",cat:"4) Mecanique",price:8000,img:"https://picsum.photos/seed/golf/400/400"},
  {id:3,name:"Bajaj Boxer 150",cat:"4) Mecanique",price:1100,img:"https://picsum.photos/seed/boxer/400/400"},
  {id:4,name:"iPhone 15 Pro Max",cat:"1) Electronique",price:1199,img:"https://picsum.photos/seed/iphone/400/400"},
  {id:5,name:"Dior Sauvage 100ml",cat:"2) Beauty",price:95,img:"https://picsum.photos/seed/dior/400/400"},
  {id:6,name:"Robe Ankara Femme",cat:"3) Habillement",price:35,img:"https://picsum.photos/seed/ankara/400/400"},
]
export default function Page(){
  const [cat,setCat]=useState<string>(CATS[0])
  const filtered = PRODUCTS.filter((p)=>p.cat===cat)
  return(
    <div style={{maxWidth:500,margin:"0 auto",background:"#fff",minHeight:"100vh"}}>
      <div style={{background:"#000",color:"#facc15",padding:12,textAlign:"center",fontWeight:900}}>👑 KING SHIPPING - 8 CATEGORIES - VERT</div>
      <div style={{display:"flex",gap:6,overflowX:"auto",padding:8,borderBottom:"1px solid #ddd"}}>
        {CATS.map((c:string)=>(
          <button key={c} onClick={()=>setCat(c)} style={{whiteSpace:"nowrap",padding:"8px 12px",borderRadius:20,fontSize:11,fontWeight:900,border:"1px solid #000",background:cat===c?"#000":"#fff",color:cat===c?"#facc15":"#000"}}>{c}</button>
        ))}
      </div>
      <div style={{background:"#facc15",padding:8,fontSize:12,fontWeight:700}}>📍 TU ES: {cat} = {filtered.length} PRODUITS</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,background:"#e5e7eb"}}>
        {filtered.map((p)=>(
          <div key={p.id} style={{background:"#fff",padding:8}}>
            <img src={p.img} style={{width:"100%",height:128,objectFit:"cover",borderRadius:8}} alt={p.name}/>
            <p style={{fontSize:12,fontWeight:700,marginTop:4}}>{p.name}</p>
            <p style={{fontWeight:900}}>$ {p.price}</p>
          </div>
        ))}
      </div>
      {filtered.length===0 && <div style={{padding:40,textAlign:"center"}}><p style={{fontSize:32}}>📦</p><p style={{fontWeight:700}}>{cat} VIDE</p></div>}
    </div>
  )
}
