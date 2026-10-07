import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useBag } from '../context/Bag.jsx'
import { config, products } from '../config.js'
import { Icon, Photo } from './ui.jsx'
import { bagMessage, hasWhatsApp, money, sizeById, waLink } from '../lib.js'

export default function BagDrawer() {
  const bag = useBag()
  const [gift, setGift] = useState(false)
  const [note, setNote] = useState('')
  const [weight, setWeight] = useState('')
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)
  const panel = useRef(null)

  useEffect(() => {
    if (!bag.open) return
    const onKey = (e) => e.key === 'Escape' && bag.setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    setTimeout(() => panel.current?.focus(), 50)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [bag.open])

  const msg = bagMessage(bag.items, { gift, note, weight, name })
  const copy = async () => {
    try { await navigator.clipboard.writeText(msg); setCopied(true); setTimeout(() => setCopied(false), 2500) } catch { /* ignore */ }
  }

  return (
    <AnimatePresence>
      {bag.open && (
        <>
          <motion.div className="scrim" onClick={() => bag.setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="drawer" role="dialog" aria-modal="true" aria-label="Your reservation" tabIndex={-1} ref={panel}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="drawer-head">
              <div>
                <div className="eyebrow">By reservation</div>
                <h2 className="serif" style={{ fontSize: 36 }}>Your <em>reservation</em></h2>
              </div>
              <button className="icon-btn" aria-label="Close" onClick={() => bag.setOpen(false)}><Icon.close /></button>
            </div>

            {bag.items.length === 0 ? (
              <div className="drawer-empty">
                <p className="serif" style={{ fontSize: 26, fontStyle: 'italic' }}>Nothing reserved yet.</p>
                <p>Choose a piece and a size, and we’ll hold it for you.</p>
                <Link to="/edit" className="btn btn-dark" onClick={() => bag.setOpen(false)}>Explore the edit</Link>
              </div>
            ) : (
              <>
                <ul className="bag-list">
                  <AnimatePresence initial={false}>
                    {bag.items.map((it) => {
                      const p = products.find((x) => x.slug === it.slug)
                      const max = p?.stock?.[it.size] ?? 9
                      return (
                        <motion.li key={it.slug + it.size} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                          <div className="bag-item">
                            <div className="bag-thumb"><Photo product={p} n={1} /></div>
                            <div className="bag-info">
                              <Link to={`/edit/${it.slug}`} onClick={() => bag.setOpen(false)} className="serif bag-name">{it.name}</Link>
                              <span className="bag-size">{sizeById(it.size)?.long}</span>
                              <div className="qty">
                                <button aria-label={`One fewer ${it.name}`} onClick={() => bag.setQty(it.slug, it.size, it.qty - 1)}><Icon.minus /></button>
                                <span aria-live="polite">{it.qty}</span>
                                <button aria-label={`One more ${it.name}`} disabled={it.qty >= max} onClick={() => bag.setQty(it.slug, it.size, it.qty + 1)}><Icon.plus /></button>
                              </div>
                            </div>
                            <div className="bag-right">
                              <span>{money(it.price * it.qty)}</span>
                              <button className="link-btn small" onClick={() => bag.remove(it.slug, it.size)}>Remove</button>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>

                <div className="bag-extras">
                  <label className="check">
                    <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
                    <span>Present it as a gift in the <em>Heirloom Box</em>{config.heirloomBoxPrice ? ` (${config.heirloomBoxPrice})` : ''}</span>
                  </label>
                  <AnimatePresence>
                    {gift && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <label className="field"><span>Keepsake card note</span>
                          <textarea rows="2" value={note} maxLength={180} onChange={(e) => setNote(e.target.value)} placeholder="For our little one’s first Diwali…" /></label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="field-row">
                    <label className="field"><span>Your name</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
                    <label className="field"><span>Baby’s weight</span><input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 16 lb" /></label>
                  </div>
                </div>

                <div className="drawer-foot">
                  <div className="total"><span className="eyebrow">Total</span><span className="serif">{money(bag.total)}</span></div>
                  <a className="btn btn-dark wide" href={waLink(msg)} target="_blank" rel="noopener">
                    <Icon.wa /> {hasWhatsApp() ? 'Send reservation on WhatsApp' : 'Send reservation by Instagram DM'}
                  </a>
                  {!hasWhatsApp() && <button className="link-btn small" onClick={copy}>{copied ? 'Copied — paste it into the DM' : 'Copy the message to paste in'}</button>}
                  <p className="fine">No payment is taken here. We confirm sizes personally, then send {config.paymentNote || 'payment details'}.</p>
                  {(config.etsyUrl || config.amazonUrl) && (
                    <p className="fine">Prefer to check out online? {config.etsyUrl && <a href={config.etsyUrl} target="_blank" rel="noopener">Etsy</a>}{config.etsyUrl && config.amazonUrl && ' · '}{config.amazonUrl && <a href={config.amazonUrl} target="_blank" rel="noopener">Amazon</a>}</p>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
