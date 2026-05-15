import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './BottomNav.css';

export default function BottomNav() {
  const { t } = useTranslation();

  const tabs = [
    {
      path: '/ideas',
      label: t('app.ideas'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      path: '/planning',
      label: t('app.planning'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      path: '/reminders',
      label: t('app.reminders'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          replace
          className={({ isActive }) => `nav-tab ${isActive ? 'nav-tab-active' : ''}`}
        >
          {tab.icon}
          <span className="nav-tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
