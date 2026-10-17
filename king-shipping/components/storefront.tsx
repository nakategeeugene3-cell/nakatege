"use client";

import { useMemo, useState, type FormEvent } from "react";
import { calculatePrice, catalog, categoryNames, type Product } from "@/lib/catalog";

const rates: Record<string, number> = { KES: 129.5, CDF: 2850, EUR: 0.92, XAF: 604 };
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function ProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState(1);
  const finalPrice = calculatePrice(product.price, weight);

  return (
    <article className="product-card group min-w-0 overflow-hidden border border-white/10 bg-[#090909] transition-colors hover:border-[#ffd700]/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#14130f]">
        <div
          aria-label={product.name}
          className="product-image absolute inset-0"
          role="img"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        <span className="absolute left-2 top-2 bg-black/75 px-2 py-1 text-[9px] uppercase tracking-[0.08em] text-white/80">
          Chine · {weight} kg
        </span>
      </div>
      <div className="flex min-h-[170px] flex-col p-3 sm:p-4">
        <p className="mb-1 truncate text-[10px] uppercase tracking-[0.12em] text-[#aaa69b]">{product.category}</p>
        <h3 className="line-clamp-2 min-h-10 text-[13px] leading-5 text-[#f2efe6] sm:text-sm">{product.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="min-w-0">
            <del className="block text-[11px] text-[#77746c]">{money.format(product.price)}</del>
            <strong className="block whitespace-nowrap text-[15px] font-semibold text-[#ffd700] sm:text-base">{money.format(finalPrice)}</strong>
          </div>
          <label className="shrink-0 text-[9px] uppercase tracking-[0.08em] text-[#99958a]">
            Poids
            <select
              aria-label={`Poids d'expédition pour ${product.name}`}
              className="mt-1 block w-full border border-white/15 bg-[#111] px-2 py-1.5 text-xs text-white outline-none focus:border-[#ffd700]"
              onChange={(event) => setWeight(Number(event.target.value))}
              value={weight}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map((kg) => <option key={kg} value={kg}>{kg} kg</option>)}
            </select>
          </label>
        </div>
      </div>
    </article>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Envoi impossible.");
      setMessage("");
      setStatus("Message envoyé. KING SHIPPING vous répondra bientôt.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {open && (
        <section aria-label="Chat avec KING SHIPPING" className="fixed bottom-24 right-4 z-50 flex max-h-[min(620px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col border border-[#ffd700]/40 bg-[#080808] shadow-[0_20px_80px_rgba(0,0,0,.8)] sm:bottom-24 sm:right-8">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffd700]">Assistance client</p>
              <h2 className="mt-1 text-lg">Parler à KING</h2>
            </div>
            <button aria-label="Fermer le chat" className="h-9 w-9 border border-white/15 text-lg text-white/70 hover:border-[#ffd700] hover:text-[#ffd700]" onClick={() => setOpen(false)} type="button">×</button>
          </div>
          <div className="min-h-24 flex-1 px-5 py-4">
            <p className="max-w-[90%] border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-white/80">Bonjour, bienvenue chez KING SHIPPING. Comment pouvons-nous vous aider ?</p>
            {status && <p aria-live="polite" className="mt-3 text-xs leading-5 text-[#ffd700]">{status}</p>}
          </div>
          <form className="space-y-3 border-t border-white/10 p-4" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-2">
              <input className="min-w-0 border border-white/15 bg-black px-3 py-2.5 text-sm outline-none placeholder:text-white/35 focus:border-[#ffd700]" maxLength={90} onChange={(event) => setName(event.target.value)} placeholder="Votre nom" required value={name} />
              <input className="min-w-0 border border-white/15 bg-black px-3 py-2.5 text-sm outline-none placeholder:text-white/35 focus:border-[#ffd700]" maxLength={40} onChange={(event) => setPhone(event.target.value)} placeholder="Téléphone" required value={phone} />
            </div>
            <textarea className="min-h-20 w-full resize-y border border-white/15 bg-black px-3 py-2.5 text-sm outline-none placeholder:text-white/35 focus:border-[#ffd700]" maxLength={1200} onChange={(event) => setMessage(event.target.value)} placeholder="Votre message…" required value={message} />
            <button className="w-full bg-[#ffd700] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-60" disabled={sending} type="submit">{sending ? "Envoi…" : "Envoyer le message"}</button>
          </form>
        </section>
      )}
      <button
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-50 flex min-h-14 items-center gap-3 border border-[#ffd700] bg-[#ffd700] px-4 text-xs font-bold uppercase tracking-[0.1em] text-black shadow-[0_8px_30px_rgba(255,215,0,.18)] transition-colors hover:bg-white sm:bottom-7 sm:right-8"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span aria-hidden="true" className="text-xl leading-none">◌</span> Parler à KING
      </button>
    </>
  );
}

function CurrencyConverter() {
  const [usd, setUsd] = useState("1");
  const [currency, setCurrency] = useState("KES");
  const converted = useMemo(() => {
    const amount = Number(usd);
    return Number.isFinite(amount) ? amount * rates[currency] : 0;
  }, [currency, usd]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffd700]">Convertisseur rapide</p>
        <h2 className="mt-1 text-xl">USD vers votre devise</h2>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="usd-amount">Montant en dollars</label>
        <div className="flex items-center border border-white/20 bg-black px-3">
          <span className="text-sm text-white/50">$</span>
          <input className="w-24 bg-transparent px-2 py-3 text-sm outline-none" id="usd-amount" min="0" onChange={(event) => setUsd(event.target.value)} step="any" type="number" value={usd} />
        </div>
        <span aria-hidden="true" className="px-1 text-[#ffd700]">→</span>
        <label className="sr-only" htmlFor="currency">Devise cible</label>
        <select className="border border-white/20 bg-[#111] px-3 py-3 text-sm text-white outline-none focus:border-[#ffd700]" id="currency" onChange={(event) => setCurrency(event.target.value)} value={currency}>
          {Object.keys(rates).map((code) => <option key={code} value={code}>{code}</option>)}
        </select>
        <output aria-live="polite" className="min-w-28 text-sm font-semibold text-[#ffd700]">{converted.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} {currency}</output>
      </div>
    </div>
  );
}

export default function Storefront() {
  return (
    <main className="min-h-screen bg-black">
      <div className="border-b border-white/10 bg-[#080808] px-4 py-2 text-center text-[9px] uppercase tracking-[0.18em] text-white/55 sm:text-[10px]">
        Transport fiable · Chine vers République démocratique du Congo & Kenya
      </div>
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-5 sm:px-8 lg:px-12">
        <a aria-label="KING SHIPPING accueil" className="text-sm font-bold uppercase tracking-[0.14em] text-[#ffd700] sm:text-base" href="#accueil">KING SHIPPING <span aria-hidden="true">👑</span></a>
        <nav className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.15em] text-white/60 md:flex">
          <a className="transition-colors hover:text-[#ffd700]" href="#catalogue">Catalogue</a>
          <a className="transition-colors hover:text-[#ffd700]" href="#agences">Nos destinations</a>
          <a className="transition-colors hover:text-[#ffd700]" href="#devis">Devis USD</a>
        </nav>
        <a className="border border-[#ffd700]/60 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-[#ffd700] transition-colors hover:bg-[#ffd700] hover:text-black sm:px-4 sm:text-[10px]" href="#catalogue">Voir les produits <span aria-hidden="true">↘</span></a>
      </header>

      <section className="relative isolate overflow-hidden border-y border-[#ffd700]/20" id="accueil">
        <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="mx-auto grid min-h-[460px] max-w-[1440px] items-center gap-8 px-5 py-20 sm:px-8 lg:min-h-[510px] lg:grid-cols-[1.1fr_.9fr] lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#ffd700]"><span className="h-px w-8 bg-[#ffd700]" /> Importation & livraison internationale</p>
            <h1 className="max-w-xl text-4xl leading-[1.08] text-white sm:text-6xl">Import Chine <span className="text-[#ffd700]">→</span><br />RDC & Kenya</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">Sélectionnez vos articles, estimez le prix selon le poids et faites venir vos achats avec KING SHIPPING.</p>
            <a className="mt-8 inline-flex items-center gap-5 bg-[#ffd700] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white" href="#catalogue">Explorer le catalogue <span className="text-base">↘</span></a>
          </div>
          <div className="hidden justify-self-end lg:block">
            <div className="border border-[#ffd700]/40 bg-black/65 p-8 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Votre route commerciale</p>
              <div className="mt-8 flex items-center gap-5 text-center">
                <div><span className="block text-2xl text-white">CN</span><span className="mt-1 block text-[9px] uppercase tracking-[0.16em] text-white/50">Chine</span></div>
                <div className="h-px w-24 bg-[#ffd700]" />
                <div><span className="block text-2xl text-[#ffd700]">CD / KE</span><span className="mt-1 block text-[9px] uppercase tracking-[0.16em] text-white/50">RDC · Kenya</span></div>
              </div>
              <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-white/55">De votre sélection à la livraison, une équipe à votre écoute.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12" id="catalogue">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#ffd700]">Sélection KING SHIPPING</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Le catalogue</h2>
            <p className="mt-2 text-xs text-white/45">100 articles · Prix en dollars américains</p>
          </div>
          <a className="w-fit text-xs text-white/55 transition-colors hover:text-[#ffd700]" href="#devis">Calculer votre budget <span className="text-[#ffd700]">↗</span></a>
        </div>
        <nav aria-label="Catégories du catalogue" className="-mx-4 flex gap-2 overflow-x-auto px-4 py-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {categoryNames.map((category, index) => (
            <a className="shrink-0 border border-white/15 px-3 py-2 text-[10px] text-white/65 transition-colors hover:border-[#ffd700] hover:text-[#ffd700]" href={`#categorie-${index + 1}`} key={category}>{category}</a>
          ))}
        </nav>
        <div className="space-y-12">
          {categoryNames.map((category, index) => {
            const products = catalog.filter((product) => product.category === category);
            return (
              <section aria-labelledby={`category-title-${index + 1}`} className="scroll-mt-6" id={`categorie-${index + 1}`} key={category}>
                <div className="mb-4 flex items-baseline justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg sm:text-xl" id={`category-title-${index + 1}`}>{category}</h3>
                  <span className="text-[10px] text-white/40">{products.length} articles</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                  {products.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] px-4 py-10 sm:px-8" id="devis">
        <div className="mx-auto max-w-[1440px]"><CurrencyConverter /></div>
      </section>

      <footer className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 text-sm sm:grid-cols-2 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12" id="agences">
        <div>
          <a className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffd700]" href="#accueil">KING SHIPPING <span aria-hidden="true">👑</span></a>
          <p className="mt-3 max-w-md text-xs leading-6 text-white/45">Importation et accompagnement logistique entre la Chine, la République démocratique du Congo et le Kenya.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs text-white/60 sm:text-right">
          <span>Kinshasa</span><span>Lubumbashi</span><span>Nairobi</span><span>Goma</span>
        </div>
        <div className="border-t border-white/10 pt-5 text-[10px] text-white/35 sm:col-span-2">© {new Date().getFullYear()} KING SHIPPING. Prix estimatifs en USD.</div>
      </footer>
      <ChatWidget />
    </main>
  );
}
