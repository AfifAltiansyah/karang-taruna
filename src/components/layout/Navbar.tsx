import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { navLinks, siteConfig } from '../../data/content'

type Page = '/' | '/tentang' | '/program' | '/galeri' | '/berita' | '/kontak'

interface NavbarProps {
  currentPage: Page
  onNavigate: (path: Page) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const menuOpen = false
  const headerRef = useRef<HTMLDivElement>(null!)
  const mobileMenuRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const onScroll = () => {
      const isScrolled = window.scrollY > 40
      gsap.to(header, {
        background: isScrolled ? 'var(--nav-bg)' : 'transparent',
        borderColor: isScrolled ? 'rgba(245, 240, 232, 0.08)' : 'transparent',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    const menu = mobileMenuRef.current
    if (menu) {
      gsap.to(menu, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          menu.style.display = 'none'
        },
      })
    }
    onNavigate(href as Page)
  }

  const toggleMenu = () => {
    const menu = mobileMenuRef.current
    if (!menu) return

    const isOpen = menu.style.display !== 'none'

    if (isOpen) {
      gsap.to(menu, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          menu.style.display = 'none'
        },
      })
    } else {
      menu.style.display = 'flex'
      gsap.fromTo(menu,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        menu.querySelectorAll('.mobile-nav-link'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
    }
  }

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        borderBottom: '1px solid transparent',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 'var(--max-width)',
        }}
      >
        <button
          onClick={() => handleNav('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold), var(--terracotta))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: '#fff',
            lineHeight: 1,
          }}>
            KT
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--cream)',
              letterSpacing: '0.5px',
            }}
          >
            {siteConfig.name}
          </span>
        </button>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: currentPage === link.href ? 600 : 400,
                color: currentPage === link.href ? 'var(--gold)' : 'rgba(245, 240, 232, 0.9)',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.3s ease, background 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
              {currentPage === link.href && (
                <span style={{
                  position: 'absolute',
                  bottom: 2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 16,
                  height: 2,
                  background: 'var(--gold)',
                  borderRadius: 1,
                }} />
              )}
            </button>
          ))}
        </div>

        <button
          className="hide-desktop"
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: 36,
            height: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            zIndex: 1001,
          }}
        >
          <span style={{
            width: 22,
            height: 2,
            background: 'var(--cream)',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
          }} />
          <span style={{
            width: 22,
            height: 2,
            background: 'var(--cream)',
            borderRadius: 2,
            transition: 'opacity 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: 22,
            height: 2,
            background: 'var(--cream)',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
          }} />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(26, 20, 16, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          zIndex: 999,
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            className="mobile-nav-link"
            onClick={() => handleNav(link.href)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '1rem 2rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: currentPage === link.href ? 700 : 400,
              color: currentPage === link.href ? 'var(--gold)' : 'var(--cream)',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  )
}
