import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale'

interface UseScrollRevealOptions {
  direction?: RevealDirection
  distance?: number
  rotation?: number
  scale?: number
  blur?: number
  skewX?: number
  skewY?: number
  delay?: number
  duration?: number
  stagger?: number | 'random'
  triggerHook?: number
  once?: boolean
  ease?: string
  toggleActions?: string
  disableMobile?: boolean
}

function getInitial(direction: RevealDirection, distance: number) {
  switch (direction) {
    case 'up': return { y: distance }
    case 'down': return { y: -distance }
    case 'left': return { x: distance }
    case 'right': return { x: -distance }
    case 'scale': return { scale: 0.9 }
  }
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null!)
  const {
    direction = 'up',
    distance = 60,
    rotation = 0,
    scale = 1,
    blur = 0,
    skewX = 0,
    skewY = 0,
    delay = 0,
    duration = 0.8,
    stagger = 0,
    triggerHook = 0.85,
    once = true,
    ease = 'power3.out',
    toggleActions,
    disableMobile = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add(
      disableMobile ? '(min-width: 768px)' : 'all',
      () => {
        const isStagger = stagger !== 0 && el.children.length > 0
        const targets = isStagger ? el.children : el
        const actualStagger = stagger === 'random'
          ? gsap.utils.random(0.02, 0.15, 0.02)
          : stagger

        const fromVars: gsap.TweenVars = {
          opacity: 0,
          ...getInitial(direction, distance),
          ...(rotation ? { rotation } : {}),
          ...(scale !== 1 ? { scale } : {}),
          ...(blur ? { filter: `blur(${blur}px)` } : {}),
          ...(skewX ? { skewX } : {}),
          ...(skewY ? { skewY } : {}),
        }

        const toVars: gsap.TweenVars = {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px)',
          skewX: 0,
          skewY: 0,
          duration,
          delay,
          stagger: isStagger ? actualStagger : 0,
          ease,
          scrollTrigger: {
            trigger: el,
            start: `top ${triggerHook * 100}%`,
            toggleActions: toggleActions ?? (once ? 'play none none none' : 'play none none reset'),
          },
        }

        const anim = gsap.fromTo(targets, fromVars, toVars)

        return () => {
          anim.kill()
          anim.scrollTrigger?.kill()
        }
      }
    )

    return () => mm.revert()
  }, [direction, distance, rotation, scale, blur, skewX, skewY, delay, duration, stagger, triggerHook, once, ease, toggleActions, disableMobile])

  return ref
}
