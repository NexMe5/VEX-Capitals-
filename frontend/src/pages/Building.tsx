import { Navbar } from '../components/Navbar'
import { FadeIn } from '../components/FadeIn'
import { VideoBackground } from '../components/VideoBackground'

const ventures = [
  {
    name: 'Meridian OS',
    category: 'Operating System Layer',
    status: 'In Development',
    desc: 'A composable OS for AI-native workloads — rethinking how compute, memory, and model inference co-exist.',
    year: '2024',
  },
  {
    name: 'Atlus Health',
    category: 'Digital Health',
    status: 'Building',
    desc: 'Longitudinal health intelligence platform that turns continuous biometric data into actionable, clinically-validated insights.',
    year: '2024',
  },
  {
    name: 'Conduit Finance',
    category: 'Infrastructure',
    status: 'Stealth',
    desc: 'Programmable settlement rails for cross-border institutional payments. Built for the speed of modern markets.',
    year: '2023',
  },
]

const process = [
  { step: '01', title: 'Thesis', desc: 'We identify whitespace — markets where technology inflection meets structural demand.' },
  { step: '02', title: 'Operator Search', desc: 'We recruit exceptional operators-in-residence with domain depth and founding instincts.' },
  { step: '03', title: 'Co-Creation', desc: 'VEX partners embed alongside the founding team for the first 12–18 months.' },
  { step: '04', title: 'Launch', desc: 'We provide seed capital, infrastructure, legal, and go-to-market scaffolding from day one.' },
  { step: '05', title: 'Independence', desc: 'Ventures graduate to full independence, with VEX remaining a long-term aligned shareholder.' },
]

export const Building = () => (
  <div className="min-h-screen text-white relative z-10">
    <VideoBackground />
    <Navbar />
    <div className="px-6 md:px-12 lg:px-16 pt-20 pb-32 page-enter">

      <FadeIn delay={100} duration={800}>
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">Building</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-8" style={{ letterSpacing: '-0.04em' }}>
            We don't just<br />fund — we build.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
            The VEX Venture Studio co-founds companies from zero. We bring the thesis, the capital, the team, and the operational backbone. Founders bring the obsession.
          </p>
        </div>
      </FadeIn>

      {/* Active Ventures */}
      <div className="mt-24">
        <FadeIn delay={200} duration={800}>
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12">Active Ventures</p>
        </FadeIn>
        <div className="flex flex-col gap-4">
          {ventures.map((v, i) => (
            <FadeIn key={i} delay={250 + i * 100} duration={800}>
              <div className="liquid-glass-heavy border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-xl">{v.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full border border-white/15 text-gray-400">{v.status}</span>
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-widest mb-3">{v.category}</div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{v.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-4xl font-light text-white/10">{v.year}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mt-28">
        <FadeIn delay={200} duration={800}>
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12">Our Process</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {process.map((p, i) => (
            <FadeIn key={i} delay={200 + i * 100} duration={800}>
              <div className="bg-black/80 p-6 flex flex-col gap-4 h-full">
                <div className="text-xs font-mono text-gray-600">{p.step}</div>
                <div className="font-medium">{p.title}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* OIR section */}
      <FadeIn delay={500} duration={800}>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="liquid-glass-heavy border border-white/10 rounded-3xl p-10">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">Operator in Residence</p>
            <h2 className="text-3xl font-normal mb-4" style={{ letterSpacing: '-0.03em' }}>
              Ready to found your next company?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              We're actively recruiting domain experts and former founders who want to build category-defining companies with full VEX backing from day one.
            </p>
            <a href="/login" className="inline-block bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Apply as OIR
            </a>
          </div>
          <div className="liquid-glass-heavy border border-white/10 rounded-3xl p-10">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">Partnership</p>
            <h2 className="text-3xl font-normal mb-4" style={{ letterSpacing: '-0.03em' }}>
              Bring us your most ambitious idea.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Already have a co-founder and early thesis? We can plug in as a venture partner — providing capital, infrastructure, and strategic depth from seed.
            </p>
            <a href="/login" className="inline-block liquid-glass border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
)
