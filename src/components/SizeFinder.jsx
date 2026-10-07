import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { igDM, recommendSize } from '../lib.js'

/** Weight-based size recommendation. */
export default function SizeFinder({ compact = false, dark = false }) {
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
                <p>For babies under 5 lb, <a href={igDM} target="_blank" rel="noopener">message us on Instagram</a> and we’ll advise personally.</p>
              ) : (
                <>
                  <p className="rec">We recommend <em>{r.size.long}</em></p>
                  <p className="why">
                    {r.tooBig ? 'Our largest size. Message us if you’re unsure.'
                      : r.between ? `Close to the top of this size — for a longer fit, choose ${r.between.long}.`
                      : `Fits ${r.size.weight}, ${r.size.height}.`}
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
