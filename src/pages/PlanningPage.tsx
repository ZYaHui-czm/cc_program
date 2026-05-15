import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useItems } from '@/hooks/useItems';
import type { MemoItem } from '@/types';
import FavoriteFilter from '@/components/Items/FavoriteFilter';
import ItemList from '@/components/Items/ItemList';
import EmptyState from '@/components/Items/EmptyState';
import EditItemModal from '@/components/Items/EditItemModal';
import AddItemModal from '@/components/Items/AddItemModal';
import FAB from '@/components/Common/FAB';

export default function PlanningPage() {
  const { t } = useTranslation();
  const [showFavorites, setShowFavorites] = useState(false);
  const [editingItem, setEditingItem] = useState<MemoItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const items = useItems('planning', showFavorites);

  return (
    <div className="tab-page">
      <FavoriteFilter showFavorites={showFavorites} onChange={setShowFavorites} />
      {items && items.length > 0 ? (
        <ItemList items={items} onEdit={setEditingItem} />
      ) : (
        <EmptyState emoji="📋" message={t('planning.empty')} hint={t('planning.emptyHint')} />
      )}
      <EditItemModal
        item={editingItem}
        open={!!editingItem}
        onClose={() => setEditingItem(null)}
      />
      <AddItemModal
        category="planning"
        open={showAdd}
        onClose={() => setShowAdd(false)}
      />
      <FAB onClick={() => setShowAdd(true)} aria-label={t('planning.addPlaceholder')} />
    </div>
  );
}
