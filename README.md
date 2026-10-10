# El Sueño Parfume

Bilingual Turkish and English fragrance site built with Next.js App Router and prepared for Vercel.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`; the root route redirects to `/tr`. Use `/en` for English.

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Deploy to Vercel

Import this project into Vercel and keep the detected Next.js build settings. Set `NEXT_PUBLIC_SITE_URL` to the public canonical origin (for example, `https://your-domain.com`) in the Vercel project environment variables, then redeploy. The variable is used for canonical metadata and the generated sitemap.

## Images and translations

Place owned, optimized images in `public/images/` and update the product image paths in `src/lib/perfumes.ts`. The project includes local SVG artwork so the initial pages do not depend on third-party image hosts. Keep Turkish and English message keys aligned when editing the JSON files.
