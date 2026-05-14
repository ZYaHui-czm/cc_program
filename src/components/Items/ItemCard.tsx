import type { MemoItem } from '@/types';
import { useItemActions } from '@/hooks/useItemActions';
import './ItemCard.css';

interface ItemCardProps {
  item: MemoItem;
  onEdit: (item: MemoItem) => void;
}

export default function ItemCard({ item, onEdit }: ItemCardProps) {
  const { toggleComplete, toggleFavorite } = useItemActions();

  return (
    <div className={`item-card ${item.isCompleted ? 'item-card-done' : ''}`}>
      <button
        className={`item-check ${item.isCompleted ? 'item-check-done' : ''}`}
        onClick={() => item.id != null && toggleComplete(item.id)}
        aria-label={item.isCompleted ? '标记未完成' : '标记完成'}
      >
        {item.isCompleted && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      <button className="item-body" onClick={() => onEdit(item)}>
        <span className="item-title">{item.title}</span>
        {item.note && <span className="item-note-preview">{item.note}</span>}
      </button>

      <button
        className={`item-star ${item.isFavorite ? 'item-star-active' : ''}`}
        onClick={() => item.id != null && toggleFavorite(item.id)}
        aria-label={item.isFavorite ? '取消收藏' : '收藏'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={item.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    </div>
  );
}
