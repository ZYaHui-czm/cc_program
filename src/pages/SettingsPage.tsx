import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/hooks/useLocale';
import { useInstall } from '@/hooks/useInstall';
import { db } from '@/db';
import Avatar from '@/components/Profile/Avatar';
import Button from '@/components/Common/Button';
import ConfirmDialog from '@/components/Common/ConfirmDialog';
import './SettingsPage.css';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLocale();
  const { canInstall, install } = useInstall();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [installed, setInstalled] = useState(false);

  const handleClearData = async () => {
    await db.items.clear();
    await db.users.clear();
    logout();
  };

  return (
    <div className="settings-page">
      {user && (
        <Link to="/profile" className="settings-row settings-profile">
          <Avatar photo={user.photo} size={40} />
          <div className="settings-profile-info">
            <span className="settings-profile-name">{user.username}</span>
            <span className="settings-profile-hint">{t('settings.profile')}</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}

      <div className="settings-section">
        <div className="settings-row">
          <span>{t('settings.theme')}</span>
          <button className="settings-toggle" onClick={toggleTheme}>
            <span className={`settings-toggle-option ${theme === 'light' ? 'active' : ''}`}>☀️ {t('settings.themeLight')}</span>
            <span className={`settings-toggle-option ${theme === 'dark' ? 'active' : ''}`}>🌙 {t('settings.themeDark')}</span>
          </button>
        </div>

        <div className="settings-row">
          <span>{t('settings.language')}</span>
          <button className="settings-toggle" onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}>
            <span className={`settings-toggle-option ${language === 'zh' ? 'active' : ''}`}>中文</span>
            <span className={`settings-toggle-option ${language === 'en' ? 'active' : ''}`}>EN</span>
          </button>
        </div>
      </div>

      {canInstall && (
        <div className="settings-section">
          <div className="settings-row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span>安装应用</span>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>添加到手机主屏幕</span>
            </div>
            <Button
              size="sm"
              onClick={async () => {
                const ok = await install();
                if (ok) setInstalled(true);
              }}
            >
              {installed ? '已安装 ✓' : '安装'}
            </Button>
          </div>
        </div>
      )}

      <div className="settings-section">
        <div className="settings-row">
          <span>{t('settings.clearData')}</span>
          <Button variant="danger" size="sm" onClick={() => setShowClearDialog(true)}>
            {t('common.delete')}
          </Button>
        </div>
      </div>

      <div className="settings-footer">
        <p>随记 v1.0.0</p>
      </div>

      <ConfirmDialog
        open={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClearData}
        title={t('settings.clearData')}
        message={t('settings.clearDataConfirm')}
      />
    </div>
  );
}
