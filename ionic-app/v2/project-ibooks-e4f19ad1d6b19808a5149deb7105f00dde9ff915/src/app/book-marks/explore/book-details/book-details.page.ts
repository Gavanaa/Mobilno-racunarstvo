import { Component, OnInit } from '@angular/core';
import { Book } from '../../book';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDBService } from 'src/app/fireBaseData.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private db: FirebaseDBService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      let rateSum = 0;
      const id = paramMap.get('id');
      this.book = this.db.getBook(id);
      if (!this.book) {
        this.router.navigate(['']);
        return;
      }
      for (const key in this.book.rate) {
        rateSum += this.book?.rate[key].value;
      }
      this.book.averageRate = rateSum / Object.keys(this.book.rate).length;
    });
  }
}
