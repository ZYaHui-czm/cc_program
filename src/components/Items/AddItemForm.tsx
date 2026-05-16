import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Category } from '@/types';
import { useItemActions } from '@/hooks/useItemActions';
import './AddItemForm.css';

interface AddItemFormProps {
  category: Category;
  placeholderKey: string;
  onAdded?: (id: number) => void;
}

export default function AddItemForm({ category, placeholderKey, onAdded }: AddItemFormProps) {
  const { t } = useTranslation();
  const { addItem } = useItemActions();
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const id = await addItem(category, trimmed);
    setValue('');
    onAdded?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="add-item-form">
      <input
        className="add-item-input"
        type="text"
        placeholder={t(placeholderKey)}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={200}
      />
      <button
        className="add-item-btn"
        onClick={handleSubmit}
        disabled={!value.trim()}
        aria-label={t('common.add')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
