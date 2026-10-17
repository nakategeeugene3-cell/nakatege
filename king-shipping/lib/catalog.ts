export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

type Category = {
  name: string;
  image: string;
  products: [string, number][];
};

const categories: Category[] = [
  {
    name: "Téléphones & tablettes",
    image: "photo-1511707171634-5f897ff02aa9",
    products: [["Smartphone Nova 128 Go", 115], ["Smartphone Nova Pro", 168], ["Tablette Horizon 10 pouces", 142], ["Écouteurs sans fil AirBeat", 18], ["Coque renforcée Crystal", 6], ["Chargeur rapide 30 W", 12], ["Montre connectée Pulse", 31], ["Power bank 20 000 mAh", 25], ["Support téléphone magnétique", 9], ["Écran portable 15 pouces", 155]],
  },
  {
    name: "Mode & vêtements",
    image: "photo-1483985988355-763728e1935b",
    products: [["Veste urbaine Signature", 46], ["Ensemble deux pièces Élégance", 32], ["Robe de soirée Lumière", 38], ["Chemise Oxford classique", 21], ["Sneakers Street One", 42], ["Sac à main Atelier", 34], ["Pantalon cargo Explorer", 27], ["Polo essentiel en coton", 16], ["Veste denim indigo", 39], ["Lunettes de soleil Eclipse", 14]],
  },
  {
    name: "Maison & décoration",
    image: "photo-1616486338812-3dadae4b4ace",
    products: [["Lampe de table Halo", 29], ["Miroir mural Arco", 43], ["Plaid tissé douceur", 22], ["Ensemble de vases Terra", 19], ["Horloge murale minimaliste", 24], ["Étagère murale Loft", 36], ["Coussin décoratif Velours", 13], ["Tapis contemporain 160 × 230", 74], ["Diffuseur d'ambiance", 17], ["Organisateur de bureau", 15]],
  },
  {
    name: "Beauté & bien-être",
    image: "photo-1596462502278-27bfdc403348",
    products: [["Sèche-cheveux Ionic Pro", 35], ["Brosse lissante Silk", 27], ["Miroir LED grossissant", 19], ["Trousse beauté Voyage", 12], ["Diffuseur d'huiles essentielles", 23], ["Appareil de massage facial", 31], ["Kit manucure Studio", 21], ["Brosse nettoyante visage", 16], ["Pèse-personne connecté", 24], ["Rasoir électrique Compact", 28]],
  },
  {
    name: "Électronique & audio",
    image: "photo-1498049794561-7780e7231661",
    products: [["Casque Bluetooth Studio", 38], ["Enceinte portable Bass", 29], ["Projecteur cinéma Mini", 88], ["Clavier mécanique Nova", 45], ["Souris sans fil Precision", 19], ["Webcam HD 1080p", 27], ["Microphone USB Creator", 41], ["Routeur Wi-Fi double bande", 35], ["Caméra sport 4K", 63], ["Chargeur solaire pliable", 32]],
  },
  {
    name: "Bébé & enfants",
    image: "photo-1516627145497-ae6968895b74",
    products: [["Poussette compacte City", 128], ["Sac à langer Nomade", 34], ["Chaise haute évolutive", 79], ["Veilleuse Lune", 18], ["Tapis d'éveil Safari", 42], ["Porte-bébé ergonomique", 39], ["Set repas en silicone", 16], ["Barrière de sécurité", 33], ["Jouet de construction créatif", 25], ["Baignoire pliable bébé", 29]],
  },
  {
    name: "Sport & plein air",
    image: "photo-1461896836934-ffe607ba8211",
    products: [["Tapis de yoga Balance", 24], ["Haltères ajustables 20 kg", 58], ["Sac de sport Active", 29], ["Montre sport GPS", 75], ["Bande élastique Pro Set", 14], ["Gourde isotherme 1 L", 17], ["Corde à sauter Speed", 11], ["Tente deux places Trek", 86], ["Gants de fitness Grip", 13], ["Vélo d'appartement compact", 189]],
  },
  {
    name: "Accessoires & bijoux",
    image: "photo-1611652022419-a9419f74343d",
    products: [["Montre classique Meridian", 48], ["Bracelet acier Signature", 16], ["Portefeuille cuir urbain", 23], ["Ceinture réversible", 18], ["Collier chaîne dorée", 14], ["Sac bandoulière Metro", 37], ["Étui cartes minimaliste", 11], ["Boucles d'oreilles Halo", 13], ["Sac à dos commuter", 42], ["Porte-clés cuir gravé", 8]],
  },
  {
    name: "Cuisine & électroménager",
    image: "photo-1556911220-e15b29be8c8f",
    products: [["Blender multifonction Fresh", 49], ["Friteuse sans huile 5 L", 86], ["Machine à café Barista", 94], ["Bouilloire inox 1,7 L", 27], ["Balance de cuisine digitale", 14], ["Robot multifonction Chef", 119], ["Set de casseroles 8 pièces", 65], ["Grille-pain deux fentes", 22], ["Cuiseur à riz familial", 36], ["Mousseur à lait électrique", 16]],
  },
  {
    name: "Auto & moto",
    image: "photo-1492144534655-ae79c964c9d7",
    products: [["Caméra embarquée RoadEye", 54], ["Compresseur portable 12 V", 39], ["Support téléphone voiture", 15], ["Kit nettoyage automobile", 23], ["Chargeur voiture USB-C", 13], ["Couvre-siège universel", 31], ["Démarreur portable auto", 68], ["Lampe LED atelier", 21], ["Housse moto imperméable", 28], ["Aspirateur auto compact", 34]],
  },
];

export const catalog: Product[] = categories.flatMap((category, categoryIndex) =>
  category.products.map(([name, price], productIndex) => ({
    id: `${categoryIndex + 1}-${productIndex + 1}`,
    name,
    category: category.name,
    price,
    image: `https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=760&q=82`,
  })),
);

export const categoryNames = categories.map(({ name }) => name);

export function calculatePrice(price: number, weightKg: number) {
  const adjustedPrice = price * 1.365;
  return adjustedPrice + adjustedPrice * 0.05 * weightKg;
}
