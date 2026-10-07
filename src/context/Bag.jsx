import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../config.js'

const BagCtx = createContext(null)
const KEY = 'chhotu-bag-v1'

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    // drop anything that no longer exists in the collection
    return raw.filter((i) => products.some((p) => p.slug === i.slug))
  } catch { return [] }
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* private mode */ } }, [items])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3200); return () => clearTimeout(t) }, [toast])

  const api = useMemo(() => ({
    items, open, toast,
    count: items.reduce((n, i) => n + i.qty, 0),
    total: items.reduce((n, i) => n + i.qty * i.price, 0),
    setOpen,
    add(product, size, qty = 1) {
      setItems((prev) => {
        const ex = prev.find((i) => i.slug === product.slug && i.size === size)
        const max = product.stock?.[size] ?? 9
        if (ex) return prev.map((i) => i === ex ? { ...i, qty: Math.min(max, i.qty + qty) } : i)
        return [...prev, { slug: product.slug, name: product.name, price: product.price, color: product.color, size, qty: Math.min(max, qty) }]
      })
      setToast({ name: product.name, size })
    },
    setQty(slug, size, qty) {
      setItems((prev) => qty <= 0 ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => i.slug === slug && i.size === size ? { ...i, qty } : i))
    },
    remove(slug, size) { setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size))) },
    clear() { setItems([]) },
  }), [items, open, toast])

  return <BagCtx.Provider value={api}>{children}</BagCtx.Provider>
}

export const useBag = () => useContext(BagCtx)
