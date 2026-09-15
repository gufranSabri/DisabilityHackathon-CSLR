import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LangProvider } from '../useLangCtx'
import { SaduField } from '../Ornaments'
import Nav from './Nav'
import Footer from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  return (
    <LangProvider>
      <ScrollToTop />
      <SaduField />
      <Nav />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </LangProvider>
  )
}
