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

    if (hasScrollEnd) window.addEventListener('scrollend', onScrollEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault(); goTo(idx.current + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goTo(idx.current - 1)
      }
    }
    window.addEventListener('keydown', onKey)

    // Touch snap — passive listeners so the browser can retract the chrome naturally.
    // On touchend we programmatically scroll to the target section, overriding momentum.
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    let touchStartY = 0
    let touchStartTime = 0
    let touchStartIdx = 0

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
      touchStartIdx = idx.current
    }

    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY
      const elapsed = Date.now() - touchStartTime
      const velocity = Math.abs(deltaY) / elapsed

      if (Math.abs(deltaY) > 30 || velocity > 0.2) {
        goTo(touchStartIdx + (deltaY > 0 ? 1 : -1))
      } else {
        goTo(touchStartIdx)
      }
    }

    if (isTouch) {
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchend', onTouchEnd, { passive: true })
    }

    // Wheel snap for desktop (non-touch)
    let wheelLocked = false
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (wheelLocked) return
      wheelLocked = true
      goTo(idx.current + (e.deltaY > 0 ? 1 : -1))
      setTimeout(() => { wheelLocked = false }, 900)
    }

    if (!isTouch) {
      window.addEventListener('wheel', onWheel, { passive: false })
    }

    return () => {
      if (hasScrollEnd) window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      if (isTouch) {
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchend', onTouchEnd)
      }
      if (!isTouch) {
        window.removeEventListener('wheel', onWheel)
      }
      clearTimeout(fallbackTimer)
    }
  }, [])

  return null
}
