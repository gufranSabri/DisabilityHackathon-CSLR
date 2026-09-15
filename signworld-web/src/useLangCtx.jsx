import { createContext, useContext } from 'react'
import useLang from './useLang'
import { CONTENT } from './content'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const value = useLang(CONTENT)
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// { lang, dir, t, toggle }
export function useL() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useL must be used within LangProvider')
  return ctx
}
