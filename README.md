# KING SHIPPING

Luxury storefront for importing products from China to the Democratic Republic of the Congo and Kenya. Built with Next.js 14, React 18, Tailwind CSS 3, and Supabase.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin inbox is at [http://localhost:3000/admin/chat](http://localhost:3000/admin/chat). In development, the default admin password is `King2026`; set `ADMIN_PASSWORD` in `.env.local` to override it. Production requires `ADMIN_PASSWORD` to be set.

Without Supabase credentials, chat messages and agency edits use temporary in-process storage for local development. To persist data, create a Supabase project, set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`, then run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor. The service-role key is only accessed by server routes and must never be exposed with a `NEXT_PUBLIC_` prefix.

## Price calculation

For a product base price `price` in USD and selected shipping weight `weightKg`:

`finalPrice = price * 1.365 + (price * 1.365 * 0.05 * weightKg)`

Currency conversion values are indicative sample rates in `components/storefront.tsx` and should be updated to the rates you use operationally.
