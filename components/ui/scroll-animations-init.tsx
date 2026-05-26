'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollAnimationsInit() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-trigger--passed')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0 }
    )

    document.querySelectorAll('.scroll-trigger').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
