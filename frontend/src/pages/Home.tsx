import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedHeading } from '../components/AnimatedHeading'
import { FadeIn } from '../components/FadeIn'

export const Home = () => {
  const [exploreHovered, setExploreHovered] = useState(false)

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* ── Video Background ─────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-6">
        <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <span className="text-2xl font-semibold tracking-tight text-white">VEX</span>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Story', 'Investing', 'Building', 'Advisory'].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            to="/login"
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Start a Chat
          </Link>
        </div>
      </div>

      {/* ── Hero Content ─────────────────────────────────────────── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          {/* Left column */}
          <div>
            <AnimatedHeading
              text={"Shaping tomorrow\nwith our Vision\nand Action."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
              initialDelay={200}
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Start a Chat
                </Link>
                <Link
                  to="/story"
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
                  style={{
                    background: exploreHovered ? '#fff' : undefined,
                    color: exploreHovered ? '#000' : '#fff',
                  }}
                  onMouseEnter={() => setExploreHovered(true)}
                  onMouseLeave={() => setExploreHovered(false)}
                >
                  Explore Now
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right column — tag */}
          <FadeIn delay={1400} duration={1000} className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
            <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
              <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                Investing. Building. Advisory.
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
