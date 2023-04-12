import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookMarksService } from '../book-marks.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
// books:Book[]=[
//   {id:'b1',title:'Na Drini cuprija',author:'Andric',mymark :10,averagemark:10},
//   {id:'b2',title:'Tvrdjava',author:'Mesa',mymark:10,averagemark:10}]
books:Book[];
  constructor(private bookService:BookMarksService) { 
this.books=bookService.books;
  }

  ngOnInit() {
  }

}
