import { Book } from './book-marks/book';

export const trackByFn = (index: number, item: Book) => item.id;
export type modalMode = 'add' | 'edit';
