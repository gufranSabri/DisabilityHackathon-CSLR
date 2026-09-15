import { motion } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section, SectionHead } from '../components/Section'
import StatBar from '../components/StatBar'
import Accordion from '../components/Accordion'
import { NEWS, FAQ } from '../content'

export default function About() {
  const { lang, t } = useL()
  const a = t.about

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{t.footer.colAbout}</p>
          <h1 className="page-hero__title">{a.title}</h1>
        </div>
      </section>

      <Section>
        <div className="prose">
          <h2>{a.visionTitle}</h2>
          <p>{a.vision}</p>
          <h2>{a.alignTitle}</h2>
          <p>{a.align}</p>
        </div>
      </Section>

      <Section tint id="impact">
        <SectionHead title={a.impactTitle} center />
        <StatBar />
      </Section>

      <Section id="news">
        <SectionHead title={a.newsTitle} />
        <div className="news-grid">
          {NEWS.map((n, i) => (
            <motion.article key={i} className="news-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.06 }}>
              <div className="news-card__meta">
                <span className="news-card__tag">{n.tag[lang]}</span>
                <span className="news-card__date">{n.date[lang]}</span>
              </div>
              <h3 className="news-card__title">{n.title[lang]}</h3>
              <p className="news-card__body">{n.body[lang]}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section tint id="faq">
        <SectionHead title={a.faqTitle} />
        <Accordion items={FAQ} />
      </Section>

      <Section>
        <div className="callout callout--muted">
          <span className="callout__icon"><Icon name="spark" size={20} /></span>
          <div>
            <strong>{a.creditsTitle}</strong>
            <p>{a.credits}</p>
          </div>
        </div>
      </Section>
    </>
  )
}
