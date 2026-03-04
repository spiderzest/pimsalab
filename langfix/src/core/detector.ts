import { convertENtoTH, convertTHtoEN, type Layout } from './converter';

// Thai character ranges
const THAI_CONSONANT_REGEX = /[\u0E01-\u0E2E]/;
const THAI_VOWEL_REGEX = /[\u0E30-\u0E3A\u0E40-\u0E45]/;
const THAI_TONE_REGEX = /[\u0E48-\u0E4B]/;

// Thai above/below vowels that MUST follow a consonant (cannot start a word)
const THAI_ABOVE_BELOW_VOWELS = /^[\u0E31\u0E34-\u0E3A\u0E47-\u0E4B]/; // ั ิ ี ึ ื ุ ู ็ ่ ้ ๊ ๋

// Common Thai words/subwords for validation
const THAI_COMMON_WORDS = new Set([
  'กิน', 'ดู', 'ไป', 'มา', 'ทำ', 'ดี', 'ไม่', 'ได้', 'จะ', 'ก็',
  'ที่', 'ของ', 'ใน', 'มี', 'คือ', 'อยู่', 'กับ', 'ให้', 'เป็น', 'ว่า',
  'แต่', 'หรือ', 'ถ้า', 'เรา', 'คุณ', 'เขา', 'นี้', 'นั้น', 'กัน', 'แล้ว',
  'จาก', 'เอา', 'ขอ', 'ต้อง', 'อยาก', 'ชอบ', 'เห็น', 'พูด', 'รู้', 'คิด',
  'คน', 'วัน', 'ปี', 'เดือน', 'บาท', 'ครับ', 'ค่ะ', 'นะ', 'จ้า', 'สิ',
  'หนึ่ง', 'สอง', 'สาม', 'ตอน', 'เวลา', 'บ้าน', 'เงิน', 'งาน', 'ใจ', 'อะไร',
  'ทำไม', 'อย่าง', 'เพราะ', 'สวัสดี', 'ขอบคุณ', 'หมด', 'เหงา', 'มัน', 'สนุก',
  'กลับ', 'ต่อ', 'ออก', 'ขึ้น', 'ลง', 'เข้า', 'ถึง', 'ผ่าน', 'ระหว่าง',
  'จริง', 'ตัว', 'เอง', 'โดย', 'กว่า', 'หลัง', 'ก่อน', 'ยัง', 'ตาม', 'ผ่าน',
  'โอเค', 'ดีมาก', 'โทร', 'พี่', 'น้อง', 'แม่', 'พ่อ', 'ลูก', 'เพื่อน', 'เมีย',
  'อัน', 'คำ', 'เรื่อง', 'อย่า', 'ช่วย', 'บอก', 'ถาม', 'ตอบ', 'เปิด', 'ปิด',
  'ใหม่', 'เก่า', 'สูง', 'ต่ำ', 'ใหญ่', 'เล็ก', 'มาก', 'น้อย', 'เร็ว', 'ช้า',
  'ร้อน', 'เย็น', 'ง่าย', 'ยาก', 'สวย', 'ดัง', 'เงียบ', 'สุข', 'ทุกข์',
  'ข้าว', 'น้ำ', 'หิว', 'อิ่ม', 'กลัว', 'รัก', 'เกลียด', 'โกรธ', 'หัวเราะ', 'ร้องไห้',
  'แรก', 'สุด', 'ซ้าย', 'ขวา', 'บน', 'ล่าง', 'หน้า', 'หลัง', 'ข้าง', 'นอก',
  'โซ', 'ซะ', 'หิวโซ',
]);

// Common English words for validation after TH→EN conversion
const EN_COMMON_WORDS = new Set([
  'i', 'a', 'the', 'is', 'it', 'in', 'to', 'of', 'and', 'or',
  'that', 'this', 'for', 'are', 'was', 'not', 'but', 'you', 'all', 'can',
  'had', 'her', 'one', 'our', 'out', 'has', 'get', 'its', 'let', 'say',
  'she', 'too', 'use', 'him', 'how', 'man', 'did', 'old', 'see', 'now',
  'way', 'may', 'day', 'who', 'boy', 'his', 'got', 'own', 'us', 'if',
  'my', 'do', 'no', 'he', 'up', 'so', 'we', 'me', 'an', 'am', 'at', 'be',
  'go', 'by', 'on', 'as',
  'what', 'when', 'make', 'like', 'time', 'just', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'them', 'than',
  'then', 'look', 'only', 'come', 'over', 'such', 'after', 'also',
  'back', 'work', 'first', 'even', 'give', 'most', 'find', 'here',
  'thing', 'many', 'well', 'with', 'from', 'have', 'been', 'will',
  'they', 'each', 'which', 'their', 'said', 'about', 'would', 'there',
  'could', 'other', 'more', 'very', 'these', 'where', 'should', 'still',
  'world', 'never', 'think', 'again', 'while', 'every', 'might',
  'hello', 'help', 'love', 'life', 'need', 'want', 'feel', 'mind',
  'home', 'hand', 'high', 'last', 'long', 'great', 'little', 'right',
  'small', 'large', 'next', 'early', 'young', 'important', 'few', 'bad',
  'same', 'able', 'keep', 'must', 'call', 'before', 'down', 'side',
  'been', 'head', 'name', 'much', 'left', 'part', 'real', 'best',
  'new', 'big', 'end', 'put', 'run', 'set', 'try', 'ask', 'went',
  'men', 'read', 'tell', 'does', 'off', 'line', 'turn', 'move', 'live',
  'play', 'open', 'show', 'kind', 'done', 'hard', 'stop', 'sure',
  'broken', 'morning', 'night', 'today', 'tomorrow', 'because',
  'sorry', 'happy', 'please', 'thank', 'thanks', 'okay', 'yes', 'yeah',
]);

// Common Thai subword patterns (2-char) that appear in real words
const THAI_BIGRAMS = new Set([
  'กร', 'กล', 'กว', 'ขร', 'คร', 'คล', 'คว', 'ปร', 'ปล', 'พร', 'พล',
  'ตร', 'ทร', 'สร', 'กา', 'กิ', 'กี', 'กุ', 'กู', 'เก', 'แก', 'โก',
  'ขอ', 'คน', 'คำ', 'งา', 'จะ', 'จา', 'ชา', 'ซึ', 'ดี', 'ดู', 'ตา',
  'ตี', 'ถู', 'ทำ', 'ที', 'นี', 'นั', 'บา', 'บ้', 'ปี', 'ผม', 'ฝ่',
  'พี', 'พ่', 'ฟ้', 'มา', 'มี', 'ยา', 'รู', 'ลง', 'วั', 'สา', 'สี',
  'หม', 'หน', 'หล', 'อา', 'อย', 'ฮา', 'เก', 'เข', 'เค', 'เง', 'เจ',
  'เช', 'เด', 'เต', 'เท', 'เน', 'เป', 'เพ', 'เม', 'เร', 'เล', 'เว',
  'เห', 'เอ', 'แก', 'แข', 'แค', 'แจ', 'แต', 'แน', 'แบ', 'แป', 'แพ',
  'แม', 'แร', 'แล', 'แส', 'แห', 'โก', 'โข', 'โค', 'โด', 'โต', 'โท',
  'โน', 'โป', 'โร', 'โล', 'โอ', 'ไก', 'ไข', 'ไค', 'ไท', 'ไป', 'ไม',
  'ไว', 'ไห', 'ไอ', 'ใจ', 'ใน', 'ใช', 'ใค', 'ให',
]);

function countThaiChars(text: string): number {
  return (text.match(/[\u0E00-\u0E7F]/g) || []).length;
}

function countEnglishChars(text: string): number {
  return (text.match(/[a-zA-Z]/g) || []).length;
}

/**
 * Score a single word/segment as valid Thai.
 * Higher score = more likely to be intentional Thai text.
 */
function scoreThaiWord(word: string): number {
  if (!word || word.length === 0) return 0;

  const thaiChars = countThaiChars(word);
  if (thaiChars === 0) return 0;

  let score = 0;

  // 1. Structural validity: penalize invalid starting characters
  if (THAI_ABOVE_BELOW_VOWELS.test(word)) {
    // Starts with above/below vowel or tone mark — very likely garbled
    score -= 40;
  }

  // 2. Check for known Thai words (exact match or contained)
  if (THAI_COMMON_WORDS.has(word)) {
    return 95; // Definitely Thai
  }

  // Check if the word contains known Thai words as substrings
  let subwordMatches = 0;
  for (const tw of THAI_COMMON_WORDS) {
    if (tw.length >= 2 && word.includes(tw)) {
      subwordMatches++;
    }
  }
  if (subwordMatches >= 3) return 90;
  if (subwordMatches >= 2) score += 40;
  if (subwordMatches >= 1) score += 25;

  // 3. Check Thai bigrams
  let bigramHits = 0;
  for (let i = 0; i < word.length - 1; i++) {
    const bigram = word.slice(i, i + 2);
    if (THAI_BIGRAMS.has(bigram)) bigramHits++;
  }
  const bigramRatio = word.length > 1 ? bigramHits / (word.length - 1) : 0;
  score += bigramRatio * 30;

  // 4. Thai character ratio
  const thaiRatio = thaiChars / word.length;
  score += thaiRatio * 20;

  // 5. Has proper consonant-vowel structure
  if (THAI_CONSONANT_REGEX.test(word) && THAI_VOWEL_REGEX.test(word)) {
    score += 10;
  }

  // 6. Has tone marks (common in real Thai)
  if (THAI_TONE_REGEX.test(word)) {
    score += 5;
  }

  return Math.max(0, Math.min(score, 100));
}

/**
 * Score a converted English word.
 * Higher = more likely to be valid English.
 */
function scoreEnglishWord(word: string): number {
  if (!word) return 0;
  const lower = word.toLowerCase();

  // Exact match in common words → very high
  if (EN_COMMON_WORDS.has(lower)) return 95;

  // Check if it looks like English (has vowels, reasonable length)
  const hasVowel = /[aeiou]/i.test(word);
  const allAlpha = /^[a-zA-Z]+$/.test(word);
  const goodLength = word.length >= 2 && word.length <= 15;

  let score = 0;
  if (allAlpha) score += 30;
  if (hasVowel) score += 20;
  if (goodLength) score += 10;

  return Math.min(score, 100);
}

/**
 * Determine whether a single segment should be kept as-is or converted.
 * Returns the best version of the segment.
 */
function processSegment(
  segment: string,
  layout: Layout
): { text: string; converted: boolean; direction: 'EN→TH' | 'TH→EN' | 'none' } {
  if (!segment || segment.trim().length === 0) {
    return { text: segment, converted: false, direction: 'none' };
  }

  const thaiChars = countThaiChars(segment);
  const enChars = countEnglishChars(segment);

  // Pure punctuation / numbers — keep as-is
  if (thaiChars === 0 && enChars === 0) {
    return { text: segment, converted: false, direction: 'none' };
  }

  // Segment is mostly Thai characters
  if (thaiChars > 0 && enChars === 0) {
    const thaiScore = scoreThaiWord(segment);

    // Try converting TH→EN and see if result is better
    const enVersion = convertTHtoEN(segment, layout);
    const enScore = scoreEnglishWord(enVersion);

    // If Thai score is high → keep Thai
    if (thaiScore >= 50) {
      return { text: segment, converted: false, direction: 'none' };
    }

    // If English conversion is clearly better
    if (enScore > thaiScore && enScore >= 40) {
      return { text: enVersion, converted: true, direction: 'TH→EN' };
    }

    // Default: keep as Thai if score is reasonable
    if (thaiScore >= 30) {
      return { text: segment, converted: false, direction: 'none' };
    }

    // Low Thai score and English score is OK → convert
    if (enScore >= 30) {
      return { text: enVersion, converted: true, direction: 'TH→EN' };
    }

    // Fallback: keep as-is
    return { text: segment, converted: false, direction: 'none' };
  }

  // Segment is mostly English characters
  if (enChars > 0 && thaiChars === 0) {
    // Try converting EN→TH
    const thVersion = convertENtoTH(segment, layout);
    const thaiScore = scoreThaiWord(thVersion);
    const enScore = scoreEnglishWord(segment);

    // If English is already valid → keep
    if (enScore >= 50) {
      return { text: segment, converted: false, direction: 'none' };
    }

    // If Thai conversion is better
    if (thaiScore > enScore && thaiScore >= 40) {
      return { text: thVersion, converted: true, direction: 'EN→TH' };
    }

    if (enScore >= 30) {
      return { text: segment, converted: false, direction: 'none' };
    }

    if (thaiScore >= 30) {
      return { text: thVersion, converted: true, direction: 'EN→TH' };
    }

    return { text: segment, converted: false, direction: 'none' };
  }

  // Mixed characters in single segment — keep as-is
  return { text: segment, converted: false, direction: 'none' };
}

export interface DetectionResult {
  direction: Direction;
  convertedText: string;
  confidence: number;
  originalText: string;
}

type Direction = 'EN→TH' | 'TH→EN' | 'mixed' | 'none';

export function detectAndConvert(text: string, layout: Layout = 'kedmanee'): DetectionResult {
  if (!text || text.trim().length === 0) {
    return { direction: 'none', convertedText: text, confidence: 0, originalText: text };
  }

  // Split text into segments by spaces, preserving spaces
  const parts = text.split(/(\s+)/);
  const results: { text: string; converted: boolean; direction: string }[] = [];

  let convertedCount = 0;
  let totalSegments = 0;
  let enToThCount = 0;
  let thToEnCount = 0;

  for (const part of parts) {
    // Preserve whitespace as-is
    if (/^\s+$/.test(part)) {
      results.push({ text: part, converted: false, direction: 'none' });
      continue;
    }

    totalSegments++;
    const segResult = processSegment(part, layout);
    results.push(segResult);

    if (segResult.converted) {
      convertedCount++;
      if (segResult.direction === 'EN→TH') enToThCount++;
      if (segResult.direction === 'TH→EN') thToEnCount++;
    }
  }

  const convertedText = results.map((r) => r.text).join('');

  // Determine overall direction
  let direction: Direction = 'none';
  if (convertedCount === 0) {
    direction = 'none';
  } else if (enToThCount > 0 && thToEnCount > 0) {
    direction = 'mixed';
  } else if (enToThCount > 0) {
    direction = 'EN→TH';
  } else if (thToEnCount > 0) {
    direction = 'TH→EN';
  }

  // Calculate confidence
  let confidence = 0;
  if (totalSegments > 0 && convertedCount > 0) {
    confidence = Math.round(Math.min((convertedCount / totalSegments) * 80 + 20, 99));
  }

  return {
    direction,
    convertedText,
    confidence,
    originalText: text,
  };
}
