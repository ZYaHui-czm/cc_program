import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Category } from '@/types';
import { useItemActions } from '@/hooks/useItemActions';
import Modal from '@/components/Common/Modal';
import './AddItemModal.css';

interface AddItemModalProps {
  category: Category;
  open: boolean;
  onClose: () => void;
}

const placeholderKeys: Record<Category, string> = {
  ideas: 'ideas.addPlaceholder',
  planning: 'planning.addPlaceholder',
  reminders: 'reminders.addPlaceholder',
};

export default function AddItemModal({ category, open, onClose }: AddItemModalProps) {
  const { t } = useTranslation();
  const { addItem } = useItemActions();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [reminderAt, setReminderAt] = useState('');

  const handleSubmit = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addItem(
      category,
      trimmed,
      note.trim(),
      reminderAt ? new Date(reminderAt) : null,
    );
    setTitle('');
    setNote('');
    setReminderAt('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && title.trim()) handleSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} title={t(placeholderKeys[category])}>
      <div className="add-modal-body">
        <input
          className="add-modal-input"
          type="text"
          placeholder={t(placeholderKeys[category])}
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
          autoFocus
        />
        <textarea
          className="add-modal-textarea"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder={t('item.addNote')}
          rows={2}
          maxLength={1000}
        />

        {category === 'reminders' && (
          <div className="add-modal-reminder">
            <label className="add-modal-label">{t('reminders.setReminder')}</label>
            <input
              className="add-modal-input"
              type="datetime-local"
              value={reminderAt}
              onChange={e => setReminderAt(e.target.value)}
            />
          </div>
        )}

        <div className="add-modal-actions">
          <button className="add-modal-cancel" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button
            className="add-modal-submit"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            {t('common.add')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
