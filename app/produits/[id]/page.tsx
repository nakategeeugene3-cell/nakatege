"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { produits } from "../../../lib/db"

const rates: any = {
  "USD $": 1, "KES KSh": 129.5, "EUR €": 0.92, "GBP £": 0.79, "NGN ₦": 1600, "ZAR R": 18.5, "UGX USh": 3850, "TZS TSh": 2680, "RWF RF": 1280, "ETB Br": 57, "EGP E£": 50.5, "MAD DH": 10.1, "DZD DA": 135, "XOF CFA": 605, "XAF CFA": 605, "GHS ₵": 15.5, "INR ₹": 83.5, "CNY ¥": 7.24, "JPY ¥": 155, "KRW ₩": 1350, "AED AED": 3.67, "SAR SAR": 3.75, "TRY ₺": 32.5, "BRL R$": 5.2, "CAD C$": 1.36, "AUD A$": 1.52, "CHF CHF": 0.91, "SEK kr": 10.9, "NOK kr": 10.8, "DKK kr": 6.86, "PLN zł": 4.02, "RUB ₽": 92, "PKR ₨": 278, "BDT ৳": 117, "IDR Rp": 16200
}

export default function ProduitPage(){
  const params=useParams()
  const router=useRouter()
  const id=params.id as string
  const produit=produits.find(p=>p.id.toString()===id)
  const [qty,setQty]=useState(1)
  const [cur,setCur]=useState("USD $")
  const [showPopup,setShowPopup]=useState(false)

  useEffect(()=>{
    const c=localStorage.getItem("selected_currency")
    if(c) setCur(c)
  },[])

  const convert = (usd:number)=>{ const r=rates[cur]||1; const v=usd*r; return v>=1000?Math.round(v).toLocaleString():v.toFixed(2) }

  const addToPanier=()=>{
    const panier=JSON.parse(localStorage.getItem("panier")||"[]")
    const exist=panier.findIndex((p:any)=>p.id===produit?.id)
    if(exist>=0){ panier[exist].qty+=qty }
    else{ panier.push({...produit,qty}) }
    localStorage.setItem("panier",JSON.stringify(panier))
    setShowPopup(true)
  }

  if(!produit) return <div>Produit non trouvé</div>

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",padding:12,paddingBottom:90}}>
      <Link href="/" style={{textDecoration:"none",color:"#000",fontWeight:700}}>← Retour</Link>
      <img src={produit.img} style={{width:"100%",height:250,objectFit:"cover",borderRadius:12,marginTop:10}}/>
      <h2 style={{fontSize:16,fontWeight:900,marginTop:12}}>{produit.name}</h2>
      <div style={{fontSize:20,fontWeight:900,color:"#00a651",marginTop:6}}>{convert(produit.price)} {cur} <span style={{fontSize:11,color:"#999",textDecoration:"line-through"}}>${produit.price}</span></div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}>
        <button onClick={()=>setQty(Math.max(1,qty-1))} style={{width:32,height:32,borderRadius:16,border:"1px solid #000"}}>-</button>
        <span style={{fontWeight:700}}>{qty}</span>
        <button onClick={()=>setQty(qty+1)} style={{width:32,height:32,borderRadius:16,border:"1px solid #000"}}>+</button>
        <span style={{fontSize:12,marginLeft:10}}>Total: {convert(produit.price*qty)} {cur}</span>
      </div>
      
      <button onClick={addToPanier} style={{width:"100%",marginTop:16,background:"#000",color:"#fff",padding:16,borderRadius:12,border:"none",fontWeight:900,fontSize:13}}>AJOUTER AU PANIER - {convert(produit.price*qty)} {cur}</button>

      {/* POPUP APRES AJOUT - CONTINUER OU VOIR PANIER - COMME TU DIS */}
      {showPopup && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:16,padding:20,width:"100%",maxWidth:340,textAlign:"center"}}>
            <div style={{fontSize:40}}>✅</div>
            <b style={{fontSize:14}}>{produit.name} ajouté!</b>
            <div style={{fontSize:11,color:"#666",marginTop:6}}>{qty} x {convert(produit.price)} = {convert(produit.price*qty)} {cur}</div>
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <button onClick={()=>{setShowPopup(false); router.push("/")}} style={{flex:1,background:"#f2f2f7",color:"#000",border:"none",padding:12,borderRadius:10,fontWeight:700,fontSize:11}}>Continuer achats</button>
              <button onClick={()=>{setShowPopup(false); router.push("/panier")}} style={{flex:1,background:"#000",color:"#fff",border:"none",padding:12,borderRadius:10,fontWeight:700,fontSize:11}}>Voir panier ({JSON.parse(localStorage.getItem("panier")||"[]").length})</button>
            </div>
          </div>
        </div>
      )}

      <div style={{marginTop:20}}>
        <b style={{fontSize:11}}>Produits Similaires (même catégorie: {produit.cat})</b>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
          {produits.filter(p=>p.cat===produit.cat && p.id!==produit.id).slice(0,3).map(p=>(
            <Link key={p.id} href={`/produits/${p.id}`} style={{background:"#fff",borderRadius:8,padding:5,textDecoration:"none",color:"#000",border:"1px solid #eee"}}>
              <img src={p.img} style={{width:"100%",height:50,objectFit:"cover",borderRadius:6}}/>
              <div style={{fontSize:7,fontWeight:700}}>{p.name.slice(0,20)}</div>
              <div style={{fontSize:9,fontWeight:900}}>{convert(p.price)} {cur.split(" ")[1]||cur}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
