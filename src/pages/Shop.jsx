import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { occasions, products } from '../config.js'
import ProductCard from '../components/ProductCard.jsx'
import { Reveal } from '../components/ui.jsx'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const g = params.get('g') || 'All'
  const o = params.get('o') || 'all'
  const set = (k, v, def) => {
    const next = new URLSearchParams(params)
    v === def ? next.delete(k) : next.set(k, v)
    setParams(next, { replace: true })
  }
  const list = products.filter((p) => (g === 'All' || p.gender === g) && (o === 'all' || p.occasions?.includes(o)))
  const occ = occasions.find((x) => x.id === o)

  useEffect(() => { document.title = `The Diwali Edit${g !== 'All' ? ' · ' + g : ''} | Chhotu & Co.` }, [g])

  return (
    <div className="wrap section-top">
      <Reveal className="section-head">
        <div className="eyebrow">The Diwali Edit</div>
        <h1 className="h-l">{occ ? <>Dressed for <em>{occ.name.toLowerCase()}</em></> : g === 'Girls' ? <>For <em>her</em></> : g === 'Boys' ? <>For the <em>little gentlemen</em></> : <>Four pieces. <em>Very few of each.</em></>}</h1>
      </Reveal>

      <div className="filters" role="group" aria-label="Filter the edit">
        <div className="chip-row" role="group" aria-label="For">
          {['All', 'Girls', 'Boys'].map((x) => (
            <button key={x} className="chip" aria-pressed={g === x} onClick={() => set('g', x, 'All')}>
              {g === x && <motion.span layoutId="chip-g" className="chip-bg" />}<span>{x}</span>
            </button>
          ))}
        </div>
        <div className="chip-row" role="group" aria-label="Occasion">
          {[{ id: 'all', name: 'Every occasion' }, ...occasions].map((x) => (
            <button key={x.id} className="chip" aria-pressed={o === x.id} onClick={() => set('o', x.id, 'all')}>
              {o === x.id && <motion.span layoutId="chip-o" className="chip-bg" />}<span>{x.name}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid-4" style={{ marginTop: 48 }}>
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="center lede" style={{ margin: '40px auto' }}>Nothing in this edit for that combination yet — try another occasion.</p>}
    </div>
  )
}
