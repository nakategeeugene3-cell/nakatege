const fs = require('fs');
const cats = {
  Electronique: [["iPhone 15 Pro Max","Apple",1199],["Samsung S24 Ultra","Samsung",1099],["MacBook Pro M3","Apple",1999],["HP Pavilion 15","HP",899],["Dell XPS 13","Dell",1299],["Lenovo ThinkPad","Lenovo",1399],["PS5","Sony",499],["Xbox Series X","Microsoft",499],["JBL Flip 6","JBL",129],["Sony WH-1000XM5","Sony",349],["AirPods Pro 2","Apple",249],["Samsung QLED 65","Samsung",799],["Canon EOS R6","Canon",2499],["GoPro Hero 12","GoPro",399],["Apple Watch 9","Apple",399],["iPad Air M2","Apple",599],["Asus ROG","Asus",1499],["Bose QC","Bose",329],["Switch OLED","Nintendo",349],["HP LaserJet","HP",199]],
  Mode: [["Nike Air Max 270","Nike",150],["Adidas Samba","Adidas",120],["Puma RS-X","Puma",110],["Zara Blazer","Zara",89],["Levis 501","Levis",69],["Gucci Sac","Gucci",1290],["Jordan 1","Nike",180],["Ultraboost","Adidas",190],["H&M Hoodie","H&M",35],["Lacoste Polo","Lacoste",99],["North Face Doudoune","North Face",250],["Timberland Boots","Timberland",180]],
  Maison: [["Canape 3P","IKEA",499],["Table Chene","IKEA",149],["Frigo Samsung","Samsung",699],["Lave-linge LG","LG",449],["Matelas Emma","Emma",399],["Chaise Bureau","Herman Miller",399],["Philips Hue","Philips",79],["Dyson V15","Dyson",599]],
  Beaute: [["Dior Sauvage","Dior",120],["Dyson Airwrap","Dyson",499],["Nivea Creme","Nivea",15],["Gillette Rasoir","Gillette",25]],
  Sport: [["VTT BTwin","BTwin",349],["Halteres 20kg","Domyos",59],["Tapis Yoga","Nike",35],["Raquette Wilson","Wilson",129]]
};
const base=[]; for(const c in cats){ for(const [n,b,p] of cats[c]) base.push([c,n,b,p]); }
const vars=["Noir","Blanc","Bleu","Rouge","2024","Pro","Max","Gold","Lite"];
let out="export const PRODUCTS=[\n";
for(let i=0;i<1000;i++){ const [cat,name,brand,price]=base[i%base.length]; const v=vars[i%vars.length]; const finalName=`${name} ${v} #${i+1}`; const finalPrice=Math.floor(price*(0.85+Math.random()*0.4)); const img=`https://picsum.photos/seed/KING${i}/400/400`; out+=`  {id:${i+1},name:${JSON.stringify(finalName)},brand:${JSON.stringify(brand)},category:${JSON.stringify(cat)},price:${finalPrice},image:${JSON.stringify(img)},desc:${JSON.stringify(brand+" "+finalName)}},\n`; }
out+="];\n";
fs.writeFileSync('lib/products.ts', out);
console.log('1000 produits crees!');
