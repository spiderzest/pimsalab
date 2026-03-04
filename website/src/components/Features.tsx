interface Props {
  dark: boolean
}

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'ตรวจจับอัตโนมัติ',
    desc: 'รู้เองว่าพิมพ์ผิดจาก EN→TH หรือ TH→EN ไม่ต้องเลือกโหมด แค่วางข้อความ ระบบจัดการให้',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'รองรับ 2 แป้นพิมพ์',
    desc: 'รองรับทั้ง Kedmanee (เกษมณี) แป้นพิมพ์มาตรฐาน และ Pattachote (ปัตตะโชติ) แป้นพิมพ์ทางเลือก',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'ทำงานบนเครื่องคุณ',
    desc: 'ข้อความไม่ถูกส่งไปเซิร์ฟเวอร์ ทุกอย่างทำงานในเบราว์เซอร์ ปลอดภัย 100%',
  },
]

export default function Features({ dark }: Props) {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-400 mb-3 tracking-wide uppercase">คุณสมบัติ</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            ทำไมต้อง PimSalab?
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                dark
                  ? 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10'
                  : 'bg-white hover:bg-indigo-50/50 border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                dark
                  ? 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/15'
                  : 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100'
              }`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? 'text-[#9895ad]' : 'text-gray-500'}`}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
