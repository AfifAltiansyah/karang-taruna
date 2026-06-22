import { useScrollReveal } from '../hooks/useScrollReveal'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { SectionTitle } from '../components/ui/SectionTitle'
import { BatikBackground } from '../components/layout/BatikBackground'
import { newsItems } from '../data/content'

export default function News() {
  const featuredRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 40 })
  const listRef = useScrollReveal<HTMLDivElement>({ direction: 'up', distance: 30, stagger: 0.08 })

  const featured = newsItems[0]
  const rest = newsItems.slice(1)

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
            Berita
          </span>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Berita & <span style={{ color: 'var(--gold)' }}>Informasi</span>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: 600, margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Ikuti perkembangan dan informasi terbaru seputar kegiatan Karang Taruna.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section">
        <div className="container">
          <SectionTitle
            subtitle="Berita Utama"
            title="Sorotan"
            align="left"
          />

          <div ref={featuredRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            background: 'var(--bg-section-alt)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid rgba(62, 39, 35, 0.06)',
          }}>
            <div style={{
              minHeight: 300,
              background: 'linear-gradient(135deg, var(--terracotta), var(--warm-orange))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <BatikBackground variant="kawung" opacity={0.1} />
              <span style={{
                position: 'relative',
                zIndex: 1,
                fontSize: '0.9rem',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}>
                Featured
              </span>
            </div>
            <div style={{ padding: '2rem' }}>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--terracotta)',
                fontWeight: 500,
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                {featured.date} · {featured.category}
              </span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{featured.title}</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {featured.excerpt}
              </p>
              <Button variant="outline" style={{ marginTop: '1rem' }}>
                Baca Selengkapnya →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            subtitle="Berita Lainnya"
            title="Artikel Terbaru"
          />

          <div ref={listRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {rest.map((item) => (
              <Card key={item.id} hover reveal="up">
                <div style={{
                  width: '100%',
                  height: 160,
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, var(--cream-dark), var(--cream))',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <BatikBackground variant="kawung" opacity={0.08} />
                  <span style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: '0.8rem',
                    color: 'var(--sogan-muted)',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}>
                    {item.category}
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--terracotta)', fontWeight: 500 }}>
                  {item.date}
                </span>
                <h3 style={{ fontSize: '1.1rem', marginTop: '0.4rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', margin: 0, lineHeight: 1.7 }}>
                  {item.excerpt}
                </p>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Button variant="outline">Muat Lebih Banyak →</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
