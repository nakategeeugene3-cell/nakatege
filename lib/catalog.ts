export type Product={id:number;name:string;brand:string;category:string;subCategory:string;priceUSD:number;image:string;rating:string;reviews:number}
export const categoryNames=["1) Electronique","2) Beauty","3) Habillement","4) Mecanique","5) Matelas & Drap","6) Accessoire Sport et Sante","7) Construction & Securite","8) Autre"]
export const catalog:Product[]=[
{id:1,name:"Toyota Corolla 2018",brand:"Toyota",category:"4) Mecanique",subCategory:"Voiture",priceUSD:8500,image:"https://picsum.photos/seed/corolla/400/400",rating:"4.8",reviews:120},
{id:2,name:"VW Golf 7 2018",brand:"VW",category:"4) Mecanique",subCategory:"Voiture",priceUSD:8000,image:"https://picsum.photos/seed/golf/400/400",rating:"4.7",reviews:90},
{id:3,name:"BMW Serie 3 2017",brand:"BMW",category:"4) Mecanique",subCategory:"Voiture",priceUSD:11000,image:"https://picsum.photos/seed/bmw/400/400",rating:"4.9",reviews:60},
{id:4,name:"Bajaj Boxer 150",brand:"Bajaj",category:"4) Mecanique",subCategory:"Motos",priceUSD:1100,image:"https://picsum.photos/seed/boxer/400/400",rating:"4.6",reviews:200},
{id:5,name:"iPhone 15 Pro Max",brand:"Apple",category:"1) Electronique",subCategory:"Electro menager",priceUSD:1199,image:"https://picsum.photos/seed/iphone/400/400",rating:"4.9",reviews:500},
{id:6,name:"Samsung Galaxy S24",brand:"Samsung",category:"1) Electronique",subCategory:"Electro menager",priceUSD:999,image:"https://picsum.photos/seed/samsung/400/400",rating:"4.8",reviews:300},
{id:7,name:"Frigo Samsung 200L",brand:"Samsung",category:"1) Electronique",subCategory:"Electro menager",priceUSD:450,image:"https://picsum.photos/seed/frigo/400/400",rating:"4.5",reviews:80},
{id:8,name:"Routeur TP-Link 4G",brand:"TP-Link",category:"1) Electronique",subCategory:"Electro Internet",priceUSD:60,image:"https://picsum.photos/seed/router/400/400",rating:"4.4",reviews:150},
{id:9,name:"Dior Sauvage 100ml",brand:"Dior",category:"2) Beauty",subCategory:"Cosmetic",priceUSD:95,image:"https://picsum.photos/seed/dior/400/400",rating:"4.9",reviews:400},
{id:10,name:"Crème Nivea Soft",brand:"Nivea",category:"2) Beauty",subCategory:"Soin du corps",priceUSD:8,image:"https://picsum.photos/seed/nivea/400/400",rating:"4.6",reviews:600},
{id:11,name:"Robe Ankara Femme",brand:"Ankara",category:"3) Habillement",subCategory:"Habit Femme",priceUSD:35,image:"https://picsum.photos/seed/ankara/400/400",rating:"4.7",reviews:120},
{id:12,name:"Jean Levis Homme",brand:"Levis",category:"3) Habillement",subCategory:"Habit Homme",priceUSD:50,image:"https://picsum.photos/seed/jean/400/400",rating:"4.6",reviews:200},
{id:13,name:"Matelas 6x6 Ressort",brand:"Generic",category:"5) Matelas & Drap",subCategory:"Matelas & Drap",priceUSD:250,image:"https://picsum.photos/seed/matelas/400/400",rating:"4.5",reviews:90},
{id:14,name:"Sac à Dos Nike",brand:"Nike",category:"5) Matelas & Drap",subCategory:"Coussin & Bag",priceUSD:35,image:"https://picsum.photos/seed/sac/400/400",rating:"4.7",reviews:180},
{id:15,name:"Caméra Wifi 360",brand:"Xiaomi",category:"7) Construction & Securite",subCategory:"Camera de Surveillance",priceUSD:35,image:"https://picsum.photos/seed/camera/400/400",rating:"4.6",reviews:250},
{id:16,name:"Perceuse Bosch 750W",brand:"Bosch",category:"7) Construction & Securite",subCategory:"Materiel",priceUSD:85,image:"https://picsum.photos/seed/perceuse/400/400",rating:"4.8",reviews:110},
];
for(let i=17;i<=200;i++){const cats=categoryNames;const c=cats[i%8];catalog.push({id:i,name:`${c} Produit ${i}`,brand:"KING",category:c,subCategory:"Autre",priceUSD:10+Math.floor(Math.random()*500),image:`https://picsum.photos/seed/${i}/400/400`,rating:"4.5",reviews:50})}
