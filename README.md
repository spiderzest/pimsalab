# PimSalab (พิมพ์สลับ)

Thai-English keyboard correction tool. Fix mistyped text between Thai and English instantly.

> พิมพ์ผิดภาษา? แก้ทันทีด้วย PimSalab — รองรับทั้ง Web และ Desktop

## Features

- **Auto-detect** — Automatically detects whether text is Thai typed on English keyboard or vice versa
- **Instant conversion** — Convert mistyped text with real-time auto-convert as you type
- **Desktop app** — Global hotkey `⌘+Shift+L` (Mac) / `Ctrl+Shift+L` (Win) works in any app
- **Multiple layouts** — Supports Kedmanee and Pattachote keyboard layouts
- **Free & open source** — No account required, no data collection

## Project Structure

```
pimsalab/
├── website/          # React landing page (Vite + Tailwind CSS)
│   └── src/
├── langfix/          # Tauri v2 desktop app (Rust + React)
│   ├── src/          # React frontend
│   └── src-tauri/    # Rust backend
└── .github/
    └── workflows/    # CI/CD pipelines
```

## Web App

Try the live converter at **[spiderzest.github.io/pimsalab](https://spiderzest.github.io/pimsalab)**

### Development

```bash
cd website
npm install
npm run dev
```

## Desktop App

Cross-platform desktop app built with [Tauri v2](https://v2.tauri.app/).

### Prerequisites

- [Rust](https://rustup.rs/) 1.77.2+
- [Node.js](https://nodejs.org/) 22+

### Development

```bash
cd langfix
npm install
npx tauri dev
```

### Build

```bash
cd langfix
npx tauri build
```

Download pre-built binaries from [Releases](https://github.com/spiderzest/pimsalab/releases).

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Web frontend | React 19, TypeScript, Vite 7, Tailwind CSS v4 |
| Desktop framework | Tauri v2 (Rust) |
| Desktop frontend | React 19, TypeScript |
| Desktop plugins | Global Shortcut, Clipboard Manager |

## License

MIT
