import { useL } from '../useLangCtx'
import { Section, SectionHead } from '../components/Section'
import AppCard from '../components/AppCard'
import { APPS } from '../content'

export default function Apps() {
  const { t } = useL()
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{t.nav.apps}</p>
          <h1 className="page-hero__title">{t.apps.title}</h1>
          <p className="page-hero__sub">{t.apps.sub}</p>
        </div>
      </section>

      <Section>
        <div className="appgrid appgrid--large">
          {APPS.map((app, i) => <AppCard key={app.id} app={app} index={i} large />)}
        </div>
      </Section>
    </>
  )
}
