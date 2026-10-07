import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useBag } from '../context/Bag.jsx'
import { config } from '../config.js'
import { Icon, Wordmark } from './ui.jsx'
import BagDrawer from './BagDrawer.jsx'
import { igUrl, waLink } from '../lib.js'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const bag = useBag()
  const [menu, setMenu] = useState(false)
  const loc = useLocation()
  useEffect(() => setMenu(false), [loc.pathname, loc.search, loc.hash])

  const banner = config.orderByDate
    ? `The Diwali Edit · Reserve by ${config.orderByDate} for delivery before 8 November`
    : 'The Diwali Edit · Reserve early for delivery before 8 November'

  const nav = [
    ['/edit?g=Girls', 'Girls'], ['/edit?g=Boys', 'Boys'], ['/fit', 'The Fit'], ['/#atelier', 'The Atelier'],
  ]

  return (
    <>
      <ScrollManager />
      <a href="#main" className="skip">Skip to content</a>
      <div className="banner">{banner}</div>
      <header className="site-header">
        <div className="wrap hdr">
          <nav className="nav nav-left" aria-label="Shop">
            {nav.slice(0, 3).map(([to, l]) => <NavLink key={l} to={to}>{l}</NavLink>)}
          </nav>
          <button className="icon-btn menu-btn" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><Icon.menu /></button>
          <Link to="/" aria-label="Chhotu & Co. home" className="logo-link"><Wordmark /></Link>
          <nav className="nav nav-right" aria-label="Service">
            <NavLink to="/#reserve" className="hide-sm">Reserve</NavLink>
            <button className="bag-btn" onClick={() => bag.setOpen(true)} aria-label={`Reservation bag, ${bag.count} items`}>
              <Icon.bag />
              <AnimatePresence>{bag.count > 0 && (
                <motion.span key={bag.count} className="bag-count" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}>{bag.count}</motion.span>
              )}</AnimatePresence>
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <button className="icon-btn close" aria-label="Close menu" onClick={() => setMenu(false)}><Icon.close /></button>
            <nav aria-label="Mobile">
              {[['/', 'Home'], ['/edit', 'The Diwali Edit'], ...nav, ['/#reserve', 'Reserve'], ['/#story', 'Our story']].map(([to, l], i) => (
                <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <Link to={to}>{l}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main"><Outlet /></main>

      <footer className="site-footer">
        <div className="wrap top">
          <div className="stack" style={{ gap: 14 }}>
            <Link to="/"><Wordmark light /></Link>
            <p className="foot-note">Indian couture for little ones, 0–18 months.</p>
          </div>
          <nav aria-label="Footer">
            <div><Link to="/edit">The Diwali Edit</Link><Link to="/fit">The fit</Link><Link to="/#story">Our story</Link></div>
            <div>
              <a href={waLink('Hello Chhotu & Co.')} target="_blank" rel="noopener">{config.whatsappNumber ? 'WhatsApp' : 'Message us'}</a>
              {igUrl && <a href={igUrl} target="_blank" rel="noopener">Instagram</a>}
              {config.etsyUrl && <a href={config.etsyUrl} target="_blank" rel="noopener">Etsy</a>}
              {config.amazonUrl && <a href={config.amazonUrl} target="_blank" rel="noopener">Amazon</a>}
              {config.email && <a href={`mailto:${config.email}`}>Email</a>}
            </div>
          </nav>
        </div>
        <div className="wrap bottom">© {new Date().getFullYear()} Chhotu &amp; Co.</div>
      </footer>

      <BagDrawer />

      <AnimatePresence>
        {bag.toast && !bag.open && (
          <motion.div className="toast" role="status" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
            <span><em>{bag.toast.name}</em> added to your reservation</span>
            <button onClick={() => bag.setOpen(true)}>View bag</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
