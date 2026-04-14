import { Navbar } from '../components/Navbar'
import { FadeIn } from '../components/FadeIn'
import { VideoBackground } from '../components/VideoBackground'

const thesis = [
  { icon: '⬡', sector: 'Deep Technology', desc: 'AI infrastructure, quantum computing, robotics, and next-gen semiconductors.', stage: 'Seed — Series B', check: '$2M — $30M' },
  { icon: '⬡', sector: 'BioTech & Health', desc: 'Precision medicine, longevity research, synthetic biology, and digital health platforms.', stage: 'Seed — Series A', check: '$1M — $15M' },
  { icon: '⬡', sector: 'Climate & Energy', desc: 'Grid-scale storage, carbon capture, sustainable materials, and clean mobility.', stage: 'Series A — B', check: '$5M — $40M' },
  { icon: '⬡', sector: 'Future of Work', desc: 'Vertical AI, knowledge infrastructure, and the tools that define how humans work.', stage: 'Seed — Series A', check: '$2M — $20M' },
]

const portfolio = [
  { name: 'NovaBio Labs', sector: 'BioTech', stage: 'Series A', flag: 'Active', desc: 'Precision therapeutics using AI-guided protein folding.' },
  { name: 'Quantum Edge', sector: 'Deep Tech', stage: 'Seed', flag: 'Active', desc: 'Error-corrected quantum processors for enterprise simulation.' },
  { name: 'SolarGrid AI', sector: 'CleanTech', stage: 'Series B', flag: 'Active', desc: 'AI-driven distributed energy management at grid scale.' },
  { name: 'CloudVault', sector: 'SaaS', stage: 'Growth', flag: 'Active', desc: 'Zero-trust cloud data governance for regulated industries.' },
  { name: 'PulseHealth', sector: 'HealthTech', stage: 'Series A', flag: 'Active', desc: 'Continuous biomarker monitoring via wearable mesh sensors.' },
  { name: 'DataStream Inc.', sector: 'Data', stage: 'Acquired', flag: 'Exited', desc: 'Real-time data streaming acquired for $380M.' },
]

export const Investing = () => (
  <div className="min-h-screen text-white relative z-10">
    <VideoBackground />
    <Navbar />
    <div className="px-6 md:px-12 lg:px-16 pt-20 pb-32 page-enter">

      {/* Header */}
      <FadeIn delay={100} duration={800}>
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">Investing</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-8" style={{ letterSpacing: '-0.04em' }}>
            Capital that<br />compounds conviction.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
            We deploy patient capital at the earliest inflection points — when the idea is clear but the path is uncertain. That's where we do our best work.
          </p>
        </div>
      </FadeIn>

      {/* Stats bar */}
      <FadeIn delay={300} duration={800}>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '$4.2B', label: 'Portfolio Value' },
            { value: '34', label: 'Active Companies' },
            { value: '31%', label: 'Net IRR' },
            { value: '12', label: 'Successful Exits' },
          ].map((stat, i) => (
            <div key={i} className="liquid-glass-heavy border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-light mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Investment Thesis */}
      <div className="mt-28">
        <FadeIn delay={200} duration={800}>
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12">Investment Thesis</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {thesis.map((t, i) => (
            <FadeIn key={i} delay={250 + i * 100} duration={800}>
              <div className="liquid-glass-heavy border border-white/10 rounded-2xl p-8 h-full">
                <h3 className="text-lg font-medium mb-3">{t.sector}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.desc}</p>
                <div className="flex gap-6 text-xs">
                  <div>
                    <div className="text-gray-600 mb-0.5 uppercase tracking-widest">Stage</div>
                    <div className="text-gray-300">{t.stage}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5 uppercase tracking-widest">Check Size</div>
                    <div className="text-gray-300">{t.check}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="mt-28">
        <FadeIn delay={200} duration={800}>
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12">Selected Portfolio</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map((co, i) => (
            <FadeIn key={i} delay={200 + i * 80} duration={800}>
              <div className="liquid-glass-heavy border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{co.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{co.sector} · {co.stage}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${
                    co.flag === 'Exited'
                      ? 'border-gray-600 text-gray-500'
                      : 'border-white/20 text-gray-300'
                  }`}>
                    {co.flag}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{co.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* CTA */}
      <FadeIn delay={500} duration={800}>
        <div className="mt-24 liquid-glass-heavy border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-normal mb-2" style={{ letterSpacing: '-0.03em' }}>Building something exceptional?</h2>
            <p className="text-gray-400">We'd like to hear about it.</p>
          </div>
          <a href="/login" className="shrink-0 bg-white text-black px-8 py-3.5 rounded-xl font-medium hover:bg-gray-100 transition-colors">
            Start a Conversation
          </a>
        </div>
      </FadeIn>
    </div>
  </div>
)
