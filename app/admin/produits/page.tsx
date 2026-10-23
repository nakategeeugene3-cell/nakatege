"use client"
import { useState } from "react"
import Link from "next/link"
export default function AdminProduits(){
  const [produits,setProduits]=useState<any[]>([
    {id:"1", name:"iPhone 15 Pro Max 256GB Titanium", price:1550, cat:"phones", img1:"https://images.unsplash.com/photo-1695044781337-1d8a1d2a5a3c?w=400", img2:"", video:"", fournisseur:"Guangzhou"},
  ])
  const [form,setForm]=useState({name:"",price:"",cat:"phones",img1:"",img2:"",video:"",fournisseur:""})
  const ajouter=()=>{
    if(!form.name||!form.price) return alert("Nom et prix obligatoires - Photo et vidéo pas obligatoires")
    const newP={id:Date.now().toString(), name:form.name, price:Number(form.price), cat:form.cat, img1:form.img1||"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200", img2:form.img2||"", video:form.video||"", fournisseur:form.fournisseur}
    setProduits([...produits,newP])
    setForm({name:"",price:"",cat:"phones",img1:"",img2:"",video:"",fournisseur:""})
    alert("Produit ajouté! 1 ou 2 photos + vidéo (si tu as mis). Vidéo pas obligatoire.")
  }
  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh"}}>
      <Link href="/">← Retour</Link>
      <h1 style={{fontWeight:900,marginTop:10,fontSize:14}}>Ajouter un Produit - Compte - 1 ou 2 Photos + Vidéo (lien) pas obligatoire</h1>
      <div style={{background:"#f2f2f7",padding:12,borderRadius:12,marginTop:10}}>
        <input placeholder="Nom produit * obligatoire" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Prix * obligatoire ex 1550" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}>
          <option value="phones">Phones & Accessoires</option><option value="laptop">Laptop & Accessoires</option><option value="shoes_f">Shoes Femme</option><option value="shoes_e">Shoes Enfants</option><option value="kids">Habillés Enfants</option><option value="auto">Car & Accessoires</option><option value="placard">Placard Tapis</option><option value="faune">Faune Accessoires</option><option value="vetements">Vêtements</option><option value="maison">Maison</option>
        </select>
        <div style={{fontSize:10,fontWeight:800,marginBottom:4}}>Photos (1 obligatoire, 2ème optionnel)</div>
        <input placeholder="Photo 1 - URL * si possible mais pas obligatoire" value={form.img1} onChange={e=>setForm({...form,img1:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Photo 2 - URL optionnel - 2ème angle si tu veux" value={form.img2} onChange={e=>setForm({...form,img2:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <div style={{fontSize:10,fontWeight:800,marginBottom:4}}>Vidéo - Lien (YouTube ou mp4) - PAS OBLIGATOIRE</div>
        <input placeholder="Vidéo - lien YouTube ex https://youtube.com/... - pas obligatoire" value={form.video} onChange={e=>setForm({...form,video:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Fournisseur - optionnel" value={form.fournisseur} onChange={e=>setForm({...form,fournisseur:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:8,fontSize:11}}/>
        <button onClick={ajouter} style={{width:"100%",background:"#000",color:"#fff",padding:12,borderRadius:10,fontWeight:900,fontSize:11,border:"none"}}>AJOUTER PRODUIT</button>
        <div style={{fontSize:9,marginTop:6,color:"#666"}}>Tu peux ajouter juste 1 photo ou 2 photos si tu veux. Vidéo avec lien mais pas obligatoire. C'est comme tu as dit dans vidéo.</div>
      </div>
      <h3 style={{marginTop:12,fontSize:11,fontWeight:800}}>Mes Produits ({produits.length})</h3>
      {produits.map(p=><div key={p.id} style={{background:"#f2f2f7",padding:8,borderRadius:10,marginTop:6,display:"flex",gap:6}}>
        <img src={p.img1} style={{width:50,height:50,objectFit:"cover",borderRadius:8}}/>
        {p.img2 && <img src={p.img2} style={{width:50,height:50,objectFit:"cover",borderRadius:8}}/>}
        <div style={{fontSize:10}}><b>{p.name}</b><br/>${p.price} - {p.cat}<br/>{p.video?"🎥 Vidéo":"Pas de vidéo (OK)"} {p.img2?"- 2 photos":"- 1 photo"}</div>
      </div>)}
    </div>
  )
}
