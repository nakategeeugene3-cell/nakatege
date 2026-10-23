"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { produits } from "../../../lib/db"

export default function ProduitDetail(){
  const params=useParams()
  const id=params.id as string
  const p=produits.find(x=>x.id===id) || produits[0]
  const [qty,setQty]=useState(1)

  const ajouter=()=>{
    const panierStr=localStorage.getItem("panier")
    let panier=panierStr?JSON.parse(panierStr):[]
    const exist=panier.find((x:any)=>x.id===p.id)
    if(exist){ exist.qty+=qty }
    else{ panier.push({id:p.id,name:p.name,price:p.price,img:p.img,qty}) }
    localStorage.setItem("panier",JSON.stringify(panier))
    alert(`${p.name} ajouté au panier! Qty: ${qty} - Va voir panier maintenant ça marche!`)
    window.location.href="/panier"
  }

  if(!p) return <div>Produit non trouvé</div>

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",padding:12,paddingBottom:80}}>
      <Link href="/" style={{textDecoration:"none",color:"#000",fontWeight:700}}>← Retour</Link>
      <img src={p.img} style={{width:"100%",height:240,objectFit:"cover",borderRadius:12,marginTop:12}}/>
      <h2 style={{fontSize:14,fontWeight:900,marginTop:12}}>{p.name}</h2>
      <div style={{fontSize:18,fontWeight:900,marginTop:6}}>${p.price}</div>
      <div style={{fontSize:10,color:"#666",marginTop:4}}>Catégorie: {p.cat} | Fournisseur: Guangzhou Auto Parts</div>
      
      <div style={{display:"flex",gap:10,alignItems:"center",marginTop:16}}>
        <button onClick={()=>setQty(Math.max(1,qty-1))} style={{width:36,height:36,borderRadius:18,border:"1px solid #000",background:"#fff"}}>-</button>
        <span style={{fontSize:16,fontWeight:900}}>{qty}</span>
        <button onClick={()=>setQty(qty+1)} style={{width:36,height:36,borderRadius:18,border:"1px solid #000",background:"#fff"}}>+</button>
        <span style={{fontSize:10,color:"#666"}}>Prix unitaire: ${p.price} | Total: ${p.price*qty}</span>
      </div>

      <button onClick={ajouter} style={{width:"100%",marginTop:20,background:"#000",color:"#fff",padding:14,borderRadius:12,border:"none",fontSize:12,fontWeight:900}}>AJOUTER AU PANIER + - ÇA MARCHE MAINTENANT!</button>

      <div style={{marginTop:20,background:"#f2f2f7",borderRadius:10,padding:10}}>
        <b style={{fontSize:10}}>Produits Similaires (même catégorie: {p.cat})</b>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
          {produits.filter(x=>x.cat===p.cat && x.id!==p.id).slice(0,3).map(x=>(
            <Link key={x.id} href={`/produits/${x.id}`} style={{background:"#fff",borderRadius:8,padding:5,textDecoration:"none",color:"#000",border:"1px solid #eee"}}>
              <img src={x.img} style={{width:"100%",height:50,objectFit:"cover",borderRadius:6}}/>
              <div style={{fontSize:7,fontWeight:700}}>{x.name.slice(0,20)}</div>
              <div style={{fontSize:9,fontWeight:900}}>${x.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
