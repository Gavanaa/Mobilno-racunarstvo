import { Component, OnInit } from '@angular/core';
import { Book } from '../../book';
import { ActivatedRoute } from '@angular/router';
import { BookMarksService } from '../../book-marks.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
book:Book;

  constructor(private route:ActivatedRoute,private bookService:BookMarksService) { }
  ngOnInit() {
     this.route.paramMap.subscribe(paramMap=>{
        this.book=this.bookService.getBook(String(paramMap.get('id')));
     })
  }

}
