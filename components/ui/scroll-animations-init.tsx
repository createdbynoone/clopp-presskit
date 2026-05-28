'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollAnimationsInit() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const revealVisible = () => {
      document.querySelectorAll<Element>('.scroll-trigger:not(.scroll-trigger--passed)').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('scroll-trigger--passed')
        }
      })
    }

    revealVisible()
    window.addEventListener('fullpage:settled', revealVisible)

    // Debounced scroll fallback — covers mobile JS snap where fullpage:settled
    // may fire before the section is fully in view
    let revealTimer: ReturnType<typeof setTimeout>
    const onScrollReveal = () => {
      clearTimeout(revealTimer)
      revealTimer = setTimeout(revealVisible, 200)
    }
    window.addEventListener('scroll', onScrollReveal, { passive: true })

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue
          if (
            node.classList.contains('scroll-trigger') ||
            node.querySelector('.scroll-trigger')
          ) {
            revealVisible()
            return
          }
        }
      }
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('fullpage:settled', revealVisible)
      window.removeEventListener('scroll', onScrollReveal)
      mo.disconnect()
      clearTimeout(revealTimer)
    }
  }, [pathname])

  return null
}
