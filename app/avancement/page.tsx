"use client"
import Link from "next/link"
export default function Avancement(){
  const ventes=[
    {id:1, date:"23 Oct 2026 10:23", client:"Jean Kamau +254 712...", produit:"iPhone 15 Pro Max 256GB Titanium", montant:1556, transport:6, statut:"Félicitations! Vous avez vendu à Jean pour $1556 - Argent dans Portefeuille en attente"},
    {id:2, date:"23 Oct 2026 09:15", client:"Marie Wanjiku +254 722...", produit:"Samsung S24 Ultra 512GB", montant:1256, transport:6, statut:"Félicitations! Vous avez vendu à Marie pour $1256 - Payé via Orange Money"},
    {id:3, date:"22 Oct 2026", client:"Ali Hassan +254 733...", produit:"Nike Air 270 Homme", montant:85, transport:6, statut:"Félicitations! Vous avez vendu à Ali pour $85 - Validé, disponible à retirer"},
    {id:4, date:"21 Oct 2026", client:"David Ochieng", produit:"Tapis Voiture 5D Cuir", montant:34, transport:6, statut:"Félicitations! Vous avez vendu 2 tapis à David pour $68"},
  ]
  const totalVendu = ventes.reduce((s,v)=>s+v.montant,0)
  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:12,fontFamily:"sans-serif",background:"#fff",minHeight:"100vh",paddingBottom:70}}>
      <Link href="/parametres">← Retour Settings</Link>
      <h1 style={{fontWeight:900,marginTop:10,fontSize:14}}>Avancement - Tous les formulaires vendus</h1>
      <div style={{background:"#000",color:"#fff",borderRadius:12,padding:12,marginTop:10}}>
        <div style={{fontSize:10,opacity:0.7}}>Total vendu</div>
        <div style={{fontSize:20,fontWeight:900}}>${totalVendu} - {ventes.length} ventes</div>
        <div style={{fontSize:9,marginTop:6}}>Tous les formulaires que j'ai pu vendre - Quand je vois une chose ça atterrit ici</div>
      </div>
      <div style={{marginTop:12}}>
        {ventes.map(v=><div key={v.id} style={{background:"#f2f2f7",padding:10,borderRadius:10,marginTop:8}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:10}}>{v.client}</b><span style={{fontSize:8,background:"#fff",padding:"2px 6px",borderRadius:10}}>{v.date}</span></div>
          <div style={{fontSize:11,marginTop:4}}><b>{v.produit}</b> - ${v.montant}</div>
          <div style={{fontSize:10,marginTop:6,background:"#fff",padding:8,borderRadius:8}}>{v.statut}</div>
          <div style={{fontSize:9,marginTop:4,color:"#666"}}>Transport ${v.transport} inclus - Reçu automatique envoyé au client avec ton tel/email</div>
        </div>)}
      </div>
      <div style={{fontSize:9,marginTop:12,textAlign:"center",color:"#666"}}>Plus de 404 - Tout s'affiche ici quand tu cliques sur Avancement</div>
    </div>
  )
}
