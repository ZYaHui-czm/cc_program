import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReminderChecker } from '@/hooks/useReminderChecker';
import Header from './Header';
import BottomNav from './BottomNav';
import './MainLayout.css';

const titles: Record<string, string> = {
  '/ideas': 'ideas.title',
  '/planning': 'planning.title',
  '/reminders': 'reminders.title',
  '/settings': 'settings.title',
  '/profile': 'profile.title',
};

export default function MainLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  useReminderChecker();

  const i18nKey = titles[location.pathname] || 'app.title';
  const title = t(i18nKey);

  return (
    <div className="main-layout">
      <Header title={title} />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
