const fs=require('fs');
const CATEGORIES = {
  "1) Electronique": {
    "Electro menager": [["Frigo Samsung 200L","Samsung",450],["Cuisinière 4 feux Bruhm","Bruhm",300],["Micro-ondes LG","LG",120],["Blender SilverCrest","SilverCrest",45],["Bouilloire Bosch","Bosch",25],["Fer à repasser Philips","Philips",30],["Machine à laver LG","LG",400]],
    "Electro Internet": [["Routeur TP-Link 4G","TP-Link",60],["Starlink Kit","Starlink",400],["Fibre Box","Huawei",80],["Répéteur Wifi","Xiaomi",35],["Câble RJ45 20m","Generic",12]]
  },
  "2) Beauty": {
    "Cosmetic": [["Dior Sauvage 100ml","Dior",95],["Chanel Bleu","Chanel",110],["Rouge à lèvres MAC","MAC",18],["Fond de teint L'Oreal","L'Oreal",15],["Poudre Maybelline","Maybelline",12]],
    "Shopping": [["Palette Maquillage","Generic",25],["Miroir LED","Generic",20],["Kit Pinceaux","Generic",15]],
    "Soin du corps": [["Gel Douche Nivea","Nivea",6],["Crème Nivea Soft","Nivea",8],["Sérum Vitamine C","CeraVe",18],["Savon Dove x4","Dove",6],["Huile Coco","Parachute",5]]
  },
  "3) Habillement": {
    "Habit Femme & Accessoire Femme": [["Robe Ankara Femme","Ankara",35],["Sac à main Cuir Femme","Zara",40],["Chaussure Femme","Nike",55],["Bijou Femme","Generic",15],["Perruque Brésilienne","Generic",60]],
    "Habit Homme & Accessoire Homme": [["Jean Levis Homme","Levis",50],["T-Shirt Homme","Zara",15],["Chaussure Air Max Homme","Nike",80],["Ceinture Cuir Homme","Generic",20],["Casquette NY","New Era",25]],
    "Accessoire Mixte": [["Montre Casio","Casio",35],["Lunette Soleil","RayBan",25],["Chapeau","Generic",18]],
    "Maillots de bain & Sport et Sport": [["Maillot Bain Femme","Nike",30],["Short Sport Homme","Adidas",25],["Haltère 20kg","Decathlon",45],["Tapis Yoga","Generic",20],["Vélo Sport","Generic",150]]
  },
  "4) Mecanique": {
    "Materiel de construction": [["Perceuse Bosch 750W","Bosch",85],["Marteau Stanley","Stanley",15],["Broquette Set","Bosch",25],["Scie Circulaire Makita","Makita",120],["Mètre 5m","Stanley",8]],
    "Voiture": [["Toyota Corolla 2018","Toyota",8500],["VW Golf 7 2018","Volkswagen",8000],["BMW Serie 3 2017","BMW",11000],["Toyota Yaris 2019","Toyota",7200],["Honda Fit 2018","Honda",6200],["Nissan Note 2018","Nissan",5800],["Suzuki Swift 2019","Suzuki",6000]],
    "Motos": [["Bajaj Boxer 150","Bajaj",1100],["TVS HLX 150","TVS",1150],["Yamaha YBR 125","Yamaha",1500],["Honda CB125","Honda",1400],["Bajaj Discover 125","Bajaj",1050]],
    "Velos & Jouet Mecanique Enfant": [["Vélo VTT 26''","BTwin",180],["Vélo Enfant 16''","Generic",90],["Voiture Jouet Électrique Enfant","Generic",120],["Trottinette Enfant","Generic",45]]
  },
  "5) Matelas & Drap, Coussin & Bag & Sac à Main": {
    "Matelas & Drap": [["Matelas 6x6 Ressort","Generic",250],["Drap 6x6 Coton x2","Generic",30],["Duvet Velvet 6x6","Generic",35],["Oreiller x2","Generic",20]],
    "Coussin & Bag & Sac à Main": [["Coussin Salon","Generic",12],["Sac à Dos Nike","Nike",35],["Sacoche LV","Louis Vuitton",80],["Valise Cabine","Samsonite",120],["Sac Voyage","Generic",40]]
  },
  "6) Accessoire Sport et Sante": {
    "Accessoire Sport": [["Corde à Sauter","Decathlon",8],["Gants Boxe","Adidas",30],["Ballon Foot","Nike",25]],
    "Sante": [["Tensiomètre","Omron",35],["Thermomètre Digital","Generic",8],["Masque x50","Generic",10],["Kit Pharmacie","Generic",20]]
  },
  "7) Construction & Securite": {
    "Cuisine": [["Plan Cuisine Granit","Generic",400],["Évier Inox Double","Generic",120],["Meuble Cuisine Haut","Generic",150]],
    "Chambre & Garde Robe, Lit, Toit": [["Garde Robe 3 Portes","IKEA",300],["Lit 6x6 Bois","Generic",350],["Toit Tôle Bac x10","Generic",200],["Porte Chambre Bois","Generic",80]],
    "Plan Porte, Fenetres": [["Porte Métal Blindée","Generic",250],["Fenêtre Alu Coulissante","Generic",180],["Porte Vitrée","Generic",200]],
    "Camera de Surveillance": [["Caméra Wifi 360°","Xiaomi",35],["Kit 4 Caméras DVR","Hikvision",220],["Caméra Solaire 4G","Generic",85],["Détecteur Mouvement","Generic",25]]
  },
  "8) Autre": {
    "Autre": [["Produit KING à Publier","KING",25]]
  }
};

let catalog=[];
let id=1;
while(catalog.length<10000){
 for(const cat in CATEGORIES){
  for(const sub in CATEGORIES[cat]){
   for(const [name,brand,price] of CATEGORIES[cat][sub]){
    if(catalog.length>=10000) break;
    // Special: voitures -> variantes année pour 100 modèles
    if(sub==="Voiture" && catalog.length<2500){
      for(let yr=2015; yr<=2023; yr++){
        if(catalog.length>=10000) break;
        catalog.push({id:id++,name:`${name} ${yr}`,brand,category:cat,subCategory:sub,priceUSD:price+(yr-2015)*150,image:`https://loremflickr.com/400/400/${name.replace(/ /g,',')}?lock=${id}`,video:"",rating:(4+Math.random()).toFixed(1),reviews:Math.floor(Math.random()*2000)});
      }
    } else {
      catalog.push({id:id++,name: catalog.length>1000? `${name} #${id}`:name,brand,category:cat,subCategory:sub,priceUSD:price+Math.floor(Math.random()*15),image:`https://loremflickr.com/400/400/${name.replace(/ /g,',')}?lock=${id}`,video:"",rating:(4+Math.random()).toFixed(1),reviews:Math.floor(Math.random()*2000)});
    }
   }
  }
 }
}

let ts=`export type Product={id:number;name:string;brand:string;category:string;subCategory:string;priceUSD:number;image:string;video:string;rating:string;reviews:number};\n`;
ts+=`export const categoryNames=${JSON.stringify(Object.keys(CATEGORIES))};\n`;
ts+=`export const subCategoriesMap=${JSON.stringify(CATEGORIES,null,2)};\n`;
ts+=`export const catalog:Product[]=${JSON.stringify(catalog,null,2)};\n`;
fs.writeFileSync('lib/catalog.ts',ts);
console.log('OK CAHIER 10K: '+catalog.length);
