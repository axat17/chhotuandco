import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config.js'

export default function Faq() {
  const items = [
    ['How do I reserve?', 'Choose a piece and size, add it to your reservation bag, and send the bag to us in one message. We confirm the fit personally and hold your size. You can also check out on Etsy or Amazon.'],
    ['How do I pay?', `No payment is taken on this website. Etsy and Amazon orders check out on those sites. For WhatsApp and Instagram reservations, we confirm your size and then send ${config.paymentNote || 'payment details'}.`],
    ['Will it arrive before Diwali?', `${config.orderByDate ? `Reserve by ${config.orderByDate} and it` : 'Reserve early and it'} will arrive before 8 November. We ship${config.shipsFrom ? ' from ' + config.shipsFrom : ''} as soon as your size is confirmed.`],
    ['Which size should I choose?', 'Go by weight rather than age — use the size finder. Between sizes, choose the larger.'],
    ['Is the zari scratchy?', 'Never against the skin. Every embellished panel is lined in soft cotton.'],
    config.exchangePolicy && ['What if it doesn’t fit?', config.exchangePolicy],
    config.localPickupCity && ['Can I pick up locally?', `Yes, in ${config.localPickupCity}. Just mention it in your message.`],
    ['How should I care for it?', 'Each piece comes with its own care card. Keep it in the box it arrived in, ready for the next little one in the family.'],
  ].filter(Boolean)
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
