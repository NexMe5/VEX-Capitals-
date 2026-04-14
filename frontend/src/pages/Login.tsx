import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Login = () => {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.name, form.email, form.password)
      }
      navigate('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top bar */}
      <div className="px-6 md:px-12 pt-6">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-white hover:opacity-70 transition-opacity">
          VEX
        </Link>
      </div>

      {/* Center card */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-normal mb-2" style={{ letterSpacing: '-0.03em' }}>
              {mode === 'login' ? 'Welcome back.' : 'Create an account.'}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === 'login'
                ? 'Sign in to access your VEX dashboard.'
                : 'Join VEX and start building.'}
            </p>
          </div>

          {/* Test credentials hint */}
          {mode === 'login' && (
            <div className="liquid-glass border border-white/10 rounded-xl px-4 py-3 mb-6 text-xs text-gray-500">
              <span className="text-gray-400 font-medium">Test credentials:</span>
              <br />Admin: <span className="text-gray-300">admin@vex.com</span> / <span className="text-gray-300">password123</span>
              <br />User: <span className="text-gray-300">test@vex.com</span> / <span className="text-gray-300">test1234</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-white text-black py-3 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
              className="text-gray-300 hover:text-white transition-colors underline underline-offset-2"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 pb-8 text-center text-xs text-gray-700">
        © {new Date().getFullYear()} VEX Capital. All rights reserved.
      </div>
    </div>
  )
}
