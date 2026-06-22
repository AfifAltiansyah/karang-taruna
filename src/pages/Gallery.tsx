import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BatikBackground } from '../components/layout/BatikBackground'
import { galleryItems } from '../data/content'

function GalleryCard({ item, onClick }: {
  item: typeof galleryItems[0]
  onClick: () => void
}) {
  const ref = useScrollReveal<HTMLDivElement>({ direction: 'scale', distance: 20 })
  const colors = ['#BF6A4A', '#D4A853', '#1A3A3A', '#8D6E63', '#E8915A', '#5D3A31']
  const bgColor = colors[Number(item.id) % colors.length]

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: '4/3',
        background: bgColor,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        const overlay = e.currentTarget.querySelector('.gallery-overlay')
        if (overlay) (overlay as HTMLElement).style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
        const overlay = e.currentTarget.querySelector('.gallery-overlay')
        if (overlay) (overlay as HTMLElement).style.opacity = '0'
      }}
    >
      <BatikBackground variant="kawung" opacity={0.12} />
      <div
        className="gallery-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26, 19, 16, 0.85) 0%, transparent 60%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.25rem',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.25rem',
        }}>
          {item.category}
        </span>
        <span style={{
          color: 'var(--cream)',
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}>
          {item.title}
        </span>
      </div>
    </div>
  )
}

function Lightbox({ item, onClose }: {
  item: typeof galleryItems[0] | null
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null!)
  const contentRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (!item) return

    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(content, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 })

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  const colors = ['#BF6A4A', '#D4A853', '#1A3A3A', '#8D6E63', '#E8915A', '#5D3A31']
  const lightboxColor = colors[Number(item.id) % colors.length]

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(26, 19, 16, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 700,
          width: '100%',
          background: lightboxColor,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '4/3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BatikBackground variant="parang" opacity={0.1} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.5rem',
            display: 'block',
          }}>
            {item.category}
          </span>
          <h2 style={{
            color: 'var(--cream)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          }}>
            {item.title}
          </h2>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'var(--cream)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null)

  const pageStyle: React.CSSProperties = {
    paddingTop: 'calc(var(--header-height) + 40px)',
    position: 'relative',
  }

  return (
    <div>
      <section style={{
        ...pageStyle,
        background: 'linear-gradient(160deg, #1A1310, var(--sogan))',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        <BatikBackground variant="kawung" opacity={0.1} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '1rem', display: 'inline-block',
          }}>
            Galeri
          </span>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Dokumentasi <span style={{ color: 'var(--gold)' }}>Kegiatan</span>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: 600, margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Momen-momen berharga dalam setiap kegiatan dan program Karang Taruna.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {galleryItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setLightboxItem(item)}
              />
            ))}
          </div>
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  )
}
