"use client"
import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { produits as allProduits } from "../lib/db"

const currencies35 = ["USD $","KES KSh","EUR €","GBP £","NGN ₦","ZAR R","UGX USh","TZS TSh","RWF RF","ETB Br","EGP E£","MAD DH","DZD DA","XOF CFA","XAF CFA","GHS ₵","INR ₹","CNY ¥","JPY ¥","KRW ₩","AED AED","SAR SAR","TRY ₺","BRL R$","CAD C$","AUD A$","CHF CHF","SEK kr","NOK kr","DKK kr","PLN zł","RUB ₽","PKR ₨","BDT ৳","IDR Rp"]
const categories12 = ["All","Phones","Laptops","Shoes","Watches","Fashion","Electronics","Gaming","Home","Beauty","Sports","Kids"]

export default function KingShopFinal(){
  const [search,setSearch]=useState("")
  const [cat,setCat]=useState("All")
  const [showCurrency,setShowCurrency]=useState(false)
  const [selectedCurrency,setSelectedCurrency]=useState("USD $")
  const [showAssist,setShowAssist]=useState(false)
  const [assistForm,setAssistForm]=useState({nom:"",email:"",tel:"",msg:""})
  const fileRef=useRef<HTMLInputElement>(null)
  const [clientUser,setClientUser]=useState<any>(null)
  const [checked,setChecked]=useState(false)
  const [step,setStep]=useState(0)
  const [form,setForm]=useState({pseudo:"",nom:"",prenom:"",email:"",tel:"",photo:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"})
  const [videoTimer,setVideoTimer]=useState(15)
  const [videoIndex,setVideoIndex]=useState(0)
  const [listening,setListening]=useState(false)

  useEffect(()=>{ const cu=localStorage.getItem("client_user"); if(cu) setClientUser(JSON.parse(cu)); setChecked(true)},[])
  useEffect(()=>{
    if(step!==2) return
    if(videoTimer<=0){
      if(videoIndex===0){ setVideoIndex(1); setVideoTimer(15); return }
      localStorage.setItem("client_user", JSON.stringify({...form, id:Date.now()}))
      setClientUser(form); return
    }
    const t=setTimeout(()=>setVideoTimer(videoTimer-1),1000)
    return ()=>clearTimeout(t)
  },[step,videoTimer,videoIndex,form])
  const handlePhoto=(e:any)=>{ const f=e.target.files?.[0]; if(f) setForm({...form,photo:URL.createObjectURL(f)}) }
  const startMic=()=>{
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if(!SR){ alert("Use Chrome"); return }
    const rec=new SR(); rec.lang="fr-FR"; rec.onstart=()=>setListening(true); rec.onend=()=>setListening(false)
    rec.onresult=(e:any)=>setSearch(e.results[0][0].transcript); rec.start()
  }
  const filtered = useMemo(()=>{
    let l=allProduits
    if(search) l=l.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()))
    if(cat!=="All") l=l.filter(p=>p.cat===cat || p.name.toLowerCase().includes(cat.toLowerCase()))
    return l
  },[search,cat])

  if(!checked) return <div style={{padding:20}}>Loading...</div>
  if(!clientUser){
    return (
      <div style={{maxWidth:480,margin:"0 auto",background:"#0a0e1a",minHeight:"100vh",color:"#fff"}}>
        {step===0 && <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:20,textAlign:"center"}}><div style={{fontSize:11,letterSpacing:4,color:"#666",marginBottom:8}}>WELCOME TO</div><div style={{fontSize:24,fontWeight:900}}>KINGSHOP.CO.KE</div><div style={{width:"100%",marginTop:30,display:"flex",gap:10}}><button onClick={()=>setStep(1)} style={{flex:1,background:"#fff",color:"#000",padding:"10px",borderRadius:20,border:"none",fontSize:12,fontWeight:900}}>Sign Up</button><button onClick={()=>setStep(1)} style={{flex:1,background:"transparent",color:"#fff",padding:"10px",borderRadius:20,border:"1px solid #444",fontSize:12}}>Sign In</button></div></div>}
        {step===1 && <div style={{padding:20}}><div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900}}>KINGSHOP.CO.KE</div></div><div style={{textAlign:"center",marginTop:20}}><img src={form.photo} style={{width:80,height:80,borderRadius:40,border:"2px solid #fff",objectFit:"cover"}}/><div style={{marginTop:8}}><label style={{background:"#fff",color:"#000",padding:"6px 12px",borderRadius:15,fontSize:10,fontWeight:700,cursor:"pointer"}}>📷 Photo<input type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/></label></div></div><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:20}}><input value={form.pseudo} onChange={e=>setForm({...form,pseudo:e.target.value})} placeholder="Pseudo *" style={{padding:"12px",borderRadius:8,border:"none",color:"#000",background:"#fff",fontSize:12}}/><div style={{display:"flex",gap:8}}><input value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} placeholder="Last Name *" style={{flex:1,padding:"12px",borderRadius:8,border:"none",color:"#000",background:"#fff",fontSize:12}}/><input value={form.prenom} onChange={e=>setForm({...form,prenom:e.target.value})} placeholder="First Name *" style={{flex:1,padding:"12px",borderRadius:8,border:"none",color:"#000",background:"#fff",fontSize:12}}/></div><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email *" style={{padding:"12px",borderRadius:8,border:"none",color:"#000",background:"#fff",fontSize:12}}/><input value={form.tel} onChange={e=>setForm({...form,tel:e.target.value})} placeholder="Phone *" style={{padding:"12px",borderRadius:8,border:"none",color:"#000",background:"#fff",fontSize:12}}/></div><button onClick={()=>{ if(!form.pseudo||!form.nom||!form.email||!form.tel) return alert("Fill all"); setVideoTimer(15); setVideoIndex(0); setStep(2)}} style={{width:"100%",marginTop:20,background:"#fff",color:"#000",padding:"12px",borderRadius:20,border:"none",fontSize:12,fontWeight:900}}>Continue</button></div>}
        {step===2 && <div style={{position:"fixed",inset:0,background:"#000",zIndex:999,display:"flex",flexDirection:"column"}}><div style={{flex:1,position:"relative"}}><video autoPlay muted loop playsInline style={{width:"100%",height:"100%",objectFit:"cover"}} src={videoIndex===0?"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"} /><div style={{position:"absolute",top:16,right:16,background:"#ffcc00",color:"#000",padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:900}}>{videoTimer}s - Video {videoIndex+1}/2</div><div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:"#333"}}><div style={{width:`${((15-videoTimer)/15)*100}%`,height:4,background:"#ffcc00"}}></div></div></div></div>}
      </div>
    )
  }

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:90}}>
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,zIndex:100,background:"#000",padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{fontSize:11,color:"#fff"}}>KINGSHOP.CO.KE</b><button onClick={()=>setShowCurrency(!showCurrency)} style={{background:"#222",color:"#fff",border:"none",padding:"5px 10px",borderRadius:10,fontSize:8}}>{selectedCurrency} ▼</button></div>
      <div style={{height:42}}></div>
      {showCurrency && <div style={{margin:"0 10px",background:"#fff",border:"1px solid #ddd",borderRadius:10,padding:10}}><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{currencies35.map(c=><button key={c} onClick={()=>{setSelectedCurrency(c); setShowCurrency(false)}} style={{background:selectedCurrency===c?"#000":"#f2f2f7",color:selectedCurrency===c?"#fff":"#000",border:"none",padding:"6px 8px",borderRadius:8,fontSize:8}}>{c}</button>)}</div></div>}
      <div style={{padding:"8px 10px"}}><div style={{display:"flex",alignItems:"center",border:"1px solid #ddd",borderRadius:30,padding:"5px 6px 5px 12px",background:"#fff"}}><button onClick={()=>fileRef.current?.click()} style={{border:"none",background:"transparent",fontSize:18}}>📷</button><input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products" style={{flex:1,border:"none",outline:"none",marginLeft:8,fontSize:12,color:"#000"}}/><button onClick={startMic} style={{border:"none",background:listening?"#ff0000":"transparent",width:34,height:34,borderRadius:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{listening?"🔴":"🎤"}</button><button style={{background:"#000",color:"#fff",border:"none",padding:"8px 14px",borderRadius:20,fontSize:9,fontWeight:700,marginLeft:4}}>Search</button></div></div>
      <div style={{margin:"0 10px",display:"flex",alignItems:"center",gap:8,background:"#f2f2f7",borderRadius:10,padding:8}}><img src={clientUser.photo} style={{width:30,height:30,borderRadius:15,objectFit:"cover"}}/><div style={{fontSize:9,fontWeight:700}}>{clientUser.pseudo}</div></div>
      <Link href="/categories" style={{textDecoration:"none"}}><div style={{margin:"8px 10px",background:"#000",borderRadius:10,padding:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:12,fontWeight:900,color:"#ffcc00"}}>PUBLICITÉ</div><div style={{fontSize:8,color:"#fff"}}>King Shipping - 50% OFF</div></div><div style={{color:"#fff"}}>➡️</div></div></Link>
      <div style={{margin:"8px 10px"}}><div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,whiteSpace:"nowrap"}}>{categories12.map(c=>(<button key={c} onClick={()=>setCat(c)} style={{flexShrink:0,background:cat===c?"#000":"#f2f2f7",color:cat===c?"#fff":"#000",border:"none",padding:"7px 12px",borderRadius:20,fontSize:9,fontWeight:700}}>{c}</button>))}</div></div>

      {/* TOUS LES PRODUITS - PAS DE VOIR PLUS ICI - COMME TU DIS */}
      <div style={{margin:10,background:"#f2f2f7",borderRadius:12,padding:10}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
          {filtered.map(p=>(
            <Link key={p.id} href={`/produits/${p.id}`} style={{background:"#fff",borderRadius:10,padding:6,textDecoration:"none",color:"#000",border:"1px solid #eee"}}>
              <img src={p.img} style={{width:"100%",height:70,objectFit:"cover",borderRadius:6}}/>
              <div style={{fontSize:8,fontWeight:700,height:20,overflow:"hidden",marginTop:4}}>{p.name}</div>
              <div style={{fontSize:11,fontWeight:900}}>${p.price}</div>
            </Link>
          ))}
        </div>
        {/* PLUS DE BOUTON VOIR PLUS ICI - DEPLACE DANS PANIER */}
      </div>

      <div style={{position:"fixed",bottom:88,right:12,zIndex:200}}><button onClick={()=>setShowAssist(true)} style={{background:"#ffcc00",width:48,height:48,borderRadius:24,border:"2px solid #000",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎧</button></div>
      {showAssist && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:12}} onClick={()=>setShowAssist(false)}>
          <div style={{background:"#fff",width:"100%",maxWidth:340,borderRadius:12,padding:14}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:11}}>Assistance</b><button onClick={()=>setShowAssist(false)} style={{border:"none",background:"#000",color:"#fff",width:20,height:20,borderRadius:10}}>X</button></div>
            <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
              <input value={assistForm.nom} onChange={e=>setAssistForm({...assistForm,nom:e.target.value})} placeholder="Name *" style={{padding:8,borderRadius:6,border:"1px solid #ddd",fontSize:10,color:"#000"}}/>
              <input value={assistForm.email} onChange={e=>setAssistForm({...assistForm,email:e.target.value})} placeholder="Email *" style={{padding:8,borderRadius:6,border:"1px solid #ddd",fontSize:10,color:"#000"}}/>
              <textarea value={assistForm.msg} onChange={e=>setAssistForm({...assistForm,msg:e.target.value})} placeholder="Message..." rows={3} style={{padding:8,borderRadius:6,border:"1px solid #ddd",fontSize:10,color:"#000"}}/>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>{ window.open(`https://wa.me/254700000000?text=${encodeURIComponent(assistForm.nom+": "+assistForm.msg)}`,"_blank"); setShowAssist(false)}} style={{flex:1,background:"#25D366",color:"#fff",border:"none",padding:"10px",borderRadius:8,fontSize:10,fontWeight:700}}>WhatsApp</button>
              <button onClick={()=>{ window.location.href=`mailto:king@kingshop.co.ke?subject=Assistance ${assistForm.nom}&body=${encodeURIComponent(assistForm.msg)}`; setShowAssist(false)}} style={{flex:1,background:"#000",color:"#fff",border:"none",padding:"10px",borderRadius:8,fontSize:10,fontWeight:700}}>Email</button>
            </div>
          </div>
        </div>
      )}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:"1px solid #ddd",display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:100}}><Link href="/" style={{textAlign:"center",fontSize:8,textDecoration:"none",color:"#000",fontWeight:700}}><div>🏠</div>Accueil</Link><Link href="/categories" style={{textAlign:"center",fontSize:8,textDecoration:"none",color:"#666"}}><div>📂</div>Catégorie</Link><Link href="/messages" style={{textAlign:"center",fontSize:8,textDecoration:"none",color:"#666"}}><div>💬</div>Message</Link><Link href="/panier" style={{textAlign:"center",fontSize:8,textDecoration:"none",color:"#666"}}><div>🛒</div>Panier</Link><Link href="/parametres" style={{textAlign:"center",fontSize:8,textDecoration:"none",color:"#000",fontWeight:700,background:"#ffcc00",padding:"3px 8px",borderRadius:10}}><div>⚙️</div>SETTING</Link></div>
    </div>
  )
}
