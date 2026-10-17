"use client"
import { useState } from "react"
import { catalog, calculatePrice } from "@/lib/catalog"
export default function Storefront(){
  const [weight,setWeight]=useState(1)
  return(
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">KING SHIPPING - {catalog.length} PRODUITS LUXE</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {catalog.map(product=>{
          const finalPrice=calculatePrice(product.price,weight)
          return(
            <article key={product.id} className="border rounded-xl p-3 shadow hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-2"/>
              <h3 className="font-bold text-sm line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.brand} - {product.category}</p>
              <p className="font-black mt-1">{finalPrice.toFixed(0)} €</p>
              <p className="text-[10px] text-gray-400 line-through">{product.price} € US</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
