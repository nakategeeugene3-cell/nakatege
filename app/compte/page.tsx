"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
export default function CompteClient(){
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const cu=localStorage.getItem("client_user")
    if(cu) setUser(JSON.parse(cu))
    else window.location.href="/"
  },[])
  if(!user) return <div style={{padding:20}}>Redirection vers création compte...</div>
  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh"}}>
      <Link href="/">← Retour</Link>
      <h1 style={{fontWeight:900,marginTop:10}}>Mon Compte - {user.pseudo}</h1>
      <div style={{textAlign:"center",marginTop:20}}><img src={user.photo} style={{width:90,height:90,borderRadius:45,border:"3px solid #000"}}/><div style={{fontWeight:900,marginTop:10}}>{user.prenom} {user.nom}</div><div style={{fontSize:11,color:"#666"}}>{user.email}<br/>{user.tel}<br/>{user.pseudo}</div></div>
      <div style={{background:"#000",color:"#fff",borderRadius:12,padding:12,marginTop:20}}><b>💰 Mes Comptes Paiement</b><div style={{marginTop:8,fontSize:11}}>M-Pesa: {user.tel}<br/>Orange: {user.tel}<br/>PayPal: {user.email}<br/>Paiement: {user.paiement}</div></div>
      <button onClick={()=>{localStorage.removeItem("client_user"); window.location.href="/"}} style={{width:"100%",marginTop:20,background:"#ff0000",color:"#fff",padding:12,borderRadius:10,border:"none",fontWeight:900}}>Log Out - Se déconnecter</button>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:"2px solid #000",display:"flex",justifyContent:"space-around",padding:"8px 0"}}>
        <Link href="/" style={{fontSize:10,textDecoration:"none",color:"#000"}}>🏠 Accueil</Link>
        <Link href="/parametres" style={{fontSize:10,textDecoration:"none",color:"#000",fontWeight:900,background:"#ffcc00",padding:"2px 10px",borderRadius:20}}>⚙️ Sitting</Link>
      </div>
    </div>
  )
}
