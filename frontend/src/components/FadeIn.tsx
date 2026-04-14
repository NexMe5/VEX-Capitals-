import { useState, useEffect, useRef, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export const FadeIn = ({ children, delay = 0, duration = 1000, className = '' }: FadeInProps) => {
  const [visible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
            if (domRef.current) observer.unobserve(domRef.current)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (domRef.current) {
      observer.observe(domRef.current)
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current)
    }
  }, [delay])

  return (
    <div
      ref={domRef}
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
