import { config, sizes } from './config.js'

export const money = (n) => '$' + Number(n).toFixed(2)

const digits = () => String(config.whatsappNumber || '').replace(/\D/g, '')
export const hasWhatsApp = () => !!digits()
export const igUrl = config.instagram ? `https://www.instagram.com/${config.instagram}/` : ''
export const igDM = config.instagram ? `https://ig.me/m/${config.instagram}` : ''

/** WhatsApp link with a pre-filled message; falls back to Instagram DM. */
export function waLink(message) {
  if (digits()) return `https://wa.me/${digits()}${message ? '?text=' + encodeURIComponent(message) : ''}`
  return igDM || '#'
}

export const sizeById = (id) => sizes.find((s) => s.id === id)

/** Recommend a size from a weight. unit: 'lb' | 'kg' */
export function recommendSize(value, unit = 'lb') {
  const lb = unit === 'kg' ? Number(value) * 2.20462 : Number(value)
  if (!lb || lb <= 0) return null
  if (lb < 5) return { tooSmall: true, lb }
  const s = sizes.find((x) => lb <= x.maxLb)
  if (s) {
    const near = s.maxLb - lb < 1 && sizes.indexOf(s) < sizes.length - 1
    return { size: s, lb, between: near ? sizes[sizes.indexOf(s) + 1] : null }
  }
  return { tooBig: true, lb, size: sizes[sizes.length - 1] }
}

export function bagMessage(items, extras) {
  const lines = ['Hello Chhotu & Co., I’d like to reserve:', '']
  let total = 0
  items.forEach((it) => {
    const s = sizeById(it.size)
    total += it.price * it.qty
    lines.push(`• ${it.name} — ${s ? s.label : it.size} × ${it.qty} (${money(it.price * it.qty)})`)
  })
  lines.push('', `Total: ${money(total)}`)
  if (extras.weight) lines.push(`Baby’s weight: ${extras.weight}`)
  if (extras.gift) lines.push('Please present it as a gift in the Heirloom Box.' + (extras.note ? ` Card note: “${extras.note}”` : ''))
  if (extras.name) lines.push(`Name: ${extras.name}`)
  return lines.join('\n')
}
