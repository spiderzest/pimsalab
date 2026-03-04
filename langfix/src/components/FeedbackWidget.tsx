import { useState } from 'react';
import type { DetectionResult } from '../core/detector';

interface FeedbackWidgetProps {
  result: DetectionResult;
}

type FeedbackReason = 'wrong_chars' | 'wrong_direction' | 'unreadable' | 'other';

export default function FeedbackWidget({ result }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [reason, setReason] = useState<FeedbackReason | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleThumbsUp = () => {
    setFeedback('up');
    setShowDetail(false);
    // In production: send to analytics
    console.log('Feedback: positive', { result });
  };

  const handleThumbsDown = () => {
    setFeedback('down');
    setShowDetail(true);
  };

  const handleSubmitDetail = () => {
    // In production: send to analytics/backend
    console.log('Feedback: negative', { result, reason, comment });
    setSubmitted(true);
    setTimeout(() => {
      setShowDetail(false);
      setSubmitted(false);
    }, 2000);
  };

  const reasons: { key: FeedbackReason; label: string }[] = [
    { key: 'wrong_chars', label: 'แปลงผิดบางตัวอักษร' },
    { key: 'wrong_direction', label: 'แปลงผิดทิศทาง' },
    { key: 'unreadable', label: 'ผลลัพธ์อ่านไม่รู้เรื่อง' },
    { key: 'other', label: 'อื่นๆ' },
  ];

  return (
    <div className="mb-6">
      {/* Thumbs row */}
      <div className="flex items-center gap-3 justify-center">
        <span className="text-sm text-gray-500">ผลลัพธ์ถูกต้องไหม?</span>
        <button
          onClick={handleThumbsUp}
          className={`p-2 rounded-lg transition-all ${
            feedback === 'up'
              ? 'bg-green-600/20 text-green-400 scale-110'
              : 'text-gray-500 hover:text-green-400 hover:bg-green-600/10'
          }`}
        >
          <svg className="w-5 h-5" fill={feedback === 'up' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
          </svg>
        </button>
        <button
          onClick={handleThumbsDown}
          className={`p-2 rounded-lg transition-all ${
            feedback === 'down'
              ? 'bg-red-600/20 text-red-400 scale-110'
              : 'text-gray-500 hover:text-red-400 hover:bg-red-600/10'
          }`}
        >
          <svg className="w-5 h-5" fill={feedback === 'down' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v3.586a1 1 0 01-.293.707l-2 2A1 1 0 016 20.586V15m4 0h5.17a2 2 0 001.98-1.742l.87-6.09A2 2 0 0016.04 5H10m0 10V5m0 0H8.5" />
          </svg>
        </button>
        {feedback === 'up' && (
          <span className="text-sm text-green-400 animate-in">ขอบคุณ!</span>
        )}
      </div>

      {/* Detail form when thumbs down */}
      {showDetail && !submitted && (
        <div className="mt-3 bg-surface-light border border-gray-700 rounded-xl p-4 animate-in">
          <p className="text-sm text-gray-300 mb-3">ผิดตรงไหน?</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {reasons.map((r) => (
              <button
                key={r.key}
                onClick={() => setReason(r.key)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  reason === r.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-surface-lighter text-gray-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="พิมพ์เพิ่มเติม (optional)..."
            className="w-full h-20 bg-surface-lighter border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-3"
          />
          <button
            onClick={handleSubmitDetail}
            disabled={!reason}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ส่ง Feedback
          </button>
        </div>
      )}

      {/* Submitted confirmation */}
      {submitted && (
        <div className="mt-3 text-center text-sm text-green-400 animate-in">
          ขอบคุณสำหรับ feedback! เราจะนำไปปรับปรุงต่อ
        </div>
      )}
    </div>
  );
}
