import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useItems } from '@/hooks/useItems';
import { db } from '@/db';
import type { MemoItem } from '@/types';
import AddItemForm from '@/components/Items/AddItemForm';
import FavoriteFilter from '@/components/Items/FavoriteFilter';
import ItemList from '@/components/Items/ItemList';
import EmptyState from '@/components/Items/EmptyState';
import EditItemModal from '@/components/Items/EditItemModal';
import { requestNotificationPermission, isNotificationSupported } from '@/services/notificationService';

export default function RemindersPage() {
  const { t } = useTranslation();
  const [showFavorites, setShowFavorites] = useState(false);
  const [editingItem, setEditingItem] = useState<MemoItem | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const items = useItems('reminders', showFavorites);

  const handleEnableNotifications = useCallback(async () => {
    if (isNotificationSupported()) {
      await requestNotificationPermission();
      setPermissionRequested(true);
    }
  }, []);

  const handleAdded = useCallback(async (id: number) => {
    const item = await db.items.get(id);
    if (item) setEditingItem(item);
  }, []);

  const needPermission = isNotificationSupported()
    && Notification.permission === 'default'
    && !permissionRequested;

  return (
    <div className="tab-page">
      <AddItemForm category="reminders" placeholderKey="reminders.addPlaceholder" onAdded={handleAdded} />
      {needPermission && (
        <div className="notification-banner">
          <span>开启通知以接收提醒</span>
          <button className="notification-banner-btn" onClick={handleEnableNotifications}>
            {t('settings.enableNotifications')}
          </button>
        </div>
      )}
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
    </div>
  );
}
