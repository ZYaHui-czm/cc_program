import type { ButtonHTMLAttributes } from 'react';
import './IconButton.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  size?: number;
}

export default function IconButton({ size = 24, className = '', children, ...props }: IconButtonProps) {
  return (
    <button
      className={`icon-btn ${className}`}
      style={{ width: 44, height: 44 }}
      {...props}
    >
      {children}
    </button>
  );
}
