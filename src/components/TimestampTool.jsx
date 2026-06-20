import { useState, useEffect, useCallback } from 'react'
import { CopyButton } from './CopyButton'

const TZ_OPTIONS = [
  { label: 'Local', value: 'local' },
  { label: 'UTC', value: 'UTC' },
  { label: 'US/New York', value: 'America/New_York' },
  { label: 'US/Los Angeles', value: 'America/Los_Angeles' },
  { label: 'UK/London', value: 'Europe/London' },
  { label: 'Europe/Berlin', value: 'Europe/Berlin' },
  { label: 'Asia/Kolkata', value: 'Asia/Kolkata' },
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
  { label: 'Asia/Singapore', value: 'Asia/Singapore' },
  { label: 'Australia/Sydney', value: 'Australia/Sydney' },
]

function formatDate(date, tz) {
  if (tz === 'local') {
    return date.toLocaleString(undefined, { timeZoneName: 'short' })
  }
  return date.toLocaleString(undefined, { timeZone: tz, timeZoneName: 'short' })
}

function formatISO(date) {
  return date.toISOString()
}

function toUnix(date) {
  return Math.floor(date.getTime() / 1000)
}

export default function TimestampTool() {
  const [mode, setMode] = useState('unix-to-date') // 'unix-to-date' | 'date-to-unix'
  const [unixInput, setUnixInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [selectedTz, setSelectedTz] = useState('local')
  const [nowTs, setNowTs] = useState(Math.floor(Date.now() / 1000))

  // Live clock for current timestamp
  useEffect(() => {
    const timer = setInterval(() => setNowTs(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(timer)
  }, [])

  const useNow = () => {
    if (mode === 'unix-to-date') {
      setUnixInput(String(nowTs))
    } else {
      setDateInput(new Date().toISOString().slice(0, 16))
    }
    setResults(null)
    setError('')
  }

  const convert = useCallback(() => {
    try {
      let date

      if (mode === 'unix-to-date') {
        if (!unixInput.trim()) { setError('Please enter a Unix timestamp.'); return }
        const ts = Number(unixInput.trim())
        if (isNaN(ts)) { setError('Invalid timestamp: must be a number.'); return }
        // Handle milliseconds vs seconds
        date = ts > 1e12 ? new Date(ts) : new Date(ts * 1000)
      } else {
        if (!dateInput.trim()) { setError('Please enter a date.'); return }
        date = new Date(dateInput)
        if (isNaN(date.getTime())) { setError('Invalid date format. Try: YYYY-MM-DD HH:MM or ISO format.'); return }
      }

      setError('')
      setResults({
        unix: toUnix(date),
        unixMs: date.getTime(),
        iso: formatISO(date),
        local: formatDate(date, 'local'),
        utc: date.toUTCString(),
        relative: getRelativeTime(date),
        tz: formatDate(date, selectedTz),
        dayOfWeek: date.toLocaleDateString(undefined, { weekday: 'long' }),
        date: date.toLocaleDateString(undefined, { dateStyle: 'full' }),
      })
    } catch (e) {
      setError(`Conversion error: ${e.message}`)
    }
  }, [mode, unixInput, dateInput, selectedTz])

  function getRelativeTime(date) {
    const diff = Math.floor((date.getTime() - Date.now()) / 1000)
    const abs = Math.abs(diff)
    const past = diff < 0

    if (abs < 60) return past ? `${abs} seconds ago` : `in ${abs} seconds`
    if (abs < 3600) return past ? `${Math.floor(abs / 60)} minutes ago` : `in ${Math.floor(abs / 60)} minutes`
    if (abs < 86400) return past ? `${Math.floor(abs / 3600)} hours ago` : `in ${Math.floor(abs / 3600)} hours`
    if (abs < 2592000) return past ? `${Math.floor(abs / 86400)} days ago` : `in ${Math.floor(abs / 86400)} days`
    return past ? `${Math.floor(abs / 2592000)} months ago` : `in ${Math.floor(abs / 2592000)} months`
  }

  const reset = () => {
    setUnixInput('')
    setDateInput('')
    setResults(null)
    setError('')
  }

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-title">
          <div className="tool-icon-badge pink">⧗</div>
          <div>
            <h2>Unix Timestamp Converter</h2>
            <p>Convert between Unix timestamps and human-readable dates</p>
          </div>
        </div>
      </div>

      {/* Live clock */}
      <div style={{
        background: 'rgba(16, 217, 160, 0.06)',
        border: '1px solid rgba(16, 217, 160, 0.15)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <div>
          <div className="ts-now-badge">Current Unix Timestamp (live)</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-success)', marginTop: '4px' }}>
            {nowTs.toLocaleString()}
          </div>
        </div>
        <button id="ts-use-now-btn" className="btn btn-secondary" onClick={useNow}>
          ↳ Use Now
        </button>
      </div>

      {/* Mode */}
      <div style={{ marginBottom: '20px' }}>
        <div className="segmented-control">
          <button
            id="ts-mode-unix"
            className={`seg-btn ${mode === 'unix-to-date' ? 'active' : ''}`}
            onClick={() => { setMode('unix-to-date'); setResults(null); setError('') }}
          >
            # → Date
          </button>
          <button
            id="ts-mode-date"
            className={`seg-btn ${mode === 'date-to-unix' ? 'active' : ''}`}
            onClick={() => { setMode('date-to-unix'); setResults(null); setError('') }}
          >
            Date → #
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="form-group">
        {mode === 'unix-to-date' ? (
          <>
            <label className="form-label">Unix Timestamp (seconds or milliseconds)</label>
            <input
              id="ts-unix-input"
              type="number"
              placeholder="e.g. 1720000000"
              value={unixInput}
              onChange={e => { setUnixInput(e.target.value); setError(''); setResults(null) }}
            />
          </>
        ) : (
          <>
            <label className="form-label">Date / Time</label>
            <input
              id="ts-date-input"
              type="datetime-local"
              value={dateInput}
              onChange={e => { setDateInput(e.target.value); setError(''); setResults(null) }}
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </>
        )}
      </div>

      {/* Timezone selector */}
      <div className="form-group">
        <label className="form-label">Show timezone</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {TZ_OPTIONS.map(tz => (
            <button
              key={tz.value}
              id={`tz-${tz.value}`}
              className={`seg-btn ${selectedTz === tz.value ? 'active' : ''}`}
              style={{ padding: '6px 10px', fontSize: '0.78rem' }}
              onClick={() => setSelectedTz(tz.value)}
            >
              {tz.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="btn-group">
        <button id="ts-convert-btn" className="btn btn-primary" onClick={convert}>
          ⚡ Convert
        </button>
        <button id="ts-clear-btn" className="btn btn-danger" onClick={reset}>
          ✕ Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="alert-message error">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Results */}
      {results && (
        <>
          <div className="section-divider"><span>Results</span></div>
          <div className="ts-result-grid">
            {[
              { label: 'Unix (seconds)', value: String(results.unix) },
              { label: 'Unix (milliseconds)', value: String(results.unixMs) },
              { label: 'ISO 8601', value: results.iso },
              { label: 'UTC', value: results.utc },
              { label: 'Local', value: results.local },
              { label: TZ_OPTIONS.find(t => t.value === selectedTz)?.label || selectedTz, value: results.tz },
              { label: 'Day of Week', value: results.dayOfWeek },
              { label: 'Full Date', value: results.date },
              { label: 'Relative', value: results.relative },
            ].map(item => (
              <div key={item.label} className="ts-result-item">
                <div className="ts-result-label">{item.label}</div>
                <div className="ts-result-value">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="btn-group" style={{ marginTop: '16px' }}>
            <CopyButton text={`Unix: ${results.unix}\nISO: ${results.iso}\nLocal: ${results.local}\nUTC: ${results.utc}`} />
          </div>
        </>
      )}
    </div>
  )
}
