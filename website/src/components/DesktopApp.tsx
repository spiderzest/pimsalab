import { useEffect, useState } from 'react'

interface Props {
  dark: boolean
}

export default function DesktopApp({ dark }: Props) {
  const [os, setOS] = useState<'mac' | 'windows' | 'other'>('other')

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('mac')) setOS('mac')
    else if (ua.includes('win')) setOS('windows')
  }, [])

  const modKey = os === 'mac' ? '⌘' : 'Ctrl'

  return (
    <section id="desktop-app" className={`py-20 sm:py-28 ${
      dark ? 'bg-white/[0.02]' : 'bg-gray-50/80'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-400 mb-3 tracking-wide uppercase">Desktop App</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              ต้องการแก้ข้อความจากทุกแอป?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${dark ? 'text-[#9895ad]' : 'text-gray-500'}`}>
              ดาวน์โหลด PimSalab Desktop — กด {modKey}+Shift+L แก้ข้อความได้จาก LINE, Teams, Word ทันที โดยไม่ต้องเปิดเว็บ
            </p>
          </div>

          {/* 3 mini steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { num: '1', text: 'เลือกข้อความที่พิมพ์ผิด', color: 'text-red-400' },
              { num: '2', text: `กด ${modKey}+Shift+L`, color: 'text-indigo-400' },
              { num: '3', text: 'ข้อความถูกแก้ทันที!', color: 'text-green-400' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-bold ${
                  dark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-500'
                }`}>
                  {step.num}
                </div>
                <p className={`text-sm font-medium ${dark ? 'text-[#b8b5c8]' : 'text-gray-600'}`}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Hotkey showcase */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <kbd className="text-xl font-mono font-semibold text-indigo-300">
                {modKey}+Shift+L
              </kbd>
            </div>
            <p className={`text-xs mt-3 ${dark ? 'text-[#6e6b82]' : 'text-gray-400'}`}>
              ใช้ได้จากทุกแอป — LINE, Teams, Word, Chrome ฯลฯ
            </p>
          </div>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="https://github.com/spiderzest/pimsalab/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-7 h-14 rounded-2xl text-base font-semibold transition-all duration-200 ${
                os === 'mac'
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : dark
                    ? 'bg-white/5 hover:bg-white/10 text-[#e8e6f0] border border-white/10'
                    : 'bg-white hover:bg-gray-50 text-[#1a1a2e] border border-gray-200 shadow-sm'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-70 leading-none mb-0.5">Download for</div>
                <div className="leading-none">macOS</div>
              </div>
            </a>

            <a
              href="https://github.com/spiderzest/pimsalab/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-7 h-14 rounded-2xl text-base font-semibold transition-all duration-200 ${
                os === 'windows'
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : dark
                    ? 'bg-white/5 hover:bg-white/10 text-[#e8e6f0] border border-white/10'
                    : 'bg-white hover:bg-gray-50 text-[#1a1a2e] border border-gray-200 shadow-sm'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12V6.75l8-1.25V12H3zm0 .5h8v6.5l-8-1.25V12.5zM11.5 5.34l9.5-1.84V12h-9.5V5.34zM11.5 12.5H21v7l-9.5-1.84V12.5z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-70 leading-none mb-0.5">Download for</div>
                <div className="leading-none">Windows</div>
              </div>
            </a>
          </div>

          <p className={`text-center text-xs ${dark ? 'text-[#4a4760]' : 'text-gray-400'}`}>
            v0.1.0 &middot; macOS 12+ &middot; Windows 10+ &middot; ฟรี
          </p>
        </div>
      </div>
    </section>
  )
}
