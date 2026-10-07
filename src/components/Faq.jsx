import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { handle } from '../lib.js'

export default function Faq() {
  const items = [
    ['When does the Diwali Edit arrive?', `Very soon. Follow ${handle || 'us on Instagram'} to see each piece first, and send us a message to reserve before the edit opens.`],
    ['How do I reserve?', `Message us on Instagram${handle ? ` at ${handle}` : ''} with the piece you love and your baby’s weight. We’ll confirm the size personally and hold it for you.`],
    ['Which size should I choose?', 'Go by weight rather than age — the size finder will tell you. Between sizes, choose the larger.'],
    ['Is the zari scratchy?', 'Never against the skin. Every embellished panel is lined in soft cotton.'],
    ['Are there pieces for boys?', 'Yes — two of the four pieces in the edit are made for little gentlemen: Shaan and Chandni.'],
  ]
  const [open, setOpen] = useState(0)

  return (
    <div className="faq">
      <h2 className="h-m center" style={{ marginBottom: 28 }}>Questions</h2>
      {items.map(([q, a], i) => (
        <div className="faq-item" key={q}>
          <h3>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{q}</span><span className="pm" aria-hidden="true">{open === i ? '–' : '+'}</span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: 'hidden' }}>
                <p>{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
