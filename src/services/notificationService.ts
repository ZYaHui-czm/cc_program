export function isNotificationSupported(): boolean {
  return 'Notification' in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  return Notification.requestPermission();
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  try {
    new Notification(title, {
      icon: '/icons/icon-192.png',
      ...options,
    });
  } catch {
    // Fallback for environments where Notification constructor fails
  }
}
