"use client"
import { useState } from "react"
import Link from "next/link"
export default function Portefeuille(){
  const [soldeDispo,setSoldeDispo]=useState(85)
  const [soldeAttente,setSoldeAttente]=useState(2812)
  const [tel,setTel]=useState("+254 712 345 678")
  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh"}}>
      <Link href="/parametres">← Retour Settings</Link>
      <h1 style={{fontWeight:900,marginTop:10,fontSize:14}}>Portefeuille - Réel ou Fake? 💰</h1>
      <div style={{background:"#ffcc00",padding:10,borderRadius:10,marginTop:10,fontSize:10}}><b>⚠️ ACTUELLEMENT FAKE mais prêt pour réel:</b> $85 et $2812 sont en mémoire. Pour réel, connecte Flutterwave + M-Pesa B2C ci-dessous.</div>
      <div style={{background:"#000",color:"#fff",borderRadius:12,padding:14,marginTop:10}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:10}}>💰 Dispo à retirer</span><b style={{fontSize:18}}>${soldeDispo}</b></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}><span style={{fontSize:10}}>⏳ En attente (escrow)</span><b style={{fontSize:18}}>${soldeAttente}</b></div>
        <div style={{marginTop:12}}>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+254..." style={{width:"100%",padding:10,borderRadius:8,border:"none",fontSize:11}}/>
          <button onClick={()=>{if(soldeDispo>0){alert(`RETRAIT REEL M-Pesa:\nMontant $${soldeDispo} → KSh ${soldeDispo*130}\nVers ${tel}\nAPI B2C Safaricom Daraja - SMS dans 30s\nACTUELLEMENT FAKE - Ajoute cles MPESA pour reel`); setSoldeDispo(0)}else alert("Solde vide")}} style={{width:"100%",marginTop:8,background:"#00a651",color:"#fff",padding:12,borderRadius:10,fontWeight:900,border:"none"}}>RETIRER ${soldeDispo} VERS M-Pesa → {tel}</button>
        </div>
      </div>
      <div style={{background:"#f2f2f7",padding:10,borderRadius:10,marginTop:12,fontSize:9,lineHeight:"14px"}}>
        <b>Comment rendre REEL:</b><br/>
        1. Client paie Samsung $1250 → M-Pesa STK Push → Argent chez Flutterwave<br/>
        2. Flutterwave garde 3j (escrow) → Tu vois $1250 dans "En attente"<br/>
        3. Tu livres via BOLT/DHL (15 fournisseurs + 8 logistiques toujours là)<br/>
        4. Client confirme → $1250 passe "Dispo"<br/>
        5. Tu cliques RETIRER → M-Pesa B2C t'envoie KSh réel<br/>
        <br/><b>Tout le reste de l'app est RESTAURÉ:</b> 15 Alibaba + 8 Logistique avec DHL, 4 pubs qui feuillettent, recherche top/laptop qui marche, micro rouge Google, photo, 35 monnaies verticales, catégories!
      </div>
      <Link href="/" style={{display:"block",marginTop:12,background:"#000",color:"#fff",padding:12,borderRadius:10,textAlign:"center",textDecoration:"none",fontWeight:900}}>← RETOUR ACCUEIL - TOUT RESTAURÉ</Link>
    </div>
  )
}
