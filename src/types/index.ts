export type Category = 'ideas' | 'planning' | 'reminders';
export type Theme = 'light' | 'dark';
export type Language = 'zh' | 'en';

export interface User {
  id?: number;
  username: string;
  photo: string;
  language: Language;
  createdAt?: Date;
}

export interface MemoItem {
  id?: number;
  uuid: string;
  category: Category;
  title: string;
  note: string;
  isFavorite: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  reminderAt: Date | null;
  notifiedAt: Date | null;
  sortOrder: number;
}
