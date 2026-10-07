# Chhotu & Co. — website

Indian couture for little ones, 0–18 months. A static site (plain HTML/CSS/JS) hosted free on GitHub Pages.

**Live:** https://chhotuandco.com/

## Editing the site — one file

Almost everything lives in **`assets/js/config.js`**. Edit it right on GitHub (open the file → pencil icon → *Commit changes*); the site updates in about a minute.

| Setting | What it does |
|---|---|
| `whatsappNumber` | Digits with country code, e.g. `15551234567`. Every "Reserve" button opens WhatsApp with a ready-made message (piece + size + price). Until it's set, buttons fall back to an Instagram DM. |
| `instagram` | Your handle without `@`. |
| `etsyUrl`, `amazonUrl`, `email` | Paste full links. Empty = that button is hidden. |
| `orderByDate` | e.g. `October 30` — appears in the top banner, FAQ and product pages. |
| `paymentNote`, `exchangePolicy`, `shipsFrom`, `localPickupCity` | Shown in the FAQ; empty ones are hidden. |
| `founderName`, `craftRegion`, `heirloomBoxPrice` | About section and gift box. |
| `sizes` | Weight/height chart — **confirm against your manufacturer's chart.** |
| `products` | Names, prices, descriptions, details and **stock per size** (set a size to `0` to show "fully reserved" + waitlist button). |
| `testimonials` | Add real reviews; the section appears automatically once there is at least one. |

> Make sure product `details` (lining, snaps, no beads) match your actual samples before launch.

## Adding photos

Upload JPGs to these paths (GitHub → *Add file* → *Upload files*). They appear automatically; until then an elegant crest placeholder shows.

- `assets/img/hero.jpg` — homepage hero (portrait, ~1200×1500)
- `assets/img/products/mehfil-1.jpg` … `mehfil-4.jpg` (same for `genda`, `shaan`, `chandni`) — `-1` is the main/card photo
- `assets/img/heirloom-box.jpg` — square
- `assets/img/founder.jpg` — portrait

Keep each photo under ~400 KB (squoosh.app is free) so the site stays fast on phones.

## Custom domain (e.g. chhotuandco.com)

1. Buy the domain (Cloudflare, Porkbun or Namecheap).
2. In this repo: **Settings → Pages → Custom domain** → enter `chhotuandco.com` → Save. GitHub creates a `CNAME` file.
3. At your domain registrar add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `axat17.github.io`
4. Back in Settings → Pages, tick **Enforce HTTPS** once it's available.
5. Run `python3 tools/set_domain.py` — it points the link-preview image (what WhatsApp shows when you share the link) at whatever domain is in `CNAME`.

## Adding a product

Add it to `products` in `config.js` and to `PRODUCTS` in `tools/build_products.py`, then run `python3 tools/build_products.py` to create its page.
