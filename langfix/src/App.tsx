import { useState } from 'react';
import Header from './components/Header';
import ConversionPanel from './components/ConversionPanel';
import UserManual from './components/UserManual';
import Footer from './components/Footer';
import type { Layout } from './core/converter';
import { useTauriHotkey } from './hooks/useTauriHotkey';

export default function App() {
  const [layout, setLayout] = useState<Layout>('kedmanee');
  const [darkMode, setDarkMode] = useState(true);
  const [showManual, setShowManual] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  // Register global hotkey when running as Tauri desktop app
  useTauriHotkey();

  const isMac = navigator.platform?.includes('Mac');
  const modKey = isMac ? '⌘' : 'Ctrl';

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${
      darkMode ? 'bg-[#0e0c1d] text-[#e8e6f0]' : 'bg-[#f8f7fc] text-gray-900'
    }`}>

      {/* Radial gradient blobs */}
      {darkMode && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[120px]" />
          <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[100px]" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          layout={layout}
          onLayoutChange={setLayout}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          onHelpClick={() => setShowManual(true)}
        />

        {/* Hero */}
        <div className="text-center pt-16 pb-6 px-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight">
            พิมพ์ผิดภาษา?{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              แก้ได้ทันที
            </span>
          </h2>
          <p className={`text-base font-normal mb-8 ${darkMode ? 'text-[#9895ad]' : 'text-gray-500'}`}>
            เลือกข้อความ แล้วกด hotkey — PimSalab แก้ให้เลยจากทุกแอป
          </p>
        </div>

        {/* Primary: Hotkey showcase */}
        <div className="max-w-md mx-auto px-4 mb-10">
          <div className="glass-strong rounded-3xl p-8 text-center">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-5 ${
              darkMode ? 'text-[#6e6b82]' : 'text-gray-400'
            }`}>
              วิธีใช้งาน
            </p>

            {/* 3 steps */}
            <div className="space-y-4 mb-8">
              {[
                { step: '1', text: 'เลือกข้อความที่พิมพ์ผิดภาษา' },
                { step: '2', text: `กด ${modKey}+Shift+L` },
                { step: '3', text: 'ข้อความถูกแปลงอัตโนมัติ!' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">
                    {s.step}
                  </div>
                  <p className={`text-sm text-left ${darkMode ? 'text-[#b8b5c8]' : 'text-gray-600'}`}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Hotkey badge */}
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <kbd className="text-lg font-mono font-semibold text-indigo-300">
                {modKey}+Shift+L
              </kbd>
            </div>

            <p className={`text-xs mt-4 ${darkMode ? 'text-[#4a4760]' : 'text-gray-300'}`}>
              ใช้ได้จากทุกแอป — LINE, Teams, Word, Chrome ฯลฯ
            </p>
          </div>
        </div>

        {/* Example section */}
        <div className="max-w-lg mx-auto px-4 mb-8">
          <h3 className={`text-xs font-semibold uppercase tracking-widest mb-4 text-center ${
            darkMode ? 'text-[#6e6b82]' : 'text-gray-400'
          }`}>
            ตัวอย่าง
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { from: 'l;ylfu', to: 'สวัสดี', dir: 'EN→TH' },
              { from: '้ำสสน ไนพสก', to: 'hello world', dir: 'TH→EN' },
              { from: 'dbo:t w,jdbo0tsb;F:', to: 'กินซะ ไม่กินจะหิวโซ', dir: 'EN→TH' },
              { from: 'เนนก ทนพืรืเ', to: 'good morning', dir: 'TH→EN' },
            ].map((ex, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-default"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 bg-indigo-500/15 text-indigo-400 rounded-full font-medium">
                    {ex.dir}
                  </span>
                </div>
                <p className="text-xs text-[#6e6b82] line-through mb-0.5">{ex.from}</p>
                <p className={`text-sm font-semibold ${darkMode ? 'text-[#e8e6f0]' : 'text-gray-900'}`}>{ex.to}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary: Manual text input (collapsible) */}
        <div className="max-w-2xl mx-auto px-4 mb-8 w-full">
          <button
            onClick={() => setShowPanel(!showPanel)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
              showPanel
                ? 'glass-strong text-[#e8e6f0]'
                : 'glass text-[#6e6b82] hover:text-[#9895ad]'
            }`}
          >
            <svg className={`w-4 h-4 transition-transform duration-200 ${showPanel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showPanel ? 'ซ่อนช่องแปลงข้อความ' : 'หรือวางข้อความที่นี่'}
          </button>

          {showPanel && (
            <div className="mt-4 animate-fade-up">
              <ConversionPanel layout={layout} darkMode={darkMode} />
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* User Manual Modal */}
      {showManual && (
        <UserManual darkMode={darkMode} onClose={() => setShowManual(false)} />
      )}
    </div>
  );
}
