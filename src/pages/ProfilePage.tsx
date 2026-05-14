import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Profile/Avatar';
import AvatarPicker from '@/components/Profile/AvatarPicker';
import Button from '@/components/Common/Button';
import './ProfilePage.css';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar || '😊');
  const [avatarColor, setAvatarColor] = useState(user?.avatarColor || '#6366f1');
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    await updateProfile({
      username: username.trim() || user.username,
      avatar,
      avatarColor,
    });
    setSaved(true);
    setTimeout(() => navigate('/settings'), 800);
  };

  return (
    <div className="profile-page">
      <div className="profile-avatar-section">
        <Avatar emoji={avatar} color={avatarColor} size={80} />
        <p className="profile-label">{t('profile.avatar')}</p>
        <AvatarPicker
          selectedEmoji={avatar}
          selectedColor={avatarColor}
          onSelect={(e, c) => { setAvatar(e); setAvatarColor(c); }}
        />
      </div>

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
