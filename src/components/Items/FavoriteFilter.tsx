import { useTranslation } from 'react-i18next';
import './FavoriteFilter.css';

interface FavoriteFilterProps {
  showFavorites: boolean;
  onChange: (favorites: boolean) => void;
}

export default function FavoriteFilter({ showFavorites, onChange }: FavoriteFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="favorite-filter">
      <button
        className={`filter-btn ${!showFavorites ? 'filter-btn-active' : ''}`}
        onClick={() => onChange(false)}
      >
        {t('common.all')}
      </button>
      <button
        className={`filter-btn ${showFavorites ? 'filter-btn-active' : ''}`}
        onClick={() => onChange(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={showFavorites ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {t('common.favorites')}
      </button>
    </div>
  );
}
