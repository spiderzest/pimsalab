import { useState } from 'react'

interface Props {
  dark: boolean
  onToggleDark: () => void
}

export default function Navbar({ dark, onToggleDark }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      dark
        ? 'bg-[#0e0c1d]/80 border-white/5'
        : 'bg-white/80 border-black/5'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
            พส
          </div>
          <span className="text-lg font-semibold">PimSalab</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#converter" className={`text-sm font-medium transition-colors ${
            dark ? 'text-[#9895ad] hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}>
            ลองใช้เลย
          </a>
          <a href="#features" className={`text-sm font-medium transition-colors ${
            dark ? 'text-[#9895ad] hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}>
            คุณสมบัติ
          </a>
          <a href="#desktop-app" className={`text-sm font-medium transition-colors ${
            dark ? 'text-[#9895ad] hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}>
            Desktop App
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              dark ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              dark ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden border-t px-6 py-4 space-y-3 ${
          dark ? 'border-white/5' : 'border-black/5'
        }`}>
          <a href="#converter" onClick={() => setOpen(false)} className="block text-sm font-medium py-2">ลองใช้เลย</a>
          <a href="#features" onClick={() => setOpen(false)} className="block text-sm font-medium py-2">คุณสมบัติ</a>
          <a href="#desktop-app" onClick={() => setOpen(false)} className="block text-sm font-medium py-2">Desktop App</a>
        </div>
      )}
    </nav>
  )
}
