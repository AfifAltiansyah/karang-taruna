import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SplitMode = 'chars' | 'words' | 'lines'

interface UseTextRevealOptions {
  mode?: SplitMode
  stagger?: number
  duration?: number
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  scrollTrigger?: boolean
  triggerHook?: number
  once?: boolean
  ease?: string
}

export function useTextReveal<T extends HTMLElement>(
  options: UseTextRevealOptions = {}
) {
  const ref = useRef<T>(null!)
  const {
    mode = 'words',
    stagger = 0.04,
    duration = 0.6,
    delay = 0,
    direction = 'up',
    distance = 40,
    scrollTrigger = true,
    triggerHook = 0.9,
    once = true,
    ease = 'power3.out',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const text = el.innerText

    const splitTag = 'span'

    const fragments = mode === 'lines'
      ? text.split('\n').filter(Boolean)
      : mode === 'words'
        ? text.split(' ').filter(Boolean)
        : text.split('').filter(c => c.trim() !== '')

    el.innerText = ''

    const fragMap: string[] = mode === 'lines' ? fragments as string[] : mode === 'words' ? fragments as string[] : fragments as string[]

    const spans = fragMap.map((f, i) => {
      const span = document.createElement(splitTag)
      span.textContent = mode === 'chars' ? f : (i < fragMap.length - 1 ? f + (mode === 'lines' ? '' : ' ') : f)
      span.style.display = 'inline-block'
      span.style.whiteSpace = mode === 'chars' ? 'pre' : 'pre-wrap'
      el.appendChild(span)
      return span
    })

    const fromDir = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
    }

    const vars: gsap.TweenVars = {
      opacity: 0,
      ...fromDir[direction],
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
    }

    if (scrollTrigger) {
      toVars.scrollTrigger = {
        trigger: el,
        start: `top ${triggerHook * 100}%`,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      }
    }

    gsap.fromTo(spans, vars, toVars)
  }, [mode, stagger, duration, delay, direction, distance, scrollTrigger, triggerHook, once, ease])

  return ref
}
