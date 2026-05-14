import { db } from '@/db';
import { showNotification, isNotificationSupported } from './notificationService';

export async function checkDueReminders() {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  const now = new Date();

  const dueItems = await db.items
    .where('reminderAt')
    .belowOrEqual(now)
    .filter(item =>
      item.category === 'reminders' &&
      !item.isCompleted &&
      (!item.notifiedAt || item.notifiedAt < (item.reminderAt ?? now))
    )
    .toArray();

  for (const item of dueItems) {
    showNotification(item.title, {
      body: '⏰ 提醒时间到了',
      tag: `memo-reminder-${item.uuid}`,
    });

    if (item.id != null) {
      await db.items.update(item.id, { notifiedAt: now });
    }
  }
}

export function startReminderPolling(intervalMs = 60000) {
  checkDueReminders();
  return setInterval(checkDueReminders, intervalMs);
}
