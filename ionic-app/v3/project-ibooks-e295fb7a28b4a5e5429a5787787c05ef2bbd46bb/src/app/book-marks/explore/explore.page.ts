import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from '../../modals/add-book-modal/book-modal.component';
import { FirebaseDBService } from 'src/app/fireBaseData.service';
import { EditBookModalComponent } from 'src/app/modals/edit-book-modal/edit-book-modal.component';
import { modalMode } from 'src/app/utils';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  filteredBooks: Book[];
  unFilteredBooks: Book[];
  destroy = new Subject<void>();
  constructor(
    private db: FirebaseDBService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.db
      .getAllBooks()
      .pipe(takeUntil(this.destroy))
      .subscribe((books) => {
        this.unFilteredBooks = books;
        this.filteredBooks = this.unFilteredBooks;
      });
  }

  filterResults(event: any) {
    const searchQuery = event.target.value.toLowerCase();
    this.filteredBooks = this.unFilteredBooks.filter((book) =>
      searchQuery
        ? book.title.toLocaleLowerCase().startsWith(searchQuery)
        : this.unFilteredBooks
    );
  }

  openAddBookModal() {
    this.openModal('add');
  }

  onBookDeleted(index: string) {
    this.db.deleteBook(index);
  }

  onEditBook(index: string) {
    this.openModal('edit', index);
  }

  onReadLaterToggle(details: {
    bookIndex: string;
    userId: string;
    checked: boolean;
  }) {
    this.db.getAllBooks().pipe(take(1)).subscribe();
    this.db.readLaterChanged(
      details.bookIndex,
      details.userId,
      details.checked
    );
  }

  onRateBook(rateDetails: { bookIndex: string; rate: number; userId: string }) {
    this.db.rateBook(
      rateDetails.bookIndex,
      rateDetails.rate,
      rateDetails.userId
    );
  }

  onModalClose() {
    this.modalCtrl.dismiss();
  }

  private openModal(mode: modalMode, bookIndex?: string) {
    const selectedBook = bookIndex ? this.db.getBook(bookIndex) : null;
    this.modalCtrl
      .create({
        component: mode === 'add' ? BookModalComponent : EditBookModalComponent,
        componentProps: mode === 'edit' ? { book: selectedBook } : null,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss().then(({ data }) => {
          if (!data) return;
          if (data.mode === 'edit') {
            this.db.updateBook(bookIndex, data.book);
          } else if (data.mode === 'add') {
            this.db.addBook(data.book);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
