import { useState } from 'react'
import { motion } from 'framer-motion'

/** Fade-up as it scrolls into view. */
export function Reveal({ children, delay = 0, as = 'div', className, style }) {
  const M = motion[as]
  return (
    <M className={className} style={style}
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  )
}

/** Product photo with an elegant crest placeholder until a real JPG is uploaded. */
export function Photo({ product, n = 1, src, color, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  const bg = color || product?.color || '#2C1B21'
  const hex = bg.replace('#', '')
  const light = (parseInt(hex.slice(0, 2), 16) * 0.299 + parseInt(hex.slice(2, 4), 16) * 0.587 + parseInt(hex.slice(4, 6), 16) * 0.114) / 255 > 0.5
  const url = src || (product ? `/img/products/${product.slug}-${n}.jpg` : null)
  return (
    <div className={`photo ${light ? 'light' : ''} ${className}`} style={{ '--ph': bg }}>
      {url && !failed && <img src={url} alt={alt || (product ? `${product.name} — ${product.short}` : '')} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  )
}

export const Icon = {
  ig: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>,
  bag: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M5.5 8h13l-1 12.5h-11L5.5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" {...p}><path d="M4 8h16M4 16h16"/></svg>,
  wa: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  minus: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...p}><path d="M6 12h12"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...p}><path d="M6 12h12M12 6v12"/></svg>,
}

export function Wordmark({ light, size = 30 }) {
  return (
    <span className={`wordmark ${light ? 'on-dark-wm' : ''}`} style={{ '--wm': size + 'px' }}>
      <span className="w1">CHHOTU</span><span className="w2">&amp; Co.</span>
    </span>
  )
}
