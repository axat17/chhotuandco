import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { config, products, sizes } from '../config.js'
import { useBag } from '../context/Bag.jsx'
import { Icon, Photo, Reveal } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SizeFinder from '../components/SizeFinder.jsx'
import NotFound from './NotFound.jsx'
import { igDM, money, waLink } from '../lib.js'

export default function Product() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  const bag = useBag()
  const [size, setSize] = useState(sizes[2]?.id)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(1)
  const [finder, setFinder] = useState(false)
  const [open, setOpen] = useState(0)

  useEffect(() => { setImg(1); setQty(1); setFinder(false) }, [slug])
  useEffect(() => { if (p) document.title = `${p.name} — ${p.tagline} | Chhotu & Co.` }, [p])
  if (!p) return <NotFound />

  const s = sizes.find((x) => x.id === size)
  const left = p.stock?.[size]
  const out = left === 0
  const msg = out
    ? `Hello Chhotu & Co., please add me to the waitlist for ${p.name} in ${s.label}.`
    : `Hello Chhotu & Co., I’d like to reserve ${p.name} in ${s.label} × ${qty} (${money(p.price * qty)}).`

  const sections = [
    ['The details', <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>],
    ['Fabric & care', <p>{[p.fabric, p.care].filter(Boolean).join(' ')} Hand-finished in {config.craftRegion ? config.craftRegion + ', ' : ''}India.</p>],
    ['Delivery & payment', <p>{config.orderByDate ? `Reserve by ${config.orderByDate} for delivery before Diwali. ` : ''}No payment is taken on this website — we confirm your size personally, then send {config.paymentNote || 'payment details'}. Presented in our noir Heirloom Box.{config.exchangePolicy ? ' ' + config.exchangePolicy : ''}</p>],
  ]

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to={`/edit?g=${p.gender}`}>{p.gender}</Link><span>/</span><span>{p.name}</span></nav>
        <div className="pdp">
          <div className="pdp-media">
            <div className="pdp-main">
              <AnimatePresence mode="wait">
                <motion.div key={img} style={{ height: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <Photo product={p} n={img} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="pdp-thumbs">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} className="thumb" aria-label={`View photo ${n}`} aria-pressed={img === n} onClick={() => setImg(n)}><Photo product={p} n={n} /></button>
              ))}
            </div>
          </div>

          <motion.div className="pdp-info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="stack" style={{ gap: 8 }}>
              <div className="eyebrow">The Diwali Edit · {p.gender} · {p.tier}</div>
              <h1>{p.name}</h1>
              <div className="tagline">{p.tagline}</div>
            </div>
            <div className="price">{money(p.price)}</div>
            <p className="body">{p.description}</p>

            <fieldset>
              <legend className="size-legend">Size <span>fits {s.weight}</span></legend>
              <div className="size-grid">
                {sizes.map((x) => (
                  <button key={x.id} type="button" className={`size-btn ${p.stock?.[x.id] === 0 ? 'out' : ''}`} aria-pressed={size === x.id} onClick={() => { setSize(x.id); setQty(1) }}>{x.label}</button>
                ))}
              </div>
              <div className="stock-note" aria-live="polite">
                {out ? `${s.label} is fully reserved this season.` : left ? `Only ${left} made in ${s.label} this season.` : ''}
              </div>
              <button type="button" className="link-btn" aria-expanded={finder} onClick={() => setFinder(!finder)}>{finder ? 'Hide size finder' : 'Not sure? Find the size by weight'}</button>
              <AnimatePresence>
                {finder && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <SizeFinder compact onPick={(id) => { setSize(id); setQty(1) }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </fieldset>

            <div className="cta-col">
              {!out ? (
                <>
                  <div className="add-row">
                    <div className="qty big">
                      <button aria-label="One fewer" disabled={qty <= 1} onClick={() => setQty(qty - 1)}><Icon.minus /></button>
                      <span aria-live="polite">{qty}</span>
                      <button aria-label="One more" disabled={left != null && qty >= left} onClick={() => setQty(qty + 1)}><Icon.plus /></button>
                    </div>
                    <button className="btn btn-dark grow" onClick={() => bag.add(p, size, qty)}>Add to reservation</button>
                  </div>
                  <a className="btn btn-line wide" href={waLink(msg)} target="_blank" rel="noopener"><Icon.wa /> Reserve {s.label} now</a>
                </>
              ) : (
                <a className="btn btn-dark wide" href={waLink(msg)} target="_blank" rel="noopener"><Icon.wa /> Join the waitlist</a>
              )}
              <div className="alt-ctas">
                {igDM && <a className="btn btn-ghost" href={igDM} target="_blank" rel="noopener">Instagram</a>}
                {config.etsyUrl && <a className="btn btn-ghost" href={config.etsyUrl} target="_blank" rel="noopener">Etsy</a>}
                {config.amazonUrl && <a className="btn btn-ghost" href={config.amazonUrl} target="_blank" rel="noopener">Amazon</a>}
              </div>
            </div>

            <div className="accordion">
              {sections.map(([t, c], i) => (
                <div key={t} className="acc-item">
                  <h2><button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{t}</span><span aria-hidden="true">{open === i ? '–' : '+'}</span></button></h2>
                  <AnimatePresence initial={false}>
                    {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}><div className="acc-body">{c}</div></motion.div>}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <section className="bg-ivory-2">
        <div className="wrap section">
          <Reveal className="section-head"><h2 className="h-m">Also in <em>the edit</em></h2></Reveal>
          <div className="grid-3">{products.filter((x) => x.slug !== p.slug).map((x, i) => <ProductCard key={x.slug} p={x} i={i} />)}</div>
        </div>
      </section>
    </>
  )
}
