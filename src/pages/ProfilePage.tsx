import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Profile/Avatar';
import Button from '@/components/Common/Button';
import './ProfilePage.css';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    await updateProfile({
      username: username.trim() || user.username,
      photo,
    });
    setSaved(true);
    setTimeout(() => navigate('/settings'), 800);
  };

  return (
    <div className="profile-page">
      <div className="profile-avatar-section" onClick={() => fileRef.current?.click()}>
        <Avatar photo={photo} size={80} />
        <p className="profile-label">{t('profile.avatar')}</p>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className="profile-input-group">
        <label className="profile-label">{t('profile.username')}</label>
        <input
          className="profile-input"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          maxLength={20}
        />
      </div>

      <div className="profile-actions">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSave} disabled={!username.trim()}>
          {t('common.save')}
        </Button>
      </div>

      {saved && <p className="profile-saved">{t('profile.saveSuccess')}</p>}
    </div>
  );
}
