import { useEffect, useState, type ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    if (!open) return;

    const onResize = () => {
      if (window.visualViewport) {
        const offset = window.innerHeight - window.visualViewport.height;
        setKeyboardOffset(offset > 0 ? offset : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onResize);
      }
      setKeyboardOffset(0);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      style={{ paddingBottom: keyboardOffset > 0 ? keyboardOffset : undefined }}
      onClick={onClose}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header">{title}</div>}
        {children}
      </div>
    </div>
  );
}
