import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '@/db';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Profile/Avatar';
import AvatarPicker, { EMOJIS, COLORS } from '@/components/Profile/AvatarPicker';
import Button from '@/components/Common/Button';
import './LoginPage.css';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [hasExisting, setHasExisting] = useState(false);
  const [existingUser, setExistingUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(EMOJIS[0]);
  const [avatarColor, setAvatarColor] = useState(COLORS[0]);
  const [step, setStep] = useState<'check' | 'login' | 'register'>('check');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.users.toCollection().first().then(user => {
      if (user) {
        setExistingUser(user);
        setHasExisting(true);
        setStep('login');
        setUsername(user.username);
        setAvatar(user.avatar);
        setAvatarColor(user.avatarColor);
      } else {
        setHasExisting(false);
        setStep('register');
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-card" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--color-text-tertiary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">
          {step === 'login' ? t('login.welcomeBack') : t('login.welcome')}
        </h1>

        {step === 'login' && existingUser && (
          <>
            <Avatar emoji={existingUser.avatar} color={existingUser.avatarColor} size={80} />
            <p className="login-username">{existingUser.username}</p>
            <div className="login-actions">
              <Button onClick={() => {
                setStep('register');
                setUsername('');
                setAvatar(EMOJIS[0]);
                setAvatarColor(COLORS[0]);
              }} variant="ghost">
                {t('profile.title')}
              </Button>
              <Button onClick={async () => {
                if (existingUser.id != null) {
                  const user = await db.users.get(existingUser.id);
                  if (user) {
                    login(user.username, user.avatar, user.avatarColor);
                  }
                }
              }}>
                {t('login.continue')}
              </Button>
            </div>
          </>
        )}

        {step === 'register' && (
          <>
            <Avatar emoji={avatar} color={avatarColor} size={80} />
            <p className="login-label">{t('login.chooseAvatar')}</p>
            <AvatarPicker
              selectedEmoji={avatar}
              selectedColor={avatarColor}
              onSelect={(e, c) => { setAvatar(e); setAvatarColor(c); }}
            />
            <div className="login-input-group">
              <label className="login-label">{t('login.username')}</label>
              <input
                className="login-input"
                type="text"
                placeholder={t('login.usernamePlaceholder')}
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={20}
                autoFocus
              />
            </div>
            <div className="login-actions">
              {hasExisting && (
                <Button variant="ghost" onClick={() => {
                  setStep('login');
                  if (existingUser) {
                    setUsername(existingUser.username);
                    setAvatar(existingUser.avatar);
                    setAvatarColor(existingUser.avatarColor);
                  }
                }}>
                  {t('common.cancel')}
                </Button>
              )}
              <Button
                onClick={() => login(username.trim() || 'User', avatar, avatarColor)}
                disabled={!username.trim()}
              >
                {t('login.getStarted')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
