import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
}

export function useScrollParallax<T extends HTMLElement>(
  options: UseScrollParallaxOptions = {}
) {
  const ref = useRef<T>(null!)
  const { speed = 0.5, direction = 'vertical' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prop = direction === 'vertical' ? 'y' : 'x'

    const anim = gsap.to(el, {
      [prop]: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      anim.kill()
      anim.scrollTrigger?.kill()
    }
  }, [speed, direction])

  return ref
}

interface UseMouseParallaxOptions {
  factor?: number
  duration?: number
}

export function useMouseParallax<T extends HTMLElement>(
  options: UseMouseParallaxOptions = {}
) {
  const ref = useRef<T>(null!)
  const { factor = 0.03, duration = 0.8 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration, ease: 'power3.out' })

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * factor
      const dy = (e.clientY - cy) * factor
      xTo(dx)
      yTo(dy)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      xTo(0)
      yTo(0)
    }
  }, [factor, duration])

  return ref
}

interface UseRevealParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  triggerHook?: number
  duration?: number
}

export function useRevealParallax<T extends HTMLElement>(
  options: UseRevealParallaxOptions = {}
) {
  const ref = useRef<T>(null!)
  const { speed = 0.3, direction = 'vertical', duration = 0.8 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prop = direction === 'vertical' ? 'y' : 'x'
    const dist = speed * 200

    const anim = gsap.fromTo(el,
      { opacity: 0, [prop]: dist },
      {
        opacity: 1,
        [prop]: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      anim.kill()
      anim.scrollTrigger?.kill()
    }
  }, [speed, direction, duration])

  return ref
}

export function useParallaxGroup<T extends HTMLElement>(
  layers: { speed: number }[]
) {
  const refs = useRef<(T | null)[]>([])

  useEffect(() => {
    const anims = refs.current.map((el, i) => {
      if (!el) return null
      return gsap.to(el, {
        y: `${layers[i].speed * 100}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }).filter(Boolean)

    return () => {
      anims.forEach(a => { a?.kill(); a?.scrollTrigger?.kill() })
    }
  }, [layers])

  const setRef = useCallback((i: number) => (el: T | null) => {
    refs.current[i] = el
  }, [])

  return setRef
}
