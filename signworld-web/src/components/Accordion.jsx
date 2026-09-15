import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../Icons'
import { useL } from '../useLangCtx'

export default function Accordion({ items }) {
  const { lang } = useL()
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const open = openIdx === i
        return (
          <div key={i} className={`accordion__item ${open ? 'is-open' : ''}`}>
            <button className="accordion__q" onClick={() => setOpenIdx(open ? -1 : i)}>
              <span>{item.q[lang]}</span>
              <Icon name={open ? 'minus' : 'plus'} size={16} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="accordion__a"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{item.a[lang]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
