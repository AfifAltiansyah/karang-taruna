import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { BatikBackground } from '../components/layout/BatikBackground'
import { visi, misi, sejarah, strukturPengurus } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function TimelineItem({ year, title, desc, index }: {
  year: string
  title: string
  desc: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const lineRef = useRef<HTMLDivElement>(null!)
  const isLeft = index % 2 === 0

  useEffect(() => {
    const el = ref.current
    const dot = lineRef.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' })
        .fromTo(el.querySelector('.timeline-card'), { opacity: 0, x: isLeft ? -40 : 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.1')
        .fromTo(el.querySelector('.timeline-year'), { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.5')

      return () => tl.kill()
    })

    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })

      return () => tl.kill()
    })

    return () => mm.revert()
  }, [isLeft])

  return (
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: isLeft ? 'row' : 'row-reverse',
      alignItems: 'center',
      gap: '2rem',
      position: 'relative',
    }}>
      <div style={{ flex: 1, textAlign: isLeft ? 'right' : 'left' }}>
        <span className="timeline-year" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          fontWeight: 700,
          color: 'var(--gold)',
          lineHeight: 1,
          display: 'block',
        }}>
          {year}
        </span>
      </div>
      <div ref={lineRef} style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'var(--terracotta)',
        border: '4px solid var(--cream)',
        boxShadow: '0 0 0 2px var(--terracotta)',
        flexShrink: 0,
        zIndex: 2,
      }} />
      <div className="timeline-card" style={{ flex: 1 }}>
        <div style={{
          background: 'var(--bg-white)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid rgba(62, 39, 35, 0.06)',
        }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{title}</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0, lineHeight: 1.7 }}>{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const visiRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 40 })
  const misiRef = useScrollReveal<HTMLDivElement>({ direction: 'right', distance: 40 })
  const strukturRef = useScrollReveal<HTMLDivElement>({ direction: 'up', distance: 30, stagger: 0.08 })

  useEffect(() => {
    const line = document.querySelector('.timeline-line')
    const container = document.querySelector('.timeline-container')
    if (!line || !container) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const anim = gsap.fromTo(line, { scaleY: 0, transformOrigin: 'top center' }, {
        scaleY: 1, duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      })
      return () => { anim.kill(); anim.scrollTrigger?.kill() }
    })

    return () => mm.revert()
  }, [])

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
            Tentang Kami
          </span>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Mengenal <span style={{ color: 'var(--gold)' }}>Karang Taruna</span>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: 600, margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Organisasi kepemudaan yang tumbuh dari kesadaran dan rasa tanggung jawab sosial untuk masyarakat.
          </p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="section batik-corner" style={{ background: 'var(--bg-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            <div ref={visiRef}>
              <SectionTitle
                subtitle="Visi"
                title="Visi Kami"
                align="left"
                description={visi}
              />
            </div>
            <div ref={misiRef}>
              <SectionTitle
                subtitle="Misi"
                title="Misi Kami"
                align="left"
              />
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {misi.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-section-alt)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                  }}>
                    <span style={{
                      color: 'var(--gold)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      width: 24,
                      textAlign: 'center',
                    }}>
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah Timeline */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            subtitle="Sejarah"
            title="Perjalanan Kami"
            description="Dari tahun 1980 hingga kini, Karang Taruna terus berkembang dan berkontribusi untuk masyarakat."
          />

          <div className="timeline-container" style={{
            position: 'relative',
            maxWidth: 800,
            margin: '0 auto',
            padding: '2rem 0',
          }}>
            <div className="timeline-line" style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, var(--gold), var(--terracotta), var(--gold))',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {sejarah.map((item, i) => (
                <TimelineItem key={item.year} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="section">
        <div className="container">
          <SectionTitle
            subtitle="Struktur Organisasi"
            title="Kepengurusan"
            description="Struktur kepengurusan Karang Taruna masa bakti 2024-2026"
          />

          <div ref={strukturRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: 800,
            margin: '0 auto',
          }}>
            {strukturPengurus.map((p) => (
              <div key={p.jabatan} style={{
                background: 'var(--bg-section-alt)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                border: '1px solid rgba(62, 39, 35, 0.06)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--terracotta)',
                  marginBottom: '0.4rem',
                }}>
                  {p.jabatan}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                }}>
                  {p.nama}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
