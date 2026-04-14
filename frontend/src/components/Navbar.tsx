import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  transparent?: boolean
}

export const Navbar = ({ transparent = false }: NavbarProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Story', href: '/story' },
    { label: 'Investing', href: '/investing' },
    { label: 'Building', href: '/building' },
    { label: 'Advisory', href: '/advisory' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (href: string) => location.pathname === href

  return (
    <div className={`px-6 md:px-12 lg:px-16 pt-6 ${transparent ? '' : 'bg-black border-b border-white/10'}`}
         style={{ position: transparent ? 'absolute' : 'relative', top: transparent ? 0 : 'auto', left: 0, right: 0, zIndex: 50 }}>
      <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
          VEX
        </Link>

        {/* Center links - desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors duration-200 ${
                isActive(link.href) ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-medium">
                  {user.avatar}
                </div>
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Start a Chat
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 liquid-glass rounded-xl px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-3 mt-1">
            {user ? (
              <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white">Sign Out</button>
            ) : (
              <Link to="/login" className="text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
