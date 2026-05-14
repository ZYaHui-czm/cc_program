import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { MemoItem } from '@/types';
import { useItemActions } from '@/hooks/useItemActions';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import './EditItemModal.css';

interface EditItemModalProps {
  item: MemoItem | null;
  open: boolean;
  onClose: () => void;
  showReminder?: boolean;
}

export default function EditItemModal({ item, open, onClose, showReminder }: EditItemModalProps) {
  const { t } = useTranslation();
  const { updateItem, deleteItem, toggleComplete } = useItemActions();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [reminderAt, setReminderAt] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setNote(item.note);
      setReminderAt(item.reminderAt ? toLocalDatetime(item.reminderAt) : '');
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    if (!item.id || !title.trim()) return;
    await updateItem(item.id, {
      title: title.trim(),
      note: note.trim(),
      reminderAt: showReminder && reminderAt ? new Date(reminderAt) : null,
    });
    onClose();
  };

  const handleDelete = async () => {
    if (item.id == null) return;
    await deleteItem(item.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t('item.editTitle')}>
      <div className="edit-modal-body">
        <input
          className="edit-input"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={t('item.editTitle')}
          maxLength={200}
          autoFocus
        />
        <textarea
          className="edit-textarea"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder={t('item.addNote')}
          rows={3}
          maxLength={1000}
        />

        {showReminder && (
          <div className="edit-reminder">
            <label className="edit-label">{t('reminders.setReminder')}</label>
            <input
              className="edit-input"
              type="datetime-local"
              value={reminderAt}
              onChange={e => setReminderAt(e.target.value)}
            />
          </div>
        )}

        <div className="edit-actions">
          <div className="edit-actions-left">
            <Button variant="ghost" size="sm" onClick={() => item.id != null && toggleComplete(item.id)}>
              {item.isCompleted ? t('common.cancel') : t('common.done')}
            </Button>
          </div>
          <div className="edit-actions-right">
            <Button variant="danger" size="sm" onClick={handleDelete}>
              {t('common.delete')}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!title.trim()}>
              {t('common.save')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function toLocalDatetime(date: Date): string {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
