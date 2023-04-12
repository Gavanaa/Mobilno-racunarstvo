import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-elemnt',
  templateUrl: './book-elemnt.component.html',
  styleUrls: ['./book-elemnt.component.scss'],
})
export class BookElemntComponent  implements OnInit {
@Input() book:Book={author:'neki',title:"neki",mymark:10,averagemark:10,id:'b3'};
  constructor() { }

  ngOnInit() {}

}
