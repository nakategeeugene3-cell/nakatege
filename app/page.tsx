"use client"
import { useState } from "react"
const CATS = ["1) Electronique","2) Beauty","3) Habillement","4) Mecanique","5) Matelas & Drap","6) Accessoire Sport et Sante","7) Construction & Securite","8) Autre"] as const
const PRODUCTS = Array.from({length: 800}, (_, i) => {
  const catIndex = Math.floor(i / 100)
  const cat = CATS[catIndex]
  const num = (i % 100) + 1
  const names = [["iPhone 15","Samsung S24","MacBook Air","TV 4K","Drone","PS5","AirPods Max","Camera Sony"],["Parfum Dior","Wig Lace 24","Makeup Kit","Huile","Lotion","Rouge","Cils 3D","Soin"],["Jordan 1","T-Shirt KING","Jeans","Robe Ankara","Veste","Nike Air","Sac Chanel","Casquette"],["Corolla 2018","Golf 7","Bajaj Boxer 150","Moteur V8","Pneu Michelin","Batterie","Frein","Casque Moto"],["Matelas King","Drap Satin 6pcs","Oreiller Memoire","Couverture","Lit Bois","Moustiquaire","Coussin","Drap Housse"],["Halteres 20KG","Tapis Yoga Pro","Velo Sport","Gants Boxe","Whey Protein","Tensiometre","Bande Elastic","Corde Sauter"],["Perceuse Bosch","Casque Chantier","Gants Secu","Marteau","Ciment","Peinture","Echelle Alu","Cadenas"],["Valise KING","Montre Rolex","Lunette Soleil","Parapluie","Bouteille","Lampe LED","Chaise Bureau","Table"]]
  return { id: i+1, cat, name: `${names[catIndex][i % 8]} ${num}`, price: 20 + (i*17 % 9500), img: `https://picsum.photos/seed/KING${i+1}NAKAT${catIndex}UNIQUE/600/600`, hasVideo: true }
})
export default function Page(){
  const [cat,setCat]=useState<string>(CATS[0])
  const [search,setSearch]=useState("")
  const [showV,setShowV]=useState<number|null>(null)
  let filtered = PRODUCTS.filter(p=>p.cat===cat)
  if(search) filtered = PRODUCTS.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()))
  return(
    <div style={{maxWidth:600,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"system-ui"}}>
      <div style={{background:"#000",color:"#facc15",padding:14,textAlign:"center",fontWeight:900,fontSize:18,position:"sticky",top:0,zIndex:50}}>👑 KING SHIPPING • 800 • PHOTOS UNIQUES • VIDEO</div>
      <div style={{padding:10,background:"#f5f5f5",position:"sticky",top:48,zIndex:40}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Chercher 800 produits..." style={{width:"100%",padding:"12px 16px",borderRadius:25,border:"2px solid #000",fontSize:14,fontWeight:700}}/></div>
      <div style={{display:"flex",gap:6,overflowX:"auto",padding:10,borderBottom:"2px solid #000",background:"#fff",position:"sticky",top:105,zIndex:30}}>{CATS.map(c=> <button key={c} onClick={()=>{setCat(c);setSearch("");setShowV(null)}} style={{whiteSpace:"nowrap",padding:"10px 14px",borderRadius:20,fontSize:11,fontWeight:900,border:cat===c && !search?"2px solid #facc15":"1px solid #ddd",background:cat===c && !search?"#000":"#fff",color:cat===c && !search?"#facc15":"#333"}}>{c} ({PRODUCTS.filter(p=>p.cat===c).length})</button>)}</div>
      <div style={{background:"#facc15",padding:"8px 12px",fontWeight:900,fontSize:12,display:"flex",justifyContent:"space-between"}}><span>📍 {search? `Recherche: ${search}` : cat}</span><span>{filtered.length} PRODUITS</span></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#000"}}>{filtered.slice(0,100).map(p=> (<div key={p.id} style={{background:"#fff",padding:8,position:"relative"}}><div onClick={()=>setShowV(showV===p.id?null:p.id)} style={{position:"absolute",top:12,left:12,zIndex:10,background:"rgba(0,0,0,0.85)",color:"#facc15",padding:"4px 8px",borderRadius:15,fontSize:10,fontWeight:900,cursor:"pointer"}}>▶️ VIDEO</div><div style={{position:"absolute",top:12,right:12,zIndex:10,background:"#facc15",color:"#000",padding:"2px 6px",borderRadius:10,fontSize:9,fontWeight:900}}>#{p.id}</div><img src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:170,objectFit:"cover",borderRadius:10,background:"#f0f0f0"}}/>{showV===p.id && <video controls autoPlay muted style={{width:"100%",height:170,borderRadius:10,marginTop:-170,position:"relative",background:"#000"}} src="https://www.w3schools.com/html/mov_bbb.mp4"></video>}<p style={{fontSize:11,fontWeight:800,margin:"8px 0 2px",height:30,overflow:"hidden",lineHeight:"13px"}}>{p.name}</p><p style={{fontWeight:900,fontSize:16,margin:"4px 0 0"}}>${p.price}</p><button style={{width:"100%",marginTop:6,background:"#000",color:"#facc15",border:"none",padding:"8px",borderRadius:8,fontWeight:900,fontSize:11}}>AJOUTER 🛒</button></div>))}</div>
      <div style={{padding:20,textAlign:"center",fontSize:11,color:"#666"}}>✅ 800 photos TOUTES DIFFERENTES • Chaque photo = seed KING{id} UNIQUE<br/>✅ Video sur chaque produit<br/>Prochaine: 1000 par cat = 8000 total</div>
    </div>
  )
}
