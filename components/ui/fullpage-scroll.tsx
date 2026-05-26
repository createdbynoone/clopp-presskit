'use client'
import { useEffect, useRef } from 'react'

export function FullpageScroll() {
  const locked = useRef(false)
  const idx = useRef(0)

  useEffect(() => {
    // Always start at the top — disable browser scroll restoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll('main > section'))

    const goTo = (target: number) => {
      const secs = getSections()
      if (target < 0 || target >= secs.length || locked.current) return
      locked.current = true
      idx.current = target
      window.scrollTo({ top: secs[target].offsetTop, behavior: 'smooth' })
      setTimeout(() => { locked.current = false }, 900)
    }

    // Sync idx when scrolling via nav links or browser back/forward
    const syncIdx = () => {
      if (locked.current) return
      const secs = getSections()
      const mid = window.scrollY + window.innerHeight * 0.4
      let best = 0
      for (let i = 0; i < secs.length; i++) {
        if (secs[i].offsetTop <= mid) best = i
      }
      idx.current = best
    }

    const onWheel = (e: WheelEvent) => {
      if (locked.current) { e.preventDefault(); return }

      const secs = getSections()
      const cur = secs[idx.current]
      if (!cur) return

      const vh = window.innerHeight
      const sy = window.scrollY
      // Section content taller than viewport — only intercept at boundaries
      const fits = cur.offsetHeight <= vh + 60
      const atBottom = sy + vh >= cur.offsetTop + cur.offsetHeight - 50
      const atTop = sy <= cur.offsetTop + 50

      if (e.deltaY > 0 && (fits || atBottom)) {
        e.preventDefault()
        goTo(idx.current + 1)
      } else if (e.deltaY < 0 && (fits || atTop)) {
        e.preventDefault()
        goTo(idx.current - 1)
      }
    }

    // Touch support
    let touchY = 0
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 60) return
      const secs = getSections()
      const cur = secs[idx.current]
      if (!cur) return
      const vh = window.innerHeight
      const sy = window.scrollY
      const fits = cur.offsetHeight <= vh + 60
      const atBottom = sy + vh >= cur.offsetTop + cur.offsetHeight - 50
      const atTop = sy <= cur.offsetTop + 50
      if (delta > 0 && (fits || atBottom)) goTo(idx.current + 1)
      else if (delta < 0 && (fits || atTop)) goTo(idx.current - 1)
    }

    // Keyboard navigation
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault(); goTo(idx.current + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goTo(idx.current - 1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', syncIdx, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', syncIdx)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return null
}
