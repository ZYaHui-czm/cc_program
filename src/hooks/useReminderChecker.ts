import { useEffect } from 'react';
import { startReminderPolling } from '@/services/reminderChecker';

export function useReminderChecker() {
  useEffect(() => {
    const interval = startReminderPolling(60000);
    return () => clearInterval(interval);
  }, []);
}
