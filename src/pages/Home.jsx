import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { occasions, products, testimonials } from '../config.js'
import { Icon, Photo, Reveal } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SizeFinder from '../components/SizeFinder.jsx'
import Faq from '../components/Faq.jsx'
import { handle, igDM, igUrl } from '../lib.js'

const ease = [0.22, 1, 0.36, 1]

export default function Home() {
  const hero = useRef(null)
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const archY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <>
      <section className="hero on-dark" ref={hero}>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>The Diwali Edit · Coming soon · Girls &amp; Boys · 0–18 months</motion.div>
            <h1 className="h-xl">
              <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease }}>Couture for the</motion.span>
              <motion.em style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease }}>littlest guest.</motion.em>
            </h1>
            <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
              Hand-finished lehengas, anarkalis and kurta sets, lined in the softest cotton. Made in very small numbers for a baby’s first Diwali — reserve yours before the edit opens.
            </motion.p>
            <motion.div className="btn-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
              <a className="btn btn-gold" href={igDM} target="_blank" rel="noopener"><Icon.ig /> Reserve on Instagram</a>
              <Link className="btn btn-line" to="/edit">Preview the edit</Link>
            </motion.div>
          </div>
          <motion.div className="arch-frame hero-arch" style={{ y: archY }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.2, ease }}>
            <Photo src="/img/hero.jpg" color="#2C1B21" alt="A baby dressed in Chhotu & Co. for Diwali" />
          </motion.div>
        </div>
      </section>

      <section className="wrap">
        <Reveal className="manifesto">
          <img src="/img/crest-line-dark.svg" alt="" width="40" height="44" />
          <p>Every first deserves an heirloom — something worth the photograph, and worth keeping for the next <em>chhotu</em> in the family.</p>
        </Reveal>
      </section>

      <section className="wrap section-tight" id="edit">
        <Reveal className="section-head">
          <div className="eyebrow">The Diwali Edit · Coming soon</div>
          <h2 className="h-l">Four pieces. <em>Very few of each.</em></h2>
        </Reveal>
        <div className="grid-4">{products.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}</div>
        <Reveal className="center" style={{ marginTop: 48 }}><Link to="/edit" className="text-link">Preview by occasion <Icon.arrow /></Link></Reveal>
      </section>

      <section id="atelier" className="on-oxblood">
        <div className="wrap section">
          <Reveal><h2 className="h-l" style={{ maxWidth: 720 }}>Made like couture. <em className="gold">Made for babies.</em></h2></Reveal>
          <div className="pillars">
            {[['i.', 'Hand-finished', 'Zari and embroidery finished by artisans in India.'],
              ['ii.', 'Cotton-lined', 'Every embellished panel is backed in soft cotton. Nothing scratches.'],
              ['iii.', 'Hidden snaps', 'Concealed closures, so a diaper change never ruins the look.'],
              ['iv.', 'Small numbers', 'A handful of each size per festival. When they’re gone, they’re gone.']].map(([n, t, d], i) => (
              <Reveal key={n} className="pillar" delay={i * 0.1}><span className="num">{n}</span><span className="t">{t}</span><p>{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="split">
          <Reveal className="gift-box" aria-hidden="true">
            <div className="ribbon" />
            <div className="lid">
              <img src="/img/crest-gold.svg" alt="" width="84" />
              <img src="/img/wordmark-ivory.svg" alt="" width="190" style={{ filter: 'sepia(1) saturate(.6) brightness(.85)' }} />
            </div>
          </Reveal>
          <Reveal className="stack" delay={0.15}>
            <div className="eyebrow">For nanis, dadis &amp; godparents</div>
            <h2 className="h-l">The <em>Heirloom</em> Box</h2>
            <p className="lede">Every piece arrives in our noir box with a gold crest, silk ribbon and a keepsake card for baby’s first Diwali — ready to give.</p>
            <div className="btn-row">
              <a className="btn btn-dark" href={igDM} target="_blank" rel="noopener">Reserve a gift</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="occasions">
        <div className="wrap occ-grid">
          <Reveal><h2 className="h-m">Dressed for the <em>occasion</em></h2></Reveal>
          <div className="occ-list">
            {occasions.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.05}><Link to={`/edit?o=${o.id}`}><span>{o.name}</span><span>{o.note}</span></Link></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark">
        <div className="wrap section split">
          <Reveal className="stack">
            <div className="eyebrow">The fit</div>
            <h2 className="h-l">Sized by weight, <em>not by guesswork.</em></h2>
            <p className="lede">Tell us how much your baby weighs and we’ll tell you which size to reserve.</p>
            <Link to="/fit" className="text-link light">See the full size guide <Icon.arrow /></Link>
          </Reveal>
          <Reveal delay={0.15}><SizeFinder dark /></Reveal>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="wrap section">
          <Reveal className="section-head"><h2 className="h-l">Worn by our <em>first families</em></h2></Reveal>
          <div className="reviews">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08} as="blockquote">“{t.quote}”<cite>{t.name}{t.city ? ` · ${t.city}` : ''}</cite></Reveal>
            ))}
          </div>
        </section>
      )}

      <section id="story" className="wrap section">
        <Reveal className="letter">
          <div className="eyebrow">A letter from the founder</div>
          <h2 className="h-m">We looked everywhere for one. <em>So we made it.</em></h2>
          <p className="lede">When our daughter’s first festivals came, we wanted her in something as beautiful as what we wore growing up — and found nothing small enough, or soft enough, here in America. Chhotu &amp; Co. brings India’s festive craft to the littlest members of the family, one small batch at a time.</p>
          <div className="signature dark">With love, from our family to yours</div>
        </Reveal>
      </section>

      <section id="reserve" className="on-oxblood">
        <div className="wrap section">
          <Reveal className="section-head" style={{ marginBottom: 0 }}>
            <div className="eyebrow light">By reservation</div>
            <h2 className="h-l">Reserve before <em className="gold">the edit opens.</em></h2>
            <p className="lede" style={{ color: '#E2C9A8' }}>Send us the piece you love and your baby’s weight. We’ll confirm the size personally and hold it for you.</p>
            <div className="btn-row" style={{ justifyContent: 'center', marginTop: 12 }}>
              <a className="btn btn-gold" href={igDM} target="_blank" rel="noopener"><Icon.ig /> Message {handle || 'us'}</a>
              {igUrl && <a className="btn btn-line on-ox" href={igUrl} target="_blank" rel="noopener">Follow for first look</a>}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap section"><Faq /></section>
    </>
  )
}
