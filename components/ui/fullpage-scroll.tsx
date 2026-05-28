'use client'
import { useEffect, useRef } from 'react'

export function FullpageScroll() {
  const idx = useRef(0)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll('main > section'))

    const goTo = (target: number) => {
      const secs = getSections()
      if (target < 0 || target >= secs.length) return
      idx.current = target
      secs[target].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const syncIdx = () => {
      const secs = getSections()
      const mid = window.scrollY + window.innerHeight * 0.4
      let best = 0
      for (let i = 0; i < secs.length; i++) {
        if (secs[i].offsetTop <= mid) best = i
      }
      idx.current = best
    }

    // Dispatch fullpage:settled once the snap animation finishes
    let fallbackTimer: ReturnType<typeof setTimeout>
    const dispatchSettled = () => window.dispatchEvent(new Event('fullpage:settled'))

    const hasScrollEnd = 'onscrollend' in window

    const onScrollEnd = () => { syncIdx(); dispatchSettled() }
    const onScroll = () => {
      syncIdx()
      if (!hasScrollEnd) {
        clearTimeout(fallbackTimer)
        fallbackTimer = setTimeout(dispatchSettled, 200)
      }
    }

    if (hasScrollEnd) {
      window.addEventListener('scrollend', onScrollEnd, { passive: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault(); goTo(idx.current + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goTo(idx.current - 1)
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      if (hasScrollEnd) window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return null
}
