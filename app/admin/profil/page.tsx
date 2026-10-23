"use client"
import { useState } from "react"
import Link from "next/link"

export default function ProfilKing(){
  const [nom,setNom]=useState("KING NAKATEGE")
  const [photo,setPhoto]=useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200")
  const [whatsapp,setWhatsapp]=useState("+254 712 345 678")
  const [email,setEmail]=useState("king@kingshop.co.ke")
  const [tel,setTel]=useState("+254 712 345 678")
  const [newPhoto,setNewPhoto]=useState("")

  const handlePhotoChange=(e:any)=>{
    const file=e.target.files?.[0]
    if(file){
      const url=URL.createObjectURL(file)
      setPhoto(url)
      setNewPhoto(url)
      alert("Photo profil changée! - Maintenant c'est ta photo - Les clients verront cette photo dans assistance")
    }
  }

  const sauver=()=>{
    localStorage.setItem("king_profil", JSON.stringify({nom,photo,whatsapp,email,tel}))
    alert("Profil King sauvé! Photo: "+photo.slice(0,50)+"... Nom: "+nom+" - Maintenant quand client clique assistance, il verra ta nouvelle photo!")
  }

  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh"}}>
      <Link href="/">← Retour Accueil</Link>
      <h1 style={{fontWeight:900,marginTop:10,fontSize:14}}>Mon Compte Personnel 👑 - Choisis ta photo profil</h1>
      
      <div style={{background:"#f2f2f7",padding:14,borderRadius:14,marginTop:12,textAlign:"center"}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <img src={photo} style={{width:90,height:90,borderRadius:45,objectFit:"cover",border:"3px solid #000"}}/>
          <label style={{position:"absolute",bottom:0,right:0,background:"#000",color:"#fff",width:28,height:28,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14}}>📷<input type="file" accept="image/*" onChange={handlePhotoChange} style={{display:"none"}}/></label>
        </div>
        <div style={{fontWeight:900,marginTop:8}}>{nom}</div>
        <div style={{fontSize:10,color:"#666"}}>Clique 📷 sur photo pour changer ta photo de profil - Comme tu veux N.K.N</div>
        <button onClick={sauver} style={{marginTop:10,background:"#000",color:"#fff",padding:"10px 20px",borderRadius:20,border:"none",fontWeight:900,fontSize:11}}>SAUVER MON PROFIL</button>
      </div>

      <div style={{marginTop:14}}>
        <label style={{fontSize:10,fontWeight:700}}>Nom - Ex: KING NAKATEGE</label>
        <input value={nom} onChange={e=>setNom(e.target.value)} placeholder="KING NAKATEGE" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginTop:4,marginBottom:8,fontSize:12}}/>
        
        <label style={{fontSize:10,fontWeight:700}}>Photo profil URL ou clique 📷 ci-dessus</label>
        <input value={photo} onChange={e=>setPhoto(e.target.value)} placeholder="https://..." style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginTop:4,marginBottom:8,fontSize:11}}/>
        
        <label style={{fontSize:10,fontWeight:700}}>WhatsApp - Clients t'écriront ici</label>
        <input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="+254 712..." style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginTop:4,marginBottom:8,fontSize:11}}/>
        
        <label style={{fontSize:10,fontWeight:700}}>Email - Clients t'écriront ici</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="king@..." style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginTop:4,marginBottom:8,fontSize:11}}/>
        
        <label style={{fontSize:10,fontWeight:700}}>Téléphone</label>
        <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+254..." style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginTop:4,marginBottom:10,fontSize:11}}/>

        <button onClick={sauver} style={{width:"100%",background:"#000",color:"#fff",padding:12,borderRadius:10,fontWeight:900,border:"none"}}>SAUVER PROFIL - CLIENTS VERRONT TA PHOTO</button>
        
        <div style={{background:"#ffcc00",padding:10,borderRadius:10,marginTop:12,fontSize:10}}>
          <b>Comment ça marche:</b><br/>
          1. Tu choisis ta photo ici 📷 - Clique sur photo en haut<br/>
          2. Tu mets ton nom KING NAKATEGE<br/>
          3. Tu sauves<br/>
          4. Sur accueil, petit bouton assistance 🎧 en bas à droite<br/>
          5. Client clique → Il voit TA photo, TON profil, TON numéro<br/>
          6. Il écrit nom, email, WhatsApp, message<br/>
          7. Il choisit Envoyer WhatsApp ou Email → Ça atterrit chez toi!
        </div>
      </div>
    </div>
  )
}
