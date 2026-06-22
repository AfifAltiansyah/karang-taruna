interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  style?: React.CSSProperties
}

const variants: Record<string, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, var(--terracotta), var(--warm-orange))',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    background: 'var(--sogan)',
    color: 'var(--cream)',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'var(--terracotta)',
    border: '2px solid var(--terracotta)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-body)',
    border: 'none',
  },
}

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '0.5rem 1.25rem', fontSize: '0.85rem' },
  md: { padding: '0.75rem 2rem', fontSize: '0.95rem' },
  lg: { padding: '1rem 2.5rem', fontSize: '1.05rem' },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  className = '',
  style,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all var(--transition)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        letterSpacing: '0.3px',
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'outline') {
          e.currentTarget.style.background = 'var(--terracotta)'
          e.currentTarget.style.color = '#fff'
        } else if (variant === 'ghost') {
          e.currentTarget.style.background = 'var(--cream-dark)'
        } else if (variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'outline') {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--terracotta)'
        } else if (variant === 'ghost') {
          e.currentTarget.style.background = 'transparent'
        } else if (variant === 'primary') {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = ''
        }
      }}
    >
      {children}
    </button>
  )
}
