import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Story } from './pages/Story'
import { Investing } from './pages/Investing'
import { Building } from './pages/Building'
import { Advisory } from './pages/Advisory'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

const NotFound = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
    <div className="text-8xl font-light text-white/10 mb-6">404</div>
    <h1 className="text-2xl font-normal mb-3">Page not found.</h1>
    <p className="text-gray-500 text-sm mb-8">The page you're looking for doesn't exist.</p>
    <a href="/" className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
      Back to Home
    </a>
  </div>
)

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/building" element={<Building />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
