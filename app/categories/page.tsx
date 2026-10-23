"use client"
import { useState } from "react"
import Link from "next/link"

const categories = [
  {id:"all", name:"Tout", img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200"},
  {id:"phones", name:"Phones & Accessoires", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"},
  {id:"laptop", name:"Laptop & Accessoires", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200"},
  {id:"shoes_f", name:"Shoes Femme", img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"},
  {id:"shoes_e", name:"Shoes Enfants", img:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200"},
  {id:"kids", name:"Habillés Enfants", img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=200"},
  {id:"auto", name:"Car & Accessoires", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"},
  {id:"placard", name:"Placard Tapis", img:"https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200"},
  {id:"faune", name:"Faune Accessoires", img:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200"},
  {id:"vetements", name:"Vêtements", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200"},
  {id:"maison", name:"Maison", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200"},
  {id:"construction", name:"Construction", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200"},
  {id:"depannage", name:"Dépannage", img:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200"},
]

const produits = [
  {id:"1", name:"iPhone 15 Pro Max 256GB Titanium", price:1550, cat:"phones", img:"https://images.unsplash.com/photo-1695044781337-1d8a1d2a5a3c?w=400"},
  {id:"2", name:"Samsung S24 Ultra 512GB", price:1250, cat:"phones", img:"https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400"},
  {id:"3", name:"MacBook Air M2 15 pouces", price:1190, cat:"laptop", img:"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"},
  {id:"4", name:"MacBook Pro M3", price:1990, cat:"laptop", img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400"},
  {id:"5", name:"Nike Air 270 Homme", price:85, cat:"shoes_f", img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"},
  {id:"6", name:"Tapis Voiture 5D Cuir", price:34, cat:"auto", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"},
  {id:"7", name:"Veste Faune Chaude", price:55, cat:"faune", img:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"},
]

export default function CategoriesPage(){
  const [cat,setCat]=useState("all")
  const filtres = cat==="all"? produits : produits.filter(p=>p.cat===cat)
  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:80}}>
      <div style={{padding:12,background:"#000",color:"#fff",display:"flex",justifyContent:"space-between"}}><Link href="/" style={{color:"#fff",textDecoration:"none"}}>← Retour</Link><b>Catégories</b><span></span></div>
      {/* 7EME BARRE - DISPOSITION VERTICALE EN PETITES CASES COMME TU VEUX */}
      <div style={{padding:10}}>
        <b style={{fontSize:12}}>Catégories - Disposées comme ça (verticale petites cases)</b>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
          {categories.map(c=><div key={c.id} onClick={()=>setCat(c.id)} style={{textAlign:"center",border:cat===c.id?"2px solid #000":"1px solid #eee",borderRadius:12,padding:6,cursor:"pointer",background:cat===c.id?"#000":"#fff",color:cat===c.id?"#fff":"#000"}}>
            <img src={c.img} style={{width:"100%",height:50,objectFit:"cover",borderRadius:8}}/>
            <div style={{fontSize:8,fontWeight:700,marginTop:4,lineHeight:"10px"}}>{c.name}</div>
          </div>)}
        </div>
      </div>
      <div style={{padding:10,background:"#f2f2f7",marginTop:10}}>
        <b style={{fontSize:12}}>Produits {cat==="all"?"- Tous":": "+categories.find(c=>c.id===cat)?.name} ({filtres.length}) - SEULEMENT CETTE CATÉGORIE</b>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
          {filtres.length>0 ? filtres.map(p=><Link key={p.id} href={`/produits/${p.id}`} style={{background:"#fff",borderRadius:10,padding:6,textDecoration:"none",color:"#000",border:"1px solid #ddd"}}>
            <img src={p.img} style={{width:"100%",height:70,objectFit:"cover",borderRadius:8}}/>
            <div style={{fontSize:9,fontWeight:700,marginTop:4}}>{p.name}</div>
            <div style={{fontWeight:900,fontSize:11}}>${p.price}</div>
          </Link>) : <div style={{gridColumn:"span 2",textAlign:"center",padding:20,fontSize:11,color:"#666"}}>Aucun produit dans {cat}. Ajoute dans Admin Produits.</div>}
        </div>
      </div>
    </div>
  )
}
