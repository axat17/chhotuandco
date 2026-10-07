import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { config, occasions, products, testimonials } from '../config.js'
import { Icon, Photo, Reveal } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SizeFinder from '../components/SizeFinder.jsx'
import Faq from '../components/Faq.jsx'
import { igUrl, waLink } from '../lib.js'

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
            <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>The Diwali Edit · Girls &amp; Boys · 0–18 months</motion.div>
            <h1 className="h-xl">
              <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease }}>Couture for the</motion.span>
              <motion.em style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease }}>littlest guest.</motion.em>
            </h1>
            <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
              Hand-finished lehengas, anarkalis and kurta sets, lined in the softest cotton. Made in very small numbers for a baby’s first Diwali, and every celebration after.
            </motion.p>
            <motion.div className="btn-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
              <Link className="btn btn-gold" to="/edit">Explore the edit</Link>
              <Link className="btn btn-line" to="/fit">Find baby’s size</Link>
            </motion.div>
          </div>
          <motion.div className="arch-frame" style={{ y: archY }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.2, ease }}>
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
          <div className="eyebrow">The Diwali Edit</div>
          <h2 className="h-l">Four pieces. <em>Very few of each.</em></h2>
        </Reveal>
        <div className="grid-4">{products.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}</div>
        <Reveal className="center" style={{ marginTop: 48 }}><Link to="/edit" className="text-link">Shop by occasion <Icon.arrow /></Link></Reveal>
      </section>

      <section id="atelier" className="on-oxblood">
        <div className="wrap section">
          <Reveal><h2 className="h-l" style={{ maxWidth: 720 }}>Made like couture. <em className="gold">Made for babies.</em></h2></Reveal>
          <div className="pillars">
            {[['i.', 'Hand-finished', `Zari and embroidery finished by artisans in ${config.craftRegion ? config.craftRegion + ', ' : ''}India.`],
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
          <Reveal className="box-visual">
            <div className="inner"><Photo src="/img/heirloom-box.jpg" color="#1A1014" alt="The Chhotu & Co. Heirloom Box" /></div>
          </Reveal>
          <Reveal className="stack" delay={0.15}>
            <div className="eyebrow">For nanis, dadis &amp; godparents</div>
            <h2 className="h-l">The <em>Heirloom</em> Box</h2>
            <p className="lede">Any piece from the edit and a keepsake card for baby’s first Diwali, presented in our noir box with a gold crest and silk ribbon. Tick “present as a gift” in your reservation and add a card note.</p>
            <div className="btn-row">
              <Link className="btn btn-dark" to="/edit">Choose a piece</Link>
              <span className="serif" style={{ fontSize: 24 }}>{config.heirloomBoxPrice || 'Ask us for pricing'}</span>
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

      <section id="reserve" className="wrap section">
        <Reveal className="section-head">
          <div className="eyebrow">By reservation</div>
          <h2 className="h-l">Reserve your <em>chhotu’s</em> size</h2>
          <p className="lede">Add pieces to your reservation bag and send it to us in one message. We confirm the fit personally and hold it for you.</p>
        </Reveal>
        <div className="channels">
          <Reveal><a className="channel" href={waLink('Hello Chhotu & Co., I’d like to reserve a piece from the Diwali Edit.')} target="_blank" rel="noopener"><span className="k">Personal service</span><span className="v">{config.whatsappNumber ? 'WhatsApp' : 'Message us'}</span><span className="s">Fit advice{config.localPickupCity ? ' · local pickup' : ''}</span></a></Reveal>
          {igUrl && <Reveal delay={0.05}><a className="channel" href={igUrl} target="_blank" rel="noopener"><span className="k">See it worn</span><span className="v">Instagram</span><span className="s">@{config.instagram}</span></a></Reveal>}
          {config.etsyUrl && <Reveal delay={0.1}><a className="channel" href={config.etsyUrl} target="_blank" rel="noopener"><span className="k">Online checkout</span><span className="v">Etsy</span><span className="s">Our Etsy shop</span></a></Reveal>}
          {config.amazonUrl && <Reveal delay={0.15}><a className="channel" href={config.amazonUrl} target="_blank" rel="noopener"><span className="k">Online checkout</span><span className="v">Amazon</span><span className="s">Our Amazon store</span></a></Reveal>}
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

      <section id="story" className="on-dark">
        <div className="wrap section split">
          <Reveal className="founder-photo"><Photo src="/img/founder.jpg" color="#2C1B21" alt="The founder of Chhotu & Co. with her daughter" /></Reveal>
          <Reveal className="stack" delay={0.15}>
            <div className="eyebrow">A letter from the founder</div>
            <h2 className="h-m">We looked everywhere for one. <em>So we made it.</em></h2>
            <p className="lede" style={{ maxWidth: 'none' }}>When our daughter’s first festivals came, we wanted her in something as beautiful as what we wore growing up — and found nothing small enough, or soft enough, here in America. Chhotu &amp; Co. brings India’s festive craft to the littlest members of the family, one small batch at a time.</p>
            <div className="signature">{config.founderName || 'With love, from our family to yours'}</div>
          </Reveal>
        </div>
      </section>

      <section className="wrap section"><Faq /></section>
    </>
  )
}
