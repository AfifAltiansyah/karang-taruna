import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTitle } from '../components/ui/SectionTitle'
import { StatCounter } from '../components/ui/StatCounter'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { BatikBackground } from '../components/layout/BatikBackground'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTextReveal } from '../hooks/useTextReveal'
import { useScrollParallax, useMouseParallax } from '../hooks/useParallax'
import { stats, programs, newsItems, siteConfig } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null!)
  const programsRef = useRef<HTMLDivElement>(null!)
  const statsRef = useRef<HTMLDivElement>(null!)

  const heroTitleRef = useTextReveal<HTMLHeadingElement>({
    mode: 'words', stagger: 0.06, direction: 'up', distance: 50, scrollTrigger: false,
  })

  const parallaxLayer1 = useScrollParallax<HTMLDivElement>({ speed: -0.2 })
  const parallaxLayer2 = useScrollParallax<HTMLDivElement>({ speed: -0.15 })
  const mouseBatik1 = useMouseParallax<HTMLDivElement>({ factor: 0.025 })
  const mouseBatik2 = useMouseParallax<HTMLDivElement>({ factor: -0.02 })

  const sectionRef = useScrollReveal<HTMLDivElement>({ direction: 'up', distance: 30, stagger: 0.1 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 })
        .from('.hero-title-line', { y: 80, opacity: 0, stagger: 0.15, duration: 1 }, '-=0.3')
        .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2')
        .from('.hero-float', { scale: 0, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(2)' }, '-=0.4')
    }, heroContentRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!programsRef.current) return
    const cards = programsRef.current.querySelectorAll('.program-highlight-card')
    cards.forEach((card, i) => {
      const dir = i % 2 === 0 ? -60 : 60
      gsap.fromTo(card, { opacity: 0, x: dir }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const counters = statsRef.current.querySelectorAll('.stat-item')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
    tl.from(counters, { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: 'power3.out' })
  }, [])

  const heroStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(160deg, #1A1310 0%, #2C1810 30%, #3E2723 60%, #1A3A3A 100%)',
  }

  const floatStyle = (i: number): React.CSSProperties => ({
    position: 'absolute',
    width: i % 2 === 0 ? 120 : 80,
    height: i % 2 === 0 ? 120 : 80,
    borderRadius: '50%',
    background: i === 0
      ? 'radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(239,83,80,0.08) 0%, transparent 70%)',
    top: `${20 + i * 25}%`,
    left: `${10 + i * 30}%`,
    pointerEvents: 'none',
    filter: 'blur(20px)',
  })

  return (
    <>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div ref={parallaxLayer1}>
          <BatikBackground variant="kawung" opacity={0.15} />
        </div>
        <div ref={parallaxLayer2}>
          <BatikBackground variant="parang" opacity={0.08}
            style={{ backgroundPosition: '40px 0' }} />
        </div>

        <div ref={mouseBatik1} style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        }}>
          <BatikBackground variant="nitik" opacity={0.04} />
        </div>

        <div ref={mouseBatik2} style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)',
          top: '15%', right: '10%',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(212, 168, 83, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(191, 106, 74, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {[0, 1, 2].map((i) => (
          <div key={i} className="hero-float" style={floatStyle(i)} />
        ))}

        <div ref={heroContentRef} className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="hero-badge" style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
            padding: '0.5rem 1.5rem',
            border: '1px solid rgba(212, 168, 83, 0.25)',
            borderRadius: '50px',
          }}>
            Organisasi Kepemudaan
          </span>

          <h1 ref={heroTitleRef} style={{
            color: 'var(--cream)',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}>
            <span className="hero-title-line" style={{ display: 'block' }}>{siteConfig.name}</span>
            <span className="hero-title-line" style={{
              display: 'block',
              background: 'linear-gradient(135deg, var(--gold), var(--terracotta), var(--warm-orange))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {siteConfig.tagline}
            </span>
          </h1>

          <p className="hero-desc" style={{
            color: 'rgba(245,240,232,0.7)',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            maxWidth: 600,
            margin: '1.5rem auto 2.5rem',
            lineHeight: 1.8,
          }}>
            {siteConfig.description}
          </p>

          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg">Jelajahi Program Kami →</Button>
            <Button variant="outline" size="lg"
              style={{ borderColor: 'rgba(245,240,232,0.3)', color: 'var(--cream)' }}>
              Tentang Kami
            </Button>
          </div>

          <div className="hero-scroll" style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Scroll
            </span>
            <div style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
            }} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section" style={{
        background: 'var(--teal)',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <BatikBackground variant="nitik" opacity={0.06} />
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>
      </section>

      {/* Programs Highlights */}
      <section className="section batik-corner">
        <div className="container">
          <SectionTitle
            subtitle="Program Unggulan"
            title="Bidang Kegiatan Kami"
            description="Karang Taruna memiliki 7 bidang kegiatan yang menjadi fokus pengembangan generasi muda"
          />
          <div ref={programsRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {programs.slice(0, 4).map((prog, i) => (
              <Card key={prog.id} reveal={i % 2 === 0 ? 'left' : 'right'} hover>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{prog.icon}</span>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{prog.bidang}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0, lineHeight: 1.7 }}>{prog.desc}</p>
                </div>
              </Card>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Button variant="outline">Lihat Semua Program →</Button>
          </div>
        </div>
      </section>

      {/* News Highlights */}
      <section className="section section-alt batik-pattern-bg">
        <div className="container">
          <SectionTitle
            subtitle="Berita Terbaru"
            title="Kegiatan & Informasi"
            description="Ikuti perkembangan kegiatan dan program Karang Taruna melalui berita terbaru"
          />

          <div ref={sectionRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {newsItems.slice(0, 3).map((item, i) => {
              const directions: Array<'left' | 'right' | 'up'> = ['left', 'up', 'right']
              return (
                <Card key={item.id} reveal={directions[i]} hover>
                  <div style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, var(--cream-dark), var(--cream))',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--sogan-muted)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <BatikBackground variant="kawung" opacity={0.1} />
                    <span style={{ position: 'relative', zIndex: 1 }}>{item.category}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--terracotta)', fontWeight: 500 }}>
                      {item.date}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', margin: 0, lineHeight: 1.4 }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', margin: 0, lineHeight: 1.7 }}>
                      {item.excerpt}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Button variant="outline">Lihat Semua Berita →</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, var(--teal), var(--sogan))',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <BatikBackground variant="parang" opacity={0.06} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: 'var(--cream)', marginBottom: '1rem', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Bergabunglah Bersama Kami
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: 500, margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Jadilah bagian dari generasi muda yang peduli dan berkontribusi untuk masyarakat.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg">Hubungi Kami</Button>
            <Button variant="outline" size="lg"
              style={{ borderColor: 'rgba(245,240,232,0.3)', color: 'var(--cream)' }}>
              Daftar Menjadi Anggota
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
