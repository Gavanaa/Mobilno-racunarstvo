import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookMarksService {
  books: Book[] = [];
  // constructor() { }
  getBook(id: string) {
    return this.books.find((b: Book) => b.id === id);
  }
}
