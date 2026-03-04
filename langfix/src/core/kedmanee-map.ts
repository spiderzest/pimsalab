// Kedmanee keyboard layout mapping
// Maps English QWERTY keys → Thai characters (when user meant to type Thai but had EN layout)

// Normal keys (no shift)
export const EN_TO_TH_KEDMANEE: Record<string, string> = {
  // Number row
  '`': '_',
  '1': 'ๅ',
  '2': '/',
  '3': '-',
  '4': 'ภ',
  '5': 'ถ',
  '6': 'ุ',
  '7': 'ึ',
  '8': 'ค',
  '9': 'ต',
  '0': 'จ',
  '-': 'ข',
  '=': 'ช',
  // QWERTY row
  'q': 'ๆ',
  'w': 'ไ',
  'e': 'ำ',
  'r': 'พ',
  't': 'ะ',
  'y': 'ั',
  'u': 'ี',
  'i': 'ร',
  'o': 'น',
  'p': 'ย',
  '[': 'บ',
  ']': 'ล',
  '\\': 'ฃ',
  // Home row
  'a': 'ฟ',
  's': 'ห',
  'd': 'ก',
  'f': 'ด',
  'g': 'เ',
  'h': '้',
  'j': '่',
  'k': 'า',
  'l': 'ส',
  ';': 'ว',
  "'": 'ง',
  // Bottom row
  'z': 'ผ',
  'x': 'ป',
  'c': 'แ',
  'v': 'อ',
  'b': 'ิ',
  'n': 'ื',
  'm': 'ท',
  ',': 'ม',
  '.': 'ใ',
  '/': 'ฝ',
};

// Shift keys
export const EN_TO_TH_KEDMANEE_SHIFT: Record<string, string> = {
  // Number row (shift)
  '~': '%',
  '!': '+',
  '@': '๑',
  '#': '๒',
  '$': '๓',
  '%': '๔',
  '^': 'ู',
  '&': '฿',
  '*': '๕',
  '(': '๖',
  ')': '๗',
  '_': '๘',
  '+': '๙',
  // QWERTY row (shift)
  'Q': '๐',
  'W': '"',
  'E': 'ฎ',
  'R': 'ฑ',
  'T': 'ธ',
  'Y': 'ํ',
  'U': '๊',
  'I': 'ณ',
  'O': 'ฯ',
  'P': 'ญ',
  '{': 'ฐ',
  '}': ',',
  '|': 'ฅ',
  // Home row (shift)
  'A': 'ฤ',
  'S': 'ฆ',
  'D': 'ฏ',
  'F': 'โ',
  'G': 'ฌ',
  'H': '็',
  'J': '๋',
  'K': 'ษ',
  'L': 'ศ',
  ':': 'ซ',
  '"': '.',
  // Bottom row (shift)
  'Z': '(',
  'X': ')',
  'C': 'ฉ',
  'V': 'ฮ',
  'B': 'ฺ',
  'N': '์',
  'M': '?',
  '<': 'ฒ',
  '>': 'ฬ',
  '?': 'ฦ',
};

// Combined map for easy lookup
export const FULL_EN_TO_TH: Record<string, string> = {
  ...EN_TO_TH_KEDMANEE,
  ...EN_TO_TH_KEDMANEE_SHIFT,
};

// Reverse map: Thai → English
export const FULL_TH_TO_EN: Record<string, string> = {};
for (const [en, th] of Object.entries(FULL_EN_TO_TH)) {
  FULL_TH_TO_EN[th] = en;
}
