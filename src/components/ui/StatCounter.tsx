import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

export function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const { ref, numRef } = useAnimatedCounter({ value })

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 700,
        color: 'var(--gold)',
        lineHeight: 1.1,
      }}>
        <span ref={numRef}>0</span>
        {suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        color: 'var(--text-light)',
        fontWeight: 500,
        marginTop: '0.4rem',
      }}>
        {label}
      </div>
    </div>
  )
}
