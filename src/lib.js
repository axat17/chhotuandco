import { config, sizes } from './config.js'

export const money = (n) => '$' + Number(n).toFixed(2)
export const handle = config.instagram ? '@' + config.instagram : ''
export const igUrl = config.instagram ? `https://www.instagram.com/${config.instagram}/` : ''
/** Opens a direct message to the brand on Instagram (app on phones, web on desktop). */
export const igDM = config.instagram ? `https://ig.me/m/${config.instagram}` : igUrl

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
