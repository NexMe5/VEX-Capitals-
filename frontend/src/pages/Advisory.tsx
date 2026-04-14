import { Navbar } from '../components/Navbar'
import { FadeIn } from '../components/FadeIn'
import { VideoBackground } from '../components/VideoBackground'

const services = [
  {
    title: 'Strategic Advisory',
    desc: 'Board-level strategy, market positioning, and competitive intelligence for high-growth companies navigating inflection points.',
    items: ['Go-to-market architecture', 'Competitive moat analysis', 'Business model evolution', 'M&A preparation'],
  },
  {
    title: 'Talent & Organization',
    desc: 'We help founders build the leadership teams that match the ambition of their company at every stage of growth.',
    items: ['C-suite recruitment', 'Org design for scale', 'Founder coaching', 'Board composition'],
  },
  {
    title: 'Capital Formation',
    desc: 'From Series A through pre-IPO, we help exceptional companies access the right capital at the right moment.',
    items: ['Fundraise narrative', 'Investor introductions', 'Term sheet guidance', 'LP co-investment'],
  },
  {
    title: 'Global Expansion',
    desc: 'Entering new geographies is hard. We\'ve mapped the terrain across North America, Europe, Southeast Asia, and the Middle East.',
    items: ['Market entry strategy', 'Regulatory navigation', 'Local partner network', 'Cultural translation'],
  },
]

const clients = [
  { name: 'CloudVault', sector: 'SaaS · $520M valuation', outcome: 'Scaled from 0 to $40M ARR in 18 months with VEX advisory.' },
  { name: 'Helix Genomics', sector: 'BioTech · Series C', outcome: 'Navigated FDA pre-submission process and closed $80M round.' },
  { name: 'Rove Mobility', sector: 'Mobility · Global', outcome: 'Expanded from US to 6 EU markets within 12 months.' },
]

export const Advisory = () => (
  <div className="min-h-screen text-white relative z-10">
    <VideoBackground />
    <Navbar />
    <div className="px-6 md:px-12 lg:px-16 pt-20 pb-32 page-enter">

      <FadeIn delay={100} duration={800}>
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">Advisory</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-8" style={{ letterSpacing: '-0.04em' }}>
            Insight shaped<br />by real experience.
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
            Our advisory practice embeds senior operators directly into high-growth companies. We work on the hardest problems because that's where pattern recognition actually matters.
          </p>
        </div>
      </FadeIn>

      {/* Services */}
      <div className="mt-24">
        <FadeIn delay={200} duration={800}>
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12">What We Do</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <FadeIn key={i} delay={250 + i * 100} duration={800}>
              <div className="liquid-glass-heavy border border-white/10 rounded-2xl p-8 h-full">
                <h3 className="font-medium text-xl mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                <ul className="flex flex-col gap-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Case studies */}
      <div className="mt-28">
        <FadeIn delay={200} duration={800}>
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12">Case Studies</p>
        </FadeIn>
        <div className="flex flex-col gap-4">
          {clients.map((c, i) => (
            <FadeIn key={i} delay={250 + i * 100} duration={800}>
              <div className="liquid-glass-heavy border border-white/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                <div className="md:w-56 shrink-0">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{c.sector}</div>
                </div>
                <div className="flex-1 border-l border-white/5 pl-0 md:pl-12">
                  <p className="text-gray-300 text-sm leading-relaxed">{c.outcome}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Engagement model */}
      <FadeIn delay={400} duration={800}>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Fractional CXO', desc: '3–12 month embedded engagement. Join leadership team with clear deliverables.' },
            { label: 'Project Sprint', desc: '4–8 week intensive on a specific problem — GTM, fundraise, org design.' },
            { label: 'Board Advisory', desc: 'Ongoing strategic counsel with a formal board or observer seat.' },
          ].map((model, i) => (
            <div key={i} className="liquid-glass-heavy border border-white/10 rounded-2xl p-6">
              <div className="font-medium mb-3">{model.label}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{model.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={600} duration={800}>
        <div className="mt-24 liquid-glass-heavy border border-white/10 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4" style={{ letterSpacing: '-0.03em' }}>
            Let's solve something hard together.
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Most of our advisory relationships start with a single conversation. There's no pitch deck required.
          </p>
          <a href="/login" className="inline-block bg-white text-black px-10 py-3.5 rounded-xl font-medium hover:bg-gray-100 transition-colors">
            Start a Conversation
          </a>
        </div>
      </FadeIn>
    </div>
  </div>
)
