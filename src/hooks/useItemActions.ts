import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/db';
import type { Category } from '@/types';

export function useItemActions() {
  const addItem = useCallback(async (category: Category, title: string, note = '', reminderAt: Date | null = null) => {
    const count = await db.items.where('category').equals(category).count();
    const id = await db.items.add({
      uuid: uuidv4(),
      category,
      title,
      note,
      isFavorite: false,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      reminderAt,
      notifiedAt: null,
      sortOrder: count,
    });
    return id;
  }, []);

  const updateItem = useCallback(async (id: number, data: Partial<{
    title: string;
    note: string;
    reminderAt: Date | null;
  }>) => {
    await db.items.update(id, { ...data, updatedAt: new Date() });
  }, []);

  const deleteItem = useCallback(async (id: number) => {
    await db.items.delete(id);
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    const item = await db.items.get(id);
    if (item) {
      await db.items.update(id, { isFavorite: !item.isFavorite, updatedAt: new Date() });
    }
  }, []);

  const toggleComplete = useCallback(async (id: number) => {
    const item = await db.items.get(id);
    if (item) {
      await db.items.update(id, { isCompleted: !item.isCompleted, updatedAt: new Date() });
    }
  }, []);

  return { addItem, updateItem, deleteItem, toggleFavorite, toggleComplete };
}
