import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { recommendSize, waLink } from '../lib.js'

/** Weight-based size recommendation. onPick(sizeId) is optional (used on product pages). */
export default function SizeFinder({ onPick, compact = false, dark = false }) {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('lb')
  const r = value ? recommendSize(value, unit) : null
  const id = compact ? 'sf-c' : 'sf'

  return (
    <div className={`finder ${compact ? 'compact' : ''} ${dark ? 'dark' : ''}`}>
      <label htmlFor={id} className="eyebrow">Your baby’s weight</label>
      <div className="finder-row">
        <input id={id} type="number" inputMode="decimal" min="0" step="0.1" placeholder={unit === 'lb' ? 'e.g. 16' : 'e.g. 7.2'}
          value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="unit-toggle" role="group" aria-label="Unit">
          {['lb', 'kg'].map((u) => (
            <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)}>{u}</button>
          ))}
        </div>
      </div>
      <div className="finder-out" aria-live="polite">
        <AnimatePresence mode="wait">
          {r && (
            <motion.div key={(r.size?.id || '') + r.tooSmall + r.tooBig + !!r.between}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
              {r.tooSmall ? (
                <p>For babies under 5 lb, <a href={waLink('Hello Chhotu & Co., my baby is very small — could you advise on sizing?')} target="_blank" rel="noopener">message us</a> and we’ll advise personally.</p>
              ) : (
                <>
                  <p className="rec">We recommend <em>{r.size.long}</em></p>
                  <p className="why">
                    {r.tooBig ? 'Our largest size; it fits up to about 27 lb. Message us if you’re unsure.'
                      : r.between ? `Close to the top of this size — if you want it to last a few months, choose ${r.between.long}.`
                      : `Fits ${r.size.weight}, ${r.size.height}.`}
                  </p>
                  {onPick && <button type="button" className="link-btn" onClick={() => onPick((r.between || r.size).id)}>Select {(r.between || r.size).label}</button>}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
