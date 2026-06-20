import { useState, useCallback } from 'react'
import { CopyButton } from './CopyButton'

export default function JsonTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [activeMode, setActiveMode] = useState('format') // 'format' | 'minify' | 'validate'

  const reset = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const process = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some JSON to process.')
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      setError('')
      if (activeMode === 'format') {
        setOutput(JSON.stringify(parsed, null, indent))
      } else if (activeMode === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else {
        // validate
        setOutput('✓ Valid JSON\n\nParsed successfully. Structure looks good!')
      }
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`)
      setOutput('')
    }
  }, [input, indent, activeMode])

  const sampleJson = () => {
    const sample = {
      name: 'DevToolkit',
      version: '1.0.0',
      tools: ['JSON Formatter', 'Base64', 'UUID Generator'],
      meta: { author: 'Developer', active: true, count: 42 },
    }
    setInput(JSON.stringify(sample, null, 2))
    setOutput('')
    setError('')
  }

  const isError = !!error
  const hasOutput = !!output && !isError

  const modeLabels = {
    format: { icon: '{ }', label: 'Format & Validate' },
    minify: { icon: '→', label: 'Minify' },
    validate: { icon: '✓', label: 'Validate Only' },
  }

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-title">
          <div className="tool-icon-badge purple">{ }</div>
          <div>
            <h2>JSON Formatter</h2>
            <p>Format, minify, and validate JSON with syntax error detection</p>
          </div>
        </div>
      </div>

      {/* Mode selector */}
      <div style={{ marginBottom: '20px' }}>
        <div className="segmented-control">
          {Object.entries(modeLabels).map(([key, { icon, label }]) => (
            <button
              key={key}
              id={`json-mode-${key}`}
              className={`seg-btn ${activeMode === key ? 'active' : ''}`}
              onClick={() => { setActiveMode(key); setOutput(''); setError('') }}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="form-group">
        <label className="form-label">Input JSON</label>
        <textarea
          id="json-input"
          rows={10}
          placeholder='{ "paste": "your JSON here..." }'
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); setOutput('') }}
          spellCheck={false}
        />
      </div>

      {/* Indent control (format mode only) */}
      {activeMode === 'format' && (
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label className="form-label" style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>Indent spaces:</label>
          {[2, 4].map(n => (
            <button
              key={n}
              id={`indent-${n}`}
              className={`seg-btn ${indent === n ? 'active' : ''}`}
              style={{ padding: '6px 14px' }}
              onClick={() => setIndent(n)}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="btn-group">
        <button id="json-process-btn" className="btn btn-primary" onClick={process}>
          ⚡ {modeLabels[activeMode].label}
        </button>
        <button id="json-sample-btn" className="btn btn-secondary" onClick={sampleJson}>
          ◎ Load Sample
        </button>
        <button id="json-clear-btn" className="btn btn-danger" onClick={reset}>
          ✕ Clear
        </button>
      </div>

      {/* Error */}
      {isError && (
        <div className="alert-message error">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Output */}
      {hasOutput && (
        <>
          <div className="section-divider"><span>Output</span></div>
          <div className={`output-area has-content ${activeMode === 'validate' ? 'success-state' : ''}`}>
            <div className="output-copy-btn">
              <CopyButton text={output} />
            </div>
            <pre id="json-output">{output}</pre>
          </div>
          <div className="info-row">
            <span className="info-chip">📦 {output.length.toLocaleString()} chars</span>
            <span className="info-chip">📄 {output.split('\n').length} lines</span>
          </div>
        </>
      )}
    </div>
  )
}
