import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Photo } from './ui.jsx'
import { money } from '../lib.js'

export default function ProductCard({ p, i = 0 }) {
  const left = Object.values(p.stock || {}).reduce((a, b) => a + b, 0)
  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
      <Link to={`/edit/${p.slug}`} className="card">
        <div className="frame"><Photo product={p} n={1} /></div>
        <div className="meta">
          <span className="tier">{p.gender} · {p.tier}</span>
          <span className="name">{p.name}</span>
          <span className="short">{p.short}</span>
          <span className="price">{money(p.price)}{left === 0 && <span className="sold"> · Fully reserved</span>}</span>
        </div>
      </Link>
    </motion.div>
  )
}
