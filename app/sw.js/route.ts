export async function GET() {
  return new Response(
    `self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',()=>self.clients.claim());self.addEventListener('fetch',()=>{});`,
    { headers: { "Content-Type": "application/javascript", "Cache-Control": "no-cache" } }
  );
}
