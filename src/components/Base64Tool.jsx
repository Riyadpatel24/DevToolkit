import { useState, useCallback } from 'react'
import { CopyButton } from './CopyButton'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('encode') // 'encode' | 'decode'

  const reset = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const process = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some text to process.')
      setOutput('')
      return
    }
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
        setError('')
      } else {
        // Try decoding
        const decoded = decodeURIComponent(escape(atob(input.trim())))
        setOutput(decoded)
        setError('')
      }
    } catch (e) {
      setError(
        mode === 'decode'
          ? 'Invalid Base64 string. Make sure the input is valid Base64 encoded text.'
          : `Encoding error: ${e.message}`
      )
      setOutput('')
    }
  }, [input, mode])

  const swapInputOutput = () => {
    if (output) {
      setInput(output)
      setOutput('')
      setError('')
      setMode(prev => (prev === 'encode' ? 'decode' : 'encode'))
    }
  }

  const isError = !!error
  const hasOutput = !!output && !isError

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-title">
          <div className="tool-icon-badge teal">⇄</div>
          <div>
            <h2>Base64 Encoder / Decoder</h2>
            <p>Encode text to Base64 or decode Base64 back to plain text</p>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div style={{ marginBottom: '20px' }}>
        <div className="segmented-control">
          <button
            id="base64-encode-btn"
            className={`seg-btn ${mode === 'encode' ? 'active' : ''}`}
            onClick={() => { setMode('encode'); setOutput(''); setError('') }}
          >
            ↑ Encode
          </button>
          <button
            id="base64-decode-btn"
            className={`seg-btn ${mode === 'decode' ? 'active' : ''}`}
            onClick={() => { setMode('decode'); setOutput(''); setError('') }}
          >
            ↓ Decode
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="form-group">
        <label className="form-label">
          {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
        </label>
        <textarea
          id="base64-input"
          rows={6}
          placeholder={
            mode === 'encode'
              ? 'Enter text to encode...'
              : 'Paste Base64 encoded string here...'
          }
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); setOutput('') }}
          spellCheck={false}
        />
      </div>

      {/* Buttons */}
      <div className="btn-group">
        <button id="base64-process-btn" className="btn btn-primary" onClick={process}>
          ⚡ {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </button>
        {hasOutput && (
          <button id="base64-swap-btn" className="btn btn-secondary" onClick={swapInputOutput}>
            ⇄ Swap &amp; {mode === 'encode' ? 'Decode' : 'Encode'}
          </button>
        )}
        <button id="base64-clear-btn" className="btn btn-danger" onClick={reset}>
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
          <div className="section-divider">
            <span>{mode === 'encode' ? 'Encoded Base64' : 'Decoded Text'}</span>
          </div>
          <div className="output-area has-content success-state">
            <div className="output-copy-btn">
              <CopyButton text={output} />
            </div>
            <pre id="base64-output">{output}</pre>
          </div>
          <div className="info-row">
            <span className="info-chip">📦 Input: {input.length.toLocaleString()} chars</span>
            <span className="info-chip">📤 Output: {output.length.toLocaleString()} chars</span>
            {mode === 'encode' && (
              <span className="info-chip">📊 Ratio: {((output.length / input.length) * 100).toFixed(0)}%</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
