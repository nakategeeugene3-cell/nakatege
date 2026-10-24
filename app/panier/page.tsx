"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { produits as allProduits } from "../../lib/db"

const rates: any = {
  "USD $": 1, "KES KSh": 129.5, "EUR €": 0.92, "GBP £": 0.79, "NGN ₦": 1600, "ZAR R": 18.5, "UGX USh": 3850, "TZS TSh": 2680, "RWF RF": 1280, "ETB Br": 57, "EGP E£": 50.5, "MAD DH": 10.1, "DZD DA": 135, "XOF CFA": 605, "XAF CFA": 605, "GHS ₵": 15.5, "INR ₹": 83.5, "CNY ¥": 7.24, "JPY ¥": 155, "KRW ₩": 1350, "AED AED": 3.67, "SAR SAR": 3.75, "TRY ₺": 32.5, "BRL R$": 5.2, "CAD C$": 1.36, "AUD A$": 1.52, "CHF CHF": 0.91, "SEK kr": 10.9, "NOK kr": 10.8, "DKK kr": 6.86, "PLN zł": 4.02, "RUB ₽": 92, "PKR ₨": 278, "BDT ৳": 117, "IDR Rp": 16200
}

export default function PanierFinal(){
  const [items,setItems]=useState<any[]>([])
  const [showPay,setShowPay]=useState(false)
  const [selectedPay,setSelectedPay]=useState("M-Pesa")
  const [showPromoAll,setShowPromoAll]=useState(false)
  const [cur,setCur]=useState("USD $")
  const [payForm,setPayForm]=useState({mpesa:"",orange:"",airtel:"",paypalEmail:"",cardNum:"",cardExp:"",cardCvv:"",cardName:""})
  
  useEffect(()=>{ 
    const p=localStorage.getItem("panier"); if(p) setItems(JSON.parse(p))
    const savedCur=localStorage.getItem("selected_currency"); if(savedCur) setCur(savedCur)
    const urlCur=new URLSearchParams(window.location.search).get("cur"); if(urlCur) setCur(urlCur)
  },[])

  const updateQty=(i:number,d:number)=>{ const n=[...items]; n[i].qty=Math.max(1,n[i].qty+d); setItems(n); localStorage.setItem("panier",JSON.stringify(n)) }
  const remove=(i:number)=>{ const n=items.filter((_,idx)=>idx!==i); setItems(n); localStorage.setItem("panier",JSON.stringify(n)) }
  const convert = (usd:number)=>{ const r=rates[cur]||1; const v=usd*r; return v>=1000?Math.round(v).toLocaleString():v.toFixed(2) }
  
  const subtotal=items.reduce((s,i)=>s+i.price*i.qty,0)
  const subtotalConv=items.reduce((s,i)=>s+i.price*i.qty*rates[cur],0)
  const expeditionConv=Math.round(subtotalConv*0.05)
  const totalConv=subtotalConv+expeditionConv
  const promoProducts=allProduits.filter(p=>p.price<200)

  const handleConfirm=()=>{
    // VALIDATION SELON METHODE
    if(selectedPay==="M-Pesa" && !payForm.mpesa) return alert("Entre ton numéro M-Pesa! Ex: 07XXXXXXXX")
    if(selectedPay==="Orange Money" && !payForm.orange) return alert("Entre ton numéro Orange Money!")
    if(selectedPay==="Airtel Money" && !payForm.airtel) return alert("Entre ton numéro Airtel Money!")
    if(selectedPay==="PayPal" && !payForm.paypalEmail) return alert("Entre ton email PayPal! Ex: toi@gmail.com")
    if(selectedPay==="Carte Bancaire" && (!payForm.cardNum || !payForm.cardExp || !payForm.cardCvv)) return alert("Entre numéro carte, date expiration et CVV!")
    
    alert(`✅ Paiement ${totalConv.toLocaleString()} ${cur} avec ${selectedPay} RÉUSSI!\n\n${selectedPay==="PayPal"?`Email: ${payForm.paypalEmail}`:selectedPay==="Carte Bancaire"?`Carte: ${payForm.cardNum.slice(-4)}`: `Tél: ${payForm.mpesa||payForm.orange||payForm.airtel}`}\n\nMerci KING!`)
    localStorage.removeItem("panier")
    setItems([])
    setShowPay(false)
  }

  // MEME SI PANIER VIDE - MONTRER PROMOTION - COMME TU DIS
  if(items.length===0){
    return (
      <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",padding:12,paddingBottom:90}}>
        <Link href="/" style={{textDecoration:"none",color:"#000",fontWeight:700}}>← Retour</Link>
        <div style={{textAlign:"center",marginTop:30}}>
          <div style={{fontSize:40}}>🛒</div>
          <div style={{fontSize:14,fontWeight:700,marginTop:8}}>Panier vide - {cur}</div>
          <div style={{fontSize:11,color:"#666",marginTop:4}}>Ajoute des produits et reviens!</div>
          <Link href="/" style={{display:"inline-block",marginTop:12,background:"#000",color:"#fff",padding:"10px 20px",borderRadius:20,textDecoration:"none",fontSize:11,fontWeight:700}}>Continuer achats</Link>
        </div>

        {/* PROMOTION MEME QUAND VIDE - COMME TU DIS */}
        <div style={{marginTop:24,background:"#fff",borderRadius:12,padding:10,border:"1px solid #eee"}}>
          <b style={{fontSize:11}}>🔥 Produits en Promotion - Ajoute maintenant!</b>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
            {(showPromoAll?promoProducts:promoProducts.slice(0,6)).map(p=>(
              <Link key={p.id} href={`/produits/${p.id}`} style={{background:"#fff",borderRadius:8,padding:5,textDecoration:"none",color:"#000",border:"1px solid #eee"}}>
                <img src={p.img} style={{width:"100%",height:50,objectFit:"cover",borderRadius:6}}/>
                <div style={{fontSize:7,fontWeight:700,height:18,overflow:"hidden"}}>{p.name.slice(0,20)}</div>
                <div style={{fontSize:9,fontWeight:900}}>{convert(p.price)} {cur.split(" ")[1]||cur}</div>
              </Link>
            ))}
          </div>
          {promoProducts.length>6 && <div style={{textAlign:"center",marginTop:12}}><button onClick={()=>setShowPromoAll(!showPromoAll)} style={{background:"#000",color:"#fff",border:"none",padding:"8px 16px",borderRadius:20,fontSize:9,fontWeight:700}}>{showPromoAll?"Voir moins":"Voir plus"}</button></div>}
        </div>
      </div>
    )
  }

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",padding:12,paddingBottom:90}}>
      <Link href="/" style={{textDecoration:"none",color:"#000",fontWeight:700}}>← Retour</Link>
      <h2 style={{fontWeight:900,marginTop:10,fontSize:14}}>Panier - {items.length} produits - {cur}</h2>
      {items.map((it,i)=>(
        <div key={i} style={{display:"flex",gap:8,background:"#f2f2f7",borderRadius:10,padding:8,marginTop:8,alignItems:"center"}}>
          <img src={it.img} style={{width:50,height:50,objectFit:"cover",borderRadius:6}}/>
          <div style={{flex:1}}><div style={{fontSize:9,fontWeight:700}}>{it.name.slice(0,30)}</div><button onClick={()=>remove(i)} style={{fontSize:8,color:"#ff0000",border:"none",background:"none"}}>Supprimer</button></div>
          <div style={{display:"flex",alignItems:"center",gap:4}}><button onClick={()=>updateQty(i,-1)} style={{width:20,height:20,borderRadius:10,border:"1px solid #000"}}>-</button><span style={{fontSize:10,fontWeight:700}}>{it.qty}</span><button onClick={()=>updateQty(i,1)} style={{width:20,height:20,borderRadius:10,border:"1px solid #000"}}>+</button></div>
          <div style={{fontSize:10,fontWeight:900}}>{convert(it.price*it.qty)} {cur.split(" ")[1]||cur}</div>
        </div>
      ))}
      <div style={{marginTop:16,background:"#000",color:"#fff",borderRadius:12,padding:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:10}}><span>Sous-total:</span><span>{convert(subtotal)} {cur}</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginTop:6,color:"#ffcc00"}}><span>Expédition 5%:</span><span>{expeditionConv.toLocaleString()} {cur}</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:900,marginTop:10,borderTop:"1px solid #333",paddingTop:10}}><span>TOTAL A PAYER:</span><span>{totalConv.toLocaleString()} {cur}</span></div><button onClick={()=>setShowPay(true)} style={{width:"100%",marginTop:12,background:"#ffcc00",color:"#000",border:"none",padding:14,borderRadius:12,fontSize:12,fontWeight:900}}>PAYER {totalConv.toLocaleString()} {cur}</button></div>
      
      {showPay && (
        <div style={{marginTop:12,background:"#fff",border:"2px solid #000",borderRadius:12,padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:12}}>Paiement - {totalConv.toLocaleString()} {cur}</b><button onClick={()=>setShowPay(false)} style={{border:"none",background:"#000",color:"#fff",width:22,height:22,borderRadius:11}}>X</button></div>
          
          <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>{["M-Pesa","Orange Money","Airtel Money","PayPal","Carte Bancaire"].map(m=><button key={m} onClick={()=>setSelectedPay(m)} style={{padding:10,borderRadius:8,border:selectedPay===m?"2px solid #000":"1px solid #ddd",background:selectedPay===m?"#000":"#fff",color:selectedPay===m?"#fff":"#000",textAlign:"left",fontSize:10,fontWeight:700}}>{selectedPay===m?"✓ ":""} {m}</button>)}</div>

          {/* FORMULAIRE SELON METHODE - COMME TU DIS IL FAUT DEMANDER INFOS */}
          <div style={{marginTop:12,background:"#f9f9f9",borderRadius:8,padding:10}}>
            {selectedPay==="M-Pesa" && <div><div style={{fontSize:10,fontWeight:700}}>Numéro M-Pesa *</div><input value={payForm.mpesa} onChange={e=>setPayForm({...payForm,mpesa:e.target.value})} placeholder="07XXXXXXXX" style={{width:"100%",marginTop:4,padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/><div style={{fontSize:8,color:"#666",marginTop:4}}>Tu recevras SMS pour confirmer</div></div>}
            {selectedPay==="Orange Money" && <div><div style={{fontSize:10,fontWeight:700}}>Numéro Orange Money *</div><input value={payForm.orange} onChange={e=>setPayForm({...payForm,orange:e.target.value})} placeholder="07XXXXXXXX" style={{width:"100%",marginTop:4,padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/></div>}
            {selectedPay==="Airtel Money" && <div><div style={{fontSize:10,fontWeight:700}}>Numéro Airtel Money *</div><input value={payForm.airtel} onChange={e=>setPayForm({...payForm,airtel:e.target.value})} placeholder="07XXXXXXXX" style={{width:"100%",marginTop:4,padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/></div>}
            {selectedPay==="PayPal" && <div><div style={{fontSize:10,fontWeight:700}}>Email PayPal *</div><input value={payForm.paypalEmail} onChange={e=>setPayForm({...payForm,paypalEmail:e.target.value})} placeholder="ton-email@gmail.com" style={{width:"100%",marginTop:4,padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/><div style={{fontSize:8,color:"#666",marginTop:4}}>Tu seras redirigé vers PayPal pour payer</div></div>}
            {selectedPay==="Carte Bancaire" && <div style={{display:"flex",flexDirection:"column",gap:6}}><div style={{fontSize:10,fontWeight:700}}>Infos carte bancaire *</div><input value={payForm.cardName} onChange={e=>setPayForm({...payForm,cardName:e.target.value})} placeholder="Nom sur carte" style={{width:"100%",padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/><input value={payForm.cardNum} onChange={e=>setPayForm({...payForm,cardNum:e.target.value})} placeholder="Numéro carte 1234 5678 9012 3456" style={{width:"100%",padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/><div style={{display:"flex",gap:6}}><input value={payForm.cardExp} onChange={e=>setPayForm({...payForm,cardExp:e.target.value})} placeholder="MM/AA" style={{flex:1,padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/><input value={payForm.cardCvv} onChange={e=>setPayForm({...payForm,cardCvv:e.target.value})} placeholder="CVV" style={{flex:1,padding:10,borderRadius:6,border:"1px solid #ddd",fontSize:12,color:"#000"}}/></div></div>}
          </div>

          <button onClick={handleConfirm} style={{width:"100%",marginTop:12,background:"#00a651",color:"#fff",border:"none",padding:14,borderRadius:12,fontWeight:900,fontSize:12}}>Confirmer {totalConv.toLocaleString()} {cur} avec {selectedPay}</button>
        </div>
      )}
      
      <div style={{marginTop:20,background:"#fff",borderRadius:12,padding:10,border:"1px solid #eee"}}>
        <b style={{fontSize:11}}>Produits en Promotion</b>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
          {(showPromoAll?promoProducts:promoProducts.slice(0,6)).map(p=>(
            <Link key={p.id} href={`/produits/${p.id}`} style={{background:"#fff",borderRadius:8,padding:5,textDecoration:"none",color:"#000",border:"1px solid #eee"}}><img src={p.img} style={{width:"100%",height:50,objectFit:"cover",borderRadius:6}}/><div style={{fontSize:7,fontWeight:700,height:18,overflow:"hidden"}}>{p.name.slice(0,20)}</div><div style={{fontSize:9,fontWeight:900}}>{convert(p.price)} {cur.split(" ")[1]||cur}</div></Link>
          ))}
        </div>
        {promoProducts.length>6 && <div style={{textAlign:"center",marginTop:12}}><button onClick={()=>setShowPromoAll(!showPromoAll)} style={{background:"#000",color:"#fff",border:"none",padding:"8px 16px",borderRadius:20,fontSize:9,fontWeight:700}}>{showPromoAll?"Voir moins":"Voir plus"}</button></div>}
      </div>
    </div>
  )
}
