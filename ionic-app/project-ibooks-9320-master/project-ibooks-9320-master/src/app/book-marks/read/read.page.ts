import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book';
import { FirebaseDBService } from 'src/app/fireBaseData.service';
import { Subject, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit, OnDestroy {
  noDescriptionText = 'Description is not provided for this book';
  readLaterBooks: Book[] = [];
  destroy = new Subject<void>();
  constructor(private db: FirebaseDBService, private authData: AuthService) {}

  ngOnInit() {
    this.db
      .getAllBooks()
      .pipe(
        tap(() => (this.readLaterBooks = []) as any[]),
        distinctUntilChanged(),
        takeUntil(this.destroy)
      )
      .subscribe((books) => {
        books.forEach((book: any) => {
          if (book.readLater?.[this.authData.getCurrentUserId()]?.value) {
            this.readLaterBooks.push(book);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
