import { useState, useCallback } from 'react'

function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      id="copy-btn"
      className={`btn ${copied ? 'btn-success copied' : 'btn-success'} ${className}`}
      onClick={handleCopy}
      disabled={!text}
    >
      {copied ? '✓ Copied!' : '⎘ Copy'}
    </button>
  )
}

function CopyIconButton({ text, id }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      id={id}
      className={`icon-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      title="Copy"
    >
      {copied ? '✓' : '⎘'}
    </button>
  )
}

export { CopyButton, CopyIconButton }
