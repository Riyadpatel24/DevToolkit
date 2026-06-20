<div align="center">

# ⚙️ DevToolkit

### A free, fast, and modern developer utility belt

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://devtoolkit.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Riyadpatel24%2FDevToolkit-181717?style=for-the-badge&logo=github)](https://github.com/Riyadpatel24/DevToolkit)
[![Built with React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> 🔒 **100% client-side** — your data never leaves your browser.

</div>

---

## ✨ Features

| Tool | Description |
|------|-------------|
| **{ } JSON Formatter** | Format with 2/4-space indent, minify to one line, or validate-only with clear error messages |
| **⇄ Base64 Encoder / Decoder** | Unicode-safe encode & decode, one-click swap, size ratio stats |
| **⊛ UUID Generator** | Generate 1–100 cryptographically secure RFC 4122 v4 UUIDs, copy individually or all at once |
| **⧗ Timestamp Converter** | Live Unix clock, bidirectional Unix↔Date conversion, 10 timezone views, relative time |

---

## 🖥️ Screenshots

> Dark-themed, responsive UI with smooth animations and glassmorphism design.

<div align="center">

![DevToolkit Preview](./public/preview.png)

</div>

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Riyadpatel24/DevToolkit.git

# 2. Navigate into the project
cd DevToolkit

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes into the `dist/` folder. Serve it with any static host.

---

## 🌐 Deploy to Vercel

This project is pre-configured for Vercel with `vercel.json` (SPA rewrites + asset caching).

### Option 1 — Vercel Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Riyadpatel24/DevToolkit` from GitHub
3. Vite is auto-detected — click **Deploy** ✅

### Option 2 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

---

## 🗂️ Project Structure

```
devtoolkit/
├── public/
│   └── favicon.svg           # Gradient SVG favicon
├── src/
│   ├── components/
│   │   ├── JsonTool.jsx      # JSON Formatter, Minifier & Validator
│   │   ├── Base64Tool.jsx    # Base64 Encoder / Decoder
│   │   ├── UUIDTool.jsx      # UUID v4 Generator
│   │   ├── TimestampTool.jsx # Unix Timestamp Converter
│   │   └── CopyButton.jsx    # Reusable copy-to-clipboard component
│   ├── App.jsx               # Root component + navigation
│   ├── index.css             # Global styles & design system
│   └── main.jsx              # React entry point
├── index.html                # HTML shell with SEO meta tags
├── vercel.json               # Vercel deployment config
└── vite.config.js            # Vite build config
```

---

## 🎨 Design System

- **Theme:** Dark (`#0d0f14` base) with ambient purple glow
- **Accent:** Purple → Violet → Pink gradient (`#5b5ef4` → `#8b5cf6` → `#ec4899`)
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) (UI) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (code)
- **Animations:** Fade-slide-in on tool switch, pulse on live clock, hover micro-animations
- **Responsive:** Mobile-first, works down to 320px

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev)** — UI framework
- **[Vite 8](https://vite.dev)** — Build tool & dev server
- **Vanilla CSS** — Custom design system, no UI libraries
- **Web Crypto API** — Secure UUID generation (`crypto.randomUUID`)
- **Clipboard API** — Native copy-to-clipboard

---

## 📦 Bundle Size

| Chunk | Size | Gzipped |
|-------|------|---------|
| `index.css` | 13.24 kB | 3.18 kB |
| `index.js` (app) | 19.77 kB | 5.53 kB |
| `react.js` (vendor) | 189.63 kB | 59.65 kB |
| **Total** | **~222 kB** | **~69 kB** |

---

## 👩‍💻 Author

**Riya Patel**
📧 [rdp2245@gmail.com](mailto:rdp2245@gmail.com)

---

## 🦸 Built for Digital Heroes

<a href="https://digitalheroesco.com" target="_blank">
  <img src="https://img.shields.io/badge/🦸%20Built%20for%20Digital%20Heroes-digitalheroesco.com-7c3aed?style=for-the-badge" alt="Built for Digital Heroes" />
</a>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

```
MIT License © 2026 Riya Patel
```
