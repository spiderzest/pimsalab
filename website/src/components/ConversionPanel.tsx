import { useState, useCallback, useEffect, useRef } from 'react'
import { convertENtoTH, convertTHtoEN, type Layout } from '../core/converter'
import { detectAndConvert, type DetectionResult } from '../core/detector'

type Mode = 'auto' | 'en-to-th' | 'th-to-en'

interface Props {
  dark: boolean
}

export default function ConversionPanel({ dark }: Props) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [mode, setMode] = useState<Mode>('auto')
  const [layout, setLayout] = useState<Layout>('kedmanee')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<DetectionResult[]>([])

  const handleConvert = useCallback(() => {
    if (!input.trim()) return

    let convResult: DetectionResult

    if (mode === 'auto') {
      convResult = detectAndConvert(input, layout)
    } else if (mode === 'en-to-th') {
      const converted = convertENtoTH(input, layout)
      convResult = {
        direction: 'EN→TH',
        convertedText: converted,
        confidence: 99,
        originalText: input,
      }
    } else {
      const converted = convertTHtoEN(input, layout)
      convResult = {
        direction: 'TH→EN',
        convertedText: converted,
        confidence: 99,
        originalText: input,
      }
    }

    setResult(convResult)
    if (convResult.direction !== 'none') {
      setHistory((prev) => [convResult, ...prev].slice(0, 20))
    }
  }, [input, mode, layout])

  // Auto-convert with 300ms debounce
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!input.trim()) {
      setResult(null)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      handleConvert()
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [input, mode, layout, handleConvert])

  const handleCopy = useCallback(async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.convertedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [result])

  const handleClear = useCallback(() => {
    setInput('')
    setResult(null)
  }, [])

  const handleSwap = useCallback(() => {
    if (!result || result.direction === 'none') return
    setInput(result.convertedText)
  }, [result])

  return (
    <section id="converter" className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-indigo-400 mb-3 tracking-wide uppercase">ลองใช้เลย</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            แปลงข้อความ
          </h2>
        </div>

        {/* Controls row: Mode + Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Mode selector */}
          <div className={`flex gap-1 p-1 rounded-2xl ${
            dark ? 'bg-white/[0.04] border border-white/5' : 'bg-gray-100 border border-gray-200'
          }`}>
            {[
              { key: 'auto', label: 'Auto' },
              { key: 'en-to-th', label: 'EN → TH' },
              { key: 'th-to-en', label: 'TH → EN' },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key as Mode)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  mode === m.key
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : dark
                      ? 'text-[#9895ad] hover:text-white hover:bg-white/5'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Layout selector */}
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as Layout)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
              dark
                ? 'bg-white/[0.04] border-white/10 text-[#e8e6f0]'
                : 'bg-white border-gray-200 text-gray-700'
            }`}
          >
            <option value="kedmanee">Kedmanee</option>
            <option value="pattachote">Pattachote</option>
          </select>
        </div>

        {/* Input */}
        <div className={`relative mb-6 rounded-2xl border-2 transition-all focus-within:border-indigo-500/50 ${
          dark
            ? 'bg-white/[0.03] border-white/10'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="วางหรือพิมพ์ข้อความที่ผิดภาษาตรงนี้..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className={`w-full h-36 bg-transparent rounded-2xl px-5 py-4 text-lg focus:outline-none resize-none ${
              dark ? 'text-[#e8e6f0] placeholder-[#4a4760]' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          {input && (
            <button
              onClick={handleClear}
              className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all ${
                dark ? 'text-[#6e6b82] hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Swap button */}
        {result && result.direction !== 'none' && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleSwap}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                dark
                  ? 'text-[#9895ad] hover:text-white hover:bg-white/5'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              สลับ
            </button>
          </div>
        )}

        {/* Result */}
        {result && result.direction !== 'none' && (
          <div className={`rounded-2xl p-6 mb-4 relative animate-fade-up border ${
            dark
              ? 'bg-white/[0.05] border-white/10'
              : 'bg-white border-gray-200 shadow-md'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                result.direction === 'mixed'
                  ? 'bg-purple-500/15 text-purple-400'
                  : 'bg-indigo-500/15 text-indigo-400'
              }`}>
                {result.direction === 'mixed' ? 'Mixed TH+EN' : result.direction}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                result.confidence >= 70
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : result.confidence >= 40
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-red-500/15 text-red-400'
              }`}>
                {result.confidence}%
              </span>
            </div>

            <p className={`text-xl font-medium leading-relaxed break-words ${
              dark ? 'text-[#e8e6f0]' : 'text-gray-900'
            }`}>
              {result.convertedText}
            </p>

            <button
              onClick={handleCopy}
              className={`absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                dark
                  ? 'bg-white/5 text-[#9895ad] hover:bg-white/10 hover:text-white border-white/5'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-200'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        )}

        {result && result.direction === 'none' && (
          <div className={`rounded-2xl p-5 mb-4 text-center animate-fade-up border ${
            dark ? 'bg-white/[0.03] border-white/5' : 'bg-gray-50 border-gray-200'
          }`}>
            <span className={`text-sm ${dark ? 'text-[#6e6b82]' : 'text-gray-500'}`}>
              ข้อความอ่านได้อยู่แล้ว ไม่ต้องแปลง
            </span>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10">
            <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2 ${
              dark ? 'text-[#6e6b82]' : 'text-gray-400'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ประวัติ
            </h3>
            <div className="space-y-1.5">
              {history.slice(0, 5).map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center rounded-xl px-4 py-2.5 text-sm cursor-pointer transition-all duration-200 border ${
                    dark
                      ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06]'
                      : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setInput(item.originalText)
                    setResult(item)
                  }}
                >
                  <span className="text-[10px] text-indigo-400 font-semibold shrink-0 mr-3">{item.direction}</span>
                  <span className={`truncate mr-2 ${dark ? 'text-[#6e6b82]' : 'text-gray-400'}`}>{item.originalText}</span>
                  <span className={`shrink-0 mx-1 ${dark ? 'text-[#4a4760]' : 'text-gray-300'}`}>→</span>
                  <span className={`truncate font-medium ${dark ? 'text-[#e8e6f0]' : 'text-gray-900'}`}>{item.convertedText}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
