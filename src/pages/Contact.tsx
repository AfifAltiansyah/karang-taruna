import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Button } from '../components/ui/Button'
import { BatikBackground } from '../components/layout/BatikBackground'
import { contactInfo } from '../data/content'

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Terima kasih! Pesan Anda telah terkirim.')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    border: '1px solid rgba(62, 39, 35, 0.12)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-white)',
    color: 'var(--text-dark)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nama Lengkap"
          required
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 168, 83, 0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(62, 39, 35, 0.12)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 168, 83, 0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(62, 39, 35, 0.12)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>
      <input
        type="text"
        placeholder="Subjek"
        required
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--gold)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 168, 83, 0.15)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(62, 39, 35, 0.12)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      <textarea
        placeholder="Tulis pesan Anda..."
        required
        rows={5}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--gold)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 168, 83, 0.15)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(62, 39, 35, 0.12)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      <Button type="submit" variant="primary" size="lg" style={{ alignSelf: 'flex-start' }}>
        Kirim Pesan →
      </Button>
    </form>
  )
}

export default function Contact() {
  const formRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 40 })
  const infoRef = useScrollReveal<HTMLDivElement>({ direction: 'right', distance: 40 })

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
            Kontak
          </span>
          <h1 style={{ color: 'var(--cream)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Hubungi <span style={{ color: 'var(--gold)' }}>Kami</span>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: 600, margin: '1rem auto 0', fontSize: '1.05rem' }}>
            Punya pertanyaan, saran, atau ingin bergabung? Silakan hubungi kami melalui form di bawah ini.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            <div ref={formRef}>
              <SectionTitle
                subtitle="Kirim Pesan"
                title="Ada yang bisa kami bantu?"
                align="left"
                description="Tim kami akan merespons pesan Anda dalam 1-2 hari kerja."
              />
              <ContactForm />
            </div>

            <div ref={infoRef}>
              <SectionTitle
                subtitle="Informasi"
                title="Kontak & Alamat"
                align="left"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Alamat', value: contactInfo.alamat },
                  { label: 'Email', value: contactInfo.email },
                  { label: 'Telepon', value: contactInfo.telepon },
                  { label: 'WhatsApp', value: contactInfo.whatsapp },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '1rem',
                    background: 'var(--bg-section-alt)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(62, 39, 35, 0.06)',
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--gold), var(--terracotta))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                    }}>
                      {item.label[0]}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'var(--terracotta)',
                        marginBottom: '0.2rem',
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        color: 'var(--text-dark)',
                        fontWeight: 500,
                      }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div style={{
                marginTop: '2rem',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid rgba(62, 39, 35, 0.06)',
                background: 'var(--bg-section-alt)',
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <BatikBackground variant="parang" opacity={0.06} />
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                }}>
                  📍 Peta Lokasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
