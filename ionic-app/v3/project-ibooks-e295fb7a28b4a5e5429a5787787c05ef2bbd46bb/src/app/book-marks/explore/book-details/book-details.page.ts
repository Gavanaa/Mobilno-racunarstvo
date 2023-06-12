import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../book';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDBService } from 'src/app/fireBaseData.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit, OnDestroy {
  book: Book;
  commentSubject = new BehaviorSubject<
    { user: string; comment: string }[] | null
  >(null);
  comments$ = this.commentSubject.asObservable();
  noDescriptionText = 'Description is not provided for this book';
  destroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private db: FirebaseDBService,
    private router: Router
  ) {}
  ngOnInit() {
    this.listenToBookChanges().subscribe((book) => {
      this.book = book;
      this.sendComments();
      this.calculateAverageRate();
    });
  }

  onCommentReceived(comment: string) {
    this.db.commentBook(comment, this.book.id, this.book.userId);
  }

  private sendComments() {
    let commentList: { user: string; comment: string }[] = [];
    if (!this.book?.comments) return;
    for (let comment of Object.keys(this.book.comments)) {
      commentList.push(this.book.comments[comment]);
    }
    this.commentSubject.next(commentList);
  }

  private listenToBookChanges(): Observable<any> {
    return this.route.paramMap.pipe(
      switchMap((paramMap) =>
        this.db.getAllBooks().pipe(
          map(() => this.db.getBook(paramMap.get('id'))),
          tap((book) =>
            !book ? this.router.navigate(['book-marks/tabs/explore']) : book
          ),
          takeUntil(this.destroy)
        )
      )
    );
  }

  private calculateAverageRate() {
    let rateSum = 0;
    if (!this.book?.rate) return;
    for (const key in this.book?.rate) {
      rateSum += this.book?.rate[key].value;
    }
    this.book.averageRate = this.book.rate
      ? rateSum / Object.keys(this.book.rate).length
      : 0;
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
