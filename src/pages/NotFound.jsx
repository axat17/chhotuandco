import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="on-dark">
      <div className="wrap section center stack" style={{ alignItems: 'center', minHeight: '50vh', justifyContent: 'center' }}>
        <img src="/img/crest-line.svg" alt="" width="56" height="62" />
        <h1 className="h-l">This page has <em>wandered off.</em></h1>
        <p className="lede">Let’s take you back to the Diwali Edit.</p>
        <Link className="btn btn-gold" to="/edit">Explore the edit</Link>
      </div>
    </section>
  )
}
