import { useParams, Link, Navigate } from 'react-router-dom'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section } from '../components/Section'
import ToolCard from '../components/ToolCard'
import { MOMENTS, TOOLS } from '../content'

export default function DirectoryMoment() {
  const { moment } = useParams()
  const { lang, dir, t } = useL()
  const m = MOMENTS.find((x) => x.id === moment)
  if (!m) return <Navigate to="/directory" replace />

  const d = t.directory
  const backArrow = dir === 'rtl' ? 'arrowRight' : 'arrowLeft'
  const tools = m.tools.map((id) => TOOLS[id]).filter(Boolean)

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Link to="/directory" className="page-hero__back"><Icon name={backArrow} size={14} /> {d.momentBack}</Link>
          <span className="page-hero__badge"><Icon name={m.icon} size={13} /> {t.nav.directory}</span>
          <h1 className="page-hero__title">{m.title[lang]}</h1>
          <p className="page-hero__sub">{m.body[lang]}</p>
          {m.id === 'emergency' && (
            <Link to="/emergency" className="page-hero__alert">
              <Icon name="siren" size={14} /> {d.emergencyCallout}
            </Link>
          )}
        </div>
      </section>

      <Section>
        <div className="toolgrid">
          {tools.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
        </div>
      </Section>
    </>
  )
}
