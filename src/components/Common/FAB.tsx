import './FAB.css';

interface FABProps {
  onClick: () => void;
  'aria-label': string;
}

export default function FAB({ onClick, ...props }: FABProps) {
  return (
    <button className="fab" onClick={onClick} {...props}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
}
