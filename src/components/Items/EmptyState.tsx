import './EmptyState.css';

interface EmptyStateProps {
  emoji: string;
  message: string;
  hint: string;
}

export default function EmptyState({ emoji, message, hint }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-emoji">{emoji}</span>
      <p className="empty-message">{message}</p>
      <p className="empty-hint">{hint}</p>
    </div>
  );
}
