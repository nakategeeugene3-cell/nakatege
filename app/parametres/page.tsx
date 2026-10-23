"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const ALL_COUNTRIES = [
  {name:"Afghanistan", code:"af", flag:"🇦🇫"}, {name:"Afrique du Sud", code:"za", flag:"🇿🇦"}, {name:"Albanie", code:"al", flag:"🇦🇱"}, {name:"Algérie", code:"dz", flag:"🇩🇿"},
  {name:"Allemagne", code:"de", flag:"🇩🇪"}, {name:"Andorre", code:"ad", flag:"🇦🇩"}, {name:"Angola", code:"ao", flag:"🇦🇴"}, {name:"Arabie Saoudite", code:"sa", flag:"🇸🇦"},
  {name:"Argentine", code:"ar", flag:"🇦🇷"}, {name:"Arménie", code:"am", flag:"🇦🇲"}, {name:"Australie", code:"au", flag:"🇦🇺"}, {name:"Autriche", code:"at", flag:"🇦🇹"},
  {name:"Azerbaïdjan", code:"az", flag:"🇦🇿"}, {name:"Bahamas", code:"bs", flag:"🇧🇸"}, {name:"Bahreïn", code:"bh", flag:"🇧🇭"}, {name:"Bangladesh", code:"bd", flag:"🇧🇩"},
  {name:"Barbade", code:"bb", flag:"🇧🇧"}, {name:"Belgique", code:"be", flag:"🇧🇪"}, {name:"Belize", code:"bz", flag:"🇧🇿"}, {name:"Bénin", code:"bj", flag:"🇧🇯"},
  {name:"Bhoutan", code:"bt", flag:"🇧🇹"}, {name:"Biélorussie", code:"by", flag:"🇧🇾"}, {name:"Birmanie", code:"mm", flag:"🇲🇲"}, {name:"Bolivie", code:"bo", flag:"🇧🇴"},
  {name:"Bosnie-Herzégovine", code:"ba", flag:"🇧🇦"}, {name:"Botswana", code:"bw", flag:"🇧🇼"}, {name:"Brésil", code:"br", flag:"🇧🇷"}, {name:"Brunei", code:"bn", flag:"🇧🇳"},
  {name:"Bulgarie", code:"bg", flag:"🇧🇬"}, {name:"Burkina Faso", code:"bf", flag:"🇧🇫"}, {name:"Burundi", code:"bi", flag:"🇧🇮"}, {name:"Cambodge", code:"kh", flag:"🇰🇭"},
  {name:"Cameroun", code:"cm", flag:"🇨🇲"}, {name:"Canada", code:"ca", flag:"🇨🇦"}, {name:"Cap-Vert", code:"cv", flag:"🇨🇻"}, {name:"Chili", code:"cl", flag:"🇨🇱"},
  {name:"Chine", code:"cn", flag:"🇨🇳"}, {name:"Chypre", code:"cy", flag:"🇨🇾"}, {name:"Colombie", code:"co", flag:"🇨🇴"}, {name:"Comores", code:"km", flag:"🇰🇲"},
  {name:"Congo", code:"cg", flag:"🇨🇬"}, {name:"Congo RDC", code:"cd", flag:"🇨🇩"}, {name:"Corée du Nord", code:"kp", flag:"🇰🇵"}, {name:"Corée du Sud", code:"kr", flag:"🇰🇷"},
  {name:"Costa Rica", code:"cr", flag:"🇨🇷"}, {name:"Côte d'Ivoire", code:"ci", flag:"🇨🇮"}, {name:"Croatie", code:"hr", flag:"🇭🇷"}, {name:"Cuba", code:"cu", flag:"🇨🇺"},
  {name:"Danemark", code:"dk", flag:"🇩🇰"}, {name:"Djibouti", code:"dj", flag:"🇩🇯"}, {name:"Dominique", code:"dm", flag:"🇩🇲"}, {name:"Égypte", code:"eg", flag:"🇪🇬"},
  {name:"Émirats Arabes Unis", code:"ae", flag:"🇦🇪"}, {name:"Équateur", code:"ec", flag:"🇪🇨"}, {name:"Érythrée", code:"er", flag:"🇪🇷"}, {name:"Espagne", code:"es", flag:"🇪🇸"},
  {name:"Estonie", code:"ee", flag:"🇪🇪"}, {name:"Eswatini", code:"sz", flag:"🇸🇿"}, {name:"États-Unis", code:"us", flag:"🇺🇸"}, {name:"Éthiopie", code:"et", flag:"🇪🇹"},
  {name:"Fidji", code:"fj", flag:"🇫🇯"}, {name:"Finlande", code:"fi", flag:"🇫🇮"}, {name:"France", code:"fr", flag:"🇫🇷"}, {name:"Gabon", code:"ga", flag:"🇬🇦"},
  {name:"Gambie", code:"gm", flag:"🇬🇲"}, {name:"Géorgie", code:"ge", flag:"🇬🇪"}, {name:"Ghana", code:"gh", flag:"🇬🇭"}, {name:"Grèce", code:"gr", flag:"🇬🇷"},
  {name:"Grenade", code:"gd", flag:"🇬🇩"}, {name:"Guatemala", code:"gt", flag:"🇬🇹"}, {name:"Guinée", code:"gn", flag:"🇬🇳"}, {name:"Guinée-Bissau", code:"gw", flag:"🇬🇼"},
  {name:"Guinée équatoriale", code:"gq", flag:"🇬🇶"}, {name:"Guyana", code:"gy", flag:"🇬🇾"}, {name:"Haïti", code:"ht", flag:"🇭🇹"}, {name:"Honduras", code:"hn", flag:"🇭🇳"},
  {name:"Hongrie", code:"hu", flag:"🇭🇺"}, {name:"Inde", code:"in", flag:"🇮🇳"}, {name:"Indonésie", code:"id", flag:"🇮🇩"}, {name:"Irak", code:"iq", flag:"🇮🇶"},
  {name:"Iran", code:"ir", flag:"🇮🇷"}, {name:"Irlande", code:"ie", flag:"🇮🇪"}, {name:"Islande", code:"is", flag:"🇮🇸"}, {name:"Israël", code:"il", flag:"🇮🇱"},
  {name:"Italie", code:"it", flag:"🇮🇹"}, {name:"Jamaïque", code:"jm", flag:"🇯🇲"}, {name:"Japon", code:"jp", flag:"🇯🇵"}, {name:"Jordanie", code:"jo", flag:"🇯🇴"},
  {name:"Kazakhstan", code:"kz", flag:"🇰🇿"}, {name:"Kenya", code:"ke", flag:"🇰🇪"}, {name:"Kirghizistan", code:"kg", flag:"🇰🇬"}, {name:"Kiribati", code:"ki", flag:"🇰🇮"},
  {name:"Koweït", code:"kw", flag:"🇰🇼"}, {name:"Laos", code:"la", flag:"🇱🇦"}, {name:"Lesotho", code:"ls", flag:"🇱🇸"}, {name:"Lettonie", code:"lv", flag:"🇱🇻"},
  {name:"Liban", code:"lb", flag:"🇱🇧"}, {name:"Liberia", code:"lr", flag:"🇱🇷"}, {name:"Libye", code:"ly", flag:"🇱🇾"}, {name:"Liechtenstein", code:"li", flag:"🇱🇮"},
  {name:"Lituanie", code:"lt", flag:"🇱🇹"}, {name:"Luxembourg", code:"lu", flag:"🇱🇺"}, {name:"Macédoine du Nord", code:"mk", flag:"🇲🇰"}, {name:"Madagascar", code:"mg", flag:"🇲🇬"},
  {name:"Malaisie", code:"my", flag:"🇲🇾"}, {name:"Malawi", code:"mw", flag:"🇲🇼"}, {name:"Maldives", code:"mv", flag:"🇲🇻"}, {name:"Mali", code:"ml", flag:"🇲🇱"},
  {name:"Malte", code:"mt", flag:"🇲🇹"}, {name:"Maroc", code:"ma", flag:"🇲🇦"}, {name:"Marshall", code:"mh", flag:"🇲🇭"}, {name:"Maurice", code:"mu", flag:"🇲🇺"},
  {name:"Mauritanie", code:"mr", flag:"🇲🇷"}, {name:"Mexique", code:"mx", flag:"🇲🇽"}, {name:"Micronésie", code:"fm", flag:"🇫🇲"}, {name:"Moldavie", code:"md", flag:"🇲🇩"},
  {name:"Monaco", code:"mc", flag:"🇲🇨"}, {name:"Mongolie", code:"mn", flag:"🇲🇳"}, {name:"Monténégro", code:"me", flag:"🇲🇪"}, {name:"Mozambique", code:"mz", flag:"🇲🇿"},
  {name:"Namibie", code:"na", flag:"🇳🇦"}, {name:"Nauru", code:"nr", flag:"🇳🇷"}, {name:"Népal", code:"np", flag:"🇳🇵"}, {name:"Nicaragua", code:"ni", flag:"🇳🇮"},
  {name:"Niger", code:"ne", flag:"🇳🇪"}, {name:"Nigeria", code:"ng", flag:"🇳🇬"}, {name:"Norvège", code:"no", flag:"🇳🇴"}, {name:"Nouvelle-Zélande", code:"nz", flag:"🇳🇿"},
  {name:"Oman", code:"om", flag:"🇴🇲"}, {name:"Ouganda", code:"ug", flag:"🇺🇬"}, {name:"Ouzbékistan", code:"uz", flag:"🇺🇿"}, {name:"Pakistan", code:"pk", flag:"🇵🇰"},
  {name:"Palaos", code:"pw", flag:"🇵🇼"}, {name:"Palestine", code:"ps", flag:"🇵🇸"}, {name:"Panama", code:"pa", flag:"🇵🇦"}, {name:"Papouasie-Nouvelle-Guinée", code:"pg", flag:"🇵🇬"},
  {name:"Paraguay", code:"py", flag:"🇵🇾"}, {name:"Pays-Bas", code:"nl", flag:"🇳🇱"}, {name:"Pérou", code:"pe", flag:"🇵🇪"}, {name:"Philippines", code:"ph", flag:"🇵🇭"},
  {name:"Pologne", code:"pl", flag:"🇵🇱"}, {name:"Portugal", code:"pt", flag:"🇵🇹"}, {name:"Qatar", code:"qa", flag:"🇶🇦"}, {name:"République Centrafricaine", code:"cf", flag:"🇨🇫"},
  {name:"République Dominicaine", code:"do", flag:"🇩🇴"}, {name:"République Tchèque", code:"cz", flag:"🇨🇿"}, {name:"Roumanie", code:"ro", flag:"🇷🇴"}, {name:"Royaume-Uni", code:"gb", flag:"🇬🇧"},
  {name:"Russie", code:"ru", flag:"🇷🇺"}, {name:"Rwanda", code:"rw", flag:"🇷🇼"}, {name:"Saint-Kitts-et-Nevis", code:"kn", flag:"🇰🇳"}, {name:"Saint-Marin", code:"sm", flag:"🇸🇲"},
  {name:"Saint-Vincent-et-les Grenadines", code:"vc", flag:"🇻🇨"}, {name:"Sainte-Lucie", code:"lc", flag:"🇱🇨"}, {name:"Salomon", code:"sb", flag:"🇸🇧"}, {name:"Salvador", code:"sv", flag:"🇸🇻"},
  {name:"Samoa", code:"ws", flag:"🇼🇸"}, {name:"São Tomé-et-Príncipe", code:"st", flag:"🇸🇹"}, {name:"Sénégal", code:"sn", flag:"🇸🇳"}, {name:"Serbie", code:"rs", flag:"🇷🇸"},
  {name:"Seychelles", code:"sc", flag:"🇸🇨"}, {name:"Sierra Leone", code:"sl", flag:"🇸🇱"}, {name:"Singapour", code:"sg", flag:"🇸🇬"}, {name:"Slovaquie", code:"sk", flag:"🇸🇰"},
  {name:"Slovénie", code:"si", flag:"🇸🇮"}, {name:"Somalie", code:"so", flag:"🇸🇴"}, {name:"Soudan", code:"sd", flag:"🇸🇩"}, {name:"Soudan du Sud", code:"ss", flag:"🇸🇸"},
  {name:"Sri Lanka", code:"lk", flag:"🇱🇰"}, {name:"Suède", code:"se", flag:"🇸🇪"}, {name:"Suisse", code:"ch", flag:"🇨🇭"}, {name:"Suriname", code:"sr", flag:"🇸🇷"},
  {name:"Syrie", code:"sy", flag:"🇸🇾"}, {name:"Tadjikistan", code:"tj", flag:"🇹🇯"}, {name:"Tanzanie", code:"tz", flag:"🇹🇿"}, {name:"Tchad", code:"td", flag:"🇹🇩"},
  {name:"Thaïlande", code:"th", flag:"🇹🇭"}, {name:"Timor oriental", code:"tl", flag:"🇹🇱"}, {name:"Togo", code:"tg", flag:"🇹🇬"}, {name:"Tonga", code:"to", flag:"🇹🇴"},
  {name:"Trinité-et-Tobago", code:"tt", flag:"🇹🇹"}, {name:"Tunisie", code:"tn", flag:"🇹🇳"}, {name:"Turkménistan", code:"tm", flag:"🇹🇲"}, {name:"Turquie", code:"tr", flag:"🇹🇷"},
  {name:"Tuvalu", code:"tv", flag:"🇹🇻"}, {name:"Ukraine", code:"ua", flag:"🇺🇦"}, {name:"Uruguay", code:"uy", flag:"🇺🇾"}, {name:"Vanuatu", code:"vu", flag:"🇻🇺"},
  {name:"Vatican", code:"va", flag:"🇻🇦"}, {name:"Venezuela", code:"ve", flag:"🇻🇪"}, {name:"Viêt Nam", code:"vn", flag:"🇻🇳"}, {name:"Yémen", code:"ye", flag:"🇾🇪"},
  {name:"Zambie", code:"zm", flag:"🇿🇲"}, {name:"Zimbabwe", code:"zw", flag:"🇿🇼"},
]

export default function SettingsPage(){
  const [view,setView]=useState("main")
  const [countrySelected,setCountrySelected]=useState("Kenya")
  const [countrySearch,setCountrySearch]=useState("")
  const [showCountrySuccess,setShowCountrySuccess]=useState(false)
  const [clientUser,setClientUser]=useState<any>(null)

  useEffect(()=>{
    const cu=localStorage.getItem("client_user")
    if(cu) setClientUser(JSON.parse(cu))
    const cc=localStorage.getItem("selected_country")
    if(cc) setCountrySelected(cc)
  },[])

  const filteredCountries = ALL_COUNTRIES.filter(c=> c.name.toLowerCase().includes(countrySearch.toLowerCase()))

  const handleShoppingNow=()=>{
    if(!countrySelected){
      alert("Please Select Country")
      return
    }
    localStorage.setItem("selected_country", countrySelected)
    setShowCountrySuccess(true)
    setTimeout(()=>{
      setShowCountrySuccess(false)
      setView("main")
    },1500)
  }

  return (
    <div style={{maxWidth:480,margin:"0 auto",background:"#f5f5f5",minHeight:"100vh",fontFamily:"sans-serif",position:"relative",paddingBottom:80}}>
      <div style={{background:"#fff",padding:"12px 16px",display:"flex",alignItems:"center",borderBottom:"1px solid #eee",position:"sticky",top:0,zIndex:10}}>
        <button onClick={()=>{ if(view==="main") window.history.back(); else setView("main")}} style={{border:"none",background:"none",fontSize:20,marginRight:12}}>{"<"}</button>
        <b style={{fontSize:15,fontWeight:600}}>{view==="main"?"Settings":view==="security"?"Security Setting":view==="profiles"?"Edit Profiles":view==="country"?"Please Select Country - Tous les pays du monde":view==="about"?"About Us":view==="policies"?"Policies":view}</b>
        {(view==="about"||view==="policies") && <button onClick={()=>setView("main")} style={{marginLeft:"auto",border:"none",background:"none",fontSize:18}}>X</button>}
      </div>

      {view==="main" && (
        <div style={{marginTop:0}}>
          <div style={{background:"#fff",marginTop:8}}>
            <div onClick={()=>setView("security")} style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0",cursor:"pointer"}}>
              <span style={{fontSize:14}}>Security Setting</span><span style={{color:"#999"}}>{">"}</span>
            </div>
            <div onClick={()=>setView("profiles")} style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0",cursor:"pointer"}}>
              <span style={{fontSize:14}}>Profiles</span><span style={{color:"#999"}}>{">"}</span>
            </div>
            <div onClick={()=>setView("country")} style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0",cursor:"pointer"}}>
              <span style={{fontSize:14}}>Country</span><span style={{fontSize:12,color:"#999"}}>{countrySelected} {">"}</span>
            </div>
          </div>
          <div style={{background:"#fff",marginTop:8}}>
            <div onClick={()=>setView("about")} style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0",cursor:"pointer"}}>
              <span style={{fontSize:14}}>About Us</span><span style={{color:"#999"}}>{">"}</span>
            </div>
            <div onClick={()=>setView("policies")} style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0",cursor:"pointer"}}>
              <span style={{fontSize:14}}>Policies</span><span style={{color:"#999"}}>{">"}</span>
            </div>
          </div>
          <div style={{background:"#fff",marginTop:8}}>
            <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:14}}>Version</span><span style={{fontSize:13,color:"#999"}}>2.1.0</span>
            </div>
          </div>
          <div style={{padding:"20px 16px"}}>
            <button onClick={()=>{if(confirm("Log Out?")){localStorage.removeItem("client_user"); window.location.href="/"} }} style={{width:"100%",background:"#fff",border:"none",padding:"14px",borderRadius:8,fontSize:14,fontWeight:600,boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>Log Out</button>
          </div>
          {showCountrySuccess && <div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"#333",color:"#fff",padding:"10px 20px",borderRadius:6,fontSize:12,zIndex:100}}>Country switched successfully. {countrySelected}</div>}
        </div>
      )}

      {view==="security" && (
        <div style={{background:"#fff",marginTop:8}}>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>Phone Number</span><span style={{color:"#999"}}>{">"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>Email</span><span style={{fontSize:11,color:"#999"}}>{clientUser?.email || "eugenanakatege@gmail.com"} {">"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>WhatsApp Account</span><span style={{color:"#999"}}>{">"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>Setting Password</span><span style={{color:"#999"}}>{">"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14}}>Closure Account</span><span style={{color:"#999"}}>{">"}</span></div>
        </div>
      )}

      {view==="profiles" && (
        <div style={{background:"#fff",marginTop:0}}>
          <div style={{textAlign:"center",padding:"30px 0 20px",borderBottom:"8px solid #f5f5f5"}}>
            <div style={{width:80,height:80,borderRadius:40,background:"#f0f0f0",margin:"0 auto",overflow:"hidden"}}><img src={clientUser?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"} style={{width:80,height:80,objectFit:"cover"}}/></div>
          </div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>Name</span><span style={{fontSize:13,color:"#999"}}>{clientUser? (clientUser.prenom+" "+clientUser.nom) : "Nakatege Eugene"} {" >"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>Bio</span><span style={{color:"#999"}}>{">"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f0f0f0"}}><span style={{fontSize:14}}>gender</span><span style={{fontSize:13,color:"#999"}}>Secret {" >"}</span></div>
          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14}}>Birthday</span><span style={{color:"#999"}}>{">"}</span></div>
        </div>
      )}

      {view==="country" && (
        <div style={{background:"#fff",minHeight:"calc(100vh - 50px)",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"10px 16px",borderBottom:"1px solid #eee"}}>
            <div style={{display:"flex",alignItems:"center",background:"#f2f2f7",borderRadius:20,padding:"8px 12px"}}>
              <span style={{fontSize:14}}>🔍</span>
              <input value={countrySearch} onChange={e=>setCountrySearch(e.target.value)} placeholder="Rechercher pays - Tous les pays du monde" style={{flex:1,border:"none",outline:"none",background:"transparent",marginLeft:8,fontSize:13}}/>
              {countrySearch && <button onClick={()=>setCountrySearch("")} style={{border:"none",background:"none"}}>❌</button>}
            </div>
            <div style={{fontSize:10,color:"#666",marginTop:6,textAlign:"center"}}>🌍 {filteredCountries.length} pays du monde - Comme tu veux KING - Pas seulement Kenya Ouganda</div>
          </div>
          
          <div style={{flex:1,overflowY:"auto",padding:"0 16px",maxHeight:"60vh"}}>
            {filteredCountries.map(c=>(
              <div key={c.code} onClick={()=>setCountrySelected(c.name)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #f5f5f5",cursor:"pointer",background:countrySelected===c.name?"#f0f8ff":"transparent",borderRadius:countrySelected===c.name?8:0,paddingLeft:countrySelected===c.name?8:0}}>
                <div style={{width:20,height:20,borderRadius:10,border:countrySelected===c.name?"6px solid #000":"1px solid #999",boxSizing:"border-box",flexShrink:0}}></div>
                <span style={{fontSize:18}}>{c.flag}</span>
                <img src={`https://flagcdn.com/w40/${c.code}.png`} style={{width:28,height:18,objectFit:"cover",border:"1px solid #eee",borderRadius:2}} onError={e=>e.currentTarget.style.display='none'}/>
                <span style={{fontSize:13,fontWeight:countrySelected===c.name?900:400}}>{c.name}</span>
                {countrySelected===c.name && <span style={{marginLeft:"auto",color:"#00a651",fontWeight:900}}>✓</span>}
              </div>
            ))}
            {filteredCountries.length===0 && <div style={{textAlign:"center",padding:20,fontSize:12,color:"#999"}}>Aucun pays trouvé pour "{countrySearch}"</div>}
          </div>
          
          <div style={{padding:"16px",borderTop:"1px solid #eee",background:"#fff"}}>
            <div style={{fontSize:10,textAlign:"center",marginBottom:8}}>Pays sélectionné: <b>{countrySelected}</b> 🌍</div>
            <button onClick={handleShoppingNow} style={{width:"100%",background:"linear-gradient(to right, #ff9800, #f44336)",color:"#fff",border:"none",padding:"14px",borderRadius:6,fontSize:14,fontWeight:600}}>Shopping Now → {countrySelected}</button>
          </div>

          {showCountrySuccess && <div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"#333",color:"#fff",padding:"10px 20px",borderRadius:6,fontSize:12,zIndex:200}}>Country switched successfully. {countrySelected}</div>}
        </div>
      )}

      {view==="about" && (
        <div style={{background:"#000",minHeight:"calc(100vh - 50px)",padding:20}}>
          <div style={{color:"#fff",fontSize:12,lineHeight:"20px",textAlign:"center",marginTop:40}}>
            <div style={{fontSize:30}}>👑</div><h2 style={{marginTop:10}}>KINGSHOP.CO.KE</h2><p style={{marginTop:10,color:"#aaa"}}>Version 2.1.0 - About Us - Tous les pays du monde - KingShop livre partout</p>
          </div>
        </div>
      )}

      {view==="policies" && (
        <div style={{background:"#fff",minHeight:"calc(100vh - 50px)",padding:16}}>
          <h3 style={{fontSize:14,fontWeight:600}}>Policies</h3>
          <div style={{fontSize:12,lineHeight:"18px",color:"#666",marginTop:12}}>
            <p>1. Retour gratuit sous 7 jours - Tous pays</p><p style={{marginTop:8}}>2. Paiement sécurisé - Tous pays du monde</p><p style={{marginTop:8}}>3. Livraison mondiale - {ALL_COUNTRIES.length} pays</p>
          </div>
        </div>
      )}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:"1px solid #ddd",display:"flex",justifyContent:"space-around",padding:"6px 0",zIndex:100}}>
        <a href="/" style={{textAlign:"center",fontSize:9,textDecoration:"none",color:"#666"}}><div>🏠</div>Accueil</a>
        <a href="/categories" style={{textAlign:"center",fontSize:9,textDecoration:"none",color:"#666"}}><div>📂</div>Catégorie</a>
        <a href="/messages" style={{textAlign:"center",fontSize:9,textDecoration:"none",color:"#666"}}><div>💬</div>Message</a>
        <a href="/panier" style={{textAlign:"center",fontSize:9,textDecoration:"none",color:"#666"}}><div>🛒</div>Panier</a>
        <a href="/compte" style={{textAlign:"center",fontSize:9,textDecoration:"none",color:"#666"}}><div>👤</div>Account</a>
        <a href="/parametres" style={{textAlign:"center",fontSize:9,textDecoration:"none",color:"#000",fontWeight:900}}><div>⚙️</div>Sitting</a>
      </div>
    </div>
  )
}
