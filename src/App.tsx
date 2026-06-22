import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Gallery from './pages/Gallery'
import News from './pages/News'
import Contact from './pages/Contact'

type Page = '/' | '/tentang' | '/program' | '/galeri' | '/berita' | '/kontak'

function getPageFromPath(): Page {
  const path = window.location.pathname
  if (path === '/tentang') return '/tentang'
  if (path === '/program') return '/program'
  if (path === '/galeri') return '/galeri'
  if (path === '/berita') return '/berita'
  if (path === '/kontak') return '/kontak'
  return '/'
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath)
  const [transitioning, setTransitioning] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null!)
  const prevPageRef = useRef<Page>(currentPage)

  const navigate = useCallback((path: Page) => {
    if (path === currentPage || transitioning) return
    prevPageRef.current = currentPage
    window.history.pushState({}, '', path)
    setCurrentPage(path)
  }, [currentPage, transitioning])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return

    setTransitioning(true)

    const tl = gsap.timeline({
      onComplete: () => setTransitioning(false),
    })

    tl.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )

    return () => {
      tl.kill()
    }
  }, [currentPage])

  const renderPage = () => {
    const key = currentPage
    switch (currentPage) {
      case '/tentang': return <About key={key} />
      case '/program': return <Programs key={key} />
      case '/galeri': return <Gallery key={key} />
      case '/berita': return <News key={key} />
      case '/kontak': return <Contact key={key} />
      default: return <Home key={key} />
    }
  }

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main ref={mainRef}>
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </>
  )
}

export default App
