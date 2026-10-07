import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/employees', label: 'Employees', icon: '👥' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white md:hidden">
        <span className="text-lg font-bold">▣ TaskHub</span>
        <button onClick={() => setOpen(!open)} className="text-2xl" aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>

      <aside
        className={`${open ? 'block' : 'hidden'} w-full flex-shrink-0 bg-slate-900 text-slate-200 md:flex md:min-h-screen md:w-60 md:flex-col`}
      >
        <div className="hidden px-6 py-6 text-xl font-bold text-white md:block">▣ TaskHub</div>
        <nav className="flex-1 space-y-1 px-3 pb-3 md:pt-0">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'
                }`
              }
            >
              <span>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="m-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-slate-800"
        >
          🚪 Logout
        </button>
      </aside>

      <main className="min-w-0 flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
