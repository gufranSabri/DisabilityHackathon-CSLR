import { motion } from 'framer-motion'

const ZONES = [
  { id: 'head', d: 'M50 4a14 14 0 1 0 0.1 0Z' },
  { id: 'chest', d: 'M32 26h36v34a18 18 0 0 1-36 0Z' },
  { id: 'abdomen', d: 'M34 60h32v22a16 16 0 0 1-32 0Z' },
  { id: 'armL', d: 'M32 28 18 30l-4 46 10 2 8-44Z' },
  { id: 'armR', d: 'M68 28 82 30l4 46-10 2-8-44Z' },
  { id: 'legL', d: 'M38 104h12l-2 92-14-2Z' },
  { id: 'legR', d: 'M62 104h-12l2 92 14-2Z' },
]

// A simple tappable front-facing body silhouette used as a symptom-location
// picker during patient intake — a realistic ER triage pattern, standing in
// for a fuller anatomical picker a production build would use.
export default function BodyMap({ selected, onSelect, hint, selectedLabel }) {
  return (
    <div className="bodymap">
      <svg viewBox="0 0 100 200" className="bodymap__figure">
        {ZONES.map((z) => (
          <motion.path
            key={z.id}
            d={z.d}
            className={`bodymap__zone ${selected === z.id ? 'is-selected' : ''}`}
            onClick={() => onSelect(z.id)}
            whileTap={{ scale: 0.96 }}
          />
        ))}
      </svg>
      {selected ? (
        <span className="bodymap__selected">{selectedLabel}</span>
      ) : (
        <span className="bodymap__hint">{hint}</span>
      )}
    </div>
  )
}

export const BODY_ZONE_IDS = ZONES.map((z) => z.id)
