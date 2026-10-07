import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { config, products, sizes } from '../config.js'
import { Icon, Photo, Reveal } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SizeFinder from '../components/SizeFinder.jsx'
import NotFound from './NotFound.jsx'
import { handle, igDM, money } from '../lib.js'

/** Shows thumbnails only for photos that actually exist. */
function Gallery({ p }) {
  const [found, setFound] = useState([1])
  const [img, setImg] = useState(1)
  useEffect(() => {
    setImg(1); setFound([1])
    let alive = true
    ;[2, 3, 4].forEach((n) => {
      const im = new Image()
      im.onload = () => alive && setFound((f) => [...new Set([...f, n])].sort())
      im.src = `/img/products/${p.slug}-${n}.jpg`
    })
    return () => { alive = false }
  }, [p.slug])
  return (
    <div className="pdp-media">
      <div className="pdp-main">
        <AnimatePresence mode="wait">
          <motion.div key={img} style={{ height: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Photo product={p} n={img} />
          </motion.div>
        </AnimatePresence>
      </div>
      {found.length > 1 && (
        <div className="pdp-thumbs">
          {found.map((n) => (
            <button key={n} className="thumb" aria-label={`View photo ${n}`} aria-pressed={img === n} onClick={() => setImg(n)}><Photo product={p} n={n} /></button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  const [finder, setFinder] = useState(false)
  const [open, setOpen] = useState(0)

  useEffect(() => { setFinder(false) }, [slug])
  useEffect(() => { if (p) document.title = `${p.name} — ${p.tagline} | Chhotu & Co.` }, [p])
  if (!p) return <NotFound />

  const sections = [
    ['The details', <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>],
    (p.fabric || p.care) && ['Fabric & care', <p>{[p.fabric, p.care].filter(Boolean).join(' ')}</p>],
    ['How to reserve', <p>Send us a message on Instagram{handle ? ` (${handle})` : ''} with “{p.name}” and your baby’s weight. We’ll confirm the size personally and hold it for you. Every piece arrives in our noir Heirloom Box.</p>],
  ].filter(Boolean)

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to={`/edit?g=${p.gender}`}>{p.gender}</Link><span>/</span><span>{p.name}</span></nav>
        <div className="pdp">
          <Gallery p={p} />

          <motion.div className="pdp-info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="stack" style={{ gap: 8 }}>
              <div className="eyebrow">The Diwali Edit · {p.gender} · {p.tier}</div>
              <h1>{p.name}</h1>
              <div className="tagline">{p.tagline}</div>
            </div>
            {config.comingSoon ? <div className="soon-badge">Coming soon · Reservations open</div> : <div className="price">{money(p.price)}</div>}
            <p className="body">{p.description}</p>

            <div className="sizes-line">
              <div className="size-legend">Made in</div>
              <div className="size-pills">{sizes.map((s) => <span key={s.id} className="size-pill">{s.label}</span>)}</div>
              <button type="button" className="link-btn" aria-expanded={finder} onClick={() => setFinder(!finder)}>{finder ? 'Hide size finder' : 'Find your baby’s size by weight'}</button>
              <AnimatePresence>
                {finder && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <SizeFinder compact />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="cta-col">
              <a className="btn btn-dark wide" href={igDM} target="_blank" rel="noopener"><Icon.ig /> Reserve {p.name} on Instagram</a>
              <p className="cta-hint">Mention “{p.name}” and your baby’s weight — we’ll hold your size.</p>
              {(config.etsyUrl || config.amazonUrl) && (
                <div className="alt-ctas">
                  {config.etsyUrl && <a className="btn btn-ghost" href={config.etsyUrl} target="_blank" rel="noopener">Etsy</a>}
                  {config.amazonUrl && <a className="btn btn-ghost" href={config.amazonUrl} target="_blank" rel="noopener">Amazon</a>}
                </div>
              )}
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
