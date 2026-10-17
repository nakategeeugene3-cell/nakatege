"use client";
import { useState } from "react";

const products = [
  { id: "c1", name: "Parfum Dior Sauvage", brand: "Dior", cat: "Cosmétique", price: 120, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500", video: "https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" },
  { id: "c2", name: "Huile d'Argan Bio", brand: "Bio", cat: "Cosmétique", price: 18, image: "https://images.unsplash.com/photo-1608571423902-eed4a94d8108?w=500", video: "" },
  { id: "c3", name: "Rouge à Lèvres MAC", brand: "MAC", cat: "Cosmétique", price: 25, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500", video: "" },
  { id: "e1", name: "iPhone 13 128GB", brand: "Apple", cat: "Electronique", price: 699, image: "https://images.unsplash.com/photo-1632661674596-d70b81e9d986?w=500", video: "https://videos.pexels.com/video-files/18069235/18069235-uhd_1440_1440_24fps.mp4" },
  { id: "e2", name: "iPhone 15 Titanium", brand: "Apple", cat: "Electronique", price: 799, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500", video: "" },
  { id: "e3", name: "MacBook Air M2", brand: "Apple", cat: "Electronique", price: 1199, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c6?w=500", video: "" },
  { id: "e4", name: "Samsung S23 Ultra", brand: "Samsung", cat: "Electronique", price: 859, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", video: "" },
  { id: "m1", name: "Coussin Doux Salon", brand: "King Home", cat: "Maison", price: 19, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2e?w=500", video: "https://videos.pexels.com/video-files/3651459/3651459-uhd_1440_1440_24fps.mp4" },
  { id: "m2", name: "Draps 2 Places Coton", brand: "King Home", cat: "Maison", price: 45, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500", video: "" },
  { id: "ch1", name: "Nike Air Max 270", brand: "Nike", cat: "Chaussures", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", video: "https://videos.pexels.com/video-files/4751589/4751589-hd_1080_1920_30fps.mp4" },
  { id: "ch2", name: "Adidas Yeezy Boost", brand: "Adidas", cat: "Chaussures", price: 150, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500", video: "" },
  { id: "v1", name: "Pull Col Roulé Zara", brand: "Zara", cat: "Vêtements", price: 45, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0a?w=500", video: "" },
  { id: "v2", name: "Vareuse Militaire Kaki", brand: "King Wear", cat: "Vêtements", price: 55, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500", video: "" },
  { id: "v3", name: "Jean Slim Levi's", brand: "Levi's", cat: "Vêtements", price: 60, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500", video: "" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");
  const cats = ["Tous", "Cosmétique", "Electronique", "Maison", "Chaussures", "Vêtements"];
  const filtered = products.filter(p => 
    (cat==="Tous" || p.cat===cat) && 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{background:"#000", minHeight:"100vh", color:"#fff", padding:"16px", fontFamily:"system-ui"}}>
      <h1 style={{textAlign:"center", fontSize:"26px", fontWeight:"900"}}>KING SHIPPING 👑</h1>
      <p style={{textAlign:"center", color:"#aaa", fontSize:"12px"}}>Livraison USA → Congo | Tout avec vidéo</p>
      
      <input 
        value={search} 
        onChange={e=>setSearch(e.target.value)} 
        placeholder="Rechercher Dior, iPhone, Nike, Vareuse..." 
        style={{width:"100%", padding:"14px", borderRadius:"12px", margin:"16px 0", color:"#000", fontSize:"15px", border:"none"}} 
      />

      <div style={{display:"flex", gap:"8px", overflowX:"auto", paddingBottom:"10px", marginBottom:"10px"}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding:"8px 14px", borderRadius:"20px", whiteSpace:"nowrap", background:cat===c?"#fff":"#222", color:cat===c?"#000":"#fff", border:"none", fontWeight:"700", fontSize:"13px"}}>{c}</button>
        ))}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
        {filtered.map(p=>(
          <div key={p.id} style={{background:"#111", borderRadius:"16px", overflow:"hidden", border:"1px solid #222"}}>
            {p.video ? (
              <video src={p.video} autoPlay muted loop playsInline style={{width:"100%", height:"150px", objectFit:"cover"}} />
            ) : (
              <img src={p.image} alt={p.name} style={{width:"100%", height:"150px", objectFit:"cover"}} />
            )}
            <div style={{padding:"10px"}}>
              <div style={{fontSize:"12px", color:"#facc15", fontWeight:"700"}}>{p.brand} • {p.cat}</div>
              <div style={{fontSize:"13px", fontWeight:"700", margin:"2px 0", height:"32px", overflow:"hidden"}}>{p.name}</div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"6px"}}>
                <span style={{fontWeight:"900", color:"#facc15"}}>{p.price}$</span>
                <button style={{background:"#fff", color:"#000", padding:"6px 12px", borderRadius:"8px", fontWeight:"800", fontSize:"12px", border:"none"}}>Acheter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{height:"40px"}}></div>
    </div>
  );
}
