import type { Layout } from '../core/converter';

interface HeaderProps {
  layout: Layout;
  onLayoutChange: (layout: Layout) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onHelpClick: () => void;
}

export default function Header({ layout, onLayoutChange, darkMode, onDarkModeToggle, onHelpClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">
          พส
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#e8e6f0]">
            PimSalab
          </h1>
          <p className="text-[11px] text-[#6e6b82]">พิมพ์สลับ — TH ↔ EN</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Layout selector */}
        <select
          value={layout}
          onChange={(e) => onLayoutChange(e.target.value as Layout)}
          className="glass text-xs text-[#9895ad] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 cursor-pointer appearance-none bg-none"
        >
          <option value="kedmanee">Kedmanee</option>
          <option value="pattachote">Pattachote</option>
        </select>

        {/* Help button */}
        <button
          onClick={onHelpClick}
          className="p-2 rounded-xl glass hover:bg-white/8 transition-all duration-200"
          title="คู่มือการใช้งาน"
        >
          <svg className="w-4 h-4 text-[#9895ad]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-xl glass hover:bg-white/8 transition-all duration-200"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? (
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-[#6e6b82]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
