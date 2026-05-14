import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useItems } from '@/hooks/useItems';
import type { MemoItem } from '@/types';
import AddItemForm from '@/components/Items/AddItemForm';
import FavoriteFilter from '@/components/Items/FavoriteFilter';
import ItemList from '@/components/Items/ItemList';
import EmptyState from '@/components/Items/EmptyState';
import EditItemModal from '@/components/Items/EditItemModal';

export default function RemindersPage() {
  const { t } = useTranslation();
  const [showFavorites, setShowFavorites] = useState(false);
  const [editingItem, setEditingItem] = useState<MemoItem | null>(null);
  const items = useItems('reminders', showFavorites);

  return (
    <>
      <AddItemForm category="reminders" placeholderKey="reminders.addPlaceholder" />
      <FavoriteFilter showFavorites={showFavorites} onChange={setShowFavorites} />
      {items && items.length > 0 ? (
        <ItemList items={items} onEdit={setEditingItem} />
      ) : (
        <EmptyState emoji="🔔" message={t('reminders.empty')} hint={t('reminders.emptyHint')} />
      )}
      <EditItemModal
        item={editingItem}
        open={!!editingItem}
        onClose={() => setEditingItem(null)}
        showReminder
      />
    </>
  );
}
