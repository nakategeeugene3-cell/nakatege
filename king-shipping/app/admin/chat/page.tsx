"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type Message = { id: string; name: string; phone: string; message: string; created_at: string };
type Agency = { city: string; phone: string };

export default function AdminChatPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [savingAgencies, setSavingAgencies] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadInbox = useCallback(async () => {
    const [messagesResponse, agenciesResponse] = await Promise.all([
      fetch("/api/admin/messages", { cache: "no-store" }),
      fetch("/api/admin/agencies", { cache: "no-store" }),
    ]);
    if (messagesResponse.status === 401 || agenciesResponse.status === 401) {
      setAuthenticated(false);
      return;
    }
    const [messageData, agencyData] = await Promise.all([messagesResponse.json(), agenciesResponse.json()]);
    if (messagesResponse.ok) {
      setMessages(messageData);
      setSelectedId((current) => current || messageData[0]?.id || "");
    }
    if (agenciesResponse.ok) setAgencies(agencyData);
    setAuthenticated(true);
  }, []);

  useEffect(() => {
    void loadInbox();
  }, [loadInbox]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Connexion impossible.");
      return;
    }
    setPassword("");
    await loadInbox();
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setMessages([]);
  }

  function updateAgency(index: number, field: keyof Agency, value: string) {
    setAgencies((current) => current.map((agency, agencyIndex) => agencyIndex === index ? { ...agency, [field]: value } : agency));
    setSaved(false);
  }

  async function saveAgencies() {
    setSavingAgencies(true);
    setError("");
    const response = await fetch("/api/admin/agencies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agencies),
    });
    const result = await response.json();
    if (response.ok) {
      setAgencies(result);
      setSaved(true);
    } else {
      setError(result.error || "Enregistrement impossible.");
    }
    setSavingAgencies(false);
  }

  if (authenticated === null) {
    return <main className="grid min-h-screen place-items-center bg-black text-sm text-white/60">Chargement de la boîte de réception…</main>;
  }

  if (!authenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-black px-4 text-[#f4f0e6]">
        <section className="w-full max-w-sm border border-[#ffd700]/35 bg-[#090909] p-7 sm:p-9">
          <a className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffd700]" href="/">KING SHIPPING <span aria-hidden="true">👑</span></a>
          <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-white/45">Espace privé</p>
          <h1 className="mt-2 text-3xl">Boîte de réception</h1>
          <form className="mt-7 space-y-4" onSubmit={login}>
            <label className="block text-xs text-white/65" htmlFor="admin-password">Mot de passe</label>
            <input autoComplete="current-password" className="w-full border border-white/20 bg-black px-3 py-3 text-sm outline-none focus:border-[#ffd700]" id="admin-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
            {error && <p aria-live="polite" className="text-xs text-red-300">{error}</p>}
            <button className="w-full bg-[#ffd700] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-white" type="submit">Accéder à l'inbox</button>
          </form>
          <a className="mt-6 inline-block text-xs text-white/40 hover:text-[#ffd700]" href="/">← Retour à la boutique</a>
        </section>
      </main>
    );
  }

  const selectedMessage = messages.find((message) => message.id === selectedId);

  return (
    <main className="min-h-screen bg-black text-[#f4f0e6]">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-8">
        <a className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffd700]" href="/">KING SHIPPING <span aria-hidden="true">👑</span><span className="ml-3 border-l border-white/20 pl-3 font-normal tracking-[0.1em] text-white/55">ADMIN</span></a>
        <div className="flex items-center gap-4">
          <button className="text-xs text-white/55 hover:text-[#ffd700]" onClick={() => void loadInbox()} type="button">Actualiser</button>
          <button className="border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-white/65 hover:border-[#ffd700] hover:text-[#ffd700]" onClick={() => void logout()} type="button">Déconnexion</button>
        </div>
      </header>
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between">
          <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#ffd700]">Service clientèle</p><h1 className="mt-2 text-3xl">Messages & agences</h1></div>
          <span className="text-xs text-white/45">{messages.length} message{messages.length === 1 ? "" : "s"}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3"><h2 className="text-lg">Inbox</h2><span className="text-[10px] uppercase tracking-[0.1em] text-white/35">Plus récents</span></div>
            {messages.length === 0 ? (
              <div className="border border-dashed border-white/15 px-5 py-12 text-center text-sm text-white/45">Aucun message pour le moment.</div>
            ) : (
              <div className="grid min-h-[420px] border border-white/10 md:grid-cols-[minmax(190px,.75fr)_minmax(0,1.25fr)]">
                <div className="max-h-[520px] overflow-y-auto border-b border-white/10 md:border-b-0 md:border-r">
                  {messages.map((message) => (
                    <button className={`block w-full border-b border-white/[0.08] p-4 text-left transition-colors ${selectedId === message.id ? "bg-[#ffd700]/[0.08]" : "hover:bg-white/[0.04]"}`} key={message.id} onClick={() => setSelectedId(message.id)} type="button">
                      <span className="flex items-center justify-between gap-2"><strong className="truncate text-sm font-normal text-white">{message.name}</strong><time className="shrink-0 text-[9px] text-white/40">{new Date(message.created_at).toLocaleDateString("fr-FR")}</time></span>
                      <span className="mt-1 block truncate text-xs text-white/45">{message.message}</span>
                    </button>
                  ))}
                </div>
                <div className="p-5 sm:p-7">
                  {selectedMessage ? <>
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                      <div><h3 className="text-xl">{selectedMessage.name}</h3><a className="mt-1 inline-block text-xs text-[#ffd700] hover:text-white" href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a></div>
                      <time className="text-[10px] text-white/40">{new Date(selectedMessage.created_at).toLocaleString("fr-FR")}</time>
                    </div>
                    <p className="whitespace-pre-wrap py-6 text-sm leading-7 text-white/75">{selectedMessage.message}</p>
                    <a className="inline-block border border-[#ffd700]/60 px-4 py-2.5 text-[10px] uppercase tracking-[0.1em] text-[#ffd700] hover:bg-[#ffd700] hover:text-black" href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, "")}`} rel="noreferrer" target="_blank">Répondre sur WhatsApp ↗</a>
                  </> : <p className="grid h-full min-h-48 place-items-center text-sm text-white/40">Sélectionnez un message.</p>}
                </div>
              </div>
            )}
          </section>

          <section>
            <div className="mb-3 border-b border-white/10 pb-3"><h2 className="text-lg">Numéros des agences</h2><p className="mt-1 text-xs text-white/40">Modifiables par l'équipe KING SHIPPING</p></div>
            <div className="space-y-3">
              {agencies.map((agency, index) => (
                <div className="grid grid-cols-[.8fr_1.2fr] gap-3 border border-white/10 bg-[#080808] p-3" key={agency.city}>
                  <label className="min-w-0 text-[9px] uppercase tracking-[0.12em] text-white/45">Ville<input className="mt-2 w-full min-w-0 border border-white/15 bg-black px-2 py-2 text-xs text-white outline-none focus:border-[#ffd700]" onChange={(event) => updateAgency(index, "city", event.target.value)} value={agency.city} /></label>
                  <label className="min-w-0 text-[9px] uppercase tracking-[0.12em] text-white/45">Téléphone<input className="mt-2 w-full min-w-0 border border-white/15 bg-black px-2 py-2 text-xs text-white outline-none focus:border-[#ffd700]" onChange={(event) => updateAgency(index, "phone", event.target.value)} value={agency.phone} /></label>
                </div>
              ))}
              {error && <p aria-live="polite" className="text-xs text-red-300">{error}</p>}
              <div className="flex items-center justify-between gap-3 pt-2">
                <span aria-live="polite" className="text-xs text-[#ffd700]">{saved ? "Modifications enregistrées" : ""}</span>
                <button className="bg-[#ffd700] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-black hover:bg-white disabled:opacity-60" disabled={savingAgencies} onClick={() => void saveAgencies()} type="button">{savingAgencies ? "Enregistrement…" : "Enregistrer"}</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
