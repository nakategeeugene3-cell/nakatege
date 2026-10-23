"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { produits as allProduits } from "../../lib/db"
export default function PanierFinal(){
  const [items,setItems]=useState<any[]>([])
  const [showPay,setShowPay]=useState(false)
  const [selectedPay,setSelectedPay]=useState("M-Pesa")
  const [showPromoAll,setShowPromoAll]=useState(false)
  useEffect(()=>{ const p=localStorage.getItem("panier"); if(p) setItems(JSON.parse(p)) },[])
  const updateQty=(i:number,d:number)=>{ const n=[...items]; n[i].qty=Math.max(1,n[i].qty+d); setItems(n); localStorage.setItem("panier",JSON.stringify(n)) }
  const remove=(i:number)=>{ const n=items.filter((_,idx)=>idx!==i); setItems(n); localStorage.setItem("panier",JSON.stringify(n)) }
  const subtotal=items.reduce((s,i)=>s+i.price*i.qty,0)
  const expedition=Math.round(subtotal*0.05)
  const total=subtotal+expedition
  const promoProducts=allProduits.filter(p=>p.price<200)
  if(items.length===0){ return <div style={{maxWidth:480,margin:"0 auto",padding:12,background:"#fff",minHeight:"100vh"}}><Link href="/">← Retour</Link><div style={{textAlign:"center",marginTop:40}}><Link href="/" style={{background:"#000",color:"#fff",padding:"10px 20px",borderRadius:20,textDecoration:"none"}}>Continuer achats</Link></div></div> }
  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",padding:12,paddingBottom:90}}>
      <Link href="/" style={{textDecoration:"none",color:"#000",fontWeight:700}}>← Retour</Link>
      <h2 style={{fontWeight:900,marginTop:10,fontSize:14}}>Panier - {items.length} produits</h2>
      {items.map((it,i)=>(
        <div key={i} style={{display:"flex",gap:8,background:"#f2f2f7",borderRadius:10,padding:8,marginTop:8,alignItems:"center"}}>
          <img src={it.img} style={{width:50,height:50,objectFit:"cover",borderRadius:6}}/>
          <div style={{flex:1}}><div style={{fontSize:9,fontWeight:700}}>{it.name.slice(0,30)}</div><button onClick={()=>remove(i)} style={{fontSize:8,color:"#ff0000",border:"none",background:"none"}}>Supprimer</button></div>
          <div style={{display:"flex",alignItems:"center",gap:4}}><button onClick={()=>updateQty(i,-1)} style={{width:20,height:20,borderRadius:10,border:"1px solid #000"}}>-</button><span style={{fontSize:10,fontWeight:700}}>{it.qty}</span><button onClick={()=>updateQty(i,1)} style={{width:20,height:20,borderRadius:10,border:"1px solid #000"}}>+</button></div>
          <div style={{fontSize:10,fontWeight:900}}>${it.price*it.qty}</div>
        </div>
      ))}
      <div style={{marginTop:16,background:"#000",color:"#fff",borderRadius:12,padding:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:10}}><span>Total:</span><span>${subtotal}</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginTop:6,color:"#ffcc00"}}><span>Expédition 5%:</span><span>${expedition}</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:900,marginTop:10,borderTop:"1px solid #333",paddingTop:10}}><span>TOTAL A PAYER:</span><span>${total}</span></div><button onClick={()=>setShowPay(true)} style={{width:"100%",marginTop:12,background:"#ffcc00",color:"#000",border:"none",padding:14,borderRadius:12,fontSize:12,fontWeight:900}}>PAYER ${total}</button></div>
      {showPay && <div style={{marginTop:12,background:"#fff",border:"2px solid #000",borderRadius:12,padding:12}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Paiement</b><button onClick={()=>setShowPay(false)} style={{border:"none",background:"#000",color:"#fff",width:20,height:20,borderRadius:10}}>X</button></div><div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>{["M-Pesa","Orange Money","Airtel Money","PayPal","Carte Bancaire"].map(m=><button key={m} onClick={()=>setSelectedPay(m)} style={{padding:10,borderRadius:8,border:selectedPay===m?"2px solid #000":"1px solid #ddd",background:selectedPay===m?"#000":"#fff",color:selectedPay===m?"#fff":"#000",textAlign:"left",fontSize:10,fontWeight:700}}>{selectedPay===m?"✓ ":""} {m}</button>)}</div><button onClick={()=>{ alert(`Paiement $${total} avec ${selectedPay} OK!`); localStorage.removeItem("panier"); setItems([]); setShowPay(false)}} style={{width:"100%",marginTop:12,background:"#00a651",color:"#fff",border:"none",padding:14,borderRadius:12,fontWeight:900}}>Confirmer ${total}</button></div>}
      
      {/* PRODUITS EN PROMOTION - VOIR PLUS ICI - COMME TU DIS */}
      <div style={{marginTop:20,background:"#fff",borderRadius:12,padding:10,border:"1px solid #eee"}}>
        <b style={{fontSize:11}}>Produits en Promotion</b>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
          {(showPromoAll?promoProducts:promoProducts.slice(0,6)).map(p=>(
            <Link key={p.id} href={`/produits/${p.id}`} style={{background:"#fff",borderRadius:8,padding:5,textDecoration:"none",color:"#000",border:"1px solid #eee"}}>
              <img src={p.img} style={{width:"100%",height:50,objectFit:"cover",borderRadius:6}}/>
              <div style={{fontSize:7,fontWeight:700,height:18,overflow:"hidden"}}>{p.name.slice(0,20)}</div>
              <div style={{fontSize:9,fontWeight:900}}>${p.price}</div>
            </Link>
          ))}
        </div>
        {promoProducts.length>6 && (
          <div style={{textAlign:"center",marginTop:12}}>
            <button onClick={()=>setShowPromoAll(!showPromoAll)} style={{background:"#000",color:"#fff",border:"none",padding:"8px 16px",borderRadius:20,fontSize:9,fontWeight:700}}>{showPromoAll?"Voir moins":"Voir plus"}</button>
          </div>
        )}
      </div>
    </div>
  )
}
