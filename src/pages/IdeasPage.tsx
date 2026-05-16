import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useItems } from '@/hooks/useItems';
import type { MemoItem } from '@/types';
import AddItemForm from '@/components/Items/AddItemForm';
import FavoriteFilter from '@/components/Items/FavoriteFilter';
import ItemList from '@/components/Items/ItemList';
import EmptyState from '@/components/Items/EmptyState';
import EditItemModal from '@/components/Items/EditItemModal';

export default function IdeasPage() {
  const { t } = useTranslation();
  const [showFavorites, setShowFavorites] = useState(false);
  const [editingItem, setEditingItem] = useState<MemoItem | null>(null);
  const items = useItems('ideas', showFavorites);

  return (
    <div className="tab-page">
      <AddItemForm category="ideas" placeholderKey="ideas.addPlaceholder" />
      <FavoriteFilter showFavorites={showFavorites} onChange={setShowFavorites} />
      {items && items.length > 0 ? (
        <ItemList items={items} onEdit={setEditingItem} />
      ) : (
        <EmptyState emoji="💡" message={t('ideas.empty')} hint={t('ideas.emptyHint')} />
      )}
      <EditItemModal
        item={editingItem}
        open={!!editingItem}
        onClose={() => setEditingItem(null)}
      />
    </div>
  );
}
