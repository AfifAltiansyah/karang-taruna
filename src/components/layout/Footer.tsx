import { contactInfo, navLinks, siteConfig } from '../../data/content'

type Page = '/' | '/tentang' | '/program' | '/galeri' | '/berita' | '/kontak'

interface FooterProps {
  onNavigate: (path: Page) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (href: string) => {
    onNavigate(href as Page)
  }

  return (
    <footer
      style={{
        background: 'var(--sogan)',
        color: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F0E8' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--terracotta))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.8rem',
                color: '#fff',
              }}>
                KT
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--cream)',
              }}>
                {siteConfig.name}
              </span>
            </div>
            <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: 300 }}>
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Navigasi
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(245,240,232,0.7)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    padding: 0,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.7)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Kontak
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.88rem', margin: 0 }}>{contactInfo.alamat}</p>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.88rem', margin: 0 }}>{contactInfo.email}</p>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.88rem', margin: 0 }}>{contactInfo.telepon}</p>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Media Sosial
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Instagram', value: contactInfo.social.instagram },
                { label: 'YouTube', value: contactInfo.social.youtube },
                { label: 'Facebook', value: contactInfo.social.facebook },
                { label: 'TikTok', value: contactInfo.social.tiktok },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.85rem', minWidth: 70 }}>{s.label}</span>
                  <span style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.88rem' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(245,240,232,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.8rem', margin: 0 }}>
            Semangat Muda, Peduli Sosial
          </p>
        </div>
      </div>
    </footer>
  )
}
