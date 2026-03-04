interface UserManualProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function UserManual({ darkMode, onClose }: UserManualProps) {
  const isMac = navigator.platform.includes('Mac');
  const modKey = isMac ? '⌘' : 'Ctrl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 animate-fade-up ${
          darkMode
            ? 'glass-strong text-[#e8e6f0]'
            : 'bg-white text-gray-900 shadow-2xl'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
            darkMode ? 'hover:bg-white/10 text-[#9895ad]' : 'hover:bg-gray-100 text-gray-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">
            ?
          </div>
          <div>
            <h2 className="text-xl font-bold">คู่มือการใช้งาน</h2>
            <p className={`text-xs ${darkMode ? 'text-[#6e6b82]' : 'text-gray-400'}`}>
              PimSalab v0.1.0
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6">

          {/* What is PimSalab */}
          <Section title="PimSalab คืออะไร?" darkMode={darkMode}>
            <p>
              PimSalab (พิมพ์สลับ) เป็นเครื่องมือแก้ข้อความที่พิมพ์ผิดภาษา
              ระหว่างไทยและอังกฤษ เช่น ตั้งใจจะพิมพ์ "สวัสดี" แต่ลืมเปลี่ยนภาษา
              ทำให้ได้ "l;ylfu" แทน — PimSalab แก้ให้ได้ทันทีจากทุกแอป
            </p>
          </Section>

          {/* Primary: Hotkey usage */}
          <Section title="วิธีใช้งานหลัก — Hotkey" darkMode={darkMode}>
            <p className="mb-3">
              แก้ข้อความพิมพ์ผิดภาษาได้จากทุกแอปบนเครื่อง (LINE, Teams, Word, Chrome ฯลฯ):
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>พิมพ์ข้อความผิดภาษาในแอปใดก็ได้</li>
              <li>ลากเลือก (select) ข้อความที่ต้องการแก้</li>
              <li>
                กด <Kbd darkMode={darkMode}>{modKey}+Shift+L</Kbd>
              </li>
              <li>ข้อความจะถูกแปลงเป็นภาษาที่ถูกต้องอัตโนมัติ!</li>
            </ol>

            {/* Example */}
            <div className={`mt-4 p-3 rounded-xl font-mono text-xs ${
              darkMode ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <p className={darkMode ? 'text-[#6e6b82]' : 'text-gray-400'}>ตัวอย่าง:</p>
              <p className="mb-1"><span className="text-[#6e6b82] line-through">l;ylfu</span> → <span className="text-emerald-400 font-semibold">สวัสดี</span></p>
              <p><span className="text-[#6e6b82] line-through">้ำสสน ไนพสก</span> → <span className="text-emerald-400 font-semibold">hello world</span></p>
            </div>

            <div className={`mt-3 p-3 rounded-xl text-xs ${
              darkMode ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-50 text-amber-700'
            }`}>
              หมายเหตุ: ครั้งแรกที่ใช้งาน macOS จะขออนุญาต Accessibility —
              ไปที่ <span className="font-semibold">System Settings &gt; Privacy &amp; Security &gt; Accessibility</span> แล้วเปิดให้ PimSalab
            </div>
          </Section>

          {/* Secondary: In-app usage */}
          <Section title="วิธีใช้งานในแอป (ทางเลือก)" darkMode={darkMode}>
            <p className="mb-2">
              นอกจาก hotkey แล้ว ยังสามารถวางข้อความในหน้าต่าง PimSalab ได้:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>กดปุ่ม "หรือวางข้อความที่นี่" เพื่อเปิดช่องแปลงข้อความ</li>
              <li>วางหรือพิมพ์ข้อความที่ผิดภาษา</li>
              <li>
                กดปุ่ม <span className="font-semibold text-indigo-400">แปลงภาษา</span> หรือ{' '}
                <Kbd darkMode={darkMode}>{modKey}+Enter</Kbd>
              </li>
              <li>กดปุ่มคัดลอกเพื่อนำผลลัพธ์ไปใช้</li>
            </ol>
          </Section>

          {/* Keyboard layouts */}
          <Section title="รูปแบบแป้นพิมพ์" darkMode={darkMode}>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Kedmanee (เกษมณี)</span> — แป้นพิมพ์ไทยมาตรฐาน
                ที่ใช้กันทั่วไป เป็นค่าเริ่มต้น
              </li>
              <li>
                <span className="font-semibold">Pattachote (ปัตตะโชติ)</span> — แป้นพิมพ์ไทยแบบทางเลือก
                ออกแบบให้พิมพ์เร็วขึ้น
              </li>
            </ul>
            <p className={`mt-2 text-xs ${darkMode ? 'text-[#6e6b82]' : 'text-gray-400'}`}>
              เลือกรูปแบบแป้นพิมพ์ได้ที่มุมขวาบนของแอป
            </p>
          </Section>

          {/* Shortcuts */}
          <Section title="ปุ่มลัด" darkMode={darkMode}>
            <div className="space-y-2">
              <ShortcutRow
                darkMode={darkMode}
                keys={`${modKey}+Shift+L`}
                desc="แปลงข้อความที่เลือก (จากทุกแอป)"
              />
              <ShortcutRow
                darkMode={darkMode}
                keys={`${modKey}+Enter`}
                desc="แปลงภาษา (ในช่องข้อความ)"
              />
              <ShortcutRow
                darkMode={darkMode}
                keys={`${modKey}+C`}
                desc="คัดลอกผลลัพธ์"
              />
            </div>
          </Section>

          {/* System tray */}
          <Section title="System Tray" darkMode={darkMode}>
            <p>
              PimSalab จะแสดงไอคอนบนแถบเมนู (menu bar) เสมอ
              คลิกขวาที่ไอคอนเพื่อ:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><span className="font-semibold">เปิด PimSalab</span> — แสดงหน้าต่างแอป</li>
              <li><span className="font-semibold">ออก</span> — ปิดแอปทั้งหมด</li>
            </ul>
          </Section>

          {/* FAQ */}
          <Section title="คำถามที่พบบ่อย" darkMode={darkMode}>
            <div className="space-y-4">
              <Faq
                darkMode={darkMode}
                q="ทำไมกด hotkey แล้วไม่ทำงาน?"
                a="ตรวจสอบว่าได้อนุญาต Accessibility ให้ PimSalab แล้ว ไปที่ System Settings > Privacy & Security > Accessibility และเปิดให้ PimSalab"
              />
              <Faq
                darkMode={darkMode}
                q="ทำไมบางคำแปลงไม่ถูก?"
                a="ระบบตรวจจับทิศทางอัตโนมัติ บางคำที่หายากหรือคำทับศัพท์อาจผิดพลาดได้ ลองใช้ช่องแปลงข้อความในแอปพร้อมเลือกโหมด EN→TH หรือ TH→EN เอง"
              />
              <Faq
                darkMode={darkMode}
                q="รองรับแป้นพิมพ์อะไรบ้าง?"
                a="รองรับ Kedmanee (เกษมณี) และ Pattachote (ปัตตะโชติ) ซึ่งครอบคลุมผู้ใช้ภาษาไทยเกือบทั้งหมด"
              />
              <Faq
                darkMode={darkMode}
                q="ใช้ฟรีไหม?"
                a="ใช้ฟรีได้ไม่จำกัด! ทั้งการแปลงผ่าน hotkey และในแอป"
              />
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className={`mt-8 pt-4 border-t text-center text-xs ${
          darkMode ? 'border-white/5 text-[#6e6b82]' : 'border-gray-100 text-gray-400'
        }`}>
          PimSalab v0.1.0 — สร้างด้วยความใส่ใจเพื่อคนไทย
        </div>
      </div>
    </div>
  );
}

// Sub-components

function Section({ title, darkMode, children }: { title: string; darkMode: boolean; children: React.ReactNode }) {
  return (
    <div>
      <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
        {title}
      </h3>
      <div className={`text-sm leading-relaxed ${darkMode ? 'text-[#b8b5c8]' : 'text-gray-600'}`}>
        {children}
      </div>
    </div>
  );
}

function Kbd({ darkMode, children }: { darkMode: boolean; children: React.ReactNode }) {
  return (
    <kbd className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-mono font-medium ${
      darkMode
        ? 'bg-white/10 text-[#e8e6f0] border border-white/10'
        : 'bg-gray-100 text-gray-800 border border-gray-200'
    }`}>
      {children}
    </kbd>
  );
}

function ShortcutRow({ darkMode, keys, desc }: { darkMode: boolean; keys: string; desc: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${darkMode ? 'text-[#b8b5c8]' : 'text-gray-600'}`}>{desc}</span>
      <Kbd darkMode={darkMode}>{keys}</Kbd>
    </div>
  );
}

function Faq({ darkMode, q, a }: { darkMode: boolean; q: string; a: string }) {
  return (
    <div>
      <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-[#e8e6f0]' : 'text-gray-800'}`}>
        {q}
      </p>
      <p className={`text-sm ${darkMode ? 'text-[#9895ad]' : 'text-gray-500'}`}>
        {a}
      </p>
    </div>
  );
}
