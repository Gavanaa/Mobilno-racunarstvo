import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trackByFn } from '../../utils';
import { AuthService } from 'src/app/auth/auth.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-elemnt',
  templateUrl: './book-elemnt.component.html',
  styleUrls: ['./book-elemnt.component.scss'],
})
export class BookElemntComponent {
  @Input() books: Book[];
  @Output() deleteBook = new EventEmitter<string>();
  @Output() openAddBookModal = new EventEmitter<string>();
  @Output() toggleReadLater = new EventEmitter<{
    bookIndex: string;
    userId: string;
    checked: boolean;
  }>();
  @Output() rateBook = new EventEmitter<{
    bookIndex: string;
    rate: number;
    userId: string;
  }>();
  readonly trackByFn = trackByFn;

  constructor(public auth: AuthService) {}

  editBook(bookId: string) {
    this.openAddBookModal.emit(bookId);
  }

  removeBook(index: string) {
    this.deleteBook.emit(index);
  }

  gradeBook(bookIndex: string, rate: number, userId: string) {
    this.rateBook.emit({ bookIndex, rate, userId });
  }

  readLaterToggle(bookIndex: string, userId: string, checked: any) {
    this.toggleReadLater.emit({
      bookIndex,
      userId,
      checked: checked.detail.checked,
    });
  }
}
