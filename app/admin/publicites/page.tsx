"use client"
import { useState } from "react"
import Link from "next/link"
export default function PubPage(){
  const [pubs,setPubs]=useState<any[]>([
    {id:1, titre:"-50% Tapis 5D Cuir", lieu:"Nairobi, Kenya", fournisseur:"Guangzhou Auto", photo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", video:"", prix:"$34"},
  ])
  const [form,setForm]=useState({titre:"",lieu:"",fournisseur:"",photo:"",video:"",prix:""})
  const ajouter=()=>{
    if(!form.titre||!form.photo) return alert("Titre + Photo obligatoires - Vidéo pas obligatoire")
    setPubs([...pubs,{id:Date.now(),...form}])
    setForm({titre:"",lieu:"",fournisseur:"",photo:"",video:"",prix:""})
    alert("Publicité ajoutée! Va s'afficher en haut accueil - 4 pubs qui feuillettent")
  }
  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh"}}>
      <Link href="/">← Retour Accueil</Link>
      <h1 style={{fontWeight:900,marginTop:10,fontSize:14}}>Ajouter Publicité - 4 pubs qui feuillettent</h1>
      <div style={{background:"#f2f2f7",padding:12,borderRadius:12,marginTop:10}}>
        <input placeholder="Titre publicité * ex: -50% Tapis 5D" value={form.titre} onChange={e=>setForm({...form,titre:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Lieu * ex: Nairobi, Kenya" value={form.lieu} onChange={e=>setForm({...form,lieu:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Nom fournisseur * ex: Guangzhou Auto Parts" value={form.fournisseur} onChange={e=>setForm({...form,fournisseur:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Photo URL * obligatoire ex: https://..." value={form.photo} onChange={e=>setForm({...form,photo:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Vidéo URL - PAS OBLIGATOIRE - lien YouTube si tu veux" value={form.video} onChange={e=>setForm({...form,video:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/>
        <input placeholder="Prix ex: $34" value={form.prix} onChange={e=>setForm({...form,prix:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:8,fontSize:11}}/>
        <button onClick={ajouter} style={{width:"100%",background:"#000",color:"#fff",padding:12,borderRadius:10,fontWeight:900,fontSize:11,border:"none"}}>AJOUTER PUBLICITÉ</button>
        <div style={{fontSize:9,marginTop:6,color:"#666"}}>Photo obligatoire, Vidéo pas obligatoire. Lieu + fournisseur obligatoires. Max 4 pubs - ça feuillettent en haut comme Alibaba.</div>
      </div>
      <h3 style={{marginTop:12,fontSize:11}}>Mes Publicités ({pubs.length}/4)</h3>
      {pubs.map(p=><div key={p.id} style={{background:"#f2f2f7",padding:8,borderRadius:10,marginTop:6,display:"flex",gap:8}}><img src={p.photo} style={{width:60,height:60,objectFit:"cover",borderRadius:8}}/><div style={{fontSize:10}}><b>{p.titre}</b><br/>{p.lieu} - {p.fournisseur}<br/>{p.prix} {p.video?"🎥":"📷"}</div></div>)}
    </div>
  )
}
