import type { MemoItem } from '@/types';
import ItemCard from './ItemCard';

interface ItemListProps {
  items: MemoItem[];
  onEdit: (item: MemoItem) => void;
}

export default function ItemList({ items, onEdit }: ItemListProps) {
  if (items.length === 0) return null;

  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard key={item.uuid} item={item} onEdit={onEdit} />
      ))}
    </div>
  );
}
