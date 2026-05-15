import { useEffect } from 'react';
import { startReminderPolling } from '@/services/reminderChecker';
import { requestNotificationPermission, isNotificationSupported } from '@/services/notificationService';

export function useReminderChecker() {
  useEffect(() => {
    if (isNotificationSupported() && Notification.permission === 'default') {
      requestNotificationPermission();
    }
    const interval = startReminderPolling(60000);
    return () => clearInterval(interval);
  }, []);
}
