import { useScrollReveal } from '../../hooks/useScrollReveal'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  hover?: boolean
  reveal?: 'up' | 'left' | 'right' | 'scale'
  onClick?: () => void
}

export function Card({
  children,
  className = '',
  style,
  hover = true,
  reveal = 'up',
  onClick,
}: CardProps) {
  const ref = useScrollReveal<HTMLDivElement>({ direction: reveal, distance: 50 })

  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onClick={onClick}
      style={{
        background: 'var(--bg-white)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(62, 39, 35, 0.06)',
        transition: 'transform var(--transition), box-shadow var(--transition)',
        cursor: onClick ? 'pointer' : undefined,
        ...(hover ? {
          '--hover-y': '-6px',
          '--hover-shadow': 'var(--shadow-md)',
        } as React.CSSProperties : {}),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hover) return
        e.currentTarget.style.transform = `translateY(var(--hover-y, -4px))`
        e.currentTarget.style.boxShadow = 'var(--hover-shadow, var(--shadow-md))'
      }}
      onMouseLeave={(e) => {
        if (!hover) return
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {children}
    </div>
  )
}
