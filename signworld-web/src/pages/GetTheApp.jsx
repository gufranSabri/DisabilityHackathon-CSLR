import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section } from '../components/Section'
import { APP_PWA_URL } from '../content'

// Static illustrative QR (a fixed decorative grid, not a real code).
function FakeQR() {
  const cells = []
  const seed = [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1]
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const corner = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5)
      const on = corner ? (x === 0 || x === 8 || y === 0 || y === 8 || (x > 0 && x < 3 && y > 0 && y < 3 && x + y > 1) || (x > 5 && y > 0 && y < 3) || (x > 0 && x < 3 && y > 5)) : seed[(x * 7 + y * 3) % seed.length]
      if (on) cells.push(<rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="10" height="10" />)
    }
  }
  return <svg viewBox="0 0 90 90" className="qr" aria-hidden="true">{cells}</svg>
}

export default function GetTheApp() {
  const { lang, t } = useL()
  const g = t.getApp

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{g.eyebrow}</p>
          <h1 className="page-hero__title">{g.title}</h1>
          <p className="page-hero__sub">{g.sub}</p>
        </div>
      </section>

      <Section>
        <div className="getapp">
          <motion.div className="getapp__phone" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="getapp__screen">
              <img src="/shots/app.svg" alt="SignWorld app" />
            </div>
          </motion.div>

          <div className="getapp__info">
            <ul className="getapp__features">
              {g.features.map((f) => (
                <li key={f.t}><span className="getapp__ficon"><Icon name={f.icon} size={16} /></span> {f.t}</li>
              ))}
            </ul>

            <div className="getapp__stores">
              <span className="store-badge"><Icon name="arrowUpRight" size={14} /> App Store</span>
              <span className="store-badge"><Icon name="arrowUpRight" size={14} /> Google Play</span>
            </div>
            <p className="getapp__storenote">{g.storeNote}</p>

            <a className="btn btn--primary" href={APP_PWA_URL} target="_blank" rel="noreferrer">
              {g.openWeb} <Icon name="arrowUpRight" size={14} />
            </a>

            <div className="getapp__qr">
              <FakeQR />
              <span>{g.qrNote}</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
