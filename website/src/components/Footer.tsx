interface Props {
  dark: boolean
}

export default function Footer({ dark }: Props) {
  return (
    <footer className={`py-12 border-t ${
      dark ? 'border-white/5' : 'border-black/5'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              พส
            </div>
            <div>
              <span className="text-sm font-semibold">PimSalab</span>
              <span className={`text-xs ml-2 ${dark ? 'text-[#6e6b82]' : 'text-gray-400'}`}>
                v0.1.0
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm transition-colors ${
                dark ? 'text-[#9895ad] hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              GitHub
            </a>
            <a
              href="#"
              className={`text-sm transition-colors ${
                dark ? 'text-[#9895ad] hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              รายงานปัญหา
            </a>
          </div>

          {/* Copyright */}
          <p className={`text-xs ${dark ? 'text-[#4a4760]' : 'text-gray-400'}`}>
            Made with care for Thai typists
          </p>
        </div>
      </div>
    </footer>
  )
}
