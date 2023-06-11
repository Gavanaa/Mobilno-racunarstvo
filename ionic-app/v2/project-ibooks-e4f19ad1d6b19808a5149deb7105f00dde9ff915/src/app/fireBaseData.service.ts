import { Injectable } from '@angular/core';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
  set,
} from 'firebase/database';
import { Book } from './book-marks/book';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject, Observable, map, noop, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDBService {
  db = getDatabase();
  dbRef = ref(this.db, `Users/`);
  private allBooks = new BehaviorSubject(null);
  private booksList: any[] = [];
  constructor(private authData: AuthService) {}

  addBook(book: { title: string; author: string; description: string }) {
    push(ref(this.db, `Users/${this.authData.getCurrentUserId()}/Books`), {
      userId: this.authData.getCurrentUserId(),
      author: book.author,
      title: book.title,
      description: book.description,
      rate: null,
    } as Book)
      .then(() => console.log('Data wrote success'))
      .catch((error) => console.log(error));
  }

  getAllBooks(): Observable<any> {
    this.requestData();
    return this.allBooks.pipe(
      map((dbData) =>
        dbData
          ? Object.keys(dbData).map((users) =>
              Object.keys(dbData[users]['Books']).map((key) => {
                dbData[users]['Books'][key]['id'] = key;
                return dbData[users]['Books'][key];
              })
            )
          : noop()
      ),
      tap(() => (this.booksList = []) as any[]),
      tap((books) =>
        books ? books.forEach((book) => this.booksList.push(...book)) : null
      ),
      map(() => this.booksList)
    );
  }

  getBook(id: string): Book {
    return this.booksList.find((book) => book.id === id);
  }

  deleteBook(id: string) {
    remove(
      ref(this.db, `Users/${this.authData.getCurrentUserId()}/Books/${id}`)
    )
      .then(() => console.log('Data successfully removed'))
      .catch((error) => console.log(error));
  }

  updateBook(
    id: string,
    book: { title: string; author: string; description: string }
  ) {
    update(
      ref(this.db, `Users/${this.authData.getCurrentUserId()}/Books/${id}`),
      {
        title: book.title,
        author: book.author,
        description: book.description,
      }
    )
      .then(() => console.log('Data updated successfully'))
      .catch((error) => console.log(error));
  }

  rateBook(bookIndex: string, rate: number, userId: string) {
    set(
      ref(
        this.db,
        `Users/${userId}/Books/${bookIndex}/rate/${this.authData.getCurrentUserId()}`
      ),
      {
        value: rate,
      }
    )
      .then(() => console.log('Book rated success'))
      .catch((error) => console.log(error));
  }

  private requestData() {
    onValue(this.dbRef, (snapshot) => {
      snapshot
        ? this.allBooks.next(snapshot.val())
        : console.error('Data failed to fetch from database');
    });
  }
}
