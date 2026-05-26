'use client'

import { useState, useEffect, useRef, useCallback, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrambleOnView } from '@/components/ui/scramble-on-view'

gsap.registerPlugin(ScrambleTextPlugin)

// ── Types ──────────────────────────────────────────────────────────────────

export type Release = {
  id: number
  artist: string
  album: string
  category: string
  label: string
  year: string
  image?: string
}

export type PortfolioConfig = {
  timeZone?: string
  timeUpdateInterval?: number
  idleDelay?: number
}

// ── TimeDisplay ─────────────────────────────────────────────────────────────

function TimeDisplay({ config }: { config: PortfolioConfig }) {
  const [time, setTime] = useState({ hours: '', minutes: '', dayPeriod: '' })

  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: config.timeZone ?? 'Europe/Madrid',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
      const parts = formatter.formatToParts(new Date())
      setTime({
        hours:     parts.find(p => p.type === 'hour')?.value     ?? '',
        minutes:   parts.find(p => p.type === 'minute')?.value   ?? '',
        dayPeriod: parts.find(p => p.type === 'dayPeriod')?.value ?? '',
      })
    }
    update()
    const id = setInterval(update, config.timeUpdateInterval ?? 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <time className="corner-item bottom-right" id="current-time">
      {time.hours}<span className="time-blink">:</span>{time.minutes} {time.dayPeriod}
    </time>
  )
}

// ── ProjectItem ─────────────────────────────────────────────────────────────

type ItemProps = {
  project: Release
  index: number
  onMouseEnter: (index: number, imageUrl: string) => void
  onMouseLeave: () => void
  isActive: boolean
  isIdle: boolean
}

const ProjectItem = forwardRef<HTMLLIElement, ItemProps>(function ProjectItem(
  { project, index, onMouseEnter, onMouseLeave, isActive, isIdle },
  ref,
) {
  const textRefs = {
    artist:   useRef<HTMLSpanElement>(null),
    album:    useRef<HTMLSpanElement>(null),
    category: useRef<HTMLSpanElement>(null),
    label:    useRef<HTMLSpanElement>(null),
    year:     useRef<HTMLSpanElement>(null),
  }

  useEffect(() => {
    const fields = Object.entries(textRefs) as [keyof typeof textRefs, React.RefObject<HTMLSpanElement | null>][]

    if (isActive) {
      fields.forEach(([key, r]) => {
        if (!r.current) return
        gsap.killTweensOf(r.current)
        gsap.to(r.current, {
          duration: 0.8,
          scrambleText: {
            text: project[key],
            chars: 'qwerty1337h@ck3r',
            revealDelay: 0.3,
            speed: 0.4,
          },
        })
      })
    } else {
      fields.forEach(([key, r]) => {
        if (!r.current) return
        gsap.killTweensOf(r.current)
        r.current.textContent = project[key]
      })
    }
  }, [isActive, project])

  return (
    <li
      ref={ref}
      className={`project-item${isActive ? ' active' : ''}${isIdle ? ' idle' : ''}`}
      onMouseEnter={() => onMouseEnter(index, project.image ?? '')}
      onMouseLeave={onMouseLeave}
      data-image={project.image}
    >
      <span ref={textRefs.artist}   className="project-data artist   hover-text">{project.artist}</span>
      <span ref={textRefs.album}    className="project-data album    hover-text">{project.album}</span>
      <span ref={textRefs.category} className="project-data category hover-text">{project.category}</span>
      <span ref={textRefs.label}    className="project-data label    hover-text">{project.label}</span>
      <span ref={textRefs.year}     className="project-data year     hover-text">{project.year}</span>
    </li>
  )
})

// ── MusicPortfolio ──────────────────────────────────────────────────────────

type Props = {
  releases: Release[]
  title?: string
  config?: PortfolioConfig
  socialLinks?: { soundcloud?: string; email?: string; beatport?: string }
}

export default function MusicPortfolio({
  releases,
  title = 'RELEASES',
  config = {},
  socialLinks = {},
}: Props) {
  const [activeIndex, setActiveIndex]   = useState(-1)
  const [isIdle, setIsIdle]             = useState(true)

  const backgroundRef    = useRef<HTMLDivElement>(null)
  const containerRef     = useRef<HTMLElement>(null)
  const idleTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleAnimationRef = useRef<gsap.core.Timeline | null>(null)
  const debounceRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectItemsRef  = useRef<(HTMLLIElement | null)[]>([])

  // Preload images and set initial banner background
  useEffect(() => {
    releases.forEach(r => {
      if (r.image) { const img = new Image(); img.src = r.image }
    })
    if (releases[0]?.image && backgroundRef.current) {
      const bg = backgroundRef.current
      bg.style.backgroundImage = `url(${releases[0].image})`
      bg.style.transition = 'opacity 1.2s ease'
      bg.style.opacity = '0.55'
    }
  }, [])

  const startIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) return
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
    projectItemsRef.current.forEach((item, i) => {
      if (!item) return
      const hideTime = i * 0.05
      const showTime = releases.length * 0.05 * 0.5 + i * 0.05
      tl.to(item, { opacity: 0.05, duration: 0.1, ease: 'power2.inOut' }, hideTime)
      tl.to(item, { opacity: 1,    duration: 0.1, ease: 'power2.inOut' }, showTime)
    })
    idleAnimationRef.current = tl
  }, [releases.length])

  const stopIdleAnimation = useCallback(() => {
    if (!idleAnimationRef.current) return
    idleAnimationRef.current.kill()
    idleAnimationRef.current = null
    projectItemsRef.current.forEach(item => { if (item) gsap.set(item, { opacity: 1 }) })
  }, [])

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      if (activeIndex === -1) { setIsIdle(true); startIdleAnimation() }
    }, config.idleDelay ?? 4000)
  }, [activeIndex, config.idleDelay, startIdleAnimation])

  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null }
  }, [])

  const handleProjectMouseEnter = useCallback((index: number, imageUrl: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    stopIdleAnimation()
    stopIdleTimer()
    setIsIdle(false)
    if (activeIndex === index) return
    setActiveIndex(index)

    if (imageUrl && backgroundRef.current) {
      const bg = backgroundRef.current
      bg.style.transition = 'none'
      bg.style.transform = 'translate(-50%, -50%) scale(1.1)'
      bg.style.backgroundImage = `url(${imageUrl})`
      bg.style.opacity = '0.9'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bg.style.transition = 'opacity 0.5s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        bg.style.transform = 'translate(-50%, -50%) scale(1.05)'
      }))
    }
  }, [activeIndex, stopIdleAnimation, stopIdleTimer])

  const handleProjectMouseLeave = useCallback(() => {
    debounceRef.current = setTimeout(() => {}, 50)
  }, [])

  const handleContainerMouseLeave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setActiveIndex(-1)
    if (backgroundRef.current) {
      backgroundRef.current.style.transition = 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      backgroundRef.current.style.opacity = '0.55'
      backgroundRef.current.style.transform = 'translate(-50%, -50%) scale(1.05)'
    }
    startIdleTimer()
  }, [startIdleTimer])

  useEffect(() => {
    startIdleTimer()
    return () => { stopIdleTimer(); stopIdleAnimation() }
  }, [startIdleTimer, stopIdleTimer, stopIdleAnimation])

  return (
    <div className="mp-outer">
      <main
        ref={containerRef}
        className={`portfolio-container${activeIndex !== -1 ? ' has-active' : ''}`}
        onMouseLeave={handleContainerMouseLeave}
      >
        <h2 className="mp-heading">
          <ScrambleOnView as="span">{title}</ScrambleOnView>
        </h2>
        <ul className="project-list" role="list">
          {releases.map((project, index) => (
            <ProjectItem
              key={project.id}
              ref={el => { projectItemsRef.current[index] = el }}
              project={project}
              index={index}
              onMouseEnter={handleProjectMouseEnter}
              onMouseLeave={handleProjectMouseLeave}
              isActive={activeIndex === index}
              isIdle={isIdle}
            />
          ))}
        </ul>
      </main>

      <div
        ref={backgroundRef}
        className="background-image"
        role="img"
        aria-hidden="true"
      />

      <aside className="corner-elements">
        <div className="corner-item top-left">
          <div className="corner-square" aria-hidden="true" />
        </div>
        <nav className="corner-item top-right">
          <a href={socialLinks.soundcloud ?? '#'}>SOUNDCLOUD</a>
          {' | '}
          <a href={socialLinks.email ?? 'mailto:info@cloppmusic.com'}>EMAIL</a>
          {' | '}
          <a href={socialLinks.beatport ?? '#'} target="_blank" rel="noopener">BEATPORT</a>
        </nav>
        <div className="corner-item bottom-left">41.3851° N, 2.1734° E</div>
        <TimeDisplay config={config} />
      </aside>
    </div>
  )
}
