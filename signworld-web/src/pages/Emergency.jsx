import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section } from '../components/Section'
import Avatar3D from '../components/Avatar3D'
import { APP_PWA_URL } from '../content'
import { signsFor } from '../lib/signs'

export default function Emergency() {
  const { lang, t } = useL()
  const e = t.emergency

  return (
    <>
      <section className="em-hero">
        <div className="wrap">
          <p className="em-hero__eyebrow"><Icon name="siren" size={14} /> {e.eyebrow}</p>
          <h1 className="em-hero__title">{e.title}</h1>
          <p className="em-hero__body">{e.body}</p>
          <a className="btn btn--stop btn--lg" href={APP_PWA_URL} target="_blank" rel="noreferrer">
            <Icon name="sos" size={16} /> {e.openSos}
          </a>
          <span className="em-hero__note">{e.openSosNote}</span>
        </div>
      </section>

      <Section>
        <div className="em-grid">
          <div className="em-panel">
            <h2><Icon name="check" size={16} /> {e.attachedTitle}</h2>
            <ul className="em-list">
              {e.attached.map((a) => <li key={a}><Icon name="check" size={13} /> {a}</li>)}
            </ul>
          </div>

          <div className="em-panel">
            <h2>{e.waitTitle}</h2>
            <Avatar3D
              signId={signsFor('emergency')}
              lang={lang}
              caption={e.wait}
              compact
              badgeLive={lang === 'ar' ? 'إرشادات' : 'Guidance'}
            />
          </div>
        </div>

        <div className="callout callout--muted em-nophone">
          <span className="callout__icon"><Icon name="phone" size={20} /></span>
          <div>
            <strong>{e.noPhoneTitle}</strong>
            <p>{e.noPhoneBody}</p>
          </div>
        </div>
      </Section>
    </>
  )
}
