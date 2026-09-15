import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import Header from '../components/Header'
import CameraCapture from '../components/CameraCapture'
import AvatarStage from '../components/AvatarStage'
import { DOC_FORMS } from '../content'

// A -> scan -> explain (signed) -> guided fill -> review -> submit/save -> History
export default function DocumentAssistant({ lang, dir, t, onBack, addHistory }) {
  const d = t.docAssistant
  const [phase, setPhase] = useState('pick') // pick | scan | explain | fill | review | done
  const [form, setForm] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [fieldIdx, setFieldIdx] = useState(0)
  const [values, setValues] = useState({})
  const scannedRef = useRef(false)

  const startScan = (f) => {
    setForm(f)
    setValues({})
    setFieldIdx(0)
    scannedRef.current = false
    setPhase('scan')
    setScanning(true)
  }

  const onScanComplete = () => {
    if (scannedRef.current) return
    scannedRef.current = true
    setScanning(false)
    setPhase('explain')
  }

  const saveTxt = () => {
    const lines = [
      form.title[lang],
      '—'.repeat(20),
      ...form.fields.map((fl) => `${fl.label[lang]}: ${values[fl.id] || ''}`),
    ].join('\n')
    const url = URL.createObjectURL(new Blob([lines], { type: 'text/plain' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `signworld-${form.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const submit = () => {
    addHistory({ kind: 'doc', title: form.title[lang], detail: form.fields.map((fl) => `${fl.label[lang]}: ${values[fl.id] || '—'}`).join(' · ') })
    setPhase('done')
  }

  return (
    <>
      <Header lang={lang} dir={dir} title={d.title} onBack={onBack} />

      <AnimatePresence mode="wait">
        {phase === 'pick' && (
          <motion.div key="pick" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="da-intro">{d.intro}</p>
            <p className="tmode__label">{d.pickForm}</p>
            <div className="bk-list" style={{ marginTop: 10 }}>
              {DOC_FORMS.map((f) => (
                <button key={f.id} className="bk-card" onClick={() => startScan(f)}>
                  <span className="bk-card__icon"><Icon name="doc" size={18} /></span>
                  <div className="bk-card__body">
                    <span className="bk-card__title">{f.title[lang]}</span>
                    <span className="bk-card__meta">{f.source[lang]}</span>
                  </div>
                  <Icon name={dir === 'rtl' ? 'chevronLeft' : 'chevronRight'} size={16} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'scan' && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CameraCapture
              active={scanning}
              autoPlay
              lines={[d.scanned]}
              onComplete={onScanComplete}
              facingMode="environment"
              lineIntervalMs={2200}
              processingMs={900}
              label={scanning ? d.scanning : d.scan}
              processingLabel={d.scanning}
              deniedLabel={t.translate.cameraDenied}
            />
            <p className="da-scanhint">{d.scanning}</p>
          </motion.div>
        )}

        {phase === 'explain' && (
          <motion.div key="explain" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="da-scanned"><Icon name="check" size={14} /> {d.scanned} — {form.title[lang]}</div>
            <p className="home-sectitle">{d.explainTitle}</p>
            <AvatarStage
              signing
              caption={form.explainer[lang][0]}
              badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'}
              badgeLive={lang === 'ar' ? 'يشرح' : 'Explaining'}
            />
            <ol className="detail-steps" style={{ marginTop: 14 }}>
              {form.explainer[lang].map((s, i) => (
                <li key={i}><span className="detail-steps__num">{i + 1}</span>{s}</li>
              ))}
            </ol>
            <button className="btn btn--primary" style={{ marginTop: 18 }} onClick={() => setPhase('fill')}>{d.explainNext}</button>
          </motion.div>
        )}

        {phase === 'fill' && (
          <FillStep
            key="fill" d={d} lang={lang} form={form}
            fieldIdx={fieldIdx} setFieldIdx={setFieldIdx}
            values={values} setValues={setValues}
            onReview={() => setPhase('review')}
          />
        )}

        {phase === 'review' && (
          <motion.div key="review" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="home-sectitle">{d.reviewTitle}</p>
            <div className="kv">
              {form.fields.map((fl) => (
                <div key={fl.id} className="kv__row">
                  <span>{fl.label[lang]}</span>
                  <span>{values[fl.id] || '—'}</span>
                </div>
              ))}
            </div>
            <div className="detail-actions">
              <button className="btn btn--primary" onClick={submit}>{d.submit}</button>
              <button className="btn btn--ghost" onClick={saveTxt}><Icon name="download" size={15} /> {d.saveCopy}</button>
            </div>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div key="done" className="wizard-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="wizard-success__ring"><Icon name="check" size={36} /></span>
            <p className="wizard-success__title">{d.successTitle}</p>
            <p className="wizard-success__body">{d.successBody}</p>
            <div className="detail-actions" style={{ width: '100%' }}>
              <button className="btn btn--ghost" onClick={saveTxt}><Icon name="download" size={15} /> {d.saveCopy}</button>
              <button className="btn btn--primary" onClick={onBack}>{t.common.done}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FillStep({ d, lang, form, fieldIdx, setFieldIdx, values, setValues, onReview }) {
  const field = form.fields[fieldIdx]
  const total = form.fields.length
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [fieldIdx])

  const label = d.fieldOf.replace('{n}', fieldIdx + 1).replace('{total}', total)
  const last = fieldIdx === total - 1

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <p className="home-sectitle">{d.fillTitle}</p>
      <div className="wizard-steps">
        {form.fields.map((f, i) => (
          <span key={f.id} className={`wizard-steps__dot ${i === fieldIdx ? 'is-on' : ''} ${i < fieldIdx ? 'is-done' : ''}`} />
        ))}
      </div>
      <p className="da-fieldlabel">{label}</p>

      <AvatarStage
        signing
        caption={field.prompt[lang]}
        compact
        badgeIdle={lang === 'ar' ? 'جاهز' : 'Idle'}
        badgeLive={lang === 'ar' ? 'يشرح الحقل' : 'Prompting'}
      />

      <label className="field-edit" style={{ marginTop: 14 }}>
        <span className="field-edit__label">{field.label[lang]}</span>
        <input
          ref={inputRef}
          value={values[field.id] || ''}
          onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
          placeholder={d.fieldPlaceholder}
        />
      </label>

      <div className="detail-actions">
        {last ? (
          <button className="btn btn--primary" onClick={onReview}>{d.review}</button>
        ) : (
          <button className="btn btn--primary" onClick={() => setFieldIdx((i) => i + 1)}>{d.fieldOf ? (lang === 'ar' ? 'التالي' : 'Next') : 'Next'}</button>
        )}
        {fieldIdx > 0 && (
          <button className="btn btn--ghost" onClick={() => setFieldIdx((i) => i - 1)}>{lang === 'ar' ? 'السابق' : 'Back'}</button>
        )}
      </div>
    </motion.div>
  )
}
