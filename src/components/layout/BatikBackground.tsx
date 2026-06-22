interface BatikBackgroundProps {
  variant?: 'kawung' | 'parang' | 'nitik'
  opacity?: number
  className?: string
  style?: React.CSSProperties
}

const patterns = {
  kawung: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E2723' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  parang: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233E2723' fill-opacity='0.03'%3E%3Cpath d='M0 10 L10 0 L20 10 L30 0 L40 10 L40 15 L30 25 L20 15 L10 25 L0 15 Z'/%3E%3Cpath d='M0 25 L10 15 L20 25 L30 15 L40 25 L40 40 L30 40 L20 30 L10 40 L0 40 Z'/%3E%3C/g%3E%3C/svg%3E")`,
  nitik: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='10' height='10' fill='%233E2723' fill-opacity='0.04' rx='2'/%3E%3Crect x='18' y='2' width='10' height='10' fill='%233E2723' fill-opacity='0.04' rx='2'/%3E%3Crect x='10' y='18' width='10' height='10' fill='%233E2723' fill-opacity='0.04' rx='2'/%3E%3C/svg%3E")`,
}

export function BatikBackground({
  variant = 'kawung',
  opacity = 1,
  className = '',
  style,
}: BatikBackgroundProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: patterns[variant],
        backgroundRepeat: 'repeat',
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  )
}
