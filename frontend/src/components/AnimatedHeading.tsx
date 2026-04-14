import { useState, useEffect } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
  initialDelay?: number
}

export const AnimatedHeading = ({ text, className = '', initialDelay = 200 }: AnimatedHeadingProps) => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50)
    return () => clearTimeout(t)
  }, [])

  const charDelay = 30
  const lines = text.split('\n')

  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => {
        const prevLineLength = lines.slice(0, lineIndex).reduce((acc, l) => acc + l.length, 0)
        return (
          <span key={lineIndex} style={{ display: 'block' }}>
            {line.split('').map((char, charIndex) => {
              const delay = initialDelay + (prevLineLength + charIndex) * charDelay
              return (
                <span
                  key={charIndex}
                  style={{
                    display: 'inline-block',
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateX(0)' : 'translateX(-18px)',
                    transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
