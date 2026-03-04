# PimSalab — Project Hub

แอปแก้ข้อความที่พิมพ์ผิดภาษาระหว่างไทย-อังกฤษ รองรับทั้ง Web และ Desktop (Tauri)

---

## Tech Stack

### Web App (Landing Page)
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4
- **Font:** Prompt (Google Fonts)
- **Deploy:** Static (Vercel / Netlify)

### Desktop App
- **Framework:** Tauri v2 (Rust + WebView)
- **Frontend:** React 19 + TypeScript (shared core)
- **Global Hotkey:** ⌘+Shift+L (Mac) / Ctrl+Shift+L (Win)
- **Clipboard:** arboard crate (Rust)
- **Target:** macOS, Windows

### Core Engine
- **Language:** TypeScript (web) + Rust (desktop)
- **Detection:** Thai Unicode range analysis + confidence scoring
- **Layouts:** Kedmanee (default), Pattachote
- **Features:** Auto-detect direction, Mixed TH+EN support, Real-time conversion

---

## Business Model Canvas

| Component | Detail |
|---|---|
| **Customer Segments** | คนไทยที่ใช้คอมพ์ทุกวัน, โปรแกรมเมอร์, พนักงานออฟฟิศ, นักเรียน/นักศึกษา |
| **Value Propositions** | แก้ข้อความผิดภาษาทันทีด้วยปุ่มเดียว, ใช้ได้ทุกแอป, ฟรี, ไม่ต้องติดตั้งบน Web |
| **Channels** | Landing Page, GitHub, Social Media (Twitter/Facebook), Mac App Store (อนาคต) |
| **Customer Relationships** | Self-service, Open-source community, GitHub Issues |
| **Revenue Streams** | ฟรี (Open Source), อนาคต: Pro features, Donation |
| **Key Resources** | Core conversion engine, Thai keyboard mapping data, Developer time |
| **Key Activities** | พัฒนา/maintain แอป, Community management, Marketing |
| **Key Partners** | Open-source contributors, Thai developer community |
| **Cost Structure** | Domain + hosting, Developer time, Code signing certificate |

---

## Roadmap

### v0.1.0 — MVP (Current)
- [x] Web converter (auto-detect + manual mode)
- [x] Desktop app with global hotkey (⌘+Shift+L)
- [x] Kedmanee + Pattachote layouts
- [x] Landing page with live demo

### v0.2.0 — Polish
- [ ] Improve detection accuracy (word-boundary analysis)
- [ ] Add usage statistics / history
- [ ] System tray icon + preferences
- [ ] Auto-update (Tauri updater)

### v0.3.0 — Distribution
- [ ] GitHub Releases + CI/CD (GitHub Actions)
- [ ] Mac code signing + notarization
- [ ] Windows code signing
- [ ] Deploy landing page (custom domain)

### v0.5.0 — Growth
- [ ] Browser extension (Chrome/Firefox)
- [ ] PWA mode for mobile
- [ ] Share converted text
- [ ] Analytics dashboard

### v1.0.0 — Mature
- [ ] AI-powered detection (context-aware)
- [ ] Custom keyboard layout support
- [ ] API for developers
- [ ] Localization (EN UI)

---

## Tasks

| Task | Priority | Status |
|---|---|---|
| Fix Kedmanee mapping edge cases | 🔴 High | ✅ Done |
| Add Pattachote layout support | 🔴 High | ✅ Done |
| Build landing page v2 | 🔴 High | ✅ Done |
| Auto-convert (real-time) | 🔴 High | ✅ Done |
| OG Image for social sharing | 🟡 Medium | ✅ Done |
| Smooth scroll + section IDs | 🟡 Medium | ✅ Done |
| Swap button (input/output) | 🟡 Medium | ✅ Done |
| Default theme = Light | 🟡 Medium | ✅ Done |
| Set up GitHub repo | 🔴 High | 📋 To Do |
| CI/CD pipeline (GitHub Actions) | 🔴 High | 📋 To Do |
| Mac + Windows builds | 🔴 High | 📋 To Do |
| Deploy landing page (domain) | 🔴 High | 📋 To Do |
| Browser extension | 🟡 Medium | 📋 To Do |
| FAQ section on landing page | 🟢 Low | 📋 To Do |
| Google Analytics integration | 🟢 Low | 📋 To Do |
| Privacy Policy page | 🟢 Low | 📋 To Do |
