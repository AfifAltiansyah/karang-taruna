import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Card } from '../components/ui/Card'
import { BatikBackground } from '../components/layout/BatikBackground'
import { programs } from '../data/content'

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null!)

  const filtered = activeFilter
    ? programs.filter((p) => p.bidang === activeFilter)
    : programs

  const allBidang = programs.map((p) => p.bidang)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.program-card')
    if (!cards.length) return

    gsap.fromTo(cards,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power3.out' }
    )
  }, [filtered])

  const pageStyle: React.CSSProperties = {
    paddingTop: 'calc(var(--header-height) + 40px)',
    position: 'relative',
  }

  return (
    <div>
      {/* Header */}
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
            Program
          </span>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Bidang <span style={{ color: 'var(--gold)' }}>Kegiatan</span>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: 600, margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Tujuh bidang kegiatan yang menjadi fokus pengembangan generasi muda di Karang Taruna.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '2rem 0', background: 'var(--bg-section-alt)', borderBottom: '1px solid rgba(62, 39, 35, 0.06)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
          }}>
            <button
              onClick={() => setActiveFilter(null)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                border: '1px solid rgba(62, 39, 35, 0.12)',
                background: activeFilter === null ? 'var(--sogan)' : 'transparent',
                color: activeFilter === null ? 'var(--cream)' : 'var(--text-body)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Semua
            </button>
            {allBidang.map((bidang) => (
              <button
                key={bidang}
                onClick={() => setActiveFilter(bidang)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '50px',
                  border: '1px solid rgba(62, 39, 35, 0.12)',
                  background: activeFilter === bidang ? 'var(--sogan)' : 'transparent',
                  color: activeFilter === bidang ? 'var(--cream)' : 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {bidang}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="section batik-corner" style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <div ref={gridRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map((prog, i) => (
              <Card key={prog.id} className="program-card" reveal={i % 3 === 0 ? 'left' : i % 3 === 1 ? 'up' : 'right'} hover>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontSize: '1.8rem',
                      lineHeight: 1,
                    }}>
                      {prog.icon}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{prog.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0, lineHeight: 1.7 }}>
                    {prog.desc}
                  </p>
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(62, 39, 35, 0.06)',
                  }}>
                    <p style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--terracotta)',
                      marginBottom: '0.5rem',
                    }}>
                      Kegiatan Unggulan:
                    </p>
                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}>
                      {prog.activities.map((act) => (
                        <li key={act} style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-light)',
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}>
                          <span style={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            background: 'var(--gold)',
                            display: 'inline-block',
                            flexShrink: 0,
                          }} />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
