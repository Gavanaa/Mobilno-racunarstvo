import { Injectable } from '@angular/core';
import { Book } from './book-marks/book';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

import {
  BehaviorSubject,
  Observable,
  catchError,
  distinctUntilChanged,
  map,
  noop,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDBService {
  private allBooks = new BehaviorSubject(null);
  private allNotes = new BehaviorSubject(null);
  private booksList: any[] = [];
  private noteList: any[] = [];
  private readonly databaseURl =
    'https://mobilno-racunarstvo-cea0a-default-rtdb.europe-west1.firebasedatabase.app';
  constructor(private authData: AuthService, private httpClient: HttpClient) {}

  addBook(book: { title: string; author: string; description: string }) {
    this.httpClient
      .post<Book>(
        `${
          this.databaseURl
        }/Users/${this.authData.getCurrentUserId()}/Books.json`,
        {
          userId: this.authData.getCurrentUserId(),
          author: book.author,
          title: book.title,
          description: book.description,
          rate: null,
          comments: null,
          readLater: null,
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Adding book failed ${error}`))
        )
      )
      .subscribe(() => this.requestData());
  }

  getAllBooks(): Observable<any> {
    this.requestData();
    return this.allBooks.pipe(
      map((dbData) =>
        dbData
          ? Object.keys(dbData).map((users) => {
              if (!dbData[users]['Books']) return [];
              return Object.keys(dbData[users]?.['Books']).map((key) => {
                dbData[users]['Books'][key]['id'] = key;
                return dbData[users]['Books'][key];
              });
            })
          : noop()
      ),
      tap(() => (this.booksList = []) as any[]),
      tap((books) =>
        books
          ? books.forEach((book) =>
              book ? this.booksList.push(...book) : null
            )
          : null
      ),
      map(() => this.booksList)
    );
  }

  getAllNotes() {
    this.requestNotes();
    return this.allNotes.pipe(
      tap(() => (this.noteList = []) as any[]),
      distinctUntilChanged(),
      map((notes) =>
        notes
          ? Object.keys(notes).map((key) => this.noteList.push(notes[key]))
          : noop()
      ),
      map(() => this.noteList)
    );
  }

  getBook(id: string): Book {
    return this.booksList.find((book) => book.id === id);
  }

  deleteBook(id: string) {
    this.httpClient
      .delete(
        `${
          this.databaseURl
        }/Users/${this.authData.getCurrentUserId()}/Books/${id}.json`
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Deleting failed ${error}`))
        )
      )
      .subscribe(() => this.requestData());
  }

  updateBook(
    id: string,
    book: { title: string; author: string; description: string }
  ) {
    this.httpClient
      .patch(
        `${
          this.databaseURl
        }/Users/${this.authData.getCurrentUserId()}/Books/${id}.json`,
        {
          title: book.title,
          author: book.author,
          description: book.description,
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Updating failed ${error}`))
        )
      )
      .subscribe(() => this.requestData());
  }

  rateBook(bookIndex: string, rate: number, userId: string) {
    this.httpClient
      .put(
        `${
          this.databaseURl
        }/Users/${userId}/Books/${bookIndex}/rate/${this.authData.getCurrentUserId()}.json`,
        {
          value: rate,
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Rating failed ${error}`))
        )
      )
      .subscribe(() => this.requestData());
  }

  commentBook(comment: string, bookIndex: string, userId: string) {
    this.httpClient
      .post(
        `${this.databaseURl}/Users/${userId}/Books/${bookIndex}/comments.json`,
        {
          user: this.authData.getCurrentUserName(),
          comment: comment,
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Commenting failed ${error}`))
        )
      )
      .subscribe(() => this.requestData());
  }

  readLaterChanged(bookIndex: string, userId: string, checked: boolean) {
    this.httpClient
      .put(
        `${
          this.databaseURl
        }/Users/${userId}/Books/${bookIndex}/readLater/${this.authData.getCurrentUserId()}.json`,
        {
          value: checked,
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Check later failed ${error}`))
        )
      )
      .subscribe(() => this.requestData());
  }

  postNote(note: { title: string; text: string }) {
    this.httpClient
      .post(
        `${
          this.databaseURl
        }/Users/${this.authData.getCurrentUserId()}/Notes.json`,
        {
          title: note.title,
          text: note.text,
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Post note failed ${error}`))
        )
      )
      .subscribe(() => this.requestNotes());
  }

  private requestData() {
    this.httpClient
      .get(`${this.databaseURl}/Users.json`)
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Data failed to fetch ${error}`))
        )
      )
      .subscribe((data) => this.allBooks.next(data));
  }

  private requestNotes() {
    const currentUser = this.authData.getCurrentUserId();
    this.httpClient
      .get(`${this.databaseURl}/Users/${currentUser}/Notes.json`)
      .pipe(
        catchError((error) =>
          throwError(() => console.error(`Data failed to fetch ${error}`))
        )
      )
      .subscribe((data) => this.allNotes.next(data));
  }
}
