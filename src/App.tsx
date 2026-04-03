import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tasks     = lazy(() => import('./pages/Tasks'))
const Settings  = lazy(() => import('./pages/Settings'))

function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#9a031e] text-white'
        : 'text-white/70 hover:bg-white/10'
    }`

  return (
    <aside className="w-48 min-h-screen bg-[#5f0f40] p-4 flex flex-col gap-1">
      <h1 className="text-white font-medium text-lg mb-6 px-4">NexusBoard</h1>
      <NavLink to="/"        className={linkClass}>Dashboard</NavLink>
      <NavLink to="/tasks"   className={linkClass}>Tasks</NavLink>
      <NavLink to="/settings" className={linkClass}>Settings</NavLink>
    </aside>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50 min-h-screen">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64 text-[#5f0f40]">
              Loading...
            </div>
          }>
            <Routes>
              <Route path="/"         element={<Dashboard />} />
              <Route path="/tasks"    element={<Tasks />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}