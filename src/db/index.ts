import Dexie, { type Table } from 'dexie';
import type { MemoItem, User } from '@/types';

export class MemoDB extends Dexie {
  users!: Table<User, number>;
  items!: Table<MemoItem, number>;

  constructor() {
    super('MemoAppDB');

    this.version(1).stores({
      users: '++id',
      items: '++id, uuid, category, [category+isFavorite], [category+sortOrder], reminderAt',
    });
  }
}

export const db = new MemoDB();
