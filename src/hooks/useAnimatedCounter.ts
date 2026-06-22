import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseAnimatedCounterOptions {
  value: number
  duration?: number
  ease?: string
  once?: boolean
  formatValue?: (v: number) => string
  scrollTrigger?: boolean
  scrollHook?: number
}

export function useAnimatedCounter(options: UseAnimatedCounterOptions) {
  const ref = useRef<HTMLDivElement>(null!)
  const numRef = useRef<HTMLSpanElement>(null!)
  const { value, duration = 2, ease = 'power2.out', once = true, scrollTrigger = true, scrollHook = 0.85 } = options

  useEffect(() => {
    const el = ref.current
    const numEl = numRef.current
    if (!el || !numEl) return

    const vars: gsap.TweenVars = {
      textContent: value,
      duration,
      ease,
      snap: { textContent: 1 },
    }

    if (scrollTrigger) {
      vars.scrollTrigger = {
        trigger: el,
        start: `top ${scrollHook * 100}%`,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      }
    }

    const anim = gsap.fromTo(numEl, { textContent: 0 }, vars)

    return () => {
      anim.kill()
      anim.scrollTrigger?.kill()
    }
  }, [value, duration, ease, once, scrollTrigger, scrollHook])

  return { ref, numRef }
}
