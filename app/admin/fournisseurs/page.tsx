"use client"
import { useState } from "react"
import Link from "next/link"
import { fournisseurs as base } from "../../../lib/db"
export default function FournisseursPage(){
  const [filter,setFilter]=useState("all")
  const [list,setList]=useState(base)
  const [form,setForm]=useState({nom:"",tel:"",whatsapp:"",email:"",pays:"",cat:"",note:""})
  const filtered = filter==="all"? list : filter==="logistique" ? list.filter(f=>f.cat.includes("Logistique")) : list.filter(f=>!f.cat.includes("Logistique"))
  const ajouter=()=>{
    if(!form.nom) return alert("Nom obligatoire")
    const nf={id:Date.now().toString(), nom:form.nom, source:"Autre", tel:form.tel, whatsapp:form.whatsapp, email:form.email, pays:form.pays, cat:form.cat||"Autre", note:form.note, etoile:5}
    setList([...list, nf as any]); setForm({nom:"",tel:"",whatsapp:"",email:"",pays:"",cat:"",note:""}); alert("Ajoute! Total "+(list.length+1))
  }
  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh"}}>
      <Link href="/">← Retour</Link>
      <h1 style={{fontWeight:900,marginTop:10,fontSize:14}}>FOURNISSEURS RESTAURES {list.length} - 15 Alibaba + 8 Logistique DHL</h1>
      <div style={{display:"flex",gap:6,marginTop:10}}>
        <button onClick={()=>setFilter("all")} style={{flex:1,padding:8,borderRadius:20,border:"none",fontSize:10,background:filter==="all"?"#000":"#f2f2f7",color:filter==="all"?"#fff":"#000"}}>Tout ({list.length})</button>
        <button onClick={()=>setFilter("logistique")} style={{flex:1,padding:8,borderRadius:20,border:"none",fontSize:10,background:filter==="logistique"?"#000":"#f2f2f7",color:filter==="logistique"?"#fff":"#000"}}>🚚 Logistique (8)</button>
        <button onClick={()=>setFilter("produits")} style={{flex:1,padding:8,borderRadius:20,border:"none",fontSize:10,background:filter==="produits"?"#000":"#f2f2f7",color:filter==="produits"?"#fff":"#000"}}>📦 Alibaba (15)</button>
      </div>
      <div style={{background:"#f2f2f7",padding:12,borderRadius:12,marginTop:10}}>
        <b style={{fontSize:11}}>➕ Ajouter fournisseur toi-même</b>
        <input placeholder="Nom *" value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd",marginTop:6,marginBottom:4,fontSize:11}}/>
        <div style={{display:"flex",gap:6}}><input placeholder="Tel" value={form.tel} onChange={e=>setForm({...form,tel:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:4,fontSize:11}}/><input placeholder="WhatsApp" value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:4,fontSize:11}}/></div>
        <div style={{display:"flex",gap:6}}><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:4,fontSize:11}}/><input placeholder="Pays" value={form.pays} onChange={e=>setForm({...form,pays:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:4,fontSize:11}}/></div>
        <div style={{display:"flex",gap:6}}><input placeholder="Cat" value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/><input placeholder="Note" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd",marginBottom:6,fontSize:11}}/></div>
        <button onClick={ajouter} style={{width:"100%",background:"#000",color:"#fff",padding:12,borderRadius:10,fontWeight:900,fontSize:11,border:"none"}}>AJOUTER</button>
      </div>
      <div style={{marginTop:12}}>{filtered.map((x:any)=><div key={x.id} style={{background:x.cat.includes("Logistique")?"#000":"#fff",color:x.cat.includes("Logistique")?"#fff":"#000",border:x.cat.includes("Logistique")?"2px solid #ffcc00":"1px solid #eee",padding:10,borderRadius:12,marginTop:8,fontSize:10}}><b>{x.nom}</b> - {x.source} - {x.pays}<br/>{x.cat}<br/>{x.tel}<br/><div style={{marginTop:4,background:x.cat.includes("Logistique")?"#222":"#f2f2f7",padding:6,borderRadius:8}}>{x.note}</div>{x.id==="L2" && <div style={{background:"#ffcc00",color:"#000",padding:4,borderRadius:6,marginTop:4,textAlign:"center",fontWeight:900}}>✅ DHL PRESENT</div>}</div>)}</div>
    </div>
  )
}
