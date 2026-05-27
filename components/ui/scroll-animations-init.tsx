'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollAnimationsInit() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-trigger--passed')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0 }
    )

    const observeEl = (el: Element) => {
      if (el.classList.contains('scroll-trigger--passed')) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('scroll-trigger--passed')
      } else {
        io.observe(el)
      }
    }

    // Observe elements already in the DOM (SSR + eagerly loaded components)
    document.querySelectorAll('.scroll-trigger').forEach(observeEl)

    // Watch for elements added later (dynamic imports resolving after this effect runs)
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue
          if (node.classList.contains('scroll-trigger')) observeEl(node)
          node.querySelectorAll('.scroll-trigger').forEach(observeEl)
        }
      }
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
