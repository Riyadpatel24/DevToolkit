import { useState, useCallback } from 'react'
import { CopyIconButton, CopyButton } from './CopyButton'

// Generate a v4 UUID (RFC 4122)
function generateUUID() {
  if (crypto.randomUUID) return crypto.randomUUID()
  // Polyfill
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export default function UUIDTool() {
  const [uuids, setUuids] = useState(() => [generateUUID()])
  const [count, setCount] = useState(5)

  const generate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids(newUuids)
  }, [count])

  const addOne = () => setUuids(prev => [...prev, generateUUID()])
  const removeUuid = idx => setUuids(prev => prev.filter((_, i) => i !== idx))
  const clearAll = () => setUuids([])
  const allText = uuids.join('\n')

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-title">
          <div className="tool-icon-badge amber">⊛</div>
          <div>
            <h2>UUID Generator</h2>
            <p>Generate cryptographically secure v4 UUIDs (RFC 4122)</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <label className="form-label" style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>Generate:</label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 5, 10, 25].map(n => (
            <button
              key={n}
              id={`uuid-count-${n}`}
              className={`seg-btn ${count === n ? 'active' : ''}`}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <input
          id="uuid-custom-count"
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={e => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          style={{ width: '70px', padding: '8px 10px' }}
          placeholder="Custom"
        />
      </div>

      {/* Buttons */}
      <div className="btn-group" style={{ marginBottom: '20px' }}>
        <button id="uuid-generate-btn" className="btn btn-primary" onClick={generate}>
          ⚡ Generate {count} UUID{count !== 1 ? 's' : ''}
        </button>
        <button id="uuid-add-one-btn" className="btn btn-secondary" onClick={addOne}>
          + Add One
        </button>
        {uuids.length > 0 && (
          <CopyButton text={allText} className="" />
        )}
        {uuids.length > 0 && (
          <button id="uuid-clear-btn" className="btn btn-danger" onClick={clearAll}>
            ✕ Clear All
          </button>
        )}
      </div>

      {/* UUID list */}
      {uuids.length > 0 ? (
        <>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <span className="info-chip">⊛ {uuids.length} UUID{uuids.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="uuid-list">
            {uuids.map((uuid, idx) => (
              <div key={uuid} className="uuid-item">
                <span className="uuid-value">{uuid}</span>
                <div className="uuid-actions">
                  <CopyIconButton text={uuid} id={`uuid-copy-${idx}`} />
                  <button
                    id={`uuid-remove-${idx}`}
                    className="icon-btn"
                    onClick={() => removeUuid(idx)}
                    title="Remove"
                    style={{ color: '#f87171' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⊛</div>
          <div>Click "Generate" to create UUIDs</div>
        </div>
      )}
    </div>
  )
}
