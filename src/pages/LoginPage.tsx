import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '@/db';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Profile/Avatar';
import Button from '@/components/Common/Button';
import './LoginPage.css';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [hasExisting, setHasExisting] = useState(false);
  const [existingUser, setExistingUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState('');
  const [step, setStep] = useState<'check' | 'login' | 'register'>('check');
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    db.users.toCollection().first().then(user => {
      if (user) {
        setExistingUser(user);
        setHasExisting(true);
        setStep('login');
        setUsername(user.username);
        setPhoto(user.photo || '');
      } else {
        setHasExisting(false);
        setStep('register');
      }
      setLoading(false);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

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
            <Avatar photo={existingUser.photo} size={80} />
            <p className="login-username">{existingUser.username}</p>
            <div className="login-actions">
              <Button onClick={() => {
                setStep('register');
                setUsername('');
                setPhoto('');
              }} variant="ghost">
                {t('profile.title')}
              </Button>
              <Button onClick={async () => {
                if (existingUser.id != null) {
                  const user = await db.users.get(existingUser.id);
                  if (user) {
                    login(user.username, user.photo || '');
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
            <div className="login-avatar-upload" onClick={() => fileRef.current?.click()}>
              <Avatar photo={photo} size={80} />
              <span className="login-avatar-hint">{t('login.chooseAvatar')}</span>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
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
                    setPhoto(existingUser.photo || '');
                  }
                }}>
                  {t('common.cancel')}
                </Button>
              )}
              <Button
                onClick={() => login(username.trim() || 'User', photo)}
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
