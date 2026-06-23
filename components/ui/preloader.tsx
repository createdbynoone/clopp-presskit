'use client'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [count, setCount] = useState(0)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let val = 0
    let rafId: number
    let crawlId: ReturnType<typeof setInterval>

    const animateTo = (target: number, onDone?: () => void) => {
      cancelAnimationFrame(rafId)
      const tick = () => {
        val = Math.min(val + Math.max(1, Math.ceil((target - val) * 0.18)), target)
        setCount(val)
        if (val < target) {
          rafId = requestAnimationFrame(tick)
        } else {
          onDone?.()
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const finish = () => {
      clearInterval(crawlId)
      animateTo(100, () => {
        setTimeout(() => {
          setFading(true)
          document.body.style.overflow = ''
          setTimeout(() => setGone(true), 750)
        }, 150)
      })
    }

    // Crawl randomly to 80 while the page loads
    crawlId = setInterval(() => {
      if (val < 80) animateTo(Math.min(val + Math.floor(Math.random() * 6 + 2), 80))
    }, 400)

    const onLoad = () => document.fonts.ready.then(finish)

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      clearInterval(crawlId)
      cancelAnimationFrame(rafId)
      window.removeEventListener('load', onLoad)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#A8CC10',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.75s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <span
        style={{
          fontFamily: 'NeueHaasDisplay, Helvetica Neue, Arial, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(36px, 8vw, 110px)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#000000',
          userSelect: 'none',
        }}
      >
        {count}%
      </span>
    </div>
  )
}
