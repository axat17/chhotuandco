# Chhotu & Co. — website

Indian couture for little ones, 0–18 months. A React app (Vite + React Router + Framer Motion), deployed automatically to **https://chhotuandco.com** by GitHub Actions whenever `main` changes.

## Features
- **Reservation bag:** add several pieces and sizes, optionally gift-wrap in the Heirloom Box with a card note, then send everything to you as one pre-written WhatsApp message (or Instagram DM). No payments on the site.
- **Size finder:** enter baby's weight in lb or kg and get the recommended size, with a heads-up when baby is near the top of a size.
- **Shop filters:** by Girls/Boys and by occasion (First Diwali, weddings, naamkaran…), with shareable links like `/edit?g=Girls&o=wedding`.
- Stock per size ("Only 5 made"), "fully reserved" + waitlist when a size hits 0, animated reveals, mobile menu, bag saved between visits.

## Editing — one file
Everything you'll change is in **`src/config.js`**. On GitHub: open it → pencil icon → edit → *Commit changes*. The site rebuilds and goes live in about a minute (watch it in the **Actions** tab).

| Setting | What it does |
|---|---|
| `whatsappNumber` | Digits with country code, e.g. `15551234567`. Turns on WhatsApp for every reserve button and the bag. Until then they open an Instagram DM. |
| `instagram`, `etsyUrl`, `amazonUrl`, `email` | Links; empty ones are hidden. |
| `orderByDate`, `shipsFrom`, `localPickupCity`, `paymentNote`, `exchangePolicy` | Banner, FAQ and product pages. |
| `founderName`, `craftRegion`, `heirloomBoxPrice` | About section and gift box. |
| `sizes` | Size chart and the size finder (`maxLb`). **Confirm against your manufacturer's chart.** |
| `products` | Names, prices, descriptions, occasions, and **stock per size**. |
| `testimonials` | Real reviews; the section appears once there's at least one. |

Make sure product `details` (lining, snaps, no beads) match your real samples before launch.

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
