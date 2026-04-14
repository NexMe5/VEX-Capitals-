import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Stats {
  portfolio: { value: string; change: string; label: string }
  companies: { value: string; change: string; label: string }
  exits: { value: string; change: string; label: string }
  irr: { value: string; change: string; label: string }
  recentActivity: {
    id: number; type: string; company: string; amount: string; date: string; stage: string
  }[]
}

interface Company {
  id: number; name: string; sector: string; stage: string
  invested: string; valuation: string; status: string
}

export const Dashboard = () => {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats | null>(null)
  const [portfolio, setPortfolio] = useState<Company[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio'>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const [statsRes, portRes] = await Promise.all([
          fetch('/api/dashboard/stats', { headers }),
          fetch('/api/dashboard/portfolio', { headers }),
        ])
        if (statsRes.ok) setStats(await statsRes.json())
        if (portRes.ok) setPortfolio(await portRes.json())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  const handleLogout = () => { logout(); navigate('/') }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">Loading dashboard…</p>
        </div>
      </div>
    )
  }

  const statCards = stats ? [
    stats.portfolio, stats.companies, stats.exits, stats.irr
  ] : []

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-white/5 px-4 py-6 shrink-0">
        <Link to="/" className="text-xl font-semibold tracking-tight mb-10 px-2">VEX</Link>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { label: 'Overview', key: 'overview' },
            { label: 'Portfolio', key: 'portfolio' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as typeof activeTab)}
              className={`text-left text-sm px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.key
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-white/5 mt-3 pt-3">
            {[
              { label: 'Investing', href: '/investing' },
              { label: 'Building', href: '/building' },
              { label: 'Advisory', href: '/advisory' },
            ].map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm px-3 py-2.5 text-gray-600 hover:text-gray-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        {/* User */}
        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-medium">
              {user?.avatar}
            </div>
            <div>
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-gray-600">{user?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm px-3 py-2 text-gray-600 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/5"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-medium">
              {activeTab === 'overview' ? 'Dashboard Overview' : 'Portfolio Companies'}
            </h1>
            <p className="text-xs text-gray-600 mt-0.5">
              Good to have you back, {user?.name?.split(' ')[0]}.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden text-sm text-gray-500 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="px-6 py-8 page-enter">
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {statCards.map((stat, i) => (
                  <div key={i} className="liquid-glass-heavy border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-gray-600 uppercase tracking-widest mb-2">{stat.label}</div>
                    <div className="text-2xl font-light mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.change} this year</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="liquid-glass-heavy border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                  <h2 className="text-sm font-medium">Recent Activity</h2>
                </div>
                <div className="divide-y divide-white/5">
                  {stats?.recentActivity.map((act) => (
                    <div key={act.id} className="px-6 py-4 flex items-center gap-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
                        act.type === 'Exit'
                          ? 'border-white/20 text-gray-300'
                          : act.type === 'Advisory'
                          ? 'border-white/10 text-gray-500'
                          : 'border-white/15 text-gray-400'
                      }`}>
                        {act.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{act.company}</div>
                        <div className="text-xs text-gray-600">{act.stage}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm">{act.amount}</div>
                        <div className="text-xs text-gray-600">{act.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'portfolio' && (
            <div className="liquid-glass-heavy border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-medium">All Portfolio Companies</h2>
                <span className="text-xs text-gray-600">{portfolio.length} companies</span>
              </div>
              {/* Table header */}
              <div className="hidden md:grid grid-cols-6 px-6 py-3 border-b border-white/5 text-xs text-gray-600 uppercase tracking-widest">
                <div className="col-span-2">Company</div>
                <div>Sector</div>
                <div>Stage</div>
                <div>Invested</div>
                <div>Valuation</div>
              </div>
              <div className="divide-y divide-white/5">
                {portfolio.map((co) => (
                  <div key={co.id} className="grid grid-cols-2 md:grid-cols-6 px-6 py-4 gap-2 md:gap-0 items-center">
                    <div className="col-span-2">
                      <div className="text-sm font-medium">{co.name}</div>
                      <div className="md:hidden text-xs text-gray-600">{co.sector} · {co.stage}</div>
                    </div>
                    <div className="hidden md:block text-sm text-gray-400">{co.sector}</div>
                    <div className="hidden md:block text-sm text-gray-400">{co.stage}</div>
                    <div className="text-sm text-gray-300">{co.invested}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">{co.valuation}</span>
                      <span className={`hidden md:inline text-xs px-2 py-0.5 rounded-full border ${
                        co.status === 'Exited'
                          ? 'border-white/10 text-gray-600'
                          : 'border-white/20 text-gray-400'
                      }`}>
                        {co.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
