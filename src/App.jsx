import { useState } from 'react'
import JsonTool from './components/JsonTool'
import Base64Tool from './components/Base64Tool'
import UUIDTool from './components/UUIDTool'
import TimestampTool from './components/TimestampTool'

const TOOLS = [
  {
    id: 'json',
    icon: '{ }',
    label: 'JSON',
    sublabel: 'Formatter & Minifier',
    description: 'Format, minify and validate JSON',
    component: JsonTool,
  },
  {
    id: 'base64',
    icon: '⇄',
    label: 'Base64',
    sublabel: 'Encoder / Decoder',
    description: 'Encode and decode Base64 strings',
    component: Base64Tool,
  },
  {
    id: 'uuid',
    icon: '⊛',
    label: 'UUID',
    sublabel: 'Generator',
    description: 'Generate RFC 4122 v4 UUIDs',
    component: UUIDTool,
  },
  {
    id: 'timestamp',
    icon: '⧗',
    label: 'Timestamp',
    sublabel: 'Converter',
    description: 'Convert Unix timestamps to dates',
    component: TimestampTool,
  },
]

export default function App() {
  const [activeTool, setActiveTool] = useState('json')

  const ActiveComponent = TOOLS.find(t => t.id === activeTool)?.component

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">
            <div className="logo-icon">⚙</div>
            <span className="logo-text">DevToolkit</span>
          </a>
          <span className="logo-badge">Free &amp; Open</span>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-tag">✦ Developer Utilities</div>
        <h1>Your Developer<br />Utility Belt</h1>
        <p className="hero-sub">
          Fast, free, and client-side developer tools. No data ever leaves your browser.
        </p>
      </section>

      {/* Tool Navigation */}
      <nav className="tool-nav" aria-label="Tool Navigation">
        <div className="tool-nav-inner">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              id={`nav-${tool.id}`}
              className={`nav-tab ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
              aria-current={activeTool === tool.id ? 'page' : undefined}
            >
              <span className="tab-icon">{tool.icon}</span>
              <span className="tab-label">{tool.label}</span>
              <span className="tab-label" style={{ opacity: 0.7, fontWeight: 400 }}>{tool.sublabel}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {ActiveComponent && <ActiveComponent />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-info">
            <span className="footer-name">Riya Patel</span>
            <a href="mailto:rdp2245@gmail.com" className="footer-email" id="footer-email">
              rdp2245@gmail.com
            </a>
          </div>
          <div className="footer-right">
            <span className="footer-tagline">Built with ♥ for developers</span>
            <a
              id="digital-heroes-btn"
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-heroes"
            >
              🦸 Built for Digital Heroes
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
