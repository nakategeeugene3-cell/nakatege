"use client"
import { useState } from "react"
import Link from "next/link"

export default function MessagesPage(){
  const [expanded,setExpanded]=useState(false)
  const [form,setForm]=useState({nom:"",prenom:"",email:"",tel:"",msg:""})

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:80}}>
      <div style={{padding:10,display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #eee"}}>
        <Link href="/" style={{textDecoration:"none",color:"#000",fontWeight:900}}>{"< Retour"}</Link>
        <b style={{fontSize:11}}>Messages - Page Client</b>
      </div>

      <div style={{margin:10,display:"flex",gap:6}}>
        <button style={{background:"#000",color:"#fff",border:"none",padding:"6px 12px",borderRadius:12,fontSize:8}}>Recommander (0)</button>
        <button style={{background:"#f2f2f7",color:"#000",border:"1px solid #ddd",padding:"6px 12px",borderRadius:12,fontSize:8}}>Défenseur (0)</button>
        <button style={{background:"#f2f2f7",color:"#000",border:"1px solid #ddd",padding:"6px 12px",borderRadius:12,fontSize:8}}>Commentaires (0)</button>
      </div>

      {/* PETIT AU DEBUT - FORMULAIRE NE DOIT PAS APPARAITRE - COMME TU DIS */}
      <div style={{margin:10}}>
        {!expanded ? (
          <div onClick={()=>setExpanded(true)} style={{background:"#fff",border:"1px solid #ddd",borderRadius:10,padding:12,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:11,fontWeight:700}}>💬 Écrire un Message - Ça aide chez King</div>
            <div style={{fontSize:8,color:"#666",marginTop:6}}>Cliquez ici pour envoyer un message à KING - Formulaire petit - Rétréci</div>
            <div style={{marginTop:10,background:"#000",color:"#fff",padding:"8px",borderRadius:8,fontSize:9,fontWeight:700}}>Envoyer un Message à KING - Cliquez pour ouvrir</div>
          </div>
        ) : (
          <div style={{background:"#222",borderRadius:10,padding:10,border:"1px solid #333"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <b style={{fontSize:10,color:"#fff"}}>Écrire un Message - Ça aide chez King</b>
              <button onClick={()=>setExpanded(false)} style={{background:"#fff",color:"#000",border:"none",width:20,height:20,borderRadius:10,fontSize:10}}>X</button>
            </div>
            <div style={{fontSize:7,color:"#888",marginTop:4}}>Formulaire rétréci - Petit encore - Comme tu dis</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:10}}>
              <input value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} placeholder="Nom" style={{padding:"6px 8px",borderRadius:6,border:"1px solid #444",fontSize:9,color:"#000",background:"#fff"}}/>
              <input value={form.prenom} onChange={e=>setForm({...form,prenom:e.target.value})} placeholder="Prénom" style={{padding:"6px 8px",borderRadius:6,border:"1px solid #444",fontSize:9,color:"#000",background:"#fff"}}/>
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={{padding:"6px 8px",borderRadius:6,border:"1px solid #444",fontSize:9,color:"#000",background:"#fff"}}/>
              <input value={form.tel} onChange={e=>setForm({...form,tel:e.target.value})} placeholder="Tel" style={{padding:"6px 8px",borderRadius:6,border:"1px solid #444",fontSize:9,color:"#000",background:"#fff"}}/>
            </div>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <button style={{background:"#ff7a00",color:"#fff",border:"none",padding:"5px 10px",borderRadius:12,fontSize:7,fontWeight:700}}>Assistance King</button>
              <button style={{background:"#fff",color:"#000",border:"none",padding:"5px 10px",borderRadius:12,fontSize:7}}>Fournisseur</button>
              <button style={{background:"#fff",color:"#000",border:"none",padding:"5px 10px",borderRadius:12,fontSize:7}}>Téléphone</button>
            </div>
            <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Ton message ici... En quoi je peux vous aider? Poser..." rows={3} style={{width:"100%",marginTop:8,padding:"8px",borderRadius:6,border:"1px solid #444",fontSize:9,color:"#000",background:"#fff",resize:"none"}}/>
            <button onClick={()=>{ alert("Message envoyé à KING"); setExpanded(false)}} style={{width:"100%",marginTop:8,background:"#25D366",color:"#fff",border:"none",padding:"10px",borderRadius:8,fontSize:10,fontWeight:700}}>✅ Envoyer Message à KING - Commentaire</button>
          </div>
        )}
      </div>

      <div style={{margin:10,fontSize:8,color:"#666",textAlign:"center"}}>Ça doit pas apparaître, le formulaire ne doit pas apparaître au début - C'est petit encore, tu rétrécis le formulaire - Comme tu dis</div>
    </div>
  )
}
