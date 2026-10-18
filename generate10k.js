const fs = require('fs');

const CATEGORIES = {
  "Électronique": {
    "Téléphones": [
      ["iPhone 15 Pro Max 256GB","Apple",1199],["iPhone 15 128GB","Apple",799],["iPhone 14 128GB","Apple",699],["Samsung Galaxy S24 Ultra","Samsung",1299],["Samsung Galaxy A54","Samsung",449],["Samsung Galaxy A15","Samsung",199],["Infinix Hot 40 Pro","Infinix",180],["Infinix Note 30","Infinix",200],["Tecno Camon 20 Pro","Tecno",220],["Tecno Spark 20","Tecno",150],["Xiaomi Redmi Note 13","Xiaomi",250],["Xiaomi Redmi 13C","Xiaomi",130],["OPPO A78","OPPO",240],["Realme C55","Realme",180]
    ],
    "Ordinateurs": [["MacBook Air M2","Apple",1099],["MacBook Pro 14 M3","Apple",1999],["Dell XPS 13","Dell",999],["HP Pavilion 15","HP",650],["Lenovo IdeaPad 3","Lenovo",450]],
    "TVs": [["Samsung 43 Smart TV","Samsung",350],["VITRON 32 Smart","VITRON",180],["Amtec 32 Smart","Amtec",160],["LG 55 4K","LG",500]]
  },
  "Électroménager": {
    "Cuisine": [["Blender 1.5L","SilverCrest",45],["Mijoteuse","Moulinex",60],["Bouilloire 2L","Bosch",25],["Cuisinière 4 feux","Bruhm",300],["Frigo 200L","Samsung",450],["Micro-ondes","LG",120]],
    "Maison": [["Fer à repasser","Philips",30],["Ventilateur","Binatone",40],["Aspirateur","Dyson",250]]
  },
  "Éclairage": {
    "Ampoules": [["Ampoule LED 10W x4","Philips",12],["Tube LED 1.2m","Osram",8],["Projecteur Solaire 100W","Generic",35],["Guirlande LED","Generic",15],["Lampe Rechargeable","Generic",10]]
  },
  "Construction": {
    "Outils": [["Marteau","Stanley",15],["Perceuse 750W","Bosch",85],["Scie circulaire","Makita",120],["Mètre 5m","Stanley",8],["Ciment 50kg","Ciment",12],["Broquette set","Bosch",25]]
  },
  "Habillement & Maison": {
    "Habits": [["T-Shirt Noir","Zara",15],["Jean Levis 501","Levis",50],["Hoodie Nike","Nike",60],["Robe Ankara","Ankara",35]],
    "Draps & Linge": [["Drap 6x6 Coton","Generic",30],["Duvet Velvet 6x6","Generic",35],["Rideau Salon","Generic",25],["Serviette Bain","Generic",12]]
  },
  "Voitures & Motos": {
    "Voitures Petits Modèles": [
      ["Toyota Corolla 2018","Toyota",8500],["Toyota Yaris 2019","Toyota",7200],["Toyota Premio 2017","Toyota",9000],["Toyota IST 2018","Toyota",6800],["VW Golf 7 2018","Volkswagen",8000],["VW Polo 2019","Volkswagen",6500],["BMW Serie 3 320i 2017","BMW",11000],["BMW X1 2018","BMW",13500],["BMW Serie 1 118i","BMW",9500],["Honda Fit 2018","Honda",6200],["Honda Civic 2018","Honda",8500],["Nissan Note 2018","Nissan",5800],["Nissan March 2019","Nissan",5200],["Suzuki Swift 2019","Suzuki",6000],["Suzuki Alto 2019","Suzuki",4000],["Mazda Demio 2018","Mazda",5500],["Hyundai i10 2019","Hyundai",5000],["Kia Picanto 2019","Kia",4800]
    ],
    "Motos": [
      ["Bajaj Boxer 150","Bajaj",1100],["TVS HLX 150","TVS",1150],["Honda CB125","Honda",1400],["Yamaha YBR 125","Yamaha",1500],["Suzuki GN125","Suzuki",1300],["Bajaj Discover 125","Bajaj",1050],["Boxer BM100","Bajaj",850],["Apache RTR 180","TVS",1600]
    ],
    "Bus & Minibus": [["Toyota Hiace 14 Places","Toyota",12000],["Nissan Caravan","Nissan",10000],["Bus 30 Places Coaster","Toyota",25000]]
  },
  "Cosmétiques & Soins": {
    "Parfums": [["Dior Sauvage 100ml","Dior",95],["Chanel Bleu","Chanel",110],["Axe Body Spray","Axe",6],["Nivea Deo","Nivea",5]],
    "Soins Visage": [["Gel Visage CeraVe","CeraVe",18],["Crème Nivea Soft","Nivea",8],["Sérum Vitamine C","L'Oreal",15],["Savon Dove x4","Dove",6]],
    "Cheveux & Douche": [["Gel Cheveux Eco","Eco",7],["Gel Douche Nivea","Nivea",6],["Shampooing Head&Shoulders","H&S",7],["Huile Cheveux","Parachute",5]]
  },
  "Matériel Scolaire & Ménage": {
    "Scolaire": [["Cahier 200 pages x10","Generic",12],["Sac à dos École","Generic",20],["Stylo Bic x20","Bic",5],["Calculatrice Casio","Casio",15]],
    "Ménage": [["Seau + Serpillère","Generic",15],["Balai","Generic",8],["Poubelle 50L","Generic",18],["Liquide Vaisselle","Generic",3]]
  }
};

let catalog = [];
let id = 1;
let videoIds = ["dQw4w9WgXcQ","9bZkp7q19f0","kJQP7kiw5Fk","OPf0YbXqDm0"]; // placeholder pub - tu remplaceras par tes videos ad

function addProduct(name,brand,cat,sub,price){
  const kw = name.toLowerCase().replace(/[^a-z0-9]/g,',').slice(0,25);
  catalog.push({
    id,
    name: id<=500 ? name : `${name} ${id}`,
    brand,
    category: cat,
    subCategory: sub,
    priceUSD: price + Math.floor(Math.random()*20),
    image: `https://loremflickr.com/400/400/${kw}?lock=${id}`,
    video: `https://www.youtube.com/embed/${videoIds[id % videoIds.length]}?autoplay=0`,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(50+Math.random()*3000)
  });
  id++;
}

// Génère jusqu'à 10.000
while(catalog.length < 10000){
  for(const cat in CATEGORIES){
    for(const sub in CATEGORIES[cat]){
      for(const [name,brand,price] of CATEGORIES[cat][sub]){
        if(catalog.length>=10000) break;
        // Pour voitures on ajoute 100 modèles variantes
        if(cat==="Voitures & Motos" && sub==="Voitures Petits Modèles" && catalog.length<3000){
          for(let v=2015; v<=2022; v++){
            if(catalog.length>=10000) break;
            addProduct(`${name.split(' ')[0]} ${name.split(' ')[1]} ${name.split(' ')[2]} ${v}`, brand, cat, sub, price + (v-2015)*200);
          }
        } else {
          addProduct(name,brand,cat,sub,price);
        }
      }
    }
  }
}

let ts = `export type Product={id:number;name:string;brand:string;category:string;subCategory:string;priceUSD:number;image:string;video:string;rating:string;reviews:number};\n`;
ts += `export const categoryNames=${JSON.stringify(Object.keys(CATEGORIES))};\n`;
ts += `export const subCategories=${JSON.stringify(CATEGORIES, null, 2)};\n`;
ts += `export const catalog:Product[]=${JSON.stringify(catalog, null, 2)};\n`;
ts += `export function calculatePrice(p:number){return p;}\n`;

fs.writeFileSync('lib/catalog.ts', ts);
console.log('OK 10K GENERATED: '+catalog.length);
