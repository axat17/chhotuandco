# Chhotu & Co. — website

Indian couture for little ones, 0–18 months. A React app (Vite + React Router + Framer Motion), deployed automatically to **https://chhotuandco.com** by GitHub Actions whenever `main` changes.

## Current mode: coming soon (Instagram only)
`comingSoon: true` in `src/config.js` hides prices and stock, and every button says **Reserve on Instagram** (opens a DM to the handle in `instagram`). Etsy/Amazon buttons appear automatically once you paste their links.

Also included: a **size finder** (baby's weight in lb/kg → recommended size), shop filters by Girls/Boys and occasion (shareable links like `/edit?g=Girls&o=wedding`), animated reveals and a mobile menu.

## Editing — one file
Everything you'll change is in **`src/config.js`**. On GitHub: open it → pencil icon → edit → *Commit changes*. The site rebuilds and goes live in about a minute (watch the **Actions** tab).

- `instagram` — your handle without the @.
- `comingSoon` — set to `false` at launch to show prices.
- `etsyUrl`, `amazonUrl`, `email` — empty ones stay hidden.
- `sizes` — size chart and size finder; confirm against your manufacturer's chart.
- `products` — names, descriptions, details, occasions, prices (hidden while coming soon).
- `testimonials` — real reviews; the section appears once there's one.

## Photos
Upload JPGs to `public/img/` (GitHub → *Add file* → *Upload files*):
- `public/img/products/mehfil-1.jpg` … `-4.jpg` (same for `genda`, `shaan`, `chandni`); `-1` is the main photo. Portrait ~1200×1500.
- `public/img/hero.jpg` (portrait), `public/img/heirloom-box.jpg` (square), `public/img/founder.jpg` (portrait).

Keep each under ~400 KB (squoosh.app). Until a photo exists, an elegant crest placeholder shows.

## Run it on your computer (optional)
```
npm install
npm run dev
```

## Domain
`public/CNAME` holds `chhotuandco.com`. In repo **Settings → Pages**, Source must be **GitHub Actions** and the custom domain `chhotuandco.com` with **Enforce HTTPS** ticked.
