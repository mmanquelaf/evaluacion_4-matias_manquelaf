import type { StatusMessageProps } from '../../types/api'
import './StatusMessage.css'

export function StatusMessage({ kind, message, onRetry }: StatusMessageProps) {
  return (
    <div className={`status-message status-message--${kind}`}>
      <p className="status-message__text" role={kind === 'error' ? 'alert' : 'status'} aria-live={kind === 'error' ? 'assertive' : 'polite'}>
        {message}
      </p>
      {onRetry && <button className="button status-message__retry" type="button" onClick={onRetry}>Volver a intentar</button>}
    </div>
  )
}
