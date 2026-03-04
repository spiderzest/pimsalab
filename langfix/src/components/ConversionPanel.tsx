import { useState, useCallback } from 'react';
import { convertENtoTH, convertTHtoEN, type Layout } from '../core/converter';
import { detectAndConvert, type DetectionResult } from '../core/detector';
import FeedbackWidget from './FeedbackWidget';

type Mode = 'auto' | 'en-to-th' | 'th-to-en';

interface ConversionPanelProps {
  layout: Layout;
}

export default function ConversionPanel({ layout }: ConversionPanelProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [mode, setMode] = useState<Mode>('auto');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<DetectionResult[]>([]);

  const handleConvert = useCallback(() => {
    if (!input.trim()) return;

    let convResult: DetectionResult;

    if (mode === 'auto') {
      convResult = detectAndConvert(input, layout);
    } else if (mode === 'en-to-th') {
      const converted = convertENtoTH(input, layout);
      convResult = {
        direction: 'EN→TH',
        convertedText: converted,
        confidence: 99,
        originalText: input,
      };
    } else {
      const converted = convertTHtoEN(input, layout);
      convResult = {
        direction: 'TH→EN',
        convertedText: converted,
        confidence: 99,
        originalText: input,
      };
    }

    setResult(convResult);
    if (convResult.direction !== 'none') {
      setHistory((prev) => [convResult, ...prev].slice(0, 20));
    }
  }, [input, mode, layout]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const handleClear = useCallback(() => {
    setInput('');
    setResult(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleConvert();
      }
    },
    [handleConvert]
  );

  const handlePaste = useCallback(() => {
    setTimeout(() => {
      if (mode === 'auto') {
        handleConvert();
      }
    }, 100);
  }, [mode, handleConvert]);

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Mode selector — pill style */}
      <div className="flex gap-1.5 mb-6 justify-center glass rounded-2xl p-1.5 max-w-fit mx-auto">
        {[
          { key: 'auto', label: 'Auto' },
          { key: 'en-to-th', label: 'EN → TH' },
          { key: 'th-to-en', label: 'TH → EN' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key as Mode)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === m.key
                ? 'bg-indigo-500/90 text-white shadow-lg shadow-indigo-500/25'
                : 'text-[#9895ad] hover:text-[#e8e6f0] hover:bg-white/5'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Input — glassmorphism card */}
      <div className="relative mb-6 glass-strong rounded-2xl glow-focus transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="วางหรือพิมพ์ข้อความที่ผิดภาษาตรงนี้..."
          className="w-full h-32 bg-transparent rounded-2xl px-5 py-4 text-lg text-[#e8e6f0] placeholder-[#4a4760] focus:outline-none resize-none"
          autoFocus
        />
        {input && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[#6e6b82] hover:text-[#e8e6f0] hover:bg-white/5 transition-all"
            title="ล้าง"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Convert button — with pulse glow */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className={`px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl
            hover:from-indigo-400 hover:to-purple-400 active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100
            shadow-lg shadow-indigo-500/20 transition-all duration-200 text-base
            ${input.trim() ? 'pulse-glow' : ''}`}
        >
          แปลงภาษา
        </button>
        <span className="ml-3 text-xs text-[#4a4760] self-center hidden sm:block">
          {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}+Enter
        </span>
      </div>

      {/* Result — glassmorphism + fade-in */}
      {result && result.direction !== 'none' && (
        <div className="glass-strong rounded-2xl p-6 mb-4 relative animate-fade-up">
          {/* Direction & Confidence badge */}
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

          {/* Converted text */}
          <p className="text-xl font-medium text-[#e8e6f0] leading-relaxed break-words">
            {result.convertedText}
          </p>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
              bg-white/5 text-[#9895ad] hover:bg-white/10 hover:text-[#e8e6f0] border border-white/5
              transition-all duration-200"
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

      {/* No conversion needed */}
      {result && result.direction === 'none' && (
        <div className="glass rounded-2xl p-5 mb-4 text-center animate-fade-up">
          <span className="text-sm text-[#6e6b82]">
            ข้อความอ่านได้อยู่แล้ว ไม่ต้องแปลง
          </span>
        </div>
      )}

      {/* Feedback */}
      {result && result.direction !== 'none' && (
        <FeedbackWidget result={result} />
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6e6b82] mb-3 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </h3>
          <div className="space-y-1.5">
            {history.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="glass flex items-center rounded-xl px-4 py-2.5 text-sm cursor-pointer
                  hover:bg-white/8 transition-all duration-200"
                onClick={() => {
                  setInput(item.originalText);
                  setResult(item);
                }}
              >
                <span className="text-[10px] text-indigo-400 font-semibold shrink-0 mr-3">{item.direction}</span>
                <span className="text-[#6e6b82] truncate mr-2">{item.originalText}</span>
                <span className="text-[#4a4760] shrink-0 mx-1">→</span>
                <span className="text-[#e8e6f0] truncate font-medium">{item.convertedText}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
