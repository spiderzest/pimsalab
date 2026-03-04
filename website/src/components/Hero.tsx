interface Props {
  dark: boolean
}

export default function Hero({ dark }: Props) {
  return (
    <section id="hero" className="relative overflow-hidden pt-20 pb-8 sm:pt-28 sm:pb-12">
      {/* Background gradient blobs */}
      {dark && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-30%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[150px]" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
        </div>
      )}

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border border-indigo-500/20 bg-indigo-500/5 text-indigo-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          ฟรี — ไม่ต้องติดตั้ง ใช้ได้เลย
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
          พิมพ์ผิดภาษา?
          <br />
          <span className="text-indigo-400">แปลงได้ทันที</span>
        </h1>

        {/* Subtitle */}
        <p className={`animate-fade-up-delay-2 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed ${
          dark ? 'text-[#9895ad]' : 'text-gray-500'
        }`}>
          วาง หรือพิมพ์ข้อความที่ผิดภาษา — PimSalab แก้ให้เลย
          <br className="hidden sm:block" />
          ฟรี ไม่ต้องลงทะเบียน ไม่เก็บข้อมูล
        </p>

        {/* Scroll down arrow */}
        <a href="#converter" className="animate-fade-up-delay-3 inline-flex flex-col items-center gap-1 group">
          <span className={`text-xs font-medium ${dark ? 'text-[#6e6b82]' : 'text-gray-400'}`}>ลองเลย</span>
          <svg className={`w-5 h-5 animate-bounce ${dark ? 'text-indigo-400' : 'text-indigo-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
