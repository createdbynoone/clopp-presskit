'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollAnimationsInit() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Reveal all .scroll-trigger elements currently inside the viewport
    const revealVisible = () => {
      document.querySelectorAll<Element>('.scroll-trigger:not(.scroll-trigger--passed)').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('scroll-trigger--passed')
        }
      })
    }

    // Immediate pass for elements already in view on mount
    revealVisible()

    // Trigger animations once the fullpage snap has fully settled (no mid-scroll jump)
    window.addEventListener('fullpage:settled', revealVisible)

    // Pick up .scroll-trigger elements added later by dynamic imports
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
      mo.disconnect()
    }
  }, [pathname])

  return null
}
