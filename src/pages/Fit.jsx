import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { sizes } from '../config.js'
import SizeFinder from '../components/SizeFinder.jsx'
import { Icon, Reveal } from '../components/ui.jsx'

export default function Fit() {
  useEffect(() => { document.title = 'The fit — size guide | Chhotu & Co.' }, [])
  return (
    <>
      <section className="on-dark">
        <div className="wrap section split">
          <Reveal className="stack">
            <div className="eyebrow">The fit</div>
            <h1 className="h-l">Sized by weight, <em>not by guesswork.</em></h1>
            <p className="lede">Babies of the same age can be two sizes apart. Enter your baby’s weight and we’ll recommend the size to reserve.</p>
          </Reveal>
          <Reveal delay={0.15}><SizeFinder dark /></Reveal>
        </div>
      </section>
      <section className="wrap section split" style={{ alignItems: 'start' }}>
        <Reveal className="stack">
          <h2 className="h-m">The <em>size guide</em></h2>
          <p className="lede">Between sizes, choose the larger: our cuts are generous and waists are softly elasticated. Traditional silhouettes are meant to drape, not cling.</p>
          <Link to="/edit" className="text-link">Explore the edit <Icon.arrow /></Link>
        </Reveal>
        <Reveal className="table-wrap" delay={0.1}>
          <table className="sizes">
            <thead><tr><th>Size</th><th>Weight</th><th>Height</th></tr></thead>
            <tbody>{sizes.map((s) => <tr key={s.id}><td>{s.long}</td><td>{s.weight}</td><td>{s.height}</td></tr>)}</tbody>
          </table>
        </Reveal>
      </section>
    </>
  )
}
