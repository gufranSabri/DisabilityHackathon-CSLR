import { useState } from 'react'
import Icon from '../Icons'
import { useL } from '../useLangCtx'
import { Section, SectionHead } from '../components/Section'
import WidgetDemo from '../components/WidgetDemo'
import { copyText } from '../clipboard'
import { TOOLKIT, WIDGET } from '../content'

export default function Widget() {
  const { lang, t } = useL()
  const w = t.widget
  const [cfg, setCfg] = useState({ theme: 'light', lang: lang, size: 'full' })
  const [copiedKey, setCopiedKey] = useState(null)

  const copy = (key, text) => {
    copyText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1600)
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="page-hero__eyebrow">{t.nav.widget}</p>
          <h1 className="page-hero__title">{w.title}</h1>
          <p className="page-hero__sub">{w.sub}</p>
        </div>
      </section>

      <Section>
        <div className="widget-stage">
          <div className="widget-demo-wrap">
            <p className="widget-demo-label">{w.demoTitle} — <span>{w.demoNote}</span></p>
            <WidgetDemo theme={cfg.theme} size={cfg.size} />
          </div>

          <div className="widget-config">
            <h3 className="toolkit-card__title">{w.configTitle}</h3>
            {WIDGET.configs.map((c) => (
              <div key={c.id} className="widget-config__row">
                <span>{c[lang]}</span>
                <div className="segmented segmented--sub">
                  {c.options.map((o) => (
                    <button
                      key={o.id}
                      className={`segmented__btn ${cfg[c.id] === o.id ? 'is-on' : ''}`}
                      onClick={() => setCfg((s) => ({ ...s, [c.id]: o.id }))}
                    >
                      {o[lang]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tint>
        <div className="code-cols">
          <div>
            <h3 className="toolkit-card__title">{w.embedTitle}</h3>
            <pre className="code-block"><code>{TOOLKIT.widgetSnippet}</code>
              <button className="code-block__copy" onClick={() => copy('embed', TOOLKIT.widgetSnippet)}>
                <Icon name={copiedKey === 'embed' ? 'check' : 'copy'} size={13} /> {copiedKey === 'embed' ? w.copied : w.copy}
              </button>
            </pre>
          </div>
          <div>
            <h3 className="toolkit-card__title">{w.integrateTitle}</h3>
            <pre className="code-block"><code>{TOOLKIT.integrationCode}</code>
              <button className="code-block__copy" onClick={() => copy('sdk', TOOLKIT.integrationCode)}>
                <Icon name={copiedKey === 'sdk' ? 'check' : 'copy'} size={13} /> {copiedKey === 'sdk' ? w.copied : w.copy}
              </button>
            </pre>
          </div>
        </div>
      </Section>
    </>
  )
}
