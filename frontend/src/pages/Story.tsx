import { Navbar } from '../components/Navbar'
import { FadeIn } from '../components/FadeIn'
import { VideoBackground } from '../components/VideoBackground'

const milestones = [
  { year: '2016', title: 'Founded', desc: 'VEX was established with a single thesis: the best returns come from backing exceptional founders before the market catches on.' },
  { year: '2018', title: 'First Fund', desc: 'Closed our debut $120M fund. Made 12 initial investments across deep tech, health, and infrastructure.' },
  { year: '2020', title: 'Advisory Practice', desc: 'Launched our embedded advisory arm — working shoulder-to-shoulder with portfolio founders on strategy, hiring, and growth.' },
  { year: '2022', title: 'Venture Studio', desc: 'Opened the VEX Building studio, co-founding companies from zero alongside operators-in-residence.' },
  { year: '2024', title: 'Global Presence', desc: 'Expanded to Singapore and London. Portfolio companies now operate in 28 countries with a combined valuation of $4.2B.' },
]

const values = [
  { icon: '◈', label: 'Contrarian Conviction', desc: 'We invest where consensus is thin and signal is strong.' },
  { icon: '◉', label: 'Founder-First', desc: 'Capital is a tool. Our real value is time, network, and hard-won pattern recognition.' },
  { icon: '◐', label: 'Long-Term Orientation', desc: 'We measure success in decades, not quarters.' },
  { icon: '◑', label: 'Radical Transparency', desc: 'No spin. We say what we see — to founders, LPs, and ourselves.' },
]

export const Story = () => {
  return (
    <div className="min-h-screen text-white relative z-10">
      <VideoBackground />
      <div className="relative">
        {/* Hero bg strip */}
        <div
          className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}
        />

        <Navbar />

        <div className="px-6 md:px-12 lg:px-16 pt-20 pb-32 page-enter">
          {/* Header */}
          <FadeIn delay={100} duration={800}>
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">Our Story</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-8" style={{ letterSpacing: '-0.04em' }}>
                Built on a belief<br />in what's possible.
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                VEX was born from the conviction that the most transformative companies are built by people who see the world differently — and that the right partner makes the difference between good and great.
              </p>
            </div>
          </FadeIn>

          {/* Values */}
          <FadeIn delay={400} duration={800}>
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v, i) => (
                <div key={i} className="liquid-glass-heavy border border-white/10 rounded-2xl p-6">
                  <div className="text-2xl mb-4 text-gray-400">{v.icon}</div>
                  <div className="font-medium mb-2">{v.label}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Timeline */}
          <div className="mt-32">
            <FadeIn delay={200} duration={800}>
              <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-16">Timeline</p>
            </FadeIn>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-24 top-0 bottom-0 w-px bg-white/10" />

              <div className="flex flex-col gap-16">
                {milestones.map((m, i) => (
                  <FadeIn key={i} delay={300 + i * 150} duration={800}>
                    <div className="flex gap-8 md:gap-16 pl-6 md:pl-0">
                      <div className="hidden md:block w-24 shrink-0 text-right">
                        <span className="text-sm text-gray-500 font-light">{m.year}</span>
                      </div>
                      <div className="relative">
                        {/* Dot */}
                        <div className="absolute -left-6 md:-left-[41px] top-1.5 w-2 h-2 rounded-full bg-white border border-black" />
                        <span className="md:hidden text-xs text-gray-500 mb-1 block">{m.year}</span>
                        <h3 className="font-medium text-lg mb-2">{m.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{m.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* Team teaser */}
          <FadeIn delay={600} duration={800}>
            <div className="mt-32 liquid-glass-heavy border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-3">The Team</p>
                <h2 className="text-3xl md:text-4xl font-normal" style={{ letterSpacing: '-0.03em' }}>
                  35 people.<br />One obsession.
                </h2>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Former founders, operators, scientists, and engineers — united by a compulsive need to find what's next before everyone else does.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
