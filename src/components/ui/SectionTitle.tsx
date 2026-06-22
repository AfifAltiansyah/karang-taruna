import { useScrollReveal } from '../../hooks/useScrollReveal'

interface SectionTitleProps {
  subtitle?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionTitle({ subtitle, title, description, align = 'center', className = '' }: SectionTitleProps) {
  const ref = useScrollReveal<HTMLDivElement>({ direction: 'up', distance: 40 })

  return (
    <div
      ref={ref}
      className={`section-title ${className}`}
      style={{ textAlign: align, marginBottom: '3rem' }}
    >
      {subtitle && (
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--terracotta)',
          marginBottom: '0.75rem',
        }}>
          {subtitle}
        </span>
      )}
      <h2>{title}</h2>
      <div className="gold-line" style={{
        margin: align === 'center' ? '12px auto 0' : '12px 0 0',
      }} />
      {description && (
        <p style={{
          marginTop: '1.25rem',
          maxWidth: '640px',
          color: 'var(--text-light)',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
        }}>
          {description}
        </p>
      )}
    </div>
  )
}
