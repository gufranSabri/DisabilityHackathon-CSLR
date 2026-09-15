import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { LangProvider } from './useLangCtx'
import Landing from './pages/Landing'
import Brain from './pages/Brain'
import Apps from './pages/Apps'
import AppDetail from './pages/AppDetail'
import AppFrame from './pages/AppFrame'
import Directory from './pages/Directory'
import DirectoryMoment from './pages/DirectoryMoment'
import Toolkit from './pages/Toolkit'
import Widget from './pages/Widget'
import Emergency from './pages/Emergency'
import About from './pages/About'
import GetTheApp from './pages/GetTheApp'
import NotFound from './pages/NotFound'

const router = createHashRouter(
  [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/brain', element: <Brain /> },
      { path: '/apps', element: <Apps /> },
      { path: '/apps/:id', element: <AppDetail /> },
      { path: '/directory', element: <Directory /> },
      { path: '/directory/:moment', element: <DirectoryMoment /> },
      { path: '/toolkit', element: <Toolkit /> },
      { path: '/widget', element: <Widget /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/about', element: <About /> },
      { path: '/get-the-app', element: <GetTheApp /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // Full-screen: the embedded app owns the whole viewport, no site nav/footer.
  {
    path: '/apps/:id/open',
    element: <LangProvider><AppFrame /></LangProvider>,
  },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)

export default function App() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}
