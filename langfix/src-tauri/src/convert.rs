use std::collections::HashMap;

fn build_kedmanee_en_to_th() -> HashMap<char, char> {
    let pairs: Vec<(char, char)> = vec![
        ('1', 'ๅ'), ('2', '/'), ('3', '-'), ('4', 'ภ'), ('5', 'ถ'),
        ('6', 'ุ'), ('7', 'ึ'), ('8', 'ค'), ('9', 'ต'), ('0', 'จ'),
        ('-', 'ข'), ('=', 'ช'),
        ('q', 'ๆ'), ('w', 'ไ'), ('e', 'ำ'), ('r', 'พ'), ('t', 'ะ'),
        ('y', 'ั'), ('u', 'ี'), ('i', 'ร'), ('o', 'น'), ('p', 'ย'),
        ('[', 'บ'), (']', 'ล'),
        ('a', 'ฟ'), ('s', 'ห'), ('d', 'ก'), ('f', 'ด'), ('g', 'เ'),
        ('h', '้'), ('j', '่'), ('k', 'า'), ('l', 'ส'), (';', 'ว'),
        ('\'', 'ง'),
        ('z', 'ผ'), ('x', 'ป'), ('c', 'แ'), ('v', 'อ'), ('b', 'ิ'),
        ('n', 'ื'), ('m', 'ท'), (',', 'ม'), ('.', 'ใ'), ('/', 'ฝ'),
        ('!', '+'), ('@', '๑'), ('#', '๒'), ('$', '๓'), ('%', '๔'),
        ('^', 'ู'), ('&', '฿'), ('*', '๕'), ('(', '๖'), (')', '๗'),
        ('_', '๘'), ('+', '๙'),
        ('Q', '๐'), ('W', '"'), ('E', 'ฎ'), ('R', 'ฑ'), ('T', 'ธ'),
        ('Y', 'ํ'), ('U', '๊'), ('I', 'ณ'), ('O', 'ฯ'), ('P', 'ญ'),
        ('{', 'ฐ'), ('}', ','),
        ('A', 'ฤ'), ('S', 'ฆ'), ('D', 'ฏ'), ('F', 'โ'), ('G', 'ฌ'),
        ('H', '็'), ('J', '๋'), ('K', 'ษ'), ('L', 'ศ'), (':', 'ซ'),
        ('"', '.'),
        ('Z', '('), ('X', ')'), ('C', 'ฉ'), ('V', 'ฮ'), ('B', 'ฺ'),
        ('N', '์'), ('M', '?'), ('<', 'ฒ'), ('>', 'ฬ'), ('?', 'ฦ'),
        ('\\', 'ฃ'), ('|', 'ฅ'),
    ];
    pairs.into_iter().collect()
}

fn build_th_to_en(en_to_th: &HashMap<char, char>) -> HashMap<char, char> {
    en_to_th.iter().map(|(&k, &v)| (v, k)).collect()
}

fn has_thai(text: &str) -> bool {
    text.chars().any(|c| ('\u{0E01}'..='\u{0E5B}').contains(&c))
}

fn has_latin(text: &str) -> bool {
    text.chars().any(|c| c.is_ascii_alphabetic())
}

fn is_thai_char(c: char) -> bool {
    ('\u{0E01}'..='\u{0E5B}').contains(&c)
}

/// Simple Thai word validation — checks if the text looks like valid Thai
fn looks_like_valid_thai(segment: &str) -> bool {
    let thai_count = segment.chars().filter(|&c| is_thai_char(c)).count();
    let total = segment.chars().filter(|c| !c.is_whitespace()).count();
    if total == 0 {
        return true;
    }
    let ratio = thai_count as f64 / total as f64;

    // Common Thai words for quick validation
    let common: Vec<&str> = vec![
        "ก็", "กัน", "กับ", "การ", "กิน", "ของ", "ขอ", "ขึ้น",
        "คน", "ครับ", "คะ", "ค่ะ", "ความ", "คือ", "จะ", "จาก",
        "จัง", "จริง", "ช่วย", "ซะ", "ดี", "ด้วย", "ได้", "ตอน",
        "ที่", "ทำ", "ทำไม", "ทุก", "นะ", "นั้น", "นี้", "นี่",
        "บ้าง", "ไป", "เป็น", "แล้ว", "และ", "ว่า", "สิ", "หรือ",
        "อยู่", "อะไร", "เอา", "แต่", "ให้", "มา", "มี", "ไม่",
        "เรา", "เลย", "หา", "อัน", "เหมือน", "ก่อน", "หลัง",
        "ยัง", "คง", "ต้อง", "ถ้า", "แค่", "มัน", "จริง",
        "ไหม", "หมด", "เหงา", "หิว", "โซ",
    ];

    // If it matches a known Thai word, it's valid
    if common.contains(&segment) {
        return true;
    }

    // If mostly Thai characters, consider it valid Thai
    ratio > 0.7
}

pub fn detect_and_convert(text: &str) -> String {
    let en_to_th = build_kedmanee_en_to_th();
    let th_to_en = build_th_to_en(&en_to_th);

    let segments: Vec<&str> = text.split(' ').collect();
    let mut result_parts: Vec<String> = Vec::new();

    for segment in segments {
        if segment.is_empty() {
            result_parts.push(String::new());
            continue;
        }

        if has_thai(segment) && !has_latin(segment) {
            // Segment has Thai chars — check if it's valid Thai or needs TH→EN conversion
            if looks_like_valid_thai(segment) {
                // Keep as-is — it's real Thai
                result_parts.push(segment.to_string());
            } else {
                // Try converting TH→EN
                let converted: String = segment
                    .chars()
                    .map(|c| *th_to_en.get(&c).unwrap_or(&c))
                    .collect();
                // Check if conversion produces readable English
                if converted.chars().any(|c| c.is_ascii_alphabetic()) {
                    result_parts.push(converted);
                } else {
                    result_parts.push(segment.to_string());
                }
            }
        } else if has_latin(segment) && !has_thai(segment) {
            // Segment has only Latin chars — convert EN→TH
            let converted: String = segment
                .chars()
                .map(|c| *en_to_th.get(&c).unwrap_or(&c))
                .collect();
            result_parts.push(converted);
        } else {
            // Mixed or other — keep as-is
            result_parts.push(segment.to_string());
        }
    }

    result_parts.join(" ")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_en_to_th() {
        let result = detect_and_convert("dbo:t");
        assert!(result.contains("กินซะ") || result.contains("กิน"));
    }

    #[test]
    fn test_mixed_keep_thai() {
        let result = detect_and_convert("ทำไม่มันเหงาไปหมด");
        // Should keep valid Thai as-is
        assert!(result.contains("ทำไม่มันเหงาไปหมด"));
    }
}
