import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Category, MemoItem } from '@/types';

export function useItems(category: Category, favoritesOnly = false) {
  return useLiveQuery(async (): Promise<MemoItem[]> => {
    let collection = db.items.where('category').equals(category);

    if (favoritesOnly) {
      return collection.filter(item => item.isFavorite).reverse().sortBy('sortOrder');
    }

    return collection.reverse().sortBy('sortOrder');
  }, [category, favoritesOnly]);
}
