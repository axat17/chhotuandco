/* ============================================================
   CHHOTU & CO. — SITE SETTINGS
   This is the only file you need to edit to update the website.
   Leave a value as "" to hide that part of the site.
   Save on GitHub → the site rebuilds itself in ~1 minute.
   ============================================================ */
export const config = {
  /* ---- How customers reach you ---- */
  whatsappNumber: '',          // digits with country code, e.g. "15551234567"
  instagram: 'chhotuandco',    // without the @
  etsyUrl: '',                 // full link to your Etsy shop
  amazonUrl: '',               // full link to your Amazon store
  email: '',

  /* ---- Diwali & delivery ---- */
  orderByDate: '',             // e.g. "October 30"
  shipsFrom: '',               // e.g. "New Jersey"
  localPickupCity: '',         // e.g. "Edison, NJ" — "" if no pickup
  paymentNote: '',             // e.g. "a Zelle request"
  exchangePolicy: '',          // e.g. "Free size exchanges within 14 days on unworn pieces with tags."

  /* ---- About ---- */
  founderName: '',
  craftRegion: '',             // e.g. "Jaipur"
  heirloomBoxPrice: '',        // e.g. "$44.99" — "" shows "Ask us"
}

/* ---- Size guide (confirm with your manufacturer's chart) ----
   maxLb = the heaviest baby this size fits (used by the size finder) */
export const sizes = [
  { id: '0-3',   label: '0–3 M',   long: '0–3 months',   weight: '7–12 lb',  height: '21–24 in', maxLb: 12 },
  { id: '3-6',   label: '3–6 M',   long: '3–6 months',   weight: '12–17 lb', height: '24–27 in', maxLb: 17 },
  { id: '6-12',  label: '6–12 M',  long: '6–12 months',  weight: '17–22 lb', height: '27–30 in', maxLb: 22 },
  { id: '12-18', label: '12–18 M', long: '12–18 months', weight: '22–27 lb', height: '30–32 in', maxLb: 27 },
]

export const occasions = [
  { id: 'diwali',   name: 'First Diwali',   note: '8 Nov' },
  { id: 'wedding',  name: 'Weddings',       note: 'Sangeet → Vidaai' },
  { id: 'naamkaran',name: 'Naamkaran',      note: 'Naming' },
  { id: 'birthday', name: 'First birthday', note: 'One' },
  { id: 'navratri', name: 'Navratri',       note: 'Garba' },
  { id: 'puja',     name: 'Temple & puja',  note: 'Blessings' },
]

/* ---- The collection ----
   Photos: put JPGs in public/img/products/ named <slug>-1.jpg … <slug>-4.jpg
   (portrait ~1200×1500, under 400 KB). -1 is the main photo.
   stock = how many you have per size; 0 shows "fully reserved" + waitlist. */
export const products = [
  {
    slug: 'mehfil', name: 'Mehfil', gender: 'Girls', tier: 'Premium', price: 39.99, color: '#4A0E1A',
    short: 'Sindoor anarkali, antique-gold zari border',
    tagline: 'Sindoor anarkali with zari border & dupatta',
    description: 'A deep sindoor anarkali that falls into a full flare, edged in antique-gold zari, with a matching dupatta and soft churidar beneath. Made for weddings, naamkaran and the Diwali family photograph.',
    details: ['Antique-gold zari border', 'Cotton lining behind every embellished panel', 'Concealed back snaps; elasticated churidar for changes', 'No loose beads or sequins'],
    occasions: ['diwali', 'wedding', 'naamkaran', 'birthday'],
    fabric: '', care: '',
    stock: { '0-3': 2, '3-6': 4, '6-12': 5, '12-18': 5 },
  },
  {
    slug: 'genda', name: 'Genda', gender: 'Girls', tier: 'Signature', price: 34.99, color: '#B8955A',
    short: 'Marigold-gold lehenga with dupatta',
    tagline: 'Marigold-gold lehenga-choli with dupatta',
    description: 'Named for the marigold garlands of every Indian celebration: a glowing lehenga-choli with a light dupatta, made for her first Diwali, Navratri and puja.',
    details: ['Elasticated lehenga waist', 'Cotton-lined choli', 'Snap closure at the back', 'No loose beads or sequins'],
    occasions: ['diwali', 'navratri', 'puja', 'birthday'],
    fabric: '', care: '',
    stock: { '0-3': 4, '3-6': 6, '6-12': 7, '12-18': 7 },
  },
  {
    slug: 'shaan', name: 'Shaan', gender: 'Boys', tier: 'Premium', price: 39.99, color: '#0E3B2E',
    short: 'Emerald Nehru jacket, kurta & churidar',
    tagline: 'Emerald Nehru jacket with ivory kurta & churidar',
    description: 'A tailored emerald Nehru jacket over an ivory kurta and churidar — the little gentleman at every wedding, sangeet and first birthday.',
    details: ['Three-piece set: jacket, kurta, churidar', 'Cotton-lined jacket', 'Snap-front kurta; elasticated churidar', 'No loose buttons'],
    occasions: ['diwali', 'wedding', 'birthday', 'naamkaran'],
    fabric: '', care: '',
    stock: { '0-3': 2, '3-6': 4, '6-12': 5, '12-18': 5 },
  },
  {
    slug: 'chandni', name: 'Chandni', gender: 'Boys', tier: 'Signature', price: 34.99, color: '#EFE6D6',
    short: 'Ivory kurta & dhoti, gold border',
    tagline: 'Ivory kurta & dhoti with a fine gold border',
    description: 'Moonlight-ivory kurta and dhoti with a fine gold border at the hem and placket. The kurta snaps down the back; the dhoti has an elastic waist and snap inseam for quick changes.',
    details: ['Full snap-back kurta — nothing over the head', 'Snap inseam on the dhoti', 'Cotton lining behind the gold border', 'No loose buttons'],
    occasions: ['diwali', 'puja', 'naamkaran', 'navratri'],
    fabric: '', care: '',
    stock: { '0-3': 4, '3-6': 6, '6-12': 7, '12-18': 7 },
  },
]

/* ---- Reviews: add real ones as they arrive ----
   { quote: '…', name: 'Priya', city: 'Edison, NJ' } */
export const testimonials = []
