import Modal from './Modal';
import Button from './Button';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmDialog({ open, onClose, onConfirm, title, message }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="confirm-body">
        <p>{message}</p>
        <div className="confirm-actions">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button variant="danger" onClick={() => { onConfirm(); onClose(); }}>确认删除</Button>
        </div>
      </div>
    </Modal>
  );
}
